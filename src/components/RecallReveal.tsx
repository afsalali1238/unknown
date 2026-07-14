import { useState } from "react";
import { MicroLabel } from "./MicroLabel";

export function RecallReveal({ text }: { text: string }) {
  const [shown, setShown] = useState(false);
  return (
    <section className="mt-10 border-t border-line pt-8">
      <MicroLabel>The takeaway — recall it first</MicroLabel>
      <button
        onClick={() => setShown(true)}
        disabled={shown}
        className="mt-3 block w-full text-left"
      >
        <p
          className={`font-serif text-2xl leading-snug transition-all duration-300 ${
            shown ? "" : "blur-md select-none"
          }`}
        >
          {text}
        </p>
        {!shown && (
          <span className="mt-3 inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            Tap to reveal
          </span>
        )}
      </button>
    </section>
  );
}
