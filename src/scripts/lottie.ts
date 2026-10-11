/** Lazy Lottie icons (light player: no expressions, no eval — CSP-safe). */
export default async function init(el: HTMLElement) {
  const src = el.dataset.lottie;
  if (!src) return;
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const [{ default: lottie }, data] = await Promise.all([
    import("lottie-web/build/player/lottie_light"),
    fetch(src).then((r) => r.json()),
  ]);
  el.replaceChildren();
  const anim = lottie.loadAnimation({
    container: el,
    renderer: "svg",
    loop: el.dataset.loop !== "false",
    autoplay: !mq.matches,
    animationData: data,
    rendererSettings: { preserveAspectRatio: "xMidYMid meet", progressiveLoad: true },
  });
  // Reduced motion shows one meaningful still (data-static-frame, else the last frame).
  const still = () =>
    anim.goToAndStop(Number(el.dataset.staticFrame ?? anim.totalFrames - 1), true);
  let visible = false;
  const sync = () => (mq.matches ? still() : visible ? anim.play() : anim.pause());
  anim.addEventListener("DOMLoaded", sync);
  mq.addEventListener("change", sync);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(el);
}
