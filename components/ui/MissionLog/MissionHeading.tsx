"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";

const WORD_GAP = "0.32em";

interface MissionHeadingProps {
  text?: string;
}

/**
 * Per-letter heading — each letter is a measurable [data-letter] span so
 * ShadowCloneScene can compute clone seat positions from the rendered glyphs.
 */
export const MissionHeading = forwardRef<HTMLHeadingElement, MissionHeadingProps>(
  function MissionHeading({ text = "Mission Log" }, ref) {
    return (
      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="mission-heading font-display text-[clamp(34px,4.4vw,56px)] font-bold text-ink"
        style={{ position: "relative" }}
      >
        {text.split("").map((ch, i) =>
          ch === " " ? (
            <span key={i} style={{ display: "inline-block", width: WORD_GAP }} />
          ) : (
            <span key={i} data-letter style={{ display: "inline-block" }}>
              {ch}
            </span>
          )
        )}
      </motion.h2>
    );
  }
);
