import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageIntro } from "@/components/page-intro";

describe("PageIntro", () => {
  it("renders one page heading and supporting content", () => {
    render(
      <PageIntro title="Sample page">
        <p>Sample supporting copy.</p>
      </PageIntro>,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Sample page" })).toBeVisible();
    expect(screen.getByText("Sample supporting copy.")).toBeVisible();
  });
});
