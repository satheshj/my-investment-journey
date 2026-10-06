import { derivePortfolio } from "./derive";
import type { Instrument, PortfolioSnapshot, StrategyBucket } from "./schemas";

export type PublicPortfolioHolding = {
  allocationPercent: string;
  instrumentId: string;
  instrumentType: Instrument["instrumentType"];
  listingCountry: string;
  name: string;
  strategyBucket: StrategyBucket;
  symbol?: string;
};

export type PublicPortfolioAllocation = {
  asOf: string;
  calculationCurrency: string;
  completeness: PortfolioSnapshot["completeness"];
  holdings: PublicPortfolioHolding[];
};

export function derivePublicPortfolioAllocation(
  snapshot: PortfolioSnapshot,
  instruments: readonly Instrument[],
): PublicPortfolioAllocation {
  const derived = derivePortfolio(snapshot, instruments);

  return {
    asOf: derived.asOf,
    calculationCurrency: derived.baseCurrency,
    completeness: snapshot.completeness,
    holdings: derived.holdings.map(({ holding, instrument, portfolioWeightPercent }) => ({
      allocationPercent: portfolioWeightPercent,
      instrumentId: instrument.id,
      instrumentType: instrument.instrumentType,
      listingCountry: instrument.listingCountry,
      name: instrument.name,
      strategyBucket: holding.strategyBucket,
      ...(instrument.symbol ? { symbol: instrument.symbol } : {}),
    })),
  };
}
