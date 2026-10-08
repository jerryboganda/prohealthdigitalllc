import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import { Check, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Healthcare Websites & Digital Growth Systems" },
      {
        name: "description",
        content:
          "Explore our nine core practice areas, including custom clinic website engineering, custom learning management systems (LMS), and operation dashboards.",
      },
      { property: "og:title", content: "Services — Healthcare Websites & Digital Growth Systems" },
      {
        property: "og:description",
        content:
          "Custom website development, learning management platforms, and operational dashboards built specifically for clinics and medical educators.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          provider: { "@type": "Organization", name: "ProHealth Digital LLC" },
          areaServed: "Global",
          serviceType: [
            "Healthcare Website Development",
            "Digital Commerce",
            "Educational Platforms",
            "Healthcare Business Growth",
            "Payment Integration Consulting",
          ],
        }),
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    id: "website-development",
    name: "Website Development",
    overview:
      "Modern marketing sites and clinic websites engineered from the ground up — no page builders, no generic templates. Built for speed, accessibility, and search performance.",
    benefits: [
      "Semantic, accessible, SEO-ready architecture",
      "Custom design in your brand — never a template",
      "Core Web Vitals as a design constraint",
      "Content model designed to scale with your team",
    ],
    deliverables: [
      "Brand-aligned design system",
      "Static or dynamic build",
      "CMS integration if required",
      "Launch + first-month monitoring",
    ],
  },
  {
    id: "healthcare-websites",
    name: "Healthcare Websites",
    overview:
      "Sites that actually convert: clinic locators, provider bios, service pages, patient education, and booking journeys — built around how patients actually decide.",
    benefits: [
      "Conversion patterns proven in medical audiences",
      "Local SEO structure for multi-location groups",
      "Compliance-aware copy and legal footer scaffolding",
      "Integrations with booking, EMR, and CRM tools",
    ],
    deliverables: [
      "Site map & IA",
      "10–40 page build",
      "Booking / lead flow",
      "Analytics & call tracking",
    ],
  },
  {
    id: "e-commerce",
    name: "E-Commerce",
    overview:
      "Health-adjacent commerce that respects the buyer: supplements, devices, at-home diagnostics, membership programs, and hybrid product-plus-service catalogues.",
    benefits: [
      "Product storytelling built for medical credibility",
      "Subscription and one-off purchase logic",
      "Cross-sell architecture without dark patterns",
      "Post-purchase content and education flows",
    ],
    deliverables: [
      "Storefront design",
      "Catalogue + PDPs",
      "Checkout flow",
      "Post-purchase automations",
    ],
  },
  {
    id: "digital-commerce",
    name: "Digital Commerce",
    overview:
      "Selling digital products — cohorts, courses, memberships, downloadable frameworks — with a checkout and delivery experience that feels premium.",
    benefits: [
      "Cohort and evergreen delivery models",
      "Membership gating and progressive access",
      "Refund and access policy scaffolding",
      "Integrations with LMS or hosted video",
    ],
    deliverables: [
      "Sales page system",
      "Checkout & customer portal",
      "Access control",
      "Retention automations",
    ],
  },
  {
    id: "business-growth",
    name: "Healthcare Business Growth",
    overview:
      "The commercial layer that most agencies skip: positioning, buyer messaging, funnel architecture, and the reporting to prove what actually worked.",
    benefits: [
      "Positioning workshop with your leadership team",
      "Funnel maps for acquisition, activation, retention",
      "Content system briefed for medical credibility",
      "Weekly commercial reporting cadence",
    ],
    deliverables: [
      "Positioning document",
      "Funnel design",
      "Content operating system",
      "KPI dashboard",
    ],
  },
  {
    id: "healthcare-technology",
    name: "Healthcare Technology",
    overview:
      "Internal tools, custom platforms, and integrations that connect the systems your practice already runs — without forcing a full stack rebuild.",
    benefits: [
      "Integration-first architecture",
      "Custom operator dashboards",
      "Data model that scales with the business",
      "Role-based access and audit trails",
    ],
    deliverables: [
      "Technical discovery",
      "Custom platform build",
      "Integration layer",
      "Handover + support",
    ],
  },
  {
    id: "educational-platforms",
    name: "Educational Platforms",
    overview:
      "Course platforms and cohort systems for medical educators, CME programs, and training academies — with the polish that clinical audiences expect.",
    benefits: [
      "Live cohort and self-paced formats",
      "Assessments, certificates, and progress tracking",
      "Discussion and community components",
      "Course production and instructional design support",
    ],
    deliverables: ["LMS build", "Course structure", "Certification workflow", "Learner analytics"],
  },
  {
    id: "healthcare-business-support",
    name: "Healthcare Business Support",
    overview:
      "Operating dashboards, KPI systems, and analytics for medical entrepreneurs and multi-location groups — a single view of the business that leadership can actually run against.",
    benefits: [
      "Consolidated view across sites and systems",
      "Automated reporting rhythms",
      "Forecasting and cohort analysis",
      "Role-specific dashboards",
    ],
    deliverables: [
      "Metric framework",
      "Dashboard design + build",
      "Data pipelines",
      "Weekly ops review setup",
    ],
  },
  {
    id: "payment-integration",
    name: "Payment Integration Solutions",
    overview:
      "Advisory and integration guidance on payment processing for healthcare businesses — provider selection, dispute handling, and compliant checkout patterns. Informational engagement only; ProHealth Digital does not process payments.",
    benefits: [
      "Provider selection guidance",
      "Compliant checkout patterns",
      "Chargeback and dispute workflow design",
      "Reconciliation and reporting architecture",
    ],
    deliverables: [
      "Provider evaluation",
      "Checkout architecture",
      "Reconciliation plan",
      "Documentation for your team",
    ],
    note: "Advisory only. We do not implement Stripe, PayPal, or any payment processor as part of this engagement.",
  },
];

