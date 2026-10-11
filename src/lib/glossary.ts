import { text } from "./content.ts";
import type { Localized } from "./content.ts";

export interface Term {
  id: string;
  term: Localized;
  definition: Localized;
}

/** Plain-language digital health terms (expanded in the content phase). */
export const glossary: Term[] = [
  {
    id: "digital-front-door",
    term: text("Digital front door", "الباب الرقمي الأمامي"),
    definition: text(
      "The set of online touchpoints, such as a website, search listing, booking link or messaging channel, through which people first find and contact a healthcare service.",
      "مجموعة نقاط التواصل الرقمية، مثل الموقع ونتائج البحث ورابط الحجز وقنوات المراسلة، التي يعثر من خلالها الناس على الخدمة الصحية ويتواصلون معها أول مرة.",
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
];
