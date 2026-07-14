# Offline Source Archive — Plan + Antigravity Prompt

Goal: stop depending on "Further reading" being live links to other sites. Copy the actual source
text into the app (with attribution) so every node is fully readable with no connection, then keep
the link only as "read the original."

Scope locked in: all 32 existing nodes (clusters A–H), ~230 unique `furtherReading` URLs across them.
Storage: one markdown file per archived source under `content/sources/`.

---

## 1. Reality check on the 230 URLs first

Not everything in `furtherReading` *can* honestly become full offline text. Before writing any
scraper, the links split into three buckets:

**Archivable as full text (do this):**
Blog/essay pages with a real article body — `paulgraham.com`, `fs.blog`, `a16z.com`, `cdixon.org`,
`nav.al`, `karpathy.medium.com`, `stratechery.com` (preview-length only if paywalled), `eugenewei.com`,
`abovethecrowd.com`, `foundersfund.com`, `kk.org`, `gwern.net`, `slatestarcodex.com`,
`jalammar.github.io`, `greylock.com`, `usv.com`, `signalvnoise.com`, `situational-awareness.ai`,
`darioamodei.com`, `cold-takes.com`, `pmarchive.com`, `blakemasters.tumblr.com`, `lesswrong.com`,
`forum.effectivealtruism.org`, and similar.

**Archivable via a different extraction path:**
- PDFs (`arxiv.org`, whitepapers, VC/hedge-fund memos, academic papers) — download + extract text.
- Wikipedia — pull the article extract via Wikipedia's own API (cleanly licensed CC BY-SA, easiest
  case in the whole list).

**Not archivable as text — leave as an external link, don't fake it:**
YouTube videos, podcasts (Bloomberg, Tim Ferriss, All-In, MacroVoices, Odd Lots, etc.), TED talks,
paywalled news (WSJ, Bloomberg, NYT, CNBC, Fortune, CNN), Netflix/IMDB. These stay exactly as they
are today — a normal outbound link. No transcript fabrication, no scraping around paywalls.

This triage has to run *before* any bulk copying, otherwise you end up with either broken scraped
garbage for videos/paywalls, or a false sense that "everything is offline now" when a third of it
still requires a connection.

## 2. Attribution, every time

Every archived file carries a visible credit block, not a buried footnote:

```
> Originally published by {author}, {source} — {url}
> Archived {date} for personal offline reading. All rights remain with the original author.
```

This is the same pattern read-later apps like Pocket/Instapaper use for cached articles — full text
kept for one person's offline reading, original authorship always visible, not republished publicly.
Skip anything explicitly paywalled; don't archive around a paywall.

## 3. Data model change

Extend the `furtherReading` entries in `src/data/nodes.ts` (currently `{ label, source, url }`) with
an optional `archive` field:

```ts
furtherReading: {
  label: string;
  source: string;
  url: string;
  archive?: {
    status: "full" | "excerpt" | "unavailable";
    path?: string;       // e.g. "content/sources/A1-0.md"
    retrieved?: string;  // ISO date
  };
}[]
```

`status: "unavailable"` is set explicitly for the video/podcast/paywall bucket so the UI can show
"requires internet" instead of silently linking out.

## 4. File layout

```
content/sources/
  A1-0.md   ← node A1, first furtherReading entry
  A1-1.md   ← node A1, second furtherReading entry
  A2-0.md
  ...
```

Each file: frontmatter (title, author, source, url, retrieved date) + the credit block from §2 +
the extracted body text.

## 5. UI change (`src/routes/node.$id.tsx`)

In the existing "Further reading" section (~line 157), each item currently just links out. Change
to: if `archive.status === "full"`, show a "Read offline" expand/link to the local archived content
(with the credit block visible at the top) alongside the existing "↗ open original" link; if
`"unavailable"`, add a small "requires internet" tag; if no `archive` field yet, behave exactly as
today.

## 6. Build order (batches, not one giant pass)

1. Add the `archive` field to the `Node`/`furtherReading` type (no data yet) — confirm build still passes.
2. Write a small script (`scripts/archive-sources.ts`) that reads `nodes.ts`, produces a **dry-run
   triage report** (CSV or markdown: url, domain, bucket, reason) — no fetching of content yet. Review
   this before touching a single file.
3. Run the archiver on **one cluster first** (Cluster A, 5 nodes) — fetch, extract, write markdown,
   update `nodes.ts` for just those nodes, wire up the UI, commit.
4. Once that's confirmed to look right (spot-check 3–4 archived files against the live source), repeat
   cluster by cluster (B → H), committing after each so a bad batch is easy to roll back.
5. Final pass: run `npm run build && npm run lint`, and produce a short summary — how many URLs ended
   up "full", how many "excerpt" (partial/paywall-limited), how many "unavailable."

---

## 7. Prompt to paste into Google Antigravity

