"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const SESSION_KEY = "hl_intro_seen";

type IntroCtx = { ready: boolean };
const IntroContext = createContext<IntroCtx>({ ready: true });

export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) {
      // No intro — hero can animate immediately
      setReady(true);
    } else {
      // Intro will play; hero unblocks after overlay exit transition finishes
      // ~2.2s auto-dismiss + 0.9s exit blur = ~3.1s total, add small buffer
      const t = setTimeout(() => setReady(true), 3300);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <IntroContext.Provider value={{ ready }}>
      {children}
    </IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);
