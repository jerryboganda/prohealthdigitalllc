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
      // Readex Pro static cuts (Latin + Arabic in one file), matching the site font.
      fonts: ["./src/og/ReadexPro-SemiBold.ttf", "./src/og/ReadexPro-Regular.ttf"],
      font: {
        title: {
          families: ["Readex Pro"],
          size: ar ? 58 : 64,
          lineHeight: ar ? 1.4 : 1.08,
          color: [10, 20, 51],
          weight: "SemiBold",
        },
        description: {
          families: ["Readex Pro"],
          size: 28,
          lineHeight: ar ? 1.65 : 1.45,
          color: [41, 53, 90],
          weight: "Normal",
        },
      },
    };
  },
});
