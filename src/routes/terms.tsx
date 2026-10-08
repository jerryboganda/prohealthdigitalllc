import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — ProHealth Digital" },
      {
        name: "description",
        content:
          "The terms governing use of the ProHealth Digital website and engagement with ProHealth Digital LLC.",
      },
      { property: "og:title", content: "Terms & Conditions — ProHealth Digital" },
      {
        property: "og:description",
        content: "Terms of use for the ProHealth Digital website and services.",
      },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="These terms & conditions govern your use of the ProHealth Digital website. By accessing this site or engaging our services, you agree to them."
      updated="24 July 2026"
    >
      <h2>1. Definitions</h2>
      <p>
        &ldquo;ProHealth Digital&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo;
        refer to ProHealth Digital LLC, a company registered in the United States. &ldquo;You&rdquo;
        refers to any visitor or client using this website or engaging our services.
      </p>

      <h2>2. Use of the website</h2>
      <p>
        You agree to use the website only for lawful purposes and in a way that does not infringe
        the rights of others. We reserve the right to restrict access at any time and for any
        reason.
      </p>

      <h2>3. Intellectual property</h2>
      <p>
        All content on this website — including copy, graphics, illustrations, code, and design — is
        the property of ProHealth Digital LLC unless otherwise credited. No content may be copied or
        reused without written permission.
      </p>

      <h2>4. Client engagements</h2>
      <p>
        All client work is governed by a separate written agreement setting out scope, pricing,
        timeline, and deliverables. Nothing on this website constitutes a binding offer.
      </p>

      <h2>5. Pricing</h2>
      <p>
        Prices displayed for packages and products are indicative and stated in US dollars, with EGP
        references provided for convenience. Final pricing is confirmed in your engagement contract.
      </p>

      <h2>6. No medical advice</h2>
      <p>
        ProHealth Digital provides digital, design, and strategic services. Nothing on this website
        constitutes medical, legal, or financial advice.
      </p>

      <h2>7. Third-party links</h2>
      <p>
        Our website may link to third-party sites. We are not responsible for the content or
        practices of those sites.
      </p>

      <h2>8. Acceptable Use Policy</h2>
      <p>
        By accessing this website, you agree not to engage in any activity that could disrupt,
        disable, overburden, or damage our systems or networks. This includes, but is not limited
        to, the propagation of malware, unauthorized automated scrapers, denial-of-service (DoS)
        attacks, or attempting to bypass security validation layers.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, ProHealth Digital LLC, its directors, officers,
        employees, and agents shall not be liable for any indirect, special, incidental, punitive,
        or consequential damages (including, without limitation, damages for loss of profits, clinic
        downtime, or loss of healthcare records) arising out of or in connection with the use or
        inability to use this website.
      </p>

      <h2>10. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless ProHealth Digital LLC and its officers,
        directors, and employees from and against any claims, liabilities, damages, judgments,
        awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out
        of or relating to your violation of these terms & conditions.
      </p>

      <h2>11. Governing Law & Jurisdictional Claims</h2>
      <p>
        These terms & conditions are governed by the laws of the State of Wyoming, USA, without
        regard to its conflict-of-laws principles. Any legal suit, action, or proceeding arising out
        of, or related to, these terms shall be instituted exclusively in the federal or state
        courts located in Wyoming, USA.
      </p>

      <h2>12. Changes</h2>
      <p>
        We may update these terms from time to time. The version published on this page is the
        current one, and your continued use of the website following any updates indicates your
        consent to the changes.
      </p>

      <h2>13. Contact</h2>
      <p>
        Questions about these terms & conditions should be sent directly to our team at{" "}
        <a href="mailto:prohealthdigitalllc@outlook.com">prohealthdigitalllc@outlook.com</a>.
      </p>
    </LegalPage>
  ),
});
