import * as fs from "fs";
import * as path from "path";

function run() {
  const sourcesDir = path.join(process.cwd(), "content", "sources");
  const files = fs.readdirSync(sourcesDir);

  const CLUSTER_MAP: Record<string, string> = {
    B: "J",
    C: "K",
    D: "L",
    E: "M",
    H: "N",
    N: "O",
    O: "P",
    P: "Q",
  };

  // We only want to rename files that were RESTORED from the soft clusters.
  // Wait! The new clusters are B, C, D, E, H.
  // We don't want to accidentally rename the NEW B, C, D, E, H files that we just downloaded!
  // To differentiate: we can look at the `nodes.ts` file to see what files SHOULD exist for the new clusters.
  // Actually, wait, when I ran git restore, it overwrote the NEW files if they shared a name?
  // e.g., git restore content/sources/B1-0.md overwrote the new B1-0.md with the OLD B1-0.md!
}
