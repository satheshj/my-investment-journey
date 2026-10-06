import { describe, expect, it } from "vitest";

import { buildPublishedAllocation } from "../../scripts/import-holdings.mjs";

describe("portfolio holdings import", () => {
  it("combines mutual funds, Indian ETFs, and US holdings into a private-safe allocation", () => {
    const publication = buildPublishedAllocation({
      mutualFundSource: {
        name: "mutual-funds.csv",
        text: `,,,,,,Mutual Funds Holdings - Tue Sep 15 2026
Fund Name,AMC Name,Category,Sub-Category,Plan Type,Option Type,NAV ₹,Units,Invested Amt ₹,Current Value ₹
UTI Nifty 50 Index Fund,UTI,Equity,Index Fund,Direct,Growth,164.79,17.59,2999.84,2899.14`,
      },
      indianEtfSource: {
        name: "indian-etfs.csv",
        text: `Indian ETF Holdings - Tue Sep 15 2026
ETF Name,Quantity,LTP ₹
Motilal Oswal Nifty India Defence ETF,4,107.84`,
      },
      usSource: {
        name: "us-portfolio_15-Sep-2026.csv",
        text: `Stock Name,1D Change,Day P&L ($),Quantity,LTP ($),Avg Buy Price ($),Invested Amount ($),Current Value ($),Weight,P&L ($)
GE Vernova LLC,-8.49,-0.38,0.00471,875.96,1053.92,4.96,4.12,10.73,-0.83
NVIDIA Corporation,-3.29,-0.18,0.02555,211.1,194.5,4.96,5.39,14.03,0.42
Procure Space ETF,-0.76,-0.06,0.20629,42.95,43.45,8.96,8.86,23.05,-0.1
Vanguard S&P 500 ETF,-0.44,-0.08,0.02866,699.43,693.35,19.87,20.04,52.16,0.17`,
      },
    });

    expect(publication.asOf).toBe("2026-09-15");
    expect(publication.holdings).toEqual([
      {
        allocationPercent: "41.37",
        instrumentId: "uti-nifty-50-index-fund",
        strategyBucket: "core",
      },
      {
        allocationPercent: "27.38",
        instrumentId: "vanguard-sp-500-etf",
        strategyBucket: "core",
      },
      {
        allocationPercent: "12.10",
        instrumentId: "procure-space-etf",
        strategyBucket: "thematic",
      },
      {
        allocationPercent: "7.36",
        instrumentId: "nvidia",
        strategyBucket: "experimental",
      },
      {
        allocationPercent: "6.16",
        instrumentId: "motilal-oswal-nifty-india-defence-etf",
        strategyBucket: "thematic",
      },
      {
        allocationPercent: "5.63",
        instrumentId: "ge-vernova",
        strategyBucket: "experimental",
      },
    ]);
    expect(JSON.stringify(publication)).not.toMatch(
      /quantity|unit|price|nav|cost|marketValue|currentValue|invested|profit|loss|p&l/i,
    );
  });
});
