import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const requestUrl = new URL(request.url);
        const BASE_URL = `${requestUrl.protocol}//${requestUrl.host}`;

        const content = ["User-agent: *", "Allow: /", "", `Sitemap: ${BASE_URL}/sitemap.xml`].join(
          "\n",
        );

        return new Response(content, {
          headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
