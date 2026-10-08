import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — ProHealth Digital" },
      {
        name: "description",
        content:
          "How ProHealth Digital uses cookies and similar technologies on this website and the choices available to visitors.",
      },
      { property: "og:title", content: "Cookie Policy — ProHealth Digital" },
      {
        property: "og:description",
        content: "Cookie usage and visitor choices on the ProHealth Digital website.",
      },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      intro="This cookie policy explains how ProHealth Digital uses cookies and similar technologies on this website, and the choices you have."
      updated="24 July 2026"
    >
      <h2>1. What cookies are</h2>
      <p>
        Cookies are small text files that a website places on your device. They allow the site to
        recognise your device and remember information about your visit, such as your preferences.
      </p>

      <h2>2. How we use cookies</h2>
      <p>We use cookies for a limited number of purposes:</p>
      <ul>
        <li>
          <strong>Essential cookies</strong> — required for the website to function correctly.
        </li>
        <li>
          <strong>Analytics cookies</strong> — help us understand how visitors use the site so we
          can improve it. Data is aggregated and anonymous.
        </li>
      </ul>

      <h2>3. Third-party cookies</h2>
      <p>
        Some cookies are set by third-party services that appear on our pages, such as analytics
        tools. We do not control these cookies and recommend checking the relevant third
        parties&rsquo; policies for details.
      </p>

      <h2>4. Managing Cookies in Your Browser</h2>
      <p>
        Most web browsers allow you to control or disable cookies through their preference settings.
        If you choose to restrict or block cookies, some sections of our website may not load or
        operate correctly. To adjust your settings, follow the instructions provided by your
        browser:
      </p>
      <ul>
        <li>
          <strong>Google Chrome:</strong> Go to Settings &gt; Privacy and Security &gt; Third-party
          cookies &gt; See all site data and permissions.
        </li>
        <li>
          <strong>Apple Safari:</strong> Go to Settings &gt; Privacy &gt; Block all cookies, or
          manage website data.
        </li>
        <li>
          <strong>Mozilla Firefox:</strong> Go to Settings &gt; Privacy & Security &gt; Cookies and
          Site Data &gt; Manage Exceptions.
        </li>
        <li>
          <strong>Microsoft Edge:</strong> Go to Settings &gt; Cookies and site permissions &gt;
          Manage and delete cookies and site data.
        </li>
      </ul>

      <h2>5. Persistent vs. Session Cookies</h2>
      <p>
        Cookies are classified as either session cookies or persistent cookies. Session cookies are
        temporary files that are automatically deleted from your device when you close your browser.
        Persistent cookies remain stored on your device for a pre-defined period or until you
        manually clear them, allowing websites to remember your preferences and settings during
        future visits.
      </p>

      <h2>6. Changes to this Policy</h2>
      <p>
        We may update this cookie policy from time to time to reflect changes in the technology we
        use or in applicable regulations. Your continued use of our website after any changes
        indicates your agreement with the updated policy.
      </p>

      <h2>7. Contact</h2>
      <p>
        For questions about our use of cookies, email our team at{" "}
        <a href="mailto:prohealthdigitalllc@outlook.com">prohealthdigitalllc@outlook.com</a>.
      </p>
    </LegalPage>
  ),
});
