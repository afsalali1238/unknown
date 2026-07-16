/**
 * audit-content.ts — generalized content audit (replaces root-level find-health.ts).
 *
 * READ-ONLY. Inspects any tag, cluster, or field for consistency and coverage.
 *
 * Usage (from repo root):
 *   bun run scripts/audit-content.ts summary            # counts per cluster & per tag
 *   bun run scripts/audit-content.ts tag "Health & Body"
 *   bun run scripts/audit-content.ts cluster A
 *   bun run scripts/audit-content.ts field author       # missing/empty + distribution
 *   bun run scripts/audit-content.ts orphans            # nodes with no related links
 *   bun run scripts/audit-content.ts dupes title        # duplicate values of a field
 */
import path from "path";

type Node = Record<string, unknown> & {
  id: string;
  clusterId: string;
  tags?: string[];
  related?: string[];
};

function table(rows: [string, string | number][], head: [string, string]) {
  const w = Math.max(head[0].length, ...rows.map((r) => String(r[0]).length));
  console.log(`${head[0].padEnd(w)}  ${head[1]}`);
  console.log(`${"-".repeat(w)}  ${"-".repeat(head[1].length)}`);
  for (const [a, b] of rows) console.log(`${String(a).padEnd(w)}  ${b}`);
}

async function main() {
  const [cmd, arg] = [process.argv[2] ?? "summary", process.argv[3]];
  const mod = await import(path.join(process.cwd(), "src/data/nodes.ts"));
  const NODES: Node[] = mod.NODES;
  const CLUSTERS: { id: string; title: string }[] = mod.CLUSTERS;
  const TAGS: readonly string[] = mod.TAGS;

  switch (cmd) {
    case "summary": {
      console.log(`Total nodes: ${NODES.length}\n`);
      const byCluster = CLUSTERS.map(
        (c) =>
          [`${c.id} ${c.title}`, NODES.filter((n) => n.clusterId === c.id).length] as [
            string,
            number,
          ],
      );
      table(byCluster, ["Cluster", "Nodes"]);
      console.log();
      const tagCount = new Map<string, number>();
      for (const n of NODES)
        for (const t of n.tags ?? []) tagCount.set(t, (tagCount.get(t) ?? 0) + 1);
      const tagRows = [...tagCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([t, c]) => {
          const known = TAGS.includes(t) ? "" : "  ⚠ not in TAGS";
          return [`${t}${known}`, c] as [string, number];
        });
      table(tagRows, ["Tag", "Uses"]);
      break;
    }
    case "tag": {
      if (!arg) return console.error('Usage: audit-content.ts tag "<Tag>"');
      const hits = NODES.filter((n) => (n.tags ?? []).includes(arg));
      console.log(`${hits.length} node(s) tagged "${arg}":`);
      for (const n of hits) console.log(`  ${n.id}  [${n.clusterId}]  ${n.title}`);
      break;
    }
    case "cluster": {
      if (!arg) return console.error("Usage: audit-content.ts cluster <ID>");
      const hits = NODES.filter((n) => n.clusterId === arg);
      console.log(`${hits.length} node(s) in cluster ${arg}:`);
      for (const n of hits) console.log(`  ${n.id}  ${n.title}`);
      break;
    }
    case "field": {
      if (!arg) return console.error("Usage: audit-content.ts field <name>");
      const missing = NODES.filter(
        (n) =>
          n[arg] === undefined || n[arg] === "" || (Array.isArray(n[arg]) && n[arg].length === 0),
      );
      console.log(
        `Field "${arg}": ${NODES.length - missing.length}/${NODES.length} populated, ${missing.length} empty/missing.`,
      );
      for (const n of missing) console.log(`  empty: ${n.id}  ${n.title}`);
      break;
    }
    case "orphans": {
      const noRelated = NODES.filter((n) => (n.related ?? []).length === 0);
      const inbound = new Set<string>();
      for (const n of NODES) for (const r of n.related ?? []) inbound.add(r);
      const noInbound = NODES.filter((n) => !inbound.has(n.id));
      console.log(`${noRelated.length} node(s) with no outgoing related links:`);
      for (const n of noRelated) console.log(`  ${n.id}  ${n.title}`);
      console.log(
        `\n${noInbound.length} node(s) with no incoming links (nothing relates to them):`,
      );
      for (const n of noInbound) console.log(`  ${n.id}  ${n.title}`);
      break;
    }
    case "dupes": {
      if (!arg) return console.error("Usage: audit-content.ts dupes <field>");
      const seen = new Map<string, string[]>();
      for (const n of NODES) {
        const v = String(n[arg]).trim().toLowerCase();
        if (!seen.has(v)) seen.set(v, []);
        seen.get(v)!.push(n.id);
      }
      const dupes = [...seen.entries()].filter(([, ids]) => ids.length > 1);
      console.log(`${dupes.length} duplicate value(s) of "${arg}":`);
      for (const [v, ids] of dupes) console.log(`  "${v}" -> ${ids.join(", ")}`);
      break;
    }
    default:
      console.error(
        `Unknown command "${cmd}". Try: summary | tag | cluster | field | orphans | dupes`,
      );
      process.exit(2);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
