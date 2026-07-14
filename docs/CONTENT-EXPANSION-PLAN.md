# Content Expansion Plan — filling the 8 empty clusters

Companion to `OFFLINE-ARCHIVE-PLAN.md`. That doc handles archiving sources for the 32 nodes that
already exist. This one handles writing the nodes that don't exist yet — which is why Naval Ravikant
isn't showing up: cluster O ("The Almanack of Naval Ravikant") has the label defined in `CLUSTERS`
but zero nodes in `NODES`. Same for 7 other clusters.

## 1. Exactly how many nodes are missing, and where

Checked directly against `src/data/nodes.ts`: clusters A–H have exactly 4 nodes each (32 total, real
content). Clusters I–P have the cluster label defined but **zero nodes** — confirmed by counting.

But the existing 32 nodes' `related` arrays already reference specific IDs in those empty clusters
(e.g. node A1 links to `"I1"`) — 133 such dangling references exist in total, and their distribution
tells you exactly how many nodes each empty cluster was originally scoped for:

| Cluster                            | Subtitle                                                                   | Nodes needed | IDs    |
| ---------------------------------- | -------------------------------------------------------------------------- | ------------ | ------ |
| I — Company Origins                | "The actual pitch decks and memos that started famous companies"           | 7            | I1–I7  |
| J — Fraud & Short Cases            | "How professional skeptics spot a lie in a balance sheet"                  | 11           | J1–J11 |
| K — Foundational Tech              | "The plumbing ideas the entire internet and modern finance sit on"         | 6            | K1–K6  |
| L — AI / ML Papers                 | "The technical papers that built the modern AI stack, in order"            | 10           | L1–L10 |
| M — Worldview & Futurism           | "The biggest, most abstract bets on how the future unfolds"                | 23           | M1–M23 |
| N — Mind, Self & Meaning           | "Six thinkers on the self, the absurd, and what it means to be a person"   | 6            | N1–N6  |
| O — The Almanack of Naval Ravikant | "Wealth, judgment, and happiness in six parts"                             | 6            | O1–O6  |
| P — Practical Wisdom               | "Widely-read life-advice bestsellers, closer to lived tactics than theory" | 6            | P1–P6  |

**75 nodes total.** Good news: the subtitles for N and O already describe exactly 6 parts each, which
lines up with the 6 dangling references — the original plan for those two clusters was already this
specific, it just never got written.

(Separately, clusters A, B, D, F, G also have dangling references beyond their current 4 nodes each —
58 more, e.g. A5–A15, B5–B30 — meaning those clusters were meant to grow too. That's a good phase 2
once I–P is done; not in scope for this round.)

## 2. How to figure out _what_ each numbered node should actually be

