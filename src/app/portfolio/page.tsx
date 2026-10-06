import type { CSSProperties } from "react";
import Decimal from "decimal.js";
import Image from "next/image";
import type { Metadata } from "next";

import publicAllocationImage from "@/assets/images/portfolio/public-allocation.webp";
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
  "motilal-oswal-nifty-india-defence-etf": styles.segmentThematicSoft!,
  nvidia: styles.segmentAccent!,
  "procure-space-etf": styles.segmentThematic!,
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

function labelStrategyBucket(value: string) {
  const labels: Record<string, string> = {
    core: "Core",
    experimental: "Experimental",
    thematic: "Thematic",
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
  const thematicAllocation = allocationFor(
    (holding) => holding.strategyBucket === "thematic",
  );
  const fxBasis = snapshot.calculationBasis.fx;
  const countries = [
    ...new Set(snapshot.holdings.map((holding) => holding.listingCountry)),
  ];
  const countryNames = new Intl.DisplayNames("en", { type: "region" });
  const bucketDescriptions = {
    core: `${snapshot.holdings.filter((holding) => holding.strategyBucket === "core").length} holdings`,
    thematic: `${snapshot.holdings.filter((holding) => holding.strategyBucket === "thematic").length} holdings`,
    experimental: `${snapshot.holdings.filter((holding) => holding.strategyBucket === "experimental").length} holdings`,
  };

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
              {snapshot.holdings.length} real holdings, shown as allocation percentages
              while balances and quantities stay private.
            </p>
          </div>
        </header>

        <dl className={styles.snapshotStrip} data-portfolio-hero-item>
          <div>
            <dt>As of</dt>
            <dd>
              {formatDate(snapshot.asOf)}
              {snapshot.snapshotWindow &&
              snapshot.snapshotWindow.newest !== snapshot.snapshotWindow.oldest
                ? ` to ${formatDate(snapshot.snapshotWindow.newest)}`
                : ""}
            </dd>
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

        <figure className={styles.portfolioEditorial} data-portfolio-editorial>
          <div>
            <Image
              alt="Four unequal fields of tactile paper squares connected by a red thread."
              height={941}
              sizes="(max-width: 80rem) 100vw, 80rem"
              src={publicAllocationImage}
              width={1672}
            />
          </div>
          <figcaption>
            Holdings grouped without exposing the account values beneath them.
          </figcaption>
        </figure>

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
                    {labelStrategyBucket(holding.strategyBucket)}.
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
            <h2 id="strategy-heading">Strategy at a glance.</h2>
            <p>
              The current mix of core, thematic, and experimental holdings, calculated
              from this snapshot.
            </p>
          </header>
          <div className={styles.strategyComposition}>
            <article className={styles.coreBlock} data-portfolio-strategy>
              <p>Core</p>
              <strong>{coreAllocation}%</strong>
              <span>{bucketDescriptions.core}</span>
            </article>
            <article className={styles.thematicBlock} data-portfolio-strategy>
              <p>Thematic</p>
              <strong>{thematicAllocation}%</strong>
              <span>{bucketDescriptions.thematic}</span>
            </article>
            <article className={styles.experimentalBlock} data-portfolio-strategy>
              <p>Experimental</p>
              <strong>{experimentalAllocation}%</strong>
              <span>{bucketDescriptions.experimental}</span>
            </article>
          </div>
        </section>

        <section className={styles.geographySection} aria-labelledby="geography-heading">
          <header className={styles.sectionHeader} data-portfolio-heading>
            <h2 id="geography-heading">Where the holdings are listed.</h2>
            <p>
              Listing-country exposure based on each holding&apos;s share of the
              portfolio.
            </p>
          </header>
          <dl className={styles.geographyList}>
            {countries.map((country) => (
              <div data-portfolio-geography key={country}>
                <dt>{countryNames.of(country) ?? country}</dt>
                <dd>{allocationFor((holding) => holding.listingCountry === country)}%</dd>
              </div>
            ))}
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
          {fxBasis.length > 0 ? (
            <div className={styles.calculationNote}>
              <p>Foreign-currency holdings use these reference rates:</p>
              <ul>
                {fxBasis.map((rate) => (
                  <li key={rate.fromCurrency}>
                    {rate.fromCurrency} to {rate.toCurrency}: {rate.rate ?? "recorded"},
                    dated {formatDate(rate.asOf)}. Source:{" "}
                    <a href={rate.sourceUrl}>{rate.sourceLabel}</a>.
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </main>
    </PortfolioMotion>
  );
}
