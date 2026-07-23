"use client";

import { motion } from "motion/react";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import { MissionCover } from "./MissionCover";
import { MissionTech } from "./MissionTech";
import { MissionFooter } from "./MissionFooter";

interface MissionCardProps {
  project: Project;
  index: number;
}

export function MissionCard({ project, index }: MissionCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 2) * 0.08,
      }}
      animate={{
        y: hovered ? -6 : 0,
        boxShadow: hovered
          ? "0 20px 52px rgba(239,108,26,0.14), 0 4px 16px rgba(0,0,0,0.07)"
          : "0 4px 24px rgba(0,0,0,0.06)",
        borderColor: hovered ? "rgba(239,108,26,0.28)" : "rgba(20,16,31,0.10)",
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group flex flex-col overflow-hidden rounded-[18px] border bg-white/75 backdrop-blur-sm"
      style={{ willChange: "transform" }}
    >
      <MissionCover project={project} hovered={hovered} />

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title + description */}
        <h3 className="font-display mb-[5px] text-[20px] leading-tight text-ink">
          {project.title}
        </h3>
        <p className="mb-4 text-[12.5px] leading-[1.65] text-[#5a4f3e] line-clamp-2">
          {project.description}
        </p>

        <MissionTech tech={project.tech} />

        {/* Footer pinned to bottom */}
        <div className="mt-auto pt-4">
          <MissionFooter project={project} />
        </div>
      </div>
    </motion.article>
  );
}
