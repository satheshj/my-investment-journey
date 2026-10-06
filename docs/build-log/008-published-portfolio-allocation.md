---
title: Published portfolio allocation
date: 2026-08-30
status: complete
---

# Published portfolio allocation

## Outcome

The portfolio route now publishes the verified 26 August 2026 snapshot as allocation percentages. Four holdings are shown individually and summarized by strategy and geography. Quantities, prices, costs, balances, and profit or loss remain private.

## Data path

- Raw CSV exports remain in the ignored `docs/holdings/` directory.
- A deterministic importer recognizes the Tickertape mutual-fund export and the US portfolio export, verifies that their dates agree, and applies the reviewed instrument mappings.
- USD values are compared in INR using the latest available reference-rate input before the snapshot date.
- A largest-remainder allocation pass records percentages to two decimal places and guarantees that published holdings total exactly 100.00%.
- The committed publication artifact contains source fingerprints for regeneration checks but no private financial fields.

## Presentation

The page uses an asymmetric editorial layout rather than dashboard cards. A proportional allocation band establishes the whole, followed by holding, strategy, and geography views. GSAP reveals the composition in reading order and returns a fully static layout when reduced motion is requested.

## Verification

- Re-running the importer produced the same artifact hash.
- The exported site contained zero matches for the private values selected from the source columns.
- All 25 unit and component tests passed.
- All 9 browser tests passed, including normal motion, reduced motion, and 320px and 640px layouts.
- Formatting, linting, TypeScript, and the Next.js static production build passed.
- Desktop and mobile full-page renders were inspected for hierarchy, clipping, and reading order.
