"use client";

import { scrollToSection } from "@/lib/scrollTo";

const LINKS = [
  { id: "origin", label: "Origin" },
  { id: "jutsu", label: "Jutsu" },
  { id: "missions", label: "Missions" },
  { id: "journey", label: "Journey" },
  { id: "summon", label: "Summon" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-cream/[0.08] bg-ink-deep px-[7vw] py-[50px]">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-[13px]">
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-orange">
            <div className="h-[11px] w-[11px] rounded-full border-2 border-orange border-t-transparent border-l-transparent" />
          </div>
          <div>
            <div className="font-display text-sm font-bold tracking-[0.14em]">
              ASHUTOSH SAGAR
            </div>
            <div className="mt-0.5 font-mono text-[10px] tracking-[0.2em] text-orange">
              だってばよ — Believe it.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-[26px] text-xs tracking-[0.2em] text-purple-faint uppercase">
          {LINKS.map((link) => (
            <button key={link.id} onClick={() => scrollToSection(link.id)} className="cursor-pointer">
              {link.label}
            </button>
          ))}
        </div>

        <div className="font-mono text-[11px] text-[#6a5d80]">© 2026 · Portfolio Quest</div>
      </div>
    </footer>
  );
}
