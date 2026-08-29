---
title: Financial and Journal Data Contracts
status: accepted
updated: 2026-08-27
domain_language: ../CONTEXT.md
architecture_source: ./architecture.md
---

# Financial and Journal Data Contracts

## 1. Purpose

These contracts keep imported financial facts separate from the author's decisions, reflections, plans, and research. They are the conceptual source for the Zod schemas and inferred TypeScript types that will be created during application scaffolding.

The contracts prioritize auditability and honest missing data over convenience.

## 2. Contract rules

- Stable IDs, not tickers or display names, connect records.
- Monetary values enter source data as decimal strings with ISO 4217 currency codes.
- Dates use ISO 8601 strings and never rely on locale-formatted input.
- Financial facts are never embedded in prose as the only source of truth.
- Journal interpretation is never written back into imported financial records.
- Percentages, P&L, and portfolio weights are derived rather than independently edited.
- Planned investments and research interests never appear in current-holding totals.
- Unknown values are omitted or explicitly `null`; zero is not a substitute for unknown.
- A snapshot does not imply transactions that were not supplied.

## 3. Shared scalar contracts

```ts
type InstrumentId = string;
type SnapshotId = string;
type TransactionId = string;
type DecisionId = string;
type ReflectionId = string;

type ISODate = `${number}-${number}-${number}`;
type ISODateTime = string;
type CurrencyCode = string; // validated against supported ISO 4217 codes
type DecimalString = string; // canonical base-10 decimal, never exponent notation

type Money = {
  amount: DecimalString;
  currency: CurrencyCode;
};
```

Validation accepts only canonical decimal strings such as `"1250"`, `"1250.50"`, or `"0.0042"`. It rejects commas, currency symbols, exponent notation, `NaN`, and `Infinity`.

Arithmetic uses a decimal library or integer-minor-unit strategy inside the domain layer. JavaScript floating-point arithmetic must not directly calculate persisted or displayed financial results.

## 4. Instrument

An Instrument identifies what can be owned. It contains no quantity, cost basis, market value, strategy bucket, or journal prose.

```ts
type Instrument = {
  id: InstrumentId;
  name: string;
  symbol?: string;
  isin?: string;
  instrumentType: "equity" | "etf" | "mutual_fund";
  listingCountry: string;       // ISO 3166-1 alpha-2
  exchange?: string;
  tradingCurrency: CurrencyCode;
  sector?: string;
};
```

Rules:

- `id` is a stable project identifier such as `nvidia` or `uti-nifty-50-index-fund`.
- `symbol` is optional because not every mutual fund has a useful exchange ticker.
- Symbols are not globally unique; identity must include the stable ID and listing context.
- `instrumentType` describes the Instrument, not the author's strategy.
- Do not introduce another type until real data requires it.

## 5. Portfolio Snapshot

A Portfolio Snapshot is the authoritative V1 record of the portfolio at a stated time.

```ts
type PortfolioSnapshot = {
  id: SnapshotId;
  asOf: ISODate;
  baseCurrency: CurrencyCode;
  completeness: "complete" | "partial";
  fxRates: FxRate[];
  holdings: HoldingSnapshot[];
  source: SnapshotSource;
};

type FxRate = {
  fromCurrency: CurrencyCode;
  toCurrency: CurrencyCode;
  rate: DecimalString;
  asOf: ISODate;
  sourceLabel: string;
};

type SnapshotSource = {
  kind: "manual" | "tickertape_export" | "other_export";
  importedAt: ISODateTime;
  label?: string;
};
```

Rules:

- `asOf` is required even for the latest snapshot. The UI says `as of`, never simply `current`, when displaying values.
- `baseCurrency` defines combined portfolio views.
- Every required currency conversion is stored with the snapshot so a historical view cannot change when today's FX rate changes.
- `complete` means the author has confirmed that all in-scope holdings are included.
- `partial` means absence cannot be interpreted as sale, exit, or zero ownership.
- Source labels must not contain account numbers, local paths, or personal identifiers.

## 6. Holding Snapshot

A Holding Snapshot records real ownership of one Instrument inside one Portfolio Snapshot.

```ts
type StrategyBucket = "core" | "thematic" | "experimental";

type HoldingSnapshot = {
  instrumentId: InstrumentId;
  quantity: DecimalString;
  averageUnitCost?: Money;
  costBasis: Money;
  marketValue: Money;
  strategyBucket: StrategyBucket;
  heldSince?: ISODate;
  sourceRef?: string;
};
```

