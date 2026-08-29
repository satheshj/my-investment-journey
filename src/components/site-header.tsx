"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./site-header.module.css";

const routes = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/learnings", label: "Learnings" },
  { href: "/build-log", label: "Build Log" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.wordmark} href="/">
          My Investment Journey
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          {routes.map((route) => {
            const isCurrent =
              route.href === "/" ? pathname === "/" : pathname.startsWith(route.href);

            return (
              <Link
                className={styles.link}
                href={route.href}
                aria-current={isCurrent ? "page" : undefined}
                key={route.href}
              >
                {route.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
