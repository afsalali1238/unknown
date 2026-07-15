# Technical Debt

This document tracks actionable technical debt that was intentionally deferred. It provides context on the trigger conditions and the rationale for why the work was postponed, so future maintainers (or agents) know exactly when and how to resolve it.

## 1. Accessibility Audit

**Current State:** A manual accessibility spot-check was performed (e.g., adding `aria-expanded` and `aria-controls` to the explore.tsx cluster toggles, and ensuring `aria-label`s on icon buttons).

**Deferred Work:** A rigorous, automated accessibility pass (measuring contrast ratios, validating keyboard navigation focus trapping, and performing a full screen-reader walkthrough) has not yet been executed.

**Trigger Condition / "Done" Definition:**
Run a proper accessibility audit before a full public launch. Use automated tools (like axe-core) to guarantee compliance.

## 2. Split Data Bundle (`nodes.ts`)

**Current State:** The entire knowledge graph (currently 270 nodes, as of the 2026-07-15 S-series
content add) is bundled into a single JavaScript chunk from `src/data/nodes.ts`. The source file
itself is ~765KB raw / ~233KB gzipped and loads in full on every visit.

**Deferred Work:** The monolithic `nodes.ts` needs to be split into per-cluster JSON files, enabling lazy-loading of a cluster's nodes only when its section is opened in Explore or a node within it is visited.

**Trigger Condition / "Done" Definition:**
Implement this chunk splitting and lazy-loading architecture once the node count meaningfully exceeds ~300-400. Node count has grown from ~257 to 270 in the most recent content session alone, so re-check this number before assuming there's headroom. At the current size (~233KB gzipped), the performance impact is still negligible, but it grows linearly. Note that this change will require re-architecting the Service Worker to pre-cache these chunks dynamically for the offline PWA experience.
