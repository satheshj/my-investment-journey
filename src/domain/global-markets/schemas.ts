import * as z from "zod";

import { isoDateTimeSchema, projectIdSchema } from "@/domain/shared/scalars";

export const globalMarketArticleSchema = z
  .object({
    id: projectIdSchema,
    title: z.string().trim().min(1),
    url: z.url().startsWith("https://"),
    source: z.string().trim().min(1),
    sourceRegion: z.string().trim().min(1),
    publishedAt: isoDateTimeSchema,
    topic: z.string().trim().min(1),
    keyNote: z.string().trim().min(1),
    notableFact: z.string().trim().min(1).nullable(),
    portfolioLens: z.string().trim().min(1),
  })
  .strict();

export const globalMarketDigestSchema = z
  .object({
    generatedAt: isoDateTimeSchema,
    cadence: z.literal("weekly"),
    coverage: z.literal("indian-and-global-markets"),
    sourceCount: z.number().int().positive(),
    articles: z.array(globalMarketArticleSchema).min(1).max(6),
  })
  .strict()
  .superRefine((digest, context) => {
    const uniqueSources = new Set(digest.articles.map((article) => article.source)).size;
    if (uniqueSources !== digest.sourceCount) {
      context.addIssue({
        code: "custom",
        message: "sourceCount must match the articles",
        path: ["sourceCount"],
      });
    }
  });

export type GlobalMarketDigest = z.infer<typeof globalMarketDigestSchema>;
