# Motion & video toolkit

73 motion/video skills live in `.claude/skills/` (auto-triggered by description). Third-party support files for some skills are in `.claude/vendor/` — skills that cite `sfx/`, `sims/`, `scripts/` mean `.claude/vendor/claude-motion/…` or `.claude/vendor/motion-design-skills/scripts/`.

Installed libraries: `motion`, `gsap` + `@gsap/react`, `lottie-web`, `remotion` + `@remotion/player`, `hyperframes` (dev, CLI: `npx hyperframes doctor|init|lint|preview|render`).

## Which skill for what

| Task | Use |
| --- | --- |
| On-site UI motion (this React 19 / TanStack Start app) | `motion-dev-animations` (Motion), `gsap-core` / `gsap-react` / `gsap-scrolltrigger` / `gsap-timeline`, `lottiefiles-motion-design`, `motion-background`, `animation-principles` |
| Motion direction / audit of the site | `motion-director`, `site-motion-excellence-director`, `web-motion-auditor`, `motion-art-direction` |
| Remotion video | `remotion-best-practices` (router), `remotion-motion-graphics`, `klik-remotion-method` → `klik-anim` + `klik-cam`, `claude-motion-design`, `review-loop`, `sound-design` |
| HyperFrames HTML video | `motion-doctrine` first, then `hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `make-a-video`, `website-to-hyperframes`, `edit-video`, `short-form-edit` |
| Launch / promo / reel | `product-launch-motion`, `launch-video`, `apple-launch-film`, `motion-showreel`, `hyperframes-motion-reel`, `reel-export` |
| Procedural canvas video with score | `animate` |
| Logo / brand / color | `logo-animation`, `color-motion`, `brand-intake` |

## Rules for this project

- Production site code (`src/`) uses Motion or GSAP; every animation must honour `prefers-reduced-motion`.
- The site sets `dir`/`lang` (see `src/routes/__root.tsx`): mirror horizontal motion for RTL.
- Video projects live outside `src/`. `video/` is the Remotion workspace (own `package.json`, `@remotion/cli` + `@remotion/renderer`; `cd video && npx remotion studio src/index.ts`). Render with `--browser-executable` pointing at system Chrome if no headless shell is cached.
- `.claude/` is excluded from eslint/prettier on purpose (third-party content).
- Video rendering needs FFmpeg on PATH; run `npx hyperframes doctor` to check the toolchain.
