import { Project, SyntaxKind } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });
const sourceFile = project.getSourceFileOrThrow("src/data/nodes.ts");

const nodesArray = sourceFile
  .getVariableDeclarationOrThrow("NODES")
  .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const newNodes = [
  // UNTOOLS.CO
  {
    id: "AA1",
    clusterId: "L", // Decision-Making
    title: "The Cynefin Framework",
    author: "Dave Snowden",
    year: 1999,
    medium: "Framework",
    category: "Decision-Making",
    thesis:
      "You cannot manage a complex system the same way you manage a complicated one. You must adapt your decision-making to the domain you are in.",
    layer0:
      "The Cynefin framework helps leaders figure out what kind of problem they are facing so they can make better decisions. It divides situations into five domains: Clear, Complicated, Complex, Chaotic, and Confusion. If you treat a chaotic situation like a clear one, you will fail.",
    layer1:
      "In the Clear domain, cause and effect are obvious—you follow best practices. In the Complicated domain, cause and effect require expert analysis—you use good practices. In the Complex domain (like markets or culture), cause and effect are only clear in hindsight—you must probe, sense, and respond through safe-to-fail experiments. In the Chaotic domain, there is no relationship between cause and effect—you must act immediately to establish order.",
    layer2:
      "Most management failures happen when leaders treat a Complex problem (like a pandemic or a shifting market) as if it were merely Complicated, trying to solve it with rigid plans and expert committees. The Cynefin framework teaches you that in complex environments, you cannot plan your way to success; you must experiment your way forward, constantly probing the system and amplifying what works.",
    quiz: {
      question:
        "According to the Cynefin Framework, what is the correct approach to decision-making in a 'Complex' domain?",
      options: [
        "Analyze the situation using experts and create a rigid long-term plan.",
        "Act immediately with extreme force to establish order.",
        "Categorize the problem and apply established best practices.",
        "Probe the system with safe-to-fail experiments, sense the reaction, and respond.",
      ],
      correctIndex: 3,
      explanation:
        "Complex systems (like human behavior or markets) cannot be predicted or analyzed in advance. You must run small, safe experiments to 'probe' the system and see how it reacts before committing.",
    },
    related: ["J2", "J3"], // Connect to other mental models
    furtherReading: [
      {
        label: "Cynefin framework",
        source: "Untools",
        url: "https://untools.co/cynefin-framework",
      },
    ],
    tags: ["Decision-Making", "Cognitive Biases & Models", "Markets & Narrative"],
  },
  {
    id: "AA2",
    clusterId: "J", // Mental Models
    title: "The Iceberg Model",
    author: "Edward T. Hall",
    year: 1976,
    medium: "Framework",
    category: "Systems Thinking",
    thesis:
      "Events are just the tip of the iceberg. To truly solve a problem, you must look below the surface at the patterns, structures, and mental models driving it.",
    layer0:
      "When a bad event happens, our instinct is to simply react to it. But the Iceberg Model teaches us that single events are always driven by deeper forces. If you only treat the symptoms (the tip of the iceberg), the problem will keep happening.",
    layer1:
      "The model has four levels. 1) Events: What just happened? (React). 2) Patterns: Has this happened before? (Anticipate). 3) Underlying Structures: What rules, incentives, or physical realities caused this pattern? (Design). 4) Mental Models: What beliefs, values, or assumptions keep the structure in place? (Transform).",
    layer2:
      "For example, if a server crashes, the event is the crash (restart it). The pattern is that it crashes every Friday at 5 PM. The structure is that an automated backup script is overloading the CPU. The mental model is the engineering team prioritizing feature speed over system reliability. Solving the problem at the mental model level prevents a dozen other structural issues from ever occurring.",
    quiz: {
      question: "In the Iceberg Model, what is the deepest level that drives all the others?",
      options: ["Underlying Structures", "Patterns and Trends", "Mental Models", "Events"],
      correctIndex: 2,
      explanation:
        "Mental models (our core beliefs, values, and assumptions) are the foundation of the iceberg. They dictate the structures we build, which create the patterns of behavior, which ultimately result in single events.",
    },
    related: ["M1", "M2"], // Incentives
    furtherReading: [
      {
        label: "Iceberg Model",
        source: "Untools",
        url: "https://untools.co/iceberg-model",
      },
    ],
    tags: ["Incentives & Systems", "Cognitive Biases & Models"],
  },
  {
    id: "AA3",
    clusterId: "L", // Decision-Making
    title: "The Hard Choice Model",
    author: "Ruth Chang",
    year: 2014,
    medium: "Framework",
    category: "Decision-Making",
    thesis:
      "Hard choices aren't hard because you are stupid; they are hard because there is no objectively 'best' option. You must become the author of your own life by choosing what matters to you.",
    layer0:
      "When we struggle to make a decision, we often assume there is a 'right' answer we just haven't found yet. The Hard Choice Model reveals that in truly hard choices, the options are simply on par with each other. Neither is clearly better overall.",
    layer1:
      "Easy choices happen when one option is objectively better. Hard choices happen when options are fundamentally different but carry equal weight (like choosing between being a lawyer in the city or an artist in the country). Because science or logic cannot dictate which is 'better,' you cannot use a pros-and-cons list to solve it.",
    layer2:
      "When faced with a hard choice, you shouldn't look outward for the answer; you must look inward. Hard choices are opportunities to invent yourself. By committing to one option over another when there is no objective 'right' answer, you are actively choosing who you want to be. The difficulty is a feature, not a bug.",
    quiz: {
      question: "According to the Hard Choice Model, why do we struggle with hard choices?",
      options: [
        "Because we lack the necessary data to evaluate the options.",
        "Because we are too emotional to make rational decisions.",
        "Because the options are 'on par' and there is no objectively better choice.",
        "Because our cognitive biases blind us to the obvious right answer.",
      ],
      correctIndex: 2,
      explanation:
        "Hard choices exist because the alternatives are fundamentally different but hold equal overall value. Since neither is better, you must use your own agency to decide which values you want to embody.",
    },
    related: ["O4", "O5"], // Existentialism
    furtherReading: [
      {
        label: "Hard Choice Model",
        source: "Untools",
        url: "https://untools.co/hard-choice-model",
      },
    ],
    tags: ["Decision-Making", "Meaning & Self"],
  },

  // WAIT BUT WHY
  {
    id: "AA4",
    clusterId: "K", // Compounding & Time
    title: "The Tail End",
    author: "Tim Urban",
    year: 2015,
    medium: "Essay",
    category: "Life & Time",
    thesis:
      "When you measure your life in events rather than years, you realize you have already consumed the vast majority of your time with the people you love.",
    layer0:
      "We assume we have plenty of time left because we measure life in years. But if you are 30 years old, and you see your parents for one week a year, and they live for 30 more years, you don't have '30 years' left with them. You have exactly 30 weeks.",
    layer1:
      "For the first 18 years of your life, you spend almost every day with your parents. By the time you graduate high school, you have used up roughly 90% of your total in-person time with them. If you only see them on holidays, you are currently in the 'tail end' of your relationship.",
    layer2:
      "This mathematical framing applies to everything. How many more times will you swim in the ocean? Read a book? See your childhood friends? When you visualize your remaining time in blocks, you stop taking it for granted. It forces a brutal but necessary prioritization: you must actively choose where to allocate your remaining blocks, because the default path leads to regret.",
    quiz: {
      question: "What is the core realization of 'The Tail End' regarding time spent with parents?",
      options: [
        "You will spend an equal amount of time with them in every decade of your life.",
        "The quality of time matters more than the quantity of time.",
        "By the time you turn 18, you have already used up roughly 90% of your in-person time with them.",
        "It is impossible to predict how much time you have left, so you shouldn't try.",
      ],
      correctIndex: 2,
      explanation:
        "Because you live with them constantly for 18 years, the sheer volume of days spent together dwarfs the occasional visits you will have for the rest of their lives. You are in the final 10% of your time together.",
    },
    related: ["P1", "P2"], // Time management
    furtherReading: [
      {
        label: "The Tail End",
        source: "Wait But Why",
        url: "https://waitbutwhy.com/2015/12/the-tail-end.html",
      },
    ],
    tags: ["Meaning & Self", "Compounding & Patience"],
  },
  {
    id: "AA5",
    clusterId: "A", // Startups
    title: "The Cook and the Chef",
    author: "Tim Urban",
    year: 2015,
    medium: "Essay",
    category: "First Principles",
    thesis:
      "A Cook reasons by analogy, blindly following existing recipes. A Chef reasons from first principles, inventing new recipes from raw ingredients.",
    layer0:
      "Most people go through life acting like Cooks. They look at what other people are doing, copy the 'recipe' for success, and hope it works. But the visionaries who change the world operate like Chefs: they strip problems down to their fundamental truths and build up from there.",
    layer1:
      "Reasoning by analogy (the Cook) is highly efficient. It's how human culture survives—we don't need to reinvent the wheel every generation. But it traps us in conventional wisdom. First principles thinking (the Chef) is incredibly energy-intensive. You have to ignore what everyone else assumes is true and prove the physics or economics for yourself.",
    layer2:
      "Elon Musk used Chef thinking to build SpaceX. Everyone said rockets were wildly expensive. Musk broke a rocket down to its first principles: what are the raw materials (aluminum, titanium, carbon fiber)? What do they cost on the commodities market? It turned out the materials were only 2% of the rocket's cost. The other 98% was just the 'Cook's recipe' of doing things the way the aerospace industry had always done them.",
    quiz: {
      question:
        "According to 'The Cook and the Chef', what is the defining characteristic of a Chef?",
      options: [
        "They follow industry best practices more efficiently than anyone else.",
        "They reason by analogy to quickly solve complex problems.",
        "They break problems down to fundamental truths and reason from first principles.",
        "They rely heavily on the wisdom of crowds and social consensus.",
      ],
      correctIndex: 2,
      explanation:
        "Unlike the Cook who copies existing recipes (analogy), the Chef strips everything away to the raw ingredients (first principles) and invents entirely new ways of doing things.",
    },
    related: ["A2", "A5"], // Startups and First Principles
    furtherReading: [
      {
        label: "The Cook and the Chef",
        source: "Wait But Why",
        url: "https://waitbutwhy.com/2015/11/the-cook-and-the-chef-musks-secret-sauce.html",
      },
    ],
    tags: ["First-Principles Thinking", "Startups & Founders"],
  },
  {
    id: "AA6",
    clusterId: "N", // Craft & Focus
    title: "The Instant Gratification Monkey",
    author: "Tim Urban",
    year: 2013,
    medium: "Essay",
    category: "Productivity",
    thesis:
      "Procrastination is a battle between the Rational Decision Maker and the Instant Gratification Monkey, mediated only by the Panic Monster.",
    layer0:
      "Inside the brain of a procrastinator, the 'Rational Decision Maker' wants to do productive work. But he shares the steering wheel with the 'Instant Gratification Monkey,' who only cares about maximizing ease and fun in the present moment.",
    layer1:
      "The Monkey has no memory of the past and no vision of the future. When you need to work, the Monkey takes the wheel and drives you into the 'Dark Playground'—a place where leisure activities happen when you're supposed to be working, filling you with guilt and anxiety. The only thing the Monkey is terrified of is the 'Panic Monster.'",
    layer2:
      "The Panic Monster usually stays dormant but wakes up when a deadline gets dangerously close. The Monkey flees in terror, allowing the Rational Decision Maker to finally take control and finish the work in a stressful frenzy. However, this system catastrophically fails for long-term goals without deadlines (like getting in shape or writing a book), because the Panic Monster never wakes up.",
    quiz: {
      question:
        "In the procrastination model, why is it so difficult to accomplish long-term goals like writing a novel?",
      options: [
        "The Rational Decision Maker lacks the intelligence to plan long-term.",
        "The Dark Playground is too addictive to ever escape.",
        "Because there is no external deadline, the Panic Monster never wakes up to scare away the Monkey.",
        "The Instant Gratification Monkey slowly learns to defeat the Panic Monster over time.",
      ],
      correctIndex: 2,
      explanation:
        "The entire system relies on the Panic Monster waking up to enforce deadlines. For open-ended, lifelong goals, there is no deadline to trigger the panic, so the Monkey stays in control indefinitely.",
    },
    related: ["N1", "N2"], // Distraction
    furtherReading: [
      {
        label: "Why Procrastinators Procrastinate",
        source: "Wait But Why",
        url: "https://waitbutwhy.com/2013/10/why-procrastinators-procrastinate.html",
      },
    ],
    tags: ["Craft & Deep Work", "Cognitive Biases & Models"],
  },
];

newNodes.forEach((node) => {
  nodesArray.addElement(JSON.stringify(node, null, 2));
});

sourceFile.saveSync();
console.log(`Successfully injected ${newNodes.length} nodes from Batch 1.`);
