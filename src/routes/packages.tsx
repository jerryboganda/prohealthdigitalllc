import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { Check, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Healthcare Engagement Packages & Pricing — ProHealth Digital" },
      {
        name: "description",
        content:
          "View transparent pricing and predefined scopes for our clinic launch, platform build, custom integration, and growth partnership packages.",
      },
      {
        property: "og:title",
        content: "Healthcare Engagement Packages & Pricing — ProHealth Digital",
      },
      {
        property: "og:description",
        content:
          "Predefined packages, transparent pricing scopes, and fixed engagement timelines for clinics and medical groups.",
      },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  component: PackagesPage,
});

const PACKAGES = [
  {
    n: "01",
    name: "Healthcare Digital Starter",
    price: "$295",
    egp: "Approx. EGP 15,150",
    overview:
      "The essential digital foundation for a solo practitioner or new practice launching online.",
    best: "Solo clinicians and independent practices establishing their first professional presence.",
    features: [
      "Single-page professional website",
      "Custom brand-aligned design",
      "Mobile-first responsive layout",
      "Contact and booking hand-off",
      "On-page SEO foundations",
      "Two-week launch timeline",
    ],
  },
  {
    n: "02",
    name: "Medical Brand Authority Package",
    price: "$495",
    egp: "Approx. EGP 25,400",
    overview:
      "A positioned, credible brand system that signals expertise the moment a patient lands on your page.",
    best: "Established professionals building a recognisable brand and referral asset.",
    features: [
      "Multi-page marketing site",
      "Brand identity refinement",
      "Service and credentials pages",
      "Patient education content structure",
      "SEO and analytics setup",
      "Content authoring guidelines",
    ],
  },
  {
    n: "03",
    name: "Healthcare Website Launch",
    price: "From $750",
    egp: "From EGP 38,500",
    overview:
      "A modern, conversion-ready clinic website — with the pages, booking flow, and reporting that make it a business asset.",
    best: "Clinics and small groups that need a professional site engineered to convert visitors into patients.",
    features: [
      "Up to 12 tailored pages",
      "Provider and location pages",
      "Booking / lead flow integration",
      "Blog and patient resources module",
      "Local SEO structure",
      "First-month performance review",
    ],
  },
  {
    n: "04",
    name: "Digital Education Launch Package",
    price: "From $995",
    egp: "From EGP 51,100",
    overview:
      "Everything a medical educator needs to launch a first cohort — from sales page to enrolled learner.",
    best: "Medical educators, CME leaders, and training companies launching a first course or cohort.",
    features: [
      "Course sales page and pricing model",
      "Enrolment and payment collection setup",
      "Learning portal or LMS integration",
      "Certification and completion workflow",
      "Cohort launch checklist",
      "Post-launch iteration sprint",
    ],
  },
  {
    n: "05",
    name: "Healthcare Business Growth System",
    price: "From $1,495",
    egp: "From EGP 76,800",
    overview:
      "The commercial infrastructure to scale a practice: positioning, funnels, content, and the dashboards to run against them.",
    best: "Practices and groups ready to move from ad-hoc marketing to a repeatable acquisition and retention system.",
    features: [
      "Positioning and buyer messaging",
      "Acquisition and retention funnels",
      "Content operating system",
      "CRM and analytics wiring",
      "KPI dashboard",
      "Ninety-day growth roadmap",
    ],
  },
  {
    n: "06",
    name: "Complete Healthcare Digital Transformation",
    price: "From $1,995",
    egp: "From EGP 102,500",
    overview:
      "A full digital rebuild — brand, website, growth system, and operating dashboards — deployed on a coordinated multi-month plan.",
    best: "Multi-location groups and established health businesses rebuilding their digital core end to end.",
    features: [
      "Brand and design system",
      "Enterprise-grade website",
      "Growth and acquisition system",
      "Custom operator dashboards",
      "Team enablement and documentation",
      "Six-month partnership rhythm",
    ],
  },
];

