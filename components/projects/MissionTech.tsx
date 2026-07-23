"use client";

import { motion } from "motion/react";
import type { Project } from "@/lib/projects";

interface MissionTechProps {
  tech: Project["tech"];
}

export function MissionTech({ tech }: MissionTechProps) {
  return (
    <div className="flex flex-wrap gap-[6px]">
      {tech.map((t) => (
        <motion.span
          key={t}
          whileHover={{ y: -1 }}
          transition={{ duration: 0.2 }}
          className="rounded-full border border-ink/15 bg-ink/[0.04] px-[10px] py-[4px] text-[10px] tracking-[0.06em] text-[#5a4f3e]"
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
}
