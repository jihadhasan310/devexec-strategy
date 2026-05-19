"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO",
    company: "NovaPay",
    quote:
      "Devexec Strategy rebuilt our entire payment infrastructure on AWS in 8 weeks. The architecture they designed handles 10x our previous load with 40% lower costs. Genuinely impressive engineering.",
    rating: 5,
    initials: "SC",
    color: "#00D4FF",
  },
  {
    name: "Marcus Okafor",
    role: "Founder & CEO",
    company: "ChainVault",
    quote:
      "We needed a DeFi protocol built right — secure, auditable, and gas-efficient. Devexec delivered a Solidity codebase that passed three independent audits without a single critical finding.",
    rating: 5,
    initials: "MO",
    color: "#7B61FF",
  },
  {
    name: "Priya Nair",
    role: "VP of Engineering",
    company: "Logistiq",
    quote:
      "Their automation work eliminated 60% of our manual ops overhead. The ML pipeline they built for demand forecasting is now our biggest competitive advantage. They think like owners.",
    rating: 5,
    initials: "PN",
    color: "#00D4FF",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-[#00D4FF] text-[#00D4FF]" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-[#0F1117]"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase mb-4 block">
            Client Stories
          </span>
          <h2
            id="testimonials-heading"
            className="text-4xl sm:text-5xl font-bold text-[#F0F4FF] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Trusted by{" "}
            <span className="gradient-text">Builders</span>
          </h2>
          <p className="text-[#8892A4] text-lg max-w-xl mx-auto">
            From seed-stage startups to scaling enterprises — here&apos;s what
            our clients say.
          </p>
        </motion.div>

        <div
          className="flex gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible snap-x snap-mandatory"
          role="list"
          aria-label="Client testimonials"
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={prefersReduced ? undefined : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              role="listitem"
              className="glass rounded-2xl p-6 border border-[#1E2230] hover:border-[#00D4FF]/30 transition-all duration-300 flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-auto snap-start"
            >
              <StarRating count={t.rating} />

              <blockquote className="mt-4 mb-6">
                <p className="text-[#F0F4FF] text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#0A0C10] flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #7B61FF)` }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-[#F0F4FF] text-sm font-semibold">{t.name}</div>
                  <div className="text-[#8892A4] text-xs">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
