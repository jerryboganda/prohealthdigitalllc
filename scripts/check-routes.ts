import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { ORIGIN, localPath } from "../src/lib/content.ts";
import { allPaths } from "../src/lib/routes.ts";

const base = process.env.CHECK_ORIGIN || "http://127.0.0.1:3100";
const live = base.startsWith("https://");

/** Slugs present in BOTH languages, exactly as the site routes them. */
function paired(collection: string) {
  const dir = (l: string) =>
    new Set(
      readdirSync(new URL(`../src/content/${collection}/${l}/`, import.meta.url))
        .filter((f) => /\.mdx?$/.test(f))
        .map((f) => f.replace(/\.mdx?$/, "")),
    );
  const en = dir("en");
  return [...dir("ar")].filter((s) => en.has(s)).sort();
}
const paths = allPaths({ insights: paired("insights"), resources: paired("resources") });

const titles = new Map<string, string>();
const descriptions = new Map<string, string>();
const scriptSrcs = new Set<string>();
const ogImages = new Set<string>();
let count = 0;
for (const path of paths)
  for (const locale of ["en", "ar"] as const) {
    const localized = localPath(path, locale);
    const response = await fetch(base + localized);
    const html = await response.text();
    assert.equal(response.status, 200, localized);
    assert.match(
      html,
      new RegExp(`<html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}"[ >]`),
      localized + " document direction",
    );
    assert.ok(html.includes(`href="${ORIGIN + localized}"`), localized + " canonical");
    assert.ok(/hreflang="ar"/i.test(html), localized + " language alternate");
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, localized + " single heading");
    assert.ok(!html.includes("prohealthdigitalllc@outlook.com"), localized + " email");
    assert.ok(!html.includes("+38%") && !html.includes("EGP"), localized + " removed claims");
    assert.ok(!/fonts\.(googleapis|gstatic)\.com/.test(html), localized + " no third-party fonts");

    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
    assert.ok(title.length > 10, localized + " title");
    assert.ok(
      description.length >= 50 && description.length <= 175,
      `${localized} description length ${description.length}`,
    );
    assert.ok(!titles.has(title), `${localized} duplicate title of ${titles.get(title)}`);
    assert.ok(
      !descriptions.has(description),
      `${localized} duplicate description of ${descriptions.get(description)}`,
    );
    titles.set(title, localized);
    descriptions.set(description, localized);

    // CSP is script-src 'self': every executable script must be external.
    for (const tag of html.match(/<script\b[^>]*>/g) || []) {
      const src = tag.match(/src="([^"]+)"/)?.[1];
      if (src) scriptSrcs.add(src);
      else assert.ok(/type="application\/ld\+json"/.test(tag), `${localized} inline script ${tag}`);
    }
    for (const json of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))
      assert.doesNotThrow(() => JSON.parse(json[1]), localized + " JSON-LD parses");
    const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    assert.ok(og?.startsWith(ORIGIN + "/og/"), localized + " og:image");
    ogImages.add(og!.replace(ORIGIN, ""));

    const headers = response.headers;
    assert.match(
      headers.get("content-security-policy") || "",
      /script-src 'self'/,
      localized + " CSP",
    );
    assert.ok(headers.get("x-content-type-options") === "nosniff", localized + " nosniff");
    assert.ok(headers.get("strict-transport-security"), localized + " HSTS");
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
{
  const response = await fetch(base + "/about/", { redirect: "manual" });
  assert.equal(response.status, 301, "trailing slash");
  assert.equal(response.headers.get("location"), "/about");
  for (const evil of ["//evil.example/", "///evil.example/", "/%2F%2Fevil.example/"]) {
    const r = await fetch(base + evil, { redirect: "manual" });
    const location = r.headers.get("location") || "";
    assert.ok(!/^(\/\/|\\)|^https?:/i.test(location), `open redirect via ${evil}: ${location}`);
  }
}
for (const path of [
  "/unknown",
  "/ar/unknown",
  "/solutions/unknown",
  "/ar/work/unknown",
  "/fr/contact",
  "/ar/ar",
  "/en/about",
  "/insights/unknown",
])
  assert.equal((await fetch(base + path)).status, 404, path);
assert.match(
  await (await fetch(base + "/ar/unknown")).text(),
  /<html lang="ar" dir="rtl"/,
  "localized 404",
);

const contact = await (
  await fetch(base + "/contact?engagement=care-workflows&source=/solutions/care-workflows")
).text();
assert.match(contact, /<option value="care-workflows" selected/, "contact prefill engagement");
assert.match(contact, /data-source="\/solutions\/care-workflows"/, "contact prefill source");
assert.match(
  contact,
  /href="\/ar\/contact\?engagement=care-workflows&amp;source=/,
  "language switch keeps query",
);
const hostile = await (await fetch(base + "/contact?source=//evil.example")).text();
assert.match(hostile, /data-source="\/contact"/, "contact rejects external source");

const xml = await (await fetch(base + "/sitemap.xml")).text();
assert.equal((xml.match(/<loc>/g) || []).length, paths.length * 2, "sitemap size");
assert.equal((xml.match(/<lastmod>/g) || []).length, paths.length * 2, "sitemap lastmod");
assert.ok(xml.includes("xhtml:link"));
assert.ok((await (await fetch(base + "/robots.txt")).text()).includes(ORIGIN + "/sitemap.xml"));
assert.match(await (await fetch(base + "/llms.txt")).text(), /ProHealth Digital/, "llms.txt");
const manifest = await (await fetch(base + "/site.webmanifest")).json();
assert.ok(manifest.icons?.length >= 2, "manifest icons");
for (const asset of [
  "/favicon.ico",
  "/prohealth-logo.png",
  "/icon.svg",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
])
  assert.equal((await fetch(base + asset)).status, 200, asset);
for (const og of ogImages) {
  const response = await fetch(base + og);
  assert.equal(response.status, 200, og);
  assert.equal(response.headers.get("content-type"), "image/png", og);
}

// First-load JS budget (uncompressed) for the shared runtime.
let js = 0;
for (const src of scriptSrcs) js += (await (await fetch(base + src)).arrayBuffer()).byteLength;
assert.ok(js <= 180 * 1024, `first-load JS ${Math.round(js / 1024)} KB exceeds 180 KB`);

console.log(
  `PASS: ${count} bilingual pages (${paths.length} paths), unique titles/descriptions, JSON-LD, CSP-safe scripts (${Math.round(js / 1024)} KB), ${ogImages.size} OG images, redirects, 404s, prefill, sitemap, robots, llms.txt, manifest (${base}${live ? ", live" : ""})`,
);
