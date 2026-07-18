/**
 * topics-index.ts — regenerates docs/TOPICS-INDEX.md, a full internal directory of every
 * cluster (topic) and every node (id, title, author, category/subtopic) currently in
 * src/data/nodes.ts.
 *
 * This is NOT wired into any route or the public/ folder — it's a maintenance artifact for
 * checking coverage (e.g. "do we have a node for Atomic Habits yet?"), not a feature.
 *
 * Run after any content addition: `bun run scripts/topics-index.ts`
 * (also invoked automatically as the last step of the add-content skill's validate gate)
 */
import fs from "fs";
import path from "path";

type Node = Record<string, unknown> & {
  id: string;
  clusterId: string;
  title: string;
  author?: string;
  year?: number;
  category?: string;
  subtopicId?: string;
};

async function main() {
  const mod = await import(path.join(process.cwd(), "src/data/nodes.ts"));
  const NODES: Node[] = mod.NODES;
  const CLUSTERS: { id: string; title: string; subtitle?: string }[] = mod.CLUSTERS;

  const lines: string[] = [];
  lines.push("# Topics Index (auto-generated — do not hand-edit)");
  lines.push("");
  lines.push(
    `Regenerate with \`bun run scripts/topics-index.ts\`. Last generated: ${new Date().toISOString().slice(0, 10)}.`,
  );
  lines.push(`Total clusters: ${CLUSTERS.length}. Total nodes: ${NODES.length}.`);
  lines.push("");
  lines.push("Internal reference only — not linked from the app, not served from public/.");
  lines.push("");

  for (const c of CLUSTERS) {
    const nodes = NODES.filter((n) => n.clusterId === c.id).sort((a, b) =>
      a.id.localeCompare(b.id, undefined, { numeric: true }),
    );
    lines.push(`## ${c.id} — ${c.title} (${nodes.length})`);
    if (c.subtitle) lines.push(`_${c.subtitle}_`);
    lines.push("");
    if (nodes.length === 0) {
      lines.push("_(no nodes yet)_");
    } else {
      lines.push("| id | title | author | category/subtopic |");
      lines.push("| --- | --- | --- | --- |");
      for (const n of nodes) {
        lines.push(
          `| ${n.id} | ${n.title} | ${n.author ?? ""} | ${n.subtopicId ?? n.category ?? ""} |`,
        );
      }
    }
    lines.push("");
  }

  const outPath = path.join(process.cwd(), "docs/TOPICS-INDEX.md");
  fs.writeFileSync(outPath, lines.join("\n") + "\n");
  console.log(`Wrote ${outPath} — ${NODES.length} nodes across ${CLUSTERS.length} clusters.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
