import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Check, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/digital-products")({
  head: () => ({
    meta: [
      { title: "Healthcare Digital Products & Toolkits — ProHealth Digital" },
      {
        name: "description",
        content:
          "Acquire pre-built digital products, Local SEO frameworks, review flywheels, and patient intake playbooks designed specifically for healthcare clinics.",
      },
      {
        property: "og:title",
        content: "Healthcare Digital Products & Toolkits — ProHealth Digital",
      },
      {
        property: "og:description",
        content:
          "Pre-built toolkits, local search optimization frameworks, and review flywheels for medical practices.",
      },
      { property: "og:url", content: "/digital-products" },
    ],
    links: [{ rel: "canonical", href: "/digital-products" }],
  }),
  component: ProductsPage,
});

const PRODUCTS = [
  {
    n: "01",
    name: "Healthcare Business Launch Toolkit",
    price: "$295",
    egp: "Approx. EGP 15,150",
    overview:
      "The playbook and templates a new healthcare business needs to go from private clinician to a positioned digital company — without hiring an agency.",
    features: [
      "Brand and positioning worksheet",
      "Website content templates for a clinic or practice",
      "Local SEO and Google Business profile checklist",
      "Buyer messaging framework",
      "Launch-week checklist with sequencing",
      "Compliance-aware copy patterns",
    ],
    benefits: [
      "Skip the six-week discovery every agency starts with",
      "Ship a credible online presence in weeks, not quarters",
      "Reusable across new locations or provider hires",
      "Built specifically for medical audiences, not generic small business",
    ],
  },
  {
    n: "02",
    name: "Medical Educator Course Creation System",
    price: "$395",
    egp: "Approx. EGP 20,300",
    overview:
      "A pre-built framework for medical educators to design, price, and launch a first clinical course without stitching six SaaS tools together.",
    features: [
      "Course outline template for clinical curricula",
      "Pricing and cohort structure models",
      "Enrolment page copy templates",
      "Certification and CME structure notes",
      "Learner engagement playbook",
      "Post-cohort retention and upsell scripts",
    ],
    benefits: [
      "Launch a first cohort inside a quarter",
      "Avoid the common revenue-leaving pricing mistakes",
      "Structure that supports both live and evergreen delivery",
      "Frameworks you can reuse across future courses",
    ],
  },
  {
    n: "03",
    name: "Clinic Digital Growth Toolkit",
    price: "$495",
    egp: "Approx. EGP 25,400",
    overview:
      "Local SEO templates, patient acquisition funnels, and reputation systems packaged for a single clinic to deploy in weeks.",
    features: [
      "Local SEO audit and correction template",
      "Review generation workflow",
      "Patient acquisition funnel maps",
      "Referral and reactivation email sequences",
      "Google Business optimisation checklist",
      "Reporting spreadsheet with baseline KPIs",
    ],
    benefits: [
      "Move from ad-hoc marketing to a repeatable system",
      "Improve local search ranking within one quarter",
      "Build a review flywheel without asking manually",
      "Give the front desk a script that actually works",
    ],
  },
];

function ProductsPage() {
  return (
    <Layout>
      <section className="pt-36 lg:pt-48 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-350 px-6 lg:px-10">
          <div className="eyebrow">Digital products</div>
          <h1 className="mt-6 text-display text-[42px] sm:text-6xl lg:text-[80px] leading-[1.02] text-navy max-w-5xl">
            Pre-built systems you can deploy — not custom projects.
          </h1>
          <p className="mt-8 text-[17px] lg:text-[19px] leading-relaxed text-muted-foreground max-w-2xl">
            Three pre-built systems you can deploy directly in your practice, bypass long custom
            projects, and own the assets forever. Designed specifically to accelerate local search
            and patient reviews.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-350 px-6 lg:px-10 pb-24 lg:pb-32 space-y-24 lg:space-y-32">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.n} as="section">
            <div
              className={`grid gap-12 lg:grid-cols-[1fr_1.3fr] ${i > 0 ? "pt-24 border-t border-hairline" : ""}`}
            >
              <div className="lg:sticky lg:top-28 self-start">
                <div className="font-display font-semibold text-royal text-[13px]">{p.n}</div>
                <div className="mt-3 h-px w-10 bg-royal/40" />
                <h2 className="mt-6 text-display text-[30px] lg:text-[40px] leading-tight text-navy">
                  {p.name}
                </h2>
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="text-display text-[30px] font-semibold text-navy">
                    {p.price}
                  </span>
                  <span className="text-[12px] text-muted-foreground">{p.egp}</span>
                </div>
                <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground">
                  {p.overview}
                </p>
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-1.5 bg-navy text-white px-5 py-3 rounded-md text-[14px] font-medium hover:bg-royal transition-colors"
                >
                  Request a Quote <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-royal">Features</div>
                  <ul className="mt-5 space-y-3.5">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-[14.5px] text-navy/85 leading-relaxed"
                      >
                        <Check className="h-4 w-4 mt-0.5 text-teal shrink-0" strokeWidth={2.5} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-royal">Benefits</div>
                  <ul className="mt-5 space-y-3.5">
                    {p.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[14.5px] text-navy/85 leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-royal shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="bg-secondary/60 border-t border-hairline py-20 lg:py-28">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <SectionHeader
            eyebrow="Framework details"
            index="01"
            title="Why deploy our pre-built systems?"
          />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <h3 className="font-display font-semibold text-navy text-[18px]">
                Frictionless Setup
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                These toolkits bypass the typical discovery, wireframing, and custom coding cycles.
                You receive instant access to Notion databases, copy templates, and Figma layout
                files built to healthcare standards.
              </p>
            </Reveal>
            <Reveal delay={50}>
              <h3 className="font-display font-semibold text-navy text-[18px]">
                Tested in Real Clinics
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                We don't sell hypothetical structures. Every review campaign script, local map setup
                guide, and front-desk flow has been deployed and iterated in clinics spanning the US
                and UK.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="font-display font-semibold text-navy text-[18px]">
                Full Asset Ownership
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                Unlike subscription SaaS platforms that lock your clinical data or charge monthly
                user fees, you buy these files once and keep them forever. Edit, duplicate, and
                scale them across multiple locations.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        title="Not sure which product fits?"
        body="Tell us the shape of your business. We'll point you at the right toolkit — or say honestly if a custom engagement is a better fit."
      />
    </Layout>
  );
}
