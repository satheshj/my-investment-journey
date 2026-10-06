---
title: Frontend Architecture
status: accepted
updated: 2026-08-27
product_source: ../PRODUCT.md
design_source: ./design.md
domain_language: ../CONTEXT.md
data_contracts: ./data-contracts.md
---

# Frontend Architecture

## 1. Architecture summary

My Investment Journey will be a static-first Next.js application using the App Router and TypeScript. Product content and curated financial data live in the repository, are validated during the build, and render primarily through Server Components. Client Components are narrow interactive islands for portfolio exploration, accessible visualization controls, and the two signature scroll sequences.

V1 has no runtime database, authentication, brokerage connection, CMS, or live market-data service. A successful production build produces portable static HTML, CSS, JavaScript, and media assets.

## 2. Why this architecture fits

The product is public, read-heavy, content-led, and updated by the author rather than by many users. Static generation provides durable URLs, strong initial rendering, low operational complexity, and portable hosting. React remains useful for the high-value interactive sections, while Server Components keep non-interactive chapters out of the client bundle.

This split supports the product's central identity:

```text
repo-local financial facts + authored journal content
                         |
                         v
               build-time validation
                         |
                         v
              derived narrative models
                         |
                         v
          static pages + interactive islands
```

## 3. Technology baseline

Versions will be pinned in the lockfile when the application is scaffolded.

| Concern | Choice | Reason |
| --- | --- | --- |
| Framework | Current stable Next.js, App Router | Static routes, metadata, React composition, and selective client interactivity |
| Language | TypeScript with strict mode | Shared, explicit contracts from ingestion through presentation |
| Rendering | Static export with `output: "export"` | Portable hosting and no V1 runtime server |
| Validation | Zod 4 | Runtime validation plus inferred TypeScript types |
| Styling | CSS custom properties, global foundations, and CSS Modules | Direct implementation of `docs/design.md` without a generic component theme |
| Icons | `@phosphor-icons/react` | Required by the product and canonical design system |
| Visualization | D3 calculation modules with semantic React/SVG/HTML rendering | Bespoke narrative graphics without chart-library visual defaults |
| Signature motion | GSAP 3 with ScrollTrigger | Limited pin/scrub sequences with controlled cleanup and fallbacks |
| Unit tests | Vitest | Fast tests for parsers, validation, selectors, and financial derivations |
| Browser tests | Playwright plus an accessibility checker | Responsive, keyboard, motion, and critical-route verification |

The architecture does not adopt a general-purpose UI component kit. Reusable primitives should be built from the canonical design tokens and native semantics.

## 4. Rendering model

### Server-first by default

Pages, article content, static portfolio summaries, metadata, and non-interactive visual structures remain Server Components. They execute at build time in static-export mode and send rendered content without component-level client JavaScript.

### Client islands by exception

A component becomes a Client Component only when it needs at least one of:

- browser event state
- a portfolio filter or view switcher
- an accessible interactive chart control
- ResizeObserver or another browser measurement API
- GSAP lifecycle management

Do not mark an entire route as client-rendered to support one interactive chapter. Place the client boundary at the smallest stable component boundary.

### Progressive enhancement

The initial HTML must contain the chapter's complete meaning. Animation and interaction may reorganize, focus, or reveal that content, but must not be the only way to obtain it.

## 5. Proposed repository structure

```text
/
|-- CONTEXT.md
|-- PRODUCT.md
|-- docs/
|   |-- architecture.md
|   |-- data-contracts.md
|   |-- design.md
|   |-- holdings/                # local-only, gitignored raw exports
|   |-- adr/
|   `-- build-log/
|-- private/
|   `-- imports/                 # optional local-only import staging
|-- public/
|   |-- images/
|   `-- fonts/
|-- scripts/
|   |-- import-holdings.mjs
|   `-- portfolio-import.config.mjs
|-- src/
|   |-- app/
|   |   |-- page.tsx
|   |   |-- portfolio/
|   |   |-- learnings/
|   |   |-- build-log/
|   |   `-- about/
|   |-- components/
|   |   |-- editorial/
|   |   |-- portfolio/
|   |   |-- motion/
|   |   `-- ui/
|   |-- content/
|   |   |-- investments/
|   |   |-- learnings/
|   |   `-- build/
|   |-- data/
|   |   `-- portfolio/
|   |       |-- instruments.json
|   |       `-- published-allocation.json
|   |-- domain/
|   |   |-- portfolio/
|   |   `-- journal/
|   |-- lib/
|   |-- styles/
|   `-- types/
`-- tests/
    |-- fixtures/
    |-- unit/
    `-- e2e/
