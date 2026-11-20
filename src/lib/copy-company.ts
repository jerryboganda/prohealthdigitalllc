import { text } from "./content.ts";

/** Copy shared by the How We Work, About and Contact pages and the inquiry form. */
export const companyUi = {
  /** Moved unchanged from InquiryForm so How We Work can reuse it. */
  followup: text(
    "Free discovery comes first. We assess fit and clarify requirements before preparing a scoped proposal. No technical specification or confirmed budget is required.",
    "تبدأ الرحلة بجلسة مجانية لفهم الاحتياجات. نقيّم ملاءمة المشروع ونوضح المتطلبات قبل إعداد عرض محدد النطاق. لا يلزم تقديم مواصفات تقنية أو ميزانية مؤكدة.",
  ),
};

/** Splits a paragraph into sentences ("." followed by whitespace) for list and highlight layouts. */
export const sentences = (s: string) => s.split(/(?<=\.)\s+/);
