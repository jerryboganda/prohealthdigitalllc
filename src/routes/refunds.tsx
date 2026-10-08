import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/refunds")({
  head: () => ({
    meta: [
      { title: "Refund & Cancellation Policy — ProHealth Digital" },
      {
        name: "description",
        content:
          "Refund and cancellation terms for ProHealth Digital LLC client engagements, service deposits, custom software development, and digital product files.",
      },
      { property: "og:title", content: "Refund & Cancellation Policy — ProHealth Digital" },
      {
        property: "og:description",
        content:
          "Policy details covering custom service deposits, completed sprints, digital products, and dispute handling.",
      },
      { property: "og:url", content: "/refunds" },
    ],
    links: [{ rel: "canonical", href: "/refunds" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Refund & Cancellation Policy"
      intro="This refund & cancellation policy explains the terms governing service deposits, custom software engineering sprints, digital product purchases, and billing disputes with ProHealth Digital LLC."
      updated="25 July 2026"
    >
      <h2>1. General terms</h2>
      <p>
        ProHealth Digital LLC (&ldquo;ProHealth Digital&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;) strives to maintain transparent pricing and a structured engagement
        model. Due to the resource-intensive, custom-engineered nature of our design, software
        development, and strategic positioning services, refunds are only issued under the limited
        circumstances detailed in this refund & cancellation policy.
      </p>

      <h2>2. Service deposits</h2>
      <p>
        All custom consulting and software engineering engagements require an upfront service
        deposit to lock our scheduling, engineer allocation, and designer availability. Unless
        explicitly agreed in writing in your service agreement, all service deposits are strictly
        non-refundable once paid, as they represent the reservation of dedicated technical
        resources.
      </p>

      <h2>3. Custom services and completed work</h2>
      <p>
        We work in structured weekly sprints with Friday milestone reviews. Once a weekly milestone
        or sprint deliverable has been reviewed, signed off, or deployed to a staging or production
        server, the associated work is considered complete. No refunds will be issued for completed
        work, development sprints already executed, or strategic consulting hours already delivered.
      </p>

      <h2>4. Cancellations and termination</h2>
      <p>
        Clients may cancel active recurring engagements or milestone phases by providing written
        notice in accordance with the termination clause in their specific service agreement
        (typically requiring 14 to 30 days notice). Upon cancellation notice:
      </p>
      <ul>
        <li>
          You will remain responsible for paying for all work scheduled or completed up to the
          effective date of termination.
        </li>
        <li>
          We will deliver all code, design files, and database schemas completed up to the
          termination date.
        </li>
        <li>
          Any unpaid milestone invoices must be settled before final file handoffs are processed.
        </li>
      </ul>

      <h2>5. Digital products and toolkits</h2>
      <p>
        We sell digital products, playbooks, Notion templates, and design kit files. Because these
        digital products are delivered instantly via direct download links and contain proprietary
        intellectual property, all digital product purchases are non-refundable. If you experience
        technical issues downloading or accessing your files, please contact our support team, and
        we will provide alternative access links or format transfers.
      </p>

      <h2>6. Chargebacks and payment disputes</h2>
      <p>
        We value transparent communication and expect clients to address billing concerns directly
        with our team. Filing an unauthorized chargeback or payment dispute with your bank, credit
        card issuer, or merchant processor without first contacting us is considered a breach of
        these terms. In such events:
      </p>
      <ul>
        <li>
          All active staging servers, custom platforms, and software license grants will be
          suspended immediately.
        </li>
        <li>
          Your client file will be forwarded to our collections and legal department for recovery.
        </li>
        <li>We reserve the right to report billing disputes to business credit bureaus.</li>
      </ul>

      <h2>7. Contact</h2>
      <p>
        If you have any questions regarding service billing, cancelations, or file access, please
        contact our accounts team at{" "}
        <a href="mailto:prohealthdigitalllc@outlook.com">prohealthdigitalllc@outlook.com</a>.
      </p>
    </LegalPage>
  ),
});
