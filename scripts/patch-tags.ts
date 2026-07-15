import { Project, SyntaxKind, ArrayLiteralExpression, ObjectLiteralExpression } from "ts-morph";

const project = new Project();
project.addSourceFilesAtPaths("src/data/nodes.ts");
const sourceFile = project.getSourceFileOrThrow("src/data/nodes.ts");

const nodesDeclaration = sourceFile.getVariableDeclarationOrThrow("NODES");
const nodesArray = nodesDeclaration.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const tagMap: Record<string, string[]> = {
  "Startups & Founders": ["A", "B"],
  "Moats & Network Effects": ["A", "B", "F"],
  "Markets & Narrative": ["D", "E", "C"],
  "Crypto & Trust": ["H"],
  "Macro & Cycles": ["D"],
  "Fraud & Skepticism": ["C"],
  "Tech Adoption & Disruption": ["F", "I"],
  "AI & the Future": ["G", "I", "Z"],
  "Health & Body": ["Q"],
};

for (const element of nodesArray.getElements()) {
  if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;
  const obj = element as ObjectLiteralExpression;

  const clusterIdProp = obj.getProperty("clusterId");
  if (!clusterIdProp || clusterIdProp.getKind() !== SyntaxKind.PropertyAssignment) continue;

  const clusterIdVal = clusterIdProp
    .getFirstChildByKind(SyntaxKind.StringLiteral)
    ?.getLiteralValue();
  if (!clusterIdVal) continue;

  const tagsProp = obj.getProperty("tags");
  let tagsArray: ArrayLiteralExpression;

  if (tagsProp && tagsProp.getKind() === SyntaxKind.PropertyAssignment) {
    tagsArray = tagsProp.getFirstChildByKindOrThrow(SyntaxKind.ArrayLiteralExpression);
  } else {
    continue; // should not happen
  }

  const existingTags = tagsArray.getElements().map((e) => e.getText().replace(/['"]/g, ""));

  const tagsToAdd = [];
  for (const [tag, clusters] of Object.entries(tagMap)) {
    if (clusters.includes(clusterIdVal) && !existingTags.includes(tag)) {
      tagsToAdd.push(tag);
    }
  }

  for (const tag of tagsToAdd) {
    tagsArray.addElement(`"${tag}"`);
  }
}

sourceFile.saveSync();
console.log("Tags patched successfully!");
