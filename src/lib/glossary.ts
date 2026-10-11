import { text } from "./content.ts";
import type { Localized } from "./content.ts";

export interface Term {
  id: string;
  term: Localized;
  definition: Localized;
}

/** Plain-language healthcare technology terms. Definitions render as plain text. */
export const glossary: Term[] = [
  {
    id: "digital-front-door",
    term: text("Digital front door", "الباب الأمامي الرقمي"),
    definition: text(
      "The set of online touchpoints, such as a website, search listing, booking link or messaging channel, through which people first find and contact a healthcare service.",
      "مجموعة نقاط التواصل الرقمية، مثل الموقع ونتائج البحث ورابط الحجز وقنوات المراسلة، التي يعثر من خلالها الناس على الخدمة الصحية ويتواصلون معها للمرة الأولى.",
    ),
  },
  {
    id: "interoperability",
    term: text("Interoperability", "التشغيل البيني"),
    definition: text(
      "The ability of different systems to exchange data and use it as intended, for example a booking system passing an appointment to a clinic's records system.",
      "قدرة الأنظمة المختلفة على تبادل البيانات واستخدامها على النحو المقصود، مثل انتقال موعد من نظام الحجز إلى نظام سجلات العيادة.",
    ),
  },
  {
    id: "hl7-fhir",
    term: text("HL7 FHIR", "معيار HL7 FHIR"),
    definition: text(
      "A standard from HL7 International for exchanging healthcare information electronically. It describes data as modular resources, such as a patient or an appointment, which systems usually exchange through web APIs. FHIR stands for Fast Healthcare Interoperability Resources.",
      "معيار تصدره منظمة HL7 International لتبادل المعلومات الصحية إلكترونيًا. ويصف البيانات في صورة وحدات مستقلة تُسمّى الموارد، مثل المريض أو الموعد، تتبادلها الأنظمة عادةً عبر واجهات API على الويب. واسم FHIR اختصار لعبارة Fast Healthcare Interoperability Resources.",
    ),
  },
  {
    id: "api",
    term: text("API (application programming interface)", "واجهة برمجة التطبيقات (API)"),
    definition: text(
      "A defined way for one software system to request data or actions from another, with agreed formats, permissions and error handling.",
      "آلية محددة تتيح لنظام برمجي أن يطلب بيانات أو إجراءات من نظام آخر، وفق صيغ متفق عليها وصلاحيات واضحة وطريقة معلومة للتعامل مع الأخطاء.",
    ),
  },
  {
    id: "integration",
    term: text("System integration", "تكامل الأنظمة"),
    definition: text(
      "Connecting separate systems so that data or actions flow between them, for example through APIs or messaging standards, with agreed rules for errors, retries and ownership.",
      "ربط أنظمة منفصلة كي تتدفق البيانات أو الإجراءات بينها، عبر واجهات API أو معايير المراسلة مثلًا، مع قواعد متفق عليها لمعالجة الأخطاء وإعادة المحاولة وتحديد المسؤوليات.",
    ),
  },
  {
    id: "ehr-emr",
    term: text(
      "Electronic health and medical records (EHR / EMR)",
      "السجلات الصحية والطبية الإلكترونية (EHR / EMR)",
    ),
    definition: text(
      "Digital records of a patient's health information and care. EMR usually means the record kept within one organisation, while EHR usually means a record designed to be shared across organisations; usage varies by market and vendor.",
      "سجلات رقمية تحفظ المعلومات الصحية للمريض والرعاية التي يتلقاها. ويُقصد بـ EMR عادةً السجل المحفوظ داخل منشأة واحدة، وبـ EHR السجل المصمَّم للمشاركة بين أكثر من منشأة، ويختلف الاستخدام بحسب السوق والمورّد.",
    ),
  },
  {
    id: "patient-portal",
    term: text("Patient portal", "بوابة المريض"),
    definition: text(
      "A secure website or app area where patients can view selected information and complete tasks such as booking appointments, viewing results or sending messages, depending on what the provider chooses to offer.",
      "مساحة آمنة على الموقع أو التطبيق يطّلع فيها المريض على معلومات مختارة وينجز مهام مثل حجز المواعيد والاطلاع على النتائج وإرسال الرسائل، بحسب ما يقرر مقدّم الرعاية إتاحته.",
    ),
  },
  {
    id: "telehealth",
    term: text("Telehealth", "الرعاية الصحية عن بُعد"),
    definition: text(
      "The delivery of health services and information at a distance using technology, such as video or phone consultations, secure messaging and remote monitoring.",
      "تقديم الخدمات والمعلومات الصحية عن بُعد باستخدام التقنية، مثل الاستشارات المرئية أو الهاتفية والمراسلة الآمنة والمتابعة عن بُعد.",
    ),
  },
  {
    id: "e-prescription",
    term: text("E-prescription", "الوصفة الطبية الإلكترونية"),
    definition: text(
      "A prescription created and sent electronically from the prescriber to the pharmacy instead of on paper. The software carries the prescription; the prescribing decision stays with the licensed clinician.",
      "وصفة طبية تُنشأ وتُرسَل إلكترونيًا من الممارس الصحي الذي يصفها إلى الصيدلية بدلًا من الورق. وتتولى البرمجيات نقل الوصفة، أما قرار وصف العلاج فيبقى بيد الممارس الصحي المرخّص.",
    ),
  },
  {
    id: "triage-booking-handoff",
    term: text("Triage and booking handoff", "الانتقال بين الحجز والفرز الطبي"),
    definition: text(
      "The point where a patient inquiry passes between booking, which is administrative, and triage, which is a clinical assessment of urgency and need. Digital tools can route and record the handoff, but triage decisions stay with qualified clinical staff.",
      "النقطة التي ينتقل فيها طلب المريض بين الحجز، وهو إجراء إداري، والفرز الطبي، وهو تقييم سريري لمدى الإلحاح والحاجة. ويمكن للأدوات الرقمية توجيه هذا الانتقال وتوثيقه، أما قرارات الفرز فتبقى بيد الكوادر السريرية المؤهلة.",
    ),
  },
  {
    id: "workflow-mapping",
    term: text("Workflow mapping", "رسم خرائط سير العمل"),
    definition: text(
      "Documenting how a process actually runs today, including its steps, people, systems, handoffs and delays, so that changes are designed from evidence rather than assumption.",
      "توثيق الطريقة التي تسير بها العملية فعليًا اليوم، بخطواتها والأشخاص والأنظمة المشاركة فيها ونقاط الانتقال والتأخير، كي تُبنى التحسينات على الواقع لا على الافتراض.",
    ),
  },
  {
    id: "single-sign-on",
    term: text("Single sign-on (SSO)", "تسجيل الدخول الموحّد (SSO)"),
    definition: text(
      "An arrangement that lets a person sign in once with one identity and then use several connected applications without signing in to each separately.",
      "آلية تتيح للمستخدم تسجيل الدخول مرة واحدة بهوية واحدة، ثم استخدام عدة تطبيقات مترابطة دون الحاجة إلى تسجيل الدخول في كل منها على حدة.",
    ),
  },
  {
    id: "role-based-access-control",
    term: text("Role-based access control (RBAC)", "التحكم في الوصول القائم على الأدوار (RBAC)"),
    definition: text(
      "A way of managing access in which permissions are attached to roles, such as receptionist, clinician or administrator, and each person receives only the roles their work requires.",
      "أسلوب لإدارة الصلاحيات تُربط فيه الأذونات بالأدوار، مثل موظف الاستقبال أو الطبيب أو مدير النظام، ولا يُمنح كل شخص إلا الأدوار التي يتطلبها عمله.",
    ),
  },
  {
    id: "personal-health-data",
    term: text("Personal health data", "البيانات الصحية الشخصية"),
    definition: text(
      "Information about an identifiable person's physical or mental health, including the care they receive. It is widely treated as a sensitive category of data that calls for stricter protection.",
      "معلومات تتعلق بالصحة الجسدية أو النفسية لشخص يمكن التعرف عليه، بما في ذلك الرعاية التي يتلقاها. ويُنظر إليها على نطاق واسع بوصفها فئة حساسة من البيانات تستدعي حماية أشد.",
    ),
  },
  {
    id: "data-minimisation",
    term: text("Data minimisation", "تقليل البيانات إلى الحد الأدنى"),
    definition: text(
      "The principle of collecting, keeping and displaying only the personal data needed for a clearly defined purpose, and no more.",
      "مبدأ يقضي بجمع البيانات الشخصية وحفظها وعرضها في حدود ما يلزم لغرض محدد بوضوح، دون زيادة.",
    ),
  },
  {
    id: "consent",
    term: text("Consent", "الموافقة"),
    definition: text(
      "A person's informed agreement to a specific use of their data or to a service. Good practice is to ask in clear language, record what was agreed and when, and make withdrawal straightforward; legal requirements differ by jurisdiction.",
      "موافقة الشخص المستنيرة على استخدام محدد لبياناته أو على خدمة بعينها. ومن الممارسات الجيدة طلبها بلغة واضحة، وتوثيق ما تشمله ووقت منحها، وتيسير سحبها؛ مع العلم أن المتطلبات القانونية تختلف من ولاية قضائية إلى أخرى.",
    ),
  },
  {
    id: "data-residency",
    term: text("Data residency", "إقامة البيانات"),
    definition: text(
      "Where data is physically stored and processed, by country or region. Data localisation usually refers to a requirement to keep certain data within a particular country. Requirements vary by jurisdiction and type of data, so they should be confirmed with qualified legal advice for each market.",
      "الموقع الجغرافي الذي تُخزَّن فيه البيانات وتُعالَج، على مستوى الدولة أو الإقليم. ويُقصد بتوطين البيانات عادةً اشتراط إبقاء بيانات معينة داخل دولة بعينها. وتختلف المتطلبات بحسب الولاية القضائية ونوع البيانات، لذا ينبغي التحقق منها بمشورة قانونية مختصة في كل سوق.",
    ),
  },
  {
    id: "encryption-in-transit-and-at-rest",
    term: text("Encryption in transit and at rest", "التشفير أثناء النقل وأثناء التخزين"),
    definition: text(
      "Using cryptography to protect data so that only holders of the right key can read it, both while it moves between systems (in transit) and while it is stored in databases, files or backups (at rest).",
      "حماية البيانات بالتشفير بحيث لا يقرؤها إلا من يملك مفتاح فك التشفير، سواء في أثناء انتقالها بين الأنظمة (أثناء النقل) أو في أثناء حفظها في قواعد البيانات والملفات والنسخ الاحتياطية (أثناء التخزين).",
    ),
  },
  {
    id: "incident-response",
    term: text("Incident response", "الاستجابة للحوادث"),
    definition: text(
      "The planned process for detecting, containing, investigating and recovering from a security or service incident, including who is informed, when, and how lessons are recorded.",
      "العملية المخطط لها مسبقًا لاكتشاف الحوادث الأمنية أو التشغيلية واحتوائها والتحقيق فيها والتعافي منها، بما في ذلك تحديد من يُبلَّغ ومتى، وكيف تُوثَّق الدروس المستفادة.",
    ),
  },
  {
    id: "availability",
    term: text("Availability (uptime)", "التوافر (وقت التشغيل)"),
    definition: text(
      "The proportion of time a service is reachable and working as expected, measured over a defined period. Targets and how they are measured are usually set out in a service level agreement.",
      "نسبة الوقت الذي تكون فيه الخدمة متاحة وتعمل كما هو متوقع خلال مدة زمنية محددة. وتُحدَّد المستهدفات وطريقة قياسها عادةً في اتفاقية مستوى الخدمة.",
    ),
  },
  {
    id: "core-web-vitals",
    term: text("Core Web Vitals", "مؤشرات أداء الويب الأساسية (Core Web Vitals)"),
    definition: text(
      "A set of metrics defined by Google that describe real users' experience of a page's loading, responsiveness to input and visual stability: Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift.",
      "مجموعة مقاييس حددتها Google لوصف تجربة المستخدمين الفعليين مع سرعة تحميل الصفحة وسرعة استجابتها للتفاعل وثبات عناصرها البصرية، وهي: Largest Contentful Paint، وInteraction to Next Paint، وCumulative Layout Shift.",
    ),
  },
  {
    id: "wcag",
    term: text("Web Content Accessibility Guidelines (WCAG)", "إرشادات إتاحة محتوى الويب (WCAG)"),
    definition: text(
      "Guidelines published by the W3C for making web content usable by people with disabilities. They are organised around content being perceivable, operable, understandable and robust, with conformance levels A, AA and AAA.",
      "إرشادات يصدرها اتحاد W3C لجعل محتوى الويب في متناول الأشخاص ذوي الإعاقة. وتقوم على أن يكون المحتوى قابلًا للإدراك والتشغيل والفهم ومتينًا، مع مستويات للمطابقة هي A وAA وAAA.",
    ),
  },
  {
    id: "right-to-left",
    term: text("Right-to-left (RTL)", "الاتجاه من اليمين إلى اليسار (RTL)"),
    definition: text(
      "The text direction of scripts such as Arabic, where reading starts on the right. RTL interfaces mirror layout, navigation and directional icons, while numbers, code and embedded Latin text keep their own left-to-right direction.",
      "اتجاه الكتابة في أنظمة كتابية مثل العربية، حيث تبدأ القراءة من اليمين. وتعكس الواجهات المصممة لهذا الاتجاه ترتيب العناصر والتنقل والأيقونات الاتجاهية، بينما تحتفظ الأرقام والشفرات البرمجية والنصوص اللاتينية المضمَّنة باتجاهها من اليسار إلى اليمين.",
    ),
  },
  {
    id: "transcreation",
    term: text("Transcreation", "الترجمة الإبداعية"),
    definition: text(
      "Adapting content for another language and culture so that it keeps its intent, tone and effect, rather than translating it word for word. Adapted clinical wording still needs review by qualified clinicians.",
      "تكييف المحتوى للغة وثقافة أخريين بما يحفظ غايته ونبرته وأثره، بدلًا من ترجمته حرفيًا. ويظل أي نص سريري مُكيَّف بحاجة إلى مراجعة من مختصين سريريين مؤهلين.",
    ),
  },
  {
    id: "discovery-phase",
    term: text("Discovery phase", "مرحلة فهم الاحتياجات (الاستكشاف)"),
    definition: text(
      "An early, time-boxed stage of a project used to understand goals, users, workflows, constraints and risks before agreeing scope, design and estimates.",
      "مرحلة مبكرة ومحددة المدة في المشروع، تُخصَّص لفهم الأهداف والمستخدمين ومسارات العمل والقيود والمخاطر قبل الاتفاق على النطاق والتصميم والتقديرات.",
    ),
  },
  {
    id: "scope-and-acceptance-criteria",
    term: text("Scope and acceptance criteria", "النطاق ومعايير القبول"),
    definition: text(
      "Scope sets out what a project will and will not deliver. Acceptance criteria are the specific, testable conditions each deliverable must meet before it is accepted as complete.",
      "يحدد النطاق ما سيقدّمه المشروع وما لن يقدّمه. أما معايير القبول فهي الشروط المحددة والقابلة للاختبار التي يجب أن يستوفيها كل مُخرَج قبل قبوله بوصفه مكتملًا.",
    ),
  },
  {
    id: "regression-testing",
    term: text("Regression testing", "اختبار الانحدار"),
    definition: text(
      "Re-testing existing features after a change to confirm they still work as before, usually with a mix of automated and manual checks.",
      "إعادة اختبار الوظائف القائمة بعد أي تغيير للتأكد من أنها لم تتراجع وما زالت تعمل كما كانت، ويجمع عادةً بين الفحوص الآلية واليدوية.",
    ),
  },
  {
    id: "rollback",
    term: text("Rollback", "التراجع إلى إصدار سابق"),
    definition: text(
      "Returning a system to its last known good version when a release causes problems. It is faster and safer when the steps are planned and rehearsed before the release.",
      "إعادة النظام إلى آخر إصدار مستقر معروف عندما يتسبب إصدار جديد في مشكلات. ويكون التراجع أسرع وأكثر أمانًا إذا خُطِّطت خطواته وجُرِّبت قبل الإطلاق.",
    ),
  },
  {
    id: "handover",
    term: text("Handover", "تسليم المشروع"),
    definition: text(
      "The structured transfer of a delivered system to the team that will run it, including access, documentation, configuration records and the knowledge needed to operate and change it.",
      "النقل المنظَّم للنظام المُنجَز إلى الفريق الذي سيتولى تشغيله، بما يشمل صلاحيات الوصول والتوثيق وسجلات الإعدادات والمعرفة اللازمة لتشغيله وتعديله.",
    ),
  },
  {
    id: "service-level-agreement",
    term: text("Service level agreement (SLA)", "اتفاقية مستوى الخدمة (SLA)"),
    definition: text(
      "A written agreement that defines the service to be provided, such as support hours, response and resolution targets and availability, and what happens when those targets are not met.",
      "اتفاقية مكتوبة تحدد مستوى الخدمة المقدَّمة، مثل ساعات الدعم ومستهدفات الاستجابة والحل ونسبة التوافر، وما يترتب على عدم تحقيق تلك المستهدفات.",
    ),
  },
];
