import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";

import styles from "../section-page.module.css";

export const metadata: Metadata = {
  title: "Learnings",
  description: "Genuine reflections from a beginner investor's evolving process.",
};

export default function LearningsPage() {
  return (
    <main className={styles.page} id="main-content">
      <PageIntro title="Learnings">
        <p>
          Reflections will be added when there is something genuine to say, not when an
          interface needs more content.
        </p>
      </PageIntro>
      <section className={styles.content} aria-labelledby="learning-status">
        <div className={styles.statusBlock}>
          <h2 id="learning-status">No published learning notes yet</h2>
          <p>
            Each future note will identify what changed, what evidence informed it, and
            where uncertainty remains.
          </p>
        </div>
      </section>
    </main>
  );
}
