"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { MissionHeading } from "./MissionHeading";
import { NarutoCharacter } from "./NarutoCharacter";
import { Clone } from "./Clone";
import { Smoke } from "./Smoke";
import { useShadowClone } from "@/hooks/useShadowClone";
import { CLONES, TIMELINE, type CloneConfig } from "@/lib/narutoSprites";

interface Seat {
  x: number;
  y: number;
  cx: number;
  bottom: number;
}

function measureSeat(
  layer: HTMLElement,
  heading: HTMLElement,
  cfg: CloneConfig,
  aspect = 0.5
): Seat {
  const letters = heading.querySelectorAll<HTMLElement>("[data-letter]");
  const r = letters[cfg.letterIndex].getBoundingClientRect();
  const L = layer.getBoundingClientRect();
  const w = cfg.height * aspect;
  const cx = r.left - L.left + r.width / 2 + (cfg.dx ?? 0) * r.width;
  const bottom = r.top - L.top + r.height * cfg.glyphTop + cfg.overlap;
  const y = cfg.pose === "hang" ? bottom + 2 : bottom - cfg.height;
  return { x: cx - w / 2, y, cx, bottom };
}

interface ShadowCloneSceneProps {
  cardsRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Orchestrates the full shadow-clone scene above the Mission Log heading.
 * Pass cardsRef to trigger early clone departure when cards enter view.
 */
export function ShadowCloneScene({ cardsRef }: ShadowCloneSceneProps) {
  const layerRef  = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wrapRef   = useRef<HTMLDivElement>(null);

  const inView      = useInView(wrapRef,  { amount: 0.5, once: true });
  const cardsInView = useInView(cardsRef ?? wrapRef, { amount: 0.5 });

  const { phase, start, depart } = useShadowClone();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [poofs, setPoofs] = useState<{ id: number; x: number; y: number; v: 0 | 1 | 2 }[]>([]);
  const poofId = useRef(0);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const measure = useCallback(() => {
    if (!layerRef.current || !headingRef.current) return;
    setSeats(CLONES.map((c) => measureSeat(layerRef.current!, headingRef.current!, c)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (inView && !reduced) start();
  }, [inView, reduced, start]);

  useEffect(() => {
    if (cardsRef && cardsInView) depart();
  }, [cardsRef, cardsInView, depart]);

  const puff = useCallback((x: number, y: number) => {
    const id = poofId.current++;
    const v = (id % 3) as 0 | 1 | 2;
    setPoofs((p) => [...p, { id, x, y, v }]);
    setTimeout(() => setPoofs((p) => p.filter((q) => q.id !== id)), 450);
  }, []);

  useEffect(() => {
    if (phase === "clones") {
      seats.forEach((s, i) =>
        setTimeout(
          () => puff(s.cx, s.bottom - CLONES[i].height / 2),
          i * TIMELINE.poofStagger
        )
      );
    }
    if (phase === "departing") {
      const order = [...seats.keys()].sort(() => Math.random() - 0.5);
      order.forEach((seatIdx, i) =>
        setTimeout(
          () => puff(seats[seatIdx].cx, seats[seatIdx].bottom - CLONES[seatIdx].height / 2),
          i * TIMELINE.departStagger
        )
      );
    }
  }, [phase, seats, puff]);

  const clonesVisible =
    phase === "clones" ||
    phase === "thumbsUp" ||
    phase === "runOut" ||
    phase === "settled";

  const origin = seats.length
    ? {
        x: (seats[0].x + seats[1].x) / 2 + 40,
        y: Math.min(...seats.map((s) => s.bottom)) - 14,
      }
    : null;

  return (
    <motion.div
      ref={wrapRef}
      style={{ position: "relative" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Absolutely-positioned scene layer — zero layout impact */}
      <div
        ref={layerRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "visible",
          zIndex: 5,
        }}
      >
        {origin && <NarutoCharacter phase={phase} x={origin.x} y={origin.y} />}
        <AnimatePresence>
          {clonesVisible &&
            CLONES.map((cfg, i) =>
              seats[i] ? (
                <Clone key={cfg.id} config={cfg} x={seats[i].x} y={seats[i].y} index={i} />
              ) : null
            )}
        </AnimatePresence>
        {poofs.map((p) => (
          <Smoke key={p.id} x={p.x} y={p.y} variant={p.v} />
        ))}
      </div>

      <MissionHeading ref={headingRef} />
    </motion.div>
  );
}
