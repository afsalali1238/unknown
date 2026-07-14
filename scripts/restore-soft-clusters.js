import * as fs from "fs";

function run() {
  const oldCode = fs.readFileSync("src/data/old_nodes.ts", "utf8");
  let newCode = fs.readFileSync("src/data/nodes.ts", "utf8");

  const CLUSTER_MAP = {
    B: "J",
    C: "K",
    D: "L",
    E: "M",
    H: "N",
    N: "O",
    O: "P",
    P: "Q",
  };

  // Find clusters in oldCode
  const oldClustersMatch = oldCode.match(/export const CLUSTERS: Cluster\[\] = \[([\s\S]*?)\];/);
  if (oldClustersMatch) {
    const oldClustersStr = oldClustersMatch[1];
    let toAppend = "";

    // Split by { id: "..."
    const clusterMatches = oldClustersStr.matchAll(/\{\s*id:\s*["']([A-Z])["'][\s\S]*?\}/g);
    for (const match of clusterMatches) {
      const id = match[1];
      if (CLUSTER_MAP[id]) {
        toAppend +=
          ",\n  " +
          match[0].replace(new RegExp(`id:\\s*["']${id}["']`), `id: "${CLUSTER_MAP[id]}"`);
      }
    }

    newCode = newCode.replace(
      /export const CLUSTERS: Cluster\[\] = \[([\s\S]*?)\];/,
      (match, p1) => {
        // remove trailing comma or spaces from p1
        let cleaned = p1.trimEnd();
        if (cleaned.endsWith(",")) cleaned = cleaned.slice(0, -1);
        return `export const CLUSTERS: Cluster[] = [\n${cleaned}${toAppend}\n];`;
      },
    );
  }

  // Find nodes in oldCode
  // The NODES array might be huge, so we should be careful.
  const oldNodesMatch = oldCode.match(
    /export const NODES: Node\[\] = \[([\s\S]*?)(?=\nexport const NODE_BY_ID)/,
  );
  if (oldNodesMatch) {
    const oldNodesStr = oldNodesMatch[1];
    let nodesToAppend = "";

    // We can use a regex to match each object literal in the array.
    // They start with { id: "..." and end with },
    const nodeMatches = oldNodesStr.matchAll(/\{\s*id:\s*["']([A-Z0-9]+)["'][\s\S]*?\n\s*\}/g);
    for (const match of nodeMatches) {
      const id = match[1]; // e.g. "B1"
      const clusterIdMatch = match[0].match(/clusterId:\s*["']([A-Z])["']/);
      if (clusterIdMatch) {
        const clusterId = clusterIdMatch[1];
        if (CLUSTER_MAP[clusterId]) {
          const newClusterId = CLUSTER_MAP[clusterId];
          const newId = id.replace(clusterId, newClusterId);

          let newNodeStr = match[0]
            .replace(
              new RegExp(`clusterId:\\s*["']${clusterId}["']`),
              `clusterId: "${newClusterId}"`,
            )
            .replace(new RegExp(`id:\\s*["']${id}["']`), `id: "${newId}"`);

          nodesToAppend += ",\n  " + newNodeStr;
        }
      }
    }

    newCode = newCode.replace(/export const NODES: Node\[\] = \[([\s\S]*?)\n\];/, (match, p1) => {
      let cleaned = p1.trimEnd();
      if (cleaned.endsWith(",")) cleaned = cleaned.slice(0, -1);
      return `export const NODES: Node[] = [\n${cleaned}${nodesToAppend}\n];`;
    });
  }

  fs.writeFileSync("src/data/nodes.ts", newCode);
  console.log("Re-merged nodes.ts!");
}

run();
