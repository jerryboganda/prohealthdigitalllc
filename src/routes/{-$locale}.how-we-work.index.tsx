import { createFileRoute, notFound } from "@tanstack/react-router";
import { WebsitePage } from "@/components/site/Website";
import { pageHead } from "@/lib/metadata";
import { ui } from "@/lib/content";
export const Route = createFileRoute("/{-$locale}/how-we-work/")({
  beforeLoad: ({ params }) => {
    if (params.locale && params.locale !== "ar") throw notFound();
  },
  head: ({ params }) => {
    const locale = params.locale === "ar" ? "ar" : "en";
    return pageHead("/how-we-work", locale, ui.process[locale]);
  },
  component: () => <WebsitePage page="how-we-work" />,
});
