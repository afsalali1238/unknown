import type { Node } from "../nodes.ts";
export const CLUSTER_F: Node[] = [
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
        "He defined information based on how emotionally important a message was to the receiver — this view emphasizes the same ",
        "He argued information could only be transmitted without any noise at all — this view emphasizes the same outcome but att",
        "He proved that analog signals are always more reliable than digital ones — this view emphasizes the same outcome but att",
        "He measured information purely by how surprising/unpredictable it was (its entropy), deliberately ignoring the actual meaning or content of the message",
      ],
      correctIndex: 3,
      explanation:
        "Shannon revolutionized information theory by divorcing the 'meaning' of a message from the physical problem of transmitting it, quantifying information strictly as the reduction of uncertainty.",
    },
    related: ["K3", "F3", "F4", "F5"],
    furtherReading: [
      {
        type: "read",
        label: "A Mathematical Theory of Communication (original paper)",
        source: "Bell System Technical Journal, 1948",
        url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf",
        archive: {
          status: "full",
          path: "content/sources/F1-0.md",
          retrieved: "2026-07-14",
        },
      },
      {
        type: "read",
        label: "A Mathematical Theory of Communication",
        source: "Wikipedia",
        url: "https://en.wikipedia.org/wiki/A_Mathematical_Theory_of_Communication",
        archive: {
          status: "full",
          path: "content/sources/F1-1.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    tags: ["Moats & Network Effects", "Tech Adoption & Disruption"],
    epistemicStatus: "Canonical",
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
        "A central index would have required someone's permission or registration for every link, creating a bottleneck; without one, the system could scale without a single point of failure, at the cost of links sometimes breaking",
        "CERN's computers weren't powerful enough to maintain a central index — this view emphasizes the same outcome but attributes it to a different underlying mechanism that the sourc",
        "Central indexes were against CERN's official research policy — this view emphasizes the same outcome but attributes it to a different underlying mechanism that the source materi",
        "It was a temporary limitation later fixed by search engines — this view emphasizes the same outcome but attributes it to a different underlying mechanism that the source materia",
      ],
      correctIndex: 0,
      explanation:
        "By removing the requirement for a central registry and allowing broken links, Berners-Lee ensured the World Wide Web could scale infinitely without a centralized bottleneck.",
    },
    related: ["K3", "F3", "F4", "F5"],
    furtherReading: [
      {
        type: "read",
        label: "Information Management: A Proposal (original document)",
        source: "W3.org / CERN, 1989",
        url: "https://www.w3.org/History/1989/proposal.html",
        archive: {
          status: "full",
          path: "content/sources/F2-0.md",
          retrieved: "2026-07-14",
        },
      },
      {
        type: "read",
        label: "30 years of the web: a short history of the invention that changed the world",
        source: "British Council",
        url: "https://www.britishcouncil.org/anyone-anywhere/history-web",
        archive: {
          status: "full",
          path: "content/sources/F2-1.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    tags: ["Moats & Network Effects", "Tech Adoption & Disruption"],
    epistemicStatus: "Canonical",
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
        "Because it requires payment to Google to be indexed at all — this view emphasizes the same outcome but attributes it to a different underlying mec",
        "Because a page's rank depends on being linked to by other already-trusted pages, not just on what words appear on the page itself — which is much harder to fake than stuffing keywords",
        "Because PageRank only considers pages written in English — this view emphasizes the same outcome but attributes it to a different underlying mecha",
        "Because it ranks pages randomly to prevent gaming the system — this view emphasizes the same outcome but attributes it to a different underlying m",
      ],
      correctIndex: 1,
      explanation:
        "PageRank solved the problem of web spam by using the web's link structure as a massive voting system; a link from a highly trusted page passed more weight than a link from a trivial one.",
    },
    related: ["K3", "F2", "F4", "F5"],
    furtherReading: [
      {
        type: "read",
        label: "The Anatomy of a Large-Scale Hypertextual Web Search Engine (original paper)",
        source: "Stanford InfoLab, 1998",
        url: "http://infolab.stanford.edu/pub/papers/google.pdf",
        archive: {
          status: "full",
          path: "content/sources/F3-0.md",
          retrieved: "2026-07-14",
        },
      },
      {
        type: "read",
        label: "The Anatomy of a Large-Scale Hypertextual Web Search Engine (mirror)",
        source: "Stanford SNAP",
        url: "https://snap.stanford.edu/class/cs224w-readings/Brin98Anatomy.pdf",
        archive: {
          status: "full",
          path: "content/sources/F3-1.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    tags: ["Moats & Network Effects", "Tech Adoption & Disruption"],
    epistemicStatus: "Canonical",
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
        "It acquired Netscape outright to eliminate the competitor — this view emphasizes the same outcome but attrib",
        "It exited the software business entirely to focus on internet infrastructure — this view emphasizes the same",
        "It bundled a free web browser (Internet Explorer) into Windows, using its OS monopoly to undercut Netscape's paid browser business model",
        "It lobbied Congress to ban competing browsers — this view emphasizes the same outcome but attributes it to a",
      ],
      correctIndex: 2,
      explanation:
        "Recognizing that the internet would commoditize the operating system, Microsoft rapidly pivoted to integrate Internet Explorer directly into Windows to neutralize Netscape and protect its core monopoly.",
    },
    related: ["F1", "F2", "F3"],
    furtherReading: [
      {
        type: "read",
        label: "The Internet Tidal Wave (original memo)",
        source: "BBC-hosted archive",
        url: "http://news.bbc.co.uk/2/shared/bsp/hi/pdfs/18_06_08_internet%20tidal%20wave.pdf",
        archive: {
          status: "full",
          path: "content/sources/F4-0.md",
          retrieved: "2026-07-14",
        },
      },
      {
        type: "read",
        label: "Did Tesla Remove Elon Musk's Master Plan From Its Website?",
        source: "Entrepreneur (context on tech memos aging)",
        url: "https://www.entrepreneur.com/business-news/did-tesla-remove-elon-musks-master-plan-from-its-website/479092",
        archive: {
          status: "full",
          path: "content/sources/F4-1.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    tags: ["Moats & Network Effects", "Tech Adoption & Disruption"],
    epistemicStatus: "Canonical",
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
        "Because governments actively regulate these markets to favor one company — this view emphasizes the same outcome but attributes it to a different underlying mechanism that the source mater",
        "Because consumers are legally required to use the first product that enters a market — this view emphasizes the same outcome but attributes it to a different underlying mechanism that the ",
        "Because technology products always have higher switching costs than physical goods by definition — this view emphasizes the same outcome but attributes it to a different underlying mechani",
        "Because high upfront costs combined with near-zero reproduction costs, network effects, and switching costs create a feedback loop where an early lead compounds into a further lead, unlike traditional industries with diminishing returns",
      ],
      correctIndex: 3,
      explanation:
        "Traditional industries face diminishing returns, but software and networks experience increasing returns: the larger they get, the cheaper they are to run and the harder they are for competitors to displace.",
    },
    related: ["AF2", "F2", "F3"],
    furtherReading: [
      {
        type: "read",
        label: "Increasing Returns and the New World of Business (original essay)",
        source: "Harvard Business Review, 1996",
        url: "https://sites.santafe.edu/~wbarthur/Papers/HBR.pdf",
        archive: {
          status: "full",
          path: "content/sources/F5-0.md",
          retrieved: "2026-07-14",
        },
      },
      {
        type: "read",
        label: "W. Brian Arthur's work on complexity and increasing returns",
        source: "Santa Fe Institute",
        url: "https://www.santafe.edu/people/profile/w-brian-arthur",
        archive: {
          status: "full",
          path: "content/sources/F5-1.md",
          retrieved: "2026-07-14",
        },
      },
    ],
    tags: ["Moats & Network Effects", "Tech Adoption & Disruption"],
    epistemicStatus: "Canonical",
  },
];
