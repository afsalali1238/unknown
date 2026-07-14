export type Node = {
  id: string;
  clusterId: string;
  title: string;
  author: string;
  year: number;
  medium: string;
  category: string;
  thesis: string;
  layer0: string;
  layer1: string;
  layer2: string;
  quiz: { question: string; options: string[]; correctIndex: number };
  related: string[];
  furtherReading: {
    label: string;
    source: string;
    url: string;
    archive?: {
      status: "full" | "excerpt" | "unavailable";
      path?: string;
      retrieved?: string;
    };
  }[];
  tags: string[];
};

export const TAGS = [
  "Startups & Founders",
  "Moats & Network Effects",
  "Incentives & Systems",
  "Compounding & Patience",
  "Risk & Asymmetric Bets",
  "Cognitive Biases & Models",
  "Decision-Making",
  "First-Principles Thinking",
  "Markets & Narrative",
  "Wealth, Leverage & Judgment",
  "Craft & Deep Work",
  "Crypto & Trust",
  "Macro & Cycles",
  "Fraud & Skepticism",
  "Tech Adoption & Disruption",
  "AI & the Future",
  "Power & Persuasion",
  "Meaning & Self",
  "Health & Body",
] as const;
export type Tag = (typeof TAGS)[number];

export type Cluster = { id: string; title: string; subtitle: string };

export const CLUSTERS: Cluster[] = [
  {
    id: "A",
    title: "Startup Fundamentals",
    subtitle: "How founders think about building something from nothing",
  },
  {
    id: "B",
    title: "Company Origins",
    subtitle: "The actual pitch decks and memos that started famous companies",
  },
  {
    id: "C",
    title: "Fraud & Short Cases",
    subtitle: "How professional skeptics spot a lie in a balance sheet",
  },
  {
    id: "D",
    title: "Macro & Investing",
    subtitle: "Cycles, debt, and reading the economy like a value investor",
  },
  {
    id: "E",
    title: "Finance Theory",
    subtitle: "The math that priced risk itself",
  },
  {
    id: "F",
    title: "Foundational Tech",
    subtitle: "The plumbing ideas the entire internet sits on",
  },
  {
    id: "G",
    title: "AI / ML Papers",
    subtitle: "The technical papers that built the modern AI stack, in order",
  },
  {
    id: "H",
    title: "Crypto",
    subtitle: "The whitepapers behind Bitcoin, Ethereum, and DeFi",
  },
  {
    id: "I",
    title: "Worldview & Futurism",
    subtitle: "The biggest, most abstract bets on how the future unfolds",
  },
];

