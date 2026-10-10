import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Stethoscope,
  LineChart,
  ShoppingBag,
  GraduationCap,
  TrendingUp,
  Globe,
  Users,
  Building2,
  Microscope,
  Rocket,
  Cpu,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { HeroVisual } from "@/components/site/HeroVisual";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Reveal } from "@/components/site/Reveal";
import { CTABanner } from "@/components/site/CTABanner";
import { DashboardMock } from "@/components/site/DashboardMock";
import { Counter } from "@/components/site/Counter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProHealth Digital — Digital Growth for Healthcare Businesses" },
      {
        name: "description",
        content:
          "Websites, digital commerce, educational platforms, and growth systems built for clinics, medical professionals, and health-tech companies.",
      },
      { property: "og:title", content: "ProHealth Digital — Digital Growth for Healthcare" },
      {
        property: "og:description",
        content:
          "A focused digital partner for healthcare businesses. Modern websites, commerce, and educational platforms designed for regulated industries.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "ProHealth Digital LLC",
          image: "https://prohealthdigitalllc.com/prohealth-logo.png",
          description:
            "Digital transformation and growth partner for clinics, medical professionals, and health-tech companies.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "30 N Gould St",
            addressLocality: "Sheridan",
            addressRegion: "WY",
            postalCode: "82801",
            addressCountry: "US",
          },
          telephone: "+1-307-210-6740",
          url: "https://prohealthdigitalllc.com",
          priceRange: "$$",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "18:00",
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Marketing sites, patient portals, and clinic websites engineered for speed, trust, and conversion.",
  },
  {
    icon: Cpu,
    title: "Digital Solutions",
    desc: "Custom platforms, internal tools, and integrations that connect the systems your practice already runs.",
  },
  {
    icon: TrendingUp,
    title: "Healthcare Business Growth",
    desc: "Positioning, funnels, and content systems that turn a professional practice into a scalable business.",
  },
  {
    icon: ShoppingBag,
    title: "Digital Commerce",
    desc: "Storefronts and product experiences for supplements, devices, memberships, and clinical services.",
  },
  {
    icon: GraduationCap,
    title: "Educational Platforms",
    desc: "Course platforms and cohort systems for medical educators, CME programs, and training academies.",
  },
  {
    icon: LineChart,
    title: "Healthcare Business Support",
    desc: "Operating dashboards, KPI systems, and analytics for medical entrepreneurs and multi-location groups.",
  },
];

const INDUSTRIES = [
  { icon: Stethoscope, label: "Healthcare Clinics" },
  { icon: Microscope, label: "Medical Professionals" },
  { icon: GraduationCap, label: "Medical Educators" },
  { icon: Rocket, label: "Digital Health Startups" },
  { icon: Building2, label: "Health Businesses" },
  { icon: Users, label: "Medical Training Companies" },
];

const WHY = [
  {
    t: "Healthcare-focused expertise",
    d: "We work in one industry, so we understand its language, buyers, and constraints.",
  },
  {
    t: "Premium design",
    d: "Restrained, editorial visual work — no template feel, no generic SaaS.",
  },
  {
    t: "Business-first strategy",
    d: "Every project starts with the commercial outcome, not a wireframe.",
  },
  {
    t: "Mobile-first",
    d: "Refined layouts that hold up on every breakpoint, not just the demo screen.",
  },
  { t: "Fast performance", d: "Core Web Vitals treated as a design constraint from day one." },
  {
    t: "SEO-ready architecture",
    d: "Clean routes, semantic markup, and structured data on every page we ship.",
  },
  {
    t: "Scalable solutions",
    d: "Systems that grow from a single practice to a multi-location group.",
  },
  {
    t: "Long-term support",
    d: "A partner after launch — not a vendor that disappears at handover.",
  },
];

