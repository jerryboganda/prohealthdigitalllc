// Visual QA: every sitemap URL × viewport (× reduced motion): no horizontal overflow,
// no console errors, screenshots saved to QA_OUT. Uses the system Chrome (no browser download).
// Run: QA_OUT=<dir> node scripts/visual-qa.mjs [origin]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const origin = process.argv[2] || "http://127.0.0.1:3100";
const out = process.env.QA_OUT || "qa-screens";
const shots = process.env.QA_SHOTS !== "0";
mkdirSync(out, { recursive: true });
const xml = await (await fetch(origin + "/sitemap.xml")).text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const executablePath =
  process.env.CHROME_PATH ||
  (process.platform === "win32"
    ? "C:/Program Files/Google/Chrome/Application/chrome.exe"
    : "/usr/bin/google-chrome");
const browser = await chromium.launch({ executablePath });
const problems = [];
for (const [name, viewport, reducedMotion] of [
  ["mobile", { width: 375, height: 812 }, "no-preference"],
  ["desktop", { width: 1440, height: 900 }, "no-preference"],
  ["mobile-reduced", { width: 375, height: 812 }, "reduce"],
]) {
  const context = await browser.newContext({ viewport, reducedMotion, deviceScaleFactor: 1 });
  for (const path of urls) {
    const page = await context.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(origin + path, { waitUntil: "networkidle" });
    // Scroll through so scroll-triggered content runs, then back to top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);
    // Visit lazy Lottie icons so they load.
    await page.evaluate(async () => {
      for (const el of document.querySelectorAll("[data-lottie]")) {
        if (!el.getClientRects().length) continue;
        el.scrollIntoView({ block: "center" });
        await new Promise((r) => setTimeout(r, 150));
      }
    });
    await page.waitForTimeout(600);
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      hidden: [...document.querySelectorAll("[data-reveal],[data-reveal-stagger] > *")].filter(
        (e) => getComputedStyle(e).opacity === "0",
      ).length,
      canvas: !!document.querySelector(".shader-canvas"),
      lottieMissing: [...document.querySelectorAll("[data-lottie]")].filter(
        (e) => !e.querySelector("svg path, svg g"),
      ).length,
    }));
    if (metrics.overflow > 0)
      problems.push(`${name} ${path}: horizontal overflow ${metrics.overflow}px`);
    if (metrics.lottieMissing > 0)
      problems.push(`${name} ${path}: ${metrics.lottieMissing} Lottie icons not rendered`);
    if (metrics.hidden > 0)
      problems.push(`${name} ${path}: ${metrics.hidden} elements still hidden`);
    if (reducedMotion === "reduce" && metrics.canvas)
      problems.push(`${name} ${path}: shader canvas under reduced motion`);
    for (const e of errors) problems.push(`${name} ${path}: console ${e}`);
    if (shots)
      await page.screenshot({
        path: `${out}/${name}${path === "/" ? "/home" : path.replace(/\//g, "_")}.png`.replace(
          `${name}/`,
          `${name}_`,
        ),
        fullPage: true,
      });
    await page.close();
  }
  await context.close();
}
await browser.close();
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(
  `PASS visual QA: ${urls.length} URLs × 3 modes, no overflow, no console errors, nothing left hidden`,
);
