/**
 * validate-nodes.ts — schema validator for src/data/nodes.ts
 *
 * READ-ONLY. Never mutates nodes.ts or any file. Exits 1 if any ERROR is found,
 * 0 otherwise. Warnings never fail the build.
 *
 * Run from repo root:
 *   bun run _rebuild-staging/scripts/validate-nodes.ts
 *   bun run _rebuild-staging/scripts/validate-nodes.ts --quiet   # errors only
 *
 * After moving into place: bun run scripts/validate-nodes.ts
 *
 * Checks (ERROR unless noted):
 *   - id is a non-empty string and unique
 *   - clusterId exists in CLUSTERS
 *   - every tag is a member of TAGS
 *   - quiz.options has 3 or 4 entries; correctIndex is an integer in 0..len-1
 *   - every related id resolves to a real node
 *   - each furtherReading entry has non-empty label, source, url
 *   - archive.status (if present) is one of full | excerpt | unavailable
 *   - archive.path (required when status is full/excerpt) points at a file that
 *     exists on disk under public/<path>  (path is the served URL, e.g.
 *     "content/sources/A1-0.md" -> public/content/sources/A1-0.md)
 *   - (WARN) related is empty; quiz.explanation missing; id doesn't match clusterId prefix
 */
import path from "path";
import fs from "fs";

type Archive = { status?: string; path?: string; retrieved?: string };
type FurtherReading = {
  label?: string;
  source?: string;
  url?: string;
  type?: string;
  archive?: Archive;
};
type Quiz = { question?: string; options?: string[]; correctIndex?: number; explanation?: string };
type Node = {
  id?: string;
  clusterId?: string;
  quiz?: Quiz;
  related?: string[];
  furtherReading?: FurtherReading[];
  tags?: string[];
};

const ARCHIVE_STATUSES = new Set(["full", "excerpt", "unavailable"]);
const PUBLIC_DIR = path.join(process.cwd(), "public");

const errors: string[] = [];
const warnings: string[] = [];
const err = (id: string, msg: string) => errors.push(`  [${id}] ${msg}`);
const warn = (id: string, msg: string) => warnings.push(`  [${id}] ${msg}`);

async function main() {
  const quiet = process.argv.includes("--quiet");
  const nodesPath = path.join(process.cwd(), "src/data/nodes.ts");
  const mod = await import(nodesPath);
  const NODES: Node[] = mod.NODES;
  const CLUSTERS: { id: string }[] = mod.CLUSTERS;
  const TAGS: readonly string[] = mod.TAGS;

  if (!Array.isArray(NODES)) throw new Error("NODES export not found or not an array");
  const clusterIds = new Set(CLUSTERS.map((c) => c.id));
  const tagSet = new Set(TAGS);
  const idSet = new Set<string>();

  // First pass: collect ids so related-checks can resolve forward references
  for (const n of NODES) if (typeof n.id === "string") idSet.add(n.id);

  const seen = new Set<string>();
  for (const n of NODES) {
    const id = typeof n.id === "string" && n.id ? n.id : "<missing-id>";

    if (id === "<missing-id>") {
      err(id, "node is missing a string id");
    } else if (seen.has(id)) {
      err(id, "duplicate id");
    }
    seen.add(id);

    // clusterId
    if (!n.clusterId || !clusterIds.has(n.clusterId)) {
      err(id, `clusterId "${n.clusterId}" not found in CLUSTERS`);
    } else if (id !== "<missing-id>" && !id.startsWith(n.clusterId)) {
      warn(id, `id does not start with its clusterId "${n.clusterId}"`);
    }

    // tags
    for (const t of n.tags ?? []) {
      if (!tagSet.has(t)) err(id, `tag "${t}" is not in TAGS`);
    }

    // quiz
    const q = n.quiz;
    if (!q) {
      err(id, "missing quiz");
    } else {
      const optLen = Array.isArray(q.options) ? q.options.length : 0;
      if (optLen < 3 || optLen > 4) {
        err(id, `quiz.options must have 3 or 4 entries (has ${optLen})`);
      }
      const maxIdx = Math.max(optLen - 1, 0);
      if (
        typeof q.correctIndex !== "number" ||
        !Number.isInteger(q.correctIndex) ||
        q.correctIndex < 0 ||
        q.correctIndex > maxIdx
      ) {
        err(id, `quiz.correctIndex must be an integer 0..${maxIdx} (is ${q.correctIndex})`);
      }
      if (!q.explanation) warn(id, "quiz has no explanation");
    }

    // related
    for (const r of n.related ?? []) {
      if (!idSet.has(r)) err(id, `related id "${r}" does not resolve to a real node`);
    }
    if ((n.related ?? []).length === 0) warn(id, "node has no related links");

    // furtherReading
    (n.furtherReading ?? []).forEach((f, i) => {
      const tag = `furtherReading[${i}]`;
      if (!f.label) err(id, `${tag} missing label`);
      if (!f.source) err(id, `${tag} missing source`);
      if (!f.url) err(id, `${tag} missing url`);
      const a = f.archive;
      if (a) {
        if (!a.status || !ARCHIVE_STATUSES.has(a.status)) {
          err(id, `${tag}.archive.status "${a.status}" invalid (full|excerpt|unavailable)`);
        }
        if (a.status === "full" || a.status === "excerpt") {
          if (!a.path) {
            err(id, `${tag}.archive.status is "${a.status}" but path is missing`);
          } else {
            const disk = path.join(PUBLIC_DIR, a.path);
            if (!fs.existsSync(disk)) {
              err(id, `${tag}.archive.path "${a.path}" -> missing file public/${a.path}`);
            }
          }
        }
      }
    });
  }

  // Report
  console.log(`Validated ${NODES.length} nodes.`);
  if (!quiet && warnings.length) {
    console.log(`\n${warnings.length} WARNING(S):`);
    console.log(warnings.join("\n"));
  }
  if (errors.length) {
    console.log(`\n${errors.length} ERROR(S):`);
    console.log(errors.join("\n"));
    console.log("\nFAIL");
    process.exit(1);
  }
  console.log("\nOK — no errors.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
