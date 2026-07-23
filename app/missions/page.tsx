"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CATEGORY_META, getProjectsByCategory } from "@/lib/projects";
import { siteStats } from "@/lib/siteStats";
import { ArchiveCard } from "@/components/projects/ArchiveCard";

const HERO_STATS = [
  { value: String(siteStats.startedBuilding),       label: "Building Production Software" },
  { value: String(siteStats.flagshipProjects),       label: "Flagship Projects" },
  { value: String(siteStats.totalProjects) + "+",   label: "Projects & Experiments" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MissionsPage() {
  const grouped = getProjectsByCategory();

  return (
    <div className="min-h-screen bg-[#f4ecdb]">
      {/* Sticky breadcrumb */}
      <div className="sticky top-0 z-40 border-b border-ink/10 bg-[#f4ecdb]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-3">
          <Link
            href="/"
            className="font-mono text-[10px] tracking-[0.14em] text-[#7a6a55] uppercase transition-colors hover:text-orange"
          >
            ← Portfolio
          </Link>
          <span className="font-mono text-[10px] text-ink/20">/</span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-ink uppercase">
            Mission Archive
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-4 font-mono text-[10px] tracking-[0.32em] text-orange uppercase"
        >
          Mission Archive
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
          className="font-display mb-5 text-[42px] leading-[1.12] text-ink md:text-[56px]"
        >
          Every mission<br />tells a story.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
          className="mb-14 max-w-[520px] text-[15px] leading-[1.8] text-[#5a4f3e]"
        >
          Beyond the flagship projects are production systems, client work, hackathons,
          open-source contributions, experiments and developer tools that shaped me as
          an engineer. Explore the complete archive to see the breadth of my work.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
          className="flex flex-wrap gap-4"
        >
          {HERO_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-ink/10 bg-white/55 px-6 py-4 text-center backdrop-blur-sm"
            >
              <div className="font-display text-[32px] leading-none text-orange">{s.value}</div>
              <div className="mt-1.5 font-mono text-[9px] tracking-[0.18em] text-[#7a6a55] uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-ink/10" />
      </div>

      {/* Category groups */}
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-20">
        {Array.from(grouped.entries()).map(([category, projects], groupIdx) => {
          const meta = CATEGORY_META[category];
          return (
            <div key={category}>
              {/* Group header */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, ease: EASE, delay: groupIdx * 0.04 }}
                className="mb-8 flex items-end gap-10"
              >
                <div>
                  <p className="mb-1 font-mono text-[9px] tracking-[0.28em] text-orange uppercase">
                    {String(projects.length).padStart(2, "0")} missions
                  </p>
                  <h2 className="font-display text-[28px] leading-tight text-ink">
                    {meta.label}
                  </h2>
                  <p className="mt-1 text-[13px] text-[#7a6a55]">{meta.description}</p>
                </div>
                <div className="hidden md:block h-px flex-1 bg-ink/10 mb-2" />
              </motion.div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <ArchiveCard key={project.id} project={project} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* GitHub CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="rounded-[18px] border border-ink/10 bg-white/60 px-10 py-12 text-center backdrop-blur-sm"
        >
          <p className="mb-2 font-mono text-[10px] tracking-[0.32em] text-orange uppercase">
            Open Source &amp; Experiments
          </p>
          <h3 className="font-display mb-3 text-[28px] font-bold text-ink">
            Want to see everything?
          </h3>
          <p className="mx-auto mb-8 max-w-[480px] text-[14px] leading-[1.8] text-[#5a4f3e]">
            The Mission Archive contains my curated work. My GitHub contains additional
            prototypes, experiments, learning projects, hackathons and open-source
            contributions accumulated throughout my engineering journey.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href="https://github.com/thecurioussailor"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(239,108,26,.3)" }}
              transition={{ duration: 0.25, ease: EASE }}
              className="inline-flex items-center gap-3 rounded-full bg-ink px-8 py-[13px] font-mono text-[12px] font-bold tracking-[0.14em] text-[#f4ecdb] uppercase"
            >
              Visit GitHub
              <span className="text-orange">→</span>
            </motion.a>

            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-[#7a6a55] uppercase transition-colors hover:text-orange"
            >
              ← Back to portfolio
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
