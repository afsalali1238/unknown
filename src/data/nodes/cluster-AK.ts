import type { Node } from "../nodes.ts";
export const CLUSTER_AK: Node[] = [
  {
    id: "AK1",
    clusterId: "AK",
    title: "The Medium Is the Message",
    author: "Marshall McLuhan",
    year: 1964,
    medium: "Book",
    category: "Media Theory",
    thesis:
      "The form a communication technology takes shapes society more than the content it carries — the channel is never neutral.",
    layer0:
      "McLuhan opened Understanding Media in 1964 with a line that still unsettles media analysts: the medium is the message. What a technology is changes society more than whatever it happens to say.",
    layer1:
      "McLuhan's claim wasn't that content doesn't matter, but that a medium's form imposes its own logic on whoever uses it — television restructured attention spans before anyone analyzed a broadcast; a light bulb creates usable space at night with zero content at all. Every new medium extends some human faculty — the wheel extends the foot, print extends the eye — and it's that extension, not the message on it, that reshapes how people think.",
    layer2:
      "Which medium you use daily — short video, group chat, a feed — is reshaping how you think or relate to people, independent of anything specific you've ever consumed on it?",
    quiz: {
      question: "What did McLuhan mean by 'the medium is the message'?",
      options: [
        "Content doesn't matter at all, only the delivery format — this alternative is popular online but misstates the mechanism the author defends. The distinction matters because it changes what you.",
        "Each medium's specific content is what determines its social impact, not its form — an intuitive but incorrect explanation that conflates correlation with causation.",
        "A communication technology's form reshapes perception, attention, and society on its own, independent of and often more powerfully than the specific content it carries",
        "New media always improve upon the media they replace — a common misreading that the text explicitly warns against. The distinction matters because it changes what you would test next.",
      ],
      correctIndex: 2,
      explanation:
        "McLuhan's point was about structural effects, not content quality — a medium like television or the light bulb changes how people live and think through its mere existence and form, regardless of which particular programs or messages pass through it.",
    },
    tags: ["Markets & Narrative", "Tech Adoption & Disruption"],
    related: ["F1", "I2", "AK2"],
    furtherReading: [
      {
        label: "Understanding Media: The Extensions of Man, Ch.1 (excerpt)",
        source: "book",
        url: "https://web.mit.edu/allanmc/www/mcluhan.mediummessage.pdf",
        archive: {
          status: "excerpt",
          path: "content/sources/AK1-0.md",
          retrieved: "2026-07-17",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "AK2",
    clusterId: "AK",
    title: "Simulacra and Simulation (Hyperreality)",
    author: "Jean Baudrillard",
    year: 1981,
    medium: "Book",
    category: "Media Theory",
    thesis:
      "Modern media doesn't just represent reality anymore — it produces a self-referential simulation so complete that the distinction between the real and its copy collapses entirely.",
    layer0:
      "Baudrillard's 1981 essay argued something stranger than 'media distorts reality': in advanced media societies, the copy no longer refers to any original at all — it becomes hyperreal.",
    layer1:
      "Baudrillard traced simulacra through four stages: an image reflecting reality, one masking it, one masking its absence, and finally one with no relation to reality — pure simulation. Signs no longer represent anything real; they reference only other signs, forming a hyperreality more vivid than what it replaced, from theme parks to curated online personas. The danger isn't being lied to — it's losing stable ground to tell the difference.",
    layer2:
      "Where in your own life is a curated, simulated version of something — a persona, a highlight reel, a brand — now functioning as more 'real' to you and others than the underlying reality it was supposed to represent?",
    quiz: {
      question:
        "What is the final stage of Baudrillard's four stages of the image, which he calls pure simulation?",
      options: [
        "An image that faithfully and accurately reflects an underlying reality — this alternative is popular online but misstates the mechanism the author.",
        "A sign that no longer refers to any reality at all, and instead only references other signs, forming a self-contained 'hyperreality'",
        "An image that deliberately masks the fact that no underlying reality exists — this view reverses the causal direction the source material argues for.",
        "An image that is created to deceive with a known false version of the truth — a common misreading that the text explicitly warns against.",
      ],
      correctIndex: 1,
      explanation:
        "Baudrillard's most radical claim is the final stage — not that images lie about reality, but that they stop referring to reality altogether, circulating as free-floating signs that construct a hyperreality more emotionally 'real' than the world they nominally represent.",
    },
    tags: ["Markets & Narrative", "Meaning & Self"],
    related: ["AK1", "I2", "O3"],
    furtherReading: [
      {
        label: "Simulacra and Simulation",
        source: "article",
        url: "https://en.wikipedia.org/wiki/Simulacra_and_Simulation",
        archive: {
          status: "full",
          path: "content/sources/AK2-0.md",
          retrieved: "2026-07-17",
        },
      },
      {
        label: "Simulacra and Simulation (1981, full scan)",
        source: "book",
        url: "https://dn720006.ca.archive.org/0/items/baudrillard.-1970.-the-consumer-society/Baudrillard.1981.Simulacra-and-Simulation.pdf",
        archive: {
          status: "full",
          path: "content/sources/AK2-1.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    epistemicStatus: "Contemporary",
  },
];
