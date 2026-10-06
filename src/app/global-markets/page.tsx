import Image from "next/image";
import type { Metadata } from "next";

import globalMarketsHero from "@/assets/images/global-markets/global-markets-hero.png";
import { globalMarketDigest } from "@/data/global-markets/digest";

import styles from "./global-markets.module.css";

export const metadata: Metadata = {
  title: "Indian and Global Market Notes",
  description:
    "An automated weekly reading brief covering Indian and global markets, valuation, rates, risk, and portfolio questions.",
};

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export default function GlobalMarketsPage() {
  const [leadArticle, ...otherArticles] = globalMarketDigest.articles;
  const indianArticleCount = globalMarketDigest.articles.filter(
    (article) => article.sourceRegion === "India",
  ).length;
  const globalArticleCount = globalMarketDigest.articles.length - indianArticleCount;

  return (
    <main className={styles.page} id="main-content">
      <section className={styles.hero} aria-labelledby="global-markets-heading">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Automated weekly reading</p>
          <h1 id="global-markets-heading">
            <span>India + World</span> <span>Market Notes</span>
          </h1>
          <p>
            Important ideas from Indian and global market writing, connected to questions
            worth asking before changing a portfolio.
          </p>
          <a href="#weekly-edition">Read this edition</a>
        </div>
        <figure className={styles.heroFigure}>
          <Image
            alt="Layered paper maps connected across continents by a red thread and graphite market paths."
            height={1024}
            priority
            sizes="(max-width: 64rem) 100vw, 52vw"
            src={globalMarketsHero}
            width={1536}
          />
          <figcaption>
            Global events become useful only after they meet a clear question.
          </figcaption>
        </figure>
      </section>

      <section
        className={styles.edition}
        id="weekly-edition"
        aria-labelledby="edition-heading"
      >
        <header className={styles.editionHeader}>
          <div>
            <p>This week</p>
            <h2 id="edition-heading">Signals, not instructions.</h2>
          </div>
          <dl>
            <div>
              <dt>Updated</dt>
              <dd>{formatDate(globalMarketDigest.generatedAt)}</dd>
            </div>
            <div>
              <dt>Coverage</dt>
              <dd>
                {indianArticleCount} India / {globalArticleCount} global
              </dd>
            </div>
            <div>
              <dt>Cadence</dt>
              <dd>Weekly</dd>
            </div>
          </dl>
        </header>

        {leadArticle ? (
          <article className={styles.leadStory}>
            <div className={styles.storyMeta}>
              <span>{leadArticle.topic}</span>
              <time dateTime={leadArticle.publishedAt}>
                {formatDate(leadArticle.publishedAt)}
              </time>
            </div>
            <div className={styles.leadBody}>
              <div>
                <p className={styles.sourceName}>
                  {leadArticle.source} / {leadArticle.sourceRegion}
                </p>
                <h3>{leadArticle.title}</h3>
                <a href={leadArticle.url} rel="noreferrer" target="_blank">
                  Read the original
                </a>
              </div>
              <div className={styles.storyNotes}>
                <section aria-labelledby={`${leadArticle.id}-note`}>
                  <h4 id={`${leadArticle.id}-note`}>Important note</h4>
                  <p>{leadArticle.keyNote}</p>
                </section>
                {leadArticle.notableFact ? (
                  <section aria-labelledby={`${leadArticle.id}-fact`}>
                    <h4 id={`${leadArticle.id}-fact`}>Number worth checking</h4>
                    <p>{leadArticle.notableFact}</p>
                  </section>
                ) : null}
                <section aria-labelledby={`${leadArticle.id}-lens`}>
                  <h4 id={`${leadArticle.id}-lens`}>Portfolio question</h4>
                  <p>{leadArticle.portfolioLens}</p>
                </section>
              </div>
            </div>
          </article>
        ) : null}

        <div className={styles.storyGrid}>
          {otherArticles.map((article) => (
            <article className={styles.story} key={article.id}>
              <div className={styles.storyMeta}>
                <span>{article.topic}</span>
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </div>
              <p className={styles.sourceName}>
                {article.source} / {article.sourceRegion}
              </p>
              <h3>{article.title}</h3>
              <div className={styles.compactNote}>
                <h4>Important note</h4>
                <p>{article.keyNote}</p>
              </div>
              {article.notableFact ? (
                <blockquote>
                  <p>{article.notableFact}</p>
                </blockquote>
              ) : null}
              <div className={styles.compactLens}>
                <h4>Portfolio question</h4>
                <p>{article.portfolioLens}</p>
              </div>
              <a href={article.url} rel="noreferrer" target="_blank">
                Read the original
              </a>
            </article>
          ))}
        </div>
      </section>

      <aside className={styles.method} aria-labelledby="method-heading">
        <div>
          <h2 id="method-heading">How the page updates</h2>
          <p>
            Approved Indian and global feeds are checked automatically. Recent stories are
            ranked for market relevance, deduplicated, and limited to two entries per
            source.
          </p>
        </div>
        <ul>
          <li>Source links remain attached to every note.</li>
          <li>Two Indian stories are reserved when valid items are available.</li>
          <li>A failed feed does not block healthy sources.</li>
          <li>A total outage keeps the previous valid edition online.</li>
          <li>These notes support research. They do not issue buy or sell calls.</li>
        </ul>
      </aside>
    </main>
  );
}
