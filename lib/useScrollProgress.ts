"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["missions", "journey", "jutsu", "origin", "summon"];

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY || 0;
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      setProgress(Math.min(100, (sy / max) * 100));
      setScrolled(sy > 40);

      let active: string | null = null;
      let closest = -Infinity;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top - window.innerHeight * 0.3;
        if (top <= 0 && top > closest) {
          closest = top;
          active = id;
        }
      }
      setActiveSection(active);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { progress, scrolled, activeSection };
}
