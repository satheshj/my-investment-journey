---
status: accepted
---

# Separate financial facts from journal interpretation

Instrument identity, dated holdings, valuations, FX rates, and supported transactions are financial facts; decisions, expectations, mistakes, learnings, plans, and research are journal interpretation. They use separate contracts and connect only through stable IDs. This prevents imported reports from becoming a content store, preserves what the author knew at each point in time, and stops later reflections from rewriting historical portfolio facts.

## Consequences

The application needs a small view-model layer to compose facts and narrative for publication. That extra structure is intentional: it allows one Instrument to have multiple Decisions and Reflections, lets Strategy Buckets change over time, and ensures plans or research never appear as current holdings.
