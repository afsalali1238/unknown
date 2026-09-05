import type { Node } from "../nodes.ts";
export const CLUSTER_AI: Node[] = [
  {
    id: "AI1",
    clusterId: "AI",
    title: "The Prince: Power as It Actually Works",
    author: "Niccolò Machiavelli",
    year: 1513,
    medium: "Book",
    category: "Political Theory",
    thesis:
      "Rulers should be judged by whether their methods preserve power and stability, not by whether those methods are conventionally virtuous.",
    layer0:
      "Machiavelli wrote the book that made his own name an insult, in 1513: rulers should study how power is actually kept, not how moralists wish it were kept. Effectiveness, not virtue, is the real test.",
    layer1:
      "The Prince refuses to describe an ideal ruler, describing instead what keeps rulers in power in reality — calculated fear, strategic generosity, and ruthlessness deployed only when cheaper than the alternative. His most quoted line, that it's safer to be feared than loved if you can't be both, isn't cynicism for its own sake — it's a claim that fear is a lever the ruler actually controls.",
    layer2:
      "Where in your own leadership or negotiations are you optimizing for being liked, when the situation actually calls for being respected or predictable instead?",
    quiz: {
      question:
        "What was actually novel about Machiavelli's approach in The Prince compared to earlier political philosophy?",
      options: [
        "He described how power is actually held and kept in practice, rather than prescribing an idealized virtuous ruler",
        "He was the first to argue rulers should be virtuous above all else — an intuitive but incorrect explanation that conflates.",
        "He focused exclusively on religious justifications for rule — this view reverses the causal direction the source material argues.",
        "He argued that democracy was superior to monarchy — a common misreading that the text explicitly warns against.",
      ],
      correctIndex: 0,
      explanation:
        "Earlier political philosophy largely described an ideal ruler; Machiavelli broke from that tradition to describe effective rulers as they actually operate, which is why the book still reads as startlingly blunt five centuries later.",
    },
    tags: ["Power & Persuasion", "Decision-Making"],
    related: ["AI2", "M4", "AH1"],
    furtherReading: [
      {
        label: "The Prince (full text)",
        source: "book",
        url: "https://www.gutenberg.org/files/1232/1232-h/1232-h.htm",
        archive: {
          status: "full",
          path: "content/sources/AI1-0.md",
          retrieved: "2026-07-17",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "AI2",
    clusterId: "AI",
    title: "Regulatory Capture",
    author: "George Stigler",
    year: 1971,
    medium: "Paper",
    category: "Political Economy",
    thesis:
      "Regulation is typically acquired by the industry it regulates and bent to that industry's benefit, not the public's, because the regulated have concentrated interest and lobbying power that diffuse consumers can't match.",
    layer0:
      "Stigler's 1971 paper demolished the comfortable assumption that regulators protect the public. His claim: regulation is usually captured by the very industry it's meant to police.",
    layer1:
      "Stigler modeled regulation as a good industries demand and regulators supply, under pressure from two sides — producers, few and highly motivated, and consumers, many and diffuse. Concentrated interests organize and lobby far more effectively than diffuse ones, so regulation drifts toward protecting incumbents — licensing, tariffs, and entry barriers that look like consumer protection but function as competitive moats for insiders.",
    layer2:
      "Where have you seen a rule, credential, or approval process that was justified as consumer protection but mainly functions to keep new competitors out?",
    quiz: {
      question:
        "Why does Stigler's capture theory predict regulation will tend to favor the regulated industry over consumers?",
      options: [
        "Because regulators are always personally corrupt — this alternative is popular online but misstates the mechanism the author defends. The distinction matters because it changes what you would test next.",
        "Because regulators are legally required to consult industry representatives before writing any rule — an intuitive but incorrect explanation that conflates correlation with causation.",
        "Because consumers are unable to purchase regulated goods at any price — this view reverses the causal direction the source material argues for. The distinction matters because it changes what you would test next.",
        "Because the regulated industry is small and concentrated with strong incentive to lobby, while consumers are numerous and diffuse with weak individual incentive to organize against any single rule",
      ],
      correctIndex: 3,
      explanation:
        "The mechanism isn't personal corruption — it's a structural asymmetry: concentrated producer interests can organize and apply sustained pressure far more effectively than the diffuse, weakly-motivated public, so regulatory outcomes drift toward protecting incumbents over time.",
    },
    tags: ["Power & Persuasion", "Incentives & Systems"],
    related: ["AI1", "C1", "D9"],
    furtherReading: [
      {
        label: "Let's Not Forget George Stigler's Lessons about Regulatory Capture",
        source: "article",
        url: "https://regulatorystudies.columbian.gwu.edu/lets-not-forget-george-stiglers-lessons-about-regulatory-capture",
        archive: {
          status: "full",
          path: "content/sources/AI2-0.md",
          retrieved: "2026-07-17",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
];
