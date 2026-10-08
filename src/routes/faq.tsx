import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { CTABanner } from "@/components/site/CTABanner";
import { Reveal } from "@/components/site/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — ProHealth Digital" },
      {
        name: "description",
        content:
          "Find clear answers to our frequently asked questions about pricing, timelines, technology selection, and our healthcare-focused positioning.",
      },
      { property: "og:title", content: "Frequently Asked Questions — ProHealth Digital" },
      {
        property: "og:description",
        content:
          "Read our frequently asked questions about healthcare positioning, fixed-scope packages, and checkout solutions.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_FLAT.map((q) => ({
            "@type": "Question",
            name: q.q,
            acceptedAnswer: { "@type": "Answer", text: q.a },
          })),
        }),
      },
    ],
  }),
  component: FAQPage,
});

const CATEGORIES = [
  {
    label: "General",
    items: [
      {
        q: "What kinds of businesses do you work with?",
        a: "Healthcare clinics, medical professionals, medical educators, digital health startups, and companies operating in health-adjacent commerce.",
      },
      {
        q: "Where is ProHealth Digital based?",
        a: "We are registered in the USA as ProHealth Digital LLC, with team members operating across the US, UK, and MENA regions.",
      },
      {
        q: "Do you work with clients outside the USA?",
        a: "Yes. Roughly half of our engagements are outside the US. We contract in USD and reference EGP pricing for our MENA clients.",
      },
    ],
  },
  {
    label: "Services",
    items: [
      {
        q: "Can I combine several services into one engagement?",
        a: "Yes. Most engagements combine website development with growth strategy, and often add a course or commerce component. We scope combined engagements the same way — fixed price, fixed timeline.",
      },
      {
        q: "Do you handle payment processor integration?",
        a: "We advise on provider selection, checkout architecture, and reconciliation workflow. We do not implement Stripe, PayPal, or any payment processor as part of an engagement — that work sits with your platform or in-house team.",
      },
      {
        q: "What technology stack do you use?",
        a: "Modern web frameworks with a bias toward performance, accessibility, and SEO. Stack decisions are made per engagement based on what your team can maintain.",
      },
    ],
  },
  {
    label: "Packages",
    items: [
      {
        q: "Are package prices final?",
        a: "Yes for the fixed-price packages ($295 and $495). The 'From' packages start at the price shown and are scoped up based on your requirements — with a firm quote before we start.",
      },
      {
        q: "What's included in the 'first-month performance review'?",
        a: "Baseline analytics setup, weekly monitoring for the first four weeks after launch, and a written review of what to iterate on next.",
      },
      {
        q: "Can I upgrade from one package to another?",
        a: "Yes. Any package cost paid within the last 6 months applies as credit toward a larger engagement.",
      },
    ],
  },
  {
    label: "Products",
    items: [
      {
        q: "How are digital products delivered?",
        a: "As a structured package of templates, playbooks, and checklists — with a kickoff walkthrough so your team knows how to deploy them.",
      },
      {
        q: "Are updates included?",
        a: "Yes. Product updates are included for 12 months from purchase, delivered as revised template packages when we ship them.",
      },
      {
        q: "Can I customise the templates?",
        a: "Fully. The toolkits are frameworks — designed to be adapted to your brand, tone, and specialty.",
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        q: "Do you offer ongoing support after launch?",
        a: "Yes. Support is available as a monthly retainer, milestone-based iteration, or ad-hoc engagements — whichever matches how your business operates.",
      },
      {
        q: "What's your response time?",
        a: "For active engagements, within one working day. For support retainers, per the SLA in your contract — typically same-day for critical issues.",
      },
      {
        q: "Do you provide training for our team?",
        a: "Yes. Every engagement includes a documented handover, and team training sessions can be scoped in on request.",
      },
    ],
  },
  {
    label: "Contact",
    items: [
      {
        q: "What's the fastest way to start a conversation?",
        a: "Email us at prohealthdigitalllc@outlook.com or use the form on our contact page. We typically respond within one working day.",
      },
      {
        q: "Do you offer discovery calls?",
        a: "Yes. First calls are 30 minutes, no charge — enough to understand your business and decide together whether we're the right partner.",
      },
      {
        q: "In what languages can we work?",
        a: "Primarily English, with Arabic-speaking team members available for MENA clients.",
      },
    ],
  },
];

const FAQ_FLAT = CATEGORIES.flatMap((c) => c.items);

function FAQPage() {
  return (
    <Layout>
      <section className="pt-36 lg:pt-48 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-350 px-6 lg:px-10">
          <div className="eyebrow">FAQ</div>
          <h1 className="mt-6 text-display text-[42px] sm:text-6xl lg:text-[80px] leading-[1.02] text-navy max-w-5xl">
            Questions we get, answered directly.
          </h1>
          <p className="mt-8 text-[17px] lg:text-[19px] leading-relaxed text-muted-foreground max-w-2xl">
            Browse our full list of questions we get, answered directly by our team. If your
            question isn't here, email us and we will add a detailed answer.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10 space-y-20 lg:space-y-24">
          {CATEGORIES.map((cat, i) => (
            <Reveal as="section" key={cat.label}>
              <div className="grid gap-10 lg:grid-cols-[0.7fr_1.5fr]">
                <div>
                  <div className="font-display font-semibold text-royal text-[13px]">0{i + 1}</div>
                  <div className="mt-3 h-px w-10 bg-royal/40" />
                  <h2 className="mt-6 text-display text-[28px] lg:text-[34px] text-navy">
                    {cat.label}
                  </h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {cat.items.map((item, idx) => (
                    <AccordionItem
                      key={item.q}
                      value={`${cat.label}-${idx}`}
                      className="border-b border-hairline"
                    >
                      <AccordionTrigger className="text-left font-display font-semibold text-[16.5px] lg:text-[18px] text-navy hover:no-underline py-6">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[14.5px] leading-relaxed text-muted-foreground pb-6">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner
        title="Still have a question?"
        body="Email the team directly. We answer every message a real person sends."
      />
    </Layout>
  );
}
