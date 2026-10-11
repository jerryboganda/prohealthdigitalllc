# ProHealth Digital Website

Bilingual (English/Arabic) website for ProHealth Digital LLC — healthcare technology delivery for providers and digital health companies in the GCC and South Asia.

## Stack

- **Astro 7** with `@astrojs/node` (standalone server, per-request rendering) and MDX content collections.
- **Tailwind CSS 4** design tokens (`src/styles/global.css`), self-hosted fonts via the Astro Fonts API (Newsreader, IBM Plex Sans, Noto Naskh Arabic, IBM Plex Sans Arabic).
- **GSAP** motion runtime (`src/scripts/motion.ts`): ScrollTrigger, SplitText, DrawSVG, a lazy raw-WebGL hero shader, Lottie micro-icons and native cross-document view transitions. Everything honours `prefers-reduced-motion` and mirrors in RTL.
- No React on the client, no analytics, no cookies, no third-party requests; strict CSP and security headers from `src/middleware.ts`.

## Structure

| Path | Purpose |
| --- | --- |
| `src/pages/[...path].astro` | Single catch-all page; `src/lib/routes.ts` resolves every URL to a page, a 301 redirect or a localized 404. English at `/`, Arabic at `/ar`. |
| `src/views/*` | Page templates (home, solutions, audiences, work, insights, resources, glossary, policies, contact…). |
| `src/components/*` | Design-system components (header, footer, section heading, engagement cards, process timeline, inquiry form, mockups…). |
| `src/lib/content.ts`, `copy.ts`, `meta.ts`, `audiences.ts`, `glossary.ts`, `engagement-details.ts` | All structured copy as `text(en, ar)` pairs; tests require both languages. |
| `src/content/{insights,resources}/{en,ar}/*.mdx` | Long-form articles; a slug is published only when both languages exist. |
| `src/lib/schema.ts`, `seo.ts` | JSON-LD graph and head metadata; per-page OG images are generated at build (`src/pages/og/[...route].ts`). |
| `src/lib/inquiry.ts`, `inquiry.server.ts`, `src/pages/api/inquiries.ts` | Inquiry validation and authenticated SMTP delivery (unchanged security model). |

## Development

```sh
npm install
npm run dev
```

## Verification

```sh
npm run lint && npm test && npm run build && npm run check
```

With the production build running (`PORT=3100 HOST=127.0.0.1 node .output/server/index.mjs`):

```sh
npm run check:routes          # every page × locale: lang/dir, canonical, hreflang, single h1, unique meta, JSON-LD, CSP-safe scripts, OG images, redirects, 404s, sitemap
node scripts/visual-qa.mjs    # Playwright (system Chrome): no overflow, no console errors, nothing left hidden, Lottie renders — mobile, desktop, reduced motion
```

Regenerate brand rasters with `node scripts/brand-assets.mjs` and Lottie icons with `node scripts/lottie-icons.mjs`.

## Production

`npm run build` writes `.output/server/index.mjs` plus static files in `.output/client`; the server bundle includes its dependencies, so the read-only production container mounts only `.output`. See [deployment and acceptance notes](deploy/OVERHAUL.md).
