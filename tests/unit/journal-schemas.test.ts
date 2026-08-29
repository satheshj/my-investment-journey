import { describe, expect, it } from "vitest";

import { journalDatasetSchema, reflectionSchema } from "@/domain/journal/schemas";

describe("journal contracts", () => {
  it("requires a reflection to identify its subject", () => {
    const result = reflectionSchema.safeParse({
      id: "sample-reflection",
      reflectedOn: "2026-08-27",
      learning: "This is explicitly invented fixture content.",
      wouldChooseAgain: "unsure",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a reflection dated before its decision", () => {
    const result = journalDatasetSchema.safeParse({
      decisions: [
        {
          id: "sample-decision",
          decidedOn: "2026-08-27",
          subject: { kind: "strategy", strategyKey: "sample-strategy" },
          decisionType: "research",
          confidence: "unknown",
          why: "Invented fixture reasoning.",
        },
      ],
      reflections: [
        {
          id: "sample-reflection",
          decisionId: "sample-decision",
          reflectedOn: "2026-08-26",
          learning: "Invented fixture learning.",
          wouldChooseAgain: "not_applicable",
        },
      ],
      plans: [],
      researchInterests: [],
    });

    expect(result.success).toBe(false);
  });
});
