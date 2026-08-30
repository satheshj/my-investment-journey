import { expect, test } from "@playwright/test";

test("primary routes are reachable", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Investing in public, uncertainty included.",
    }),
  ).toBeVisible();

  await page.getByRole("link", { name: "Portfolio", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Portfolio" })).toBeVisible();
});

test("primary navigation works at a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 412, height: 915 });
  await page.goto("/");

  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1, name: "About" })).toBeVisible();
});

test("home exposes semantic landmarks and focusable skip navigation", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.locator('nav[aria-label="Primary navigation"]')).toBeVisible();
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("footer")).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("img:not([alt])")).toHaveCount(0);

  const skipLink = page.locator('a[href="#main-content"]');
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await expect(skipLink).toHaveAttribute("href", "#main-content");
});

test("reduced motion keeps the complete homepage visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const hero = page.locator("[data-motion-hero-item]").first();
  const finalChapter = page.getByRole("heading", {
    level: 2,
    name: "The journey grows when the evidence does.",
  });

  await expect(hero).toHaveCSS("opacity", "1");
  await expect(hero).toHaveCSS("transform", "none");
  await expect(finalChapter).toBeVisible();
});

test("chapter-specific motion settles as the story advances", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const timelineEntry = page.locator("[data-motion-timeline-entry]").last();
  const strategyStage = page.locator("[data-motion-strategy-stage]").last();
  const strategyDirection = page.locator("[data-motion-strategy-direction]").first();
  const closingRoute = page.locator("[data-motion-closing]").last();

  await timelineEntry.scrollIntoViewIfNeeded();
  await expect(timelineEntry).toHaveCSS("opacity", "1");

  await strategyDirection.scrollIntoViewIfNeeded();
  await expect(strategyStage).toHaveCSS("opacity", "1");

  await closingRoute.scrollIntoViewIfNeeded();
  await expect(closingRoute).toHaveCSS("opacity", "1");
});

test("homepage preserves its reading order at narrow and zoom-equivalent widths", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const width of [320, 640]) {
    await page.setViewportSize({ height: 900, width });
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Investing in public, uncertainty included.",
      }),
    ).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  }
});

test("portfolio remains complete when motion is reduced", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/portfolio/");

  const firstSegment = page.locator("[data-portfolio-segment]").first();

  await expect(firstSegment).toHaveCSS("opacity", "1");
  await expect(firstSegment).toHaveCSS("transform", "none");
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "The public boundary stays narrow.",
    }),
  ).toBeVisible();
});

test("portfolio allocation motion settles into the published composition", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/portfolio/");

  const allocationBand = page.locator("[data-portfolio-allocation-band]");
  const lastSegment = page.locator("[data-portfolio-segment]").last();

  await allocationBand.scrollIntoViewIfNeeded();
  await expect(lastSegment).toHaveCSS("transform", "none");
});

test("portfolio publishes percentages without currency amounts or narrow overflow", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const width of [320, 640]) {
    await page.setViewportSize({ height: 900, width });
    await page.goto("/portfolio/");

    const bodyText = await page.locator("body").innerText();
    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );

    expect(bodyText).not.toContain("$");
    expect(bodyText).not.toContain("₹");
    expect(hasHorizontalOverflow).toBe(false);
  }
});
