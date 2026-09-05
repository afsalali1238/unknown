import type { Node } from "../nodes.ts";
export const CLUSTER_E: Node[] = [
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
        "Because options are always priced at a fixed government-set rate — this view emphasizes the same outcome but attributes it to a different un",
        "Because the formula only applies to options that are guaranteed to expire worthless — this view emphasizes the same outcome but attributes i",
        "Because it prices the option via a riskless hedge whose return must equal the risk-free rate regardless of investor preferences — only volatility, not expected return, matters",
        "Because Black and Scholes assumed all investors are risk-neutral by law — this view emphasizes the same outcome but attributes it to a diffe",
      ],
      correctIndex: 2,
      explanation:
        "The Black-Scholes model eliminated the need to guess market direction or investor risk tolerance by demonstrating that an option can be perfectly priced using a riskless hedging strategy based on the underlying asset's volatility.",
    },
    related: ["C1", "C2", "C3"],
    furtherReading: [
      {
        type: "read",
        label: "The Pricing of Options and Corporate Liabilities (original paper)",
        source: "Journal of Political Economy, 1973",
        url: "https://www.journals.uchicago.edu/doi/10.1086/260062",
        archive: {
          status: "unavailable",
        },
      },
      {
        type: "watch",
        label: "In Our Time: The Black-Scholes Formula",
        source: "BBC Radio 4",
        url: "https://www.bbc.co.uk/programmes/b00y2zy9",
        archive: {
          status: "full",
          path: "content/sources/E1-1.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    tags: ["Markets & Narrative"],
    epistemicStatus: "Canonical",
  },
  {
    id: "E2",
    clusterId: "E",
    title: "Twenty Finance Terms Everyone Confuses",
    author: "Wealth (thecapitalistt0)",
    year: 2026,
    medium: "X (Twitter) thread",
    category: "Finance Literacy",
    thesis:
      "A working financial vocabulary — knowing the precise difference between terms like liquidity and solvency, or nominal and real returns — prevents the specific category of investing mistakes that come from conflating two related but distinct concepts.",
    layer0:
      "Two companies can both be 'losing money' in completely different ways — one is illiquid, the other is insolvent — and confusing the two leads to exactly the wrong read on how serious the problem is.",
    layer1:
      "This node functions as a glossary anchor rather than a single deep idea: it compiles commonly-confused finance pairs (liquidity vs. solvency, nominal vs. real returns, gross vs. net margin, market cap vs. enterprise value) that are individually well-defined in finance theory, packaged as a fast reference rather than original analysis.",
    layer2:
      "Vocabulary gaps in finance rarely announce themselves — you don't feel confused, you just quietly draw the wrong conclusion from a headline or a balance sheet. Which of these twenty terms would you have to pause and think about before defining precisely?",
    quiz: {
      question:
        "What is the practical danger of confusing closely related finance terms, such as liquidity and solvency?",
      options: [
        "There is no real danger; the terms are interchangeable in practice. — this view emphasizes t",
        "It only matters for accountants, not investors. — this view emphasizes the same outcome but ",
        "It affects tax filings but nothing else. — this view emphasizes the same outcome but attribu",
        "Conflating two distinct concepts can lead to badly misjudging how serious a company's financial problem actually is.",
      ],
      correctIndex: 3,
      explanation:
        "Liquidity (short-term cash access) and solvency (whether liabilities exceed assets) point to very different severities of financial trouble — treating them as synonyms leads to misdiagnosing which problem a company actually has.",
    },
    related: ["E1", "E4", "E5"],
    furtherReading: [
      {
        label: "20 confusing finance terms",
        source: "X (Twitter) thread",
        url: "https://x.com/thecapitalistt0/status/2028717928632430997",
        type: "article",
        archive: {
          status: "full",
          path: "content/sources/E2-0.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    tags: ["Markets & Narrative", "Decision-Making"],
    epistemicStatus: "Contemporary",
  },
  {
    id: "E3",
    clusterId: "E",
    title: "EBITDA, Decomposed",
    author: "Abir Haddoud",
    year: 2026,
    medium: "Infographic",
    category: "Financial Analysis",
    thesis:
      "EBITDA strips out financing structure, tax jurisdiction, and accounting depreciation choices to expose a company's core operating performance — which makes it useful for comparing companies fairly, but only if you separately track the real cash flow and capital expense risks it deliberately ignores.",
    layer0:
      "Two companies with identical operations can report wildly different net income just because one carries more debt or depreciates its equipment differently. EBITDA is the attempt to see past that noise.",
    layer1:
      "Built as Net Income + Interest + Taxes + Depreciation + Amortization (or equivalently, Revenue minus operating expenses excluding D&A), EBITDA compares companies fairly across different capital structures, removes financing and tax-jurisdiction differences, and simplifies performance tracking over time. But it also has real blind spots: it isn't actual cash flow, it ignores working capital changes, it excludes capital expenditures entirely, and it can flatter companies with heavy ongoing capex needs (industries differ sharply — software runs 20-30% EBITDA margins, manufacturing runs 10-15%) by making them look more efficient than their true cash generation supports.",
    layer2:
      "The practical discipline is using EBITDA as one lens among several rather than the whole picture — checking cash flow alongside it, knowing your industry's typical margin band, and normalizing for one-time events and owner-specific expenses before comparing across companies. Where have you seen EBITDA used to make a capital-intensive business look healthier than its actual cash position?",
    quiz: {
      question: "What is the primary blind spot of EBITDA as a performance metric?",
      options: [
        "It excludes revenue entirely from the calculation. — this view emphasizes the same outcome but attributes it to a different underlyin",
        "It is not actual cash flow and excludes capital expenditures, which can make capital-intensive businesses look more efficient than their true cash generation supports.",
        "It cannot be calculated for private companies. — this view emphasizes the same outcome but attributes it to a different underlying me",
        "It only applies to companies with no debt. — this view emphasizes the same outcome but attributes it to a different underlying mechan",
      ],
      correctIndex: 1,
      explanation:
        "EBITDA deliberately strips out financing, tax, and depreciation effects to enable comparison, but that same stripping means it ignores real cash outflows like capital expenditure and working capital changes.",
    },
    related: ["E5", "E2", "E4"],
    furtherReading: [
      {
        label: "EBITDA Explained",
        source: "X (Twitter) infographic",
        url: "https://x.com/PhilosophyMonk/status/1909159024559370300",
        type: "article",
        archive: {
          status: "full",
          path: "content/sources/E3-0.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    tags: ["Markets & Narrative", "Decision-Making"],
    epistemicStatus: "Contemporary",
  },
  {
    id: "E4",
    clusterId: "E",
    title: "Revenue, Profit, and Cash Are Not the Same Number",
    author: "Nathan Liao, CMA",
    year: 2026,
    medium: "Infographic",
    category: "Financial Literacy",
    thesis:
      "Revenue, profit, and cash measure three different things at three different points in a transaction's lifecycle, and conflating them is the single most common misconception in reading a business's financial health.",
    layer0:
      "A $500 bag sale can simultaneously mean $500 in revenue, $50 in profit, and a $40 increase in cash — three true numbers from one transaction, each answering a different question.",
    layer1:
      "Revenue is the top line: everything earned before any cost is deducted. Profit is what's left after expenses — gross profit after cost of goods sold, net profit after every operating expense, tax, and interest on top of that. Cash is the actual liquid money on hand, which tracks separately because of timing: delayed payments, prepayments, and financing activity mean cash movement often doesn't match profit in the same period.",
    layer2:
      "The summary line worth internalizing: revenue is your top line, profit indicates operational efficiency, and cash is the liability that actually sustains the company day to day — a profitable business can still die from a cash crunch. Which of the three would you check first if you were deciding whether to trust a company's numbers?",
    quiz: {
      question: "Why can a company be profitable on paper but still fail from a cash problem?",
      options: [
        "Because profit and cash are always identical figures. — this view emphasizes the same outcome but attributes it to a different underlying m",
        "Because profit is an accounting measure while cash tracks actual liquid money on hand, and timing gaps (delayed payments, prepayments) mean the two can diverge significantly.",
        "Because revenue always equals cash by definition. — this view emphasizes the same outcome but attributes it to a different underlying mecha",
        "Because cash flow is irrelevant to business survival. — this view emphasizes the same outcome but attributes it to a different underlying m",
      ],
      correctIndex: 1,
      explanation:
        "Profit reflects accounting performance over a period; cash reflects actual liquidity at a moment in time. A company can report a profit while still running out of cash if receivables are delayed or obligations come due faster than collections.",
    },
    related: ["E1", "E3", "E5"],
    furtherReading: [
      {
        label: "Cash Flow vs. Profit: What's the Difference?",
        source: "Harvard Business School Online",
        url: "https://online.hbs.edu/blog/post/cash-flow-vs-profit",
        type: "article",
        archive: {
          status: "full",
          path: "content/sources/E4-0.md",
          retrieved: "2026-07-17",
        },
      },
    ],
    tags: ["Markets & Narrative", "Decision-Making"],
    epistemicStatus: "Speculative",
  },
  {
    id: "E5",
    clusterId: "E",
    title: "How to Select a Valuation Method",
    author: "BojanFin.com",
    year: 2026,
    medium: "Infographic",
    category: "Valuation",
    thesis:
      "The correct valuation method depends jointly on a company's lifecycle stage and the purpose of the valuation — the same startup might be valued by the Berkscore method when raising funds and by a DCF when being acquired, because different purposes demand different assumptions.",
    layer0:
      "There's no single 'correct' way to value a company. The right method changes depending on why you're valuing it and how mature the business is.",
    layer1:
      "The framework crosses two axes: company lifecycle (startup through decline) against valuation purpose (selling, buying, funding, taxation, restructuring). A startup being funded typically uses the Berkus method (qualitative risk-factor scoring, since there's no revenue history to model). A mature, stable company being sold might use EV/EBITDA multiples. A company in decline being liquidated defaults to net book value or price-to-book, since going-concern methods like DCF stop making sense once the business isn't expected to keep operating.",
    layer2:
      "The practical error this framework corrects is applying a single favorite method (DCF is the common offender) to every situation regardless of fit — a DCF on a pre-revenue startup is mostly assumption-stacking dressed up as precision. Which valuation method have you seen misapplied to a situation it wasn't built for?",
    quiz: {
      question:
        "Why would a pre-revenue startup typically be valued using the Berkus method rather than a DCF?",
      options: [
        "Because DCF is illegal to use on startups. — this view emphasizes the same outcome but attributes it to a different underlying mechanism that the source",
        "Because the Berkus method always produces a higher valuation. — this view emphasizes the same outcome but attributes it to a different underlying mechan",
        "Because DCF requires projecting future cash flows, which is mostly unfounded assumption-stacking without a revenue history to anchor it, while Berkus scores qualitative risk factors instead.",
        "Because startups don't have any assets to value. — this view emphasizes the same outcome but attributes it to a different underlying mechanism that the ",
      ],
      correctIndex: 2,
      explanation:
        "DCF's reliability depends on having a reasonable basis for projecting future cash flows — something a pre-revenue company lacks, which is why lifecycle-appropriate methods like Berkus substitute qualitative risk scoring instead.",
    },
    related: ["E1", "E3", "E4"],
    furtherReading: [
      {
        label: "How to Select Valuation Method",
        source: "BojanFin.com (Financial Modeling and FP&A Program)",
        url: "https://bojanfin.com",
        type: "article",
        archive: {
          status: "full",
          path: "content/sources/E5-0.md",
          retrieved: "2026-07-20",
        },
      },
    ],
    tags: ["Markets & Narrative", "Decision-Making"],
    epistemicStatus: "Contemporary",
  },
];
