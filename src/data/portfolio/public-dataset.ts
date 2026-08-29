import instruments from "./instruments.json";

import { portfolioDatasetSchema } from "@/domain/portfolio/schemas";

export const publicPortfolioDataset = portfolioDatasetSchema.parse({
  instruments,
  snapshots: [],
  transactions: [],
});
