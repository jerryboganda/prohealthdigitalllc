import { createFileRoute, notFound } from "@tanstack/react-router";
import { WebsitePage } from "@/components/site/Website";
import { pageHead } from "@/lib/metadata";
import { ui, policies, text } from "@/lib/content";
export const Route = createFileRoute("/{-$locale}/privacy")({
  beforeLoad: ({ params }) => {
    if (params.locale && params.locale !== "ar") throw notFound();
  },
  head: ({ params }) => {
    const locale = params.locale === "ar" ? "ar" : "en";
    return pageHead("/privacy", locale, policies.privacy.title[locale]);
  },
  component: () => <WebsitePage page="privacy" />,
});
