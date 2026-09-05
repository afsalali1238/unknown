import { useMemo, useState, type ReactNode } from "react";
import type { Node } from "@/data/nodes";
import { useStore } from "@/lib/store";
import { MicroLabel } from "./MicroLabel";
import { FirstTimeHint } from "./FirstTimeHint";
import { cn } from "@/lib/utils";
import { mulberry32 } from "@/lib/random";

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

export function Quiz({
  node,
  hideHeader = false,
  renderFooter,
}: {
  node: Node;
  /** Skip the "Check your understanding" label and outer section chrome —
   * used on /review, which already supplies its own header/progress bar
   * around the question. */
  hideHeader?: boolean;
  /** Extra content rendered below the feedback box once an answer is
   * picked, e.g. Review's "From <node> · author" recap + Next button. */
  renderFooter?: (correct: boolean) => ReactNode;
}) {
  const submitQuiz = useStore((s) => s.submitQuiz);
  const [picked, setPicked] = useState<number | null>(null);

  // Deterministic shuffle per node so option order isn't trivially memorizable
  // but remains stable across re-renders and hydration.
  const { shuffledOptions, shuffledCorrect } = useMemo(() => {
    const rng = mulberry32(hashString(node.id) || 1);
    const idxs = node.quiz.options.map((_, i) => i);
    for (let i = idxs.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }
    const shuffledOptions = idxs.map((i) => node.quiz.options[i]);
    const shuffledCorrect = idxs.indexOf(node.quiz.correctIndex);
    return { shuffledOptions, shuffledCorrect };
  }, [node.id, node.quiz.options, node.quiz.correctIndex]);

  const correct = picked !== null && picked === shuffledCorrect;

  return (
    <section className={hideHeader ? "" : "mt-10 border-t border-line pt-8"}>
      {!hideHeader && <MicroLabel>Check your understanding</MicroLabel>}
      <p
        className={cn("font-serif leading-snug text-ink", hideHeader ? "text-2xl" : "mt-3 text-xl")}
      >
        {node.quiz.question}
      </p>
      <div className="mt-5 space-y-2">
        {shuffledOptions.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === shuffledCorrect;
          const revealed = picked !== null;
          let cls = "border-line hover:border-ink";
          if (revealed && isCorrect) cls = "border-accent bg-accent/5";
          else if (revealed && isPicked && !isCorrect)
            cls = "border-ink text-ink-soft line-through";
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => {
                setPicked(i);
                submitQuiz(node.id, i === shuffledCorrect);
              }}
              className={`flex w-full items-start gap-3 border ${cls} p-4 text-left transition-colors`}
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
        <div
          aria-live="polite"
          className={`mt-4 border-l-2 p-3 ${correct ? "border-accent bg-accent/5" : "border-ink-soft bg-line/10"}`}
        >
          <p
            className={`font-mono text-[11px] uppercase tracking-[0.18em] ${correct ? "text-accent" : "text-ink-soft"}`}
          >
            {correct ? "Correct — moved up a box" : "Not quite — moved back"}
          </p>
          {node.quiz.explanation && (
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{node.quiz.explanation}</p>
          )}
        </div>
      )}
      {picked !== null && !hideHeader && (
        <FirstTimeHint id="hint-quiz-review" className="mt-4">
          That answer just moved this node in your Review queue — correct pushes it further out on a
          schedule, wrong moves it back. It resurfaces in the Review tab when it's due, not before.
        </FirstTimeHint>
      )}
      {picked !== null && renderFooter && renderFooter(correct)}
    </section>
  );
}
