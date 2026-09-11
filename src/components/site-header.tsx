"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isActive, setIsActive] = useState(true);

  const clearIdleTimer = useCallback(() => {
    if (idleTimer.current) {
      clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
  }, []);

  const showHeader = useCallback(() => {
    clearIdleTimer();
    setIsActive(true);
  }, [clearIdleTimer]);

  const queueHeaderFade = useCallback(() => {
    clearIdleTimer();

    if (
      window.scrollY <= 8 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsActive(true);
      return;
    }

    idleTimer.current = setTimeout(() => setIsActive(false), 900);
  }, [clearIdleTimer]);

  useEffect(() => {
    const handleScroll = () => {
      showHeader();
      queueHeaderFade();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (
      window.scrollY > 8 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      idleTimer.current = setTimeout(() => setIsActive(false), 900);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearIdleTimer();
    };
  }, [clearIdleTimer, queueHeaderFade, showHeader]);

  return (
    <header
      className={`${styles.header} ${isActive ? styles.headerActive : styles.headerIdle}`}
      data-scroll-state={isActive ? "active" : "idle"}
      onBlur={queueHeaderFade}
      onFocus={showHeader}
      onPointerEnter={showHeader}
      onPointerLeave={queueHeaderFade}
    >
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
