import { readFileSync } from "fs";
import { resolve } from "path";

const nodesFile = readFileSync(resolve(process.cwd(), "src/data/nodes.ts"), "utf-8");
const urlRegex = /url:\s*["']([^"']+)["']/g;
const sources = [];

let match;
while ((match = urlRegex.exec(nodesFile)) !== null) {
  sources.push(match[1]);
}

const table = ["| URL | Domain | Bucket | Reason |", "|---|---|---|---|"];

for (const url of new Set(sources)) {
  let domain = "";
  try {
    domain = new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    domain = url;
  }

  let bucket = "full";
  let reason = "Standard article/blog format";

  // Bucket (b): pdf-or-wiki
  if (url.endsWith(".pdf") || domain === "arxiv.org") {
    bucket = "pdf-or-wiki";
    reason = "PDF document";
  } else if (domain === "en.wikipedia.org" || domain === "wikipedia.org") {
    bucket = "pdf-or-wiki";
    reason = "Wikipedia article (API)";
  }
  // Bucket (c): unavailable
  else if (
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
    domain === "overcast.fm"
  ) {
    bucket = "unavailable";
    reason = "Video/Podcast/Paywall/Audio";
  }

  table.push(`| ${url} | ${domain} | ${bucket} | ${reason} |`);
}

console.log(table.join("\n"));
