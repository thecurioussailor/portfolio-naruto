'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const WORD_GAP = '0.32em';

interface MissionHeadingProps {
  text?: string; // default "Mission Log"
}

/**
 * Per-letter heading. Each letter is a span so the scene can measure
 * letter rects and seat clones on the typography.
 */
export const MissionHeading = forwardRef<HTMLHeadingElement, MissionHeadingProps>(
  function MissionHeading({ text = 'Mission Log' }, ref) {
    return (
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="mission-heading"
        style={{ position: 'relative' }}
      >
        {text.split('').map((ch, i) =>
          ch === ' ' ? (
            <span key={i} style={{ display: 'inline-block', width: WORD_GAP }} />
          ) : (
            <span key={i} data-letter style={{ display: 'inline-block' }}>
              {ch}
            </span>
          )
        )}
      </motion.h2>
    );
  }
);
