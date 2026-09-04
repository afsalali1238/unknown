import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";
import { resetFeedSession } from "./feedSession";

const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

// Off the browser (SSR render, vitest) there is nothing to persist to. The
// previous `undefined as never` made zustand's persist call
// `undefined.setItem` and throw on the first `set()` outside a window —
// which is also why store actions had never been unit-tested.
const noopStorage: StateStorage = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
};

export const LEITNER_DAYS = [0, 1, 3, 7, 16, 35];
const DAY_MS = 86400000;

import { z } from "zod";

export const reviewEntrySchema = z.object({
  box: z.number(),
  due: z.number(),
  lastResult: z.enum(["correct", "incorrect"]).optional(),
});

export type ReviewEntry = z.infer<typeof reviewEntrySchema>;

export const glossaryItemSchema = z.object({
  id: z.string(),
  term: z.string(),
  definition: z.string(),
});

export type GlossaryItem = z.infer<typeof glossaryItemSchema>;

export const stateSchema = z.object({
  gotIt: z.record(z.boolean()),
  bookmarks: z.record(z.boolean()),
  visited: z.record(z.boolean()),
  review: z.record(reviewEntrySchema),
  streakDays: z.array(z.string()),
  lastNodeId: z.string().optional(),
  glossary: z.array(glossaryItemSchema),
  scratchpad: z.string(),
  interests: z.array(z.string()),
  onboardingComplete: z.boolean(),
  ttsRate: z.number(),
  // Optional + defaulted: older exported backups won't have this field,
  // and it should silently default to "nothing dismissed yet" on import
  // rather than fail validation.
  seenHints: z.record(z.boolean()).default({}),
  readNext: z.array(z.string()).default([]),
  readLog: z.array(z.string()).default([]),
  audioProgress: z.record(z.number()).default({}),
  ttsVoice: z.string().optional(),
  dailyGoal: z.number().default(3),
  dailyProgress: z.record(z.number()).default({}),
  theme: z.enum(["light", "dark", "system"]).default("system"),
});

export type State = z.infer<typeof stateSchema>;

type Actions = {
  markGotIt: (id: string) => void;
  toggleBookmark: (id: string) => void;
  submitQuiz: (id: string, correct: boolean) => void;
  visitNode: (id: string) => void;
  setScratchpad: (v: string) => void;
  addGlossary: (item: Omit<GlossaryItem, "id">) => void;
  removeGlossary: (id: string) => void;
  exportJSON: () => string;
  importJSON: (raw: string) => boolean;
  reset: () => void;
  setInterests: (tags: string[]) => void;
  toggleInterest: (tag: string) => void;
  completeOnboarding: (tags: string[]) => void;
  skipOnboarding: () => void;
  redoOnboarding: () => void;
  setTtsRate: (rate: number) => void;
  dismissHint: (id: string) => void;
  resetHints: () => void;
  addReadNext: (id: string) => void;
  removeReadNext: (id: string) => void;
  reorderReadNext: (from: number, to: number) => void;
  clearReadNext: () => void;
  setAudioProgress: (id: string, progress: number) => void;
  setTtsVoice: (voiceUri: string) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
};

const initial: State = {
  gotIt: {},
  bookmarks: {},
  visited: {},
  review: {},
  streakDays: [],
  lastNodeId: undefined,
  glossary: [],
  scratchpad: "",
  interests: [],
  onboardingComplete: false,
  ttsRate: 1,
  seenHints: {},
  readNext: [],
  readLog: [],
  audioProgress: {},
  ttsVoice: undefined,
  dailyGoal: 3,
  dailyProgress: {},
  theme: "system",
};

/**
 * Calendar day of `d` in the user's LOCAL timezone, as "YYYY-MM-DD".
 *
 * Deliberately not `toISOString().slice(0, 10)` — that is the UTC date, which
 * meant the daily goal and the streak rolled over at 04:00 in Dubai and at
 * 16:00 in California, so one afternoon session could count as two "days"
 * (or a late-evening session as tomorrow). Every streak/goal calculation
 * must go through this so they all agree on what "today" is.
 */
