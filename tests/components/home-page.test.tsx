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
    expect(container.querySelectorAll("[data-motion-timeline-entry]")).toHaveLength(3);
    expect(container.querySelectorAll("[data-motion-strategy-stage]")).toHaveLength(4);
  });

  it("labels future strategy separately from current holdings", () => {
    render(<HomePage />);

    expect(screen.getByText("Strategy direction")).toBeVisible();
    expect(screen.getByText("Research interest")).toBeVisible();
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
});
