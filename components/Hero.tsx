"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/Reveal";

const techBadges = ["AI", "Cloud", "Blockchain", "Automation", "SaaS"];
const words = ["AI Systems", "Cloud Infra", "Blockchain", "SaaS Platforms"];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);
  return reduced;
}

function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span className="word-swap">
      <span key={words[index]} className="gradient-text word-swap-inner">
        {words[reduced ? 0 : index]}
      </span>
    </span>
  );
}

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
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
      const count = Math.max(8, Math.floor((canvas.width * canvas.height) / 18000));
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
    const onResize = () => { resize(); initNodes(); };

    resize(); initNodes();
    window.addEventListener("resize", onResize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(0,212,255,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      nodes.forEach((node) => {
        node.x += node.vx; node.y += node.vy; node.pulse += 0.02;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        const alpha = 0.3 + 0.3 * Math.sin(node.pulse);
        const r = 2 + Math.sin(node.pulse);
        const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
        g.addColorStop(0, `rgba(0,212,255,${alpha})`);
        g.addColorStop(1, "rgba(0,212,255,0)");
        ctx.beginPath(); ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,${alpha})`; ctx.fill();
      });
      nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 120) * 0.15})`; ctx.stroke();
        }
      }));
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

export default function Hero() {
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
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,212,255,0.06) 0%, rgba(123,97,255,0.04) 40%, transparent 70%)" }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-20 flex flex-col items-center text-center gap-5 sm:gap-6">
        <Reveal immediate delay={0} duration={0.6} distance={20}>
          <Badge variant="cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse flex-shrink-0" />
            Now accepting new projects for Q3 2026
          </Badge>
        </Reveal>

        <Reveal
          as="h1"
          immediate
          delay={0.1}
          duration={0.6}
          distance={24}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.08] tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          We Build{" "}
          <span className="gradient-text">What&apos;s Next</span>
        </Reveal>

        <Reveal
          as="p"
          immediate
          delay={0.2}
          duration={0.6}
          distance={20}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#8892A4]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          aria-live="polite"
        >
          Specializing in <AnimatedWord />
        </Reveal>

        <Reveal
          as="p"
          immediate
          delay={0.3}
          duration={0.6}
          distance={20}
          className="text-sm sm:text-base lg:text-lg text-[#8892A4] max-w-xl sm:max-w-2xl leading-relaxed"
        >
          AI systems, cloud architectures, blockchain protocols, and SaaS
          platforms — engineered for scale. We partner with ambitious teams to
          turn complex ideas into production-grade reality.
        </Reveal>

        <Reveal immediate delay={0.4} duration={0.6} distance={20} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => document.querySelector("#cta")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Start a project with Devexec Strategy"
          >
            Start a Project
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto"
            onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="View our work and services"
          >
            <Play size={16} aria-hidden="true" />
            View Our Work
          </Button>
        </Reveal>

        <Reveal
          immediate
          delay={0.5}
          duration={0.6}
          distance={16}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
          aria-label="Technology focus areas"
        >
          {techBadges.map((badge, i) => (
            <Badge key={badge} variant={i % 2 === 0 ? "cyan" : "violet"}>
              {badge}
            </Badge>
          ))}
        </Reveal>
      </div>

      <Reveal
        immediate
        delay={1.2}
        duration={0.5}
        distance={8}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[#8892A4] tracking-widest uppercase font-mono" aria-hidden="true">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#00D4FF] to-transparent" aria-hidden="true" />
      </Reveal>
    </section>
  );
}
