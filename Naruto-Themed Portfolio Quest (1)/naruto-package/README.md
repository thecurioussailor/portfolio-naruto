# Naruto Shadow-Clone Scene — production package

Sprite pipeline output + reusable Next.js (App Router) / TypeScript / Framer Motion implementation
of the Mission Log shadow-clone interaction.

## 1. What's here

```
public/naruto/          37 transparent PNGs, cut from the two approved sheets
  run/                  4-frame run cycle (run-01 → run-04, ~12fps)
  jump/                 jump-start, jump-mid, jump-land (landing crouch)
  idle/                 idle, grin, look, thinking, laugh
  sit/                  sit-edge, sit-knee, sit-cross, sit-lean, lean, hang, lying, sleep
  interaction/          point, point-walk, thumbs-up, cheer, scroll, peek, wave, peace, salute, kunai, ramen
  shadow-clone/         hand-sign, hand-sign-alt, arms-crossed
  effects/              smoke-01/-02/-03 (same artwork; 02 mirrored, 03 rotated)
lib/narutoSprites.ts    sprite registry + CLONES seat config + TIMELINE (single source of truth)
hooks/useRunCycle.ts    rAF-driven 4-frame run cycle (preloads frames)
hooks/useShadowClone.ts scene state machine (phases advance on TIMELINE)
components/MissionLog/
  MissionHeading.tsx    per-letter <h2> (each letter is a measurable span)
  ShadowCloneScene.tsx  orchestrator: measuring, phases, smoke, mount/unmount
  Naruto.tsx            the original (run in → look → sign → thumbs-up → run out)
  Clone.tsx             one clone (pop, hop, squash-settle, pose-specific idle)
  Smoke.tsx             one quick POOF
```

## 2. How the pieces connect

1. `ShadowCloneScene` wraps `MissionHeading` and an absolutely-positioned
   scene layer. `useInView` (amount 0.5, once) calls `start()`.
2. `useShadowClone` is a timer-driven state machine. It emits `phase`
   (`leaf → running → landed → grin → handSign → clones → thumbsUp → runOut → settled → departing`).
   All timings come from `TIMELINE` in `narutoSprites.ts` — tune the whole scene in one place.
3. `measureSeat()` reads each letter's `getBoundingClientRect` and converts the
   `CLONES` config (letter index, glyph-top fraction, overlap, dx) into pixel seats.
   Re-measured on resize.
4. `Naruto` swaps sprites by phase; while `running`/`runOut`, `useRunCycle`
   drives the 4-frame cycle at 12fps on a rAF (no setInterval drift).
5. `Clone` mounts inside `AnimatePresence` when phase reaches `clones` —
   pop-out-of-smoke keyframes (hop → soft landing → squash-settle, 200ms),
   then an infinite pose-specific idle (mirror repeat, desynced by index).
6. `Smoke` instances are fired by the scene (staggered 100ms on entry,
   random order / 150ms on departure) and self-remove after 450ms.

## 3. Drop-in usage

```tsx
// app/(sections)/missions.tsx
'use client';
import { useRef } from 'react';
import { ShadowCloneScene } from '@/components/MissionLog/ShadowCloneScene';

export function MissionsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  return (
    <section id="missions">
      <ShadowCloneScene cardsRef={cardsRef} />
      <div ref={cardsRef}>{/* project cards */}</div>
    </section>
  );
}
```

Style the heading via `.mission-heading` (font, size, color are yours — the
scene only requires `[data-letter]` spans, which `MissionHeading` provides).

## 4. Performance notes

- Transforms + opacity only; zero layout writes during the scene.
- Sprites lazy-load naturally (they mount only when the scene starts);
  run frames are explicitly preloaded by `useRunCycle`.
- `willChange: transform` on moving wrappers; drop-shadow via CSS filter
  is applied once per sprite, not animated.
- `prefers-reduced-motion`: the scene never starts; the heading still
  fades in via its own `whileInView`.
- Smoke elements are short-lived (<0.5s) and removed from the DOM.

## 5. Tuning cheatsheet

- Seat positions: `CLONES` in `lib/narutoSprites.ts` (letterIndex, height,
  glyphTop, overlap, dx, tilt).
- Timings: `TIMELINE` in the same file.
- Run speed: `fps` arg of `useRunCycle`, `RUN_DISTANCE`/`EXIT_DISTANCE` in `Naruto.tsx`.
- Idle personality: `idleAnimations` map in `Clone.tsx`.
