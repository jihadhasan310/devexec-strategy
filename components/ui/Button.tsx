"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  asChild?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-[#0A0C10] font-semibold hover:opacity-90 shadow-lg shadow-[#00D4FF]/20",
  ghost:
    "bg-transparent border border-[#1E2230] text-[#F0F4FF] hover:border-[#00D4FF] hover:text-[#00D4FF]",
  outline:
    "bg-transparent border border-[#00D4FF] text-[#00D4FF] hover:bg-[#00D4FF]/10",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", children, className = "", ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          inline-flex items-center justify-center gap-2 rounded-full
          font-medium transition-all duration-200 cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0C10]
          disabled:opacity-50 disabled:cursor-not-allowed
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${className}
        `}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
