import Link from "next/link";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.context}>
          <p>A personal investment journal and frontend engineering project.</p>
          <p className={styles.disclaimer}>
            This is a learning journey, not individualized financial advice.
          </p>
        </div>
        <Link href="/about/">Context and disclaimer</Link>
      </div>
    </footer>
  );
}
