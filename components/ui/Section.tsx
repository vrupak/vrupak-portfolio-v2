import { spacing } from "@/styles/design-tokens";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  variant?: "default" | "compact" | "none";
  className?: string;
}

export default function Section({
  children,
  id,
  variant = "default",
  className = "",
}: SectionProps) {
  const paddingStyles = {
    default: spacing.section.vertical,
    compact: spacing.section.compact,
    none: "",
  };

  return (
    <section id={id} className={`${paddingStyles[variant as keyof typeof paddingStyles] || ""} ${className}`}>
      {children}
    </section>
  );
}
