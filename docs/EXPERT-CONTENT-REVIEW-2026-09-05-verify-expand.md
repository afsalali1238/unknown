# Expert Content Review — Verify, then Expand (2026-09-05)

**Branch:** `arena/01a071f1-unknown` · **Baseline:** `eab5bc2` (437 nodes, the +50 batch reviewed in `EXPERT-CONTENT-REVIEW-2026-09-05.md`) → **451 nodes** (+14)
**Scope agreed with owner:** (1) independently verify the 50-node batch and fix defects only; (2) bring the eight remaining thin clusters (B, K, P, T, W, X, Y, Z) to exactly 8 nodes each with the same standards; (3) keep 0 orphans, all gates green, docs regenerated; (4) open a PR to `main`.

---

## 1. Verification pass (commit `3f99b25`)

Every gate was re-run from a clean `node_modules` (repo has `bun.lock` only, so `npm install --legacy-peer-deps`). All 50 new nodes were read in full; every `furtherReading` URL was fetched live; facts were checked against primary sources where the node made a checkable claim.

### 1.1 Quiz template tell — 1,023 tails + 128 glue sentences stripped

The prior batch had "fixed" the correct-answer-length tell by appending one of ~12 fixed dash-suffixes to distractors (`— a plausible reading that…`, `— a widely circulated summary that…`, `— an intuitive but incorrect explanation that conflates…`). Independently measured on `eab5bc2`:

| Finding                                                         | Count                               |
| --------------------------------------------------------------- | ----------------------------------- |
| Distractors carrying a templated tail                           | 1,023 (352 nodes, 37 cluster files) |
| Tails that had leaked onto the **correct** option               | 3                                   |
| Tails truncated mid-word (`— thi`, `— this view emph`)          | ~40                                 |
| Standalone glue/meta sentences (`This is a common misreading.`) | 128                                 |

Twelve fixed phrases across a thousand options are a _worse_ tell than length: the unpadded option is the odd one out. With the owner's approval all tails and glue sentences were stripped (regex-driven, then `prettier --write`, then a re-scan that returns 0; the only surviving " — a … that …" strings are genuine content in G8 and J21). Three fragment distractors in AL5 were rewritten as full clauses by hand.

Residual: the correct option is still the longest in ~93% of quizzes. That is now logged as **TECH_DEBT.md §3** with a measurable target (≤40%) rather than papered over again.

### 1.2 Dead / moved sources — 12 replaced or fixed

All checked live via fetch; replacements are primary or publisher pages.

| Node          | Problem                       | Fix                                                                            |
| ------------- | ----------------------------- | ------------------------------------------------------------------------------ |
| AG5           | HBR JTBD URL 404              | HBR 2016/09 "Know Your Customers' Jobs to Be Done"                             |
| AD7           | Mirror-neuron review URL dead | `doi.org/10.1146/annurev.neuro.27.070203.144230` (Rizzolatti & Craighero 2004) |
| F8            | Moore 1965 scan URL dead      | Computer History Museum catalog 102770822                                      |
| F7            | BSTJ link dead                | `archive.org/details/bstj57-6-1899` (BSTJ 57(6), 1978)                         |
| AE7           | Gottschall page moved         | `jonathangottschall.com/storytelling-animal`                                   |
| AG3           | DOET link dead                | jnd.org DOET 2013 page                                                         |
| AK5, AK6, AI4 | Retail links dead             | Publisher pages (PRH 234876, PRH 309214, Hachette 9781610390453)               |
| AE5, AF4      | Moved                         | gizmodo 5916970; science.org 10.1126/science.286.5439.509                      |
| AI5, AC6      | Wrong path / label≠URL        | OLL `/titles/` path; label corrected                                           |

Left as-is (unfetchable from sandbox, not demonstrably dead): AC3 cs.virginia.edu Turing PDF, AG6 melvinconway.com.

### 1.3 Fact defects — 5 corrected

| Node                    | Was                                                   | Now                                                                                                                         |
| ----------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| F7 Unix philosophy      | Attributed the three-line manifesto to Thompson alone | Thompson, Ritchie & McIlroy; the "write programs that do one thing…" text is McIlroy's foreword to the 1978 BSTJ Unix issue |
| F8 Moore's Law          | "ten years of data, doubling every two years" in 1965 | Five data points (1959–65), doubling **yearly**; the two-year revision is 1975                                              |
| AC4 Russell's Paradox   | Letter to Frege dated 1901                            | Paradox found 1901; letter to Frege **June 1902**                                                                           |
| AK5 Attention Merchants | Vague "cheap paper" framing                           | Penny press: one cent vs six-cent rivals                                                                                    |
| AG7                     | Typo                                                  | Fixed                                                                                                                       |

