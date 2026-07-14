# Lovable Prompt — 3 improvements to the existing Epistemoph app

*Paste into Lovable on the idea-weaver project. These are edits to existing files, not a rebuild. Do them one at a time if Lovable prefers.*

---

Make these three changes to the existing app. Keep the current design system, tokens, and everything else exactly as-is — only change what's described.

## 1. Make the audio narration real (replace the mocked timer)

`src/components/AudioBar.tsx` currently fakes playback with a `requestAnimationFrame` timer and plays no sound. Replace it with **real narration using the browser Web Speech API (`window.speechSynthesis`)** — no external TTS service, no API key, works offline.

Requirements:
- Keep the same props (`{ sentenceCount }`) and the same visual bar (play/pause button, thin accent progress line, "Listen" label, `x / total` counter). Keep it fixed at `bottom-[64px]` above the nav.
- On play: read the on-page `[data-sentence]` spans **in order** (sort by the numeric `data-sentence` value), speak them one at a time with a `SpeechSynthesisUtterance` per sentence.
- As each sentence starts, set `dataset.active = "1"` on that span (and `"0"` on the others) so the existing `data-[active=1]:bg-accent/15` highlight fires, and `scrollIntoView({ block: "center", behavior: "smooth" })` to keep it visible.
- Progress = current sentence index / total. When it reaches the end, reset to sentence 0 and clear highlights.
- Play/pause: pausing cancels speech but remembers the current sentence index so play resumes from there.
- Reset index and stop speech when `sentenceCount` changes (navigating to a different node) and on unmount.
- Guard for SSR (`typeof window !== "undefined"`) and unsupported browsers: if `speechSynthesis` isn't available, disable the play button and show "Audio not supported" instead of "Listen".

## 2. Fix the dead "Continue" card on the home/Map screen

In `src/routes/index.tsx`, the Continue card links to `/` when there's no reading history (`cont` is null) — a dead tap for first-time users.

Fix: compute a starter node and always link to a real node.
- After the `cont` line, add: a `starter` = the first node of cluster "A" (`NODES_BY_CLUSTER["A"]?.[0] ?? Object.values(NODE_BY_ID)[0]`), and `resume = cont ?? starter`.
- The Continue `<Link>` should always be `to="/node/$id"` with `params={{ id: resume.id }}`.
- Label it `"Continue"` when `cont` exists, otherwise `"Start here"`, and always show `resume.title` and `resume.author`.

## 3. Make it a true offline PWA (add a service worker)

The app has a manifest and icons but no service worker, so it isn't actually offline-capable.

- Add `public/sw.js` with: cache versioning; `install` precaches `"/"` and `"/manifest.webmanifest"` then `skipWaiting()`; `activate` deletes old caches and `clients.claim()`; `fetch` handler that is **network-first for navigations** (fall back to cached `"/"` when offline), **cache-first for cross-origin** requests (fonts), and **stale-while-revalidate for same-origin assets**. Only handle GET requests.
- Register it in `src/routes/__root.tsx` inside `RootComponent` with a client-only effect:
  ```ts
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  ```
  (`useEffect` is already imported in that file.)

After all three, make sure the project still builds (`npm run build`) with no type errors.