```
I'm working in the "unknown" app (Epistemoph / Big Ideas — a personal offline mental-models learning
app, TanStack Router + Vite + TypeScript). Node data lives in src/data/nodes.ts. There's a full plan
at docs/OFFLINE-ARCHIVE-PLAN.md in this repo — read that file first, it has the exact schema, file
layout, and UI changes expected. This message is the executable version of that plan.

GOAL
Every node currently has a `furtherReading` array of { label, source, url } pointing to outside
sites (essays, PDFs, Wikipedia, videos, paywalled news, podcasts). I want the actual source TEXT
copied into this repo as local markdown files, with clear attribution to the original author/site,
so the app is readable fully offline. This is for my personal single-user offline use — not for
public republishing — so always keep the original author/source credited and never strip or hide it.

SCOPE
All 32 nodes in clusters A–H (the only clusters with real content right now). Do not touch or invent
content for the empty clusters I–P.

STEP 1 — Triage first, don't scrape blind
Go through every furtherReading URL in nodes.ts and classify it into one of three buckets:
  (a) "full" — a real article/essay/blog page with substantial body text (e.g. paulgraham.com,
      fs.blog, a16z.com, cdixon.org, nav.al, karpathy.medium.com, eugenewei.com, abovethecrowd.com,
      foundersfund.com, kk.org, gwern.net, slatestarcodex.com, jalammar.github.io, greylock.com,
      usv.com, signalvnoise.com, situational-awareness.ai, darioamodei.com, cold-takes.com,
      pmarchive.com, blakemasters.tumblr.com, lesswrong.com, forum.effectivealtruism.org, and similar).
  (b) "pdf-or-wiki" — PDFs (arxiv, whitepapers, hedge fund/VC memos, academic papers) and Wikipedia
      pages. These need a different extraction path (PDF text extraction; Wikipedia's own API for
      the article extract).
  (c) "unavailable" — YouTube, podcasts, TED talks, paywalled news (WSJ, Bloomberg, NYT, CNBC,
      Fortune, CNN), Netflix/IMDB, or anything else that isn't real extractable body text. Leave
      these exactly as external links — do NOT fabricate a transcript or summary in place of the
      real content, and do NOT try to route around a paywall.

Produce a dry-run report first (a markdown table: url | domain | bucket | reason) and show it to me
before writing any content files, so I can correct any misclassification.

STEP 2 — Schema change
In src/data/nodes.ts, extend the furtherReading item type to:
  furtherReading: {
    label: string;
    source: string;
    url: string;
    archive?: {
      status: "full" | "excerpt" | "unavailable";
      path?: string;       // relative path under content/sources/
      retrieved?: string;  // ISO date, e.g. "2026-07-14"
    };
  }[]
Keep it optional so nothing breaks for entries not yet processed.

STEP 3 — Archiving script
Write scripts/archive-sources.ts (Node/TypeScript, run via tsx or bun) that:
- For bucket (a): fetches the page HTML and extracts the main article body (use @mozilla/readability
  + jsdom, or an equivalent clean-extraction approach — not raw innerText/full page dump).
- For bucket (b) PDFs: downloads the PDF and extracts text (pdf-parse or similar).
- For bucket (b) Wikipedia: uses the Wikipedia REST API to get the page extract, not scraped HTML.
- Writes one markdown file per source to content/sources/<nodeId>-<index>.md with this shape:
    ---
    title: <original page title>
    author: <best-known author, or the publishing org if no named author>
    source: <site name, matches the existing "source" field in furtherReading>
    url: <original url>
    retrieved: <ISO date>
    ---

    > Originally published by {author}, {source} — {url}
    > Archived {date} for personal offline reading. All rights remain with the original author.

    {extracted body text}
- Updates the matching furtherReading entry in nodes.ts with the archive field (status "full" or
  "excerpt" if truncated/partial, path to the file, retrieved date).
- For bucket (c), sets archive.status = "unavailable" and does not create a file.

STEP 4 — Run it in batches, not all at once
Start with Cluster A only (5 nodes, ~15–20 URLs). Show me the output — the triage report plus 2–3
sample archived .md files — before continuing to clusters B through H. Commit after each cluster
with a clear message like "Archive offline sources for Cluster A". This makes a bad extraction easy
to roll back instead of discovering it 200 files deep.

STEP 5 — Wire into the UI
In src/routes/node.$id.tsx, the "Further reading" section (around the existing furtherReading.map)
currently just renders an outbound link per entry. Update it so:
- If archive.status === "full" or "excerpt": show a "Read offline" affordance that displays the
  archived markdown (with its attribution block clearly visible at the top) in addition to the
  existing "open original ↗" link.
- If archive.status === "unavailable": add a small "requires internet" label, no behavior change
  otherwise.
- If archive is undefined (not processed yet): render exactly as it does today.

STEP 6 — Verify
Run npm run build && npm run lint after each cluster batch. At the end, give me a summary count of
how many sources ended up "full", how many "excerpt", and how many "unavailable", plus a list of any
URLs that failed to fetch (dead links, blocked, timed out) so I can review those by hand.

Do not remove the existing outbound links anywhere — this is additive. Do not scrape anything behind
a login or paywall. Do not invent or paraphrase content for sources you couldn't fetch — mark them
"unavailable" and move on.
```
