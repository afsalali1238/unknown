import fs from "fs";
const ts = fs.readFileSync("./src/data/nodes.ts", "utf8");
console.log("clusterId match:", (ts.match(/clusterId/g) || []).length);
console.log("Nodes array:", (ts.match(/\\{[\\s\\S]*?\\}/g) || []).length);
