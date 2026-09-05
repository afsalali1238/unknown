import type { Node } from "../nodes.ts";
export const CLUSTER_K: Node[] = [
  {
    id: "K1",
    clusterId: "K",
    title: "Compounding",
    author: "Albert Einstein (attrib.)",
    year: 1950,
    medium: "Model",
    category: "Time",
    thesis: "Small advantages, repeated, become enormous.",
    layer0:
      "Compounding is what happens when returns generate more returns. A 1% daily improvement is 37x in a year — not because each step is large, but because each step builds on the last. It applies to money, skill, reputation, and relationships.",
    layer1:
      "The counterintuitive part is that most of the payoff comes very late. For a long time, compounding looks disappointing — a curve almost indistinguishable from a straight line. Only near the end does the hockey stick appear. This is why patience beats intelligence in most compounding games: the impatient exit before the curve turns up.",
    layer2:
      "Identify one thing in your life where compounding is real — savings, a language, a craft, a friendship. Then ask what would break the chain. The goal is not to accelerate but to avoid interruption.",
    quiz: {
      question: "Why do most people underestimate compounding?",
      options: [
        "The math is genuinely wrong for long horizons. — a surface-level gloss that misses the threshold where the claim stops applying.",
        "It only works for money. — a neat inversion that makes the effect sound like the cause.",
        "The early years look linear and boring, so people quit before the curve bends.",
        "Compounding is a myth. — a tempting paraphrase that drops the precise condition that makes the thesis work.",
      ],
      correctIndex: 2,
      explanation:
        "Compounding is deceptive because the massive gains happen at the very end of the curve. People quit early because they judge linear progress instead of exponential potential.",
    },
    tags: ["Compounding & Patience"],
    related: ["J29", "W6", "K6", "D6"],
    furtherReading: [
      {
        label: "The Psychology of Money",
        source: "book",
        url: "https://www.morganhousel.com/",
        archive: {
          status: "full",
          path: "content/sources/K1-0.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "K2",
    clusterId: "K",
    title: "Lindy Effect",
    author: "Nassim Taleb",
    year: 2012,
    medium: "Model",
    category: "Time",
    thesis: "The longer an idea or object has survived, the longer it is likely to keep surviving.",
    layer0:
      "For non-perishable things — books, technologies, institutions — every extra year of existence increases the expected remaining life. A book still read after 400 years is likely to be read for centuries more. A trendy 6-month-old technology probably won't be.",
    layer1:
      "The mechanism is selection: fragile things die quickly, so anything that survives has already passed harsh filters. Lindy is a prior — it doesn't guarantee survival, but it's a good baseline when you know nothing else. It also warns against the recency bias of assuming new is better; the new hasn't been tested yet.",
    layer2:
      "Look at your current reading list. What percentage is under 5 years old? Consider replacing one recent book with one that has survived a century — a bet on Lindy.",
    quiz: {
      question:
        "Applying Lindy to technology choice, which is a safer long-term bet, all else equal?",
      options: [
        "A framework released this year with hype.",
        "The most recently trending JavaScript library.",
        "Whatever your favorite tech influencer recommends.",
        "SQL, which has been production-critical for 50 years.",
      ],
      correctIndex: 3,
      explanation:
        "The Lindy Effect states that for non-perishable things (like ideas or technology), the longer something has survived, the longer it is likely to continue surviving. Age is a proxy for robustness.",
    },
    tags: ["Compounding & Patience", "Macro & Cycles"],
    related: ["D14", "D6", "C3", "K6"],
    furtherReading: [
      {
        label: "Antifragile",
        source: "book",
        url: "https://www.penguinrandomhouse.com/books/176227/antifragile-by-nassim-nicholas-taleb/",
        archive: {
          status: "full",
          path: "content/sources/K2-0.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "K3",
    clusterId: "K",
    title: "Path Dependence",
    author: "Paul David",
    year: 1985,
    medium: "Paper",
    category: "Time",
    thesis: "Where you end up depends on where you started and every step in between.",
    layer0:
      "The QWERTY keyboard isn't optimal — it was designed for mechanical typewriters. But we're stuck with it because every keyboard, every typist, and every training program built on the last one. Small early accidents can lock in outcomes for centuries.",
    layer1:
      "Path dependence emerges when there are increasing returns to adoption — each user makes the next user's choice easier. Networks, standards, careers, and cities all show it. The lesson isn't that early choices are always right; it's that they're often permanent, so early bets deserve more thought than late ones.",
    layer2:
      "Look at a choice you're locked into (a career, a codebase, a city). Trace the small decisions that put you there. Are any still worth revisiting, before the lock-in gets deeper?",
    quiz: {
      question: "Which is the best example of path dependence?",
      options: [
        "Choosing a programming language early in a codebase and being unable to reasonably switch a decade later.",
        "A random daily choice with no lasting effect. — a familiar retelling that strips out the contingency the source treats as central.",
        "Picking what to eat for lunch. — a surface-level gloss that misses the threshold where the claim stops applying.",
        "Choosing a movie on a Friday night. — a neat inversion that makes the effect sound like the cause.",
      ],
      correctIndex: 0,
      explanation:
        "Path dependence means that history matters. Early decisions in a complex system (like a codebase or an economy) lock in constraints that make switching paths nearly impossible later on.",
    },
    tags: ["Tech Adoption & Disruption"],
    related: ["A11", "K2", "I7", "C4"],
    furtherReading: [
      {
        label: "Clio and the Economics of QWERTY",
        source: "paper",
        url: "https://www.jstor.org/stable/1805621",
        archive: {
          status: "full",
          path: "content/sources/K3-0.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "K4",
    clusterId: "K",
    title: "Optionality",
    author: "Nassim Taleb",
    year: 2012,
    medium: "Model",
    category: "Time",
    thesis: "The right, but not obligation, to act is worth paying for.",
    layer0:
      "An option is asymmetric: bounded downside, open upside. If you can pay a small cost to preserve the ability to act later — a class you might not need, a friendship you might not lean on, a savings buffer — that option has real value even if you never exercise it.",
    layer1:
      "The reason optionality is undervalued is that human minds prefer clean commitments over uncertain rights. But in a volatile world, options survive shocks and let you exploit surprises. Careers with high optionality (transferable skills, savings, a network) outperform locked-in careers over long horizons, even when the locked-in career pays more per year.",
    layer2:
      "Audit your current life for optionality. What skills, savings, or relationships would give you the most room to move if things changed? Which are you starving?",
    quiz: {
      question: "Why is optionality often undervalued?",
      options: [
        "Because options are usually free. — a plausible reading that overlooks the limiting condition the text stresses.",
        "Because people prefer certainty and pay too little for the right to act later in a volatile world.",
        "Because options only pay off if exercised. — a familiar retelling that strips out the contingency the source treats as central.",
        "Because optionality doesn't exist in real life. — a surface-level gloss that misses the threshold where the claim stops applying.",
      ],
      correctIndex: 1,
      explanation:
        "Optionality is the right, but not the obligation, to take an action. In an unpredictable world, keeping your options open is incredibly valuable, even if it carries a short-term cost.",
    },
    tags: ["Risk & Asymmetric Bets"],
    related: ["A3", "D1", "D4", "C1"],
    furtherReading: [
      {
        label: "Antifragile",
        source: "book",
        url: "https://www.penguinrandomhouse.com/books/176227/antifragile-by-nassim-nicholas-taleb/",
        archive: {
          status: "full",
          path: "content/sources/K4-0.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "K5",
    clusterId: "K",
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
        "It is impossible to predict how much time you have left, so you shouldn't try.",
        "By the time you turn 18, you have already used up roughly 90% of your in-person time with them.",
      ],
      correctIndex: 3,
      explanation:
        "Because you live with them constantly for 18 years, the sheer volume of days spent together dwarfs the occasional visits you will have for the rest of their lives. You are in the final 10% of your time together.",
    },
    related: ["O11", "P1", "K1", "K6"],
    furtherReading: [
      {
        label: "The Tail End",
        source: "Wait But Why",
        url: "https://waitbutwhy.com/2015/12/the-tail-end.html",
        archive: {
          status: "full",
          path: "content/sources/K5-0.md",
          retrieved: "2026-07-16",
        },
      },
    ],
    tags: ["Meaning & Self", "Compounding & Patience"],
    epistemicStatus: "Canonical",
  },
  {
    id: "K6",
    clusterId: "K",
    title: "The Plateau of Latent Potential",
    author: "James Clear",
    year: 2018,
    medium: "Book Concept",
    category: "Habits",
    thesis:
      "Habits often appear to make no difference until you cross a critical threshold. People quit because they expect linear progress, but compounding is an exponential curve.",
    layer0:
      "Imagine an ice cube sitting on a table in a 25-degree room. You heat the room to 26... 27... 28... 29... 30... 31. Nothing happens. Then, at 32 degrees, the ice melts. The work wasn't wasted; it was just being stored.",
    layer1:
      "When we start a new habit, we expect progress to be a straight, diagonal line upward. But the reality is a curving exponential graph. In the early days, the curve is so flat it looks like nothing is happening. This gap between what we expect and what actually happens is called the 'Valley of Disappointment.'",
    layer2:
      "Because society only celebrates the dramatic moment the ice melts, we falsely believe that success is an overnight event. But true masters understand that the weeks of showing up and seeing absolutely zero visible results are the exact prerequisite for the sudden breakthrough.",
    quiz: {
      question:
        "Why do most people quit new habits early, according to the Plateau of Latent Potential?",
      options: [
        "They set goals that are physically impossible to achieve. — a common simplification that omits the key mechanism behind the effect.",
        "They run out of willpower because they didn't rely on systems. — an appealing shorthand that collapses a structural distinction into a surface similarity.",
        "They fail to establish an identity-based goal. — a plausible reading that overlooks the limiting condition the text stresses.",
        "They expect linear progress and get discouraged in the 'Valley of Disappointment' when the exponential curve starts flat.",
      ],
      correctIndex: 3,
      explanation:
        "Human intuition expects a 1-to-1 return on effort (linear). But compounding habits are exponential, meaning early efforts yield almost no visible results until they hit an inflection point.",
    },
    related: ["K1", "K2", "K5"],
    furtherReading: [
      {
        label: "Continuous Improvement",
        source: "James Clear",
        url: "https://jamesclear.com/continuous-improvement",
        archive: {
          status: "full",
          path: "content/sources/K6-0.md",
          retrieved: "2026-07-16",
        },
      },
    ],
    tags: ["Compounding & Patience"],
    epistemicStatus: "Canonical",
  },
];
