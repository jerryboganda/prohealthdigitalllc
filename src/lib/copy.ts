import { text } from "./content.ts";

/** Site chrome and page-level copy. Every value is an EN/AR pair (checked by tests). */
export const nav = {
  solutions: text("Solutions", "الحلول"),
  work: text("Our Work", "أعمالنا"),
  process: text("How We Work", "كيف نعمل"),
  insights: text("Insights", "رؤى ومقالات"),
  about: text("About", "عن الشركة"),
  resources: text("Resources", "الموارد"),
  glossary: text("Glossary", "مسرد المصطلحات"),
  faq: text("FAQ", "الأسئلة الشائعة"),
  contact: text("Contact", "تواصل معنا"),
  main: text("Main navigation", "التنقل الرئيسي"),
  mobile: text("Menu", "القائمة"),
  openMenu: text("Open menu", "فتح القائمة"),
  closeMenu: text("Close menu", "إغلاق القائمة"),
  languageName: text("English", "العربية"),
  breadcrumbs: text("Breadcrumb", "مسار التنقل"),
  home: text("Home", "الرئيسية"),
};

export const footer = {
  tagline: text(
    "Healthcare technology delivery, from discovery to ongoing support.",
    "تنفيذ التكنولوجيا الصحية، من فهم الاحتياجات إلى الدعم المستمر.",
  ),
  disclaimer: text(
    "Technology delivery. Clinical care remains with your organization.",
    "تنفيذ التكنولوجيا. تبقى الرعاية الطبية مسؤولية مؤسستك.",
  ),
  company: text("Company", "الشركة"),
  knowledge: text("Knowledge", "المعرفة"),
  policies: text("Policies", "السياسات"),
  otherPolicies: text("Other policies", "سياسات أخرى"),
  footerNav: text("Footer navigation", "التنقل في تذييل الصفحة"),
  ready: text("Have a healthcare service to improve?", "لديك خدمة صحية تريد تطويرها؟"),
  markets: text(
    "Serving healthcare organizations across the GCC and South Asia, in English and Arabic.",
    "نخدم المؤسسات الصحية في دول الخليج وجنوب آسيا، بالعربية والإنجليزية.",
  ),
};

export const common = {
  viewProject: text("View project", "عرض المشروع"),
  readMore: text("Read more", "اقرأ المزيد"),
  readArticle: text("Read the article", "اقرأ المقال"),
  openResource: text("Open the resource", "افتح المورد"),
  minutes: text("min read", "دقائق للقراءة"),
  updated: text("Updated", "آخر تحديث"),
  published: text("Published", "تاريخ النشر"),
  onThisPage: text("On this page", "في هذه الصفحة"),
  keyPoints: text("Key points", "أبرز النقاط"),
  related: text("Related engagements", "خدمات ذات صلة"),
  relatedReading: text("Related reading", "قراءات ذات صلة"),
  allInsights: text("All insights", "كل المقالات"),
  allResources: text("All resources", "كل الموارد"),
  whatsapp: text("Chat on WhatsApp", "تواصل عبر واتساب"),
  emailUs: text("Email us", "راسلنا"),
  external: text("(opens in a new tab)", "(يفتح في علامة تبويب جديدة)"),
  forProviders: text("For healthcare providers", "لمقدمي الرعاية الصحية"),
  forCompanies: text("For digital health companies", "لشركات الصحة الرقمية"),
  forBoth: text("For providers and digital health teams", "لمقدمي الرعاية وفرق الصحة الرقمية"),
  checklist: text("Checklist", "قائمة تحقق"),
  guide: text("Guide", "دليل"),
  notLegalAdvice: text(
    "General information only, not legal or regulatory advice. Confirm requirements with qualified counsel for your jurisdiction.",
    "معلومات عامة فقط، وليست استشارة قانونية أو تنظيمية. تحقق من المتطلبات مع مستشار مؤهل في نطاق اختصاصك.",
  ),
};

