import type { Node } from "../nodes.ts";
export const CLUSTER_Y: Node[] = [
  {
    id: "Y1",
    clusterId: "Y",
    title: "The Ontology of Identity and the Ship of Theseus",
    author: "SleepWise",
    year: 2023,
    medium: "Video Essay",
    category: "Philosophy / Paradox",
    thesis:
      "The continuity of physical identity is a cognitive heuristic rather than a physical reality, as demonstrated by the Ship of Theseus paradox and the continuous cellular regeneration of the human body.",
    layer0:
      'The Ship of Theseus tests the boundaries of identity: if a ship\'s decaying planks are replaced one by one over centuries until none of the original material remains, is it still the same ship? If the removed planks were reassembled into a second ship, which one is the "real" one? The paradox targets essentialism — the intuition that objects and people have an underlying, unchanging essence that persists regardless of physical alteration.',
    layer1:
      "This isn't just an abstract puzzle — it maps directly onto biology. Over roughly seven to ten years, almost every cell in the human body dies and is replaced. The person you are today shares very little physical material with the person you were a decade ago, so identity can't be rooted in matter. Cognitive science suggests people instead assign identity based on spatio-temporal continuity (the unbroken observable path of the object through time) and functional organization (the pattern the parts are arranged in) — identity as psychological projection over dynamic, ever-changing matter.",
    layer2:
      "If identity is a perceived pattern rather than a physical fact, concepts like moral responsibility and ownership become fluid: is a rehabilitated, cellularly-renewed prisoner literally the same entity that committed the crime, or a biological successor? As cybernetic augmentation and mind uploading approach, this becomes a practical engineering question — at what threshold does gradual neural replacement stop preserving the original person and start being a new one? The self is a useful fiction.",
    quiz: {
      question:
        "According to cognitive science, what do humans primarily rely on to assign continuous identity to an object whose physical parts are entirely replaced?",
      options: [
        "Spatio-temporal continuity and functional organization",
        "The chemical composition of the new parts",
        "The monetary or historical value of the object",
        "The original DNA or molecular signature of the object",
      ],
      correctIndex: 0,
      explanation:
        "Identity is not bound to specific physical atoms (which are constantly replaced in our bodies). We assign identity based on the continuity of the pattern and function over time.",
    },
    tags: ["Meaning & Self"],
    related: ["O2", "Y2", "Y3", "Y5"],
    furtherReading: [
      {
        label: "3 Hours of Brain F*ck Paradoxes to Fall Asleep To",
        source: "SleepWise",
        url: "https://www.youtube.com/watch?v=l01DyPfV10Y",
        archive: {
          status: "unavailable",
        },
      },
    ],
    epistemicStatus: "Speculative",
  },
  {
    id: "Y2",
    clusterId: "Y",
    title: "Entropic Inevitability and the Arrow of Time",
    author: "SleepWise",
    year: 2023,
    medium: "Video Essay",
    category: "Physics",
    thesis:
      "The perceived unidirectional flow of time is not a fundamental property of the universe's mechanics, but an emergent psychological symptom of the Second Law of Thermodynamics and cosmic entropy.",
    layer0:
      "The fundamental laws of physics are time-symmetric — a video of colliding billiard balls looks valid forward or backward. Yet macroscopically, time strictly moves forward: an egg cracks but never un-cracks. This asymmetry, the Arrow of Time, is dictated entirely by entropy, a measure of disorder. The Second Law of Thermodynamics says entropy in an isolated system must always increase, so the direction of time is simply the direction in which cosmic disorder grows.",
    layer1:
      "Entropy increases because there are vastly more ways for a system to be disordered than ordered — a shattered egg has millions of possible arrangements, an intact one only a few. Systems naturally evolve toward higher-probability (disordered) states. We experience an Arrow of Time at all only because the universe began in an unimaginably low-entropy state at the Big Bang, and we're riding that gradient as the universe slowly equalizes. Even forming a memory generates heat — entropy — tying human time-perception directly to cosmic disorder.",
    layer2:
      'At maximum entropy (theoretical Heat Death), temperature is uniform and no thermodynamic work can be extracted — without an entropy gradient, the Arrow of Time itself ceases, since "happening" requires energy transfer. Over sufficiently long timescales past Heat Death, random statistical fluctuations could theoretically cause entropy to spontaneously decrease in localized regions — pockets of cosmos where time runs backward, reassembling broken systems through sheer probability.',
    quiz: {
      question:
        "Why do macroscopic events (like a breaking egg) demonstrate an Arrow of Time, while microscopic events (like particle collisions) are generally time-symmetric?",
      options: [
        "Microscopic particles do not experience the force of gravity",
        "Macroscopic systems are governed by statistical probability, which heavily favors states of higher entropy (disorder)",
        "Quantum mechanics overrides thermodynamics on a large scale",
        "The observer effect forces macroscopic objects to decay",
      ],
      correctIndex: 1,
      explanation:
        "The laws of physics work the same forwards and backwards. The only reason time has a direction (an 'arrow') is because the universe started in an unusually low-entropy state and is statistically overwhelming its way toward higher disorder.",
    },
    tags: ["Meaning & Self", "First-Principles Thinking"],
    related: ["X6", "Y1", "Y3", "Y5"],
    furtherReading: [
      {
        label: "3 Hours of Most Misunderstood Physics Concepts to Fall Asleep To",
        source: "SleepWise",
        url: "https://www.youtube.com/watch?v=fQDm9AeED9M",
        archive: {
          status: "unavailable",
        },
      },
    ],
    epistemicStatus: "Speculative",
  },
  {
    id: "Y3",
    clusterId: "Y",
    title: "The Hard Problem and the Illusion of Objective Reality",
    author: "SleepWise",
    year: 2023,
    medium: "Video Essay",
    category: "Neuroscience / Philosophy",
    thesis:
      "Consciousness cannot currently be reduced to physical brain mechanics, rendering objective reality inaccessible and the perceived universe a psychological construct generated by neural architecture.",
    layer0:
      'Science can map exactly how visual data from an apple is processed in the occipital lobe and triggers motor function — the "easy problem" of consciousness. The "Hard Problem" asks why that processing is accompanied by subjective, internal experience at all. Why does red actually look like red? These subjective, qualitative properties are called qualia, and despite huge advances in neuroscience, there\'s no physical account of how non-conscious matter gives rise to a rich, internal subjective world.',
    layer1:
      "Because all sensory data is processed internally, you've never directly seen, touched, or heard the external world — only your brain's translation of it, projected onto the screen of consciousness. Colors don't exist in the physical universe; they're the brain's translation of electromagnetic wavelengths. Sound is the translation of pressure waves. The vivid \"world\" you navigate daily is a localized simulation running entirely inside a dark, silent skull.",
    layer2:
      "If reality is fundamentally an internal simulation, absolute objective truth is unattainable, and every organism exists in its own isolated phenomenological universe — the seed of Solipsism, the inability to prove any other mind exists. It also raises the Philosophical Zombie problem: an entity physically identical to a human, mimicking all behavior and speech, but with no internal conscious experience. Since you only have access to your own qualia, it's scientifically impossible to prove the people around you are conscious rather than complex automatons.",
    quiz: {
      question:
        "What fundamentally differentiates the 'Hard Problem' of consciousness from the 'easy problems'?",
      options: [
        "The hard problem requires quantum computing to model",
        "The hard problem deals with memory retention, while the easy problem deals with visual acuity",
        "The easy problem maps neurological functions, while the hard problem questions why these functions result in subjective experience (qualia)",
        "The hard problem is purely mathematical and devoid of biology",
      ],
      correctIndex: 2,
      explanation:
        "Science is excellent at explaining the mechanics of the brain (the 'easy' problems). But it has no framework for explaining why those mechanics are accompanied by the subjective, inner experience of actually feeling them (the 'hard problem').",
    },
    tags: ["Meaning & Self"],
    related: ["O15", "X1", "Y1", "Y5"],
    furtherReading: [
      {
        label: "The Human Mind Explained to Fall Asleep To",
        source: "SleepWise",
        url: "https://www.youtube.com/watch?v=ysxP1ZRngcQ",
        archive: {
          status: "unavailable",
        },
      },
    ],
    epistemicStatus: "Speculative",
  },
  {
    id: "Y4",
    clusterId: "Y",
    title: "Lexical Voids and Untranslatable Human Emotions",
    author: "SleepWise",
    year: 2024,
    medium: "Video Essay",
    category: "Psychology / Linguistics",
    thesis:
      "The human emotional spectrum extends vastly beyond standardized vocabulary; exploring untranslatable linguistic voids reveals the hidden, complex micro-emotions that silently govern the human condition.",
    layer0:
      "Language acts as a bounding box for thought — if there's no word for a feeling, it's hard to communicate, contextualize, or even fully legitimize in your own mind. Yet people collectively experience a vast array of specific, profound emotions English has no term for. Borrowing or coining words for these lexical voids validates universal but previously unspoken experiences, providing vocabulary for the complexity of modern existential awareness.",
    layer1:
      "Sonder is the sudden realization that every passerby has a life as vivid as your own, in which you're an extra in the background. Hiraeth, Welsh, is a visceral homesickness for a home you can't return to, or that maybe never existed. Kenopsia is the eerie atmosphere of a usually bustling place now abandoned, like a school hallway at night. Naming these states produces emotional granularity, which studies show measurably reduces anxiety and improves emotional regulation.",
    layer2:
      "The existence of these voids highlights how much human alienation stems from a plain lack of vocabulary. When someone feels Monachopsis — the subtle, persistent sense of being out of place — but only has the blunt word \"sadness,\" the gap between the actual experience and the label causes real psychological distress. Expanding the emotional lexicon isn't just poetic; it's a necessary evolution of empathy, letting people recognize the vast, shared, unseen emotional landscape of the species.",
    quiz: {
      question:
        "What psychological benefit is directly associated with increasing one's 'emotional granularity' by learning specific words for highly nuanced feelings?",
      options: [
        "It improves long-term memory retention",
        "It permanently eliminates negative emotional responses",
        "It slows down the subjective perception of time",
        "It reduces anxiety and enhances emotional regulation by accurately contextualizing internal states",
      ],
      correctIndex: 3,
      explanation:
        "Without precise words for specific emotions, our brains struggle to categorize our internal state, leading to generalized anxiety. Learning nuanced vocabulary gives the brain the tools it needs to regulate those feelings.",
    },
    tags: ["Meaning & Self"],
    related: ["O7", "Y1", "Y2"],
    furtherReading: [
      {
        label: "Every Feeling You Can't Name Explained to Fall Asleep To",
        source: "SleepWise",
        url: "https://www.youtube.com/watch?v=8nvt8zGY7cc",
        archive: {
          status: "unavailable",
        },
      },
    ],
    epistemicStatus: "Speculative",
  },
  {
    id: "Y5",
    clusterId: "Y",
    title: "Axiomatic Ruptures: The Banach-Tarski Paradox",
    author: "SleepWise",
    year: 2024,
    medium: "Video Essay",
    category: "Mathematics / Physics",
    thesis:
      "The Banach-Tarski paradox demonstrates that mathematical reality, untethered from physical limitations, allows for the creation of matter from nothing — exposing a fundamental rupture between human logic and the axioms of infinity.",
    layer0:
      "In physical reality, cutting a solid gold sphere into pieces and reassembling them never yields two identical gold spheres of the original size — matter is conserved. In pure mathematics, the Banach-Tarski paradox proves the equivalent is possible: a solid 3D mathematical sphere can be disassembled into a handful of point sets and reassembled into two identical, solid spheres of the same original volume, with no gaps and no extra points.",
    layer1:
      'This is a rigorously proven theorem in set-theoretic geometry, resting on infinity and the "Axiom of Choice." Because a mathematical sphere contains infinitely many zero-dimensional points, the "pieces" aren\'t solid chunks but infinitely dense scatters of points — non-measurable sets. Rotated and shifted, their infinite nature lets them "fill in" two spheres perfectly. It exposes how uncountably infinite sets behave: infinity divided by two is still infinity. Volume, it turns out, isn\'t an inherent property of all sets of points.',
    layer2:
      "Banach-Tarski can't be performed with physical atoms, which have finite size — but it raises a real question: is mathematics invented by humans, or discovered as a fundamental truth of the universe? If it's the underlying language of the cosmos, how can it contain logically sound theorems that explicitly violate the laws of physics? Some physicists suggest that at the quantum level, where classical notions of continuous space break down, phenomena analogous to Banach-Tarski might show up in the physics of the quantum vacuum and virtual particles.",
    quiz: {
      question:
        "What foundational mathematical rule is required to make the Banach-Tarski paradox logically function?",
      options: [
        "The Axiom of Choice applied to uncountably infinite point sets",
        "The Pythagorean Theorem",
        "The Second Law of Thermodynamics",
        "Non-Euclidean spatial curvature",
      ],
      correctIndex: 0,
      explanation:
        "The Banach-Tarski paradox proves that if you accept the Axiom of Choice, you can mathematically cut a solid sphere into pieces and reassemble them into two identical spheres, defying all physical intuition.",
    },
    tags: ["First-Principles Thinking"],
    related: ["R6", "Y2", "Y1"],
    furtherReading: [
      {
        label: "Every REAL Glitch in the Matrix Revealed to Fall Asleep To",
        source: "SleepWise",
        url: "https://www.youtube.com/watch?v=N-nIWs58As8",
        archive: {
          status: "unavailable",
        },
      },
    ],
    epistemicStatus: "Speculative",
  },
  {
    id: "Y6",
    clusterId: "Y",
    title: "The Asymmetry of Cosmic Justice",
    author: "SleepWise",
    year: 2023,
    medium: "Video Essay",
    category: "Psychology / Sociology",
    thesis:
      "The human mind inherently craves narrative balance and karmic fairness, but reality operates on an asymmetric distribution of effort, leverage, and luck, brutally nullifying the illusion of meritocracy.",
    layer0:
      'From early childhood, people are indoctrinated into the "Just-World Hypothesis": hard work is rewarded, bad deeds are eventually punished, fairness prevails. The harder truth: the universe has no moral ledger. Hard work doesn\'t guarantee success, toxic people prosper without consequence, and catastrophic failure can happen to someone doing everything right. Recognizing this asymmetry is a painful but necessary step toward actually functioning in the world as it is.',
    layer1:
      "The asymmetry between effort and reward is governed by leverage, compounding, and chaotic luck, not moral virtue. The economy doesn't reward the hardest physical worker; it rewards whoever holds the most leverage — capital, specialized knowledge, network position. A laborer working 80 hours a week earns a fraction of a developer whose code scales at zero marginal cost. Negative events also stick harder due to evolutionary negativity bias: trust takes years to build and seconds to destroy, a mirror of physical entropy — decay is the default state, order requires constant, unrewarded energy.",
    layer2:
      "Clinging to the illusion of cosmic fairness breeds resentment and operational paralysis — every stroke of bad luck gets processed as a personal betrayal by the universe. Accepting the asymmetry instead is what empowers action: realizing nobody is coming to save you and that you're replaceable in every context obliterates complacency, shifting the operating framework from seeking validation to building leverage and resilience directly.",
    quiz: {
      question: "How do societal reward structures conflict with the Just-World Hypothesis?",
      options: [
        "Society perfectly tracks and rewards moral purity over time",
        "The world primarily rewards leverage and scale, not inherently hard work or virtue",
        "Society only rewards manual, physical labor",
        "Bad deeds are always immediately punished by economic forces",
      ],
      correctIndex: 1,
      explanation:
        "The universe is indifferent to morality. We naturally want to believe that hard work and virtue are rewarded, but physical and economic realities overwhelmingly reward leverage, timing, and scale.",
    },
    tags: ["Cognitive Biases & Models", "Risk & Asymmetric Bets"],
    related: ["J16", "Y7", "Y1"],
    furtherReading: [
      {
        label: "The Most Brutal Truths of Life to Fall Asleep To",
        source: "SleepWise",
        url: "https://www.youtube.com/watch?v=lQLBgPAcRhk",
        archive: {
          status: "unavailable",
        },
      },
    ],
    epistemicStatus: "Speculative",
  },
  {
    id: "Y7",
    clusterId: "Y",
    title: "Predictive Processing",
    author: "Andy Clark",
    year: 2013,
    medium: "Neuroscience",
    category: "Cognition",
    thesis:
      "Your brain does not passively receive reality through your eyes and ears. It hallucinates reality, and only uses your senses to correct its errors.",
    layer0:
      "We assume our eyes work like cameras, streaming data to the brain for processing. Neuroscience now suggests the opposite: the brain is locked in a dark, silent skull. It generates its own 'best guess' (a hallucination) of what is happening outside.",
    layer1:
      "This is called Predictive Processing. The brain sends its predictions down to the sensory organs. The sensory organs only send signals back up to the brain if reality *disagrees* with the prediction (prediction errors).",
    layer2:
      "When you walk down your familiar street, you aren't really 'seeing' it. Your brain is hallucinating it perfectly because it has prior data. You only truly 'see' something when a novel object (like a fallen tree) creates a prediction error, forcing the brain to update its internal model. You are literally hallucinating your reality right now, guided by sensory constraints.",
    quiz: {
      question:
        "According to Predictive Processing, what is the primary role of your sensory organs?",
      options: [
        "To stream high-definition reality into the brain for processing.",
        "To generate the hallucinations that form consciousness.",
        "To permanently store long-term memories.",
        "To send signals to the brain only when reality differs from the brain's prediction.",
      ],
      correctIndex: 3,
      explanation:
        "Sensory input is largely just an 'error-correction' mechanism. The brain does the heavy lifting of generating the world; the eyes and ears just report back when the brain's guess is wrong.",
    },
    related: ["O1", "Y1", "Y6"],
    furtherReading: [
      {
        label: "The Predictive Brain",
        source: "Aeon",
        url: "https://aeon.co/essays/how-the-predictive-brain-makes-us-hallucinate-our-reality",
        archive: {
          status: "full",
          path: "content/sources/Y7-0.md",
          retrieved: "2026-07-16",
        },
      },
    ],
    tags: ["Philosophy & the Self", "Cognitive Biases & Models"],
    epistemicStatus: "Speculative",
  },
];
