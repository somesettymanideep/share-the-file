import { describe, expect, it } from "vitest";
import { HISTORY_STAGES } from "@/lib/history-sequence";

describe("History storytelling order", () => {
  it("grows the logo from the very start", () => {
    expect(HISTORY_STAGES.grow.start).toBe(0);
  });
  it("holds the filled logo before it leaves", () => {
    expect(HISTORY_STAGES.hold.start).toBeGreaterThanOrEqual(HISTORY_STAGES.grow.start + HISTORY_STAGES.grow.duration);
    expect(HISTORY_STAGES.logoOut.start).toBeGreaterThanOrEqual(HISTORY_STAGES.hold.start + HISTORY_STAGES.hold.duration);
  });
  it("reveals the heading only after the logo is gone", () => {
    expect(HISTORY_STAGES.heading.start).toBeGreaterThanOrEqual(HISTORY_STAGES.logoOut.start + HISTORY_STAGES.logoOut.duration);
  });
  it("shows paragraphs after the heading and finishes within the timeline", () => {
    expect(HISTORY_STAGES.paragraphs.start).toBeGreaterThanOrEqual(HISTORY_STAGES.heading.start + HISTORY_STAGES.heading.duration);
    expect(HISTORY_STAGES.paragraphs.start + HISTORY_STAGES.paragraphs.duration).toBeLessThanOrEqual(1);
  });
});
