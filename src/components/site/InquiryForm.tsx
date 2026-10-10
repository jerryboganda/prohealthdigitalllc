import { useRef, useState } from "react";
import { engagements, EMAIL, localPath, text } from "@/lib/content";
import type { Locale } from "@/lib/content";
import { inquirySchema } from "@/lib/inquiry";

const copy = {
  name: text("Your name", "اسمك"),
  email: text("Work email", "البريد الإلكتروني المهني"),
  organization: text("Organization", "المؤسسة"),
  organizationType: text("Organization type", "نوع المؤسسة"),
  engagement: text("What would you like to do?", "ما الذي ترغب في تحقيقه؟"),
  stage: text("Project stage", "مرحلة المشروع"),
  country: text("Country", "الدولة"),
  timezone: text("Time zone", "المنطقة الزمنية"),
  brief: text("What problem would you like to solve?", "ما المشكلة التي ترغب في حلها؟"),
  language: text("Preferred communication language", "لغة التواصل المفضلة"),
  budget: text("Budget (optional)", "الميزانية (اختياري)"),
  choose: text("Please select", "يرجى الاختيار"),
  provider: text("Healthcare provider", "مقدم رعاية صحية"),
  company: text("Digital health company", "شركة صحة رقمية"),
  other: text("Other", "أخرى"),
  notSure: text("Not sure yet", "لم أحدد بعد"),
  discuss: text("Discuss during discovery", "للمناقشة خلال فهم الاحتياجات"),
  exploring: text("Exploring an idea", "استكشاف فكرة"),
  planning: text("Planning a project", "تخطيط مشروع"),
  building: text("Building a product", "تطوير منتج"),
  live: text("Running a live service", "تشغيل خدمة قائمة"),
  warning: text(
    "For business inquiries only. Do not include patient names, identifying information, medical histories or records. No attachments are accepted.",
    "لاستفسارات الأعمال فقط. لا تذكر أسماء المرضى أو معلومات تكشف هويتهم أو تاريخهم الطبي أو سجلاتهم. لا تُقبل المرفقات.",
  ),
  consent: text(
    "I have read the privacy policy and acknowledge how my inquiry information will be used.",
    "قرأت سياسة الخصوصية وأقر بكيفية استخدام معلومات استفساري.",
  ),
  policy: text("Read privacy policy", "اقرأ سياسة الخصوصية"),
  send: text("Send project inquiry", "أرسل استفسار المشروع"),
  sending: text("Sending…", "جارٍ الإرسال…"),
  accepted: text(
    "Your inquiry was accepted by our mail server. The team will review it and contact you about discovery. This does not confirm that a person has read it.",
    "قبل خادم البريد استفسارك. سيراجعه الفريق ويتواصل معك بشأن جلسة فهم الاحتياجات. لا يعني ذلك أن شخصًا قد قرأه بالفعل.",
  ),
  error: text(
    "We could not send your inquiry. Your details are still here. Please retry or email us directly.",
    "تعذر إرسال استفسارك. ما زالت بياناتك محفوظة في النموذج. حاول مجددًا أو راسلنا مباشرة.",
  ),
  invalid: text("Please check this field.", "يرجى مراجعة هذا الحقل."),
  validation: text(
    "Please review the marked fields before submitting.",
    "يرجى مراجعة الحقول المحددة قبل الإرسال.",
  ),
  rate: text(
    "Too many attempts. Please wait 15 minutes or email us directly.",
    "محاولات كثيرة. يرجى الانتظار 15 دقيقة أو مراسلتنا مباشرة.",
  ),
  briefHint: text(
    "20–3,000 characters. Describe who is affected and what needs to improve.",
    "من 20 إلى 3000 حرف. وضح من يتأثر بالمشكلة وما الذي يحتاج إلى تحسين.",
  ),
  followup: text(
    "Free discovery comes first. We assess fit and clarify requirements before preparing a scoped proposal. No technical specification or confirmed budget is required.",
    "تبدأ الرحلة بجلسة مجانية لفهم الاحتياجات. نقيّم ملاءمة المشروع ونوضح المتطلبات قبل إعداد عرض محدد النطاق. لا يلزم تقديم مواصفات تقنية أو ميزانية مؤكدة.",
  ),
};
export function InquiryForm({
  locale,
  engagement,
  source,
}: {
  locale: Locale;
  engagement?: string;
  source: string;
}) {
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  const [status, setStatus] = useState<"idle" | "accepted" | "error" | "validation" | "rate">(
    "idle",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const t = (key: keyof typeof copy) => copy[key][locale];
  const validationMessages: Record<string, string> = {
    name: text("Enter your name (2–100 characters).", "أدخل اسمك (من 2 إلى 100 حرف).")[locale],
    email: text("Enter a valid work email address.", "أدخل بريدًا إلكترونيًا مهنيًا صحيحًا.")[
      locale
    ],
    organization: text(
      "Enter your organization (2–150 characters).",
      "أدخل اسم مؤسستك (من 2 إلى 150 حرفًا).",
    )[locale],
    organizationType: text("Select your organization type.", "اختر نوع مؤسستك.")[locale],
    stage: text("Select the current project stage.", "اختر مرحلة المشروع الحالية.")[locale],
    country: text("Enter your country.", "أدخل دولتك.")[locale],
    timezone: text("Enter your time zone.", "أدخل منطقتك الزمنية.")[locale],
    brief: copy.briefHint[locale],
    consent: text("Please acknowledge the privacy policy.", "يرجى الإقرار بسياسة الخصوصية.")[
      locale
    ],
  };
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = inquirySchema.safeParse({
      ...data,
      consent: data.consent === "on",
      locale,
      source,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const name = String(issue.path[0]);
        next[name] = validationMessages[name] || t("invalid");
      }
      setErrors(next);
      setStatus("validation");
      const field = form.elements.namedItem(Object.keys(next)[0]);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    busy.current = true;
    setPending(true);
    setErrors({});
    setStatus("idle");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(30000),
      });
      setStatus(response.ok ? "accepted" : response.status === 429 ? "rate" : "error");
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
      setPending(false);
    }
  }
  const attrs = (name: keyof typeof copy) => ({
    name,
    id: `inquiry-${name}`,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `error-${name}` : undefined,
  });
  const field = (name: keyof typeof copy, input: React.ReactNode) => (
    <div className="field">
      <label htmlFor={`inquiry-${name}`}>{t(name)}</label>
      {input}
      {errors[name] && (
        <span id={`error-${name}`} className="field-error">
          {errors[name]}
        </span>
      )}
    </div>
  );
  if (status === "accepted")
    return (
      <div className="inquiry-success" role="status">
        <h2>{text("Thank you for sharing your project", "شكرًا لمشاركة مشروعك")[locale]}</h2>
        <p>{t("accepted")}</p>
        <a href={`mailto:${EMAIL}`} dir="ltr">
          {EMAIL}
        </a>
      </div>
    );
  return (
    <form
      ref={formRef}
      method="post"
      action="/api/inquiries"
      onSubmit={submit}
      noValidate
      className="inquiry-form"
    >
      <noscript>
        <p>
          {
            text(
              "This form requires JavaScript. Please email your business inquiry directly to",
              "يتطلب هذا النموذج JavaScript. يرجى إرسال استفسار الأعمال مباشرة إلى",
            )[locale]
          }{" "}
          <a href={`mailto:${EMAIL}`} dir="ltr">
            {EMAIL}
          </a>
        </p>
      </noscript>
      <p className="form-notice" id="inquiry-warning">
        {t("warning")}
      </p>
      <fieldset disabled={pending}>
        <legend className="sr-only">
          {text("Project inquiry details", "تفاصيل استفسار المشروع")[locale]}
        </legend>
        <div className="form-grid">
          {field(
            "name",
            <input {...attrs("name")} autoComplete="name" minLength={2} maxLength={100} required />,
          )}
          {field(
            "email",
            <input
              {...attrs("email")}
              type="email"
              dir="ltr"
              autoComplete="email"
              maxLength={254}
              required
            />,
          )}
          {field(
            "organization",
            <input
              {...attrs("organization")}
              autoComplete="organization"
              minLength={2}
              maxLength={150}
              required
            />,
          )}
          {field(
            "organizationType",
            <select {...attrs("organizationType")} defaultValue="" required>
              <option value="">{t("choose")}</option>
              <option value="provider">{t("provider")}</option>
              <option value="digital-health">{t("company")}</option>
              <option value="other">{t("other")}</option>
            </select>,
          )}
          {field(
            "engagement",
            <select {...attrs("engagement")} defaultValue={engagement || "not-sure"} required>
              <option value="not-sure">{t("notSure")}</option>
              {engagements.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title[locale]}
                </option>
              ))}
            </select>,
          )}
          {field(
            "stage",
            <select {...attrs("stage")} defaultValue="" required>
              <option value="">{t("choose")}</option>
              {(["exploring", "planning", "building", "live"] as const).map((s) => (
                <option key={s} value={s}>
                  {t(s)}
                </option>
              ))}
            </select>,
          )}
          {field(
            "country",
            <input
              {...attrs("country")}
              autoComplete="country-name"
              minLength={2}
              maxLength={100}
              required
            />,
          )}
          {field(
            "timezone",
            <input
              {...attrs("timezone")}
              placeholder={
                locale === "ar" ? "مثال: آسيا / الرياض، UTC+3" : "e.g. Europe/London, UTC+1"
              }
              minLength={2}
              maxLength={100}
              required
            />,
          )}
          {field(
            "language",
            <select {...attrs("language")} defaultValue={locale}>
              <option value="en">{locale === "ar" ? "الإنجليزية" : "English"}</option>
              <option value="ar">{locale === "ar" ? "العربية" : "Arabic"}</option>
            </select>,
          )}
          {field(
            "budget",
            <select {...attrs("budget")} defaultValue="not-sure">
              <option value="not-sure">{t("notSure")}</option>
              <option value="discuss">{t("discuss")}</option>
            </select>,
          )}
        </div>
        {field(
          "brief",
          <>
            <textarea
              {...attrs("brief")}
              rows={6}
              minLength={20}
              maxLength={3000}
              aria-describedby={`brief-hint${errors.brief ? " error-brief" : ""}`}
              required
            />
            <small id="brief-hint">{t("briefHint")}</small>
          </>,
        )}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="consent">
          <input
            name="consent"
            id="inquiry-consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "error-consent" : undefined}
            required
          />
          <span>
            {t("consent")} <a href={localPath("/privacy", locale)}>{t("policy")}</a>
          </span>
        </label>
        {errors.consent && (
          <span id="error-consent" className="field-error">
            {errors.consent}
          </span>
        )}
      </fieldset>
      {["error", "validation", "rate"].includes(status) && (
        <div role="alert" className="form-error">
          {t(status as "error" | "validation" | "rate")}
          {status !== "validation" && (
            <>
              {" "}
              <a href={`mailto:${EMAIL}`} dir="ltr">
                {EMAIL}
              </a>
            </>
          )}
        </div>
      )}
      <button className="primary-button" type="submit" disabled={pending} aria-busy={pending}>
        {t(pending ? "sending" : "send")}
      </button>
      <p className="form-followup">{t("followup")}</p>
    </form>
  );
}
