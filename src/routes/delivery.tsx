import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Digital Product & Service Delivery Policy — ProHealth Digital" },
      {
        name: "description",
        content:
          "Digital product file delivery formats, download limits, custom service development milestones, and codebase handover protocols of ProHealth Digital LLC.",
      },
      {
        property: "og:title",
        content: "Digital Product & Service Delivery Policy — ProHealth Digital",
      },
      {
        property: "og:description",
        content:
          "Policy details covering custom software staging runs, production deployments, and direct download toolkit deliveries.",
      },
      { property: "og:url", content: "/delivery" },
    ],
    links: [{ rel: "canonical", href: "/delivery" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Digital Product & Service Delivery Policy"
      intro="This digital product & service delivery policy outlines the delivery processes, fulfillment timelines, staging reviews, and final codebase handover procedures for all digital assets and custom engineering services provided by ProHealth Digital LLC."
      updated="25 July 2026"
    >
      <h2>1. General overview</h2>
      <p>
        ProHealth Digital LLC (&ldquo;ProHealth Digital&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;) is dedicated to high-standard, structured delivery. Because we build
        custom web applications, LMS portals, and supply digital toolkits, our delivery framework is
        separated into two categories: instant digital product fulfillment and iterative custom
        software delivery.
      </p>

      <h2>2. Digital product fulfillment</h2>
      <p>
        When you purchase our pre-built digital products, playbooks, Notion frameworks, or Figma
        toolkits:
      </p>
      <ul>
        <li>
          <strong>Fulfillment Time:</strong> Delivery is processed automatically. Upon successful
          payment clearance, a secure access portal containing download links is rendered on the
          screen, and a duplicate receipt with file links is sent to your registered email address
          within 10 minutes.
        </li>
        <li>
          <strong>File Formats:</strong> Products are delivered as downloadable archives (.zip),
          link invitations to shared Notion workspaces, or read-only duplicate links to Figma design
          boards.
        </li>
        <li>
          <strong>Download Limits:</strong> Direct file links are valid for a minimum of 180 days
          from the purchase date and support up to 5 concurrent downloads to protect intellectual
          property. If you need link extensions, contact our support team.
        </li>
      </ul>

      <h2>3. Custom service delivery framework</h2>
      <p>
        Custom design, software engineering, and digital growth consulting services are delivered
        iteratively:
      </p>
      <ul>
        <li>
          <strong>Sprint-Based Delivery:</strong> We work in weekly sprints. Every Monday, we align
          on goals for the week. Every Friday, we deploy a compiled, working build to a secure
          staging environment (e.g. staging.yourdomain.com) for your team to test.
        </li>
        <li>
          <strong>Client Check-ins:</strong> Clients receive a weekly video update or written report
          summarizing the sprint progress, technical blocks resolved, and tasks scheduled for the
          next sprint.
        </li>
        <li>
          <strong>Production Deployment:</strong> Once a milestone phase or complete codebase is
          signed off, we handle the production deployment to your designated cloud provider (such as
          Vercel, Netlify, or Cloudflare Workers) as detailed in your scope of work.
        </li>
      </ul>

      <h2>4. Codebase ownership and handover</h2>
      <p>Upon project completion and final invoice clearance:</p>
      <ul>
        <li>
          We transfer 100% intellectual property ownership of the custom codebase to your designated
          GitHub or GitLab repository.
        </li>
        <li>
          We deliver a comprehensive project documentation file containing setup guides, environment
          variables, API schemas, and architecture summaries.
        </li>
        <li>
          We conduct a live recorded handover training session to ensure your internal operators or
          third-party maintainers can manage the platform independently.
        </li>
      </ul>

      <h2>5. Delivery exceptions</h2>
      <p>
        Custom service delivery timelines are dependent on prompt client feedback, content delivery,
        and third-party API credentials provision. We are not responsible for delivery delays
        resulting from EMR/EHR provider locks, payment gateway verification holds, or client
        response delays exceeding 3 business days.
      </p>

      <h2>6. Contact</h2>
      <p>
        If you have any questions regarding delivery statuses, custom sprint access, or digital file
        downloads, email our support team at{" "}
        <a href="mailto:prohealthdigitalllc@outlook.com">prohealthdigitalllc@outlook.com</a>.
      </p>
    </LegalPage>
  ),
});