export const NODES: Node[] = [
  {
    id: "A1",
    clusterId: "A",
    title: "Do Things That Don't Scale",
    author: "Paul Graham",
    year: 2013,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Early startups should manually recruit users and do unscalable work; growth comes from effort, not automation.",
    layer0:
      "When a startup has zero users, its only real problem is finding its first real users at all — not building a system that could theoretically serve a million of them. So founders should do things by hand that obviously can't work at scale: personally recruiting users one by one, custom-building things for early customers, doing the job a piece of software will do later. That's not a failure to engineer properly — it's the only way to learn what people actually want before you've earned the right to automate it.",
    layer1:
      "The mechanism is that manual effort is a stand-in for information you don't have yet. At the start, you don't know what onboarding flow works, what feature matters, or what the pitch even is — so any automated system you build is a guess encoded in code, expensive to change. A human doing the task by hand can adapt instantly, notice what's actually happening, and adjust the next interaction in real time. Automation should follow understanding, not precede it. This is why the advice isn't 'never scale' — it's 'earn the right to scale by first doing the unscalable version enough times to know exactly what's worth encoding.'",
    layer2:
      "Pick something you're building or considering building. Write down the 'automated, scalable' version you imagine eventually shipping. Now write down what the manual, by-hand version of that same value would look like if you did it yourself for just 10 people this week — no code, no system, just you doing the work directly. Notice how much faster you could start, and what you'd learn in week one that you couldn't learn from a spec.",
    quiz: {
      question: "Why does Paul Graham argue founders should do unscalable things early on?",
      options: [
        "Because investors prefer to see manual labor as a sign of commitment",
        "Because it's the fastest way to learn what customers actually want before committing to an automated system",
        "Because scalable systems are always more expensive to build than manual processes",
        "Because early customers expect white-glove service and will pay more for it",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Do Things That Don't Scale (original essay)",
        source: "paulgraham.com",
        url: "https://www.paulgraham.com/ds.html",
        archive: { status: "full", path: "content/sources/A1-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "Paul Graham explains what it means to do things that don't scale",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=aJ3Yu4R3vQs",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "Paul Graham's counter-intuitive startup advice",
        source: "Inc.",
        url: "https://www.inc.com/business-insider/paul-grahams-counter-intuitive-startup-advice-do-things-that-dont-scale.html",
        archive: { status: "full", path: "content/sources/A1-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A2",
    clusterId: "A",
    title: "The Lean Startup / Minimum Viable Product",
    author: "Eric Ries",
    year: 2011,
    medium: "Book",
    category: "VC Doctrine",
    thesis:
      "Startups should build-measure-learn with a minimum viable product to find product-market fit before scaling.",
    layer0:
      "A startup isn't a smaller version of a big company — it's an organization searching for a business model that doesn't exist yet, under extreme uncertainty. Because of that, the traditional approach of writing a detailed plan and executing it for years is dangerous: you're just executing a guess. Instead, Ries argues you should build the smallest possible version of your product (a Minimum Viable Product), put it in front of real customers immediately, measure what actually happens, and use that data to decide whether to persevere or change direction ('pivot'). Repeat that loop as fast as possible.",
    layer1:
      "The mechanism is treating a business plan as a set of falsifiable hypotheses rather than a fixed roadmap. Every assumption — 'people want this,' 'they'll pay this much,' 'this is how they'll find us' — is treated as a guess to be tested with the cheapest possible experiment, not assumed true because it's in a slide deck. An MVP isn't a shoddy version of your final product; it's the minimum thing needed to run one valid experiment and get a real answer. Speed of the loop (build → measure → learn → repeat) matters more than the polish of any single iteration, because each loop is what converts uncertainty into knowledge.",
    layer2:
      "Take a business idea you have (or one you're curious about). Identify the single riskiest assumption underneath it — the one thing that, if false, kills the whole idea. Now design the cheapest, fastest experiment you could run this week to test just that assumption, without building the full product. What would count as evidence it's true? What would count as evidence it's false?",
    quiz: {
      question:
        "What is the actual purpose of a Minimum Viable Product, according to Lean Startup thinking?",
      options: [
        "To ship the cheapest possible version of the final product to save money",
        "To impress early investors with a working demo",
        "To run the fastest, cheapest valid experiment that tests a core business assumption",
        "To lock in early adopters before competitors can react",
      ],
      correctIndex: 2,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "The Lean Startup (official site)",
        source: "theleanstartup.com",
        url: "https://theleanstartup.com/",
        archive: { status: "full", path: "content/sources/A2-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "Building the Minimum Viable Product",
        source: "Stanford eCorner",
        url: "https://stvp.stanford.edu/clips/building-the-minimum-viable-product/",
        archive: { status: "full", path: "content/sources/A2-1.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "What Is an MVP? Eric Ries Explains",
        source: "Lean Startup Co.",
        url: "https://leanstartup.co/resources/articles/what-is-an-mvp/",
        archive: { status: "full", path: "content/sources/A2-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A3",
    clusterId: "A",
    title: "How to Get Startup Ideas",
    author: "Paul Graham",
    year: 2012,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "The best startup ideas are things founders themselves want that sound like bad ideas but are good; live in the future and build what's missing.",
    layer0:
      "Graham's core claim is that you can't reliably think up good startup ideas by sitting down and brainstorming — the process of deliberately 'coming up with startup ideas' tends to produce bad, generic ones. Instead, the best ideas are noticed, not invented: they show up as a byproduct of living close to some frontier (an emerging technology, an unusual expertise, a niche you're deep in) and personally running into a problem sharp enough that you build a fix for yourself first. Good ideas often sound bad or small to outsiders at first, precisely because the market doesn't exist yet in an obvious way.",
    layer1:
      "The mechanism is about where signal comes from. If you invent an idea in the abstract, you have no evidence anyone wants it — you're guessing about other people's problems. If instead you 'live in the future' (be around new technology, unusual expertise, or an underserved group early) and build something because you personally need it, your own use is real evidence of demand, and you're positioned to notice the problem before it's obvious to everyone else. This is why he says startup ideas should feel like noticing, not inventing — the founder is a sensor placed in the right spot, not a lone genius conjuring a business plan.",
    layer2:
      "List three things that annoy you or that you find yourself working around in your daily life or work this month — genuinely, not hypothetically. For each one, ask: is this just my problem, or could it plausibly be a problem for a whole category of people like me? Pick the strongest one and describe, in one sentence, the smallest possible fix you'd build for yourself first.",
    quiz: {
      question: "According to Paul Graham, why do the best startup ideas often sound bad at first?",
      options: [
        "Because founders deliberately disguise good ideas to avoid competition",
        "Because the market for them doesn't obviously exist yet — they're noticed early, before demand is visible to everyone",
        "Because investors intentionally reject good ideas to keep valuations low",
        "Because bad-sounding ideas get more attention in pitch meetings",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "How to Get Startup Ideas (original essay)",
        source: "paulgraham.com",
        url: "https://www.paulgraham.com/startupideas.html",
        archive: { status: "full", path: "content/sources/A3-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "Lecture 3 — Before the Startup",
        source: "Y Combinator (YouTube)",
        url: "https://www.youtube.com/watch?v=ii1jcLg-eIQ",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "Paul Graham on how to get startup ideas (notes)",
        source: "Startup Archive",
        url: "https://www.startuparchive.org/p/paul-graham-on-how-to-get-startup-ideas",
        archive: { status: "full", path: "content/sources/A3-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A4",
    clusterId: "A",
    title: "1,000 True Fans",
    author: "Kevin Kelly",
    year: 2008,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "A creator needs only 1,000 true fans paying ~$100/year to make a living; the long tail enables niche businesses.",
    layer0:
      "You don't need to be a mass-market hit to make a good living as a creator or a small niche business. Kelly's math: if you have 1,000 people who are true fans — meaning they'll buy essentially anything you produce — and each one spends roughly $100 a year with you, that's $100,000 a year, enough to sustain a creator or a small operation directly, with no label, publisher, or platform gatekeeper required in between.",
    layer1:
      "The mechanism relies on two shifts: the internet collapses distribution and discovery costs (a creator can reach and serve niche fans globally without a publisher), and it collapses transaction costs (payment, delivery, and communication with fans are now nearly free). Together, this means the old requirement — you needed a hit reaching millions through a gatekeeper to make money — is replaced by depth of relationship with a small number of people replacing breadth of reach. The 'long tail' of niche demand becomes economically viable because serving it no longer requires mass infrastructure.",
    layer2:
      "Think of a niche skill, hobby, or piece of knowledge you have that a small dedicated group of people would pay for directly (a newsletter, a course, a specific service, handmade goods). Estimate: how many 'true fans' — people who'd pay you ~$100/year, not just casual followers — do you realistically already have access to, or could reach within a year? How far is that from 1,000?",
    quiz: {
      question:
        "What does Kevin Kelly's '1,000 True Fans' model actually depend on to work economically?",
      options: [
        "Going viral and reaching millions of casual followers",
        "Securing a distribution deal with a major publisher or label",
        "Low-cost direct distribution and payment, so serving a small, deeply loyal audience becomes profitable on its own",
        "Charging fans a one-time high price rather than recurring smaller amounts",
      ],
      correctIndex: 2,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "1,000 True Fans (original essay)",
        source: "kk.org / The Technium",
        url: "https://kk.org/thetechnium/1000-true-fans/",
        archive: { status: "full", path: "content/sources/A4-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "1000 True Fans — Kevin Kelly",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=py43k-mSG7s",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "1000 True Fans (mental model breakdown)",
        source: "ModelThinkers",
        url: "https://modelthinkers.com/mental-model/1000-true-fans",
        archive: { status: "full", path: "content/sources/A4-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A5",
    clusterId: "A",
    title: "Competition Is for Losers",
    author: "Peter Thiel",
    year: 2014,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Monopolies, not competition, create durable value; founders should seek to build category-defining monopolies.",
    layer0:
      "In a perfectly competitive market, economic theory says profits get driven to zero — everyone copies everyone else until nobody makes real money. Thiel's contrarian claim: durable, large value is created by escaping competition entirely and building something close to a monopoly — a business so differentiated that it isn't really competing with anyone. He argues that 'true progress' comes from vertical moves (0 to 1: creating something genuinely new) rather than horizontal moves (1 to n: copying and incrementally improving what already exists in a crowded field).",
    layer1:
      "The mechanism is about where pricing power and reinvestment capacity come from. A company in intense competition must spend its margins on matching rivals feature-for-feature and price-for-price, leaving little left over to invest in the long-term or take care of employees and users. A monopoly-like business, by contrast, captures large margins because it faces no direct substitute, and can reinvest those margins into R&D, talent, and long time horizons — the very things that deepen the monopoly further. Thiel's point isn't 'break the law and form a cartel' — it's that founders should deliberately target a small, specific market segment they can dominate completely, rather than jumping into a big obviously-competitive one.",
    layer2:
      "Pick a market or product idea you're interested in. First, describe how it would look if you tried to compete head-on in the biggest, most obvious version of that market (lots of competitors, thin margins). Now redesign it as a small, specific niche where you could plausibly become the dominant, only real option — even if that niche looks tiny at first. What's the smallest market you could 'monopolize'?",
    quiz: {
      question:
        "Why does Peter Thiel argue that intense competition is actually bad for a company's long-term prospects?",
      options: [
        "Because competition is illegal in most software markets",
        "Because it drives margins toward zero, leaving little capital to reinvest in the long term",
        "Because competitors always eventually merge into monopolies anyway",
        "Because customers dislike having too many choices",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Competition Is for Losers (WSJ op-ed)",
        source: "Wall Street Journal, 2014",
        url: "https://www.wsj.com/articles/peter-thiel-competition-is-for-losers-1410535536",
        archive: { status: "unavailable" },
      },
      {
        type: "watch",
        label: "Peter Thiel on How to Build a Creative Monopoly",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=b9tB9Q1XOM0",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "How Peter Thiel teaches Stanford students to create billion-dollar monopolies",
        source: "VentureBeat",
        url: "https://venturebeat.com/business/how-peter-thiel-teaches-stanford-students-to-create-billion-dollar-monopolies-in-3-quotes",
        archive: { status: "full", path: "content/sources/A5-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A6",
    clusterId: "A",
    title: "All Markets Are Not Created Equal (Note to Self on TAM)",
    author: "Bill Gurley",
    year: 2012,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Ten factors determine whether a digital marketplace can become large and durable; not all TAMs are equal.",
    layer0:
      "'Total Addressable Market' (TAM) is often used as a single big number to justify a startup's potential — 'the market is $50 billion, so we could be huge.' Gurley's point is that the size of the market on paper tells you almost nothing on its own; what matters is the structural quality of that specific market — things like whether the product is used frequently or rarely, whether the marketplace naturally consolidates around one winner, whether there's real network effects, and whether new supply/demand can be added cheaply. Two markets can have the identical dollar-figure TAM and be wildly different investments.",
    layer1:
      "The mechanism is that market size is necessary but not sufficient — you also need the market's dynamics to funnel value toward a durable winner rather than getting split thin across many players or captured by suppliers. Gurley lists structural questions like: is usage frequent (keeps you top of mind) or rare (users forget you exist between purchases)? Is there a natural mechanism pushing toward one dominant platform (network effects, data advantages) or does the market stay fragmented forever? Can the company acquire supply and demand cheaply, or does each side require expensive, one-off sales effort? A large TAM with poor answers to these questions can still produce a mediocre business.",
    layer2:
      "Take any marketplace-style business you know (ride-hailing, a dating app, a B2B marketplace, a local services app). Walk through Gurley's questions for it: is usage frequent or rare? Does it tend toward one winner or stay fragmented? Is new supply/demand cheap or expensive to add? Based on just those answers — ignoring the headline TAM number — would you bet this market produces one dominant, highly valuable company?",
    quiz: {
      question:
        "What is Bill Gurley's central warning about using TAM (Total Addressable Market) to judge a startup?",
      options: [
        "TAM figures are always fabricated by founders to look good",
        "A large TAM number alone says little; the market's underlying structure (frequency, consolidation tendency, supply/demand cost) determines whether it can produce a durable, valuable winner",
        "TAM should be measured in number of users, not dollars",
        "Only regulated markets have accurate TAM estimates",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "All Markets Are Not Created Equal (original essay)",
        source: "Above the Crowd — Bill Gurley",
        url: "https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/",
        archive: { status: "full", path: "content/sources/A6-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "The Bill Gurley Chronicles: VCs, marketplaces, and early-stage investing",
        source: "Equity Mates",
        url: "https://equitymates.com/general/the-bill-gurley-chronicles-vcs-marketplaces-and-early-stage-investing/",
        archive: { status: "full", path: "content/sources/A6-1.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Bill Gurley's thoughts on marketplaces are a must read",
        source: "Fabrice Grinda",
        url: "https://fabricegrinda.com/bill-gurleys-thoughts-on-marketplaces-are-a-must-read/",
        archive: { status: "full", path: "content/sources/A6-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A7",
    clusterId: "A",
    title: "SaaS Metrics 2.0",
    author: "David Skok",
    year: 2013,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "A definitive dashboard of SaaS unit economics (CAC, LTV, churn, magic number) for building and funding SaaS.",
    layer0:
      "Subscription software businesses (SaaS) don't get paid all at once like a normal sale — they get a little bit of revenue every month for as long as the customer stays. That changes what actually matters to track. Skok's essay lays out the core numbers every SaaS founder and investor should watch: how much it costs to acquire a customer (CAC), how much that customer is worth over their whole lifetime (LTV), how fast customers cancel (churn), and how efficiently each new dollar of sales/marketing spend turns into new recurring revenue (the 'magic number'). Get the relationship between these numbers wrong, and a SaaS company can look like it's growing while actually burning cash faster than it can ever earn it back.",
    layer1:
      "The mechanism is that in subscription businesses, the money to pay back what you spent acquiring a customer arrives slowly, in installments, over months or years — so if a customer cancels (churns) before you've earned back their acquisition cost, you've lost money on them permanently, no matter how much revenue they generated before leaving. This is why the ratio of LTV to CAC (rule of thumb: LTV should be roughly 3x or more of CAC, recovered within about 12 months) matters more than raw revenue growth, and why churn is treated almost as dangerous as a leak in a bucket you're constantly pouring new water into. A SaaS company with high growth but bad LTV:CAC or high churn isn't actually building a durable business — it's renting growth.",
    layer2:
      "Imagine a subscription product charging $50/month. If it costs $600 in sales and marketing to acquire one customer, and the average customer cancels after 10 months, work out: total revenue per customer, whether that recovers the acquisition cost, and roughly what the LTV:CAC ratio looks like. Is this a healthy SaaS business by Skok's framework, or is it burning money per customer?",
    quiz: {
      question:
        "Why is customer churn especially dangerous in a SaaS/subscription business, more than in a one-time-purchase business?",
      options: [
        "Because churned customers always leave negative reviews",
        "Because revenue arrives gradually over time, so if a customer leaves before you've earned back what it cost to acquire them, that cost is never recovered",
        "Because SaaS companies can't legally re-acquire a churned customer",
        "Because churn only affects gross margin, not net revenue",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "SaaS Metrics 2.0 (original essay)",
        source: "forEntrepreneurs — David Skok",
        url: "https://www.forentrepreneurs.com/saas-metrics-2/",
        archive: { status: "full", path: "content/sources/A7-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "David Skok of Matrix Partners: Driving SaaS Success Using Key Metrics",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=bCBccKfG9U0",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "David Skok, GP @ Matrix Partners (video + transcript)",
        source: "SaaStr",
        url: "https://www.saastr.com/david-skok-gp-matrix-partners-driving-saas-success-using-key-metrics-video-transcript/",
        archive: { status: "full", path: "content/sources/A7-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A8",
    clusterId: "A",
    title: "Blitzscaling",
    author: "Reid Hoffman & Chris Yeh",
    year: 2016,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Prioritize speed over efficiency in winner-take-all markets to achieve massive scale before competitors.",
    layer0:
      "Normally, businesses grow carefully: prove a model works efficiently in one place, then expand. Blitzscaling argues that in markets where being first and biggest creates a durable, self-reinforcing advantage (network effects, brand, data), it can be rational to deliberately sacrifice efficiency — burn more cash, tolerate more chaos and waste — in order to grow faster than an efficient competitor could, because in a winner-take-most market, being the fast, slightly wasteful first mover beats being the careful, efficient second mover.",
    layer1:
      "The mechanism is a bet that the value of capturing the market first (before competitors or before the market 'closes') outweighs the cost of the inefficiency incurred while doing it fast. This only makes sense in markets with strong winner-take-most dynamics — where an early lead compounds into a durable moat (more users → more data/network effects → harder for a rival to catch up). In markets without that dynamic, blitzscaling just means burning money faster than a rival with no lasting benefit. So the strategy is inseparable from correctly judging whether you're actually in a winner-take-most market in the first place.",
    layer2:
      "Think of two different types of businesses: one where being 10x bigger than a rival gives you a real structural advantage (e.g., a two-sided marketplace with network effects), and one where being bigger just means more overhead with no compounding benefit (e.g., a local service business with no network effects). For each, would blitzscaling (deliberately spending fast and inefficiently to grow faster) make sense? Why or why not?",
    quiz: {
      question:
        "Under what condition does 'blitzscaling' — deliberately sacrificing efficiency for speed — actually make strategic sense?",
      options: [
        "Only when a company has unlimited funding with no investor oversight",
        "In any market, since speed is always better than efficiency",
        "In winner-take-most markets, where being first lets you build a compounding, durable advantage (network effects, data, brand) that's hard for slower competitors to overcome",
        "Only for companies that plan to go public within two years",
      ],
      correctIndex: 2,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Blitzscaling (original essay)",
        source: "Harvard Business Review, 2016",
        url: "https://hbr.org/2016/04/blitzscaling",
        archive: { status: "full", path: "content/sources/A8-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "Reid Hoffman at EF — Blitzscaling (playlist)",
        source: "YouTube",
        url: "https://www.youtube.com/playlist?list=PLaDjE1VTVKMSOjgKVvru7oLf1JsV1muR5",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "Blitzscaling (book site)",
        source: "blitzscaling.com",
        url: "https://www.blitzscaling.com/",
        archive: { status: "full", path: "content/sources/A8-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A9",
    clusterId: "A",
    title: "Aggregation Theory",
    author: "Ben Thompson",
    year: 2015,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Internet-era winners aggregate demand by owning the user relationship and commoditizing suppliers.",
    layer0:
      "Before the internet, distribution was expensive and controlled by whoever owned the physical channel (a newspaper's printing press, a store's shelf space) — so suppliers had the power. Thompson's theory: online, distribution is nearly free, so power flips to whoever owns the relationship with the end user's attention and preference. Companies like Google, Facebook, and Amazon win not by owning supply (they often don't make the content or products themselves) but by aggregating demand — becoming the place users default to — which lets them dictate terms to suppliers, who become interchangeable ('commoditized') behind the scenes.",
    layer1:
      "The mechanism is a reversal of the old gatekeeper model. In the pre-internet world, whoever controlled scarce distribution (shelf space, broadcast spectrum, printing capacity) had leverage over suppliers competing for access. Online, since distribution costs approach zero and users can access nearly infinite suppliers directly, the scarce resource becomes user attention and trust — so whoever best organizes and personalizes that experience (a search engine, a social feed, a marketplace) captures the value, even while owning none of the underlying supply. As that aggregator grows, it improves its product using data from its scale, which draws in more users, which draws in more suppliers competing for access on the aggregator's terms — a self-reinforcing loop.",
    layer2:
      "Pick a company you use daily that connects you to some form of supply (news, products, drivers, listings, videos). Ask: does this company own the supply itself, or does it aggregate demand and make suppliers compete for access to its users? What happens to a supplier's leverage once a huge share of users default to this platform to find them?",
    quiz: {
      question:
        "According to Ben Thompson's Aggregation Theory, why did the internet shift power from suppliers to platforms that don't even own the supply?",
      options: [
        "Because platforms have better legal teams than suppliers",
        "Because distribution became nearly free online, so the scarce resource shifted to user attention/relationship, which aggregators capture and then dictate terms to suppliers",
        "Because governments began regulating physical distribution channels more heavily",
        "Because suppliers voluntarily gave up control to reduce their own costs",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Aggregation Theory (original essay)",
        source: "Stratechery — Ben Thompson",
        url: "https://stratechery.com/2015/aggregation-theory/",
        archive: { status: "full", path: "content/sources/A9-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "Stratechery (with Ben Thompson)",
        source: "Acquired podcast",
        url: "https://www.acquired.fm/episodes/stratechery-with-ben-thompson",
        archive: { status: "full", path: "content/sources/A9-1.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Aggregation Theory (concept reference page)",
        source: "Stratechery",
        url: "https://stratechery.com/concept/aggregation-theory/",
        archive: { status: "full", path: "content/sources/A9-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A10",
    clusterId: "A",
    title: "Invisible Asymptotes",
    author: "Eugene Wei",
    year: 2018,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Every growth curve has an invisible ceiling; great companies identify and route around theirs before hitting it.",
    layer0:
      "An 'asymptote' is a ceiling a curve approaches but a system doesn't realize is there until growth mysteriously stalls. Wei's argument: every business has hidden structural ceilings built into its own model — a limit on how big it can get given its current mechanics — and the ceiling is usually invisible until you're already slamming into it. The best operators try to spot these ceilings in advance (by understanding the mechanics deeply, not just watching the metrics) and re-architect the business before growth actually stalls, rather than being blindsided by a plateau they can't explain.",
    layer1:
      "The mechanism is that growth curves in real businesses are the sum of many smaller mechanical constraints (e.g., how fast can you physically onboard new supply, how large can group sizes get on a social product before quality degrades, how much can a specific channel scale before it saturates) — and these constraints compound quietly under a curve that still looks fine on the surface, until the moment the constraint actually binds and growth suddenly flattens. Wei's point is that if you only monitor the top-line growth number, the ceiling is invisible right up until you hit it; if you understand the underlying mechanics of why growth is happening, you can see the ceiling coming and change the mechanics (new features, new supply sources, new architecture) before it bites.",
    layer2:
      "Think about something you've seen plateau — a hobby, a personal habit streak, a small project, a social account. Looking back, what was the actual underlying mechanical constraint (not just 'motivation dropped') that quietly capped how far it could go? Could that constraint have been spotted earlier if you'd been looking at the mechanics instead of just the trend line?",
    quiz: {
      question: "What does Eugene Wei mean by an 'invisible asymptote' in a growing business?",
      options: [
        "A ceiling caused by running out of investor funding",
        "A structural, mechanical limit built into how the business currently works, which stays hidden in the growth curve until the business actually hits it",
        "A legal cap on market share imposed by antitrust regulators",
        "The point at which a company's stock price stops rising",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Invisible Asymptotes (original essay)",
        source: "Eugene Wei's blog",
        url: "https://www.eugenewei.com/blog/2018/5/21/invisible-asymptotes",
        archive: { status: "full", path: "content/sources/A10-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "Eugene Wei: the invisible ceilings to Snapchat, Facebook and Twitter's growth",
        source: "Recode Media podcast",
        url: "https://www.recode.net/2018/7/5/17535126/eugene-wei-invisible-asymptotes-ceilings-startups-growth-snap-twitter-peter-kafka-media-podcast",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "Invisible Asymptotes (summary notes)",
        source: "A Learning a Day",
        url: "https://alearningaday.blog/2018/06/05/invisible-asymptotes/",
        archive: { status: "full", path: "content/sources/A10-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "A11",
    clusterId: "A",
    title: "The New Moats",
    author: "Jerry Chen",
    year: 2016,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Systems of intelligence built on proprietary data and AI/ML form the durable competitive moats of the next era.",
    layer0:
      "A 'moat' is whatever protects a business from being copied or out-competed. Older moats were things like distribution deals, brand, or economies of scale. Chen's argument: in the era of cloud and AI/ML, the new durable moat is a 'system of intelligence' — a product that continuously collects proprietary data from how it's used, feeds that data into machine learning to get smarter, and becomes better and more entrenched the more it's used, in a way a new entrant can't just copy by writing similar code, because they lack the accumulated data and usage history.",
    layer1:
      "The mechanism is a data-driven flywheel: usage generates unique data → that data trains models that make the product smarter/more personalized → a better product attracts and retains more usage → more usage generates more (and better) data. A competitor can copy the interface or even the underlying algorithm, but they can't copy years of accumulated proprietary usage data — so the moat isn't the code, it's the compounding data advantage earned through actual customer usage over time. This is different from older 'systems of record' (databases that just store information) because the value here comes specifically from the intelligence layer built on top of that data, not the storage itself.",
    layer2:
      "Pick a product you use that seems to get better the more people use it (recommendations, autocomplete, personalization, fraud detection). Try to describe the specific loop: what data does your usage generate, how might that data make the product smarter, and why would a brand-new competitor with the same code but zero usage history struggle to match it on day one?",
    quiz: {
      question:
        "Why does Jerry Chen argue that a 'system of intelligence' is a stronger moat than older forms of competitive advantage?",
      options: [
        "Because it requires expensive proprietary hardware only large companies can afford",
        "Because it compounds over time through a data flywheel — usage generates data, data improves the product, a better product attracts more usage — which a copycat with no usage history can't quickly replicate",
        "Because governments grant patents automatically to AI-based products",
        "Because it eliminates the need for any sales or marketing spend",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "The New Moats (original essay)",
        source: "Greylock — Jerry Chen",
        url: "https://greylock.com/greymatter/the-new-moats/",
        archive: { status: "full", path: "content/sources/A11-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "The New Moats — Slides Edition Remix!",
        source: "Greylock Perspectives",
        url: "https://news.greylock.com/the-new-moats-slides-edition-remix-a226dfd6c896",
        archive: { status: "unavailable" },
      },
      {
        type: "watch",
        label: "Venture Confidential, feat. Greylock's Jerry Chen",
        source: "Heavybit podcast",
        url: "https://www.heavybit.com/library/podcasts/venture-confidential/ep-16-feat-greylock-partners-jerry-chen",
        archive: { status: "unavailable" },
      },
    ],
    tags: [],
  },
  {
    id: "A12",
    clusterId: "A",
    title: "The Rise of the Solo Capitalists",
    author: "Nikhil Basu Trivedi",
    year: 2020,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Solo GPs writing large checks are a new competitive force disrupting traditional multi-partner VC firms.",
    layer0:
      "Traditional venture capital firms have multiple partners, committees, and a slow, consensus-driven process to approve an investment. Trivedi describes the rise of 'solo capitalists' — individual investors (often former founders or operators with a strong personal brand and network) who raise their own fund and write large checks entirely on their own judgment, with no partner meeting required. This lets them move faster and offer founders a more personal relationship, and they've become real competition for traditional multi-partner firms for access to the best deals.",
    layer1:
      "The mechanism is a tradeoff between speed/relationship and structure/resources. A solo GP can say yes to a founder in a single conversation because there's no internal committee to convince, and founders often value that speed plus getting a direct relationship with the person actually making the decision (rather than a junior associate who then has to sell the deal internally to partners). What a solo GP typically can't offer is the depth of platform resources a large multi-partner firm has (recruiting teams, extensive founder networks, follow-on capital reserves) — so the competitive dynamic becomes speed-and-personal-brand versus depth-and-institutional-resources, and different founders value each differently depending on their stage and needs.",
    layer2:
      "Imagine you're a founder choosing between two term sheets of similar size: one from a well-known solo GP who can decide in 48 hours and will personally mentor you, and one from a large VC firm with a slower multi-week partner-approval process but a big platform team and follow-on capital reserves. What would make you lean toward the solo GP, and what would make you lean toward the large firm?",
    quiz: {
      question:
        "What structural advantage does a 'solo capitalist' typically have over a traditional multi-partner VC firm when competing for a deal?",
      options: [
        "They can legally invest more total capital per fund",
        "They can decide and commit quickly since there's no partner committee to convince, and founders get a direct relationship with the actual decision-maker",
        "They are exempt from securities regulations that apply to larger firms",
        "They only invest in later-stage, lower-risk companies",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "The Rise of the Solo Capitalists (original essay)",
        source: "nbt.vc — Nikhil Basu Trivedi",
        url: "https://www.nbt.vc/blog/the-rise-of-the-solo-capitalists",
        archive: { status: "unavailable" },
      },
      {
        type: "watch",
        label: "Nikhil Basu Trivedi on The Mind of a Venture Capitalist",
        source: "The Pomp Podcast (YouTube)",
        url: "https://www.youtube.com/watch?v=YIu5CZzwgCo",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "Agglomerators vs. Specialists, the Rise of the Solo-Capitalist",
        source: "The Full Ratchet",
        url: "https://fullratchet.net/246-agglomerators-vs-specialists-the-rise-of-the-solo-capitalist-and-the-importance-of-founder-investor-fit-nikhil-basu-trivedi/",
        archive: { status: "full", path: "content/sources/A12-2.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "B1",
    clusterId: "B",
    title: "Fairchild Semiconductor Founding",
    author: "Arthur Rock / Eugene Kleiner",
    year: 1957,
    medium: "Letter",
    category: "Pitch Deck",
    thesis:
      "Eight scientists who walked out on Shockley could build a silicon-device company if anyone would back them; about 35 corporations were approached and every one passed.",
    layer0:
      "Eight engineers quit Shockley Semiconductor Laboratory in 1957 because its founder, Nobel laureate William Shockley, was abrasive and paranoid to the point of being nearly unmanageable. They wanted to start their own company but had no personal capital and no existing playbook for funding something like this — banks didn't lend to unproven engineers with no product, and there was no venture capital industry yet to call. Arthur Rock, then a young banker, spent weeks pitching roughly 35 existing corporations to back the group as a new subsidiary. All 35 passed. Fairchild Camera and Instrument finally agreed, fronting the capital in exchange for the right to buy the whole new company outright later if it succeeded.",
    layer1:
      "The mechanism Rock improvised — a corporate parent funds an independent new entity, gets an option to acquire it later rather than just buying stock upfront, and the founding engineers keep day-to-day control and equity in the meantime — is structurally the ancestor of the modern VC term sheet (investor capital in exchange for a claim on future value, founders retain operating control). Fairchild Camera and Instrument put in $1.38 million for the right to buy the whole company for $3 million within eight years, which it later exercised. That single deal proved something no one had proven before: that engineers with no assets except expertise and a grudge against a bad boss could be financed as a standalone company, not just hired as employees elsewhere.",
    layer2:
      "Think of a time you or someone you know left a job specifically because of a bad manager, not because the work itself was bad. What would have had to be true — in terms of money, trust, or structure — for that group of frustrated coworkers to start something of their own instead of just scattering to separate new jobs? What's the modern equivalent of what Arthur Rock provided?",
    quiz: {
      question:
        "What made the Fairchild deal structurally different from a normal stock purchase, and why did that matter?",
      options: [
        "Fairchild Camera and Instrument got an option to buy the entire new company later, rather than just purchasing shares upfront — letting founders keep control while proving the business worked",
        "The founders were required to repay the investment in cash within one year regardless of performance",
        "The deal was funded entirely by a government small-business grant, not a private company",
        "Shockley Semiconductor itself provided the funding as a severance package",
      ],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [
      {
        type: "watch",
        label: "American Experience: Silicon Valley (PBS documentary)",
        source: "PBS, 2013",
        url: "https://www.pbs.org/wgbh/americanexperience/films/silicon/",
        archive: { status: "full", path: "content/sources/B1-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "How a deal with 8 'traitors' would help build Intel, Apple — and Silicon Valley",
        source: "NPR — The Indicator",
        url: "https://www.npr.org/transcripts/1160283155",
        archive: { status: "unavailable" },
      },
    ],
    tags: [],
  },
  {
    id: "B2",
    clusterId: "B",
    title: "A Proposal to American Research and Development",
    author: "Ken Olsen / Harlan Anderson",
    year: 1957,
    medium: "Memo",
    category: "Pitch Deck",
    thesis:
      "A small team could sell profitable digital circuit modules first and interactive computers later, at a moment when investors were sure computers were a money-losing business.",
    layer0:
      "In 1957, two MIT Lincoln Laboratory engineers, Ken Olsen and Harlan Anderson, wanted to build smaller, cheaper computers to challenge IBM's expensive mainframes. IBM and other established players had already turned them down, and at the time 'the computer business' was widely seen by investors as a money-loser — only giant, well-capitalized companies could survive it. So instead of asking for money to build computers, they proposed building profitable digital circuit modules first, using that revenue to prove the team and the technology worked, and only later building full interactive computers. American Research and Development Corporation (ARD), one of the first venture firms in the US, funded them: $70,000 in equity for 70% of the new company, Digital Equipment Corporation, plus a further loan.",
    layer1:
      "The mechanism here is sequencing risk to match what investors could actually stomach. A direct pitch — 'give us money to build computers' — was, at the time, effectively unfundable, because the category itself had a bad reputation with capital allocators. By proposing a lower-risk first product (circuit modules, already known to be sellable and profitable) that would generate real revenue and de-risk the team's execution ability, Olsen and Anderson gave ARD a way to say yes to something that looked like a normal, provable business, while quietly building toward the bigger and riskier ambition. DEC's PDP series of minicomputers later undercut mainframe prices by an order of magnitude, and ARD's $70,000 stake was worth $355 million by 1971 — the return that made the entire ARD fund look successful, and helped convince other institutional money that venture capital as an asset class could work.",
    layer2:
      "Think of an ambitious goal you have that would be hard to get anyone to back directly because the category has a bad reputation or looks too risky on its face. What's the smaller, provable, revenue-generating version of that goal you could pitch first — one that builds credibility and capital toward the bigger ambition, the way circuit modules did for DEC's computers?",
    quiz: {
      question:
        "Why did Olsen and Anderson pitch selling circuit modules before pitching interactive computers?",
      options: [
        "Circuit modules were more profitable long-term than computers would ever be",
        "IBM required them to prove circuit expertise before entering the computer market",
        "The computer business had a reputation as an investor money-loser at the time, so a smaller proven product de-risked the pitch and built credibility toward the bigger ambition",
        "ARD's charter legally prohibited it from funding computer companies directly",
      ],
      correctIndex: 2,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "American Research and Development Corporation",
        source: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/American_Research_and_Development_Corporation",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "Ken Olsen — PDP-1 Restoration Project",
        source: "Computer History Museum",
        url: "https://www.computerhistory.org/pdp-1/ken-olsen/",
        archive: { status: "full", path: "content/sources/B2-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "B3",
    clusterId: "B",
    title: "YouTube Investment Memo",
    author: "Roelof Botha / Sequoia Capital",
    year: 2005,
    medium: "Memo",
    category: "Pitch Deck",
    thesis:
      "YouTube is capturing explosive user-generated video growth and will define online video.",
    layer0:
      "In 2005, YouTube was a tiny startup with almost no revenue model, uploading videos that mostly weren't theirs to license. Roelof Botha, a Sequoia partner, wrote an internal memo arguing the firm should invest anyway, because the sheer volume and growth rate of user-generated video uploads was a leading indicator that YouTube was becoming the default place people went to watch and share video online — a position worth being early to regardless of how monetization would eventually work. Sequoia invested $1 million, followed by a $4 million Series A. Google acquired YouTube about eighteen months later for $1.65 billion, returning roughly 57x to Sequoia.",
    layer1:
      "The mechanism is prioritizing a leading behavioral indicator (explosive, organic content-upload growth from ordinary users, not marketing-driven signups) over a missing business model. Botha's bet was that becoming the default consumer habit for a category — 'the place you go to watch a video' — creates a position so valuable that a monetization strategy can be figured out later, whereas waiting for a proven revenue model before investing would mean missing the window entirely, since by the time revenue is proven the position is already taken by someone else. This is the same logic later formalized in aggregation-style thinking: owning the user's default behavior first, monetizing the resulting leverage second.",
    layer2:
      "Think of a product or app you or people around you use constantly that still doesn't obviously make money for the company behind it. Using Botha's logic, what behavioral signal (not revenue) would tell you whether that company is building a durable, valuable position anyway — versus just burning cash with no real foothold?",
    quiz: {
      question:
        "What did Roelof Botha's YouTube investment memo prioritize as evidence the company was worth backing, despite having little revenue?",
      options: [
        "A signed advertising contract with a major brand",
        "The explosive volume and growth rate of user-generated video uploads, as a leading indicator of becoming the default place for online video",
        "A patent filing for YouTube's video compression technology",
        "Projected profitability within the first 12 months",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "watch",
        label: "Sequoia's Roelof Botha on Decision Making, AI, and the Next Trillion Dollar Market",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=z8njhsYUNNk",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "The confidential YouTube Investment Memo by Sequoia you were never meant to see",
        source: "Alexander Jarvis",
        url: "https://www.alexanderjarvis.com/the-confidential-youtube-investment-memo-by-sequoia-you-were-never-meant-to-see/",
        archive: { status: "full", path: "content/sources/B3-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "B4",
    clusterId: "B",
    title: "Facebook (thefacebook) Media Kit / Early Pitch",
    author: "Facebook",
    year: 2004,
    medium: "Deck",
    category: "Pitch Deck",
    thesis:
      "A college social network with dense engagement and a captive, targetable young audience for advertisers.",
    layer0:
      "Shortly after thefacebook.com launched in 2004, cofounder Eduardo Saverin put together a media kit to pitch advertisers directly, arguing the site's value wasn't its size (it had roughly 70,000 users at the time) but its density: students were spending hours a day on it, checking it obsessively, and it gave advertisers a precisely targetable, captive young audience segmented by school. The deck leaned on real usage data — about 90 million pageviews a month within its first year — to make the case that attention, not raw headcount, was the sellable asset.",
    layer1:
      "The mechanism is substituting engagement depth for audience size as the metric that actually matters to an advertiser. A media buyer comparing two sites with different total user counts will pay more for the one where a narrower audience is more predictably, repeatedly, and voluntarily present — because ad exposure compounds with frequency of visits, not just headcount. thefacebook's pitch worked because campus-level social graphs made engagement almost involuntary (your friends were already there, so you kept coming back), which is a structural property, not a marketing achievement — and it's the same underlying logic that later justified massive valuations for platforms with modest user counts but very high engagement frequency.",
    layer2:
      "Pick two apps you use: one you open dozens of times a day out of habit, and one you use occasionally no matter how large its total user base is. If you were selling ad space, which would you argue is actually more valuable per user, and what evidence (beyond size) would you use to make that case to a skeptical buyer?",
    quiz: {
      question: "What was the core argument of Facebook's 2004 media kit pitch to advertisers?",
      options: [
        "That Facebook had more total users than any competing site",
        "That dense, repeated engagement from a narrow, targetable audience was more valuable to advertisers than a larger but less engaged audience",
        "That Facebook had already signed exclusive contracts with major brands",
        "That the site would soon expand beyond colleges to the general public",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "This Was Facebook's First Media Pitch In 2004",
        source: "OfficeChai",
        url: "https://officechai.com/stories/facebook-advertising-pitch-deck/",
        archive: { status: "full", path: "content/sources/B4-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "The Pitch Deck Facebook Used to Raise $13.8B",
        source: "Failory",
        url: "https://www.failory.com/pitch-deck/facebook",
        archive: { status: "full", path: "content/sources/B4-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "B5",
    clusterId: "B",
    title: "UberCab Pitch Deck",
    author: "Uber (Garrett Camp / Travis Kalanick)",
    year: 2008,
    medium: "Deck",
    category: "Pitch Deck",
    thesis: "On-demand black-car service summoned from a phone, pitched as 'NextGen car service.'",
    layer0:
      "After spending nearly $800 hiring a private driver in Paris on New Year's Eve, Travis Kalanick and Garrett Camp pitched 'UberCab' in 2008 as a members-only, invite-only black-car service you could summon from your phone — explicitly positioned as the 'NetJets of car services,' aimed at professionals in a handful of American cities, not as a mass-market taxi replacement. The deck's own financial projections were modest by today's standards: a best-case scenario of $1 billion in revenue, a more realistic target of reaching 5% of top US cities and $20 million in profit. It raised roughly $200,000.",
    layer1:
      "The mechanism worth noticing is how narrowly the earliest version of a category-defining idea is usually framed, and how much of that narrowness is about matching the pitch to what's provable with zero traction yet, not about the founders' actual ambition ceiling. Positioning as a premium, invite-only alternative to black-car services (a small, already-proven market) made the pitch legible and fundable, even though the deck itself briefly touched on ride-pooling concepts (UberPool) years before that ever launched — meaning the bigger idea existed in the founders' heads, but wasn't what got pitched first. This mirrors a broader pattern: ambitious ideas often get funded initially as a smaller, adjacent, already-validated market, with the larger vision earned incrementally as traction accumulates.",
    layer2:
      "If you had an ambitious idea today that felt too big or unproven to pitch directly, what smaller, already-validated adjacent market could you frame it as first — the way UberCab framed 'replace all car ownership and taxis everywhere' as merely 'a nicer black car service for professionals'?",
    quiz: {
      question: "How did Kalanick and Camp initially position UberCab in their 2008 pitch deck?",
      options: [
        "As a direct, mass-market replacement for city taxi services",
        "As a premium, invite-only black-car service comparable to NetJets, aimed at professionals rather than the general public",
        "As a logistics platform for package delivery that would later add rides",
        "As a public transit partnership with city governments",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Uber IPO: Inside The 2008 Pitch That Birthed An $80 Billion Startup",
        source: "Forbes",
        url: "https://www.forbes.com/sites/bizcarson/2019/05/10/uber-ipo-original-2008-pitch-deck/",
        archive: { status: "full", path: "content/sources/B5-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Take a look at Uber's first pitch deck from 2008",
        source: "Recode",
        url: "https://www.recode.net/2017/8/23/16189048/uber-pitch-deck-2008-ubercab-travis-kalanick-founder-startup",
        archive: { status: "full", path: "content/sources/B5-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "B6",
    clusterId: "B",
    title: "Airbnb Series A Pitch Deck",
    author: "Airbnb (Brian Chesky et al.)",
    year: 2009,
    medium: "Deck",
    category: "Pitch Deck",
    thesis: "A web platform to book rooms with locals rather than hotels.",
    layer0:
      "By 2009, Airbnb's founders had already nearly run out of money and options, having bootstrapped through selling branded cereal boxes to survive. Their Series A deck laid out a simple structure — problem, solution, market size, early traction, team, and the ask — pitching a web platform where travelers could book rooms with local hosts instead of hotels. It secured $600,000 from Sequoia Capital and Y Ventures, arriving in the middle of the 2008-09 financial crisis, when investors were unusually risk-averse.",
    layer1:
      "The mechanism is that the deck's power came from demonstrating real early traction and disciplined execution under constraint, not from an exciting narrative alone. Raising money for an unproven, culturally odd idea (strangers renting out rooms in their homes to other strangers) during a financial crisis required evidence that the founders could execute with almost no resources — the cereal-box bootstrapping story wasn't a cute anecdote, it was proof of exactly the scrappiness investors needed to see to trust the team with capital when nothing else about the business looked obviously fundable. The now-famous problem/solution/market/traction/team/ask structure became a template precisely because it forces a founder to show evidence at each step rather than just asserting a vision.",
    layer2:
      "Think about a resource-constrained situation you handled by adapting quickly rather than giving up (not necessarily business-related). If you were pitching yourself for something today, what's the equivalent of Airbnb's cereal boxes — the piece of scrappy proof that would make someone trust you with something bigger, even if the anecdote itself seems unrelated to the ask?",
    quiz: {
      question:
        "Why did the bootstrapped 'cereal box' story matter to Airbnb's fundraising, beyond being a memorable anecdote?",
      options: [
        "It generated enough direct revenue to fund the company without needing investors",
        "It demonstrated the founders' resourcefulness and execution under extreme constraint, which mattered for trust during a financial crisis when the core idea itself looked unproven",
        "It was a marketing campaign specifically designed to attract Sequoia's attention",
        "It proved there was already strong demand for the room-booking platform itself",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "watch",
        label: "Full interview with Airbnb CEO Brian Chesky",
        source: "CNBC",
        url: "https://www.cnbc.com/video/2026/05/21/watch-cnbcs-full-interview-with-airbnb-ceo-brian-chesky.html",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "The Airbnb Deck",
        source: "Tremendous",
        url: "https://tremendous.blog/2024/03/20/the-airbnb-deck/",
        archive: { status: "full", path: "content/sources/B6-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "B7",
    clusterId: "B",
    title: "The Secret Tesla Motors Master Plan (just between you and me)",
    author: "Elon Musk",
    year: 2006,
    medium: "Essay",
    category: "Worldview",
    thesis:
      "Bootstrap an EV company from the top down: build an expensive low-volume sports car, use the proceeds to fund progressively cheaper, higher-volume models, and drive the transition to sustainable energy.",
    layer0:
      "Musk laid out a deliberately sequenced plan for Tesla: first build an expensive, low-volume sports car (the Roadster) for buyers willing to pay a premium, use the money and credibility from that to fund a medium-volume, lower-priced car (which became the Model S and Model X), and use that to eventually fund a high-volume, affordable car (the Model 3) — with the explicit end goal of accelerating the world's transition away from a 'mine-and-burn hydrocarbon economy' toward solar-electric energy, not just building cars for their own sake.",
    layer1:
      "The mechanism mirrors the same top-down bootstrapping logic seen in other 'enter at the high end, fund the way down' strategies: expensive early products aren't the actual goal, they're a financing and credibility mechanism for reaching the real goal (mass-market affordability) that couldn't be funded directly on day one, because the manufacturing scale, battery costs, and brand trust needed for a cheap EV didn't exist yet. Each stage's profits and technological learning (battery packs, manufacturing techniques) funded and de-risked the next, cheaper stage — a sequencing strategy, not merely a product roadmap.",
    layer2:
      "Think of an expensive, low-volume version of something you'd eventually want to make cheap and widely available (a service, a product, a skill you teach). What would the 'Roadster stage' look like — the premium version that funds and proves out the capability you'd need before you could responsibly go cheaper and bigger?",
    quiz: {
      question:
        "Why did Tesla's master plan start with an expensive, low-volume sports car instead of an affordable mass-market car?",
      options: [
        "Musk wanted to establish a luxury brand identity permanently, with no plan to go cheaper",
        "Regulations at the time prohibited EV manufacturers from selling low-cost vehicles",
        "The expensive early car funded and proved out the technology, manufacturing capability, and credibility needed to eventually build cheaper, higher-volume cars",
        "Battery technology only existed in a form suitable for sports cars in 2006",
      ],
      correctIndex: 2,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "In 2006, Elon Musk Had a 'Secret Plan' to Mainstream Electric Cars. It's Working",
        source: "Vice",
        url: "https://www.vice.com/en/article/elon-musks-secret-plan-for-electric-car-dominance-is-right-on-schedule/",
        archive: { status: "full", path: "content/sources/B7-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "This is how Elon Musk set out to achieve his Tesla master plan",
        source: "World Economic Forum",
        url: "https://www.weforum.org/stories/2016/04/this-is-how-elon-musk-set-out-to-achieve-his-tesla-master-plan/",
        archive: { status: "full", path: "content/sources/B7-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "C1",
    clusterId: "C",
    title: "Enron Short Thesis",
    author: "Jim Chanos / Kynikos",
    year: 2001,
    medium: "Research",
    category: "Short / Activist",
    thesis:
      "Enron's returns didn't cover its cost of capital and its accounting was opaque; the equity was worthless.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C2",
    clusterId: "C",
    title: "The World's Largest Hedge Fund Is a Fraud",
    author: "Harry Markopolos",
    year: 2005,
    medium: "Report",
    category: "Short / Activist",
    thesis:
      "Bernard Madoff's impossibly smooth returns are mathematically inconsistent with any real strategy; the fund is either front-running or a Ponzi scheme.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C3",
    clusterId: "C",
    title: "Fooling Some of the People All of the Time (Allied Capital Short)",
    author: "David Einhorn / Greenlight",
    year: 2002,
    medium: "Presentation",
    category: "Short / Activist",
    thesis:
      "Allied Capital used aggressive accounting to overstate the value of its illiquid investments.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C4",
    clusterId: "C",
    title: "Lehman Brothers Short Thesis (Ira Sohn)",
    author: "David Einhorn / Greenlight",
    year: 2008,
    medium: "Presentation",
    category: "Short / Activist",
    thesis:
      "Lehman's balance sheet is opaque and undercapitalized; its marks on illiquid assets are not credible.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C5",
    clusterId: "C",
    title: "Scion Capital Letters (Subprime Short)",
    author: "Michael Burry",
    year: 2006,
    medium: "Letter",
    category: "Short / Activist",
    thesis:
      "Subprime mortgage-backed securities will collapse; buy CDS protection against the housing bubble.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C6",
    clusterId: "C",
    title: "Sino-Forest Corporation (Strong Sell)",
    author: "Carson Block / Muddy Waters",
    year: 2011,
    medium: "Report",
    category: "Short / Activist",
    thesis:
      "Sino-Forest is a fraud that overstates its timber assets; the equity is worth a fraction of its price.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C7",
    clusterId: "C",
    title: "Who Wants to Be a Millionaire? (Herbalife Short)",
    author: "Bill Ackman / Pershing Square",
    year: 2012,
    medium: "Deck",
    category: "Short / Activist",
    thesis:
      "Herbalife is a pyramid scheme that will be shut down by regulators; the stock is worth zero.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C8",
    clusterId: "C",
    title: "Valeant: The Pharmaceutical Enron?",
    author: "Andrew Left / Citron Research",
    year: 2015,
    medium: "Report",
    category: "Short / Activist",
    thesis:
      "Valeant used a specialty pharmacy (Philidor) to fabricate sales, echoing Enron-style channel stuffing.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C9",
    clusterId: "C",
    title: "Luckin Coffee (Anonymous Report)",
    author: "Muddy Waters / Carson Block",
    year: 2020,
    medium: "Report",
    category: "Short / Activist",
    thesis: "Luckin Coffee fabricated sales figures; the growth story is a fraud.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C10",
    clusterId: "C",
    title: "Nikola: How to Parlay an Ocean of Lies",
    author: "Hindenburg Research",
    year: 2020,
    medium: "Report",
    category: "Short / Activist",
    thesis:
      "Nikola is an 'intricate fraud' built on false claims about its technology, including a truck rolling downhill in a video.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "C11",
    clusterId: "C",
    title: "Adani Group: How the World's 3rd Richest Man Is Pulling the Largest Con",
    author: "Hindenburg Research",
    year: 2023,
    medium: "Report",
    category: "Short / Activist",
    thesis:
      "The Adani Group engaged in brazen stock manipulation and accounting fraud over decades.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D1",
    clusterId: "D",
    title: "Buy American. I Am.",
    author: "Warren Buffett",
    year: 2008,
    medium: "Op-Ed",
    category: "Macro Memo",
    thesis: "Amid GFC panic, US stocks are cheap; be greedy when others are fearful.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D2",
    clusterId: "D",
    title: "The Superinvestors of Graham-and-Doddsville",
    author: "Warren Buffett",
    year: 1984,
    medium: "Essay",
    category: "Macro Memo",
    thesis:
      "The concentrated success of value investors from a shared intellectual 'village' refutes efficient markets.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D3",
    clusterId: "D",
    title: "Reinvesting When Terrified",
    author: "Jeremy Grantham",
    year: 2009,
    medium: "Memo",
    category: "Macro Memo",
    thesis:
      "Investors must deploy capital into cheap markets precisely when it feels most terrifying to do so.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D4",
    clusterId: "D",
    title: "Waiting for the Last Dance",
    author: "Jeremy Grantham",
    year: 2021,
    medium: "Memo",
    category: "Macro Memo",
    thesis:
      "US equities are in a full-blown epic bubble that will end badly, comparable to 1929 and 2000.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D5",
    clusterId: "D",
    title: "The Race to the Bottom",
    author: "Howard Marks",
    year: 2007,
    medium: "Memo",
    category: "Macro Memo",
    thesis:
      "Investors competing to accept ever-worse terms and lower returns are sowing the seeds of the next crisis.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D6",
    clusterId: "D",
    title: "Sea Change",
    author: "Howard Marks",
    year: 2022,
    medium: "Memo",
    category: "Macro Memo",
    thesis:
      "A generational shift from falling to elevated rates ends the 40-year tailwind; credit and value are the new winners.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D7",
    clusterId: "D",
    title: "Principles for Navigating Big Debt Crises",
    author: "Ray Dalio",
    year: 2018,
    medium: "Book",
    category: "Macro Memo",
    thesis:
      "Debt crises follow a repeating, mechanical template of leveraging and deleveraging that can be navigated.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D8",
    clusterId: "D",
    title: "The Changing World Order",
    author: "Ray Dalio",
    year: 2020,
    medium: "Essay",
    category: "Macro Memo",
    thesis:
      "Long-term debt, currency, and empire cycles explain the relative decline of the US and rise of China.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D9",
    clusterId: "D",
    title: "The Fraying of the US Global Currency Reserve System",
    author: "Lyn Alden",
    year: 2020,
    medium: "Essay",
    category: "Macro Memo",
    thesis:
      "Structural imbalances in the dollar reserve system are straining and will drive a long-term monetary shift.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D10",
    clusterId: "D",
    title: "Bretton Woods III",
    author: "Zoltan Pozsar",
    year: 2022,
    medium: "Memo",
    category: "Macro Memo",
    thesis:
      "Weaponized reserves after Russia's invasion usher in a new monetary order backed by commodities, not fiat.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D11",
    clusterId: "D",
    title: "RIP Good Times",
    author: "Sequoia Capital",
    year: 2008,
    medium: "Deck",
    category: "VC Doctrine",
    thesis:
      "The 2008 crash is structural, not cyclical; cut burn, extend runway, get to cash-flow positive.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "D12",
    clusterId: "D",
    title: "Adapting to Endure",
    author: "Sequoia Capital",
    year: 2022,
    medium: "Deck",
    category: "VC Doctrine",
    thesis:
      "The era of free capital is over; founders must pivot to profitability as rates rise and multiples compress.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "E1",
    clusterId: "E",
    title: "The Pricing of Options and Corporate Liabilities",
    author: "Fischer Black, Myron Scholes",
    year: 1973,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "An option can be priced by constructing a continuously rebalanced hedge, yielding a closed-form value independent of the investor's risk preferences.",
    layer0:
      "An option is a contract giving you the right (not the obligation) to buy or sell a stock at a fixed price later. The hard problem was always: what should that right cost today? Black and Scholes showed that if you continuously buy and sell just the right amount of the underlying stock alongside the option, you can build a combined position that has zero risk — it earns exactly the risk-free interest rate no matter what the stock does. Because that riskless combination has a knowable value, you can work backward and solve for what the option itself must be worth, using only five measurable inputs: the stock price, the strike price, time remaining, the risk-free rate, and the stock's volatility.",
    layer1:
      "The mechanism is arbitrage-based hedging, not forecasting. The insight isn't 'predict where the stock will go' — it's 'construct a portfolio (long the stock, short the option, in a precise ratio that changes continuously) whose value doesn't depend on where the stock goes at all.' Because that hedged portfolio is riskless, basic market logic (no free lunches) forces its return to equal the risk-free rate — otherwise arbitrageurs would exploit the gap until it closed. Solving that equation backward gives a single, closed-form price for the option that doesn't require knowing the stock's expected future return or the investor's personal risk tolerance — only its volatility. That's what made it usable at industrial scale: two counterparties with wildly different views on where a stock is headed can still agree on the option's fair price.",
    layer2:
      "Imagine you own a share of stock and you're worried it might drop before you can sell it, but you don't want to sell now. If you could continuously adjust a side bet against the stock so that your combined position barely moves regardless of the price, would you care anymore whether the stock goes up or down in the meantime? That's the intuition Black-Scholes formalizes into math.",
    quiz: {
      question:
        "Why doesn't the Black-Scholes formula require knowing an investor's risk tolerance or the stock's expected future return?",
      options: [
        "Because options are always priced at a fixed government-set rate",
        "Because it prices the option via a riskless hedge whose return must equal the risk-free rate regardless of investor preferences — only volatility, not expected return, matters",
        "Because the formula only applies to options that are guaranteed to expire worthless",
        "Because Black and Scholes assumed all investors are risk-neutral by law",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "The Pricing of Options and Corporate Liabilities (original paper)",
        source: "Journal of Political Economy, 1973",
        url: "https://www.journals.uchicago.edu/doi/10.1086/260062",
        archive: { status: "unavailable" },
      },
      {
        type: "watch",
        label: "In Our Time: The Black-Scholes Formula",
        source: "BBC Radio 4",
        url: "https://www.bbc.co.uk/programmes/b00y2zy9",
        archive: { status: "full", path: "content/sources/E1-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "F1",
    clusterId: "F",
    title: "A Mathematical Theory of Communication",
    author: "Claude Shannon",
    year: 1948,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "Information can be quantified in bits and transmitted reliably over noisy channels up to a hard capacity limit, regardless of meaning.",
    layer0:
      "Before Shannon, 'communication' was treated as an engineering problem specific to each medium — telephone static was a phone problem, radio noise was a radio problem. Shannon showed that any message, whether text, sound, or image, could be broken down into a stream of bits (his paper popularized the term, suggested to him by colleague John Tukey), and that the real question was always the same underlying math problem: how much information can you reliably squeeze through a channel that has some amount of noise, and how do you protect a message from that noise. He proved there's a hard ceiling (channel capacity) on how much information can pass through reliably, but that below that ceiling, clever encoding can make the error rate as close to zero as you want.",
    layer1:
      "The mechanism splits the problem into two separable pieces: source coding (compressing a message down to its actual information content, removing redundancy — this is why a ZIP file shrinks a text document) and channel coding (deliberately adding back a different, mathematically structured kind of redundancy so errors introduced by noise can be detected and corrected on the receiving end — this is why your phone call doesn't turn to static every time a truck drives by). Shannon proved these two problems can be solved independently of each other and independently of what the message actually means, which is why the exact same mathematical framework works for text, audio, video, and satellite telemetry.",
    layer2:
      "Think of a rumor passed person-to-person versus a written note passed the same way. The rumor degrades because there's no error-correction — it's noisy transmission with no redundancy built in. What would 'channel coding' look like for a rumor — some deliberately redundant way of phrasing it so that even if part of it gets garbled, the listener could still reconstruct the original meaning?",
    quiz: {
      question: "What was radical about Shannon's approach to defining 'information'?",
      options: [
        "He defined information based on how emotionally important a message was to the receiver",
        "He measured information purely by how surprising/unpredictable it was (its entropy), deliberately ignoring the actual meaning or content of the message",
        "He argued information could only be transmitted without any noise at all",
        "He proved that analog signals are always more reliable than digital ones",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "A Mathematical Theory of Communication (original paper)",
        source: "Bell System Technical Journal, 1948",
        url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf",
        archive: { status: "full", path: "content/sources/F1-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "A Mathematical Theory of Communication",
        source: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/A_Mathematical_Theory_of_Communication",
        archive: { status: "full", path: "content/sources/F1-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "F2",
    clusterId: "F",
    title: "Information Management: A Proposal",
    author: "Tim Berners-Lee",
    year: 1989,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "A linked hypertext system over a network would let information at CERN (and everywhere) be shared without central control.",
    layer0:
      "CERN had a chronic problem: it was a research institution with constant staff turnover, and critical technical knowledge kept disappearing when people left because there was no consistent way to link related documents together. Berners-Lee proposed a system of 'hypertext' — documents containing links that point to other documents, regardless of what computer or format they lived on — accessible over CERN's internal network. The specific institutional problem was narrow, but the solution he designed had no reason to stay narrow: a linked, decentralized information system.",
    layer1:
      "The mechanism's most important property is what it deliberately lacks: a central index or master database of all the links. Earlier hypertext concepts assumed some central authority had to track and validate every link. Berners-Lee's system let anyone create a link to anything without asking permission or registering it anywhere — the cost of that decision is that links can break (the 404 error is a direct consequence), but the benefit is that the system has no bottleneck and no single point of failure, so it can scale to a planet's worth of documents without anyone in charge. That tradeoff (accept some broken links, gain unlimited decentralized scale) is the single decision underneath the entire World Wide Web.",
    layer2:
      "Think of an information-loss problem you've experienced (a team wiki that goes stale, files scattered across someone's laptop, tribal knowledge that walks out the door when someone quits). Berners-Lee's fix wasn't better documentation discipline — it was removing the need for central control over links entirely. What would the 'no permission needed to link' version of a fix for your problem look like?",
    quiz: {
      question:
        "Why did Berners-Lee's hypertext system deliberately avoid having a central index of all links?",
      options: [
        "CERN's computers weren't powerful enough to maintain a central index",
        "A central index would have required someone's permission or registration for every link, creating a bottleneck; without one, the system could scale without a single point of failure, at the cost of links sometimes breaking",
        "Central indexes were against CERN's official research policy",
        "It was a temporary limitation later fixed by search engines",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Information Management: A Proposal (original document)",
        source: "W3.org / CERN, 1989",
        url: "https://www.w3.org/History/1989/proposal.html",
        archive: { status: "full", path: "content/sources/F2-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "30 years of the web: a short history of the invention that changed the world",
        source: "British Council",
        url: "https://www.britishcouncil.org/anyone-anywhere/history-web",
        archive: { status: "full", path: "content/sources/F2-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "F3",
    clusterId: "F",
    title: "The Anatomy of a Large-Scale Hypertextual Web Search Engine",
    author: "Sergey Brin, Lawrence Page",
    year: 1998,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "Ranking web pages by the link structure of the web itself (PageRank) produces dramatically better search than keyword matching.",
    layer0:
      "Search engines before Google mostly ranked pages by matching keywords — how many times did the search term appear on the page. That approach was easy to game (stuff a page with the word 'concert tickets' a thousand times) and didn't capture which pages people actually trusted. Brin and Page's insight: treat every hyperlink on the web as a vote of confidence from one page to another. A page gets a higher rank not just from having many links pointing to it, but from being linked to by other pages that are themselves highly ranked — importance flows through the link graph, recursively.",
    layer1:
      "The mechanism (PageRank) models the entire web as a graph and calculates each page's score based on a recursive definition: a page's importance equals the sum of the importance of every page linking to it, divided by how many outbound links each of those pages has (so a link from a page with only one outgoing link counts for more than a link from a page linking out to a thousand other sites). This is computed iteratively across the whole graph until the scores stabilize. The key structural advantage over keyword matching is that PageRank is much harder to manipulate directly — you can't just repeat a word on your own page, you need other already-trusted pages to link to you, which is a much higher bar to fake at scale.",
    layer2:
      "Think of PageRank's logic outside of web search: if you wanted to rank the most 'important' people in a professional network not by their own claims about themselves, but by who vouches for them and how credible those vouchers are, how would you design that? What would count as the equivalent of a 'link' in that context?",
    quiz: {
      question: "Why is PageRank harder to manipulate than simple keyword-frequency ranking?",
      options: [
        "Because it requires payment to Google to be indexed at all",
        "Because a page's rank depends on being linked to by other already-trusted pages, not just on what words appear on the page itself — which is much harder to fake than stuffing keywords",
        "Because PageRank only considers pages written in English",
        "Because it ranks pages randomly to prevent gaming the system",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "The Anatomy of a Large-Scale Hypertextual Web Search Engine (original paper)",
        source: "Stanford InfoLab, 1998",
        url: "http://infolab.stanford.edu/pub/papers/google.pdf",
        archive: { status: "full", path: "content/sources/F3-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "The Anatomy of a Large-Scale Hypertextual Web Search Engine (mirror)",
        source: "Stanford SNAP",
        url: "https://snap.stanford.edu/class/cs224w-readings/Brin98Anatomy.pdf",
        archive: { status: "full", path: "content/sources/F3-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "F4",
    clusterId: "F",
    title: "The Internet Tidal Wave",
    author: "Bill Gates",
    year: 1995,
    medium: "Memo",
    category: "Worldview",
    thesis:
      "The Internet is the single most important development since the IBM PC; Microsoft must reorient every product around it or be swept aside.",
    layer0:
      "In May 1995, Bill Gates sent an internal memo to Microsoft's executive staff and direct reports declaring that the internet represented the most important technology shift since the IBM PC, and that it directly threatened Microsoft's dominant, closed desktop-software business model. He ordered every product group across the company to reorient its strategy around the internet immediately, treating a young startup called Netscape (whose browser was the internet's main gateway at the time) as the company's most serious competitive threat.",
    layer1:
      "The mechanism of Microsoft's response was to use its existing operating system monopoly to neutralize the emerging threat: bundle a free web browser (Internet Explorer) directly into Windows, so that Netscape's paid browser lost its main revenue model overnight, while keeping the operating system itself as the layer developers had to build for. This is a classic incumbent response to a platform-level threat — rather than compete on the new layer's own terms, absorb that layer into your existing monopoly for free, so it can never become a substitute platform in its own right. The strategy worked commercially (Internet Explorer won the browser war) but also drew a landmark US antitrust lawsuit that shaped tech regulation for years afterward.",
    layer2:
      "Think of a company today whose core product could plausibly be threatened by a newer, cheaper, or free layer sitting on top of or underneath it. If you were that company's strategist, would you try to compete directly on the new layer, absorb it for free the way Microsoft did with the browser, or try something else entirely? What would each choice cost you?",
    quiz: {
      question:
        "How did Microsoft respond to the threat it identified from Netscape in the Internet Tidal Wave memo?",
      options: [
        "It acquired Netscape outright to eliminate the competitor",
        "It bundled a free web browser (Internet Explorer) into Windows, using its OS monopoly to undercut Netscape's paid browser business model",
        "It exited the software business entirely to focus on internet infrastructure",
        "It lobbied Congress to ban competing browsers",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "The Internet Tidal Wave (original memo)",
        source: "BBC-hosted archive",
        url: "http://news.bbc.co.uk/2/shared/bsp/hi/pdfs/18_06_08_internet%20tidal%20wave.pdf",
        archive: { status: "full", path: "content/sources/F4-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Did Tesla Remove Elon Musk's Master Plan From Its Website?",
        source: "Entrepreneur (context on tech memos aging)",
        url: "https://www.entrepreneur.com/business-news/did-tesla-remove-elon-musks-master-plan-from-its-website/479092",
        archive: { status: "full", path: "content/sources/F4-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "F5",
    clusterId: "F",
    title: "Increasing Returns and the New World of Business",
    author: "W. Brian Arthur",
    year: 1996,
    medium: "Essay",
    category: "Worldview",
    thesis:
      "Knowledge-based industries run on increasing returns, not diminishing ones. The firm that gets ahead tends to get further ahead, producing winner-take-all markets.",
    layer0:
      "Classical economics assumes 'diminishing returns': producing more of something eventually gets harder and more expensive (a farmer runs out of good land, a factory hits capacity constraints). Arthur argued that knowledge- and technology-based industries often work the opposite way: high upfront costs to build the product, but then almost-free costs to reproduce and distribute it, combined with network effects and switching costs that make a product more valuable to existing users as more people adopt it. In that environment, an early lead doesn't fade — it compounds, because being ahead makes it easier to get further ahead.",
    layer1:
      "The mechanism is a feedback loop rather than a static advantage: more users → more value for existing and future users (network effects) → more switching costs for anyone who'd otherwise leave → more data/resources to reinvest into the product → an even bigger lead. Arthur used the QWERTY-versus-Dvorak keyboard layout battle as the classic illustration: QWERTY isn't the most efficient possible keyboard layout, but once enough typists, typewriters, and training were locked into it, the market couldn't switch to a better alternative even though one existed — early adoption became self-reinforcing, locking in a standard regardless of whether it was actually the best one. This is the theoretical justification for a founder or investor accepting large losses now in exchange for market share, if the market has these dynamics.",
    layer2:
      "Think of a product or platform you use where switching to a 'better' alternative would be a hassle, not because the alternative is worse, but because everyone you know is already on the one you use. That's lock-in from increasing returns. What would it actually take — not hypothetically, but concretely — to get you and everyone you know to switch simultaneously?",
    quiz: {
      question:
        "According to W. Brian Arthur, why do knowledge-based technology markets tend toward winner-take-all outcomes?",
      options: [
        "Because governments actively regulate these markets to favor one company",
        "Because high upfront costs combined with near-zero reproduction costs, network effects, and switching costs create a feedback loop where an early lead compounds into a further lead, unlike traditional industries with diminishing returns",
        "Because consumers are legally required to use the first product that enters a market",
        "Because technology products always have higher switching costs than physical goods by definition",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Increasing Returns and the New World of Business (original essay)",
        source: "Harvard Business Review, 1996",
        url: "https://sites.santafe.edu/~wbarthur/Papers/HBR.pdf",
        archive: { status: "full", path: "content/sources/F5-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "W. Brian Arthur's work on complexity and increasing returns",
        source: "Santa Fe Institute",
        url: "https://www.santafe.edu/people/profile/w-brian-arthur",
        archive: { status: "full", path: "content/sources/F5-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "G1",
    clusterId: "G",
    title: "Software 2.0",
    author: "Andrej Karpathy",
    year: 2017,
    medium: "Essay",
    category: "AI Essay",
    thesis:
      "Neural networks are a new software paradigm where code is learned from data, not written by hand.",
    layer0:
      "In traditional software ('Software 1.0'), a human engineer writes explicit step-by-step instructions telling the computer exactly what to do in every situation. Karpathy's argument: a large and growing share of valuable software is now better built a completely different way — you define a goal (a loss function measuring how wrong the model currently is), provide labeled examples, and let an optimization algorithm (like gradient descent) search through billions of possible internal settings until it finds ones that achieve the goal. The 'program' that results isn't human-readable code — it's a giant set of numbers (weights) that a human didn't write line by line.",
    layer1:
      "The mechanism is replacing hand-specification with search-plus-data. In Software 1.0, if you want a program to recognize cats in photos, an engineer would have to manually write rules about edges, shapes, and colors — a nearly impossible task to get right by hand. In Software 2.0, you instead show the system millions of labeled photos (cat / not cat) and let an optimizer adjust internal weights until the network's predictions match the labels as closely as possible. The 'source code' becomes two things: the architecture of the network, and the dataset it was trained on — meaning that improving the software increasingly means improving your data pipeline, not just your codebase.",
    layer2:
      "Think of a task you currently do by writing out explicit rules or instructions (a checklist, an if-this-then-that process, a spreadsheet formula). What would the 'Software 2.0' version of that same task look like — i.e., what examples would you need to collect to let a system learn the pattern instead of you specifying every rule yourself?",
    quiz: {
      question: "According to Karpathy, what makes up the 'source code' of a Software 2.0 system?",
      options: [
        "A traditional programming language file that a human wrote and can read line by line",
        "The neural network's architecture and the dataset used to train it — since the actual logic is encoded as learned numerical weights, not hand-written instructions",
        "A configuration file specifying business rules",
        "A compiled binary with no human-inspectable components at all",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Software 2.0 (original essay)",
        source: "Andrej Karpathy on Medium",
        url: "https://karpathy.medium.com/software-2-0-a64152b37c35",
        archive: { status: "full", path: "content/sources/G1-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "The Rise of Software 2.0: You don't want to be left behind",
        source: "Towards Data Science",
        url: "https://towardsdatascience.com/the-rise-of-software-2-0-you-dont-want-to-be-left-behind-cbaa75f6d19",
        archive: { status: "full", path: "content/sources/G1-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "G2",
    clusterId: "G",
    title: "Efficient Estimation of Word Representations (word2vec)",
    author: "Mikolov et al. (Google)",
    year: 2013,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "Words can be embedded in vector space where semantic relationships become linear arithmetic.",
    layer0:
      "Before word2vec, computers mostly treated words as arbitrary, unrelated symbols — 'cat' and 'dog' had no more mathematical relationship to each other than 'cat' and 'stapler.' Mikolov and colleagues at Google showed that by training a simple neural network to predict a word from its surrounding context (or vice versa) across huge amounts of text, you get a byproduct that turns out to be far more valuable than the prediction task itself: every word ends up represented as a point (a vector) in a high-dimensional space, positioned such that words used in similar contexts end up near each other, and consistent relationships (like 'male-to-female' or 'country-to-capital') show up as consistent directions you can add or subtract.",
    layer1:
      "The mechanism comes in two architectures: Continuous Bag-of-Words (CBOW), which predicts a target word from the words around it, and Skip-gram, which does the reverse — predicting the surrounding context words from a single target word. Neither prediction task is the actual goal; the goal is the internal numerical representation (embedding) the network is forced to build in order to get good at that prediction task at all. Because words that appear in similar contexts get pushed to similar locations in this vector space, the geometry ends up encoding real semantic and relational structure — enabling vector arithmetic like king − man + woman ≈ queen — purely as an emergent property of the prediction objective, without anyone explicitly programming in the concept of gender or royalty.",
    layer2:
      "Think of two words that are used in very similar sentence contexts even though they don't mean exactly the same thing (e.g., 'happy' and 'joyful', or 'car' and 'vehicle'). If you were building this vector space by hand from scratch, roughly how close would you place them to each other, and what direction might represent the subtle difference between them?",
    quiz: {
      question:
        "How does word2vec end up capturing semantic relationships between words, if it's only trained to predict nearby words?",
      options: [
        "It's explicitly given a dictionary of word meanings during training",
        "The prediction task forces the network to build an internal vector representation where words used in similar contexts land near each other, and consistent relationships emerge as consistent directions in that space",
        "It memorizes definitions from an online encyclopedia",
        "Human annotators manually label the relationships between every pair of words",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Efficient Estimation of Word Representations in Vector Space (original paper)",
        source: "arXiv, 2013",
        url: "https://arxiv.org/abs/1301.3781",
        archive: { status: "full", path: "content/sources/G2-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "The Illustrated Word2vec",
        source: "Jay Alammar",
        url: "https://jalammar.github.io/illustrated-word2vec/",
        archive: { status: "full", path: "content/sources/G2-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "G3",
    clusterId: "G",
    title: "ImageNet Classification with Deep Convolutional Neural Networks (AlexNet)",
    author: "Krizhevsky, Sutskever, Hinton",
    year: 2012,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "Deep CNNs trained on GPUs shatter the ImageNet benchmark, igniting the modern deep-learning era.",
    layer0:
      "Every year, the ImageNet competition tested how well computer programs could correctly label photos into categories. For years, progress came from hand-engineered techniques designed by computer vision experts. In 2012, a deep convolutional neural network trained by Krizhevsky, Sutskever, and Hinton entered and won by such a wide margin that it upended the field's consensus: a network with enough layers, trained on enough labeled images, using specific practical tricks to make training feasible, could learn better visual features on its own than experts could design by hand.",
    layer1:
      "The mechanism combined several practical breakthroughs that made deep networks trainable at this scale for the first time: the ReLU activation function, which trains many times faster than the previously standard sigmoid function because it doesn't saturate (stop learning) as easily; dropout, a technique that randomly disables a fraction of neurons during training so the network can't over-rely on any single pathway, which reduces overfitting; and splitting the 60 million parameters of the model across two GPUs running in parallel, since no single GPU at the time had enough memory to hold the whole network. None of these tricks were individually brand new, but combining them let a deep network finally be trained in a practical amount of time at a scale that outperformed hand-engineered approaches.",
    layer2:
      "Think of a skill where 'hand-engineered rules from an expert' and 'learned from lots of examples' would produce very different approaches (e.g., diagnosing a mechanical problem by a strict checklist versus by a mechanic's pattern-matching intuition from experience). Which approach would you trust more if you had access to thousands of past examples but no expert available, and why?",
    quiz: {
      question:
        "What combination of techniques allowed AlexNet to train a deep network fast enough to be practical in 2012?",
      options: [
        "A completely new type of computer chip designed specifically for the competition",
        "The ReLU activation function (faster training than sigmoid), dropout (reduces overfitting), and splitting the model across two GPUs to handle its 60 million parameters",
        "Manually hand-labeling every single feature the network should look for",
        "Running the entire model on a single CPU over several months",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "ImageNet Classification with Deep Convolutional Neural Networks (original paper)",
        source: "NeurIPS, 2012",
        url: "https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html",
        archive: { status: "full", path: "content/sources/G3-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "Geoffrey Hinton — Turing Award Lecture on Deep Learning",
        source: "ACM / YouTube",
        url: "https://www.youtube.com/watch?v=VsnQf7exv5I",
        archive: { status: "unavailable" },
      },
    ],
    tags: [],
  },
  {
    id: "G4",
    clusterId: "G",
    title: "Deep Residual Learning for Image Recognition (ResNet)",
    author: "He, Zhang, Ren, Sun (Microsoft)",
    year: 2015,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "Residual connections let networks train to unprecedented depths, driving a leap in vision performance.",
    layer0:
      "Before ResNet, adding more layers to a deep neural network usually helped performance up to a point — and then made things worse, even on the training data itself, which ruled out overfitting as the explanation. The real problem was that training signals (gradients) had to travel backward through every layer during training, and in very deep networks that signal would shrink to almost nothing by the time it reached the earliest layers (the 'vanishing gradient' problem), making those layers nearly impossible to train properly. He, Zhang, Ren, and Sun's fix: add 'skip connections' that let the signal bypass a block of layers entirely if needed, so a layer only has to learn the difference (the 'residual') from what came before, rather than reconstructing the whole transformation from scratch.",
    layer1:
      "The mechanism is structural, not just a training trick: instead of asking each block of layers to learn a completely new mapping from input to output, ResNet reframes the task as learning a residual — the specific correction needed on top of just passing the input straight through unchanged. If a given block turns out not to be useful, the network can effectively learn to make it a no-op (its weights get pushed toward zero) and the skip connection carries the original signal straight through undamaged. This let networks scale from roughly 16 layers to over 150 layers, and the 152-layer version achieved a top-5 error rate of 3.57% on ImageNet — surpassing typical human-level performance on that specific benchmark.",
    layer2:
      "Think of a long chain of people passing a message (like a game of telephone). ResNet's fix is roughly equivalent to also passing the original message directly alongside the retold version at every step, so listeners can always compare against the source rather than only against the previous (possibly already-corrupted) retelling. Where else — outside of neural networks — would 'always keep a direct link back to the original signal' be a useful design principle?",
    quiz: {
      question: "What problem did ResNet's 'skip connections' specifically solve?",
      options: [
        "They reduced the total number of parameters needed to store the model",
        "They let the training signal (gradient) bypass layers when needed, solving the vanishing gradient problem that made very deep networks degrade in accuracy rather than improve",
        "They eliminated the need for labeled training data entirely",
        "They allowed the network to run without GPUs",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Deep Residual Learning for Image Recognition (original paper)",
        source: "arXiv, 2015",
        url: "https://arxiv.org/abs/1512.03385",
        archive: { status: "full", path: "content/sources/G4-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Understanding ResNet and its variants",
        source: "Towards Data Science",
        url: "https://towardsdatascience.com/understanding-and-coding-a-resnet-in-keras-446d7ff84d33",
        archive: { status: "full", path: "content/sources/G4-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "G5",
    clusterId: "G",
    title: "Attention Is All You Need",
    author: "Vaswani et al. (Google)",
    year: 2017,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "The Transformer architecture, based solely on attention, outperforms recurrence/convolution for sequence modeling.",
    layer0:
      "Before Transformers, the standard way to process a sequence of words (like a sentence) was recurrently — one word at a time, in order, feeding each step's output into the next. This was slow to train (you can't easily parallelize a process that depends on the previous step finishing first) and struggled to preserve context across long distances in a sentence. Vaswani and colleagues proposed processing the entire sequence at once, using a mechanism called 'self-attention' that directly calculates how relevant every word is to every other word in the sequence, regardless of how far apart they are.",
    layer1:
      "The mechanism, self-attention, computes a relevance score between every pair of tokens in the input, letting the model weigh, for each word, how much every other word should influence its representation — a pronoun like 'it' can directly attend to the noun it refers to many sentences earlier, without the information having to survive a long chain of sequential steps. Because these relevance calculations for all word-pairs can be done simultaneously rather than one step at a time, Transformers parallelize far better on modern GPU hardware than the recurrent models they replaced, which is what made training on internet-scale text datasets computationally feasible in the first place — directly enabling the large language models that followed.",
    layer2:
      "Think of reading a long paragraph and needing to resolve what a pronoun like 'it' refers to several sentences back. Notice that your attention jumps directly to the relevant earlier word rather than needing to re-read every sentence in between sequentially. Where else in how you process information (reading, listening, remembering) do you do something like 'direct attention to the relevant distant part' rather than strictly sequential processing?",
    quiz: {
      question:
        "What made Transformers more practical to train at massive scale than the recurrent models that came before them?",
      options: [
        "They required far less training data than recurrent models",
        "Self-attention lets the model process all words in a sequence simultaneously rather than one at a time, which parallelizes far better on GPU hardware than sequential recurrent processing",
        "They eliminated the need for GPUs entirely",
        "They could only process short sentences, which made training faster",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Attention Is All You Need (original paper)",
        source: "arXiv, 2017",
        url: "https://arxiv.org/abs/1706.03762",
        archive: { status: "full", path: "content/sources/G5-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "The Illustrated Transformer",
        source: "Jay Alammar",
        url: "https://jalammar.github.io/illustrated-transformer/",
        archive: { status: "full", path: "content/sources/G5-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "G6",
    clusterId: "G",
    title: "Language Models are Few-Shot Learners (GPT-3)",
    author: "Brown et al. (OpenAI)",
    year: 2020,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "Scaling language models to 175B parameters yields emergent few-shot task performance without fine-tuning.",
    layer0:
      "GPT-3's core training task never changed from earlier language models — predict the next word in a sequence, over and over, on a vast amount of internet text. What changed was scale: 175 billion parameters, trained on an enormous dataset. At that scale, something unexpected showed up: the model could perform tasks it was never specifically trained to do — translation, arithmetic, simple coding — just by being shown a few examples of the task directly inside the prompt, with no retraining or fine-tuning required.",
    layer1:
      "The mechanism demonstrated is 'in-context learning': instead of updating the model's internal weights to learn a new task (the traditional fine-tuning approach), you simply describe the task or show a handful of example input-output pairs within the prompt itself, and the model's existing attention mechanisms adapt to the pattern on the fly, producing appropriate output for a new, unseen input in the same format — without any gradient updates or retraining. This proved that scale itself could unlock general-purpose capability from a single model, rather than needing a separate specially-trained model for each task, which reframed AI in the eyes of investors from a collection of narrow tools into a general-purpose platform.",
    layer2:
      "Think of teaching someone a new task by just showing them two or three worked examples, versus sending them through a full training course. GPT-3's 'few-shot learning' is closer to the first — the model applies a pattern from a handful of examples immediately. What kinds of tasks do you think are learnable that way, and what kinds genuinely require the equivalent of a full training course (fine-tuning)?",
    quiz: {
      question: "What is 'in-context learning,' as demonstrated by GPT-3?",
      options: [
        "Retraining the model's weights every time it sees a new task",
        "Performing a new task correctly just from a description or a few examples shown in the prompt itself, without any weight updates or retraining",
        "Learning exclusively from a fixed, curated textbook dataset",
        "A method requiring internet access during inference to look up answers",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Language Models are Few-Shot Learners (original paper)",
        source: "arXiv, 2020",
        url: "https://arxiv.org/abs/2005.14165",
        archive: { status: "full", path: "content/sources/G6-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "How GPT3 Works — Visualizations and Animations",
        source: "Jay Alammar",
        url: "https://jalammar.github.io/how-gpt3-works-visualizations-animations/",
        archive: { status: "full", path: "content/sources/G6-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "G7",
    clusterId: "G",
    title: "Scaling Laws for Neural Language Models",
    author: "Kaplan et al. (OpenAI)",
    year: 2020,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "Model performance scales predictably as a power law with compute, data, and parameters.",
    layer0:
      "Kaplan and colleagues at OpenAI ran systematic experiments training many language models of different sizes and found something remarkably clean: a model's performance (its error rate) improves in a predictable mathematical pattern (a power law) as you increase compute, dataset size, or parameter count — and crucially, the internal architecture details (like how deep versus how wide the network is) mattered far less than sheer scale. This gave labs a rare thing in machine learning research: a way to forecast how much better a bigger model would be, before actually building it.",
    layer1:
      "The mechanism is an empirical, not theoretical, finding: by training a large number of models across a wide range of sizes and measuring how loss (prediction error) changed, the researchers found the relationship followed a smooth power-law curve rather than being unpredictable or plateauing. Their specific recommendation — that given a fixed compute budget, you should mostly grow the model's parameter count rather than proportionally growing the training dataset — became the guiding assumption behind years of ever-larger model releases. This is also a useful cautionary case: that specific parameter-versus-data recommendation was later shown to be significantly off by DeepMind's 2022 Chinchilla paper, which found models were being kept far too large relative to how much data they were trained on.",
    layer2:
      "Think of a time you (or a company) followed an authoritative, data-backed recommendation that later turned out to need correcting once someone ran a more careful follow-up study. What made the original recommendation convincing at the time, and what would it have taken to catch the error earlier?",
    quiz: {
      question:
        "What specific guidance from the original Scaling Laws paper was later overturned by DeepMind's Chinchilla paper?",
      options: [
        "The claim that neural networks require labeled data to train at all",
        "The recommendation that, for a fixed compute budget, model size should be scaled up much faster than training data — Chinchilla showed the two should scale together",
        "The claim that GPU hardware would never become a bottleneck for AI progress",
        "The idea that language models could ever perform translation tasks",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Scaling Laws for Neural Language Models (original paper)",
        source: "arXiv, 2020",
        url: "https://arxiv.org/abs/2001.08361",
        archive: { status: "full", path: "content/sources/G7-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "The Scaling Hypothesis",
        source: "Gwern Branwen",
        url: "https://gwern.net/scaling-hypothesis",
        archive: { status: "full", path: "content/sources/G7-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "G8",
    clusterId: "G",
    title: "Training Compute-Optimal Large Language Models (Chinchilla)",
    author: "Hoffmann et al. (DeepMind)",
    year: 2022,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "For a fixed compute budget, models should be smaller and trained on far more data than prior practice.",
    layer0:
      "DeepMind trained over 400 language models of varying sizes to empirically map out what actually minimizes error for a given amount of compute. Their finding directly corrected the earlier OpenAI scaling-laws guidance: rather than mostly growing parameter count, model size and training data should scale up together, roughly in equal proportion. Their 70-billion-parameter 'Chinchilla' model, trained on far more data (1.4 trillion tokens) than GPT-3's 175 billion parameters had been (roughly 300 billion tokens), ended up outperforming the much larger model.",
    layer1:
      "The mechanism is a straightforward but consequential re-derivation of the compute-optimal frontier: given a fixed training compute budget, there's a specific ratio of parameters to training tokens that minimizes loss, and the earlier scaling-laws guidance had been well off that ratio, favoring oversized, undertrained models. The practical rule of thumb that emerged — roughly 20 training tokens per parameter — reshaped how every subsequent lab budgeted a training run, and shifted the industry's bottleneck away from 'how many parameters can we afford' and toward 'how much high-quality training data can we actually acquire,' a much harder problem to solve by just buying more GPUs.",
    layer2:
      "Think of a resource-allocation mistake where more of one input (money, time, people) was thrown at a problem while a different, cheaper input (planning, information, practice) was under-invested, producing worse results than a more balanced allocation would have. What would the 'Chinchilla correction' look like for that situation?",
    quiz: {
      question:
        "What did the Chinchilla paper prove was wrong with prior industry practice in training large language models?",
      options: [
        "Models were being trained on too much data relative to their size",
        "Models were being built too large relative to how much training data they were given — a smaller model trained on proportionally more data outperformed a much larger, undertrained one",
        "Neural networks could not be trained using GPUs at all",
        "Training data needed to be exclusively in English to be effective",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Training Compute-Optimal Large Language Models (original paper)",
        source: "arXiv, 2022",
        url: "https://arxiv.org/abs/2203.15556",
        archive: { status: "full", path: "content/sources/G8-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Chinchilla's Wild Implications",
        source: "LessWrong",
        url: "https://www.lesswrong.com/posts/6Fpvch8TREZXbdmEB/chinchilla-s-wild-implications",
        archive: { status: "full", path: "content/sources/G8-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "G9",
    clusterId: "G",
    title: "DeepSeek-R1: Incentivizing Reasoning Capability via RL",
    author: "DeepSeek",
    year: 2025,
    medium: "Paper",
    category: "Technical Paper",
    thesis:
      "Reinforcement learning can elicit strong reasoning in LLMs at a fraction of frontier training cost.",
    layer0:
      "DeepSeek, a Chinese AI lab, released an open-source reasoning model that matched top proprietary 'reasoning' models (like OpenAI's o1) on many benchmarks, while claiming a dramatically lower training and inference cost. The paper's core claim is that strong step-by-step reasoning ability can be taught to a language model largely through reinforcement learning — rewarding the model for correct final answers and consistent reasoning — rather than primarily through expensive, human-curated supervised fine-tuning data, which had been the more common assumption.",
    layer1:
      "The mechanism, called Group Relative Policy Optimization (GRPO), trains the model by generating multiple candidate reasoning attempts for a given problem, scoring them with rule-based rewards (mainly: did it reach the correct final answer, and did it stay in one consistent language rather than mixing languages mid-response), and reinforcing the patterns that led to higher-scoring attempts. Pure reinforcement learning from scratch tends to produce unstable, repetitive, or language-mixing behavior early on, so the approach uses a small amount of 'cold-start' example data to stabilize the model before RL takes over as the primary training signal. The result is a model that learns to self-correct and verify its own reasoning steps largely through trial-and-reward rather than being shown millions of hand-labeled reasoning examples.",
    layer2:
      "Think of a skill you or someone else got good at mostly through trial-and-error with feedback (win/lose, right/wrong) rather than through being explicitly taught step-by-step. What made the trial-and-reward approach work well enough there, and where might it have failed without any structure at all (the equivalent of DeepSeek's 'cold-start' data) to stabilize early attempts?",
    quiz: {
      question:
        "What training approach did DeepSeek-R1 rely on primarily to teach the model to reason, rather than mainly using human-labeled reasoning examples?",
      options: [
        "Pure memorization of textbook solutions to math problems",
        "Reinforcement learning with rule-based rewards (correct answers, consistent language) building on a small amount of stabilizing 'cold-start' data",
        "Manual rule-writing by human logicians for every reasoning step",
        "Training exclusively on translated versions of OpenAI's own model outputs",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via RL (original paper)",
        source: "arXiv, 2025",
        url: "https://arxiv.org/abs/2501.12948",
        archive: { status: "full", path: "content/sources/G9-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "DeepSeek-R1 explainer",
        source: "Hugging Face",
        url: "https://huggingface.co/deepseek-ai/DeepSeek-R1",
        archive: { status: "full", path: "content/sources/G9-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "G10",
    clusterId: "G",
    title: "The Bitter Lesson",
    author: "Rich Sutton",
    year: 2019,
    medium: "Essay",
    category: "AI Essay",
    thesis:
      "General methods that leverage computation ultimately beat human-knowledge-engineered approaches in AI.",
    layer0:
      "Sutton observed a repeating pattern across seven decades of AI research: researchers build systems that encode human expertise and intuition about a domain (like handcrafted chess strategies or linguistic grammar rules), these systems perform well initially, and then eventually get overtaken by much simpler, more general methods that just leverage more computation — search and learning — once enough compute becomes available. The 'bitter' part is that this keeps surprising and disappointing researchers who invested years building domain-specific expert knowledge into their systems, only to watch a more general, compute-hungry approach eventually surpass it.",
    layer1:
      "The mechanism Sutton identifies is that human-engineered knowledge imposes a ceiling — it encodes what humans currently understand about a problem, which is necessarily limited and often subtly wrong in ways that are hard to detect. General methods (massive search, like the alpha-beta search behind Deep Blue's chess victory over Kasparov, or deep learning over massive datasets) don't have that ceiling; they can keep improving simply by throwing more computation at the same simple underlying method, and computation has historically kept getting cheaper on a predictable curve (following something like Moore's Law). So over a long enough time horizon, the 'dumb but scalable' method tends to overtake the 'smart but hand-crafted' one, because only the former can keep improving indefinitely as hardware improves.",
    layer2:
      "Think of a domain where you've seen 'expert hand-crafted rules' lose out over time to a cruder but more scalable approach (a rules-based email spam filter versus a learned one, a curated recommendation list versus a learned one). What was the specific ceiling the hand-crafted approach hit, and what made the scalable approach able to keep improving past it?",
    quiz: {
      question:
        "According to Rich Sutton's 'Bitter Lesson,' why do general, compute-heavy methods tend to eventually beat human-engineered domain expertise in AI?",
      options: [
        "Because human experts are always wrong about their own domains",
        "Because hand-engineered knowledge imposes a hard ceiling on performance, while general methods (search and learning) can keep improving indefinitely as computation gets cheaper over time",
        "Because compute-heavy methods require no data at all",
        "Because domain experts refuse to collaborate with AI researchers",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "The Bitter Lesson (original essay)",
        source: "Rich Sutton, incompleteideas.net",
        url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
        archive: { status: "full", path: "content/sources/G10-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Rich Sutton's bitter lesson of AI",
        source: "John D. Cook",
        url: "https://www.johndcook.com/blog/2025/02/20/bitter-lesson/",
        archive: { status: "full", path: "content/sources/G10-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "H1",
    clusterId: "H",
    title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
    author: "Satoshi Nakamoto",
    year: 2008,
    medium: "Whitepaper",
    category: "Technical Paper",
    thesis:
      "A decentralized, trustless electronic cash system using proof-of-work to solve double-spending without intermediaries.",
    layer0:
      "Digital cash has an obvious problem: a digital file is trivially easy to copy, so what stops someone from spending the same digital coin twice? Historically this was solved by having a trusted central authority (a bank) keep the official ledger of who owns what. Nakamoto's proposal removes the need for that trusted third party entirely: every transaction is broadcast to a network of computers, bundled into 'blocks,' and each block is cryptographically chained to the one before it. Network participants ('miners') compete to solve a computationally expensive puzzle to add the next block, and the network simply agrees that whichever chain has the most accumulated computational work behind it is the true history.",
    layer1:
      "The mechanism (proof-of-work) makes rewriting history expensive on purpose. To double-spend a coin, an attacker would need to secretly build an alternate chain of blocks starting from before the transaction they want to reverse, and make that alternate chain longer (more computational work) than the real chain the rest of the network is building — which requires out-computing the majority of the network's combined processing power simultaneously, an enormously expensive and impractical feat as the network grows. Because everyone independently verifies the chain with the most accumulated proof-of-work, no central party needs to be trusted to keep the ledger honest — trust is replaced by raw computational cost.",
    layer2:
      "Think of a shared group expense ledger (like splitting rent or a group trip) where everyone currently just trusts one person to keep the spreadsheet honest. What would it take to replace that trust with a system where everyone could independently verify the ledger was accurate, without needing to trust any single person? What would be expensive or annoying about that compared to just trusting one person?",
    quiz: {
      question:
        "How does Bitcoin prevent double-spending without a central trusted authority like a bank?",
      options: [
        "Every transaction requires a government ID to verify identity",
        "Proof-of-work makes rewriting transaction history computationally expensive — an attacker would need to out-compute the majority of the network's processing power to build a longer alternate chain",
        "Transactions are limited to once per day per user",
        "A single trusted server verifies every transaction centrally",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Bitcoin: A Peer-to-Peer Electronic Cash System (original whitepaper)",
        source: "bitcoin.org, 2008",
        url: "https://bitcoin.org/bitcoin.pdf",
        archive: { status: "full", path: "content/sources/H1-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Bitcoin: The Internet of Money",
        source: "Naval Ravikant",
        url: "https://startupboy.com/2013/11/07/bitcoin-the-internet-of-money/",
        archive: { status: "full", path: "content/sources/H1-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "H2",
    clusterId: "H",
    title: "The Bullish Case for Bitcoin",
    author: "Vijay Boyapati",
    year: 2018,
    medium: "Essay",
    category: "Crypto",
    thesis:
      "Bitcoin is monetizing as a store of value along the path collectible → SoV → medium of exchange → money.",
    layer0:
      "Published during a brutal bear market when Bitcoin skeptics were declaring it dead, Boyapati's essay reframed the entire debate: Bitcoin wasn't failing to become a medium of exchange (something you buy coffee with), it was still early in the process of becoming a store of value (something people hold because they trust it'll retain worth) — a necessary earlier stage that historically precedes anything becoming widely used as everyday money. Using Austrian economic theory, he lays out four stages any monetary good passes through: collectible, store of value, medium of exchange, and finally unit of account — and argues Bitcoin was transitioning from the first stage into the second.",
    layer1:
      "The mechanism is a historical framework for how something becomes money, applied to Bitcoin's specific properties. A good only becomes a useful medium of exchange once enough people already trust it holds value reliably (store of value) — trying to skip straight to 'spend it on coffee' before that trust is established is backwards, historically speaking (gold followed the same stages over centuries). Boyapati argues Bitcoin's specific properties — a strictly capped, disinflationary supply of 21 million coins, and resistance to censorship or seizure by any single authority — give it structural advantages over both fiat currency (which can be printed without limit) and gold (which is heavy, hard to verify, and hard to transport) for the store-of-value stage specifically, even while its price remains volatile during that transition.",
    layer2:
      "Think of something valuable that started as a rare, largely symbolic collectible before becoming widely trusted as a store of value (gold historically, or even certain long-running currencies). What signs would tell you a similar asset today is still in an early 'collectible' phase versus genuinely transitioning into being trusted as a durable store of value?",
    quiz: {
      question:
        "According to Boyapati's framework, why is it backwards to judge Bitcoin as a failure for not yet being widely used to buy everyday goods?",
      options: [
        "Because Bitcoin was never intended to be used as money at all",
        "Because becoming a widely-used medium of exchange historically requires first becoming a trusted store of value — Bitcoin was still in that earlier stage, and skipping ahead isn't how monetization has historically worked",
        "Because government regulation legally prohibits using Bitcoin for purchases",
        "Because Bitcoin's supply is unlimited, unlike gold",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "The Bullish Case for Bitcoin (original essay)",
        source: "Vijay Boyapati on Medium, 2018",
        url: "https://vijayboyapati.medium.com/the-bullish-case-for-bitcoin-6ecc8bdecc1",
        archive: { status: "full", path: "content/sources/H2-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "The Bull Case for Bitcoin",
        source: "The Investor's Podcast Network",
        url: "https://www.theinvestorspodcast.com/millennial-investing/the-bull-case-for-btc/",
        archive: { status: "unavailable" },
      },
    ],
    tags: [],
  },
  {
    id: "H3",
    clusterId: "H",
    title: "Ethereum Whitepaper: A Next-Generation Smart Contract Platform",
    author: "Vitalik Buterin",
    year: 2013,
    medium: "Whitepaper",
    category: "Technical Paper",
    thesis:
      "A Turing-complete blockchain enabling arbitrary smart contracts and decentralized applications.",
    layer0:
      "Bitcoin's blockchain is deliberately limited — it's designed almost exclusively to verify and move a currency, with very little room for arbitrary programmable logic. Buterin's whitepaper proposed a blockchain built from the start to run any program (Turing-complete, meaning it can compute anything a general-purpose computer can, given enough resources), where developers write 'smart contracts' — code that executes exactly as written, automatically, with no company or server able to shut it down, alter it, or interfere with it once deployed. This turns a blockchain from just a ledger of currency balances into what's often described as a 'world computer.'",
    layer1:
      "The mechanism is a decentralized virtual machine (the Ethereum Virtual Machine) that runs on every participating node simultaneously, executing smart contract code identically everywhere and reaching consensus on the results the same way Bitcoin reaches consensus on transaction history. Because unrestricted computation could allow an infinite loop to freeze or spam the entire network, every operation costs 'gas' — a small fee paid in Ether that scales with computational complexity, which prices network usage by supply and demand and makes deliberately wasteful or malicious code prohibitively expensive to run. This single design choice (a fee-metered, general-purpose computer with no owner) is what allowed later innovations — DeFi lending markets, NFTs, DAOs — to be built entirely as code on top of Ethereum without needing Ethereum itself to be redesigned for each one.",
    layer2:
      "Think of a real-world contract or agreement you've been part of that required a trusted intermediary to enforce it (an escrow service, a lawyer, a notary). What would it take for that same agreement to instead be enforced automatically by code that executes exactly as written, without needing anyone's ongoing cooperation or trust — and what would you lose or gain by removing the human intermediary?",
    quiz: {
      question:
        "Why does Ethereum require paying 'gas' fees for every computation, unlike Bitcoin's simpler transaction model?",
      options: [
        "To generate charitable donations for the Ethereum Foundation",
        "Because Ethereum allows unrestricted, Turing-complete computation, and gas fees (scaling with computational complexity) prevent infinite loops or spam from freezing the shared network",
        "To convert Ether into Bitcoin automatically during each transaction",
        "Because Ethereum has no consensus mechanism and needs fees to select validators randomly",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Ethereum Whitepaper (original)",
        source: "ethereum.org",
        url: "https://ethereum.org/en/whitepaper/",
        archive: { status: "full", path: "content/sources/H3-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Ethereum: A Next-Generation Smart Contract Platform (context)",
        source: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/Ethereum",
        archive: { status: "full", path: "content/sources/H3-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "H4",
    clusterId: "H",
    title: "Fat Protocols",
    author: "Joel Monegro / USV",
    year: 2016,
    medium: "Essay",
    category: "Crypto",
    thesis:
      "Unlike the web, in crypto value accrues to the protocol layer, not the application layer.",
    layer0:
      "On the traditional internet, the underlying protocols (like TCP/IP or HTTP) are 'thin' — open, free, and capturing essentially no economic value themselves — while the applications built on top of them (Google, Facebook, Amazon) are 'fat,' capturing huge value because they own the proprietary data, user relationships, and network effects on top of the shared, valueless plumbing. Monegro's thesis: in crypto, this inverts. Because blockchain data is shared and open rather than proprietary, applications built on top have a much weaker moat, while the base-layer protocol token itself directly captures speculative and economic value as the whole ecosystem of applications built on it succeeds.",
    layer1:
      "The mechanism is about where the token accrues value versus where a company accrues value. An internet application moat comes from hoarding proprietary data that competitors can't access. A blockchain application typically can't hoard its data — it's on a public, shared ledger by design — so a competing application can often just fork the code and data and compete directly, weakening the individual application's moat. But the protocol token itself (Ether, for example) is required to use the network at all, so as more applications launch and succeed on top of a given protocol, demand for the underlying token rises in tandem, meaning value concentrates at the base layer rather than the application layer — an argument that directly justified tens of billions of dollars of 'Layer 1' investing rather than application-layer investing during the 2017-2021 crypto cycles.",
    layer2:
      "Think of an ecosystem (not necessarily crypto) where the 'plumbing' layer captures more value than the 'application' layer built on top of it, or vice versa. What structural property (open/shared data versus proprietary/hoarded data) explains which layer ends up capturing the value in that specific case?",
    quiz: {
      question:
        "Why does Joel Monegro argue that value in crypto accrues to the protocol layer rather than the application layer, unlike the internet?",
      options: [
        "Because crypto applications are illegal in most jurisdictions",
        "Because blockchain data is shared and open rather than proprietary, weakening individual applications' moats, while the base protocol token captures value as the whole ecosystem built on it grows",
        "Because protocols require government licensing fees that applications don't",
        "Because applications on blockchains cannot generate any revenue at all",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Fat Protocols (original essay)",
        source: "Union Square Ventures, 2016",
        url: "https://www.usv.com/writing/2016/08/fat-protocols/",
        archive: { status: "full", path: "content/sources/H4-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "The industry is growing out of the Fat Protocol Thesis (debate)",
        source: "The Blockchain Debate Podcast",
        url: "https://blockdebate.buzzsprout.com/767033/episodes/9694662-motion-the-industry-is-growing-out-of-the-fat-protocol-thesis-jeff-dorman-vs-joel-monegro",
        archive: { status: "full", path: "content/sources/H4-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "H5",
    clusterId: "H",
    title: "Uniswap Whitepaper (Automated Market Maker)",
    author: "Hayden Adams",
    year: 2018,
    medium: "Whitepaper",
    category: "Technical Paper",
    thesis:
      "A constant-product automated market maker (x*y=k) enabling permissionless on-chain token swaps without order books.",
    layer0:
      "A traditional exchange (or an early decentralized exchange copying that model) needs to match a buyer's order with a seller's order at an agreed price — a system called an order book. On Ethereum, maintaining a live order book on-chain is prohibitively slow and expensive because every order update costs a transaction fee. Uniswap's whitepaper proposed something structurally different: an Automated Market Maker (AMM), where a smart contract holds a pool of two tokens, and prices are set automatically by a simple formula rather than by matching human orders at all — anyone can trade against the pool at any time, and anyone can deposit tokens into the pool to earn a share of trading fees.",
    layer1:
      "The mechanism is the constant-product formula, x times y equals k: the smart contract holds reserves of two tokens (x and y), and enforces that the product of the two reserve amounts must always equal a constant (k) after any trade. If you trade token A for token B, you're adding to the A side of the pool and removing from the B side — and because the product must stay constant, removing a larger amount of B (as the trade gets bigger) requires disproportionately more A, meaning the price you get worsens as your trade size grows relative to the pool. This makes pricing fully automatic and requires no counterparty on the other side of your specific trade — you're always trading against the pool itself, governed only by the formula, with liquidity providers earning a small fee (commonly 0.3%) on every trade in exchange for supplying the reserves.",
    layer2:
      "Think of the constant-product formula's implication: the bigger your trade relative to the pool's total size, the worse a price you get (this is called 'slippage'). If you were designing a system to protect small pools from large trades wrecking the price entirely, what mechanism would you add on top of the basic x*y=k formula?",
    quiz: {
      question:
        "How does Uniswap determine the price of a trade, given that there's no order book matching buyers and sellers?",
      options: [
        "A central Uniswap server sets prices manually based on other exchanges",
        "A smart contract holds a pool of two tokens and enforces that their product stays constant (x*y=k); trading against the pool shifts the ratio, and price is derived automatically from that formula",
        "Prices are fixed permanently when the pool is created and never change",
        "Every trade requires a human liquidity provider to personally approve the price",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Uniswap Whitepaper (v1, original concept document)",
        source: "Hayden Adams",
        url: "https://hackmd.io/@HaydenAdams/HJ9jLsfTz",
        archive: { status: "unavailable" },
      },
      {
        type: "read",
        label: "Uniswap v3 Core whitepaper",
        source: "uniswap.org",
        url: "https://app.uniswap.org/whitepaper-v3.pdf",
        archive: { status: "full", path: "content/sources/H5-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "H6",
    clusterId: "H",
    title: "Solana: A New Architecture for a High Performance Blockchain",
    author: "Anatoly Yakovenko",
    year: 2017,
    medium: "Whitepaper",
    category: "Technical Paper",
    thesis:
      "Proof-of-History plus a fast runtime enables a high-throughput, low-latency blockchain.",
    layer0:
      "One of the slowest parts of reaching consensus on a decentralized network is simply agreeing on the order in which transactions happened, since there's no central clock everyone can trust. Yakovenko's insight was to build a verifiable, decentralized clock directly into the protocol — Proof of History — so that nodes could cryptographically prove that a certain amount of time had passed and events happened in a specific order, without needing to constantly communicate back and forth with each other just to agree on timing. This dramatically cuts the communication overhead that normally limits how fast a blockchain can process transactions.",
    layer1:
      "The mechanism works by repeatedly hashing a value into itself millions of times in sequence — a process that is inherently sequential (you can't skip ahead or parallelize it, because each hash depends on the output of the one before it) but that anyone can quickly verify was actually computed in order, once done. This creates a trustworthy, decentralized timestamp: since generating the sequence takes real, unavoidable time, and verifying it is fast, the network gets a shared sense of 'when' something happened without needing nodes to negotiate about timing in real time. Combined with a fast execution runtime, this lets Solana process a very high volume of transactions per second compared to blockchains that must spend more time and communication on ordering consensus alone.",
    layer2:
      "Think of a group project where a lot of time gets wasted just agreeing on the sequence of who did what and when, rather than doing the actual work. What would a 'Proof of History' equivalent look like for that group — some way of cheaply, verifiably proving order and timing without everyone having to constantly check in with each other?",
    quiz: {
      question: "What problem does Solana's Proof of History primarily solve?",
      options: [
        "It encrypts transaction contents so no one can see them",
        "It creates a verifiable, decentralized way to prove the order and timing of events, cutting the communication overhead nodes would otherwise need to agree on ordering",
        "It eliminates the need for any validators on the network",
        "It converts all transactions into a single batched transaction per day",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Solana: A New Architecture for a High Performance Blockchain (original whitepaper)",
        source: "solana.com",
        url: "https://solana.com/solana-whitepaper.pdf",
        archive: { status: "full", path: "content/sources/H6-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Proof of History: what is it good for?",
        source: "Victor Shoup",
        url: "https://www.shoup.net/papers/poh.pdf",
        archive: { status: "full", path: "content/sources/H6-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "H7",
    clusterId: "H",
    title: "Why Decentralization Matters",
    author: "Chris Dixon",
    year: 2018,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Decentralized crypto networks can beat centralized platforms by aligning incentives with users and developers.",
    layer0:
      "Dixon observes a predictable lifecycle for centralized internet platforms: they start out open and generous toward developers, creators, and users in order to attract them and grow — but once a platform dominates its market (the top of what he calls the 'S-curve'), its relationship with those same developers, creators, and users tends to turn adversarial, since the platform now benefits more from extracting value from them than from continuing to court them. Decentralized cryptonetworks, he argues, avoid this by baking incentive alignment into the protocol itself via tokens, so there's no central company that can later flip from generous to extractive.",
    layer1:
      "The mechanism is about who can unilaterally change the rules. A centralized platform is owned and controlled by a company whose incentives can shift over time (often toward extracting more value from the ecosystem once it has captured a dominant position), and there's no recourse for developers or users besides leaving. A cryptonetwork's rules are enforced by open protocol and, often, token-based governance shared among many participants, meaning no single company can unilaterally decide to change the terms once everyone else is locked in — which, in theory, keeps the network's incentives aligned with its whole ecosystem indefinitely rather than just during its early growth phase.",
    layer2:
      "Think of a platform (app, marketplace, social network) you've watched shift from generous-to-users/developers in its early days to more extractive once it became dominant. What decision points along the way could have gone differently if the platform's rules had been locked in by open, shared governance from the start, rather than controlled by one company?",
    quiz: {
      question:
        "According to Chris Dixon, why do centralized platforms tend to become adversarial toward the developers and users who helped them grow?",
      options: [
        "Because governments force platforms to extract more value once they reach a certain size",
        "Because once a platform dominates its market, its incentives shift from courting an ecosystem to extracting value from it, and there's no structural mechanism stopping that shift the way there is with decentralized protocols",
        "Because developers always eventually violate platform terms of service",
        "Because centralized platforms run out of technical capacity as they grow",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Why Decentralization Matters (original essay)",
        source: "Chris Dixon, cdixon.org",
        url: "https://cdixon.org/2018/02/18/why-decentralization-matters",
        archive: { status: "full", path: "content/sources/H7-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "read",
        label: "Why Decentralization Matters (mirror)",
        source: "OneZero / Medium",
        url: "https://onezero.medium.com/why-decentralization-matters-5e3f79f7638e",
        archive: { status: "full", path: "content/sources/H7-1.md", retrieved: "2026-07-14" },
      },
    ],
    tags: [],
  },
  {
    id: "H8",
    clusterId: "H",
    title: "IPO 2.0 / SPAC Investor Letters",
    author: "Chamath Palihapitiya",
    year: 2020,
    medium: "Letter",
    category: "Crypto",
    thesis:
      "SPACs democratize access to high-growth pre-IPO companies and are a superior path to public markets.",
    layer0:
      "A traditional IPO involves a lengthy roadshow, investment-bank underwriters, and pricing that Palihapitiya argued systematically favored large institutional investors at the expense of retail investors and even the company going public. He rebranded a decades-old financial structure — the Special Purpose Acquisition Company, or SPAC, a shell company that raises money first and merges with a private company later — as 'IPO 2.0,' arguing it let retail investors get in earlier and let private companies negotiate a price directly rather than through an underwriter-controlled process.",
    layer1:
      "The mechanism bypasses the traditional IPO roadshow: a SPAC raises capital via its own public listing first, with no operating business yet, then merges with a private target company the sponsor selects. Because the deal is a merger rather than a traditional securities offering, the target company can share forward-looking financial projections that would be legally restricted in a standard IPO prospectus, and the whole process can move faster since it isn't gated by traditional underwriter due diligence and roadshow scheduling. Palihapitiya's public, retail-facing marketing of this structure (naming his vehicles memorably, writing accessible investor letters) is what turned a previously obscure financial structure into a mainstream retail investment vehicle, fueling the 2020-2021 SPAC boom that moved hundreds of billions of dollars.",
    layer2:
      "Think of a slow, gatekept process you've encountered (in finance, hiring, publishing, or elsewhere) where the traditional path favors insiders/institutions over newcomers. What would the 'SPAC equivalent' look like — a faster, more direct alternative path — and what legitimate safeguard from the traditional process might get lost along the way?",
    quiz: {
      question: "What specific advantage did Palihapitiya claim SPACs had over traditional IPOs?",
      options: [
        "SPACs are legally required to have lower fees than IPOs",
        "SPACs let companies share forward-looking financial projections (restricted in traditional IPOs) and bypass the underwriter-controlled roadshow, giving retail investors earlier and more direct access",
        "SPACs guarantee a higher stock price than a traditional IPO",
        "SPACs eliminate the need for any regulatory disclosure at all",
      ],
      correctIndex: 1,
    },
    related: [],
    furtherReading: [
      {
        type: "read",
        label: "Social Capital investor letters (Chamath Palihapitiya)",
        source: "socialcapital.com",
        url: "https://www.socialcapital.com/",
        archive: { status: "full", path: "content/sources/H8-0.md", retrieved: "2026-07-14" },
      },
      {
        type: "watch",
        label: "All-In Podcast (hosted by Chamath Palihapitiya & co-hosts)",
        source: "YouTube",
        url: "https://www.youtube.com/@allin",
        archive: { status: "unavailable" },
      },
    ],
    tags: [],
  },
  {
    id: "I1",
    clusterId: "I",
    title: "The Next Big Thing Will Start Out Looking Like a Toy",
    author: "Chris Dixon",
    year: 2010,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Disruptive innovations are dismissed as toys because they underperform on established metrics while excelling on new ones.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I2",
    clusterId: "I",
    title: "Why Software Is Eating the World",
    author: "Marc Andreessen",
    year: 2011,
    medium: "Essay",
    category: "VC Doctrine",
    thesis:
      "Every company is becoming a software company; software firms will disrupt incumbents across every industry.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I3",
    clusterId: "I",
    title: "Mobile Is Eating the World",
    author: "Benedict Evans",
    year: 2014,
    medium: "Deck",
    category: "Sector Report",
    thesis:
      "Mobile is the largest computing platform ever and is subsuming every other technology and industry.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I4",
    clusterId: "I",
    title: "What Happened to the Future?",
    author: "Founders Fund (Bruce Gibney)",
    year: 2011,
    medium: "Manifesto",
    category: "VC Doctrine",
    thesis:
      "Venture abandoned hard technology for trivial consumer apps; 'we wanted flying cars, instead we got 140 characters.'",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I5",
    clusterId: "I",
    title: "OpenCloud Report",
    author: "Battery Ventures",
    year: 2012,
    medium: "Report",
    category: "Sector Report",
    thesis:
      "Open-source and cloud infrastructure are reshaping enterprise software economics and buying.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I6",
    clusterId: "I",
    title: "Big Ideas",
    author: "ARK Invest (Cathie Wood)",
    year: 2017,
    medium: "Report",
    category: "Sector Report",
    thesis:
      "Disruptive innovation platforms (AI, robotics, genomics, crypto, energy storage) will compound explosively.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I7",
    clusterId: "I",
    title: "Internet Trends Report",
    author: "Mary Meeker",
    year: 1995,
    medium: "Deck",
    category: "Sector Report",
    thesis:
      "An annual data-dense synthesis of global internet adoption, usage, and monetization trends.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I8",
    clusterId: "I",
    title: "Trends – Artificial Intelligence",
    author: "Mary Meeker / BOND",
    year: 2025,
    medium: "Deck",
    category: "Sector Report",
    thesis: "AI adoption and capex are scaling faster than any prior technology wave in history.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I9",
    clusterId: "I",
    title: "The Sovereign Individual",
    author: "James Dale Davidson & Lord William Rees-Mogg",
    year: 1997,
    medium: "Book",
    category: "Worldview",
    thesis:
      "The Information Age will dissolve the nation-state's power and empower mobile, digitally-sovereign individuals.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I10",
    clusterId: "I",
    title: "Zero to One",
    author: "Peter Thiel & Blake Masters",
    year: 2014,
    medium: "Book",
    category: "Worldview",
    thesis:
      "True progress is vertical (0 to 1) via monopoly-creating innovation, not horizontal copying (1 to n).",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I11",
    clusterId: "I",
    title: "Meditations on Moloch",
    author: "Scott Alexander",
    year: 2014,
    medium: "Essay",
    category: "Worldview",
    thesis:
      "Multipolar traps and coordination failures ('Moloch') drive races to the bottom across civilization.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I12",
    clusterId: "I",
    title: "Superintelligence: Paths, Dangers, Strategies",
    author: "Nick Bostrom",
    year: 2014,
    medium: "Book",
    category: "Worldview",
    thesis:
      "A machine superintelligence could rapidly become uncontrollable and poses an existential risk to humanity.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I13",
    clusterId: "I",
    title: "We Need a New Science of Progress",
    author: "Patrick Collison & Tyler Cowen",
    year: 2019,
    medium: "Essay",
    category: "Worldview",
    thesis:
      "We should study the causes of scientific and economic progress as a rigorous discipline to accelerate it.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I14",
    clusterId: "I",
    title: "What We Owe the Future",
    author: "William MacAskill",
    year: 2022,
    medium: "Book",
    category: "Worldview",
    thesis:
      "Future people matter morally; positively influencing the long-term future is a key moral priority (longtermism).",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I15",
    clusterId: "I",
    title: "AGI Ruin: A List of Lethalities",
    author: "Eliezer Yudkowsky",
    year: 2022,
    medium: "Essay",
    category: "Worldview",
    thesis:
      "Aligning superintelligent AI is unsolved and likely fatal by default; current efforts are inadequate.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I16",
    clusterId: "I",
    title: "The Most Important Century",
    author: "Holden Karnofsky",
    year: 2021,
    medium: "Essay Series",
    category: "Worldview",
    thesis:
      "Transformative AI could make this the most pivotal century in human history, warranting outsized attention.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I17",
    clusterId: "I",
    title: "The Scaling Hypothesis",
    author: "Gwern Branwen",
    year: 2020,
    medium: "Essay",
    category: "Worldview",
    thesis:
      "Intelligence may emerge from scaling up compute and data. GPT-3 shows the hypothesis holds.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I18",
    clusterId: "I",
    title: "Situational Awareness: The Decade Ahead",
    author: "Leopold Aschenbrenner",
    year: 2024,
    medium: "Essay",
    category: "AI Essay",
    thesis:
      "AGI by ~2027 and superintelligence shortly after will trigger a trillion-dollar compute buildout and a US-China race.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I19",
    clusterId: "I",
    title: "Machines of Loving Grace",
    author: "Dario Amodei",
    year: 2024,
    medium: "Essay",
    category: "AI Essay",
    thesis:
      "Powerful AI could compress a century of scientific progress into a decade, curing disease and transforming society.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I20",
    clusterId: "I",
    title: "Why AI Will Save the World",
    author: "Marc Andreessen",
    year: 2023,
    medium: "Essay",
    category: "AI Essay",
    thesis:
      "AI will augment human intelligence and improve nearly everything it touches, and fears of civilizational risk are misplaced.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I21",
    clusterId: "I",
    title: "The Techno-Optimist Manifesto",
    author: "Marc Andreessen",
    year: 2023,
    medium: "Manifesto",
    category: "Worldview",
    thesis:
      "Technology and markets are the engines of human flourishing; stagnation and de-growth are the real enemies.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I22",
    clusterId: "I",
    title: "Moore's Law for Everything",
    author: "Sam Altman",
    year: 2021,
    medium: "Essay",
    category: "AI Essay",
    thesis:
      "AI will drive the cost of goods and labor toward zero, requiring a new social contract to distribute the wealth.",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
  {
    id: "I23",
    clusterId: "I",
    title: "Block Goes Intelligence-Native",
    author: "Jack Dorsey",
    year: 2026,
    medium: "Letter",
    category: "Worldview",
    thesis:
      "A much smaller team paired with AI can do more and do it better, so Block cut ~40% of staff to rebuild 'intelligence-native.'",
    quiz: {
      question: "Placeholder question",
      options: ["A", "B", "C"],
      correctIndex: 0,
    },
    related: [],
    furtherReading: [],
    tags: [],
  },
];

export const NODE_BY_ID: Record<string, Node> = NODES.reduce(
  (acc, node) => {
    acc[node.id] = node;
    return acc;
  },
  {} as Record<string, Node>,
);

export const NODES_BY_CLUSTER: Record<string, Node[]> = CLUSTERS.reduce(
  (acc, cluster) => {
    acc[cluster.id] = NODES.filter((n) => n.clusterId === cluster.id);
    return acc;
  },
  {} as Record<string, Node[]>,
);

export const CLUSTER_BY_ID: Record<string, Cluster> = CLUSTERS.reduce(
  (acc, cluster) => {
    acc[cluster.id] = cluster;
    return acc;
  },
  {} as Record<string, Cluster>,
);
