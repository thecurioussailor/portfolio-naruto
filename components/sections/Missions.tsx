"use client";

import { useRef } from "react";
import { ShadowCloneScene } from "@/components/ui/MissionLog/ShadowCloneScene";
import { MissionGrid } from "@/components/projects/MissionGrid";

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
<div className="mb-[60px] text-center">
        <div className="mb-[14px] font-mono text-xs tracking-[0.36em] text-orange uppercase">
          任務
        </div>
        <ShadowCloneScene cardsRef={cardsRef} />
        <p className="mt-[14px] text-[15px] text-[#7a6a55]">
          A selection of products I've built,<br />problems I've solved, and systems I've shipped.
        </p>
      </div>

      <div ref={cardsRef}>
        <MissionGrid />
      </div>
    </section>
  );
}
