import "@fontsource/dm-serif-display/400.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "My Investment Journey",
    template: "%s | My Investment Journey",
  },
  description:
    "A beginner investor documenting decisions, mistakes, lessons, and an evolving investment framework.",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fbf8f1",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
