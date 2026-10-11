import { OGImageRoute } from "astro-og-canvas";
import { ogPages } from "../../site/og-pages.ts";

export const prerender = true;

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: await ogPages(),
  getImageOptions: (_path, page: Awaited<ReturnType<typeof ogPages>>[string]) => {
    const ar = page.locale === "ar";
    return {
      title: page.title,
      description: page.description,
      dir: ar ? "rtl" : "ltr",
      bgImage: { path: `./src/og/background-${ar ? "rtl" : "ltr"}.png`, fit: "cover" },
      logo: { path: "./src/og/mark.png", size: [104] },
      padding: 72,
      fonts: [
        "./src/og/Newsreader.ttf",
        "./src/og/IBMPlexSans.ttf",
        "./src/og/NotoNaskhArabic.ttf",
        "./src/og/IBMPlexSansArabic-Regular.ttf",
        "./src/og/IBMPlexSansArabic-SemiBold.ttf",
      ],
      font: {
        title: {
          families: ar ? ["Noto Naskh Arabic"] : ["Newsreader"],
          size: ar ? 58 : 64,
          lineHeight: ar ? 1.45 : 1.08,
          color: [10, 29, 61],
          weight: ar ? "Bold" : "Normal",
        },
        description: {
          families: ar ? ["IBM Plex Sans Arabic"] : ["IBM Plex Sans"],
          size: 28,
          lineHeight: ar ? 1.7 : 1.45,
          color: [36, 54, 90],
        },
      },
    };
  },
});
