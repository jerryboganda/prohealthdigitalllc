import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X, ArrowUpRight } from "lucide-react";
import {
  engagements,
  projects,
  stages,
  faqs,
  policies,
  ui,
  text,
  EMAIL,
  localPath,
  localeFor,
  basePath,
} from "@/lib/content";
import type { Locale, Engagement } from "@/lib/content";
import { InquiryForm } from "./InquiryForm";

function ProjectCTA({
  locale,
  engagement,
  source = "/",
}: {
  locale: Locale;
  engagement?: string;
  source?: string;
}) {
  return (
    <a
      className="primary-button"
      href={`${localPath("/contact", locale)}?${new URLSearchParams({ ...(engagement ? { engagement } : {}), source })}`}
    >
      {ui.cta[locale]}
      <ArrowRight className="directional" size={18} aria-hidden="true" />
    </a>
  );
}
function SiteFrame({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useRouterState({ select: (s) => s.location });
  const path = basePath(location.pathname);
  const other: Locale = locale === "en" ? "ar" : "en";
  const nav = [
    ["/solutions", ui.solutions],
    ["/work", ui.work],
    ["/how-we-work", ui.process],
    ["/about", ui.about],
  ] as const;
  return (
    <div className="prohealth-site">
      <a className="skip-link" href="#main">
        {text("Skip to content", "انتقل إلى المحتوى")[locale]}
      </a>
      <header
        className="site-header"
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <div className="header-inner">
          <a
            href={localPath("/", locale)}
            className="brand"
            aria-label={
              text("ProHealth Digital LLC home", "الرئيسية — ProHealth Digital LLC")[locale]
            }
          >
            <img src="/prohealth-logo.png" alt="ProHealth Digital LLC" width={164} height={52} />
          </a>
          <nav
            className="desktop-nav"
            aria-label={text("Main navigation", "التنقل الرئيسي")[locale]}
          >
            {nav.map(([href, label]) => (
              <a
                key={href}
                href={localPath(href, locale)}
                aria-current={path === href || path.startsWith(href + "/") ? "page" : undefined}
              >
                {label[locale]}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <a
              className="language-link"
              href={localPath(path, other) + location.searchStr}
              lang={other}
              hrefLang={other}
            >
              {other === "ar" ? "العربية" : "English"}
            </a>
            <div className="desktop-cta">
              <ProjectCTA locale={locale} source={path} />
            </div>
            <button
              type="button"
              className="menu-button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={text("Toggle navigation", "فتح أو إغلاق القائمة")[locale]}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label={text("Mobile navigation", "التنقل عبر الهاتف")[locale]}
          >
            {nav.map(([href, label]) => (
              <a key={href} href={localPath(href, locale)}>
                {label[locale]}
              </a>
            ))}
            <ProjectCTA locale={locale} source={path} />
          </nav>
        )}
      </header>
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <a href={localPath("/", locale)} className="footer-brand">
              ProHealth Digital LLC
            </a>
            <p>
              {
                text(
                  "Healthcare technology delivery, from discovery to ongoing support.",
                  "تنفيذ التكنولوجيا الصحية، من فهم الاحتياجات إلى الدعم المستمر.",
                )[locale]
              }
            </p>
            <a href={`mailto:${EMAIL}`} dir="ltr">
              {EMAIL}
            </a>
          </div>
          <nav aria-label={text("Footer navigation", "التنقل في تذييل الصفحة")[locale]}>
            {nav.map(([href, label]) => (
              <a key={href} href={localPath(href, locale)}>
                {label[locale]}
              </a>
            ))}
            <a href={localPath("/faq", locale)}>{text("FAQ", "الأسئلة الشائعة")[locale]}</a>
            <a href={localPath("/contact", locale)}>{ui.cta[locale]}</a>
          </nav>
          <nav aria-label={text("Policies", "السياسات")[locale]}>
            {Object.entries(policies).map(([slug, p]) => (
              <a key={slug} href={localPath("/" + slug, locale)}>
                {p.title[locale]}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ProHealth Digital LLC</span>
          <span>
            {
              text(
                "Technology delivery. Clinical care remains with your organization.",
                "تنفيذ التكنولوجيا. تبقى الرعاية الطبية مسؤولية مؤسستك.",
              )[locale]
            }
          </span>
        </div>
      </footer>
    </div>
  );
}
function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}
function Invitation({
  locale,
  source,
  engagement,
}: {
  locale: Locale;
  source: string;
  engagement?: string;
}) {
  return (
    <section className="invitation">
      <div>
        <h2>{ui.discovery[locale]}</h2>
        <p>{ui.discoveryBody[locale]}</p>
      </div>
      <div>
        <ProjectCTA locale={locale} source={source} engagement={engagement} />
        <a className="email-alternative" href={`mailto:${EMAIL}`}>
          <span>{ui.email[locale]}</span>
          <span dir="ltr">{EMAIL}</span>
        </a>
      </div>
    </section>
  );
}
function EngagementCards({ locale, filter }: { locale: Locale; filter?: Engagement["audience"] }) {
  return (
    <div className="engagement-grid">
      {engagements
        .filter((e) => !filter || e.audience === filter)
        .map((e) => (
          <article className="engagement-card" key={e.id}>
            <p className="eyebrow">
              {e.audience === "provider" ? ui.providers[locale] : ui.companies[locale]}
            </p>
            <h3>
              <a href={localPath(`/solutions/${e.id}`, locale)}>{e.title[locale]}</a>
            </h3>
            <p>{e.problem[locale]}</p>
            <a className="text-link" href={localPath(`/solutions/${e.id}`, locale)}>
              {ui.explore[locale]}
              <ArrowRight className="directional" size={18} />
            </a>
          </article>
        ))}
    </div>
  );
}
function ProjectRows({ locale }: { locale: Locale }) {
  return (
    <div className="project-rows">
      {projects.map((p) => (
        <article key={p.id}>
          <div>
            <p className="eyebrow">{p.category[locale]}</p>
            <h3>
              <a href={localPath(`/work/${p.id}`, locale)}>{p.name[locale]}</a>
            </h3>
          </div>
          <div>
            <p>{p.context[locale]}</p>
            <p className="project-role">{ui.projectRole[locale]}</p>
          </div>
          <a className="text-link" href={localPath(`/work/${p.id}`, locale)}>
            {text("View project", "عرض المشروع")[locale]}
            <ArrowUpRight className="directional" size={20} />
          </a>
        </article>
      ))}
    </div>
  );
}
function Process({ locale }: { locale: Locale }) {
  return (
    <ol className="process-list">
      {stages.map((s) => (
        <li key={s.id}>
          <h3>{s.label[locale]}</h3>
          <p>{s.body[locale]}</p>
        </li>
      ))}
    </ol>
  );
}
function FAQ({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return (
    <div className="faq-list">
      {faqs.slice(0, compact ? 5 : undefined).map((q) => (
        <details key={q.q.en}>
          <summary>{q.q[locale]}</summary>
          <p>{q.a[locale]}</p>
        </details>
      ))}
    </div>
  );
}
function PageIntro({
  locale,
  title,
  description,
  eyebrow,
}: {
  locale: Locale;
  title: string;
  description: string;
  eyebrow?: string;
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow || "ProHealth Digital LLC"}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
function Workflow({ locale }: { locale: Locale }) {
  return (
    <div
      className="workflow"
      role="img"
      aria-label={
        text(
          "From patient access to connected operations and dependable platforms",
          "من وصول المرضى إلى تشغيل مترابط ومنصات موثوقة",
        )[locale]
      }
    >
      <p className="eyebrow">{text("A connected service journey", "رحلة خدمة مترابطة")[locale]}</p>
      <div className="workflow-step">
        <span className="workflow-mark">●</span>
        <div>
          <strong>{text("Access", "الوصول")[locale]}</strong>
          <p>
            {
              text(
                "Find services. Take the next step.",
                "العثور على الخدمات واتخاذ الخطوة التالية.",
              )[locale]
            }
          </p>
        </div>
      </div>
      <div className="workflow-step">
        <span className="workflow-mark">●</span>
        <div>
          <strong>{text("Operations", "التشغيل")[locale]}</strong>
          <p>
            {text("Connect tasks, people and systems.", "ربط المهام والأشخاص والأنظمة.")[locale]}
          </p>
        </div>
      </div>
      <div className="workflow-step">
        <span className="workflow-mark">●</span>
        <div>
          <strong>{text("Platform", "المنصة")[locale]}</strong>
          <p>{text("Deliver, evaluate and improve.", "التنفيذ والتقييم والتحسين.")[locale]}</p>
        </div>
      </div>
      <p className="workflow-caption">
        {
          text(
            "An illustration of our delivery approach, not a customer dashboard.",
            "رسم توضيحي لمنهج التنفيذ، وليس لوحة بيانات عميل.",
          )[locale]
        }
      </p>
    </div>
  );
}
export function WebsitePage({ page, slug }: { page: string; slug?: string }) {
  const location = useRouterState({ select: (s) => s.location });
  const locale = localeFor(location.pathname);
  const path = basePath(location.pathname);
  const t = (key: keyof typeof ui) => ui[key][locale];
  const query = new URLSearchParams(location.searchStr);
  const selected = query.get("engagement");
  const source = query.get("source");
  const validSource = source && /^\/(?!\/)[a-zA-Z0-9/_-]{0,199}$/.test(source) ? source : path;
  let content: React.ReactNode;
  if (page === "home")
    content = (
      <>
        <section className="home-hero">
          <div className="hero-copy">
            <p className="eyebrow">
              {
                text(
                  "Your healthcare technology delivery partner",
                  "شريكك في تنفيذ التكنولوجيا الصحية",
                )[locale]
              }
            </p>
            <h1>{t("proposition")}</h1>
            <p className="hero-lead">{t("intro")}</p>
            <div className="hero-actions">
              <ProjectCTA locale={locale} />
              <a className="text-link" href={localPath("/solutions", locale)}>
                {text("Find your starting point", "حدد نقطة البداية")[locale]}
                <ArrowRight className="directional" size={18} />
              </a>
            </div>
            <p className="hero-note">
              {
                text(
                  "Free discovery · Scoped proposals · Agreed ownership",
                  "فهم الاحتياجات مجانًا · عروض محددة النطاق · ملكية متفق عليها",
                )[locale]
              }
            </p>
          </div>
          <Workflow locale={locale} />
        </section>
        <section className="audience-section">
          <div>
            <p className="eyebrow">{t("providers")}</p>
            <h2>{t("providerIntro")}</h2>
            <a href={localPath("/solutions", locale) + "#providers"} className="text-link">
              {text("Explore provider solutions", "استكشف حلول مقدمي الرعاية")[locale]}
              <ArrowRight className="directional" size={18} />
            </a>
          </div>
          <div>
            <p className="eyebrow">{t("companies")}</p>
            <h2>{t("companyIntro")}</h2>
            <a href={localPath("/solutions", locale) + "#companies"} className="text-link">
              {text("Explore platform solutions", "استكشف حلول المنصات")[locale]}
              <ArrowRight className="directional" size={18} />
            </a>
          </div>
        </section>
        <section className="section">
          <SectionTitle
            title={
              text("Choose the problem you want to solve", "اختر المشكلة التي تريد حلها")[locale]
            }
            body={
              text(
                "Start where your organization is today. We clarify the scope together.",
                "ابدأ من واقع مؤسستك اليوم. نوضح النطاق معًا.",
              )[locale]
            }
          />
          <EngagementCards locale={locale} />
        </section>
        <section className="section work-section">
          <SectionTitle
            eyebrow={t("work")}
            title={
              text("Relevant platform delivery experience", "خبرة في تنفيذ منصات ذات صلة")[locale]
            }
            body={t("proofNote")}
          />
          <ProjectRows locale={locale} />
        </section>
        <section className="section">
          <SectionTitle
            eyebrow={t("process")}
            title={
              text(
                "A clear scope. A visible path to delivery.",
                "نطاق واضح ومسار تنفيذ قابل للمتابعة.",
              )[locale]
            }
          />
          <Process locale={locale} />
          <a className="text-link" href={localPath("/how-we-work", locale)}>
            {text("Understand the process", "تعرف على خطوات العمل")[locale]}
            <ArrowRight className="directional" size={18} />
          </a>
        </section>
        <section className="support-section">
          <h2>{t("support")}</h2>
          <p>{t("supportBody")}</p>
        </section>
        <section className="section faq-section">
          <SectionTitle title={text("Before we talk", "قبل أن نتحدث")[locale]} />
          <FAQ locale={locale} compact />
        </section>
        <Invitation locale={locale} source={path} />
      </>
    );
  else if (page === "solutions")
    content = (
      <>
        <PageIntro
          locale={locale}
          title={
            text("Start with your organization’s next challenge.", "ابدأ بالتحدي التالي لمؤسستك.")[
              locale
            ]
          }
          description={
            text(
              "Four focused engagements, each built around a customer problem and an agreed outcome.",
              "أربع خدمات محددة، تتمحور كل منها حول مشكلة للعميل ونتيجة متفق عليها.",
            )[locale]
          }
        />
        <section className="section" id="providers">
          <SectionTitle title={t("providers")} body={t("providerIntro")} />
          <EngagementCards locale={locale} filter="provider" />
        </section>
        <section className="section alternate" id="companies">
          <SectionTitle title={t("companies")} body={t("companyIntro")} />
          <EngagementCards locale={locale} filter="digital-health" />
        </section>
        <section className="section narrow">
          <SectionTitle
            title={
              text(
                "Specialist capabilities, within a defined engagement",
                "قدرات متخصصة ضمن نطاق محدد",
              )[locale]
            }
          />
          <p>{faqs[5].a[locale]}</p>
          <p>{t("scope")}</p>
        </section>
        <Invitation locale={locale} source={path} />
      </>
    );
  else if (page === "solution") {
    const e = engagements.find((e) => e.id === slug)!;
    content = (
      <>
        <PageIntro
          locale={locale}
          title={e.title[locale]}
          description={e.problem[locale]}
          eyebrow={e.audience === "provider" ? t("providers") : t("companies")}
        />
        <div className="detail-grid section">
          <div className="detail-main">
            <section>
              <h2>{t("fit")}</h2>
              <p>{e.fit[locale]}</p>
            </section>
            <section>
              <h2>{t("outputs")}</h2>
              <ul className="deliverables">
                {e.outputs.map((o) => (
                  <li key={o.en}>{o[locale]}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>{t("dependencies")}</h2>
              <p>{e.dependencies[locale]}</p>
            </section>
            <section>
              <h2>{t("exclusions")}</h2>
              <p>{e.exclusions[locale]}</p>
              <p>{t("scope")}</p>
            </section>
            <section>
              <h2>{t("measures")}</h2>
              <p>{e.measures[locale]}</p>
            </section>
            <section>
              <h2>{t("after")}</h2>
              <p>{e.after[locale]}</p>
              <p>{t("supportBody")}</p>
            </section>
          </div>
          <aside className="detail-aside">
            <h2>{text("Define the right next step", "حدد الخطوة المناسبة التالية")[locale]}</h2>
            <p>{t("discoveryBody")}</p>
            <ProjectCTA locale={locale} engagement={e.id} source={path} />
          </aside>
        </div>
        <Invitation locale={locale} source={path} engagement={e.id} />
      </>
    );
  } else if (page === "work")
    content = (
      <>
        <PageIntro
          locale={locale}
          title={
            text(
              "Platforms delivered for healthcare and learning.",
              "منصات للرعاية الصحية والتعلم.",
            )[locale]
          }
          description={t("proofNote")}
        />
        <section className="section">
          <ProjectRows locale={locale} />
        </section>
        <Invitation locale={locale} source={path} />
      </>
    );
  else if (page === "project") {
    const p = projects.find((p) => p.id === slug)!;
    content = (
      <>
        <PageIntro
          locale={locale}
          title={p.name[locale]}
          description={p.context[locale]}
          eyebrow={p.category[locale]}
        />
        <section className="section project-detail">
          <div
            className="project-diagram"
            role="img"
            aria-label={
              text(
                "Service context, platform delivery, user journey",
                "سياق الخدمة، تنفيذ المنصة، رحلة المستخدم",
              )[locale]
            }
          >
            {[
              text("Service context", "سياق الخدمة"),
              text("Full-platform delivery", "تنفيذ المنصة بالكامل"),
              text("User journey", "رحلة المستخدم"),
            ].map((s, i) => (
              <div key={s.en}>
                {s[locale]}
                {i < 2 && <ArrowRight className="directional" aria-hidden="true" />}
              </div>
            ))}
            <small>
              {
                text(
                  "Explanatory diagram; no third-party interface reproduced.",
                  "رسم توضيحي؛ لا يعرض واجهات أطراف أخرى.",
                )[locale]
              }
            </small>
          </div>
          <div>
            <h2>{text("Our contribution", "مساهمتنا")[locale]}</h2>
            <p className="project-role">{t("projectRole")}</p>
            <p>{p.problem[locale]}</p>
            <a className="text-link" href={p.url} target="_blank" rel="noopener noreferrer">
              {
                text(
                  "Visit the public website (opens in a new tab)",
                  "زيارة الموقع العام (يفتح في علامة تبويب جديدة)",
                )[locale]
              }
              <ArrowUpRight size={18} />
            </a>
            <p className="proof-note">{t("proofNote")}</p>
          </div>
        </section>
        <Invitation locale={locale} source={path} engagement="platform-launch" />
      </>
    );
  } else if (page === "how-we-work")
    content = (
      <>
        <PageIntro
          locale={locale}
          title={
            text(
              "From a real problem to an agreed delivery.",
              "من مشكلة حقيقية إلى تنفيذ متفق عليه.",
            )[locale]
          }
          description={t("discoveryBody")}
        />
        <section className="section">
          <Process locale={locale} />
        </section>
        <section className="section narrow alternate">
          <h2>{text("What your proposal makes clear", "ما الذي يوضحه عرض المشروع؟")[locale]}</h2>
          <ul className="deliverables">
            {[
              text("The customer problem and people affected", "مشكلة العميل والأشخاص المتأثرون"),
              text(
                "Deliverables, exclusions and customer responsibilities",
                "المخرجات والاستثناءات ومسؤوليات العميل",
              ),
              text(
                "Existing systems, access and dependencies",
                "الأنظمة الحالية والوصول والمتطلبات",
              ),
              text(
                "Milestones, acceptance criteria and evaluation measures",
                "المراحل ومعايير القبول ومقاييس التقييم",
              ),
              text(
                "Ownership, documentation, training and handover",
                "الملكية والوثائق والتدريب والتسليم",
              ),
              text(
                "Post-launch support, maintenance and improvement arrangements",
                "ترتيبات الدعم والصيانة والتحسين بعد الإطلاق",
              ),
            ].map((s) => (
              <li key={s.en}>{s[locale]}</li>
            ))}
          </ul>
          <p>{t("scope")}</p>
        </section>
        <section className="support-section">
          <h2>{t("support")}</h2>
          <p>{t("supportBody")}</p>
        </section>
        <Invitation locale={locale} source={path} />
      </>
    );
  else if (page === "about")
    content = (
      <>
        <PageIntro
          locale={locale}
          title={
            text(
              "A delivery partner for better digital healthcare.",
              "شريك تنفيذ لخدمات صحية رقمية أفضل.",
            )[locale]
          }
          description={t("intro")}
        />
        <section className="section detail-grid">
          <div>
            <h2>{text("ProHealth Digital LLC", "ProHealth Digital LLC")[locale]}</h2>
            <p>
              {
                text(
                  "We work with healthcare providers and digital health companies on websites, operational workflows and platforms. Our role is to translate a defined need into technology your organization can use, own and maintain.",
                  "نعمل مع مقدمي الرعاية وشركات الصحة الرقمية على المواقع وإجراءات العمل والمنصات. دورنا تحويل احتياج محدد إلى تكنولوجيا يمكن لمؤسستك استخدامها وامتلاكها وصيانتها.",
                )[locale]
              }
            </p>
            <p>
              {
                text(
                  "International delivery starts with clear responsibilities, agreed communication and context-specific requirements. We establish the appropriate team and support scope in each proposal.",
                  "يبدأ التنفيذ الدولي بمسؤوليات واضحة وتواصل متفق عليه ومتطلبات تناسب السياق. نحدد الفريق المناسب ونطاق الدعم في كل عرض.",
                )[locale]
              }
            </p>
          </div>
          <div className="principles">
            <h2>{text("What you can expect", "ما الذي يمكنك توقعه؟")[locale]}</h2>
            <p>
              {
                text(
                  "Clear scope, visible milestone reviews, evidence-based acceptance and documented handover. We discuss limitations and dependencies before promising delivery.",
                  "نطاق واضح ومراجعات مراحل قابلة للمتابعة وقبول مستند إلى الأدلة وتسليم موثق. نناقش الحدود والمتطلبات قبل تقديم وعود التنفيذ.",
                )[locale]
              }
            </p>
            <p>
              {
                text(
                  "We build technology. Your organization retains responsibility for clinical decisions and the care it provides.",
                  "نبني التكنولوجيا. تحتفظ مؤسستك بالمسؤولية عن القرارات الطبية والرعاية التي تقدمها.",
                )[locale]
              }
            </p>
          </div>
        </section>
        <section className="section">
          <SectionTitle title={text("Relevant work", "أعمال ذات صلة")[locale]} />
          <ProjectRows locale={locale} />
        </section>
        <Invitation locale={locale} source={path} />
      </>
    );
  else if (page === "contact")
    content = (
      <>
        <PageIntro locale={locale} title={t("cta")} description={t("discoveryBody")} />
        <section className="section contact-layout">
          <InquiryForm
            locale={locale}
            engagement={engagements.some((e) => e.id === selected) ? selected! : undefined}
            source={validSource}
          />
          <aside>
            <h2>{text("A simple starting point", "نقطة بداية بسيطة")[locale]}</h2>
            <p>
              {
                text(
                  "Share the problem in your own words. We will review your inquiry, clarify fit and arrange discovery through the agreed contact channel.",
                  "صف المشكلة بكلماتك. سنراجع استفسارك ونوضح ملاءمته ونرتب جلسة فهم الاحتياجات عبر قناة التواصل المتفق عليها.",
                )[locale]
              }
            </p>
            <p>
              {
                text(
                  "Support for an existing engagement follows your contracted support channels.",
                  "يتم دعم المشاريع القائمة عبر قنوات الدعم المحددة في العقد.",
                )[locale]
              }
            </p>
            <a className="text-link" dir="ltr" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <p>
              {
                text(
                  "English and Arabic website journeys. Project communication language is agreed during discovery.",
                  "الموقع متاح بالإنجليزية والعربية. تُحدد لغة التواصل في المشروع خلال فهم الاحتياجات.",
                )[locale]
              }
            </p>
          </aside>
        </section>
      </>
    );
  else if (page === "faq")
    content = (
      <>
        <PageIntro
          locale={locale}
          title={text("Questions before starting a project", "أسئلة قبل بدء المشروع")[locale]}
          description={
            text(
              "Scope, pricing, integrations, international delivery and support explained.",
              "توضيح النطاق والأسعار والتكامل والتنفيذ الدولي والدعم.",
            )[locale]
          }
        />
        <section className="section narrow">
          <FAQ locale={locale} />
        </section>
        <Invitation locale={locale} source={path} />
      </>
    );
  else {
    const p = policies[page];
    content = (
      <>
        <PageIntro
          locale={locale}
          title={p.title[locale]}
          description={
            text(
              "For the ProHealth Digital LLC business website.",
              "خاص بموقع الأعمال لشركة ProHealth Digital LLC.",
            )[locale]
          }
        />
        <article className="section narrow legal-content">
          {p.sections.map((s) => (
            <section key={s.title.en}>
              <h2>{s.title[locale]}</h2>
              <p>
                {s.body[locale].split(EMAIL).map((part, i) => (
                  <span key={i}>
                    {i > 0 && (
                      <a dir="ltr" href={`mailto:${EMAIL}`}>
                        {EMAIL}
                      </a>
                    )}
                    {part}
                  </span>
                ))}
              </p>
            </section>
          ))}
        </article>
      </>
    );
  }
  return <SiteFrame locale={locale}>{content}</SiteFrame>;
}
