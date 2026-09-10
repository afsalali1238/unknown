# Data Flow Declaration (P1.5)

The complete inventory of what this app stores and transmits. **Any PR that adds
a network call, a storage key, or a third party must update this doc** — it is
the source of truth behind the Privacy policy and the future Play Data Safety form.

Last reviewed: 2026-09-10 (v0.1.0).

## Stored on-device (never transmitted)

| Store | Key / scope | Contents |
|-------|-------------|----------|
| IndexedDB (via `idb-keyval`, zustand `persist`) | `unknown:v1` | Progress + user content: `gotIt`, `bookmarks`, `visited`, `review` (Leitner boxes), `streakDays`, `lastNodeId`, `glossary`, `scratchpad`, `interests`, `onboardingComplete`, `ttsRate`, `ttsVoice`, `seenHints`, `readNext`, `readLog`, `audioProgress`, `dailyGoal`, `dailyProgress`, `theme` |
| Cache Storage (service worker) | `shell-unknown-*`, `runtime-unknown-*` | App shell, JS/CSS chunks, archived source markdown, fetched fonts |
| `sessionStorage` | `feed-seed` | Ephemeral feed shuffle seed for the tab session |

Deleting site data (browser settings / uninstalling the PWA) removes all of the above.

## Transmitted

| Destination | Trigger | Data | Basis |
|-------------|---------|-----|-------|
| Own origin (Vercel host) | Page loads, navigations | Standard request metadata (IP, user agent) | Required to serve the app |
| `fonts.googleapis.com` / `fonts.gstatic.com` | Every page load (stylesheet link in `__root.tsx`) | Standard request metadata (IP, user agent); no app data, no identifiers | **To be removed in P3.1** (self-hosted fonts) → then this row becomes "none" |
| User-chosen external links (`furtherReading[].url`) | Only when the user taps "Read online" | Whatever the third-party site collects | User-initiated navigation, covered by those sites' policies |

## Explicitly absent (v0.1.0)

- No accounts, no login, no identifiers (no GAID/IDFA/cookies/fingerprinting).
- No analytics SDK, no crash reporting SDK (P6 will add errors-only reporting with opt-out; this doc + Privacy must be updated in the same PR).
- No advertising SDK or mediation.
- No camera / microphone / location / contacts / storage permissions requested.
- No background sync, no push subscriptions, no periodic sync.
- No AI features that transmit user input anywhere.

## Consequences

- Play Data Safety (future): "No data collected, no data shared" is accurate **after P3.1**.
  Before P3.1, the Google Fonts fetch means IP addresses reach Google — declare honestly if submitting early.
- Privacy policy (`src/routes/privacy.tsx`) mirrors this doc in plain language. Change one, change the other.
