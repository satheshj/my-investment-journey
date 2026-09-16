import { afterEach, describe, expect, it, vi } from "vitest";
import * as z from "zod";

import { publishedAllocationArtifactSchema } from "@/domain/portfolio/publication";
import { instrumentSchema } from "@/domain/portfolio/schemas";

import {
  buildPortfolioPublication,
  fetchDriveCsv,
  parseEcbRates,
  parsePortfolioCsv,
} from "../../scripts/sync-portfolio-drive.mjs";

const header =
  "as_of,instrument_id,instrument_name,instrument_type,listing_country,trading_currency,market_value,strategy_bucket,symbol,exchange";
const csv = `${header}
2026-10-04,india-fund,India Fund,mutual_fund,IN,INR,100,core,,
2026-10-03,new-us-stock,New US Stock,equity,US,USD,1,experimental,NEW,NASDAQ`;
const ecb = `<Cube><Cube time="2026-10-03"><Cube currency="USD" rate="2"/><Cube currency="INR" rate="100"/></Cube></Cube>`;

afterEach(() => vi.unstubAllGlobals());

describe("monthly Drive portfolio sync", () => {
  it("accepts new holdings and nearby dates, publishing only allocations", () => {
    const result = buildPortfolioPublication(csv, ecb, "2026-10-05", {
      asOf: "2026-09-15",
    });
    expect(() =>
      publishedAllocationArtifactSchema.parse(result.allocation),
    ).not.toThrow();
    expect(() => z.array(instrumentSchema).parse(result.instruments)).not.toThrow();
    expect(result.allocation.asOf).toBe("2026-10-03");
    expect(result.allocation.snapshotWindow).toEqual({
      oldest: "2026-10-03",
      newest: "2026-10-04",
    });
    expect(
      result.allocation.holdings.map((holding) => holding.allocationPercent),
    ).toEqual(["66.67", "33.33"]);
    expect(result.instruments[1]?.id).toBe("new-us-stock");
    expect(JSON.stringify(result)).not.toMatch(/"marketValue"|"quantity"|"account"/);
  });

  it("rejects duplicates, stale dates, malformed values, and private metadata", () => {
    expect(() =>
      parsePortfolioCsv(`${csv}\n${csv.split("\n")[1]}`, "2026-10-05"),
    ).toThrow(/duplicate/);
    expect(() => parsePortfolioCsv(csv, "2026-10-12")).toThrow(/seven-day/);
    expect(() => parsePortfolioCsv(csv, "2026-10-05", "2026-10-04")).toThrow(/older/);
    expect(() =>
      parsePortfolioCsv(csv.replace(",100,core", ",-1,core"), "2026-10-05"),
    ).toThrow(/market_value/);
    expect(() =>
      parsePortfolioCsv(csv.replace("India Fund", "PAN ABCDE1234F"), "2026-10-05"),
    ).toThrow(/private/);
  });

  it("fails closed when a currency or recent exchange rate is missing", () => {
    expect(() => parseEcbRates(ecb, "2026-10-03", new Set(["INR", "CAD"]))).toThrow(
      /CAD/,
    );
    expect(() => parseEcbRates(ecb, "2026-10-12", new Set(["INR", "USD"]))).toThrow(
      /recent/,
    );
  });

  it("produces the same public artifacts from the same input", () => {
    const first = buildPortfolioPublication(csv, ecb, "2026-10-05");
    const second = buildPortfolioPublication(csv, ecb, "2026-10-05");
    expect(second).toEqual(first);
  });

  it("fails closed on Drive errors or ambiguous files", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(new Response("", { status: 503 })),
    );
    await expect(fetchDriveCsv("folder", "token")).rejects.toThrow(/HTTP 503/);
    vi.unstubAllGlobals();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(
        Response.json({
          files: [
            { id: "one", mimeType: "text/csv" },
            { id: "two", mimeType: "text/csv" },
          ],
        }),
      ),
    );
    await expect(fetchDriveCsv("folder", "token")).rejects.toThrow(/exactly one/);
  });
});
