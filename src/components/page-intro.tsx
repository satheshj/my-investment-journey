import type { ReactNode } from "react";

import styles from "./page-intro.module.css";

type PageIntroProps = {
  title: string;
  children: ReactNode;
};

export function PageIntro({ title, children }: PageIntroProps) {
  return (
    <header className={styles.intro}>
      <h1>{title}</h1>
      <div className={styles.copy}>{children}</div>
    </header>
  );
}
