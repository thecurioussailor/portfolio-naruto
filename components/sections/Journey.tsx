"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";

const TIMELINE = [
  {
    year: "2019",
    title: "Academy — Where it began",
    rank: "Genin",
    rankColor: "#6fa653",
    dotColor: "#ff8a3d",
    desc: "Placeholder milestone. First role, first real codebase, learning the ropes.",
  },
  {
    year: "2021",
    title: "First real missions",
    rank: "Chūnin",
    rankColor: "#6fa653",
    dotColor: "#ff8a3d",
    desc: "Placeholder milestone. Shipping products end-to-end, owning features.",
  },
  {
    year: "2023",
    title: "Leading the squad",
    rank: "Jōnin",
    rankColor: "#6fa653",
    dotColor: "#ff8a3d",
    desc: "Placeholder milestone. Mentoring, architecture, setting the direction.",
  },
  {
    year: "2026",
    title: "The path ahead",
    rank: "Sage",
    rankColor: "#ff8a3d",
    dotColor: "#6fa653",
    desc: "Placeholder milestone. What's next — open to the right quest.",
  },
];

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="journey" ref={sectionRef} className="relative overflow-hidden">
      <motion.div
        className="absolute inset-x-0 -top-[8%] -bottom-[8%] z-0 bg-cover will-change-transform"
        style={{
          backgroundImage: "url('/journey-road.jpg')",
          backgroundPosition: "center 35%",
          y,
        }}
      />
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg,#f4ecdb 0%,rgba(244,236,219,.72) 18%,rgba(244,236,219,.72) 82%,#f4ecdb 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[980px] px-[7vw] py-[150px]">

        <Reveal className="mb-16 text-center">
          <div className="mb-[14px] font-mono text-xs tracking-[0.36em] text-orange-light uppercase">
            Stage 04 · 旅
          </div>
          <h2 className="font-display text-[clamp(34px,4.4vw,56px)] font-bold text-ink">
            The Journey
          </h2>
          <p className="mt-[14px] text-[15px] text-[#7a6a55]">
            Genin to Jōnin — every rank earned on the road.
          </p>
        </Reveal>

        <div className="relative pl-10">
          <div
            className="absolute top-1.5 bottom-1.5 left-2 w-0.5"
            style={{
              background: "linear-gradient(180deg,#ff8a3d,#ef6c1a,#6fa653)",
            }}
          />
          {TIMELINE.map((item) => (
            <Reveal key={item.year} className="relative mb-[38px] last:mb-0">
              <span
                className="absolute top-1 -left-[39px] h-4 w-4 rounded-full border-[3px] border-ink"
                style={{
                  background: item.dotColor,
                  boxShadow: `0 0 0 3px ${item.dotColor}4d`,
                }}
              />
              <div className="rounded-md border border-ink/10 bg-white/65 px-[26px] py-[22px] backdrop-blur-[6px] shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex flex-wrap items-baseline gap-[14px]">
                  <span className="font-mono text-[13px] tracking-[0.1em] text-orange">
                    {item.year}
                  </span>
                  <span className="font-display text-[21px] text-ink">{item.title}</span>
                  <span
                    className="rounded-full border px-2 py-0.5 text-[10px] tracking-[0.2em] uppercase"
                    style={{ borderColor: `${item.rankColor}66`, color: item.rankColor }}
                  >
                    {item.rank}
                  </span>
                </div>
                <p className="mt-2.5 text-sm leading-[1.7] text-[#7a6a55]">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
