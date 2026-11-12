import { describe, expect, it } from "vitest";
import { HISTORY_STAGES, slideArrival } from "@/lib/history-sequence";

describe("History horizontal sequence", () => {
  it("fills the logo before the track starts moving", () => {
    expect(HISTORY_STAGES.fill.start).toBe(0);
    expect(HISTORY_STAGES.travel.start).toBeGreaterThanOrEqual(HISTORY_STAGES.fill.start + HISTORY_STAGES.fill.duration);
  });
  it("reaches the final slide exactly at the end, then releases", () => {
    expect(slideArrival(3, 3)).toBeCloseTo(1);
  });
  it("brings slides in order", () => {
    expect(slideArrival(1, 3)).toBeLessThan(slideArrival(2, 3));
  });
});
