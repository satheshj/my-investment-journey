---
title: Public portfolio publishes allocation percentages only
status: accepted
date: 2026-08-30
---

# Public portfolio publishes allocation percentages only

## Context

The product needs enough real portfolio information to explain diversification and strategy without publishing account-scale monetary information.

## Decision

The public portfolio displays allocation percentages derived from a verified dated snapshot. It may identify published holdings and their strategy classifications, but it does not display quantities, prices, cost basis, market values, invested totals, or profit and loss amounts.

Private source data may retain the monetary facts required to calculate accurate cross-currency allocations. Those facts do not cross into public view models or client component props.

## Consequences

- Every public allocation view includes an `as of` date and completeness context.
- Allocation percentages are derived from validated base-currency values and are never edited independently.
- Public percentages may reveal relative concentration but not account size.
- Performance reporting requires a separate future privacy decision.
- Tests must reject public view models that expose private monetary fields.
