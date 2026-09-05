import { CLUSTER_A } from "./nodes/cluster-A.ts";
import { CLUSTER_B } from "./nodes/cluster-B.ts";
import { CLUSTER_C } from "./nodes/cluster-C.ts";
import { CLUSTER_D } from "./nodes/cluster-D.ts";
import { CLUSTER_E } from "./nodes/cluster-E.ts";
import { CLUSTER_F } from "./nodes/cluster-F.ts";
import { CLUSTER_G } from "./nodes/cluster-G.ts";
import { CLUSTER_H } from "./nodes/cluster-H.ts";
import { CLUSTER_I } from "./nodes/cluster-I.ts";
import { CLUSTER_J } from "./nodes/cluster-J.ts";
import { CLUSTER_K } from "./nodes/cluster-K.ts";
import { CLUSTER_L } from "./nodes/cluster-L.ts";
import { CLUSTER_M } from "./nodes/cluster-M.ts";
import { CLUSTER_N } from "./nodes/cluster-N.ts";
import { CLUSTER_O } from "./nodes/cluster-O.ts";
import { CLUSTER_P } from "./nodes/cluster-P.ts";
import { CLUSTER_Q } from "./nodes/cluster-Q.ts";
import { CLUSTER_R } from "./nodes/cluster-R.ts";
import { CLUSTER_S } from "./nodes/cluster-S.ts";
import { CLUSTER_T } from "./nodes/cluster-T.ts";
import { CLUSTER_U } from "./nodes/cluster-U.ts";
import { CLUSTER_V } from "./nodes/cluster-V.ts";
import { CLUSTER_W } from "./nodes/cluster-W.ts";
import { CLUSTER_X } from "./nodes/cluster-X.ts";
import { CLUSTER_Y } from "./nodes/cluster-Y.ts";
import { CLUSTER_Z } from "./nodes/cluster-Z.ts";
import { CLUSTER_AA } from "./nodes/cluster-AA.ts";
import { CLUSTER_AB } from "./nodes/cluster-AB.ts";
import { CLUSTER_AC } from "./nodes/cluster-AC.ts";
import { CLUSTER_AD } from "./nodes/cluster-AD.ts";
import { CLUSTER_AE } from "./nodes/cluster-AE.ts";
import { CLUSTER_AF } from "./nodes/cluster-AF.ts";
import { CLUSTER_AG } from "./nodes/cluster-AG.ts";
import { CLUSTER_AH } from "./nodes/cluster-AH.ts";
import { CLUSTER_AI } from "./nodes/cluster-AI.ts";
import { CLUSTER_AJ } from "./nodes/cluster-AJ.ts";
import { CLUSTER_AK } from "./nodes/cluster-AK.ts";
import { CLUSTER_AL } from "./nodes/cluster-AL.ts";

export type Node = {
  id: string;
  clusterId: string;
  title: string;
  author: string;
  year: number;
  medium: string;
  category: string;
  thesis: string;
  layer0?: string;
  layer1?: string;
  layer2?: string;
  quiz: { question: string; options: string[]; correctIndex: number; explanation?: string };
  related: string[];
  furtherReading: {
    label: string;
    source: string;
    url: string;
    type?: string;
    archive?: {
      status: "full" | "excerpt" | "unavailable";
      path?: string;
      retrieved?: string;
    };
  }[];
  tags: string[];
  epistemicStatus?: "Canonical" | "Contemporary" | "Speculative";
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
  "Philosophy & the Self",
  "Social Constructs",
] as const;
export type Tag = (typeof TAGS)[number];

export type Cluster = { id: string; title: string; subtitle: string; icon: string };

