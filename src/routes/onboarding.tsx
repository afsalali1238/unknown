import { useMemo, useState } from "react";
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

  function toggle(tag: string) {
    setPicked((p) => (p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]));
  }

  function finish() {
    completeOnboarding(picked);
    navigate({ to: "/" });
  }

  function skip() {
    skipOnboarding();
    navigate({ to: "/" });
  }

  const canContinue = picked.length >= MIN_PICKS;

  return (
    <>
      <SpiralBackground />
      <div className="relative z-10 flex min-h-screen flex-col px-5 pt-12 pb-8">
        <MicroLabel>Welcome</MicroLabel>
        <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ink">Let's look into Unknown</h1>
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
              {!canContinue && picked.length > 0 ? ` · pick ${MIN_PICKS - picked.length} more` : ""}
            </MicroLabel>
            <button
              onClick={skip}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink"
            >
              Skip for now
            </button>
          </div>
          <button
            onClick={finish}
            disabled={!canContinue}
            className="mt-4 w-full border border-ink bg-ink py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper disabled:opacity-30"
          >
            Continue →
          </button>
        </div>
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
      <style>{`
        @keyframes spiral-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
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
