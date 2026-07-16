import { useMemo, useState } from "react";
import { Bookmark, Check, HelpCircle, Plus } from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MicroLabel } from "@/components/MicroLabel";
import { NODES, TAGS } from "@/data/nodes";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — Unknown" },
      { name: "description", content: "Pick a few things you care about to personalize your map." },
    ],
  }),
  component: OnboardingScreen,
});

const MIN_PICKS = 2;

function OnboardingScreen() {
  const navigate = useNavigate();
  const completeOnboarding = useStore((s) => s.completeOnboarding);
  const skipOnboarding = useStore((s) => s.skipOnboarding);
  const [picked, setPicked] = useState<string[]>([]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    NODES.forEach((n) =>
      n.tags.forEach((t) => {
        c[t] = (c[t] ?? 0) + 1;
      }),
    );
    return c;
  }, []);

  const [step, setStep] = useState<1 | 2>(1);

  function toggle(tag: string) {
    setPicked((p) => (p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]));
  }

  function finish() {
    completeOnboarding(picked);
    navigate({ to: "/" });
  }

  function skip() {
    if (step === 1) {
      setStep(2);
    } else {
      skipOnboarding();
      navigate({ to: "/" });
    }
  }

  const canContinue = picked.length >= MIN_PICKS;

  return (
    <>
      <SpiralBackground />
      <div className="relative z-10 flex min-h-screen flex-col px-5 pt-12 pb-8">
        {step === 1 ? (
          <>
            <MicroLabel>Welcome</MicroLabel>
            <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ink">
              Let's look into Unknown
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              Choose your rabbit holes. Pick at least {MIN_PICKS} to start your descent into the
              lattice. Don't worry, you can always change course later.
            </p>

            <div className="mt-8 flex flex-1 flex-wrap content-start gap-2">
              {TAGS.map((t) => {
                const on = picked.includes(t);
                const count = counts[t] ?? 0;
                return (
                  <button
                    key={t}
                    onClick={() => toggle(t)}
                    aria-pressed={on}
                    className={cn(
                      "min-h-11 border px-4 py-2.5 text-left font-serif text-sm leading-snug transition-colors",
                      on && "border-ink bg-ink text-paper",
                      !on &&
                        "border-line bg-transparent text-ink-soft hover:border-ink/30 hover:text-ink",
                    )}
                  >
                    {t}
                    <span
                      className={cn(
                        "ml-2 font-mono text-[10px] uppercase tracking-[0.14em]",
                        on ? "text-paper/50" : "text-ink-soft/40",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="sticky bottom-0 mt-10 border-t border-line bg-paper pt-5">
              <div className="flex items-center justify-between">
                <MicroLabel>
                  {picked.length} selected
                  {!canContinue && picked.length > 0
                    ? ` · pick ${MIN_PICKS - picked.length} more`
                    : ""}
                </MicroLabel>
                <button
                  onClick={skip}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink"
                >
                  Skip for now
                </button>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!canContinue}
                className="mt-4 w-full border border-ink bg-ink py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper disabled:opacity-30"
              >
                Continue →
              </button>
            </div>
          </>
        ) : (
          <>
            <MicroLabel>How it works</MicroLabel>
            <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ink">Read, save, master</h1>

            <div className="mt-12 flex-1 space-y-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink bg-ink text-paper">
                  <Bookmark className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink">Save for later</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    Build your personal library of ideas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper text-ink">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink">Read next</h3>
                  <p className="mt-1 text-sm text-ink-soft">Queue ideas to read immediately.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper text-ink">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink">Got it</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    Mark ideas you've mastered for spaced repetition.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-paper text-ink">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-ink">Quiz</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    Test your understanding of complex topics.
                  </p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 mt-10 border-t border-line bg-paper pt-5">
              <button
                onClick={finish}
                className="w-full border border-ink bg-ink py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-opacity hover:opacity-90"
              >
                Got it, let's go
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function buildSpiralPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  turns: number,
  phase: number,
) {
  const thetaMax = turns * Math.PI * 2;
  const b = Math.log(rOuter / rInner) / thetaMax;
  const steps = 260;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * thetaMax;
    const r = rOuter * Math.exp(-b * t);
    const theta = t + phase;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    d += (i === 0 ? "M " : "L ") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d;
}

function SpiralBackground() {
  const armCount = 3;
  const turns = 4.5;
  const rOuter = 190;
  const rInner = 6;

  const arms = [];
  for (let i = 0; i < armCount; i++) {
    const phase = (i / armCount) * Math.PI * 2;
    arms.push({
      d: buildSpiralPath(200, 200, rOuter, rInner, turns, phase),
      width: 1.1 + (armCount - i) * 0.15,
      opacity: (0.85 - i * 0.18).toFixed(2),
    });
  }

  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* spiral-spin now lives in styles.css as a shared @keyframes, reused by
          the header logo too - CSS keyframes resolve by name regardless of
          which stylesheet declares them, so the animation below still finds
          it. spiral-pulse stays local: nothing else uses it yet. */}
      <style>{`
        @keyframes spiral-pulse { 0%, 100% { opacity: 0.9; } 50% { opacity: 0.55; } }
      `}</style>
      <svg
        viewBox="0 0 400 400"
        className="w-[150vw] h-[150vw] min-w-[800px] min-h-[800px] opacity-[0.04] sm:opacity-[0.03]"
      >
        <g style={{ transformOrigin: "200px 200px", animation: "spiral-spin 60s linear infinite" }}>
          {arms.map((arm, i) => (
            <path
              key={i}
              d={arm.d}
              fill="none"
              stroke="currentColor"
              className="text-ink"
              strokeWidth={arm.width}
              strokeLinecap="round"
              style={{ opacity: Number(arm.opacity) }}
            />
          ))}
          <circle
            cx="200"
            cy="200"
            r="4"
            fill="currentColor"
            className="text-ink"
            style={{ animation: "spiral-pulse 15s ease-in-out infinite" }}
          />
        </g>
      </svg>
    </div>
  );
}
