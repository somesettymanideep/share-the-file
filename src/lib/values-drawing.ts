type Point = readonly [number, number];

function resample(vertices: Point[]): Point[] {
  const result: Point[] = [];
  vertices.slice(1).forEach((end, index) => {
    const start = vertices[index];
    if (!start) return;
    const steps = Math.ceil(Math.hypot(end[0] - start[0], end[1] - start[1]) / 3);
    for (let step = 0; step < steps; step++) {
      const t = step / steps;
      result.push([start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t]);
    }
  });
  const last = vertices.at(-1);
  if (last) result.push(last);
  return result;
}

function arc(x: number, y: number, radius: number, start: number, end: number): Point[] {
  const steps = Math.ceil(radius * (end - start) * Math.PI / 180 / 3);
  return Array.from({ length: steps + 1 }, (_, index) => {
    const angle = (start + (end - start) * index / steps) * Math.PI / 180;
    return [x + radius * Math.cos(angle), y + radius * Math.sin(angle)] as Point;
  });
}

export const VALUES_DRAWING = [
  resample([[48, 917], [480, 917]]),
  resample([[78, 917], [78, 667], [257, 562]]),
  resample([[257, 562], [257, 917]]),
  resample([[186, 917], [186, 703], [442, 810], [442, 917]]),
  arc(350, 703, 93, 161, 424.5),
  arc(162, 917, 70, 180, 360),
];