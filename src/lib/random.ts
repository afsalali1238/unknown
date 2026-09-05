/**
 * Shared PRNG + shuffle utilities.
 * mulberry32 is the same deterministic PRNG used by feed.ts — extracted so
 * feed, review, quiz etc share one implementation and one place to tweak.
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates shuffle — unbiased, O(n). Mutates a copy, never the input.
 * Pass a custom rng for deterministic shuffles (seeded); defaults to Math.random.
 */
export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Convenience: seeded Fisher-Yates via mulberry32. */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  return shuffle(arr, mulberry32(seed >>> 0 || 1));
}
