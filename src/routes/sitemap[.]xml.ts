import { createFileRoute } from "@tanstack/react-router";
import { ORIGIN, publicPaths, localPath } from "@/lib/content";
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const entries = publicPaths.flatMap((path) =>
          (["en", "ar"] as const).map(
            (locale) =>
              `<url><loc>${ORIGIN}${localPath(path, locale)}</loc><xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}${path}"/><xhtml:link rel="alternate" hreflang="ar" href="${ORIGIN}${localPath(path, "ar")}"/><xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${path}"/></url>`,
          ),
        );
        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`,
          {
            headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
          },
        );
      },
    },
  },
});
