"use client";

import { getFeaturedProjects } from "@/lib/projects";
import { MissionCard } from "./MissionCard";
import { MissionArchive } from "./MissionArchive";

const FEATURED = getFeaturedProjects();

export function MissionGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
        {FEATURED.map((project, i) => (
          <MissionCard key={project.id} project={project} index={i} />
        ))}
      </div>
      <MissionArchive />
    </div>
  );
}
