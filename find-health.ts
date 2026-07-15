import { NODES } from "./src/data/nodes.js";

for (const node of NODES) {
  if (node.tags && node.tags.includes("Health & Body")) {
    console.log(node.id, node.title, node.clusterId);
  }
}
