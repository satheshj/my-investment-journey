import type { PortfolioDataset } from "@/domain/portfolio/schemas";

// These values are invented test data. They must never appear in production content.
export const portfolioFixture = {
  instruments: [
    {
      id: "sample-india-index-fund",
      name: "Sample India Index Fund",
      instrumentType: "mutual_fund",
      listingCountry: "IN",
      tradingCurrency: "INR",
    },
    {
      id: "sample-us-equity-etf",
      name: "Sample US Equity ETF",
      symbol: "SAMPLE",
      instrumentType: "etf",
      listingCountry: "US",
      exchange: "NYSE",
      tradingCurrency: "USD",
    },
  ],
  snapshots: [
    {
      id: "sample-snapshot-2026-08-27",
      asOf: "2026-08-27",
      baseCurrency: "INR",
      completeness: "complete",
      fxRates: [
        {
          fromCurrency: "USD",
          toCurrency: "INR",
          rate: "80",
          asOf: "2026-08-27",
          sourceLabel: "Invented test rate",
        },
      ],
      holdings: [
        {
          instrumentId: "sample-india-index-fund",
          quantity: "10",
          costBasis: { amount: "900", currency: "INR" },
          marketValue: { amount: "1000", currency: "INR" },
          strategyBucket: "core",
        },
        {
          instrumentId: "sample-us-equity-etf",
          quantity: "1",
          costBasis: { amount: "9", currency: "USD" },
          marketValue: { amount: "10", currency: "USD" },
          strategyBucket: "experimental",
        },
      ],
      source: {
        kind: "manual",
        importedAt: "2026-08-27T08:00:00.000Z",
        label: "Invented fixture",
      },
    },
  ],
  transactions: [],
} satisfies PortfolioDataset;
