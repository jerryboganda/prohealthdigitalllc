import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const engagementIds = [
  "digital-presence",
  "care-workflows",
  "platform-launch",
  "platform-improvement",
] as const;
const base = z.object({
  title: z.string().min(10).max(90),
  description: z.string().min(70).max(165),
  published: z.coerce.date(),
  updated: z.coerce.date(),
  audience: z.enum(["providers", "digital-health-companies", "both"]),
  engagements: z.array(z.enum(engagementIds)).default([]),
  summary: z.array(z.string()).min(2).max(5),
});
const pattern = "{en,ar}/*.{md,mdx}";
export const collections = {
  insights: defineCollection({
    loader: glob({ base: "./src/content/insights", pattern }),
    schema: base.extend({ topic: z.string() }),
  }),
  resources: defineCollection({
    loader: glob({ base: "./src/content/resources", pattern }),
    schema: base.extend({ kind: z.enum(["checklist", "guide"]) }),
  }),
};
