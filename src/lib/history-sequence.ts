// Each stage finishes before the next begins; shared by animation and tests.
// fill: the logo fills in place on the first slide; travel: the track slides right-to-left.
export const HISTORY_STAGES = {
  fill: { start: 0, duration: 0.2 },
  travel: { start: 0.2, duration: 0.8 },
} as const;

/** Timeline position at which content slide `index` (1-based) is fully in view. */
export function slideArrival(index: number, contentSlides: number) {
  return HISTORY_STAGES.travel.start + (index / contentSlides) * HISTORY_STAGES.travel.duration;
}
