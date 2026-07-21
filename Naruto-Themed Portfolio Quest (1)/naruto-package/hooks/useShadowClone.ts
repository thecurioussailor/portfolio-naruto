'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TIMELINE } from '../lib/narutoSprites';

export type ScenePhase =
  | 'idle'        // nothing yet
  | 'leaf'        // leaf drifting
  | 'running'     // original runs in
  | 'landed'      // stops + looks around
  | 'grin'
  | 'handSign'
  | 'clones'      // clones popping in
  | 'thumbsUp'
  | 'runOut'      // original leaves
  | 'settled'     // clones idle alone
  | 'departing'   // clones poofing away
  | 'done';

/**
 * Scene state machine. Call `start()` once (whileInView) and the phases
 * advance on the shared TIMELINE. `depart()` can be called early (e.g. when
 * the visitor scrolls into the project cards).
 */
export function useShadowClone() {
  const [phase, setPhase] = useState<ScenePhase>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const started = useRef(false);

  const at = (fn: () => void, ms: number) =>
    timers.current.push(setTimeout(fn, ms));

  const depart = useCallback(() => {
    setPhase((p) =>
      p === 'departing' || p === 'done' || p === 'idle' ? p : 'departing'
    );
  }, []);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    at(() => setPhase('leaf'), TIMELINE.leafDrift);
    at(() => setPhase('running'), TIMELINE.runIn);
    at(() => setPhase('landed'), TIMELINE.runIn + TIMELINE.runDuration);
    at(() => setPhase('grin'), TIMELINE.grin);
    at(() => setPhase('handSign'), TIMELINE.handSign);
    at(() => setPhase('clones'), TIMELINE.firstPoof);
    at(() => setPhase('thumbsUp'), TIMELINE.thumbsUp);
    at(() => setPhase('runOut'), TIMELINE.runOut);
    at(() => setPhase('settled'), TIMELINE.runOut + 800);
    at(depart, TIMELINE.cloneDepart);
  }, [depart]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return { phase, start, depart };
}
