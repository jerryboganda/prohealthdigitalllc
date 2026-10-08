import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Mail, Phone, Clock, MapPin, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ProHealth Digital — Start a Conversation" },
      {
        name: "description",
        content:
          "Get in touch with ProHealth Digital LLC. Email, phone, and a project intake form for healthcare businesses ready to invest in digital growth.",
      },
      { property: "og:title", content: "Contact ProHealth Digital" },
      {
        property: "og:description",
        content: "Contact details and project intake for healthcare digital engagements.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const errs: Record<string, string> = {};
    if (!f.get("name")?.toString().trim()) errs.name = "Please enter your name";
    const email = f.get("email")?.toString().trim() || "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email";
    if (!f.get("message")?.toString().trim()) errs.message = "Please add a short message";
    if (!f.get("consent")) errs.consent = "You must agree to our Privacy Policy to proceed";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <Layout>
      <section className="pt-36 lg:pt-48 pb-16 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-350 px-6 lg:px-10">
          <div className="eyebrow">Contact</div>
          <h1 className="mt-6 text-display text-[42px] sm:text-6xl lg:text-[80px] leading-[1.02] text-navy max-w-5xl">
            Send us the brief. We'll take it from there.
          </h1>
          <p className="mt-8 text-[17px] lg:text-[19px] leading-relaxed text-muted-foreground max-w-2xl">
            Tell us what you're trying to build. Send us the brief for your project, and we'll take
            it from there — usually coming back with a scoped proposal within two working days.
          </p>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-350 px-6 lg:px-10 grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="p-8 lg:p-12 border border-hairline rounded-lg bg-white">
              <h2 className="text-display text-[26px] lg:text-[32px] text-navy">Project intake</h2>
              <p className="mt-3 text-[14.5px] text-muted-foreground">
                Fields marked with an asterisk are required.
              </p>

              {sent ? (
                <div className="mt-10 rounded-md border border-teal/40 bg-teal/10 p-6">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-teal mt-0.5" strokeWidth={2.5} />
                    <div>
                      <div className="font-display font-semibold text-navy text-[17px]">
                        Thank you — message received.
                      </div>
                      <p className="mt-1.5 text-[14px] text-navy/75">
                        A member of the team will reply within one working day at the email you
                        provided.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name *" name="name" error={errors.name} />
                    <Field label="Email *" name="email" type="email" error={errors.email} />
                    <Field label="Phone" name="phone" type="tel" />
                    <Field label="Company / clinic" name="company" />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[12px] uppercase tracking-[0.14em] text-navy font-semibold"
                    >
                      How can we help? *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="mt-2 w-full rounded-md border bg-white px-4 py-3 text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal"
                      placeholder="A few lines on the business, what you're trying to solve, and any timing constraints."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-err" : undefined}
                    />
                    {errors.message && (
                      <p id="message-err" className="mt-2 text-[13px] text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="consent"
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-royal focus:ring-royal/30"
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? "consent-err" : undefined}
                      />
                      <span className="text-[13px] text-navy/85 leading-normal">
                        I agree to the processing of my data in accordance with the{" "}
                        <Link
                          to="/privacy"
                          className="underline underline-offset-2 hover:text-royal transition-colors"
                        >
                          Privacy Policy
                        </Link>
                        . *
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="consent-err" className="text-[13px] text-destructive">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3.5 rounded-md font-medium text-[14.5px] hover:bg-royal transition-colors"
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
              <div className="p-8 border border-hairline rounded-lg">
                <div className="eyebrow">Direct contact</div>
                <ul className="mt-5 space-y-5">
                  <ContactLine icon={Mail} label="Email">
                    <a
                      href="mailto:prohealthdigitalllc@outlook.com"
                      className="hover:text-royal break-all"
                    >
                      prohealthdigitalllc@outlook.com
                    </a>
                  </ContactLine>
                  <ContactLine icon={Phone} label="USA Call Number">
                    <a href="tel:+13072106740" className="hover:text-royal">
                      USA: +1 (307) 210-6740
                    </a>
                  </ContactLine>
                  <ContactLine icon={Phone} label="UK Call Number">
                    <a href="tel:+447444872808" className="hover:text-royal">
                      UK: +44 7444 872808
                    </a>
                  </ContactLine>
                  <ContactLine icon={Phone} label="Egypt Call Number">
                    <a href="tel:+201062365271" className="hover:text-royal">
                      Egypt: +20 106 236 5271
                    </a>
                  </ContactLine>
                  <ContactLine icon={Clock} label="Business hours">
                    <div className="text-navy/80">
                      Monday – Friday · 09:00 – 18:00 (client local time)
                      <br />
                      <span className="text-muted-foreground">
                        Emergency support available under retainer.
                      </span>
                    </div>
                  </ContactLine>
                  <ContactLine icon={MapPin} label="Registered Agent Address">
                    <a
                      href="https://maps.app.goo.gl/qcD6BXxeWYWGBqYDA?g_st=ac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-royal transition-colors"
                    >
                      30 N Gould St, Sheridan, WY 82801, USA
                    </a>
                  </ContactLine>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="relative border border-hairline rounded-lg overflow-hidden aspect-4/3 bg-secondary group">
                <iframe
                  src="https://maps.google.com/maps?q=30%20N%20Gould%20St,%20Sheridan,%20WY%2082801&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0 grayscale contrast-[1.2] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ProHealth Digital LLC Registered Agent Location Map"
                />
                <div className="absolute inset-0 bg-linear-to-t from-navy/30 via-transparent to-transparent pointer-events-none" />
                <a
                  href="https://maps.app.goo.gl/qcD6BXxeWYWGBqYDA?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-navy px-3 py-1.5 rounded border border-hairline font-display text-[12px] font-medium hover:bg-navy hover:text-white hover:border-navy transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <MapPin className="h-3.5 w-3.5" /> Open in Google Maps
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 border-t border-hairline py-20 lg:py-28">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <SectionHeader
            eyebrow="Intake process"
            index="01"
            title="What happens after you reach out?"
          />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <h3 className="font-display font-semibold text-navy text-[18px]">
                1. Discovery & Fit
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                Once you submit a project brief, we review it to ensure it aligns with our
                healthcare expertise. If there is a fit, we schedule a 30-minute discovery call to
                align on goals, budget limits, and technical requirements.
              </p>
            </Reveal>
            <Reveal delay={50}>
              <h3 className="font-display font-semibold text-navy text-[18px]">
                2. Scoped Proposal
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                Within two working days of our initial discussion, we deliver a scoped proposal
                detailing fixed packages or custom engagements. Every scope details exact
                deliverables and is transparently priced.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h3 className="font-display font-semibold text-navy text-[18px]">
                3. Launch & Review
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
                We operate in one-week sprints, providing a working build to inspect every Friday.
                Once approved, we launch to production and set up a first-month analytics review to
                monitor conversions and local search presence.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[12px] uppercase tracking-[0.14em] text-navy font-semibold"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="mt-2 w-full rounded-md border bg-white px-4 py-3 text-[15px] placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-royal/30 focus:border-royal"
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-err` : undefined}
      />
      {error && (
        <p id={`${name}-err`} className="mt-2 text-[13px] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactLine({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="h-10 w-10 rounded-md border border-hairline grid place-items-center shrink-0">
        <Icon className="h-4 w-4 text-royal" strokeWidth={1.75} />
      </span>
      <div className="text-[14px]">
        <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-navy/85">{children}</div>
      </div>
    </li>
  );
}
