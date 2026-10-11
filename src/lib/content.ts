export type Locale = "en" | "ar";
export type Localized = Record<Locale, string>;
export const text = (en: string, ar: string): Localized => ({ en, ar });
export const ORIGIN = "https://prohealthdigitalllc.com";
export const EMAIL = "sales@prohealthdigitalllc.com";
/** WhatsApp click-to-chat number in international format without "+" (e.g. "9665xxxxxxxx"). Empty hides the CTA. */
export const WHATSAPP = "";
/** Search engine verification tokens; empty values are not rendered. */
export const VERIFICATION = { google: "", bing: "" };
/** Fallback sitemap lastmod for pages without their own date. */
export const CONTENT_UPDATED = "2026-10-11";
export const localPath = (path: string, locale: Locale) =>
  locale === "ar" ? `/ar${path === "/" ? "" : path}` : path;
export const localeFor = (path: string): Locale => (/^\/ar(?:\/|$)/.test(path) ? "ar" : "en");
export const basePath = (path: string) => path.replace(/^\/ar(?=\/|$)/, "") || "/";
export const ui = {
  proposition: text("Build better digital healthcare services.", "نبني خدمات صحية رقمية أفضل."),
  intro: text(
    "We help healthcare providers and digital health companies improve patient access, connect operational workflows, and launch or strengthen digital platforms—from discovery through delivery and ongoing support.",
    "نساعد مقدمي الرعاية الصحية وشركات الصحة الرقمية على تسهيل وصول المرضى إلى الخدمات، وربط إجراءات العمل، وإطلاق المنصات الرقمية أو تطويرها، من فهم الاحتياجات إلى التنفيذ والدعم المستمر.",
  ),
  cta: text("Discuss your project", "ناقش مشروعك معنا"),
  solutions: text("Solutions", "الحلول"),
  work: text("Our Work", "أعمالنا"),
  process: text("How We Work", "كيف نعمل"),
  about: text("About", "عن الشركة"),
  providers: text("For healthcare providers", "لمقدمي الرعاية الصحية"),
  companies: text("For digital health companies", "لشركات الصحة الرقمية"),
  providerIntro: text(
    "Make your services easier to find and your daily work easier to manage.",
    "اجعل خدماتك أسهل في الوصول، وأعمالك اليومية أسهل في الإدارة.",
  ),
  companyIntro: text(
    "Turn a defined opportunity into a usable platform, or improve the product you already run.",
    "حوّل فرصة واضحة إلى منصة عملية، أو طوّر المنتج الذي تديره اليوم.",
  ),
  explore: text("Explore the engagement", "استكشف تفاصيل الخدمة"),
  fit: text("A good fit when", "متى تناسبك هذه الخدمة؟"),
  outputs: text("What we can deliver", "ما الذي يمكننا تقديمه؟"),
  dependencies: text("What we need from you", "ما الذي نحتاجه منك؟"),
  exclusions: text("Scope and boundaries", "نطاق العمل وحدوده"),
  measures: text("How we assess success", "كيف نقيس النجاح؟"),
  after: text("After launch", "بعد الإطلاق"),
  scope: text(
    "Scope, cost and timing depend on the agreed outputs, existing systems, content readiness, access permissions and review cycles. Your proposal records deliverables, exclusions, dependencies and acceptance criteria before delivery begins.",
    "يعتمد النطاق والتكلفة والمدة على المخرجات المتفق عليها، والأنظمة الحالية، وجاهزية المحتوى، وصلاحيات الوصول، ومراحل المراجعة. يوضح العرض المخرجات والاستثناءات والمتطلبات ومعايير القبول قبل بدء التنفيذ.",
  ),
  support: text("Support that matches your service", "دعم يناسب طبيعة خدمتك"),
  supportBody: text(
    "Contracted 24/7 support is available. We agree channels, incident severity, response targets and escalation in your support terms. Coverage, maintenance and future improvements are scoped for your platform.",
    "يتوفر دعم على مدار الساعة طوال أيام الأسبوع بموجب عقد. نتفق على قنوات التواصل، وتصنيف الحوادث، وأهداف الاستجابة، ومسار التصعيد ضمن شروط الدعم. تُحدد التغطية والصيانة والتحسينات المستقبلية وفق احتياجات منصتك.",
  ),
  discovery: text("Start with a useful conversation", "ابدأ بحوار مفيد"),
  discoveryBody: text(
    "Tell us who you serve, what is getting in the way, and what you want to improve. Discovery is free. We clarify the opportunity and propose a scope you can evaluate before committing.",
    "أخبرنا بمن تخدم، وما العقبات التي تواجهك، وما الذي ترغب في تحسينه. جلسة فهم الاحتياجات مجانية. نوضح الفرصة ونقترح نطاقًا يمكنك تقييمه قبل الالتزام.",
  ),
  email: text("Or email us directly", "أو راسلنا مباشرة"),
  projectRole: text("Full-platform delivery", "تنفيذ المنصة بالكامل"),
  proofNote: text(
    "Selected healthcare and education platforms, with our full-platform delivery contribution described below.",
    "منصات مختارة للرعاية الصحية والتعليم، مع توضيح مساهمتنا في تنفيذها بالكامل أدناه.",
  ),
};
export interface Engagement {
  id: "digital-presence" | "care-workflows" | "platform-launch" | "platform-improvement";
  audience: "provider" | "digital-health";
  title: Localized;
  problem: Localized;
  fit: Localized;
  outputs: Localized[];
  dependencies: Localized;
  exclusions: Localized;
  measures: Localized;
  after: Localized;
  /** Optional deeper content (typical delivery phases and engagement-specific questions). */
  phasesTitle?: Localized;
  phases?: { title: Localized; body: Localized }[];
  faqs?: { q: Localized; a: Localized }[];
}
export const engagements: Engagement[] = [
  {
    id: "digital-presence",
    audience: "provider",
    title: text("Establish your digital presence", "أسّس حضورك الرقمي"),
    problem: text(
      "Help patients understand your services, find the right provider and take the next step.",
      "ساعد المرضى على فهم خدماتك، والعثور على مقدم الرعاية المناسب، واتخاذ الخطوة التالية.",
    ),
    fit: text(
      "Your clinic or healthcare group needs a clearer website, better service information or a dependable inquiry and booking handoff.",
      "تحتاج عيادتك أو مجموعتك الصحية إلى موقع أوضح، ومعلومات أفضل عن الخدمات، ومسار موثوق للاستفسار أو الانتقال إلى الحجز.",
    ),
    outputs: [
      text(
        "Service and provider information organized around patient questions",
        "معلومات الخدمات ومقدمي الرعاية منظمة حول أسئلة المرضى",
      ),
      text(
        "Accessible, responsive website design and implementation",
        "تصميم وتنفيذ موقع متجاوب وسهل الاستخدام",
      ),
      text(
        "Working inquiry flow or handoff to your agreed booking system",
        "مسار استفسار عملي أو ربط بنظام الحجز المتفق عليه",
      ),
      text(
        "Content guidance, launch checks and editing handover",
        "إرشادات المحتوى وفحوص الإطلاق وتسليم أدوات التحرير",
      ),
    ],
    dependencies: text(
      "You provide approved service information, provider details, brand assets and a responsible reviewer. Booking connections require system access, supported interfaces and agreed data arrangements.",
      "توفر معلومات الخدمات المعتمدة، وتفاصيل مقدمي الرعاية، ومواد الهوية، ومسؤولًا للمراجعة. يتطلب ربط الحجز الوصول إلى النظام وواجهات مدعومة وترتيبات متفقًا عليها للبيانات.",
    ),
    exclusions: text(
      "A website does not replace clinical triage or care. Advertising, clinical content approval and a new booking platform are included only if separately scoped.",
      "لا يحل الموقع محل الفرز الطبي أو الرعاية. لا تشمل الخدمة الإعلانات أو اعتماد المحتوى الطبي أو إنشاء منصة حجز جديدة إلا ضمن نطاق منفصل.",
    ),
    measures: text(
      "Review service findability, mobile task completion and inquiry or booking completion against an agreed baseline where available. No conversion gain is guaranteed.",
      "نراجع سهولة العثور على الخدمات وإنجاز المهام عبر الهاتف وإتمام الاستفسار أو الحجز مقابل خط أساس متفق عليه عند توفره. لا نضمن زيادة محددة في التحويلات.",
    ),
    after: text(
      "We hand over content ownership and editing guidance. Maintenance and support can be agreed for the launched website.",
      "نسلم ملكية المحتوى وإرشادات التحرير. يمكن الاتفاق على صيانة الموقع ودعمه بعد الإطلاق.",
    ),
  },
  {
    id: "care-workflows",
    audience: "provider",
    title: text("Improve care workflows", "حسّن إجراءات العمل في الرعاية"),
    problem: text(
      "Reduce friction caused by disconnected systems and manual administration.",
      "قلّل التعقيد الناتج عن الأنظمة المنفصلة والإدارة اليدوية.",
    ),
    fit: text(
      "Your staff repeat data entry, coordinate tasks across disconnected tools or struggle to follow up consistently.",
      "يكرر فريقك إدخال البيانات، أو ينسق المهام عبر أدوات منفصلة، أو يواجه صعوبة في المتابعة المنتظمة.",
    ),
    outputs: [
      text(
        "Current workflow map and prioritized improvement scope",
        "خريطة إجراءات العمل الحالية ونطاق تحسين مرتب حسب الأولوية",
      ),
      text(
        "Agreed integrations and staff-facing tools",
        "تكاملات متفق عليها وأدوات مخصصة للموظفين",
      ),
      text(
        "Testing with operational users and documented acceptance",
        "اختبارات مع المستخدمين التشغيليين وتوثيق القبول",
      ),
      text(
        "Training, adoption guidance and operational handover",
        "تدريب وإرشادات اعتماد الأدوات وتسليم تشغيلي",
      ),
    ],
    dependencies: text(
      "We need access to workflow owners and authorized test environments. Integrations depend on supported APIs, vendor permissions and agreed security and data arrangements.",
      "نحتاج إلى التواصل مع مسؤولي الإجراءات والوصول إلى بيئات اختبار مصرح بها. يعتمد التكامل على واجهات مدعومة وأذونات الموردين وترتيبات متفق عليها للأمن والبيانات.",
    ),
    exclusions: text(
      "We do not promise compatibility with every clinical system. Clinical decisions remain with your care team; organizational changes and vendor licenses must be agreed separately.",
      "لا نعد بالتوافق مع كل نظام طبي. تبقى القرارات الطبية مسؤولية فريق الرعاية لديكم، ويجب الاتفاق بصورة منفصلة على التغييرات التنظيمية وتراخيص الموردين.",
    ),
    measures: text(
      "Compare administrative steps, task completion, duplicate entry and follow-up reliability using agreed representative workflows. Measures depend on a usable baseline.",
      "نقارن خطوات الإدارة وإنجاز المهام وتكرار الإدخال وانتظام المتابعة باستخدام إجراءات تمثيلية متفق عليها. يعتمد القياس على توفر خط أساس مناسب.",
    ),
    after: text(
      "Documentation, staff training and named system ownership support adoption. Monitoring, maintenance and further improvements are agreed in the support scope.",
      "تساعد الوثائق وتدريب الموظفين وتحديد مسؤول النظام على اعتماد الأدوات. تُحدد المراقبة والصيانة والتحسينات اللاحقة ضمن نطاق الدعم.",
    ),
  },
  {
    id: "platform-launch",
    audience: "digital-health",
    title: text("Launch a health platform", "أطلق منصة صحية"),
    problem: text(
      "Turn an opportunity into a focused, usable first release.",
      "حوّل فرصة إلى إصدار أول واضح وعملي.",
    ),
    fit: text(
      "You are building a new digital health or healthcare education product and need a delivery partner from discovery to launch.",
      "تعمل على منتج جديد للصحة الرقمية أو التعليم الصحي وتحتاج إلى شريك تنفيذ من فهم الاحتياجات حتى الإطلاق.",
    ),
    outputs: [
      text(
        "Discovery, user journeys and a defined first-release scope",
        "فهم الاحتياجات ورحلات المستخدم ونطاق محدد للإصدار الأول",
      ),
      text("Product design and platform implementation", "تصميم المنتج وتنفيذ المنصة"),
      text("Agreed integrations, testing and deployment", "تكاملات متفق عليها واختبارات ونشر"),
      text("Ownership, technical documentation and handover", "ملكية واضحة ووثائق تقنية وتسليم"),
    ],
    dependencies: text(
      "You define the business model, intended users and clinical responsibilities. We need a product decision-maker, content and relevant vendor access; sensitive-data arrangements must be agreed before implementation.",
      "تحدد نموذج العمل والمستخدمين المقصودين والمسؤوليات الطبية. نحتاج إلى صاحب قرار للمنتج ومحتوى وإمكانية الوصول إلى الموردين المعنيين، مع الاتفاق على ترتيبات البيانات الحساسة قبل التنفيذ.",
    ),
    exclusions: text(
      "Launching software does not establish clinical efficacy or regulatory approval. Clinical AI requires separate assessment of intended use, oversight, evaluation and applicable requirements before claims and scope are agreed.",
      "لا يثبت إطلاق البرمجيات فعاليتها الطبية ولا يمنحها موافقة تنظيمية. يتطلب الذكاء الاصطناعي الطبي تقييمًا منفصلًا للاستخدام المقصود والإشراف والتقييم والمتطلبات المطبقة قبل الاتفاق على الادعاءات والنطاق.",
    ),
    measures: text(
      "Evaluate agreed user journeys, task completion, release readiness, performance and availability targets. Commercial adoption and clinical outcomes are not guaranteed.",
      "نقيّم رحلات المستخدم المتفق عليها وإنجاز المهام وجاهزية الإصدار وأهداف الأداء والتوافر. لا نضمن الإقبال التجاري أو النتائج الطبية.",
    ),
    after: text(
      "Your team receives agreed ownership, documentation and training. Contracted support and a prioritized product roadmap can continue after launch.",
      "يتلقى فريقك الملكية والوثائق والتدريب المتفق عليها. يمكن مواصلة الدعم بموجب عقد وخارطة تطوير مرتبة حسب الأولوية بعد الإطلاق.",
    ),
  },
  {
    id: "platform-improvement",
    audience: "digital-health",
    title: text("Improve an existing platform", "طوّر منصتك الحالية"),
    problem: text(
      "Address usability, integration, performance or reliability problems in a live product.",
      "عالج مشكلات الاستخدام أو التكامل أو الأداء أو الموثوقية في منتج قائم.",
    ),
    fit: text(
      "You already run a platform and need a clear diagnosis, a practical improvement plan and verified delivery.",
      "تدير منصة بالفعل وتحتاج إلى تشخيص واضح وخطة تحسين عملية وتنفيذ يتم التحقق منه.",
    ),
    outputs: [
      text(
        "Product and technical assessment grounded in observed problems",
        "تقييم للمنتج والجوانب التقنية يستند إلى المشكلات المرصودة",
      ),
      text(
        "Prioritized improvements with dependencies and acceptance criteria",
        "تحسينات مرتبة حسب الأولوية مع متطلباتها ومعايير قبولها",
      ),
      text("Targeted design, integration and engineering work", "أعمال تصميم وتكامل وهندسة موجهة"),
      text(
        "Regression checks, release planning and measurable verification",
        "فحوص لمنع تراجع الوظائف وتخطيط للإصدار وتحقق قابل للقياس",
      ),
    ],
    dependencies: text(
      "Access to authorized code, environments and operational evidence is essential. We agree release access, system ownership and vendor constraints before changes.",
      "يلزم الوصول المصرح به إلى الشفرة والبيئات والأدلة التشغيلية. نتفق على صلاحيات النشر وملكية الأنظمة وقيود الموردين قبل التغيير.",
    ),
    exclusions: text(
      "An assessment may reveal work outside the initial scope. We do not promise a complete rebuild or a guaranteed performance gain before investigation.",
      "قد يكشف التقييم عن أعمال تتجاوز النطاق الأولي. لا نعد بإعادة بناء كاملة أو تحسن مضمون في الأداء قبل التحقيق.",
    ),
    measures: text(
      "Use reproducible task checks, error rates, response times and availability where evidence supports a baseline. Agree improvement targets before delivery.",
      "نستخدم فحوص مهام قابلة للتكرار ومعدلات الأخطاء وأزمنة الاستجابة والتوافر عندما تدعم الأدلة خط أساس. نتفق على أهداف التحسين قبل التنفيذ.",
    ),
    after: text(
      "A documented release and rollback approach, ownership handover and optional contracted monitoring help sustain improvements.",
      "يساعد توثيق الإصدار وخطة الرجوع وتسليم المسؤوليات والمراقبة الاختيارية بموجب عقد على استدامة التحسينات.",
    ),
  },
];
export const projects = [
  {
    id: "oet-with-dr-hesham",
    name: text("OET with Dr Hesham", "OET مع الدكتور هشام"),
    category: text("Healthcare education platform", "منصة تعليم صحي"),
    url: "https://oetwithdrhesham.co.uk/",
    context: text(
      "A digital learning platform serving healthcare professionals preparing for the Occupational English Test.",
      "منصة تعلم رقمية تخدم العاملين في الرعاية الصحية الذين يستعدون لاختبار اللغة الإنجليزية المهني OET.",
    ),
    problem: text(
      "An education service needs a coherent digital platform through which learners can understand the offer and access learning. ProHealth’s role was full-platform delivery. The public website also identifies its relationship with ProHealth.",
      "تحتاج الخدمة التعليمية إلى منصة رقمية مترابطة تساعد المتعلمين على فهم العرض والوصول إلى التعلم. تمثلت مساهمة ProHealth في تنفيذ المنصة بالكامل. ويوضح الموقع العام أيضًا علاقته مع ProHealth.",
    ),
  },
  {
    id: "mediq",
    name: text("MedIQ", "MedIQ"),
    category: text("Digital health platform", "منصة صحة رقمية"),
    url: "https://mediq.com.pk/",
    context: text(
      "A digital health service connecting people and healthcare services.",
      "خدمة صحة رقمية تربط الأشخاص بالخدمات الصحية.",
    ),
    problem: text(
      "Digital health delivery requires a consistent service journey across a platform. ProHealth’s contribution was full-platform delivery. Specific technical modules, dates and measured outcomes are not published without supporting material.",
      "يتطلب تقديم الخدمات الصحية الرقمية رحلة متسقة عبر المنصة. تمثلت مساهمة ProHealth في تنفيذ المنصة بالكامل. لا ننشر تفاصيل الوحدات التقنية أو التواريخ أو النتائج المقاسة دون مواد داعمة.",
    ),
  },
  {
    id: "marham",
    name: text("Marham", "Marham"),
    category: text("Healthcare access platform", "منصة للوصول إلى الرعاية الصحية"),
    url: "https://www.marham.pk/",
    context: text(
      "A healthcare platform helping people find and access healthcare services.",
      "منصة صحية تساعد الأشخاص على العثور على خدمات الرعاية الصحية والوصول إليها.",
    ),
    problem: text(
      "Healthcare access depends on clear information and connected digital journeys. ProHealth’s contribution was full-platform delivery. This summary does not attribute the platform’s public user counts or outcomes to our work.",
      "يعتمد الوصول إلى الرعاية على وضوح المعلومات وترابط الرحلات الرقمية. تمثلت مساهمة ProHealth في تنفيذ المنصة بالكامل. لا ينسب هذا الملخص أعداد مستخدمي المنصة أو نتائجها المنشورة إلى عملنا.",
    ),
  },
];
export const stages = [
  {
    id: "discovery",
    label: text("Free discovery", "فهم الاحتياجات مجانًا"),
    body: text(
      "Understand your users, current problems and priorities. Identify what needs further investigation.",
      "نفهم المستخدمين والمشكلات الحالية والأولويات، ونحدد ما يحتاج إلى دراسة أعمق.",
    ),
  },
  {
    id: "proposal",
    label: text("Scoped proposal", "عرض محدد النطاق"),
    body: text(
      "Agree outputs, exclusions, dependencies, responsibilities, milestones and acceptance measures. Quotation is project-specific.",
      "نتفق على المخرجات والاستثناءات والمتطلبات والمسؤوليات والمراحل ومعايير القبول. يُحدد السعر وفق المشروع.",
    ),
  },
  {
    id: "delivery",
    label: text("Visible delivery", "تنفيذ قابل للمتابعة"),
    body: text(
      "Review progress at agreed milestones, test with representative users and resolve issues before acceptance.",
      "نراجع التقدم في المراحل المتفق عليها، ونختبر مع مستخدمين تمثيليين، ونعالج المشكلات قبل القبول.",
    ),
  },
  {
    id: "handover",
    label: text("Ownership and support", "الملكية والدعم"),
    body: text(
      "Document the delivered system, train your team and hand over agreed ownership. Contract ongoing support and improvements as needed.",
      "نوثق النظام، وندرب فريقك، ونسلم الملكية المتفق عليها. يُتعاقد على الدعم والتحسين المستمر حسب الحاجة.",
    ),
  },
];
export const faqs = [
  {
    q: text("Who do you work with?", "مع من تعملون؟"),
    a: text(
      "Healthcare providers, clinics and healthcare groups, and digital health companies. Healthcare education products fit our platform engagements. We deliver technology; our customers deliver care.",
      "نعمل مع مقدمي الرعاية والعيادات والمجموعات الصحية وشركات الصحة الرقمية. تدخل منتجات التعليم الصحي ضمن خدمات المنصات. نقدم التكنولوجيا، ويقدم عملاؤنا الرعاية.",
    ),
  },
  {
    q: text("How much does a project cost?", "كم تبلغ تكلفة المشروع؟"),
    a: text(
      "Discovery is free. We prepare a project-specific quotation based on agreed deliverables, dependencies and support needs. There are no fixed package prices.",
      "جلسة فهم الاحتياجات مجانية. نعد عرض سعر خاصًا بالمشروع بناءً على المخرجات والمتطلبات واحتياجات الدعم المتفق عليها. لا توجد أسعار ثابتة للباقات.",
    ),
  },
  {
    q: text("Can you connect our existing systems?", "هل يمكنكم ربط أنظمتنا الحالية؟"),
    a: text(
      "We assess supported interfaces, access permissions, vendor constraints and data arrangements first. Compatibility and integration scope are confirmed through discovery; not every system can be connected.",
      "نقيّم أولًا الواجهات المدعومة وصلاحيات الوصول وقيود الموردين وترتيبات البيانات. يُحدد التوافق ونطاق التكامل خلال فهم الاحتياجات؛ وقد لا يكون ربط كل نظام ممكنًا.",
    ),
  },
  {
    q: text("Can you work with organizations internationally?", "هل تعملون مع مؤسسات دوليًا؟"),
    a: text(
      "Yes. We agree working hours, communication language, review schedules and responsibilities for each engagement. This website is available in English and Arabic; support language is agreed separately.",
      "نعم. نتفق لكل مشروع على ساعات العمل ولغة التواصل ومواعيد المراجعة والمسؤوليات. يتوفر هذا الموقع بالإنجليزية والعربية، وتُحدد لغة الدعم بصورة منفصلة.",
    ),
  },
  {
    q: text("What does 24/7 support include?", "ماذا يشمل الدعم على مدار الساعة؟"),
    a: text(
      "Coverage is contractual. Your support terms specify channels, incident severity, response targets and escalation, along with the systems covered. We do not promise an instant response to every request.",
      "التغطية تعاقدية. تحدد شروط الدعم القنوات وتصنيف الحوادث وأهداف الاستجابة والتصعيد والأنظمة المشمولة. لا نعد باستجابة فورية لكل طلب.",
    ),
  },
  {
    q: text("Do you build clinical AI?", "هل تطورون الذكاء الاصطناعي الطبي؟"),
    a: text(
      "It can be a specialist part of a platform engagement. Intended use, clinical oversight, evaluation, sensitive-data handling and applicable requirements must be assessed before scope or claims are agreed. We do not provide medical advice or claim certified diagnostics.",
      "يمكن أن يكون قدرة متخصصة ضمن مشروع منصة. يجب تقييم الاستخدام المقصود والإشراف الطبي والتقييم والتعامل مع البيانات الحساسة والمتطلبات المطبقة قبل الاتفاق على النطاق أو الادعاءات. لا نقدم نصائح طبية ولا ندعي تقديم تشخيصات معتمدة.",
    ),
  },
  {
    q: text("What should I share to get started?", "ماذا أشارك للبدء؟"),
    a: text(
      "Tell us your organization, who you serve, your current stage and the problem you want to solve. Technical specifications and a confirmed budget are not required. Do not send patient records or identifying health information.",
      "أخبرنا عن مؤسستك ومن تخدم ومرحلتك الحالية والمشكلة التي ترغب في حلها. لا يلزم تقديم مواصفات تقنية أو ميزانية مؤكدة. لا ترسل سجلات مرضى أو معلومات صحية تكشف هويتهم.",
    ),
  },
];
export const policies: Record<
  string,
  { title: Localized; sections: { title: Localized; body: Localized }[] }
