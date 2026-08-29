import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";

describe("HomePage", () => {
  it("renders the complete eight-chapter narrative", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Investing in public, uncertainty included.",
      }),
    ).toBeVisible();

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(7);
    expect(screen.getByText("Dates remain unpublished.")).toBeVisible();
    expect(screen.getByText("Waiting for a verified snapshot")).toBeVisible();
    expect(screen.getByText(/No mistake entry has been published yet/)).toBeVisible();
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
});
