import { useMemo, useState, type ReactNode } from "react";
import type { Node } from "@/data/nodes";
import { useStore } from "@/lib/store";
import { shuffledOptions } from "@/lib/quiz";
import { MicroLabel } from "./MicroLabel";
import { FirstTimeHint } from "./FirstTimeHint";
import { cn } from "@/lib/utils";

export function Quiz({
  node,
  hideHeader = false,
  renderFooter,
  salt = 0,
}: {
  node: Node;
  /** Skip the "Check your understanding" label and outer section chrome —
   * used on /review, which already supplies its own header/progress bar
   * around the question. */
  hideHeader?: boolean;
  /** Extra content rendered below the feedback box once an answer is
   * picked, e.g. Review's "From <node> · author" recap + Next button. */
  renderFooter?: (correct: boolean) => ReactNode;
  /** Varies the option order between sittings (Review passes the Leitner
   * box). See lib/quiz.ts for why options are shuffled at all. */
  salt?: number;
}) {
  const submitQuiz = useStore((s) => s.submitQuiz);
  const options = useMemo(() => shuffledOptions(node, salt), [node, salt]);
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked !== null && options[picked].correct;

  return (
    <section className={hideHeader ? "" : "mt-10 border-t border-line pt-8"}>
      {!hideHeader && <MicroLabel>Check your understanding</MicroLabel>}
      <p
        className={cn("font-serif leading-snug text-ink", hideHeader ? "text-2xl" : "mt-3 text-xl")}
      >
        {node.quiz.question}
      </p>
      <div className="mt-5 space-y-2">
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const revealed = picked !== null;
          let cls = "border-line hover:border-ink";
          if (revealed && opt.correct) cls = "border-accent bg-accent/5";
          else if (revealed && isPicked && !opt.correct)
            cls = "border-ink text-ink-soft line-through";
          return (
            <button
              key={opt.originalIndex}
              disabled={picked !== null}
              onClick={() => {
                setPicked(i);
                submitQuiz(node.id, opt.correct);
              }}
              className={`flex w-full items-start gap-3 border ${cls} p-4 text-left transition-colors`}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 text-sm leading-relaxed">{opt.text}</span>
            </button>
          );
        })}
      </div>
      {picked !== null && (
        <div
          className={`mt-4 border-l-2 p-3 ${correct ? "border-accent bg-accent/5" : "border-ink-soft bg-line/10"}`}
        >
          <p
            className={`font-mono text-[11px] uppercase tracking-[0.18em] ${correct ? "text-accent" : "text-ink-soft"}`}
          >
            {correct ? "Correct — moved up a box" : "Not quite — resets to box 0"}
          </p>
          {node.quiz.explanation && (
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{node.quiz.explanation}</p>
          )}
        </div>
      )}
      {picked !== null && !hideHeader && (
        <FirstTimeHint id="hint-quiz-review" className="mt-4">
          That answer just moved this node in your Review queue — correct pushes it further out on a
          schedule, wrong resets it to the front. It resurfaces in the Review tab when it's due, not
          before.
        </FirstTimeHint>
      )}
      {picked !== null && renderFooter && renderFooter(correct)}
    </section>
  );
}
