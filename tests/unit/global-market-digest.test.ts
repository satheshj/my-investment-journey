import { describe, expect, it } from "vitest";

import digestJson from "@/data/global-markets/weekly-digest.json";
import { globalMarketDigestSchema } from "@/domain/global-markets/schemas";

describe("globalMarketDigestSchema", () => {
  it("accepts the published weekly edition", () => {
    const digest = globalMarketDigestSchema.parse(digestJson);

    expect(digest.coverage).toBe("indian-and-global-markets");
    expect(digest.articles.length).toBeGreaterThan(0);
    expect(digest.articles.some((article) => article.sourceRegion === "India")).toBe(
      true,
    );
    expect(digest.articles.some((article) => article.sourceRegion !== "India")).toBe(
      true,
    );
    expect(new Set(digest.articles.map((article) => article.source)).size).toBe(
      digest.sourceCount,
    );
  });

  it("rejects an incorrect source count", () => {
    expect(() =>
      globalMarketDigestSchema.parse({ ...digestJson, sourceCount: 99 }),
    ).toThrow(/sourceCount must match/i);
  });
});
