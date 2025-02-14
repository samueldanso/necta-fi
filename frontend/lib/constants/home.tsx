import { Bot, Wallet, LineChart, Shield } from "lucide-react"

// Home page navigation
export const NAVBAR_MENU = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "http://blog.nectafi.xyz" },
  { title: "Docs", href: "http://blog.nectafi.xyz/docs" },
] as const

// Footer navigation
export const FOOTER_MENU = {
  Product: [
    { title: "Launch App", href: "/app" },
    { title: "Blog", href: "http://blog.nectafi.xyz" },
    { title: "Docs", href: "http://blog.nectafi.xyz/docs" },
  ],
  Legal: [
    { title: "Privacy Policy", href: "/legal/privacy" },
    { title: "Terms of Service", href: "/legal/terms" },
  ],
  Socials: [
    { title: "X", href: "https://x.com/NectaFi_AI" },
    { title: "Github", href: "https://github.com/NectaFi" },
  ],
} as const

// Getting Started Steps
export const GETTING_STARTED_STEPS = [
  {
    number: 1,
    title: "Connect Wallet & Deploy Your Smart Account",
    description:
      "Launch the app, connect your wallet, and deploy a secure Smart Account for automated yield optimization.",
  },
  {
    number: 2,
    title: "Deposit Assets & Activate Agents",
    description:
      "Deposit USDC and activate NectaFi's intelligent agents to optimize your yield across DeFi protocols.",
  },
  {
    number: 3,
    title: "Track Profits & Withdraw Anytime",
    description:
      "Monitor real-time performance and withdraw your funds at any time with full self-custody.",
  },
] as const

// Feature Section

export const FEATURES = [
  {
    id: "ai-automation",
    icon: <Bot className="h-10 w-10 text-white" />,
    title: "Multi-Agent Intelligence",
    description:
      "Three specialized AI agents collaborate to automatically optimize yields across multiple protocols, securing the highest APYs effortlessly.",
    badge: "Smart",
  },

  {
    id: "yield-optimization",
    icon: <LineChart className="h-10 w-10 text-white" />,
    title: "Automated Rebalancing",
    description:
      "Necta's AI agents continuously monitor and rebalance your portfolio in real timeto maximize returns—no manual effort needed.",
    badge: "Efficient",
  },
  {
    id: "risk-management",
    icon: <Shield className="h-10 w-10 text-white" />,
    title: "Fully On-Chain & Self-Custodial",
    description:
      " Complete security and control, allowing you to maintain full custody of your assets.",
    badge: "Secure",
  },
  {
    id: "seamless-integration",
    icon: <Wallet className="h-10 w-10 text-white" />,
    title: "Effortless Yield Optimization",
    description:
      "Necta makes earning yield easy, adaptive, and stress-free for both seasoned DeFi users and newcomers.",
    badge: "Easy",
  },
] as const

export const faqs = [
  {
    id: "what-is-necta",
    question: "What is NectaFi?",
    answer:
      "Necta Finance is an AI-powered DeFi yield optimization platform that uses intelligent agents to automatically manage and maximize your crypto portfolio returns. ",
  },
  {
    id: "why-necta",
    question: "Why Necta and what are the benefits of using it?",
    answer:
      "Necta offers automated yield optimization, gas-efficient operations, and intelligent portfolio management. Benefits include maximized returns across multiple protocols, reduced time and effort in DeFi farming, and professional-grade portfolio management powered by AI.",
  },
  {
    id: "how-to-use",
    question: "How do I use Necta?",
    answer:
      "Getting started with Necta is simple: 1) Connect your wallet, 2) Deposit your assets, 3) Choose your risk preference, and 4) Let our AI agents optimize your yields. You can monitor your portfolio and withdraw at any time.",
  },
  {
    id: "risks",
    question: "What are the risks of using the protocol?",
    answer:
      "While we implement robust security measures and risk management protocols, DeFi investments carry inherent risks including smart contract risks, market volatility, and protocol-specific risks. We recommend users to understand these risks and invest accordingly.",
  },
  {
    id: "token",
    question: "Does Necta have a token?",
    answer:
      "Currently, Necta does not have a token. Our focus is on building a reliable and efficient yield optimization protocol. Any future token launches will be announced through our official channels.",
  },
] as const
