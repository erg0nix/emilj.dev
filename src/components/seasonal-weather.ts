export interface WeatherFrame {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
  season: string;
  light: boolean;
  accent: string;
  muted: string;
}

const noise = (seed: number) => {
  const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
};

function stroke(s: WeatherFrame, alpha: number, width: number, color = s.accent) {
  s.ctx.strokeStyle = s.ctx.fillStyle = color;
  s.ctx.globalAlpha = alpha;
  s.ctx.lineWidth = width;
  s.ctx.lineCap = 'round';
  s.ctx.lineJoin = 'round';
}

function line(s: WeatherFrame, points: number[][]) {
  s.ctx.beginPath();
  points.forEach(([x, y], index) => index ? s.ctx.lineTo(x, y) : s.ctx.moveTo(x, y));
  s.ctx.stroke();
}

function ellipse(s: WeatherFrame, x: number, y: number, rx: number, ry = rx, rotation = 0, fill = false) {
  s.ctx.beginPath();
  s.ctx.ellipse(x, y, rx, ry, rotation, 0, Math.PI * 2);
  fill ? s.ctx.fill() : s.ctx.stroke();
}

function leaf(s: WeatherFrame, x: number, y: number, size: number, angle: number) {
  const c = s.ctx;
  c.save();
  c.translate(x, y);
  c.rotate(angle);
  c.beginPath();
  c.moveTo(0, -size);
  c.bezierCurveTo(size, -size * .3, size, size * .5, 0, size);
  c.bezierCurveTo(-size, size * .3, -size, -size * .5, 0, -size);
  c.stroke();
  line(s, [[0, -size], [0, size * 1.3]]);
  c.restore();
}

export function drawWeather(s: WeatherFrame) {
  const { width: w, height: h, time: t, ctx: c, season } = s;
  const wind = 5;
  const count = w < 760 ? 42 : 95;
  for (let i = 0; i < count; i++) {
    const depth = .25 + noise(i + 5) * .75;
    const speed = season === 'autumn' ? 140 + depth * 120 : 16 + depth * 25;
    const y = (noise(i + 18) * h + t * speed) % (h + 36) - 18;
    const x = (noise(i + 76) * w + Math.sin(t * .4 + i) * wind + w) % w;
    const overText = x < w * .37 && y > h * .2 && y < h * .78;
    const alpha = (overText ? .09 : .36) * depth * (s.light ? 1.3 : 1);
    stroke(s, alpha, .7, season === 'autumn' ? (s.light ? '#52798c' : '#8bb8cb') : s.accent);
    if (season === 'autumn') {
      line(s, [[x, y], [x - wind * .18, y + 9 + depth * 12]]);
    } else if (season === 'winter') {
      ellipse(s, x + Math.sin(t + i) * 9, y, 1 + depth * 1.2, 1 + depth * 1.2, 0, true);
      if (i % 7 === 0) {
        line(s, [[x - 3, y], [x + 3, y]]);
        line(s, [[x, y - 3], [x, y + 3]]);
      }
    } else if (season === 'spring') {
      ellipse(s, x, y, 2 + depth * 2, 1.3, t * .7 + i);
    } else {
      const glow = .25 + .35 * (1 + Math.sin(t * 1.3 + i * 3)) / 2;
      stroke(s, overText ? .07 : glow, .7);
      ellipse(s, x, h * .25 + y * .65, 1.2, 1.2, 0, true);
      stroke(s, glow * .14, .6);
      ellipse(s, x, h * .25 + y * .65, 4);
    }
  }
  if (season === 'autumn') {
    for (let i = 0; i < 8; i++) {
      const phase = (t * .07 + noise(i + 301)) % 1;
      const x = w * (.4 + noise(i + 370) * .55) + Math.sin(t * .5 + i) * 25;
      stroke(s, .45, .8);
      leaf(s, x, phase * (h + 30) - 15, 3 + noise(i + 89) * 3, t * .6 + i);
    }
    for (let i = 0; i < 12; i++) {
      const phase = (t * .65 + noise(i + 120)) % 1;
      stroke(s, (1 - phase) * .3, .7, s.muted);
      ellipse(s, noise(i + 21) * w, h - 13 - noise(i + 31) * 20, 2 + phase * 13, 1 + phase * 3);
    }
  }
  c.globalAlpha = 1;
}
