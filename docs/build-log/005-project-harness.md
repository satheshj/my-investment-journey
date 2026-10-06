# Project harness

## Goal

Turn the product, design, architecture, and domain decisions into a runnable application foundation with an enforceable quality baseline.

## Decisions

- Pinned Node.js 24.20.0 LTS in `.node-version`, `.nvmrc`, and `package.json`.
- Used exact dependency versions and the latest releases compatible with Next.js 16.
- Kept the initial route shell server-rendered and statically exportable.
- Used repository-local Fontsource packages for predictable typography.
- Added schema, calculation, component, navigation, and accessibility tests.
- Kept production portfolio data empty while using invented fixtures only in tests.

## Why

The site needs a trustworthy foundation before visual chapters and real content are introduced. Exact runtime and package versions make builds repeatable, while empty production data prevents private financial information from entering the public bundle accidentally.

## Rejected

- forcing unsupported ESLint 10 or TypeScript 7 peer combinations
- putting example financial records in production data files
- making the route shell client-rendered
- relying on a globally installed font
- accepting a build that only works on the original machine

## Implementation

Created the Next.js App Router scaffold, editorial route shell, design tokens, domain schemas, Decimal-based portfolio derivations, privacy-safe fixtures, and Vitest and Playwright verification harnesses.

## Verification

- Node.js 24.20.0 LTS and npm 12.0.2 are active.
- npm reports zero known vulnerabilities.
- Formatting, linting, strict TypeScript, and all 16 unit and component tests pass.
- Next.js generates all six application routes as static content.
- Foreground design tokens maintain at least a 5.16:1 contrast ratio on their intended light surfaces.
- The Playwright harness serves and navigates the production export, but Chromium exhausted memory during final browser verification in the Windows session used for the Node system upgrade. Rerun it from a fresh session.

## Learned

Next.js 16 currently constrains ESLint and TypeScript below their newest major releases. Selecting the newest compatible versions keeps the supported framework toolchain intact while the rest of the dependency graph stays current.

## Next

Build the homepage narrative chapters with real repository-backed content, then add portfolio visualizations against the validated domain model.
