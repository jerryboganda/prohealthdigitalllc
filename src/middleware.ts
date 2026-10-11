import { defineMiddleware } from "astro:middleware";

const securityHeaders: Record<string, string> = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "media-src 'self'",
    "worker-src 'self'",
    "manifest-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; "),
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Frame-Options": "DENY",
};

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url;
  // One canonical form per page: strip trailing slashes with a permanent redirect. Leading
  // slashes are collapsed too, so "//evil.example/" can never become a protocol-relative
  // (off-site) Location.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const target = "/" + pathname.replace(/^\/+/, "").replace(/\/+$/, "");
    return new Response(null, {
      status: 301,
      headers: { Location: target + search, ...securityHeaders },
    });
  }
  const response = await next();
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(securityHeaders))
    if (!headers.has(key)) headers.set(key, value);
  if (headers.get("content-type")?.startsWith("text/html") && !headers.has("Cache-Control"))
    headers.set("Cache-Control", "no-cache");
  // No statusText: Node then sends the standard reason phrase (e.g. "404 Not Found").
  return new Response(response.body, { status: response.status, headers });
});
