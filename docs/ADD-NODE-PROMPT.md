# Prompt: turn raw content into a node

Paste this, then paste your source material (an article, essay, transcript, your own notes,
whatever) right after it.

---

You're adding content to `src/data/nodes.ts` in the "Unknown" app (a cross-linked, layered
knowledge map — Munger's latticework as a product). I'm giving you raw source content below.
Turn it into one or more nodes matching the existing `Node` type and house style exactly.

**Node shape (every field required unless marked optional):**

```ts
{
  id: string,          // clusterId + next free number, e.g. "O24", "U9", "V9" — check the file for the highest existing number in that cluster first
  clusterId: string,    // which existing cluster (A-V) this belongs in — ask me if it's not obvious, don't guess on a new cluster
  title: string,
  author: string,
  year: number,          // negative for BCE
  medium: string,        // Essay, Book, Paper, Journal, Letters, Text, etc.
  category: string,      // short subtopic label within the cluster
  thesis: string,        // one sentence, the core claim
  layer0: string,        // plain-language explanation — what it says and why, ~100-150 words
  layer1: string,        // the mechanism — how/why it works, the sharpest and longest layer, ~120-180 words
  layer2: string,        // one reflective prompt applying it to the reader's own life/situation, one or two sentences, phrased as a question
  quiz: {
    question: string,
    options: string[4],  // exactly 4, one clearly correct
    correctIndex: number,
  },
  tags: string[],        // pull from the existing TAGS array in the file — only add a new tag if truly nothing fits
  related: string[],     // other node IDs — link within the new content AND back to existing nodes where there's a real thematic connection (check existing nodes for good cross-links, this is the whole point of the app)
  furtherReading: [{ label: string, source: string, url: string }],  // 1-3 entries, real working URLs only
}
```

**Non-negotiable rules:**

1. **Never fabricate a source.** If my pasted content doesn't give you a clear primary source
   (author, title, year), tell me what's missing instead of inventing one. If you need to find a
   real URL for `furtherReading`, use web search — don't guess a URL.
2. **Original synthesis, not paraphrase.** Write layer0/1/2 in your own words. Don't lift sentences
   from what I paste you, even reworded lightly — this project's whole copyright posture depends on
   that.
3. **Match the existing tone.** Read 2-3 existing nodes in the same cluster first (or a similar one
   if the cluster is new) before writing. House style: confident, plain, no hedging filler, single
   quotes for inner emphasis (never a literal `"` inside a double-quoted string), em dashes for
   asides, layer2 always ends in a question mark.
4. **Quiz has one defensibly correct answer**, not a trivia gotcha — it should test whether someone
   actually understood layer0/1, not a memorized date.
5. **If unsure which cluster or whether this warrants a new cluster entirely**, stop and ask me
   rather than picking one.

**What to do:**

1. Read my pasted content below.
2. Identify the real primary source(s) in it (or ask me if unclear).
3. Propose the node(s) — title, cluster/id, one-line thesis — before writing full layer0/1/2, so I
   can catch a wrong direction early if there's more than one or two nodes' worth of content.
4. Once I confirm, write the full node object(s) and insert them into `src/data/nodes.ts`,
   wiring `related` both directions where it makes sense.
5. Tell me the final id(s) and node count when done.

---

**MY CONTENT:**

[paste your source material here]
