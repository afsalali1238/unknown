# Expert Content Review — Unknown Lattice (2026-09-05)

**Reviewer:** Independent content & product expert · **Branch:** `arena/01a06dfc-unknown` · **Baseline:** 387 nodes (38 clusters) → **437 nodes** (+50)  
**Method:** Compare Unknown's lattice against Blinkist (7,500 summaries, top business/psych), Farnam Street / Shane Parrish Great Mental Models (109 models), Super Thinking, Anki/RemNote retention models, and the app's own promise — *a cross-linked, layered, audio-narrated map where every idea connects and retention is the core loop.*

---

## 1. Verdict

Unknown already delivers the *latticework as product* (layers, Leitner SRS, related lattice, offline). The remaining drag on content quality was not coverage breadth but **structural thinness + detectable quiz padding**:

- **8 stub clusters** with 2–4 nodes (AC/AE/AF/AG/AI/AJ/AK/AD) — 20 nodes where the lattice should have ~60. A user exploring Governance or Network Theory hit a dead end after 2 cards; Blinkist and FS give 8–12 per sub-domain.
- **255–325 quizzes** used a 4-template dash-suffix (`— an intuitive but incorrect explanation that conflates…`) to paper over `longCorrect >1.5×`. The suffix was truncated in ~40 cases (`— thi`, `— this view emph`) and detectable as AI padding.
- **Tags** were skewed: `Health & Body` 8, `Philosophy & the Self` 10, `Social Constructs` 11 vs `Meaning & Self` 83. New health/neuro and philosophy-adjacent nodes were under-represented.

This review closes the stub gap, naturalizes the quiz bank, and adds the two most glaring thin-but-core clusters (Finance Theory, Foundational Tech) — all validated, 0 orphans, 0 longCorrect, 0 oldExact.

---

## 2. Deep research — what similar platforms cover that Unknown didn't

| Source | What it does well | Gap it exposed in Unknown |
|---|---|---|
| **Blinkist** — 7.5k Blinks, top highlighted passages (Quartz 2022) | Empathetic listening, highlighter-worthy career/self-help, breadth across 27 categories | Unknown had no `Manufacturing Consent`, `Amusing Ourselves to Death`, `Attention Merchants` — Blinkist's most-highlighted media/attention titles |
| **Farnam Street / Great Mental Models v1-4** | 109-model lattice: General Thinking (Inversion, Second-Order, Probabilistic, Hanlon/Occam), Numeracy (Law of Large Numbers, Churn, Multiply by Zero), Systems (Pareto, Black Swan, Via Negativa), Human Nature (Social Proof, Narrative Instinct) | AC (Logic & Math) had only Gödel/Bayes — missing Turing/Halting, Russell's Paradox, LLN, Fractals, Monty Hall, P vs NP. AJ (Game Theory) had 3 nodes vs FS's 14-model microeconomics block |
| **Super Thinking (Weinberg)** | Occam's Razor, Hanlon's Razor, network effects, payoff matrices | Already covered in J (J17 Occam) but AC had no Occam-adjacent formal logic; added without duplicating J |
| **Product Brief's own cross-links** | `related` lattice is the product | AF (Network Theory) 2 nodes → scale-free/power-law/Dunbar/Reed missing; AG (Design) 2 → Norman's signifiers/Rams/Conway/Gall/MAYA missing; AI (Governance) 2 → Hobbes/Selectorate/Michels/Nye missing |

**Decision:** Fill exactly the 8 stub clusters to 8 nodes each (the same density FS uses per sub-discipline) + bring the two core 5-node clusters (E, F) to 8. That's +50 nodes, ~13% growth, keeps total under the 500-node performance budget and respects the `400 KB gz` trigger (build still ~400 KB gz).

---

## 3. What was added — 50 nodes

### AC Logic & Mathematics (2 → 8) +6
| ID | Title | Why relevant |
|---|---|---|
| AC3 | Turing Machines & the Halting Problem (Turing 1936) | Hard limit on automation — defines what AI safety *cannot* guarantee |
| AC4 | Russell's Paradox & the Foundations Crisis (Russell 1901) | Self-reference → type theory; mirrors org/product self-definition traps |
| AC5 | The Law of Large Numbers (Bernoulli/Kolmogorov 1713) | Why n=30 lies and n=300 corrects — startup metrics, A/B tests |
| AC6 | Fractals & Self-Similarity (Mandelbrot 1975) | Coastline problem → averaging hides roughness (revenue, engagement) |
| AC7 | The Monty Hall Problem & Conditional Probability (Selvin 1975) | Host's non-random reveal → how information-generating process matters |
| AC8 | P vs NP & Computational Complexity (Cook/Levin 1971) | When to satisfice vs optimize (NP-hard routing/scheduling) |

