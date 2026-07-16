# Replacement for .claude/CLAUDE.md — "Where things live" (content pipeline)

Replace the two bullets covering `content/sources/*.md` and `scripts/` with the following.

---

- **Archived sources** live on disk at `public/content/sources/<nodeId>-<index>.md`
  (127+ files, `A1-0.md` style). They are served by Vite at the URL `/content/sources/...`,
  which is why each `furtherReading.archive.path` stores the **`public/`-stripped URL**
  (`content/sources/A1-0.md`), not the disk path. Writing these files anywhere other than
  `public/content/sources/` will 404 in the app — the archiver asserts against it.
  `docs/*.md` — planning docs; `PRODUCT-BRIEF.md` is authoritative.

- **`scripts/` — the content pipeline (permanent, idempotent, re-runnable):**
  - `validate-nodes.ts` — schema gate: unique ids, clusterId ∈ CLUSTERS, tags ⊆ TAGS,
    quiz 3-4 options with in-range correctIndex, related ids resolve, furtherReading
    label/source/url, archive status/path files exist. Read-only; exits non-zero on error.
  - `archive-sources.ts <clusterId|all> [--dry-run]` — snapshots furtherReading URLs to
    `public/content/sources/`. Idempotent; caps retries; logs misses to `archive-failures.log`.
  - `next-id.ts <PREFIX> [count]` — deterministic next free id for a prefix.
  - `audit-content.ts <summary|tag|cluster|field|orphans|dupes> [arg]` — read-only content
    consistency audit (generalizes the old find-health.ts).
  - `build-nodes-ts.ts` — (kept) regenerate derived exports if needed.

  Adding content is done through the **add-content** flow (skill), which proposes node(s),
  assigns ids, writes the node + quiz inline, archives sources, and runs the validate gate.
  There are no per-batch inject scripts and no quiz-patch JSON files.
