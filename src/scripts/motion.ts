/**
 * Site motion runtime. One entry, driven by data attributes:
 *   data-reveal / data-reveal-stagger   fade-and-rise when scrolled into view (CSS transition)
 *   data-split                          line-by-line masked heading reveal (GSAP SplitText)
 *   data-draw                           SVG strokes draw on scroll (DrawSVG)
 *   data-parallax="0.12"                scrubbed vertical drift
 *   data-pin-track                      horizontal pinned track (desktop)
 *   data-magnetic / data-tilt           pointer micro-interactions (fine pointers only)
 *   data-intro                          logo intro, once per session
 *   data-progress                       reading progress bar
 *   data-shader / data-inquiry-form / data-lottie   lazily loaded modules
 * Content is visible without JS. With prefers-reduced-motion: reduce, nothing is hidden or animated.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

const root = document.documentElement;
const dir = root.dir === "rtl" ? -1 : 1;
const ease = "expo.out";
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T & Element>(sel)) as T[];

/* Header glass state: always on, independent of motion preference. */
const header = document.querySelector<HTMLElement>("[data-header]");
const syncHeader = () => header?.setAttribute("data-scrolled", String(window.scrollY > 8));
window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

const menu = document.getElementById("mobile-menu");
/* Close the mobile popover after choosing a link (same-page anchors). */
menu?.addEventListener("click", (event) => {
  if ((event.target as Element).closest("a")) menu.hidePopover?.();
});
/* While the full-screen menu is open, the page behind it is inert (focus and AT stay in the menu).
   Inert is lifted on beforetoggle so the browser can return focus to "Open menu". */
const behindMenu = () =>
  document.querySelectorAll<HTMLElement>("body > :not(header, script), .header-shell");
menu?.addEventListener("toggle", (event) => {
  if ((event as ToggleEvent).newState === "open") behindMenu().forEach((el) => (el.inert = true));
});
menu?.addEventListener("beforetoggle", (event) => {
  if ((event as ToggleEvent).newState === "closed")
    behindMenu().forEach((el) => (el.inert = false));
});
/* No Popover API (e.g. Safari < 17): drive the menu with a class instead (see global.css). */
if (menu && !("showPopover" in HTMLElement.prototype)) {
  document.addEventListener("click", (event) => {
    const target = event.target as Element;
    const toggle = target.closest("[popovertarget='mobile-menu']");
    if (toggle)
      menu.classList.toggle("is-open", toggle.getAttribute("popovertargetaction") !== "hide");
    else if (target.closest("#mobile-menu a")) menu.classList.remove("is-open");
  });
}

/* Lazy behaviour modules (needed with or without motion). */
function lazy(selector: string, load: () => Promise<{ default: (el: HTMLElement) => void }>) {
  const nodes = $$(selector);
  if (!nodes.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          load()
            .then((m) => m.default(entry.target as HTMLElement))
            // Chunk failed (e.g. a deploy swapped hashes): show the form's pre-rendered fallback.
            .catch(() =>
              (entry.target as HTMLElement)
                .querySelector<HTMLElement>("[data-form-alert]")
                ?.removeAttribute("hidden"),
            );
        }
    },
    { rootMargin: "300px 0px" },
  );
  nodes.forEach((n) => io.observe(n));
}
lazy("[data-inquiry-form]", () => import("./inquiry-form.ts"));
lazy("[data-lottie]", () => import("./lottie.ts"));

const inView = (el: Element) => el.getBoundingClientRect().top < window.innerHeight;

