import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { NODES_BY_CLUSTER, NODE_BY_ID } from "@/data/nodes";
import { SearchBar } from "@/components/SearchBar";
import { MicroLabel } from "@/components/MicroLabel";
import { InstallAppButton } from "@/components/InstallAppButton";
import { LatticeIndex } from "@/components/LatticeIndex";
import { useStore, dueCount, currentStreak } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map — Unknown" },
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
  const visited = useStore((s) => s.visited);
  const onboardingComplete = useStore((s) => s.onboardingComplete);
  const interests = useStore((s) => s.interests);
  const due = hydrated ? dueCount(review) : 0;
  const streak = hydrated ? currentStreak(streakDays) : 0;
  const cont = hydrated && lastNodeId ? NODE_BY_ID[lastNodeId] : null;
  // Before a user has opened anything, "Start here" is the app's one shot
  // at reflecting what they just picked in onboarding - it was hardcoded to
  // cluster A's first node regardless of interests, so every new user saw
  // the exact same suggestion no matter which tags they chose. Prefer the
  // first node (in stable NODE_BY_ID order) matching any selected interest;
  // fall back to the old default only when there are no interests to match
  // (e.g. onboarding was skipped).
  const interestMatch =
    interests.length > 0
      ? Object.values(NODE_BY_ID).find((n) => n.tags.some((t) => interests.includes(t)))
      : undefined;
  const starter = interestMatch ?? NODES_BY_CLUSTER["A"]?.[0] ?? Object.values(NODE_BY_ID)[0];
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
    <div className="px-5 pt-8 sm:px-8 sm:pt-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="" className="h-8 w-8 spiral-spin" />
          <h1 className="font-serif text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
            Unknown
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {hydrated ? (
            <MicroLabel>Streak · {streak}d</MicroLabel>
          ) : (
            <span aria-hidden="true" className="h-3 w-16 animate-pulse rounded-full bg-line" />
          )}
          <InstallAppButton variant="icon" />
        </div>
      </header>
      <p className="mt-2 font-serif text-lg italic leading-snug text-ink-soft sm:text-xl">
        The latticework of powerful ideas.
      </p>

      <div className="mt-6">
        <SearchBar />
      </div>

      <div className="mt-8 flex items-center gap-2">
        <div className="flex items-center justify-center min-h-11 border border-ink bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-paper">
          Map
        </div>
        <Link
          to="/explore"
          className="flex items-center justify-center min-h-11 border border-line px-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:border-ink hover:text-ink transition-colors"
        >
          Playlists
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <Link
          to="/node/$id"
          params={{ id: resume.id }}
          className="group border border-line bg-paper p-4 shadow-[var(--shadow-card)] outline-none transition-colors duration-[var(--duration-base)] hover:border-ink active:bg-line/30 sm:p-5"
        >
          <MicroLabel>{cont ? "Continue" : "Start here"}</MicroLabel>
          <p className="mt-2 font-serif text-base leading-snug text-ink group-hover:text-accent sm:text-lg">
            {resume.title}
          </p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {resume.author}
          </p>
        </Link>
        <Link
          to="/review"
          className="group border border-line bg-paper p-4 shadow-[var(--shadow-card)] outline-none transition-colors duration-[var(--duration-base)] hover:border-ink active:bg-line/30 sm:p-5"
        >
          <MicroLabel>Due today</MicroLabel>
          {hydrated ? (
            <p className="mt-2 font-serif text-4xl leading-none text-accent sm:text-5xl">{due}</p>
          ) : (
            <span
              aria-hidden="true"
              className="mt-2 block h-9 w-12 animate-pulse rounded-sm bg-line sm:h-11"
            />
          )}
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {hydrated ? (due === 0 ? "You're caught up" : "Tap to review") : "Loading…"}
          </p>
        </Link>
      </div>

      <div className="mt-12 sm:mt-16">
        <LatticeIndex visited={visited} hydrated={hydrated} />
      </div>

      <footer className="mt-16 border-t border-line pt-6 pb-2">
        <MicroLabel>Retention over reach</MicroLabel>
      </footer>
    </div>
  );
}
