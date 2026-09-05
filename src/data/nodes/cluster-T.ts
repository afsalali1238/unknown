import type { Node } from "../nodes.ts";
export const CLUSTER_T: Node[] = [
  {
    id: "T1",
    clusterId: "T",
    title: "The Ultimate Guide to Writing Online",
    author: "David Perell",
    year: 2019,
    medium: "Essay",
    category: "Writing As Leverage",
    thesis:
      "Writing online works as a compounding, non-scarce asset and a serendipity engine — shifting from 'Writing from Scarcity' (staring at a blank page) to 'Writing from Abundance' (systematically capturing raw material before you need it) is what separates writers who publish consistently from those who don't, and consistent publishing eventually creates a 'Personal Monopoly,' a unique intersection of knowledge and voice that attracts aligned opportunities without competing for attention.",
    layer0:
      "Perell's essay reframes online writing as a compounding asset rather than a broadcast tool: instead of sitting down to write with a blank page and hoping for inspiration, Writing from Scarcity, the sustainable approach is Writing from Abundance — building a habit of capturing ideas as raw material, from books, conversations, and stray thoughts, the moment they occur, so that by the time you sit down to write, you're editing and assembling pre-existing notes rather than generating ideas from nothing.",
    layer1:
      "He pairs this capture habit with what he calls the Content Triangle: an idea gets compressed first in conversation, to test the logic out loud, then tested in short-form posts, to gauge audience resonance, and only then developed into a full essay — each stage filtering out what doesn't land before the highest-cost stage, long-form writing, gets attempted. Consistent output through this process, he argues, eventually produces a Personal Monopoly: a specific intersection of knowledge, voice, and interests distinctive enough that a writer stops competing in a crowded market and instead becomes the only source for that particular combination of ideas, which pulls in aligned opportunities on its own.",
    layer2:
      "Look at your last five pieces of writing or content, posts, notes, even long texts to friends. Were you writing from abundance, pulling from ideas you'd already captured, or from scarcity, forcing yourself to invent something on the spot? What's one habit that would let you capture more raw material before you need it?",
    quiz: {
      question: "According to Perell, what is 'Writing from Abundance'?",
      options: [
        "Publishing raw, unedited thoughts directly to social media as fast as possible",
        "Building a habit of capturing ideas and inspiration before you need them, so writing becomes editing and assembling rather than inventing from a blank page",
        "Writing exclusively about currently trending news topics",
        "Outsourcing the writing process entirely to freelance ghostwriters",
      ],
      correctIndex: 1,
      explanation:
        "Blank-page syndrome happens when you try to research and write simultaneously. 'Writing from abundance' means constantly collecting notes, so when you sit down to write, you are simply connecting ideas you already have.",
    },
    tags: ["Craft & Deep Work", "Compounding & Patience"],
    related: ["T2", "T3", "S4"],
    furtherReading: [
      {
        label: "The Ultimate Guide to Writing Online",
        source: "David Perell",
        url: "https://perell.com/essay/the-ultimate-guide-to-writing-online/",
        archive: {
          status: "full",
          path: "content/sources/T1-0.md",
          retrieved: "2026-07-16",
        },
      },
    ],
    epistemicStatus: "Contemporary",
  },
  {
    id: "T2",
    clusterId: "T",
    title: "The 4 Types of Luck",
    author: "Sahil Bloom",
    year: 2023,
    medium: "Newsletter",
    category: "Frameworks",
    thesis:
      "Luck isn't a single, uncontrollable force — it breaks into four distinct types, from pure chance to the luck you can systematically manufacture through motion, expertise, and a distinctive personal identity, meaning most of what determines your long-run 'luck' is actually a function of design choices, not chance.",
    layer0:
      "Drawing on neurologist James Austin's 1978 framework, Bloom breaks luck into four escalating types: Blind Luck, pure chance — where you're born, acts of God, entirely outside your control; Luck from Motion, generated simply by moving and acting, meeting people, trying things, increasing the number of possible collisions you could have; Luck from Awareness, spotting opportunities that only someone with deep domain expertise would even recognize as opportunities; and Luck from Uniqueness, a distinctive enough combination of skills and identity that opportunities seek you out rather than you chasing them.",
    layer1:
      "The progression matters because each type requires a different strategy and tends to dominate a different life stage: Type II luck, motion, is the right focus early on, showing up, saying yes, publishing consistently, since sheer volume of interaction is what a beginner can control. That accumulated experience is what eventually produces Type III, awareness, and sustained, distinctive output over years is what eventually produces Type IV, uniqueness, at which point you're no longer hunting for opportunities, since your specific, hard-to-replicate position starts attracting them on its own. The framework's practical use is as a diagnostic: if you feel stuck, the fix usually isn't 'wait for good luck,' it's identifying which type of luck you're currently capable of generating and doing more of exactly that.",
    layer2:
      "Which type of luck are you currently in the best position to generate — motion, through more volume and action, awareness, through deepening expertise in a specific domain, or uniqueness, through a distinctive combination you already have but haven't leaned into? What's one concrete action this week that matches that type?",
    quiz: {
      question:
        "According to Bloom's framework (via James Austin), what characterizes 'Luck from Uniqueness'?",
      options: [
        "Randomly inheriting advantageous circumstances at birth",
        "Hustling and saying yes to as many opportunities as possible to increase collisions",
        "A distinctive combination of skills, interests, and identity so specific that opportunities seek the person out rather than being chased",
        "Studying a domain long enough to recognize subtle, faint opportunities others miss",
      ],
      correctIndex: 2,
      explanation:
        "While dumb luck happens to anyone, and hustling creates active luck, Type IV luck happens when you've built such a unique reputation that random, highly specific opportunities naturally gravitate toward you.",
    },
    tags: ["Risk & Asymmetric Bets", "Wealth, Leverage & Judgment"],
    related: ["T1", "T3", "T4"],
    furtherReading: [
      {
        label: "The 4 Types of Luck",
        source: "The Curiosity Chronicle (Sahil Bloom)",
        url: "https://www.sahilbloom.com/newsletter/the-4-types-of-luck",
        archive: {
          status: "full",
          path: "content/sources/T2-0.md",
          retrieved: "2026-07-16",
        },
      },
    ],
    epistemicStatus: "Contemporary",
  },
  {
    id: "T3",
    clusterId: "T",
    title: "Interstitial Journaling",
    author: "Anne-Laure Le Cunff",
    year: 2020,
    medium: "Essay",
    category: "Mindful Productivity",
    thesis:
      "Logging a few sentences at the exact transition point between tasks — what you just did, how you feel, what's next — reduces cognitive load and counters procrastination more effectively than either rigid daily planning or end-of-day review, because it intervenes precisely at the moment attention is most likely to drift.",
    layer0:
      "Interstitial journaling, a technique Le Cunff adapted from Tony Stubblebine, replaces both the rigid forward-looking to-do list and the exhausting end-of-day review with something simpler: writing a timestamped note, a sentence or two, every time you finish one task and move to the next, capturing what you just did, any lingering thought or anxiety, and what you're about to start.",
    layer1:
      "The mechanism works on two levels. First, it targets procrastination at its actual source — Le Cunff argues procrastination is usually an emotional-regulation problem, not a discipline problem, and naming a feeling, 'feeling anxious about this call,' in the moment lets the brain process it instead of escaping into a distraction. Second, it neutralizes the Zeigarnik effect, the tendency for unfinished tasks to keep nagging at working memory — dumping the loose thread into the journal before switching tasks frees up attention that would otherwise keep circling back to what's unfinished, making the next task easier to actually focus on.",
    layer2:
      "Notice the next time you finish a task and feel the pull toward a phone or a new tab before starting the next one. Try writing one timestamped line instead, what you just did, how you feel, what's next, and see whether that small pause changes what you do next.",
    quiz: {
      question:
        "What does interstitial journaling specifically ask you to do, according to Le Cunff?",
      options: [
        "Write a comprehensive journal entry only once, at the end of the day",
        "Plan out every hour of the day in advance before starting any work",
        "Avoid writing anything down and rely on memory to track progress",
        "Write a short, timestamped note at the exact transition point between finishing one task and starting the next",
      ],
      correctIndex: 3,
      explanation:
        "By writing down what you just finished, what you are feeling, and what you will do next during transitions, you close 'open loops' in your brain and prevent cognitive residue from ruining your next task.",
    },
    tags: ["Craft & Deep Work", "Incentives & Systems"],
    related: ["T1", "T2", "T4"],
    furtherReading: [
      {
        label: "Interstitial journaling: combining notes, to-do and time tracking",
        source: "Ness Labs",
        url: "https://nesslabs.com/interstitial-journaling",
        archive: {
          status: "full",
          path: "content/sources/T3-0.md",
          retrieved: "2026-07-16",
        },
      },
    ],
    epistemicStatus: "Contemporary",
  },
  {
    id: "T4",
    clusterId: "T",
    title: "Networked Note-Taking",
    author: "Anne-Laure Le Cunff",
    year: 2020,
    medium: "Essay",
    category: "Productivity",
    thesis:
      "The brain doesn't work in rigid, hierarchical folders; it works through associative links. Your note-taking system should do the same.",
    layer0:
      "Most people organize their digital files like physical filing cabinets: putting documents inside folders inside folders. But what if a note belongs in two folders? Networked note-taking solves this by letting you link notes directly to each other, like Wikipedia.",
    layer1:
      "Using bi-directional links (where Note A links to Note B, and Note B automatically knows Note A linked to it), you create a digital graph of your knowledge. This prevents ideas from dying in forgotten folders. Instead, they naturally surface when you explore related topics.",
    layer2:
      "The power of networked thought is emergent discovery. Over time, as you interlink concepts from books, podcasts, and personal reflections, entirely new ideas emerge from the intersections. You are no longer just storing information; you are building a 'second brain' that thinks alongside you.",
    quiz: {
      question:
        "What is the primary flaw of traditional, folder-based note-taking according to the networked thought model?",
      options: [
        "Folders take up too much hard drive space.",
        "Folders force a single, rigid hierarchy, whereas human thoughts are associative and often belong in multiple contexts.",
        "Folders cannot be searched as quickly as a database.",
        "Folders are too easy to accidentally delete.",
      ],
      correctIndex: 1,
      explanation:
        "Ideas rarely fit perfectly into a single category. By forcing a note into a single folder, you artificially sever its connection to all the other contexts it might be relevant to.",
    },
    related: ["N1", "T1", "T3"],
    furtherReading: [
      {
        label: "Networked Note-taking",
        source: "Ness Labs",
        url: "https://nesslabs.com/networked-note-taking",
        archive: {
          status: "full",
          path: "content/sources/T4-0.md",
          retrieved: "2026-07-16",
        },
      },
    ],
    tags: ["Craft & Deep Work"],
    epistemicStatus: "Contemporary",
  },
  {
    id: "T5",
    clusterId: "T",
    title: "35 Things I Know At 35 I Wish I Knew At 25",
    author: "Sahil Bloom",
    year: 2026,
    medium: "X (Twitter) Article",
    category: "Self-Development",
    thesis:
      "A birthday-prompted reflection compiling 35 life lessons that cluster around a small number of repeated themes — action beats information-gathering, nobody is watching as closely as you fear, and durable things take longer to build than shortcuts promise.",
    layer0:
      "\"Nobody cares\" is rule four. Not as cynicism — as permission. When you're winning, nobody cares. When you're losing, nobody cares. So the thing you've always wanted to do: go do it.",
    layer1:
      "The 35 lessons compress into a handful of recurring mechanisms: dopamine from action beats dopamine from information-gathering (rule 5), reliability beats occasional brilliance (rule 29), 'anything above zero compounds' so consistency beats perfection (rule 11), and the most repeated idea across the whole list — that real, durable things (careers, relationships, health) take a long time to build and chasing shortcuts leads to peril (rule 14). Bloom also flags a specific failure pattern: 'life will test you with the same challenge until you learn the lesson' — the same fight in every relationship, the same burnout in every job — until the underlying pattern actually gets addressed.",
    layer2:
      "The honest tension in a list like this is that any single lesson sounds like generic self-help, but the accumulation across 35 has more evidential weight — it's one person's attempt to name the patterns that kept recurring across a full decade. Which of the 35 is currently the one your own life is testing you on repeatedly?",
    quiz: {
      question:
        "What does Bloom mean by 'life will test you with the same challenge until you learn the lesson'?",
      options: [
        "That recurring problems (the same fight in every relationship, the same burnout in every job) tend to persist until the underlying personal pattern causing them is actually addressed.",
        "That bad luck is randomly distributed and unrelated to personal patterns.",
        "That life gets easier automatically after age 30.",
        "That every challenge is unique and never repeats.",
      ],
      correctIndex: 0,
      explanation:
        "This lesson frames recurring struggles as diagnostic rather than random — the same category of problem showing up across different contexts (relationships, jobs, pursuits) is treated as a signal that the internal pattern, not the external circumstance, is the actual variable to fix.",
    },
    related: ["T1", "T2"],
    furtherReading: [
      {
        label: "35 Things I Know At 35 I Wish I Knew At 25",
        source: "X (Twitter) Article",
        url: "https://x.com/SahilBloom/status/2010376554199572482",
        type: "article",
        archive: {
          status: "full",
          path: "content/sources/T5-0.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    tags: ["Meaning & Self", "Decision-Making"],
    epistemicStatus: "Contemporary",
  },
];
