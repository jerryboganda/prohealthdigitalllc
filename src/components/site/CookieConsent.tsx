import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-100 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white/95 backdrop-blur-md border border-hairline rounded-lg p-5 shadow-2xl flex flex-col gap-4 text-navy">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-md bg-royal/10 grid place-items-center text-royal shrink-0 mt-0.5">
            <Shield className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-semibold text-[14.5px]">Cookie Preferences</h4>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              We use cookies to optimize site navigation and analyze website traffic. Read our{" "}
              <a
                href="/cookies"
                className="underline underline-offset-2 hover:text-royal transition-colors"
              >
                Cookie Policy
              </a>{" "}
              to learn more.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end pt-1 border-t border-hairline text-[13px]">
          <button
            onClick={handleReject}
            className="px-3.5 py-2 font-medium hover:text-royal hover:bg-secondary rounded-md transition-colors"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 font-medium bg-navy text-white hover:bg-royal rounded-md transition-colors shadow-sm"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
