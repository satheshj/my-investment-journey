import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the complete eight-chapter narrative", () => {
    const { container } = render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Investing in public, uncertainty included.",
      }),
    ).toBeVisible();

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(7);
    expect(screen.getByText("Dates remain unpublished.")).toBeVisible();
    expect(screen.getByText("Verified allocation published")).toBeVisible();
    expect(screen.getByText(/No mistake entry has been published yet/)).toBeVisible();
    expect(container.querySelector('[data-motion-scope="homepage"]')).not.toBeNull();
    expect(container.querySelectorAll("[data-motion-heading]")).toHaveLength(7);
    expect(container.querySelectorAll("[data-motion-image]")).toHaveLength(1);
    expect(container.querySelectorAll("[data-motion-strategy-visual]")).toHaveLength(1);
    expect(container.querySelectorAll("[data-motion-timeline-entry]")).toHaveLength(3);
    expect(container.querySelectorAll("[data-motion-strategy-stage]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-motion-home-allocation-tile]")).toHaveLength(
      100,
    );
    expect(container.querySelectorAll("[data-motion-allocation-row]")).toHaveLength(4);
  });

  it("uses meaningful editorial imagery without embedding financial claims", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("img", {
        name: /open paper notebook with scattered cut-paper circles/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("img", {
        name: /scattered paper fragments resolving into one large charcoal circle/i,
      }),
    ).toBeVisible();
    expect(
      screen.getByText(/moving from scattered experiments toward a stable core/i),
    ).toBeVisible();
    expect(
      screen.getByRole("img", { name: /current allocation by holding/i }),
    ).toBeVisible();
  });

  it("labels future strategy separately from current holdings", () => {
    render(<HomePage />);

    expect(screen.getByText("Strategy direction")).toBeVisible();
    expect(screen.getAllByText("Research interest")).toHaveLength(2);
    expect(
      screen.getByText(
        "These are strategy directions and research interests. They are not a list of current holdings.",
      ),
    ).toBeVisible();
  });

  it("states the allocation-only publication policy", () => {
    render(<HomePage />);

    expect(screen.getByText("Allocation percentages only")).toBeVisible();
    expect(
      screen.getByText("Quantities, prices, cost basis, and monetary values"),
    ).toBeVisible();
    expect(screen.getByText("Verified publication checks")).toBeVisible();
  });

  it("publishes the author's real current learning states", () => {
    render(<HomePage />);

    expect(screen.getByText("Monthly consistency")).toBeVisible();
    expect(screen.getAllByText("Current approach").length).toBeGreaterThan(0);
    expect(screen.getByText("India beyond Nifty 50")).toBeVisible();
    expect(screen.getByText("Space and defence")).toBeVisible();
  });
});
