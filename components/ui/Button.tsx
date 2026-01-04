import { typography } from "@/styles/design-tokens";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: "light" | "dark";
  className?: string;
}

export default function Button({
  children,
  href,
  variant = "dark",
  className = "",
}: ButtonProps) {
  const isLight = variant === "light";

  return (
    <a
      href={href}
      className={`font-display inline-block relative overflow-hidden uppercase transition-transform duration-200 hover:-translate-y-1 ${className}`}
      style={{
        padding: '10px 24px',
        fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
        letterSpacing: '-0.02em',
        lineHeight: '1',
      }}
    >
      {/* Default state */}
      <span
        className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
        style={{
          backgroundColor: isLight ? 'var(--accent-color)' : '#171717',
          color: isLight ? '#171717' : 'var(--accent-color)',
          transform: 'translateY(0)',
        }}
      >
        {children}
      </span>

      {/* Hover state - slides up from below */}
      <span
        className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out hover-state"
        style={{
          backgroundColor: isLight ? '#fafafa' : 'var(--accent-color)',
          color: '#171717',
          transform: 'translateY(100%)',
        }}
      >
        {children}
      </span>

      {/* Invisible text for maintaining button dimensions */}
      <span className="invisible">{children}</span>

      <style jsx>{`
        a:hover .hover-state {
          transform: translateY(0) !important;
        }
        a:hover span:first-child {
          transform: translateY(-100%) !important;
        }
      `}</style>
    </a>
  );
}
