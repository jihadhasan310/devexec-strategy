"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  distance?: number;
  axis?: "y" | "x";
  /** Play on mount (hero). Default: when scrolled into view. */
  immediate?: boolean;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-live"?: "off" | "polite" | "assertive";
};

/**
 * CSS + IntersectionObserver entrances — reliable on iOS Safari and Android.
 * Opacity is always 1; only transform animates.
 */
export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  style,
  delay = 0,
  duration = 0.6,
  distance = 24,
  axis = "y",
  immediate = false,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("is-visible");

    if (immediate) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(show);
      });
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );

    io.observe(el);

    // Already in viewport on first paint (common on mobile)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      show();
    }

    return () => io.disconnect();
  }, [immediate]);

  const axisClass = axis === "x" ? "reveal-x" : "reveal";
  const cssVars = {
    "--reveal-delay": `${delay}s`,
    "--reveal-duration": `${duration}s`,
    "--reveal-distance": `${distance}px`,
  } as CSSProperties;

  return (
    <Tag
      ref={ref}
      className={`${axisClass} ${className}`.trim()}
      style={{ ...cssVars, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