function ServicesPage() {
  return (
    <Layout>
      <section className="pt-36 lg:pt-48 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-350 px-6 lg:px-10">
          <div className="eyebrow">Services</div>
          <h1 className="mt-6 text-display text-[42px] sm:text-6xl lg:text-[80px] leading-[1.02] text-navy max-w-5xl">
            Nine practice areas, one operating team.
          </h1>
          <p className="mt-8 text-[17px] lg:text-[19px] leading-relaxed text-muted-foreground max-w-2xl">
            Every service listed across our nine practice areas is deployed by the same operating
            team, on the same rhythm, against the same commercial standard. Wire together as many as
            you need — or start with one.
          </p>

          <nav
            className="mt-14 flex flex-wrap gap-2 pt-8 border-t border-hairline"
            aria-label="Services in this page"
          >
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[12.5px] font-medium text-navy/70 hover:text-royal border border-hairline hover:border-royal/40 rounded-full px-3.5 py-1.5 transition-colors"
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-350 px-6 lg:px-10 pb-24 lg:pb-32">
        {SERVICES.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`grid gap-12 lg:grid-cols-[0.9fr_1.4fr] py-16 lg:py-24 ${i > 0 ? "border-t border-hairline" : ""}`}
          >
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <div className="font-display font-semibold text-royal text-[13px]">0{i + 1}</div>
                <div className="mt-3 h-px w-10 bg-royal/40" />
                <h2 className="mt-6 text-display text-[30px] lg:text-[40px] leading-tight text-navy">
                  {s.name}
                </h2>
                <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground">
                  {s.overview}
                </p>
                {s.note && (
                  <p className="mt-4 text-[13px] leading-relaxed text-royal/80 border-l-2 border-royal/40 pl-3">
                    {s.note}
                  </p>
                )}
                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center gap-1.5 text-royal font-medium text-[14px] hover:gap-2 transition-all"
                >
                  Discuss this service <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-royal">Benefits</div>
                  <ul className="mt-5 space-y-3.5">
                    {s.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-[14.5px] text-navy/85 leading-relaxed"
                      >
                        <Check className="h-4 w-4 mt-1 text-teal shrink-0" strokeWidth={2.5} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.16em] text-royal">
                    Deliverables
                  </div>
                  <ul className="mt-5 space-y-3.5">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 text-[14.5px] text-navy/85 leading-relaxed"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-royal shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </section>
        ))}
      </div>

      <CTABanner
        title="Which of these fits your business?"
        body="Tell us what you're trying to solve. We'll come back with the shortest credible engagement — not the longest."
      />
    </Layout>
  );
}
