# Unknown — full requirements & to-do

Everything needed to take the current work (branch `content-workflow-rebuild`, 5 commits,
`main` untouched) to shipped. Check items off top to bottom.

---

## A. What's already DONE (on the branch, committed)

- [x] Content pipeline rebuilt: one add-content flow + `validate-nodes.ts`, `archive-sources.ts`, `next-id.ts`, `audit-content.ts`.
- [x] 18 dead one-off scripts/files retired; `TAGS` fixed (2 missing tags added); docs + CLAUDE.md updated.
- [x] Feed built as the main screen (`/`), personalized by chosen topics; old home preserved at `/map`; Explore unchanged; BottomNav → Feed.
- [x] `hooks` audit + skill rule for weak `layer0` cold-opens.
- [x] Validator passes (270 nodes, 0 errors) — verified.

## B. RUN LOCALLY (your machine — the sandbox couldn't)

- [ ] `git checkout content-workflow-rebuild`
- [ ] `bun install` (sandbox node_modules was corrupt; yours will be clean)
- [ ] `bun run dev` → open the app

## C. VALIDATION GATE (must all pass)

- [ ] `bun run scripts/validate-nodes.ts` → "270 nodes … OK — no errors"
- [ ] `bun run lint` → clean
- [ ] `bun run build` → succeeds (this is what typechecks the new Feed TSX)

## D. ARCHIVE SOURCES (needs internet)

- [ ] `bun run scripts/archive-sources.ts A` (smoke test one cluster) → check `public/content/sources/` + `git diff src/data/nodes.ts`
- [ ] `bun run scripts/archive-sources.ts all` (~139 pending; 112 already done)
- [ ] Review `archive-failures.log` — paywalled/media = expected "unavailable"; anything else, investigate
- [ ] Re-run `bun run scripts/validate-nodes.ts` and `bun run build`
- [ ] Commit: `git add public/content/sources src/data/nodes.ts && git commit -m "Archive pending sources"`

## E. QA THE APP (full pass in docs/QA-TEST-WORKFLOW.md)

Acceptance criteria for your stated vision:

- [ ] `/` shows the Feed as the main screen.
- [ ] Onboarding lets you pick topics; picked topics dominate the top of the feed.
- [ ] ALL 270 nodes are reachable in the feed (scroll long enough / no dead-end).
- [ ] Explore is still there as the separate structured browse.
      Feed mechanics:
- [ ] Swipe / scroll snaps one card at a time; card height feels right (tune `calc(100dvh-7.5rem)` if not).
- [ ] Save, Got-it, Deeper (reveals layer1+2), Quiz (schedules review), Share all work.
- [ ] Map link (Feed header) → `/map`; the old continue/due/lattice screen works there.
      Core app (regression):
- [ ] Onboarding → node → quiz → review chain works; quiz box math correct (correct→box+1 cap 5, wrong→0).
- [ ] State persists across reload; offline reload still loads; export/import round-trips.

## F. SHIP

- [ ] Push branch + open PR: `git push -u origin content-workflow-rebuild`
      OR merge to main: `git checkout main && git merge content-workflow-rebuild && git push`
- [ ] Deploy (Vercel — see docs/VERCEL-MIGRATION-PROMPT.md if not already wired): confirm the live build passes the same gate.
- [ ] Decide whether to keep `REBUILD-HANDOFF.md` / `REQUIREMENTS-TODO.md` in the repo or delete after merge.

## G. FOLLOW-UPS (optional, not blocking ship)

- [ ] Feed polish: clamp `layer0` to first ~55 words with a fade so the 90 long hooks look right (or add a dedicated `hook` field). See `audit-content.ts hooks`.
- [ ] Feed v2: "because you saved X" signal, share deep-links, session "good session" marker.
- [ ] Feed v3: learning-aware — weave due reviews into the feed.
- [ ] Accessibility pass (TECH_DEBT §1): keyboard nav for the feed, focus management, axe-core contrast.
- [ ] Watch the nodes.ts split trigger: split at 350 nodes OR 400KB gzipped (docs/NODES-SPLIT-DECISION.md). Currently 270.
- [ ] Backfill weak hooks flagged by `bun run scripts/audit-content.ts hooks`.

## Rollback (anytime)

`git checkout main` (never touched) · `git branch -D content-workflow-rebuild` to discard.
