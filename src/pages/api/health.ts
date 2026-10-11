import type { APIRoute } from "astro";

export const GET: APIRoute = () =>
  Response.json(
    { status: "ok", revision: process.env.RELEASE_SHA || "development" },
    { headers: { "Cache-Control": "no-store" } },
  );
