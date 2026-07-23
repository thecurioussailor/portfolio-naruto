"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { siteStats } from "@/lib/siteStats";

const STATS = [
  { value: String(siteStats.startedBuilding), label: "Building Production Software" },
  { value: String(siteStats.flagshipProjects), label: "Flagship Projects" },
  { value: String(siteStats.totalProjects) + "+", label: "Projects & Experiments" },
];

export function MissionArchive() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 rounded-[18px] border border-ink/10 bg-white/60 px-10 py-12 text-center backdrop-blur-sm"
    >
      <p className="mb-2 font-mono text-[10px] tracking-[0.32em] text-orange uppercase">
        Mission Archive
      </p>
      <h3 className="font-display mb-3 text-[28px] font-bold text-ink">
        Every mission tells part of the story.
      </h3>
      <p className="mx-auto mb-10 max-w-[520px] text-[14px] leading-[1.8] text-[#5a4f3e]">
        Beyond the flagship projects are production systems, client work, hackathons,
        open-source contributions, experiments and developer tools that shaped me as
        an engineer. Explore the complete archive to see the breadth of my work.
      </p>

      {/* Stats */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-8">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-[12px] border border-ink/8 bg-white/50 px-6 py-4 text-center"
          >
            <div className="font-display text-[32px] leading-none text-orange">{s.value}</div>
            <div className="mt-1.5 font-mono text-[9px] tracking-[0.18em] text-[#7a6a55] uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      <motion.div
        whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(239,108,26,.3)" }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block rounded-full"
      >
        <Link
          href="/missions"
          className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-[13px] font-mono text-[12px] font-bold tracking-[0.14em] text-[#f4ecdb] uppercase"
        >
          Explore the Mission Archive
          <span className="text-orange">→</span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
