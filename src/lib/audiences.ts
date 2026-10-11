import { text } from "./content.ts";
import type { Engagement, Localized } from "./content.ts";

export interface Audience {
  id: "providers" | "digital-health-companies";
  engagement: Engagement["audience"];
  eyebrow: Localized;
  title: Localized;
  intro: Localized;
  who: Localized;
  challengesTitle: Localized;
  challenges: { title: Localized; body: Localized }[];
  approachTitle: Localized;
  approach: Localized[];
  startTitle: Localized;
  start: Localized;
}

export const audiences: Audience[] = [
  {
    id: "providers",
    engagement: "provider",
    eyebrow: text("For healthcare providers", "لمقدمي الرعاية الصحية"),
    title: text(
      "Make care easier to find and simpler to run.",
      "اجعل الرعاية أسهل في الوصول وأبسط في الإدارة.",
    ),
    intro: text(
      "Our engagements are designed for clinics, hospitals and healthcare groups that want to give patients clearer digital front doors and give staff connected, less repetitive workflows.",
      "صُممت خدماتنا للعيادات والمستشفيات والمجموعات الصحية التي تريد تقديم واجهات رقمية أوضح للمرضى، وتمكين الموظفين من إجراءات عمل مترابطة وأقل تكرارًا.",
    ),
    who: text(
      "Independent clinics, specialist centres, multi-site healthcare groups and hospital departments.",
      "العيادات المستقلة والمراكز التخصصية والمجموعات الصحية متعددة الفروع وأقسام المستشفيات.",
    ),
    challengesTitle: text("Problems we are asked to solve", "مشكلات يُطلب منا حلها"),
    challenges: [
      {
        title: text("Patients cannot find the right service", "لا يجد المرضى الخدمة المناسبة"),
        body: text(
          "Service, location and provider information is scattered or out of date, so people call to ask basic questions or go elsewhere.",
          "معلومات الخدمات والمواقع ومقدمي الرعاية متفرقة أو قديمة، فيتصل الناس لطرح أسئلة أساسية أو يتجهون إلى جهات أخرى.",
        ),
      },
      {
        title: text("Inquiries and bookings leak", "استفسارات وحجوزات تضيع"),
        body: text(
          "Web forms, phone lines and messaging channels are not connected to an agreed handoff, so follow-up depends on who sees the message first.",
          "لا ترتبط نماذج الويب وخطوط الهاتف وقنوات المراسلة بمسار تسليم متفق عليه، فتعتمد المتابعة على أول من يرى الرسالة.",
        ),
      },
      {
        title: text("Staff re-enter the same data", "يعيد الموظفون إدخال البيانات نفسها"),
        body: text(
          "Disconnected tools mean duplicate entry, manual reconciliation and inconsistent follow-up across shifts and sites.",
          "تعني الأدوات المنفصلة تكرار الإدخال والمطابقة اليدوية وعدم انتظام المتابعة بين المناوبات والفروع.",
        ),
      },
      {
        title: text("Bilingual journeys are an afterthought", "الرحلات ثنائية اللغة تأتي لاحقًا"),
        body: text(
          "Arabic and English content drift apart, and right-to-left layouts break forms, tables and navigation.",
          "يتباعد المحتوى العربي والإنجليزي، وتتعطل النماذج والجداول والتنقل في التخطيطات من اليمين إلى اليسار.",
        ),
      },
    ],
    approachTitle: text("How we approach provider projects", "كيف نتعامل مع مشاريع مقدمي الرعاية"),
    approach: [
      text(
        "Start from patient questions and staff tasks, not from a page list.",
        "نبدأ من أسئلة المرضى ومهام الموظفين، لا من قائمة صفحات.",
      ),
      text(
        "Agree the booking or inquiry handoff with the systems and people who own it.",
        "نتفق على مسار الحجز أو الاستفسار مع الأنظمة والأشخاص المسؤولين عنه.",
      ),
      text(
        "Plan English and Arabic content together, with a named reviewer for each.",
        "نخطط المحتوى العربي والإنجليزي معًا، مع مراجع محدد لكل لغة.",
      ),
      text(
        "Keep clinical content approval and clinical decisions with your team.",
        "تبقى الموافقة على المحتوى الطبي والقرارات الطبية لدى فريقك.",
      ),
    ],
    startTitle: text("A good first conversation", "محادثة أولى مفيدة"),
    start: text(
      "Bring your current website or workflow, the services that matter most and the questions patients or staff ask most often. We will tell you which engagement fits and what we would need to scope it.",
      "أحضر موقعك أو إجراءات عملك الحالية، والخدمات الأهم، والأسئلة الأكثر تكرارًا من المرضى أو الموظفين. سنخبرك بالخدمة المناسبة وبما نحتاجه لتحديد نطاقها.",
    ),
  },
  {
    id: "digital-health-companies",
    engagement: "digital-health",
    eyebrow: text("For digital health companies", "لشركات الصحة الرقمية"),
    title: text(
      "Ship a focused platform, then keep improving it.",
      "أطلق منصة مركزة، ثم واصل تطويرها.",
    ),
    intro: text(
      "Health-tech start-ups, healthcare-education businesses and established digital health teams use us to deliver a first release or to diagnose and improve a live product.",
      "تستعين بنا الشركات الناشئة في التقنية الصحية وشركات التعليم الصحي وفرق الصحة الرقمية القائمة لتنفيذ إصدار أول أو لتشخيص منتج قائم وتطويره.",
    ),
    who: text(
      "Founders with a defined opportunity, product teams that need delivery capacity, and operators of live health platforms.",
      "مؤسسون لديهم فرصة واضحة، وفرق منتجات تحتاج إلى قدرة تنفيذ، ومشغلو منصات صحية قائمة.",
    ),
    challengesTitle: text("Problems we are asked to solve", "مشكلات يُطلب منا حلها"),
    challenges: [
      {
        title: text("The first release keeps growing", "الإصدار الأول يتضخم باستمرار"),
        body: text(
          "Without an agreed first-release scope, launches slip while features accumulate that users may not need yet.",
          "دون نطاق متفق عليه للإصدار الأول، يتأخر الإطلاق بينما تتراكم ميزات قد لا يحتاجها المستخدمون بعد.",
        ),
      },
      {
        title: text("A live product feels fragile", "منتج قائم يبدو هشًا"),
        body: text(
          "Slow pages, unreliable integrations or confusing journeys erode trust, but nobody has a clear diagnosis.",
          "الصفحات البطيئة والتكاملات غير الموثوقة والرحلات المربكة تضعف الثقة، دون تشخيص واضح لدى أحد.",
        ),
      },
      {
        title: text(
          "Sensitive data arrangements are unclear",
          "ترتيبات البيانات الحساسة غير واضحة",
        ),
        body: text(
          "Hosting, access, retention and vendor responsibilities need to be agreed before implementation, not discovered after launch.",
          "يجب الاتفاق على الاستضافة والوصول ومدة الاحتفاظ ومسؤوليات الموردين قبل التنفيذ، لا اكتشافها بعد الإطلاق.",
        ),
      },
      {
        title: text("Ownership is not documented", "الملكية غير موثقة"),
        body: text(
          "Teams inherit code and infrastructure without documentation, release processes or a clear rollback plan.",
          "ترث الفرق الشفرة والبنية التحتية دون وثائق أو إجراءات إصدار أو خطة رجوع واضحة.",
        ),
      },
    ],
    approachTitle: text("How we approach platform work", "كيف نتعامل مع مشاريع المنصات"),
    approach: [
      text(
        "Define the users, journeys and first-release boundary before design starts.",
        "نحدد المستخدمين والرحلات وحدود الإصدار الأول قبل بدء التصميم.",
      ),
      text(
        "Ground improvement work in observed problems and reproducible checks.",
        "نبني أعمال التحسين على المشكلات المرصودة وفحوص قابلة للتكرار.",
      ),
      text(
        "Agree sensitive-data, vendor and release responsibilities in writing.",
        "نتفق كتابيًا على مسؤوليات البيانات الحساسة والموردين والإصدار.",
      ),
      text(
        "Hand over code, documentation and release and rollback steps your team can run.",
        "نسلم الشفرة والوثائق وخطوات الإصدار والرجوع التي يستطيع فريقك تنفيذها.",
      ),
    ],
    startTitle: text("A good first conversation", "محادثة أولى مفيدة"),
    start: text(
      "Share the opportunity or the live product, who uses it and what is getting in the way. We will suggest whether a launch or an improvement engagement fits and what discovery would cover.",
      "شارك الفرصة أو المنتج القائم، ومن يستخدمه، وما الذي يعيقه. سنقترح ما إذا كانت خدمة الإطلاق أو التطوير هي الأنسب، وما الذي ستغطيه مرحلة فهم الاحتياجات.",
    ),
  },
];
