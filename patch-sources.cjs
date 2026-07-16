const fs = require('fs');
const path = require('path');

const updates = {
  "C1": { url: "https://content.time.com/time/specials/packages/article/0,28804,2021097_2023262_2023247,00.html", label: "What happened next: chronology of Enron's collapse", source: "TIME" },
  "C2": { url: "https://www.wbur.org/news/2010/02/26/markopolos-revisited", label: "Interview with the Madoff whistleblower: \"No One Would Listen\"", source: "WBUR" },
  "C3": { url: "https://rpc.cfainstitute.org/research/financial-analysts-journal/2009/fooling-some-of-the-people-all-of-the-time", label: "Review of Einhorn's Allied Capital short", source: "CFA Institute (Financial Analysts Journal)" },
  "C4": { url: "https://acquirersmultiple.com/2016/08/the-lehman-brothers-1-1-billion-discrepancy-accounting-ingenuity-david-einhorn/", label: "Breakdown of Einhorn's \"Accounting Ingenuity\" Lehman speech", source: "The Acquirer's Multiple" },
  "C5": { url: "https://blog.syzgroup.com/slow-food-for-thought/michael-burry-beyond-the-big-short", label: "Michael Burry beyond The Big Short", source: "Syz Group" },
  "C6": { url: "https://www.theglobeandmail.com/report-on-business/careers/careers-leadership/carson-block-the-man-who-felled-a-forestry-giant/article587042/", label: "Profile: the man who felled Sino-Forest", source: "The Globe and Mail" },
  "C7": { url: "https://streetfins.com/bill-ackman-versus-herbalife-what-happened/", label: "Ackman vs. Herbalife: what happened", source: "StreetFins" },
  "C8": { url: "https://fortune.com/2015/10/21/valeant-philidor-stock-plummet/", label: "Coverage of Citron's Valeant \"pharmaceutical Enron\" call", source: "Fortune" },
  "C9": { url: "https://fortune.com/2022/05/22/luckin-coffee-china-wall-street-listing-nasdaq-scandal-fraud-starbucks/", label: "After the fraud: Luckin's improbable comeback", source: "Fortune" },
  "C10": { url: "https://www.cnbc.com/2023/12/18/nikola-founder-trevor-milton-sentencing-fraud-charges.html", label: "Outcome: Nikola founder sentenced for fraud", source: "CNBC" },
  "C11": { url: "https://www.cnn.com/2024/02/08/business/india-adani-hindenburg-report-aftermath-intl-hnk/index.html", label: "One year later: Adani rebounds from Hindenburg", source: "CNN Business" },

  "D1": { url: "https://www.forbes.com/sites/greatspeculations/2010/07/01/warren-buffetts-buy-american-report-card/", label: "How Buffett's \"Buy American\" call aged", source: "Forbes" },
  "D2": { url: "https://business.columbia.edu/insights/chazen-global-insights/superinvestors-graham-and-doddsville", label: "Columbia's retrospective on \"Superinvestors\"", source: "Columbia Business School" },
  "D3": { url: "https://fs.blog/the-forgotten-lessons-of-2008/", label: "Related Klarman essay: The Forgotten Lessons of 2008", source: "Farnam Street" },
  "D4": { url: "https://marcellus.in/story/waiting-for-the-last-dance/", label: "Secondary write-up on Grantham's memo", source: "Marcellus" },
  "D5": { url: "https://streetfins.com/howard-marks-memo-breakdown-the-race-to-the-bottom/", label: "Breakdown of Marks' \"The Race to the Bottom\"", source: "StreetFins" },
  "D6": { url: "https://www.oaktreecapital.com/insights/memo/further-thoughts-on-sea-change", label: "Marks' own follow-up: Further Thoughts on Sea Change", source: "Oaktree Capital" },
  "D7": { url: "https://www.cmgwealth.com/ri/on-my-radar-ray-dalios-template-for-understanding-big-debt-crises/", label: "Analysis of Dalio's Big Debt Crises template", source: "CMG Wealth" },
  "D8": { url: "https://www.theinvestorspodcast.com/articles/changing-world-order/", label: "Summary of Dalio's Changing World Order", source: "The Investor's Podcast" },
  "D9": { url: "https://www.cnbc.com/2025/09/19/ray-dalio-says-gold-non-fiat-currencies-will-be-stronger-stores-of-value-as-us-debt-mounts.html", label: "Follow-up on Dalio's dollar/reserve-currency thesis", source: "CNBC" },
  "D10": { url: "https://thedeepdive.ca/commodities-and-the-new-world-order-what-you-need-to-know-from-zoltan-pozsars-bretton-woods-iii/", label: "Explainer on Pozsar's Bretton Woods III", source: "The Deep Dive" },
  "D11": { url: "https://venturebeat.com/business/sequoia-rip-good-times/", label: "Sequoia defends its \"RIP Good Times\" deck", source: "VentureBeat" },
  "D12": { url: "https://fortune.com/2022/05/25/sequoia-capital-slide-dek-warning-to-founders-downturn/", label: "Coverage of Sequoia's \"Adapting to Endure\"", source: "Fortune" },

  "I1": { url: "https://tor.medium.com/advice-for-the-arrogant-fucks-start-with-a-toy-4e918d9dddda", label: "Analysis of Dixon's \"toy\" theory vs. disruption", source: "Tor Grønsund (Medium)" },
  "I2": { url: "https://www.ciodive.com/news/software-industry-marc-andreessen/605301/", label: "10 years on: software really did eat the world", source: "CIO Dive" },
  "I3": { url: "https://www.forbes.com/sites/louiscolumbus/2014/11/09/mobile-is-eating-the-world/", label: "Write-up of Evans' \"Mobile Is Eating the World\"", source: "Forbes" },
  "I4": { url: "https://en.wikipedia.org/wiki/Founders_Fund", label: "Founders Fund & the manifesto (context/reception)", source: "Wikipedia" },
  "I5": { url: "https://www.battery.com/blog/state-of-the-opencloud-2024/", label: "State of the OpenCloud Report", source: "Battery Ventures" },
  "I6": { url: "https://finance.yahoo.com/news/cathie-wood-controversial-figure-behind-110000346.html", label: "Cathie Wood / ARK, the controversy", source: "Yahoo Finance" },
  "I7": { url: "https://en.wikipedia.org/wiki/Mary_Meeker", label: "Mary Meeker and the Internet Trends reports", source: "Wikipedia" },
  "I8": { url: "https://pitchbook.com/news/articles/mary-meeker-report-ai-race-2025", label: "Analysis of Meeker's 2025 AI Trends report", source: "PitchBook" },
  "I9": { url: "https://en.wikipedia.org/wiki/The_Sovereign_Individual", label: "Notes & reception of The Sovereign Individual", source: "Wikipedia" },
  "I10": { url: "https://grahammann.net/book-notes/zero-to-one-peter-thiel", label: "Summary of Thiel's Zero to One", source: "Graham Mann" },
  "I11": { url: "https://www.lesswrong.com/posts/ham9i5wf4JCexXnkN/moloch-hasn-t-won", label: "Response to Meditations on Moloch: \"Moloch Hasn't Won\"", source: "LessWrong (Zvi)" },
  "I12": { url: "https://en.wikipedia.org/wiki/Superintelligence:_Paths,_Dangers,_Strategies", label: "Reception & critique of Superintelligence", source: "Wikipedia" },
  "I13": { url: "https://marginalrevolution.com/marginalrevolution/2024/04/the-progress-in-progress-studies.html", label: "Cowen's follow-up on Progress Studies", source: "Marginal Revolution" },
  "I14": { url: "https://asteriskmag.com/issues/01/review-what-we-owe-the-future", label: "Review of What We Owe the Future", source: "Asterisk Magazine" },
  "I15": { url: "https://www.lesswrong.com/posts/LLRtjkvh9AackwuNB/on-a-list-of-lethalities", label: "Point-by-point response to AGI Ruin", source: "LessWrong" },
  "I16": { url: "https://80000hours.org/podcast/episodes/holden-karnofsky-most-important-century/", label: "Karnofsky interview on the Most Important Century", source: "80,000 Hours" },
  "I17": { url: "https://www.lesswrong.com/posts/XusDPpXr6FYJqWkxh/an-156-the-scaling-hypothesis-a-plan-for-building-agi", label: "Analysis of Gwern's Scaling Hypothesis", source: "LessWrong (Alignment Newsletter)" },
  "I18": { url: "https://www.lesswrong.com/posts/EGGruXRxGQx6RQt8x/situational-awareness-a-one-year-retrospective", label: "Situational Awareness: a one-year retrospective", source: "LessWrong" },
  "I19": { url: "https://www.lcfi.ac.uk/news-events/blog/post/reflections-on-machines-of-loving-grace", label: "Reflections on Machines of Loving Grace", source: "Cambridge LCFI" },
  "I20": { url: "https://www.econtalk.org/marc-andreessen-on-why-ai-will-save-the-world/", label: "Andreessen interviewed on \"Why AI Will Save the World\"", source: "EconTalk" },
  "I21": { url: "https://jacobin.com/2024/01/marc-andreessen-techno-optimist-manifesto-reactionary-elitism-nietzsche-hayek-ideology", label: "Critique of the Techno-Optimist Manifesto", source: "Jacobin" },
  "I22": { url: "https://www.cnbc.com/2021/03/30/openai-ceo-sam-altman-says-ai-could-pay-for-ubi-experts-disagree.html", label: "Altman's UBI thesis and its critics", source: "CNBC" },
  "I23": { url: "https://www.forbes.com/sites/josipamajic/2026/04/01/jack-dorsey-bets-4000-jobs-that-ai-can-replace-the-org-chart/", label: "Analysis of Block going \"intelligence-native\"", source: "Forbes" }
};

