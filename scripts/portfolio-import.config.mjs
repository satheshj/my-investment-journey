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
    "Motilal Oswal Nifty India Defence ETF": {
      instrumentId: "motilal-oswal-nifty-india-defence-etf",
      strategyBucket: "thematic",
    },
    "Procure Space ETF": {
      instrumentId: "procure-space-etf",
      strategyBucket: "thematic",
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
    "2026-09-15": {
      asOf: "2026-09-11",
      fromCurrency: "USD",
      rate: "95.7245",
      sourceLabel: "MSEI reference-rate archive",
      sourceUrl:
        "https://www.msei.in/markets/currency/historical-data/rbireferenceratearchives",
      toCurrency: "INR",
    },
  },
};
