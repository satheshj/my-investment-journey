import { describe, expect, it } from "vitest";

import {
  instrumentSchema,
  portfolioDatasetSchema,
  portfolioSnapshotSchema,
} from "@/domain/portfolio/schemas";
import { portfolioFixture } from "../fixtures/portfolio";

describe("portfolio contracts", () => {
  it("accepts a mutual fund without a ticker", () => {
    const result = instrumentSchema.safeParse(portfolioFixture.instruments[0]);

    expect(result.success).toBe(true);
  });

  it("accepts a validated multi-currency dataset", () => {
    expect(portfolioDatasetSchema.safeParse(portfolioFixture).success).toBe(true);
  });

  it("rejects duplicate holdings in one snapshot", () => {
    const snapshot = structuredClone(portfolioFixture.snapshots[0]);
    const firstHolding = snapshot?.holdings[0];

    if (!snapshot || !firstHolding) {
      throw new Error("The fixture must include one snapshot and holding.");
    }

    snapshot.holdings.push(structuredClone(firstHolding));

    expect(portfolioSnapshotSchema.safeParse(snapshot).success).toBe(false);
  });

  it("rejects a dataset with no required FX rate", () => {
    const dataset = structuredClone(portfolioFixture);
    const snapshot = dataset.snapshots[0];

    if (!snapshot) {
      throw new Error("The fixture must include one snapshot.");
    }

    snapshot.fxRates = [];

    expect(portfolioDatasetSchema.safeParse(dataset).success).toBe(false);
  });
});