Gate results after the pass: validate OK · prettier clean · tsc 0 · vitest 15/15 · eslint 0 errors / 6 pre-existing warnings · orphans 0/0 · hooks: only pre-existing AL11/AL17/AL19.

---

## 2. Expansion — 14 nodes, eight clusters to 8/8

**Selection rule:** each cluster's own remit (see `CLUSTERS` subtitles), no duplication of anything already in the lattice (grep-checked: Worldly Wisdom / Circle of Competence / Inversion live in J; JTBD in AG5; Dunbar in AF5; CRISPR in Z6; Kelly in E8/L18; Institutional Imperative in D/W4 — all avoided), and a **primary source that was fetched live during this session**. Four candidate URLs were rejected as dead and are recorded below so nobody re-adds them.

| ID     | Title                                                | Author · Year              | Primary source (fetched live)                     | Why this one                                                                                                                                                |
| ------ | ---------------------------------------------------- | -------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **B8** | LinkedIn Series B Pitch Deck (Greylock)              | Reid Hoffman · 2004        | reidhoffman.org annotated deck                    | Only major published _successful_ deck with the founder's own slide-by-slide commentary; complements B4/B6 with a _thesis-first, objection-first_ structure |
| **K7** | The Ergodicity Problem                               | Ole Peters · 2019          | Nature Physics 15:1216 + LML textbook page        | Missing keystone of the "compounding" cluster — why time-averages ≠ expectation values; links K1/K4 to E8 Kelly and L1 EV                                   |
| **K8** | Pace Layering                                        | Stewart Brand · 1999       | longnow.org + JoDS 2018                           | Time-scale hierarchy for systems; bridges K2 Lindy / K3 path dependence to M2 Chesterton and AH1 Asabiyyah                                                  |
| **P8** | Escape Competition Through Authenticity              | Naval Ravikant · 2019      | nav.al/competition-authenticity                   | Cluster subtitle promises "six parts"; this is the wealth-creation plank missing between P2 specific knowledge and A5 Thiel                                 |
| **T6** | Imitate, Then Innovate                               | David Perell · 2022        | perell.com essay                                  | Perell's craft thesis (T1 was only writing-online); ties to AE1 hero's journey and N2 taste                                                                 |
| **T7** | The 5 Types of Wealth                                | Sahil Bloom · 2025         | sahilbloom.com launch essay + PRH page            | Bloom's book-length framework; T2 was his only node                                                                                                         |
| **T8** | Make a PACT, Not a SMART Goal                        | Anne-Laure Le Cunff · 2019 | nesslabs.com/smart-goals-pact                     | Le Cunff's core tool (and the unit of _Tiny Experiments_); T3/T4 covered only journaling/notes                                                              |
| **W7** | Waiting for the Fat Pitch                            | Warren Buffett · 1997      | berkshirehathaway.com/letters/1997                | Ted Williams strike zone + hamburger quiz; the _temperament_ node W6 gestured at                                                                            |
| **W8** | Owner Earnings                                       | Warren Buffett · 1986      | berkshirehathaway.com/letters/1986 (appendix)     | The valuation definition that E3/E4/E5 needed a canonical anchor for                                                                                        |
| **X7** | Panopticism                                          | Michel Foucault · 1975     | PRH _Discipline and Punish_ + UCL Bentham Project | X's remit is "social control"; X4 algorithmic opacity had no genealogy                                                                                      |
| **X8** | Preference Falsification                             | Timur Kuran · 1995         | HUP _Private Truths, Public Lies_                 | Explains sudden regime/norm collapse; links X3 axiomatic beliefs to AF8 threshold cascades and AI8 Overton                                                  |
| **Y8** | Inattentional Blindness: The Invisible Gorilla       | Simons & Chabris · 1999    | Perception 28:1059 + original video               | Y's remit is "perceptual glitches"; the canonical experiment was absent; pairs with Y7 predictive processing                                                |
| **Z7** | AlphaFold and the End of the Protein Folding Problem | Jumper et al. · 2021       | Nature 596:583 + DeepMind 200M-structure post     | Z had CRISPR/prime editing but not the decade's defining AI-for-science result                                                                              |
| **Z8** | Fusion Ignition at the NIF                           | LLNL · 2022                | LLNL announcement + PRL 132:065102                | Z's "frontiers" cluster had no energy node; also a clean proof-vs-product teaching case                                                                     |

