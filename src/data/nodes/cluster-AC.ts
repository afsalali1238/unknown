import type { Node } from "../nodes.ts";
export const CLUSTER_AC: Node[] = [
  {
    id: "AC1",
    clusterId: "AC",
    title: "Gödel's Incompleteness Theorems",
    author: "Kurt Gödel",
    year: 1931,
    medium: "Paper",
    category: "Mathematical Logic",
    thesis:
      "Any formal system powerful enough to describe arithmetic contains true statements it can never prove, and it can't even prove its own consistency.",
    layer0:
      "Gödel was 25 when he proved something unsettling about mathematics: any system rich enough to do arithmetic will always contain true statements it can't prove from within.",
    layer1:
      "Gödel's first theorem shows any consistent formal system capable of arithmetic contains true statements it can neither prove nor disprove — completeness and consistency can't both be had. His second theorem goes further: such a system can't prove its own consistency without stepping outside itself, by encoding 'this statement is unprovable' directly into arithmetic.",
    layer2:
      "Where in your own reasoning do you rely on assumptions your framework can't actually justify from inside itself — and what would it take to notice you're standing on one?",
    quiz: {
      question:
        "What does Gödel's second incompleteness theorem say a consistent formal system capable of arithmetic can never do?",
      options: [
        "Prove any true statement whatsoever — this view ",
        "Perform basic arithmetic operations correctly — ",
        "Prove its own consistency using only its own axioms and rules",
        "Contain any false statements — this view emphasi",
      ],
      correctIndex: 2,
      explanation:
        "Even if the system is in fact consistent, it cannot demonstrate that fact from within its own axioms — you always need a larger system to vouch for a smaller one.",
    },
    tags: ["First-Principles Thinking"],
    related: ["R6", "AA1", "J2", "AC2"],
    furtherReading: [
      {
        label: "Gödel's Incompleteness Theorems",
        source: "article",
        url: "https://plato.stanford.edu/entries/goedel-incompleteness/",
        archive: {
          status: "full",
          path: "content/sources/AC1-0.md",
          retrieved: "2026-07-17",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "AC2",
    clusterId: "AC",
    title: "Bayes' Theorem",
    author: "Thomas Bayes (published by Richard Price)",
    year: 1763,
    medium: "Model",
    category: "Probability Theory",
    thesis:
      "Belief should update in proportion to evidence — Bayes' theorem is the exact math for how much a new piece of evidence should move your confidence.",
    layer0:
      "Bayes never published this in his lifetime — a friend found it in his papers and printed it in 1763. It's the exact formula for how much a new piece of evidence should change what you believe.",
    layer1:
      "Bayes' theorem relates the probability of a hypothesis given evidence to the probability of that evidence given the hypothesis, weighted by the hypothesis's prior probability. The prior matters more than intuition suggests: a positive test for a rare disease can still mean you probably don't have it, if false positives from the healthy majority outnumber true positives. Updating correctly means multiplying prior by evidence, not replacing it.",
    layer2:
      "What's a belief you updated to near-certainty after one striking piece of evidence, without asking how likely that evidence would have been even if you were wrong?",
    quiz: {
      question:
        "Why can a positive result on an accurate test for a rare disease still mean you probably don't have it?",
      options: [
        "Because a 99% accurate test becomes completely worthless whenever a disease is rare — this alternative is popular online but misstates the mechanism the author defends.",
        "Because when a condition is rare enough, false positives from the healthy majority can outnumber true positives from the small number who are actually sick",
        "Because probability theory doesn't meaningfully apply to individual medical diagnoses — this view reverses the causal direction the source material argues for.",
        "Because test accuracy always decreases mechanically as a condition becomes rarer — a common misreading that the text explicitly warns against.",
      ],
      correctIndex: 1,
      explanation:
        "This is Bayes' theorem in action: a low prior probability of having a rare disease means even a highly accurate test generates more false positives from the large healthy population than true positives from the small sick one, so the posterior stays lower than intuition suggests.",
    },
    tags: ["Decision-Making", "First-Principles Thinking"],
    related: ["AA8", "U3", "J2"],
    furtherReading: [
      {
        label: "Bayes' Theorem",
        source: "article",
        url: "https://plato.stanford.edu/entries/bayes-theorem/",
        archive: {
          status: "full",
          path: "content/sources/AC2-0.md",
          retrieved: "2026-07-17",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
];