export const CLUSTERS: Cluster[] = [
  {
    id: "A",
    title: "Startup Fundamentals",
    subtitle: "How founders think about building something from nothing",
    icon: "Rocket",
  },
  {
    id: "B",
    title: "Company Origins",
    subtitle: "The actual pitch decks and memos that started famous companies",
    icon: "Building2",
  },
  {
    id: "C",
    title: "Fraud & Short Cases",
    subtitle: "How professional skeptics spot a lie in a balance sheet",
    icon: "Search",
  },
  {
    id: "D",
    title: "Macro & Investing",
    subtitle: "Cycles, debt, and reading the economy like a value investor",
    icon: "LineChart",
  },
  {
    id: "E",
    title: "Finance Theory",
    subtitle: "The math that priced risk itself",
    icon: "Calculator",
  },
  {
    id: "F",
    title: "Foundational Tech",
    subtitle: "The plumbing ideas the entire internet sits on",
    icon: "Server",
  },
  {
    id: "G",
    title: "AI / ML Papers",
    subtitle: "The technical papers that built the modern AI stack, in order",
    icon: "BrainCircuit",
  },
  {
    id: "H",
    title: "Crypto",
    subtitle: "The whitepapers behind Bitcoin, Ethereum, and DeFi",
    icon: "Bitcoin",
  },
  {
    id: "I",
    title: "Worldview & Futurism",
    subtitle: "The biggest, most abstract bets on how the future unfolds",
    icon: "Globe",
  },
  {
    id: "J",
    title: "Mental Models",
    subtitle: "Reusable lenses for thinking clearly",
    icon: "Layers",
  },
  {
    id: "K",
    title: "Compounding & Time",
    subtitle: "The quiet force behind almost everything",
    icon: "Hourglass",
  },
  {
    id: "L",
    title: "Decision-Making",
    subtitle: "Choosing well under uncertainty",
    icon: "GitMerge",
  },
  {
    id: "M",
    title: "Systems & Incentives",
    subtitle: "Why smart people do strange things",
    icon: "Settings2",
  },
  {
    id: "N",
    title: "Craft & Focus",
    subtitle: "Doing serious work in a distracted world",
    icon: "Hammer",
  },
  {
    id: "O",
    title: "Philosophy & the Self",
    subtitle: "Schools of thought on the self, the absurd, and what it means to be a person",
    icon: "Compass",
  },
  {
    id: "P",
    title: "The Almanack of Naval Ravikant",
    subtitle: "Wealth, judgment, and happiness in six parts",
    icon: "Anchor",
  },
  {
    id: "Q",
    title: "Practical Wisdom",
    subtitle: "Widely-read life-advice bestsellers, closer to lived tactics than theory",
    icon: "Lightbulb",
  },
  {
    id: "R",
    title: "Big Hypotheses",
    subtitle:
      "Open questions science and philosophy haven't settled — simulation, consciousness, the Fermi paradox",
    icon: "Telescope",
  },
  {
    id: "S",
    title: "Dan Koe",
    subtitle:
      "Self-authorship, the one-person business, and modern meaning-making — one internet writer's full framework",
    icon: "PenTool",
  },
  {
    id: "T",
    title: "Modern Creator Essayists",
    subtitle:
      "David Perell, Sahil Bloom, and Anne-Laure Le Cunff — writing, luck, and mindful productivity for the internet era",
    icon: "Newspaper",
  },
  {
    id: "U",
    title: "Cognitive Biases",
    subtitle: "The systematic errors baked into how the mind judges, remembers, and decides",
    icon: "EyeOff",
  },
  {
    id: "V",
    title: "Social Constructs",
    subtitle:
      "Things that feel like natural facts but are actually human inventions — time, money, race, gender, and more",
    icon: "Users",
  },
  {
    id: "W",
    title: "Buffett & Munger Mental Models",
    subtitle:
      "Six frameworks behind Berkshire Hathaway's rejection of market efficiency in favor of psychological pragmatism",
    icon: "Briefcase",
  },
  {
    id: "X",
    title: "The Architecture of Reality and Society",
    subtitle:
      "The hidden scaffolding behind human perception, belief, and social control — from Aperture's philosophy and psychology essays",
    icon: "Network",
  },
  {
    id: "Y",
    title: "Paradoxes, Perception, and Unseen Realities",
    subtitle:
      "Where human logic, evolutionary psychology, and mathematical reality stop lining up — cognitive glitches and paradoxes at the edge of intuition",
    icon: "Infinity",
  },
  {
    id: "Z",
    title: "Frontiers of Cosmological & Technological Evolution",
    subtitle:
      "The extreme vanguard of physics and biotechnology, where theory challenges the definition of existence itself",
    icon: "Dna",
  },
  {
    id: "AA",
    title: "Physics & Entropy",
    subtitle:
      "Thermodynamics, relativity, and chaos theory — the first-principles laws the rest of reality has to obey",
    icon: "Atom",
  },
  {
    id: "AB",
    title: "Evolution & Life",
    subtitle:
      "Natural selection, biomimicry, and the selfish gene — how blind processes build complexity",
    icon: "Leaf",
  },
  {
    id: "AC",
    title: "Logic & Mathematics",
    subtitle:
      "Gödel's incompleteness, probability, and calculus fundamentals — the rules underneath every other rule",
    icon: "Sigma",
  },
  {
    id: "AD",
    title: "Neuroscience & Biology",
    subtitle: "Neuroplasticity, the default mode network, and the hardware the mind runs on",
    icon: "Brain",
  },
  {
    id: "AE",
    title: "Storytelling & Myth",
    subtitle: "The hero's journey, mimetic desire, and the archetypes every story keeps reusing",
    icon: "BookOpen",
  },
  {
    id: "AF",
    title: "Network Theory",
    subtitle:
      "Metcalfe's law, contagion, and scale-free graphs — why connected systems behave the way they do",
    icon: "Share2",
  },
  {
    id: "AG",
    title: "Design & Engineering",
    subtitle:
      "Affordances, constraints, and form follows function — how physical things get built to work",
    icon: "Ruler",
  },
  {
    id: "AH",
    title: "History & Civilizational Arcs",
    subtitle:
      "Big history, institutional decay, and revolutions — the long patterns civilizations repeat",
    icon: "Landmark",
  },
  {
    id: "AI",
    title: "Governance & Power",
    subtitle:
      "Machiavelli, statecraft, and monopoly — how the sovereign actually holds and loses power",
    icon: "Scale",
  },
  {
    id: "AJ",
    title: "Game Theory & Strategy",
    subtitle:
      "Nash equilibrium, signaling, and the prisoner's dilemma — strategy when others are also thinking",
    icon: "Swords",
  },
  {
    id: "AK",
    title: "Media Theory & Information",
    subtitle:
      "McLuhan, hyperreality, and the medium as the message — how the channel shapes the content",
    icon: "Radio",
  },
  {
    id: "AL",
    title: "Negotiation & Persuasion",
    subtitle:
      "The primary texts behind getting to yes, saying no, and changing someone's mind on purpose",
    icon: "Handshake",
  },
];

