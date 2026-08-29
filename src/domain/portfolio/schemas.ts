import * as z from "zod";

import { moneySchema } from "@/domain/shared/money";
import {
  currencyCodeSchema,
  decimalStringSchema,
  isoDateSchema,
  isoDateTimeSchema,
  positiveDecimalStringSchema,
  projectIdSchema,
} from "@/domain/shared/scalars";

export const strategyBucketSchema = z.enum(["core", "thematic", "experimental"]);

export const instrumentSchema = z
  .object({
    id: projectIdSchema,
    name: z.string().trim().min(1),
    symbol: z.string().trim().min(1).optional(),
    isin: z.string().trim().min(1).optional(),
    instrumentType: z.enum(["equity", "etf", "mutual_fund"]),
    listingCountry: z.string().regex(/^[A-Z]{2}$/),
    exchange: z.string().trim().min(1).optional(),
    tradingCurrency: currencyCodeSchema,
    sector: z.string().trim().min(1).optional(),
  })
  .strict();

export const fxRateSchema = z
  .object({
    fromCurrency: currencyCodeSchema,
    toCurrency: currencyCodeSchema,
    rate: positiveDecimalStringSchema,
    asOf: isoDateSchema,
    sourceLabel: z.string().trim().min(1),
  })
  .strict();

export const holdingSnapshotSchema = z
  .object({
    instrumentId: projectIdSchema,
    quantity: positiveDecimalStringSchema,
    averageUnitCost: moneySchema.optional(),
    costBasis: moneySchema,
    marketValue: moneySchema,
    strategyBucket: strategyBucketSchema,
    heldSince: isoDateSchema.optional(),
    sourceRef: z.string().trim().min(1).optional(),
  })
  .strict();

export const snapshotSourceSchema = z
  .object({
    kind: z.enum(["manual", "tickertape_export", "other_export"]),
    importedAt: isoDateTimeSchema,
    label: z.string().trim().min(1).optional(),
  })
  .strict();

export const portfolioSnapshotSchema = z
  .object({
    id: projectIdSchema,
    asOf: isoDateSchema,
    baseCurrency: currencyCodeSchema,
    completeness: z.enum(["complete", "partial"]),
    fxRates: z.array(fxRateSchema),
    holdings: z.array(holdingSnapshotSchema),
    source: snapshotSourceSchema,
  })
  .strict()
  .superRefine((snapshot, context) => {
    const seenInstrumentIds = new Set<string>();

    snapshot.holdings.forEach((holding, index) => {
      if (seenInstrumentIds.has(holding.instrumentId)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate holding for ${holding.instrumentId}`,
          path: ["holdings", index, "instrumentId"],
        });
      }

      seenInstrumentIds.add(holding.instrumentId);
    });
  });

export const transactionSchema = z
  .object({
    id: projectIdSchema,
    instrumentId: projectIdSchema,
    occurredAt: isoDateTimeSchema,
    transactionType: z.enum(["buy", "sell"]),
    quantity: positiveDecimalStringSchema,
    unitPrice: moneySchema,
    fees: moneySchema.optional(),
    sourceRef: z.string().trim().min(1).optional(),
  })
  .strict();

export const portfolioDatasetSchema = z
  .object({
    instruments: z.array(instrumentSchema),
    snapshots: z.array(portfolioSnapshotSchema),
    transactions: z.array(transactionSchema).default([]),
  })
  .strict()
  .superRefine((dataset, context) => {
    const instrumentsById = new Map(
      dataset.instruments.map((instrument) => [instrument.id, instrument]),
    );
    const instrumentIds = new Set<string>();
    const snapshotIds = new Set<string>();
    const transactionIds = new Set<string>();

    dataset.instruments.forEach((instrument, index) => {
      if (instrumentIds.has(instrument.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate instrument ID ${instrument.id}`,
          path: ["instruments", index, "id"],
        });
      }

      instrumentIds.add(instrument.id);
    });

    dataset.snapshots.forEach((snapshot, snapshotIndex) => {
      if (snapshotIds.has(snapshot.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate snapshot ID ${snapshot.id}`,
          path: ["snapshots", snapshotIndex, "id"],
        });
      }

      snapshotIds.add(snapshot.id);

      snapshot.holdings.forEach((holding, holdingIndex) => {
        const instrument = instrumentsById.get(holding.instrumentId);
        const holdingPath = ["snapshots", snapshotIndex, "holdings", holdingIndex];

        if (!instrument) {
          context.addIssue({
            code: "custom",
            message: `Unknown instrument ${holding.instrumentId}`,
            path: [...holdingPath, "instrumentId"],
          });
          return;
        }

        for (const field of ["costBasis", "marketValue"] as const) {
          if (holding[field].currency !== instrument.tradingCurrency) {
            context.addIssue({
              code: "custom",
              message: `${field} must use ${instrument.tradingCurrency}`,
              path: [...holdingPath, field, "currency"],
            });
          }
        }

        if (
          holding.averageUnitCost &&
          holding.averageUnitCost.currency !== instrument.tradingCurrency
        ) {
          context.addIssue({
            code: "custom",
            message: `averageUnitCost must use ${instrument.tradingCurrency}`,
            path: [...holdingPath, "averageUnitCost", "currency"],
          });
        }

        if (instrument.tradingCurrency !== snapshot.baseCurrency) {
          const hasRate = snapshot.fxRates.some(
            (rate) =>
              rate.fromCurrency === instrument.tradingCurrency &&
              rate.toCurrency === snapshot.baseCurrency,
          );

          if (!hasRate) {
            context.addIssue({
              code: "custom",
              message: `Missing ${instrument.tradingCurrency} to ${snapshot.baseCurrency} FX rate`,
              path: ["snapshots", snapshotIndex, "fxRates"],
            });
          }
        }
      });
    });

    dataset.transactions.forEach((transaction, index) => {
      if (transactionIds.has(transaction.id)) {
        context.addIssue({
          code: "custom",
          message: `Duplicate transaction ID ${transaction.id}`,
          path: ["transactions", index, "id"],
        });
      }

      transactionIds.add(transaction.id);

      if (!instrumentsById.has(transaction.instrumentId)) {
        context.addIssue({
          code: "custom",
          message: `Unknown instrument ${transaction.instrumentId}`,
          path: ["transactions", index, "instrumentId"],
        });
      }
    });
  });

export type StrategyBucket = z.infer<typeof strategyBucketSchema>;
export type Instrument = z.infer<typeof instrumentSchema>;
export type FxRate = z.infer<typeof fxRateSchema>;
export type HoldingSnapshot = z.infer<typeof holdingSnapshotSchema>;
export type PortfolioSnapshot = z.infer<typeof portfolioSnapshotSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type PortfolioDataset = z.infer<typeof portfolioDatasetSchema>;

export { decimalStringSchema };