Nobody left a title next to "I1" — just the ID. But the existing nodes that link to it are a real clue.
Example already found by grepping: `A1` (Do Things That Don't Scale), `A2` (Product/Market Fit), `A3`
(Default Alive vs Default Dead), and `A4` (The Idea Maze) all link forward to `I1` — since cluster I is
"the actual pitch decks and memos that started famous companies," and those four are all early-stage
startup mechanics essays, `I1` was clearly meant to be a famous early pitch deck or founding memo
(Airbnb's seed deck, Uber's 2008 "UberCab" deck, or similar). That kind of reverse-engineering — "who
already points here, and why" — is the fastest way to recover the original intent for each ID, cluster
by cluster.

## 3. Content shape (must match the existing 32 nodes exactly)

Every new node follows the `Node` type in `src/data/nodes.ts` — same fields as the existing content:
`id, clusterId, title, author, year, medium, category, thesis, layer0, layer1, layer2, quiz, related,
furtherReading, tags`. Written in original language (a synthesis, not a close paraphrase) — same
copyright posture the spec already uses for the existing 32. `furtherReading` entries created here feed
directly into the offline-archive pipeline from the companion doc once written.

## 4. Build order

1. Pick one cluster to start — Naval Ravikant (O) is the obvious first pick since it's the one you
   asked about, it's fully scoped (6 nodes, subtitle already names the shape), and there's already a
   real bibliography sitting in the existing `furtherReading` links (nav.al, sloww.co, Knowledge
   Project podcast, Tim Ferriss, Joe Rogan, several Medium recaps) to draw the six actual themes from
   (wealth creation, specific knowledge, long-term games, happiness, judgment, reputation/leverage).
2. Draft all 6 titles + one-line thesis for the cluster first, show them before writing full layer0/1/2
   content — cheap checkpoint to catch a wrong direction early.
3. Write full node content for the cluster, wire in `related` links (both to existing nodes that
   already point here, and forward to other new nodes in the same cluster).
4. Run `npm run build && npm run lint`, verify no duplicate IDs, verify every `related` reference now
   resolves to something real.
5. Repeat cluster by cluster: N → P → K → I → J → L → M (roughly easiest/most self-contained first,
   M last since it's the biggest at 23 nodes).

---

## 5. Prompt to paste into Google Antigravity

```
I'm working in the "unknown" app (Epistemoph / Big Ideas), src/data/nodes.ts holds all content.
There's a full plan at docs/CONTENT-EXPANSION-PLAN.md in this repo — read that first, it has the
exact node counts, IDs, and reasoning. This message is the executable version of it.

BACKGROUND
CLUSTERS in nodes.ts defines 16 clusters (A–P). Only A–H have nodes (4 each, 32 total, real content).
I–P are empty labels with zero nodes. The 32 existing nodes already reference specific IDs in the
empty clusters through their `related` arrays (e.g. a node in cluster A links to "I1") — these are
dangling today but they tell you exactly how many nodes each empty cluster needs and give context
clues for what each one should be about.

GOAL
Write real nodes for all 8 empty clusters, matching the exact shape, tone, and quality bar of the
existing 32 nodes in the same file. Do not touch or renumber the existing A–H nodes.

EXACT SCOPE (verified by counting dangling `related` references against each cluster's subtitle):
  I — Company Origins (subtitle: "the actual pitch decks and memos that started famous companies") — 7 nodes, I1–I7
  J — Fraud & Short Cases (subtitle: "how professional skeptics spot a lie in a balance sheet") — 11 nodes, J1–J11
  K — Foundational Tech (subtitle: "the plumbing ideas the entire internet and modern finance sit on") — 6 nodes, K1–K6
  L — AI / ML Papers (subtitle: "the technical papers that built the modern AI stack, in order") — 10 nodes, L1–L10
  M — Worldview & Futurism (subtitle: "the biggest, most abstract bets on how the future unfolds") — 23 nodes, M1–M23
  N — Mind, Self & Meaning (subtitle: "six thinkers on the self, the absurd, and what it means to be a person") — 6 nodes, N1–N6
  O — The Almanack of Naval Ravikant (subtitle: "wealth, judgment, and happiness in six parts") — 6 nodes, O1–O6
  P — Practical Wisdom (subtitle: "widely-read life-advice bestsellers, closer to lived tactics than theory") — 6 nodes, P1–P6
75 nodes total.

STEP 1 — Recover intent per ID
For every target ID (I1...I7, J1...J11, etc.), grep the existing 32 nodes' `related` arrays for who
already links to it, and read those nodes' title/thesis/category. Use that as the strongest signal for
what the missing node should actually be about — a cluster of early-stage-startup essays linking
forward into "I1" (Company Origins) means I1 is very likely a famous early pitch deck or founding memo,
not a random company history. Do this lookup fresh yourself; don't assume any specific mapping without
checking, but if the plan doc's §2 example (A1–A4 → I1) still holds after your own check, that's a
strong hint of the pattern to repeat for the rest.

STEP 2 — Pick real, verifiable primary sources/ideas per cluster, then confirm before writing
Research (web search) real, well-known primary sources per cluster theme:
  - O (Naval): the actual structure of "The Almanack of Naval Ravikant" gives you six natural parts —
    use the real book's throughlines (e.g. wealth creation / specific knowledge & leverage / judgment
    & decision-making / long-term games & reputation / happiness as a skill / reprogramming the mind)
    rather than inventing generic titles. There's already a partial bibliography sitting in this
    file's furtherReading links (nav.al, sloww.co, the Knowledge Project podcast episode, Tim Ferriss
    and Joe Rogan episodes with Naval, several Medium recaps of the "How to Get Rich (without getting
    lucky)" tweetstorm) — use those as your source list, in your own words, not close paraphrase.
  - I (Company Origins): real primary documents — Airbnb's original seed deck, Uber's 2008 "UberCab"
    deck, Facebook's early ad pitch deck, Sequoia's YouTube investment memo, Amazon's shareholder
    letters, etc. (some of these URLs already exist elsewhere in this file's furtherReading lists —
    check for and reuse them rather than re-deriving new links).
  - J (Fraud & Short Cases): real, well-documented short-seller cases — Hindenburg's Nikola report,
    Muddy Waters/Sino-Forest, Jim Chanos and Enron, Bill Ackman/Herbalife, the "superinvestors" essay
    tradition, etc. — several of these already have furtherReading URLs sitting in the existing file,
    reuse them.
  - K, L, M, N, P: same approach — look at what furtherReading URLs already exist in the file that
    don't yet have a home in any A–H node's core content (Shannon's information theory paper, the
    PageRank paper, word2vec/ResNet/Transformer/GPT papers, Bitter Lesson, existential philosophy
    entries — Camus, Frankl, Metzinger — self-help staples like How to Win Friends, 48 Laws of Power)
    and use those as the working source list per cluster before inventing anything new.
For each cluster, draft just the 6–23 titles + one-line thesis first and hold here — don't write full
layer0/1/2 content for a whole cluster until I've confirmed the title list looks right, since a wrong
direction on 23 nodes (Worldview & Futurism) is expensive to redo.

STEP 3 — Write full nodes, one cluster at a time
Order: O (Naval, 6) → N (6) → P (6) → K (6) → I (7) → J (11) → L (10) → M (23, last, biggest).
For each node, write all fields to match the Node type exactly (id, clusterId, title, author, year,
medium, category, thesis, layer0, layer1, layer2, quiz, related, furtherReading, tags) in the same
voice as the existing 32 — plain-language layer0, mechanism-focused layer1, applied layer2, one
multiple-choice quiz with a clearly-defensible correct answer, tags pulled from the existing TAGS list
(add a new tag only if truly nothing fits), and 1–3 furtherReading entries per node with real URLs.
Wire `related` both ways: link forward/backward to other new nodes in the same cluster where it makes
sense, and where an existing A–H node already dangling-references this ID, that link now resolves —
double check it still makes sense in context.
Content must be original synthesis in your own words — never close-paraphrase or copy source text
directly into layer0/1/2 (that's what the separate offline-archive pipeline is for, not this one).

STEP 4 — Verify after each cluster
Run npm run build && npm run lint. Confirm no duplicate node IDs. Confirm every `related` array across
the WHOLE file (not just the new cluster) that pointed at this cluster's IDs now resolves to a real
node. Commit with a message like "Add Cluster O — Almanack of Naval Ravikant (6 nodes)" per cluster,
not one giant commit at the end.

STEP 5 — Report at the end
Tell me: final node count, any target ID you couldn't confidently source a real primary document/idea
for (flag it rather than inventing something thin), and confirm the dangling-related-link count is now
at or near zero.
```
