"use client";

import type { Transition, ViewportOptions } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";
import { useMotionSafe } from "@/hooks/useMotionSafe";

export const motionEase = [0.25, 0.46, 0.45, 0.94] as const;

const defaultViewport: ViewportOptions = { once: true, amount: 0 };

type FadeUpOptions = {
  delay?: number;
  duration?: number;
  distance?: number;
  axis?: "y" | "x";
  /** Hero / above-fold: animate on mount. Default: whileInView on scroll. */
  onMount?: boolean;
  viewport?: ViewportOptions;
};

/**
 * Transform-only entrance props. Opacity stays 1 so content is never stuck
 * invisible when reduced-motion is on or Framer Motion skips the animation.
 */
export function useFadeUpProps({
  delay = 0,
  duration = 0.5,
  distance = 24,
  axis = "y",
  onMount = false,
  viewport = defaultViewport,
}: FadeUpOptions = {}) {
  const mounted = useMounted();
  const reduced = useMotionSafe();

  const hidden = { [axis]: reduced ? 0 : distance };
  const visible = { [axis]: 0 };
  const transition: Transition = {
    duration: reduced ? 0 : duration,
    delay: reduced ? 0 : delay,
    ease: motionEase,
  };

  const style = { opacity: 1 };

  if (!mounted) {
    return { style, initial: false as const };
  }

  if (onMount) {
    return { style, initial: hidden, animate: visible, transition };
  }

  return {
    style,
    initial: hidden,
    whileInView: visible,
    viewport,
    transition,
  };
}
