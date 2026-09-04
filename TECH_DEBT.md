# Technical Debt

This document tracks actionable technical debt that was intentionally deferred. It provides context on the trigger conditions and the rationale for why the work was postponed, so future maintainers (or agents) know exactly when and how to resolve it.

## 1. Accessibility Audit

**Current State:** A manual accessibility spot-check was performed (e.g., adding `aria-expanded` and `aria-controls` to the explore.tsx cluster toggles, and ensuring `aria-label`s on icon buttons).

**Deferred Work:** A rigorous, automated accessibility pass (measuring contrast ratios, validating keyboard navigation focus trapping, and performing a full screen-reader walkthrough) has not yet been executed.

**Trigger Condition / "Done" Definition:**
Run a proper accessibility audit before a full public launch. Use automated tools (like axe-core) to guarantee compliance.

## 2. ~~Split Data Bundle (`nodes.ts`)~~ — DONE 2026-09-04

Shipped. Source of truth is `content/clusters/<clusterId>.json`; `src/data/nodes.ts` is a
generated index (110 KB gz) and `public/content/bodies/<clusterId>.json` carry
`layer1`/`layer2`/`quiz`/`furtherReading` (243 KB gz total, ≤ 21 KB per cluster), fetched on
first open of a node in that cluster via `src/lib/bodies.ts` and precached by the service
worker. Client JS went 447 → 284 KB gz; the largest chunk 442 → 206 KB gz, and CI now fails
above 260 KB. `ts-morph` and the three one-off AST writers are gone; the archiver edits JSON.
Decision detail in `docs/NODES-SPLIT-DECISION.md`, layout in `docs/CONTENT-LAYER.md`.

**Left over from this item:**

- Search indexes the bundled fields only (title/author/thesis/layer0). If "no results" for a
  phrase that's only in `layer1`/`layer2` shows up in feedback, index bodies lazily from the
  in-memory cache as clusters load.
- The node page still streams the body in on the client after hydration. If pre-rendering or
  per-idea og cards land, read the body server-side in the loader (`createIsomorphicFn`) and
  serialize it into the HTML instead.
- The remaining 206 KB gz `index-*.js` is now mostly React + router + the 110 KB index; the
  next payload win is the index itself (e.g. dropping `layer0` from Feed cards that never
  expand it), not more splitting.

## 3. Content-quality warnings backlog

`scripts/validate-nodes.ts` now warns (not fails) on two measured problems:

- **Quiz answer-length leak** — the correct option is >1.3x longer than the longest distractor
  in **321/387** nodes (and the authored `correctIndex` was 1 in 82% of nodes). The app shuffles
  option order per node (`components/Quiz.tsx`), which removes the position tell, but "pick the
  most detailed answer" still works until distractors are tightened.
- **No inbound links** — **101/387** nodes are never referenced by another node's `related`, so
  they're unreachable via "follow the thread" (the brief's "whole point").

**Done definition:** work the backlog down (content passes through the add-content skill), then
run the validator with `--strict` in CI so neither can regress.
