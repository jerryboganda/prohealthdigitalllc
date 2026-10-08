import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      {" "}
      {/* Main footer wrapper */}
      <div className="mx-auto max-w-350 px-6 lg:px-10 pt-20 pb-10">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3.5">
              <img
                src="/prohealth-logo.png"
                alt="ProHealth Digital Logo"
                className="h-24 w-24 object-contain bg-white rounded-md p-1"
              />
              <div className="leading-none">
                <div className="text-white font-display font-bold text-[18px]">
                  ProHealth Digital
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/50 mt-1.5">
                  LLC · USA
                </div>
              </div>
            </div>
            <p className="mt-6 text-[14px] leading-relaxed text-white/60 max-w-sm">
              Digital transformation partner for healthcare clinics, medical educators, and
              health-tech businesses. Websites, growth systems, and educational platforms built for
              regulated industries.
            </p>
          </div>

          <FooterCol
            title="Company"
            links={[
              { to: "/about", label: "About" },
              { to: "/services", label: "Services" },
              { to: "/packages", label: "Packages" },
              { to: "/digital-products", label: "Products" },
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              { to: "/faq", label: "FAQ" },
              { to: "/contact", label: "Contact" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms & Conditions" },
              { to: "/refunds", label: "Refund Policy" },
              { to: "/cookies", label: "Cookie Policy" },
              { to: "/delivery", label: "Delivery Policy" },
            ]}
          />
          <div>
            <div className="text-white text-[13px] font-semibold tracking-wider uppercase">
              Contact
            </div>
            <ul className="mt-5 space-y-3 text-[13.5px]">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 mt-0.5 text-teal shrink-0" />
                <a
                  href="mailto:prohealthdigitalllc@outlook.com"
                  className="hover:text-white break-all"
                >
                  prohealthdigitalllc@outlook.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 mt-0.5 text-teal shrink-0" />
                <div className="space-y-1">
                  <a href="tel:+13072106740" className="hover:text-white block">
                    USA: +1 (307) 210-6740
                  </a>
                  <a href="tel:+447444872808" className="hover:text-white block">
                    UK: +44 7444 872808
                  </a>
                  <a href="tel:+201062365271" className="hover:text-white block">
                    Egypt: +20 106 236 5271
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-[12.5px] text-white/50 space-y-4">
          <p className="max-w-xl text-white/40 leading-relaxed">
            ProHealth Digital LLC is a Wyoming limited liability company registered in the United
            States.
            <br />
            Owned by Dr. Ahmed Hesham Ibrahim Abdrabu Ibrahim.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            <div>© {new Date().getFullYear()} ProHealth Digital LLC. All rights reserved.</div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link to="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link to="/refunds" className="hover:text-white">
                Refunds
              </Link>
              <Link to="/cookies" className="hover:text-white">
                Cookies
              </Link>
              <Link to="/delivery" className="hover:text-white">
                Delivery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <div className="text-white text-[13px] font-semibold tracking-wider uppercase">{title}</div>
      <ul className="mt-5 space-y-2.5 text-[13.5px]">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
