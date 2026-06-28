"use client";

import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect } from "react";
import { scrollToSection } from "@/lib/scrollTo";

const BIRDS = [
  { top: "8%", duration: 26, delay: 0, opacity: 1, size: 13, flapDuration: 0.9 },
  { top: "26%", duration: 34, delay: 3, opacity: 0.8, size: 10, flapDuration: 1 },
  { top: "46%", duration: 30, delay: 8, opacity: 0.65, size: 11, flapDuration: 0.85 },
  { top: "60%", duration: 40, delay: 14, opacity: 0.5, size: 9, flapDuration: 1.1 },
];

export default function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const heroImgX = useTransform(mx, (v) => v * -16);
  const heroImgY = useTransform([scrollY, my], ([sy, m]: number[]) => sy * 0.22 + m * -12);
  const heroContentY = useTransform(scrollY, (sy) => sy * 0.28);
  const heroOpacity = useTransform(scrollY, (sy) => Math.max(0, 1 - sy / 620));
  const birdsX = useTransform(mx, (v) => v * 22);
  const birdsY = useTransform(my, (v) => v * 14);

  return (
    <section
      id="top"
      className="relative h-screen min-h-[680px] overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg,#2a1f47 0%,#4a2d56 30%,#8a4a5e 58%,#d98a5f 80%,#f0b87a 100%)",
        }}
      />

      <motion.div
        className="absolute inset-[-4%] z-1 bg-cover bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundPosition: "center 45%",
          x: heroImgX,
          y: heroImgY,
          scale: 1.00,
        }}
      />

      <motion.div
        className="absolute top-0 right-0 bottom-0 z-4 w-[52%] will-change-transform"
        initial={{ x: "120%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 0.8, 0.2, 1] }}
      >
        <div
          className="absolute top-0 right-0 h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/narutosittting.png')",
            backgroundPosition: "right center",
            width: "150%",
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 z-5"
        style={{
          background:
            "linear-gradient(90deg,rgba(20,16,31,.86) 0%,rgba(20,16,31,.55) 34%,rgba(20,16,31,.08) 60%,rgba(20,16,31,0) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-5"
        style={{
          background:
            "linear-gradient(180deg,rgba(20,16,31,.5) 0%,rgba(20,16,31,0) 22%,rgba(20,16,31,0) 62%,rgba(20,16,31,.95) 100%)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute top-[14%] right-0 left-0 z-3 h-[40%]"
        style={{ x: birdsX, y: birdsY }}
      >
        {BIRDS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute flex"
            style={{ top: b.top, opacity: b.opacity }}
            animate={{ x: ["-8vw", "110vw"], y: [0, "-6vh"] }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.span
              className="bird bird-left"
              style={{ width: b.size, animationDuration: `${b.flapDuration}s` }}
            />
            <motion.span
              className="bird bird-right"
              style={{ width: b.size, animationDuration: `${b.flapDuration}s` }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0 z-5 flex max-w-[760px] flex-col justify-center pr-10 pl-[7vw] will-change-transform"
        style={{ y: heroContentY, opacity: heroOpacity }}
      >
        <div className="mb-[26px] flex items-center gap-[14px]">
          <span className="h-px w-[46px] bg-orange" />
          <span className="font-mono text-xs tracking-[0.42em] text-orange-light uppercase">
            Portfolio Quest · 2026
          </span>
        </div>
        <h1 className="font-display text-[clamp(48px,8vw,108px)] leading-[0.94] font-extrabold tracking-tight text-cream-warm text-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          ASHUTOSH
          <br />
          <span className="text-orange-light">SAGAR</span>
        </h1>
        <div className="font-display mt-2 text-[clamp(15px,1.5vw,19px)] tracking-[0.32em] text-purple-light">
          疾風伝 — THE WIND CHRONICLE
        </div>
        <p className="mt-[26px] max-w-[520px] text-[clamp(15px,1.5vw,18px)] leading-[1.7] text-purple-muted">
          A full-stack creative who builds calm, considered products — and chases the next
          horizon like there&apos;s a whole village counting on it. This is the quest log.
          Scroll to begin.
        </p>
        <div className="mt-[38px] flex flex-wrap gap-4">
          <motion.button
            onClick={() => scrollToSection("origin")}
            className="inline-flex animate-[pulseGlow_2.6s_ease-in-out_infinite] cursor-pointer items-center gap-[10px] rounded-[3px] bg-orange px-[26px] py-[15px] font-mono text-[13px] font-bold tracking-[0.14em] text-ink uppercase"
            whileHover={{ y: -2 }}
          >
            ▶ Begin the Quest
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("missions")}
            className="inline-flex cursor-pointer items-center gap-[10px] rounded-[3px] border border-cream/35 px-[26px] py-[15px] font-mono text-[13px] tracking-[0.14em] text-cream uppercase"
            whileHover={{ background: "rgba(244,236,219,.08)", borderColor: "rgba(244,236,219,.6)" }}
          >
            View Missions
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute bottom-[26px] left-1/2 z-6 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.32em] text-[#e9d9c4] uppercase">
          scroll
        </span>
        <span
          className="h-[34px] w-px animate-[scrollcue_1.8s_ease-in-out_infinite]"
          style={{ background: "linear-gradient(#e9d9c4,transparent)" }}
        />
      </div>
    </section>
  );
}
