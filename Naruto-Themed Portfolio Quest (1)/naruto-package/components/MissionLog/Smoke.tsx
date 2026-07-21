'use client';

import { motion } from 'framer-motion';
import { NarutoSprites } from '../../lib/narutoSprites';

interface SmokeProps {
  x: number;
  y: number;
  size?: number;
  variant?: 0 | 1 | 2;
}

/** One quick POOF. Mount inside <AnimatePresence> or keyed lists. */
export function Smoke({ x, y, size = 46, variant = 0 }: SmokeProps) {
  return (
    <motion.img
      src={NarutoSprites.effects.smoke[variant]}
      alt=""
      aria-hidden
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: [0, 0.95, 0], scale: [0.4, 1, 1.18], y: [0, -2, -8] }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1], times: [0, 0.28, 1] }}
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        height: size,
        pointerEvents: 'none',
        filter: 'blur(0.5px)',
        willChange: 'transform, opacity',
      }}
    />
  );
}
