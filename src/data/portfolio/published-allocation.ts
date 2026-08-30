import allocationArtifact from "./published-allocation.json";
import instruments from "./instruments.json";

import { hydratePublishedAllocation } from "@/domain/portfolio/publication";

export const publishedPortfolioAllocation = hydratePublishedAllocation(
  allocationArtifact,
  instruments,
);
