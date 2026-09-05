import type { Node } from "../nodes.ts";
export const CLUSTER_AD: Node[] = [
  {
    id: "AD1",
    clusterId: "AD",
    title: "Hebbian Theory: Neurons That Fire Together, Wire Together",
    author: "Donald Hebb",
    year: 1949,
    medium: "Book",
    category: "Neuroscience",
    thesis:
      "Learning is physical — repeated co-activation between neurons strengthens the connection between them, which is how experience becomes structure.",
    layer0:
      "Hebb's 1949 rule is the closest thing neuroscience has to a founding law: neurons that fire together, wire together. Every habit, skill, and memory is this rule running on repeat.",
    layer1:
      "Hebb proposed that when one neuron repeatedly helps fire another, the connection between them physically strengthens, becoming more efficient next time. This synaptic plasticity is now the accepted basis for how memory and learning are encoded at the cellular level, decades before brain imaging could confirm it. It also explains why repetition builds skill, and why breaking a habit means weakening a wired pathway, not just willing it away.",
    layer2:
      "What pathway have you unconsciously wired together through repetition — a reaction, a scroll habit, a way of arguing — that you're now trying to consciously rewire?",
    quiz: {
      question:
        "According to Hebbian theory, what physically changes in the brain when learning occurs?",
      options: [
        "New neurons are created every time something is learned — this view emphasizes t",
        "The brain's total size increases with each new memory — this view emphasizes the",
        "Neurons that fire together are chemically destroyed and replaced — this view emp",
        "The synaptic connection between two neurons strengthens when one repeatedly helps activate the other",
      ],
      correctIndex: 3,
      explanation:
        "Hebb's postulate is about connection strength, not neuron count — repeated co-activation is what physically encodes a memory or skill.",
    },
    tags: ["Craft & Deep Work", "Cognitive Biases & Models"],
    related: ["AD4", "U8", "N7"],
    furtherReading: [
      {
        label: "Hebbian Theory",
        source: "article",
        url: "https://en.wikipedia.org/wiki/Hebbian_theory",
        archive: {
          status: "full",
          path: "content/sources/AD1-0.md",
          retrieved: "2026-07-17",
        },
      },
      {
        label: "Donald Olding Hebb",
        source: "article",
        url: "https://can-acn.org/donald-olding-hebb/",
        archive: {
          status: "full",
          path: "content/sources/AD1-1.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    epistemicStatus: "Canonical",
  },
  {
    id: "AD2",
    clusterId: "AD",
    title: "The Default Mode Network",
    author: "Marcus Raichle",
    year: 2001,
    medium: "Paper",
    category: "Neuroscience",
    thesis:
      "The brain doesn't go idle at rest — a specific network becomes more active the moment you stop focusing on a task, and it burns a disproportionate share of the brain's total energy doing it.",
    layer0:
      "Raichle kept seeing the same brain regions go quiet exactly when a task started, scan after scan. In 2001 he named what they were doing instead: the brain's default mode.",
    layer1:
      "Brain imaging kept showing regions — medial prefrontal, posterior cingulate, lateral parietal cortex — that quiet down during external tasks, then reactivate when attention turns inward: mind-wandering, remembering, imagining the future. Raichle's 2001 paper named this baseline activity the 'default mode,' overturning the assumption that rest meant low brain activity — the network burns roughly 20% of the brain's energy doing 'nothing.'",
    layer2:
      "When was the last genuinely unstructured, unstimulated stretch of time you gave your mind — no podcast, no scroll — and what did it produce that focused work couldn't?",
    quiz: {
      question: "What did Raichle's 2001 discovery of the default mode network overturn?",
      options: [
        "The theory that different brain regions are specialized for different functions — this view emphasizes the sam",
        "The theory that memories are stored primarily in the hippocampus — this view emphasizes the same outcome but a",
        "The assumption that the resting brain is largely inactive — instead, a specific network becomes more active during rest and mind-wandering",
        "The belief that neurons communicate via electrical signals — this view emphasizes the same outcome but attribu",
      ],
      correctIndex: 2,
      explanation:
        "Brain scans had long treated the 'resting' state as a low-activity baseline; Raichle showed a specific network actually increases activity during rest, consuming a large share of the brain's energy budget on internally-directed thought.",
    },
    tags: ["Craft & Deep Work", "Meaning & Self"],
    related: ["AD1", "N7", "O2"],
    furtherReading: [
      {
        label: "Default mode network",
        source: "article",
        url: "https://en.wikipedia.org/wiki/Default_mode_network",
        archive: {
          status: "full",
          path: "content/sources/AD2-0.md",
          retrieved: "2026-07-17",
        },
      },
      {
        label: "A default mode of brain function (2001, PNAS)",
        source: "paper",
        url: "https://www.pnas.org/doi/10.1073/pnas.98.2.676",
        archive: {
          status: "full",
          path: "content/sources/AD2-1.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    epistemicStatus: "Contemporary",
  },
  {
    id: "AD3",
    clusterId: "AD",
    title: "Active Parents Raise Active Children",
    author: "Lynn L. Moore et al.",
    year: 1991,
    medium: "Journal article",
    category: "Health & Behavior",
    thesis:
      "A child's physical activity level correlates far more strongly with an active mother than with an active father — and children of two active parents are nearly six times more likely to be active than children of two inactive parents.",
    layer0:
      "Researchers strapped accelerometers onto 100 four-to-seven-year-olds and both of their parents for a full year. The pattern that fell out was not subtle.",
    layer1:
      "Published in the Journal of Pediatrics from the Framingham Children's Study, the study found children of active mothers were about twice as likely to be active themselves; children of active fathers, only modestly more so. When both parents were active, children were 5.8 times more likely to be active than children of two inactive parents. The authors point to several possible mechanisms: parents as role models the child imitates, shared family activity time, and active parents actively enrolling their kids in physical pursuits.",
    layer2:
      "This is a correlational study, not a controlled experiment — the '5.8 times more likely' finding doesn't prove that watching Mom exercise is the causal lever, since genetics and shared environment are tangled together with modeling. But the asymmetry between mother and father effect sizes is itself a data point worth sitting with: what does it suggest about who children are actually watching?",
    quiz: {
      question:
        "In the Framingham Children's Study, which parent's activity level correlated most strongly with a young child's own physical activity?",
      options: [
        "The father's activity level, more than the mother's.",
        "Neither parent's activity showed any correlation.",
        "The mother's activity level, more than the father's.",
        "Only the activity of same-sex parent and child correlated.",
      ],
      correctIndex: 2,
      explanation:
        "The study found children of active mothers were roughly twice as likely to be active, a notably stronger effect than the correlation found with active fathers.",
    },
    related: ["AD1", "AD2", "AD4"],
    furtherReading: [
      {
        label:
          "Influence of parents' physical activity levels on activity levels of young children",
        source: "Journal of Pediatrics, 118(2):215-9",
        url: "https://pubmed.ncbi.nlm.nih.gov/1993953/",
        type: "paper",
        archive: {
          status: "full",
          path: "content/sources/AD3-0.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    tags: ["Health & Body"],
    epistemicStatus: "Canonical",
  },
  {
    id: "AD4",
    clusterId: "AD",
    title: "Neuroplasticity: The Brain That Changes Itself",
    author: "Norman Doidge",
    year: 2007,
    medium: "Book",
    category: "Neuroscience",
    thesis:
      "The brain physically rewires itself in response to repeated thought and behavior throughout adulthood, not just childhood — meaning habits, skills, and even chronic thought patterns are more changeable at a neural level than 'fixed personality' framing suggests.",
    layer0:
      "Your brain isn't the fixed hardware it feels like. It's closer to software that rewrites its own wiring based on what you repeatedly do and think.",
    layer1:
      "Neuroplasticity describes the brain's capacity to form new neural connections and reorganize existing ones throughout life, not only during a childhood 'critical period' as older models assumed. Repeated practice strengthens specific neural pathways (the popularized shorthand is 'neurons that fire together wire together'), which is the mechanistic basis for skill acquisition, habit formation, and — the thread's more provocative claim — the ability to consciously reshape ingrained thought patterns rather than accept them as permanent traits.",
    layer2:
      "The caution worth adding: popular neuroplasticity content often overstates how fast or how completely adult rewiring happens compared to what the research actually shows. Real change is possible but typically requires sustained, deliberate repetition over a much longer horizon than most threads imply. What's a thought pattern you've been treating as fixed that might actually just be well-worn?",
    quiz: {
      question:
        "What does neuroplasticity fundamentally challenge about older models of brain development?",
      options: [
        "That the brain has no capacity to change at all, at any age. — this view emphasizes the same outcom",
        "That only physical injury can alter brain structure. — this view emphasizes the same outcome but at",
        "That memory and learning are unrelated to brain structure. — this view emphasizes the same outcome ",
        "That the brain can only change during a narrow childhood critical period, with no meaningful rewiring possible in adulthood.",
      ],
      correctIndex: 3,
      explanation:
        "The core update neuroplasticity research made to older neuroscience was demonstrating that meaningful neural reorganization continues well into adulthood, not just during early developmental windows.",
    },
    related: ["AD1", "AD3"],
    furtherReading: [
      {
        label:
          "The Brain That Changes Itself: Stories of Personal Triumph from the Frontiers of Brain Science",
        source: "Norman Doidge (Penguin Random House)",
        url: "https://www.penguinrandomhouse.com/books/54295/the-brain-that-changes-itself-by-norman-doidge-md/",
        type: "article",
        archive: {
          status: "full",
          path: "content/sources/AD4-0.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    tags: ["Health & Body", "Cognitive Biases & Models"],
    epistemicStatus: "Canonical",
  },
];
