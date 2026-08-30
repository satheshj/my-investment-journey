export const portfolioImportConfig = {
  baseCurrency: "INR",
  completeness: "complete",
  instruments: {
    "GE Vernova LLC": {
      instrumentId: "ge-vernova",
      strategyBucket: "experimental",
    },
    "NVIDIA Corporation": {
      instrumentId: "nvidia",
      strategyBucket: "experimental",
    },
    "UTI Nifty 50 Index Fund": {
      instrumentId: "uti-nifty-50-index-fund",
      strategyBucket: "core",
    },
    "Vanguard S&P 500 ETF": {
      instrumentId: "vanguard-sp-500-etf",
      strategyBucket: "core",
    },
  },
  fxRatesBySnapshotDate: {
    "2026-08-26": {
      asOf: "2026-08-25",
      fromCurrency: "USD",
      rate: "95.7143",
      sourceLabel: "MSEI reference-rate archive",
      sourceUrl:
        "https://beta.msei.in/markets/Currency/Historical-Data/RBIReferenceRateArchives",
      toCurrency: "INR",
    },
  },
};
