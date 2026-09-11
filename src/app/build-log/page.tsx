import Image from "next/image";
import type { Metadata } from "next";

import interfaceProcessImage from "@/assets/images/build-log/interface-process.webp";
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
        <figure className={styles.routeFigure}>
          <div>
            <Image
              alt="Paper interface wireframes, geometric components, a ruler, and red thread arranged as a build sequence."
              height={941}
              sizes="(max-width: 80rem) 100vw, 80rem"
              src={interfaceProcessImage}
              width={1672}
            />
          </div>
          <figcaption>
            Product judgment, interface structure, and verification stay part of the
            record.
          </figcaption>
        </figure>
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
