"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SESSION_KEY = "hl_intro_seen";

function DriftingLeaf() {
  return (
    <motion.svg
      width="28"
      height="36"
      viewBox="0 0 28 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, y: -20, rotate: -15 }}
      animate={{
        opacity: [0, 0.85, 0.85, 0],
        y: [-20, 60],
        rotate: [-15, 18, -8, 22],
        x: [0, 14, -8, 18],
      }}
      transition={{
        duration: 1.8,
        ease: "easeInOut",
        times: [0, 0.15, 0.75, 1],
      }}
    >
      <path
        d="M14 2C14 2 26 10 24 22C22 32 14 34 14 34C14 34 6 32 4 22C2 10 14 2 14 2Z"
        fill="#8aab6e"
        fillOpacity="0.75"
      />
      <path
        d="M14 2C14 2 14 34 14 34"
        stroke="#6a8a50"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
    </motion.svg>
  );
}

type Props = { onDone: () => void };

export default function IntroOverlay({ onDone }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    } else {
      onDone();
    }
  }, [onDone]);

  useEffect(() => {
    if (!visible) return;

    const dismiss = () => setVisible(false);

    const timer = setTimeout(dismiss, 1600);
    window.addEventListener("click", dismiss);
    window.addEventListener("keydown", dismiss);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", dismiss);
      window.removeEventListener("keydown", dismiss);
    };
  }, [visible]);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)", scale: 1.03 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 40%, #f0e8d5 0%, #e8dcc6 55%, #ddd0b6 100%)",
          }}
        >
          {/* Paper texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
              opacity: 0.6,
            }}
          />

          {/* Soft vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, transparent 40%, rgba(180,160,120,0.18) 100%)",
            }}
          />

          <div className="mb-8">
            <DriftingLeaf />
          </div>

          <motion.p
            className="font-display text-center text-[clamp(18px,2.4vw,26px)] font-semibold tracking-[0.08em] text-[#3a2e1e]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
          >
            Every journey begins with curiosity.
          </motion.p>

          <motion.p
            className="font-display mt-3 text-center text-[clamp(12px,1.3vw,15px)] tracking-[0.2em] text-[#7a6a50]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
          >
            The Hidden Leaf Village awaits.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
