# Technical Debt

This document tracks actionable technical debt that was intentionally deferred. It provides context on the trigger conditions and the rationale for why the work was postponed, so future maintainers (or agents) know exactly when and how to resolve it.

## 1. Accessibility Audit

**Current State:** A manual accessibility spot-check was performed (e.g., adding `aria-expanded` and `aria-controls` to the explore.tsx cluster toggles, and ensuring `aria-label`s on icon buttons).

**Deferred Work:** A rigorous, automated accessibility pass (measuring contrast ratios, validating keyboard navigation focus trapping, and performing a full screen-reader walkthrough) has not yet been executed.

**Trigger Condition / "Done" Definition:**
Run a proper accessibility audit before a full public launch. Use automated tools (like axe-core) to guarantee compliance.

## 2. Split Data Bundle (`nodes.ts`)

**Current State:** The entire knowledge graph (currently **387 nodes** as of 2026-09-04, 406 archived sources) is bundled from `src/data/nodes.ts`. Source file is ~1.18 MB raw. Built bundle: client `index` chunk was **1,373 KB raw / 445 KB gzipped** before mitigation — **exceeding the 400 KB gzipped trigger**. A Vite `manualChunks` split now isolates `nodes.ts` into its own `nodes-*.js` chunk (see `vite.config.ts`), which reduces the main entry chunk and makes the split explicit for caching. Full per-cluster lazy-loading (per `docs/NODES-SPLIT-DECISION.md`) is still deferred but the trigger condition is now **MET** — this partial split is a stopgap.

**Deferred Work:** The monolithic `nodes.ts` needs to be split into per-cluster JSON files, enabling lazy-loading of a cluster's nodes only when its section is opened in Explore or a node within it is visited.

**Trigger Condition / "Done" Definition:**
Implement this chunk splitting once node count reaches **350** OR `src/data/nodes.ts` exceeds **400KB gzipped** in the built bundle (decided 2026-07-16 — see docs/NODES-SPLIT-DECISION.md). **Status 2026-09-04: TRIGGERED** — 387 nodes, ~445 KB gzipped before mitigation; isolated chunk now applied. Next step is per-cluster dynamic `import()` + Service Worker dynamic precache re-architecture.

**Mitigation applied 2026-09-04:** `vite.config.ts` `build.rollupOptions.output.manualChunks.nodes = ["./src/data/nodes.ts"]` to extract the graph into a separate cacheable chunk. Run `npm run build` and verify `dist/client/assets/nodes-*.js` exists and SW precache includes it.