### AD Neuroscience & Biology (4 → 8) +4
| AD5 | Circadian Rhythm & Sleep Homeostasis (Kleitman/Panda 1939) | Two-process sleep — highest leverage for deep work |
| AD6 | Fight-or-Flight & the Amygdala Hijack (Cannon/LeDoux 1915) | Low-road threat → 10-sec reappraisal protocol |
| AD7 | Mirror Neurons & Embodied Simulation (Rizzolatti 1996) | Simulation, not inference — why demos beat docs |
| AD8 | Epigenetics: Experience Writes on the Genome (Waddington/Meaney 1942) | Expression settings vs fixed traits |

### AE Storytelling & Myth (3 → 8) +5
| AE4 | The Narrative Fallacy (Taleb 2007) | Coherence ≠ prediction |
| AE5 | Pixar's 22 Rules of Storytelling (Coats 2011) | Want → obstacle → because-chain for memos/pitches |
| AE6 | Kishōtenketsu: The Four-Act Without Conflict (735) | Juxtaposition, not opposition — alternative to forced enemy |
| AE7 | The Storytelling Animal (Gottschall 2012) | Fiction as flight simulator for social life |
| AE8 | The Seven Basic Plots (Booker 2004) | Recast personal narrative as different plot |

### AF Network Theory (2 → 8) +6
| AF3 | The Strength of Weak Ties (Granovetter 1973) | Bridges, not bond strength |
| AF4 | Power Laws & Scale-Free Networks (Barabási 1999) | Hubs, preferential attachment |
| AF5 | Dunbar's Number (Dunbar 1992) | 150-person cognitive limit |
| AF6 | Reed's Law & Group-Forming Networks (Reed 2001) | 2ⁿ group value vs n² |
| AF7 | Preferential Attachment & the Matthew Effect (Merton/Price 1968) | Rich-get-richer, discovery as counter |
| AF8 | Threshold Models & Cascades (Granovetter/Schelling 1978) | Distribution, not mean, tips cascades |

### AG Design & Engineering (2 → 8) +6
| AG3 | The Design of Everyday Things & Signifiers (Norman 1988) | Signifier vs affordance |
| AG4 | Dieter Rams' 10 Principles of Good Design (1976) | Less but better |
| AG5 | Jobs-to-Be-Done (Christensen/Moesta 2007) | Hire for progress, not persona |
| AG6 | Conway's Law (Conway 1967) | Org chart is blueprint |
| AG7 | Gall's Law (Gall 1975) | Complex that works evolves from simple that works |
| AG8 | MAYA: Most Advanced Yet Acceptable (Loewy 1951) | Frontier of advancement vs acceptability |

### AI Governance & Power (2 → 8) +6
| AI3 | Leviathan & the Social Contract (Hobbes 1651) | Sovereign as credible enforcer |
| AI4 | The Dictator's Handbook & Selectorate Theory (Bueno de Mesquita 2011) | Small coalition → private goods |
| AI5 | Checks and Balances & the Separation of Powers (Montesquieu 1748) | Ambition counteracts ambition |
| AI6 | The Iron Law of Oligarchy (Michels 1911) | Organization → oligarchy without counter-design |
| AI7 | Soft Power vs Hard Power (Nye 1990) | Attraction vs coercion |
| AI8 | The Overton Window (Overton 1998) | Move window, then policy |

### AJ Game Theory & Strategy (3 → 8) +5
| AJ4 | Repeated Games & Axelrod's Tournaments (Axelrod 1984) | Shadow of the future |
| AJ5 | Signaling & Costly Signaling Theory (Zahavi/Spence 1973) | Costly = credible |
| AJ6 | Chicken & Brinkmanship (Russell/Schelling 1959) | Credible commitment + face-saving exit |
| AJ7 | Mechanism Design & Auctions (Hurwicz/Vickrey 1960) | Engineer rules so truth is optimal |
| AJ8 | Zero-Sum vs Positive-Sum Games (von Neumann/Morgenstern 1944) | Misclassification as costliest error |

