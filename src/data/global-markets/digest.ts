import digestJson from "./weekly-digest.json";

import { globalMarketDigestSchema } from "@/domain/global-markets/schemas";

export const globalMarketDigest = globalMarketDigestSchema.parse(digestJson);
