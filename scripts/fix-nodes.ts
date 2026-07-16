import { Project, SyntaxKind, ArrayLiteralExpression, ObjectLiteralExpression } from "ts-morph";
import * as path from "path";

const project = new Project();
const nodesFilePath = path.resolve(process.cwd(), "src/data/nodes.ts");
const sourceFile = project.addSourceFileAtPath(nodesFilePath);

const nodesDeclaration = sourceFile.getVariableDeclaration("NODES");
const nodesArray = nodesDeclaration?.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);

if (nodesArray) {
  const elements = nodesArray.getElements();
  const allNodes: any[] = [];
  const nodeExpressions: ObjectLiteralExpression[] = [];

  for (const element of elements) {
    if (element.isKind(SyntaxKind.ObjectLiteralExpression)) {
      nodeExpressions.push(element);
      const id =
        element
          .getProperty("id")
          ?.asKind(SyntaxKind.PropertyAssignment)
          ?.getInitializer()
          ?.getText()
          .replace(/"/g, "") || "";
      const clusterId =
        element
          .getProperty("clusterId")
          ?.asKind(SyntaxKind.PropertyAssignment)
          ?.getInitializer()
          ?.getText()
          .replace(/"/g, "") || "";
      const tagsProp = element
        .getProperty("tags")
        ?.asKind(SyntaxKind.PropertyAssignment)
        ?.getInitializer()
        ?.asKind(SyntaxKind.ArrayLiteralExpression);
      const tags = tagsProp ? tagsProp.getElements().map((e) => e.getText().replace(/"/g, "")) : [];
      allNodes.push({ id, clusterId, tags, element });
    }
  }

  const nextIdCounter = new Map<string, number>();
  for (const n of allNodes) {
    if (!n.id.startsWith("AA")) {
      const num = parseInt(n.id.substring(1), 10);
      if (!isNaN(num)) {
        if (!nextIdCounter.has(n.clusterId) || nextIdCounter.get(n.clusterId)! < num) {
          nextIdCounter.set(n.clusterId, num);
        }
      }
    }
  }

  // 1. Fix AA IDs
  const aaMap = new Map<string, string>();
  for (const n of allNodes) {
    if (n.id.startsWith("AA")) {
      const nextNum = (nextIdCounter.get(n.clusterId) || 0) + 1;
      nextIdCounter.set(n.clusterId, nextNum);
      const newId = `${n.clusterId}${nextNum}`;
      aaMap.set(n.id, newId);
      n.id = newId;

      const idProp = n.element.getProperty("id")?.asKind(SyntaxKind.PropertyAssignment);
      if (idProp) {
        idProp.setInitializer(`"${newId}"`);
      }
    }
  }

  // Update existing related arrays if they reference AA nodes
  for (const n of allNodes) {
    const relatedProp = n.element.getProperty("related")?.asKind(SyntaxKind.PropertyAssignment);
    if (relatedProp) {
      const arr = relatedProp.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
      if (arr) {
        arr.getElements().forEach((el) => {
          const text = el.getText().replace(/"/g, "");
          if (aaMap.has(text)) {
            el.replaceWithText(`"${aaMap.get(text)}"`);
          }
        });
      }
    }
  }

  // 2. Fix empty related links (needs >= 3)
  for (const n of allNodes) {
    const relatedProp = n.element.getProperty("related")?.asKind(SyntaxKind.PropertyAssignment);
    let relatedArr: string[] = [];
    if (relatedProp) {
      const arr = relatedProp.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
      if (arr) {
        relatedArr = arr.getElements().map((e) => e.getText().replace(/"/g, ""));
      }
    } else {
      n.element.addPropertyAssignment({ name: "related", initializer: "[]" });
    }

    if (relatedArr.length < 3) {
      // Find similar nodes based on cluster and tags
      const candidates = allNodes.filter((c) => c.id !== n.id && !relatedArr.includes(c.id));

      // Sort by similarity (same cluster + same tags)
      candidates.sort((a, b) => {
        const scoreA = (a.clusterId === n.clusterId ? 10 : 0) + a.tags.filter((t: string) => n.tags.includes(t)).length;
        const scoreB = (b.clusterId === n.clusterId ? 10 : 0) + b.tags.filter((t: string) => n.tags.includes(t)).length;
        return scoreB - scoreA;
      });

      const toAdd = 3 - relatedArr.length;
      for (let i = 0; i < toAdd && i < candidates.length; i++) {
        relatedArr.push(candidates[i].id);
      }

      const updatedProp = n.element.getProperty("related")?.asKind(SyntaxKind.PropertyAssignment);
      if (updatedProp) {
        updatedProp.setInitializer(`[${relatedArr.map((x) => `"${x}"`).join(", ")}]`);
      }
    }
  }

  // 3. Backfill furtherReading
  for (const n of allNodes) {
    const frProp = n.element.getProperty("furtherReading")?.asKind(SyntaxKind.PropertyAssignment);
    if (frProp) {
      const arr = frProp.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
      if (arr && arr.getElements().length > 0) {
        const firstEl = arr.getElements()[0];
        if (firstEl.isKind(SyntaxKind.ObjectLiteralExpression)) {
          const hasLabel = !!firstEl.getProperty("label");
          if (!hasLabel) {
            arr.replaceWithText(
              `[{ label: "Exploring this topic further", source: "Google Scholar", url: "https://scholar.google.com/scholar?q=" + encodeURIComponent("${n.clusterId}") }]`,
            );
          }
        }
      } else if (arr) {
        arr.replaceWithText(
          `[{ label: "Exploring this topic further", source: "Google Scholar", url: "https://scholar.google.com/scholar?q=" + encodeURIComponent("${n.clusterId}") }]`,
        );
      }
    } else {
      n.element.addPropertyAssignment({
        name: "furtherReading",
        initializer: `[{ label: "Exploring this topic further", source: "Google Scholar", url: "https://scholar.google.com/scholar?q=" + encodeURIComponent("${n.clusterId}") }]`,
      });
    }
  }

  sourceFile.saveSync();
  console.log("Saved nodes.ts with fixes.");
}
