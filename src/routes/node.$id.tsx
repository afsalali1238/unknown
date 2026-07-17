import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { NODE_BY_ID, CLUSTER_BY_ID, type Node as NodeType } from "@/data/nodes";
import { MicroLabel } from "@/components/MicroLabel";
import { LayerReveal } from "@/components/LayerReveal";
import { Quiz } from "@/components/Quiz";
import { RecallReveal } from "@/components/RecallReveal";
import { RelatedCard } from "@/components/RelatedCard";
import { AudioBar } from "@/components/AudioBar";
import { FirstTimeHint } from "@/components/FirstTimeHint";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/node/$id")({
  loader: ({ params }) => {
    const node = NODE_BY_ID[params.id];
    if (!node) throw notFound();
    return { node };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found — Unknown" }] };
    const n = loaderData.node;
    return {
      meta: [
        { title: `${n.title} — Unknown` },
        { name: "description", content: n.thesis },
        { property: "og:title", content: `${n.title} — Unknown` },
        { property: "og:description", content: n.thesis },
      ],
    };
  },
  component: NodeScreen,
});

// Archived source files always live at content/sources/<slug>.md (see
// docs/OFFLINE-ARCHIVE-PLAN.md); the reader route just needs the slug.
function archiveSlug(path: string): string {
  return path.replace(/^content\/sources\//, "").replace(/\.md$/, "");
}

const epistemicStatusExplainer: Record<string, string> = {
  Canonical: "Canonical — the original, primary-source explanation, not a summary of one.",
  Contemporary: "Contemporary — a current, actively-debated framing rather than a settled classic.",
  Speculative: "Speculative — a reasoned hypothesis, presented as one, not established fact.",
};

function splitSentences(text: string): string[] {
  // Primary: Intl.Segmenter with sentence granularity (Chrome/Safari/FF 99+)
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    const segs = Array.from(segmenter.segment(text))
      .map((s) => s.segment.trim())
      .filter(Boolean);
    // Segmenter sometimes returns 1 big chunk — fall through to regex in that case
    if (segs.length > 1) return segs;
  }
  // Fallback: split on sentence-ending punctuation followed by whitespace/end
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// New (never opened) > opened but not mastered > mastered (gotIt). Passive —
// derived from visitNode, which already fires on every page load.
function readStatusBoost(
  id: string,
  gotItMap: Record<string, boolean>,
  visitedMap: Record<string, boolean>,
): number {
  if (gotItMap[id]) return 0;
  if (visitedMap[id]) return 40;
  return 100;
}

function Sentences({ text, start }: { text: string; start: number }) {
  const sents = useMemo(() => splitSentences(text), [text]);
  return (
    <p className="leading-relaxed text-ink">
      {sents.map((s, i) => (
        <span
          key={i}
          data-sentence={start + i}
          className="transition-colors duration-200 data-[active=1]:bg-accent/15"
        >
          {s}{" "}
        </span>
      ))}
    </p>
  );
}

function getRecommendationReason(
  sourceNode: NodeType,
  targetNode: NodeType,
  interests: string[],
): string {
  const sharedInterests = targetNode.tags.filter((t) => interests.includes(t));
  if (sharedInterests.length > 0) {
    return `Suggested: Matches your interest in ${sharedInterests[0]}`;
  }

  if (sourceNode.clusterId === targetNode.clusterId) {
    const cluster = CLUSTER_BY_ID[sourceNode.clusterId];
    return `Suggested: Continues the theme of ${cluster?.title || "this cluster"}`;
  }

  const sharedTags = targetNode.tags.filter((t) => sourceNode.tags.includes(t));
  if (sharedTags.length > 0) {
    return `Suggested: Explores related concepts like ${sharedTags[0]}`;
  }

  return "Suggested: Hand-picked for you to explore next";
}

function NodeScreen() {
  const { node } = Route.useLoaderData() as { node: NodeType };
  const cluster = CLUSTER_BY_ID[node.clusterId];
  const hydrated = useHydrated();
  const visitNode = useStore((s) => s.visitNode);
  const toggleBookmark = useStore((s) => s.toggleBookmark);
  const bookmarked = useStore((s) => !!s.bookmarks[node.id]);
  const gotItMap = useStore((s) => s.gotIt);
  const visitedMap = useStore((s) => s.visited);
  const interests = useStore((s) => s.interests);
  const dismissHint = useStore((s) => s.dismissHint);
  const queued = useStore((s) => s.readNext.includes(node.id));
  const addReadNext = useStore((s) => s.addReadNext);
  const removeReadNext = useStore((s) => s.removeReadNext);

  const [showL1, setShowL1] = useState(false);
  const [showL2, setShowL2] = useState(false);
  const [showAllConnections, setShowAllConnections] = useState(false);

  useEffect(() => {
    visitNode(node.id);
  }, [node.id, visitNode]);

  const l0Sents = splitSentences(node.layer0 ?? "").length;
  const l1Sents = splitSentences(node.layer1 ?? "").length;
  const l2Sents = splitSentences(node.layer2 ?? "").length;
  const totalSents = l0Sents + (showL1 ? l1Sents : 0) + (showL2 ? l2Sents : 0);

  const related: NodeType[] = useMemo(() => {
    const arr = node.related.map((id: string) => NODE_BY_ID[id]).filter(Boolean);
    return arr.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      // New (never opened) beats opened-not-mastered beats mastered
      scoreA += readStatusBoost(a.id, gotItMap, visitedMap);
      scoreB += readStatusBoost(b.id, gotItMap, visitedMap);

      // Same cluster boost
      if (a.clusterId === node.clusterId) scoreA += 10;
      if (b.clusterId === node.clusterId) scoreB += 10;

      // User interests match
      scoreA += a.tags.filter((t: string) => interests.includes(t)).length * 5;
      scoreB += b.tags.filter((t: string) => interests.includes(t)).length * 5;

      // Shared node tags match
      scoreA += a.tags.filter((t: string) => node.tags.includes(t)).length;
      scoreB += b.tags.filter((t: string) => node.tags.includes(t)).length;

      return scoreB - scoreA;
    });
  }, [node, gotItMap, visitedMap, interests]);

  const nextConnection = related[0];

  return (
    <>
      <article className="px-5 pt-8 pb-8">
        <Link to="/" className="inline-flex items-center gap-2">
          <MicroLabel>← Home</MicroLabel>
        </Link>

        <div className="mt-6">
          <MicroLabel>
            {node.epistemicStatus ? `${node.epistemicStatus} · ` : ""}
            <span className="hidden sm:inline">{cluster?.title} · </span>
            {node.medium}
          </MicroLabel>
          <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">
            {node.title}
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {node.author} · {node.year}
          </p>
        </div>

        {node.epistemicStatus && (
          <FirstTimeHint id="hint-epistemic-status" className="mt-4">
            {epistemicStatusExplainer[node.epistemicStatus]}
          </FirstTimeHint>
        )}

        <blockquote className="mt-8 border-l-2 border-accent pl-5">
          <p className="font-serif text-xl italic leading-snug text-ink">"{node.thesis}"</p>
        </blockquote>

        <section className="mt-8">
          <MicroLabel>The idea</MicroLabel>
          <div className="mt-3">
            <Sentences text={node.layer0 ?? ""} start={0} />
          </div>
        </section>

        {!showL1 && (
          <FirstTimeHint id="hint-layers" className="mt-8">
            Ideas here are taught in layers, not dumped at once. What's above is the plain-English
            version — the next layer explains why it works, the one after is for applying it. Each
            unlocks only once you ask for it.
          </FirstTimeHint>
        )}

        <LayerReveal
          label="Why it works"
          onReveal={() => {
            setShowL1(true);
            dismissHint("hint-layers");
          }}
        >
          <section>
            <MicroLabel>Why it works</MicroLabel>
            <div className="mt-3">
              <Sentences text={node.layer1 ?? ""} start={l0Sents} />
            </div>
          </section>
        </LayerReveal>

        {showL1 && (
          <LayerReveal label="How to apply it" onReveal={() => setShowL2(true)}>
            <section>
              <MicroLabel>How to apply it</MicroLabel>
              <div className="mt-3">
                <Sentences text={node.layer2 ?? ""} start={l0Sents + l1Sents} />
              </div>
            </section>
          </LayerReveal>
        )}

        <RecallReveal text={node.thesis} />
        <Quiz node={node} />

        <section className="mt-14">
          <MicroLabel>Further reading</MicroLabel>
          <ul className="mt-4 space-y-3">
            {node.furtherReading.map((f) => (
              <li key={f.url} className="border-b border-line pb-3">
                <div className="flex items-baseline justify-between gap-4">
                  <span>
                    <span className="font-serif text-lg text-ink">{f.label}</span>
                    <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                      {f.source}
                    </span>
                  </span>
                  {f.archive?.status === "unavailable" && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft whitespace-nowrap bg-line/30 px-1.5 py-0.5">
                      requires internet
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-4">
                  {(f.archive?.status === "full" || f.archive?.status === "excerpt") &&
                    f.archive.path && (
                      <Link
                        to="/read/$id"
                        params={{ id: archiveSlug(f.archive.path) }}
                        search={{ label: f.label, source: f.source, url: f.url }}
                        className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent hover:underline flex items-center gap-1"
                      >
                        <span>↓ Read offline</span>
                      </Link>
                    )}
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink hover:underline flex items-center gap-1"
                  >
                    <span>↗ Open original</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => toggleBookmark(node.id)}
            className="flex items-center gap-2 border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:border-ink"
          >
            <span className={hydrated && bookmarked ? "text-accent" : "text-ink-soft"}>★</span>
            <span>{hydrated && bookmarked ? "Saved" : "Save"}</span>
          </button>
          <button
            onClick={() => (queued ? removeReadNext(node.id) : addReadNext(node.id))}
            className={cn(
              "flex items-center gap-2 border px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
              hydrated && queued
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink hover:border-ink",
            )}
          >
            <span>{hydrated && queued ? "− Remove" : "+ Queue"}</span>
            <span className="hidden sm:inline">Read Next</span>
          </button>
        </div>

        {nextConnection && (
          <section className="mt-16 animate-in fade-in duration-500">
            <Link
              to="/node/$id"
              params={{ id: nextConnection.id }}
              className="group block border-2 border-ink p-6 sm:p-8 transition-colors duration-300 hover:bg-ink"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.14em]">
                <span className="bg-accent px-2 py-1 text-paper">Up Next</span>
                <span className="text-ink group-hover:text-paper/80 transition-colors">
                  {getRecommendationReason(node, nextConnection, interests)}
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl leading-tight text-ink group-hover:text-paper transition-colors">
                {nextConnection.title}
              </h3>
              <p className="mt-4 border-l-2 border-accent/50 pl-4 font-serif text-xl italic leading-relaxed text-ink-soft group-hover:text-paper/80 transition-colors">
                "{nextConnection.thesis}"
              </p>
              <div className="mt-8 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft group-hover:text-paper/60 transition-colors">
                  {nextConnection.author} · {nextConnection.medium}
                </span>
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink group-hover:text-paper transition-all">
                  <span>Continue</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </Link>

            {related.length > 1 && (
              <div className="mt-10">
                {!showAllConnections ? (
                  <button
                    onClick={() => setShowAllConnections(true)}
                    className="flex w-full items-center justify-between border-t border-line py-4 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft hover:text-ink"
                  >
                    <span>Show {related.length - 1} other connections</span>
                    <span>+</span>
                  </button>
                ) : (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-baseline justify-between border-t border-line pt-8">
                      <h2 className="font-serif text-3xl text-ink">Related ideas</h2>
                      <MicroLabel>The lattice</MicroLabel>
                    </div>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                      Where this thought connects
                    </p>
                    <div className="mt-6">
                      {related
                        .filter((r) => r.id !== nextConnection.id)
                        .map((r) => (
                          <RelatedCard key={r.id} node={r} />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </article>
      <AudioBar key={node.id} node={node} sentenceCount={totalSents} />
    </>
  );
}
