# Unknown / Epistemoph

A cross-linked, layered, audio-narrated knowledge platform. Ideas (mental models _and_ primary
source documents) are unified as **nodes** taught in layers and drilled with spaced repetition
until they stick. Full product rationale lives in `docs/PRODUCT-BRIEF.md` — read it before
proposing IA or nav changes; it is the source of truth and this file only summarizes it.

**NON-NEGOTIABLE:** _If a feature doesn't help an idea connect to another idea, or help it stick
in memory, it doesn't belong._ Use this to push back on scope creep.

## Stack

- React 19 + Vite 8, TanStack Router + TanStack Start (SSR), Tailwind CSS v4, Zustand,
  lucide-react icons, `clsx` + `tailwind-merge` (via `src/lib/utils.ts` `cn()`). No component
  library — the unused shadcn/Radix layer was removed in the 2026-09-05 cleanup; don't reintroduce
  it wholesale, add a primitive only when a feature needs it.
- Package manager is **Bun** (`bun.lock` is canonical; ignore `package-lock.json`). `bunfig.toml`
  enforces a 24h supply-chain guard on new package versions — don't add to
  `minimumReleaseAgeExcludes` without asking first. (A 2026-07-15 session briefly installed
  `vitest`/`zod` via `npm`, which generated a stray `package-lock.json` and left the actual
  push-gate hook, which has always run `bun run lint`/`bun run build`, silently out of sync with
  the docs. Re-run `bun install` to fold those deps into `bun.lock` properly, then delete
  `package-lock.json`.)
- Deploys to Vercel via nitro's `vercel` preset. `api/index.js` wraps `dist/server/server.js` as
  the serverless handler; `vercel.json` rewrites everything through it.
- Scripts: `bun run dev`, `bun run build`, `bun run build:dev` (dev mode build), `bun run preview`,
  `bun run lint` (eslint), `bun run format` (prettier --write .). Tests run via `vitest`
  (`bun run test`).

`vite.config.ts` is a plain TanStack Start + Vite config (Lovable wrapper removed, Vercel preset;
`api/index.js` + `vercel.json` bridge Vercel's Node handler to `dist/server/server.js`). Don't
reintroduce any `@lovable.dev/*` package.

## Where things live

- `src/data/nodes.ts` — the `Node`/`Cluster`/`Tag` types and all static content data (clusters,
  tags, nodes with `layer0`/`layer1`/`layer2`/`quiz`/`related`/`furtherReading`). This is the
  content backbone; changes here ripple into search, review, and routing.
- `src/routes/` — TanStack Router pages: `index` (Map/home), `explore`, `node.$id` (the node
  reader), `review` (spaced-repetition loop), `you` (progress/reading list/glossary/scratchpad),
  `onboarding`, `__root`.
- `src/components/` — feature components (`LayerReveal`, `Quiz`, `RecallReveal`, `RelatedCard`,
  `AudioBar`, `BottomNav`, `SearchBar`, `LatticeIndex`, `FirstTimeHint`, `InstallAppButton`,
  `MicroLabel`). Plain Tailwind on native elements — there is no `src/components/ui/` layer.
- `src/lib/store.ts` — Zustand state. `src/lib/error-capture.ts` / `error-page.ts` — error
  handling. `src/hooks/` — `useInstallPrompt`, `useOfflineWarmup`, `useThemeSync`.
- `src/styles.css` — Tailwind v4 theme tokens. Color system is `paper`/`ink`/`ink-soft`/`line`/
  `accent` (see `@theme` block) — reuse these tokens, don't introduce new raw colors.
- **Archived sources** live on disk at `public/content/sources/<nodeId>-<index>.md` (127+ files,
  `A1-0.md` style). Vite serves `public/` at the URL root, so each `furtherReading.archive.path`
  stores the `public/`-stripped URL (`content/sources/A1-0.md`), NOT the disk path — writing these
  files anywhere but `public/content/sources/` 404s in the app (the archiver asserts against it).
  `docs/*.md` — planning docs; `PRODUCT-BRIEF.md` is authoritative.
- `scripts/` — the content pipeline (permanent, idempotent, re-runnable):
  `validate-nodes.ts` (schema gate: ids, clusterId∈CLUSTERS, tags⊆TAGS, quiz 3-4 options,
  related resolve, archive files exist — read-only, non-zero exit on error),
  `archive-sources.ts <clusterId|all> [--dry-run]` (snapshot sources to `public/content/sources/`;
  idempotent, retry-capped, misses logged to `archive-failures.log`),
  `next-id.ts <PREFIX> [count]` (deterministic next free id), `audit-content.ts` (content audit:
  summary|tag|cluster|field|orphans|dupes). Derived exports (`NODES`, `NODE_BY_ID`,
  `NODES_BY_CLUSTER`, `CLUSTER_BY_ID`) are computed at import time in `src/data/nodes.ts` from the
  `cluster-*.ts` files — there is no generator script to run after editing content.
  Adding content goes through the **add-content** skill (`.claude/skills/add-content/`) — it
  proposes node(s), assigns ids, writes the node + quiz inline, archives sources, then runs the
  validate gate. No per-batch inject scripts, no quiz-patch JSON.

## Design principles (from PRODUCT-BRIEF.md — obey these in UI work)

Three primary nav destinations only: **Map** (browse + continue + due-today), **Review**
(spaced-repetition drilling), **You** (progress/reading-list/glossary/scratchpad — one tap down,
not top-level). Node is not a nav tab, it's reached from Map/Review. Layers reveal progressively
(don't dump L0/L1/L2 at once). Cross-links are a designed, visible section — not footer links.
Offline caching is silent, no download-manager UI.

## Conventions

- TypeScript strict mode is on (`tsconfig.json`); `noUnusedLocals`/`noUnusedParameters` are off,
  so don't rely on the compiler to catch unused vars — eslint's `@typescript-eslint/no-unused-vars`
  is also off. Path alias `@/*` → `./src/*`.
- Prettier: 100 print width, double quotes, semicolons, trailing commas everywhere. Run
  `bun run format` rather than hand-formatting.
- ESLint blocks importing `server-only` — this is TanStack Start, not Next.js; use `*.server.ts`
  naming or `@tanstack/react-start/server-only` instead.
- No `.env` file currently exists in this repo; if one is added, never read or print its contents.

## Operational safety

- `git push` is gated on `bun run lint` and `bun run build` passing (see
  `.claude/hooks/pre-push-check.sh`). If either fails, fix it — don't bypass with `--no-verify`
  or force flags without asking.
- Reads of `.env`, `.env.*`, and anything under `**/secrets/**` are blocked at the tool level.
- `dist/`, `.output/`, `.vinxi/`, `.tanstack/`, and `node_modules/` are build/tooling output —
  never hand-edit them; regenerate via `bun run build` / `bun run dev` instead.
