import { NODES, type Node } from "@/data/nodes";

// Deterministic PRNG so a session's feed order is stable across re-renders
// (back-scroll returns the same card) but each new session feels fresh.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type FeedInputs = {
  interests: string[];
  likedIds: string[]; // bookmarked or "got it" node ids
  visited: Record<string, boolean>;
  seed: number;
};

// Serendipity + interest blend:
//   0.60 interest-tag match · 0.25 seeded serendipity · 0.15 related-to-liked · 0.10 freshness
// Returns ALL nodes, ordered, with no two same-cluster cards back to back.
export function buildFeed({ interests, likedIds, visited, seed }: FeedInputs): Node[] {
  const rand = mulberry32(seed || 1);
  const interestSet = new Set(interests);

  // ids that are related to something the user liked
  const relatedToLiked = new Set<string>();
  if (likedIds.length) {
    const likedSet = new Set(likedIds);
    for (const n of NODES) {
      if (likedSet.has(n.id)) for (const r of n.related ?? []) relatedToLiked.add(r);
    }
  }

  const scored = NODES.map((n) => {
    const interestMatch = n.tags.some((t) => interestSet.has(t)) ? 1 : 0;
    const related = relatedToLiked.has(n.id) ? 1 : 0;
    const fresh = visited[n.id] ? 0 : 1;
    const score = 0.6 * interestMatch + 0.25 * rand() + 0.15 * related + 0.1 * fresh;
    return { node: n, score };
  }).sort((a, b) => b.score - a.score);

  // Greedy de-clustering: avoid consecutive cards from the same cluster.
  const ordered: Node[] = [];
  const pool = scored.map((s) => s.node);
  let lastCluster = "";
  while (pool.length) {
    let idx = pool.findIndex((n) => n.clusterId !== lastCluster);
    if (idx === -1) idx = 0; // only same-cluster left; accept it
    const [pick] = pool.splice(idx, 1);
    ordered.push(pick);
    lastCluster = pick.clusterId;
  }
  return ordered;
}
