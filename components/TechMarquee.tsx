"use client";

import { useReducedMotion } from "framer-motion";

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
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1E2230] bg-[#0F1117] text-[#8892A4] text-sm font-mono whitespace-nowrap hover:border-[#00D4FF]/40 hover:text-[#F0F4FF] transition-colors duration-200 mx-2"
      aria-hidden="true"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]/50" />
      {name}
    </span>
  );
}

export default function TechMarquee() {
  const prefersReduced = useReducedMotion();

  // Duplicate items for seamless loop
  const doubled = [...techItems, ...techItems];

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

      {/* Screen-reader accessible list */}
      <ul className="sr-only" aria-label="Technology stack">
        {techItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* Visual marquee */}
      <div
        className="relative"
        aria-hidden="true"
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#0F1117] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#0F1117] to-transparent" />

        <div
          className={`flex ${prefersReduced ? "" : "animate-marquee"}`}
          style={{ width: "max-content" }}
        >
          {doubled.map((item, i) => (
            <TechBadge key={`${item}-${i}`} name={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
