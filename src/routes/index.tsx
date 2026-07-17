import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Bookmark,
  Check,
  HelpCircle,
  LayoutGrid,
  ChevronUp,
  GripVertical,
  Minus,
  Plus,
  List,
} from "lucide-react";
import { CLUSTERS, type Node, NODES } from "@/data/nodes";
import { Quiz } from "@/components/Quiz";
import { MicroLabel } from "@/components/MicroLabel";
import { buildFeed, type FeedSource } from "@/lib/feed";
import { useStore, dueCount, readNextNodes } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

function SortableQueueItem({ n, onClose }: { n: Node; onClose: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: n.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  const removeReadNext = useStore((s) => s.removeReadNext);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 p-2 border border-line bg-paper hover:border-ink transition-colors relative",
        isDragging && "opacity-50 border-ink shadow-md z-10",
      )}
    >
      <div
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="cursor-grab active:cursor-grabbing p-1 -ml-1 text-ink-soft shrink-0 touch-none"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      <button
        aria-label={`Go to card: ${n.title}`}
        className="flex-1 text-left min-w-0"
        onClick={() => {
          document.getElementById(`feed-card-${n.id}`)?.scrollIntoView({ behavior: "smooth" });
          onClose();
        }}
      >
        <div className="truncate font-serif text-sm text-ink">{n.title}</div>
      </button>
      <button
        aria-label="Remove from queue"
        onClick={() => removeReadNext(n.id)}
        className="p-1 text-ink-soft hover:text-ink shrink-0"
      >
        <Minus className="w-4 h-4" />
      </button>
    </div>
  );
}

function ReadNextList({ nodes, onClose }: { nodes: Node[]; onClose: () => void }) {
  const reorderReadNext = useStore((s) => s.reorderReadNext);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = nodes.findIndex((n) => n.id === active.id);
      const newIndex = nodes.findIndex((n) => n.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderReadNext(oldIndex, newIndex);
      }
    }
  }

  if (nodes.length === 0) {
    return (
      <div className="absolute top-[44px] left-0 right-0 z-20 shrink-0 border-b border-line bg-paper px-5 py-6 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft shadow-card">
        Your queue is empty
      </div>
    );
  }

  return (
    <div className="absolute top-[44px] left-0 right-0 z-20 shrink-0 border-b border-line bg-paper shadow-card">
      <div className="px-5 py-3 max-h-[40vh] overflow-y-auto space-y-2">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={nodes.map((n) => n.id)} strategy={verticalListSortingStrategy}>
            {nodes.map((n) => (
              <SortableQueueItem key={n.id} n={n} onClose={onClose} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
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

  const [queueOpen, setQueueOpen] = useState(false);

  const feedResult = useMemo(() => {
    const likedIds = [
      ...Object.keys(bookmarks).filter((k) => bookmarks[k]),
      ...Object.keys(gotIt).filter((k) => gotIt[k]),
    ];
    return buildFeed({ interests, likedIds, visited, seed, readNext });
    // Ordering is fixed for the session (seed) and the chosen interests.
    // readNext updates no longer shuffle the unvisited nodes due to our upfront PRNG scoring.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, interests, visited]);

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
      <header className="shrink-0 flex items-center justify-between px-5 py-2.5 relative z-30 bg-paper">
        <div className="flex items-center gap-2">
          <img src="/logo.svg" alt="" className="h-6 w-6 spiral-spin" />
          <span className="font-serif text-lg tracking-tight text-ink">Unknown</span>
        </div>
        <button
          onClick={() => setQueueOpen(!queueOpen)}
          className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
        >
          <List className="h-4 w-4" /> Queue{" "}
          {readNextItems.length > 0 && `(${readNextItems.length})`}
        </button>
      </header>

      {queueOpen && <ReadNextList nodes={readNextItems} onClose={() => setQueueOpen(false)} />}

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
  const isVisited = useStore((s) => !!s.visited[node.id]);
  const queued = useStore((s) => s.readNext.includes(node.id));
  const toggleBookmark = useStore((s) => s.toggleBookmark);
  const markGotIt = useStore((s) => s.markGotIt);
  const addReadNext = useStore((s) => s.addReadNext);
  const removeReadNext = useStore((s) => s.removeReadNext);
  const [quiz, setQuiz] = useState(false);
  const navigate = useNavigate();

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
      className="flex min-h-[calc(100dvh-7.5rem)] snap-start flex-col px-5 py-6"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <MicroLabel>
            {node.epistemicStatus ? `${node.epistemicStatus} · ` : ""}
            <span className="hidden sm:inline">{CLUSTER_TITLE[node.clusterId] ?? node.clusterId} · </span>
            {node.medium}
          </MicroLabel>
          {source === "adjacent" && (
            <span className="inline-block px-1.5 py-0.5 border border-accent/20 bg-accent/5 text-accent font-mono text-[9px] uppercase tracking-[0.1em]">
              Beyond your topics
            </span>
          )}
          {source === "queue" && (
            <span className="inline-block px-1.5 py-0.5 border border-line bg-paper text-ink-soft font-mono text-[9px] uppercase tracking-[0.1em]">
              In Read Next
            </span>
          )}
          {isVisited && (
            <span
              aria-label="Read"
              className="inline-block px-1.5 py-0.5 bg-ink text-paper font-mono text-[9px] uppercase tracking-[0.1em]"
            >
              Read ✓
            </span>
          )}
        </div>
        <Link
          to="/node/$id"
          params={{ id: node.id }}
          className="mt-4 block font-serif text-2xl leading-tight text-ink sm:text-3xl hover:text-accent transition-colors"
        >
          {node.title}
        </Link>
        <p className="mt-4 flex-1 font-serif text-lg leading-relaxed text-ink-soft">
          {node.layer0}
        </p>

        <Link
          to="/node/$id"
          params={{ id: node.id }}
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft hover:text-ink"
        >
          Continue reading — the mechanism, how to apply it, and what it connects to
          <span aria-hidden="true">→</span>
        </Link>

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

      <div className="flex shrink-0 items-center justify-around gap-2 pt-6 mt-4 border-t border-line/50">
        <RailButton label="Save" active={bookmarked} onClick={() => toggleBookmark(node.id)}>
          <Bookmark className="h-5 w-5" />
        </RailButton>
        <RailButton label="Got it" active={mastered} onClick={() => markGotIt(node.id)}>
          <Check className="h-5 w-5" />
        </RailButton>
        <RailButton label="Queue" active={queued} onClick={toggleReadNext}>
          {queued ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
        </RailButton>
        <RailButton label="Quiz" active={quiz} onClick={() => setQuiz((q) => !q)}>
          <HelpCircle className="h-5 w-5" />
        </RailButton>
      </div>
    </section>
  );
}

function RailButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: (e: React.MouseEvent) => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "group flex flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors",
        active ? "text-ink" : "text-ink-soft hover:text-ink",
      )}
    >
      <div
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors",
          active
            ? "border-ink bg-ink text-paper"
            : "border-line bg-transparent text-ink-soft group-hover:border-ink group-hover:text-ink",
        )}
      >
        {children}
      </div>
      <span className="opacity-80">{label}</span>
    </button>
  );
}
