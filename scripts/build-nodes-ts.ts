import * as fs from "fs";

// To avoid parsing TS, I will just read the current state of both arrays by executing them if I remove the types, but we are in a TS environment using tsx!

async function run() {
  // Read using dynamic import
  const oldModule = await import("../src/data/old_nodes.ts");
  const newModule = await import("../src/data/nodes.ts");

  const CLUSTER_MAP = {
    B: "J",
    C: "K",
    D: "L",
    E: "M",
    H: "N",
    N: "O",
    O: "P",
    P: "Q",
  };

  const finalClusters = [...newModule.CLUSTERS];
  const finalNodes = [...newModule.NODES];

  for (const cluster of oldModule.CLUSTERS) {
    if (CLUSTER_MAP[cluster.id]) {
      const newCluster = { ...cluster, id: CLUSTER_MAP[cluster.id] };
      finalClusters.push(newCluster);
    }
  }

  for (const node of oldModule.NODES) {
    if (CLUSTER_MAP[node.clusterId]) {
      const newClusterId = CLUSTER_MAP[node.clusterId];
      const newId = node.id.replace(node.clusterId, newClusterId);
      const newNode = { ...node, clusterId: newClusterId, id: newId };
      finalNodes.push(newNode);
    }
  }

  const fileContent = `export type Node = {
  id: string;
  clusterId: string;
  title: string;
  author: string;
  year: number;
  medium: string;
  category: string;
  thesis: string;
  layer0: string;
  layer1: string;
  layer2: string;
  quiz: { question: string; options: string[]; correctIndex: number };
  related: string[];
  furtherReading: {
    label: string;
    source: string;
    url: string;
    archive?: {
      status: "full" | "excerpt" | "unavailable";
      path?: string;
      retrieved?: string;
    };
  }[];
  tags: string[];
};

export const TAGS = [
  "Startups & Founders",
  "Moats & Network Effects",
  "Incentives & Systems",
  "Compounding & Patience",
  "Risk & Asymmetric Bets",
  "Cognitive Biases & Models",
  "Decision-Making",
  "First-Principles Thinking",
  "Markets & Narrative",
  "Wealth, Leverage & Judgment",
  "Craft & Deep Work",
  "Crypto & Trust",
  "Macro & Cycles",
  "Fraud & Skepticism",
  "Tech Adoption & Disruption",
  "AI & the Future",
  "Power & Persuasion",
  "Meaning & Self",
  "Health & Body",
] as const;
export type Tag = (typeof TAGS)[number];

export type Cluster = { id: string; title: string; subtitle: string };

export const CLUSTERS: Cluster[] = ${JSON.stringify(finalClusters, null, 2)};

export const NODES: Node[] = ${JSON.stringify(finalNodes, null, 2)};

export const NODE_BY_ID: Record<string, Node> = NODES.reduce((acc, node) => {
  acc[node.id] = node;
  return acc;
}, {} as Record<string, Node>);

export const NODES_BY_CLUSTER: Record<string, Node[]> = CLUSTERS.reduce((acc, cluster) => {
  acc[cluster.id] = NODES.filter((n) => n.clusterId === cluster.id);
  return acc;
}, {} as Record<string, Node[]>);

export const CLUSTER_BY_ID: Record<string, Cluster> = CLUSTERS.reduce((acc, cluster) => {
  acc[cluster.id] = cluster;
  return acc;
}, {} as Record<string, Cluster>);
`;

  fs.writeFileSync("src/data/nodes.ts", fileContent);
  console.log(
    "Successfully rebuilt nodes.ts with",
    finalClusters.length,
    "clusters and",
    finalNodes.length,
    "nodes.",
  );
}

run().catch(console.error);
