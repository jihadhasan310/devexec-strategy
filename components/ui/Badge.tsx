interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "violet" | "outline";
  className?: string;
}

const variantClasses = {
  default:
    "bg-[#1E2230] text-[#8892A4] border border-[#1E2230]",
  cyan:
    "bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/30",
  violet:
    "bg-[#7B61FF]/10 text-[#7B61FF] border border-[#7B61FF]/30",
  outline:
    "bg-transparent text-[#F0F4FF] border border-[#1E2230]",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full
        text-xs font-medium font-mono tracking-wide
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