```

The exact component tree may evolve during implementation. The important boundaries are source data, domain logic, presentation, and motion.

## 6. Layer boundaries

### Source layer

Owns normalized JSON and authored Markdown/MDX. Source files contain facts or author-written content, not display-ready chart geometry.

### Domain layer

Owns schemas, parsing, financial arithmetic, status rules, snapshot comparison, and canonical terminology. It must not import React, browser APIs, or presentation tokens.

### View-model layer

Transforms validated domain records into section-specific structures such as geography allocation, strategy allocation, timeline steps, and narrative chart annotations. It must not mutate source records.

### Presentation layer

Owns semantic markup, responsive layout, design tokens, visualization rendering, and accessible controls. It consumes view models rather than recalculating finance rules inside components.

### Motion layer

Enhances already meaningful presentation. It may read rendered geometry and scroll progress, but it must not become the owner of financial state or narrative order.

## 7. Content architecture

### Structured financial data

Public Instrument facts and generated publication artifacts live under `src/data/portfolio/` and follow `docs/data-contracts.md`. Raw exports are read only by source-specific importers and never become runtime application inputs.

### Authored content

Investment decisions, reflections, learnings, and public build stories use Markdown or MDX with validated frontmatter. MDX is reserved for content that genuinely needs an approved interactive component; ordinary entries should remain Markdown-compatible.

### Internal build records

`docs/build-log/` remains the engineering record. Public build stories are separately curated under `src/content/build/`. The public site never reads raw transcripts or command history.

## 8. Data flow

```text
private raw export
       |
       v
source-specific parser
       |
       v
normalized candidate snapshot
       |
       v
Zod validation + domain invariants
       |
       v
percentage derivation + privacy projection
       |
       v
human review
       |
       v
committed Published Allocation Snapshot
       |
       v
