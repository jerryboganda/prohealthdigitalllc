# ProHealth Digital site

Astro 7 + `@astrojs/node` (standalone), Tailwind 4, GSAP, MDX. Bilingual EN (root) / AR (`/ar`, RTL). See `README.md` for structure and `deploy/OVERHAUL.md` for release rules.

## Rules for this project

- Routing: every URL goes through `src/lib/routes.ts` (framework-free, unit-tested) and `src/pages/[...path].astro`. New public pages must be added to `resolve()` and `allPaths()`; `check:routes` and the sitemap derive from them.
- Copy: every visible string is a `text(en, ar)` pair in `src/lib/*.ts`, or an MDX file in BOTH `src/content/<collection>/en` and `/ar` (unpaired slugs are not routed). `src/lib/*` must never import `astro:*` (tests run them with plain Node).
- Truthfulness: no invented clients, numbers, testimonials, team members, guarantees or regulatory claims; facts need a primary-source link. We deliver technology; customers own clinical decisions.
- Motion: GSAP only, through the data-attribute runtime in `src/scripts/motion.ts` (`data-reveal` incl. `="scale"`/`="side"`, `data-reveal-stagger`, `data-split`, `data-draw`, `data-parallax`, `data-pin-track`, `data-progress`, `data-magnetic`, `data-tilt`, `data-lottie`, `data-shader`, `data-insight-filter`, `data-glossary-search`); decorative loops are CSS in `global.css` and must be listed in its `.motion-pause` rule. Content must be visible without JS and under `prefers-reduced-motion: reduce`. Multiply horizontal motion by `dir`; never split, letter-space or italicise Arabic.
- CSP is `script-src 'self'`: no inline scripts or inline event handlers; keep `vite.build.assetsInlineLimit: 0`. First-load JS budget is 180 KB (asserted).
- Deploy parity: build must keep `.output/server/index.mjs` with bundled deps; do not change `deploy/compose.yaml` or `release.sh` without an explicit decision.
- Verify with `npm run lint && npm test && npm run build && npx astro check`, then `check:routes` and `node scripts/visual-qa.mjs` against the built server.
- `.claude/` and `video/` are excluded from eslint/prettier on purpose.

## Motion & video toolkit

Project skills in `.claude/skills/` (committed, auto-triggered, MIT, copied unmodified from upstream on 2026-11-19):

| Task                                 | Skill                                                                                                                                                    | Source                                                                                           |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| GSAP motion                          | `gsap-core`, `gsap-scrolltrigger`, `gsap-timeline`, `gsap-plugins`, `gsap-utils`, `gsap-performance`, `gsap-frameworks`                                  | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) (official)                     |
| Timing, easing, choreography, Lottie | `motion-design`                                                                                                                                          | [lottiefiles/motion-design-skill](https://github.com/lottiefiles/motion-design-skill) (official) |
| WebGL / 3D                           | `threejs-fundamentals`, `-geometry`, `-materials`, `-shaders`, `-postprocessing`, `-interaction`, `-animation`, `-lighting`, `-textures`, `-performance` | [cloudai-x/threejs-skills](https://github.com/cloudai-x/threejs-skills) (community)              |

To update one, re-copy its folder from upstream. Not committed here, but useful if installed for your user: `ui-ux-pro-max`, `impeccable`, `emil-design-eng`, `animate`, `review-animations`, `animation-performance`, `find-animation-opportunities`, `break-ui`.

MCP servers (`.mcp.json`): `astro-docs`, `context7` (library docs), `chrome-devtools` (screenshots, Lighthouse, performance traces), `lottie-creator` (make Lottie animations; sign in with `/mcp`, AI-generated assets spend LottieFiles credits).

There is no `video/` workspace yet; `hyperframes` is a devDependency only.
