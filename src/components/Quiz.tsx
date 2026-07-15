import { useState } from "react";
import type { Node } from "@/data/nodes";
import { useStore } from "@/lib/store";
import { MicroLabel } from "./MicroLabel";
import { FirstTimeHint } from "./FirstTimeHint";

export function Quiz({ node }: { node: Node }) {
  const submitQuiz = useStore((s) => s.submitQuiz);
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked !== null && picked === node.quiz.correctIndex;

  return (
    <section className="mt-10 border-t border-line pt-8">
      <MicroLabel>Check your understanding</MicroLabel>
      <p className="mt-3 font-serif text-xl leading-snug text-ink">{node.quiz.question}</p>
      <div className="mt-5 space-y-2">
        {node.quiz.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === node.quiz.correctIndex;
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
                submitQuiz(node.id, i === node.quiz.correctIndex);
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
          className={`mt-4 border-l-2 p-3 ${correct ? "border-accent bg-accent/5" : "border-ink-soft bg-line/10"}`}
        >
          <p
            className={`font-mono text-[11px] uppercase tracking-[0.18em] ${correct ? "text-accent" : "text-ink-soft"}`}
          >
            {correct
              ? "Correct — moved up a box"
              : "Not quite — resets to box 0. That's the point of review."}
          </p>
          {node.quiz.explanation && (
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{node.quiz.explanation}</p>
          )}
        </div>
      )}
      {picked !== null && (
        <FirstTimeHint id="hint-quiz-review" className="mt-4">
          That answer just moved this node in your Review queue — correct pushes it further out on a
          schedule, wrong resets it to the front. It resurfaces in the Review tab when it's due, not
          before.
        </FirstTimeHint>
      )}
    </section>
  );
}
