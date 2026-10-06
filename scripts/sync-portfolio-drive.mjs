import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Decimal from "decimal.js";

import { parseCsv } from "./import-holdings.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INSTRUMENTS_PATH = path.join(ROOT, "src/data/portfolio/instruments.json");
const ALLOCATION_PATH = path.join(ROOT, "src/data/portfolio/published-allocation.json");
const ECB_URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml";
const DRIVE_API = "https://www.googleapis.com/drive/v3/files";
const HEADER = [
  "as_of",
  "instrument_id",
  "instrument_name",
  "instrument_type",
  "listing_country",
  "trading_currency",
  "market_value",
  "strategy_bucket",
  "symbol",
  "exchange",
];
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MONEY = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;
const PRIVATE =
  /\b[A-Z]{5}[0-9]{4}[A-Z]\b|\b\d{9,18}\b|\b(?:pan|account|folio|demat|client id|quantity|cost basis)\b/i;

function fail(message) {
  throw new Error(`Portfolio sync failed: ${message}`);
}

function daysBetween(first, second) {
  return Math.round((Date.parse(second) - Date.parse(first)) / 86_400_000);
}

function dateOnly(value) {
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(value) ||
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) !== value
  ) {
    fail("invalid as_of date");
  }
  return value;
}

export function parsePortfolioCsv(text, runDate, previousAsOf) {
  if (text.length > 1_000_000) fail("CSV exceeds 1 MB");
  const rows = parseCsv(text.replace(/^\uFEFF/, "")).filter((row) =>
    row.some((cell) => cell.trim()),
  );
  if (rows[0]?.join(",") !== HEADER.join(","))
    fail("CSV header does not match the published template");
  if (rows.length < 2) fail("CSV contains no holdings");
  const seen = new Set();
  const instruments = [];
  const holdings = [];
  const dates = [];
  for (const [index, row] of rows.slice(1).entries()) {
    if (row.length !== HEADER.length)
      fail(`row ${index + 2} has the wrong number of columns`);
    const [rawDate, id, name, type, country, currency, value, bucket, symbol, exchange] =
      row.map((cell) => cell.trim());
    const asOf = dateOnly(rawDate);
    if (daysBetween(asOf, runDate) < 0 || daysBetween(asOf, runDate) > 7)
      fail("snapshot date is outside the seven-day window");
    if (!ID.test(id) || seen.has(id))
      fail(`invalid or duplicate instrument_id on row ${index + 2}`);
    if (
      !name ||
      name.length > 120 ||
      PRIVATE.test(name) ||
      PRIVATE.test(symbol) ||
      PRIVATE.test(exchange)
    )
      fail(`private or invalid instrument metadata on row ${index + 2}`);
    if (
      !["equity", "etf", "mutual_fund"].includes(type) ||
      !/^[A-Z]{2}$/.test(country) ||
      !/^[A-Z]{3}$/.test(currency) ||
      !["core", "thematic", "experimental"].includes(bucket)
    )
      fail(`invalid classification on row ${index + 2}`);
    if (!MONEY.test(value) || !new Decimal(value).isPositive())
      fail(`invalid market_value on row ${index + 2}`);
    seen.add(id);
    dates.push(asOf);
    instruments.push({
      id,
      name,
      instrumentType: type,
      listingCountry: country,
      tradingCurrency: currency,
      ...(symbol ? { symbol } : {}),
      ...(exchange ? { exchange } : {}),
    });
    holdings.push({
      instrumentId: id,
      strategyBucket: bucket,
      currency,
      marketValue: new Decimal(value),
    });
  }
  dates.sort();
  const oldest = dates[0];
  const newest = dates.at(-1);
  if (daysBetween(oldest, newest) > 7)
    fail("snapshot dates differ by more than seven days");
  if (previousAsOf && oldest < previousAsOf)
    fail("snapshot is older than the published portfolio");
  return { instruments, holdings, oldest, newest };
}

export function parseEcbRates(xml, asOf, currencies) {
  const blocks = [
    ...xml.matchAll(/<Cube\s+time="(\d{4}-\d{2}-\d{2})"[^>]*>([\s\S]*?)<\/Cube>/g),
  ];
  const available = blocks.filter(
    ([, date]) => date <= asOf && daysBetween(date, asOf) <= 7,
  );
  const block = available.sort((a, b) => b[1].localeCompare(a[1]))[0];
  if (!block) fail("no recent ECB reference rates");
  const rates = new Map([["EUR", new Decimal(1)]]);
  for (const [, currency, rate] of block[2].matchAll(
    /<Cube\s+currency="([A-Z]{3})"\s+rate="([\d.]+)"\s*\/>/g,
  )) {
    rates.set(currency, new Decimal(rate));
  }
  if (!rates.has("INR")) fail("ECB INR reference rate is unavailable");
  const conversions = [];
  for (const currency of [...currencies].filter((value) => value !== "INR").sort()) {
    const quoted = rates.get(currency);
    if (!quoted?.isPositive()) fail(`ECB reference rate is unavailable for ${currency}`);
    conversions.push({
      fromCurrency: currency,
      toCurrency: "INR",
      rate: rates.get("INR").div(quoted),
      asOf: block[1],
      sourceLabel: "ECB euro foreign exchange reference rates",
      sourceUrl: ECB_URL,
    });
  }
  return conversions;
}

