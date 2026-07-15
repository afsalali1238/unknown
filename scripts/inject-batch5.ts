import { Project, SyntaxKind } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });
const sourceFile = project.getSourceFileOrThrow("src/data/nodes.ts");

const nodesArray = sourceFile
  .getVariableDeclarationOrThrow("NODES")
  .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const newNodes = [
  // BIG THINK
  {
    id: "AA25",
    clusterId: "R", // Big Hypotheses
    title: "The Kardashev Scale",
    author: "Nikolai Kardashev",
    year: 1964,
    medium: "Astrophysics",
    category: "Futurism",
    thesis:
      "A civilization's technological advancement can be measured purely by the amount of energy it is able to harness and utilize.",
    layer0:
      "If we find alien life, how will we know how advanced they are? Russian astrophysicist Nikolai Kardashev proposed a simple scale based on energy consumption: Type I (Planetary), Type II (Stellar), and Type III (Galactic).",
    layer1:
      "A Type I civilization can harness all the energy reaching its home planet from its parent star (we are currently at about Type 0.73). A Type II civilization can harness the entire energy output of its star, likely by building a Dyson Sphere around it. A Type III civilization commands the energy of its entire galaxy.",
    layer2:
      "The Kardashev scale forces us to think about deep time and the limits of physics. Going from Type 0 to Type I is considered the most dangerous filter for a civilization, because they have the technology to destroy themselves (nuclear weapons, climate change) but lack the planetary control to save themselves. If humanity survives the next few centuries, we may achieve Type I status.",
    quiz: {
      question:
        "According to the Kardashev scale, what is the defining feature of a Type II civilization?",
      options: [
        "They have mastered faster-than-light travel.",
        "They can harness 100% of the energy output of their parent star.",
        "They have merged their biological brains with artificial intelligence.",
        "They have colonized multiple galaxies in the local group.",
      ],
      correctIndex: 1,
      explanation:
        "The Kardashev scale is entirely based on energy extraction. Type II civilizations have built megastructures (like Dyson Spheres) to capture the total energy of a sun.",
    },
    related: ["I3", "R2"], // Fermi Paradox
    furtherReading: [
      {
        label: "The Kardashev Scale",
        source: "Big Think",
        url: "https://bigthink.com/hard-science/kardashev-scale/",
      },
    ],
    tags: ["AI & the Future"],
  },
  {
    id: "AA26",
    clusterId: "O", // Philosophy
    title: "The Overview Effect",
    author: "Frank White",
    year: 1987,
    medium: "Psychology",
    category: "Space",
    thesis:
      "Seeing the Earth from orbit triggers a profound cognitive shift, revealing the fragility of the planet and the artificiality of human borders.",
    layer0:
      "Almost every astronaut who has looked out the window of a spacecraft and seen the Earth floating in the black void of space reports experiencing the exact same psychological phenomenon: a sudden, overwhelming sense of unity and protectiveness.",
    layer1:
      "This 'Overview Effect' completely rewrites a person's cognitive map. Down on the surface, we spend our lives fighting over borders, politics, and resources. From orbit, those borders physically vanish. The atmosphere, which seems like a massive, infinite sky from the ground, looks like a fragile, paper-thin glowing blue line.",
    layer2:
      "The Overview Effect is essentially a forced state of profound mindfulness and cosmic perspective. Philosophers argue that if we could somehow induce the Overview Effect in world leaders—forcing them to confront the tiny, fragile reality of the only home we have—it would instantly end all wars. It proves that our violent tribalism is a hallucination of scale.",
    quiz: {
      question: "What is the primary psychological realization triggered by the Overview Effect?",
      options: [
        "A sense of terror and insignificance regarding the vastness of the universe.",
        "A profound realization of the Earth's fragility and the meaningless nature of human borders.",
        "A sudden understanding of complex orbital mechanics.",
        "An overwhelming desire to leave Earth and colonize other planets.",
      ],
      correctIndex: 1,
      explanation:
        "Seeing the Earth as a single, fragile, borderless sphere hanging in a dark void instantly dissolves tribal and nationalistic divisions.",
    },
    related: ["O1", "J1"], // Mental Models
    furtherReading: [
      {
        label: "The Overview Effect",
        source: "Big Think",
        url: "https://bigthink.com/space/overview-effect/",
      },
    ],
    tags: ["Philosophy & the Self", "Meaning & Self"],
  },
  {
    id: "AA27",
    clusterId: "R", // Big Hypotheses
    title: "Dark Forest Theory",
    author: "Liu Cixin",
    year: 2008,
    medium: "Science Fiction",
    category: "Futurism",
    thesis:
      "The universe is full of life, but everyone is hiding in absolute silence because revealing your location guarantees your destruction.",
    layer0:
      "The Fermi Paradox asks: if the universe is so vast and old, where are all the aliens? The Dark Forest Theory provides a terrifying answer: they are out there, but they are staying perfectly quiet to survive.",
    layer1:
      "Imagine a dark forest at night. It is full of armed hunters hiding in the shadows. If a hunter hears a twig snap, they don't call out to say 'hello'—they shoot immediately, because in a dark forest, anyone you encounter is a potential threat to your own survival.",
    layer2:
      "In the universe, 'chains of suspicion' make communication impossible. You can never truly know if an alien species is peaceful or hostile. Furthermore, because of exponential technological growth, a 'primitive' species today could become a threat in a mere thousand years. Therefore, the only rational, game-theoretic move for an advanced civilization is to instantly annihilate any civilization that reveals its location. Humanity's current practice of broadcasting radio signals into space is equivalent to a child yelling in a dark forest.",
    quiz: {
      question:
        "According to Dark Forest Theory, why does a civilization instantly annihilate a newly discovered species?",
      options: [
        "To harvest their planet's natural resources for energy.",
        "Because of religious or ideological fanaticism.",
        "Because the 'chain of suspicion' makes trust impossible, and letting them live risks your own eventual destruction.",
        "Because they are bored and have nothing else to do.",
      ],
      correctIndex: 2,
      explanation:
        "Game theory dictates that since you can never be 100% sure the other species won't eventually kill you (especially given exponential technological growth), the only rational move to guarantee your own survival is a preemptive strike.",
    },
    related: ["R2", "L1"], // Fermi Paradox and Decision Making
    furtherReading: [
      {
        label: "Dark Forest Theory",
        source: "Big Think",
        url: "https://bigthink.com/surprising-science/the-dark-forest-theory-a-terrifying-explanation-of-why-we-havent-heard-from-aliens-yet/",
      },
    ],
    tags: ["AI & the Future", "Incentives & Systems"],
  },

  // BEHAVIORAL SCIENTIST
  {
    id: "AA28",
    clusterId: "M", // Systems & Incentives
    title: "Choice Architecture",
    author: "Richard Thaler",
    year: 2008,
    medium: "Economics",
    category: "Behavioral Science",
    thesis:
      "There is no such thing as a 'neutral' design. The way choices are presented to us inherently nudges our behavior in a specific direction.",
    layer0:
      "If you run a school cafeteria, the order in which you arrange the food determines what the kids will eat. If the apples are at eye level and the cake is hidden in the back, the kids will eat more apples. The cafeteria director is a 'Choice Architect.'",
    layer1:
      "Classical economics assumes humans are perfectly rational calculators who will always choose what is best for them, regardless of how the options are presented. Behavioral economics proves this is false. We are lazy, and our decisions are heavily influenced by default options, visual placement, and the framing of the question.",
    layer2:
      "You can use Choice Architecture defensively and offensively. Defensively, you can recognize when an app or a corporation is manipulating your environment to make you buy something. Offensively, you can design your own physical environment to nudge yourself toward your goals—like putting your running shoes on your pillow, or deleting social media apps from your phone's home screen.",
    quiz: {
      question: "What is the core premise of 'Choice Architecture'?",
      options: [
        "Humans will always make rational decisions regardless of the environment.",
        "There is no neutral way to present options; the design of the environment always influences the decision.",
        "People hate having choices and prefer to be told what to do.",
        "Restricting people's choices is the only way to ensure good behavior.",
      ],
      correctIndex: 1,
      explanation:
        "Whether it's the layout of a grocery store or the default settings on an organ donation form, the way the choices are organized inevitably nudges behavior.",
    },
    related: ["M1", "M2"], // Incentives
    furtherReading: [
      {
        label: "Nudge and Choice Architecture",
        source: "Behavioral Scientist",
        url: "https://behavioralscientist.org/nudge-turns-10-a-conversation-with-richard-thaler/",
      },
    ],
    tags: ["Incentives & Systems", "Cognitive Biases & Models"],
  },
  {
    id: "AA29",
    clusterId: "U", // Cognitive Biases
    title: "Hyperbolic Discounting",
    author: "Richard Herrnstein",
    year: 1961,
    medium: "Psychology",
    category: "Cognitive Bias",
    thesis:
      "Given two similar rewards, humans overwhelmingly prefer the one that arrives sooner. Our brains aggressively 'discount' the value of rewards the further they are in the future.",
    layer0:
      "If I offer you $100 today or $110 tomorrow, you will likely wait for tomorrow. But if I offer you $100 today or $110 in a year, you will almost certainly take the $100 today. Your brain discounts the future value because the future is uncertain.",
    layer1:
      "This makes perfect sense from an evolutionary perspective. For a caveman, immediate calories (eating the berry now) were vastly superior to future calories (planting a farm), because the caveman might be eaten by a tiger tomorrow. The problem is that our modern world requires long-term planning (saving for retirement), which our brains are fundamentally wired to hate.",
    layer2:
      "To beat hyperbolic discounting, you have to find ways to make your future self feel 'real' to your present self. You can also use commitment devices: lock away your money, publicly declare your goals, or artificially increase the immediate pain of failing (like giving a friend $500 and telling them to donate it to a political party you hate if you don't hit the gym).",
    quiz: {
      question: "Why did Hyperbolic Discounting evolve in human psychology?",
      options: [
        "Because early humans lived in highly unstable, dangerous environments where delaying gratification usually meant dying.",
        "Because early humans were incredibly long-term planners.",
        "As a byproduct of the development of complex language.",
        "To help humans build long-term agricultural settlements.",
      ],
      correctIndex: 0,
      explanation:
        "In an environment where you might get eaten by a predator at any moment, the brain correctly evolved to prioritize immediate, guaranteed rewards over future, uncertain ones.",
    },
    related: ["K1", "U1"], // Compounding and Bias
    furtherReading: [
      {
        label: "Hyperbolic Discounting",
        source: "Behavioral Scientist",
        url: "https://behavioralscientist.org/topics/behavioral-economics/",
      },
    ],
    tags: ["Cognitive Biases & Models", "Compounding & Patience"],
  },
  {
    id: "AA30",
    clusterId: "M", // Systems & Incentives
    title: "Sludge",
    author: "Cass Sunstein",
    year: 2018,
    medium: "Economics",
    category: "Behavioral Science",
    thesis:
      "Sludge is the evil twin of the Nudge. It is the intentional addition of excessive friction designed to stop you from doing something that benefits you.",
    layer0:
      "A 'Nudge' makes it easier for you to make a good decision (like automatically enrolling you in a retirement plan). 'Sludge' makes it intentionally difficult for you to do something (like a 15-page form required to apply for financial aid, or having to call a phone number during business hours to cancel a digital subscription).",
    layer1:
      "Corporations use Sludge to protect their revenue. By making the cancellation process incredibly annoying and confusing, they exploit your cognitive laziness. Government agencies use Sludge (sometimes accidentally, sometimes intentionally) to reduce the number of people claiming benefits they are legally entitled to.",
    layer2:
      "Sludge imposes a massive cognitive tax on society, particularly on the poor and overwhelmed, who lack the time and bandwidth to navigate the bureaucratic friction. The ultimate defense against Sludge is regulation (like laws requiring 'one-click cancellations') and a personal awareness of when a system is intentionally draining your energy to extract value.",
    quiz: {
      question: "How does 'Sludge' differ from a 'Nudge' in behavioral economics?",
      options: [
        "A Nudge is used by the government, while Sludge is only used by corporations.",
        "A Nudge relies on financial incentives, while Sludge relies on emotional manipulation.",
        "A Nudge removes friction to encourage a beneficial behavior, while Sludge intentionally adds friction to discourage a behavior.",
        "Sludge is a physical environmental change, while a Nudge is a digital change.",
      ],
      correctIndex: 2,
      explanation:
        "Sludge weaponizes friction. It exploits human laziness by making the process of doing something (like canceling a subscription or applying for aid) so annoying that people just give up.",
    },
    related: ["M1", "AA28"], // Incentives and Choice Architecture
    furtherReading: [
      {
        label: "Sludge and Friction",
        source: "Behavioral Scientist",
        url: "https://behavioralscientist.org/sludge-and-the-administrative-state/",
      },
    ],
    tags: ["Incentives & Systems", "Cognitive Biases & Models"],
  },
];

newNodes.forEach((node) => {
  nodesArray.addElement(JSON.stringify(node, null, 2));
});

sourceFile.saveSync();
console.log(`Successfully injected ${newNodes.length} nodes from Batch 5.`);
