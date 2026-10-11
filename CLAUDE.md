# ProHealth Digital site

Astro 7 + `@astrojs/node` (standalone), Tailwind 4, GSAP, MDX. Bilingual EN (root) / AR (`/ar`, RTL). See `README.md` for structure and `deploy/OVERHAUL.md` for release rules.

## Rules for this project

- Routing: every URL goes through `src/lib/routes.ts` (framework-free, unit-tested) and `src/pages/[...path].astro`. New public pages must be added to `resolve()` and `allPaths()`; `check:routes` and the sitemap derive from them.
- Copy: every visible string is a `text(en, ar)` pair in `src/lib/*.ts`, or an MDX file in BOTH `src/content/<collection>/en` and `/ar` (unpaired slugs are not routed). `src/lib/*` must never import `astro:*` (tests run them with plain Node).
- Truthfulness: no invented clients, numbers, testimonials, team members, guarantees or regulatory claims; facts need a primary-source link. We deliver technology; customers own clinical decisions.
- Motion: GSAP only, through the data-attribute runtime in `src/scripts/motion.ts` (`data-reveal`, `data-reveal-stagger`, `data-split`, `data-draw`, `data-parallax`, `data-pin-track`, `data-magnetic`, `data-tilt`, `data-lottie`, `data-shader`). Content must be visible without JS and under `prefers-reduced-motion: reduce`. Multiply horizontal motion by `dir`; never split, letter-space or italicise Arabic (see `.claude/skills/prohealth-rtl`).
- CSP is `script-src 'self'`: no inline scripts or inline event handlers; keep `vite.build.assetsInlineLimit: 0`. First-load JS budget is 180 KB (asserted).
- Deploy parity: build must keep `.output/server/index.mjs` with bundled deps; do not change `deploy/compose.yaml` or `release.sh` without an explicit decision.
- Verify with `npm run lint && npm test && npm run build && npx astro check`, then `check:routes` and `node scripts/visual-qa.mjs` against the built server.
- `.claude/` and `video/` are excluded from eslint/prettier on purpose.

## Motion & video toolkit

~80 skills live in `.claude/skills/` (auto-triggered). Support files cited by some skills are in `.claude/vendor/`.

| Task | Use |
| --- | --- |
| On-site motion | `gsap-core` / `gsap-scrolltrigger` / `gsap-timeline` / `gsap-plugins` / `gsap-performance`, `lottiefiles-motion-design`, `motion-background`, `animation-principles`, `threejs-shaders` |
| Motion direction / audit | `motion-director`, `site-motion-excellence-director`, `web-motion-auditor`, `motion-art-direction` |
| Web quality | `web-quality-audit`, `performance`, `core-web-vitals`, `accessibility`, `seo`, `best-practices`, `web-design-guidelines`, `webapp-testing` |
| Remotion video (`video/` workspace) | `remotion-best-practices`, `remotion-motion-graphics`, `klik-remotion-method` → `klik-anim` + `klik-cam`, `claude-motion-design`, `review-loop`, `sound-design` |
| HyperFrames video | `motion-doctrine` first, then `hyperframes`, `hyperframes-cli`, `make-a-video`, `website-to-hyperframes` |
| Launch / promo / reel | `product-launch-motion`, `launch-video`, `apple-launch-film`, `motion-showreel`, `reel-export` |
| Logo / brand / color | `logo-animation`, `color-motion`, `brand-intake` |

Video projects live in `video/` (own `package.json`; `cd video && npx remotion studio src/index.ts`); rendering needs FFmpeg on PATH (`npx hyperframes doctor`).
