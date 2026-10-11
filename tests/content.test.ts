import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import * as copy from "../src/lib/copy.ts";
import { meta } from "../src/lib/meta.ts";
import { audiences } from "../src/lib/audiences.ts";
import { glossary } from "../src/lib/glossary.ts";
import { engagements } from "../src/lib/content.ts";
import { engagementDetails } from "../src/lib/engagement-details.ts";

function visit(value: unknown, at: string) {
  if (!value || typeof value !== "object") return;
  if ("en" in value || "ar" in value) {
    const v = value as Record<string, string>;
    assert.ok(v.en?.trim(), `${at}.en`);
    assert.ok(v.ar?.trim(), `${at}.ar`);
    assert.ok(/[؀-ۿ]/.test(v.ar), `${at}.ar is Arabic`);
  } else for (const [k, item] of Object.entries(value)) visit(item, `${at}.${k}`);
}

test("site copy, metadata, audiences, glossary and engagement extras are bilingual", () => {
  visit({ copy, meta, audiences, glossary, engagements, engagementDetails }, "content");
  for (const e of engagements) {
    assert.ok(engagementDetails[e.id].phases.length >= 3, `${e.id} phases`);
    assert.ok(engagementDetails[e.id].faqs.length >= 2, `${e.id} faqs`);
  }
});

test("metadata stays within search snippet budgets", () => {
  for (const [key, m] of Object.entries(meta))
    for (const locale of ["en", "ar"] as const) {
      assert.ok(m.title[locale].length <= 62, `${key}.${locale} title ${m.title[locale].length}`);
      assert.ok(
        m.description[locale].length <= 165,
        `${key}.${locale} description ${m.description[locale].length}`,
      );
      assert.ok(m.description[locale].length >= 70, `${key}.${locale} description too short`);
    }
});

test("glossary ids are unique and anchor-safe", () => {
  const ids = glossary.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9-]+$/);
});

for (const collection of ["insights", "resources"]) {
  test(`${collection}: every article exists in English and Arabic with matching frontmatter shape`, () => {
    const dir = (l: string) =>
      readdirSync(new URL(`../src/content/${collection}/${l}/`, import.meta.url)).filter((f) =>
        /\.mdx?$/.test(f),
      );
    const en = dir("en");
    const ar = dir("ar");
    assert.deepEqual([...en].sort(), [...ar].sort(), `${collection} EN/AR pairs`);
    for (const file of ar) {
      const body = readFileSync(
        new URL(`../src/content/${collection}/ar/${file}`, import.meta.url),
        "utf8",
      );
      assert.ok(/[؀-ۿ]/.test(body), `${file} Arabic body`);
    }
  });
}
