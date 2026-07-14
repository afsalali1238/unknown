import { useState } from "react";
import type { Node } from "@/data/nodes";
import { useStore } from "@/lib/store";
import { MicroLabel } from "./MicroLabel";

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
          else if (revealed && isPicked && !isCorrect) cls = "border-ink text-ink-soft line-through";
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
        <p className={`mt-4 font-mono text-[11px] uppercase tracking-[0.18em] ${correct ? "text-accent" : "text-ink-soft"}`}>
          {correct ? "Correct — moved up a box" : "Not quite — resets to box 0. That's the point of review."}
        </p>
      )}
    </section>
  );
}
