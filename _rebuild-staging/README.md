# Content Workflow Rebuild — staging

New pipeline built here for review. **Nothing in the live repo has been changed.** After you
sign off, the files move into place (see "Swap" below).

## Corrections to the original plan (verified against the code)
1. **Canonical archive path was backwards in the plan.** Files are served from
   `public/content/sources/` (Vite serves `public/` at URL root; `node.$id.tsx` links to
   `/${archive.path}`). The stored `archive.path` is the `public/`-stripped URL
   (`content/sources/X.md`). The old script wrote to repo-root `content/sources/` (a bug).
   The rebuilt archiver writes to `public/content/sources/` and asserts against any other dir.
2. **Node count is 270, not 296** — the 296 counted the 26 CLUSTERS objects too. `TECH_DEBT`
   (270) was right.
3. **"Bug #4 CLUSTER_MAP" is not in merge-epistemoph.js.** The `{B:"J",C:"K",...}` remap lives
   in `restore-soft-clusters.ts` and `rename-md.ts`. Both read `src/data/old_nodes.ts`, which
   no longer exists — so they're dead code, not a live hazard.
4. **Five extra scripts also mutate nodes.ts** beyond the plan's list (see Retire list).

## Validator findings on current content (report-only, per plan Step 1)
- 44 nodes have **3-option quizzes** (A1, all of C, D, I). Decision: validator accepts 3-4
  options → these pass, no backfill forced.
- 2 tags used but missing from TAGS: **"Philosophy & the Self"**, **"Social Constructs"**
  (AA-series nodes). Decision: add both to TAGS at swap → validator then goes green.
- No id / clusterId / related / archive errors. Structural core is clean.

## Files
```
scripts/validate-nodes.ts   schema gate (read-only)      TESTED: runs, 270 nodes
scripts/archive-sources.ts  idempotent archiver          TESTED: --dry-run cluster A OK
scripts/next-id.ts          deterministic id assignment  TESTED: next-id O -> O24
scripts/audit-content.ts    generalized find-health      TESTED: tag/summary OK
add-content/SKILL.md        the one conversational flow
docs/NODES-SPLIT-DECISION.md   defer, trigger 350 nodes / 400KB gz
docs/CLAUDE-where-things-live.md   replacement CLAUDE.md section
```
All scripts run under Node 22 type-stripping or Bun; from repo root:
`node _rebuild-staging/scripts/<x>.ts` (staging) or `bun run scripts/<x>.ts` (after swap).

## Retire list (all confirmed one-off / dead — delete at swap)
| File | Verdict | Why |
|---|---|---|
| inject-batch1-5.ts | delete | replaced by add-content flow |
| merge-epistemoph.js | delete | reads missing extracted_nodes.js; would overwrite nodes.ts from a stale 9-cluster snapshot |
| fetch-epistemoph.js / extract-epistemoph.js | delete | legacy Epistemoph pull, inputs gone |
| restore-soft-clusters.ts / rename-md.ts | delete | one-time migration; read missing old_nodes.ts |
| update-clusters.ts | delete | one-time hardcoded CLUSTERS overwrite |
| patch-tags.ts | delete | one-time tag backfill; superseded by add-content + audit |
| triage.ts | delete | getBucket logic now in archive-sources.ts (+ --dry-run) |
| find-health.ts (root) | delete | replaced by audit-content.ts |
| missing-quizzes.json, batch1-3-quizzes.json | delete | quiz now generated inline; no patch files |

Keep: `archive-sources.ts` (rebuilt), `build-nodes-ts.ts`.

## Swap procedure (only after sign-off)
1. Add "Philosophy & the Self" and "Social Constructs" to TAGS in `src/data/nodes.ts`.
2. Copy `_rebuild-staging/scripts/*` over `scripts/` (replacing archive-sources.ts).
3. Install `add-content/SKILL.md` as a skill; delete `docs/ADD-NODE-PROMPT.md`.
4. Apply `docs/CLAUDE-where-things-live.md` into `.claude/CLAUDE.md`; update `TECH_DEBT.md`
   (count 270, trigger 350 / 400KB gz).
5. Delete the retire-list files.
6. Add `archive-failures.log` to `.gitignore`.
7. Gate: `bun run scripts/validate-nodes.ts && bun run lint && bun run build`.
8. Live test: add one real node end-to-end via the add-content flow.
