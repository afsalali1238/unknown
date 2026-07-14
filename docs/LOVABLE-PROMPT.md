# Lovable Build Prompt — Epistemoph

_Paste everything below the line into Lovable. Build it screen by screen if Lovable stalls on the whole thing — start with the Shell + Map, then Node, then Review, then You._

---

## What I'm building

Build **Epistemoph** — a mobile-first PWA that's a cross-linked, layered, audio-narrated map of the world's most powerful ideas. It is built to help people _retain_ ideas, not just read them. Every idea is a **node**, taught in progressive layers, wired to related nodes, and drilled with spaced repetition until it sticks.

Think: Farnam Street's "latticework of mental models" turned into an actual app, with Duolingo-style retention mechanics.

## Stack & constraints

- React + TypeScript + Vite + Tailwind CSS + React Router.
- **No backend.** All user data (progress, streak, bookmarks, quiz results, notes) lives in `localStorage`. Include export/import JSON backup.
- Mobile-first, installable PWA. Design for a 390px-wide phone first, then scale up to a centered max-w-2xl reading column on desktop.
- Clean, editorial, calm. Not a dashboard. It should feel like a beautiful reading app.

## Design system (use these tokens, no other colors)

- `paper` = warm off-white background `#FAF8F3`
- `ink` = near-black text `#1A1A17`
- `ink-soft` = muted grey `#6B6B63` (metadata, labels)
- `line` = hairline borders `#E5E1D8`
- `accent` = a single confident color for actions/links/badges — deep amber `#B45309`
- Typography: a serif display font for titles/headings (e.g. "Fraunces" or "Newsreader"), a clean sans for body (e.g. "Inter"), and a mono for labels/metadata/counts.
- Generous whitespace, hairline `line` borders instead of heavy cards, uppercase mono micro-labels, 44px minimum tap targets.

## Data model

A `Node` (the atomic unit):

```ts
{
  id: string;               // "A1"
  clusterId: string;        // "A"
  title: string;
  author: string;
  year: number;
  medium: string;           // "Essay" | "Memo" | "Paper" | "Model"...
  category: string;
  thesis: string;           // one-line takeaway
  layer0: string;           // plain English
  layer1: string;           // the mechanism / why it works
  layer2: string;           // hands-on: apply it yourself
  quiz: { question: string; options: string[]; correctIndex: number };
  related: string[];        // ids of related nodes (the latticework links)
  furtherReading: { label: string; source: string; url: string }[];
}
```

Clusters group nodes (e.g. "Startup Fundamentals", "Mental Models", "Crypto", "Macro & Investing"). Seed with ~8 clusters and ~4 sample nodes each so the app feels real — mix mental models (Inversion, Compounding, Second-Order Thinking) and primary documents (Do Things That Don't Scale, Bitcoin whitepaper).

User progress in `localStorage`:

```ts
{
  gotIt: Record<string, boolean>;
  bookmarks: Record<string, boolean>;
  review: Record<string, { box: number; due: number; lastResult?: "correct"|"incorrect" }>; // Leitner spaced repetition, boxes 0-5
  streakDays: string[];   // ISO dates
  lastNodeId?: string;    // for "Continue"
}
```

## Navigation — 3 tabs only (this is critical)

A fixed **bottom nav bar** with exactly three tabs. Do NOT make a flat menu of six items.

1. **Map** (home)
2. **Review** — with a small `accent` count badge showing how many nodes are due
3. **You** — profile/support surfaces

The **Node** screen is not a tab — you navigate to it from Map or Review.

## Screens

### 1. Map (home) — always answers "what do I do next?"

- Top: a **Continue** card (resume `lastNodeId`) and a **Due today** card (count of nodes due for review) side by side. These come first, before browsing.
- Below: clusters as horizontal sections. Each cluster = a title + subtitle + a horizontal scroll row of node cards. Node card shows title, author·year, medium tag, and a subtle progress ring / checkmark if completed.
- A search bar pinned at top for full-text search across nodes.

### 2. Node (the hero screen — 90% of time is spent here)

- Clean single reading column, serif title, mono metadata line (author · year · medium · cluster).
- **Progressive disclosure of layers** — do NOT dump all three at once:
  - Show **Layer 0** (plain English). A button "Show me how it works" reveals **Layer 1** (mechanism). Then "Apply it" reveals **Layer 2** (hands-on).
- After the layers: a **quiz** (multiple choice, immediate feedback, updates the Leitner box).
- Then the one-line takeaway shown **blurred**, with a "Tap to reveal" — an active-recall check.
- Then **Related ideas** — a bold, designed section (NOT grey footer links). Each is a tappable card linking to another node, ideally across clusters. This is the payoff of the app.
- At the very end: "Further reading" (external source links) and a **star/bookmark** button.
- A **sticky audio bar** at the bottom (above the nav) with play/pause and scrub — sentence-level highlight of the text as it plays (mock the audio for now with a placeholder track; just build the synced-highlight UI).
- When a node finishes, show a card: _"If you liked [this], here's how it connects to [related node]"_ → tap to go to the next node.

### 3. Review (the retention loop — one job)

- Shows only nodes that are **due** (Leitner `due <= now`).
- Present each as the quiz's **scenario/question first** (not the node title — this defeats the illusion of competence). User answers → correct moves it up a box (longer interval), incorrect resets it → next due node.
- Empty state when nothing's due: "You're all caught up. Come back tomorrow." with the streak shown.

### 4. You (support surfaces, tucked away)

- Streak + simple stats (nodes learned, in review, mastered).
- **Reading List** (saved external links/topics to get to later).
- **Glossary** (searchable terms).
- **Scratchpad** (freeform notes, localStorage).
- Export / import backup buttons.

## Design principles Lovable must obey

1. Always answer "what next?" — Continue + Due today are the first thing on Map.
2. The node is the hero: one calm reading column, layers gated behind taps.
3. Cross-links are loud, not buried — Related ideas is a designed, prominent section.
4. One visual system everywhere — the tokens above, no stray colors, no heavy cards.
5. Retention over reach — streak and due-badge are always visible; depth beats catalog size.

## Build order if needed

Shell + bottom nav + Map → Node screen → Review → You. Seed data first so every screen has real content to render.
