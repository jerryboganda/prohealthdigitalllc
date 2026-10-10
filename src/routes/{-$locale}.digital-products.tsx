import { createFileRoute, redirect, notFound } from "@tanstack/react-router";
import { localPath } from "@/lib/content";
export const Route = createFileRoute("/{-$locale}/digital-products")({
  beforeLoad: ({ params }) => {
    if (params.locale && params.locale !== "ar") throw notFound();
    throw redirect({
      href: localPath("/solutions", params.locale === "ar" ? "ar" : "en"),
      statusCode: 301,
    });
  },
});
