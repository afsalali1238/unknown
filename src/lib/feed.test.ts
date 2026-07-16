import { describe, it, expect } from "vitest";
import { buildFeed } from "./feed";

describe("buildFeed algorithm v2", () => {
  it("returns needsTopics=true when interests are empty", () => {
    const res = buildFeed({ interests: [], likedIds: [], visited: {}, seed: 1, readNext: [] });
    expect(res.needsTopics).toBe(true);
    expect(res.items).toEqual([]);
    expect(res.source).toEqual([]);
    expect(res.exhausted).toBe(false);
  });

  it("prioritizes Read Next queue and dedupes", () => {
    // A1 and B1 exist in nodes.ts
    const res = buildFeed({
      interests: ["Startups Fundamentals"], // Any interest to pass needsTopics
      likedIds: [],
      visited: {},
      seed: 1,
      readNext: ["A1", "A1", "B1"]
    });
    
    expect(res.needsTopics).toBe(false);
    expect(res.items.length).toBeGreaterThanOrEqual(2);
    expect(res.items[0].id).toBe("A1");
    expect(res.items[1].id).toBe("B1");
    expect(res.source[0]).toBe("queue");
    expect(res.source[1]).toBe("queue");
  });

  it("calculates exhausted state correctly", () => {
    const res = buildFeed({
      interests: ["Startups Fundamentals"], 
      likedIds: [],
      visited: {}, 
      seed: 1,
      readNext: []
    });

    // Make all topics visited
    const allTopicIds = res.items.filter((_, i) => res.source[i] === "topic").map(i => i.id);
    const fullyVisited: Record<string, boolean> = {};
    for (const id of allTopicIds) fullyVisited[id] = true;

    const resExhausted = buildFeed({
      interests: ["Startups Fundamentals"],
      likedIds: [],
      visited: fullyVisited,
      seed: 1,
      readNext: []
    });

    expect(resExhausted.exhausted).toBe(true);
  });

  it("respects adjacency share", () => {
    // Pick an interest
    const res = buildFeed({
      interests: ["Startups Fundamentals"], 
      likedIds: [],
      visited: {}, 
      seed: 1,
      readNext: [],
      adjacencyShare: 0.15
    });

    // 15% adjacency -> 1/0.15 = 6.66 -> Math.round = 7. Every 7th card is adjacent.
    // Index 6 should be adjacent if enough adjacent nodes exist
    if (res.items.length > 7) {
      expect(res.source[6]).toBe("adjacent");
    }
  });
});
