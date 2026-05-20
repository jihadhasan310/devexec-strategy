"use client";

import { useMotionSafe } from "@/hooks/useMotionSafe";

const techItems = [
  "OpenAI",
  "AWS",
  "GCP",
  "Solidity",
  "Kubernetes",
  "Terraform",
  "FastAPI",
  "React",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Stripe",
  "TypeScript",
  "Next.js",
  "Rust",
  "GraphQL",
];

function TechBadge({ name }: { name: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1E2230] bg-[#0F1117] text-[#8892A4] text-sm font-mono whitespace-nowrap mx-2"
      aria-hidden="true"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/50 flex-shrink-0" />
      {name}
    </span>
  );
}

export default function TechMarquee() {
  const prefersReduced = useMotionSafe();

  // Triple the items so the loop is seamless even on wide screens
  const tripled = [...techItems, ...techItems, ...techItems];

  return (
    <section
      className="py-16 bg-[#0F1117] border-y border-[#1E2230] overflow-hidden"
      aria-label="Technologies we work with"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <span className="text-xs font-mono text-[#8892A4] tracking-widest uppercase">
          Technologies We Work With
        </span>
      </div>

      {/* Accessible list for screen readers */}
      <ul className="sr-only" aria-label="Technology stack">
        {techItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* Visual marquee — pure CSS, no JS animation library */}
      <div className="relative" aria-hidden="true">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-r from-[#0F1117] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none bg-gradient-to-l from-[#0F1117] to-transparent" />

        {/* The track — CSS animation only, no Framer Motion */}
        <div
          className="flex"
          style={{
            width: "max-content",
            animation: prefersReduced
              ? "none"
              : "marquee-scroll 35s linear infinite",
            willChange: "transform",
          }}
        >
          {tripled.map((item, i) => (
            <TechBadge key={`${item}-${i}`} name={item} />
          ))}
        </div>
      </div>

      {/* Keyframe injected as a style tag — works on all browsers including mobile */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
}
