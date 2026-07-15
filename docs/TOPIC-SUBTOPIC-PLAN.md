# Topic & Subtopic Restructuring + Content Expansion Plan

Companion to `CONTENT-EXPANSION-PLAN.md` (which filled the originally-empty clusters). This doc
covers the next request: formalize a topic → subtopic hierarchy, audit what exists against it, and
scope three new topics (Philosophy, Big Hypotheses, Modern Creator Philosophy). **Planning only —
no code or content changes made yet.**

---

## 1. Current state, audited directly against `src/data/nodes.ts`

17 clusters (`A`–`Q`), 155 nodes total. Each node has a `clusterId` (the de facto "topic") and a
free-text `category` field that was *supposed* to act as subtopic but is inconsistent:

| Cluster | Title | Nodes | `category` values actually used |
|---|---|---|---|
| A | Startup Fundamentals | 12 | VC Doctrine |
| B | Company Origins | 7 | Pitch Deck, Worldview |
| C | Fraud & Short Cases | 11 | Short / Activist |
| D | Macro & Investing | 12 | Macro Memo, VC Doctrine |
| E | Finance Theory | 1 | Technical Paper |
| F | Foundational Tech | 5 | Technical Paper, Worldview |
| G | AI / ML Papers | 10 | AI Essay, Technical Paper |
| H | Crypto | 8 | Crypto, Technical Paper, VC Doctrine |
| I | Worldview & Futurism | 23 | AI Essay, Sector Report, VC Doctrine, Worldview |
| J | Mental Models | 30 | Applied Mental Models, Decision-Making, Game Theory, Learning, Mental Models, Psychology, Reasoning, Self-Improvement, Systems Thinking, Thinking |
| K | Compounding & Time | 4 | Time |
| L | Decision-Making | 6 | Decisions |
| M | Systems & Incentives | 4 | Systems |
| N | Craft & Focus | 4 | Craft |
| O | Mind, Self & Meaning | 6 | Philosophy of Meaning, Philosophy of Mind, Neuroscience, Evolutionary Biology |
| P | Almanack of Naval Ravikant | 6 | Decision-Making, Happiness, Learning, Relationships & Compounding, Wealth Creation |
| Q | Practical Wisdom | 6 | Big History, Health & Longevity, Power & Strategy, Psychology of Achievement, Psychology of Learning, Social Skills |

**The problem:** `category` conflates two different axes.

- In clusters A, B, C, D, F, G, H, I it describes **document genre** (VC Doctrine, Pitch Deck,
  Technical Paper, Sector Report, Worldview manifesto) — useful, but it's not a subtopic, it's a format.
- In clusters J, O, P, Q it describes an actual **thematic subgroup** (Game Theory, Philosophy of
  Mind, Wealth Creation) — this is real subtopic information, just not modeled as one.
- Cluster J is the clearest case for fixing: 30 nodes, 10 different ad-hoc category strings, several
  near-duplicates (`Decision-Making` vs `Decisions`, `Systems` vs `Systems Thinking`, `Mental Models`
  vs `Applied Mental Models`). Nobody browsing cluster J today can tell it's actually ~6 coherent
  subtopics wearing 10 inconsistent labels.

There's also a separate `TAGS` list (19 fixed values: Startups & Founders, Risk & Asymmetric Bets,
Meaning & Self, etc.) — that's a working cross-cutting filter layer and shouldn't be touched; it's
orthogonal to topic/subtopic and solves a different problem (finding an idea across clusters).

---

## 2. Proposed schema (topic → subtopic → node)

Keep `Cluster` as the **topic** layer (rename is optional, cosmetic). Add a formal **subtopic** layer
to replace the dual-purpose `category` field, splitting it into two real fields:

```ts
export type Node = {
  id: string;
  clusterId: string;      // topic
  subtopicId: string;     // NEW — closed enum, scoped per cluster
  docType: string;        // renamed from `category` — genre only: Essay, Memo, Paper, Pitch Deck, Book, Manifesto
  ...
};

export type Subtopic = { id: string; clusterId: string; title: string };
export const SUBTOPICS: Subtopic[] = [
  { id: "J-mental-models", clusterId: "J", title: "Core Mental Models" },
  { id: "J-decision", clusterId: "J", title: "Decision-Making Under Uncertainty" },
  { id: "J-game-theory", clusterId: "J", title: "Game Theory" },
  { id: "J-psych", clusterId: "J", title: "Psychology & Bias" },
  { id: "J-systems", clusterId: "J", title: "Systems Thinking" },
  { id: "J-learning", clusterId: "J", title: "Learning & Self-Improvement" },
  // ...one row per cluster that needs real subgrouping
];
```

