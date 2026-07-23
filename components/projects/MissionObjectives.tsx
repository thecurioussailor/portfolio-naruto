import type { Project } from "@/lib/projects";

interface MissionObjectivesProps {
  objectives: Project["objectives"];
}

export function MissionObjectives({ objectives }: MissionObjectivesProps) {
  return (
    <div>
      <p className="mb-2 font-mono text-[9px] tracking-[0.28em] text-orange uppercase">
        Mission Objectives
      </p>
      <ul className="space-y-[6px]">
        {objectives.map((obj) => (
          <li key={obj} className="flex items-start gap-2">
            <span className="mt-[2px] shrink-0 text-[10px] text-orange">✦</span>
            <span className="text-[12px] leading-[1.55] text-[#5a4f3e]">{obj}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
