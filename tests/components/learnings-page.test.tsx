import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import LearningsPage from "@/app/learnings/page";

describe("LearningsPage", () => {
  it("publishes the first authentic beginner-investor note", () => {
    const { container } = render(<LearningsPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Learnings" })).toBeVisible();
    expect(
      screen.getByRole("heading", { level: 2, name: "Consistency before complexity" }),
    ).toBeVisible();
    expect(screen.getByText(/Madurai Veeran and Zerodha channels/i)).toBeVisible();
    expect(screen.getByText("Build the monthly habit first")).toBeVisible();
    expect(screen.getByText("Is Nifty 50 broad enough?")).toBeVisible();
    expect(
      screen.getByText("Can the space supply chain become investable?"),
    ).toBeVisible();
    expect(screen.getByText("What role could gold play?")).toBeVisible();
    expect(screen.getByText(/I have not adopted or invested/i)).toBeVisible();
    expect(screen.queryByText("No published learning notes yet")).not.toBeInTheDocument();
    expect(container.querySelector('[data-motion-scope="learnings"]')).not.toBeNull();
    expect(container.querySelectorAll("[data-learning-principle]")).toHaveLength(4);
    expect(container.querySelectorAll("[data-learning-question]")).toHaveLength(3);
  });

  it("uses contextual editorial imagery with meaningful alternatives", () => {
    render(<LearningsPage />);

    expect(
      screen.getByRole("img", { name: /open blank notebook, graphite pencil/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("img", { name: /paper pieces moving from scattered clusters/i }),
    ).toBeVisible();
    expect(
      screen.getByRole("img", {
        name: /graphite orbital paths and branching red threads/i,
      }),
    ).toBeVisible();
  });

  it("links external claims to primary sources", () => {
    render(<LearningsPage />);

    expect(
      screen.getByRole("link", {
        name: "Berkshire Hathaway 2013 shareholder letter",
      }),
    ).toHaveAttribute("href", "https://www.berkshirehathaway.com/letters/2013ltr.pdf");
    expect(
      screen.getByRole("link", { name: "IN-SPACe decadal vision press release" }),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "NSE Indices: Nifty LargeMidcap 250" }),
    ).toBeVisible();
  });
});
