import { createFileRoute } from "@tanstack/react-router";
import { ORIGIN } from "@/lib/content";
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
          { headers: { "Content-Type": "text/plain" } },
        ),
    },
  },
});