Rules:

- `quantity` must be greater than zero. Short positions are outside V1.
- `costBasis` and `marketValue` must be non-negative and use the Instrument's trading currency unless a source-specific normalization is explicitly documented.
- `strategyBucket` belongs here because the author's classification can change across snapshots.
- `heldSince` stays absent when not supported by real history.
- Do not infer a sale when a Holding is absent from a partial snapshot.
- An exited-holding feature requires explicit supporting history; it must not be derived from absence alone.

Derived values:

```text
unrealized P&L = market value - cost basis
unrealized P&L % = unrealized P&L / cost basis
base-currency value = local market value converted with snapshot FX
portfolio weight = base-currency value / total base-currency portfolio value
```

If cost basis is zero or unknown, percentage P&L is unavailable rather than infinite or zero.

## 7. Transaction

Transactions are optional in V1 because the available exports may provide only snapshots.

```ts
type Transaction = {
  id: TransactionId;
  instrumentId: InstrumentId;
  occurredAt: ISODateTime;
  transactionType: "buy" | "sell";
  quantity: DecimalString;
  unitPrice: Money;
  fees?: Money;
  sourceRef?: string;
};
```

Rules:

- Only store transactions supported by a real source or author-confirmed record.
- Do not reverse-engineer buys or sells from differences between snapshots.
- Add dividends, splits, transfers, or other event types only when real data requires their behavior to be specified.
- A repeated buy references the same Instrument and produces another Transaction; it does not create another Instrument.

## 8. Investment Decision

An Investment Decision captures what the author chose or believed at the time. It may reference an Instrument, a Holding, or a broader strategy.

```ts
type InvestmentDecision = {
  id: DecisionId;
  decidedOn?: ISODate;
  subject:
    | { kind: "instrument"; instrumentId: InstrumentId }
    | { kind: "strategy"; strategyKey: string };
  decisionType: "buy" | "sell" | "hold" | "avoid" | "allocate" | "research";
  strategyBucketAtTime?: StrategyBucket;
  confidence: "low" | "medium" | "high" | "unknown";
  why: string;
  whatIKnewAtTheTime?: string;
  whatIDidNotUnderstand?: string;
  expectation?: string;
  relatedTransactionIds?: TransactionId[];
};
```

Rules:

- `decidedOn` stays absent when the real date is unknown.
- A Decision may exist without a Transaction, such as deciding not to buy.
- A Transaction may exist without a documented Decision when historical reasoning was not captured.
- `confidence` is qualitative to avoid invented numerical precision.
- Later knowledge never edits `whatIKnewAtTheTime`; it belongs in a Reflection.

## 9. Reflection

A Reflection is a dated reassessment. Multiple Reflections may point to one Decision.

```ts
type Reflection = {
  id: ReflectionId;
  decisionId?: DecisionId;
  instrumentId?: InstrumentId;
  reflectedOn: ISODate;
  whatActuallyHappened?: string;
  mistake?: string;
  learning: string;
  wouldChooseAgain: "yes" | "no" | "unsure" | "not_applicable";
};
```

Rules:

- A Reflection must reference a Decision, an Instrument, or both.
- When both dates are known, `reflectedOn` cannot precede `decidedOn`.
- A profitable outcome may still identify weak reasoning.
- A losing outcome is not automatically labelled a mistake.
- New Reflections append history; they do not overwrite earlier ones.

## 10. Investment Plan and Research Interest

Plans and research are intentionally separate from portfolio facts.

```ts
type InvestmentPlan = {
  id: string;
  createdOn?: ISODate;
  instrumentId?: InstrumentId;
  subject: string;
  intendedBucket?: StrategyBucket;
  status: "considering" | "adopted" | "abandoned" | "paused";
  rationale?: string;
};

type ResearchInterest = {
  id: string;
  subject: string;
  startedOn?: ISODate;
  status: "active" | "paused" | "closed";
  instrumentIds?: InstrumentId[];
};
```

Rules:

- A Plan becoming `adopted` still does not create a Holding; real portfolio evidence does.
- A Research Interest may mention Instruments without implying intent to buy.
- Neither contract is included in invested amount, portfolio value, P&L, or allocation.

## 11. Authored content files

Journal content should use validated frontmatter plus Markdown/MDX body content.

Recommended locations:

