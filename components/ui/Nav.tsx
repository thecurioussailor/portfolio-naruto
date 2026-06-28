"use client";

import { motion } from "motion/react";
import { useScrollProgress } from "@/lib/useScrollProgress";
import { scrollToSection } from "@/lib/scrollTo";

const LINKS = [
  { id: "origin", label: "Origin" },
  { id: "jutsu", label: "Jutsu" },
  { id: "missions", label: "Missions" },
  { id: "journey", label: "Journey" },
];

export default function Nav() {
  const { progress, scrolled, activeSection } = useScrollProgress();

  return (
    <>
      <div
        className="fixed top-0 left-0 z-60 h-[3px] bg-linear-to-r from-orange via-orange-light to-[#f0a9b8] shadow-[0_0_12px_rgba(255,138,61,0.7)]"
        style={{ width: `${progress}%` }}
      />

      <nav
        className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-transparent transition-[background,padding,box-shadow,border-color] duration-400"
        style={{
          background: scrolled ? "#f4ecdb" : "transparent",
          padding: scrolled ? "12px 40px" : "18px 40px",
          boxShadow: scrolled ? "0 4px 20px rgba(20,16,31,.18)" : "none",
        }}
      >
        <button
          onClick={() => scrollToSection("top")}
          className="flex items-center gap-[13px] cursor-pointer"
        >
          <div className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full border-2 border-orange">
            <div className="h-3.5 w-3.5 rounded-full border-2 border-orange border-t-transparent border-l-transparent" />
          </div>
          <div className="text-left leading-[1.05]">
            <div
              className="font-display text-[15px] font-bold tracking-[0.16em] transition-colors duration-400"
              style={{ color: scrolled ? "#14101f" : "#f4ecdb" }}
            >
              ASHUTOSH SAGAR
            </div>
            <div className="mt-0.5 font-mono text-[9px] tracking-[0.32em] text-orange uppercase">
              Full-stack Shinobi
            </div>
          </div>
        </button>

        <div className="flex items-center gap-[30px] h-full">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="cursor-pointer text-[12px] tracking-[0.22em] uppercase transition-colors duration-250"
              style={{
                color:
                  activeSection === link.id
                    ? "#ef6c1a"
                    : scrolled
                      ? "#5a4f6b"
                      : "#b9a8c9",
              }}
            >
              {link.label}
            </button>
          ))}

        </div>
        <motion.button
            onClick={() => scrollToSection("summon")}
            initial={{ boxShadow: "0 0px 0px rgba(239,108,26,0)" }}
            whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(239,108,26,.45)" }}
            className="cursor-pointer rounded-sm bg-orange px-11 py-[9px] font-mono text-[12px] font-bold tracking-[0.16em] text-ink uppercase"
          >
            Summon Me
          </motion.button>
      </nav>
    </>
  );
}
