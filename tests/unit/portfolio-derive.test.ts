import { describe, expect, it } from "vitest";

import { derivePortfolio } from "@/domain/portfolio/derive";
import { portfolioDatasetSchema } from "@/domain/portfolio/schemas";
import { portfolioFixture } from "../fixtures/portfolio";

describe("portfolio derivations", () => {
  it("derives multi-currency totals and weights deterministically", () => {
    const dataset = portfolioDatasetSchema.parse(portfolioFixture);
    const snapshot = dataset.snapshots[0];

    expect(snapshot).toBeDefined();

    if (!snapshot) {
      throw new Error("Expected the fixture to contain a snapshot");
    }

    const result = derivePortfolio(snapshot, dataset.instruments);

    expect(result.totalMarketValue).toBe("1800");
    expect(result.totalCostBasis).toBe("1620");
    expect(result.totalUnrealizedPnl).toBe("180");
    expect(result.holdings[0]?.portfolioWeightPercent).toBe("55.555556");
    expect(result.holdings[1]?.portfolioWeightPercent).toBe("44.444444");
  });
});
