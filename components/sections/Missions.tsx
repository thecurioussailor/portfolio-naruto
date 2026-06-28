"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";

const MISSIONS = [
  {
    title: "Project Rasengan",
    rank: "S-RANK",
    rankColor: "#ff8a3d",
    image: "/pillar-sunset.webp",
    objectPosition: "center 35%",
    desc: "Placeholder mission brief. A flagship product build — describe the problem, the spin, and the result. One or two lines.",
    tags: ["React", "Node", "WebGL"],
  },
  {
    title: "Shadow Clone System",
    rank: "A-RANK",
    rankColor: "#ef6c1a",
    image: "/naruto-sky.png",
    objectPosition: "center 30%",
    desc: "Placeholder mission brief. A scalable design system / component library — what it solved and who it served.",
    tags: ["TypeScript", "Storybook", "Figma"],
  },
  {
    title: "Nine-Tails Dashboard",
    rank: "A-RANK",
    rankColor: "#ef6c1a",
    image: "/chibi-sleeping-fox.jpg",
    objectPosition: "center 60%",
    desc: "Placeholder mission brief. A data-heavy analytics dashboard — taming chaos into a calm, readable interface.",
    tags: ["D3", "Python", "Postgres"],
  },
  {
    title: "Sage Mode CLI",
    rank: "B-RANK",
    rankColor: "#6fa653",
    rankText: "#f4ecdb",
    image: "/tree-hang.jpg",
    objectPosition: "center 40%",
    desc: "Placeholder mission brief. A developer tool / open-source CLI — the unglamorous work that makes everything faster.",
    tags: ["Rust", "CLI", "OSS"],
  },
];

export default function Missions() {
  return (
    <section
      id="missions"
      className="relative overflow-hidden px-[7vw] pt-[140px] pb-[160px]"
      style={{
        background:
          "radial-gradient(120% 80% at 20% 0%,#241a3c 0%,#181226 55%,#14101f 100%)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 z-[4] h-[340px] w-[260px]"
        initial={{ x: -140, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Image
          src="/child-peek.png"
          alt=""
          fill
          sizes="260px"
          className="object-contain object-left-bottom"
        />
      </motion.div>

        <Reveal className="mb-[60px] text-center">
          <div className="mb-[14px] font-mono text-xs tracking-[0.36em] text-orange uppercase">
            Stage 03 · 任務
          </div>
          <h2 className="font-display text-[clamp(34px,4.4vw,56px)] font-bold text-cream">
            Missions
          </h2>
          <p className="mt-[14px] text-[15px] text-purple-dim">
            Selected work — ranked by difficulty, cleared in full.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-[26px] md:grid-cols-2">
          {MISSIONS.map((m, i) => (
            <Reveal key={m.title} delay={(i % 2) * 100}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative cursor-pointer overflow-hidden rounded-lg border border-cream/12 bg-card"
              >
                <div className="relative h-[240px] overflow-hidden">
                  <motion.div
                    className="relative h-full w-full"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <Image
                      src={m.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      style={{ objectPosition: m.objectPosition }}
                    />
                  </motion.div>
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg,rgba(20,16,31,0) 40%,rgba(20,16,31,.9) 100%)",
                    }}
                  />
                  <span
                    className="absolute top-[14px] left-[14px] rounded-[3px] px-[11px] py-[5px] font-mono text-xs font-bold tracking-[0.12em]"
                    style={{ background: m.rankColor, color: m.rankText ?? "#14101f" }}
                  >
                    {m.rank}
                  </span>
                </div>
                <div className="p-6">
                  <div className="font-display mb-2 text-[23px] text-cream">{m.title}</div>
                  <p className="mb-4 text-sm leading-[1.7] text-purple-dimmer">{m.desc}</p>
                  <div className="mb-[18px] flex flex-wrap gap-2">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cream/18 px-[9px] py-1 text-[10px] tracking-[0.1em] text-purple-light"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-xs tracking-[0.12em] text-orange-light uppercase">
                    Accept Mission ▸
                  </span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
    </section>
  );
}