> = {
  privacy: {
    title: text("Privacy policy", "سياسة الخصوصية"),
    sections: [
      {
        title: text("Business inquiry information", "معلومات الاستفسارات التجارية"),
        body: text(
          "When you submit an inquiry, we use your name, work email, organization, country/time zone, project selections, preferred language and brief to assess and respond to your request. Optional budget information is used only to understand scope. Do not submit patient-identifying information or medical histories.",
          "عند إرسال استفسار، نستخدم الاسم والبريد المهني والمؤسسة والدولة والمنطقة الزمنية واختيارات المشروع واللغة المفضلة والوصف لتقييم الطلب والرد عليه. تستخدم معلومات الميزانية الاختيارية لفهم النطاق فقط. لا ترسل معلومات تكشف هوية المرضى أو تاريخهم الطبي.",
        ),
      },
      {
        title: text("Delivery and operational records", "الإرسال والسجلات التشغيلية"),
        body: text(
          "Inquiries are sent by authenticated email to sales@prohealthdigitalllc.com and processed by our mail provider. This website has no inquiry database or CRM. Server and proxy logs can include IP addresses, request paths, timestamps and delivery status for security and operation; application delivery logs do not include your inquiry body. Messages remain in the business mailbox for responding and follow-up, and are reviewed for deletion when no longer needed, subject to contractual or legal obligations.",
          "تُرسل الاستفسارات عبر بريد موثق إلى sales@prohealthdigitalllc.com ويعالجها مزود البريد. لا يحتوي الموقع على قاعدة بيانات للاستفسارات أو نظام إدارة علاقات العملاء. قد تتضمن سجلات الخادم والوكيل عناوين IP ومسارات الطلبات وأوقاتها وحالة الإرسال لأغراض الأمن والتشغيل؛ ولا تتضمن سجلات الإرسال في التطبيق نص استفسارك. تبقى الرسائل في صندوق بريد الأعمال للرد والمتابعة، وتُراجع لحذفها عند انتفاء الحاجة، مع مراعاة الالتزامات التعاقدية أو القانونية.",
        ),
      },
      {
        title: text("Third parties and your choices", "الأطراف الأخرى وخياراتك"),
        body: text(
          "External project links take you to independently operated websites. Fonts are requested from Google Fonts, which receives connection information such as your IP address. We do not add advertising trackers or automated marketing emails. Contact sales@prohealthdigitalllc.com to ask about access, correction or deletion of your inquiry information. Sensitive data in customer projects is governed by separately agreed arrangements.",
          "تنقلك روابط المشاريع الخارجية إلى مواقع تديرها جهات مستقلة. تُطلب الخطوط من Google Fonts الذي يتلقى معلومات الاتصال مثل عنوان IP. لا نضيف أدوات تتبع إعلانية ولا رسائل تسويق آلية. راسل sales@prohealthdigitalllc.com للاستفسار عن الوصول إلى بيانات استفسارك أو تصحيحها أو حذفها. تخضع البيانات الحساسة في مشاريع العملاء لترتيبات منفصلة متفق عليها.",
        ),
      },
    ],
  },
  terms: {
    title: text("Website terms", "شروط استخدام الموقع"),
    sections: [
      {
        title: text("Purpose and service scope", "الغرض ونطاق الخدمة"),
        body: text(
          "ProHealth Digital LLC provides healthcare technology delivery services. This website describes possible engagements and invites business inquiries; it is not a patient-care service and does not provide medical advice. Published descriptions do not form a project contract or guarantee results.",
          "تقدم ProHealth Digital LLC خدمات تنفيذ التكنولوجيا الصحية. يصف الموقع خدمات محتملة ويستقبل استفسارات الأعمال؛ ولا يقدم رعاية للمرضى أو نصائح طبية. لا تشكل الأوصاف المنشورة عقد مشروع ولا ضمانًا للنتائج.",
        ),
      },
      {
        title: text("Project agreements", "اتفاقيات المشاريع"),
        body: text(
          "Deliverables, exclusions, price, timing, acceptance, ownership, customer responsibilities and support are established in a separately agreed proposal and contract. Clinical or regulatory responsibilities must be allocated explicitly. Free discovery does not commit either party to a project.",
          "تُحدد المخرجات والاستثناءات والسعر والمدة والقبول والملكية ومسؤوليات العميل والدعم ضمن عرض وعقد منفصلين متفق عليهما. يجب تحديد المسؤوليات الطبية والتنظيمية بوضوح. لا تُلزم جلسة فهم الاحتياجات المجانية أي طرف بمشروع.",
        ),
      },
      {
        title: text("Appropriate use", "الاستخدام المناسب"),
        body: text(
          "Do not misuse the inquiry endpoint, submit unlawful material or send patient records. Links to external projects are provided for context; those websites have their own terms. Questions about these terms can be sent to sales@prohealthdigitalllc.com.",
          "لا تسيء استخدام نقطة إرسال الاستفسارات، ولا ترسل مواد غير قانونية أو سجلات مرضى. تُقدم روابط المشاريع الخارجية للتوضيح وتخضع تلك المواقع لشروطها الخاصة. يمكن إرسال الأسئلة عن هذه الشروط إلى sales@prohealthdigitalllc.com.",
        ),
      },
    ],
  },
  cookies: {
    title: text("Cookies and website technology", "ملفات تعريف الارتباط وتقنيات الموقع"),
    sections: [
      {
        title: text("No advertising tracking", "دون تتبع إعلاني"),
        body: text(
          "This release does not set advertising or analytics cookies. Language is selected through the page URL rather than a tracking preference. We do not use an advertising consent banner because these trackers are not installed.",
          "لا يضبط هذا الإصدار ملفات تعريف ارتباط إعلانية أو تحليلية. تُحدد اللغة من عنوان الصفحة بدلًا من تفضيل تتبع. لا نستخدم لافتة موافقة إعلانية لأن أدوات التتبع هذه غير مثبتة.",
        ),
      },
      {
        title: text("Connections and security", "الاتصالات والأمن"),
        body: text(
          "The browser loads the website, its assets and Google Fonts. Operational request logs and temporary server-side rate limits protect the inquiry form. External websites linked from our work pages may use their own cookies; consult their policies.",
          "يحمل المتصفح الموقع وموارده وخطوط Google Fonts. تحمي سجلات الطلبات التشغيلية وحدود الطلبات المؤقتة على الخادم نموذج الاستفسار. قد تستخدم المواقع الخارجية المرتبطة بصفحات الأعمال ملفاتها الخاصة؛ راجع سياساتها.",
        ),
      },
    ],
  },
  refunds: {
    title: text("Cancellation and refunds", "الإلغاء والاسترداد"),
    sections: [
      {
        title: text("Agreed per engagement", "حسب اتفاق المشروع"),
        body: text(
          "There is no checkout or sale of digital toolkits on this website. Discovery is free. Cancellation, milestone payments and any refund entitlement for paid services are defined in the signed engagement agreement and applicable requirements. Contact sales@prohealthdigitalllc.com about an existing engagement.",
          "لا توجد عملية دفع أو بيع أدوات رقمية في هذا الموقع. جلسة فهم الاحتياجات مجانية. يُحدد الإلغاء ودفعات المراحل وأي استحقاق لاسترداد المدفوعات في اتفاق المشروع الموقع والمتطلبات المطبقة. راسل sales@prohealthdigitalllc.com بشأن أي مشروع قائم.",
        ),
      },
    ],
  },
  delivery: {
    title: text("Delivery and support", "التنفيذ والدعم"),
    sections: [
      {
        title: text("Milestones, acceptance and handover", "المراحل والقبول والتسليم"),
        body: text(
          "Each proposal defines outputs, dependencies, customer review responsibilities, milestones and acceptance checks. Timing depends on the agreed scope and availability of access, content and approvals. Ownership, documentation and training are agreed before handover. Ongoing and 24/7 support require agreed contractual coverage, response targets and escalation. No universal delivery deadline or instant support response is promised.",
          "يحدد كل عرض المخرجات والمتطلبات ومسؤوليات مراجعة العميل والمراحل وفحوص القبول. تعتمد المدة على النطاق المتفق عليه وتوفر الوصول والمحتوى والاعتمادات. تُحدد الملكية والوثائق والتدريب قبل التسليم. يتطلب الدعم المستمر والدعم على مدار الساعة تغطية تعاقدية وأهداف استجابة وتصعيدًا متفقًا عليها. لا نعد بموعد تنفيذ موحد أو استجابة دعم فورية.",
        ),
      },
    ],
  },
};
export const publicPaths = [
  "/",
  "/solutions",
  ...engagements.map((e) => `/solutions/${e.id}`),
  "/work",
  ...projects.map((p) => `/work/${p.id}`),
  "/how-we-work",
  "/about",
  "/contact",
  "/faq",
  ...Object.keys(policies).map((p) => `/${p}`),
];
