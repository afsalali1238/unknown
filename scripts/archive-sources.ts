import { Project, ArrayLiteralExpression, ObjectLiteralExpression, SyntaxKind } from "ts-morph";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import fs from "fs/promises";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// Initialize ts-morph
const project = new Project();
const sourceFile = project.addSourceFileAtPath(path.join(process.cwd(), "src/data/nodes.ts"));

// Ensure content/sources directory exists
const sourcesDir = path.join(process.cwd(), "public/content/sources"); // Or should it be content/sources? The plan says content/sources/, but usually in vite it's public/content/sources or just content/sources at root. Let's stick to content/sources at root as per the plan.
const rootSourcesDir = path.join(process.cwd(), "content/sources");

async function ensureDir() {
  try {
    await fs.mkdir(rootSourcesDir, { recursive: true });
  } catch (e) {
    // Ignore error
  }
}

function getBucket(url: string): {
  bucket: "full" | "pdf-or-wiki" | "unavailable";
  reason: string;
} {
  let domain = "";
  try {
    domain = new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    domain = url;
  }

  if (url.endsWith(".pdf") || domain === "arxiv.org")
    return { bucket: "pdf-or-wiki", reason: "PDF" };
  if (domain === "en.wikipedia.org" || domain === "wikipedia.org")
    return { bucket: "pdf-or-wiki", reason: "Wiki" };

  if (
    domain.includes("youtube.com") ||
    domain.includes("youtu.be") ||
    domain.includes("ted.com") ||
    url.includes("podcast") ||
    domain.includes("spotify.com") ||
    domain.includes("apple.com") ||
    domain === "wsj.com" ||
    domain === "bloomberg.com" ||
    domain === "nytimes.com" ||
    domain === "cnbc.com" ||
    domain === "fortune.com" ||
    domain === "cnn.com" ||
    domain === "netflix.com" ||
    domain === "imdb.com" ||
    domain === "jrepodcast.com" ||
    domain === "npr.org" ||
    domain === "freakonomics.com" ||
    domain === "allinpodcast.co" ||
    domain === "joincolossus.com" ||
    domain === "stitcher.com" ||
    domain === "overcast.fm" ||
    domain === "fs.blog"
  ) {
    return { bucket: "unavailable", reason: "Media/Paywall" };
  }

  return { bucket: "full", reason: "Article" };
}

