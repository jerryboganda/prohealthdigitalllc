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

/* Close the mobile popover after choosing a link (same-page anchors). */
document.getElementById("mobile-menu")?.addEventListener("click", (event) => {
  if ((event.target as Element).closest("a"))
    document.getElementById("mobile-menu")?.hidePopover?.();
});

/* Lazy behaviour modules (needed with or without motion). */
function lazy(selector: string, load: () => Promise<{ default: (el: HTMLElement) => void }>) {
  const nodes = $$(selector);
  if (!nodes.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          load().then((m) => m.default(entry.target as HTMLElement));
        }
    },
    { rootMargin: "300px 0px" },
  );
  nodes.forEach((n) => io.observe(n));
}
lazy("[data-inquiry-form]", () => import("./inquiry-form.ts"));
lazy("[data-lottie]", () => import("./lottie.ts"));

function reveals() {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        if (el.hasAttribute("data-reveal-stagger"))
          Array.from(el.children).forEach((child, i) => {
            (child as HTMLElement).style.transitionDelay = `${Math.min(i, 8) * 70}ms`;
            child.classList.add("is-revealed");
          });
        else el.classList.add("is-revealed");
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  $$("[data-reveal], [data-reveal-stagger]").forEach((el) => io.observe(el));
  return () => io.disconnect();
}

function splits() {
  const splitters: SplitText[] = [];
  for (const el of $$("[data-split]")) {
    const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
    splitters.push(split);
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      ease,
      stagger: 0.08,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  }
  return () => splitters.forEach((s) => s.revert());
}

function draws() {
  for (const svg of $$("[data-draw]")) {
    const paths = $$("[data-draw-path]", svg);
    gsap.fromTo(
      paths.length ? paths : $$("path, line, polyline, circle", svg),
      { drawSVG: "0%" },
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
        start: "top top",
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
mm.add(
  {
    motion: "(prefers-reduced-motion: no-preference)",
    fine: "(hover: hover) and (pointer: fine)",
    desktop: "(min-width: 1024px)",
  },
  (context) => {
    const { motion, fine, desktop } = context.conditions as Record<string, boolean>;
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
    logoIntro();
    if (desktop) pinTracks();
    if (fine) {
      magnetic();
      tilt();
    }
    lazy("[data-shader]", () => import("./shader.ts"));
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      stopReveals();
      revertSplits();
      root.classList.remove("motion-ready");
    };
  },
);
