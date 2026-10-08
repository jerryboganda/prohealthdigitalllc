import { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  duration?: number; // duration in ms
  prefix?: string;
  suffix?: string;
}

export function Counter({ target, duration = 1600, prefix = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(target); // Initialize to target to match SSR output
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Set isMounted to true on client mount, and reset count to 0 to prepare for animation
  useEffect(() => {
    setIsMounted(true);
    setCount(0);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const el = ref.current;
    if (!el) return;

    // Guard against environments where IntersectionObserver is not defined (e.g. testing or static generation bots)
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMounted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // easeOutQuad easing function: progress * (2 - progress)
      const easeProgress = progress * (2 - progress);
      const current = Math.floor(easeProgress * target);

      setCount(current);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frameId = window.requestAnimationFrame(step);
    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
