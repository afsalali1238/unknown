import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { CLUSTERS, NODES, type Node } from "@/data/nodes";
import { MicroLabel } from "@/components/MicroLabel";
import { SearchBar } from "@/components/SearchBar";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ChevronUp, Bookmark } from "lucide-react";

const skimSearchSchema = z.object({
  cluster: z.string().optional(),
});

export const Route = createFileRoute("/skim")({
  validateSearch: skimSearchSchema,
  head: () => ({
    meta: [
      { title: "Skim — Unknown" },
      {
        name: "description",
        content: "The entire lattice, one thesis at a time.",
      },
    ],
  }),
  component: SkimScreen,
});

const CLUSTER_TITLE: Record<string, string> = Object.fromEntries(
  CLUSTERS.map((c) => [c.id, c.title]),
);

function SkimScreen() {
  const { cluster: clusterFilter } = Route.useSearch();
  const [filterOpen, setFilterOpen] = useState(false);

  const nodes = useMemo(
    () => (clusterFilter ? NODES.filter((n) => n.clusterId === clusterFilter) : NODES),
    [clusterFilter],
  );

  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="shrink-0 flex items-center justify-between px-5 py-2.5 relative z-30 bg-paper border-b border-line">
        <div>
          <h1 className="font-serif text-lg leading-tight text-ink">Skim</h1>
          <MicroLabel>
            {clusterFilter ? CLUSTER_TITLE[clusterFilter] : "The whole lattice"} · {nodes.length}
          </MicroLabel>
        </div>
        <button
          onClick={() => setFilterOpen((v) => !v)}
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
        >
          Topics
        </button>
      </header>

      {filterOpen && (
        <div className="absolute top-[57px] left-0 right-0 z-20 border-b border-line bg-paper shadow-card px-5 py-4 max-h-[50vh] overflow-y-auto">
          <SearchBar />
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/skim"
              search={{}}
              onClick={() => setFilterOpen(false)}
              className={cn(
                "min-h-9 border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em]",
                !clusterFilter
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink",
              )}
            >
              All
            </Link>
            {CLUSTERS.map((c) => (
              <Link
                key={c.id}
                to="/skim"
                search={{ cluster: c.id }}
                onClick={() => setFilterOpen(false)}
                className={cn(
                  "min-h-9 border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em]",
                  clusterFilter === c.id
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink",
                )}
              >
                {c.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0 snap-y snap-mandatory overflow-y-auto overscroll-contain">
        {nodes.map((node, i) => (
          <SkimCard key={node.id} node={node} first={i === 0} />
        ))}
      </div>
    </div>
  );
}

function SkimCard({ node, first }: { node: Node; first: boolean }) {
  const isVisited = useStore((s) => !!s.visited[node.id]);
  const bookmarked = useStore((s) => !!s.bookmarks[node.id]);
  const toggleBookmark = useStore((s) => s.toggleBookmark);
  const navigate = useNavigate();

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate({ to: "/node/$id", params: { id: node.id } })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate({ to: "/node/$id", params: { id: node.id } });
        }
      }}
      className="relative flex min-h-[calc(100dvh-3.75rem)] snap-start flex-col justify-between px-5 py-8 cursor-pointer"
    >
      <button
        aria-label={bookmarked ? "Remove from saved" : "Save"}
        aria-pressed={bookmarked}
        onClick={(e) => {
          e.stopPropagation();
          toggleBookmark(node.id);
        }}
        className={cn(
          "absolute right-5 top-8 z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
          bookmarked
            ? "border-ink bg-ink text-paper"
            : "border-line bg-paper text-ink-soft hover:border-ink hover:text-ink",
        )}
      >
        <Bookmark className="h-4 w-4" fill={bookmarked ? "currentColor" : "none"} />
      </button>

      <div className="pr-14">
        <div className="flex flex-wrap items-center gap-2">
          <MicroLabel>
            {node.epistemicStatus ? `${node.epistemicStatus} · ` : ""}
            {CLUSTER_TITLE[node.clusterId] ?? node.clusterId}
          </MicroLabel>
          {isVisited && (
            <span
              aria-label="Read"
              className="inline-block px-1.5 py-0.5 bg-ink text-paper font-mono text-[10px] uppercase tracking-[0.1em]"
            >
              Read
            </span>
          )}
        </div>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          {node.title}
        </h2>
        <p className="mt-5 font-serif text-lg leading-relaxed text-ink-soft">{node.layer0}</p>
      </div>

      <div className="flex items-center justify-between pt-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
          {node.author} · {node.year}
        </span>
        {first && (
          <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            <ChevronUp className="h-3.5 w-3.5" /> swipe · next
          </span>
        )}
      </div>
    </div>
  );
}
