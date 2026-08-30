import Link from "next/link";

import { HomepageMotion } from "@/components/homepage-motion";
import {
  buildMilestones,
  closingRoutes,
  learningTopics,
  portfolioPublication,
  reflectionContract,
  startingContext,
  strategyDirections,
  strategyProgression,
} from "@/content/homepage";

import styles from "./page.module.css";

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
          </div>
        </section>

        <section
          className={`${styles.chapter} ${styles.portfolioChapter}`}
          aria-labelledby="portfolio-heading"
        >
          <div className={styles.portfolioInner}>
            <header className={styles.chapterHeader} data-motion-heading>
              <h2 id="portfolio-heading">The portfolio now has a public baseline.</h2>
              <p>
                A dated snapshot is published as allocation percentages, giving the
                journey a factual starting point without revealing account scale.
              </p>
            </header>
            <div className={styles.publicationState}>
              <div className={styles.publicationSummary} data-motion-publication>
                <span>Publication status</span>
                <strong>{portfolioPublication.status}</strong>
                <p>
                  {portfolioPublication.instrumentCount} holdings are published as of{" "}
                  {portfolioPublication.asOf}.
                </p>
                <p className={styles.publicationPolicy}>
                  <span>Public display</span>
                  {portfolioPublication.disclosure}
                </p>
                <p className={styles.publicationPolicy}>
                  <span>Kept private</span>
                  {portfolioPublication.hiddenFields}
                </p>
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

            <ol className={styles.strategyProgression} data-motion-strategy-progression>
              {strategyProgression.map((stage) => (
                <li data-motion-strategy-stage key={stage.title}>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                </li>
              ))}
            </ol>

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
              These are strategy directions and research interests. They are not a list of
              current holdings.
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
                    <span>In progress</span>
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
