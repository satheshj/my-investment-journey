import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Decimal from "decimal.js";

import { portfolioImportConfig } from "./portfolio-import.config.mjs";

const privateFieldPattern =
  /quantity|unit|price|nav|cost|marketValue|currentValue|invested|profit|loss|p&l/i;

function fail(message) {
  throw new Error(`Portfolio import failed: ${message}`);
}

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (character === '"') {
      if (quoted && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (character === "," && !quoted) {
      row.push(field);
      field = "";
      continue;
    }

    if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[index + 1] === "\n") {
        index += 1;
      }

      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += character;
  }

  if (quoted) {
    fail("a CSV field has an unmatched quote");
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function isoDate(year, monthName, day) {
  const months = {
    Apr: "04",
    Aug: "08",
    Dec: "12",
    Feb: "02",
    Jan: "01",
    Jul: "07",
    Jun: "06",
    Mar: "03",
    May: "05",
    Nov: "11",
    Oct: "10",
    Sep: "09",
  };
  const month = months[monthName];

  if (!month) {
    fail(`unsupported month ${monthName}`);
  }

  return `${year}-${month}-${String(day).padStart(2, "0")}`;
}

function mutualFundSnapshotDate(rows) {
  const title = rows[0]?.find((cell) => cell.includes("Mutual Funds Holdings"));
  const match = title?.match(/\b([A-Z][a-z]{2})\s+(\d{1,2})\s+(\d{4})$/);

  if (!match) {
    fail("the mutual-fund export has no recognized snapshot date");
  }

  return isoDate(match[3], match[1], Number(match[2]));
}

function usSnapshotDate(fileName) {
  const match = fileName.match(/_(\d{1,2})-([A-Z][a-z]{2})-(\d{2,4})\.csv$/);

  if (!match) {
    fail("the US export filename has no recognized snapshot date");
  }

  const year = match[3].length === 2 ? `20${match[3]}` : match[3];
  return isoDate(year, match[2], Number(match[1]));
}

function requiredDecimal(value, label) {
  const trimmed = value?.trim();

  if (!trimmed || !/^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(trimmed)) {
    fail(`${label} is missing or is not a canonical positive decimal`);
  }

  const parsed = new Decimal(trimmed);

  if (parsed.isNegative()) {
    fail(`${label} cannot be negative`);
  }

  return parsed;
}

function mappedInstrument(name) {
  const mapping = portfolioImportConfig.instruments[name];

  if (!mapping) {
    fail(`instrument mapping required for ${name}`);
  }

  return mapping;
}

function parseMutualFunds(source) {
  const rows = parseCsv(source.text);
  const headerIndex = rows.findIndex((row) => row[0] === "Fund Name");

  if (headerIndex < 0) {
    fail("the mutual-fund export header was not found");
  }

  const holdings = rows
    .slice(headerIndex + 1)
    .filter((row) => row[0] && row[0] !== "Total")
    .map((row, index) => {
      const name = row[0].trim();
      const mapping = mappedInstrument(name);

      return {
        currency: "INR",
        instrumentId: mapping.instrumentId,
        marketValue: requiredDecimal(row[9], `mutual-fund row ${index + 1}`),
        strategyBucket: mapping.strategyBucket,
      };
    });

  if (holdings.length === 0) {
    fail("the mutual-fund export contains no holdings");
  }

  return { asOf: mutualFundSnapshotDate(rows), holdings };
}

function parseUsHoldings(source) {
  const rows = parseCsv(source.text);
  const headerIndex = rows.findIndex((row) => row[0] === "Stock Name");

  if (headerIndex < 0) {
    fail("the US export header was not found");
  }

  const holdings = rows
    .slice(headerIndex + 1)
    .filter((row) => row[0])
    .map((row, index) => {
      const name = row[0].trim();
      const mapping = mappedInstrument(name);

      return {
        currency: "USD",
        instrumentId: mapping.instrumentId,
        marketValue: requiredDecimal(row[7], `US row ${index + 1}`),
        strategyBucket: mapping.strategyBucket,
      };
    });

  if (holdings.length === 0) {
    fail("the US export contains no holdings");
  }

  return { asOf: usSnapshotDate(source.name), holdings };
}

function parseIndianEtfs(source) {
  const rows = parseCsv(source.text);
  const title = rows[0]?.find((cell) => cell.includes("Indian ETF Holdings"));
  const dateMatch = title?.match(/\b([A-Z][a-z]{2})\s+(\d{1,2})\s+(\d{4})$/);

  if (!dateMatch) {
    fail("the Indian ETF export has no recognized snapshot date");
  }

  const headerIndex = rows.findIndex((row) => row[0] === "ETF Name");

  if (headerIndex < 0) {
    fail("the Indian ETF export header was not found");
  }

  const holdings = rows
    .slice(headerIndex + 1)
    .filter((row) => row[0])
    .map((row, index) => {
      const name = row[0].trim();
      const mapping = mappedInstrument(name);
      const quantity = requiredDecimal(row[1], `Indian ETF row ${index + 1} quantity`);
      const marketPrice = requiredDecimal(
        row[2],
        `Indian ETF row ${index + 1} market price`,
      );

      return {
        currency: "INR",
        instrumentId: mapping.instrumentId,
        marketValue: quantity.mul(marketPrice),
        strategyBucket: mapping.strategyBucket,
      };
    });

  if (holdings.length === 0) {
    fail("the Indian ETF export contains no holdings");
  }

  return {
    asOf: isoDate(dateMatch[3], dateMatch[1], Number(dateMatch[2])),
    holdings,
  };
}

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function apportionPercentages(holdings) {
  const total = holdings.reduce(
    (sum, holding) => sum.plus(holding.valueInBaseCurrency),
    new Decimal(0),
  );

  if (!total.isPositive()) {
    fail("the combined portfolio value must be positive");
  }

  const prepared = holdings.map((holding, index) => {
    const exactPoints = holding.valueInBaseCurrency.div(total).mul(10_000);
    const floorPoints = exactPoints.floor();

    return {
      ...holding,
      exactPoints,
      floorPoints,
      index,
    };
  });
  const assignedPoints = prepared.reduce(
    (sum, holding) => sum.plus(holding.floorPoints),
    new Decimal(0),
  );
  const pointsToAssign = new Decimal(10_000).minus(assignedPoints).toNumber();
  const byRemainder = [...prepared].sort((left, right) => {
    const remainderComparison = right.exactPoints
      .minus(right.floorPoints)
      .comparedTo(left.exactPoints.minus(left.floorPoints));
    return remainderComparison || left.index - right.index;
  });
  const recipients = new Set(
    byRemainder.slice(0, pointsToAssign).map((holding) => holding.index),
  );

  return prepared.map((holding) => ({
    allocationPercent: holding.floorPoints
      .plus(recipients.has(holding.index) ? 1 : 0)
      .div(100)
      .toFixed(2),
    instrumentId: holding.instrumentId,
    strategyBucket: holding.strategyBucket,
  }));
}

export function buildPublishedAllocation({
  indianEtfSource,
  mutualFundSource,
  usSource,
}) {
  const mutualFunds = parseMutualFunds(mutualFundSource);
  const usHoldings = parseUsHoldings(usSource);
  const indianEtfs = indianEtfSource ? parseIndianEtfs(indianEtfSource) : undefined;

  if (mutualFunds.asOf !== usHoldings.asOf) {
    fail(`snapshot dates differ (${mutualFunds.asOf} and ${usHoldings.asOf})`);
  }

  if (indianEtfs && mutualFunds.asOf !== indianEtfs.asOf) {
    fail(`snapshot dates differ (${mutualFunds.asOf} and ${indianEtfs.asOf})`);
  }

  const fx = portfolioImportConfig.fxRatesBySnapshotDate[mutualFunds.asOf];

  if (!fx) {
    fail(`an audited FX input is required for ${mutualFunds.asOf}`);
  }

  const holdings = [
    ...mutualFunds.holdings.map((holding) => ({
      ...holding,
      valueInBaseCurrency: holding.marketValue,
    })),
    ...(indianEtfs?.holdings ?? []).map((holding) => ({
      ...holding,
      valueInBaseCurrency: holding.marketValue,
    })),
    ...usHoldings.holdings.map((holding) => ({
      ...holding,
      valueInBaseCurrency: holding.marketValue.mul(fx.rate),
    })),
  ];
  const publicHoldings = apportionPercentages(holdings).sort((left, right) =>
    new Decimal(right.allocationPercent).comparedTo(left.allocationPercent),
  );
  const publication = {
    schemaVersion: 1,
    id: `portfolio-allocation-${mutualFunds.asOf}`,
    asOf: mutualFunds.asOf,
    calculationCurrency: portfolioImportConfig.baseCurrency,
    completeness: portfolioImportConfig.completeness,
    calculationBasis: {
      method: "base_currency_market_value",
      fx: [
        {
          asOf: fx.asOf,
          fromCurrency: fx.fromCurrency,
          sourceLabel: fx.sourceLabel,
          sourceUrl: fx.sourceUrl,
          toCurrency: fx.toCurrency,
        },
      ],
    },
    holdings: publicHoldings,
    provenance: {
      generator: "portfolio-import-v1",
      sources: [
        {
          label: "mutual-funds-export",
          sha256: sha256(mutualFundSource.text),
        },
        ...(indianEtfSource
          ? [
              {
                label: "indian-etf-export",
                sha256: sha256(indianEtfSource.text),
              },
            ]
          : []),
        { label: "us-portfolio-export", sha256: sha256(usSource.text) },
      ],
    },
  };
  const serialized = JSON.stringify(publication);

  if (privateFieldPattern.test(serialized)) {
    fail("the publication artifact contains a private financial field");
  }

  return publication;
}

async function findSources(sourceDirectory) {
  const fileNames = (await readdir(sourceDirectory)).filter((name) =>
    name.toLowerCase().endsWith(".csv"),
  );
  const sources = await Promise.all(
    fileNames.map(async (name) => ({
      name,
      text: await readFile(path.join(sourceDirectory, name), "utf8"),
    })),
  );
  const mutualFundSource = sources.find((source) =>
    source.text.includes("Mutual Funds Holdings"),
  );
  const usSource = sources.find((source) => source.text.startsWith("Stock Name,"));
  const indianEtfSource = sources.find((source) =>
    source.text.includes("Indian ETF Holdings"),
  );

  if (!mutualFundSource || !usSource) {
    fail("one mutual-fund export and one US portfolio export are required");
  }

  return { indianEtfSource, mutualFundSource, usSource };
}

async function main() {
  const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const sourceDirectory = path.resolve(projectRoot, process.argv[2] ?? "docs/holdings");
  const outputPath = path.join(
    projectRoot,
    "src/data/portfolio/published-allocation.json",
  );
  const sources = await findSources(sourceDirectory);
  const publication = buildPublishedAllocation(sources);

  await writeFile(outputPath, `${JSON.stringify(publication, null, 2)}\n`, "utf8");
  console.log(
    `Published ${publication.holdings.length} allocation rows for ${publication.asOf}.`,
  );
}

const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : "";

if (entryPath === fileURLToPath(import.meta.url)) {
  await main();
}
