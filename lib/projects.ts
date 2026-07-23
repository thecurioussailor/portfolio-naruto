export type Rank = "S-RANK" | "A-RANK" | "B-RANK";
export type Category = "flagship" | "production" | "experiment" | "hackathon" | "opensource";

export interface Project {
  id: string;
  title: string;
  description: string;
  rank: Rank;
  year: string;
  status: string;
  role: string;
  objectives: string[];
  tech: string[];
  coverImage: string;
  coverVideo?: string;
  objectPosition?: string;
  liveUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
  // Archive metadata
  category: Category;
  featured: boolean;
  order: number;
}

export const RANK_META: Record<Rank, { bg: string; text: string }> = {
  "S-RANK": { bg: "#ef6c1a", text: "#14101f" },
  "A-RANK": { bg: "#14101f", text: "#f4ecdb" },
  "B-RANK": { bg: "#6fa653", text: "#14101f" },
};

export const CATEGORY_META: Record<Category, { label: string; description: string }> = {
  flagship:   { label: "Flagship",    description: "Production systems built from the ground up." },
  production: { label: "Production",  description: "Shipped products and client-facing systems." },
  experiment: { label: "Experiments", description: "Ideas explored, lessons learned." },
  hackathon:  { label: "Hackathons",  description: "Built under pressure. Shipped fast." },
  opensource: { label: "Open Source", description: "Tools and libraries contributed to the community." },
};

