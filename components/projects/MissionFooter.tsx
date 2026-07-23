"use client";

import { motion } from "motion/react";
import type { Project } from "@/lib/projects";

interface MissionFooterProps {
  project: Project;
}

export function MissionFooter({ project }: MissionFooterProps) {
  const hasLive = Boolean(project.liveUrl);
  const hasSource = Boolean(project.githubUrl);

  return (
    <div className="flex gap-3">
      <motion.a
        href={project.liveUrl ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={hasLive ? { y: -2, boxShadow: "0 6px 20px rgba(239,108,26,.35)" } : {}}
        className={[
          "flex flex-1 items-center justify-center gap-2 rounded-full py-[9px] font-mono text-[11px] font-bold tracking-[0.12em] uppercase",
          hasLive
            ? "bg-orange text-ink cursor-pointer"
            : "bg-ink/[0.06] text-ink/25 cursor-not-allowed pointer-events-none",
        ].join(" ")}
        aria-disabled={!hasLive}
        tabIndex={hasLive ? 0 : -1}
      >
        ▶ Live Demo
      </motion.a>

      {hasSource && (
        <motion.a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2, borderColor: "rgba(20,16,31,0.5)" }}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-ink/25 py-[9px] font-mono text-[11px] font-bold tracking-[0.12em] text-ink uppercase"
        >
          &lt;/&gt; GitHub
        </motion.a>
      )}
    </div>
  );
}
