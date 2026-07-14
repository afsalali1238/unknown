import * as ts from "typescript";
import * as fs from "fs";

function extractNodes() {
  const code = fs.readFileSync("epistemoph.js", "utf8");
  // Find "nr=[{id:"
  const start = code.indexOf("nr=[{id:");
  // We need to parse just the array literal. Since the file is huge, let's truncate.
  const snippet = "const " + code.substring(start, start + 1000000);

  const sourceFile = ts.createSourceFile("temp.js", snippet, ts.ScriptTarget.Latest, true);

  let result = null;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText() === "nr") {
      if (node.initializer && ts.isArrayLiteralExpression(node.initializer)) {
        // Evaluate it by generating code?
        // Let's just write the node's text out to a separate file, then we can execute it.
        const arrayCode = "module.exports = " + node.initializer.getText();
        fs.writeFileSync("extracted_nodes.js", arrayCode);
        result = true;
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  if (result) console.log("Extracted to extracted_nodes.js");
  else console.log("Failed to find nr");
}

extractNodes();
