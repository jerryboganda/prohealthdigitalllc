import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/digital-products", label: "Products" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !isHome || open;

  // Header component render
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/90 backdrop-blur-lg border-b border-hairline"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-350 px-6 lg:px-10">
        <div className="flex h-24 items-center justify-between gap-6">
          <a
            href="/"
            className="flex items-center gap-3.5 shrink-0"
            aria-label="ProHealth Digital home"
          >
            <img
              src="/prohealth-logo.png"
              alt="ProHealth Digital Logo"
              className="h-24 w-24 object-contain"
            />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-[18px] tracking-tight text-navy">
                ProHealth Digital
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                LLC
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <a
                  key={item.to}
                  href={item.to}
                  className={`relative px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                    active ? "text-royal" : "text-navy/80 hover:text-navy"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-royal" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 bg-navy text-white text-[13.5px] font-medium px-4 py-2.5 rounded-md hover:bg-royal transition-colors"
            >
              Get Started
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-secondary"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            className="lg:hidden pb-6 pt-2 flex flex-col gap-1 border-t border-hairline"
            aria-label="Mobile"
          >
            {NAV.map((item) => (
              <a
                key={item.to}
                href={item.to}
                className="px-3 py-3 text-[15px] font-medium text-navy hover:bg-secondary rounded-md"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              className="mt-2 inline-flex items-center justify-center gap-1.5 bg-navy text-white text-[14px] font-medium px-4 py-3 rounded-md"
            >
              Get Started <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
