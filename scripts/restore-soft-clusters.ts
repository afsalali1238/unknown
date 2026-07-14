import { Project, SyntaxKind, ObjectLiteralExpression } from "ts-morph";

async function run() {
  const project = new Project();
  const oldSource = project.addSourceFileAtPath("src/data/old_nodes.ts");
  const newSource = project.addSourceFileAtPath("src/data/nodes.ts");

  const CLUSTER_MAP: Record<string, string> = {
    B: "J", // Mental Models -> J
    C: "K", // Compounding & Time -> K
    D: "L", // Decision-Making -> L
    E: "M", // Systems & Incentives -> M
    H: "N", // Craft & Focus -> N
    N: "O", // Mind, Self & Meaning -> O
    O: "P", // Naval Ravikant -> P
    P: "Q", // Practical Wisdom -> Q
  };

  const oldClustersDecl = oldSource.getVariableDeclaration("CLUSTERS");
  const newClustersDecl = newSource.getVariableDeclaration("CLUSTERS");

  if (oldClustersDecl && newClustersDecl) {
    const oldArray = oldClustersDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    const newArray = newClustersDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);

    if (oldArray && newArray) {
      for (const el of oldArray.getElements()) {
        if (el.getKind() === SyntaxKind.ObjectLiteralExpression) {
          const obj = el as ObjectLiteralExpression;
          const idProp = obj.getProperty("id") || obj.getProperty('"id"');
          if (idProp) {
            const idVal = idProp.getText().split(":")[1].replace(/["']/g, "").trim();
            if (CLUSTER_MAP[idVal]) {
              const newId = CLUSTER_MAP[idVal];
              const newText = obj
                .getText()
                .replace(new RegExp(`id:\\s*["']${idVal}["']`), `id: "${newId}"`);
              newArray.addElement(newText);
            }
          }
        }
      }
    }
  }

  const oldNodesDecl = oldSource.getVariableDeclaration("NODES");
  const newNodesDecl = newSource.getVariableDeclaration("NODES");

  if (oldNodesDecl && newNodesDecl) {
    const oldArray = oldNodesDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    const newArray = newNodesDecl.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);

    if (oldArray && newArray) {
      for (const el of oldArray.getElements()) {
        if (el.getKind() === SyntaxKind.ObjectLiteralExpression) {
          const obj = el as ObjectLiteralExpression;
          const clusterIdProp = obj.getProperty("clusterId") || obj.getProperty('"clusterId"');
          const idProp = obj.getProperty("id") || obj.getProperty('"id"');

          if (clusterIdProp && idProp) {
            const clusterIdVal = clusterIdProp.getText().split(":")[1].replace(/["']/g, "").trim();
            const idVal = idProp.getText().split(":")[1].replace(/["']/g, "").trim();

            if (CLUSTER_MAP[clusterIdVal]) {
              const newClusterId = CLUSTER_MAP[clusterIdVal];
              const newId = idVal.replace(clusterIdVal, newClusterId);

              const newText = obj
                .getText()
                .replace(
                  new RegExp(`clusterId:\\s*["']${clusterIdVal}["']`),
                  `clusterId: "${newClusterId}"`,
                )
                .replace(new RegExp(`id:\\s*["']${idVal}["']`), `id: "${newId}"`);

              newArray.addElement(newText);
            }
          }
        }
      }
    }
  }

  await newSource.save();
  console.log("nodes.ts updated with restored clusters!");
}

run().catch(console.error);