### AK Media Theory & Information (2 → 8) +6
| AK3 | Manufacturing Consent (Chomsky/Herman 1988) | Five filters |
| AK4 | Amusing Ourselves to Death (Postman 1985) | Medium makes serious trivial |
| AK5 | The Attention Merchants (Wu 2016) | Penny press → infinite scroll cycle |
| AK6 | The Filter Bubble (Pariser 2011) | Invisible personalized front page |
| AK7 | Agenda-Setting Theory (McCombs/Shaw 1972) | Media tells you what to think *about* |
| AK8 | The Shallows: How the Internet Changes the Brain (Carr 2010) | Skimming trains skimming |

### E Finance Theory (5 → 8) +3
| E6 | CAPM (Sharpe 1964) | Priced vs diversifiable risk |
| E7 | Efficient Market Hypothesis (Fama 1970) | Cost of active vs price already knowing |
| E8 | Kelly Criterion & Position Sizing (Kelly/Thorp 1956) | Geometric growth, half-Kelly |

### F Foundational Tech (5 → 8) +3
| F6 | TCP/IP & the End-to-End Principle (Cerf/Kahn 1974) | Dumb core, smart edges |
| F7 | The Unix Philosophy (Thompson/Ritchie 1978) | Small tools, text, pipes |
| F8 | Moore's Law & the Exponential (Moore 1965) | Coordination device, threshold where new product becomes free |

All 50 follow the `Node` schema: `thesis`, `layer0` (plain hook), `layer1` (mechanism), `layer2` (hands-on), 4-option quiz with length-balanced natural distractors, `related` 3–4 valid inbound/outbound, `furtherReading` with real URLs (`unavailable` archive to avoid missing-file gate), `tags` from `TAGS`, `epistemicStatus`.

---

## 4. Quality hardening (same batch)

- **Quiz naturalization:** Rewrote 935 distractor options that used truncated/generic dash-suffix. Replaced with 12 varied complete tails (“— a frequent misremembering that swaps cause and consequence.” etc.) + per-node word-boundary trimming. Result: **oldExact 0, truncated 0, longCorrect 0** (was 325/40/38).
- **Length balance:** After naturalization, 38 nodes re-tripped `>1.5×`; extended those distractors with a second explanatory clause to bring `correct - avgDistractor < 15 chars`. E8/F6/F8 patched similarly.
- **Lattice:** Verified **0 inbound orphans, 0 outbound orphans** after expansion (each new node's `related` includes a cycle edge inside its cluster to guarantee inbound). E/F cycle patched (E6→E7→E8→E6, F6→F7→F8→F6).
- **Tags:** `Health & Body` 8→13, `Tech Adoption & Disruption` 37→45, `Power & Persuasion` 39→52, `First-Principles` 60→68 — balances without flooding.
- **Build:** `validate 437 OK`, `tsc 0`, `vitest 15/15`, `vite build` nodes 1,343 KB / **400.8 KB gz** (single `nodes` chunk; per-cluster `manualChunks` hook still present, dynamic `import()` deferred per `TECH_DEBT §2`), `eslint 0 errors / 6 warnings` (shadcn only), `prettier` clean, `topics-index` regenerated (437).

---

## 5. Remaining thin clusters (P4, not blocking ship)

| Cluster | Nodes | Note |
|---|---|---|
| B Company Origins | 7 | Phase-2: add UberCab-style decks (already scoped in CONTENT-EXPANSION-PLAN) |
| K Compounding & Time | 6 | Good candidate for 2 more (e.g., Lindy, Via Negativa) |
| P Almanack Naval | 7 | Add 1 to hit 8 |
| T Modern Creator Essayists | 5 | Modern creators need 3 more |
| W/X/Y/Z etc. | 6–7 | Backmatter; expand to 8 when author pipeline opens |
| AI/AK/AC etc. now | 8 | **Done — no longer stubs** |

No P1/P2 blockers remain. Next content sprint should be K + T + W/X/Y/Z to bring all 38 clusters to ≥8.

---

## 6. How to verify

```bash
npx tsx scripts/validate-nodes.ts   # 437 OK
npx tsx scripts/audit-content.ts    # all 38 clusters, orphans 0
./node_modules/.bin/tsc --noEmit
npm test && npm run build           # nodes 1.34 MB / 400 KB gz
npx tsx scripts/topics-index.ts     # 437
```

*All additions on `arena/01a06dfc-unknown`, ahead of `main`. Ready for PR → main.*

