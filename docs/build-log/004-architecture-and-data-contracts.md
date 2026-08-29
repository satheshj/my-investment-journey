# Architecture and data contracts

## Goal

Define the V1 frontend architecture and a durable domain model before scaffolding application code.

## Decisions

- Selected a static-first Next.js App Router architecture with TypeScript.
- Kept repository-local data and content as build-time inputs.
- Reserved Client Components for focused interactions and motion.
- Separated Instrument identity from actual Holdings.
- Made dated Portfolio Snapshots authoritative for V1.
- Kept Transactions optional rather than inferring missing history.
- Separated financial facts from Decisions, Reflections, Plans, and Research Interests.
- Stored Strategy Bucket classification on each dated Holding Snapshot so it can evolve.
- Required explicit snapshot FX rates for combined multi-currency views.

## Why

The product is a public, read-heavy personal journal with a small number of sophisticated interactive sections. It does not need runtime infrastructure, but it does need reliable content, strong initial rendering, privacy boundaries, and deterministic financial calculations.

## Rejected

- treating one `asset` record as both Instrument identity and ownership
- live market data in V1
- a runtime database or CMS
- a fully client-rendered SPA
- reconstructing Transactions from snapshot differences
- placing planned investments in portfolio totals
- calculating money directly with JavaScript floating-point numbers

## Implementation

Created the domain glossary, frontend architecture, financial and journal data contracts, and three ADRs covering the high-cost decisions.

## Verification

- Tested the model against repeat purchases, full exits, re-entry, planned thematic exposure, strategy reclassification, multi-currency holdings, missing Transactions, and mutual funds without tickers.
- Verified static-export assumptions against current Next.js documentation.
- Verified Zod's current TypeScript and strict-mode requirements.
- Verified GSAP's responsive and reduced-motion cleanup model.

## Learned

The original `asset` concept carried too many responsibilities. Separating Instrument, Holding Snapshot, Decision, and Reflection creates a clearer system while allowing incomplete historical data to remain honest.

## Next

Scaffold the application, encode the first Zod schemas and design tokens, add privacy-safe fixtures, and establish the verification harness before building homepage chapters.
