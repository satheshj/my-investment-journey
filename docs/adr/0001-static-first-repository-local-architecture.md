---
status: accepted
---

# Use a static-first repository-local architecture for V1

My Investment Journey will use the current stable Next.js App Router with TypeScript and `output: "export"`. Curated portfolio data and authored content live in the repository and are validated at build time; only narrow interactive and motion-heavy regions become Client Components. This favors portable hosting, durable content, low operational complexity, and limited browser JavaScript over a runtime database, CMS, or fully client-rendered SPA. Moving to request-time data later remains possible, but it must be a deliberate architecture change because static export does not support runtime Next.js server features.

## Considered options

- A Vite React SPA would simplify browser-only development but weaken the server-first content boundary and require a separate prerendering strategy.
- Astro would provide excellent static content output, but the planned React-based narrative visualizations and coordinated scroll experiences would introduce additional island boundaries without enough V1 benefit.
- A runtime Next.js deployment would enable APIs and live data but add infrastructure that the product explicitly does not need yet.
