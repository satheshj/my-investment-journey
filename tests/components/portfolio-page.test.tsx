import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PortfolioPage from "@/app/portfolio/page";

describe("PortfolioPage", () => {
  it("renders the verified allocation-only snapshot", () => {
    const { container } = render(<PortfolioPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Portfolio" })).toBeVisible();
    expect(screen.getByText("15 September 2026")).toBeVisible();
    expect(screen.getByText("Allocation percentages only")).toBeVisible();
    expect(screen.getByText("UTI Nifty 50 Index Fund")).toBeVisible();
    expect(screen.getByText("Vanguard S&P 500 ETF")).toBeVisible();
    expect(screen.getByText("NVIDIA Corporation")).toBeVisible();
    expect(screen.getByText("GE Vernova LLC")).toBeVisible();
    expect(screen.getByText("Procure Space ETF")).toBeVisible();
    expect(screen.getByText("Motilal Oswal Nifty India Defence ETF")).toBeVisible();
    expect(screen.getAllByText("Exchange-traded fund. Thematic.")).toHaveLength(2);
    expect(container.querySelector('[data-motion-scope="portfolio"]')).not.toBeNull();
    expect(container.querySelectorAll("[data-portfolio-segment]")).toHaveLength(6);
    expect(container.querySelectorAll("[data-portfolio-holding]")).toHaveLength(6);
    expect(
      screen.getByRole("img", { name: /four unequal fields of tactile paper squares/i }),
    ).toBeVisible();
  });

  it("shows strategy and geography summaries that each total 100 percent", () => {
    render(<PortfolioPage />);

    expect(screen.getByText("68.75%")).toBeVisible();
    expect(screen.getByText("18.26%")).toBeVisible();
    expect(screen.getByText("12.99%")).toBeVisible();
    expect(screen.getByText("47.53%", { selector: "dd" })).toBeVisible();
    expect(screen.getByText("52.47%", { selector: "dd" })).toBeVisible();
  });
});
