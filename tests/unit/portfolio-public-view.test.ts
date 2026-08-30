import { describe, expect, it } from "vitest";

import { derivePublicPortfolioAllocation } from "@/domain/portfolio/public-view";
import { portfolioDatasetSchema } from "@/domain/portfolio/schemas";
import { portfolioFixture } from "../fixtures/portfolio";

describe("public portfolio allocation view", () => {
  it("publishes percentages and context without private monetary facts", () => {
    const dataset = portfolioDatasetSchema.parse(portfolioFixture);
    const snapshot = dataset.snapshots[0];

    expect(snapshot).toBeDefined();

    if (!snapshot) {
      throw new Error("Expected the fixture to contain a snapshot");
    }

    const publicView = derivePublicPortfolioAllocation(snapshot, dataset.instruments);
    const serialized = JSON.stringify(publicView);

    expect(publicView).toEqual({
      asOf: "2026-08-27",
      calculationCurrency: "INR",
      completeness: "complete",
      holdings: [
        {
          allocationPercent: "55.555556",
          instrumentId: "sample-india-index-fund",
          instrumentType: "mutual_fund",
          listingCountry: "IN",
          name: "Sample India Index Fund",
          strategyBucket: "core",
        },
        {
          allocationPercent: "44.444444",
          instrumentId: "sample-us-equity-etf",
          instrumentType: "etf",
          listingCountry: "US",
          name: "Sample US Equity ETF",
          strategyBucket: "experimental",
          symbol: "SAMPLE",
        },
      ],
    });

    expect(serialized).not.toMatch(
      /quantity|price|costBasis|marketValue|totalMarketValue|unrealizedPnl/,
    );
  });
});
