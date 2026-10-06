import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import GlobalMarketsPage from "@/app/global-markets/page";
import { globalMarketDigest } from "@/data/global-markets/digest";

describe("GlobalMarketsPage", () => {
  it("publishes the automated Indian and global market edition", () => {
    render(<GlobalMarketsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "India + World Market Notes" }),
    ).toBeVisible();
    expect(screen.getByText("Signals, not instructions.")).toBeVisible();
    expect(screen.getByText(/India \/ \d+ global/)).toBeVisible();
    expect(screen.getAllByRole("link", { name: "Read the original" })).toHaveLength(
      globalMarketDigest.articles.length,
    );
  });

  it("connects every article to a portfolio question", () => {
    const { container } = render(<GlobalMarketsPage />);

    expect(screen.getAllByRole("heading", { name: "Portfolio question" })).toHaveLength(
      globalMarketDigest.articles.length,
    );
    expect(container.querySelectorAll('a[target="_blank"]')).toHaveLength(
      globalMarketDigest.articles.length,
    );
  });
});