export const NODES: Node[] = [
  ...CLUSTER_A,
  ...CLUSTER_B,
  ...CLUSTER_C,
  ...CLUSTER_D,
  ...CLUSTER_E,
  ...CLUSTER_F,
  ...CLUSTER_G,
  ...CLUSTER_H,
  ...CLUSTER_I,
  ...CLUSTER_J,
  ...CLUSTER_K,
  ...CLUSTER_L,
  ...CLUSTER_M,
  ...CLUSTER_N,
  ...CLUSTER_O,
  ...CLUSTER_P,
  ...CLUSTER_Q,
  ...CLUSTER_R,
  ...CLUSTER_S,
  ...CLUSTER_T,
  ...CLUSTER_U,
  ...CLUSTER_V,
  ...CLUSTER_W,
  ...CLUSTER_X,
  ...CLUSTER_Y,
  ...CLUSTER_Z,
  ...CLUSTER_AA,
  ...CLUSTER_AB,
  ...CLUSTER_AC,
  ...CLUSTER_AD,
  ...CLUSTER_AE,
  ...CLUSTER_AF,
  ...CLUSTER_AG,
  ...CLUSTER_AH,
  ...CLUSTER_AI,
  ...CLUSTER_AJ,
  ...CLUSTER_AK,
  ...CLUSTER_AL,
];

export const NODE_BY_ID: Record<string, Node> = NODES.reduce(
  (acc, node) => {
    acc[node.id] = node;
    return acc;
  },
  {} as Record<string, Node>,
);

export const NODES_BY_CLUSTER: Record<string, Node[]> = CLUSTERS.reduce(
  (acc, cluster) => {
    acc[cluster.id] = NODES.filter((n) => n.clusterId === cluster.id);
    return acc;
  },
  {} as Record<string, Node[]>,
);

export const CLUSTER_BY_ID: Record<string, Cluster> = CLUSTERS.reduce(
  (acc, cluster) => {
    acc[cluster.id] = cluster;
    return acc;
  },
  {} as Record<string, Cluster>,
);
