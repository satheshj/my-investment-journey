import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const OUTPUT_PATH = resolve("src/data/global-markets/weekly-digest.json");
const MAX_ARTICLES = 6;
const LOOKBACK_DAYS = 28;

const sources = [
  {
    id: "zerodha-daily-brief",
    name: "The Daily Brief by Zerodha",
    region: "India",
    url: "https://thedailybrief.zerodha.com/feed",
    preferIndianTitle: true,
  },
  {
    id: "sebi",
    name: "SEBI",
    region: "India",
    url: "https://www.sebi.gov.in/sebirss.xml",
    includePaths: ["/circulars/", "/master-circulars/", "/press-releases/"],
  },
  {
    id: "damodaran",
    name: "Musings on Markets",
    region: "Global",
    url: "https://aswathdamodaran.blogspot.com/feeds/posts/default?alt=rss",
  },
  {
    id: "liberty-street",
    name: "Liberty Street Economics",
    region: "United States",
    url: "https://libertystreeteconomics.newyorkfed.org/feed/",
  },
  {
    id: "fred-blog",
    name: "FRED Blog",
    region: "United States",
    url: "https://fredblog.stlouisfed.org/feed/",
  },
  {
    id: "ecb-blog",
    name: "The ECB Blog",
    region: "Europe",
    url: "https://www.ecb.europa.eu/rss/blog.html",
  },
];

const topicRules = [
  {
    label: "Indian market rules",
    terms: [
      "sebi",
      "circular",
      "demat",
      "mutual fund",
      "disclosure",
      "investor protection",
    ],
    lens: "Check whether this changes how an Indian holding is bought, disclosed, or safeguarded before treating it as market noise.",
  },
  {
    label: "Indian markets",
    terms: ["india", "indian", "nifty", "sensex", "rbi", "nse", "bse"],
    lens: "Ask whether the development changes an Indian business you own, your domestic diversification, or only the week's narrative.",
  },
  {
    label: "Rates and credit",
    terms: ["interest rate", "rates", "bond", "credit", "yield", "debt", "fed"],
    lens: "Check how borrowing costs, discount rates, and balance-sheet strength affect the investments you already hold.",
  },
  {
    label: "Inflation and currencies",
    terms: ["inflation", "currency", "dollar", "exchange rate", "forex", "rupee"],
    lens: "Separate the investment return from the currency return, especially when comparing Indian and overseas holdings.",
  },
  {
    label: "Valuation",
    terms: ["valuation", "price", "earnings", "cash flow", "profitability", "margin"],
    lens: "Ask whether the story changes expected cash flows, risk, or merely the price investors are willing to pay.",
  },
  {
    label: "Market structure",
    terms: ["index", "passive", "etf", "liquidity", "market structure", "concentration"],
    lens: "Look through fund labels to the underlying companies, sectors, and concentration you actually own.",
  },
  {
    label: "Growth and technology",
    terms: ["technology", "ai", "productivity", "semiconductor", "scale"],
    lens: "Distinguish durable business improvement from an exciting narrative that may already be reflected in the price.",
  },
  {
    label: "Global economy",
    terms: [
      "economy",
      "trade",
      "recession",
      "gdp",
      "growth",
      "employment",
      "global",
      "tariff",
    ],
    lens: "Treat one macro release as context, not as a reason to rebuild a long-term portfolio in a single week.",
  },
];

const sleep = (milliseconds) =>
  new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));

function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&#8217;", "'")
    .replaceAll("&#8220;", '"')
    .replaceAll("&#8221;", '"');
}

