"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";

const STATS = [
  { value: "6+", label: "Years training" },
  { value: "40+", label: "Missions cleared" },
  { value: "∞", label: "Bowls of ramen" },
];

export default function Origin() {
  return (
    <section
      id="origin"
      className="relative overflow-hidden px-[7vw] py-[140px]"
      style={{
        background:
          "radial-gradient(120% 80% at 80% 0%,#f0e8d5 0%,#f4ecdb 55%,#efe6d0 100%)",
      }}
    >
      <motion.div
        className="pointer-events-none absolute top-20 right-[-40px] z-[3] h-[260px] w-[200px]"
        initial={{ x: 120, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        style={{ filter: "drop-shadow(0 18px 30px rgba(0,0,0,.45))" }}
      >
        <Image
          src="/chibi-peek.png"
          alt=""
          fill
          sizes="200px"
          className="object-contain object-right"
        />
      </motion.div>

      <div className="mx-auto grid max-w-[1200px] items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal className="relative">
          <div
            className="relative overflow-hidden rounded-[4px] border border-cream/12 shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
            style={{ transform: "rotate(-2deg)" }}
          >
            <Image
              src="/manga-corner.webp"
              alt="The origin"
              width={600}
              height={760}
              className="block h-auto w-full"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg,rgba(244,236,219,0) 60%,rgba(244,236,219,.4) 100%)",
              }}
            />
          </div>
          <div className="absolute bottom-[-18px] left-[-18px] rounded-[2px] bg-orange px-[14px] py-2 font-mono text-[11px] font-bold tracking-[0.2em] text-ink shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            CH. 01 — ALONE
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mb-[14px] font-mono text-xs tracking-[0.36em] text-orange uppercase">
            起源
          </div>
          <h2 className="font-display mb-6 text-[clamp(34px,4.4vw,56px)] leading-[1.04] font-bold text-ink">
            Origin
          </h2>
          <p className="mb-6 max-w-[520px] text-[15px] text-[#7a6a55]">
            The curiosity, discipline,<br />and experiences that shaped the engineer I am today.
          </p>
          <p className="mb-[18px] max-w-[520px] text-base leading-[1.85] text-[#5a4f3e]">
            Placeholder origin story. Talk about how you started, what drew you to building,
            the late nights and the small wins. Keep it personal — this is the part people
            remember. Replace this text once the layout feels right.
          </p>
          <p className="max-w-[520px] text-base leading-[1.85] text-[#7a6a55]">
            Add a second beat here — a turning point, a mentor, the moment it clicked. Two
            short paragraphs is plenty.
          </p>
          <div className="mt-[34px] flex flex-wrap gap-[14px]">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-[4px] border border-ink/10 bg-white/50 px-5 py-4"
              >
                <div className="font-display text-3xl leading-none text-orange">
                  {s.value}
                </div>
                <div className="mt-1.5 text-[11px] tracking-[0.2em] text-[#7a6a55] uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
