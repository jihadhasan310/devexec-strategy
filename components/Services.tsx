"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Bot, Cloud, Link2, Cog, Rocket } from "lucide-react";
import Card from "@/components/ui/Card";
import { useMotionSafe } from "@/hooks/useMotionSafe";

const services = [
  {
    icon: Bot,
    title: "AI & Machine Learning",
    description:
      "Custom LLM integrations, ML pipelines, and autonomous AI agents built for production. From fine-tuning foundation models to deploying real-time inference at scale.",
    tags: ["LLMs", "ML Pipelines", "AI Agents"],
    color: "cyan" as const,
    gradient: "from-[#00D4FF]/20 to-transparent",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "AWS, GCP, and Azure architecture designed for reliability and cost efficiency. Full DevOps lifecycle — IaC, CI/CD, observability, and zero-downtime deployments.",
    tags: ["AWS", "GCP", "Azure", "Kubernetes"],
    color: "violet" as const,
    gradient: "from-[#7B61FF]/20 to-transparent",
  },
  {
    icon: Link2,
    title: "Blockchain & Web3",
    description:
      "Smart contracts, DeFi protocols, and NFT platforms built with security-first engineering. Solidity, Rust, and cross-chain architecture for the decentralized web.",
    tags: ["Solidity", "DeFi", "NFT", "Web3"],
    color: "cyan" as const,
    gradient: "from-[#00D4FF]/20 to-transparent",
  },
  {
    icon: Cog,
    title: "Automation & RPA",
    description:
      "End-to-end process automation, workflow orchestration, and API integrations that eliminate manual overhead and unlock operational velocity.",
    tags: ["RPA", "Workflows", "APIs", "Zapier"],
    color: "violet" as const,
    gradient: "from-[#7B61FF]/20 to-transparent",
  },
  {
    icon: Rocket,
    title: "SaaS Development",
    description:
      "Full-stack product engineering from MVP to enterprise scale. Multi-tenant architecture, billing integrations, and the technical foundation to grow without limits.",
    tags: ["MVPs", "Multi-tenant", "Stripe", "Scale"],
    color: "cyan" as const,
    gradient: "from-[#00D4FF]/20 to-transparent",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useMotionSafe();

  return (
    <section
      id="services"
      className="py-24 lg:py-32 bg-[#0A0C10]"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={prefersReduced ? undefined : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <span className="text-xs font-mono text-[#00D4FF] tracking-widest uppercase mb-4 block">
            Our Expertise
          </span>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-bold text-[#F0F4FF] mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            What We{" "}
            <span className="gradient-text">Do</span>
          </h2>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Five core disciplines. One unified team. Built to handle the full
            complexity of modern technology products.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={prefersReduced ? undefined : containerVariants}
          initial={prefersReduced ? undefined : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Services offered by Devexec Strategy"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={prefersReduced ? undefined : cardVariants}
                role="listitem"
                className={service.title === "SaaS Development" ? "md:col-span-2 lg:col-span-1" : ""}
              >
                <Card glowColor={service.color} className="h-full group">
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center mb-5
                      bg-gradient-to-br ${service.gradient}
                      border border-[#1E2230] group-hover:border-current
                      transition-all duration-300
                      ${service.color === "cyan" ? "text-[#00D4FF]" : "text-[#7B61FF]"}
                    `}
                    aria-hidden="true"
                  >
                    <Icon size={22} />
                  </div>

                  <h3
                    className="text-lg font-semibold text-[#F0F4FF] mb-3"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2" aria-label={`Technologies for ${service.title}`}>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#1E2230] text-[#8892A4] border border-[#1E2230]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
