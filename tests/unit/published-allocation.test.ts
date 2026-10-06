import Decimal from "decimal.js";
import { describe, expect, it } from "vitest";

import allocationArtifact from "@/data/portfolio/published-allocation.json";
import { publishedPortfolioAllocation } from "@/data/portfolio/published-allocation";
import { publishedAllocationArtifactSchema } from "@/domain/portfolio/publication";

describe("published portfolio allocation", () => {
  it("validates a complete percentage-only artifact", () => {
    const artifact = publishedAllocationArtifactSchema.parse(allocationArtifact);
    const total = artifact.holdings.reduce(
      (sum, holding) => sum.plus(holding.allocationPercent),
      new Decimal(0),
    );

    expect(artifact.asOf).toBe("2026-09-15");
    expect(artifact.completeness).toBe("complete");
    expect(artifact.holdings).toHaveLength(6);
    expect(total.equals(100)).toBe(true);
  });

  it("hydrates public instrument facts without private financial fields", () => {
    const serialized = JSON.stringify(publishedPortfolioAllocation);

    expect(publishedPortfolioAllocation.holdings.map((holding) => holding.name)).toEqual([
      "UTI Nifty 50 Index Fund",
      "Vanguard S&P 500 ETF",
      "Procure Space ETF",
      "NVIDIA Corporation",
      "Motilal Oswal Nifty India Defence ETF",
      "GE Vernova LLC",
    ]);
    expect(serialized).not.toMatch(
      /quantity|unitPrice|averageUnitCost|costBasis|marketValue|totalMarketValue|unrealizedPnl|profit|loss/i,
    );
  });
});
