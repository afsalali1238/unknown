# Content Workflow Rebuild — Plan + Prompt

Goal: replace the current content-authoring pipeline — three overlapping, undocumented systems —
with one conversational workflow: paste a source, Claude interviews you, writes the node(s),
archives the source, validates everything, and commits. No throwaway scripts, no orphaned patch
files, no silent data loss. All 296 existing nodes, the `content/sources/` archive, and
`dan-koe-articles/` stay exactly as they are — this rebuilds the _tool_, not the _content_.

---

## 1. Current state (what's actually broken)

Three systems do the same job (`add content to nodes.ts`), none aware of the others:

- **`docs/ADD-NODE-PROMPT.md`** — a conversational prompt for one node at a time. Works, but has no
  connection to the archiving pipeline or any validation step.
- **`scripts/inject-batch1.ts` → `inject-batch5.ts`** — five near-identical scripts, each with node
  content hardcoded as literal JS objects. A new file was written _every time_ a batch of content
  needed adding instead of reusing one tool. Dead weight after each run; nothing marks them retired.
- **`scripts/archive-sources.ts` + `build-nodes-ts.ts` + `merge-epistemoph.js`** — the offline-archive
  and cluster-merge pipeline, run manually with no logging of what succeeded/failed beyond stdout.

Specific bugs found while reading the code (fix all of these, not just the ones listed — this is
the minimum bar):

1. **Ambiguous archive path.** `archive-sources.ts` line 15 has a literal comment: _"Or should it be
   content/sources? ... Let's stick to content/sources at root as per the plan"_ — while also
   defining an unused `rootSourcesDir` vs. the path it actually writes to. There are effectively two
   candidate locations and the code picked one with a shrug. Pin this down for real: `content/sources/`
   at repo root is what `nodes.ts` paths and `CLAUDE.md` already reference — make that the only
   canonical location, delete the dead alternate constant, and add a check that fails loudly if
   anything ever writes elsewhere.
2. **Silent archive data loss on retry.** In `archive-sources.ts`, if an `archive` prop exists but the
   referenced file is missing, the script just deletes the `archive` prop and re-queues it — with no
   log of _why_ it was missing (deleted file? failed fetch? renamed node?) and no cap on retries. A
   source that 404s forever gets silently retried forever with no visibility.
3. **Quiz content generated out-of-band.** `missing-quizzes.json`, `batch1-quizzes.json`,
   `batch2-quizzes.json`, `batch3-quizzes.json` are patch files of quiz data that never got folded
   back into a canonical pipeline — someone had to backfill quizzes separately from node creation.
   The new workflow must generate the quiz _as part of_ node creation, always. No more quiz-shaped
   files sitting outside `nodes.ts`.
4. **Non-idempotent cluster merge.** `merge-epistemoph.js` hardcodes a `CLUSTER_MAP` remap table
   (`{ B: "J", C: "K", ... }`) to fold `old_nodes.ts` into `nodes.ts`. Running it twice, or against
   any new legacy source, silently produces wrong or duplicate cluster IDs — there's no collision
   check.
5. **No schema validation anywhere.** Nothing checks: node `id` uniqueness, `clusterId` exists in
   `CLUSTERS`, `tags` are a subset of `TAGS`, `quiz.options` has exactly 4 entries with `correctIndex`
   in range, `related` ids actually exist. A bad manual edit or a bad batch script currently corrupts
   data silently — this is likely part of why the git index has needed repair before (see memory:
   recurring bad git index in this repo).
6. **`nodes.ts` is one 765KB file** (296 nodes as of 2026-07-15), hand-edited _and_ script-mutated.
   `TECH_DEBT.md` already flags splitting this once node count "meaningfully exceeds ~300–400" — we're
   at 296 now, right at that trigger. A single giant file being rewritten by five different scripts is
   a plausible root cause of the git corruption and of bugs 1–4 above being hard to spot in diffs.
