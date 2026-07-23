"use client";

import { motion } from "motion/react";
import type { TargetAndTransition } from "motion/react";
import type { CloneConfig } from "@/lib/narutoSprites";

interface CloneProps {
  config: CloneConfig;
  x: number;
  y: number;
  index: number;
  departDelay?: number;
}

const idleAnimations: Record<CloneConfig["pose"], TargetAndTransition> = {
  sit:   { rotate: [-1.2, 1.2] },
  hang:  { rotate: [-2.8, 2.8] },
  lean:  { scaleY: [1, 1.015] },
  point: { rotate: [0, 3, 0] },
  stand: { y: [0, -2, 0] },
  cheer: { rotate: [-4, 4] },
  wave:  { rotate: [0, 6, 0] },
  peace: { y: [0, -3, 0] },
};

export function Clone({ config, x, y, index, departDelay = 0 }: CloneProps) {
  const isHang = config.pose === "hang";
  const appearDelay = index * 0.15;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        willChange: "transform",
        transformOrigin: isHang ? "50% 6%" : "50% 100%",
      }}
      initial={isHang ? { opacity: 0, y: -6 } : { opacity: 0, y: 6, scale: 0.65 }}
      animate={isHang ? { opacity: 1, y: 0 } : { opacity: 1, y: [6, -8, 0], scale: [0.65, 1.05, 1] }}
      exit={{ opacity: 0, scale: 0.5, y: 4, transition: { duration: 0.2, ease: [0.5, 0, 0.8, 0.4], delay: departDelay } }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: appearDelay }}
    >
      <motion.img
        src={config.sprite}
        alt=""
        aria-hidden
        style={{
          display: "block",
          height: config.height,
          rotate: config.tilt ?? 0,
          transformOrigin: isHang ? "50% 6%" : "50% 20%",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,.30))",
        }}
        animate={idleAnimations[config.pose]}
        transition={{
          duration: 2.2 + index * 0.3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: appearDelay + 0.3,
        }}
      />
    </motion.div>
  );
}
