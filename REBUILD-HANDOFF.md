# Rebuild handoff — run this to finish the content-pipeline rebuild

Repo: `unknown` · Branch: `content-workflow-rebuild` (3 commits ahead of `main`, working
tree clean, **`main` is untouched** so everything is reversible).

This branch replaces the old content-authoring scripts with one validated pipeline and retires
the dead one-offs. The code changes are already committed. What's left is: install, run the gate,
run the archiver (needs internet — couldn't run in the build sandbox), commit the archiver output,
then push/merge.

---

## 1. What changed on this branch (already committed)

**Added — new permanent pipeline (`scripts/`):**

- `validate-nodes.ts` — schema gate (read-only, non-zero exit on error): unique ids, clusterId ∈ CLUSTERS, tags ⊆ TAGS, quiz 3-4 options + in-range correctIndex, related ids resolve, furtherReading label/source/url, archive files exist on disk.
- `archive-sources.ts` — rebuilt archiver. Writes to `public/content/sources/` (canonical), asserts against any other dir, idempotent, retry-capped, logs misses to `archive-failures.log`.
- `next-id.ts` — deterministic next-free-id for a prefix.
- `audit-content.ts` — content audit (summary|tag|cluster|field|orphans|dupes), replaces old find-health.ts.

**Added — skill + docs:**

- `.claude/skills/add-content/SKILL.md` — the one conversational flow for adding nodes (replaces ADD-NODE-PROMPT + inject-batch scripts).
- `docs/NODES-SPLIT-DECISION.md`, `docs/QA-TEST-WORKFLOW.md`, `docs/FEED-SPEC.md`.

**Modified:**

- `src/data/nodes.ts` — added two tags to TAGS: `"Philosophy & the Self"`, `"Social Constructs"` (they were used by nodes but missing from TAGS, which the validator flagged). No node content changed.
- `.claude/CLAUDE.md` — rewrote the "where things live" pipeline section.
- `TECH_DEBT.md` — corrected node count to 270; split trigger now 350 nodes / 400KB gzipped.
- `.gitignore` — added `archive-failures.log`.

**Deleted — retired one-offs (all dead or superseded):**
`scripts/inject-batch1.ts`…`inject-batch5.ts`, `scripts/merge-epistemoph.js`,
`scripts/fetch-epistemoph.js`, `scripts/extract-epistemoph.js`, `scripts/restore-soft-clusters.ts`,
`scripts/rename-md.ts`, `scripts/update-clusters.ts`, `scripts/patch-tags.ts`, `scripts/triage.ts`,
`find-health.ts`, `missing-quizzes.json`, `batch1-quizzes.json`, `batch2-quizzes.json`,
`batch3-quizzes.json`, `docs/ADD-NODE-PROMPT.md`, `triage_report.md`, and the `_rebuild-staging/`
review folder.

---

## 2. Steps to run (in order)

```bash
# 0. Be on the branch
git checkout content-workflow-rebuild

# 1. Fresh, correct dependencies (the build sandbox's node_modules was corrupt; yours is fine after this)
bun install

# 2. Run the gate — all three must pass
bun run scripts/validate-nodes.ts        # expect: "Validated 270 nodes." then "OK — no errors."
bun run lint                             # expect: no errors
bun run build                            # expect: successful production build

# 3. Archive the pending sources (needs internet — this is the step the sandbox could NOT do)
bun run scripts/archive-sources.ts A      # smoke-test one cluster first
#    -> check: new .md files in public/content/sources/, and `git diff src/data/nodes.ts` looks sane
bun run scripts/archive-sources.ts all    # then archive everything (~139 pending, 112 already done)
#    -> paywalled/media sources landing as "unavailable" is EXPECTED, not an error.
#    -> review `archive-failures.log` for anything that should have worked but didn't.

# 4. Re-run the gate (nodes.ts + public/content/sources changed in step 3)
bun run scripts/validate-nodes.ts
bun run build

# 5. Commit the archiver output
git add public/content/sources src/data/nodes.ts
git commit -m "Archive pending furtherReading sources (offline snapshots)"

# 6a. Push the branch and open a PR
git push -u origin content-workflow-rebuild

# 6b. OR merge straight to main and push
git checkout main
git merge content-workflow-rebuild
git push
```

---

## 3. Verification checklist (before merging)

- [ ] `validate-nodes.ts` prints `270 nodes … OK — no errors`.
- [ ] `bun run lint` and `bun run build` both clean.
- [ ] `public/content/sources/` gained new `.md` files after the archiver run.
- [ ] `archive-failures.log` contains only genuinely-unfetchable sources (paywalls/media), nothing you'd expect to succeed.
- [ ] App runs: `bun run dev`, open a node → its furtherReading archive link (`/content/sources/<id>-<i>.md`) opens.

## 4. Rollback (if anything looks wrong)

```bash
git checkout main          # main was never touched
git branch -D content-workflow-rebuild   # discard the branch entirely
```

## 5. Gotchas / notes

- **Canonical archive path is `public/content/sources/` on disk.** Nodes store the URL form (`content/sources/X.md`, no `public/`) because Vite serves `public/` at the URL root. Don't "fix" the archiver to write to repo-root `content/sources/` — that 404s. The archiver asserts against it.
- `archive-failures.log` is gitignored on purpose (it's a local diagnostic).
- Node count is **270**, not 296 (the old figure counted the 26 CLUSTERS objects).
- `build-nodes-ts.ts` was kept (regenerates derived exports); everything else in the old pipeline was retired.

## 6. Feed (now included on this branch)

The **Feed** is built and is now the main screen (`/`), personalized by the topics chosen in
onboarding, with the old Map preserved at `/map` and Explore unchanged.

New/changed files:

- `src/lib/feed.ts` — feed ordering (0.60 interest · 0.25 serendipity · 0.15 related-to-liked · 0.10 freshness; seeded per session, no back-to-back same cluster, returns all 270 nodes).
- `src/routes/index.tsx` — rewritten as the swipeable Feed (full-screen scroll-snap cards from `layer0`; rail actions Save/Got-it/Deeper/Quiz/Share; "deeper" reveals layer1+2 inline; reuses the existing `Quiz` component so answers still schedule Leitner review). Onboarding redirect + hydration gating preserved.
- `src/routes/map.tsx` — the previous home screen (continue / due / lattice / search), now at `/map`, linked from the Feed header.
- `src/components/BottomNav.tsx` — first tab relabeled Home → **Feed**.

Verify the Feed visually (only a real browser can confirm layout/scroll-snap):

```bash
bun run dev
# / should show the Feed. Pick topics in onboarding -> those cards dominate the top.
# swipe/scroll between cards; Save/Got-it/Deeper/Quiz/Share work; Map link -> /map; Explore unchanged.
```

Notes / things you may want to tune in the browser:

- Card height is `calc(100dvh - 7.5rem)` (leaves room for header + bottom nav) — adjust if it feels off on your device.
- `bun run build` is what actually typechecks the new TSX (the build sandbox's node_modules was corrupt, so tsc/eslint couldn't run there).
