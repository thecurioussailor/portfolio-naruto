'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { MissionHeading } from './MissionHeading';
import { Naruto } from './Naruto';
import { Clone } from './Clone';
import { Smoke } from './Smoke';
import { useShadowClone } from '../../hooks/useShadowClone';
import { CLONES, TIMELINE, type CloneConfig } from '../../lib/narutoSprites';

interface Seat { x: number; y: number; cx: number; bottom: number }

function measureSeat(
  layer: HTMLElement,
  heading: HTMLElement,
  cfg: CloneConfig,
  aspect = 0.5
): Seat {
  const letters = heading.querySelectorAll<HTMLElement>('[data-letter]');
  const r = letters[cfg.letterIndex].getBoundingClientRect();
  const L = layer.getBoundingClientRect();
  const w = cfg.height * aspect;
  const cx = r.left - L.left + r.width / 2 + (cfg.dx ?? 0) * r.width;
  const bottom = r.top - L.top + r.height * cfg.glyphTop + cfg.overlap;
  const y = cfg.pose === 'hang' ? bottom + 2 : bottom - cfg.height;
  return { x: cx - w / 2, y, cx, bottom };
}

/**
 * The full scene. Drop it above the project cards:
 *
 *   <ShadowCloneScene cardsRef={cardsRef} />
 *
 * cardsRef (optional): when that element scrolls into view the clones
 * depart early.
 */
export function ShadowCloneScene({
  cardsRef,
}: {
  cardsRef?: React.RefObject<HTMLElement>;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.5, once: true });
  const cardsInView = useInView(cardsRef ?? wrapRef, { amount: 0.5 });
  const { phase, start, depart } = useShadowClone();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [poofs, setPoofs] = useState<{ id: number; x: number; y: number; v: 0 | 1 | 2 }[]>([]);
  const poofId = useRef(0);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const measure = useCallback(() => {
    if (!layerRef.current || !headingRef.current) return;
    setSeats(CLONES.map((c) => measureSeat(layerRef.current!, headingRef.current!, c)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  useEffect(() => {
    if (inView && !reduced) start();
  }, [inView, reduced, start]);

  useEffect(() => {
    if (cardsRef && cardsInView) depart();
  }, [cardsRef, cardsInView, depart]);

  const puff = useCallback((x: number, y: number) => {
    const id = poofId.current++;
    setPoofs((p) => [...p, { id, x, y, v: (id % 3) as 0 | 1 | 2 }]);
    setTimeout(() => setPoofs((p) => p.filter((q) => q.id !== id)), 450);
  }, []);

  // fire a puff for each clone as it appears / departs
  useEffect(() => {
    if (phase === 'clones') {
      seats.forEach((s, i) =>
        setTimeout(() => puff(s.cx, s.bottom - CLONES[i].height / 2), i * TIMELINE.poofStagger)
      );
    }
    if (phase === 'departing') {
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
    phase === 'clones' || phase === 'thumbsUp' || phase === 'runOut' || phase === 'settled';

  // original stands on top of the first word's letters
  const origin = seats.length
    ? { x: (seats[0].x + seats[1].x) / 2 + 40, y: Math.min(...seats.map((s) => s.bottom)) - 14 }
    : null;

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <div
        ref={layerRef}
        aria-hidden
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 5 }}
      >
        {origin && <Naruto phase={phase} x={origin.x} y={origin.y} />}
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
    </div>
  );
}
