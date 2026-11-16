// Each stage finishes before the next begins; shared by animation and tests.
export const HISTORY_STAGES = {
  grow: { start: 0, duration: 0.42 },
  hold: { start: 0.42, duration: 0.08 },
  caption: { start: 0.3, duration: 0.14 },
  logoOut: { start: 0.5, duration: 0.12 },
  heading: { start: 0.62, duration: 0.1 },
  paragraphs: { start: 0.72, duration: 0.28 },
} as const;