Not every cluster needs subtopics — a cluster with 4–8 nodes (K, L, M, N) is already small enough to
browse flat. Subtopics earn their place where a cluster has 10+ nodes covering genuinely different
sub-themes: **J (30), I (23), and the new Philosophy topic below** are the clear candidates. Smaller
clusters keep a single implicit subtopic or none.

This is additive and low-risk: existing `related` links, `id`s, and `TAGS` don't change. It's a
one-file edit (`nodes.ts`) plus a UI grouping change wherever clusters are rendered
(`src/routes/index.tsx` likely, not yet inspected in detail).

---

## 3. What to do with existing clusters before adding new ones

Two of the three new topics you want overlap with clusters that already exist — worth fixing this
mapping *before* writing new content, otherwise you'll get duplicate coverage.

- **Cluster O ("Mind, Self & Meaning", 6 nodes)** already contains Camus (*The Myth of Sisyphus* —
  absurdism), Frankl (*Man's Search for Meaning*), Metzinger and Hoffman (philosophy of mind /
  consciousness), and Dawkins (evolutionary grounding). This is 80% of the way to being a real
  "Philosophy" topic already — **recommend broadening O rather than creating a separate new
  Philosophy topic from scratch.** Add subtopics and fill gaps (see §4).
- **Cluster I ("Worldview & Futurism", 23 nodes)** already contains Bostrom's *Superintelligence*,
  Yudkowsky's *AGI Ruin*, and MacAskill's *What We Owe the Future* — i.e. it already covers
  AI-x-risk and longtermism. The new "Big Hypotheses" topic should stay scoped to genuinely
  *different* open questions (simulation, Fermi paradox, free will, panpsychism) so it doesn't
  reduplicate I's AI-futurism material.

---

## 4. New topic 1 — Philosophy (expand cluster O)

Reframe O from "6 disconnected thinkers on the self" into a real Philosophy topic with subtopics.
Keep the 6 existing nodes, add ~10–12 to cover schools of thought not yet represented.

| Subtopic | Existing nodes | Gaps to add (candidate primary sources) |
|---|---|---|
| Existentialism & Absurdism | Camus, *Myth of Sisyphus* | Sartre, *Existentialism Is a Humanism*; Kierkegaard, *The Sickness Unto Death* (or a synthesis of his concept of anxiety/authenticity) |
| Stoicism | — | Marcus Aurelius, *Meditations*; Epictetus, *Enchiridion*; Seneca, *Letters from a Stoic* (pick 1–2, not all 3) |
| Eastern Thought | — | *Tao Te Ching* (Lao Tzu) or Alan Watts' synthesis of it; a Buddhist primary text (*Dhammapada*) or Thich Nhat Hanh |
| Nihilism & Meaning-Making | Frankl, *Man's Search for Meaning* | Nietzsche, *Thus Spoke Zarathustra* / *The Gay Science* (the "God is dead" / will-to-power thread) |
| Philosophy of Mind & Consciousness | Metzinger, Hoffman | Chalmers, *Facing Up to the Problem of Consciousness* (the "hard problem" paper — canonical, citable) |
| Biological/Evolutionary Grounding | Dawkins, *The Selfish Gene* | (covered — no gap) |

Target: **11–12 new nodes**, bringing O to ~17–18 total.

---

## 5. New topic 2 — Big Hypotheses / Open Questions (new cluster, e.g. `R`)

Speculative, foundational, empirically-or-philosophically-unsettled questions — deliberately scoped
away from I's AI/futurism material. 6 nodes to start (same pattern as O/P/Q's original 6-part scope).

| Subtopic | Candidate primary source |
|---|---|
| Simulation Hypothesis | Nick Bostrom, "Are You Living in a Computer Simulation?" (2003) — distinct paper from *Superintelligence*, already in I |
| Fermi Paradox & Great Filter | Robin Hanson, "The Great Filter" (1998), or a synthesis of the classic Fermi paradox framing |
| Free Will Debate | Sam Harris, *Free Will* (2012), or Robert Sapolsky, *Determined* (2023) — pick one |
| Consciousness — Panpsychism | Philip Goff, *Galileo's Error* (2019) — distinct angle from O's Chalmers/Metzinger (hard problem vs. panpsychist answer to it) |
| Anthropic Reasoning / Boltzmann Brains | A synthesis piece on the anthropic principle / fine-tuning problem |
| Mathematical Universe Hypothesis | Max Tegmark, *Our Mathematical Universe* (2014) |

Target: **6 new nodes**, cluster R.

---

## 6. New topic 3 — Modern Creator Philosophy — **revised: split into two topics, not one**

