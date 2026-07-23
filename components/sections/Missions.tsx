"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import { ShadowCloneScene } from "@/components/ui/MissionLog/ShadowCloneScene";

type Mission = {
  title: string;
  tagline: string;
  rank: "S-RANK" | "A-RANK" | "B-RANK";
  rankColor: string;
  rankTextColor: string;
  year: string;
  status: string;
  achievement: string;
  tags: string[];
  image: string;
  objectPosition: string;
  demo?: string;
  github?: string;
};

const RANK_COLORS: Record<Mission["rank"], { bg: string; text: string }> = {
  "S-RANK": { bg: "#ef6c1a", text: "#14101f" },
  "A-RANK": { bg: "#14101f", text: "#f4ecdb" },
  "B-RANK": { bg: "#6fa653", text: "#14101f" },
};

const MISSIONS: Mission[] = [
  {
    title: "Orbit",
    tagline: "AI assistant that triages Gmail, summarizes recruiter emails, and drafts responses.",
    rank: "S-RANK",
    rankColor: RANK_COLORS["S-RANK"].bg,
    rankTextColor: RANK_COLORS["S-RANK"].text,
    year: "2024",
    status: "Completed",
    achievement: "AI-powered email triage with auto-drafted responses.",
    tags: ["Next.js", "TypeScript", "OpenAI", "Gmail API", "Prisma"],
    image: "/pillar-sunset.webp",
    objectPosition: "center 35%",
    demo: "#",
    github: "#",
  },
  {
    title: "Trueman Exchange",
    tagline: "Centralized crypto exchange with custom matching engine, WebSockets and Redis Pub/Sub.",
    rank: "S-RANK",
    rankColor: RANK_COLORS["S-RANK"].bg,
    rankTextColor: RANK_COLORS["S-RANK"].text,
    year: "2024",
    status: "Completed",
    achievement: "Built custom order matching engine from scratch.",
    tags: ["Rust", "Redis", "WebSocket", "Postgres"],
    image: "/naruto-sky.png",
    objectPosition: "center 30%",
    github: "#",
  },
  {
    title: "OneClickOpenClaw",
    tagline: "Deploy Telegram AI agents in under 60 seconds.",
    rank: "A-RANK",
    rankColor: RANK_COLORS["A-RANK"].bg,
    rankTextColor: RANK_COLORS["A-RANK"].text,
    year: "2024",
    status: "Completed",
    achievement: "Zero-config AI agent deployment for Telegram.",
    tags: ["Next.js", "Supabase", "Telegram", "AI"],
    image: "/chibi-sleeping-fox.jpg",
    objectPosition: "center 60%",
    demo: "#",
    github: "#",
  },
  {
    title: "Bonfire Wallet",
    tagline: "MPC-secured Solana wallet with modern UX.",
    rank: "A-RANK",
    rankColor: RANK_COLORS["A-RANK"].bg,
    rankTextColor: RANK_COLORS["A-RANK"].text,
    year: "2024",
    status: "Completed",
    achievement: "MPC key management on Solana mainnet.",
    tags: ["React", "Solana", "TypeScript"],
    image: "/tree-hang.jpg",
    objectPosition: "center 40%",
    github: "#",
  },
  {
    title: "Super Phoenix DAO",
    tagline: "Fantasy sports mobile app built on Solana.",
    rank: "B-RANK",
    rankColor: RANK_COLORS["B-RANK"].bg,
    rankTextColor: RANK_COLORS["B-RANK"].text,
    year: "2023",
    status: "Completed",
    achievement: "On-chain fantasy sports on Solana devnet.",
    tags: ["React Native", "Expo", "Solana", "Supabase"],
    image: "/pillar-sunset.webp",
    objectPosition: "center 50%",
    github: "#",
  },
  {
    title: "SocketTalk",
    tagline: "Real-time chat application with rooms and presence.",
    rank: "B-RANK",
    rankColor: RANK_COLORS["B-RANK"].bg,
    rankTextColor: RANK_COLORS["B-RANK"].text,
    year: "2023",
    status: "Completed",
    achievement: "Sub-100ms message delivery via WebSockets.",
    tags: ["Next.js", "Node.js", "WebSocket"],
    image: "/naruto-sky.png",
    objectPosition: "center 20%",
    demo: "#",
    github: "#",
  },
];

function MissionCard({ m }: { m: Mission }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(239,108,26,0.12)" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-ink/10 bg-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
    >
      {/* Media area */}
      <div className="relative h-[220px] overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src={m.image}
            alt={m.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: m.objectPosition }}
          />
        </motion.div>

        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg,rgba(20,16,31,0) 30%,rgba(20,16,31,.85) 100%)",
          }}
        />

        {/* Rank badge */}
        <span
          className="absolute top-3 left-3 rounded-[3px] px-[10px] py-[5px] font-mono text-[11px] font-bold tracking-[0.14em]"
          style={{ background: m.rankColor, color: m.rankTextColor }}
        >
          {m.rank}
        </span>

        {/* Year + status */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="rounded-[3px] border border-white/20 bg-black/30 px-[8px] py-[4px] font-mono text-[10px] tracking-[0.1em] text-white/80 backdrop-blur-sm">
            {m.year}
          </span>
          <span className="flex items-center gap-1 rounded-[3px] bg-black/30 px-[8px] py-[4px] font-mono text-[10px] text-green backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            {m.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="font-display mb-1 text-[21px] leading-tight text-ink">{m.title}</div>
        <p className="mb-3 text-sm leading-[1.65] text-[#5a4f3e]">{m.tagline}</p>

        {/* Achievement */}
        <div className="mb-4 flex items-start gap-2">
          <span className="mt-[3px] text-orange text-[11px]">▸</span>
          <span className="text-[12px] leading-[1.6] text-[#7a6a55]">{m.achievement}</span>
        </div>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {m.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ink/12 bg-ink/[0.04] px-[9px] py-[3px] text-[10px] tracking-[0.08em] text-[#5a4f3e]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mt-auto flex flex-wrap items-center gap-2">
          {m.demo && (
            <motion.a
              href={m.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-orange px-4 py-[7px] font-mono text-[11px] font-bold tracking-[0.1em] text-ink uppercase"
            >
              ▶ Live Demo
            </motion.a>
          )}
          {m.github && (
            <motion.a
              href={m.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1, borderColor: "rgba(20,16,31,0.5)" }}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-[7px] font-mono text-[11px] tracking-[0.1em] text-[#5a4f3e] uppercase"
            >
              GitHub ↗
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Missions() {
  const cardsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="missions"
      className="relative px-[7vw] pt-[140px] pb-[160px]"
      style={{
        background:
          "radial-gradient(120% 80% at 20% 0%,#f0e8d5 0%,#f4ecdb 55%,#efe6d0 100%)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 z-[4] h-[340px] w-[260px]"
        initial={{ x: -140, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Image
          src="/child-peek.png"
          alt=""
          fill
          sizes="260px"
          className="object-contain object-left-bottom"
        />
      </motion.div>

      <div className="mb-[60px] text-center">
        <div className="mb-[14px] font-mono text-xs tracking-[0.36em] text-orange uppercase">
          Stage 03 · 任務
        </div>
        {/* ShadowCloneScene owns the "Mission Log" h2 heading */}
        <ShadowCloneScene cardsRef={cardsRef} />
        <p className="mt-[14px] text-[15px] text-[#7a6a55]">
          Six missions. Production systems. Real problems solved.
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 gap-[26px] md:grid-cols-2">
        {MISSIONS.map((m, i) => (
          <Reveal key={m.title} delay={(i % 2) * 80}>
            <MissionCard m={m} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
