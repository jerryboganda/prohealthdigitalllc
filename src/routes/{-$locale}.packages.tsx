import { createFileRoute, redirect, notFound } from "@tanstack/react-router";
import { localPath } from "@/lib/content";
export const Route = createFileRoute("/{-$locale}/packages")({
  beforeLoad: ({ params }) => {
    if (params.locale && params.locale !== "ar") throw notFound();
    throw redirect({
      href: localPath("/how-we-work", params.locale === "ar" ? "ar" : "en"),
      statusCode: 301,
    });
  },
});
