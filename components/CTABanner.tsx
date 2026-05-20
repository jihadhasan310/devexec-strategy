"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useMotionSafe } from "@/hooks/useMotionSafe";

export default function CTABanner() {
  const prefersReduced = useMotionSafe();

  return (
    <section id="cta" className="py-24 lg:py-32 bg-[#0A0C10]" aria-labelledby="cta-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReduced ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.6 }}
          className="relative rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,97,255,0.15))", padding: "1px" }}
        >
          <div className="relative rounded-3xl p-12 lg:p-16 text-center overflow-hidden" style={{ background: "#0F1117" }}>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.07) 0%, rgba(123,97,255,0.05) 40%, transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)" }} aria-hidden="true" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)" }} aria-hidden="true" />

            <div className="relative z-10">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReduced ? 0 : 0.2 }}
                className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase mb-6 block"
              >
                Let&apos;s Build Together
              </motion.span>

              <motion.h2
                id="cta-heading"
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReduced ? 0 : 0.3, duration: prefersReduced ? 0 : 0.5 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0F4FF] mb-6 leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ready to build something <span className="gradient-text">extraordinary?</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReduced ? 0 : 0.4, duration: prefersReduced ? 0 : 0.5 }}
                className="text-[#8892A4] text-lg max-w-2xl mx-auto mb-10"
              >
                Tell us about your project. We&apos;ll respond within 24 hours with a clear path forward — no sales pitch, just honest engineering advice.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: prefersReduced ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReduced ? 0 : 0.5, duration: prefersReduced ? 0 : 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button size="lg" aria-label="Start a conversation with Devexec Strategy">
                  Let&apos;s Talk
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <Button size="lg" variant="ghost" aria-label="Schedule a discovery call">
                  Schedule a Call
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReduced ? 0 : 0.7 }}
                className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-[#8892A4] font-mono"
              >
                <span>✓ Response within 24h</span>
                <span>✓ No commitment required</span>
                <span>✓ NDA available</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
