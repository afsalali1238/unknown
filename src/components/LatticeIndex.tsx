import { Link } from "@tanstack/react-router";
import { CLUSTERS, NODES_BY_CLUSTER } from "@/data/nodes";

/**
 * The Lattice Index — the Map screen's "browse clusters" job (see
 * docs/PRODUCT-BRIEF.md §7.1). Every cluster is one row on a single
 * continuous thread; each row's knot is a live conic-gradient dial of how
 * much of that cluster has been opened. The thread is the literal
 * "latticework" the app is named for, not a decorative rule — read top to
 * bottom, it's the shape of what's left.
 */
export function LatticeIndex({
  visited,
  hydrated,
}: {
  visited: Record<string, boolean>;
  hydrated: boolean;
}) {
  const totalNodes = CLUSTERS.reduce((sum, c) => sum + (NODES_BY_CLUSTER[c.id]?.length ?? 0), 0);
  const totalVisited = hydrated
    ? CLUSTERS.reduce(
        (sum, c) => sum + (NODES_BY_CLUSTER[c.id] ?? []).filter((n) => visited[n.id]).length,
        0,
      )
    : 0;

  return (
    <section aria-labelledby="lattice-index-heading">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="lattice-index-heading" className="font-serif text-2xl leading-tight text-ink">
          The Lattice
        </h2>
        {hydrated ? (
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
            {totalVisited} of {totalNodes} opened
          </p>
        ) : (
          <span aria-hidden="true" className="h-3 w-24 animate-pulse rounded-full bg-line" />
        )}
      </div>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
        {CLUSTERS.length} clusters, every idea on the map
      </p>

      <ul className="mt-6 flex flex-col">
        {CLUSTERS.map((cluster, i) => {
          const nodes = NODES_BY_CLUSTER[cluster.id] ?? [];
          const total = nodes.length;
          const visitedCount = hydrated ? nodes.filter((n) => visited[n.id]).length : 0;
          const pct = total > 0 ? Math.round((visitedCount / total) * 100) : 0;
          const isFirst = i === 0;
          const isLast = i === CLUSTERS.length - 1;

          return (
            <li key={cluster.id}>
              <Link
                to="/explore"
                search={{ cluster: cluster.id }}
                className="group flex min-h-11 items-stretch gap-3 outline-none"
                aria-label={`${cluster.title}, ${total} ideas, ${visitedCount} opened`}
              >
                <span aria-hidden="true" className="flex w-5 shrink-0 flex-col items-center">
                  <span className={`w-px flex-1 ${isFirst ? "bg-transparent" : "bg-line"}`} />
                  <span
                    className="my-[3px] h-2.5 w-2.5 shrink-0 rounded-full border border-line transition-[background] duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:border-accent"
                    style={{
                      backgroundImage:
                        pct > 0
                          ? `conic-gradient(var(--color-accent) ${pct}%, var(--color-paper) 0)`
                          : undefined,
                    }}
                  />
                  <span className={`w-px flex-1 ${isLast ? "bg-transparent" : "bg-line"}`} />
                </span>

                <span className="flex min-w-0 flex-1 items-center justify-between gap-3 border-b border-line py-2.5 pr-1 group-last:border-b-0 group-hover:border-ink group-focus-visible:border-ink">
                  <span className="min-w-0">
                    <span className="block truncate font-serif text-base leading-snug text-ink group-hover:text-accent">
                      {cluster.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                      Cluster {cluster.id}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-ink-soft">{total}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Thread trails off rather than stopping dead — the lattice keeps
          going past what fits on one screen. */}
      <div
        aria-hidden="true"
        className="ml-[9px] h-6 w-px"
        style={{
          background: "linear-gradient(to bottom, var(--color-line), transparent)",
        }}
      />
    </section>
  );
}