const PROCESS = [
  {
    n: "01",
    t: "Discovery",
    d: "Business goals, buyer, competitors, and the honest state of your current digital footprint.",
  },
  {
    n: "02",
    t: "Strategy",
    d: "Positioning, information architecture, and the metrics we'll optimise against.",
  },
  {
    n: "03",
    t: "Design",
    d: "Editorial visual work in your brand — layouts, typography, and motion, reviewed live.",
  },
  {
    n: "04",
    t: "Development",
    d: "Modern, accessible builds with performance and SEO baked in from the first commit.",
  },
  {
    n: "05",
    t: "Testing",
    d: "Cross-device QA, accessibility passes, and load-time verification before we ship.",
  },
  {
    n: "06",
    t: "Launch",
    d: "Coordinated release, analytics wiring, and a monitored first two weeks.",
  },
  {
    n: "07",
    t: "Support",
    d: "Retainer, iteration, or milestone work — whichever your business actually needs.",
  },
];

const PACKAGES = [
  {
    name: "Healthcare Digital Starter",
    price: "$295",
    egp: "≈ EGP 15,150",
    best: "Solo practitioners establishing a professional presence.",
  },
  {
    name: "Medical Brand Authority",
    price: "$495",
    egp: "≈ EGP 25,400",
    best: "Established professionals building a recognisable brand.",
  },
  {
    name: "Healthcare Website Launch",
    price: "From $750",
    egp: "From EGP 38,500",
    best: "Clinics that need a modern, conversion-ready site.",
  },
  {
    name: "Digital Education Launch",
    price: "From $995",
    egp: "From EGP 51,100",
    best: "Medical educators launching their first cohort.",
  },
  {
    name: "Business Growth System",
    price: "From $1,495",
    egp: "From EGP 76,800",
    best: "Practices ready to scale acquisition and retention.",
  },
  {
    name: "Complete Digital Transformation",
    price: "From $1,995",
    egp: "From EGP 102,500",
    best: "Multi-location groups rebuilding their digital core.",
  },
];

const PRODUCTS = [
  {
    name: "Healthcare Business Launch Toolkit",
    desc: "Everything a new practice needs to go from private clinician to a positioned business — brand, site foundation, and buyer messaging.",
  },
  {
    name: "Medical Educator Course Creation System",
    desc: "A pre-built framework for medical educators to design, price, and launch clinical courses without stitching six SaaS tools together.",
  },
  {
    name: "Clinic Digital Growth Toolkit",
    desc: "Local SEO templates, patient acquisition funnels, and reputation systems packaged for one clinic to deploy in weeks.",
  },
];

