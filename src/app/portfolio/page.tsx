import type { CSSProperties } from "react";
import Decimal from "decimal.js";
import type { Metadata } from "next";

import { PortfolioMotion } from "@/components/portfolio-motion";
import { publishedPortfolioAllocation } from "@/data/portfolio/published-allocation";

import styles from "./portfolio.module.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A dated view of the author's real portfolio, published as allocation percentages.",
};

type AllocationStyle = CSSProperties & {
  "--allocation": string;
};

const segmentToneByInstrument: Record<string, string> = {
  "ge-vernova": styles.segmentAccentSoft!,
  nvidia: styles.segmentAccent!,
  "uti-nifty-50-index-fund": styles.segmentInk!,
  "vanguard-sp-500-etf": styles.segmentNeutral!,
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

function labelInstrumentType(value: string) {
  const labels: Record<string, string> = {
    equity: "Individual equity",
    etf: "Exchange-traded fund",
    mutual_fund: "Mutual fund",
  };

  return labels[value] ?? value;
}

function allocationFor(
  predicate: (holding: (typeof publishedPortfolioAllocation.holdings)[number]) => boolean,
) {
  return publishedPortfolioAllocation.holdings
    .filter(predicate)
    .reduce((total, holding) => total.plus(holding.allocationPercent), new Decimal(0))
    .toFixed(2);
}

export default function PortfolioPage() {
  const snapshot = publishedPortfolioAllocation;
  const coreAllocation = allocationFor((holding) => holding.strategyBucket === "core");
  const experimentalAllocation = allocationFor(
    (holding) => holding.strategyBucket === "experimental",
  );
  const indiaAllocation = allocationFor((holding) => holding.listingCountry === "IN");
  const usAllocation = allocationFor((holding) => holding.listingCountry === "US");
  const fxBasis = snapshot.calculationBasis.fx[0];

  return (
    <PortfolioMotion>
      <main className={styles.page} id="main-content">
        <header className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow} data-portfolio-hero-item>
              Verified snapshot
            </p>
            <h1 data-portfolio-hero-item>Portfolio</h1>
            <p className={styles.heroCopy} data-portfolio-hero-item>
              Four real holdings, shown as allocation percentages while balances and
              quantities stay private.
            </p>
          </div>
        </header>

        <dl className={styles.snapshotStrip} data-portfolio-hero-item>
          <div>
            <dt>As of</dt>
            <dd>{formatDate(snapshot.asOf)}</dd>
          </div>
          <div>
            <dt>Snapshot</dt>
            <dd>{snapshot.completeness === "complete" ? "Complete" : "Partial"}</dd>
          </div>
          <div>
            <dt>Public disclosure</dt>
            <dd>Allocation percentages only</dd>
          </div>
        </dl>

        <section
          className={styles.allocationSection}
          aria-labelledby="allocation-heading"
        >
          <header className={styles.sectionHeader} data-portfolio-heading>
            <h2 id="allocation-heading">Where the portfolio sits today.</h2>
            <p>
              Each holding is compared in {snapshot.calculationCurrency}, then reduced to
              its share of the whole portfolio.
            </p>
          </header>

          <figure className={styles.allocationFigure}>
            <div
              aria-label={`Allocation by holding: ${snapshot.holdings
                .map((holding) => `${holding.name} ${holding.allocationPercent} percent`)
                .join(", ")}`}
              className={styles.allocationBand}
              data-portfolio-allocation-band
              role="img"
            >
              {snapshot.holdings.map((holding) => (
                <span
                  aria-hidden="true"
                  className={`${styles.allocationSegment} ${segmentToneByInstrument[holding.instrumentId] ?? styles.segmentNeutral}`}
                  data-portfolio-segment
                  key={holding.instrumentId}
                  style={
                    {
                      "--allocation": holding.allocationPercent,
                    } as AllocationStyle
                  }
                >
                  {holding.allocationPercent}%
                </span>
              ))}
            </div>
            <figcaption>All published holding allocations total 100.00%.</figcaption>
          </figure>

          <ol className={styles.holdingList}>
            {snapshot.holdings.map((holding) => (
              <li data-portfolio-holding key={holding.instrumentId}>
                <div>
                  <h3>{holding.name}</h3>
                  <p>
                    {labelInstrumentType(holding.instrumentType)}.{" "}
                    {holding.strategyBucket === "core" ? "Core" : "Experimental"}.
                  </p>
                </div>
                <data value={holding.allocationPercent}>
                  {holding.allocationPercent}%
                </data>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.strategySection} aria-labelledby="strategy-heading">
          <header className={styles.sectionHeader} data-portfolio-heading>
            <h2 id="strategy-heading">Core is becoming the center.</h2>
            <p>
              Broad-market exposure now outweighs the individual-stock experiments that
              helped shape the strategy.
            </p>
          </header>
          <div className={styles.strategyComposition}>
            <article className={styles.coreBlock} data-portfolio-strategy>
              <p>Core</p>
              <strong>{coreAllocation}%</strong>
              <span>Nifty 50 and the S&amp;P 500</span>
            </article>
            <article className={styles.experimentalBlock} data-portfolio-strategy>
              <p>Experimental</p>
              <strong>{experimentalAllocation}%</strong>
              <span>Two individual equities</span>
            </article>
          </div>
        </section>

        <section className={styles.geographySection} aria-labelledby="geography-heading">
          <header className={styles.sectionHeader} data-portfolio-heading>
            <h2 id="geography-heading">Split across two markets.</h2>
            <p>
              The current snapshot is nearly balanced between Indian and US-listed
              exposure.
            </p>
          </header>
          <dl className={styles.geographyList}>
            <div data-portfolio-geography>
              <dt>India</dt>
              <dd>{indiaAllocation}%</dd>
            </div>
            <div data-portfolio-geography>
              <dt>United States</dt>
              <dd>{usAllocation}%</dd>
            </div>
          </dl>
        </section>

        <section
          className={styles.disclosureSection}
          aria-labelledby="disclosure-heading"
          data-portfolio-disclosure
        >
          <div>
            <h2 id="disclosure-heading">The public boundary stays narrow.</h2>
            <p>
              Names, strategy buckets, geography, instrument type, and allocation are
              public. Quantities, prices, cost basis, balances, and profit or loss stay
              private.
            </p>
          </div>
          {fxBasis ? (
            <p className={styles.calculationNote}>
              USD holdings use the latest available reference rate before the snapshot,
              dated {formatDate(fxBasis.asOf)}. Source:{" "}
              <a href={fxBasis.sourceUrl}>{fxBasis.sourceLabel}</a>.
            </p>
          ) : null}
        </section>
      </main>
    </PortfolioMotion>
  );
}
