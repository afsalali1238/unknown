import type { Node } from "../nodes.ts";
export const CLUSTER_AE: Node[] = [
  {
    id: "AE1",
    clusterId: "AE",
    title: "The Hero's Journey (Monomyth)",
    author: "Joseph Campbell",
    year: 1949,
    medium: "Book",
    category: "Comparative Mythology",
    thesis:
      "Every culture's mythology encodes the same underlying story — a call to adventure, trials, and a transformed return — because it maps the psychological structure of growth itself.",
    layer0:
      "Campbell read myths from every continent in 1949 and found one skeleton underneath all of them: a hero leaves the ordinary world, is tested, and returns changed. He called it the monomyth.",
    layer1:
      "The monomyth's stages — a call to adventure, crossing into the unknown, trials with a mentor's help, a climactic ordeal, and a changed return — recur across Sumerian, Greek, Norse, and Indigenous myth with little variation. Campbell argued this isn't coincidence but psychology: the structure mirrors the actual shape of transformation, which is why storytellers from ancient priests to George Lucas keep reusing it.",
    layer2:
      "What ordinary world are you currently reluctant to leave, and what would your version of a call to adventure actually look like if you took it seriously?",
    quiz: {
      question:
        "Why did Campbell argue the same basic story structure recurs across unrelated cultures' mythologies?",
      options: [
        "The structure mirrors the actual psychological shape of transformation and growth, so cultures independently converge on it",
        "Colonial trade routes spread one story to every culture — an intuitive but incorrect explanation that conflates correlation with causation.",
        "All myths were plagiarized from a single ancient source text — this view reverses the causal direction the source material argues for.",
        "It's a coincidence with no underlying explanation — a common misreading that the text explicitly warns against.",
      ],
      correctIndex: 0,
      explanation:
        "Campbell's claim was psychological, not historical — the story shape recurs because it tracks a real process of leaving comfort, being tested, and returning changed, which every culture has reason to encode.",
    },
    tags: ["Meaning & Self"],
    related: ["O6", "S1", "N7"],
    furtherReading: [
      {
        label: "The Hero with a Thousand Faces",
        source: "article",
        url: "https://en.wikipedia.org/wiki/The_Hero_with_a_Thousand_Faces",
        archive: {
          status: "full",
          path: "content/sources/AE1-0.md",
          retrieved: "2026-07-17",
        },
      },
      {
        label: "Joseph Campbell and the Hero's Journey",
        source: "article",
        url: "https://www.jcf.org/learn/joseph-campbell-heros-journey",
        archive: {
          status: "full",
          path: "content/sources/AE1-1.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "AE2",
    clusterId: "AE",
    title: "Mimetic Desire",
    author: "René Girard",
    year: 1961,
    medium: "Book",
    category: "Literary Theory / Anthropology",
    thesis:
      "We don't desire things independently — we desire what other people desire, borrowing our wants from a model we consciously or unconsciously want to become.",
    layer0:
      "Girard's 1961 debut argued desire is never truly original — you want what someone else wants, borrowed from a model, which is why trends, rivalries, and status races spread like contagion.",
    layer1:
      "Girard studied the great novelists — Stendhal, Flaubert, Proust, Dostoevsky — and found one structure inside every plot: characters desire objects through a mediator, wanting what the mediator wants because the mediator seems to access some fuller mode of being. This explains why two people suddenly want the same job or partner once one shows interest — desire is contagious because it's borrowed, not because the object is objectively better.",
    layer2:
      "Think of something you badly want right now — is the wanting really about the thing itself, or did it start after watching someone you admire want or have it?",
    quiz: {
      question:
        "According to Girard's theory of mimetic desire, where does desire actually originate?",
      options: [
        "Desire arises independently within each individual based on the object's inherent qualities — this view emphasize",
        "Desire is entirely determined by economic scarcity — an intuitive but incorrect explanation that conflates correlation with causation.",
        "Desire is a fixed biological drive unrelated to social context — this view reverses the causal direction the source material argues for.",
        "Desire is borrowed from a model or mediator — we want things because someone else wants or has them, not purely for the object's own qualities",
      ],
      correctIndex: 3,
      explanation:
        "Girard's core claim is that desire is triangular, not direct — a subject wants an object because a mediator's desire for it makes the object seem valuable, which is why desire spreads through imitation rather than independent evaluation.",
    },
    tags: ["Meaning & Self", "Markets & Narrative"],
    related: ["AE1", "AK2", "M2"],
    furtherReading: [
      {
        label: "Mimetic theory",
        source: "article",
        url: "https://en.wikipedia.org/wiki/Mimetic_theory",
        archive: {
          status: "full",
          path: "content/sources/AE2-0.md",
          retrieved: "2026-07-17",
        },
      },
      {
        label: "René Girard (Britannica)",
        source: "article",
        url: "https://www.britannica.com/biography/Rene-Girard",
        archive: {
          status: "full",
          path: "content/sources/AE2-1.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "AE3",
    clusterId: "AE",
    title: "How to Be a Great Storyteller",
    author: "Lisa Christen, Forbes Coaches Council",
    year: 2026,
    medium: "Infographic",
    category: "Storytelling",
    thesis:
      "Effective storytelling follows a consistent structural pattern — relatable characters, compelling conflict, a clear beginning-middle-end arc, and a strong ending — which explains why stories persuade more reliably than raw data even when the data is stronger.",
    layer0:
      "People remember stories better than raw data and make decisions based on how they feel, not just what they're told — which is why the same fact lands differently packaged as a story versus a statistic.",
    layer1:
      "The recurring structural elements: a relatable protagonist the audience can empathize with, compelling conflict that creates tension and drives the narrative forward, a clear arc (beginning, middle, end) rather than a meandering account, and a strong ending that leaves a takeaway or emotional resonance rather than trailing off. In applied storytelling (business, marketing), the same structure gets reused: highlighting a customer's transformation, pairing data with a human narrative, or using a 'twist ending' to keep attention.",
    layer2:
      "The mechanism worth noting is why story beats data at all — conflict and character create emotional stakes that pure statistics don't, and people act on emotional stakes more reliably than on abstract numbers. Where in your own communication are you leading with data when a short story would land harder?",
    quiz: {
      question:
        "According to this framework, why does storytelling tend to be more persuasive than presenting raw data alone?",
      options: [
        "Because data is always factually incorrect. — this alternative is popular online but misstates the mechanism the author defends. The distinction matters because it changes what.",
        "Because storytelling requires no supporting evidence at all. — an intuitive but incorrect explanation that conflates correlation with causation.",
        "Because stories create emotional stakes through character and conflict, and people tend to act on emotional stakes more reliably than on abstract numbers.",
        "Because audiences cannot process numerical information. — a common misreading that the text explicitly warns against. The distinction matters because it changes what you would.",
      ],
      correctIndex: 2,
      explanation:
        "The structural elements (character, conflict, arc) work together to create emotional investment, which is what drives action and memory more reliably than statistics presented without narrative framing.",
    },
    related: ["AE1", "AE2"],
    furtherReading: [
      {
        label: "Leaders: Seven Tips For Becoming A Better Storyteller",
        source: "Forbes Coaches Council",
        url: "https://www.forbes.com/councils/forbescoachescouncil/2020/09/30/leaders-seven-tips-for-becoming-a-better-storyteller/",
        type: "article",
        archive: {
          status: "full",
          path: "content/sources/AE3-0.md",
          retrieved: "2026-07-17",
        },
      },
    ],
    tags: ["Power & Persuasion", "Craft & Deep Work"],
    epistemicStatus: "Speculative",
  },
];
