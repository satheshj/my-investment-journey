import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";

import styles from "../section-page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Why this investment journey and frontend project exists.",
};

export default function AboutPage() {
  return (
    <main className={styles.page} id="main-content">
      <PageIntro title="About">
        <p>
          This project combines a beginner’s investment journal with a frontend
          engineering portfolio.
        </p>
      </PageIntro>
      <section className={styles.content} aria-labelledby="about-position">
        <div className={styles.contentNarrow}>
          <h2 id="about-position">Learning without pretending authority</h2>
          <p>
            Small investments, incomplete knowledge, changing opinions, gains, and
            mistakes are all part of the record. The goal is to show how the thinking
            evolves and how the product is built.
          </p>
          <p>
            This is a personal learning journey, not individualized financial advice.
            Visitors should conduct their own research.
          </p>
        </div>
      </section>
    </main>
  );
}