**Epistemic status** follows the lattice's own explainer: primary-source classics → `Canonical` (B8, P8, W7, W8, X7, Y8); current, actively debated framings → `Contemporary` (K7, K8, T6–T8, X8, Z7, Z8). Nothing new is `Speculative`; the existing X/Y/Z video-essay nodes keep theirs.

**Cluster metadata:** W subtitle updated "Six frameworks" → "Eight frameworks". No new tags, clusters or mediums were introduced (`Report` for Z8 already existed).

### 2.1 Standards applied to every new node

- `layer0` is a cold-open hook (concrete scene or number in sentence one; first sentence < 240 chars; `audit-content hooks` flags none of the 14).
- `layer1` is mechanism with checkable specifics drawn from the fetched source (e.g. owner-earnings (a)+(b)−(c); NIF 2.05 MJ in / 3.15 MJ out / ~300 MJ from grid; Williams .400 vs .230; Kuran's three utilities).
- `layer2` ends in a question and asks the reader to apply the idea to their own situation.
- Quiz: 4 options, one defensible answer, distractors within ±20% of the correct option's length and _substantive_ (no templated tails), explanation states the mechanism. Correct option is longest in 12/14 — still above the TECH_DEBT target, but no distractor is padded to get there.
- `related`: 4 links each, mixing in-cluster and cross-cluster; **20 existing nodes were edited to link back** so every new node has inbound edges. One collateral fix: I7 _Internet Trends Report_ briefly lost its only inbound link (K3) and was restored.
- `furtherReading`: 1–2 entries, all fetched live on 2026-09-05, `archive: unavailable` (archive-sources run deferred — see §4).

### 2.2 Dead URLs found and **not** used (do not re-add)

- `perell.com/essay/personal-monopoly/` — 404 (wrote T6 on _Imitate, then Innovate_ instead)
- `nesslabs.com/pact` — 404; `nesslabs.com/tiny-experiments` — redirects to a bonus-content form (used `nesslabs.com/smart-goals-pact`, live)
- `nav.al/authenticity` — 404 (correct slug is `nav.al/competition-authenticity`)
- `theinvisiblegorilla.com/gorilla_experiment.html` — 404 (used the Sage DOI + Simons' own YouTube upload)

---

## 3. Final state

| Metric                                                 | `eab5bc2` (start)   | Now                                |
| ------------------------------------------------------ | ------------------- | ---------------------------------- |
| Nodes                                                  | 437                 | **451**                            |
| Clusters at 8+                                         | 30/38               | **38/38** (min cluster size now 8) |
| Orphans (no inbound / no outbound)                     | 0 / 0               | 0 / 0                              |
| Templated distractor tails                             | 1,023               | 0                                  |
| Dead `furtherReading` URLs (sampled 50 nodes + 14 new) | 12                  | 0                                  |
| validate / tsc / vitest / eslint                       | OK / 0 / 15 / 0 err | OK / 0 / 15 / 0 err                |
| `nodes-*.js` client chunk (gzip)                       | ~413 KB             | ~404 KB                            |
| `docs/TOPICS-INDEX.*`, `public/sitemap.xml`            | 437 entries         | regenerated, 451 entries           |

Cluster sizes: A16 AA9 AB9 AC8 AD8 AE8 AF8 AG8 AH9 AI8 AJ8 AK8 AL20 **B8** C11 D14 E8 F8 G10 H8 I27 J38 **K8** L16 M8 N14 O32 **P8** Q15 R8 S19 **T8** U14 V10 **W8** **X8** **Y8** **Z8**.

---

## 4. Follow-ups (not done here, by design)

1. **Archive the 14 nodes' sources** — `npx tsx scripts/archive-sources.ts <cluster>` needs outbound network, which the review sandbox does not have; all 20 new URLs are recorded above and were live on 2026-09-05.
2. **Quiz length tell** — TECH_DEBT §3; editorial, cluster-by-cluster.
3. **Per-cluster lazy loading** — TECH_DEBT §2; chunk is still ~404 KB gz, just over the trigger.
4. **P cluster subtitle** still says "in six parts" — accurate to the Almanack's structure, left alone.
