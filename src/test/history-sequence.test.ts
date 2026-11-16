import { describe, expect, it } from "vitest";
import { ABOUT_HISTORY_STAGES, HISTORY_STAGES } from "@/lib/history-sequence";

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

describe("About logo text reveal order", () => {
  it("reveals the caption only after the logo has enlarged", () => {
    expect(ABOUT_HISTORY_STAGES.caption.start).toBe(0.32);
    expect(ABOUT_HISTORY_STAGES.caption.start).toBeGreaterThanOrEqual(ABOUT_HISTORY_STAGES.grow.start + ABOUT_HISTORY_STAGES.grow.duration);
  });
  it("blurs the caption in by word over 0.3 of the sequence", () => {
    expect(ABOUT_HISTORY_STAGES.caption.duration).toBe(0.3);
  });
  it("reveals the definition only after the caption finishes", () => {
    expect(ABOUT_HISTORY_STAGES.definition.start).toBe(0.62);
    expect(ABOUT_HISTORY_STAGES.definition.start).toBeCloseTo(ABOUT_HISTORY_STAGES.caption.start + ABOUT_HISTORY_STAGES.caption.duration, 10);
  });
  it("keeps both texts visible before transitioning into the story", () => {
    expect(ABOUT_HISTORY_STAGES.logoOut.start).toBeGreaterThanOrEqual(ABOUT_HISTORY_STAGES.definition.start + ABOUT_HISTORY_STAGES.definition.duration);
    expect(ABOUT_HISTORY_STAGES.heading.start).toBeGreaterThanOrEqual(ABOUT_HISTORY_STAGES.logoOut.start + ABOUT_HISTORY_STAGES.logoOut.duration);
    expect(ABOUT_HISTORY_STAGES.paragraphs.start + ABOUT_HISTORY_STAGES.paragraphs.duration).toBe(1);
  });
});
