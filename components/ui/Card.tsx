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
    <div
      className={`
        glass rounded-2xl p-6
        border border-[#1E2230]
        transition-all duration-300
        hover:-translate-y-1
        ${hoverable ? glowHover : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
