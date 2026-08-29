import { describe, expect, it } from "vitest";

import { portfolioPublication } from "@/content/homepage";
import { publicPortfolioDataset } from "@/data/portfolio/public-dataset";

describe("public portfolio publication state", () => {
  it("keeps portfolio totals unpublished until a verified snapshot exists", () => {
    expect(publicPortfolioDataset.instruments).toEqual([]);
    expect(publicPortfolioDataset.snapshots).toEqual([]);
    expect(portfolioPublication.hasPublishedSnapshot).toBe(false);
    expect(portfolioPublication.status).toBe("Waiting for a verified snapshot");
  });
});
