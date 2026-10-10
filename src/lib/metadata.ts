import { ORIGIN, localPath, ui } from "./content";
import type { Locale } from "./content";
export function pageHead(
  path: string,
  locale: Locale,
  title: string,
  description = ui.intro[locale],
) {
  const url = ORIGIN + localPath(path, locale);
  return {
    meta: [
      { title: `${title} | ProHealth Digital LLC` },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: locale === "ar" ? "ar" : "en_US" },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en", href: ORIGIN + path },
      { rel: "alternate", hrefLang: "ar", href: ORIGIN + localPath(path, "ar") },
      { rel: "alternate", hrefLang: "x-default", href: ORIGIN + path },
    ],
  };
}
