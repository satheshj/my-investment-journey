import * as z from "zod";

import { currencyCodeSchema, decimalStringSchema } from "./scalars";

export const moneySchema = z
  .object({
    amount: decimalStringSchema,
    currency: currencyCodeSchema,
  })
  .strict();

export type Money = z.infer<typeof moneySchema>;
