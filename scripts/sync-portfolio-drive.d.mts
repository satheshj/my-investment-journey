export type PortfolioCsvResult = {
  instruments: Array<{
    id: string;
    name: string;
    instrumentType: string;
    listingCountry: string;
    tradingCurrency: string;
    symbol?: string;
    exchange?: string;
  }>;
  holdings: Array<{
    instrumentId: string;
    strategyBucket: string;
    currency: string;
    marketValue: unknown;
  }>;
  oldest: string;
  newest: string;
};

export function parsePortfolioCsv(
  text: string,
  runDate: string,
  previousAsOf?: string,
): PortfolioCsvResult;

export function parseEcbRates(
  xml: string,
  asOf: string,
  currencies: Set<string>,
): Array<{ fromCurrency: string; toCurrency: string; rate: unknown; asOf: string }>;

export function fetchDriveCsv(folderId: string, token: string): Promise<string>;

export function buildPortfolioPublication(
  csv: string,
  ecbXml: string,
  runDate: string,
  previous?: { asOf: string },
): {
  instruments: PortfolioCsvResult["instruments"];
  allocation: {
    asOf: string;
    snapshotWindow: { oldest: string; newest: string };
    holdings: Array<{ instrumentId: string; allocationPercent: string }>;
  };
};