7. **`find-health.ts`** is a one-off debug script (hardcoded to the "Health & Body" tag) living at
   repo root instead of `scripts/`, with no equivalent for any other tag/cluster. It's really an
   ad-hoc prototype of a content audit tool that never got generalized.

## 2. What "done" looks like

One entrypoint, conversational at the front, deterministic and validated underneath:

- **Front end (conversational):** you paste a source (article, transcript, your own notes, a URL, or
  a batch of several) into one prompt/skill. Claude proposes the node(s) — title, cluster, thesis —
  before writing full content, same as `ADD-NODE-PROMPT.md` already does today; that confirmation
  step is good and should carry over unchanged. Works identically for 1 node or 50 — no separate
  "batch mode" that means a new throwaway script.
- **Back end (deterministic, scriptable, reusable):** small, named, permanent scripts — not one file
  per run — that the conversational flow calls for the mechanical parts: fetching/archiving a source,
  assigning the next free id in a cluster, validating the resulting node(s) against schema, and
  rebuilding any derived output. Every one of these is safe to re-run and reports exactly what it did.
- **Validation gate before any write is considered final:** the schema checks from bug #5 above,
  plus `bun run lint && bun run build`, run automatically at the end of every add — not something you
  remember to do manually.
- **One audit script**, generalized from `find-health.ts`, that can check any tag/cluster/field for
  consistency — replacing the one-off.
- **Legacy scripts retired, not left lying around:** `inject-batch1.ts`–`inject-batch5.ts`,
  `merge-epistemoph.js`, `fetch-epistemoph.js`, `extract-epistemoph.js`, `missing-quizzes.json`,
  `batch1–3-quizzes.json`, and root-level `find-health.ts` get deleted once anything useful in them
  (the epistemoph merge logic, the audit logic) is folded into the new permanent tools. `CLAUDE.md`'s
  "Where things live" section gets updated to match.

## 3. Design decisions already made (don't re-litigate these, just build them)

- Canonical archive path: `content/sources/<nodeId>-<index>.md`, repo root. Nothing else.
- `nodes.ts` split: given we're already at the documented trigger point (296 nodes vs. the ~300–400
  threshold in `TECH_DEBT.md`), resolve this now rather than deferring again — either split into
  per-cluster files with a build step that assembles `nodes.ts`/derived lookups, or make an explicit,
  reasoned call to defer once more with a new concrete trigger number. Don't silently leave it
  ambiguous a second time.
- Retry/failure visibility: any fetch/archive failure gets logged to one running, reviewable file
  (e.g. `content/archive-failures.log` or similar — your call on format) with a reason, not silently
  retried or silently dropped.
- Non-negotiables from `ADD-NODE-PROMPT.md` carry over unchanged: never fabricate a source, original
  synthesis not paraphrase, match existing tone per cluster, quiz has one defensibly correct answer,
  stop and ask if the cluster is unclear or would need to be new.

## 4. Build order

1. Write the schema validator first, run it once read-only against the current `nodes.ts` to confirm
   it doesn't flag the existing 296 nodes as broken (if it does, that's real signal — report it, don't
   silently "fix" existing content).