let content = fs.readFileSync(path.join(__dirname, 'src/data/nodes.ts'), 'utf8');

// Also update D4 author from Howard Marks to Jeremy Grantham
content = content.replace(/(id: "D4",\s*clusterId: "D",\s*title: "Waiting for the Last Dance",\s*author: )"Howard Marks"/, '$1"Jeremy Grantham"');

for (const [id, data] of Object.entries(updates)) {
  const nodeRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?furtherReading:\\s*\\[\\s*\\{[\\s\\S]*?)label:\\s*"[^"]*",\\s*source:\\s*"[^"]*",\\s*url:\\s*"https://scholar\\.google\\.com/scholar\\?q=[^"]*"`, "g");
  
  if (!nodeRegex.test(content)) {
    console.log(`Could not find scholar link for ${id}`);
    
    // Fallback: just replace the first further reading object's label/source/url if it's there
    const fallbackRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?furtherReading:\\s*\\[\\s*\\{[\\s\\S]*?)label:\\s*"[^"]*",\\s*source:\\s*"[^"]*",\\s*url:\\s*"[^"]*"`, "g");
    if(fallbackRegex.test(content)) {
        content = content.replace(fallbackRegex, `$1label: ${JSON.stringify(data.label)},\n        source: ${JSON.stringify(data.source)},\n        url: ${JSON.stringify(data.url)}`);
        console.log(`Applied fallback for ${id}`);
    } else {
        console.log(`Total failure for ${id}`);
    }
  } else {
      content = content.replace(nodeRegex, `$1label: ${JSON.stringify(data.label)},\n        source: ${JSON.stringify(data.source)},\n        url: ${JSON.stringify(data.url)}`);
      console.log(`Updated ${id}`);
  }
}

fs.writeFileSync(path.join(__dirname, 'src/data/nodes.ts'), content);
console.log('Done updating nodes.ts');
