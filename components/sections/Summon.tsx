"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "@/components/ui/Reveal";

const SOCIALS = ["GitHub", "LinkedIn", "X / Twitter", "Dribbble"];

export default function Summon() {
  return (
    <section id="summon" className="relative overflow-hidden px-[7vw] py-[140px]" style={{ background: "#f0e8d5" }}>
      <div className="mx-auto grid max-w-[1180px] items-center gap-[60px] lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div className="mb-[14px] font-mono text-xs tracking-[0.36em] text-orange uppercase">
            Stage 05 · 召喚
          </div>
          <h2 className="font-display mb-[22px] text-[clamp(34px,4.4vw,56px)] leading-[1.05] font-bold text-ink">
            Summon me for
            <br />
            the next mission.
          </h2>
          <p className="mb-[34px] max-w-[480px] text-base leading-[1.8] text-[#5a4f3e]">
            Placeholder note. Got a quest worth taking? Whether it&apos;s a product to build,
            a system to design, or a team to join — let&apos;s talk.
          </p>
          <motion.a
            href="mailto:hello@ashutoshsagar.com"
            whileHover={{ y: -2, boxShadow: "0 8px 26px rgba(239,108,26,.45)" }}
            className="inline-flex items-center gap-[10px] rounded-[3px] bg-orange px-7 py-4 font-mono text-sm font-bold tracking-[0.12em] text-ink uppercase"
          >
            ✉ Send a Scroll
          </motion.a>
          <div className="mt-[34px] flex flex-wrap gap-[14px]">
            {SOCIALS.map((s) => (
              <motion.a
                key={s}
                href="#"
                whileHover={{ borderColor: "#ef6c1a", color: "#ff8a3d" }}
                className="rounded-[3px] border border-ink/20 px-4 py-2.5 font-mono text-xs tracking-[0.1em] text-[#5a4f3e]"
              >
                {s}
              </motion.a>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={120}
          className="relative overflow-hidden rounded-lg border border-cream/12 shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
        >
          <Image
            src="/porch-talk.jpg"
            alt=""
            width={600}
            height={760}
            className="block h-auto w-full"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg,rgba(20,16,31,0) 55%,rgba(20,16,31,.55) 100%)",
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
