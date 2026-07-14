# Big Ideas App — Project Spec (v1)

_A personal, offline-first compendium of the world's foundational ideas — simply explained, cross-linked, bookmarkable, and narrated._

Owner: solo build for now, designed so accounts/sync can be bolted on later if opened up to others.

---

## 1. Tech stack (final)

| Layer                                    | Choice                                                                                                  | Why                                                                                                                                                                           |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework                                | Next.js (App Router)                                                                                    | Static generation per article, good DX, works natively with Vercel                                                                                                            |
| Hosting/CI                               | Vercel, git-connected                                                                                   | Push to git → auto preview + production deploy. No separate CI needed.                                                                                                        |
| Content storage                          | MDX/JSON files in the repo (`/content/<category>/<topic>.mdx`)                                          | Git _is_ the CMS — every new idea is a commit/PR, full history and diffs for free                                                                                             |
| Audio storage                            | Object storage (Vercel Blob or Cloudflare R2) — **not committed to git**                                | Audio files are binary and bloat repos/clones; reference by URL from article metadata instead                                                                                 |
| Audio generation                         | Batch script calling a TTS API (OpenAI TTS / ElevenLabs), run once per article and re-run only on edits | Pre-generating (vs. on-demand) keeps cost predictable and works offline once cached                                                                                           |
| Offline / installable                    | Service worker (Workbox, NOT next-pwa) + manifest.json                                                  | Custom service worker to maintain separated `app-shell-cache` vs. `media-cache`. Uses Background Fetch API for audio downloads to prevent iOS storage eviction traps.         |
| Search                                   | Static index built at deploy time (Pagefind or FlexSearch)                                              | Full-text search that works fully offline, no server round-trip                                                                                                               |
| User data (stars, collections, progress) | IndexedDB via Dexie.js + Persistent Storage API                                                         | navigator.storage.persist() ensures the browser doesn't evict critical user bookmarks/progress under storage pressure.                                                        |
| Accounts/sync                            | **Deliberately not built yet**                                                                          | If this opens to other people later, bolt on a lightweight backend (e.g. Supabase) — the content schema below is written generically enough to support that without a rewrite |

**Known constraint to design around:** iOS Safari is aggressive about evicting PWA cache storage under space pressure — don't assume "cached once = cached forever" on iPhone. Build a re-download/refresh path into the offline manager rather than a one-time download button.

---

## 2. Content model

**Structure:** Category → Topic (article). Categories are cross-disciplinary (decision-making, reasoning/bias, systems/science, applied-to-life, philosophy, economics, psychology, history) rather than siloed by academic field — that's intentional, see differentiator below.

**Every article follows the same fixed shape** (optimized for cognitive load and active recall):

1. **One-line takeaway** — the advance organizer at the top; gives the brain the schema before reading. (Note: At the end of the article, this is blurred out to trigger an active recall check).
2. **Hook** — why this idea matters, one paragraph
3. **Core explanation** — the idea itself, plain language
4. **Origin / example** — where it comes from or a concrete illustration
5. **Related ideas** — explicit cross-links to other articles in the library (see below — this is the core differentiator)
6. **Sources** — citations to the reputable material this was synthesized from (written in original words, not close paraphrase — avoids copyright exposure since content is "curated from existing sources")

**The differentiator:** Blinkist gives you 6,500 isolated book summaries with no structural link between them. Farnam Street has the right cross-disciplinary philosophy (Munger's "latticework") but no app to live in. This project combines both — the "Related ideas" section on every article is a first-class feature, not an afterthought, so reading about compounding surfaces its link to exponential growth and flywheel effects even though they come from different fields.

### Starter topic list (v1, ~30 ideas pulled from Farnam Street's proven taxonomy as reference — rewritten in original language, not copied)

**Decision-making & game theory:** Tit for Tat, Prisoner's Dilemma, The OODA Loop, Bayes' Theorem, Probabilistic Thinking, Second-Order Thinking, Inversion

**Reasoning & bias:** Occam's Razor, Deductive vs. Inductive Reasoning, Survivorship Bias, Illusion of Transparency, The Power of Anecdotes, First Principles Thinking

**Systems & science:** Thought Experiments, Reciprocity, Winner-Take-All Markets, The Butterfly Effect, Entropy, Compounding

**Applied to life:** The Long Game, Descriptions Aren't Prescriptions, Circle of Competence, Leverage, Proximate vs. Root Causes

_(Full reference lists with source links are already in this conversation's history — pull from there when drafting.)_

---

## 3. Features (final)

1. **Browse + offline full-text search** — by category or search bar, works with no connection once indexed
2. **Article reader with synced audio** — play/pause/scrub; highlight text at the _sentence level_ (not word level) to prevent saccadic mismatch and optimize Dual Coding. Includes a "Snap to Audio" floating button if the user scrolls away, so they can return to the active sentence without forceful auto-scrolling.
3. **Background & Lock-screen Playback** — implements the Web Media Session API to provide native lock-screen controls (play, pause, 15s skip) and display the article title and artwork while the PWA is in the pocket.
4. **Continuous Learning Queue** — when an article finishes, the app auto-transitions to a "Related Idea" using a synthesized voiceover link (e.g. _"If you liked [X], here is how it connects to [Y]"_) to maximize intrinsic variable reward. Tapping a link mid-audio creates a smooth 0.5s fade out.
5. **Star** — simple one-tap bookmark on any article
6. **Reading/listening progress** — auto-saves scroll position and audio position per article; home screen shows a "continue reading" row
7. **Related ideas / latticework links** — every article ends with links to structurally-similar ideas across other categories
8. **Offline download manager** — explicitly tied to the Star button. Starring an article silently kicks off a Background Fetch to cache the audio offline. No complex queue UI for v1.
9. **Revisit nudge** — resurfaces a starred idea after some elapsed time. To prevent the "Illusion of Competence," the nudge displays a scenario/hook instead of the title (e.g., "What model explains why startups beat corporations?"). Tapping it reveals the title for spaced retrieval practice.

### Explicitly deferred to v2+

- Accounts, multi-device sync, other users
- Push notifications for the revisit nudge
- Public sharing / social features
- A visual graph view of how ideas connect (nice-to-have once enough articles exist to make it worth looking at)

---

## 4. Build order

1. Set up Next.js + Vercel git deploy, empty content folder structure
2. Write and review the first 10 articles (one category), no audio yet — validate the article shape and cross-linking feels right
3. Add IndexedDB (Dexie) for star/collections/progress — get the reading loop working end-to-end on those 10 articles
4. Add PWA offline caching for that same set
5. Add batch TTS generation + audio sync for that set
6. Only then scale up content to the full ~30-topic v1 list
