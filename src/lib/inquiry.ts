import { z } from "zod";
const bounded = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(min)
    .max(max)
    .refine((v) =>
      [...v].every((c) => c.charCodeAt(0) >= 32 || [9, 10, 13].includes(c.charCodeAt(0))),
    );
export const inquirySchema = z
  .object({
    name: bounded(2, 100),
    email: z.string().trim().email().max(254),
    organization: bounded(2, 150),
    organizationType: z.enum(["provider", "digital-health", "other"]),
    engagement: z.enum([
      "digital-presence",
      "care-workflows",
      "platform-launch",
      "platform-improvement",
      "not-sure",
    ]),
    stage: z.enum(["exploring", "planning", "building", "live"]),
    country: bounded(2, 100),
    timezone: bounded(2, 100),
    brief: bounded(20, 3000),
    language: z.enum(["en", "ar"]),
    locale: z.enum(["en", "ar"]),
    budget: z.enum(["not-sure", "discuss"]).default("not-sure"),
    consent: z.literal(true),
    website: z.string().max(200).default(""),
    source: z
      .string()
      .max(200)
      .regex(/^\/(?!\/)[a-zA-Z0-9/_-]*$/),
  })
  .strict();
export type ProjectInquiry = z.infer<typeof inquirySchema>;