page and visualization view models
```

The private normalized candidate remains local. The import workflow must stop before writing a publication artifact when validation fails. It must never silently coerce an unknown currency, instrument, strategy classification, or date into a plausible value.

## 9. State management

V1 does not need a global state library.

- Route and shareable filter state belongs in URL search parameters when practical.
- Ephemeral interaction state stays inside the smallest client island.
- Validated portfolio and content data are immutable inputs.
- Derived selectors are pure and deterministic.
- Motion progress is presentation state and must not leak into domain state.

If later requirements introduce cross-route editing, authentication, or live synchronized data, revisit this decision rather than stretching local state beyond its purpose.

## 10. Visualization architecture

D3 modules may calculate scales, paths, stacking, and interpolation, but React owns the markup. This preserves semantic control and makes the design system visible in the implementation rather than inheriting a chart library's dashboard defaults.

Every complex visualization should have three layers:

1. a static semantic summary rendered during the build
2. an enhanced interactive or animated visual
3. an accessible table or ordered detail view containing the same facts

Portfolio calculations happen before visualization. Chart components receive display-ready values and labels; they do not decide exchange rates, portfolio weights, or holding status.

## 11. Motion architecture

GSAP and ScrollTrigger are allowed only in the Portfolio Today, Strategy Evolution, and possibly How I Built This chapters identified by `docs/design.md`.

Implementation requirements:

- register plugins inside the client boundary
- scope selectors to the component root
- use `gsap.matchMedia()` for desktop, mobile, and reduced-motion conditions
- revert all contexts and remove custom listeners during cleanup
- avoid `ScrollTrigger.normalizeScroll()` because natural browser scrolling is a product requirement
- render the final meaningful state when JavaScript is unavailable or motion is reduced

Ordinary reveals and control feedback should use CSS when CSS is sufficient.

## 12. Routing and information architecture

V1 routes mirror the small sitemap:

| Route | Responsibility |
| --- | --- |
| `/` | Complete homepage narrative |
| `/portfolio` | Holdings, allocation views, and investment stories |
| `/learnings` | Genuine learning notes and reflections |
| `/build-log` | Curated public engineering stories |
| `/about` | Author context, project framing, and disclaimer |

Content-detail routes may be added only when real content outgrows these indexes. All dynamic content paths must be known and generated at build time.

## 13. Static-export constraints

The application must not depend on features that require a runtime Next.js server, including request-time cookies, Server Actions, request-dependent route handlers, or dynamic routes without generated parameters.

Consequences:

- portfolio updates require a new build and deployment
- forms must use an approved external service or a later architecture decision
- default server-side image optimization is unavailable in static-export mode; use correctly sized local assets or an explicitly configured loader
- preview/draft workflows remain repository-based for V1

These constraints are intentional and acceptable for the current product.

## 14. Privacy and source hygiene

- Raw brokerage or portfolio exports live under `docs/holdings/` or `private/imports/` and are gitignored.
- Importers remove account identifiers, names, email addresses, and irrelevant metadata.
- Private normalized candidates remain local. Only reviewed public Instrument facts and generated Published Allocation Snapshots may enter `src/data/portfolio/`.
- Source references stored in public data must be non-sensitive identifiers, never local absolute paths.
- Secrets and API keys never appear in content, fixtures, screenshots, build logs, or client bundles.
- Test fixtures use invented financial values and are labelled as fixtures; they must never appear as published portfolio data.

## 15. Testing strategy

### Unit tests

Cover:

- schema acceptance and rejection
- decimal arithmetic and currency conversion
- P&L and portfolio-weight derivations
- snapshot completeness behavior
- strategy changes across snapshots
- planned/research records excluded from holdings
- optional ticker handling for mutual funds
- missing transaction history without fabricated events

### Component tests

Cover keyboard interaction, visible focus, filter labeling, textual chart alternatives, empty states, and reduced-motion rendering.

### End-to-end tests

Cover all five routes, primary navigation, responsive layouts, 200% zoom, keyboard-only use, reduced motion, and the two signature desktop sequences.

### Build checks

The continuous verification path should include formatting, linting, TypeScript, unit tests, static build, link checks, and targeted accessibility checks.

## 16. Performance approach

- Keep the page server-rendered unless interaction requires a client boundary.
- Load GSAP and heavy visualization code only on routes or chapters that use them.
- Prefer local fonts with explicit subsets and disciplined weights.
- Size images for their rendered use and avoid shipping reference-board dimensions to production.
- Animate transform and opacity rather than layout properties where possible.
- Establish measured JavaScript and image budgets after the first representative homepage implementation rather than inventing arbitrary limits now.

## 17. Update workflow

1. Place a new export in an ignored private import directory.
2. Run the source-specific importer.
3. Review validation errors and the generated publication artifact.
4. Confirm new Instruments and strategy classifications manually.
5. Confirm that allocation totals and privacy checks pass.
6. Commit the Published Allocation Snapshot. Keep its monetary source local.
7. Add or update genuine decisions and reflections separately.
8. Run the complete verification path.
9. Deploy the new static build.

This keeps portfolio facts auditable while allowing the narrative to evolve at a different pace.

## 18. Explicit V1 exclusions

- runtime database
- authentication or user accounts
- live market prices
- brokerage synchronization
- editable admin interface
- complex CMS
- public comments
- recommendation engine
- stock screening
- portfolio simulation
- server-side personalization

## 19. Primary technical references

- [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js App Router glossary](https://nextjs.org/docs/app/glossary)
- [Zod documentation](https://zod.dev/)
- [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP responsive and reduced-motion contexts](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
