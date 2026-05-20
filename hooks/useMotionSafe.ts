"use client";

import { useEffect, useState } from "react";

/**
 * Returns true only when the user has EXPLICITLY enabled
 * "Reduce Motion" in their OS accessibility settings.
 *
 * Defaults to false (animations ON) on first render and on
 * any device/browser that doesn't support the media query —
 * which fixes the issue where Framer Motion's useReducedMotion()
 * returns true on mobile by default (SSR safe-fallback).
 */
export function useMotionSafe(): boolean {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Set the real value after hydration
    setReduceMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduceMotion;
}