export const home = {
  eyebrow: text("Healthcare technology delivery partner", "شريكك في تنفيذ التكنولوجيا الصحية"),
  titleA: text("Build", "نبني"),
  titleEm: text("better", "خدمات صحية"),
  titleB: text("digital healthcare services.", "رقمية أفضل."),
  secondaryCta: text("Find your starting point", "حدد نقطة البداية"),
  note: text(
    "Free discovery · Scoped proposals · Agreed ownership",
    "فهم الاحتياجات مجانًا · عروض محددة النطاق · ملكية متفق عليها",
  ),
  journeyLabel: text(
    "From patient access to connected operations and dependable platforms",
    "من وصول المرضى إلى تشغيل مترابط ومنصات موثوقة",
  ),
  journeyTitle: text("A connected service journey", "رحلة خدمة مترابطة"),
  access: text("Access", "الوصول"),
  accessBody: text(
    "Find services. Take the next step.",
    "العثور على الخدمات واتخاذ الخطوة التالية.",
  ),
  operations: text("Operations", "التشغيل"),
  operationsBody: text("Connect tasks, people and systems.", "ربط المهام والأشخاص والأنظمة."),
  platform: text("Platform", "المنصة"),
  platformBody: text("Deliver, evaluate and improve.", "التنفيذ والتقييم والتحسين."),
  journeyCaption: text(
    "An illustration of our delivery approach, not a customer dashboard.",
    "رسم توضيحي لمنهج التنفيذ، وليس لوحة بيانات عميل.",
  ),
  marquee: [
    text("Patient access", "وصول المرضى"),
    text("Care workflows", "إجراءات الرعاية"),
    text("Platform launch", "إطلاق المنصات"),
    text("Platform improvement", "تطوير المنصات"),
    text("English & Arabic journeys", "رحلات بالعربية والإنجليزية"),
    text("Documented handover", "تسليم موثق"),
    text("Contracted 24/7 support", "دعم تعاقدي على مدار الساعة"),
  ],
  marqueePause: text("Pause scrolling", "إيقاف الحركة"),
  audienceTitle: text(
    "Two kinds of teams. One delivery standard.",
    "نوعان من الفرق. معيار تنفيذ واحد.",
  ),
  exploreProviders: text("Explore provider solutions", "استكشف حلول مقدمي الرعاية"),
  exploreCompanies: text("Explore platform solutions", "استكشف حلول المنصات"),
  problemTitle: text("Choose the problem you want to solve", "اختر المشكلة التي تريد حلها"),
  problemBody: text(
    "Start where your organization is today. We clarify the scope together.",
    "ابدأ من واقع مؤسستك اليوم. نوضح النطاق معًا.",
  ),
  workTitle: text("Relevant platform delivery experience", "خبرة في تنفيذ منصات ذات صلة"),
  processTitle: text(
    "A clear scope. A visible path to delivery.",
    "نطاق واضح ومسار تنفيذ قابل للمتابعة.",
  ),
  processLink: text("Understand the process", "تعرف على خطوات العمل"),
  principlesTitle: text("What working with us feels like", "كيف يبدو العمل معنا"),
  principles: [
    {
      title: text("Scope before promises", "النطاق قبل الوعود"),
      body: text(
        "Deliverables, exclusions, dependencies and acceptance criteria are written down before delivery starts.",
        "تُكتب المخرجات والاستثناءات والمتطلبات ومعايير القبول قبل بدء التنفيذ.",
      ),
    },
    {
      title: text("Evidence at every milestone", "أدلة في كل مرحلة"),
      body: text(
        "You review working progress at agreed milestones, with representative users where access can be arranged.",
        "تراجع تقدمًا فعليًا في المراحل المتفق عليها، ومع مستخدمين تمثيليين متى أمكن ترتيب ذلك.",
      ),
    },
    {
      title: text("Bilingual by design", "ثنائي اللغة منذ التصميم"),
      body: text(
        "English and Arabic journeys are planned together, including right-to-left layouts.",
        "نخطط للرحلات بالعربية والإنجليزية معًا، بما في ذلك التخطيط من اليمين إلى اليسار.",
      ),
    },
    {
      title: text("Ownership you keep", "ملكية تبقى لديك"),
      body: text(
        "Documentation, training and agreed ownership mean your team can run what we build.",
        "الوثائق والتدريب والملكية المتفق عليها تمكّن فريقك من تشغيل ما نبنيه.",
      ),
    },
  ],
  insightsTitle: text("Practical thinking for healthcare teams", "أفكار عملية لفرق الرعاية الصحية"),
  insightsBody: text(
    "Guides on patient access, workflows, platform delivery and bilingual health experiences.",
    "أدلة حول وصول المرضى وإجراءات العمل وتنفيذ المنصات والتجارب الصحية ثنائية اللغة.",
  ),
  faqTitle: text("Before we talk", "قبل أن نتحدث"),
};