```text
src/content/investments/<slug>.mdx
src/content/learnings/<slug>.mdx
src/content/build/<slug>.mdx
```

Common frontmatter:

```ts
type ContentMeta = {
  slug: string;
  title: string;
  summary: string;
  publishedOn?: ISODate;
  updatedOn?: ISODate;
  status: "draft" | "published";
};
```

An investment story may reference one or more Decision and Reflection IDs. The body controls narrative composition but does not replace the referenced structured records.

## 12. Derived view models

Derived models are created by pure functions after validation. They are not persisted as competing sources of truth.

Initial selectors:

- latest complete Portfolio Snapshot
- holdings by geography
- holdings by Instrument type
- holdings by Strategy Bucket
- local and base-currency portfolio totals
- P&L by Holding and portfolio
- allocation change between two complete snapshots
- strategy-bucket change for one Instrument across snapshots
- published Investment Stories with referenced facts
- Decisions awaiting a later Reflection

Every selector must define its behavior for partial snapshots and missing fields.

## 13. Validation invariants

Build validation must reject:

- duplicate IDs
- references to unknown Instruments, Decisions, Transactions, or snapshots
- malformed dates, currencies, and decimal strings
- negative Holding quantities or values
- zero or negative FX rates
- duplicate Instrument entries within one snapshot
- inconsistent currencies inside one monetary field
- a Reflection dated before its Decision when both dates are known
- planned or research records inserted into snapshot holdings
- a complete multi-currency snapshot without required FX rates

Build validation must warn, rather than fabricate, when:

- a ticker is absent
- held-since date is unknown
- transaction history is missing
- cost basis is unavailable
- a snapshot is explicitly partial
- a Decision has not yet received a Reflection

## 14. Edge-case scenarios

### Repeat purchase

The author buys NVIDIA twice at different prices. There is one Instrument, two supported Transactions if history exists, and one Holding Snapshot containing the source-confirmed aggregate quantity and cost basis.

### Full exit

NVIDIA is absent from a later partial snapshot. The system does not call it exited. An exited state requires a complete snapshot plus explicit history or another author-confirmed financial fact.

### Re-entry

The author sells an Instrument and buys it again later. The Instrument identity remains stable. Transactions and dated snapshots preserve the ownership gaps; journal Decisions remain separate.

### Planned thematic exposure

UFO appears in an Investment Plan and a Research Interest but not in a Portfolio Snapshot. The website may discuss it, but it is excluded from holdings, allocation, and current-value totals.

### Strategy reclassification

A Holding begins as Experimental and later becomes Thematic. Each Holding Snapshot stores the classification at that date, so the evolution remains visible rather than rewriting the earlier state.

### Multi-currency portfolio

VOO is valued in USD and a Nifty 50 fund is valued in INR. Local values stay in their source currencies. Combined totals use the FX rate stored with that exact Portfolio Snapshot.

### Snapshot without transactions

A Tickertape export supplies quantity, cost basis, and value but no executed orders. The snapshot is accepted; no Transaction records are invented.

### Missing ticker

An Indian mutual fund has no useful exchange symbol. Its stable Instrument ID and name remain sufficient for relationships and display.

## 15. Import contract

Every source-specific importer should produce a normalized candidate plus a report containing:

- source type and non-sensitive label
- rows accepted
- rows rejected
- Instruments matched
- unknown Instruments requiring confirmation
- fields omitted because the source lacked them
- changes from the previous comparable snapshot

Importers must be deterministic: the same input and mapping configuration produce the same normalized output.

The importer never publishes automatically. A human reviews the diff before normalized data is committed.

## 16. Data privacy

Raw exports may contain information that is not needed by the product. Importers must remove:

- account and folio numbers
- legal names
- email addresses and phone numbers
- broker-specific private identifiers
- local filesystem paths
- unrelated cash or tax metadata unless a future product requirement explicitly needs it

Only the minimum facts required for the published journey belong in committed data.

## 17. Initial implementation order

1. Shared scalar and Money schemas.
2. Instrument schema and curated Instrument registry.
3. Portfolio Snapshot and Holding Snapshot schemas.
4. Decimal arithmetic and derived selectors.
5. Fixture-based importer contract.
6. Investment Decision and Reflection schemas.
7. Markdown/MDX frontmatter validation.
8. Page-specific view models.

Transaction support may remain schema-only until real transaction history is supplied.