function Home() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative pt-28 lg:pt-40 pb-16 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div
          className="absolute inset-x-0 top-0 h-130 bg-linear-to-b from-white via-white/95 to-transparent"
          aria-hidden
        />
        <div className="relative mx-auto max-w-350 px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] items-center">
            <div>
              <Reveal>
                <div className="eyebrow">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                  Healthcare · Digital · USA
                </div>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-6 text-display text-[42px] sm:text-6xl lg:text-[80px] leading-[1.02] text-navy">
                  Helping healthcare businesses grow through{" "}
                  <span className="text-royal">digital innovation</span>.
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 text-[17px] lg:text-[19px] leading-relaxed text-muted-foreground max-w-xl">
                  ProHealth Digital builds modern websites, digital commerce systems, educational
                  platforms, and growth infrastructure for clinics, medical professionals, and
                  health-tech companies.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 bg-navy text-white px-5 py-3.5 rounded-md font-medium text-[14.5px] hover:bg-royal transition-colors"
                  >
                    Explore Services <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/packages"
                    className="inline-flex items-center gap-2 border border-navy/15 text-navy px-5 py-3.5 rounded-md font-medium text-[14.5px] hover:bg-secondary transition-colors"
                  >
                    View Packages
                  </Link>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <dl className="mt-14 grid grid-cols-2 gap-6 max-w-xl border-t border-hairline pt-8">
                  {[
                    { k: "Healthcare focus", target: 100, suffix: "%" },
                    { k: "Patient conversion", target: 38, prefix: "+", suffix: "%" },
                  ].map((s) => (
                    <div key={s.k}>
                      <dt className="text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground">
                        {s.k}
                      </dt>
                      <dd className="mt-2 font-display font-semibold text-navy text-2xl lg:text-3xl">
                        <Counter target={s.target} prefix={s.prefix} suffix={s.suffix} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[13.5px] leading-relaxed text-muted-foreground max-w-md">
                  Designed with healthcare, privacy, and accessibility best practices in mind.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200}>
              <HeroVisual />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trusted partner */}
      <section className="border-y border-hairline bg-secondary/60">
        <div className="mx-auto max-w-350 px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
            <div className="eyebrow">A trusted digital partner</div>
            <p className="text-[20px] lg:text-[26px] leading-[1.4] font-display text-navy tracking-tight">
              Digital solutions built specifically for healthcare businesses and medical
              professionals — with the positioning, compliance awareness, and technical rigour that
              the industry requires.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeader
              eyebrow="What we do"
              index="01"
              title={<>Services designed for the healthcare industry.</>}
              intro="Six practice areas that most healthcare businesses draw from — deployed independently, or wired together into a full growth system."
            />
            <Link
              to="/services"
              className="hidden lg:inline-flex items-center gap-1.5 text-royal font-medium text-[14px] hover:gap-2 transition-all"
            >
              All services <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-16 grid gap-px bg-hairline border border-hairline rounded-lg overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 60}
                className="group bg-white p-8 lg:p-10 flex flex-col"
              >
                <s.icon className="h-6 w-6 text-royal" strokeWidth={1.5} />
                <h3 className="mt-8 text-display font-semibold text-xl text-navy">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">{s.desc}</p>
                <Link
                  to="/services"
                  className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-navy hover:text-royal"
                >
                  Explore service details{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-navy text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] dot-bg" aria-hidden />
        <div className="relative mx-auto max-w-350 px-6 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] items-start">
            <div>
              <div className="eyebrow text-teal!">Industries we serve</div>
              <h2 className="mt-4 text-display text-3xl sm:text-4xl lg:text-[52px] text-white">
                Built for the healthcare industry — end to end.
              </h2>
              <p className="mt-6 text-[16px] text-white/70 leading-relaxed max-w-md">
                One vertical, six buyer types, one operating discipline. That focus is what lets us
                ship faster and skip the discovery every generalist agency has to run.
              </p>
            </div>
            <ul className="grid gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden sm:grid-cols-2">
              {INDUSTRIES.map((i, idx) => (
                <Reveal
                  as="li"
                  key={i.label}
                  delay={idx * 50}
                  className="bg-navy p-8 flex items-center gap-4"
                >
                  <span className="h-11 w-11 rounded-md border border-white/15 grid place-items-center text-teal">
                    <i.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="font-display font-medium text-[17px] text-white">{i.label}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <SectionHeader
            eyebrow="Why ProHealth Digital"
            index="02"
            title={<>The operating principles behind every engagement.</>}
          />
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <Reveal key={w.t} delay={i * 40}>
                <div className="text-royal font-display font-semibold text-[13px]">0{i + 1}</div>
                <div className="mt-3 h-px w-8 bg-royal/40" />
                <h3 className="mt-5 text-display font-semibold text-[19px] text-navy leading-snug">
                  {w.t}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">{w.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary/60 border-y border-hairline py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <SectionHeader
            eyebrow="How we work"
            index="03"
            title={<>A seven-step operating rhythm — repeatable across every engagement.</>}
          />
          <ol className="mt-16 grid gap-px bg-hairline border border-hairline rounded-lg overflow-hidden md:grid-cols-2 lg:grid-cols-7">
            {PROCESS.map((p, i) => (
              <Reveal
                as="li"
                key={p.n}
                delay={i * 40}
                className="bg-white p-6 lg:p-7 flex flex-col min-h-55"
              >
                <div className="font-display font-semibold text-royal text-[13px]">{p.n}</div>
                <h3 className="mt-8 lg:mt-auto text-display font-semibold text-[17px] text-navy">
                  {p.t}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{p.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Packages preview */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionHeader
              eyebrow="Packages"
              index="04"
              title={<>Fixed-scope engagements with transparent pricing.</>}
              intro="Six packages that map to the decisions healthcare businesses actually make — from a first professional website to a full digital transformation."
            />
            <Link
              to="/packages"
              className="inline-flex items-center gap-1.5 text-royal font-medium text-[14px] hover:gap-2 transition-all"
            >
              Compare all packages <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <Link
                  to="/packages"
                  className="group block h-full p-7 border border-hairline hover:border-royal/40 rounded-lg bg-white transition-colors"
                >
                  <div className="text-[11px] uppercase tracking-[0.16em] text-royal">
                    Package · 0{i + 1}
                  </div>
                  <h3 className="mt-4 text-display font-semibold text-[20px] text-navy leading-snug">
                    {p.name}
                  </h3>
                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-display text-[28px] font-semibold text-navy">
                      {p.price}
                    </span>
                    <span className="text-[12px] text-muted-foreground">{p.egp}</span>
                  </div>
                  <p className="mt-4 text-[13.5px] text-muted-foreground leading-relaxed">
                    {p.best}
                  </p>
                  <div className="mt-6 pt-5 border-t border-hairline flex items-center justify-between text-[13px] font-medium text-navy">
                    <span>Details</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Digital products preview */}
      <section className="bg-secondary/60 border-y border-hairline py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <SectionHeader
            eyebrow="Digital products"
            index="05"
            title={<>Pre-built systems you can deploy — not custom projects.</>}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 60}
                className="bg-white border border-hairline rounded-lg p-7 flex flex-col"
              >
                <div className="text-[11px] uppercase tracking-[0.16em] text-teal">Product</div>
                <h3 className="mt-4 text-display font-semibold text-[19px] text-navy leading-snug">
                  {p.name}
                </h3>
                <p className="mt-3 text-[14px] text-muted-foreground leading-relaxed flex-1">
                  {p.desc}
                </p>
                <Link
                  to="/digital-products"
                  className="mt-6 inline-flex items-center gap-1.5 text-royal font-medium text-[13.5px]"
                >
                  See product <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <SectionHeader
            eyebrow="Selected work"
            index="06"
            title={<>Recent healthcare engagements.</>}
          />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                variant: "clinic" as const,
                tag: "Multi-location clinic",
                title: "Patient acquisition dashboard",
                meta: "Growth · Analytics · Website",
              },
              {
                variant: "education" as const,
                tag: "Medical educator",
                title: "Cohort-based course platform",
                meta: "LMS · Payments · Brand",
              },
              {
                variant: "commerce" as const,
                tag: "Health commerce brand",
                title: "Direct-to-patient storefront",
                meta: "E-commerce · Subscriptions",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="group">
                  <DashboardMock variant={c.variant} />
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-royal">
                        {c.tag}
                      </div>
                      <h3 className="mt-2 text-display font-semibold text-[19px] text-navy leading-snug">
                        {c.title}
                      </h3>
                      <div className="mt-1.5 text-[12.5px] text-muted-foreground">{c.meta}</div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-navy/40 group-hover:text-royal transition-colors mt-1" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="bg-secondary/60 border-y border-hairline py-24 lg:py-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10 grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <div className="eyebrow">About</div>
            <h2 className="mt-4 text-display text-3xl lg:text-[44px] text-navy leading-tight">
              A focused digital partner for the healthcare industry.
            </h2>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-1.5 text-royal font-medium text-[14px]"
            >
              More about us <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-royal">Mission</div>
              <p className="mt-4 text-[15.5px] leading-relaxed text-navy/85">
                Give healthcare businesses the same digital operating leverage the best consumer
                companies have — brand, product, and growth systems purpose-built for their
                audience.
              </p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-royal">Vision</div>
              <p className="mt-4 text-[15.5px] leading-relaxed text-navy/85">
                A world where every credible clinic, educator, and health company can compete online
                without hiring five agencies and stitching a dozen tools together.
              </p>
            </div>
            <div className="sm:col-span-2 pt-8 border-t border-hairline">
              <div className="text-[11px] uppercase tracking-[0.16em] text-royal">
                Company overview
              </div>
              <p className="mt-4 text-[15.5px] leading-relaxed text-navy/85 max-w-3xl">
                Based in the USA, ProHealth Digital LLC is a specialist digital partner working
                across three time zones. We combine the working discipline of a premium software
                company with the strategic thinking of a healthcare consultancy — and we ship
                weekly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </Layout>
  );
}
