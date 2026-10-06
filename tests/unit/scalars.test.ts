import { describe, expect, it } from "vitest";

import {
  decimalStringSchema,
  isoDateSchema,
  positiveDecimalStringSchema,
} from "@/domain/shared/scalars";

describe("shared scalar contracts", () => {
  it("accepts canonical decimal strings", () => {
    expect(decimalStringSchema.parse("0.0042")).toBe("0.0042");
    expect(positiveDecimalStringSchema.parse("10.5")).toBe("10.5");
  });

  it.each(["01", "1,000", "₹10", "1e3", "NaN", "-1"])(
    "rejects non-canonical decimal input %s",
    (value) => {
      expect(decimalStringSchema.safeParse(value).success).toBe(false);
    },
  );

  it("rejects impossible calendar dates", () => {
    expect(isoDateSchema.safeParse("2026-02-29").success).toBe(false);
    expect(isoDateSchema.safeParse("2024-02-29").success).toBe(true);
  });
});
