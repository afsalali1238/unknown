import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CLUSTERS, NODES_BY_CLUSTER, type Node } from "@/data/nodes";
import { NodeCard } from "@/components/NodeCard";
import { SearchBar } from "@/components/SearchBar";
import { MicroLabel } from "@/components/MicroLabel";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Unknown" },
      {
        name: "description",
        content: "Browse the full latticework of powerful ideas.",
      },
    ],
  }),
  component: ExploreScreen,
});

function matchCount(nodes: Node[], interests: string[]): number {
  if (interests.length === 0) return 0;
  return nodes.filter((n) => n.tags.some((t) => interests.includes(t))).length;
}

function ClusterSection({ cluster, nodes }: { cluster: (typeof CLUSTERS)[0]; nodes: Node[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-1 text-left cursor-pointer group"
      >
        <div className="min-w-0 flex-1">
          <h2 className="font-serif text-2xl leading-tight text-ink group-hover:opacity-80 transition-opacity">
            {cluster.title}
          </h2>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {cluster.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <MicroLabel>{nodes.length}</MicroLabel>
          <span className="text-ink-soft group-hover:text-ink transition-colors flex items-center justify-center">
            {isOpen ? (
              <ChevronDown size={20} strokeWidth={1.5} />
            ) : (
              <ChevronRight size={20} strokeWidth={1.5} />
            )}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="mt-6 -mx-5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:overflow-x-visible sm:px-0">
          {nodes.map((n) => (
            <NodeCard key={n.id} node={n} />
          ))}
        </div>
      )}
    </section>
  );
}

function ExploreScreen() {
  const hydrated = useHydrated();
  const interests = useStore((s) => s.interests);
  const [view, setView] = useState<"for-you" | "all">("all");

  useEffect(() => {
    if (hydrated && interests.length > 0 && view === "all") {
      setView("for-you");
    }
  }, [hydrated, interests.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasInterests = hydrated && interests.length > 0;

  const orderedClusters = useMemo(() => {
    if (!hasInterests) return CLUSTERS;
    return [...CLUSTERS].sort(
      (a, b) =>
        matchCount(NODES_BY_CLUSTER[b.id], interests) -
        matchCount(NODES_BY_CLUSTER[a.id], interests),
    );
  }, [hasInterests, interests]);

  return (
    <div className="px-5 pt-8">
      <header className="flex items-center justify-between">
        <h1 className="font-serif text-3xl leading-tight text-ink">Explore</h1>
      </header>

      <div className="mt-6">
        <SearchBar />
      </div>

      {hasInterests && (
        <div className="mt-8 flex items-center gap-2">
          <button
            onClick={() => setView("for-you")}
            className={cn(
              "min-h-11 border px-4 font-mono text-[11px] uppercase tracking-[0.18em]",
              view === "for-you"
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-ink",
            )}
          >
            For you
          </button>
          <button
            onClick={() => setView("all")}
            className={cn(
              "min-h-11 border px-4 font-mono text-[11px] uppercase tracking-[0.18em]",
              view === "all"
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-ink",
            )}
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
          return <ClusterSection key={c.id} cluster={c} nodes={nodes} />;
        })}
      </div>

      <footer className="mt-16 border-t border-line pt-6 pb-2">
        <MicroLabel>Retention over reach</MicroLabel>
      </footer>
    </div>
  );
}
