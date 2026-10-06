# My Investment Journey

A public learning journal and frontend engineering portfolio built from the product brief in [PRODUCT.md](./PRODUCT.md).

## Monthly portfolio sync

Replace one private Google Drive file named `portfolio-current.csv` before the 5th each month. The workflow runs at 09:17 and 18:17 IST on the 5th and commits only the public instrument catalog and allocation artifact after all checks pass. If Drive, validation, or exchange rates fail, the previous snapshot stays online.

Use this exact header and one row per instrument:

```csv
as_of,instrument_id,instrument_name,instrument_type,listing_country,trading_currency,market_value,strategy_bucket,symbol,exchange
2026-10-04,example-india-fund,Example India Fund,mutual_fund,IN,INR,12500.00,core,,
2026-10-03,example-us-stock,Example US Stock,equity,US,USD,240.50,experimental,EXM,NASDAQ
```

`market_value` is the **total current value** in its row's currency, written as a positive decimal without separators or currency symbols. `as_of` uses `YYYY-MM-DD` and must be within seven days before the run. `instrument_id` is a stable lowercase hyphenated ID. Valid types are `equity`, `etf`, and `mutual_fund`; valid buckets are `core`, `thematic`, and `experimental`. `symbol` and `exchange` may be blank. If one instrument appears at multiple brokers, sum it into one row. Do not add PAN, account IDs, quantities, or cost basis. An LLM can help merge exports, but review the spreadsheet before upload: the CSV is authoritative, including for new instruments.

Run `bash scripts/setup-portfolio-drive.sh` for the one-time Google Cloud, private Drive folder, and GitHub variable setup. It does not create a service-account key. If `gh` is not authenticated, the wizard lists the repository variables you must set manually. Then trigger **Sync portfolio from Google Drive** in GitHub Actions once to verify access, and ensure your connected host redeploys on the resulting commit. A local CSV can be tested with `npm run portfolio:sync-drive -- path/to/portfolio-current.csv`; this updates the two public JSON files locally.

Foreign values are converted to INR using [ECB reference-rate history](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html). The public site receives only allocation percentages and instrument metadata; the raw CSV is never committed.

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