async function fetchWiki(url: string) {
  try {
    const title = url.split("/wiki/")[1];
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1&titles=${title}&format=json`;
    const res = await fetch(apiUrl, { headers: { "User-Agent": "Epistemoph/1.0" } });
    const data = await res.json();
    const pages = data.query?.pages;
    if (!pages) return null;
    const pageId = Object.keys(pages)[0];
    return pages[pageId].extract;
  } catch (e) {
    console.error(`Failed to fetch wiki ${url}:`, e);
    return null;
  }
}

async function fetchPdf(url: string) {
  try {
    // If it's an arxiv link not ending in .pdf, convert to pdf link
    if (url.includes("arxiv.org/abs/")) {
      url = url.replace("/abs/", "/pdf/") + ".pdf";
    }
    const res = await fetch(url, { headers: { "User-Agent": "Epistemoph/1.0" } });
    const buffer = await res.arrayBuffer();
    const data = await pdfParse(Buffer.from(buffer));
    return data.text;
  } catch (e) {
    console.error(`Failed to fetch pdf ${url}:`, e);
    return null;
  }
}

async function fetchArticle(url: string) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Epistemoph/1.0 (offline archiver)" },
    });
    const html = await res.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    return article?.textContent;
  } catch (e) {
    console.error(`Failed to fetch article ${url}:`, e);
    return null;
  }
}

async function run() {
  await ensureDir();
  const nodesDeclaration = sourceFile.getVariableDeclaration("NODES");
  if (!nodesDeclaration) throw new Error("NODES array not found");

  const arrayLiteral = nodesDeclaration.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
  if (!arrayLiteral) throw new Error("NODES is not an array");

  const nodes = arrayLiteral
    .getElements()
    .filter((e) => e.getKind() === SyntaxKind.ObjectLiteralExpression) as ObjectLiteralExpression[];

  const clusterLimit = process.argv[2]; // e.g. "A" or "all"

  for (const node of nodes) {
    const idProp = node.getProperty("id") || node.getProperty('"id"');
    const clusterIdProp = node.getProperty("clusterId") || node.getProperty('"clusterId"');
    if (!idProp || !clusterIdProp) continue;

    // Quick extract of id/clusterId value
    const id = idProp.getText().split(":")[1].replace(/["']/g, "").trim();
    const clusterId = clusterIdProp.getText().split(":")[1].replace(/["']/g, "").trim();

    if (clusterLimit && clusterLimit !== "all" && clusterId !== clusterLimit) {
      continue;
    }

    const furtherReadingProp =
      node.getProperty("furtherReading") || node.getProperty('"furtherReading"');
    if (!furtherReadingProp) continue;

    const frArray = furtherReadingProp.getFirstChildByKind(SyntaxKind.ArrayLiteralExpression);
    if (!frArray) continue;

    const frItems = frArray
      .getElements()
      .filter(
        (e) => e.getKind() === SyntaxKind.ObjectLiteralExpression,
      ) as ObjectLiteralExpression[];

    for (let i = 0; i < frItems.length; i++) {
      const frItem = frItems[i];
      // Check if archive field already exists
      if (frItem.getProperty("archive") || frItem.getProperty('"archive"')) {
        continue;
      }

      const urlProp = frItem.getProperty("url") || frItem.getProperty('"url"');
      const sourceProp = frItem.getProperty("source") || frItem.getProperty('"source"');
      const labelProp = frItem.getProperty("label") || frItem.getProperty('"label"');
      if (!urlProp || !sourceProp || !labelProp) continue;

      const urlInit =
        urlProp.getInitializerIfKind(SyntaxKind.StringLiteral) ||
        urlProp.getInitializerIfKind(SyntaxKind.NoSubstitutionTemplateLiteral);
      const sourceInit =
        sourceProp.getInitializerIfKind(SyntaxKind.StringLiteral) ||
        sourceProp.getInitializerIfKind(SyntaxKind.NoSubstitutionTemplateLiteral);
      const labelInit =
        labelProp.getInitializerIfKind(SyntaxKind.StringLiteral) ||
        labelProp.getInitializerIfKind(SyntaxKind.NoSubstitutionTemplateLiteral);

      const url = urlInit ? urlInit.getLiteralValue() : "";
      const sourceName = sourceInit ? sourceInit.getLiteralValue() : "";
      const label = labelInit ? labelInit.getLiteralValue() : "";

      if (!url || !sourceName || !label) continue;

      const { bucket } = getBucket(url);

      let archiveStatus = "unavailable";
      const pathName = `content/sources/${id}-${i}.md`;
      let contentToSave = null;
      const retrievedDate = new Date().toISOString().split("T")[0];

      console.log(`Processing ${id}-${i}: ${url} [${bucket}]`);

      if (bucket === "full") {
        contentToSave = await fetchArticle(url);
        if (contentToSave) archiveStatus = "full";
      } else if (bucket === "pdf-or-wiki") {
        if (url.includes("wikipedia.org")) {
          contentToSave = await fetchWiki(url);
        } else {
          contentToSave = await fetchPdf(url);
        }
        if (contentToSave) archiveStatus = "full";
      }

      if (archiveStatus === "full" && contentToSave) {
        const mdContent = `---
title: "${label.replace(/"/g, '\\"')}"
author: "${sourceName.replace(/"/g, '\\"')}"
source: "${sourceName.replace(/"/g, '\\"')}"
url: ${url}
retrieved: ${retrievedDate}
---

> Originally published by ${sourceName}, ${sourceName} — ${url}
> Archived ${retrievedDate} for personal offline reading. All rights remain with the original author.

${contentToSave.trim()}
`;
        await fs.writeFile(path.join(process.cwd(), pathName), mdContent, "utf-8");

        frItem.addPropertyAssignment({
          name: "archive",
          initializer: `{ status: "full", path: "${pathName}", retrieved: "${retrievedDate}" }`,
        });
      } else {
        frItem.addPropertyAssignment({
          name: "archive",
          initializer: `{ status: "unavailable" }`,
        });
      }
    }
  }

  await sourceFile.save();
  console.log("Done.");
}

run().catch(console.error);
