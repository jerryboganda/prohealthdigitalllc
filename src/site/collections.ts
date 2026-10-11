import { getCollection } from "astro:content";
import type { Collections } from "../lib/routes.ts";
import type { Locale } from "../lib/content.ts";

type Name = "insights" | "resources";
const slugOf = (id: string) => id.split("/").pop()!;

/** Slugs that exist in BOTH languages; anything unpaired is never routed. */
export async function collectionSlugs(): Promise<Collections> {
  const paired = async (name: Name) => {
    const entries = await getCollection(name);
    const en = new Set(entries.filter((e) => e.id.startsWith("en/")).map((e) => slugOf(e.id)));
    return entries
      .filter((e) => e.id.startsWith("ar/") && en.has(slugOf(e.id)))
      .map((e) => slugOf(e.id))
      .sort();
  };
  return { insights: await paired("insights"), resources: await paired("resources") };
}

export async function entriesFor(name: Name, locale: Locale) {
  const { [name]: slugs } = await collectionSlugs();
  const entries = await getCollection(name, (e) => e.id.startsWith(`${locale}/`));
  return entries
    .filter((e) => slugs.includes(slugOf(e.id)))
    .map((e) => ({ ...e, slug: slugOf(e.id) }))
    .sort((a, b) => b.data.published.getTime() - a.data.published.getTime());
}

export async function entryFor(name: Name, locale: Locale, slug: string) {
  return (await entriesFor(name, locale)).find((e) => e.slug === slug);
}
