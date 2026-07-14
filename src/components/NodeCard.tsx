import { Link } from "@tanstack/react-router";
import type { Node } from "@/data/nodes";
import { MicroLabel } from "./MicroLabel";
import { ProgressRing } from "./ProgressRing";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hydrated";

export function NodeCard({ node }: { node: Node }) {
  const hydrated = useHydrated();
  const gotIt = useStore((s) => s.gotIt[node.id]);
  const box = useStore((s) => s.review[node.id]?.box ?? 0);
  return (
    <Link
      to="/node/$id"
      params={{ id: node.id }}
      className="group block w-64 shrink-0 snap-start border-l border-line pl-4 pr-2 py-2"
    >
      <div className="flex items-start justify-between gap-2">
        <MicroLabel>{node.medium}</MicroLabel>
        {hydrated &&
          (gotIt ? (
            <span className="font-mono text-[11px] text-accent">✓</span>
          ) : box > 0 ? (
            <ProgressRing box={box} />
          ) : null)}
      </div>
      <h3 className="mt-2 font-serif text-lg leading-snug text-ink group-hover:text-accent">
        {node.title}
      </h3>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
        {node.author} · {node.year}
      </p>
    </Link>
  );
}