function reveals() {
  const all = $$("[data-reveal], [data-reveal-stagger]");
  // Anything already on screen when motion boots stays put (no flash); the rest reveals on entry.
  for (const el of all)
    if (inView(el)) {
      el.classList.add("is-revealed");
      Array.from(el.children).forEach(
        (c) => el.hasAttribute("data-reveal-stagger") && c.classList.add("is-revealed"),
      );
    }
  const pending = new Set(all.filter((el) => !el.classList.contains("is-revealed")));
  const show = (el: HTMLElement) => {
    pending.delete(el);
    io.unobserve(el);
    if (el.hasAttribute("data-reveal-stagger"))
      Array.from(el.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, 8) * 70}ms`);
        child.classList.add("is-revealed", "is-revealing");
      });
    else el.classList.add("is-revealed", "is-revealing");
  };
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && show(e.target as HTMLElement)),
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  pending.forEach((el) => io.observe(el));
  // Fast scrolls and anchor jumps can skip past an element between frames: reveal anything
  // that is already above the fold line.
  let ticking = false;
  const sweep = () => {
    ticking = false;
    for (const el of pending)
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) show(el);
    if (!pending.size) window.removeEventListener("scroll", onScroll);
  };
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(sweep);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    // Already revealed: must not replay when motion-ready is toggled by a media-query change.
    $$(".is-revealing").forEach((el) => el.classList.remove("is-revealing"));
  };
}

function splits() {
  const splitters: SplitText[] = [];
  // Arabic: no masks (Naskh dots and descenders overflow the line box) and never split
  // below the line, so letter joining is untouched.
  const rtl = dir < 0;
  // Split lazily, just before a heading scrolls in; headings already visible are left alone.
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        // Already painted on screen (anchor jump, scrollbar drag, fast fling): leave it visible rather than hide-then-rise.
        if (entry.boundingClientRect.top < window.innerHeight) continue;
        const split = SplitText.create(el, {
          type: "lines",
          mask: rtl ? undefined : "lines",
          linesClass: "split-line",
        });
        splitters.push(split);
        gsap.from(split.lines, {
          ...(rtl ? { y: 18, opacity: 0 } : { yPercent: 110 }),
          duration: rtl ? 0.9 : 1.1,
          ease,
          stagger: 0.08,
          delay: 0.05,
        });
      }
    },
    { rootMargin: "0px 0px 10% 0px" },
  );
  for (const el of $$("[data-split]")) if (!inView(el)) io.observe(el);
  return () => {
    io.disconnect();
    splitters.forEach((s) => s.revert());
  };
}

function draws() {
  for (const svg of $$("[data-draw]")) {
    // Already on screen at boot: leave it drawn (no erase/redraw flash), same as reveals/splits.
    if (svg.dataset.draw !== "scrub" && inView(svg)) continue;
    const paths = $$("[data-draw-path]", svg);
    gsap.fromTo(
      paths.length ? paths : $$("path, line, polyline, circle", svg),
      // The pulse lines are never mirrored, so in RTL they draw from their right (inline-start) end.
      { drawSVG: dir < 0 ? "100% 100%" : "0%" },
      {
        drawSVG: "100%",
        duration: 1.8,
        ease: "power2.inOut",
        stagger: 0.12,
        scrollTrigger: {
          trigger: svg,
          start: "top 85%",
          end: svg.dataset.draw === "scrub" ? "bottom 40%" : undefined,
          scrub: svg.dataset.draw === "scrub" ? 0.6 : false,
          once: svg.dataset.draw !== "scrub",
        },
      },
    );
  }
}

function parallax() {
  for (const el of $$("[data-parallax]")) {
    const amount = Number(el.dataset.parallax || 0.12);
    gsap.fromTo(
      el,
      { yPercent: amount * 100 },
      {
        yPercent: -amount * 100,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }
}

function pinTracks() {
  for (const section of $$("[data-pin-track]")) {
    const track = section.querySelector<HTMLElement>("[data-track]");
    const bar = section.querySelector<HTMLElement>("[data-track-progress]");
    if (!track) continue;
    const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        // Clear the sticky header; centre the track in the space below it when it fits.
        start: () => {
          const top = header?.offsetHeight ?? 0;
          return `top ${Math.max(top, (window.innerHeight + top - section.offsetHeight) / 2)}px`;
        },
        end: () => `+=${distance() + window.innerHeight * 0.4}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    tl.to(track, { x: () => -distance() * dir, ease: "none" }, 0);
    if (bar) tl.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
  }
}

