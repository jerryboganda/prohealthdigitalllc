import { engagements, projects } from "../lib/content.ts";
import type { Locale } from "../lib/content.ts";
import { allPaths, resolve } from "../lib/routes.ts";
import { meta } from "../lib/meta.ts";
import { audiences } from "../lib/audiences.ts";
import { collectionSlugs, entryFor } from "./collections.ts";

export interface OgPage {
  locale: Locale;
  title: string;
  description: string;
  eyebrow: string;
}

/** Title/description for every public page, keyed like `en/solutions/care-workflows` (home → `en/home`). */
export async function ogPages(): Promise<Record<string, OgPage>> {
  const collections = await collectionSlugs();
  const out: Record<string, OgPage> = {};
  for (const path of allPaths(collections))
    for (const locale of ["en", "ar"] as const) {
      const r = resolve(locale === "ar" ? `/ar${path === "/" ? "" : path}` : path, collections);
      if (r.kind !== "page") continue;
      const brand = "ProHealth Digital";
      let page: OgPage;
      if (r.view === "solution") {
        const e = engagements.find((x) => x.id === r.slug)!;
        page = { locale, title: e.title[locale], description: e.problem[locale], eyebrow: brand };
      } else if (r.view === "project") {
        const p = projects.find((x) => x.id === r.slug)!;
        page = {
          locale,
          title: p.name[locale],
          description: p.context[locale],
          eyebrow: p.category[locale],
        };
      } else if (r.view === "insight" || r.view === "resource") {
        const e = (await entryFor(
          r.view === "insight" ? "insights" : "resources",
          locale,
          r.slug,
        ))!;
        page = { locale, title: e.data.title, description: e.data.description, eyebrow: brand };
      } else if (r.view === "audience") {
        const a = audiences.find((x) => x.id === r.slug)!;
        page = {
          locale,
          title: a.title[locale],
          description: meta[r.slug].description[locale],
          eyebrow: a.eyebrow[locale],
        };
      } else {
        const key = r.view === "policy" ? r.slug : r.view;
        page = {
          locale,
          title: meta[key].title[locale],
          description: meta[key].description[locale],
          eyebrow: brand,
        };
      }
      out[`${locale}${path === "/" ? "/home" : path}`] = page;
    }
  return out;
}
