import { describe, expect, it } from "vitest";

import { portfolioPublication } from "@/content/homepage";
import { publicPortfolioDataset } from "@/data/portfolio/public-dataset";
import { publishedPortfolioAllocation } from "@/data/portfolio/published-allocation";

describe("public portfolio publication state", () => {
  it("publishes allocation while private monetary snapshots remain absent", () => {
    expect(publicPortfolioDataset.instruments).toHaveLength(4);
    expect(publicPortfolioDataset.snapshots).toEqual([]);
    expect(publishedPortfolioAllocation.holdings).toHaveLength(4);
    expect(portfolioPublication.hasPublishedSnapshot).toBe(true);
    expect(portfolioPublication.status).toBe("Verified allocation published");
  });
});
