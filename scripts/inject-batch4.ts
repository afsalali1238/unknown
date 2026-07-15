import { Project, SyntaxKind } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });
const sourceFile = project.getSourceFileOrThrow("src/data/nodes.ts");

const nodesArray = sourceFile
  .getVariableDeclarationOrThrow("NODES")
  .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const newNodes = [
  // THE SCHOOL OF LIFE
  {
    id: "AA19",
    clusterId: "O", // Philosophy & the Self
    title: "The Good Enough Mother",
    author: "Donald Winnicott",
    year: 1953,
    medium: "Psychology",
    category: "Development",
    thesis:
      "A perfect parent destroys a child's ability to cope with reality. A 'good enough' parent intentionally fails in small, tolerable ways to build resilience.",
    layer0:
      "Modern society puts immense pressure on parents to be perfect—to instantly fulfill every need their child has. Psychoanalyst Donald Winnicott argued this is actually destructive. What a child really needs is a 'good enough' mother.",
    layer1:
      "When a baby is born, the mother must be almost perfectly attuned to its needs to keep it alive. But as the child grows, the mother must slowly, progressively fail. She must take a little longer to bring the bottle, or refuse to buy the toy.",
    layer2:
      "This slow, tolerable failure is the exact mechanism that teaches the child that they are not the center of the universe. It creates the necessary frustration required for the child to develop their own mind, learn self-soothing, and adapt to a world that will absolutely not cater to their every whim. Perfection breeds fragility; 'good enough' breeds resilience.",
    quiz: {
      question:
        "According to Winnicott, why is a 'perfect' parent actually harmful to a developing child?",
      options: [
        "Because perfection is impossible, so the parent will eventually suffer burnout.",
        "Because the child will never experience the necessary, tolerable frustrations required to develop resilience and self-soothing.",
        "Because it makes the child too independent too quickly.",
        "Because the child will realize the parent is faking their perfection.",
      ],
      correctIndex: 1,
      explanation:
        "A child must slowly learn that the world does not revolve around them. If a parent instantly satisfies every urge, the child never develops the psychological tools to handle the real world's inevitable delays and rejections.",
    },
    related: ["V1", "O2"], // Social constructs and psychology
    furtherReading: [
      {
        label: "The Good Enough Mother",
        source: "The School of Life",
        url: "https://www.theschooloflife.com/article/the-good-enough-mother/",
      },
    ],
    tags: ["Philosophy & the Self", "Meaning & Self"],
  },
  {
    id: "AA20",
    clusterId: "V", // Social Constructs
    title: "Status Anxiety",
    author: "Alain de Botton",
    year: 2004,
    medium: "Book Concept",
    category: "Sociology",
    thesis:
      "We are anxious not because we are poor, but because we believe we live in a meritocracy where our wealth exactly correlates with our human worth.",
    layer0:
      "In the Middle Ages, if you were a poor peasant, you didn't feel deep shame about it. You believed it was God's will. Today, if you are poor, society tells you it is entirely your own fault.",
    layer1:
      "Modern society is built on the myth of the pure meritocracy—the idea that anyone can make it if they just work hard enough. The dark side of this myth is that if you don't 'make it,' you must be lazy or stupid. This causes chronic Status Anxiety.",
    layer2:
      "Every time we meet someone new, they ask 'What do you do?' We are terrified of answering because we know they will use our job title to calculate our human value. De Botton argues we must reject this brutal equation: luck, illness, and economic macro-cycles dictate far more of our financial outcome than pure merit.",
    quiz: {
      question:
        "Why does the concept of 'Meritocracy' actually increase our psychological suffering?",
      options: [
        "Because meritocracies inevitably collapse into aristocracies.",
        "Because it implies that if you are unsuccessful, it is entirely your own fault, turning poverty into a source of deep personal shame.",
        "Because meritocracies force everyone to work 80-hour weeks.",
        "Because it makes the wealthy feel guilty about their success.",
      ],
      correctIndex: 1,
      explanation:
        "If you believe success is 100% based on merit, then you must logically believe that failure is 100% based on a lack of merit. This makes financial struggles intensely humiliating.",
    },
    related: ["P4", "V2"], // Wealth and social constructs
    furtherReading: [
      {
        label: "Status Anxiety",
        source: "The School of Life",
        url: "https://www.theschooloflife.com/article/status-anxiety/",
      },
    ],
    tags: ["Social Constructs", "Wealth, Leverage & Judgment"],
  },
  {
    id: "AA21",
    clusterId: "O", // Philosophy
    title: "Romanticism vs. Classicism",
    author: "Alain de Botton",
    year: 2016,
    medium: "Philosophy",
    category: "Culture",
    thesis:
      "Modern misery is largely caused by the dominance of Romanticism, which tells us to follow our passions blindly, rather than Classicism, which values reason and low expectations.",
    layer0:
      "The School of Life divides human worldviews into two camps. Romanticism believes in following your heart, finding your 'soulmate,' and trusting your gut. Classicism believes in following reason, accepting human flaws, and building institutions.",
    layer1:
      "For the last 200 years, Romanticism has dominated Western culture. It tells us that love should be entirely based on a magical, spontaneous feeling. If the feeling fades, the relationship must be over. It tells us work must be our ultimate 'passion,' and if it's boring, we are failing.",
    layer2:
      "Classicism is a powerful antidote. A Classicist expects life to be difficult. They know that no one is perfectly compatible, so they value the skill of compromise over the luck of finding a 'soulmate.' They don't expect their job to fulfill their soul; they expect it to pay the bills. By dramatically lowering our romantic expectations, Classicism paradoxically makes us much happier.",
    quiz: {
      question:
        "How does a 'Classicist' view a long-term relationship differently than a 'Romantic'?",
      options: [
        "A Classicist believes in finding a perfect soulmate, while a Romantic settles for whoever is closest.",
        "A Classicist believes love is a choice built on compromise and realistic expectations, while a Romantic believes it must be based on constant, passionate feeling.",
        "A Classicist relies entirely on horoscopes to choose a partner.",
        "A Classicist avoids relationships entirely to focus on their career.",
      ],
      correctIndex: 1,
      explanation:
        "Romanticism demands perfection and constant passion, leading to inevitable disappointment. Classicism expects flaws and friction, making it far more resilient.",
    },
    related: ["O5", "Q2"], // Philosophy and practical wisdom
    furtherReading: [
      {
        label: "Romanticism vs Classicism",
        source: "The School of Life",
        url: "https://www.theschooloflife.com/article/romanticism-and-classicism/",
      },
    ],
    tags: ["Philosophy & the Self", "Meaning & Self"],
  },

  // THE MARGINALIAN
  {
    id: "AA22",
    clusterId: "N", // Craft & Focus
    title: "Negative Capability",
    author: "John Keats",
    year: 1817,
    medium: "Letter",
    category: "Creativity",
    thesis:
      "True creative genius requires the ability to comfortably exist in a state of uncertainty, mystery, and doubt without irritably reaching for facts and reason.",
    layer0:
      "The poet John Keats noticed that most people hate not knowing the answer. If they face a mystery, they rush to explain it away with a quick fact or a lazy theory to relieve their anxiety.",
    layer1:
      "Keats called the opposite trait 'Negative Capability.' It is the rare psychological strength to just sit in the darkness of the unknown. To observe a contradiction or a paradox and just let it be, without immediately trying to force it into a logical spreadsheet.",
    layer2:
      "This is the core engine of creativity. If you immediately categorize a new experience using your existing mental models, you will only ever produce clichés. Negative capability allows the mind to stay open long enough for genuinely novel connections to form in the subconscious.",
    quiz: {
      question: "In the context of creativity, what is 'Negative Capability'?",
      options: [
        "The habit of criticizing your own work so harshly that you stop creating.",
        "The ability to tolerate uncertainty, mystery, and doubt without immediately rushing to find a logical explanation.",
        "The psychological trait that causes people to only focus on the negative aspects of a project.",
        "The capacity to absorb negative feedback from editors without taking it personally.",
      ],
      correctIndex: 1,
      explanation:
        "By resisting the urge to prematurely 'solve' a mystery or force an answer, you allow deeper, more profound creative connections to form over time.",
    },
    related: ["O1", "Y1"], // Paradoxes and Philosophy
    furtherReading: [
      {
        label: "John Keats on Negative Capability",
        source: "The Marginalian",
        url: "https://www.themarginalian.org/2012/11/01/john-keats-on-negative-capability/",
      },
    ],
    tags: ["Craft & Deep Work", "First-Principles Thinking"],
  },
  {
    id: "AA23",
    clusterId: "O", // Philosophy
    title: "The Porcupine Dilemma",
    author: "Arthur Schopenhauer",
    year: 1851,
    medium: "Philosophy",
    category: "Relationships",
    thesis:
      "Human intimacy is a paradox: we need each other for warmth and survival, but if we get too close, we inevitably stab each other with our flaws.",
    layer0:
      "Imagine a group of porcupines freezing on a cold winter night. To survive, they huddle together for body heat. But as soon as they get close, their sharp quills stab one another.",
    layer1:
      "In pain, they pull apart. But then the freezing cold sets in again, forcing them back together. They repeat this painful dance—freezing, stabbing, pulling apart—until they finally find the exact right distance where they get just enough warmth without causing too much pain.",
    layer2:
      "Schopenhauer used this to describe human relationships. Our internal emptiness (the cold) drives us into relationships. But our prickly egos, traumas, and flaws (the quills) cause us to hurt the people we get closest to. The goal of maturity is not to merge completely with another person, but to find that polite, respectful distance where you can share warmth without drawing blood.",
    quiz: {
      question: "What is the metaphorical lesson of Schopenhauer's Porcupine Dilemma?",
      options: [
        "Humans should remain entirely isolated to avoid getting hurt.",
        "We must completely dull our 'quills' (flaws) before we are worthy of love.",
        "Intimacy is a delicate balance of finding the right psychological distance to share warmth without inflicting too much pain on each other.",
        "The coldness of the universe makes all human relationships ultimately meaningless.",
      ],
      correctIndex: 2,
      explanation:
        "You cannot have intimacy without friction. The goal is to calibrate the distance so that the warmth outweighs the inevitable pricks of human flaws.",
    },
    related: ["O2", "O3"], // Psychology
    furtherReading: [
      {
        label: "Schopenhauer's Porcupine Dilemma",
        source: "The Marginalian",
        url: "https://www.themarginalian.org/2015/02/10/schopenhauer-porcupine-dilemma-freud/",
      },
    ],
    tags: ["Philosophy & the Self", "Meaning & Self"],
  },
  {
    id: "AA24",
    clusterId: "O", // Philosophy
    title: "Live the Questions",
    author: "Rainer Maria Rilke",
    year: 1903,
    medium: "Letter",
    category: "Wisdom",
    thesis:
      "Do not rush to find answers to life's deepest dilemmas; you must learn to love the questions themselves until you gradually live your way into the answer.",
    layer0:
      "When we are young, we are desperate for certainty. We want to know exactly what our career should be, who we should marry, and what the meaning of life is. When we can't find the answers immediately, we feel a deep, agonizing anxiety.",
    layer1:
      "The poet Rilke advised a young writer to stop searching for the answers, because 'you would not be able to live them.' The answers to deep existential questions cannot be handed to you in a book; they can only be understood through decades of lived experience.",
    layer2:
      "Rilke suggests a radical shift in perspective: you must learn to love the unresolved questions themselves, treating them like 'locked rooms' or 'books written in a very foreign tongue.' If you patiently hold the tension of not knowing, you will gradually, without even noticing it, live your way into the answer.",
    quiz: {
      question:
        "Why does Rilke advise against frantically searching for the answers to life's biggest dilemmas?",
      options: [
        "Because the answers to life's questions do not actually exist.",
        "Because even if someone gave you the answer, you lack the lived experience required to actually understand and embody it.",
        "Because asking questions is a sign of philosophical weakness.",
        "Because the universe is inherently chaotic and randomly assigns fates.",
      ],
      correctIndex: 1,
      explanation:
        "Existential truths cannot be memorized like math formulas. They must be earned through the slow accumulation of life experience.",
    },
    related: ["O4", "AA22"], // Existentialism and Negative Capability
    furtherReading: [
      {
        label: "Rilke on Living the Questions",
        source: "The Marginalian",
        url: "https://www.themarginalian.org/2012/06/01/rilke-on-questions/",
      },
    ],
    tags: ["Philosophy & the Self", "Meaning & Self"],
  },
];

newNodes.forEach((node) => {
  nodesArray.addElement(JSON.stringify(node, null, 2));
});

sourceFile.saveSync();
console.log(`Successfully injected ${newNodes.length} nodes from Batch 4.`);
