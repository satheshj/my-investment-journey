import Link from "next/link";

import styles from "./section-page.module.css";

export default function NotFound() {
  return (
    <main className={styles.page} id="main-content">
      <div className={styles.content}>
        <div className={styles.statusBlock}>
          <h1>Page not found</h1>
          <p>The page may have moved, or the journey has not reached it yet.</p>
          <Link href="/">Return home</Link>
        </div>
      </div>
    </main>
  );
}
