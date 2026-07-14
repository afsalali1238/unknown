import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CLUSTERS, NODES_BY_CLUSTER, NODE_BY_ID, type Node } from "@/data/nodes";
import { NodeCard } from "@/components/NodeCard";
import { SearchBar } from "@/components/SearchBar";
import { MicroLabel } from "@/components/MicroLabel";
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

function matchCount(nodes: Node[], interests: string[]): number {
  if (interests.length === 0) return 0;
  return nodes.filter((n) => n.tags.some((t) => interests.includes(t))).length;
}

function MapScreen() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const lastNodeId = useStore((s) => s.lastNodeId);
  const review = useStore((s) => s.review);
  const streakDays = useStore((s) => s.streakDays);
  const interests = useStore((s) => s.interests);
  const onboardingComplete = useStore((s) => s.onboardingComplete);
  const due = hydrated ? dueCount(review) : 0;
  const streak = hydrated ? currentStreak(streakDays) : 0;
  const cont = hydrated && lastNodeId ? NODE_BY_ID[lastNodeId] : null;
  const starter = NODES_BY_CLUSTER["A"]?.[0] ?? Object.values(NODE_BY_ID)[0];
  const resume = cont ?? starter;

  const [view, setView] = useState<"for-you" | "all">("all");

  useEffect(() => {
    if (hydrated && !onboardingComplete) {
      navigate({ to: "/onboarding" });
    }
  }, [hydrated, onboardingComplete, navigate]);

  useEffect(() => {
    if (hydrated && interests.length > 0) setView("for-you");
  }, [hydrated]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasInterests = hydrated && interests.length > 0;

  const orderedClusters = useMemo(() => {
    if (!hasInterests) return CLUSTERS;
    return [...CLUSTERS].sort(
      (a, b) =>
        matchCount(NODES_BY_CLUSTER[b.id], interests) - matchCount(NODES_BY_CLUSTER[a.id], interests)
    );
  }, [hasInterests, interests]);

  if (hydrated && !onboardingComplete) {
    return <div className="px-5 pt-8" />;
  }

  return (
    <div className="px-5 pt-8">
      <header className="flex items-baseline justify-between">
        <h1 className="font-serif text-3xl leading-tight text-ink">Unknown</h1>
        <MicroLabel>Streak · {streak}d</MicroLabel>
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

      {hasInterests && (
        <div className="mt-8 flex items-center gap-2">
          <button
            onClick={() => setView("for-you")}
            className={`min-h-11 border px-4 font-mono text-[11px] uppercase tracking-[0.18em] ${
              view === "for-you" ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink"
            }`}
          >
            For you
          </button>
          <button
            onClick={() => setView("all")}
            className={`min-h-11 border px-4 font-mono text-[11px] uppercase tracking-[0.18em] ${
              view === "all" ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink"
            }`}
          >
            Everything
          </button>
        </div>
      )}

      <div className="mt-12 space-y-12">
        {orderedClusters.map((c) => {
          const allNodes = NODES_BY_CLUSTER[c.id];
          const nodes =
            hasInterests && view === "for-you"
              ? allNodes.filter((n) => n.tags.some((t) => interests.includes(t)))
              : allNodes;
          if (nodes.length === 0) return null;
          return (
            <section key={c.id}>
              <div className="flex items-baseline justify-between px-1">
                <div className="min-w-0">
                  <h2 className="font-serif text-2xl leading-tight text-ink">{c.title}</h2>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                    {c.subtitle}
                  </p>
                </div>
                <MicroLabel>{nodes.length}</MicroLabel>
              </div>
              <div className="mt-4 -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2">
                {nodes.map((n) => (
                  <NodeCard key={n.id} node={n} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="mt-16 border-t border-line pt-6 pb-2">
        <MicroLabel>Retention over reach</MicroLabel>
      </footer>
    </div>
  );
}
