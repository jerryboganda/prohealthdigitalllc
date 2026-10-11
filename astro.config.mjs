// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import node from "@astrojs/node";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// Output mirrors the old Nitro layout (.output/server/index.mjs + static files) so
// deploy/compose.yaml and deploy/release.sh run the new build unchanged.
export default defineConfig({
  site: "https://prohealthdigitalllc.com",
  output: "server",
  outDir: ".output",
  trailingSlash: "never",
  compressHTML: true,
  // The production container is read-only; the adapter would otherwise enable file sessions.
  session: false,
  adapter: node({ mode: "standalone", bodySizeLimit: 64 * 1024 }),
  integrations: [mdx()],
  build: { serverEntry: "index.mjs", inlineStylesheets: "auto", format: "file" },
  devToolbar: { enabled: false },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Newsreader",
      cssVariable: "--font-newsreader",
      weights: [400],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Sans",
      cssVariable: "--font-plex",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Noto Naskh Arabic",
      cssVariable: "--font-naskh",
      // One face: Arabic display text is set at 600; lighter requests resolve to it.
      weights: [600],
      styles: ["normal"],
      subsets: ["arabic"],
      fallbacks: ["serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Sans Arabic",
      cssVariable: "--font-plex-arabic",
      weights: [400, 600],
      styles: ["normal"],
      subsets: ["arabic", "latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
  ],
  vite: {
    plugins: [
      tailwindcss(),
      {
        // The container mounts only .output (no node_modules): bundle runtime deps into the server.
        name: "prohealth:bundle-server-deps",
        configEnvironment(name) {
          if (name === "ssr") return { resolve: { noExternal: true } };
        },
      },
    ],
    // Never inline scripts: the CSP is `script-src 'self'`.
    build: { assetsInlineLimit: 0 },
  },
});
