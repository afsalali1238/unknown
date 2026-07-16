# Decision: nodes.ts split (TECH_DEBT §2)

**Date:** 2026-07-16
**Decision: DEFER the runtime split. Set a concrete, measured trigger. Reduce the risk now
by making the add-content flow the only writer and adding a validation gate.**

## Corrected facts

- Actual node count is **270**, not 296. The "296" figure counts the 26 `CLUSTERS`
  objects alongside the 270 `NODES` objects (both match `^  {` at the same indent).
  `TECH_DEBT.md` (270) was right; update the rebuild plan's 296 references.
- File size ~768KB raw / ~233KB gzipped. At 270 nodes the perf cost of shipping the whole
  graph on first load is still negligible.

## Why defer

The split (per-cluster files + assemble step + Service Worker pre-cache rework) was motivated
by two things: (a) first-load payload, and (b) the pain/risk of many scripts bulk-mutating one
giant file. Payload is still fine at 233KB gzipped. The bulk-mutation risk is the real driver
of the historical git-index corruption — and this rebuild removes that risk directly by
retiring the five-plus one-off writers and routing every change through one flow + a validator
gate. Splitting now would be a large data-layer change delivered at the same time as the tooling
rebuild, increasing blast radius for little payload benefit.

## Concrete trigger (do not re-litigate before one of these is true)

Split when **either**:

- node count reaches **350**, OR
- `src/data/nodes.ts` exceeds **400KB gzipped** in the built bundle.

## Action taken now (instead of splitting)

- `nodes.ts` is written by exactly one flow (add-content) + the archiver; all ad-hoc writers
  retired.
- `validate-nodes.ts` runs before every add and in the build gate, so a bad edit can't land
  silently (the likeliest past cause of index corruption).
- Update `TECH_DEBT.md`: count 270, new trigger numbers above.
