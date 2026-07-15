import { Project, SyntaxKind } from "ts-morph";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });
const sourceFile = project.getSourceFileOrThrow("src/data/nodes.ts");

const nodesArray = sourceFile
  .getVariableDeclarationOrThrow("NODES")
  .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

const newNodes = [
  // NESS LABS
  {
    id: "AA7",
    clusterId: "N", // Craft & Focus
    title: "The Generation Effect",
    author: "Anne-Laure Le Cunff",
    year: 2020,
    medium: "Essay",
    category: "Learning",
    thesis:
      "You remember information significantly better if you actively generate it from your own mind rather than passively reading it.",
    layer0:
      "The Generation Effect proves that reading a textbook over and over is a terrible way to study. Instead, if you force your brain to actually generate the answer (like using a flashcard or taking a practice quiz), your retention skyrockets.",
    layer1:
      "When you passively read, your brain experiences the illusion of competence ('I recognize this, so I must know it'). But recognition is not recall. Actively generating an answer forces your brain to build and strengthen the neural pathways required to retrieve that information later.",
    layer2:
      "To use the Generation Effect, you must embrace difficulty. When you finish reading an article, don't just highlight it. Close the tab and force yourself to write a three-sentence summary from memory. The mental strain you feel while struggling to remember is the exact physical mechanism of learning taking place.",
    quiz: {
      question: "According to the Generation Effect, why is highlighting a poor study method?",
      options: [
        "It focuses too much on visual learning rather than auditory.",
        "It causes the brain to experience the illusion of competence because recognition is mistaken for recall.",
        "It takes up too much time compared to speed-reading.",
        "The bright colors distract the brain from forming long-term memories.",
      ],
      correctIndex: 1,
      explanation:
        "Highlighting is a passive activity. You recognize the words on the page, but because you aren't forcing your brain to generate the information from scratch, you aren't building retrieval pathways.",
    },
    related: ["U1"], // Cognitive Biases
    furtherReading: [
      {
        label: "The Generation Effect",
        source: "Ness Labs",
        url: "https://nesslabs.com/generation-effect",
      },
    ],
    tags: ["Craft & Deep Work", "Cognitive Biases & Models"],
  },
  {
    id: "AA8",
    clusterId: "U", // Cognitive Biases
    title: "The Zeigarnik Effect",
    author: "Bluma Zeigarnik",
    year: 1927,
    medium: "Psychology",
    category: "Cognition",
    thesis:
      "The human brain remembers uncompleted or interrupted tasks significantly better than completed ones, causing lingering anxiety until the loop is closed.",
    layer0:
      "Have you ever laid in bed trying to sleep, but your brain kept reminding you of an email you forgot to send? That's the Zeigarnik Effect. Your brain holds onto unfinished tasks, keeping them active in your short-term memory and causing stress.",
    layer1:
      "Bluma Zeigarnik, a psychologist, noticed that waiters could remember incredibly complex orders perfectly—until the bill was paid. The moment the transaction was completed, they forgot everything. The brain dedicates cognitive resources to 'open loops' and immediately dumps them when the loop closes.",
    layer2:
      "You can hack the Zeigarnik Effect to your advantage. First, to stop the anxiety of uncompleted tasks, write them down. A trusted external system (like a to-do list) acts as a 'closed loop' for the brain, allowing it to let go. Second, to beat procrastination, just start a task for 5 minutes and stop. The open loop will drive you crazy until you go back and finish it.",
    quiz: {
      question: "How can you use the Zeigarnik Effect to overcome procrastination?",
      options: [
        "By finishing all your easy tasks first to build momentum.",
        "By refusing to write anything down so your brain remembers it.",
        "By starting a task for just five minutes and then pausing, creating an open loop that your brain will want to close.",
        "By creating strict deadlines managed by the Panic Monster.",
      ],
      correctIndex: 2,
      explanation:
        "Once a task is started but left incomplete, the Zeigarnik Effect kicks in. Your brain will hold onto the 'open loop' and nag you to finish it, overriding your procrastination.",
    },
    related: ["N2"], // Focus
    furtherReading: [
      {
        label: "The Zeigarnik Effect",
        source: "Ness Labs",
        url: "https://nesslabs.com/zeigarnik-effect",
      },
    ],
    tags: ["Craft & Deep Work", "Cognitive Biases & Models"],
  },
  {
    id: "AA9",
    clusterId: "T", // Modern Creator Essayists
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
    related: ["N1", "T1"], // Zettelkasten
    furtherReading: [
      {
        label: "Networked Note-taking",
        source: "Ness Labs",
        url: "https://nesslabs.com/networked-note-taking",
      },
    ],
    tags: ["Craft & Deep Work"],
  },

  // JAMES CLEAR
  {
    id: "AA10",
    clusterId: "Q", // Practical Wisdom
    title: "Identity-Based Habits",
    author: "James Clear",
    year: 2018,
    medium: "Book Concept",
    category: "Habits",
    thesis:
      "True behavior change is identity change. If you don't shift how you view yourself, you will eventually sabotage your new habits to align with your old identity.",
    layer0:
      "When trying to change, most people focus on the outcome ('I want to lose weight') and the process ('I will run every day'). But they ignore the deepest layer: identity. If you still see yourself as 'a lazy person trying to run,' the habit won't stick.",
    layer1:
      "There is a massive psychological difference between saying 'I'm trying to quit smoking' and 'I'm not a smoker.' The first person still identifies as a smoker who is resisting temptation. The second person has fundamentally shifted their identity.",
    layer2:
      "Every action you take is a vote for the type of person you wish to become. You do not need a unanimous vote to win an election; you just need a majority. By focusing on small, daily habits (like writing one sentence), you aren't just producing output—you are slowly casting enough votes to convince yourself that you are, in fact, a writer.",
    quiz: {
      question:
        "In the framework of Identity-Based Habits, how do your actions relate to your identity?",
      options: [
        "Actions are irrelevant; only your internal mindset matters.",
        "Your actions are the predetermined result of your genetic identity.",
        "Every action is a 'vote' for the type of person you wish to become, slowly building evidence of your new identity.",
        "You must fully believe in your new identity before you take any actions.",
      ],
      correctIndex: 2,
      explanation:
        "You cannot just 'think' your way into a new identity. You have to prove it to yourself through small, consistent actions that act as evidence.",
    },
    related: ["M1", "P3"],
    furtherReading: [
      {
        label: "Identity-Based Habits",
        source: "James Clear",
        url: "https://jamesclear.com/identity-based-habits",
      },
    ],
    tags: ["Meaning & Self", "Compounding & Patience"],
  },
  {
    id: "AA11",
    clusterId: "K", // Compounding & Time
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
        "They set goals that are physically impossible to achieve.",
        "They expect linear progress and get discouraged in the 'Valley of Disappointment' when the exponential curve starts flat.",
        "They run out of willpower because they didn't rely on systems.",
        "They fail to establish an identity-based goal.",
      ],
      correctIndex: 1,
      explanation:
        "Human intuition expects a 1-to-1 return on effort (linear). But compounding habits are exponential, meaning early efforts yield almost no visible results until they hit an inflection point.",
    },
    related: ["K1", "K2"],
    furtherReading: [
      {
        label: "Continuous Improvement",
        source: "James Clear",
        url: "https://jamesclear.com/continuous-improvement",
      },
    ],
    tags: ["Compounding & Patience"],
  },
  {
    id: "AA12",
    clusterId: "Q", // Practical Wisdom
    title: "Habit Stacking",
    author: "James Clear",
    year: 2018,
    medium: "Book Concept",
    category: "Habits",
    thesis:
      "The best way to build a new habit is to attach it to a habit you already do every single day.",
    layer0:
      "If you want to start meditating, don't just say 'I will meditate more.' It's too vague. Instead, use Habit Stacking: 'After I pour my morning cup of coffee, I will meditate for one minute.'",
    layer1:
      "Your brain has already built strong neural pathways for the habits you do effortlessly every day (brushing your teeth, closing your laptop, drinking coffee). Habit stacking uses these existing pathways as a reliable trigger for a new behavior.",
    layer2:
      "The key to habit stacking is specificity and scale. The cue must be highly specific, and the new habit must be laughably small. Don't stack 'After dinner, I will work out for an hour.' Stack 'When I put my dinner plate in the sink, I will immediately do one push-up.' Once the stack is solid, you can expand it.",
    quiz: {
      question: "What is the psychological mechanism that makes Habit Stacking work?",
      options: [
        "It leverages the Zeigarnik Effect to create anxiety.",
        "It relies on the Panic Monster to enforce deadlines.",
        "It uses the strong neural pathways of an existing daily routine to trigger a new behavior.",
        "It focuses on visualizing the end goal to generate motivation.",
      ],
      correctIndex: 2,
      explanation:
        "By tying a new, fragile habit to an old, hardened habit, you borrow the neurological strength and reliability of the existing behavior to serve as the trigger.",
    },
    related: ["M2"],
    furtherReading: [
      {
        label: "Habit Stacking",
        source: "James Clear",
        url: "https://jamesclear.com/habit-stacking",
      },
    ],
    tags: ["Incentives & Systems", "Craft & Deep Work"],
  },
];

newNodes.forEach((node) => {
  nodesArray.addElement(JSON.stringify(node, null, 2));
});

sourceFile.saveSync();
console.log(`Successfully injected ${newNodes.length} nodes from Batch 2.`);
