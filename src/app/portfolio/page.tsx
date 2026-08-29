import type { Metadata } from "next";

import { PageIntro } from "@/components/page-intro";

import styles from "../section-page.module.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Validated holdings and the reasoning connected to them.",
};

export default function PortfolioPage() {
  return (
    <main className={styles.page} id="main-content">
      <PageIntro title="Portfolio">
        <p>
          Real holdings will be published only after their source, valuation date, and
          currency basis have been validated.
        </p>
      </PageIntro>
      <section className={styles.content} aria-labelledby="portfolio-status">
        <div className={styles.split}>
          <div>
            <h2 id="portfolio-status">What this page will show</h2>
            <p>
              Holdings, allocation, decisions, and dated changes in strategy, with a clear
              route back to the underlying facts.
            </p>
          </div>
          <div>
            <h2>What it will keep separate</h2>
            <p>
              Planned investments and research interests will never be presented as
              current ownership.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