2. Decide and implement the `nodes.ts` split question from §3.
3. Rebuild `archive-sources.ts` as the permanent, idempotent, logged version (fixes bugs #1, #2).
4. Build the single "add content" conversational flow that replaces `ADD-NODE-PROMPT.md` +
   `inject-batchN.ts`, wired to call the validator and the archiver.
5. Generalize `find-health.ts` into a real audit script.
6. Retire the legacy files listed in §2, update `CLAUDE.md`.
7. Verify: `bun run lint && bun run build`, run the validator against the full current `nodes.ts`,
   then do one live test — add a real node end-to-end through the new flow — before calling this done.

---

## 5. Prompt to paste into a fresh Claude Code session

```
I'm rebuilding the content-authoring pipeline for the "Unknown" app (src/data/nodes.ts — 296 nodes,
TanStack Router + Vite + TypeScript, Bun). Read docs/CONTENT-WORKFLOW-REBUILD-PROMPT.md in this repo
first — it has the full plan, the specific bugs found in the current scripts, and the design
decisions already locked in. This message is the executable version of that plan; follow it, don't
re-derive a different design.

Also read docs/ADD-NODE-PROMPT.md and docs/OFFLINE-ARCHIVE-PLAN.md — the new workflow keeps their
good parts (the propose-before-writing confirmation step, the non-fabrication rules, the offline
archive schema) and fixes the bugs in how they're wired together.

GOAL
One conversational entrypoint for adding content — 1 node or many — backed by small, permanent,
idempotent scripts for the mechanical steps (archiving, id assignment, schema validation, build).
Replace, don't duplicate, the current inject-batch1.ts–inject-batch5.ts / archive-sources.ts /
merge-epistemoph.js / ADD-NODE-PROMPT.md sprawl.

DO NOT touch the content of the existing 296 nodes, content/sources/*.md, or dan-koe-articles/ —
this is a tooling rebuild, not a content rewrite.

STEP 1 — Schema validator (build first, run read-only)
Write scripts/validate-nodes.ts that checks every node in nodes.ts for: unique id, clusterId exists
in CLUSTERS, tags are a subset of TAGS, quiz.options has exactly 4 entries with correctIndex in
range, related ids all resolve to real nodes, furtherReading entries have label/source/url. Run it
against the current file and show me the results before changing anything — if it flags existing
nodes, report that as a finding, don't auto-fix silently.

STEP 2 — Resolve the nodes.ts size question
TECH_DEBT.md flags splitting nodes.ts into per-cluster files once node count "meaningfully exceeds
~300-400" — we're at 296 now. Decide whether to split now (per-cluster JSON/TS files + a build step
that assembles the derived exports) or explicitly defer with a new concrete trigger number, and tell
me which you're doing and why before proceeding.

STEP 3 — Fix the archive pipeline
Rebuild scripts/archive-sources.ts:
- Canonical path is content/sources/<nodeId>-<index>.md at repo root, full stop — remove the
  ambiguous alternate path constant currently in the file.
- Never silently delete an existing `archive` prop and re-queue without logging why (missing file,
  failed fetch, etc.) — write failures to one reviewable log file with a reason, and cap retries.
- Keep the existing triage buckets (full / pdf-or-wiki / unavailable) and attribution block format —
  those are working correctly, don't change them.

STEP 4 — Build the single "add content" flow
Design one workflow (a prompt/skill, not a new script per batch) that: takes pasted source content
(one item or several), proposes node(s) — title, cluster, thesis — and waits for my confirmation
before writing full content (same as the current ADD-NODE-PROMPT.md), assigns each id as the next
free number in its cluster (no manual guessing), writes the full node with a quiz generated as part
of this same step (never a separate quiz-patch file), calls the archiver for any furtherReading
entries, then runs the Step 1 validator and bun run lint && bun run build automatically before
telling me it's done.

STEP 5 — Generalize the health/audit script
Turn the root-level find-health.ts (currently hardcoded to the "Health & Body" tag) into
scripts/audit-content.ts that can check any tag, cluster, or field for consistency, and move it into
scripts/.

STEP 6 — Retire the old system
Delete inject-batch1.ts through inject-batch5.ts, merge-epistemoph.js, fetch-epistemoph.js,
extract-epistemoph.js, missing-quizzes.json, batch1-quizzes.json, batch2-quizzes.json,
batch3-quizzes.json, and the old root-level find-health.ts — but only after confirming anything
still-useful in them (the epistemoph merge logic, the audit logic) has been folded into the new
scripts. Update the "Where things live" section of .claude/CLAUDE.md to describe the new pipeline
instead of the old one.

STEP 7 — Verify end to end
Run bun run lint && bun run build. Run the validator against the full current nodes.ts. Then do one
live test: walk me through adding one real node via the new conversational flow, start to finish,
before calling this done. Give me a final summary of what changed, what got deleted, and the nodes.ts
split decision from Step 2.

Ask me before deleting anything in Step 6, and before any step that would touch more than one node's
worth of existing content.
```
