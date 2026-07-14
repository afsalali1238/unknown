import * as fs from "fs";
import * as path from "path";

const CLUSTERS = [
  {
    id: "A",
    title: "Startup Fundamentals",
    subtitle: "How founders think about building something from nothing",
  },
  {
    id: "B",
    title: "Company Origins",
    subtitle: "The actual pitch decks and memos that started famous companies",
  },
  {
    id: "C",
    title: "Fraud & Short Cases",
    subtitle: "How professional skeptics spot a lie in a balance sheet",
  },
  {
    id: "D",
    title: "Macro & Investing",
    subtitle: "Cycles, debt, and reading the economy like a value investor",
  },
  { id: "E", title: "Finance Theory", subtitle: "The math that priced risk itself" },
  {
    id: "F",
    title: "Foundational Tech",
    subtitle: "The plumbing ideas the entire internet sits on",
  },
  {
    id: "G",
    title: "AI / ML Papers",
    subtitle: "The technical papers that built the modern AI stack, in order",
  },
  { id: "H", title: "Crypto", subtitle: "The whitepapers behind Bitcoin, Ethereum, and DeFi" },
  {
    id: "I",
    title: "Worldview & Futurism",
    subtitle: "The biggest, most abstract bets on how the future unfolds",
  },
];

const nodesJS = fs.readFileSync("extracted_nodes.js", "utf8");
const createNodes = new Function("return " + nodesJS.replace("module.exports = ", ""));
const nodes = createNodes();

// Clean up nodes and conform to local schema
const finalNodes = nodes.map((n) => {
  // We keep id, clusterId, title, author, year, medium, category, thesis, layer0, layer1, layer2, quiz, furtherReading
  return {
    id: n.id,
    clusterId: n.clusterId,
    title: n.title,
    author: n.author,
    year: n.year,
    medium: n.medium,
    category: n.category,
    thesis: n.thesis,
    layer0: n.layer0,
    layer1: n.layer1,
    layer2: n.layer2,
    quiz: n.quiz || { question: "Placeholder question", options: ["A", "B", "C"], correctIndex: 0 },
    related: n.related || [],
    furtherReading: n.furtherReading || [],
    tags: n.tags || [],
  };
});

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

export const CLUSTERS: Cluster[] = ${JSON.stringify(CLUSTERS, null, 2)};

export const NODES: Node[] = ${JSON.stringify(finalNodes, null, 2)};

export const NODE_BY_ID: Record<string, Node> = NODES.reduce((acc, node) => {
  acc[node.id] = node;
  return acc;
}, {} as Record<string, Node>);

export const NODES_BY_CLUSTER: Record<string, Node[]> = CLUSTERS.reduce((acc, cluster) => {
  acc[cluster.id] = NODES.filter((n) => n.clusterId === cluster.id);
  return acc;
}, {} as Record<string, Node[]>);
`;

fs.writeFileSync("src/data/nodes.ts", fileContent);
console.log("Wrote src/data/nodes.ts");

// Now remove all unwanted files in content/sources/
const sourcesDir = path.join(__dirname, "..", "content", "sources");
if (fs.existsSync(sourcesDir)) {
  const files = fs.readdirSync(sourcesDir);
  const validIds = new Set(finalNodes.map((n) => n.id));

  for (const file of files) {
    if (file.endsWith(".md")) {
      const id = file.replace(".md", "");
      if (!validIds.has(id)) {
        fs.unlinkSync(path.join(sourcesDir, file));
        console.log("Removed unwanted source file:", file);
      }
    }
  }
}
