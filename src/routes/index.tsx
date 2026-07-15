import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { NODES_BY_CLUSTER, NODE_BY_ID } from "@/data/nodes";
import { SearchBar } from "@/components/SearchBar";
import { MicroLabel } from "@/components/MicroLabel";
import { InstallAppButton } from "@/components/InstallAppButton";
import { useStore, dueCount, currentStreak } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unknown — A latticework of powerful ideas" },
      {
        name: "description",
        content:
          "Cross-linked, layered, audio-narrated map of the world's most powerful ideas. Retain what you read.",
      },
    ],
  }),
  component: MapScreen,
});

function MapScreen() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const lastNodeId = useStore((s) => s.lastNodeId);
  const review = useStore((s) => s.review);
  const streakDays = useStore((s) => s.streakDays);
  const onboardingComplete = useStore((s) => s.onboardingComplete);
  const due = hydrated ? dueCount(review) : 0;
  const streak = hydrated ? currentStreak(streakDays) : 0;
  const cont = hydrated && lastNodeId ? NODE_BY_ID[lastNodeId] : null;
  const starter = NODES_BY_CLUSTER["A"]?.[0] ?? Object.values(NODE_BY_ID)[0];
  const resume = cont ?? starter;

  useEffect(() => {
    if (hydrated && !onboardingComplete) {
      navigate({ to: "/onboarding" });
    }
  }, [hydrated, onboardingComplete, navigate]);

  if (hydrated && !onboardingComplete) {
    return <div className="px-5 pt-8" />;
  }

  return (
    <div className="px-5 pt-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="" className="h-8 w-8 text-ink" />
          <h1 className="font-serif text-3xl leading-tight text-ink">Unknown</h1>
        </div>
        <div className="flex items-center gap-3">
          <MicroLabel>Streak · {streak}d</MicroLabel>
          <InstallAppButton variant="icon" />
        </div>
      </header>
      <p className="mt-2 font-serif text-lg italic text-ink-soft">
        The latticework of powerful ideas.
      </p>

      <div className="mt-6">
        <SearchBar />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Link
          to="/node/$id"
          params={{ id: resume.id }}
          className="border border-line p-4 hover:border-ink"
        >
          <MicroLabel>{cont ? "Continue" : "Start here"}</MicroLabel>
          <p className="mt-2 font-serif text-base leading-snug text-ink">{resume.title}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {resume.author}
          </p>
        </Link>
        <Link to="/review" className="border border-line p-4 hover:border-ink">
          <MicroLabel>Due today</MicroLabel>
          <p className="mt-2 font-serif text-4xl leading-none text-accent">{due}</p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {due === 0 ? "You're caught up" : "Tap to review"}
          </p>
        </Link>
      </div>

      <footer className="mt-16 border-t border-line pt-6 pb-2">
        <MicroLabel>Retention over reach</MicroLabel>
      </footer>
    </div>
  );
}
