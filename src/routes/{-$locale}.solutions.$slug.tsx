import { createFileRoute, notFound } from "@tanstack/react-router";
import { WebsitePage } from "@/components/site/Website";
import { pageHead } from "@/lib/metadata";
import { engagements } from "@/lib/content";
export const Route = createFileRoute("/{-$locale}/solutions/$slug")({
  beforeLoad: ({ params }) => {
    if ((params.locale && params.locale !== "ar") || !engagements.some((e) => e.id === params.slug))
      throw notFound();
  },
  head: ({ params }) => {
    const locale = params.locale === "ar" ? "ar" : "en";
    const item = engagements.find((e) => e.id === params.slug);
    return item ? pageHead("/solutions/" + params.slug, locale, item.title[locale]) : {};
  },
  component: function DetailPage() {
    return <WebsitePage page="solution" slug={Route.useParams().slug} />;
  },
});
