import { describe, expect, it } from "vitest";
import { HISTORY_STAGES } from "@/lib/history-sequence";

describe("History storytelling order", () => {
  it("completes enlargement before moving the logo", () => {
    expect(HISTORY_STAGES.enlarge.start).toBe(0);
    expect(HISTORY_STAGES.move.start).toBeGreaterThanOrEqual(HISTORY_STAGES.enlarge.start + HISTORY_STAGES.enlarge.duration);
  });
  it("keeps history hidden until the logo movement finishes", () => {
    expect(HISTORY_STAGES.reveal.start).toBeGreaterThanOrEqual(HISTORY_STAGES.move.start + HISTORY_STAGES.move.duration);
  });
});