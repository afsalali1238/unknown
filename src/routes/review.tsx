import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { NODE_BY_ID } from "@/data/nodes";
import { MicroLabel } from "@/components/MicroLabel";
import { useStore, dueIds, currentStreak } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Review — Unknown" },
      { name: "description", content: "Spaced repetition for the ideas you've learned." },
    ],
  }),
  component: ReviewScreen,
});

function ReviewScreen() {
  const hydrated = useHydrated();
  const review = useStore((s) => s.review);
  const submitQuiz = useStore((s) => s.submitQuiz);
  const streakDays = useStore((s) => s.streakDays);
  const streak = hydrated ? currentStreak(streakDays) : 0;

  const queue = useMemo(() => {
    if (!hydrated) return [] as string[];
    const ids = dueIds(review);
    return ids.sort(() => Math.random() - 0.5);
  }, [hydrated, review]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  if (!hydrated) return <div className="px-5 pt-8" />;

  if (queue.length === 0 || idx >= queue.length) {
    return (
      <div className="px-5 pt-16 text-center">
        <MicroLabel>Review</MicroLabel>
        <h1 className="mt-3 font-serif text-4xl text-ink">You're all caught up.</h1>
        <p className="mt-3 font-serif text-lg italic text-ink-soft">Come back tomorrow.</p>
        <div className="mt-8 inline-flex items-baseline gap-3 border-t border-b border-line py-4">
          <span className="font-mono text-4xl text-accent">{streak}</span>
          <MicroLabel>Day streak</MicroLabel>
        </div>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex border border-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
          >
            Back to map
          </Link>
        </div>
      </div>
    );
  }

  const id = queue[idx];
  const node = NODE_BY_ID[id];
  if (!node) {
    setIdx(idx + 1);
    return null;
  }

  const isCorrect = picked !== null && picked === node.quiz.correctIndex;

  return (
    <div className="px-5 pt-8 pb-10">
      <div className="flex items-baseline justify-between">
        <MicroLabel>Review · {idx + 1} / {queue.length}</MicroLabel>
        <MicroLabel>Streak · {streak}d</MicroLabel>
      </div>

      <p className="mt-8 font-serif text-2xl leading-snug text-ink">{node.quiz.question}</p>

      <div className="mt-8 space-y-2">
        {node.quiz.options.map((opt, i) => {
          const isPicked = picked === i;
          const revealed = picked !== null;
          const correctI = i === node.quiz.correctIndex;
          let cls = "border-line hover:border-ink";
          if (revealed && correctI) cls = "border-accent bg-accent/5";
          else if (revealed && isPicked && !correctI) cls = "border-ink text-ink-soft line-through";
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => {
                setPicked(i);
                submitQuiz(node.id, i === node.quiz.correctIndex);
              }}
              className={`flex w-full items-start gap-3 border ${cls} p-4 text-left`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-sm leading-relaxed">{opt}</span>
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-8 border-t border-line pt-6">
          <MicroLabel className={isCorrect ? "text-accent" : ""}>
            {isCorrect ? "Correct — moved up a box" : "Reset to box 0"}
          </MicroLabel>
          <p className="mt-3 font-serif text-lg leading-snug text-ink">
            From{" "}
            <Link to="/node/$id" params={{ id: node.id }} className="italic text-accent">
              {node.title}
            </Link>{" "}
            · {node.author}
          </p>
          <p className="mt-2 text-sm text-ink-soft">{node.thesis}</p>
          <button
            onClick={() => {
              setPicked(null);
              setIdx((n) => n + 1);
            }}
            className="mt-6 w-full border border-ink bg-ink py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
          >
            {idx + 1 < queue.length ? "Next →" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}
