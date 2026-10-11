import { ORIGIN, localPath } from "./content.ts";
import type { Locale } from "./content.ts";

export interface PageMeta {
  locale: Locale;
  /** English base path, e.g. "/solutions/care-workflows". */
  path: string;
  title: string;
  description: string;
  type?: "website" | "article";
  noindex?: boolean;
  published?: Date;
  updated?: Date;
}

export const SITE_NAME = "ProHealth Digital";

export function ogImagePath(locale: Locale, path: string) {
  return `/og/${locale}${path === "/" ? "/home" : path}.png`;
}

export function headFor(meta: PageMeta) {
  const url = ORIGIN + localPath(meta.path, meta.locale);
  const fullTitle =
    meta.path === "/" ? `${SITE_NAME} — ${meta.title}` : `${meta.title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    ogTitle: meta.title,
    description: meta.description,
    canonical: url,
    alternates: [
      { hreflang: "en", href: ORIGIN + meta.path },
      { hreflang: "ar", href: ORIGIN + localPath(meta.path, "ar") },
      { hreflang: "x-default", href: ORIGIN + meta.path },
    ],
    ogLocale: meta.locale === "ar" ? "ar_AR" : "en_US",
    ogLocaleAlternate: meta.locale === "ar" ? "en_US" : "ar_AR",
    ogImage: ORIGIN + ogImagePath(meta.locale, meta.path),
    type: meta.type ?? "website",
  };
}
