import { text } from "./content.ts";
import type { Localized } from "./content.ts";

/** Unique, search-ready titles (≤60 chars before the brand suffix) and descriptions (≤160). */
export const meta: Record<string, { title: Localized; description: Localized }> = {
  home: {
    title: text("Healthcare Technology Delivery Partner", "شريك تنفيذ التكنولوجيا الصحية"),
    description: text(
      "Websites, care workflows and digital health platforms for providers and health companies in the GCC and South Asia — from free discovery to 24/7 support.",
      "مواقع وإجراءات رعاية ومنصات صحة رقمية لمقدمي الرعاية وشركات الصحة في الخليج وجنوب آسيا، من فهم الاحتياجات مجانًا إلى الدعم على مدار الساعة.",
    ),
  },
  solutions: {
    title: text("Healthcare Digital Solutions", "حلول رقمية للرعاية الصحية"),
    description: text(
      "Four scoped engagements: establish a digital presence, improve care workflows, launch a health platform or improve the platform you already run.",
      "أربع خدمات محددة النطاق: تأسيس الحضور الرقمي، وتحسين إجراءات الرعاية، وإطلاق منصة صحية، وتطوير المنصة التي تديرها اليوم.",
    ),
  },
  work: {
    title: text("Our Work — Health Platforms Delivered", "أعمالنا — منصات صحية نفذناها"),
    description: text(
      "Healthcare and healthcare-education platforms where ProHealth Digital provided full-platform delivery: OET with Dr Hesham, MedIQ and Marham.",
      "منصات للرعاية الصحية والتعليم الصحي تولت ProHealth Digital تنفيذها بالكامل: OET مع الدكتور هشام وMedIQ وMarham.",
    ),
  },
  "how-we-work": {
    title: text("How We Work — Discovery to Support", "كيف نعمل — من فهم الاحتياجات إلى الدعم"),
    description: text(
      "Free discovery, a scoped proposal, visible delivery and documented handover with contracted support. See what every ProHealth proposal makes clear.",
      "فهم مجاني للاحتياجات، وعرض محدد النطاق، وتنفيذ قابل للمتابعة، وتسليم موثق مع دعم تعاقدي. تعرّف على ما يوضحه كل عرض من ProHealth.",
    ),
  },
  about: {
    title: text("About ProHealth Digital LLC", "عن ProHealth Digital LLC"),
    description: text(
      "A healthcare technology delivery partner translating defined needs into websites, workflows and platforms your organization can use, own and maintain.",
      "شريك لتنفيذ التكنولوجيا الصحية يحوّل الاحتياجات المحددة إلى مواقع وإجراءات عمل ومنصات يمكن لمؤسستك استخدامها وامتلاكها وصيانتها.",
    ),
  },
  contact: {
    title: text("Discuss Your Healthcare Project", "ناقش مشروعك الصحي معنا"),
    description: text(
      "Tell us who you serve and what you want to improve. Discovery is free; we clarify fit and propose a scope you can evaluate before committing.",
      "أخبرنا بمن تخدم وما الذي تريد تحسينه. جلسة فهم الاحتياجات مجانية؛ نوضح الملاءمة ونقترح نطاقًا يمكنك تقييمه قبل الالتزام.",
    ),
  },
  faq: {
    title: text("FAQ — Scope, Pricing and Support", "الأسئلة الشائعة — النطاق والأسعار والدعم"),
    description: text(
      "Answers on who we work with, project pricing, system integration, international delivery, 24/7 support, clinical AI and how to get started.",
      "إجابات حول من نعمل معهم وتسعير المشاريع وتكامل الأنظمة والتنفيذ الدولي والدعم على مدار الساعة والذكاء الاصطناعي الطبي وكيفية البدء.",
    ),
  },
  insights: {
    title: text("Insights for Digital Health Teams", "رؤى ومقالات لفرق الصحة الرقمية"),
    description: text(
      "Practical guides on patient access websites, care workflow digitisation, platform launches, bilingual health UX and health data privacy.",
      "أدلة عملية حول مواقع وصول المرضى ورقمنة إجراءات الرعاية وإطلاق المنصات وتجربة المستخدم الصحية ثنائية اللغة وخصوصية البيانات الصحية.",
    ),
  },
  resources: {
    title: text("Checklists and Guides for Health Teams", "قوائم تحقق وأدلة لفرق الرعاية الصحية"),
    description: text(
      "Free, practical checklists and guides for planning patient-access websites, mapping workflows, launch readiness and bilingual health content.",
      "قوائم تحقق وأدلة عملية مجانية لتخطيط مواقع وصول المرضى، ورسم إجراءات العمل، والجاهزية للإطلاق، والمحتوى الصحي ثنائي اللغة.",
    ),
  },
  glossary: {
    title: text("Digital Health Glossary", "مسرد مصطلحات الصحة الرقمية"),
    description: text(
      "Plain-language definitions of digital health, interoperability, patient access, data protection and delivery terms, in English and Arabic.",
      "تعريفات مبسطة لمصطلحات الصحة الرقمية والتشغيل البيني ووصول المرضى وحماية البيانات والتنفيذ، بالعربية والإنجليزية.",
    ),
  },
  providers: {
    title: text("Digital Solutions for Healthcare Providers", "حلول رقمية لمقدمي الرعاية الصحية"),
    description: text(
      "For clinics, hospitals and healthcare groups: clearer websites, dependable inquiry and booking handoffs, and connected staff workflows.",
      "للعيادات والمستشفيات والمجموعات الصحية: مواقع أوضح، ومسارات موثوقة للاستفسار والحجز، وإجراءات عمل مترابطة للموظفين.",
    ),
  },
  "digital-health-companies": {
    title: text(
      "Platform Delivery for Digital Health Companies",
      "تنفيذ المنصات لشركات الصحة الرقمية",
    ),
    description: text(
      "For health-tech and healthcare-education teams: launch a focused first release or diagnose and improve the platform you already run.",
      "لفرق التقنية الصحية والتعليم الصحي: أطلق إصدارًا أول مركزًا، أو شخّص المنصة التي تديرها وطوّرها.",
    ),
  },
  privacy: {
    title: text("Privacy Policy", "سياسة الخصوصية"),
    description: text(
      "How ProHealth Digital LLC uses business inquiry information, how inquiries are delivered, what our servers log and the choices available to you.",
      "كيف تستخدم ProHealth Digital LLC معلومات الاستفسارات التجارية، وكيف تُرسل، وما الذي تسجله خوادمنا، والخيارات المتاحة لك.",
    ),
  },
  terms: {
    title: text("Website Terms", "شروط استخدام الموقع"),
    description: text(
      "The purpose and limits of the ProHealth Digital LLC website, how project agreements are formed and the appropriate use of the inquiry form.",
      "الغرض من موقع ProHealth Digital LLC وحدوده، وكيفية إبرام اتفاقيات المشاريع، والاستخدام المناسب لنموذج الاستفسار.",
    ),
  },
  cookies: {
    title: text("Cookies and Website Technology", "ملفات تعريف الارتباط وتقنيات الموقع"),
    description: text(
      "This website sets no advertising or analytics cookies, loads no third-party trackers and serves its fonts and assets from its own domain.",
      "لا يضبط هذا الموقع ملفات تعريف ارتباط إعلانية أو تحليلية، ولا يحمّل أدوات تتبع خارجية، ويقدم خطوطه وموارده من نطاقه الخاص.",
    ),
  },
  refunds: {
    title: text("Cancellation and Refunds", "الإلغاء والاسترداد"),
    description: text(
      "There is no online checkout on this website. Cancellation, milestone payments and refunds are defined in each signed engagement agreement.",
      "لا توجد عملية دفع عبر هذا الموقع. يُحدد الإلغاء ودفعات المراحل والاسترداد في اتفاق كل مشروع موقع.",
    ),
  },
  delivery: {
    title: text("Delivery and Support Terms", "شروط التنفيذ والدعم"),
    description: text(
      "How proposals define outputs, milestones and acceptance, and how ongoing and contracted 24/7 support, response targets and escalation are agreed.",
      "كيف تحدد العروض المخرجات والمراحل والقبول، وكيف يُتفق على الدعم المستمر والدعم التعاقدي على مدار الساعة وأهداف الاستجابة والتصعيد.",
    ),
  },
};

/** Keep a description within the 160-character search snippet budget, ending on a word. */
export function clip(value: string, max = 158) {
  if (value.length <= max) return value;
  const cut = value.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:،؛]$/, "") + "…";
}
