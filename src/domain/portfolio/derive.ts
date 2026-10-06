import Decimal from "decimal.js";

import type { HoldingSnapshot, Instrument, PortfolioSnapshot } from "./schemas";

type DerivedHolding = {
  instrument: Instrument;
  holding: HoldingSnapshot;
  marketValueInBaseCurrency: string;
  costBasisInBaseCurrency: string;
  unrealizedPnl: string;
  unrealizedPnlPercent: string | null;
  portfolioWeightPercent: string;
};

export type DerivedPortfolio = {
  snapshotId: string;
  asOf: string;
  baseCurrency: string;
  totalMarketValue: string;
  totalCostBasis: string;
  totalUnrealizedPnl: string;
  holdings: DerivedHolding[];
};

function decimal(value: string) {
  return new Decimal(value);
}

function canonical(value: Decimal) {
  return value.toDecimalPlaces(6).toString();
}

function conversionRate(snapshot: PortfolioSnapshot, fromCurrency: string) {
  if (fromCurrency === snapshot.baseCurrency) {
    return new Decimal(1);
  }

  const rate = snapshot.fxRates.find(
    (candidate) =>
      candidate.fromCurrency === fromCurrency &&
      candidate.toCurrency === snapshot.baseCurrency,
  );

  if (!rate) {
    throw new Error(
      `Missing ${fromCurrency} to ${snapshot.baseCurrency} FX rate for ${snapshot.id}`,
    );
  }

  return decimal(rate.rate);
}

export function derivePortfolio(
  snapshot: PortfolioSnapshot,
  instruments: readonly Instrument[],
): DerivedPortfolio {
  const instrumentsById = new Map(
    instruments.map((instrument) => [instrument.id, instrument]),
  );

  const prepared = snapshot.holdings.map((holding) => {
    const instrument = instrumentsById.get(holding.instrumentId);

    if (!instrument) {
      throw new Error(`Unknown instrument ${holding.instrumentId}`);
    }

    const rate = conversionRate(snapshot, holding.marketValue.currency);
    const marketValueInBaseCurrency = decimal(holding.marketValue.amount).mul(rate);
    const costBasisInBaseCurrency = decimal(holding.costBasis.amount).mul(rate);
    const unrealizedPnl = decimal(holding.marketValue.amount).minus(
      holding.costBasis.amount,
    );
    const costBasis = decimal(holding.costBasis.amount);

    return {
      instrument,
      holding,
      marketValueInBaseCurrency,
      costBasisInBaseCurrency,
      unrealizedPnl,
      unrealizedPnlPercent: costBasis.isZero()
        ? null
        : unrealizedPnl.div(costBasis).mul(100),
    };
  });

  const totalMarketValue = prepared.reduce(
    (total, entry) => total.plus(entry.marketValueInBaseCurrency),
    new Decimal(0),
  );
  const totalCostBasis = prepared.reduce(
    (total, entry) => total.plus(entry.costBasisInBaseCurrency),
    new Decimal(0),
  );

  return {
    snapshotId: snapshot.id,
    asOf: snapshot.asOf,
    baseCurrency: snapshot.baseCurrency,
    totalMarketValue: canonical(totalMarketValue),
    totalCostBasis: canonical(totalCostBasis),
    totalUnrealizedPnl: canonical(totalMarketValue.minus(totalCostBasis)),
    holdings: prepared.map((entry) => ({
      instrument: entry.instrument,
      holding: entry.holding,
      marketValueInBaseCurrency: canonical(entry.marketValueInBaseCurrency),
      costBasisInBaseCurrency: canonical(entry.costBasisInBaseCurrency),
      unrealizedPnl: canonical(entry.unrealizedPnl),
      unrealizedPnlPercent:
        entry.unrealizedPnlPercent === null
          ? null
          : canonical(entry.unrealizedPnlPercent),
      portfolioWeightPercent: totalMarketValue.isZero()
        ? "0"
        : canonical(entry.marketValueInBaseCurrency.div(totalMarketValue).mul(100)),
    })),
  };
}
