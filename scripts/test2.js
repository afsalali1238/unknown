import fs from "fs";
const lines = fs.readFileSync("./src/data/nodes.ts", "utf8");
const m = lines.match(/id['"]?\\s*:\\s*["']([A-Z0-9]+)["']/g);
console.log(m ? m.slice(0, 50) : "none");
