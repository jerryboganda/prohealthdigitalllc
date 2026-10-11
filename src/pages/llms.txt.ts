import type { APIRoute } from "astro";
import { ORIGIN, EMAIL, engagements, projects, ui } from "../lib/content.ts";
import { meta } from "../lib/meta.ts";
import { collectionSlugs, entriesFor } from "../site/collections.ts";

export const GET: APIRoute = async () => {
  await collectionSlugs();
  const insights = await entriesFor("insights", "en");
  const resources = await entriesFor("resources", "en");
  const lines = [
    "# ProHealth Digital LLC",
    "",
    `> ${ui.intro.en}`,
    "",
    "Healthcare technology delivery partner for healthcare providers and digital health companies, serving the GCC and South Asia. English site at the root, Arabic at /ar. We deliver technology; our customers deliver care. Discovery is free; pricing is project-specific.",
    "",
    "## Engagements",
    ...engagements.map((e) => `- [${e.title.en}](${ORIGIN}/solutions/${e.id}): ${e.problem.en}`),
    "",
    "## Audiences",
    `- [Healthcare providers](${ORIGIN}/providers): ${meta.providers.description.en}`,
    `- [Digital health companies](${ORIGIN}/digital-health-companies): ${meta["digital-health-companies"].description.en}`,
    "",
    "## Delivered work",
    ...projects.map(
      (p) => `- [${p.name.en}](${ORIGIN}/work/${p.id}): ${p.context.en} (full-platform delivery)`,
    ),
    "",
    "## Insights",
    ...insights.map(
      (e) => `- [${e.data.title}](${ORIGIN}/insights/${e.slug}): ${e.data.description}`,
    ),
    "",
    "## Resources",
    ...resources.map(
      (e) => `- [${e.data.title}](${ORIGIN}/resources/${e.slug}): ${e.data.description}`,
    ),
    "",
    "## Company",
    `- [How we work](${ORIGIN}/how-we-work)`,
    `- [About](${ORIGIN}/about)`,
    `- [FAQ](${ORIGIN}/faq)`,
    `- [Glossary](${ORIGIN}/glossary)`,
    `- [Contact](${ORIGIN}/contact): ${EMAIL}`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
