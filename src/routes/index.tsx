import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bookmark,
  Check,
  Maximize2,
  HelpCircle,
  Share2,
  LayoutGrid,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Minus,
  Plus,
} from "lucide-react";
import { CLUSTERS, type Node, NODES } from "@/data/nodes";
import { Quiz } from "@/components/Quiz";
import { MicroLabel } from "@/components/MicroLabel";
import { buildFeed, type FeedSource } from "@/lib/feed";
import { useStore, dueCount, readNextNodes } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unknown — A latticework of powerful ideas" },
      {
        name: "description",
        content: "A feed of the world's most powerful ideas, tuned to what you care about.",
      },
    ],
  }),
  component: FeedScreen,
});

const CLUSTER_TITLE: Record<string, string> = Object.fromEntries(
  CLUSTERS.map((c) => [c.id, c.title]),
);

function ReadNextPinned({ nodes }: { nodes: Node[] }) {
  const removeReadNext = useStore((s) => s.removeReadNext);
  const reorderReadNext = useStore((s) => s.reorderReadNext);
  const [expanded, setExpanded] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  if (nodes.length === 0) return null;

  return (
    <div className="shrink-0 border-b border-line bg-paper">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
      >
        <span>Read Next · {nodes.length}</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expanded && (
        <div className="px-5 pb-3 max-h-[35vh] overflow-y-auto space-y-2">
          {nodes.map((n, i) => (
            <div
              key={n.id}
              draggable
              onDragStart={(e) => {
                setDraggedIdx(i);
                e.dataTransfer.effectAllowed = "move";
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (draggedIdx !== null && draggedIdx !== i) {
                  reorderReadNext(draggedIdx, i);
                }
                setDraggedIdx(null);
              }}
              className="flex items-center gap-2 p-2 border border-line bg-paper cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="w-4 h-4 text-ink-soft shrink-0" />
              <button
                className="flex-1 text-left min-w-0"
                onClick={() => {
                  document
                    .getElementById(`feed-card-${n.id}`)
                    ?.scrollIntoView({ behavior: "smooth" });
                  setExpanded(false);
                }}
              >
                <div className="truncate font-serif text-sm text-ink">{n.title}</div>
              </button>
              <button
                onClick={() => removeReadNext(n.id)}
                className="p-1 text-ink-soft hover:text-ink shrink-0"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NeedsTopicsCard() {
  return (
    <section className="flex min-h-full snap-start flex-col items-center justify-center p-8 text-center">
      <h2 className="font-serif text-3xl text-ink">Pick your topics</h2>
      <p className="mt-4 font-serif text-lg text-ink-soft max-w-sm">
        Tell us what you want to learn, and we'll build your feed.
      </p>
      <Link
        to="/onboarding"
        className="mt-8 bg-ink text-paper px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em]"
      >
        Choose topics
      </Link>
    </section>
  );
}

function ExhaustedCard() {
  const review = useStore((s) => s.review);
  const due = dueCount(review);

  return (
    <section className="flex min-h-full snap-start flex-col items-center justify-center p-8 text-center">
      <h2 className="font-serif text-3xl text-ink">You're caught up.</h2>
      <p className="mt-4 font-serif text-lg text-ink-soft max-w-sm">
        You've read everything in your selected topics.
      </p>
      {due > 0 && (
        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {due} due to review
        </p>
      )}
      <div className="mt-8 flex gap-4">
        <Link
          to="/onboarding"
          className="border border-ink px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink"
        >
          Add topics
        </Link>
        <Link
          to="/explore"
          className="bg-ink text-paper px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em]"
        >
          Explore library
        </Link>
      </div>
    </section>
  );
}

function FeedScreen() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const onboardingComplete = useStore((s) => s.onboardingComplete);
  const interests = useStore((s) => s.interests);
  const bookmarks = useStore((s) => s.bookmarks);
  const gotIt = useStore((s) => s.gotIt);
  const visited = useStore((s) => s.visited);
  const readNext = useStore((s) => s.readNext);

  const [seed] = useState(() => (Date.now() & 0xffffffff) >>> 0 || 1);

  const feedResult = useMemo(() => {
    const likedIds = [
      ...Object.keys(bookmarks).filter((k) => bookmarks[k]),
      ...Object.keys(gotIt).filter((k) => gotIt[k]),
    ];
    return buildFeed({ interests, likedIds, visited, seed, readNext });
    // Ordering is fixed for the session (seed) and the chosen interests.
    // readNext updates no longer shuffle the unvisited nodes due to our upfront PRNG scoring.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, interests, readNext, visited]);

  useEffect(() => {
    if (hydrated && !onboardingComplete) navigate({ to: "/onboarding" });
  }, [hydrated, onboardingComplete, navigate]);

  // Gate on hydration: the persisted store (interests, visited) loads async and
  // the feed order is seeded, so rendering before hydration would mismatch SSR.
  if (!hydrated) return <div className="px-5 pt-8" />;
  if (!onboardingComplete) return <div className="px-5 pt-8" />;

  const readNextItems = readNextNodes(readNext, NODES);

  return (
    <div className="flex flex-col h-[100dvh]">
      <header className="shrink-0 flex items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="h-6 w-6 spiral-spin" />
          <span className="font-serif text-lg tracking-tight text-ink">Unknown</span>
        </div>
        <Link
          to="/map"
          aria-label="Map view"
          className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
        >
          <LayoutGrid className="h-4 w-4" /> Map
        </Link>
      </header>

      <ReadNextPinned nodes={readNextItems} />

      <div className="flex-1 min-h-0 snap-y snap-mandatory overflow-y-auto overscroll-contain">
        {feedResult.needsTopics ? (
          <NeedsTopicsCard />
        ) : (
          <>
            {feedResult.items.map((node, i) => (
              <FeedCard key={node.id} node={node} first={i === 0} source={feedResult.source[i]} />
            ))}
            {feedResult.exhausted && <ExhaustedCard />}
          </>
        )}
      </div>
    </div>
  );
}

function FeedCard({ node, first, source }: { node: Node; first: boolean; source: FeedSource }) {
  const bookmarked = useStore((s) => !!s.bookmarks[node.id]);
  const mastered = useStore((s) => !!s.gotIt[node.id]);
  const queued = useStore((s) => s.readNext.includes(node.id));
  const toggleBookmark = useStore((s) => s.toggleBookmark);
  const markGotIt = useStore((s) => s.markGotIt);
  const visitNode = useStore((s) => s.visitNode);
  const addReadNext = useStore((s) => s.addReadNext);
  const removeReadNext = useStore((s) => s.removeReadNext);
  const [deeper, setDeeper] = useState(false);
  const [quiz, setQuiz] = useState(false);

  function openDeeper() {
    setDeeper(true);
    visitNode(node.id);
  }

  function toggleReadNext() {
    if (queued) removeReadNext(node.id);
    else addReadNext(node.id);
  }

  async function share() {
    const url = `${window.location.origin}/node/${node.id}`;
    try {
      if (navigator.share) await navigator.share({ title: node.title, url });
      else await navigator.clipboard.writeText(url);
    } catch {
      /* user cancelled */
    }
  }

  return (
    <section
      id={`feed-card-${node.id}`}
      className="flex min-h-[calc(100dvh-7.5rem)] snap-start items-stretch gap-2 px-5 py-6"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <MicroLabel>
            {CLUSTER_TITLE[node.clusterId] ?? node.clusterId} · {node.medium}
          </MicroLabel>
          {source === "adjacent" && (
            <span className="inline-block px-1.5 py-0.5 border border-accent/20 bg-accent/5 text-accent font-mono text-[9px] uppercase tracking-[0.1em]">
              Beyond your topics
            </span>
          )}
          {source === "queue" && (
            <span className="inline-block px-1.5 py-0.5 border border-line bg-paper text-ink-soft font-mono text-[9px] uppercase tracking-[0.1em]">
              In Read Next ?
            </span>
          )}
        </div>
        <h2 className="mt-4 font-serif text-2xl leading-tight text-ink sm:text-3xl">
          {node.title}
        </h2>
        <p className="mt-4 flex-1 font-serif text-lg leading-relaxed text-ink-soft">
          {node.layer0}
        </p>

        {deeper && (
          <div className="mt-5 space-y-4 border-t border-line pt-5">
            <p className="font-serif text-base leading-relaxed text-ink">{node.layer1}</p>
            <p className="font-serif text-base leading-relaxed text-ink">{node.layer2}</p>
            <Link
              to="/node/$id"
              params={{ id: node.id }}
              className="inline-flex font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:underline"
            >
              Open full node ?
            </Link>
          </div>
        )}

        {quiz && <Quiz node={node} />}

        <div className="mt-5 flex items-center justify-between">
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

      <div className="flex w-12 shrink-0 flex-col items-center justify-center gap-5">
        <RailButton label="Save" active={bookmarked} onClick={() => toggleBookmark(node.id)}>
          <Bookmark className="h-5 w-5" />
        </RailButton>
        <RailButton label="Got it" active={mastered} onClick={() => markGotIt(node.id)}>
          <Check className="h-5 w-5" />
        </RailButton>
        <RailButton label="Queue" active={queued} onClick={toggleReadNext}>
          {queued ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </RailButton>
        <RailButton label="Deeper" active={deeper} onClick={openDeeper}>
          <Maximize2 className="h-5 w-5" />
        </RailButton>
        <RailButton label="Quiz" active={quiz} onClick={() => setQuiz((q) => !q)}>
          <HelpCircle className="h-5 w-5" />
        </RailButton>
        <RailButton label="Share" onClick={share}>
          <Share2 className="h-5 w-5" />
        </RailButton>
      </div>
    </section>
  );
}

function RailButton({
  children,
  label,
  active,
  onClick,
}: {
  children: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex flex-col items-center gap-1 text-ink-soft transition-colors hover:text-ink",
        active && "text-accent",
      )}
    >
      {children}
      <span className="font-mono text-[9px] uppercase tracking-[0.1em]">{label}</span>
    </button>
  );
}
