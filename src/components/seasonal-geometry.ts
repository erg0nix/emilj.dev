export type Point = [number, number, number];

export function geometry(season = 'autumn'): Point[][] {
  const lines: Point[][] = [];
  if (season === 'winter') {
    for (let arm = 0; arm < 6; arm++) {
      const angle = arm * Math.PI / 3;
      for (let layer = 0; layer < 13; layer++) {
        const line: Point[] = [];
        for (let i = 0; i <= 100; i++) {
          const t = i / 100;
          const radius = t * 1.25;
          const branch = Math.sin(t * Math.PI * 5) * .09;
          const x = radius;
          const y = (layer - 6) * .014 + branch;
          line.push([
            x * Math.cos(angle) - y * Math.sin(angle),
            x * Math.sin(angle) + y * Math.cos(angle),
            Math.sin(t * 5) * .1,
          ]);
        }
        lines.push(line);
      }
      for (let j = 1; j < 5; j++) {
        for (const side of [-1, 1]) {
          const line: Point[] = [];
          for (let i = 0; i <= 34; i++) {
            const t = i / 34;
            const x = j * .23 + t * .19;
            const y = side * t * .24;
            line.push([
              x * Math.cos(angle) - y * Math.sin(angle),
              x * Math.sin(angle) + y * Math.cos(angle),
              t * .1,
            ]);
          }
          lines.push(line);
        }
      }
    }
  } else if (season === 'spring') {
    for (let petal = 0; petal < 5; petal++) {
      for (let row = 1; row < 20; row++) {
        const line: Point[] = [];
        const angle = petal * Math.PI * 2 / 5;
        for (let i = 0; i <= 90; i++) {
          const t = i / 90;
          const u = row / 20;
          const radius = .12 + Math.sin(t * Math.PI) * .94;
          const theta = angle + (t - .5) * .94 * u;
          line.push([
            radius * Math.cos(theta),
            radius * Math.sin(theta),
            .3 * Math.sin(t * Math.PI) * u,
          ]);
        }
        lines.push(line);
      }
    }
  } else if (season === 'summer') {
    for (let row = 0; row < 68; row++) {
      const line: Point[] = [];
      const latitude = (row / 67 - .5) * Math.PI;
      for (let i = 0; i <= 120; i++) {
        const t = i / 120 * Math.PI * 2;
        const radius = Math.cos(latitude);
        const ripple = 1 + .055 * Math.sin(t * 12 + latitude * 5);
        line.push([
          Math.cos(t) * radius * ripple,
          Math.sin(latitude) * ripple,
          Math.sin(t) * radius * ripple,
        ]);
      }
      lines.push(line);
    }
  } else {
    for (let row = 0; row <= 128; row++) {
      const line: Point[] = [];
      const v = .012 + row / 128 * .976;
      for (let i = 0; i <= 120; i++) {
        const u = i / 120 * 2 - 1;
        line.push(leafPoint(u, v));
      }
      lines.push(line);
    }
    for (let j = -8; j <= 8; j++) {
      const line: Point[] = [];
      for (let i = 1; i < 95; i++) {
        line.push(leafPoint(j / 9, i / 95));
      }
      lines.push(line);
    }
  }
  return lines;
}

function leafPoint(u: number, v: number): Point {
  const width = Math.pow(Math.sin(v * Math.PI), .82) * (.71 + .12 * Math.sin(v * 12));
  return [
    u * width,
    (v - .5) * 2.55,
    .48 * Math.abs(u) + .19 * Math.sin(v * 5) + .16 * u * Math.sin(v * 11),
  ];
}

export function project([x, y, z]: Point, turn = 0, tilt = 0): Point {
  const az = -.67;
  const ay = -.5 + turn;
  const ax = .48 + tilt;
  const xx = x * Math.cos(ay) + z * Math.sin(ay);
  const zz = -x * Math.sin(ay) + z * Math.cos(ay);
  const yy = y * Math.cos(ax) - zz * Math.sin(ax);
  const depth = y * Math.sin(ax) + zz * Math.cos(ax);
  const perspective = 3.8 / (3.8 + depth);
  return [
    (xx * Math.cos(az) - yy * Math.sin(az)) * perspective,
    (xx * Math.sin(az) + yy * Math.cos(az)) * perspective,
    depth,
  ];
}