You flagged this correctly: cramming Dan Koe + four other writers into one 5–6 node cluster means
Dan Koe gets exactly one node — thin, given how important this topic is to you. The existing
precedent in this project is cluster P, which gives **Naval alone** a full 6-node topic. Dan Koe
deserves the same treatment, not a 1/5 share of a shared cluster. So: two separate new topics
instead of one.

### 6a. New topic — Dan Koe (dedicated cluster, e.g. `S`)

Mirrors cluster P's shape exactly: one person, one topic, several nodes each covering a distinct
core framework (not one node trying to summarize everything he's written). Proposed 6 subtopics —
adjust freely, this is my read of his most recognizable recurring frameworks, not yet
source-verified:

| Subtopic | What it covers |
|---|---|
| Self-Authorship | Identity design — deciding who you want to become rather than defaulting to conditioning |
| The One-Person Business | Productized knowledge, leverage without employees or a team |
| High-Income Skill Stacking | How he frames acquiring and combining monetizable skills |
| Content as Compounding Leverage | Writing/content strategy — the "2 Hour Writer" / audience-building approach |
| Focus in the Attention Economy | Deep work framed against algorithmic distraction — "The Art of Focus" territory |
| Ego, Nihilism & the Modern Self | His more philosophical essays — ego death, meaning-making outside religion/tradition |

Target: **6 nodes**, dedicated cluster, same depth as Naval's P.

### 6b. New topic — Modern Creator Essayists (separate cluster, e.g. `T`)

The rest of the shortlist (Perell, Sahil Bloom, Le Cunff/Eliason), kept **out** of Dan Koe's cluster
so his topic stays focused and theirs doesn't get diluted by association. One subtopic per writer to
start — can deepen individually later the same way Dan Koe's topic just did, if any of them turns out
to matter as much to you.

| Subtopic (the idea) | Likely author/source |
|---|---|
| Writing as Leverage | David Perell — online writing as a compounding asset |
| Curiosity-Driven Frameworks | Sahil Bloom — newsletter-style mental-model synthesis |
| Systems Over Goals / Mindful Productivity | Anne-Laure Le Cunff (Ness Labs) or Nat Eliason |

Target: **3 nodes** to start, cluster T.

**Flag before writing (applies to both 6a and 6b):** unlike the books/papers used elsewhere in this
project, these are living newsletters/blogs/YouTube scripts — exact essay titles, dates, and URLs
need a live web-search verification pass before drafting, to avoid citing something retitled,
paywalled, or taken down since. Treat both tables as *candidate subtopics + likely source themes*,
not confirmed sources yet.

---

## 7. Totals if this is approved as scoped

| Topic | New nodes | Resulting cluster size |
|---|---|---|
| O — Philosophy (expanded) | +11–12 | ~17–18 |
| R — Big Hypotheses (new) | +6 | 6 |
| S — Dan Koe (new, dedicated) | +6 | 6 |
| T — Modern Creator Essayists (new) | +3 | 3 |
| **Total new content** | **~26–27 nodes** | 155 → ~181–182 |

Plus the schema change in §2 (`subtopicId` field, `SUBTOPICS` list, applied first to J, I, and the
expanded O since those are the clusters with 10+ nodes).

---

## 8. Suggested build order

1. Ship the schema change first (§2) on existing data — zero new content risk, makes J immediately
   easier to browse, and gives O/R/S a subtopic slot to land in from day one.
2. Philosophy (O) next — lowest risk, already 50% built, clearest source list (canonical texts).
3. Big Hypotheses (R) — small, self-contained, sources are well-established (Bostrom, Tegmark, etc.).
4. Dan Koe (S) — do this before T, since it's the one you said matters most; needs the web-search
   verification pass on live source URLs first (his content is newsletter/YouTube-based, not books).
5. Modern Creator Essayists (T) last — same verification need, lower priority than S.

---

## 9. Open decisions for you to confirm before implementation

- OK to fold Philosophy into cluster O (relabel/broaden it) rather than spinning up a fully separate
  cluster? This avoids duplicate coverage of Camus/Frankl-style content.
- Pick one per gap where I listed 2–3 candidates (e.g. Marcus Aurelius vs. Epictetus vs. Seneca for
  Stoicism; Harris vs. Sapolsky for free will) — or say "your call" and I'll pick during drafting.
- Does the Dan Koe 6-subtopic breakdown (§6a) match how you'd actually describe his work, or does it
  miss/misname a framework he's known for? This is my read of his public material, not yet verified
  against his actual essays — worth you sanity-checking before I go source-verify it.
- Confirm the "Modern Creator Essayists" shortlist (Perell, Sahil Bloom, Le Cunff/Eliason) for cluster
  T is right, or swap any of them out — and confirm keeping T separate from Dan Koe's cluster (rather
  than merging them back together) matches what you meant by "different topics and subtopics."
