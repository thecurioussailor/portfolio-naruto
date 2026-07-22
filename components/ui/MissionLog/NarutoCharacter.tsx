"use client";

import { motion } from "motion/react";
import { useRunCycle } from "@/hooks/useRunCycle";
import { NarutoSprites } from "@/lib/narutoSprites";
import type { ScenePhase } from "@/hooks/useShadowClone";

interface NarutoProps {
  phase: ScenePhase;
  x: number;
  y: number;
  height?: number;
}

const RUN_DISTANCE  = 200;
const EXIT_DISTANCE = 180;

function spriteFor(phase: ScenePhase): string {
  switch (phase) {
    case "landed":   return NarutoSprites.jump.land;
    case "grin":     return NarutoSprites.idle.grin;
    case "handSign": return NarutoSprites.shadowClone.handSign;
    case "clones":   return NarutoSprites.shadowClone.handSign;
    case "thumbsUp": return NarutoSprites.interaction.thumbsUp;
    default:         return NarutoSprites.idle.idle;
  }
}

/** The original: runs in, performs the shadow-clone jutsu, thumbs-up, runs out. */
export function NarutoCharacter({ phase, x, y, height = 80 }: NarutoProps) {
  const running = phase === "running" || phase === "runOut";
  const runFrame = useRunCycle(running);
  const visible =
    phase !== "idle" && phase !== "leaf" &&
    phase !== "settled" && phase !== "departing" && phase !== "done";

  if (!visible) return null;

  const src = running ? runFrame : spriteFor(phase);

  return (
    <motion.div
      style={{ position: "absolute", left: x, top: y - height, willChange: "transform" }}
      initial={{ x: -RUN_DISTANCE, opacity: 0 }}
      animate={
        phase === "runOut"
          ? { x: EXIT_DISTANCE, opacity: [1, 1, 0] }
          : { x: 0, opacity: 1 }
      }
      transition={
        phase === "runOut"
          ? { duration: 0.62, ease: [0.5, 0.05, 0.55, 0.95], opacity: { times: [0, 0.85, 1], duration: 0.72 } }
          : { duration: 1, ease: [0.45, 0.05, 0.25, 1] }
      }
    >
      <motion.img
        src={src}
        alt=""
        aria-hidden
        style={{ height, transformOrigin: "50% 85%", filter: "drop-shadow(0 4px 6px rgba(0,0,0,.35))" }}
        animate={
          phase === "landed"
            ? { rotate: [0, -7, -7, 7, 7, 0], x: [0, -2, -2, 2, 2, 0] }
            : phase === "thumbsUp"
            ? { rotate: [0, 4, 0], y: [0, 1.5, 0] }
            : { rotate: 0, x: 0, y: 0 }
        }
        transition={
          phase === "landed"
            ? { duration: 0.95, times: [0, 0.2, 0.45, 0.62, 0.88, 1], ease: "easeInOut", delay: 0.35 }
            : { duration: 0.48, ease: [0.22, 1, 0.36, 1] }
        }
      />
    </motion.div>
  );
}
