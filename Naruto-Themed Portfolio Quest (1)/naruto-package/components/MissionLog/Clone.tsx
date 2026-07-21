'use client';

import { motion } from 'framer-motion';
import type { CloneConfig } from '../../lib/narutoSprites';

interface CloneProps {
  config: CloneConfig;
  /** Seat position (px, relative to the scene layer) — computed by ShadowCloneScene */
  x: number;
  y: number;
  index: number;
}

const idleAnimations: Record<CloneConfig['pose'], object> = {
  sit: { rotate: [-1.2, 1.2] },          // relaxed leg sway
  hang: { rotate: [-2.8, 2.8] },         // pendulum swing (origin at the grip)
  lean: { scaleY: [1, 1.015] },          // just breathing
  point: { rotate: [0, 3, 0] },          // occasional tilt toward the cards
};

/** One shadow clone: pops from smoke, tiny hop, squash-settle, then idles. */
export function Clone({ config, x, y, index }: CloneProps) {
  const isHang = config.pose === 'hang';
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        willChange: 'transform',
        transformOrigin: isHang ? '50% 6%' : '50% 100%',
      }}
      initial={
        isHang
          ? { opacity: 0, y: -6 }
          : { opacity: 0, y: 4, scale: 0.7 }
      }
      animate={
        isHang
          ? { opacity: 1, y: 0 }
          : { opacity: 1, y: [4, -9, 0], scale: [0.7, 1.02, 1] }
      }
      exit={{ opacity: 0, scale: 0.55, y: 3, transition: { duration: 0.19, ease: [0.5, 0, 0.8, 0.4] } }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={config.sprite}
        alt=""
        aria-hidden
        style={{
          display: 'block',
          height: config.height,
          rotate: config.tilt ?? 0,
          transformOrigin: isHang ? '50% 6%' : '50% 20%',
          filter: 'drop-shadow(0 4px 6px rgba(0,0,0,.35))',
        }}
        animate={idleAnimations[config.pose]}
        transition={{
          duration: 2.4 + index * 0.2,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
          delay: 0.4,
        }}
      />
    </motion.div>
  );
}