function PackagesPage() {
  return (
    <Layout>
      <section className="pt-36 lg:pt-48 pb-16 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-350 px-6 lg:px-10">
          <div className="eyebrow">Packages</div>
          <h1 className="mt-6 text-display text-[42px] sm:text-6xl lg:text-[80px] leading-[1.02] text-navy max-w-5xl">
            Fixed scope. Transparent pricing. Real accountability.
          </h1>
          <p className="mt-8 text-[17px] lg:text-[19px] leading-relaxed text-muted-foreground max-w-2xl">
            Six packages built with a fixed scope and real accountability mapped to the decisions
            healthcare businesses actually make. Every price is shown with transparent pricing in
            USD, with an EGP reference for our MENA clients. Custom scopes available on request.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((p, i) => {
              const featured = i === 4; // Growth System featured
              return (
                <Reveal key={p.n} delay={i * 60}>
                  <article
                    className={`relative h-full flex flex-col rounded-lg p-8 lg:p-9 border transition-colors ${
                      featured
                        ? "bg-navy text-white border-navy shadow-[0_30px_80px_-30px_rgba(10,29,61,0.45)]"
                        : "bg-white border-hairline hover:border-royal/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`text-[11px] uppercase tracking-[0.16em] ${featured ? "text-teal" : "text-royal"}`}
                      >
                        Package · {p.n}
                      </div>
                      {featured && (
                        <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-navy bg-teal px-2 py-1 rounded">
                          Most requested
                        </span>
                      )}
                    </div>
                    <h2
                      className={`mt-5 text-display font-semibold text-[22px] leading-tight ${featured ? "text-white" : "text-navy"}`}
                    >
                      {p.name}
                    </h2>
                    <div className="mt-6 flex items-baseline gap-3">
                      <span
                        className={`text-display text-[34px] font-semibold ${featured ? "text-white" : "text-navy"}`}
                      >
                        {p.price}
                      </span>
                      <span
                        className={`text-[12px] ${featured ? "text-white/60" : "text-muted-foreground"}`}
                      >
                        {p.egp}
                      </span>
                    </div>
                    <p
                      className={`mt-5 text-[14.5px] leading-relaxed ${featured ? "text-white/70" : "text-muted-foreground"}`}
                    >
                      {p.overview}
                    </p>
                    <div
                      className={`mt-6 pt-5 border-t ${featured ? "border-white/15" : "border-hairline"}`}
                    >
                      <div
                        className={`text-[11px] uppercase tracking-[0.14em] ${featured ? "text-teal" : "text-royal"}`}
                      >
                        Best for
                      </div>
                      <p
                        className={`mt-2 text-[13.5px] leading-relaxed ${featured ? "text-white/80" : "text-navy/80"}`}
                      >
                        {p.best}
                      </p>
                    </div>
                    <ul className="mt-6 space-y-2.5 flex-1">
                      {p.features.map((f) => (
                        <li
                          key={f}
                          className={`flex items-start gap-2 text-[13.5px] ${featured ? "text-white/85" : "text-navy/85"}`}
                        >
                          <Check
                            className={`h-4 w-4 mt-0.5 shrink-0 ${featured ? "text-teal" : "text-royal"}`}
                            strokeWidth={2.5}
                          />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/contact"
                      className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-3 text-[14px] font-medium transition-colors ${
                        featured
                          ? "bg-teal text-navy hover:bg-white"
                          : "bg-navy text-white hover:bg-royal"
                      }`}
                    >
                      Discuss Your Project <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 border-y border-hairline py-16 lg:py-20">
        <div className="mx-auto max-w-350 px-6 lg:px-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <SectionHeader
              title={<>Need a scope that isn't listed?</>}
              intro="If your project sits between packages — or spans several — send us the brief. We scope custom engagements the same week we hear from you."
            />
          </div>
          <div className="flex lg:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-navy text-white px-5 py-3.5 rounded-md font-medium text-[14.5px] hover:bg-royal transition-colors"
            >
              Request custom scope <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 border-t border-hairline">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <SectionHeader
            eyebrow="Delivery methodology"
            index="01"
            title="How we ensure real accountability"
          />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <h3 className="font-display font-semibold text-navy text-[18px]">
                Predefined Milestones
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                We do not believe in open-ended agency retainers. Every package outlines an exact
                list of deliverables and milestones. You know exactly what is being built, when it
                will be delivered, and what is required from your team.
              </p>
            </Reveal>
            <Reveal delay={50}>
              <h3 className="font-display font-semibold text-navy text-[18px]">
                Weekly Sprint Demos
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                Our production cycle operates in weekly cycles. Every Friday, we deploy a working
                staging URL for your review. This provides complete visibility and prevents scope
                drift, ensuring we remain in alignment.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="font-display font-semibold text-navy text-[18px]">Clean Handovers</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                At the end of the engagement, we run a full training walkthrough and handover. We
                build on open frameworks, which means you receive full code ownership and structural
                documentation without licensing locks.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner />
    </Layout>
  );
}
