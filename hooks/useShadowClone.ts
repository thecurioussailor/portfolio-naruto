"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TIMELINE } from "@/lib/narutoSprites";

export type ScenePhase =
  | "idle"
  | "leaf"
  | "running"
  | "landed"
  | "grin"
  | "handSign"
  | "clones"
  | "thumbsUp"
  | "runOut"
  | "settled"
  | "departing"
  | "done";

/**
 * Scene state machine. Call `start()` once (on inView) and phases advance
 * on the shared TIMELINE. `depart()` can be triggered early when the visitor
 * scrolls into the project cards.
 */
export function useShadowClone() {
  const [phase, setPhase] = useState<ScenePhase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const started = useRef(false);

  const at = (fn: () => void, ms: number) =>
    timers.current.push(setTimeout(fn, ms));

  const depart = useCallback(() => {
    setPhase((p) =>
      p === "departing" || p === "done" || p === "idle" ? p : "departing"
    );
  }, []);

  const start = useCallback(() => {
    if (started.current) return;
    started.current = true;
    at(() => setPhase("leaf"),      TIMELINE.leafDrift);
    at(() => setPhase("running"),   TIMELINE.runIn);
    at(() => setPhase("landed"),    TIMELINE.runIn + TIMELINE.runDuration);
    at(() => setPhase("grin"),      TIMELINE.grin);
    at(() => setPhase("handSign"),  TIMELINE.handSign);
    at(() => setPhase("clones"),    TIMELINE.firstPoof);
    at(() => setPhase("thumbsUp"),  TIMELINE.thumbsUp);
    at(() => setPhase("runOut"),    TIMELINE.runOut);
    at(() => setPhase("settled"),   TIMELINE.runOut + 800);
    at(depart,                      TIMELINE.cloneDepart);
  }, [depart]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return { phase, start, depart };
}
