# PWA → Play-Ready Implementation Plan

**Status:** Draft · **Scope:** PWA only (no TWA/native wrapper in this plan)
**Last updated:** 2026-09-10
**Companion docs:** `docs/PRODUCT-BRIEF.md` (product source of truth), `TECH_DEBT.md` (known debt), `docs/APP-REVIEW.md` (prior review)

---

## 1. Goal & scope

**Goal:** Make Unknown (working title — see D1) a best-in-class installable PWA that is
technically, legally, and experientially ready for a future Play listing via TWA,
without building the wrapper yet.

**In scope**
- Trust & policy surfaces (privacy, about, contact, IP posture)
- PWA installability/quality hardening (manifest, icons, SW, offline, iOS fallback)
- Performance (fonts, code-splitting, budgets, Lighthouse CI)
- Content & quiz integrity (length-tell fix, QA gates)
- PWA-native retention (badging, shortcuts, audio hardening)
- Privacy-respecting observability (errors; analytics = explicit decision)
- Accessibility audit + device QA matrix
- Listing-asset specs + future-TWA prep docs

**Explicitly out of scope**
- TWA build, Play Console submission, signing keys, `assetlinks.json` deploy
  (template it in P9, don't ship it)
- Native push / FCM, accounts, backend, sync, monetization, paywall
- Capacitor migration (revisit only if push/widgets become must-haves)

**Principles**
1. Stay offline-first and zero-backend unless a task forces otherwise.
2. Every phase ends in a verifiable gate (command, score, or checklist) — no vibes-based "done."
3. Prefer platform APIs over custom code (Badging, Shortcuts, Media Session).
4. Keep the Data Safety story at "no data collected" — any new network call needs a written justification in this doc.

**Assumptions**
- Solo dev + AI agent working in this branch; Vercel hosting stays.
- Package/tooling stays Bun-based; CI (if any) runs `validate`, `audit`, `test`, `lint`, `build`.
- Content remains human-curated static data (no user-generated content, no GenAI user-facing features).

**Open decisions (need owner input — see §8)**

| ID | Decision | Blocks |
|----|----------|--------|
| D1 | ~~Final app name~~ **Decided 2026-09-12: "Commonplace"** (docs/BRAND.md) | P1, P2, P9 |
| D2 | ~~Production domain~~ **Decided 2026-09-12: commonplace.app** (SITE_URL fallback switched; domain still to be registered) | P1, P2 |
| D3 | Analytics: none vs privacy-friendly (e.g. Plausible/self-hosted) | P6 |
| D4 | Push spikes: stay local-only vs tiny push backend for review reminders | P5 |
| D5 | Error reporting vendor: self-hosted vs managed (Sentry etc.) | P6 |

---

## 2. Phase overview & sequencing

```
P0 Decisions ──┬──▶ P1 Trust & policy ──▶ P2 Installability ──▶ P8 QA ──▶ P9 Launch prep
               │         │                       │
               │         ▼                       ▼
               └──▶ P4 Content ◀── parallel ──▶ P3 Performance
                                           ▶ P5 Retention ──▶ P6 Observability ──▶ P7 A11y ──▶ P8 QA
```

- **Critical path:** P0 → P1 → P2 → P3 → P7 → P8 → P9.
- **Parallelizable anytime after P0:** P4 (content), P5 (retention), P6 (observability).
- **Suggested milestones:**
  - **M1 "Trustworthy PWA"** = P0 + P1 + P2 (installable, legal, correct icons/offline)
  - **M2 "Fast PWA"** = P3 (fonts, splitting, budgets green)
  - **M3 "Solid content"** = P4 (quiz integrity + QA gates)
  - **M4 "Cared-for PWA"** = P5 + P6 + P7 (retention, errors, a11y)
  - **M5 "Launch-ready"** = P8 + P9 (device QA + asset specs + TWA handoff doc)

Effort scale: **S** ≤ half day · **M** 1–2 days · **L** 3–5 days (solo+agent pace).

---

## 3. Phase details

### P0 — Decisions & foundations (M1)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P0.1 | Lock D1 (name) + D2 (domain) | Everything downstream keys off these | Owner decision; record in this doc + `PRODUCT-BRIEF.md` naming section | Written decision, no "Unknown" in user-visible strings plan | S |
| P0.2 | Rename sweep plan | "Unknown" is in manifest, titles, OG tags, SW version, store strings | Inventory via grep; execute as one atomic commit *after* D1 | `grep -ri "unknown" src public` returns only intentional hits | S |
| P0.3 | Baseline metrics capture | Can't show improvement without a baseline | Run Lighthouse (mobile, Moto G profile) on `/`, `/node/<id>`, `/review`; record LCP/INP/CLS, JS bytes, SW status; save to `docs/BASELINE-*.md` | Baseline doc committed | S |

**Gate M0:** D1/D2 recorded; baseline doc exists.

---

### P1 — Trust & policy surfaces (M1)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P1.1 | Privacy policy page (`/privacy`) | Play *requires* a policy URL even for offline apps; also just correct | New route `src/routes/privacy.tsx` (static, offline-bundled); plain-language: what we store (IndexedDB on-device), what leaves the device (nothing, post-P3 fonts; until then: Google Fonts IP), no accounts/ads/trackers, contact email, effective date. Link from You tab (new "About" section) + onboarding footer | Page renders offline; linked from ≥2 places; URL stable (`/privacy`) | S |
| P1.2 | About / version / contact surface | Reviewers and users need "who made this + how to reach you" | Extend You tab: About section (app version from `package.json` via build-time const, contact email, privacy link, "Rate us" placeholder disabled for PWA). Add `src/lib/version.ts` or Vite `define` | Version visible in-app; contact reachable | S |
| P1.3 | Terms of use (lightweight) | Lower priority than privacy; needed at Play submission, cheap now | `/terms` route, short: license, acceptable use, content attribution model, liability cap. Link next to privacy | Page exists, linked from About | S |
| P1.4 | Archived-sources IP audit | ~406 bundled `.md` archives are the biggest policy/content risk | Extend `scripts/audit-content.ts` (or new `scripts/audit-ip.ts`): for each `archive.path`, check: file exists, word count, has attribution header (source title/author/URL/date), excerpt-vs-full flag. Manual pass on the longest 10%: rewrite full reproductions → excerpt + link-out. Add per-item `license`/`excerpt` metadata convention; document in `docs/OFFLINE-ARCHIVE-PLAN.md` | 100% of archives have attribution headers; 0 unjustified full-text paywalled reproductions; audit script runs in `validate` | M–L |
| P1.5 | Data-flow declaration | Keeps the "no data collected" story true by construction | Write `docs/DATA-FLOW.md`: every network call the app makes (fonts → self-hosted in P3; navigations; nothing else), storage inventory (IndexedDB keys, Cache Storage), third parties (none). Any new fetch later must update this doc | Doc exists; P3/P6 tasks reference it | S |

**Gate M1a:** `/privacy` + `/terms` live and offline-capable; IP audit clean; `DATA-FLOW.md` committed.

---

### P2 — Installability & PWA quality (M1)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P2.1 | Maskable icon redo | Current spiral bleeds past the adaptive-icon safe zone → cropped on Pixel/Samsung | Rework art: spiral scaled to ~66% centered, full-bleed **opaque** background (paper `#FAF8F3` or ink — test both), export 512 + 192 maskable + 512 any. Validate with Android Studio adaptive-icon preview + maskable.app safe-zone overlay. Files: `public/icon-*.png` | Passes safe-zone overlay; no transparency in maskable; looks right in circle/squircle/teardrop masks | M |
| P2.2 | Manifest upgrade | Missing fields that Chrome/Play installers use | `public/manifest.webmanifest`: add `id: "/"`, `categories: ["education"]`, `screenshots` (narrow + wide, real UI — reuse P9 assets), `shortcuts` (Review due, Continue last node — needs `/continue` resolver or shortcut to `/review` + `/`), `launch_handler: { "client_mode": "focus-existing" }`. Keep `start_url/scope/display/orientation/theme_color` | PWABuilder + Chrome DevTools manifest audit report zero errors; shortcuts appear on long-press (Android) | M |
| P2.3 | SW update UX | `skipWaiting()` updates silently; users can sit confused on stale shells | Add versioned "Update available → refresh" affordance: SW posts `SW_UPDATED` + app shows a small non-blocking toast/banner (respect offline state). Bump `VERSION` per release; document release checklist in `docs/RELEASE.md` | Forced-update drill: deploy → banner appears → refresh applies new `VERSION` | S–M |
| P2.4 | Offline fallback polish | Airplane-mode first-run and edge navigations must degrade gracefully | Add explicit offline fallback for uncached navigations (friendly "You're offline" + Continue/Review entry points); verify `/`, `/review`, one `/node/*`, `/privacy` all load in airplane mode after install. Extend `useOfflineWarmup` doc list if new routes added (privacy/terms!) | Airplane test script (§6) passes on fresh profile | S |
| P2.5 | iOS A2HS polish | iOS ignores manifest; it's your second-largest install path | Verify `apple-touch-icon` (180px exact), `apple-mobile-web-app-capable`, `status-bar-style`, startup image (optional), standalone-mode detection already in `useInstallPrompt`; test Add-to-Home-Screen flow on real iPhone; fix 100dvh/viewport quirks if found | Real-iPhone A2HS checklist passes (§6) | M |
| P2.6 | Install-prompt hygiene | Don't nag; do measure locally | Keep `beforeinstallprompt` capture; add dismiss-forever + 7-day snooze persisted in store; log install attempts/outcome to **local-only** counter surfaced in You → About (debug aid, no network). Ensure prompt never shows when `isStandalone` | No nag loops; state machine unit-tested | S |
| P2.7 | SEO/social baseline (cheap) | PWA discovery still runs through the web | Per-node OG tags exist — add `og:image` (generated default card), `canonical`, `robots.txt` review, sitemap already generated — validate in Search Console later. `theme-color` already synced incl. dark mode | `validate` script extended: every node has thesis ≤160 chars for meta | S |

**Gate M1b:** PWABuilder score "installable, no warnings"; airplane-mode script green; iOS A2HS verified on device.

---

### P3 — Performance (M2)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P3.1 | Self-host fonts (subsetted) | Only third-party call; blocks render; breaks the no-data story | Download Fraunces/Inter/JetBrains Mono woff2 (latin subset + needed weights), serve from `/fonts`, `@font-face` with `font-display: swap`, drop Google Fonts links + preconnects from `__root.tsx`, add to SW precache. Update `DATA-FLOW.md` | Zero third-party requests on WebPageTest; Lighthouse "reduce unused webfonts" clean; offline first-load renders correct type | M |
| P3.2 | Per-cluster lazy loading | Nodes chunk is ~1.2 MB raw / ~404 KB gzip — past the repo's own trigger | Implement `docs/NODES-SPLIT-DECISION.md`: dynamic `import()` per cluster + index of IDs/tags; rework SW precache to cache cluster chunks on demand + warm "interested" clusters; keep `validate` green. Staged rollout behind a flag if risky | Initial JS (gzip) for cold `/` within budget (§5); cluster open loads ≤1 extra chunk; offline-after-warm still 100% | L |
| P3.3 | Bundle budgets + Lighthouse CI | Prevent silent regressions | Add `scripts/budgets.ts` (or `bundlesize` config): entry JS, per-cluster chunk, CSS, fonts caps. Wire `vitest`/`validate` or GH Action to run Lighthouse 3× median on `/` + `/node/*` with thresholds (§5). Fail build on breach | CI red on +10% JS regression (verified by temporary padding test) | M |
| P3.4 | Image/asset hygiene | Small but free | Compress `icon-*.png` (lossless), ensure `logo.svg` inlined where above-fold, `fetchpriority` on hero logo, lazy below-fold art. Preload only the active route's chunk | No image >100 KB in `public/` root; LCP element identified and preloaded | S |

**Budgets (§5 targets):** Lighthouse mobile Perf ≥90 (PWA cat. 100); LCP ≤2.5s / INP ≤200ms / CLS ≤0.1 on Moto G 4x-CPU-throttle; cold `/` JS ≤350 KB gzip total; 0 third-party requests.

**Gate M2:** budgets enforced in CI; PWABuilder/Lighthouse PWA = 100; fonts offline; §6 perf script green.

---

### P4 — Content & quiz integrity (M3, parallelizable)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P4.1 | Quiz length-tell repair | Correct answer longest in ~93% of nodes — users will game it, SRS becomes theater | Cluster-by-cluster editorial pass (script-assisted, human-approved): per node, enforce correct-option length within ±20% of longest distractor; strengthen 2 distractors with substantive (not templated) detail; keep explanations. Add metric to `scripts/audit-content.ts`: `% correct-is-longest` | ≤40% correct-is-longest globally (TECH_DEBT target); audit fails CI above 45% | L (editorial) |
| P4.2 | Thin-cluster top-up | C/E/H-class thin clusters feel empty vs 20+ node clusters | Set minimum (e.g. ≥8 nodes/cluster or merge plan); write/commission nodes via existing content workflow (`docs/CONTENT-WORKFLOW-*`); re-run `validate` + related-link density check | 0 clusters below minimum; related-link density documented per cluster | M–L |
| P4.3 | Content QA gates in CI | Keep quality from regressing as nodes grow | `validate` (schema/links) + `audit` (quality metrics) run on every PR; add checks: thesis length, L0/L1/L2 presence, ≥3 related live links, quiz explanation present, tags ∈ TAGS, no lorem/placeholder | Failing fixture PR proves gates bite | S–M |
| P4.4 | First-run content guarantee | New-user interests must never yield an empty feed | Property test: every TAGS combination ≥MIN_PICKS yields ≥N feed items; `needsTopics`/exhausted states covered. Extend `src/lib/feed.test.ts` | Test green; onboarding counts already shown stay accurate | S |

**Gate M3:** audit metrics green; QA gates enforced; thin clusters resolved.

---

### P5 — PWA-native retention (M4, parallelizable)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P5.1 | App-badge due count (Badging API) | Free re-engagement on Chromium Android: launcher badge = "3 due" | `navigator.setAppBadge(dueCount)` on store change (guarded, cleared at 0); clear on Review completion; no-op where unsupported. ~20 lines + test | Badge appears/clears on Chrome Android launcher; no errors on Safari/Firefox | S |
| P5.2 | Shortcuts that retain | One-tap "Review due" / "Continue" from launcher (ties to P2.2) | Implement shortcut targets (static `/review`; `/continue` resolver → `lastNodeId` or feed); icons per shortcut | Long-press launcher shows both; deep links resolve offline | S |
| P5.3 | Audio hardening pass | Narration is a headline feature; TTS is OEM-fragile | Real-device matrix (Pixel/Samsung/Xiaomi + iOS): lock-screen controls, calls-interrupt resume, voice persistence, rate persistence; fix: `onerror` recovery, chunk long sentences (some engines truncate ~200–300 chars), warn on no-English-voice. Document quirks in `docs/AUDIO-MATRIX.md` | Matrix doc complete; 0 crash-loses-place bugs; resume position survives route change | M |
| P5.4 | Streak/daily-goal UX tune | Current loop is solid; close the leaks | Streak-freeze or "weekend mode" decision (document, don't gold-plate); "due tomorrow" preview in Review empty-state; shareable streak card via Web Share (text-only, no image dep) | Leak fixes shipped; no new backend | S–M |
| P5.5 | (If D4=yes) Push spike | Only path to true reminders in PWA | Time-boxed spike: VAPID + minimal push service worker + tiny sender (Supabase/own endpoint) + permission UX + preferences in You tab. **If it needs accounts or >1 week, kill it and defer to native phase** | Spike report: go/no-go with cost | M (spike) |

**Gate M4a:** badge + shortcuts live; audio matrix green on ≥3 Android devices + 1 iPhone.

---

### P6 — Observability (M4, parallelizable)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P6.1 | Error reporting (D5) | Flying blind on crashes = 1-star roulette | Requirements: offline queue + retry, PII scrubbing, user opt-out in You → About, documented in privacy policy. Wire `src/lib/error-capture.ts` + route `errorComponent` + `unhandledrejection` to reporter. Start with errors-only, sampled | Staged error appears in dashboard <5 min; opt-out verified (0 events after toggle); privacy page updated | M |
| P6.2 | Analytics decision (D3) | Needed for launch learning — but must not break the privacy story | Options: (a) none + rely on store/PWABuilder stats; (b) Plausible/self-hosted, cookieless, documented. If (b): ≤10 custom events (onboarding_done, node_open, quiz_submit, review_complete, install_accepted…), offline-tolerant, no fingerprinting | Decision recorded; if implemented, `DATA-FLOW.md` + privacy updated same PR | S–M |
| P6.3 | Release discipline | "Unknown-v3" SW strings don't scale | `docs/RELEASE.md`: version bump (= package.json), SW `VERSION`, changelog snippet in About, deploy → verify → TestFlight-equivalent (internal URL) checklist | One full rehearsal release executed | S |

**Gate M4b:** errors observable with opt-out; analytics decision shipped; release rehearsed.

---

### P7 — Accessibility (M4)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P7.1 | axe-core CI gate | Automate what automation can catch | Add `axe-core` + vitest/jsdom pass on Feed/Node/Review/You/Onboarding render; fail on critical/serious. Fix backlog it finds (likely: color contrast on `ink-soft`/accent micro-labels, icon-button names, radiogroup semantics in Quiz — mostly present, verify) | 0 axe critical/serious on 5 routes; CI enforced | M |
| P7.2 | Contrast + type pass | Editorial design systems often fail 4.5:1 on secondary text | Measure all text/background pairs incl. dark mode; adjust tokens in `styles.css` (keep aesthetic — darken `ink-soft` slightly, check `accent` on paper); verify focus-visible rings everywhere | Contrast table in PR; all body text ≥4.5:1, large ≥3:1 | M |
| P7.3 | Screen-reader walkthrough | Automation misses flow issues | Scripted NVDA (Android: TalkBack) + VoiceOver pass: onboarding → feed card → open node → reveal layers → quiz → review queue → install dialog. Fix: live-region chatter, heading order, missing labels (TTS voice `<select>` already labeled — verify announcement). Record findings in `docs/A11Y-AUDIT.md` | Walkthrough doc with 0 open blockers | M |
| P7.4 | Input & motion checks | Mobile-specific a11y | 44px target audit (voice select, queue arrows, chip buttons), `prefers-reduced-motion` (snap + spiral + transitions — partially done, verify all), keyboard-only desktop pass, 200% text-size reflow | Checklist green; issues filed or fixed | S |

**Gate M4c:** axe clean in CI; contrast table green; walkthrough doc with 0 blockers.

---

### P8 — QA & device matrix (M5)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P8.1 | Android device matrix | OEM/Chrome-version fragmentation is where PWAs die | Real devices (min): Pixel (current), Samsung A-series (Chrome + Samsung Internet), Xiaomi/Redmi low-end. Per device: install → onboard → feed → node → audio → quiz → review → airplane-offline → update flow. Log in `docs/DEVICE-MATRIX.md` | Matrix complete; P0/P1 bugs fixed; P2s filed | M |
| P8.2 | iOS sanity | Second install path, different engine | iPhone (current −1): Safari A2HS flow, standalone launch, audio + silent-switch behavior, 100dvh layout, share sheet. Known-limitation list if any | Checklist green or limitations documented | S |
| P8.3 | Desktop + keyboard pass | PWA is also a website; reviewers may open it anywhere | Chrome/Edge/Firefox/Safari: responsive widths (360→1440), keyboard-only full journey (J/K feed nav exists — verify), zoom 200% | 0 layout breaks; keyboard map documented in feed hint (exists) | S |
| P8.4 | Pre-launch self-review (Play-style) | Rehearse the scrutiny before it counts | Run through: first-install cold start, airplane first-run, update-in-place, back-button traversal, rotation, dark/light, low-storage, kill-and-resume mid-audio, 7-day streak simulation (clock skew) | Report with 0 open P0/P1 | M |

**Gate M5a:** device matrix + pre-launch report complete, 0 open P0/P1.

---

### P9 — Launch prep & TWA handoff (M5)

| ID | Task | Why | Steps / files | Acceptance | Effort |
|----|------|-----|---------------|------------|--------|
| P9.1 | Listing-asset specs + production | Needed for directories now, Play later | Produce to spec (even if unused yet): hi-res icon 512 (have), **feature graphic 1024×500**, **phone screenshots** (≥2, real UI: Feed + Node + Review), wide screenshot for manifest. Save sources + exports under `assets/store/` (git-ignored exports if large — decide) | Asset checklist 100%; manifest `screenshots` wired (P2.2) | M |
| P9.2 | Store copy draft | ASO + conversion live or die here | Title (≤30 chars post-rename), short desc (≤80), full desc with retention hook in first 2 lines, category Education, tags. Save `docs/STORE-COPY.md` | Copy reviewed against policy (no superlatives you can't prove, no "best") | S |
| P9.3 | TWA handoff doc | Make the future wrapper a weekend job | `docs/TWA-HANDOFF.md`: package-name recommendation, `assetlinks.json` template + SHA placeholder, Bubblewrap config + version pin, target-SDK note (API 35+), Play Data Safety pre-answers ("no data collected" + fonts self-hosted proof), content-rating pre-answers, account-deletion N/A rationale, tester instructions | Doc reviewed; assetlinks template validated as JSON | S |
| P9.4 | Launch checklist | Don't rely on memory on launch day | `docs/LAUNCH-CHECKLIST.md`: gates M1–M5 sign-off, release per `RELEASE.md`, PWABuilder final pass, Search Console + sitemap submit, backup/rollback (Vercel instant rollback), comms | Dry-run ticked on staging URL | S |

**Gate M5b (PLAN COMPLETE):** all gates M1–M5a signed; `TWA-HANDOFF.md` + `LAUNCH-CHECKLIST.md` done.

---

## 4. Commands & gates cheat sheet

```bash
bun run validate   # schema + link integrity (+ IP audit once P1.4 lands)
bun run audit      # content quality metrics (+ quiz length % once P4.1 lands)
bun run test       # vitest (store, feed, install state machine, feed guarantee)
bun run lint       # eslint (axe gate added in P7.1)
bun run build      # must stay green; budgets enforced from P3.3
```

Manual gates: airplane script (P2.4), A2HS iPhone (P2.5), device matrix (P8.1), SR walkthrough (P7.3), pre-launch report (P8.4).

---

## 5. Budgets & SLOs (proposed — ratify in P0.3)

| Metric | Target | Measured by |
|--------|--------|-------------|
| Lighthouse Perf (mobile, Moto G throttle) | ≥90 | CI median-of-3 |
| Lighthouse PWA / A11y / Best-practices | 100 / ≥95 / ≥95 | CI |
| LCP / INP / CLS | ≤2.5s / ≤200ms / ≤0.1 | CI + field (if analytics) |
| Cold `/` JS total (gzip) | ≤350 KB | budgets script |
| Third-party requests | 0 | WebPageTest / DevTools |
| Quiz correct-is-longest | ≤40% | `audit` |
| axe critical/serious | 0 | CI |
| Offline coverage (post-warm) | 100% routes + all nodes + privacy/terms | airplane script |

---

## 6. Manual test scripts (executed at gates, not CI)

**Airplane script (P2.4/P8):** fresh profile → load `/` online → complete onboarding → open 1 node → play 10s audio → answer 1 quiz → airplane ON → kill browser → relaunch from launcher icon → assert: `/` loads, feed scrolls, node opens, review answers, `/privacy` loads, audio plays (voice cached by OS), no blank screens.
**A2HS script (P2.5/P8.2):** iPhone Safari → Add to Home Screen → launch standalone → assert: no Safari chrome, status bar styled, install CTA hidden (`isStandalone`), audio + share work, rotation safe.
**Update drill (P2.3/P8.4):** install vN → deploy vN+1 → assert: update affordance appears ≤1 visit, refresh lands on vN+1, IndexedDB state intact (streak/bookmarks/review preserved).

---

## 7. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Rename churn touches many files/strings | High | Med | Single atomic rename commit after D1; grep-verified |
| TTS OEM fragmentation (voices, truncation, lock-screen kill) | High | Med | P5.3 matrix early; chunk sentences; graceful degradation copy |
| Per-cluster split breaks SW offline assumptions | Med | High | Flag-gated rollout; airplane script before/after; keep full-bundle fallback one release |
| IP audit finds full-text reproductions needing rewrites | Med | High | P1.4 early in sequence; excerpt-first convention stops the bleed immediately |
| Push needs a backend (scope creep) | Med | Med | D4 decision gate + time-boxed spike with kill criteria |
| Low-end perf (1.2 MB graph) hurts ratings in target markets | Med | Med | P3 budgets + Moto G CI profile; cluster-split is the structural fix |
| Scope creep into native (widgets/FCM) | Med | Low | Out-of-scope list enforced; revisit only with retention data |

---

## 8. Decisions needed from owner (to start)

1. **D1 — Name.** Everything keys off this. (Constraint check: trademark search, domain + social handle availability, ≤30 chars for Play title, must not be "Unknown" 😄.)
2. **D2 — Domain.** Needed for privacy URL, manifest `id`, and (later) assetlinks.
3. **D3 — Analytics.** Recommendation: start with **none**, ship P6.1 errors-only, revisit post-launch with real questions.
4. **D4 — Push.** Recommendation: **local-only for v1** (badge + shortcuts + streak UX); spike push only if D1 retention data demands it.
5. **D5 — Error reporting.** Recommendation: managed (Sentry) with strict scrubbing + opt-out — self-hosting is a second job.

Proposed start order once D1/D2 land: **P0.3 baseline → P1.1 privacy → P2.1 icon → P2.2 manifest → P3.1 fonts** (all agent-executable), with **P1.4 IP audit** and **P4.1 quiz repair** running as the human-led editorial tracks.
