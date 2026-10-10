import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { localeFor, localPath, text, ui, EMAIL, ORIGIN } from "../lib/content";

function NotFoundComponent() {
  const locale = localeFor(useRouterState({ select: (s) => s.location.pathname }));
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          {text("Page not found", "الصفحة غير موجودة")[locale]}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {
            text(
              "The page you are looking for does not exist or has moved.",
              "الصفحة التي تبحث عنها غير موجودة أو نُقلت.",
            )[locale]
          }
        </p>
        <div className="mt-6">
          <a
            href={localPath("/", locale)}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {text("Go home", "العودة إلى الرئيسية")[locale]}
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const locale = localeFor(useRouterState({ select: (s) => s.location.pathname }));
  useEffect(() => {
    reportError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          {text("This page did not load", "تعذر تحميل الصفحة")[locale]}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {
            text(
              "Please retry or return to the homepage.",
              "يرجى المحاولة مجددًا أو العودة إلى الصفحة الرئيسية.",
            )[locale]
          }
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {text("Try again", "حاول مجددًا")[locale]}
          </button>
          <a
            href={localPath("/", locale)}
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {text("Go home", "العودة إلى الرئيسية")[locale]}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A1D3D" },
      { title: "ProHealth Digital LLC — Healthcare Technology Delivery" },
      {
        name: "description",
        content: ui.intro.en,
      },
      { name: "author", content: "ProHealth Digital LLC" },
      { property: "og:site_name", content: "ProHealth Digital" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://prohealthdigitalllc.com/prohealth-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://prohealthdigitalllc.com/prohealth-logo.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+Arabic:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ProHealth Digital LLC",
          alternateName: "ProHealth Digital",
          description: ui.intro.en,
          url: ORIGIN,
          email: EMAIL,
          telephone: "+1-307-210-6740",
          address: { "@type": "PostalAddress", addressCountry: "US" },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const locale = localeFor(useRouterState({ select: (s) => s.location.pathname }));
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
