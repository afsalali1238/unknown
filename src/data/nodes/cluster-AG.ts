import type { Node } from "../nodes.ts";
export const CLUSTER_AG: Node[] = [
  {
    id: "AG1",
    clusterId: "AG",
    title: "Form Follows Function",
    author: "Louis Sullivan",
    year: 1896,
    medium: "Essay",
    category: "Design Philosophy",
    thesis:
      "A structure's shape should be dictated by what it needs to do, not by decorative tradition — form is a consequence of function, not a separate choice.",
    layer0:
      "Sullivan coined the modernist movement's founding rule in a single 1896 essay: form ever follows function. Strip away ornament that doesn't serve a purpose, and the true shape of a thing reveals itself.",
    layer1:
      "Writing about skyscraper design in 'The Tall Office Building Artistically Considered,' Sullivan argued that nature never puts a decorative flourish where it doesn't serve survival — a hawk's wing is shaped by flight, not fashion — and buildings should follow the same logic. The phrase became the rallying cry for Bauhaus and modernist design decades later, though Sullivan himself still used plenty of ornament in his own buildings.",
    layer2:
      "What's one piece of unnecessary ornament in something you've built — a feature, a slide, a process step — that exists purely from habit rather than function?",
    quiz: {
      question:
        "What point was Sullivan actually making with 'form follows function' in his 1896 essay?",
      options: [
        "Buildings should have no decoration whatsoever — this view emphasizes the same outcome but attributes it to a different un",
        "Function is less important than visual appeal — this view emphasizes the same outcome but attributes it to a different und",
        "A structure's shape should be determined by its purpose, the way natural forms are shaped by what they need to do, not by inherited decorative convention",
        "Ornament should be added only after a building's structural design is finished — this view emphasizes the same outcome but",
      ],
      correctIndex: 2,
      explanation:
        "Sullivan's argument was about causality, not minimalism — shape should follow purpose the way a hawk's wing follows flight, rather than defaulting to ornamental tradition disconnected from what the structure actually does.",
    },
    tags: ["Craft & Deep Work", "First-Principles Thinking"],
    related: ["AG2", "M3", "J24"],
    furtherReading: [
      {
        label: "Form follows function",
        source: "article",
        url: "https://en.wikipedia.org/wiki/Form_follows_function",
        archive: {
          status: "full",
          path: "content/sources/AG1-0.md",
          retrieved: "2026-07-17",
        },
      },
      {
        label: "The Tall Office Building Artistically Considered (1896, primary source scan)",
        source: "article",
        url: "https://archive.org/details/tallofficebuildi00sull",
        archive: {
          status: "full",
          path: "content/sources/AG1-1.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "AG2",
    clusterId: "AG",
    title: "Affordances",
    author: "James J. Gibson",
    year: 1966,
    medium: "Model",
    category: "Perceptual Psychology / Design",
    thesis:
      "Objects and environments don't just have properties — they signal what can be done with them, and that signal is what actually guides behavior, not conscious analysis of physical properties.",
    layer0:
      "Gibson's 1966 idea reframed perception itself: you don't see a chair and deduce you can sit on it — the 'sit-ability' is part of what you perceive directly. He called this an affordance.",
    layer1:
      "An affordance is a possibility for action an object offers a specific perceiver — a flat, knee-high, rigid surface affords sitting for an adult, not for an ant. Gibson's radical claim: we perceive these action-possibilities directly, without cataloguing physical properties and reasoning about them. Don Norman later popularized the term in design — a well-designed door handle makes 'push' or 'pull' obvious without a label; a bad one needs a sign.",
    layer2:
      "Where in something you've built — a product, a document, a room — are you relying on a label or instructions to explain something the design itself should be making obvious?",
    quiz: {
      question: "What did Gibson mean by an 'affordance'?",
      options: [
        "A visible label or instruction that explains how to use an object correctly — this view emphasizes the same outcome but attrib",
        "A possibility for action that an object or environment directly offers a specific perceiver, perceived without first analyzing its neutral physical properties",
        "The market price a customer is willing to afford for a product — this view emphasizes the same outcome but attributes it to a ",
        "A product feature that has been explicitly documented in a manual — this view emphasizes the same outcome but attributes it to",
      ],
      correctIndex: 1,
      explanation:
        "Gibson's claim was perceptual, not just design-related — we directly perceive what an environment lets us do (sit, climb, grasp) rather than deducing it from separately analyzed physical properties, which is why hiding an affordance forces conscious problem-solving.",
    },
    tags: ["Craft & Deep Work", "First-Principles Thinking"],
    related: ["AG1", "M3", "N7"],
    furtherReading: [
      {
        label: "Affordance",
        source: "article",
        url: "https://en.wikipedia.org/wiki/Affordance",
        archive: {
          status: "full",
          path: "content/sources/AG2-0.md",
          retrieved: "2026-07-17",
        },
      },
      {
        label: "Top 10 Application-Design Mistakes (affordances & signifiers)",
        source: "article",
        url: "https://www.nngroup.com/articles/top-10-application-design-mistakes/",
        archive: {
          status: "full",
          path: "content/sources/AG2-1.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
];
