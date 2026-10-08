import type { ReactNode } from "react";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  index?: string;
}

export function SectionHeader({ eyebrow, title, intro, align = "left", index }: Props) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {(eyebrow || index) && (
        <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          {index && (
            <span className="font-display text-[13px] font-semibold text-royal/70">{index}</span>
          )}
          {index && eyebrow && <span className="h-px w-8 bg-royal/40" />}
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        </div>
      )}
      <h2 className="mt-4 text-display text-3xl sm:text-4xl lg:text-[52px] text-navy">{title}</h2>
      {intro && (
        <p className="mt-5 text-[16px] lg:text-[17px] leading-relaxed text-muted-foreground">
          {intro}
        </p>
      )}
    </div>
  );
}