export function localDay(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayISO() {
  return localDay();
}

function touchStreak(days: string[]): string[] {
  const t = todayISO();
  if (days.includes(t)) return days;
  return [...days, t].sort();
}

/**
 * Schedule (or keep) a node in the Leitner queue when the user marks it
 * "Got it". Onboarding promises exactly this ("Mark ideas you've mastered
 * for spaced repetition"), but markGotIt used to only flip a flag — a Feed
 * user who tapped ✓ on fifty cards never had a single one resurface in
 * Review. Seeds box 1 (due tomorrow) so the first check happens after one
 * night's sleep; a node already in the queue is left exactly where it is,
 * so re-tapping never resets earned progress.
 */
function scheduleIfNew(review: Record<string, ReviewEntry>, id: string) {
  if (review[id]) return review;
  return { ...review, [id]: { box: 1, due: Date.now() + LEITNER_DAYS[1] * DAY_MS } };
}

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initial,
      markGotIt: (id) =>
        set((s) => ({
          gotIt: { ...s.gotIt, [id]: true },
          review: scheduleIfNew(s.review, id),
          streakDays: touchStreak(s.streakDays),
        })),
      toggleBookmark: (id) =>
        set((s) => ({ bookmarks: { ...s.bookmarks, [id]: !s.bookmarks[id] } })),
      submitQuiz: (id, correct) =>
        set((s) => {
          const prev = s.review[id] ?? { box: 0, due: Date.now() };
          const box = correct ? Math.min(5, prev.box + 1) : 0;
          const due = Date.now() + LEITNER_DAYS[box] * DAY_MS;

          const today = todayISO();
          // Only count progress if they didn't already 'gotIt' this node
          const newDailyProgress = { ...s.dailyProgress };
          if (correct && !s.gotIt[id]) {
            newDailyProgress[today] = (newDailyProgress[today] || 0) + 1;
          }

          return {
            review: {
              ...s.review,
              [id]: { box, due, lastResult: correct ? "correct" : "incorrect" },
            },
            gotIt: correct ? { ...s.gotIt, [id]: true } : s.gotIt,
            streakDays: touchStreak(s.streakDays),
            dailyProgress: newDailyProgress,
          };
        }),
      visitNode: (id) =>
        set((s) => ({
          lastNodeId: id,
          visited: { ...s.visited, [id]: true },
          // Move to end of the read log (dedupe), cap history at 200.
          readLog: [...s.readLog.filter((x) => x !== id), id].slice(-200),
          streakDays: touchStreak(s.streakDays),
        })),
      setScratchpad: (v) => set({ scratchpad: v }),
      addGlossary: (item) =>
        set((s) => ({
          glossary: [...s.glossary, { ...item, id: crypto.randomUUID() }],
        })),
      removeGlossary: (id) => set((s) => ({ glossary: s.glossary.filter((g) => g.id !== id) })),
      exportJSON: () => JSON.stringify(get(), null, 2),
      importJSON: (raw) => {
        try {
          const parsed = JSON.parse(raw);
          const validated = stateSchema.safeParse(parsed);
          if (!validated.success) {
            console.error("Invalid state JSON structure:", validated.error);
            return false;
          }
          set({ ...initial, ...validated.data });
          return true;
        } catch {
          return false;
        }
      },
      reset: () => set(initial),
      // Any change to interests invalidates the session's feed order (see
      // lib/feedSession.ts) so the new topics take effect immediately.
      setInterests: (tags) => {
        resetFeedSession();
        set({ interests: tags });
      },
      toggleInterest: (tag) => {
        resetFeedSession();
        set((s) => ({
          interests: s.interests.includes(tag)
            ? s.interests.filter((t) => t !== tag)
            : [...s.interests, tag],
        }));
      },
      completeOnboarding: (tags) => {
        resetFeedSession();
        set({ interests: tags, onboardingComplete: true });
      },
      skipOnboarding: () => set({ onboardingComplete: true }),
      redoOnboarding: () => set({ onboardingComplete: false }),
      setTtsRate: (rate) => set({ ttsRate: rate }),
      dismissHint: (id) => set((s) => ({ seenHints: { ...s.seenHints, [id]: true } })),
      resetHints: () => set({ seenHints: {} }),
      addReadNext: (id) =>
        set((s) => ({
          readNext: s.readNext.includes(id) ? s.readNext : [...s.readNext, id],
        })),
      removeReadNext: (id) =>
        set((s) => ({
          readNext: s.readNext.filter((queuedId) => queuedId !== id),
        })),
      reorderReadNext: (from, to) =>
        set((s) => {
          const arr = [...s.readNext];
          const [moved] = arr.splice(from, 1);
          arr.splice(to, 0, moved);
          return { readNext: arr };
        }),
      clearReadNext: () => set({ readNext: [] }),
      setAudioProgress: (id, progress) =>
        set((s) => ({ audioProgress: { ...s.audioProgress, [id]: progress } })),
      setTtsVoice: (voiceUri) => set({ ttsVoice: voiceUri }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "unknown:v1",
      version: 2,
      storage: createJSONStorage(() => (typeof window !== "undefined" ? idbStorage : noopStorage)),
      skipHydration: false,
      // Merges persisted state with defaults so adding new fields never wipes
      // existing user data (streaks, bookmarks, gotIt, etc.).
      migrate: (persisted: unknown, fromVersion: number) => {
        const base = persisted as Partial<State>;
        if (fromVersion < 2) {
          return {
            ...initial,
            ...base,
            audioProgress: base.audioProgress ?? {},
            ttsVoice: base.ttsVoice ?? undefined,
            dailyGoal: base.dailyGoal ?? 3,
            dailyProgress: base.dailyProgress ?? {},
          };
        }
        return { ...initial, ...base };
      },
    },
  ),
);

