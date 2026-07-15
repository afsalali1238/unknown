# YouTube Content Plan — 3 new clusters, 18 nodes, from 3 channels

Companion to `CONTENT-EXPANSION-PLAN.md` (same node schema, same "paste into an agent with
web/repo access" pattern). That doc filled empty clusters I–P from the app's own dangling
references. This one pulls fresh material from outside sources — three YouTube channels — and
turns their best ideas into new lattice nodes.

Current state of `src/data/nodes.ts` (checked directly, not from memory): 22 clusters, A–V, all
already populated. Next free single-letter cluster IDs are **W, X, Y** (Z free after that).

## Source channels

| Cluster | Channel      | Handle                                                         | What it actually is                                                                                                                                            |
| ------- | ------------ | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| W       | Aperture     | [@ApertureThinking](https://www.youtube.com/@ApertureThinking) | Philosophy/psychology/society video essays — consciousness, meaning, AI's impact on humanity, where civilization is headed. A show by Underknown.              |
| X       | SleepWise    | [@WiseSleep](https://www.youtube.com/@WiseSleep)               | Long-form calm narration built to fall asleep to, but the actual content is mind-bending science/philosophy: space, consciousness, paradoxes, quantum physics. |
| Y       | Science Time | [@ScienceTime24](https://www.youtube.com/@ScienceTime24)       | Science/tech news digest — space exploration, AI/AR/VR/XR, CRISPR and gene editing, plus philosophical-science crossover topics.                               |

Two extra links were included as **tone/quality benchmarks**, not additional channels — use them
to calibrate the bar for "one idea, well told," not as a fourth source:

- Vsauce, ["Illusions of Time"](https://www.youtube.com/watch?v=zHL9GP_B30E) — how a single video
  can carry several distinct, citable ideas (prospective vs. retrospective timing, why time speeds
  up with age, construal level theory) that could each become their own node.
- A cognitive-bias explainer (search "bias explained" if the direct link 404s) — the kind of tight,
  one-idea-per-node clarity to aim for.

**Before writing anything, check for overlap.** Cluster U (Cognitive Biases), cluster I (Worldview
& Futurism), cluster O (Philosophy & the Self), cluster R (Big Hypotheses), and cluster V (Social
Constructs) already exist and cover adjacent ground. If a candidate idea from one of these channels
is really a duplicate of something an existing cluster already does well, don't force a new node —
either skip it (there will be enough other real ideas) or note it as a `related` link instead. New
clusters W/X/Y are for the ideas that don't already have a home.

## Node schema (must match `Node` type in `src/data/nodes.ts` exactly)

```
id, clusterId, title, author, year, medium, category, thesis, layer0, layer1, layer2,
quiz: { question, options, correctIndex },
related: string[],
furtherReading: [{ label, source, url, archive? }],
tags: string[]
```

For YouTube-sourced nodes specifically:

- `author` — the channel name (or the on-screen narrator/writer if credited), not "YouTube."
- `year` — the video's actual publish year (check it, don't guess).
- `medium` — `"YouTube video essay"` (or similar, matching the existing medium vocabulary in the
  file — check a few existing nodes' `medium` values first for consistency).
- `furtherReading` — at minimum one entry pointing at the real video URL, `source` = channel name.
- `tags` — reuse from the existing `TAGS` list (`Cognitive Biases & Models`, `AI & the Future`,
  `Meaning & Self`, `Health & Body`, etc.) wherever it genuinely fits; add a new tag only if nothing
  in the current list covers it.

## Task

For **each of the 3 channels**, find that channel's **6 best standalone ideas** — not necessarily 6
different videos 1:1. A single meaty video (like the Vsauce example above) can yield more than one
node if it genuinely contains multiple independent, citable ideas; a thin video yields zero. The bar
is "would a reader want this as its own permanent card in the lattice," same bar the other 190+
nodes in this app already clear.

### Step 1 — Research per channel, propose titles first

For each channel: pull its actual video list (channel page, search, or "sort by popular"), skim for
substantive, idea-dense videos (avoid pure listicles/clickbait with no real thesis), and draft:

- A cluster title + one-line subtitle (I've suggested starting angles above — refine after you've
  actually seen what each channel covers, don't just take my guess at face value).
- 6 node titles + one-sentence thesis each, with the source video (title + URL) noted next to each.

**Stop here and show the 3×6 title list before writing full content** — cheap checkpoint, same
reason as the other content-expansion doc: catching a wrong direction on 18 nodes is expensive to
redo after the fact.

### Step 2 — Write full nodes, one channel/cluster at a time

Order: W (Aperture) → X (SleepWise) → Y (Science Time). For each node:

- `layer0` — plain-English version of the idea, no jargon.
- `layer1` — the actual mechanism/argument the video makes for it.
- `layer2` — how to apply or test the idea, or what it changes about how you think.
- One multiple-choice `quiz` with a clearly-defensible correct answer.
- Original synthesis in your own words — **never transcribe or close-paraphrase the video's
  narration**. Watch/read the transcript, extract the idea, write it fresh. This matches the
  copyright posture already used for every other node in this file.
- Wire `related`: within the same new cluster where ideas connect, and outward to existing nodes in
  U/I/O/R/V where there's a genuine thematic link (this is also how you catch the overlap case from
  the note above — if you're about to write 3+ `related` links to one existing cluster, that's a
  sign the idea might belong there instead of in W/X/Y).

### Step 3 — Verify

Run `npm run build && npm run lint`. Confirm no duplicate node IDs (W1–W6, X1–X6, Y1–Y6). Confirm
every `related` reference resolves. Commit per cluster ("Add Cluster W — Aperture (6 nodes)"), not
one giant commit.

### Step 4 — Report

Final node/cluster count, any candidate idea you dropped for being too thin or too duplicative of
an existing cluster (and why), and the final cluster titles/subtitles you landed on after actually
watching the source material.

---

## Prompt to paste into an agent with web + repo access

```
I'm working in the "unknown" app (Epistemoph / Big Ideas), src/data/nodes.ts holds all content.
There's a full plan at docs/YOUTUBE-CONTENT-PLAN.md in this repo — read that first, it has the
exact schema, channel list, and reasoning. This message is the executable version of it.

GOAL
Pull the best 6 standalone ideas from each of these 3 YouTube channels and turn them into 18 new
lattice nodes across 3 new clusters (W, X, Y — confirmed free by checking the current CLUSTERS
array, which runs A–V):
  - Aperture — https://www.youtube.com/@ApertureThinking (philosophy/psychology/society/AI-future
    video essays)
  - SleepWise — https://www.youtube.com/@WiseSleep (calm long-form narration, but content is
    space/consciousness/paradox/quantum-physics)
  - Science Time — https://www.youtube.com/@ScienceTime24 (science/tech news: space, AI, AR/VR/XR,
    CRISPR, philosophical-science crossover)

Two reference links for tone/quality bar only, not additional source channels: Vsauce's "Illusions
of Time" (https://www.youtube.com/watch?v=zHL9GP_B30E) and a cognitive-bias explainer — both show
the "one idea, well told, easy to make into a card" bar to aim for.

BEFORE WRITING: check clusters U (Cognitive Biases), I (Worldview & Futurism), O (Philosophy & the
Self), R (Big Hypotheses), V (Social Constructs) for overlap — skip or cross-link instead of
duplicating if a candidate idea already has a real home there.

STEP 1 — Research each channel's actual video list, draft cluster title+subtitle and 6 node
titles+one-line thesis per channel (18 total), each with its real source video title + URL. Stop
and show me this list before writing full content.

STEP 2 — Once I confirm, write all 18 nodes matching the Node type exactly (id, clusterId, title,
author, year, medium, category, thesis, layer0, layer1, layer2, quiz, related, furtherReading,
tags), in original synthesis — never transcribe or close-paraphrase video narration. author = channel
name, year = real publish year, furtherReading includes the real video URL. Reuse existing TAGS
where they fit. Wire related links within cluster and outward to overlapping existing clusters.

STEP 3 — Run npm run build && npm run lint. Confirm no duplicate IDs, all related links resolve.
Commit per cluster, not one giant commit.

STEP 4 — Report: final counts, anything you dropped and why, final cluster titles/subtitles after
actually reviewing the source videos.
```
