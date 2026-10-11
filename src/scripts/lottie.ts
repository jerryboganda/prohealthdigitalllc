/** Lazy Lottie icons (light player: no expressions, no eval — CSP-safe). */
export default async function init(el: HTMLElement) {
  const src = el.dataset.lottie;
  if (!src) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [{ default: lottie }, data] = await Promise.all([
    import("lottie-web/build/player/lottie_light"),
    fetch(src).then((r) => r.json()),
  ]);
  el.replaceChildren();
  const anim = lottie.loadAnimation({
    container: el,
    renderer: "svg",
    loop: el.dataset.loop !== "false",
    autoplay: !reduce,
    animationData: data,
    rendererSettings: { preserveAspectRatio: "xMidYMid meet", progressiveLoad: true },
  });
  if (reduce)
    anim.addEventListener("DOMLoaded", () => anim.goToAndStop(anim.totalFrames - 1, true));
  else
    new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? anim.play() : anim.pause(),
    ).observe(el);
}
