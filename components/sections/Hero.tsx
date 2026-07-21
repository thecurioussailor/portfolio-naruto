"use client";

import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { useEffect } from "react";
import { scrollToSection } from "@/lib/scrollTo";

const EASE = [0.22, 1, 0.36, 1] as const;

const BIRDS = [
  { top: "8%",  duration: 26, delay: 2.5, opacity: 1,    size: 13, flapDuration: 0.9 },
  { top: "26%", duration: 34, delay: 18,  opacity: 0.8,  size: 10, flapDuration: 1   },
  { top: "46%", duration: 30, delay: 28,  opacity: 0.65, size: 11, flapDuration: 0.85},
  { top: "60%", duration: 40, delay: 22,  opacity: 0.5,  size: 9,  flapDuration: 1.1 },
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
    <section id="top" className="relative h-screen min-h-[680px] overflow-hidden">

      {/* 0.0s — Background gradient base */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg,#2a1f47 0%,#4a2d56 30%,#8a4a5e 58%,#d98a5f 80%,#f0b87a 100%)",
        }}
      />

      {/* 0.0s — Village background plate fades in */}
      <motion.div
        className="absolute inset-[-4%] z-1 bg-cover bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/background.png')",
          backgroundPosition: "center 45%",
          x: heroImgX,
          y: heroImgY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0, ease: EASE }}
      />

      {/* 0.25s — Naruto comes into focus, already sitting there */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 z-4 w-[52%] will-change-transform"
        initial={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
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

      {/* Gradient overlays */}
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

      {/* 0.2s — Birds (first one flies early, others staggered naturally) */}
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

      {/* Hero text content — choreographed sequence */}
      <motion.div
        className="absolute inset-0 z-5 flex max-w-[680px] flex-col justify-center pr-10 pl-[7vw] will-change-transform"
        style={{ y: heroContentY, opacity: heroOpacity }}
      >
        {/* 0.8s — Eyebrow label slides from left */}
        <motion.div
          className="mb-[32px] flex items-center gap-[14px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
        >
          <span className="h-px w-[46px] bg-orange" />
          <span className="font-mono text-xs tracking-[0.42em] text-orange-light uppercase">
            Portfolio Quest · Current Arc
          </span>
        </motion.div>

        {/* 1.0s — ASHUTOSH slides up */}
        <div className="font-display text-[clamp(42px,5.5vw,82px)] leading-[0.94] font-extrabold tracking-tight text-shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
          <motion.div
            className="text-cream-warm"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
          >
            ASHUTOSH
          </motion.div>

          {/* 1.15s — SAGAR slides up */}
          <motion.div
            className="text-orange-light"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE }}
          >
            SAGAR
          </motion.div>
        </div>

        {/* 1.3s — Subtitle fades only */}
        <motion.div
          className="font-display mt-5 text-[clamp(13px,1.3vw,17px)] tracking-[0.32em] text-purple-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
        >
          忍道 — THE WAY OF THE SHINOBI
        </motion.div>

        {/* 1.45s — Description fades up */}
        <motion.p
          className="mt-5 max-w-85 text-[clamp(14px,1.2vw,16px)] leading-[1.75] text-cream/75"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.45, ease: EASE }}
        >
          Every mission is a chance to learn. I build thoughtful software across AI, Solana, and the modern web.
        </motion.p>

        {/* 1.7s — Buttons scale in */}
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 1.7, ease: EASE }}
        >
          <motion.button
            onClick={() => scrollToSection("origin")}
            className="inline-flex animate-[pulseGlow_2.6s_ease-in-out_infinite] cursor-pointer items-center gap-2.5 rounded-full border-4 border-white/60 bg-orange px-[28px] py-[14px] font-mono text-[13px] font-bold tracking-[0.14em] text-ink uppercase shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
            whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(239,108,26,0.5)" }}
          >
            ▶ Begin Journey
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("missions")}
            className="inline-flex cursor-pointer items-center gap-10 rounded-full border-4 border-white/50 bg-white/10 px-[28px] py-[14px] font-mono text-[13px] tracking-[0.14em] text-cream uppercase backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
            whileHover={{ background: "rgba(244,236,219,.16)", borderColor: "rgba(255,255,255,.85)" }}
          >
            Mission Log →
          </motion.button>
        </motion.div>
      </motion.div>


    </section>
  );
}
