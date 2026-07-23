"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { RANK_META, type Project } from "@/lib/projects";

interface ArchiveCardProps {
  project: Project;
  index: number;
}

export function ArchiveCard({ project, index }: ArchiveCardProps) {
  const rank = RANK_META[project.rank];
  const hasLive = Boolean(project.liveUrl);
  const hasSource = Boolean(project.githubUrl);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 3) * 0.06,
      }}
      className="group flex flex-col overflow-hidden rounded-[14px] border border-ink/10 bg-white/55 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      {/* Cover — compact */}
      <div className="relative h-[160px] overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ objectPosition: project.objectPosition ?? "center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />

        {/* Rank badge */}
        <span
          className="absolute top-3 left-3 rounded-[3px] px-[8px] py-[4px] font-mono text-[9px] font-bold tracking-[0.16em]"
          style={{ background: rank.bg, color: rank.text }}
        >
          {project.rank}
        </span>

        {/* Status */}
        <span className="absolute top-3 right-3 rounded-[3px] border border-white/20 bg-black/30 px-[7px] py-[3px] font-mono text-[9px] tracking-[0.1em] text-white/80 backdrop-blur-sm">
          {project.status}
        </span>

        {/* Title over bottom of cover */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3">
          <h3 className="font-display text-[17px] leading-tight text-white">
            {project.title}
          </h3>
          <p className="mt-0.5 font-mono text-[9px] tracking-[0.12em] text-white/60 uppercase">
            {project.role}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 py-3 gap-3">
        <p className="text-[12px] leading-[1.65] text-[#5a4f3e] line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-[5px]">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-ink/12 bg-ink/[0.04] px-[8px] py-[3px] text-[9px] tracking-[0.06em] text-[#5a4f3e]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        {(hasLive || hasSource) && (
          <div className="mt-auto flex gap-2 pt-1">
            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-orange px-3 py-[5px] font-mono text-[9px] font-bold tracking-[0.12em] text-ink uppercase transition-opacity hover:opacity-90"
              >
                ▶ Live
              </a>
            )}
            {hasSource && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-ink/20 px-3 py-[5px] font-mono text-[9px] font-bold tracking-[0.12em] text-[#5a4f3e] uppercase transition-colors hover:border-ink/40"
              >
                &lt;/&gt; GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
