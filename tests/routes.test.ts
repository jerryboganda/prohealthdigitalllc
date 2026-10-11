import test from "node:test";
import assert from "node:assert/strict";
import { resolve, allPaths } from "../src/lib/routes.ts";
import { localPath } from "../src/lib/content.ts";

const collections = {
  insights: ["patient-access-websites"],
  resources: ["launch-readiness-checklist"],
};

test("every public path resolves to a page in both languages", () => {
  for (const path of allPaths(collections))
    for (const locale of ["en", "ar"] as const) {
      const r = resolve(localPath(path, locale), collections);
      assert.equal(r.kind, "page", localPath(path, locale));
      if (r.kind === "page") {
        assert.equal(r.locale, locale);
        assert.equal(r.path, path);
      }
    }
});

test("legacy URLs redirect within the same language", () => {
  for (const [from, to] of [
    ["/services", "/solutions"],
    ["/packages", "/how-we-work"],
    ["/digital-products", "/solutions"],
  ])
    for (const locale of ["en", "ar"] as const)
      assert.deepEqual(resolve(localPath(from, locale), collections), {
        kind: "redirect",
        to: localPath(to, locale),
      });
});

test("unknown, foreign-locale and malformed paths are missing with the right language", () => {
  for (const path of [
    "/unknown",
    "/solutions/unknown",
    "/work/unknown",
    "/insights/unknown",
    "/resources/unknown",
    "/fr/contact",
    "/en/about",
    "/about/extra/segment",
    "/solutions//care-workflows",
    "/arabic",
  ])
    assert.deepEqual(resolve(path, collections), { kind: "missing", locale: "en" }, path);
  for (const path of ["/ar/unknown", "/ar/ar", "/ar/work/unknown"])
    assert.deepEqual(resolve(path, collections), { kind: "missing", locale: "ar" }, path);
});

test("collection slugs only route when listed", () => {
  assert.equal(resolve("/insights/patient-access-websites", collections).kind, "page");
  assert.equal(
    resolve("/insights/patient-access-websites", { insights: [], resources: [] }).kind,
    "missing",
  );
});
