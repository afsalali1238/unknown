import { describe, it, expect } from "vitest";
import {
  currentStreak,
  dueCount,
  dueIds,
  stateSchema,
  isQueued,
  readNextNodes,
  localDay,
  useStore,
  LEITNER_DAYS,
  type ReviewEntry,
} from "./store";

describe("store.ts pure functions", () => {
  describe("localDay", () => {
    it("uses the local calendar date, not the UTC one", () => {
      // 23:30 local on Jan 1st. In any timezone east of UTC (e.g. Dubai, +4)
      // toISOString() already says Jan 1st 19:30Z — fine — but 01:00 local
      // on Jan 2nd is still Jan 1st in UTC, which is the bug this guards.
      const d = new Date(2026, 0, 2, 1, 0, 0);
      expect(localDay(d)).toBe("2026-01-02");
      const late = new Date(2026, 0, 1, 23, 30, 0);
      expect(localDay(late)).toBe("2026-01-01");
    });

    it("zero-pads month and day", () => {
      expect(localDay(new Date(2026, 2, 5))).toBe("2026-03-05");
    });
  });

  describe("currentStreak", () => {
    it("counts a late-night session on the local day it happened", () => {
      // 00:30 local on the 10th, after a session on the 9th and 8th: streak 3.
      const now = new Date(2026, 5, 10, 0, 30);
      const days = ["2026-06-08", "2026-06-09", "2026-06-10"];
      expect(currentStreak(days, now)).toBe(3);
    });

    it("returns 0 for empty array", () => {
      expect(currentStreak([])).toBe(0);
    });

    it("counts consecutive days backwards from today", () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);

      const days = [localDay(today), localDay(yesterday), localDay(twoDaysAgo)];

      expect(currentStreak(days)).toBe(3);
    });

    it("allows missing today if yesterday was logged", () => {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const twoDaysAgo = new Date(today);
      twoDaysAgo.setDate(today.getDate() - 2);

      const days = [localDay(yesterday), localDay(twoDaysAgo)];

      expect(currentStreak(days)).toBe(2);
    });

    it("breaks streak if gap is larger than 1 day", () => {
      const today = new Date();
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(today.getDate() - 3);

      const days = [localDay(today), localDay(threeDaysAgo)];

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

  describe("readNext queue selectors", () => {
    it("isQueued works", () => {
      expect(isQueued(["A1", "B2"], "A1")).toBe(true);
      expect(isQueued(["A1", "B2"], "C3")).toBe(false);
    });

    it("readNextNodes returns ordered nodes and skips missing ones", () => {
      const mockNodes = [{ id: "n1" }, { id: "n2" }, { id: "n3" }];
      const queue = ["n3", "n1", "n99"]; // n99 is missing
      const result = readNextNodes(queue, mockNodes);
      expect(result).toEqual([{ id: "n3" }, { id: "n1" }]);
    });
  });

  describe("markGotIt (store action)", () => {
    it("schedules the node for review in box 1, due tomorrow", () => {
      useStore.getState().reset();
      const before = Date.now();
      useStore.getState().markGotIt("A1");
      const s = useStore.getState();
      expect(s.gotIt.A1).toBe(true);
      expect(s.review.A1?.box).toBe(1);
      expect(s.review.A1!.due).toBeGreaterThanOrEqual(before + LEITNER_DAYS[1] * 86400000);
      expect(s.streakDays).toContain(localDay());
    });

    it("never resets a node that is already scheduled", () => {
      useStore.getState().reset();
      useStore.getState().submitQuiz("A1", true);
      useStore.getState().submitQuiz("A1", true);
      const scheduled = useStore.getState().review.A1;
      expect(scheduled.box).toBe(2);
      useStore.getState().markGotIt("A1");
      expect(useStore.getState().review.A1).toEqual(scheduled);
    });
  });

  describe("submitQuiz (store action)", () => {
    it("moves up a box on correct (cap 5) and back to 0 on wrong", () => {
      useStore.getState().reset();
      for (let i = 0; i < 7; i++) useStore.getState().submitQuiz("B1", true);
      expect(useStore.getState().review.B1.box).toBe(5);
      useStore.getState().submitQuiz("B1", false);
      expect(useStore.getState().review.B1.box).toBe(0);
      expect(useStore.getState().review.B1.lastResult).toBe("incorrect");
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
        readNext: ["node1", "node2"],
      };

      const result = stateSchema.safeParse(validJSON);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.readNext).toEqual(["node1", "node2"]);
      }
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
        // and default readNext should be provided
        expect(result.data.readNext).toEqual([]);
      }
    });
  });
});
