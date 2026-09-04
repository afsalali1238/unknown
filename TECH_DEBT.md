# Technical Debt

This document tracks actionable technical debt that was intentionally deferred. It provides context on the trigger conditions and the rationale for why the work was postponed, so future maintainers (or agents) know exactly when and how to resolve it.

## 1. Accessibility Audit

**Current State:** A manual accessibility spot-check was performed (e.g., adding `aria-expanded` and `aria-controls` to the explore.tsx cluster toggles, and ensuring `aria-label`s on icon buttons).

**Deferred Work:** A rigorous, automated accessibility pass (measuring contrast ratios, validating keyboard navigation focus trapping, and performing a full screen-reader walkthrough) has not yet been executed.

**Trigger Condition / "Done" Definition:**
Run a proper accessibility audit before a full public launch. Use automated tools (like axe-core) to guarantee compliance.

## 2. Split Data Bundle (`nodes.ts`)

**Current State (measured 2026-09-04):** the entire knowledge graph — **387 nodes across 38
clusters** — is bundled into a single JavaScript chunk from `src/data/nodes.ts`. The source file
is ~1.18 MB raw / ~351 KB gzipped, and the client `index-*.js` chunk that contains it is
**~442 KB gzipped**, loaded in full on every visit. 69% of that payload is `layer1` / `layer2` /
`quiz` / `furtherReading`, which only the node page needs; the index fields (`title`, `thesis`,
`layer0`, `tags`, `related`, …) that Feed/Explore/Search actually use are ~320 KB raw.

**Trigger status: BOTH triggers set in `docs/NODES-SPLIT-DECISION.md` (350 nodes OR 400 KB
gzipped) have been crossed.** This item is now due, not deferred.

**Plan:** split into an always-bundled index (id/title/author/year/medium/category/thesis/layer0/
tags/related/epistemicStatus) plus per-cluster body JSON (`layer1`, `layer2`, `quiz`,
`furtherReading`) fetched on first open of a node in that cluster and precached by the service
worker. Do it as per-cluster JSON on disk too (one file per cluster, assembled at build), which
also turns content PRs into reviewable diffs and retires the ts-morph mutate-a-1.2 MB-TS-file
archiver. CI's "Bundle size report" step should become a hard limit once this lands.

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