function progressBars() {
  for (const bar of $$("[data-progress]")) {
    gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: bar.dataset.progress
            ? document.querySelector(bar.dataset.progress)
            : document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      },
    );
  }
}

function logoIntro() {
  const mark = document.querySelector<SVGElement>("[data-intro]");
  if (!mark) return;
  let seen = false;
  try {
    seen = sessionStorage.getItem("ph-intro") === "1";
    sessionStorage.setItem("ph-intro", "1");
  } catch {
    /* storage unavailable: play once per load */
  }
  const play = (delay = 0) =>
    gsap
      .timeline({ delay })
      .from(mark.querySelector(".mark-p"), { opacity: 0, x: -14, duration: 0.8, ease })
      .from(mark.querySelector(".mark-d"), { opacity: 0, x: 14, duration: 0.8, ease }, "<0.08")
      .fromTo(
        mark.querySelector(".mark-arc"),
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.9, ease: "power2.inOut" },
        "<0.1",
      )
      .from(
        mark.querySelectorAll(".mark-dots circle"),
        {
          scale: 0,
          transformOrigin: "center",
          duration: 0.5,
          ease: "back.out(2.4)",
          stagger: 0.08,
        },
        "<0.2",
      )
      .fromTo(
        mark.querySelector(".mark-pulse"),
        { drawSVG: "0%" },
        { drawSVG: "100%", duration: 0.8, ease: "power3.inOut" },
        "<0.1",
      );
  if (!seen) play(0.1);
  const brand = mark.closest("a");
  brand?.addEventListener("mouseenter", () => {
    gsap.fromTo(
      mark.querySelector(".mark-pulse"),
      { drawSVG: "0%" },
      { drawSVG: "100%", duration: 0.7, ease: "power3.inOut" },
    );
  });
}

function magnetic() {
  for (const el of $$("[data-magnetic]")) {
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * 0.22);
      yTo(dy * 0.3);
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
    el.addEventListener("pointerleave", () => {
      xTo(0);
      yTo(0);
    });
  }
}

function tilt() {
  for (const el of $$("[data-tilt]")) {
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
    gsap.set(el, { transformPerspective: 900 });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 6);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
      el.style.setProperty("--px", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--py", `${((e.clientY - r.top) / r.height) * 100}%`);
    });
    el.addEventListener("pointerleave", () => {
      rx(0);
      ry(0);
    });
  }
}

const mm = gsap.matchMedia();
const boot = () =>
  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      fine: "(hover: hover) and (pointer: fine)",
      desktop: "(min-width: 1024px)",
      wide: "(min-width: 1100px)", // must match ProcessTimeline.astro horizontal-track media query
    },
    (context) => {
      const { motion, fine, desktop, wide } = context.conditions as Record<string, boolean>;
      if (!motion) {
        root.classList.remove("motion-ready");
        return;
      }
      root.classList.add("motion-ready");
      const stopReveals = reveals();
      const revertSplits = splits();
      draws();
      parallax();
      progressBars();
      if (wide) pinTracks();
      if (fine) {
        magnetic();
        tilt();
      }
      // WebGL only where it is cheap and visible enough to matter: desktop with a fine pointer.
      // The shader pauses itself off-screen; it is disposed whenever these conditions change.
      let live = true;
      let stopShader: (() => void) | void;
      const shaderHost =
        desktop && fine ? document.querySelector<HTMLElement>("[data-shader]") : null;
      if (shaderHost)
        import("./shader.ts").then((m) => {
          if (live) stopShader = m.default(shaderHost);
        });
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        live = false;
        stopShader?.();
        stopReveals();
        revertSplits();
        root.classList.remove("motion-ready");
      };
    },
  );
// The logo intro is tiny and must start before first paint settles, so it is not deferred.
if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches) logoIntro();
// Motion is an enhancement: set it up after the page has loaded and the main thread is idle.
const idle = (fn: () => void) =>
  "requestIdleCallback" in window
    ? window.requestIdleCallback(fn, { timeout: 1500 })
    : setTimeout(fn, 200);
if (document.readyState === "complete") idle(boot);
else window.addEventListener("load", () => idle(boot), { once: true });
