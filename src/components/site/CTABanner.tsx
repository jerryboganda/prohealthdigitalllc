import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

interface Props {
  eyebrow?: string;
  title?: string;
  body?: string;
  primaryTo?: string;
  primaryLabel?: string;
  secondaryTo?: string;
  secondaryLabel?: string;
}

export function CTABanner({
  eyebrow = "Let's build together",
  title = "Ready to grow your healthcare business?",
  body = "Bring us a challenge — a website that needs to convert, a clinic that needs a digital foundation, a course platform that needs to launch. We'll show you the shortest credible path.",
  primaryTo = "/contact",
  primaryLabel = "Start a conversation",
  secondaryTo = "/packages",
  secondaryLabel = "See packages",
}: Props) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 opacity-[0.08] dot-bg" aria-hidden />
      <div className="relative mx-auto max-w-350 px-6 lg:px-10 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="eyebrow text-teal!">{eyebrow}</div>
          <h2 className="mt-5 text-display text-4xl sm:text-5xl lg:text-6xl text-white">{title}</h2>
          <p className="mt-6 text-[16px] lg:text-[17px] leading-relaxed text-white/70 max-w-2xl">
            {body}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={primaryTo}
              className="inline-flex items-center gap-2 bg-white text-navy px-5 py-3 rounded-md font-medium text-[14px] hover:bg-teal hover:text-white transition-colors"
            >
              {primaryLabel} <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={secondaryTo}
              className="inline-flex items-center gap-2 border border-white/20 text-white px-5 py-3 rounded-md font-medium text-[14px] hover:bg-white/10 transition-colors"
            >
              {secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
