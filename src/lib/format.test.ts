import { describe, it, expect } from "vitest";
import { formatCurrency, formatCompactCurrency, formatNumber, formatDate } from "./format";

describe("formatCurrency", () => {
  it("formats whole numbers without decimals", () => {
    expect(formatCurrency(1234)).toBe("$1,234");
  });

  it("formats fractional amounts with two decimals", () => {
    expect(formatCurrency(49.99)).toBe("$49.99");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0");
  });
});

describe("formatCompactCurrency", () => {
  it("compacts thousands", () => {
    expect(formatCompactCurrency(2500)).toBe("$2.5K");
  });

  it("compacts millions", () => {
    expect(formatCompactCurrency(1_200_000)).toBe("$1.2M");
  });
});

describe("formatNumber", () => {
  it("adds comma separators", () => {
    expect(formatNumber(1234)).toBe("1,234");
  });

  it("handles small numbers", () => {
    expect(formatNumber(42)).toBe("42");
  });
});

describe("formatDate", () => {
  it("formats ISO date to long form", () => {
    expect(formatDate("2026-03-14T08:00:00Z")).toBe("March 14, 2026");
  });
});
