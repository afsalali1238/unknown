import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

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
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function touchStreak(days: string[]): string[] {
  const t = todayISO();
  if (days.includes(t)) return days;
  return [...days, t].sort();
}

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initial,
      markGotIt: (id) =>
        set((s) => ({ gotIt: { ...s.gotIt, [id]: true }, streakDays: touchStreak(s.streakDays) })),
      toggleBookmark: (id) =>
        set((s) => ({ bookmarks: { ...s.bookmarks, [id]: !s.bookmarks[id] } })),
      submitQuiz: (id, correct) =>
        set((s) => {
          const prev = s.review[id] ?? { box: 0, due: Date.now() };
          const box = correct ? Math.min(5, prev.box + 1) : 0;
          const due = Date.now() + LEITNER_DAYS[box] * DAY_MS;
          return {
            review: {
              ...s.review,
              [id]: { box, due, lastResult: correct ? "correct" : "incorrect" },
            },
            gotIt: correct ? { ...s.gotIt, [id]: true } : s.gotIt,
            streakDays: touchStreak(s.streakDays),
          };
        }),
      visitNode: (id) =>
        set((s) => ({
          lastNodeId: id,
          visited: { ...s.visited, [id]: true },
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
      setInterests: (tags) => set({ interests: tags }),
      toggleInterest: (tag) =>
        set((s) => ({
          interests: s.interests.includes(tag)
            ? s.interests.filter((t) => t !== tag)
            : [...s.interests, tag],
        })),
      completeOnboarding: (tags) => set({ interests: tags, onboardingComplete: true }),
      skipOnboarding: () => set({ onboardingComplete: true }),
      redoOnboarding: () => set({ onboardingComplete: false }),
      setTtsRate: (rate) => set({ ttsRate: rate }),
    }),
    {
      name: "unknown:v1",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? idbStorage : (undefined as never),
      ),
      skipHydration: false,
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

export function currentStreak(days: string[]): number {
  if (!days.length) return 0;
  const set = new Set(days);
  let count = 0;
  const d = new Date();
  if (!set.has(d.toISOString().slice(0, 10))) {
    d.setDate(d.getDate() - 1);
    if (!set.has(d.toISOString().slice(0, 10))) return 0;
  }
  while (set.has(d.toISOString().slice(0, 10))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}
