import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import startingPointImage from "@/assets/images/homepage/starting-point.webp";
import strategyEvolutionImage from "@/assets/images/homepage/strategy-evolution.webp";
import { HomepageMotion } from "@/components/homepage-motion";
import {
  buildMilestones,
  closingRoutes,
  learningTopics,
  portfolioAllocations,
  portfolioPublication,
  reflectionContract,
  startingContext,
  strategyDirections,
  strategyProgression,
} from "@/content/homepage";

import styles from "./page.module.css";

type AllocationStyle = CSSProperties & {
  "--allocation": string;
};

const allocationTiles = Array.from({ length: 100 }, (_, tileIndex) => {
  const tileMidpoint = tileIndex + 0.5;
  let cumulativeAllocation = 0;
  let holdingIndex = portfolioAllocations.length - 1;

  portfolioAllocations.some((holding, index) => {
    cumulativeAllocation += Number(holding.allocationPercent);

    if (tileMidpoint <= cumulativeAllocation) {
      holdingIndex = index;
      return true;
    }

    return false;
  });

  return { holdingIndex, tileIndex };
});

export default function HomePage() {
  return (
    <HomepageMotion>
      <main className={styles.page} id="main-content">
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <h1 data-motion-hero-item>Investing in public, uncertainty included.</h1>
            <p data-motion-hero-item>
              I&apos;m a beginner investor and frontend developer documenting real
              decisions, changing assumptions, and the product built around them.
            </p>
            <div className={styles.actions} data-motion-hero-item>
              <a className={styles.primaryAction} href="#starting-point">
                Begin the story
              </a>
              <Link className={styles.secondaryAction} href="/portfolio/">
                View portfolio
              </Link>
            </div>
          </div>
        </section>

        <section
          className={`${styles.chapter} ${styles.startingChapter}`}
          id="starting-point"
          aria-labelledby="starting-heading"
        >
          <div className={styles.startingInner}>
            <header className={styles.chapterHeader} data-motion-heading>
              <h2 id="starting-heading">
                The beginning was small, scattered, and useful.
              </h2>
              <p>
                The early portfolio mixed Indian mutual funds, US equities, and ETFs
                before a consistent strategy framework existed.
              </p>
              <p className={styles.contextNote}>Dates remain unpublished.</p>
            </header>
            <div className={styles.timelineShell} data-motion-timeline>
              <span
                aria-hidden="true"
                className={styles.timelineTrack}
                data-motion-timeline-track
              />
              <ol className={styles.timeline}>
                {startingContext.map((entry) => (
                  <li data-motion-timeline-entry key={entry.title}>
                    <h3>{entry.title}</h3>
                    <p>{entry.body}</p>
                  </li>
                ))}
              </ol>
            </div>
            <figure
              className={`${styles.editorialFigure} ${styles.startingFigure}`}
              data-motion-image
            >
              <div className={styles.editorialImageFrame}>
                <Image
                  alt="An open paper notebook with scattered cut-paper circles connected by an uneven red line."
                  height={1024}
                  sizes="(max-width: 80rem) 100vw, 80rem"
                  src={startingPointImage}
                  width={1536}
                />
              </div>
              <figcaption>
                Small pieces, an unfinished page, and a line that only gradually finds
                direction.
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          className={`${styles.chapter} ${styles.portfolioChapter}`}
          aria-labelledby="portfolio-heading"
        >
          <div className={styles.portfolioInner}>
            <header className={styles.portfolioIntro}>
              <div className={styles.chapterHeader} data-motion-heading>
                <p className={styles.portfolioEyebrow}>02 / Current position</p>
                <h2 id="portfolio-heading">The portfolio now has a public baseline.</h2>
                <p>
                  A dated snapshot is published as allocation percentages, giving the
                  journey a factual starting point without revealing account scale.
                </p>
              </div>
              <dl className={styles.portfolioSnapshot} data-motion-publication>
                <div>
                  <dt>Snapshot date</dt>
                  <dd>{portfolioPublication.asOf}</dd>
                </div>
                <div>
                  <dt>Published view</dt>
                  <dd>{portfolioPublication.instrumentCount} holdings · 100%</dd>
                </div>
              </dl>
            </header>

            <div className={styles.portfolioComposition} data-motion-portfolio-sequence>
              <figure className={styles.homeAllocationFigure}>
                <div className={styles.allocationFigureHeader}>
                  <div>
                    <span>Allocation field</span>
                    <strong>A portfolio in 100 parts</strong>
                  </div>
                  <span>Each square ≈ 1%</span>
                </div>
                <div
                  aria-label={`Current allocation by holding: ${portfolioAllocations
                    .map(
                      (holding) => `${holding.name} ${holding.allocationPercent} percent`,
                    )
                    .join(", ")}`}
                  className={styles.homeAllocationGrid}
                  data-motion-home-allocation
                  role="img"
                >
                  {allocationTiles.map(({ holdingIndex, tileIndex }) => (
                    <span
                      aria-hidden="true"
                      data-motion-home-allocation-tile
                      data-tone={holdingIndex}
                      key={tileIndex}
                    />
                  ))}
                </div>
                <figcaption>
                  The field rounds each tile to roughly one percentage point. Exact
                  published values appear alongside it.
                </figcaption>
              </figure>

              <ol className={styles.allocationLedger}>
                {portfolioAllocations.map((holding, index) => (
                  <li data-motion-allocation-row key={holding.name}>
                    <div className={styles.allocationIdentity}>
                      <span data-tone={index}>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{holding.name}</h3>
                    </div>
                    <data value={holding.allocationPercent}>
                      {holding.allocationPercent}%
                    </data>
                    <div className={styles.allocationMeasure} aria-hidden="true">
                      <span
                        data-tone={index}
                        style={
                          {
                            "--allocation": `${holding.allocationPercent}%`,
                          } as AllocationStyle
                        }
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.publicationState}>
              <div className={styles.publicationStatus} data-motion-publication>
                <span>Publication status</span>
                <strong>{portfolioPublication.status}</strong>
                <p>
                  {portfolioPublication.instrumentCount} holdings published as of{" "}
                  {portfolioPublication.asOf}.
                </p>
              </div>
              <div className={styles.publicationBoundary} data-motion-publication>
                <span>Disclosure boundary</span>
                <dl>
                  <div>
                    <dt>Public</dt>
                    <dd>{portfolioPublication.disclosure}</dd>
                  </div>
                  <div>
                    <dt>Private</dt>
                    <dd>{portfolioPublication.hiddenFields}</dd>
                  </div>
                </dl>
              </div>
              <div className={styles.publicationRequirements} data-motion-publication>
                <p>Verified publication checks</p>
                <ul>
                  {portfolioPublication.verification.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ul>
              </div>
            </div>

            <Link className={styles.portfolioLink} href="/portfolio/">
              Inspect the complete portfolio snapshot
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section
          className={`${styles.chapter} ${styles.strategyChapter}`}
          aria-labelledby="strategy-heading"
        >
          <div className={styles.strategyInner}>
            <header className={styles.chapterHeader} data-motion-heading>
              <h2 id="strategy-heading">The framework is becoming clearer.</h2>
              <p>
                The direction is shifting from isolated experiments toward broad-market
                exposure with a smaller thematic research layer.
              </p>
            </header>

            <div className={styles.strategyStory} data-motion-strategy-story>
              <figure
                className={`${styles.editorialFigure} ${styles.strategyVisual}`}
                data-motion-strategy-visual
              >
                <div className={styles.editorialImageFrame}>
                  <Image
                    alt="Scattered paper fragments resolving into one large charcoal circle with a smaller red circle beside it."
                    data-motion-strategy-image
                    height={1024}
                    sizes="(max-width: 48rem) 100vw, 58vw"
                    src={strategyEvolutionImage}
                    width={1536}
                  />
                </div>
                <figcaption>
                  A visual metaphor for moving from scattered experiments toward a stable
                  core and a smaller thematic orbit.
                </figcaption>
              </figure>

              <ol className={styles.strategyProgression} data-motion-strategy-progression>
                {strategyProgression.map((stage) => (
                  <li data-motion-strategy-stage key={stage.title}>
                    <h3>{stage.title}</h3>
                    <p>{stage.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.strategyDirections}>
              {strategyDirections.map((direction) => (
                <section
                  aria-label={direction.bucket}
                  data-motion-strategy-direction
                  key={direction.bucket}
                >
                  <div className={styles.directionHeader}>
                    <h3>{direction.bucket}</h3>
                    <span>{direction.status}</span>
                  </div>
                  <ul>
                    {direction.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <p className={styles.strategyCaveat} data-motion-strategy-caveat>
              These describe strategy roles and research themes. The verified snapshot
              above remains the source of truth for current holdings.
            </p>
          </div>
        </section>

        <section
          className={`${styles.chapter} ${styles.reflectionChapter}`}
          aria-labelledby="reflection-heading"
        >
          <div className={styles.reflectionInner}>
            <header className={styles.chapterHeader} data-motion-heading>
              <h2 id="reflection-heading">Reflection starts with evidence.</h2>
              <p>
                No mistake entry has been published yet. The interface will not invent one
                to make the story feel complete.
              </p>
            </header>
            <dl className={styles.reflectionContract}>
              {reflectionContract.map((part) => (
                <div data-motion-reflection key={part.title}>
                  <dt>{part.title}</dt>
                  <dd>{part.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          className={`${styles.chapter} ${styles.learningChapter}`}
          aria-labelledby="learning-heading"
        >
          <div className={styles.learningInner}>
            <header className={styles.chapterHeader} data-motion-heading>
              <h2 id="learning-heading">Questions still in motion.</h2>
              <p>
                These are active areas of study, not polished conclusions or investment
                recommendations.
              </p>
            </header>
            <ol className={styles.learningIndex}>
              {learningTopics.map((topic) => (
                <li data-motion-learning key={topic.title}>
                  <div>
                    <h3>{topic.title}</h3>
                    <span>{topic.status}</span>
                  </div>
                  <p>{topic.body}</p>
                </li>
              ))}
            </ol>
            <Link className={styles.textLink} data-motion-learning href="/learnings/">
              Read learnings
            </Link>
          </div>
        </section>

        <section
          className={`${styles.chapter} ${styles.buildChapter}`}
          aria-labelledby="build-heading"
        >
          <div className={styles.buildInner}>
            <header className={styles.buildHeader} data-motion-heading>
              <h2 id="build-heading">The interface has its own audit trail.</h2>
              <p>
                Product judgment, rejected directions, architecture, and verification
                remain part of the public work.
              </p>
              <Link className={styles.textLink} href="/build-log/">
                Read build log
              </Link>
            </header>
            <ol className={styles.buildMilestones}>
              {buildMilestones.map((milestone) => (
                <li data-motion-build key={milestone.title}>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.evidence}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className={`${styles.chapter} ${styles.closingChapter}`}
          aria-labelledby="closing-heading"
        >
          <div className={styles.closingInner}>
            <header className={styles.chapterHeader} data-motion-heading>
              <h2 id="closing-heading">The journey grows when the evidence does.</h2>
              <p>
                New snapshots, decisions, mistakes, and lessons will appear when they are
                ready to be published honestly.
              </p>
            </header>
            <nav className={styles.closingRoutes} aria-label="Explore the project">
              {closingRoutes.map((route) => (
                <Link data-motion-closing href={route.href} key={route.href}>
                  <span>{route.label}</span>
                  <small>{route.body}</small>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </main>
    </HomepageMotion>
  );
}
