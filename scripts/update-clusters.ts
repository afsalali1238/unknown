import { Project, SyntaxKind, ObjectLiteralExpression } from "ts-morph";
import * as fs from "fs";

async function run() {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath("src/data/nodes.ts");

  const clustersDecl = sourceFile.getVariableDeclaration("CLUSTERS");
  if (clustersDecl) {
    const arrayLiteral = clustersDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    if (arrayLiteral) {
      // Replace entire CLUSTERS array
      arrayLiteral.replaceWithText(`[
  { id: "A", title: "Startup Fundamentals", subtitle: "How founders think about building something from nothing" },
  { id: "B", title: "Company Origins", subtitle: "The actual pitch decks and memos that started famous companies" },
  { id: "C", title: "Fraud & Short Cases", subtitle: "How professional skeptics spot a lie in a balance sheet" },
  { id: "D", title: "Macro & Investing", subtitle: "Cycles, debt, and reading the economy like a value investor" },
  { id: "E", title: "Finance Theory", subtitle: "The math that priced risk itself" },
  { id: "F", title: "Foundational Tech", subtitle: "The plumbing ideas the entire internet sits on" },
  { id: "G", title: "AI / ML Papers", subtitle: "The technical papers that built the modern AI stack, in order" },
  { id: "H", title: "Crypto", subtitle: "The whitepapers behind Bitcoin, Ethereum, and DeFi" },
  { id: "I", title: "Worldview & Futurism", subtitle: "The biggest, most abstract bets on how the future unfolds" }
]`);
    }
  }

  const nodesDecl = sourceFile.getVariableDeclaration("NODES");
  if (nodesDecl) {
    const arrayLiteral = nodesDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    if (arrayLiteral) {
      const elements = arrayLiteral.getElements();

      const elementsToKeep = [];

      for (const el of elements) {
        if (el.getKind() === SyntaxKind.ObjectLiteralExpression) {
          const obj = el as ObjectLiteralExpression;
          const clusterIdProp = obj.getProperty("clusterId") || obj.getProperty('"clusterId"');
          const idProp = obj.getProperty("id") || obj.getProperty('"id"');

          if (clusterIdProp && idProp) {
            const clusterId = clusterIdProp.getText().split(":")[1].replace(/["']/g, "").trim();
            const id = idProp.getText().split(":")[1].replace(/["']/g, "").trim();

            // In the old structure:
            // A -> Startup Fundamentals
            // G -> Macro & Investing
            // F -> Crypto
            // The others we drop.

            if (clusterId === "A") {
              elementsToKeep.push(obj.getText());
            } else if (clusterId === "G") {
              // G was Macro & Investing, now it's D. ID was G1-G4, change to D1-D4
              const newId = id.replace("G", "D");
              const newText = obj
                .getText()
                .replace(/clusterId:\s*["']G["']/, 'clusterId: "D"')
                .replace(new RegExp(`id:\\s*["']${id}["']`), `id: "${newId}"`);
              elementsToKeep.push(newText);
            } else if (clusterId === "F") {
              // F was Crypto, now it's H. ID was F1-F4, change to H1-H4
              const newId = id.replace("F", "H");
              const newText = obj
                .getText()
                .replace(/clusterId:\s*["']F["']/, 'clusterId: "H"')
                .replace(new RegExp(`id:\\s*["']${id}["']`), `id: "${newId}"`);
              elementsToKeep.push(newText);
            }
          }
        }
      }

      arrayLiteral.replaceWithText(`[\n${elementsToKeep.join(",\n")}\n]`);
    }
  }

  await sourceFile.save();
  console.log("nodes.ts updated");
}

run().catch(console.error);
