import * as z from "zod";

const decimalPattern = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;
const currencyPattern = /^[A-Z]{3}$/;
const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDatePattern = /^(\d{4})-(\d{2})-(\d{2})$/;

function isRealIsoDate(value: string) {
  const match = isoDatePattern.exec(value);

  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function isPositiveDecimal(value: string) {
  return decimalPattern.test(value) && /[1-9]/.test(value);
}

export const projectIdSchema = z.string().min(1).regex(idPattern);
export const currencyCodeSchema = z.string().regex(currencyPattern);
export const decimalStringSchema = z.string().regex(decimalPattern);
export const positiveDecimalStringSchema = decimalStringSchema.refine(
  isPositiveDecimal,
  "Expected a decimal value greater than zero",
);
export const isoDateSchema = z.string().refine(isRealIsoDate, "Expected a real ISO date");
export const isoDateTimeSchema = z.string().datetime({ offset: true });

export type ProjectId = z.infer<typeof projectIdSchema>;
export type CurrencyCode = z.infer<typeof currencyCodeSchema>;
export type DecimalString = z.infer<typeof decimalStringSchema>;
export type ISODate = z.infer<typeof isoDateSchema>;
export type ISODateTime = z.infer<typeof isoDateTimeSchema>;
