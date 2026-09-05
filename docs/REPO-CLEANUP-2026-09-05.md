# Repo cleanup — 2026-09-05

Expert hygiene pass on `main` right after PR #2 (451 nodes) merged. Goal: remove everything in git
that no code path, script, workflow, or current doc depends on, without changing app behaviour.

Method: `git ls-files` inventory → import-graph analysis of `src/` (every file checked for an
importer) → dependency usage scan (every `package.json` entry grepped outside the dead tree) →
reference grep for every script/doc/asset name across `package.json`, `.github/`, `.claude/`,
`docs/`, `README.md` → orphan check of `public/content/sources/` against every `archive.path` in
the cluster files. Nothing was deleted on age alone; every item below had **zero live references**.

## Removed (61 files, 5,604 lines, ~1.1 MB)

| Area                                                                                          | What                                                                                                                                                                                                                                                   | Why it was dead                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/ui/` (46 files)                                                               | Full shadcn/ui primitive layer                                                                                                                                                                                                                         | Not imported by a single app file. The app is plain Tailwind on native elements.                                                                                                                                                                              |
| `src/hooks/use-mobile.tsx`                                                                    | `useIsMobile()`                                                                                                                                                                                                                                        | Only importer was `ui/sidebar.tsx` (deleted).                                                                                                                                                                                                                 |
| `components.json`                                                                             | shadcn CLI config                                                                                                                                                                                                                                      | Only meaningful with `components/ui/`.                                                                                                                                                                                                                        |
| `package.json` — **39 dependencies**                                                          | all 25 `@radix-ui/*`, `class-variance-authority`, `cmdk`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-hook-form`, `@hookform/resolvers`, `react-resizable-panels`, `recharts`, `sonner`, `vaul`, `date-fns`, `vite-tsconfig-paths` | Used only by `components/ui/` (or by nothing at all — `vite-tsconfig-paths` is superseded by Vite 8's built-in `resolve.tsconfigPaths`, `date-fns` had no importer). 61 → 22 runtime deps; `bun.lock` −485 lines / 0 additions; `node_modules` −123 packages. |
| `patch-sources.cjs` (root)                                                                    | One-off source-URL patcher                                                                                                                                                                                                                             | Referenced nowhere; 43/46 of its URLs were already in the cluster files.                                                                                                                                                                                      |
| `scripts/build-nodes-ts.ts`                                                                   | "regenerate derived exports"                                                                                                                                                                                                                           | Imported `src/data/old_nodes.ts`, which no longer exists. Derived exports are computed at import time in `src/data/nodes.ts`.                                                                                                                                 |
| `scripts/fix-nodes.ts`, `scripts/add-epistemic-status.ts`                                     | ts-morph one-offs                                                                                                                                                                                                                                      | Expected a `const NODES = [...]` literal in `src/data/nodes.ts`; nodes now live in `src/data/nodes/cluster-*.ts`, so both would no-op or fail.                                                                                                                |
| `REQUIREMENTS-TODO.md`, `REBUILD-HANDOFF.md` (root)                                           | Hand-off checklists for branch `content-workflow-rebuild` at 270 nodes                                                                                                                                                                                 | Branch is long merged; every actionable item is either done or already tracked in `TECH_DEBT.md` / `docs/FEED-SPEC.md` (v2/v3 roadmap).                                                                                                                       |
| `docs/capital-map.bundle` (370 KB)                                                            | Git bundle of the predecessor repo                                                                                                                                                                                                                     | Binary, head `6912c50` is not an ancestor of anything here, only mention was a historical note.                                                                                                                                                               |
| `docs/LOVABLE-PROMPT.md`, `docs/LOVABLE-PROMPT-improvements.md`, `docs/big-ideas-app-spec.md` | Lovable-era build prompts / spec of the retired app                                                                                                                                                                                                    | Superseded by `docs/PRODUCT-BRIEF.md` (which explicitly retires big-ideas-app).                                                                                                                                                                               |
| `docs/VERCEL-MIGRATION-PROMPT.md`                                                             | "Finish the Lovable → Vercel migration"                                                                                                                                                                                                                | Migration is done and verified (`vite.config.ts`, `api/index.js`, `vercel.json`, live at unknown.love).                                                                                                                                                       |
| `public/content/sources/AA1-entropy-0.md`, `AA2-relativity-0.md`                              | Orphan archive snapshots                                                                                                                                                                                                                               | No node's `archive.path` points at them (AA1/AA2 use `AA1-0.md` / `AA2-0.md`). 406 → 404 files, all referenced.                                                                                                                                               |

## Kept on purpose (looked suspicious, is live)

- `src/lib/utils.ts` (`cn()`), `clsx`, `tailwind-merge` — used by `LayerReveal`, `Quiz`, `explore`.
- `tw-animate-css` — imported from `src/styles.css`.
- `ts-morph` (devDep) — used by `scripts/archive-sources.ts`.
- `nitro` (devDep) — TanStack Start's Vercel preset resolves it at build time.
- `src/server.ts` — TanStack Start server entry (framework-discovered, not imported).
- `scripts/{validate-nodes,audit-content,next-id,topics-index,generate-sitemap,inject-manifest,archive-sources}.ts` — all wired into `package.json` scripts, CI, or the add-content skill.
- All dated review/status/audit docs — historical record, cheap, and cross-referenced by later reviews.
- `TECH_DEBT.md`, `README.md`, `docs/PRODUCT-BRIEF.md` (authoritative), `docs/FEED-SPEC.md`, `docs/QA-TEST-WORKFLOW.md`.

## Doc updates in the same commit

- `.claude/CLAUDE.md` — stack description (no shadcn/Radix), component + hook inventory, removed the
  stale `VERCEL-MIGRATION-PROMPT` warning, removed `build-nodes-ts.ts` from the scripts list.
- `README.md` — UI line + `src/components/` / `src/data/` structure lines.
- `.claudeignore` — dropped the bundle entry. `docs/QA-TEST-WORKFLOW.md` — dropped `use-mobile`.
- `docs/APP-REVIEW.md`, `docs/CONTENT-WORKFLOW-REBUILD-PROMPT.md` — one-line pointers noting the
  named artifacts were later removed (kept the historical text intact).

## CI fix folded in

`.github/workflows/ci.yml` used `actions/setup-node@v4` with `cache: npm`. The repo has no
`package-lock.json` (Bun is canonical), so `setup-node` failed the job before a single step ran —
this is why the gate was red on `main` and on PR #2. The `cache:` line is removed; the install step
already prefers `bun install` with an npm fallback.

## Verification (post-cleanup, this branch)

| Gate                                      | Result                                                                                                    |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `validate-nodes`                          | OK — 451 nodes, no errors                                                                                 |
| `tsc --noEmit`                            | 0 errors                                                                                                  |
| `eslint . --max-warnings 10`              | 0 errors, 0 warnings                                                                                      |
| `vitest run`                              | 15/15                                                                                                     |
| `npm run build`                           | OK — 899 sitemap URLs, TOPICS-INDEX unchanged, SW precache 26 assets + 404 sources                        |
| SSR smoke (`dist/server/server.js`)       | `/`, `/node/K7`, `/explore`, `/review`, `/you`, `/read/W8` → 200 with correct titles; unknown route → 404 |
| `bun install --frozen-lockfile --dry-run` | lockfile consistent with `package.json`                                                                   |