export const PROJECTS: Project[] = [
  // ── FLAGSHIP (featured on homepage) ─────────────────────────
  {
    id: "orbit",
    title: "Orbit",
    description:
      "AI assistant that organizes recruiter emails, drafts contextual replies, and helps manage the job search workflow.",
    rank: "S-RANK",
    year: "2026",
    status: "Active",
    role: "AI Engineer · Product Builder",
    objectives: [
      "Automated recruiter email triage",
      "Generated context-aware AI replies",
      "Integrated Gmail with OpenAI workflows",
      "Built scalable background sync engine",
    ],
    tech: ["Next.js", "TypeScript", "OpenAI", "Gmail API", "Prisma"],
    coverImage: "/pillar-sunset.webp",
    objectPosition: "center 35%",
    liveUrl: "#",
    githubUrl: "#",
    category: "flagship",
    featured: true,
    order: 1,
  },
  {
    id: "trueman-exchange",
    title: "Trueman Exchange",
    description:
      "High-performance centralized crypto exchange with a custom Rust matching engine and real-time order book.",
    rank: "S-RANK",
    year: "2025",
    status: "Completed",
    role: "Full Stack Engineer",
    objectives: [
      "Built custom order matching engine",
      "Delivered real-time market data streams",
      "Designed Redis event architecture",
      "Handled trade execution and persistence",
    ],
    tech: ["Rust", "Redis", "WebSocket", "Postgres", "Next.js"],
    coverImage: "/naruto-sky.png",
    objectPosition: "center 30%",
    githubUrl: "#",
    category: "flagship",
    featured: true,
    order: 2,
  },
  {
    id: "bonfire-wallet",
    title: "Bonfire Wallet",
    description:
      "MPC-powered Solana wallet focused on secure key management and a seamless non-custodial user experience.",
    rank: "A-RANK",
    year: "2025",
    status: "Completed",
    role: "Full Stack Engineer · Web3",
    objectives: [
      "Implemented MPC signing workflows",
      "Integrated Solana transaction pipeline",
      "Built secure wallet recovery flows",
      "Designed mobile-first wallet experience",
    ],
    tech: ["React", "Solana", "TypeScript", "MPC"],
    coverImage: "/tree-hang.jpg",
    objectPosition: "center 40%",
    githubUrl: "#",
    category: "flagship",
    featured: true,
    order: 3,
  },
  {
    id: "oneclickopenclaw",
    title: "OneClickOpenClaw",
    description:
      "Platform for deploying production-ready Telegram AI agents in under one minute without infrastructure setup.",
    rank: "A-RANK",
    year: "2025",
    status: "Live",
    role: "Founder · Full Stack Engineer",
    objectives: [
      "One-click AI agent deployment",
      "Integrated Telegram Bot platform",
      "Managed persistent cloud state",
      "Built production SaaS infrastructure",
    ],
    tech: ["Next.js", "Supabase", "Telegram API", "TypeScript"],
    coverImage: "/chibi-sleeping-fox.jpg",
    objectPosition: "center 60%",
    liveUrl: "#",
    githubUrl: "#",
    category: "flagship",
    featured: true,
    order: 4,
  },

  // ── PRODUCTION ───────────────────────────────────────────────
  {
    id: "sockettalk",
    title: "SocketTalk",
    description: "Real-time chat with persistent rooms, presence indicators and sub-100ms delivery.",
    rank: "A-RANK",
    year: "2023",
    status: "Completed",
    role: "Full Stack Engineer",
    objectives: [
      "WebSocket room & channel system",
      "Presence tracking & typing indicators",
      "Message persistence with Postgres",
      "Sub-100ms delivery under load",
    ],
    tech: ["Next.js", "Node.js", "WebSocket", "Postgres"],
    coverImage: "/naruto-sky.png",
    objectPosition: "center 20%",
    liveUrl: "#",
    githubUrl: "#",
    category: "production",
    featured: false,
    order: 5,
  },
  {
    id: "super-phoenix-dao",
    title: "Super Phoenix DAO",
    description: "On-chain fantasy sports platform built on Solana with real-time scoring.",
    rank: "A-RANK",
    year: "2023",
    status: "Completed",
    role: "Full Stack Engineer",
    objectives: [
      "On-chain fantasy team management",
      "Solana program for scoring logic",
      "Real-time match data ingestion",
      "Mobile-first React Native app",
    ],
    tech: ["React Native", "Expo", "Solana", "Supabase"],
    coverImage: "/pillar-sunset.webp",
    objectPosition: "center 50%",
    githubUrl: "#",
    category: "production",
    featured: false,
    order: 6,
  },

  // ── EXPERIMENTS ──────────────────────────────────────────────
  {
    id: "telegram-crm",
    title: "Telegram CRM",
    description: "Lightweight CRM built entirely inside Telegram using bot commands and webhooks.",
    rank: "B-RANK",
    year: "2024",
    status: "Experiment",
    role: "Backend Engineer",
    objectives: [
      "Bot-driven CRM workflows",
      "Webhook event processing",
      "Lightweight Postgres data layer",
      "Zero-UI operation via commands",
    ],
    tech: ["Node.js", "Telegram API", "Postgres"],
    coverImage: "/chibi-sleeping-fox.jpg",
    objectPosition: "center 50%",
    githubUrl: "#",
    category: "experiment",
    featured: false,
    order: 7,
  },
  {
    id: "tiplink-clone",
    title: "TipLink Clone",
    description: "Solana payment link generator — send SOL to anyone via a shareable URL.",
    rank: "B-RANK",
    year: "2023",
    status: "Experiment",
    role: "Full Stack Engineer",
    objectives: [
      "Keypair-based payment links",
      "Solana devnet integration",
      "Gasless claim UX",
      "React frontend with wallet adapter",
    ],
    tech: ["React", "Solana", "TypeScript"],
    coverImage: "/tree-hang.jpg",
    objectPosition: "center 60%",
    githubUrl: "#",
    category: "experiment",
    featured: false,
    order: 8,
  },
];

// ── Derived helpers (used by homepage and archive page) ────────

export function getFeaturedProjects(): Project[] {
  return PROJECTS
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}

export function getProjectsByCategory(): Map<Category, Project[]> {
  const map = new Map<Category, Project[]>();
  const order: Category[] = ["flagship", "production", "experiment", "hackathon", "opensource"];
  for (const cat of order) {
    const group = PROJECTS.filter((p) => p.category === cat).sort((a, b) => a.order - b.order);
    if (group.length > 0) map.set(cat, group);
  }
  return map;
}
