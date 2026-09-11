import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PortfolioPage from "@/app/portfolio/page";

describe("PortfolioPage", () => {
  it("renders the verified allocation-only snapshot", () => {
    const { container } = render(<PortfolioPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Portfolio" })).toBeVisible();
    expect(screen.getByText("26 August 2026")).toBeVisible();
    expect(screen.getByText("Allocation percentages only")).toBeVisible();
    expect(screen.getByText("UTI Nifty 50 Index Fund")).toBeVisible();
    expect(screen.getByText("Vanguard S&P 500 ETF")).toBeVisible();
    expect(screen.getByText("NVIDIA Corporation")).toBeVisible();
    expect(screen.getByText("GE Vernova LLC")).toBeVisible();
    expect(container.querySelector('[data-motion-scope="portfolio"]')).not.toBeNull();
    expect(container.querySelectorAll("[data-portfolio-segment]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-portfolio-holding]")).toHaveLength(4);
    expect(
      screen.getByRole("img", { name: /four unequal fields of tactile paper squares/i }),
    ).toBeVisible();
  });

  it("shows strategy and geography summaries that each total 100 percent", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("76.04%")).toBeVisible();
    expect(screen.getByText("23.96%")).toBeVisible();
    expect(screen.getByText("50.98%", { selector: "dd" })).toBeVisible();
    expect(screen.getByText("49.02%", { selector: "dd" })).toBeVisible();
  });
});
