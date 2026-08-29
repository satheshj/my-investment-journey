import * as z from "zod";

import { strategyBucketSchema } from "@/domain/portfolio/schemas";
import { isoDateSchema, projectIdSchema } from "@/domain/shared/scalars";

const instrumentSubjectSchema = z
  .object({
    kind: z.literal("instrument"),
    instrumentId: projectIdSchema,
  })
  .strict();

const strategySubjectSchema = z
  .object({
    kind: z.literal("strategy"),
    strategyKey: projectIdSchema,
  })
  .strict();

export const investmentDecisionSchema = z
  .object({
    id: projectIdSchema,
    decidedOn: isoDateSchema.optional(),
    subject: z.discriminatedUnion("kind", [
      instrumentSubjectSchema,
      strategySubjectSchema,
    ]),
    decisionType: z.enum(["buy", "sell", "hold", "avoid", "allocate", "research"]),
    strategyBucketAtTime: strategyBucketSchema.optional(),
    confidence: z.enum(["low", "medium", "high", "unknown"]),
    why: z.string().trim().min(1),
    whatIKnewAtTheTime: z.string().trim().min(1).optional(),
    whatIDidNotUnderstand: z.string().trim().min(1).optional(),
    expectation: z.string().trim().min(1).optional(),
    relatedTransactionIds: z.array(projectIdSchema).optional(),
  })
  .strict();

export const reflectionSchema = z
  .object({
    id: projectIdSchema,
    decisionId: projectIdSchema.optional(),
    instrumentId: projectIdSchema.optional(),
    reflectedOn: isoDateSchema,
    whatActuallyHappened: z.string().trim().min(1).optional(),
    mistake: z.string().trim().min(1).optional(),
    learning: z.string().trim().min(1),
    wouldChooseAgain: z.enum(["yes", "no", "unsure", "not_applicable"]),
  })
  .strict()
  .refine((reflection) => reflection.decisionId || reflection.instrumentId, {
    message: "A reflection must reference a decision, an instrument, or both",
  });

export const investmentPlanSchema = z
  .object({
    id: projectIdSchema,
    createdOn: isoDateSchema.optional(),
    instrumentId: projectIdSchema.optional(),
    subject: z.string().trim().min(1),
    intendedBucket: strategyBucketSchema.optional(),
    status: z.enum(["considering", "adopted", "abandoned", "paused"]),
    rationale: z.string().trim().min(1).optional(),
  })
  .strict();

export const researchInterestSchema = z
  .object({
    id: projectIdSchema,
    subject: z.string().trim().min(1),
    startedOn: isoDateSchema.optional(),
    status: z.enum(["active", "paused", "closed"]),
    instrumentIds: z.array(projectIdSchema).optional(),
  })
  .strict();

export const journalDatasetSchema = z
  .object({
    decisions: z.array(investmentDecisionSchema).default([]),
    reflections: z.array(reflectionSchema).default([]),
    plans: z.array(investmentPlanSchema).default([]),
    researchInterests: z.array(researchInterestSchema).default([]),
  })
  .strict()
  .superRefine((dataset, context) => {
    const decisionsById = new Map(
      dataset.decisions.map((decision) => [decision.id, decision]),
    );

    dataset.reflections.forEach((reflection, index) => {
      if (!reflection.decisionId) {
        return;
      }

      const decision = decisionsById.get(reflection.decisionId);

      if (!decision) {
        context.addIssue({
          code: "custom",
          message: `Unknown decision ${reflection.decisionId}`,
          path: ["reflections", index, "decisionId"],
        });
        return;
      }

      if (decision.decidedOn && reflection.reflectedOn < decision.decidedOn) {
        context.addIssue({
          code: "custom",
          message: "A reflection cannot predate its decision",
          path: ["reflections", index, "reflectedOn"],
        });
      }
    });
  });

export type InvestmentDecision = z.infer<typeof investmentDecisionSchema>;
export type Reflection = z.infer<typeof reflectionSchema>;
export type InvestmentPlan = z.infer<typeof investmentPlanSchema>;
export type ResearchInterest = z.infer<typeof researchInterestSchema>;
export type JournalDataset = z.infer<typeof journalDatasetSchema>;
