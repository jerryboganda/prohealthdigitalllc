import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ProHealth Digital" },
      {
        name: "description",
        content:
          "How ProHealth Digital LLC collects, uses, and protects personal information across our website and client engagements.",
      },
      { property: "og:title", content: "Privacy Policy — ProHealth Digital" },
      {
        property: "og:description",
        content: "ProHealth Digital privacy commitments and data handling practices.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This privacy policy explains what personal information ProHealth Digital LLC collects, why we collect it, and the choices you have."
      updated="24 July 2026"
    >
      <h2>1. Who we are</h2>
      <p>
        ProHealth Digital LLC (&ldquo;ProHealth Digital&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
        is a company registered in the United States. This policy applies to information collected
        through our website and during client engagements.
      </p>

      <h2>2. Information we collect</h2>
      <p>
        We collect information you provide directly — such as your name, email address, phone
        number, company details, and the content of any message you send through our contact form.
        We also collect limited technical information, including IP address, browser type, and pages
        visited, using standard analytics.
      </p>

      <h2>3. How we use information</h2>
      <ul>
        <li>To respond to enquiries and provide the services you request.</li>
        <li>To administer contracts, invoices, and project delivery.</li>
        <li>To improve our website, content, and services.</li>
        <li>To comply with legal and regulatory obligations.</li>
      </ul>

      <h2>4. Legal basis</h2>
      <p>
        Where applicable, we process personal information based on your consent, our legitimate
        business interests, or to perform a contract with you.
      </p>

      <h2>5. Sharing</h2>
      <p>
        We do not sell personal information. We share it only with trusted service providers who
        help us operate the business (for example, email and analytics providers), and where
        required by law.
      </p>

      <h2>6. Retention</h2>
      <p>
        We keep personal information only as long as needed for the purposes described here, and to
        comply with legal obligations.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of the personal information we hold
        about you. Contact us at{" "}
        <a href="mailto:prohealthdigitalllc@outlook.com">prohealthdigitalllc@outlook.com</a> to
        exercise these rights.
      </p>

      <h2>8. Security & Data Protection</h2>
      <p>
        We use reasonable technical and organisational measures to protect personal information. No
        online transmission is fully secure, and we cannot guarantee absolute security. In the event
        of any data breach, we will notify affected users and regulatory bodies within the timelines
        required by applicable law.
      </p>

      <h2>9. HIPAA & Medical Data Notice</h2>
      <p>
        ProHealth Digital LLC is a software engineering and digital positioning consulting firm. We
        do not provide clinical services, patient care, or EMR hosting services, and our website
        does not collect or process Protected Health Information (PHI). If we assist clinics with
        custom EMR integration, such integrations are executed under strict Business Associate
        Agreements (BAAs) where required.
      </p>

      <h2>10. GDPR & CCPA Compliance</h2>
      <p>
        If you are located in the European Economic Area (EEA) or California, you have specific
        rights under the General Data Protection Regulation (GDPR) and California Consumer Privacy
        Act (CCPA). These include the right to data portability, the right to request restriction of
        processing, and the right to object to automated decision-making. To file a data removal
        request, contact our team.
      </p>

      <h2>11. International transfers</h2>
      <p>
        We operate across the US, UK, and MENA regions. Where personal information is transferred
        internationally, we take steps to ensure appropriate safeguards are in place.
      </p>

      <h2>12. Contact</h2>
      <p>
        For any privacy-related question, email{" "}
        <a href="mailto:prohealthdigitalllc@outlook.com">prohealthdigitalllc@outlook.com</a> or call
        +1 (307) 210-6740.
      </p>
    </LegalPage>
  ),
});
