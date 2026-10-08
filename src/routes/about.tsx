import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ProHealth Digital — Healthcare-Focused Digital Partner" },
      {
        name: "description",
        content:
          "Meet the team at ProHealth Digital LLC. Learn about our mission and core values as a dedicated software company and digital partner for medical clinics.",
      },
      {
        property: "og:title",
        content: "About ProHealth Digital — Healthcare-Focused Digital Partner",
      },
      {
        property: "og:description",
        content:
          "Learn about ProHealth Digital's mission as a dedicated software team for the medical industry and digital partner.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const VALUES = [
  {
    t: "Focus over breadth",
    d: "We work in one industry. That's what lets us ship faster than generalist agencies.",
  },
  {
    t: "Craft as a competitive edge",
    d: "Typography, spacing, and motion are treated as strategy, not decoration.",
  },
  {
    t: "Business before pixels",
    d: "Every design decision is defended in commercial terms — traffic, conversion, retention.",
  },
  {
    t: "Compliance awareness",
    d: "We understand the vocabulary of regulated industries and design around it, not against it.",
  },
  {
    t: "Ship weekly",
    d: "Momentum compounds. Every engagement runs on a weekly deliverable rhythm.",
  },
  {
    t: "Long-term partnership",
    d: "We stay after launch. Support, iteration, and growth work are how projects actually pay off.",
  },
];

function About() {
  return (
    <Layout>
      <section className="pt-36 lg:pt-48 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-350 px-6 lg:px-10">
          <Reveal>
            <div className="eyebrow">About</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-display text-[42px] sm:text-6xl lg:text-[80px] leading-[1.02] text-navy max-w-5xl">
              A digital partner built for the healthcare industry.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 text-[17px] lg:text-[19px] leading-relaxed text-muted-foreground max-w-2xl">
              ProHealth Digital LLC is a USA-based digital company working exclusively with clinics,
              medical professionals, educators, and health-tech businesses. We combine premium
              design, product engineering, and growth strategy under one operating discipline.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-hairline bg-secondary/60 py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10 grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="eyebrow">Our story</div>
            <div className="mt-2 font-display text-[13px] font-semibold text-royal">01</div>
          </div>
          <div className="space-y-6 text-[16px] lg:text-[17px] leading-relaxed text-navy/85 max-w-3xl">
            <p>
              ProHealth Digital was founded as a dedicated software team for the medical industry
              after a straightforward observation: healthcare businesses were being served by two
              kinds of vendors — cheap template shops that produced generic sites, and enterprise
              agencies that cost more than most clinics could justify. Neither understood the
              vocabulary of medicine or the commercial reality of running a practice. ProHealth
              Digital LLC is a Wyoming limited liability company registered in the United States.
            </p>
            <p>
              We were built to sit in the middle as a healthcare-focused digital partner. We speak
              the language of clinicians and educators, but ship with the design and engineering
              rigour of a premium software company. One vertical, three time zones, and a working
              discipline centred on weekly delivery.
            </p>
            <p>
              Today we work with independent clinics, multi-location medical groups, digital health
              startups, and medical education companies — helping them turn their expertise into a
              durable digital business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10 grid gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="p-10 border border-hairline rounded-lg h-full">
              <div className="eyebrow">Mission</div>
              <h2 className="mt-5 text-display text-[28px] lg:text-[36px] text-navy leading-tight">
                Give healthcare businesses the same digital leverage as the best consumer companies.
              </h2>
              <p className="mt-6 text-[15.5px] leading-relaxed text-muted-foreground">
                Brand, product, and growth systems purpose-built for their audience — engineered to
                compound over years, not campaigns.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="p-10 border border-hairline rounded-lg h-full bg-navy text-white">
              <div className="eyebrow text-teal!">Vision</div>
              <h2 className="mt-5 text-display text-[28px] lg:text-[36px] text-white leading-tight">
                Every credible clinic and educator competing online without stitching a dozen tools
                together.
              </h2>
              <p className="mt-6 text-[15.5px] leading-relaxed text-white/70">
                A future where the digital foundation of a healthcare business is a competitive
                asset — not a recurring expense line to manage.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary/60 border-y border-hairline py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <SectionHeader eyebrow="Core values" index="02" title={<>What we optimise for.</>} />
          <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 50}>
                <div className="text-royal font-display font-semibold text-[13px]">0{i + 1}</div>
                <div className="mt-3 h-px w-8 bg-royal/40" />
                <h3 className="mt-5 text-display font-semibold text-[20px] text-navy">{v.t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10 grid gap-14 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeader eyebrow="Why choose us" index="03" title={<>The short version.</>} />
          <ul className="space-y-8">
            {[
              {
                t: "One vertical, deep expertise",
                d: "We don't context-switch between industries. That focus shows up in strategy calls, design decisions, and buyer messaging.",
              },
              {
                t: "Design and engineering under one roof",
                d: "You'll never have to translate between a design agency and a dev shop. Same team, same accountability.",
              },
              {
                t: "Fixed-scope packages, transparent pricing",
                d: "You'll know exactly what you're getting and what it costs before we start. No hourly surprises.",
              },
              {
                t: "Global coverage, USA-registered",
                d: "Operating across the US, UK, and MENA — with a US legal entity you can contract with directly.",
              },
            ].map((r, i) => (
              <Reveal
                as="li"
                key={r.t}
                delay={i * 60}
                className="pb-8 border-b border-hairline last:border-0"
              >
                <div className="flex items-start gap-6">
                  <span className="font-display font-semibold text-royal text-[14px] pt-1">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-display font-semibold text-[19px] text-navy">{r.t}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {r.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABanner
        title="Have a healthcare project in mind?"
        body="Send us the brief. If we're the right partner, we'll come back with a scoped proposal — usually within two working days."
        primaryLabel="Contact the team"
      />
    </Layout>
  );
}
