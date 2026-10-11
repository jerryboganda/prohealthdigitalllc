import { engagements, projects, policies, localPath } from "./content.ts";
import type { Locale } from "./content.ts";

export type View =
  | { view: "home" }
  | { view: "solutions" }
  | { view: "solution"; slug: string }
  | { view: "work" }
  | { view: "project"; slug: string }
  | { view: "how-we-work" }
  | { view: "about" }
  | { view: "contact" }
  | { view: "faq" }
  | { view: "policy"; slug: string }
  | { view: "audience"; slug: string }
  | { view: "insights" }
  | { view: "insight"; slug: string }
  | { view: "resources" }
  | { view: "resource"; slug: string }
  | { view: "glossary" };

export type Resolved =
  | ({ kind: "page"; locale: Locale; path: string } & View)
  | { kind: "redirect"; to: string }
  | { kind: "missing"; locale: Locale };

export interface Collections {
  insights: readonly string[];
  resources: readonly string[];
}

const legacy: Record<string, string> = {
  services: "/solutions",
  packages: "/how-we-work",
  "digital-products": "/solutions",
};
export const audienceIds = ["providers", "digital-health-companies"] as const;
const simple = new Set(["work", "how-we-work", "about", "contact", "faq", "glossary"]);

export function resolve(pathname: string, collections: Collections): Resolved {
  const locale: Locale = /^\/ar(?=\/|$)/.test(pathname) ? "ar" : "en";
  const rest = locale === "ar" ? pathname.slice(3) : pathname;
  const segments = rest.split("/").slice(1);
  const missing = { kind: "missing", locale } as const;
  if (rest !== "" && rest !== "/" && segments.some((s) => s === "")) return missing;
  const [first = "", second, third] = rest === "" || rest === "/" ? [] : segments;
  if (third !== undefined) return missing;
  const page = (view: View): Resolved => ({
    kind: "page",
    locale,
    path: "/" + [first, second].filter(Boolean).join("/"),
    ...view,
  });
  if (second === undefined) {
    if (first === "") return page({ view: "home" });
    if (legacy[first]) return { kind: "redirect", to: localPath(legacy[first], locale) };
    if (first === "solutions") return page({ view: "solutions" });
    if (first === "insights") return page({ view: "insights" });
    if (first === "resources") return page({ view: "resources" });
    if (simple.has(first)) return page({ view: first } as View);
    if (Object.hasOwn(policies, first)) return page({ view: "policy", slug: first });
    if ((audienceIds as readonly string[]).includes(first))
      return page({ view: "audience", slug: first });
    return missing;
  }
  if (first === "solutions" && engagements.some((e) => e.id === second))
    return page({ view: "solution", slug: second });
  if (first === "work" && projects.some((p) => p.id === second))
    return page({ view: "project", slug: second });
  if (first === "insights" && collections.insights.includes(second))
    return page({ view: "insight", slug: second });
  if (first === "resources" && collections.resources.includes(second))
    return page({ view: "resource", slug: second });
  return missing;
}

/** Every public, indexable base path (English form). */
export function allPaths(collections: Collections): string[] {
  return [
    "/",
    ...audienceIds.map((id) => `/${id}`),
    "/solutions",
    ...engagements.map((e) => `/solutions/${e.id}`),
    "/work",
    ...projects.map((p) => `/work/${p.id}`),
    "/how-we-work",
    "/insights",
    ...collections.insights.map((s) => `/insights/${s}`),
    "/resources",
    ...collections.resources.map((s) => `/resources/${s}`),
    "/glossary",
    "/about",
    "/contact",
    "/faq",
    ...Object.keys(policies).map((p) => `/${p}`),
  ];
}
