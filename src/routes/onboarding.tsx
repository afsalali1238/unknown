import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MicroLabel } from "@/components/MicroLabel";
import { NODES, TAGS } from "@/data/nodes";
import { useStore } from "@/lib/store";

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
    <div className="flex min-h-screen flex-col px-5 pt-12 pb-8">
      <MicroLabel>Welcome</MicroLabel>
      <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ink">
        What do you want to get sharper at?
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
        Pick at least {MIN_PICKS} — we'll surface those ideas first on your map. Nothing is locked
        in; change this anytime from You → Interests.
      </p>

      <div className="mt-8 flex flex-1 flex-wrap content-start gap-2">
        {TAGS.map((tag) => {
          const active = picked.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggle(tag)}
              className={`min-h-11 border px-4 py-2.5 text-left font-serif text-sm leading-snug transition-colors ${
                active ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
              }`}
            >
              {tag}
              <span
                className={`ml-2 font-mono text-[10px] uppercase tracking-[0.14em] ${
                  active ? "text-paper/60" : "text-ink-soft"
                }`}
              >
                {counts[tag] ?? 0}
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
  );
}
