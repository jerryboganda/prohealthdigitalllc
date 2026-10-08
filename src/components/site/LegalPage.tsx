import type { ReactNode } from "react";
import { Layout } from "@/components/site/Layout";

export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <Layout>
      <section className="pt-36 lg:pt-44 pb-12 lg:pb-16 border-b border-hairline">
        <div className="mx-auto max-w-350 px-6 lg:px-10">
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="mt-5 text-display text-4xl lg:text-6xl leading-tight text-navy max-w-4xl">
            {title}
          </h1>
          <p className="mt-6 text-[16px] lg:text-[17px] text-muted-foreground max-w-2xl">{intro}</p>
          <p className="mt-8 text-[12.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Last updated · {updated}
          </p>
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-10 legal-prose">{children}</div>
      </section>
    </Layout>
  );
}
