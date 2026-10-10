import assert from "node:assert/strict";
import { publicPaths, ORIGIN, localPath } from "../src/lib/content.ts";
const base = process.env.CHECK_ORIGIN || "http://127.0.0.1:3100";
let count = 0;
for (const path of publicPaths)
  for (const locale of ["en", "ar"] as const) {
    const localized = localPath(path, locale);
    const response = await fetch(base + localized);
    const html = await response.text();
    assert.equal(response.status, 200, localized);
    assert.ok(
      html.includes(`<html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}">`),
      localized + " document direction",
    );
    assert.ok(html.includes(`href="${ORIGIN + localized}"`), localized + " canonical");
    assert.ok(
      html.includes('hrefLang="ar"') || html.includes('hreflang="ar"'),
      localized + " language alternate",
    );
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, localized + " single heading");
    assert.ok(!html.includes("prohealthdigitalllc@outlook.com"), localized + " email");
    assert.ok(!html.includes("+38%") && !html.includes("EGP"), localized + " removed claims");
    count++;
  }
for (const [old, target] of [
  ["services", "solutions"],
  ["packages", "how-we-work"],
  ["digital-products", "solutions"],
])
  for (const locale of ["en", "ar"] as const) {
    const response = await fetch(base + localPath("/" + old, locale), { redirect: "manual" });
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("location"), localPath("/" + target, locale));
  }
for (const path of [
  "/unknown",
  "/ar/unknown",
  "/solutions/unknown",
  "/ar/work/unknown",
  "/fr/contact",
])
  assert.equal((await fetch(base + path)).status, 404, path);
const xml = await (await fetch(base + "/sitemap.xml")).text();
assert.equal((xml.match(/<loc>/g) || []).length, publicPaths.length * 2);
assert.ok(xml.includes("xhtml:link"));
assert.ok((await (await fetch(base + "/robots.txt")).text()).includes(ORIGIN + "/sitemap.xml"));
for (const asset of ["/favicon.ico", "/prohealth-logo.png"])
  assert.equal((await fetch(base + asset)).status, 200, asset);
console.log(
  `PASS: ${count} bilingual pages, six redirects, five 404s, sitemap, robots and public assets (${base})`,
);
