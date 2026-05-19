"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const techBadges = ["AI", "Cloud", "Blockchain", "Automation", "SaaS"];
const words = ["AI Systems", "Cloud Infra", "Blockchain", "SaaS Platforms"];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [prefersReduced]);

  if (prefersReduced) {
    return <span className="gradient-text">{words[0]}</span>;
  }

  return (
    <span className="relative inline-block overflow-hidden h-[1.2em] align-bottom min-w-[200px]">
      <motion.span
        key={index}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="gradient-text inline-block"
      >
        {words[index]}
      </motion.span>
    </span>
  );
}

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const nodes: { x: number; y: number; vx: number; vy: number; pulse: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initNodes = () => {
      nodes.length = 0;
      const count = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const onResize = () => {
      resize();
      initNodes();
    };

    resize();
    initNodes();
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      ctx.strokeStyle = "rgba(0, 212, 255, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.02;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const alpha = 0.3 + 0.3 * Math.sin(node.pulse);
        const radius = 2 + Math.sin(node.pulse) * 1;
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 4);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
        gradient.addColorStop(1, "rgba(0, 212, 255, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.fill();
      });

      // Connections
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const motionProps = prefersReduced
    ? {}
    : { variants: containerVariants, initial: "hidden" as const, animate: "visible" as const };

  const itemProps = prefersReduced ? {} : { variants: itemVariants };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0C10]"
      aria-label="Hero section"
    >
      <div className="absolute inset-0">
        <GridBackground />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.06) 0%, rgba(123,97,255,0.04) 40%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <motion.div
          {...motionProps}
          className="flex flex-col items-center gap-6"
        >
          <motion.div {...itemProps}>
            <Badge variant="cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
              Now accepting new projects for Q3 2025
            </Badge>
          </motion.div>

          <motion.h1
            {...itemProps}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight max-w-5xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            We Build{" "}
            <span className="gradient-text">What&apos;s Next</span>
          </motion.h1>

          <motion.div
            {...itemProps}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#8892A4]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            aria-live="polite"
          >
            Specializing in <AnimatedWord />
          </motion.div>

          <motion.p
            {...itemProps}
            className="text-base sm:text-lg text-[#8892A4] max-w-2xl leading-relaxed"
          >
            AI systems, cloud architectures, blockchain protocols, and SaaS
            platforms — engineered for scale. We partner with ambitious teams to
            turn complex ideas into production-grade reality.
          </motion.p>

          <motion.div
            {...itemProps}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Button
              size="lg"
              onClick={() =>
                document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="Start a project with Devexec Strategy"
            >
              Start a Project
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() =>
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label="View our work and services"
            >
              <Play size={16} aria-hidden="true" />
              View Our Work
            </Button>
          </motion.div>

          <motion.div
            {...itemProps}
            className="flex flex-wrap justify-center gap-3 mt-4"
            aria-label="Technology focus areas"
          >
            {techBadges.map((badge, i) => (
              <motion.div
                key={badge}
                initial={prefersReduced ? undefined : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
              >
                <Badge variant={i % 2 === 0 ? "cyan" : "violet"}>{badge}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-[#8892A4] tracking-widest uppercase font-mono">
            Scroll
          </span>
          <motion.div
            animate={prefersReduced ? undefined : { y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8 bg-gradient-to-b from-[#00D4FF] to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
