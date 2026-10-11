import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { ORIGIN, CONTENT_UPDATED, localPath } from "../lib/content.ts";
import { allPaths } from "../lib/routes.ts";
import { collectionSlugs } from "../site/collections.ts";

export const GET: APIRoute = async () => {
  const collections = await collectionSlugs();
  const dates = new Map<string, string>();
  for (const name of ["insights", "resources"] as const)
    for (const entry of await getCollection(name)) {
      const path = `/${name}/${entry.id.split("/").pop()}`;
      const iso = entry.data.updated.toISOString().slice(0, 10);
      if (!dates.has(path) || dates.get(path)! < iso) dates.set(path, iso);
    }
  const urls = allPaths(collections).flatMap((path) =>
    (["en", "ar"] as const).map(
      (locale) =>
        `<url><loc>${ORIGIN}${localPath(path, locale)}</loc><lastmod>${dates.get(path) ?? CONTENT_UPDATED}</lastmod>` +
        `<xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}${path}"/>` +
        `<xhtml:link rel="alternate" hreflang="ar" href="${ORIGIN}${localPath(path, "ar")}"/>` +
        `<xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${path}"/></url>`,
    ),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    },
  );
};
