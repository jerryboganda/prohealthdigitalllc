import { createFileRoute } from "@tanstack/react-router";
import { handleInquiry } from "@/lib/inquiry.server";
export const Route = createFileRoute("/api/inquiries")({
  server: { handlers: { POST: ({ request }) => handleInquiry(request) } },
});
