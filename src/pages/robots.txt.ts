import type { APIRoute } from "astro";
import { ORIGIN } from "../lib/content.ts";

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${ORIGIN}/sitemap.xml\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
