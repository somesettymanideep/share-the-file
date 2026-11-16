// Each stage finishes before the next begins; shared by animation and tests.
export const HISTORY_STAGES = {
  grow: { start: 0, duration: 0.42 },
  hold: { start: 0.42, duration: 0.08 },
  logoOut: { start: 0.5, duration: 0.12 },
  heading: { start: 0.62, duration: 0.1 },
  paragraphs: { start: 0.72, duration: 0.28 },
} as const;

// The original About page adds two reveals; the independent copy keeps its sequence.
// The caption blurs in word by word and takes 0.3 of the sequence to finish.
export const ABOUT_HISTORY_STAGES = {
  grow: { start: 0, duration: 0.32 },
  caption: { start: 0.32, duration: 0.3 },
  definition: { start: 0.62, duration: 0.06 },
  hold: { start: 0.68, duration: 0.03 },
  logoOut: { start: 0.71, duration: 0.05 },
  heading: { start: 0.76, duration: 0.08 },
  paragraphs: { start: 0.84, duration: 0.16 },
} as const;
