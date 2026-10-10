import { createFileRoute, notFound } from "@tanstack/react-router";
import { WebsitePage } from "@/components/site/Website";
import { pageHead } from "@/lib/metadata";
import { projects } from "@/lib/content";
export const Route = createFileRoute("/{-$locale}/work/$slug")({
  beforeLoad: ({ params }) => {
    if ((params.locale && params.locale !== "ar") || !projects.some((e) => e.id === params.slug))
      throw notFound();
  },
  head: ({ params }) => {
    const locale = params.locale === "ar" ? "ar" : "en";
    const item = projects.find((e) => e.id === params.slug);
    return item ? pageHead("/work/" + params.slug, locale, item.name[locale]) : {};
  },
  component: function DetailPage() {
    return <WebsitePage page="project" slug={Route.useParams().slug} />;
  },
});
