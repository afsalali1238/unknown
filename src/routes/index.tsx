import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bookmark, Check, Maximize2, HelpCircle, Share2, LayoutGrid, ChevronUp } from "lucide-react";
import { CLUSTERS, type Node } from "@/data/nodes";
import { Quiz } from "@/components/Quiz";
import { MicroLabel } from "@/components/MicroLabel";
import { buildFeed } from "@/lib/feed";
import { useStore } from "@/lib/store";
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

function FeedScreen() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const onboardingComplete = useStore((s) => s.onboardingComplete);
  const interests = useStore((s) => s.interests);
  const bookmarks = useStore((s) => s.bookmarks);
  const gotIt = useStore((s) => s.gotIt);
  const visited = useStore((s) => s.visited);

  const [seed] = useState(() => (Date.now() & 0xffffffff) >>> 0 || 1);

  const feed = useMemo(() => {
    const likedIds = [
      ...Object.keys(bookmarks).filter((k) => bookmarks[k]),
      ...Object.keys(gotIt).filter((k) => gotIt[k]),
    ];
    return buildFeed({ interests, likedIds, visited, seed });
    // Ordering is fixed for the session (seed) and the chosen interests; it
    // deliberately does NOT re-shuffle as you browse (visited/bookmarks change),
    // so your scroll position is never yanked out from under you.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, interests]);

  useEffect(() => {
    if (hydrated && !onboardingComplete) navigate({ to: "/onboarding" });
  }, [hydrated, onboardingComplete, navigate]);

  // Gate on hydration: the persisted store (interests, visited) loads async and
  // the feed order is seeded, so rendering before hydration would mismatch SSR.
  if (!hydrated) return <div className="px-5 pt-8" />;
  if (!onboardingComplete) return <div className="px-5 pt-8" />;

  return (
    <div>
      <header className="flex items-center justify-between px-5 py-2.5">
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

      <div className="h-[calc(100dvh-7.5rem)] snap-y snap-mandatory overflow-y-auto overscroll-contain">
        {feed.map((node, i) => (
          <FeedCard key={node.id} node={node} first={i === 0} />
        ))}
      </div>
    </div>
  );
}

function FeedCard({ node, first }: { node: Node; first: boolean }) {
  const bookmarked = useStore((s) => !!s.bookmarks[node.id]);
  const mastered = useStore((s) => !!s.gotIt[node.id]);
  const toggleBookmark = useStore((s) => s.toggleBookmark);
  const markGotIt = useStore((s) => s.markGotIt);
  const visitNode = useStore((s) => s.visitNode);
  const [deeper, setDeeper] = useState(false);
  const [quiz, setQuiz] = useState(false);

  function openDeeper() {
    setDeeper(true);
    visitNode(node.id);
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
    <section className="flex min-h-[calc(100dvh-7.5rem)] snap-start items-stretch gap-2 px-5 py-6">
      <div className="flex min-w-0 flex-1 flex-col">
        <MicroLabel>
          {CLUSTER_TITLE[node.clusterId] ?? node.clusterId} · {node.medium}
        </MicroLabel>
        <h2 className="mt-4 font-serif text-2xl leading-tight text-ink sm:text-3xl">{node.title}</h2>
        <p className="mt-4 flex-1 font-serif text-lg leading-relaxed text-ink-soft">{node.layer0}</p>

        {deeper && (
          <div className="mt-5 space-y-4 border-t border-line pt-5">
            <p className="font-serif text-base leading-relaxed text-ink">{node.layer1}</p>
            <p className="font-serif text-base leading-relaxed text-ink">{node.layer2}</p>
            <Link
              to="/node/$id"
              params={{ id: node.id }}
              className="inline-flex font-mono text-[11px] uppercase tracking-[0.14em] text-accent hover:underline"
            >
              Open full node →
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
