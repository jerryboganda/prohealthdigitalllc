import { EMAIL, ORIGIN, localPath, ui } from "./content.ts";
import type { Engagement, Locale, Localized } from "./content.ts";
import { ogImagePath } from "./seo.ts";

const ORG = `${ORIGIN}/#organization`;
const SITE = `${ORIGIN}/#website`;
const countries = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Pakistan",
];
const areaServed = countries.map((name) => ({ "@type": "Country", name }));
const url = (path: string, locale: Locale) => ORIGIN + localPath(path, locale);

export function organization(locale: Locale) {
  return {
    "@type": "Organization",
    "@id": ORG,
    name: "ProHealth Digital LLC",
    alternateName: "ProHealth Digital",
    url: ORIGIN,
    email: EMAIL,
    logo: { "@type": "ImageObject", url: `${ORIGIN}/icon-512.png`, width: 512, height: 512 },
    description: ui.intro[locale],
    address: { "@type": "PostalAddress", addressCountry: "US" },
    areaServed,
    knowsLanguage: ["en", "ar"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: EMAIL,
      availableLanguage: ["English", "Arabic"],
      areaServed: countries,
    },
  };
}

export function website() {
  return {
    "@type": "WebSite",
    "@id": SITE,
    url: ORIGIN,
    name: "ProHealth Digital",
    inLanguage: ["en", "ar"],
    publisher: { "@id": ORG },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function webPage(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  trail: Crumb[];
  homeName: string;
  type?: string;
}) {
  const pageUrl = url(opts.path, opts.locale);
  const items = [{ name: opts.homeName, path: "/" }, ...opts.trail];
  const nodes: object[] = [
    {
      "@type": opts.type ?? "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: opts.title,
      description: opts.description,
      inLanguage: opts.locale,
      isPartOf: { "@id": SITE },
      about: { "@id": ORG },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: ORIGIN + ogImagePath(opts.locale, opts.path),
      },
      ...(opts.trail.length ? { breadcrumb: { "@id": `${pageUrl}#breadcrumb` } } : {}),
    },
  ];
  if (opts.trail.length)
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: items.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: url(c.path, opts.locale),
      })),
    });
  return nodes;
}

export function service(e: Engagement, locale: Locale) {
  return {
    "@type": "Service",
    "@id": `${url(`/solutions/${e.id}`, locale)}#service`,
    name: e.title[locale],
    description: `${e.problem[locale]} ${e.fit[locale]}`,
    serviceType: e.title.en,
    url: url(`/solutions/${e.id}`, locale),
    provider: { "@id": ORG },
    areaServed,
    availableLanguage: ["English", "Arabic"],
    audience: {
      "@type": "BusinessAudience",
      audienceType: e.audience === "provider" ? "Healthcare providers" : "Digital health companies",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: e.title[locale],
      itemListElement: e.outputs.map((o) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: o[locale] },
      })),
    },
  };
}

export function faqPage(items: { q: Localized; a: Localized }[], locale: Locale, path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${url(path, locale)}#faq`,
    inLanguage: locale,
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q[locale],
      acceptedAnswer: { "@type": "Answer", text: i.a[locale] },
    })),
  };
}

export function article(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  published: Date;
  updated: Date;
  section: string;
  words?: number;
}) {
  const pageUrl = url(opts.path, opts.locale);
  return {
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: opts.title,
    description: opts.description,
    inLanguage: opts.locale,
    datePublished: opts.published.toISOString(),
    dateModified: opts.updated.toISOString(),
    articleSection: opts.section,
    ...(opts.words ? { wordCount: opts.words } : {}),
    image: ORIGIN + ogImagePath(opts.locale, opts.path),
    author: { "@id": ORG },
    publisher: { "@id": ORG },
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    isPartOf: { "@id": SITE },
  };
}

export function definedTermSet(
  terms: { id: string; term: Localized; definition: Localized }[],
  locale: Locale,
  path: string,
  name: string,
) {
  const setUrl = url(path, locale);
  return {
    "@type": "DefinedTermSet",
    "@id": `${setUrl}#terms`,
    name,
    inLanguage: locale,
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${setUrl}#${t.id}`,
      name: t.term[locale],
      description: t.definition[locale],
      inDefinedTermSet: { "@id": `${setUrl}#terms` },
    })),
  };
}

export function itemList(locale: Locale, items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: url(item.path, locale),
    })),
  };
}
