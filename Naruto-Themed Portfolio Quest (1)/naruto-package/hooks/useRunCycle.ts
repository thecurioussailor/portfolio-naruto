'use client';

import { useEffect, useRef, useState } from 'react';
import { NarutoSprites } from '../lib/narutoSprites';

/**
 * Cycles through the 4 run frames at ~12fps while `running` is true.
 * Returns the current frame src. Frames are preloaded on first mount.
 */
export function useRunCycle(running: boolean, fps = 12): string {
  const [frame, setFrame] = useState(0);
  const raf = useRef<number>(0);
  const last = useRef<number>(0);

  useEffect(() => {
    NarutoSprites.run.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = 1000 / fps;
    const tick = (t: number) => {
      if (t - last.current >= interval) {
        last.current = t;
        setFrame((f) => (f + 1) % NarutoSprites.run.length);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running, fps]);

  return NarutoSprites.run[frame];
}
