"use client";

import { motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";

const JUTSU = [
  { title: "Frontend Jutsu", tags: "React · TypeScript · Motion", level: 9, chakra: 92 },
  { title: "Backend Jutsu", tags: "Node · Python · Postgres", level: 8, chakra: 85 },
  { title: "Design Jutsu", tags: "UI/UX · Figma · Brand", level: 9, chakra: 90 },
  { title: "DevOps Jutsu", tags: "Docker · CI/CD · AWS", level: 7, chakra: 78 },
  { title: "Motion Jutsu", tags: "GSAP · WebGL · Canvas", level: 8, chakra: 82 },
  { title: "Strategy Jutsu", tags: "Product · Systems · Leadership", level: 8, chakra: 86 },
];

export default function Jutsu() {
  return (
    <section id="jutsu" className="relative overflow-hidden px-[7vw] py-[140px]" style={{ background: "#efe6d0" }}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 20%,rgba(111,166,83,.12),transparent 70%),radial-gradient(50% 50% at 90% 80%,rgba(239,108,26,.10),transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1200px]">
        <Reveal className="mb-[60px] text-center">
          <div className="mb-[14px] font-mono text-xs tracking-[0.36em] text-orange uppercase">
            Stage 02 · 術
          </div>
          <h2 className="font-display text-[clamp(34px,4.4vw,56px)] font-bold text-ink">
            Jutsu Mastered
          </h2>
          <p className="mt-[14px] text-[15px] text-[#7a6a55]">
            The techniques in the arsenal — and how deep the chakra runs.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {JUTSU.map((j, i) => (
            <Reveal key={j.title} delay={(i % 3) * 80}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(239,108,26,.5)" }}
                className="relative overflow-hidden rounded-md border border-ink/10 bg-white/60 p-[26px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-sm"
              >
                <div className="mb-[18px] flex items-start justify-between">
                  <div>
                    <div className="font-display text-xl text-ink">{j.title}</div>
                    <div className="mt-1 text-[11px] tracking-[0.2em] text-orange uppercase">
                      {j.tags}
                    </div>
                  </div>
                  <span className="rounded-full border border-green/50 px-2 py-0.5 font-mono text-[11px] text-[#4a7a35]">
                    Lv. {j.level}
                  </span>
                </div>
                <div className="h-[7px] overflow-hidden rounded-md bg-ink/10">
                  <motion.div
                    className="h-full rounded-md"
                    style={{
                      background: "linear-gradient(90deg,#ef6c1a,#ff8a3d)",
                    }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${j.chakra}%` }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[#7a6a55]">
                  <span>CHAKRA</span>
                  <span>{j.chakra}%</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
