import test from "node:test";
import assert from "node:assert/strict";
import { inquirySchema } from "../src/lib/inquiry.ts";
import { handleInquiry, clientKey, allowRequest, sendInquiry } from "../src/lib/inquiry.server.ts";
import { engagements, projects, policies } from "../src/lib/content.ts";
import type { ProjectInquiry } from "../src/lib/inquiry.ts";
const valid: ProjectInquiry = {
  name: "Synthetic verification",
  email: "qa@example.com",
  organization: "Website acceptance test",
  organizationType: "provider",
  engagement: "care-workflows",
  stage: "planning",
  country: "United Kingdom",
  timezone: "Europe/London",
  brief: "Synthetic inquiry to verify the website delivery flow. No patient data.",
  language: "en",
  locale: "en",
  budget: "not-sure",
  consent: true,
  website: "",
  source: "/solutions/care-workflows",
};
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("https://prohealthdigitalllc.com/api/inquiries", {
    method: "POST",
    headers: {
      origin: "https://prohealthdigitalllc.com",
      "content-type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}
test("all bilingual content fields are present and nonempty", () => {
  function visit(value: unknown) {
    if (value && typeof value === "object") {
      if ("en" in value || "ar" in value) {
        const v = value as Record<string, string>;
        assert.ok(v.en?.trim());
        assert.ok(v.ar?.trim());
      } else for (const item of Object.values(value)) visit(item);
    }
  }
  visit({ engagements, projects, policies });
});
test("schema rejects invalid email, selections, missing consent, short brief, injection and oversized fields", () => {
  assert.equal(inquirySchema.safeParse(valid).success, true);
  for (const patch of [
    { email: "invalid" },
    { organizationType: "unknown" },
    { engagement: "checkout" },
    { consent: false },
    { brief: "short" },
    { name: "x".repeat(101) },
    { email: "qa@example.com\r\nBcc: leak@example.com" },
    { source: "//external.com" },
    { name: "\u0000Test" },
  ])
    assert.equal(inquirySchema.safeParse({ ...valid, ...patch }).success, false);
});
test("proxy identity ignores forged forwarded headers and non-ASCII authentication", () => {
  assert.equal(
    clientKey(request(valid, { "x-forwarded-for": "1.2.3.4", "x-real-ip": "1.2.3.4" }), "secret"),
    "untrusted-origin",
  );
  assert.equal(
    clientKey(
      request(valid, { "x-prohealth-proxy-token": "éééééé", "x-real-ip": "1.2.3.4" }),
      "secret",
    ),
    "untrusted-origin",
  );
  const a = clientKey(
    request(valid, { "x-prohealth-proxy-token": "secret", "x-real-ip": "1.2.3.4" }),
    "secret",
  );
  const b = clientKey(
    request(valid, { "x-prohealth-proxy-token": "secret", "x-real-ip": "1.2.3.5" }),
    "secret",
  );
  assert.notEqual(a, b);
  assert.notEqual(a, "untrusted-origin");
});
test("rate limits attempts and resets after its window", () => {
  for (let i = 0; i < 5; i++) assert.equal(allowRequest("rate-test", Date.now()), true);
  assert.equal(allowRequest("rate-test", Date.now()), false);
  assert.equal(allowRequest("rate-test", Date.now() + 900001), true);
});
test("endpoint does not accept a submission until delivery resolves, and returns failure on SMTP rejection/timeout", async () => {
  process.env.INQUIRY_PROXY_TOKEN = "test-proxy";
  let sequence = 1;
  const next = (body: unknown) =>
    request(body, {
      "x-prohealth-proxy-token": "test-proxy",
      "x-real-ip": `192.0.2.${sequence++}`,
    });
  let release!: () => void;
  let resolved = false;
  const pending = handleInquiry(
    next(valid),
    () =>
      new Promise<void>((r) => {
        release = r;
      }),
  ).then((r) => {
    resolved = true;
    return r;
  });
  await new Promise((r) => setTimeout(r, 15));
  assert.equal(resolved, false);
  release();
  assert.equal((await pending).status, 200);
  for (const message of ["SMTP rejected", "timeout"])
    assert.equal(
      (
        await handleInquiry(next(valid), async () => {
          throw new Error(message);
        })
      ).status,
      503,
    );
  let sends = 0;
  const send = async () => {
    sends++;
  };
  assert.equal(
    (await handleInquiry(next({ ...valid, website: "spam.example" }), send)).status,
    400,
  );
  assert.equal((await handleInquiry(next({ ...valid, email: "invalid" }), send)).status, 400);
  assert.equal(
    (await handleInquiry(next({ ...valid, brief: "x".repeat(17000) }), send)).status,
    413,
  );
  assert.equal(
    (await handleInquiry(request(valid, { origin: "https://evil.example" }), send)).status,
    403,
  );
  const headers = { "x-prohealth-proxy-token": "test-proxy", "x-real-ip": "192.0.2.100" };
  for (let i = 0; i < 5; i++)
    assert.equal((await handleInquiry(request(valid, headers), send)).status, 200);
  const limited = await handleInquiry(request(valid, headers), send);
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get("retry-after"), "900");
  assert.equal(sends, 5);
});
test("mail configuration fails closed without credentials", async () => {
  const saved = process.env.SMTP_PASS;
  const savedB64 = process.env.SMTP_PASS_B64;
  delete process.env.SMTP_PASS;
  delete process.env.SMTP_PASS_B64;
  await assert.rejects(() => sendInquiry(valid), /mail_configuration/);
  if (saved) process.env.SMTP_PASS = saved;
  if (savedB64) process.env.SMTP_PASS_B64 = savedB64;
});
