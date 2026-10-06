export type PortfolioImportSource = {
  name: string;
  text: string;
};

export type PublishedAllocationImport = {
  asOf: string;
  holdings: Array<{
    allocationPercent: string;
    instrumentId: string;
    strategyBucket: "core" | "thematic" | "experimental";
  }>;
};

export function parseCsv(text: string): string[][];

export function buildPublishedAllocation(sources: {
  indianEtfSource?: PortfolioImportSource;
  mutualFundSource: PortfolioImportSource;
  usSource: PortfolioImportSource;
}): PublishedAllocationImport;
