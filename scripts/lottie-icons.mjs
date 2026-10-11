// Generates the site's small Lottie icons (bodymovin v5 JSON) into public/lottie/.
// Run: node scripts/lottie-icons.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const teal = [0, 0.698, 0.663, 1];
const royal = [0.106, 0.306, 0.847, 1];
const ease = { i: { x: [0.33], y: [1] }, o: { x: [0.67], y: [0] } };
const kf = (frames) =>
  frames.map(([t, v], i) => (i < frames.length - 1 ? { t, s: [v], ...ease } : { t, s: [v] }));
const transform = {
  o: { a: 0, k: 100 },
  r: { a: 0, k: 0 },
  p: { a: 0, k: [0, 0, 0] },
  a: { a: 0, k: [0, 0, 0] },
  s: { a: 0, k: [100, 100, 100] },
};
const groupTransform = {
  ty: "tr",
  p: { a: 0, k: [0, 0] },
  a: { a: 0, k: [0, 0] },
  s: { a: 0, k: [100, 100] },
  r: { a: 0, k: 0 },
  o: { a: 0, k: 100 },
};
const path = (points) => ({
  ty: "sh",
  ks: {
    a: 0,
    k: { i: points.map(() => [0, 0]), o: points.map(() => [0, 0]), v: points, c: false },
  },
});
const stroke = (color, width) => ({
  ty: "st",
  c: { a: 0, k: color },
  o: { a: 0, k: 100 },
  w: { a: 0, k: width },
  lc: 2,
  lj: 2,
});
const layer = (ind, name, shapes, op) => ({
  ddd: 0,
  ind,
  ty: 4,
  nm: name,
  sr: 1,
  ks: transform,
  ao: 0,
  shapes,
  ip: 0,
  op,
  st: 0,
  bm: 0,
});
const anim = (name, w, h, op, layers) => ({
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op,
  w,
  h,
  nm: name,
  ddd: 0,
  assets: [],
  layers,
});

// Heartbeat line: draws in, travels, fades out — loops.
const pulsePoints = [
  [6, 44],
  [70, 44],
  [84, 44],
  [96, 16],
  [112, 70],
  [124, 32],
  [134, 44],
  [194, 44],
];
const pulse = anim("pulse", 200, 80, 150, [
  layer(
    1,
    "line",
    [
      { ty: "gr", it: [path(pulsePoints), stroke(teal, 4), groupTransform] },
      {
        ty: "tm",
        s: {
          a: 1,
          k: kf([
            [0, 0],
            [70, 0],
            [130, 100],
          ]),
        },
        e: {
          a: 1,
          k: kf([
            [0, 0],
            [70, 100],
          ]),
        },
        o: { a: 0, k: 0 },
        m: 1,
      },
    ],
    150,
  ),
]);

// Success: circle draws, then a check mark — plays once.
const ellipse = { ty: "el", p: { a: 0, k: [60, 60] }, s: { a: 0, k: [96, 96] }, d: 1 };
const check = anim("check", 120, 120, 90, [
  layer(
    1,
    "check",
    [
      {
        ty: "gr",
        it: [
          path([
            [38, 62],
            [53, 77],
            [83, 45],
          ]),
          stroke(teal, 7),
          groupTransform,
        ],
      },
      {
        ty: "tm",
        s: { a: 0, k: 0 },
        e: {
          a: 1,
          k: kf([
            [30, 0],
            [62, 100],
          ]),
        },
        o: { a: 0, k: 0 },
        m: 1,
      },
    ],
    90,
  ),
  layer(
    2,
    "ring",
    [
      { ty: "gr", it: [ellipse, stroke(royal, 4), groupTransform] },
      {
        ty: "tm",
        s: { a: 0, k: 0 },
        e: {
          a: 1,
          k: kf([
            [0, 0],
            [40, 100],
          ]),
        },
        o: {
          a: 1,
          k: kf([
            [0, -90],
            [40, 0],
          ]),
        },
        m: 1,
      },
    ],
    90,
  ),
]);

const dir = new URL("../public/lottie/", import.meta.url);
mkdirSync(dir, { recursive: true });
writeFileSync(new URL("pulse.json", dir), JSON.stringify(pulse));
writeFileSync(new URL("check.json", dir), JSON.stringify(check));
console.log("lottie icons written");