function percentages(holdings) {
  const total = holdings.reduce(
    (sum, holding) => sum.plus(holding.inrValue),
    new Decimal(0),
  );
  if (!total.isPositive()) fail("portfolio total must be positive");
  const prepared = holdings.map((holding, index) => {
    const exact = holding.inrValue.div(total).mul(10_000);
    return {
      ...holding,
      index,
      floor: exact.floor(),
      remainder: exact.minus(exact.floor()),
    };
  });
  const remaining =
    10_000 - prepared.reduce((sum, holding) => sum + holding.floor.toNumber(), 0);
  const winners = new Set(
    [...prepared]
      .sort((a, b) => b.remainder.comparedTo(a.remainder) || a.index - b.index)
      .slice(0, remaining)
      .map((holding) => holding.index),
  );
  return prepared
    .map((holding) => ({
      instrumentId: holding.instrumentId,
      strategyBucket: holding.strategyBucket,
      allocationPercent: holding.floor
        .plus(winners.has(holding.index) ? 1 : 0)
        .div(100)
        .toFixed(2),
    }))
    .sort(
      (a, b) =>
        new Decimal(b.allocationPercent).comparedTo(a.allocationPercent) ||
        a.instrumentId.localeCompare(b.instrumentId),
    );
}

export function buildPortfolioPublication(csv, ecbXml, runDate, previous) {
  const parsed = parsePortfolioCsv(csv, runDate, previous?.asOf);
  const currencies = new Set(parsed.holdings.map((holding) => holding.currency));
  const fx =
    currencies.size === 1 && currencies.has("INR")
      ? []
      : parseEcbRates(ecbXml, parsed.oldest, currencies);
  const fxByCurrency = new Map(fx.map((rate) => [rate.fromCurrency, rate.rate]));
  const converted = parsed.holdings.map((holding) => ({
    ...holding,
    inrValue: holding.marketValue.mul(
      holding.currency === "INR" ? 1 : fxByCurrency.get(holding.currency),
    ),
  }));
  const allocation = {
    schemaVersion: 2,
    id: `portfolio-allocation-${parsed.oldest}`,
    asOf: parsed.oldest,
    snapshotWindow: { oldest: parsed.oldest, newest: parsed.newest },
    calculationCurrency: "INR",
    completeness: "complete",
    calculationBasis: {
      method: "base_currency_market_value",
      fx: fx.map(({ rate, ...publicRate }) => ({
        ...publicRate,
        rate: rate.toSignificantDigits(12).toString(),
      })),
    },
    holdings: percentages(converted),
    provenance: {
      generator: "portfolio-drive-import-v2",
      sources: [
        {
          label: "portfolio-current.csv",
          sha256: createHash("sha256").update(csv).digest("hex"),
        },
      ],
    },
  };
  return { instruments: parsed.instruments, allocation };
}

export async function fetchDriveCsv(folderId, token) {
  if (!folderId || !token) fail("Drive folder ID or access token is not configured");
  const params = new URLSearchParams({
    q: `'${folderId.replaceAll("'", "\\'")}' in parents and name = 'portfolio-current.csv' and trashed = false`,
    fields: "nextPageToken,files(id,name,mimeType)",
    pageSize: "10",
    supportsAllDrives: "true",
    includeItemsFromAllDrives: "true",
  });
  const response = await fetch(`${DRIVE_API}?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) fail(`Drive listing returned HTTP ${response.status}`);
  const listing = await response.json();
  if (
    listing.nextPageToken ||
    listing.files?.length !== 1 ||
    listing.files[0].mimeType !== "text/csv"
  )
    fail("expected exactly one uploaded CSV named portfolio-current.csv");
  const file = await fetch(
    `${DRIVE_API}/${encodeURIComponent(listing.files[0].id)}?alt=media&supportsAllDrives=true`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (!file.ok) fail(`Drive download returned HTTP ${file.status}`);
  return file.text();
}

async function main() {
  const runDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const previous = JSON.parse(await readFile(ALLOCATION_PATH, "utf8"));
  const localFile = process.argv[2];
  const csv = localFile
    ? await readFile(path.resolve(localFile), "utf8")
    : await fetchDriveCsv(process.env.DRIVE_FOLDER_ID, process.env.GOOGLE_ACCESS_TOKEN);
  const parsed = parsePortfolioCsv(csv, runDate, previous.asOf);
  let ecbXml = "";
  if (parsed.holdings.some((holding) => holding.currency !== "INR")) {
    const ecbResponse = await fetch(ECB_URL);
    if (!ecbResponse.ok) fail(`ECB returned HTTP ${ecbResponse.status}`);
    ecbXml = await ecbResponse.text();
  }
  const result = buildPortfolioPublication(csv, ecbXml, runDate, previous);
  const nextInstruments = `${JSON.stringify(result.instruments, null, 2)}\n`;
  const nextAllocation = `${JSON.stringify(result.allocation, null, 2)}\n`;
  if (
    (await readFile(INSTRUMENTS_PATH, "utf8")) === nextInstruments &&
    (await readFile(ALLOCATION_PATH, "utf8")) === nextAllocation
  ) {
    console.log("Portfolio snapshot is unchanged.");
    return;
  }
  await writeFile(INSTRUMENTS_PATH, nextInstruments);
  await writeFile(ALLOCATION_PATH, nextAllocation);
  console.log(`Published ${result.allocation.holdings.length} allocation percentages.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
