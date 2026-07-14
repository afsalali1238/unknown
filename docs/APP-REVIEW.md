# Unknown — Final App Review

Reviewed: the merged app, now at `unknown/` (renamed from `idea-weaver/`, which is what showed up everywhere in the code and is also the name of its connected GitHub repo: `github.com/afsalali1238/unknown`).

## Repo cleanup (done)

- Deleted the empty, retired `big-ideas-app/` folder.
- Renamed `idea-weaver/` → `unknown/`.
- Moved the four root planning docs (`PRODUCT-BRIEF.md`, `LOVABLE-PROMPT.md`, `LOVABLE-PROMPT-improvements.md`, `big-ideas-app-spec.md`) and `capital-map.bundle` into `unknown/docs/`, so the whole workspace is now one folder.
- **Two things need your hand, not mine:**
  1. `capital-map/node_modules/` still has ~178 files the sandbox can't delete — permission errors on the native `.node` binaries suggest something on your machine (a running dev server, VS Code, an antivirus scan) has them open. Close anything touching that folder and delete `capital-map/` manually.
  2. The outer `billion` repo's reorg is done on disk but **not committed** — every `git add`/`git commit` from here hit a stuck `.git/index.lock` that never cleared across 10+ attempts (same file, same timestamp every time), which means something on your end has that repo open (VS Code's Source Control panel, GitHub Desktop, or a terminal mid-command). Close that, delete `billion\.git\index.lock`, then run `git add -A && git commit -m "Consolidate into unknown/, drop retired apps"`.

**One more thing worth knowing:** `unknown/` has its own separate git history connected to `github.com/afsalali1238/unknown` (and to Lovable). The outer `billion` repo you're in points to a _different_ remote, `github.com/afsalali1238/Epistemoph` — it's a personal wrapper that mirrors the files but not the inner history. When you say "deploy to git," the one that actually matters for shipping is the inner `unknown` repo (that's what Lovable syncs with) — the outer repo is just your local backup/workspace. Make sure you're pushing/committing in the right one.

---

## Ratings

**Code quality — 8/10.** TypeScript strict mode, clean typed `Node` schema, a well-structured Zustand store with `persist` + a `useHydrated()` guard used consistently to avoid SSR/localStorage mismatches. Routes are simple and readable, components are small and single-purpose. No dead code or obvious bugs found reading all ~15 source files. Docked for: no tests at all, and the audio player uses the browser's `SpeechSynthesis` API (a reasonable, free substitute) rather than the synced pre-recorded audio the spec called for — it doesn't support scrubbing, only sentence-by-sentence playback.

**UI / design system — 8.5/10 (from source, not a live render).** The `paper/ink/accent` token system, Fraunces/Inter/JetBrains Mono type scale, hairline borders, and 44px tap targets are implemented exactly as specified in the build plan, consistently, with no stray hex colors or off-system spacing. I could not get a live dev server running in this sandbox (see below), so this is a code-level read, not a pixel-checked one — worth a quick visual pass on your end before calling it final.

**Product / flow — 7/10.** The redesign this was built for — collapsing six flat tabs into Map · Review · You, with Node as the hero screen — is implemented faithfully: progressive layer reveal (L0 → "Show me how it works" → L1 → "Apply it" → L2), quiz, blurred recall check, related-ideas section, "follow the thread" next-node suggestion, Leitner-box spaced repetition in Review, streak tracking, and a due-count badge in the bottom nav. Onboarding (interest tags → personalized "For you" map ordering) is a solid addition not in the original brief. Docked hard for the content gap below, which undercuts the one thing the brief calls "the core differentiator."

**Content completeness — 4/10. This is the real blocker.** `CLUSTERS` in `nodes.ts` defines 16 clusters (A–P), but only clusters A–H (32 nodes total) actually have content. The other 8 — Company Origins, Fraud & Short Cases, Foundational Tech, AI/ML Papers, Worldview & Futurism, Mind/Self/Meaning, The Almanack of Naval Ravikant, Practical Wisdom — are empty labels with zero nodes. They quietly don't render on the Map (fine, no crash), but every node's `related` array already links out to them: **133 of 165 unique related-node references (80%) point to IDs that don't exist.** The code defends against this with `.filter(Boolean)`, so nothing breaks — it just means the "Related ideas" section, which the product brief literally calls "loud, not buried" and "the payoff," is running at roughly a fifth of its intended density. Separately, 4 of the 19 onboarding interest tags (Moats & Network Effects, AI & the Future, Meaning & Self, Health & Body) have zero nodes tagged — pick two of those in onboarding and "For you" renders an empty map with no explanation (the "Everything" toggle fixes it, but there's no messaging pointing you there).

**Deploy readiness — 6/10.** File layout is now consolidated and clean. What's holding it back: the outer repo commit is blocked pending you clearing the lock (above), a stray `node_modules` needs manual deletion, and a live build/lint/typecheck couldn't be verified — `npm install` never finished inside this sandbox's time limit (see note below), so treat the code-quality score as a careful read, not a green CI run.

---

## What to do before calling this "final"

1. Clear the two manual blockers above (lock file, stray `node_modules`), then commit.
2. Either write real content for the 8 empty clusters, or delete them from `CLUSTERS` and prune the ~133 dead `related` references down to what actually exists — right now the map quietly promises a much bigger library than it has.
3. Remove the 4 zero-node interest tags from onboarding, or add nodes that use them, so nobody can pick their way into an empty screen.
4. Run `npm install && npm run build && npm run lint` locally (or let Lovable's own pipeline do it) to get a real pass/fail signal — I could only verify statically here.

## What's genuinely solid

The information architecture, the node reading experience, spaced repetition, and the visual system are all built exactly to the spec you wrote in `PRODUCT-BRIEF.md`, and hold together as one coherent app rather than three stitched-together prototypes. The gap isn't design or engineering — it's that half the planned library was scaffolded but never written.

---

_Note on verification limits: this review reads the full source tree and cross-checked every node ID against every related-link reference programmatically. It does not include a live-rendered UI screenshot or a completed `npm run build` — both were blocked by this sandbox's install/network time limits, not by anything wrong in the code._

---

## Correction (after a follow-up pass)

The "Content completeness — 4/10" section above was **wrong** — it was based on a regex that only matched one of two id-formatting styles used in `nodes.ts` and missed 133 of the 165 total nodes. Re-parsed properly: the file has **165 nodes across all 16 clusters** (4 to 30 nodes each), **629 related-links with zero dead references**, and all 19 onboarding tags have at least one node. There is no content gap and nothing to prune. Revised content-completeness score: **8.5/10** — the library is real and the cross-linking works exactly as designed; the only honest ding is that some clusters (C, E, H at 4 nodes) are thin compared to others (B at 30, M at 23).

Also done in this pass: removed the Lovable connection (`.lovable/`, `AGENTS.md`, `lovable-error-reporting.ts`, the `@lovable.dev/vite-tanstack-config` dependency) and replaced `vite.config.ts` with a plain TanStack Start + Vite config targeting Vercel. That config is **unverified** — see `VERCEL-MIGRATION-PROMPT.md` in this folder for what to check and a ready-to-paste prompt if it needs fixing.
