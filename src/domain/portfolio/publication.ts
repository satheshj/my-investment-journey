import Decimal from "decimal.js";
import * as z from "zod";

import {
  currencyCodeSchema,
  isoDateSchema,
  positiveDecimalStringSchema,
  projectIdSchema,
} from "@/domain/shared/scalars";

import type { PublicPortfolioAllocation } from "./public-view";
import { instrumentSchema, strategyBucketSchema, type Instrument } from "./schemas";

const publishedHoldingSchema = z
  .object({
    allocationPercent: positiveDecimalStringSchema,
    instrumentId: projectIdSchema,
    strategyBucket: strategyBucketSchema,
  })
  .strict();

const publicFxBasisSchema = z
  .object({
    asOf: isoDateSchema,
    fromCurrency: currencyCodeSchema,
    sourceLabel: z.string().trim().min(1),
    sourceUrl: z.string().url(),
    toCurrency: currencyCodeSchema,
    rate: positiveDecimalStringSchema.optional(),
  })
  .strict();

export const publishedAllocationArtifactSchema = z
  .object({
    schemaVersion: z.union([z.literal(1), z.literal(2)]),
    id: projectIdSchema,
    asOf: isoDateSchema,
    snapshotWindow: z
      .object({ oldest: isoDateSchema, newest: isoDateSchema })
      .strict()
      .optional(),
    calculationCurrency: currencyCodeSchema,
    completeness: z.enum(["complete", "partial"]),
    calculationBasis: z
      .object({
        method: z.literal("base_currency_market_value"),
        fx: z.array(publicFxBasisSchema),
      })
      .strict(),
    holdings: z.array(publishedHoldingSchema).min(1),
    provenance: z
      .object({
        generator: z.enum(["portfolio-import-v1", "portfolio-drive-import-v2"]),
        sources: z
          .array(
            z
              .object({
                label: z.string().trim().min(1),
                sha256: z.string().regex(/^[a-f0-9]{64}$/),
              })
              .strict(),
          )
          .min(1),
      })
      .strict(),
  })
  .strict()
  .superRefine((artifact, context) => {
    if (
      artifact.snapshotWindow &&
      (artifact.snapshotWindow.oldest !== artifact.asOf ||
        artifact.snapshotWindow.newest < artifact.snapshotWindow.oldest)
    ) {
      context.addIssue({
        code: "custom",
        message: "snapshotWindow must begin on asOf and end no earlier",
        path: ["snapshotWindow"],
      });
    }
    const seenInstrumentIds = new Set<string>();

    artifact.holdings.forEach((holding, index) => {
      if (seenInstrumentIds.has(holding.instrumentId)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate published holding ${holding.instrumentId}`,
          path: ["holdings", index, "instrumentId"],
        });
      }

      seenInstrumentIds.add(holding.instrumentId);
    });

    const total = artifact.holdings.reduce(
      (sum, holding) => sum.plus(holding.allocationPercent),
      new Decimal(0),
    );

    if (!total.equals(100)) {
      context.addIssue({
        code: "custom",
        message: `Published allocations must total 100, received ${total.toString()}`,
        path: ["holdings"],
      });
    }
  });

export type PublishedAllocationArtifact = z.infer<
  typeof publishedAllocationArtifactSchema
>;

export type PublishedPortfolioAllocation = PublicPortfolioAllocation & {
  calculationBasis: PublishedAllocationArtifact["calculationBasis"];
  id: string;
  snapshotWindow?: PublishedAllocationArtifact["snapshotWindow"];
};

export function hydratePublishedAllocation(
  candidate: unknown,
  instrumentCandidates: unknown,
): PublishedPortfolioAllocation {
  const artifact = publishedAllocationArtifactSchema.parse(candidate);
  const instruments = z.array(instrumentSchema).parse(instrumentCandidates);
  const instrumentsById = new Map(
    instruments.map((instrument) => [instrument.id, instrument]),
  );

  return {
    id: artifact.id,
    asOf: artifact.asOf,
    calculationBasis: artifact.calculationBasis,
    ...(artifact.snapshotWindow ? { snapshotWindow: artifact.snapshotWindow } : {}),
    calculationCurrency: artifact.calculationCurrency,
    completeness: artifact.completeness,
    holdings: artifact.holdings.map((holding) => {
      const instrument = instrumentsById.get(holding.instrumentId);

      if (!instrument) {
        throw new Error(`Unknown published instrument ${holding.instrumentId}`);
      }

      return publicHolding(holding, instrument);
    }),
  };
}

function publicHolding(
  holding: PublishedAllocationArtifact["holdings"][number],
  instrument: Instrument,
) {
  return {
    allocationPercent: holding.allocationPercent,
    instrumentId: instrument.id,
    instrumentType: instrument.instrumentType,
    listingCountry: instrument.listingCountry,
    name: instrument.name,
    strategyBucket: holding.strategyBucket,
    ...(instrument.symbol ? { symbol: instrument.symbol } : {}),
  };
}
