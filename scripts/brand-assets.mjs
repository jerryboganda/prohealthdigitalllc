// Regenerates raster brand assets from public/icon.svg: app icons and OG backgrounds.
// Run: node scripts/brand-assets.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const mark = readFileSync(new URL("public/icon.svg", root), "utf8").trim();
const inner = mark.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");

const icon = (size, pad, bg) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
      (bg
        ? `<rect width="100%" height="100%" rx="${bg === "round" ? size * 0.22 : 0}" fill="#FBFBF8"/>`
        : "") +
      `<svg x="${pad}" y="${pad}" width="${size - 2 * pad}" height="${size - 2 * pad}" viewBox="380 290 500 430">${inner}</svg></svg>`,
  );
for (const [file, size, pad] of [
  ["public/apple-touch-icon.png", 180, 22],
  ["public/icon-192.png", 192, 24],
  ["public/icon-512.png", 512, 64],
  ["public/icon-maskable-512.png", 512, 110],
])
  await sharp(icon(size, pad, "square"))
    .png({ compressionLevel: 9 })
    .toFile(fileURLToPath(new URL(file, root)));

// OG backgrounds (1200×630). Text is drawn later by astro-og-canvas on the empty side.
const og = (dir) => {
  const flip = dir === "rtl";
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="${flip ? 0.12 : 0.88}" cy="0.18" r="0.55"><stop offset="0" stop-color="#00B2A9" stop-opacity=".30"/><stop offset="1" stop-color="#00B2A9" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="${flip ? 0.05 : 0.95}" cy="0.9" r="0.5"><stop offset="0" stop-color="#1B4ED8" stop-opacity=".22"/><stop offset="1" stop-color="#1B4ED8" stop-opacity="0"/></radialGradient>
    <linearGradient id="line" x1="${flip ? 1 : 0}" x2="${flip ? 0 : 1}"><stop offset="0" stop-color="#00B2A9" stop-opacity="0"/><stop offset=".3" stop-color="#00B2A9"/><stop offset=".8" stop-color="#1B4ED8"/><stop offset="1" stop-color="#1B4ED8" stop-opacity="0"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#FBFBF8"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>
  <g transform="${flip ? "translate(1200 0) scale(-1 1)" : ""}">
    <path d="M0 598H700L716 598L732 576L750 616L762 590L772 598H1200" fill="none" stroke="url(#line)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <rect x="0" y="622" width="1200" height="8" fill="#0A1D3D"/>
</svg>`);
};
for (const dir of ["ltr", "rtl"])
  writeFileSync(
    new URL(`src/og/background-${dir}.png`, root),
    await sharp(og(dir)).png({ compressionLevel: 9 }).toBuffer(),
  );
await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="232" height="200" viewBox="380 290 500 430">${inner}</svg>`,
  ),
)
  .png()
  .toFile(fileURLToPath(new URL("src/og/mark.png", root)));
console.log("brand assets written");
