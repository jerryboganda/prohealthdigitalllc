import nodemailer from "nodemailer";
import { createHash, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import { inquirySchema } from "./inquiry.ts";
import type { ProjectInquiry } from "./inquiry.ts";
import { EMAIL, ORIGIN } from "./content.ts";

type Sender = (inquiry: ProjectInquiry) => Promise<void>;
const counters = new Map<string, { count: number; expires: number }>();
const windowMs = 15 * 60 * 1000;
export function allowRequest(key: string, now = Date.now()): boolean {
  for (const [id, value] of counters) if (value.expires <= now) counters.delete(id);
  const existing = counters.get(key);
  if (existing) return ++existing.count <= 5;
  if (counters.size >= 10000) return false;
  counters.set(key, { count: 1, expires: now + windowMs });
  return true;
}
export function clientKey(request: Request, token = process.env.INQUIRY_PROXY_TOKEN): string {
  const supplied = request.headers.get("x-prohealth-proxy-token") || "";
  const verified =
    token &&
    Buffer.byteLength(supplied) === Buffer.byteLength(token) &&
    timingSafeEqual(Buffer.from(token), Buffer.from(supplied));
  const ip = request.headers.get("x-real-ip") || "";
  // Only the dedicated reverse proxy can authenticate this IP header. Never trust forwarded headers alone.
  return verified && isIP(ip) ? createHash("sha256").update(ip).digest("hex") : "untrusted-origin";
}
export async function sendInquiry(inquiry: ProjectInquiry): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_FROM } = process.env;
  const SMTP_PASS =
    process.env.SMTP_PASS ||
    (process.env.SMTP_PASS_B64
      ? Buffer.from(process.env.SMTP_PASS_B64, "base64").toString("utf8")
      : undefined);
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || SMTP_FROM !== EMAIL)
    throw new Error("mail_configuration");
  const port = Number(SMTP_PORT || "465");
  if (![465, 587].includes(port)) throw new Error("mail_configuration");
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const result = await transporter.sendMail({
      from: { name: "ProHealth Digital website", address: EMAIL },
      to: EMAIL,
      replyTo: inquiry.email,
      subject: `Business inquiry: ${inquiry.engagement} (${inquiry.locale})`,
      text: [
        `Name: ${inquiry.name}`,
        `Work email: ${inquiry.email}`,
        `Organization: ${inquiry.organization}`,
        `Organization type: ${inquiry.organizationType}`,
        `Engagement: ${inquiry.engagement}`,
        `Stage: ${inquiry.stage}`,
        `Country: ${inquiry.country}`,
        `Time zone: ${inquiry.timezone}`,
        `Preferred language: ${inquiry.language}`,
        `Budget: ${inquiry.budget}`,
        `Source: ${inquiry.source}`,
        `Website locale: ${inquiry.locale}`,
        "Privacy acknowledged: yes",
        "",
        "Customer brief:",
        inquiry.brief,
      ].join("\n"),
    });
    if (
      !result.accepted.some(
        (address: string | { address: string }) =>
          (typeof address === "string" ? address : address.address) === EMAIL,
      )
    )
      throw new Error("mail_rejected");
  } finally {
    transporter.close();
  }
}
const response = (status: number, code: string, extraHeaders?: Record<string, string>) =>
  Response.json({ code }, { status, headers: { "Cache-Control": "no-store", ...extraHeaders } });
export async function handleInquiry(
  request: Request,
  send: Sender = sendInquiry,
): Promise<Response> {
  const origin = request.headers.get("origin");
  const allowed =
    origin === ORIGIN ||
    (process.env.NODE_ENV !== "production" && origin === new URL(request.url).origin);
  if (!allowed) return response(403, "origin");
  if (!allowRequest(clientKey(request))) {
    console.info("inquiry", { outcome: "rate_limited" });
    return response(429, "rate_limit", { "Retry-After": "900" });
  }
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return response(415, "format");
  // Read incrementally to bound memory even with chunked transfer or a false Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return response(400, "validation");
  let raw = "";
  let size = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) {
        await reader.cancel();
        return response(413, "too_large");
      }
      raw += decoder.decode(value, { stream: true });
    }
    raw += decoder.decode();
    const result = inquirySchema.safeParse(JSON.parse(raw));
    if (!result.success || result.data.website) return response(400, "validation");
    const inquiry = result.data;
    try {
      await send(inquiry);
      console.info("inquiry", {
        outcome: "accepted",
        audience: inquiry.organizationType,
        engagement: inquiry.engagement,
        language: inquiry.language,
        source: inquiry.source,
      });
      return response(200, "accepted");
    } catch {
      console.error("inquiry", {
        outcome: "delivery_failed",
        engagement: inquiry.engagement,
        language: inquiry.language,
        source: inquiry.source,
      });
      return response(503, "delivery_failed");
    }
  } catch {
    return response(400, "validation");
  }
}
