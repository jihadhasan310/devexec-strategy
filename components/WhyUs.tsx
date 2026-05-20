"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 12, suffix: "", label: "Countries Served" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
  { value: 4.9, suffix: "★", label: "Client Rating" },
];

function CountUp({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const prefersReduced = useMotionSafe();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target, prefersReduced]);

  const display =
    target % 1 !== 0 ? count.toFixed(1) : Math.round(count).toString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useMotionSafe();

  return (
    <section
      id="why-us"
      className="py-24 lg:py-32 bg-[#0F1117] relative overflow-hidden"
      aria-labelledby="why-us-heading"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,97,255,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Stats row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          role="list"
          aria-label="Company statistics"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReduced ? undefined : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              role="listitem"
              className="text-center"
            >
              <div
                className="text-4xl sm:text-5xl font-bold gradient-text mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={isInView}
                />
              </div>
              <div className="text-[#8892A4] text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className="w-full h-px bg-gradient-to-r from-transparent via-[#1E2230] to-transparent mb-20"
          aria-hidden="true"
        />

        {/* Philosophy */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase mb-4 block">
              Why Devexec
            </span>
            <h2
              id="why-us-heading"
              className="text-4xl sm:text-5xl font-bold text-[#F0F4FF] mb-6 leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Engineering rigor.{" "}
              <span className="gradient-text">Business impact.</span>
            </h2>
            <p className="text-[#8892A4] text-lg leading-relaxed mb-6">
              We don&apos;t just write code — we architect systems that scale,
              survive, and compound in value over time. Every engagement starts
              with deep discovery and ends with measurable outcomes.
            </p>
            <p className="text-[#8892A4] leading-relaxed">
              Our team combines the precision of enterprise engineering with the
              velocity of a startup. We&apos;ve shipped production systems across
              fintech, healthtech, logistics, and Web3 — and we bring that
              cross-domain pattern recognition to every new challenge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Security-First Engineering",
                desc: "Every system is designed with threat modeling, least-privilege access, and compliance in mind from day one.",
              },
              {
                title: "Transparent Collaboration",
                desc: "Weekly syncs, shared dashboards, and direct access to engineers — no account managers in the way.",
              },
              {
                title: "Outcome-Oriented Delivery",
                desc: "We measure success by your business metrics, not story points. Milestones tied to real impact.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={prefersReduced ? undefined : { opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                className="glass rounded-xl p-5 border border-[#1E2230] hover:border-[#00D4FF]/30 transition-colors duration-300"
              >
                <h3
                  className="text-[#F0F4FF] font-semibold mb-1.5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.title}
                </h3>
                <p className="text-[#8892A4] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
