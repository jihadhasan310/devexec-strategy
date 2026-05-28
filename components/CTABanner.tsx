"use client";

import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";

const CONTACT_EMAIL = "devexecstrategy@gmail.com";

export default function CTABanner() {
  return (
    <section id="cta" className="py-24 lg:py-32 bg-[#0A0C10]" aria-labelledby="cta-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal duration={0.6} distance={30} className="relative rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,97,255,0.15))", padding: "1px" }}>
          <div className="relative rounded-3xl p-12 lg:p-16 text-center overflow-hidden" style={{ background: "#0F1117" }}>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,212,255,0.07) 0%, rgba(123,97,255,0.05) 40%, transparent 70%)" }}
              aria-hidden="true"
            />
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)" }} aria-hidden="true" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)" }} aria-hidden="true" />

            <div className="relative z-10">
              <Reveal delay={0.2} duration={0.4} distance={12}>
                <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase mb-6 block">
                  Let&apos;s Build Together
                </span>
              </Reveal>

              <Reveal as="h2" id="cta-heading" delay={0.3} duration={0.5} distance={20} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F0F4FF] mb-6 leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Ready to build something <span className="gradient-text">extraordinary?</span>
              </Reveal>

              <Reveal as="p" delay={0.4} duration={0.5} distance={20} className="text-[#8892A4] text-lg max-w-2xl mx-auto mb-10">
                Tell us about your project. We&apos;ll respond within 24 hours with a clear path forward — no sales pitch, just honest engineering advice.
              </Reveal>

              <Reveal delay={0.5} duration={0.5} distance={20} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Let's Talk — Project Inquiry")}`}
                  aria-label="Email Devexec Strategy to start a conversation"
                >
                  Let&apos;s Talk
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Schedule a Call")}`}
                  aria-label="Email Devexec Strategy to schedule a call"
                >
                  Schedule a Call
                </Button>
              </Reveal>

              <Reveal delay={0.7} duration={0.4} distance={12} className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-[#8892A4] font-mono">
                <span>✓ Response within 24h</span>
                <span>✓ No commitment required</span>
                <span>✓ NDA available</span>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
