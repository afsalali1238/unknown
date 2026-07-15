import { describe, it, expect } from "vitest";
import { currentStreak, dueCount, dueIds, stateSchema, type ReviewEntry } from "./store";

describe("store.ts pure functions", () => {
  describe("currentStreak", () => {
    it("returns 0 for empty array", () => {
      expect(currentStreak([])).toBe(0);
    });

    it("counts consecutive days backwards from today", () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);

      const days = [
        today.toISOString().slice(0, 10),
        yesterday.toISOString().slice(0, 10),
        twoDaysAgo.toISOString().slice(0, 10),
      ];

      expect(currentStreak(days)).toBe(3);
    });

    it("allows missing today if yesterday was logged", () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);

      const days = [yesterday.toISOString().slice(0, 10), twoDaysAgo.toISOString().slice(0, 10)];

      expect(currentStreak(days)).toBe(2);
    });

    it("breaks streak if gap is larger than 1 day", () => {
      const today = new Date();
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(today.getDate() - 3);

      const days = [today.toISOString().slice(0, 10), threeDaysAgo.toISOString().slice(0, 10)];

      // Streak should only be 1 (today), because yesterday is missing.
      expect(currentStreak(days)).toBe(1);
    });
  });

  describe("dueCount and dueIds", () => {
    it("returns correct counts based on due timestamp", () => {
      const now = Date.now();
      const review: Record<string, ReviewEntry> = {
        node1: { box: 1, due: now - 1000 }, // Past due
        node2: { box: 2, due: now + 50000 }, // Future
        node3: { box: 0, due: now - 5000 }, // Past due
      };

      expect(dueCount(review)).toBe(2);
      expect(dueIds(review)).toEqual(["node1", "node3"]);
    });

    it("returns 0 for empty review map", () => {
      expect(dueCount({})).toBe(0);
      expect(dueIds({})).toEqual([]);
    });
  });

  describe("stateSchema (Zod validation)", () => {
    it("passes on valid partial JSON state with catch defaults", () => {
      const validJSON = {
        gotIt: { node1: true },
        review: {},
        streakDays: ["2026-07-15"],
        glossary: [],
        interests: ["Startups"],
        onboardingComplete: true,
        ttsRate: 1.5,
        bookmarks: {},
        visited: {},
        scratchpad: "",
      };

      const result = stateSchema.safeParse(validJSON);
      expect(result.success).toBe(true);
    });

    it("fails cleanly when given malicious or fundamentally malformed structures", () => {
      const badJSON = {
        gotIt: "this should be a record, not a string",
      };

      const result = stateSchema.safeParse(badJSON);
      expect(result.success).toBe(false);
    });

    it("strips out undocumented keys", () => {
      const extraKeysJSON = {
        gotIt: {},
        bookmarks: {},
        visited: {},
        review: {},
        streakDays: [],
        glossary: [],
        interests: [],
        onboardingComplete: false,
        ttsRate: 1.0,
        scratchpad: "",
        maliciousKey: "should disappear",
      };

      const result = stateSchema.safeParse(extraKeysJSON);
      expect(result.success).toBe(true);
      if (result.success) {
        expect((result.data as Record<string, unknown>).maliciousKey).toBeUndefined();
      }
    });
  });
});
