import type { APIRoute } from "astro";
import { handleInquiry } from "../../lib/inquiry.server.ts";

export const POST: APIRoute = ({ request }) => handleInquiry(request);