export function dueCount(review: Record<string, ReviewEntry>): number {
  const now = Date.now();
  return Object.values(review).filter((r) => r.due <= now).length;
}

export function dueIds(review: Record<string, ReviewEntry>): string[] {
  const now = Date.now();
  return Object.entries(review)
    .filter(([, r]) => r.due <= now)
    .map(([id]) => id);
}

/** Earliest future `due` timestamp across the queue, or null if none is scheduled ahead. */
export function nextDueAt(review: Record<string, ReviewEntry>, now: number = Date.now()) {
  let next: number | null = null;
  for (const r of Object.values(review)) {
    if (r.due > now && (next === null || r.due < next)) next = r.due;
  }
  return next;
}

/** "in 3 hours" / "tomorrow" / "in 5 days" — coarse on purpose, this is a reading app not a timer. */
export function formatUntil(ts: number, now: number = Date.now()): string {
  const ms = ts - now;
  if (ms <= 0) return "now";
  const hours = Math.round(ms / 3600000);
  if (hours < 1) return "within the hour";
  if (hours < 20) return `in ${hours} hour${hours === 1 ? "" : "s"}`;
  const days = Math.round(ms / DAY_MS);
  if (days <= 1) return "tomorrow";
  return `in ${days} days`;
}

export function currentStreak(days: string[], now: Date = new Date()): number {
  if (!days.length) return 0;
  const set = new Set(days);
  let count = 0;
  const d = new Date(now);
  if (!set.has(localDay(d))) {
    d.setDate(d.getDate() - 1);
    if (!set.has(localDay(d))) return 0;
  }
  while (set.has(localDay(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

export function isQueued(readNext: string[], id: string): boolean {
  return readNext.includes(id);
}

// Minimal type for the Node to avoid circular dependencies if any,
// though usually importing from data/nodes is fine.
export function readNextNodes<T extends { id: string }>(readNext: string[], allNodes: T[]): T[] {
  const nodeMap = new Map(allNodes.map((n) => [n.id, n]));
  const result: T[] = [];
  for (const id of readNext) {
    const node = nodeMap.get(id);
    if (node) result.push(node);
  }
  return result;
}
