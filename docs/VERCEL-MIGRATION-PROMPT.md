# Finishing the Lovable → Vercel migration

## What I already did

- Deleted `.lovable/`, `AGENTS.md`, and `src/lib/lovable-error-reporting.ts` (plus its usage in `src/routes/__root.tsx`).
- Removed the `@lovable.dev/vite-tanstack-config` devDependency from `package.json`.
- Rewrote `vite.config.ts` to configure TanStack Start directly instead of through Lovable's wrapper, targeting Vercel via nitro's `vercel` preset.

## What's unverified

I could not get `npm install` to finish inside my sandbox (network resolution through a proxy was too slow for this dependency tree — not something wrong with the project). That means the new `vite.config.ts` has **not been run** against a real build. The plugin wiring is my best-effort reconstruction of what `@lovable.dev/vite-tanstack-config` was doing automatically (per its own comment: TanStack Start, React, Tailwind, tsconfig-paths, nitro targeting a deploy preset). The one thing I'm genuinely unsure of is the exact shape of the `tanstackStart()` plugin's server/preset option for this specific package version (`@tanstack/react-start@^1.168.26`) — that API has moved around across recent releases.

## Steps to run locally

```bash
cd unknown
npm install
npm run build
```

## If it errors

Most likely failure points, in order of likelihood:

1. **`tanstackStart({ server: { preset: "vercel" } })` is rejected or ignored.** Check `node_modules/@tanstack/react-start/package.json` version and look at its type definitions (`node_modules/@tanstack/react-start/plugin/vite/*.d.ts`) for the actual accepted shape — it may want `target: "vercel"` at the top level instead of nested under `server`, or nitro config passed a different way.
2. **Import path `@tanstack/react-start/plugin/vite` doesn't resolve.** Some versions export it from `@tanstack/react-start/plugin` or `@tanstack/start-vite-plugin`. Check `node_modules/@tanstack/react-start/package.json`'s `exports` field.
3. **`@tanstack/router-plugin/vite`'s `tanstackRouter()` conflicts with route generation already wired into `tanstackStart()`.** If routes double-generate or you get a "duplicate plugin" error, drop the explicit `tanstackRouter(...)` call — newer `tanstackStart()` versions bundle it.

## Prompt to hand a coding agent (Claude Code, Cursor, etc.) if you want it fixed rather than fixing it yourself

```
The `unknown/` project's vite.config.ts was just migrated off a Lovable-specific
Vite wrapper (`@lovable.dev/vite-tanstack-config`) to a plain TanStack Start +
Vite config, because we're deploying via git + Vercel now instead of Lovable.

Run `npm install && npm run build` in this folder. It will very likely fail or
warn on the vite.config.ts plugin setup, because it was written without being
able to run a real build. Fix vite.config.ts (and only vite.config.ts /
package.json if a dependency is missing) so that:

1. `npm run build` succeeds.
2. `npm run dev` boots and the app is reachable and looks right (Map screen,
   a node page, Review, You) — check with a browser or the dev server logs.
3. The build output is something Vercel can deploy directly (nitro's "vercel"
   preset, or whatever the currently-installed @tanstack/react-start version
   actually calls it — check node_modules/@tanstack/react-start's own docs/
   types rather than assuming).

Don't touch src/server.ts or src/start.ts — those are hand-written SSR error
wrappers, not Lovable-specific, and should stay as the server entry.
Don't reintroduce any @lovable.dev/* package.
```

## Optional: `vercel.json`

Probably not needed — nitro's `vercel` preset produces Vercel-native output that Vercel's build system auto-detects. Only add a `vercel.json` if the deploy doesn't pick up the framework correctly on the first push.
