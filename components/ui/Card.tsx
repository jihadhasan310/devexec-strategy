"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet";
  hoverable?: boolean;
}

export default function Card({
  children,
  className = "",
  glowColor = "cyan",
  hoverable = true,
}: CardProps) {
  const glowHover =
    glowColor === "cyan"
      ? "hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] hover:border-[#00D4FF]/40"
      : "hover:shadow-[0_0_30px_rgba(123,97,255,0.15)] hover:border-[#7B61FF]/40";

  return (
    <motion.div
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      className={`
        glass rounded-2xl p-6
        border border-[#1E2230]
        transition-all duration-300
        ${hoverable ? glowHover : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
