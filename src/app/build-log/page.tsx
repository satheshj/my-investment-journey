import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";

import styles from "../section-page.module.css";

export const metadata: Metadata = {
  title: "Build Log",
  description: "Curated milestones from the design and engineering process.",
};

const milestones = [
  { title: "Canonical design system selected", state: "Complete" },
  { title: "Architecture and data contracts defined", state: "Complete" },
  { title: "Application foundation", state: "In progress" },
] as const;

export default function BuildLogPage() {
  return (
    <main className={styles.page} id="main-content">
      <PageIntro title="Build Log">
        <p>
          A curated record of product decisions, rejected alternatives, implementation,
          and verification.
        </p>
      </PageIntro>
      <section className={styles.content} aria-label="Build milestones">
        <ol className={styles.list}>
          {milestones.map((milestone) => (
            <li key={milestone.title}>
              <strong>{milestone.title}</strong>
              <span>{milestone.state}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
