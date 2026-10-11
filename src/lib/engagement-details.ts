import { text } from "./content.ts";
import type { Localized } from "./content.ts";

export interface EngagementDetails {
  phasesTitle: Localized;
  phases: { title: Localized; body: Localized }[];
  faqs: { q: Localized; a: Localized }[];
}

const phasesTitle = text("How this engagement typically runs", "كيف تسير هذه الخدمة عادةً");

export const engagementDetails: Record<
  "digital-presence" | "care-workflows" | "platform-launch" | "platform-improvement",
  EngagementDetails
> = {
  "digital-presence": {
    phasesTitle,
    phases: [
      {
        title: text("Understand how patients find you", "فهم طريقة وصول المرضى إليك"),
        body: text(
          "In a free discovery conversation we review your current website, the services you want patients to find and the questions they ask before they call or book.",
          "في جلسة مجانية لفهم الاحتياجات، نراجع موقعك الحالي والخدمات التي تريد أن يجدها المرضى، والأسئلة التي يطرحونها قبل الاتصال أو الحجز.",
        ),
      },
      {
        title: text(
          "Agree structure, content roles and booking handoff",
          "الاتفاق على البنية وأدوار المحتوى ومسار الحجز",
        ),
        body: text(
          "The proposal records the site structure, who supplies and approves each type of content, how inquiries or booking handoff will work, and the checks used for acceptance.",
          "يحدد العرض بنية الموقع، ومن يوفر كل نوع من المحتوى ومن يعتمده، وآلية الاستفسار أو الانتقال إلى الحجز، والفحوص المعتمدة للقبول.",
        ),
      },
      {
        title: text(
          "Design and build in reviewable stages",
          "التصميم والتنفيذ على مراحل قابلة للمراجعة",
        ),
        body: text(
          "You review page structure, designs and working pages on real devices at agreed milestones. Your nominated reviewer approves service and medical information before it is published.",
          "تراجع بنية الصفحات والتصاميم والصفحات العاملة على أجهزة فعلية في المراحل المتفق عليها، ويعتمد المسؤول عن المراجعة لديك معلومات الخدمات والمحتوى الطبي قبل نشرها.",
        ),
      },
      {
        title: text("Check before launch", "الفحص قبل الإطلاق"),
        body: text(
          "We test mobile layouts, keyboard access, forms, inquiry delivery, links and redirects from existing pages, and both language versions where they are in scope.",
          "نختبر العرض على الهاتف، والتنقل باستخدام لوحة المفاتيح، والنماذج، ووصول الاستفسارات، والروابط، وإعادة التوجيه من الصفحات الحالية، ونسختي اللغتين عندما تكونان ضمن النطاق.",
        ),
      },
      {
        title: text(
          "Hand over editing and agree support",
          "تسليم أدوات التحرير والاتفاق على الدعم",
        ),
        body: text(
          "Your team receives editing access, content guidance and documentation. Maintenance and support continue on terms agreed for the launched website.",
          "يتسلم فريقك صلاحيات التحرير وإرشادات المحتوى والوثائق، وتستمر الصيانة والدعم وفق الشروط المتفق عليها للموقع بعد إطلاقه.",
        ),
      },
    ],
    faqs: [
      {
        q: text(
          "Can the website take online bookings?",
          "هل يمكن أن يستقبل الموقع الحجوزات عبر الإنترنت؟",
        ),
        a: text(
          "We can hand patients over to the booking system you already use, or route inquiries to your team. Connections depend on the vendor's supported interfaces and permissions; a new booking platform is a separate scope.",
          "يمكننا توجيه المرضى إلى نظام الحجز الذي تستخدمه حاليًا، أو تحويل الاستفسارات إلى فريقك. ويعتمد الربط على الواجهات التي يدعمها المورد وأذوناته، أما إنشاء منصة حجز جديدة فيتطلب نطاقًا منفصلًا.",
        ),
      },
      {
        q: text("Who writes and approves medical content?", "من يكتب المحتوى الطبي ويعتمده؟"),
        a: text(
          "We structure pages, provide writing guidance and edit for clarity. Your clinical team supplies and approves all medical information, service descriptions and provider details before publication.",
          "ننظم الصفحات ونقدم إرشادات الكتابة ونحرر النصوص لتكون أوضح، أما المعلومات الطبية وأوصاف الخدمات وتفاصيل مقدمي الرعاية فيوفرها فريقك الطبي ويعتمدها قبل النشر.",
        ),
      },
      {
        q: text(
          "Can the website be in Arabic and English?",
          "هل يمكن أن يكون الموقع بالعربية والإنجليزية؟",
        ),
        a: text(
          "Yes, when both languages are in scope. We plan navigation and content structure for both languages, and the right-to-left Arabic layout, from the start, and the proposal sets out who translates and who reviews each language.",
          "نعم، عندما تكون اللغتان ضمن النطاق. نخطط منذ البداية للتنقل وبنية المحتوى في اللغتين، ولتخطيط الصفحات العربية من اليمين إلى اليسار، ويحدد العرض الجهة المسؤولة عن الترجمة ومراجعة كل لغة.",
        ),
      },
      {
        q: text(
          "Will a new website increase our bookings?",
          "هل سيزيد الموقع الجديد عدد الحجوزات؟",
        ),
        a: text(
          "We cannot promise that. We design for clearer service information and a simpler path to inquiry or booking, and where you have a baseline we review findability and completion after launch.",
          "لا يمكننا ضمان ذلك. نصمم الموقع ليقدم معلومات أوضح عن الخدمات ومسارًا أبسط للاستفسار أو الحجز، وعند توفر خط أساس نراجع بعد الإطلاق سهولة العثور على الخدمات وإتمام الاستفسارات والحجوزات.",
        ),
      },
    ],
  },
  "care-workflows": {
    phasesTitle,
    phases: [
      {
        title: text("Map the current workflow", "رسم خريطة إجراءات العمل الحالية"),
        body: text(
          "In free discovery we speak with workflow owners about where staff re-enter data, chase tasks or lose track of follow-ups, and which systems are involved.",
          "خلال جلسة فهم الاحتياجات المجانية، نتحدث مع مسؤولي الإجراءات عن المواضع التي يعيد فيها الموظفون إدخال البيانات، أو يلاحقون فيها المهام، أو تفوتهم فيها المتابعة، وعن الأنظمة المعنية.",
        ),
      },
      {
        title: text("Confirm what can be connected", "التحقق مما يمكن ربطه"),
        body: text(
          "Before the proposal we check available interfaces, vendor permissions and data arrangements. The proposal then sets a prioritized scope, responsibilities and acceptance criteria.",
          "قبل إعداد العرض، نتحقق من الواجهات المتاحة وأذونات الموردين وترتيبات البيانات، ثم يحدد العرض نطاقًا مرتبًا حسب الأولوية، والمسؤوليات، ومعايير القبول.",
        ),
      },
      {
        title: text(
          "Build and test with the people who use it",
          "التنفيذ والاختبار مع من سيستخدمون الأدوات",
        ),
        body: text(
          "We deliver staff-facing tools and agreed integrations in reviewable increments, testing in authorized environments with representative operational users.",
          "ننفذ أدوات الموظفين والتكاملات المتفق عليها على دفعات قابلة للمراجعة، ونختبرها في بيئات مصرح بها مع مستخدمين تشغيليين يمثلون فرق العمل.",
        ),
      },
      {
        title: text("Roll out with training", "بدء التشغيل مع التدريب"),
        body: text(
          "We plan go-live with your team, train the staff who will use the workflow and document what to do if a connected system is unavailable.",
          "نخطط لبدء التشغيل مع فريقك، وندرب الموظفين الذين سيعملون بالإجراء الجديد، ونوثق الخطوات البديلة عند تعذر الوصول إلى أحد الأنظمة المرتبطة.",
        ),
      },
      {
        title: text("Hand over ownership and agree support", "تسليم المسؤولية والاتفاق على الدعم"),
        body: text(
          "A named owner in your organization receives documentation and administrative access. Monitoring, maintenance and further improvements follow the agreed support scope.",
          "يتسلم مسؤول محدد في مؤسستك الوثائق وصلاحيات الإدارة، وتجري المراقبة والصيانة والتحسينات اللاحقة وفق نطاق الدعم المتفق عليه.",
        ),
      },
    ],
    faqs: [
      {
        q: text("Which systems can you integrate with?", "ما الأنظمة التي يمكنكم التكامل معها؟"),
        a: text(
          "It depends on what each system exposes and what its vendor permits. During discovery we confirm supported interfaces, such as APIs or HL7 FHIR where a system offers them, along with access permissions and data arrangements. Some systems cannot be connected.",
          "يعتمد ذلك على ما يتيحه كل نظام وما يسمح به مورده. نتحقق خلال فهم الاحتياجات من الواجهات المدعومة، مثل واجهات API أو HL7 FHIR عندما يوفرها النظام، ومن صلاحيات الوصول وترتيبات البيانات. وقد يتعذر ربط بعض الأنظمة.",
        ),
      },
      {
        q: text(
          "Will the new tools affect clinical decisions?",
          "هل تؤثر الأدوات الجديدة في القرارات الطبية؟",
        ),
        a: text(
          "They are not designed to. We build tools that help staff administer and coordinate work; the tools do not make clinical decisions. Clinical decisions, protocols and clinical content remain with your care team, which approves any workflow step that affects patient care.",
          "ليس هذا الغرض منها. نبني أدوات تساعد الموظفين على إدارة العمل وتنسيقه، ولا تتخذ هذه الأدوات قرارات طبية. وتبقى القرارات والبروتوكولات والمحتوى الطبي مسؤولية فريق الرعاية لديك، وهو من يعتمد أي خطوة في الإجراءات تؤثر في رعاية المرضى.",
        ),
      },
      {
        q: text(
          "Do we need to replace our existing systems?",
          "هل نحتاج إلى استبدال أنظمتنا الحالية؟",
        ),
        a: text(
          "Not necessarily. We start from the systems you already run and recommend replacing one only where discovery shows it cannot support the agreed workflow. Licensing changes are agreed separately with the vendor.",
          "ليس بالضرورة. ننطلق من الأنظمة التي تعمل بها اليوم، ولا نوصي باستبدال أي منها إلا إذا تبيّن خلال فهم الاحتياجات أنه لا يدعم الإجراء المتفق عليه. ويُتفق على أي تغيير في التراخيص مع المورد بصورة منفصلة.",
        ),
      },
      {
        q: text(
          "Will you use real patient data for testing?",
          "هل تستخدمون بيانات مرضى حقيقية في الاختبار؟",
        ),
        a: text(
          "We test in authorized environments with test or de-identified data wherever possible. Any use of live data follows security and data arrangements your organization approves in advance.",
          "نجري الاختبارات في بيئات مصرح بها، باستخدام بيانات اختبارية أو بيانات أُزيلت منها المعلومات المعرّفة كلما أمكن. ويخضع أي استخدام للبيانات الفعلية لترتيبات الأمن والبيانات التي تعتمدها مؤسستك مسبقًا.",
        ),
      },
    ],
  },
  "platform-launch": {
    phasesTitle,
    phases: [
      {
        title: text("Define the first release", "تحديد الإصدار الأول"),
        body: text(
          "Free discovery clarifies your intended users, the problem the product addresses and the business model you have set, then separates what the first release needs from what can wait.",
          "توضح جلسة فهم الاحتياجات المجانية المستخدمين المقصودين، والمشكلة التي يعالجها المنتج، ونموذج العمل الذي حددته، ثم تفصل ما يحتاجه الإصدار الأول عما يمكن تأجيله.",
        ),
      },
      {
        title: text(
          "Agree scope, responsibilities and data arrangements",
          "الاتفاق على النطاق والمسؤوليات وترتيبات البيانات",
        ),
        body: text(
          "The proposal records first-release scope, integrations, milestones and acceptance criteria. It also sets out sensitive-data arrangements and confirms that clinical and regulatory responsibilities remain with you.",
          "يحدد العرض نطاق الإصدار الأول والتكاملات والمراحل ومعايير القبول، كما يوضح ترتيبات البيانات الحساسة ويؤكد بقاء المسؤوليات الطبية والتنظيمية على عاتقك.",
        ),
      },
      {
        title: text("Design and validate core journeys", "تصميم الرحلات الأساسية والتحقق منها"),
        body: text(
          "We design the journeys the first release depends on and review them with you, and with representative users where you can arrange access, before full build begins.",
          "نصمم رحلات المستخدم التي يعتمد عليها الإصدار الأول ونراجعها معك، ومع مستخدمين يمثلون الفئات المستهدفة متى أمكنك ترتيب ذلك، قبل بدء التنفيذ الكامل.",
        ),
      },
      {
        title: text(
          "Build, integrate and test in increments",
          "التنفيذ والتكامل والاختبار على مراحل",
        ),
        body: text(
          "You see working software at agreed milestones. We test functionality, accessibility, performance and security controls against the acceptance criteria.",
          "تطّلع على نسخ عاملة من المنصة في المراحل المتفق عليها، ونختبر الوظائف وإمكانية الوصول والأداء وضوابط الأمن وفق معايير القبول.",
        ),
      },
      {
        title: text("Launch and hand over", "الإطلاق والتسليم"),
        body: text(
          "We support deployment and hand over agreed ownership, documentation and training. Contracted support and a prioritized roadmap can continue after launch.",
          "ندعم النشر ونسلم الملكية والوثائق والتدريب وفق ما اتُّفق عليه، ويمكن بعد الإطلاق مواصلة الدعم المتعاقد عليه والعمل وفق خارطة تطوير مرتبة حسب الأولوية.",
        ),
      },
    ],
    faqs: [
      {
        q: text(
          "Do we need a full specification before we start?",
          "هل نحتاج إلى مواصفات كاملة قبل البدء؟",
        ),
        a: text(
          "No. Discovery turns a defined opportunity into a first-release scope you can evaluate. You remain the decision-maker on product priorities and the business model.",
          "لا. تحوّل جلسة فهم الاحتياجات الفرصة الواضحة إلى نطاق للإصدار الأول يمكنك تقييمه، وتبقى صاحب القرار في أولويات المنتج ونموذج العمل.",
        ),
      },
      {
        q: text(
          "Can you help with regulatory approval?",
          "هل تساعدون في الحصول على الموافقات التنظيمية؟",
        ),
        a: text(
          "Regulatory strategy and any approvals are your responsibility, working with your own regulatory advisers. We build to the documented requirements you provide and supply technical documentation; launching software does not establish regulatory approval or clinical efficacy.",
          "تقع الاستراتيجية التنظيمية وأي موافقات مطلوبة ضمن مسؤوليتك بالتعاون مع مستشاريك التنظيميين. ننفذ المنصة وفق المتطلبات الموثقة التي تقدمها ونوفر الوثائق التقنية، علمًا بأن إطلاق البرمجيات لا يثبت فعاليتها الطبية ولا يمنحها موافقة تنظيمية.",
        ),
      },
      {
        q: text("Who owns the platform and its code?", "من يملك المنصة وشفرتها البرمجية؟"),
        a: text(
          "Ownership, licensing and repository access are set out in the proposal and contract, and transferred at handover as agreed. Third-party services remain subject to their own terms.",
          "تُحدد الملكية والتراخيص وصلاحيات الوصول إلى المستودع في العرض والعقد، وتُنقل عند التسليم وفق ما اتُّفق عليه. وتظل خدمات الأطراف الأخرى خاضعة لشروطها الخاصة.",
        ),
      },
      {
        q: text(
          "Can the first release include AI features?",
          "هل يمكن أن يتضمن الإصدار الأول ميزات قائمة على الذكاء الاصطناعي؟",
        ),
        a: text(
          "Possibly, as a specialist part of the scope. Clinical AI needs a separate assessment of intended use, clinical oversight, evaluation and applicable requirements before features or claims are agreed.",
          "قد يكون ذلك ممكنًا بوصفه جزءًا متخصصًا من النطاق. ويتطلب الذكاء الاصطناعي الطبي تقييمًا منفصلًا للاستخدام المقصود والإشراف الطبي والتقييم والمتطلبات المطبقة قبل الاتفاق على الميزات أو الادعاءات.",
        ),
      },
    ],
  },
  "platform-improvement": {
    phasesTitle,
    phases: [
      {
        title: text("Understand the problems you see", "فهم المشكلات التي تواجهها"),
        body: text(
          "In free discovery we review reported issues, user feedback and the operational evidence you can share to understand where the product is falling short.",
          "خلال جلسة فهم الاحتياجات المجانية، نراجع المشكلات المبلغ عنها وملاحظات المستخدمين والأدلة التشغيلية التي يمكنك مشاركتها، لنفهم مواضع القصور في المنتج.",
        ),
      },
      {
        title: text("Scope the assessment", "تحديد نطاق التقييم"),
        body: text(
          "The proposal sets what will be assessed, the access required and how findings will be reported. The assessment can be agreed as a first step before any improvement work is committed.",
          "يحدد العرض ما سيشمله التقييم والصلاحيات المطلوبة وطريقة عرض النتائج، ويمكن الاتفاق على التقييم خطوةً أولى قبل الالتزام بأي أعمال تحسين.",
        ),
      },
      {
        title: text("Diagnose and prioritize", "التشخيص وترتيب الأولويات"),
        body: text(
          "With authorized access to code, environments and monitoring, we identify root causes, establish a baseline where evidence allows and agree prioritized improvements with acceptance criteria.",
          "بعد الحصول على وصول مصرح به إلى الشفرة والبيئات وأدوات المراقبة، نحدد الأسباب الجذرية، ونضع خط أساس حيث تسمح الأدلة، ونتفق على تحسينات مرتبة حسب الأولوية مع معايير قبولها.",
        ),
      },
      {
        title: text("Deliver changes safely", "تنفيذ التغييرات بأمان"),
        body: text(
          "Improvements ship through agreed releases with regression checks and a rollback approach, and are then verified against the baseline.",
          "تُطرح التحسينات عبر إصدارات متفق عليها، مع فحوص لمنع تراجع الوظائف وخطة للرجوع، ثم نتحقق منها مقارنةً بخط الأساس.",
        ),
      },
      {
        title: text("Hand over and sustain", "التسليم والاستدامة"),
        body: text(
          "We document what changed and hand over ownership. Optional contracted monitoring and support help keep improvements in place.",
          "نوثق التغييرات ونسلم المسؤولية عنها، وتساعد المراقبة والدعم الاختياريان بموجب عقد على الحفاظ على التحسينات.",
        ),
      },
    ],
    faqs: [
      {
        q: text(
          "Can you work on a platform another team built?",
          "هل يمكنكم العمل على منصة بناها فريق آخر؟",
        ),
        a: text(
          "Yes, subject to authorized access and an assessment of its current condition. We agree code ownership, licenses and vendor constraints before making changes.",
          "نعم، بشرط الحصول على وصول مصرح به وتقييم حالتها الراهنة. ونتفق على ملكية الشفرة والتراخيص وقيود الموردين قبل إجراء أي تغيير.",
        ),
      },
      {
        q: text("Will you recommend rebuilding the platform?", "هل ستوصون بإعادة بناء المنصة؟"),
        a: text(
          "Only if the evidence supports it. We start with targeted improvements; if the assessment points towards a rebuild, we explain the reasons, trade-offs and alternatives so you can decide.",
          "فقط إذا دعمت الأدلة ذلك. نبدأ بتحسينات موجهة، وإذا أشار التقييم إلى ضرورة إعادة البناء، نوضح الأسباب والبدائل وما يترتب على كل خيار، لتتخذ القرار.",
        ),
      },
      {
        q: text(
          "Can you guarantee faster or more reliable performance?",
          "هل تضمنون أداءً أسرع أو أكثر موثوقية؟",
        ),
        a: text(
          "No. Improvement targets are agreed after the assessment and verified against a baseline where the evidence supports one.",
          "لا. نتفق على أهداف التحسين بعد التقييم، ونتحقق منها مقارنةً بخط أساس عندما تدعمه الأدلة.",
        ),
      },
      {
        q: text(
          "How do you limit disruption to live users?",
          "كيف تحدّون من التأثير في المستخدمين الحاليين؟",
        ),
        a: text(
          "Changes are tested outside production, checked for regressions and released under an agreed release and rollback plan. Release windows and user communication are agreed with your team.",
          "نختبر التغييرات خارج بيئة التشغيل الفعلية، ونفحصها لمنع تراجع الوظائف، ثم نطرحها وفق خطة متفق عليها للإصدار والرجوع. ونحدد مع فريقك مواعيد الإصدار وطريقة إبلاغ المستخدمين.",
        ),
      },
    ],
  },
};
