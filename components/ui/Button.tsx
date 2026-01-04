import { transitions } from "@/styles/design-tokens";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles = `inline-block font-semibold ${transitions.default}`;

  const variantStyles = {
    primary:
      "text-lg md:text-xl border-b-2 border-neutral-900 hover:border-[var(--accent-color)] hover:text-neutral-600",
    secondary:
      "text-base md:text-lg underline decoration-2 underline-offset-4 hover:no-underline hover:text-neutral-600",
    accent:
      "text-lg md:text-xl px-8 py-3 bg-[var(--accent-color)] text-neutral-900 font-bold hover:opacity-90 hover:scale-105 transform",
  };

  return (
    <a href={href} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </a>
  );
}
