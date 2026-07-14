import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { NODE_BY_ID, CLUSTER_BY_ID, type Node as NodeType } from "@/data/nodes";
import { MicroLabel } from "@/components/MicroLabel";
import { LayerReveal } from "@/components/LayerReveal";
import { Quiz } from "@/components/Quiz";
import { RecallReveal } from "@/components/RecallReveal";
import { RelatedCard } from "@/components/RelatedCard";
import { AudioBar } from "@/components/AudioBar";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

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

function splitSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
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

function NodeScreen() {
  const { node } = Route.useLoaderData() as { node: NodeType };
  const cluster = CLUSTER_BY_ID[node.clusterId];
  const hydrated = useHydrated();
  const visitNode = useStore((s) => s.visitNode);
  const toggleBookmark = useStore((s) => s.toggleBookmark);
  const bookmarked = useStore((s) => !!s.bookmarks[node.id]);
  const gotItMap = useStore((s) => s.gotIt);

  const [showL1, setShowL1] = useState(false);
  const [showL2, setShowL2] = useState(false);

  useEffect(() => {
    visitNode(node.id);
  }, [node.id, visitNode]);

  const l0Sents = splitSentences(node.layer0).length;
  const l1Sents = splitSentences(node.layer1).length;
  const l2Sents = splitSentences(node.layer2).length;
  const totalSents =
    l0Sents + (showL1 ? l1Sents : 0) + (showL2 ? l2Sents : 0);

  const related: NodeType[] = node.related.map((id: string) => NODE_BY_ID[id]).filter(Boolean);
  const nextConnection = related.find((r: NodeType) => !gotItMap[r.id]) ?? related[0];

  return (
    <>
      <article className="px-5 pt-8 pb-8">
        <Link to="/" className="inline-flex items-center gap-2">
          <MicroLabel>← Map</MicroLabel>
        </Link>

        <div className="mt-6">
          <MicroLabel>
            {cluster?.title} · {node.medium}
          </MicroLabel>
          <h1 className="mt-3 font-serif text-4xl leading-[1.1] text-ink sm:text-5xl">
            {node.title}
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {node.author} · {node.year} · {node.medium}
          </p>
        </div>

        <blockquote className="mt-8 border-l-2 border-accent pl-5">
          <p className="font-serif text-xl italic leading-snug text-ink">"{node.thesis}"</p>
        </blockquote>

        <section className="mt-8">
          <MicroLabel>Layer 0 — Plain English</MicroLabel>
          <div className="mt-3">
            <Sentences text={node.layer0} start={0} />
          </div>
        </section>

        {!showL1 ? (
          <LayerReveal label="Show me how it works" onReveal={() => setShowL1(true)}>
            <div />
          </LayerReveal>
        ) : (
          <section className="mt-8 border-t border-line pt-6 animate-in fade-in duration-500">
            <MicroLabel>Layer 1 — The mechanism</MicroLabel>
            <div className="mt-3">
              <Sentences text={node.layer1} start={l0Sents} />
            </div>
          </section>
        )}

        {showL1 &&
          (!showL2 ? (
            <LayerReveal label="Apply it" onReveal={() => setShowL2(true)}>
              <div />
            </LayerReveal>
          ) : (
            <section className="mt-8 border-t border-line pt-6 animate-in fade-in duration-500">
              <MicroLabel>Layer 2 — Apply it</MicroLabel>
              <div className="mt-3">
                <Sentences text={node.layer2} start={l0Sents + l1Sents} />
              </div>
            </section>
          ))}

        <Quiz node={node} />
        <RecallReveal text={node.thesis} />

        {related.length > 0 && (
          <section className="mt-14">
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-3xl text-ink">Related ideas</h2>
              <MicroLabel>The lattice</MicroLabel>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              Where this thought connects
            </p>
            <div className="mt-6">
              {related.map((r) => (
                <RelatedCard key={r.id} node={r} />
              ))}
            </div>
          </section>
        )}

        <section className="mt-14 border-t border-line pt-8">
          <MicroLabel>Further reading</MicroLabel>
          <ul className="mt-4 space-y-3">
            {node.furtherReading.map((f) => (
              <li key={f.url} className="border-b border-line pb-3">
                <div className="flex items-baseline justify-between gap-4">
                  <span>
                    <span className="font-serif text-lg text-ink">
                      {f.label}
                    </span>
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
                  {(f.archive?.status === "full" || f.archive?.status === "excerpt") && f.archive.path && (
                    <a
                      href={`/${f.archive.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent hover:underline flex items-center gap-1"
                    >
                      <span>↓ Read offline</span>
                    </a>
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

        <div className="mt-10 flex items-center gap-3">
          <button
            onClick={() => toggleBookmark(node.id)}
            className="flex items-center gap-2 border border-line px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink hover:border-ink"
          >
            <span className={hydrated && bookmarked ? "text-accent" : "text-ink-soft"}>★</span>
            <span>{hydrated && bookmarked ? "Bookmarked" : "Bookmark"}</span>
          </button>
        </div>

        {nextConnection && (
          <section className="mt-14 border-t border-accent/40 pt-8">
            <MicroLabel className="text-accent">Follow the thread</MicroLabel>
            <p className="mt-3 font-serif text-xl leading-snug text-ink">
              If you liked <span className="italic">{node.title}</span>, here's how it connects to{" "}
              <span className="italic">{nextConnection.title}</span>.
            </p>
            <Link
              to="/node/$id"
              params={{ id: nextConnection.id }}
              className="mt-5 inline-flex items-center justify-center border border-ink bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
            >
              Read next →
            </Link>
          </section>
        )}
      </article>
      <AudioBar sentenceCount={totalSents} />
    </>
  );
}
