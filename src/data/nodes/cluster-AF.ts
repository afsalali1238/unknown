import type { Node } from "../nodes.ts";
export const CLUSTER_AF: Node[] = [
  {
    id: "AF1",
    clusterId: "AF",
    title: "Metcalfe's Law",
    author: "Robert Metcalfe",
    year: 1980,
    medium: "Model",
    category: "Network Theory",
    thesis:
      "A network's value grows roughly with the square of its users, which is why the first users of a network are the hardest to get and the last are nearly free.",
    layer0:
      "Metcalfe sketched this on a slide in 1980, years before anyone called it a network effect: a network's value scales with the square of its connected users, not linearly.",
    layer1:
      "If a network has n users, possible connections grow as roughly n². Metcalfe used this to sell Ethernet: a network of 10 devices is worth far more than ten times one device, since value comes from connections, not nodes. George Gilder popularized the name in a 1993 Forbes piece, and it became the logic behind every platform's race to reach critical mass first — early users get a network nobody wants yet; late users get one everybody needs.",
    layer2:
      "What's the smallest number of connected users your product or idea needs before the network effect starts pulling new users in for you, instead of you pulling them in?",
    quiz: {
      question:
        "Why does Metcalfe's Law make a platform's early users disproportionately hard to acquire, and later users disproportionately easy?",
      options: [
        "Early users pay lower prices due to promotional discounts — this view emphasizes the same outcome but attributes it to ",
        "Network value grows with the square of connected users, so a small early network offers little value while a large late network offers enormous value",
        "Early adopters are naturally more skeptical people — this view emphasizes the same outcome but attributes it to a diffe",
        "Company marketing budgets are always smaller at launch — this view emphasizes the same outcome but attributes it to a d",
      ],
      correctIndex: 1,
      explanation:
        "Because value scales roughly as n², a network of 10 people offers about 45 possible connections while one of 1,000 offers about 500,000 — the same product becomes exponentially more valuable to join purely from network size, independent of any product improvement.",
    },
    tags: ["Moats & Network Effects", "Tech Adoption & Disruption"],
    related: ["I2", "I10", "AF2"],
    furtherReading: [
      {
        label: "Metcalfe's Law",
        source: "article",
        url: "https://en.wikipedia.org/wiki/Metcalfe's_law",
        archive: {
          status: "full",
          path: "content/sources/AF1-0.md",
          retrieved: "2026-07-17",
        },
      },
      {
        label: "Beyond Metcalfe's Law for Network Effects",
        source: "article",
        url: "https://a16z.com/beyond-metcalfes-law-for-network-effects/",
        archive: {
          status: "full",
          path: "content/sources/AF1-1.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "AF2",
    clusterId: "AF",
    title: "Six Degrees of Separation (The Small-World Experiment)",
    author: "Stanley Milgram",
    year: 1967,
    medium: "Paper",
    category: "Network Theory",
    thesis:
      "Any two strangers are connected by a surprisingly short chain of acquaintances, because social networks are far more efficiently wired than their size would suggest.",
    layer0:
      "Milgram's 1967 mail experiment asked strangers in Nebraska to route a folder to one specific Boston stockbroker using only people they knew personally. It usually took just a handful of hops.",
    layer1:
      "Milgram's participants forwarded a folder person-to-person, each passing it to whoever seemed 'closer' to the target, with no map of the network. Chains that completed averaged about 4.4 intermediaries — later popularized as 'six degrees,' though Milgram never used that phrase. Social networks aren't the sprawling, clustered webs they look like from inside — a few long-range ties collapse the distance between any two people.",
    layer2:
      "Who's one person in your network who probably connects you, in two or three hops, to someone genuinely useful that you currently assume is completely out of reach?",
    quiz: {
      question:
        "What made Milgram's small-world result surprising, given that participants had no map of the overall social network?",
      options: [
        "That successful chains reached a specific stranger in only a handful of steps, implying social networks are collapsed by a few long-range connections rather than being purely local webs",
        "That most chains never reached the target at all — this view emphasizes the same outcome but attributes it to a different underlying mechanism that ",
        "That every completed chain used exactly six intermediaries — this view emphasizes the same outcome but attributes it to a different underlying mecha",
        "That the experiment proved social networks are completely random — this view emphasizes the same outcome but attributes it to a different underlying",
      ],
      correctIndex: 0,
      explanation:
        "The short average chain length (about 4.4 steps) suggested that despite social networks looking locally clustered from any individual's viewpoint, a small number of well-placed long-range acquaintances make the whole network far smaller in practice than its size implies.",
    },
    tags: ["Moats & Network Effects"],
    related: ["AF1", "I2", "M5"],
    furtherReading: [
      {
        label: "Small-world experiment",
        source: "article",
        url: "https://en.wikipedia.org/wiki/Small-world_experiment",
        archive: {
          status: "full",
          path: "content/sources/AF2-0.md",
          retrieved: "2026-07-17",
        },
      },
      {
        label: "Could it be a Big World After All? The 'Six Degrees of Separation' Myth",
        source: "article",
        url: "https://www.cs.princeton.edu/~chazelle/courses/BIB/big-world",
        archive: {
          status: "full",
          path: "content/sources/AF2-1.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
];