export const pages = {
  solutionsTitle: text(
    "Start with your organization’s next challenge.",
    "ابدأ بالتحدي التالي لمؤسستك.",
  ),
  solutionsBody: text(
    "Four focused engagements, each built around a customer problem and an agreed outcome.",
    "أربع خدمات محددة، تتمحور كل منها حول مشكلة للعميل ونتيجة متفق عليها.",
  ),
  specialistTitle: text(
    "Specialist capabilities, within a defined engagement",
    "قدرات متخصصة ضمن نطاق محدد",
  ),
  specialistBody: text(
    "Clinical AI can be a specialist part of a platform engagement. Intended use, clinical oversight, evaluation, sensitive-data handling and applicable requirements must be assessed before scope or claims are agreed. We do not provide medical advice or claim certified diagnostics.",
    "يمكن أن يكون الذكاء الاصطناعي الطبي قدرة متخصصة ضمن مشروع منصة. يجب تقييم الاستخدام المقصود والإشراف الطبي والتقييم والتعامل مع البيانات الحساسة والمتطلبات المطبقة قبل الاتفاق على النطاق أو الادعاءات. لا نقدم نصائح طبية ولا ندعي تقديم تشخيصات معتمدة.",
  ),
  nextStep: text("Define the right next step", "حدد الخطوة المناسبة التالية"),
  workTitle: text(
    "Platforms delivered for healthcare and learning.",
    "منصات للرعاية الصحية والتعلم.",
  ),
  diagramLabel: text(
    "Service context, platform delivery, user journey",
    "سياق الخدمة، تنفيذ المنصة، رحلة المستخدم",
  ),
  serviceContext: text("Service context", "سياق الخدمة"),
  userJourney: text("User journey", "رحلة المستخدم"),
  diagramNote: text(
    "Explanatory diagram; no third-party interface reproduced.",
    "رسم توضيحي؛ لا يعرض واجهات أطراف أخرى.",
  ),
  contribution: text("Our contribution", "مساهمتنا"),
  visitSite: text("Visit the public website", "زيارة الموقع العام"),
  processTitle: text(
    "From a real problem to an agreed delivery.",
    "من مشكلة حقيقية إلى تنفيذ متفق عليه.",
  ),
  proposalTitle: text("What your proposal makes clear", "ما الذي يوضحه عرض المشروع؟"),
  proposalItems: [
    text("The customer problem and people affected", "مشكلة العميل والأشخاص المتأثرون"),
    text(
      "Deliverables, exclusions and customer responsibilities",
      "المخرجات والاستثناءات ومسؤوليات العميل",
    ),
    text("Existing systems, access and dependencies", "الأنظمة الحالية والوصول والمتطلبات"),
    text(
      "Milestones, acceptance criteria and evaluation measures",
      "المراحل ومعايير القبول ومقاييس التقييم",
    ),
    text("Ownership, documentation, training and handover", "الملكية والوثائق والتدريب والتسليم"),
    text(
      "Post-launch support, maintenance and improvement arrangements",
      "ترتيبات الدعم والصيانة والتحسين بعد الإطلاق",
    ),
  ],
  aboutTitle: text(
    "A delivery partner for better digital healthcare.",
    "شريك تنفيذ لخدمات صحية رقمية أفضل.",
  ),
  aboutBodyA: text(
    "We work with healthcare providers and digital health companies on websites, operational workflows and platforms. Our role is to translate a defined need into technology your organization can use, own and maintain.",
    "نعمل مع مقدمي الرعاية وشركات الصحة الرقمية على المواقع وإجراءات العمل والمنصات. دورنا تحويل احتياج محدد إلى تكنولوجيا يمكن لمؤسستك استخدامها وامتلاكها وصيانتها.",
  ),
  aboutBodyB: text(
    "International delivery starts with clear responsibilities, agreed communication and context-specific requirements. We establish the appropriate team and support scope in each proposal.",
    "يبدأ التنفيذ الدولي بمسؤوليات واضحة وتواصل متفق عليه ومتطلبات تناسب السياق. نحدد الفريق المناسب ونطاق الدعم في كل عرض.",
  ),
  expectTitle: text("What you can expect", "ما الذي يمكنك توقعه؟"),
  expectA: text(
    "Clear scope, visible milestone reviews, evidence-based acceptance and documented handover. We discuss limitations and dependencies before promising delivery.",
    "نطاق واضح ومراجعات مراحل قابلة للمتابعة وقبول مستند إلى الأدلة وتسليم موثق. نناقش الحدود والمتطلبات قبل تقديم وعود التنفيذ.",
  ),
  expectB: text(
    "We build technology. Your organization retains responsibility for clinical decisions and the care it provides.",
    "نبني التكنولوجيا. تحتفظ مؤسستك بالمسؤولية عن القرارات الطبية والرعاية التي تقدمها.",
  ),
  relevantWork: text("Relevant work", "أعمال ذات صلة"),
  contactAsideTitle: text("A simple starting point", "نقطة بداية بسيطة"),
  contactAsideA: text(
    "Share the problem in your own words. We will review your inquiry, clarify fit and arrange discovery through the agreed contact channel.",
    "صف المشكلة بكلماتك. سنراجع استفسارك ونوضح ملاءمته ونرتب جلسة فهم الاحتياجات عبر قناة التواصل المتفق عليها.",
  ),
  contactAsideB: text(
    "Support for an existing engagement follows your contracted support channels.",
    "يتم دعم المشاريع القائمة عبر قنوات الدعم المحددة في العقد.",
  ),
  contactAsideC: text(
    "English and Arabic website journeys. Project communication language is agreed during discovery.",
    "الموقع متاح بالإنجليزية والعربية. تُحدد لغة التواصل في المشروع خلال فهم الاحتياجات.",
  ),
  faqTitle: text("Questions before starting a project", "أسئلة قبل بدء المشروع"),
  faqBody: text(
    "Scope, pricing, integrations, international delivery and support explained.",
    "توضيح النطاق والأسعار والتكامل والتنفيذ الدولي والدعم.",
  ),
  policyBody: text(
    "For the ProHealth Digital LLC business website.",
    "خاص بموقع الأعمال لشركة ProHealth Digital LLC.",
  ),
  notFoundTitle: text("Page not found", "الصفحة غير موجودة"),
  notFoundBody: text(
    "The page you are looking for does not exist or has moved.",
    "الصفحة التي تبحث عنها غير موجودة أو نُقلت.",
  ),
  goHome: text("Go home", "العودة إلى الرئيسية"),
  errorTitle: text("This page did not load", "تعذر تحميل الصفحة"),
  errorBody: text(
    "Please retry or return to the homepage.",
    "يرجى المحاولة مجددًا أو العودة إلى الصفحة الرئيسية.",
  ),
};
