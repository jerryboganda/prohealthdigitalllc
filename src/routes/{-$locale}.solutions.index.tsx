import { createFileRoute, notFound } from "@tanstack/react-router";
import { WebsitePage } from "@/components/site/Website";
import { pageHead } from "@/lib/metadata";
import { ui } from "@/lib/content";
export const Route = createFileRoute("/{-$locale}/solutions/")({
  beforeLoad: ({ params }) => {
    if (params.locale && params.locale !== "ar") throw notFound();
  },
  head: ({ params }) => {
    const locale = params.locale === "ar" ? "ar" : "en";
    return pageHead("/solutions", locale, ui.solutions[locale]);
  },
  component: () => <WebsitePage page="solutions" />,
});
