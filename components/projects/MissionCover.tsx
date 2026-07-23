"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { RANK_META, type Project } from "@/lib/projects";

interface MissionCoverProps {
  project: Project;
  hovered?: boolean;
}

export function MissionCover({ project, hovered }: MissionCoverProps) {
  const rank = RANK_META[project.rank];

  return (
    <div className="relative h-[240px] overflow-hidden rounded-t-[18px]">
      {/* Media — swap <Image> for <video> here when ready */}
      <motion.div
        className="relative h-full w-full"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{ objectPosition: project.objectPosition ?? "center" }}
        />
      </motion.div>

      {/* Gradient overlay — darkens on hover */}
      <div
        className="absolute inset-0 transition-all duration-400"
        style={{
          background: hovered
            ? "linear-gradient(180deg,rgba(20,16,31,0.18) 0%,rgba(20,16,31,0.35) 40%,rgba(20,16,31,0.92) 100%)"
            : "linear-gradient(180deg,rgba(20,16,31,0.08) 0%,rgba(20,16,31,0.20) 40%,rgba(20,16,31,0.80) 100%)",
        }}
      />

      {/* Top-left: Rank */}
      <span
        className="absolute top-4 left-4 rounded-[4px] px-[10px] py-[5px] font-mono text-[10px] font-bold tracking-[0.16em]"
        style={{ background: rank.bg, color: rank.text }}
      >
        {project.rank}
      </span>

      {/* Top-right: Year + Status */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="rounded-[4px] border border-white/20 bg-black/30 px-[8px] py-[4px] font-mono text-[10px] tracking-[0.1em] text-white/80 backdrop-blur-sm">
          {project.year}
        </span>
        <span className="flex items-center gap-1.5 rounded-[4px] bg-black/30 px-[8px] py-[4px] font-mono text-[10px] text-[#6fa653] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#6fa653]" />
          {project.status}
        </span>
      </div>

      {/* Objectives overlay — fades in on hover, sits above the gradient */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 hidden px-4 pb-10 pt-6 md:block"
        aria-hidden={!hovered}
        style={{ pointerEvents: "none" }}
      >
        <ul className="space-y-[5px]">
          {project.objectives.map((obj) => (
            <li key={obj} className="flex items-start gap-2">
              <span className="mt-[2px] shrink-0 text-[9px] text-orange">✦</span>
              <span className="text-[11px] leading-[1.5] text-white/90">{obj}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Bottom-left: Role */}
      <motion.span
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.14em] text-white/70 uppercase"
      >
        {project.role}
      </motion.span>

      {/* Bottom-right: Demo button */}
      {project.demoUrl && (
        <motion.a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2 }}
          className="absolute bottom-3 right-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-[5px] font-mono text-[10px] font-bold tracking-[0.1em] text-white backdrop-blur-sm border border-white/20"
        >
          ▶ Demo
        </motion.a>
      )}
    </div>
  );
}