function plainText(value) {
  return decodeXml(value)
    .replace(/&(?:nbsp|#160);/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readTag(block, names) {
  for (const name of names) {
    const match = block.match(
      new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"),
    );
    if (match) return match[1];
  }
  return "";
}

function readLink(block) {
  const textLink = plainText(readTag(block, ["link"]));
  if (textLink.startsWith("http")) return textLink.replace(/([^:]\/)\/+?/g, "$1");

  const alternate = block.match(
    /<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["']/i,
  );
  const anyHref = block.match(/<link[^>]+href=["']([^"']+)["']/i);
  return decodeXml(alternate?.[1] ?? anyHref?.[1] ?? "").replace(/([^:]\/)\/+?/g, "$1");
}

function parsePublishedDate(value) {
  const directDate = new Date(value);
  if (!Number.isNaN(directDate.getTime())) return directDate;

  const legacyIndianDate = value.replace(
    /^(\d{1,2}\s+[A-Za-z]{3}),\s+(\d{4})(\s+[+-]\d{4})$/,
    "$1 $2 00:00:00$3",
  );
  return new Date(legacyIndianDate);
}

function shorten(value, maximumWords = 34) {
  const words = value.split(/\s+/).filter(Boolean);
  if (words.length <= maximumWords) return value;
  return `${words.slice(0, maximumWords).join(" ")}...`;
}

function usefulSentence(value, wantsNumber = false) {
  const candidates = value
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(
      (sentence) =>
        sentence.split(/\s+/).length >= 7 &&
        /^[A-Z0-9"'“‘]/.test(sentence) &&
        !/^Our goal with The Daily Brief/i.test(sentence) &&
        !/^Welcome to The Daily Brief/i.test(sentence) &&
        !/^We (?:won't|won’t|will not) just tell you/i.test(sentence) &&
        !/^(?:Subscribe|You can also listen|This is The Daily Brief)/i.test(sentence) &&
        !/\b(?:The Daily Brief|video|audio|podcast|YouTube)\b/i.test(sentence) &&
        !/\b(?:piece curates|stories that we talk about)\b/i.test(sentence),
    );

  const match = wantsNumber
    ? candidates.find(
        (sentence) =>
          !sentence.endsWith("?") &&
          /(?:\d[\d,.]*\s?%|\d[\d,.]*\s+(?:percent|percentage|million|billion|trillion)|[$€£₹]\s?\d|from\s+\d[\d,.]*\s+(?:to|in)\s+\d)/i.test(
            sentence,
          ),
      )
    : candidates[0];

  if (!match) return null;
  if (!wantsNumber) return shorten(match, 34);

  const factPattern =
    /(?:\d[\d,.]*\s?%|\d[\d,.]*\s+(?:percent|percentage|million|billion|trillion)|[$€£₹]\s?\d|from\s+\d[\d,.]*\s+(?:to|in)\s+\d)/i;
  const clauses = match.split(/[,;:]/).map((part) => part.trim());
  const factIndex = clauses.findIndex(
    (part) => factPattern.test(part) && part.split(/\s+/).length >= 5,
  );
  if (factIndex < 0) return shorten(match, 24);

  const selectedClauses = [clauses[factIndex]];
  for (let index = factIndex - 1; index >= 0; index -= 1) {
    const candidate = [clauses[index], ...selectedClauses].join(", ");
    if (candidate.split(/\s+/).length > 24) break;
    selectedClauses.unshift(clauses[index]);
  }

  const clause = selectedClauses
    .join(", ")
    .replace(/^(?:and|but)\s+/i, "")
    .replace(/[.!?]+$/, "");
  return `${clause.charAt(0).toUpperCase()}${clause.slice(1)}.`;
}

function classify(text) {
  const normalized = text.toLowerCase();
  return (
    topicRules.find((rule) => rule.terms.some((term) => normalized.includes(term))) ?? {
      label: "Risk and behaviour",
      lens: "Ask whether this changes a long-term assumption or simply adds short-term noise to the decision process.",
    }
  );
}

function scoreArticle(article) {
  const text = `${article.title} ${article.summary}`.toLowerCase();
  const financeTerms = [
    "market",
    "invest",
    "valuation",
    "equity",
    "stock",
    "bond",
    "economy",
    "inflation",
    "rate",
    "earnings",
    "risk",
    "portfolio",
  ];
  const financeScore = financeTerms.filter((term) => text.includes(term)).length * 3;
  const factScore = /(?:\d[\d,.]*\s?%|[$€£₹]\s?\d|\d{2,})/.test(text) ? 2 : 0;
  return financeScore + factScore + Math.min(article.summary.length / 200, 2);
}

function hasIndianMarketTitle(article) {
  return /\b(?:india|indian|sebi|nifty|sensex|rupee|rbi|nse|bse)\b/i.test(article.title);
}

function parseFeed(xml, source) {
  const rssItems = xml.match(/<item\b[\s\S]*?<\/item>/gi) ?? [];
  const atomEntries = xml.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? [];
  const blocks = rssItems.length > 0 ? rssItems : atomEntries;

  return blocks.flatMap((block) => {
    const title = plainText(readTag(block, ["title"]));
    const url = readLink(block);
    const publishedRaw = plainText(
      readTag(block, ["pubDate", "published", "updated", "dc:date"]),
    );
    const summary = plainText(
      readTag(block, ["content:encoded", "content", "description", "summary"]),
    ).replace(/^The takeaway\s+/i, "");
    const publishedDate = parsePublishedDate(publishedRaw);

    if (!title || !url || Number.isNaN(publishedDate.getTime())) return [];
    if (
      source.includePaths &&
      !source.includePaths.some((path) => new URL(url).pathname.includes(path))
    ) {
      return [];
    }

    return [
      {
        sourceId: source.id,
        sourceName: source.name,
        sourceRegion: source.region,
        title,
        url,
        publishedAt: publishedDate.toISOString(),
        summary,
      },
    ];
  });
}

async function fetchPageSummary(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);

  try {
    const response = await fetch(url, {
      headers: {
        accept: "text/html",
        "user-agent": "MyInvestmentJourneyFeedReader/1.0 (+public learning project)",
      },
      signal: controller.signal,
    });
    if (!response.ok) return "";

    const html = await response.text();
    const afterHeading = html.slice(html.search(/<\/h1>/i) + 5);
    const leadParagraph = [...afterHeading.matchAll(/<p(?:\s[^>]*)?>([\s\S]*?)<\/p>/gi)]
      .map((match) => plainText(match[1]))
      .find(
        (paragraph) =>
          paragraph.split(/\s+/).length >= 12 &&
          !paragraph.startsWith("The European Central Bank (ECB) is"),
      );
    if (leadParagraph) return leadParagraph;

    const patterns = [
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:description["'][^>]*>/i,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["'][^>]*>/i,
    ];
    const summary =
      patterns.map((pattern) => html.match(pattern)?.[1]).find(Boolean) ?? "";
    const cleanedSummary = plainText(summary).replace(/^The takeaway\s+/i, "");
    return /^Securities and Exchange Board of India is made/i.test(cleanedSummary)
      ? ""
      : cleanedSummary;
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  try {
    const response = await fetch(source.url, {
      headers: {
        accept: "application/atom+xml, application/rss+xml, application/xml, text/xml",
        "user-agent": "MyInvestmentJourneyFeedReader/1.0 (+public learning project)",
      },
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const articles = parseFeed(await response.text(), source);
    if (articles.length === 0) throw new Error("feed contained no usable entries");

    const hydrated = [];
    for (const article of articles.slice(0, 10)) {
      const shouldHydrate =
        !article.summary || article.summary.toLowerCase() === article.title.toLowerCase();
      const fetchedSummary = shouldHydrate ? await fetchPageSummary(article.url) : "";
      const summary = fetchedSummary || article.summary;
      if (summary) hydrated.push({ ...article, summary });
      if (shouldHydrate) await sleep(150);
    }

    if (hydrated.length === 0) throw new Error("feed entries had no usable summaries");
    return hydrated;
  } finally {
    clearTimeout(timeout);
  }
}

function selectArticles(articles, now) {
  const oldestAllowed = now.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000;
  const seenUrls = new Set();
  const ranked = articles
    .filter((article) => new Date(article.publishedAt).getTime() >= oldestAllowed)
    .filter((article) => {
      const canonicalUrl = article.url.replace(/[?#].*$/, "").replace(/\/$/, "");
      if (seenUrls.has(canonicalUrl)) return false;
      seenUrls.add(canonicalUrl);
      return true;
    })
    .sort((left, right) => {
      const scoreDifference = scoreArticle(right) - scoreArticle(left);
      return scoreDifference || right.publishedAt.localeCompare(left.publishedAt);
    });
  const selected = sources.flatMap((source) => {
    const sourceArticles = ranked.filter((candidate) => candidate.sourceId === source.id);
    const article = source.preferIndianTitle
      ? (sourceArticles.find(hasIndianMarketTitle) ?? sourceArticles[0])
      : sourceArticles[0];
    return article ? [article] : [];
  });
  const sourceCounts = new Map(
    selected.map((article) => [
      article.sourceId,
      selected.filter((candidate) => candidate.sourceId === article.sourceId).length,
    ]),
  );

  for (const article of ranked) {
    const indianCount = selected.filter(
      (candidate) => candidate.sourceRegion === "India",
    ).length;
    if (indianCount >= 2 || selected.length >= MAX_ARTICLES) break;
    if (article.sourceRegion !== "India") continue;
    if (selected.some((candidate) => candidate.url === article.url)) continue;

    const currentCount = sourceCounts.get(article.sourceId) ?? 0;
    if (currentCount >= 2) continue;
    selected.push(article);
    sourceCounts.set(article.sourceId, currentCount + 1);
  }

  for (const article of ranked) {
    if (selected.length >= MAX_ARTICLES) break;
    if (selected.some((candidate) => candidate.url === article.url)) continue;

    const currentCount = sourceCounts.get(article.sourceId) ?? 0;
    if (currentCount >= 2) continue;
    selected.push(article);
    sourceCounts.set(article.sourceId, currentCount + 1);
  }

  return selected
    .sort((left, right) => {
      const scoreDifference = scoreArticle(right) - scoreArticle(left);
      return scoreDifference || right.publishedAt.localeCompare(left.publishedAt);
    })
    .slice(0, MAX_ARTICLES)
    .map((article, index) => {
      const titleTopic = classify(article.title);
      const topic =
        titleTopic.label === "Risk and behaviour"
          ? classify(`${article.title} ${article.summary}`)
          : titleTopic;
      const keyNote = usefulSentence(article.summary) ?? shorten(article.summary, 34);
      const possibleFact = usefulSentence(article.summary, true);
      return {
        id: `${article.sourceId}-${new Date(article.publishedAt).toISOString().slice(0, 10)}-${index + 1}`,
        title: article.title,
        url: article.url,
        source: article.sourceName,
        sourceRegion: article.sourceRegion,
        publishedAt: article.publishedAt,
        topic: topic.label,
        keyNote,
        notableFact:
          possibleFact && keyNote.includes(possibleFact.replace(/[.!?]+$/, ""))
            ? null
            : possibleFact,
        portfolioLens: topic.lens,
      };
    });
}

async function loadPreviousDigest() {
  try {
    return JSON.parse(await readFile(OUTPUT_PATH, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  const now = new Date();
  const results = [];
  const failures = [];

  for (const source of sources) {
    try {
      results.push(...(await fetchSource(source)));
    } catch (error) {
      failures.push(
        `${source.name}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
    await sleep(250);
  }

  const articles = selectArticles(results, now);
  if (articles.length < 3) {
    const previous = await loadPreviousDigest();
    if (previous?.articles?.length) {
      console.warn(`Refresh skipped. Only ${articles.length} valid articles were found.`);
      failures.forEach((failure) => console.warn(failure));
      return;
    }
    throw new Error(
      `Unable to create the first digest. Only ${articles.length} valid articles were found.`,
    );
  }

  const digest = {
    generatedAt: now.toISOString(),
    cadence: "weekly",
    coverage: "indian-and-global-markets",
    sourceCount: new Set(articles.map((article) => article.source)).size,
    articles,
  };

  await writeFile(OUTPUT_PATH, `${JSON.stringify(digest, null, 2)}\n`, "utf8");
  console.log(
    `Published ${articles.length} articles from ${digest.sourceCount} sources.`,
  );
  failures.forEach((failure) => console.warn(failure));
}

await main();
