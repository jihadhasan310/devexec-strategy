"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into your goals, constraints, and technical landscape to define the right problem.",
    color: "#00D4FF",
  },
  {
    number: "02",
    title: "Architecture",
    description: "Design scalable, secure system blueprints with clear trade-off analysis and tech selection.",
    color: "#3BBFFF",
  },
  {
    number: "03",
    title: "Build",
    description: "Iterative development with weekly demos, automated testing, and continuous integration.",
    color: "#5D8EFF",
  },
  {
    number: "04",
    title: "Deploy",
    description: "Zero-downtime production releases with full observability, alerting, and rollback capability.",
    color: "#6E7AFF",
  },
  {
    number: "05",
    title: "Scale",
    description: "Performance optimization, capacity planning, and ongoing engineering support as you grow.",
    color: "#7B61FF",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="process"
      className="py-24 lg:py-32 bg-[#0A0C10]"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase mb-4 block">
            Our Process
          </span>
          <h2
            id="process-heading"
            className="text-4xl sm:text-5xl font-bold text-[#F0F4FF] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            How We{" "}
            <span className="gradient-text">Execute</span>
          </h2>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            A proven five-phase framework that takes ideas from whiteboard to
            production — with full transparency at every step.
          </p>
        </motion.div>

        {/* Desktop: horizontal steps */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-0 right-0 h-px" aria-hidden="true">
              <motion.div
                initial={prefersReduced ? undefined : { scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : undefined}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full origin-left"
                style={{ background: "linear-gradient(90deg, #00D4FF, #7B61FF)" }}
              />
            </div>

            <div className="grid grid-cols-5 gap-4" role="list" aria-label="Process steps">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={prefersReduced ? undefined : { opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                  role="listitem"
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 border-2"
                    style={{
                      borderColor: step.color,
                      background: `${step.color}15`,
                      boxShadow: `0 0 20px ${step.color}30`,
                    }}
                    aria-hidden="true"
                  >
                    <span className="text-sm font-bold font-mono" style={{ color: step.color }}>
                      {step.number}
                    </span>
                  </div>
                  <h3
                    className="text-[#F0F4FF] font-semibold text-base mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical steps */}
        <div className="lg:hidden">
          <div className="relative pl-8" role="list" aria-label="Process steps">
            <div className="absolute left-3.5 top-0 bottom-0 w-px" aria-hidden="true">
              <motion.div
                initial={prefersReduced ? undefined : { scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : undefined}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full w-full origin-top"
                style={{ background: "linear-gradient(180deg, #00D4FF, #7B61FF)" }}
              />
            </div>

            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={prefersReduced ? undefined : { opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : undefined}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                role="listitem"
                className="relative mb-10 last:mb-0"
              >
                <div
                  className="absolute -left-8 w-7 h-7 rounded-full flex items-center justify-center border"
                  style={{ borderColor: step.color, background: `${step.color}15` }}
                  aria-hidden="true"
                >
                  <span className="text-xs font-bold font-mono" style={{ color: step.color }}>
                    {i + 1}
                  </span>
                </div>
                <div className="glass rounded-xl p-5 border border-[#1E2230]">
                  <h3
                    className="text-[#F0F4FF] font-semibold mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
