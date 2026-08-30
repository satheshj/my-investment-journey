import { publishedPortfolioAllocation } from "@/data/portfolio/published-allocation";

export const startingContext = [
  {
    title: "Starting context",
    body: "Small starting amounts, Indian mutual funds, US equities, and US ETFs are part of the recorded context.",
  },
  {
    title: "Early structure",
    body: "Individual-stock experimentation came before a clearer approach to diversification and strategy classification.",
  },
  {
    title: "A public record",
    body: "Original assumptions stay visible when later thinking changes. Missing dates and values stay missing.",
  },
] as const;

export const portfolioPublication = {
  asOf: "26 August 2026",
  disclosure: "Allocation percentages only",
  hasPublishedSnapshot: publishedPortfolioAllocation.holdings.length > 0,
  hiddenFields: "Quantities, prices, cost basis, and monetary values",
  instrumentCount: publishedPortfolioAllocation.holdings.length,
  status: "Verified allocation published",
  verification: [
    "Snapshot date verified",
    "INR calculation basis recorded",
    "Source completeness confirmed",
  ],
} as const;

export const strategyProgression = [
  {
    title: "Experimentation",
    body: "Learning by starting small.",
  },
  {
    title: "Individual stocks",
    body: "Testing ideas one company at a time.",
  },
  {
    title: "Diversification",
    body: "Understanding the role of broader exposure.",
  },
  {
    title: "Core plus themes",
    body: "Separating durable exposure from focused research.",
  },
] as const;

export const strategyDirections = [
  {
    bucket: "Core market direction",
    status: "Strategy direction",
    items: ["Nifty 50", "Vanguard S&P 500 ETF (VOO)"],
  },
  {
    bucket: "Thematic research",
    status: "Research interest",
    items: ["Procure Space ETF (UFO)", "Indian defence and aerospace exposure"],
  },
] as const;

export const reflectionContract = [
  {
    title: "What I thought",
    body: "Record the original expectation before hindsight can improve it.",
  },
  {
    title: "What happened",
    body: "Connect the outcome to dated evidence and the information available at the time.",
  },
  {
    title: "What I learned",
    body: "Add the reflection without rewriting the first decision.",
  },
] as const;

export const learningTopics = [
  {
    title: "Diversification",
    body: "How broad-market exposure changes the role of individual stocks.",
  },
  {
    title: "Index investing",
    body: "How Nifty 50 and VOO could support a long-term core allocation.",
  },
  {
    title: "Thematic risk",
    body: "How to research space and defence exposure without confusing interest with conviction.",
  },
  {
    title: "Evidence discipline",
    body: "How to separate current holdings, planned strategy, and research ideas.",
  },
] as const;

export const buildMilestones = [
  {
    title: "Design system",
    evidence:
      "Selected a warm editorial direction, defined accessible tokens, and limited visual intensity to meaningful chapters.",
  },
  {
    title: "Architecture and contracts",
    evidence:
      "Separated instrument identity, dated holdings, financial facts, and append-only journal interpretation.",
  },
  {
    title: "Project harness",
    evidence:
      "Pinned the runtime, established privacy-safe fixtures, and made formatting, types, tests, and static builds enforceable.",
  },
] as const;

export const closingRoutes = [
  {
    href: "/portfolio/",
    label: "View portfolio",
    body: "Published holdings and allocation context.",
  },
  {
    href: "/learnings/",
    label: "Read learnings",
    body: "Reflections that have enough evidence to publish.",
  },
  {
    href: "/build-log/",
    label: "Read build log",
    body: "Product and engineering decisions behind the interface.",
  },
  {
    href: "/about/",
    label: "About the project",
    body: "Context, boundaries, and the purpose of this public record.",
  },
] as const;
