import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import consistencyRhythmImage from "@/assets/images/learnings/consistency-rhythm.webp";
import learningNotebookImage from "@/assets/images/learnings/learning-notebook.webp";
import openQuestionsImage from "@/assets/images/learnings/open-questions.webp";
import { LearningsMotion } from "@/components/learnings-motion";
import { beginnerFramework } from "@/content/learnings/beginner-framework";

import styles from "./learnings.module.css";

export const metadata: Metadata = {
  title: "Learnings",
  description: "Genuine reflections from a beginner investor's evolving process.",
};

export default function LearningsPage() {
  const publishedOn = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${beginnerFramework.publishedOn}T00:00:00Z`));

  return (
    <LearningsMotion>
      <main className={styles.page} id="main-content">
        <section className={styles.hero} aria-labelledby="learnings-heading">
          <div className={styles.heroCopy}>
            <p className={styles.heroKicker} data-learning-hero-item>
              Notes before conclusions
            </p>
            <h1 id="learnings-heading" data-learning-hero-item>
              Learnings
              <span className={styles.inlineImage} aria-hidden="true">
                <Image alt="" height={1402} src={learningNotebookImage} width={1122} />
              </span>
            </h1>
            <p data-learning-hero-item>
              A working record of what I understand, what I am testing, and what still
              needs evidence.
            </p>
            <a className={styles.heroLink} data-learning-hero-item href="#learning-note">
              Read the first note
            </a>
          </div>
          <figure
            className={styles.heroFigure}
            data-learning-hero-item
            data-learning-media
          >
            <div className={styles.imageFrame}>
              <Image
                alt="An open blank notebook, graphite pencil, paper circles, and a red thread arranged on warm textured paper."
                height={1402}
                priority
                sizes="(max-width: 64rem) 100vw, 42vw"
                src={learningNotebookImage}
                width={1122}
              />
            </div>
            <figcaption>
              A blank page is part of the method, not a gap to hide.
            </figcaption>
          </figure>
        </section>

        <div className={styles.editorialRail} aria-hidden="true">
          <div>
            <span>habit</span>
            <span>diversification</span>
            <span>index funds</span>
            <span>open questions</span>
            <span>patience</span>
            <span>habit</span>
            <span>diversification</span>
            <span>index funds</span>
            <span>open questions</span>
            <span>patience</span>
          </div>
        </div>

        <article className={styles.article} aria-labelledby="learning-note">
          <header className={styles.articleHeader}>
            <div>
              <p className={styles.status}>First published note</p>
              <h2 id="learning-note">{beginnerFramework.title}</h2>
            </div>
            <div className={styles.articleMeta}>
              <time dateTime={beginnerFramework.publishedOn}>{publishedOn}</time>
              <p>{beginnerFramework.summary}</p>
            </div>
          </header>

          <section className={styles.openingChapter} aria-label="How the framework began">
            <div className={styles.openingLead}>
              <p>{beginnerFramework.opening[0]}</p>
            </div>
            <div className={styles.openingPair}>
              <div className={styles.openingCopy}>
                {beginnerFramework.opening.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <figure className={styles.openingFigure} data-learning-media>
                <div className={styles.imageFrame}>
                  <Image
                    alt="Paper pieces moving from scattered clusters into a steady monthly rhythm along a red thread."
                    height={1024}
                    sizes="(max-width: 64rem) 100vw, 58vw"
                    src={consistencyRhythmImage}
                    width={1536}
                  />
                </div>
                <figcaption>
                  The aim is repeatability first; complexity can earn its place later.
                </figcaption>
              </figure>
            </div>
          </section>

          <section
            className={styles.frameworkChapter}
            aria-labelledby="current-framework"
          >
            <header className={styles.sectionLead}>
              <h3 id="current-framework">The framework I am using now</h3>
              <p>
                Four working principles. Each can change when better evidence arrives.
              </p>
            </header>
            <ol className={styles.principleGrid} data-learning-principles>
              {beginnerFramework.principles.map((principle) => (
                <li data-learning-principle key={principle.title}>
                  <div>
                    <span>{principle.status}</span>
                    <h4>{principle.title}</h4>
                  </div>
                  <p>{principle.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section
            className={styles.questionChapter}
            aria-labelledby="open-questions"
            data-learning-question-chapter
          >
            <div className={styles.questionGuide} data-learning-question-guide>
              <div>
                <h3 id="open-questions">What remains unresolved</h3>
                <p>
                  Research interests stay visibly separate from holdings and decisions.
                </p>
              </div>
              <figure className={styles.questionFigure} data-learning-media>
                <div className={styles.imageFrame}>
                  <Image
                    alt="Graphite orbital paths and branching red threads surrounding tactile paper circles."
                    height={1024}
                    sizes="(max-width: 64rem) 100vw, 34vw"
                    src={openQuestionsImage}
                    width={1536}
                  />
                </div>
                <figcaption>
                  Open questions remain open until the record changes.
                </figcaption>
              </figure>
            </div>
            <ol className={styles.questionList} data-learning-question-list>
              {beginnerFramework.questions.map((question) => (
                <li data-learning-question key={question.title}>
                  <details open>
                    <summary>
                      <span>{question.status}</span>
                      <h4>{question.title}</h4>
                    </summary>
                    <p>{question.body}</p>
                  </details>
                </li>
              ))}
            </ol>
          </section>

          <aside className={styles.sources} aria-labelledby="source-notes">
            <div>
              <h3 id="source-notes">Source notes</h3>
              <p>
                Videos are starting points for my questions. These primary sources support
                the external claims recorded in this note.
              </p>
            </div>
            <ul>
              {beginnerFramework.sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href}>{source.label}</a>
                  <p>{source.note}</p>
                </li>
              ))}
            </ul>
          </aside>

          <footer className={styles.nextStep}>
            <div>
              <p>Keep the facts close</p>
              <h3>See what the current portfolio actually contains.</h3>
            </div>
            <nav aria-label="Continue exploring">
              <Link href="/portfolio/">View the portfolio</Link>
              <Link href="/build-log/">See how the journal is built</Link>
            </nav>
          </footer>
        </article>
      </main>
    </LearningsMotion>
  );
}
