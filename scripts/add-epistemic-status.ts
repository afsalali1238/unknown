import { Project, SyntaxKind, ObjectLiteralExpression } from "ts-morph";
import * as path from "path";

const project = new Project();
const nodesFilePath = path.resolve(process.cwd(), "src/data/nodes.ts");
const sourceFile = project.addSourceFileAtPath(nodesFilePath);

// 1. Add epistemicStatus to Node type
const typeAlias = sourceFile.getTypeAlias("Node");
if (typeAlias) {
  const typeNode = typeAlias.getTypeNode();
  if (typeNode && typeNode.isKind(SyntaxKind.TypeLiteral)) {
    // Check if epistemicStatus already exists
    const hasStatus = typeNode.getMembers().some((m) => m.getText().includes("epistemicStatus"));
    if (!hasStatus) {
      typeNode.addProperty({
        name: "epistemicStatus",
        hasQuestionToken: true,
        type: '"Canonical" | "Contemporary" | "Speculative"',
      });
    }
  }
}

// 2. Assign epistemicStatus to all nodes
const nodesDeclaration = sourceFile.getVariableDeclaration("NODES");
const nodesArray = nodesDeclaration?.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);

if (nodesArray) {
  const elements = nodesArray.getElements();

  for (const element of elements) {
    if (element.isKind(SyntaxKind.ObjectLiteralExpression)) {
      const clusterId =
        element
          .getProperty("clusterId")
          ?.asKind(SyntaxKind.PropertyAssignment)
          ?.getInitializer()
          ?.getText()
          .replace(/"/g, "") || "";

      let status = "Contemporary";
      if (["X", "Y", "Z"].includes(clusterId)) {
        status = "Speculative";
      } else if (
        // Explicitly Canonical: primary-source clusters (A–F, P, W)
        // + mental-model / timeless-framework clusters where source year
        //   is a modern explainer but the idea itself is established
        //   (J=Mental Models, K=Compounding, L=Decision-Making, U=Cognitive Biases)
        ["A", "B", "C", "D", "E", "F", "J", "K", "L", "P", "U", "W"].includes(clusterId)
      ) {
        status = "Canonical";
      }

      // Year-based override: pre-1990 primary sources are foundational works
      // regardless of cluster — calling Montagu (1942) or Lorenz (1963)
      // "Contemporary" undercuts the whole tiering concept.
      const yearProp = element
        .getProperty("year")
        ?.asKind(SyntaxKind.PropertyAssignment)
        ?.getInitializer()
        ?.getText()
        .replace(/"/g, "");
      const year = yearProp ? parseInt(yearProp, 10) : NaN;
      if (!isNaN(year) && year <= 1990 && status === "Contemporary") {
        status = "Canonical";
      }

      const statusProp = element
        .getProperty("epistemicStatus")
        ?.asKind(SyntaxKind.PropertyAssignment);
      if (statusProp) {
        statusProp.setInitializer(`"${status}"`);
      } else {
        element.addPropertyAssignment({ name: "epistemicStatus", initializer: `"${status}"` });
      }
    }
  }

  sourceFile.saveSync();
  console.log("Saved nodes.ts with epistemicStatus.");
}
