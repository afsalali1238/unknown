# Unknown / Epistemoph

A cross-linked, layered, audio-narrated knowledge platform. Ideas (mental models _and_ primary
source documents) are unified as **nodes** taught in layers and drilled with spaced repetition
until they stick. Full product rationale lives in `docs/PRODUCT-BRIEF.md` — read it before
proposing IA or nav changes; it is the source of truth and this file only summarizes it.

**NON-NEGOTIABLE:** _If a feature doesn't help an idea connect to another idea, or help it stick
in memory, it doesn't belong._ Use this to push back on scope creep.

## Stack

- React 19 + Vite 8, TanStack Router + TanStack Start (SSR), Tailwind CSS v4, Zustand, Radix UI +
  shadcn/ui (`style: new-york`, `baseColor: slate`, no prefix — see `components.json`).
- Package manager is **Bun** (`bun.lock` is canonical; ignore `package-lock.json`). `bunfig.toml`
  enforces a 24h supply-chain guard on new package versions — don't add to
  `minimumReleaseAgeExcludes` without asking first.
- Deploys to Vercel via nitro's `vercel` preset. `api/index.js` wraps `dist/server/server.js` as
  the serverless handler; `vercel.json` rewrites everything through it.
- Scripts: `bun run dev`, `bun run build`, `bun run build:dev` (dev mode build), `bun run preview`,
  `bun run lint` (eslint), `bun run format` (prettier --write .). **No test script exists.**

⚠️ `vite.config.ts` was migrated off `@lovable.dev/vite-tanstack-config` without a verified
`npm install` in the migration environment — it hasn't been confirmed against a real
`bun run build`. If a build errors, check `docs/VERCEL-MIGRATION-PROMPT.md` first.

## Where things live

- `src/data/nodes.ts` — the `Node`/`Cluster`/`Tag` types and all static content data (clusters,
  tags, nodes with `layer0`/`layer1`/`layer2`/`quiz`/`related`/`furtherReading`). This is the
  content backbone; changes here ripple into search, review, and routing.
- `src/routes/` — TanStack Router pages: `index` (Map/home), `explore`, `node.$id` (the node
  reader), `review` (spaced-repetition loop), `you` (progress/reading list/glossary/scratchpad),
  `onboarding`, `__root`.
- `src/components/` — feature components (`LayerReveal`, `NodeCard`, `Quiz`, `RecallReveal`,
  `RelatedCard`, `AudioBar`, `BottomNav`, `SearchBar`, `ProgressRing`); `src/components/ui/` is
  the shadcn primitive layer — prefer composing these over hand-rolling new primitives.
- `src/lib/store.ts` — Zustand state. `src/lib/error-capture.ts` / `error-page.ts` — error
  handling. `src/hooks/` — `useInstallPrompt`, `useOfflineWarmup`, `use-mobile`.
- `src/styles.css` — Tailwind v4 theme tokens. Color system is `paper`/`ink`/`ink-soft`/`line`/
  `accent` (see `@theme` block) — reuse these tokens, don't introduce new raw colors.
- `content/sources/*.md` — curated source excerpts (100+ files, `A1-0.md` style IDs) backing
  `furtherReading` entries. `docs/*.md` — planning docs; `PRODUCT-BRIEF.md` is authoritative,
  `LOVABLE-PROMPT*.md` and `big-ideas-app-spec.md` are retired-app history, kept for reference.
- `scripts/` — content pipeline, run manually, not wired into CI: `triage.ts` (classify source
  URLs), `fetch-epistemoph.js` / `merge-epistemoph.js` (pull + merge legacy Epistemoph content),
  `archive-sources.ts` (snapshot sources), `build-nodes-ts.ts` (regenerate `nodes.ts`),
  `rename-md.ts`, `restore-soft-clusters.ts`, `update-clusters.ts`. Ask before running these —
  they mutate `content/` and `src/data/nodes.ts` in bulk.

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
