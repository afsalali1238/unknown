const fs = require("fs");
const lines = fs.readFileSync("../src/data/nodes.ts", "utf8");
const counts = {};
for (const m of lines.matchAll(/clusterId['"]?\\s*:\\s*["']([A-Z])["']/g)) {
  counts[m[1]] = (counts[m[1]] || 0) + 1;
}
console.log(counts);
