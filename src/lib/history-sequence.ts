// Each stage finishes before the next begins; shared by animation and tests.
export const HISTORY_STAGES = {
  enlarge: { start: 0, duration: 0.36 },
  move: { start: 0.36, duration: 0.28 },
  reveal: { start: 0.64, duration: 0.26 },
  hold: { start: 0.9, duration: 0.1 },
} as const;