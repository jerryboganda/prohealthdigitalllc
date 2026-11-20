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
      // One family for both scripts (Living Grid): Latin and Arabic share weight and rhythm.
      provider: fontProviders.fontsource(),
      name: "Readex Pro",
      cssVariable: "--font-readex",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin", "arabic"],
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
