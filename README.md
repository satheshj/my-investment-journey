# My Investment Journey

A public learning journal and frontend engineering portfolio built from the product brief in [PRODUCT.md](./PRODUCT.md).

## Prerequisites

- Node.js 24.20.0 LTS
- npm 12.0.2

The pinned runtime is recorded in both `.node-version` and `.nvmrc`.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run check
npm run test:e2e
```

The main `check` command formats, lints, type-checks, unit-tests, and creates the static production export. Playwright rebuilds and tests that export separately because it requires a local browser binary.

## Project references

- [Product brief](./PRODUCT.md)
- [Design system](./docs/design.md)
- [Architecture](./docs/architecture.md)
- [Domain context](./CONTEXT.md)
- [Data contracts](./docs/data-contracts.md)
