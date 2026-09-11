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

test("site header stays sticky and recedes after scrolling settles", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const header = page.locator("body > header");

  await expect(header).toHaveCSS("position", "sticky");
  await page.evaluate(() => window.scrollTo({ top: 900 }));
  await expect(header).toHaveAttribute("data-scroll-state", "active");
  await expect(header).toHaveAttribute("data-scroll-state", "idle", {
    timeout: 2_000,
  });
  await expect(header).toHaveCSS("opacity", "0");

  await page.evaluate(() => window.scrollBy({ top: 20 }));
  await expect(header).toHaveAttribute("data-scroll-state", "active");
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
  const strategyVisual = page.locator("[data-motion-strategy-visual]");
  const strategyStages = page.locator("[data-motion-strategy-stage]");
  const finalChapter = page.getByRole("heading", {
    level: 2,
    name: "The journey grows when the evidence does.",
  });

  await expect(hero).toHaveCSS("opacity", "1");
  await expect(hero).toHaveCSS("transform", "none");
  await expect(strategyVisual).toHaveCSS("transform", "none");
  await expect(strategyStages).toHaveCount(4);

  for (const stage of await strategyStages.all()) {
    await expect(stage).toHaveCSS("opacity", "1");
  }

  await expect(finalChapter).toBeVisible();
});

test("chapter-specific motion settles as the story advances", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");

  const timelineEntry = page.locator("[data-motion-timeline-entry]").last();
  const strategyStage = page.locator("[data-motion-strategy-stage]").last();
  const strategyVisual = page.locator("[data-motion-strategy-visual]");
  const allocationTile = page.locator("[data-motion-home-allocation-tile]").last();
  const strategyDirection = page.locator("[data-motion-strategy-direction]").first();
  const closingRoute = page.locator("[data-motion-closing]").last();

  await timelineEntry.scrollIntoViewIfNeeded();
  await expect(timelineEntry).toHaveCSS("opacity", "1");

  await strategyDirection.scrollIntoViewIfNeeded();
  await expect(strategyStage).toHaveCSS("opacity", "1");
  await expect(strategyVisual.locator("..")).toHaveClass(/pin-spacer/);
  await expect(allocationTile).toHaveCSS("opacity", "1");

  const strategyImageTransform = await strategyVisual
    .locator("img")
    .evaluate((image) => getComputedStyle(image).transform);
  expect(strategyImageTransform).not.toBe("none");

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

    const editorialImages = page.locator(
      "[data-motion-image] img, [data-motion-strategy-visual] img",
    );
    await expect(editorialImages).toHaveCount(2);

    for (const image of await editorialImages.all()) {
      await image.scrollIntoViewIfNeeded();
    }

    await expect
      .poll(() =>
        editorialImages.evaluateAll((images) =>
          images.every(
            (image) =>
              image instanceof HTMLImageElement &&
              image.complete &&
              image.naturalWidth === 1536 &&
              image.naturalHeight === 1024,
          ),
        ),
      )
      .toBe(true);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  }
});

test("learnings publishes the current beginner framework", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/learnings/");

  await expect(
    page.getByRole("heading", { level: 2, name: "Consistency before complexity" }),
  ).toBeVisible();
  await expect(page.getByText("Build the monthly habit first")).toBeVisible();
  await expect(page.getByText(/Madurai Veeran and Zerodha channels/i)).toBeVisible();
  await expect(
    page.getByRole("link", { name: /IN-SPACe decadal vision/i }),
  ).toHaveAttribute("href", /inspace\.gov\.in/);
  await expect(page.locator("[data-learning-media] img")).toHaveCount(3);
  await expect(page.locator("[data-learning-principle]")).toHaveCount(4);
  await expect(page.locator("[data-learning-question]")).toHaveCount(3);
});

test("learnings keeps its editorial reading order at narrow widths", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  for (const width of [320, 640]) {
    await page.setViewportSize({ height: 900, width });
    await page.goto("/learnings/");

    for (const image of await page.locator("[data-learning-media] img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
    }

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );

    expect(hasHorizontalOverflow).toBe(false);
  }
});

test("learnings pins its open-question guide as the evidence panels advance", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/learnings/");

  const guide = page.locator("[data-learning-question-guide]");
  const lastQuestion = page.locator("[data-learning-question]").last();

  await lastQuestion.scrollIntoViewIfNeeded();
  await expect(lastQuestion).toHaveCSS("opacity", "1");
  await expect(guide.locator("..")).toHaveClass(/pin-spacer/);
});

test("secondary routes load their contextual editorial imagery", async ({ page }) => {
  for (const route of ["/about/", "/build-log/", "/portfolio/"]) {
    await page.goto(route);

    const image = page.locator("main figure img").first();
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect
      .poll(() =>
        image.evaluate(
          (element) => element instanceof HTMLImageElement && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
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
