/**
 * Design System Tokens
 * Centralized design values for typography, colors, and spacing
 */

export const typography = {
  display: {
    xl: "font-display text-8xl md:text-[12rem] lg:text-[14rem] font-bold leading-[0.85] tracking-tighter uppercase",
    lg: "font-display text-7xl md:text-[10rem] lg:text-[12rem] font-bold leading-[0.85] tracking-tighter uppercase",
    md: "font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight uppercase",
    sm: "font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight uppercase",
  },
  heading: {
    xl: "font-display text-4xl md:text-6xl font-bold leading-tight uppercase",
    lg: "font-display text-3xl md:text-5xl font-bold leading-tight uppercase",
    md: "text-2xl md:text-4xl font-bold leading-tight uppercase",
    sm: "text-xl md:text-3xl font-bold leading-tight uppercase",
  },
  body: {
    xl: "text-lg md:text-xl lg:text-2xl leading-relaxed font-medium",
    lg: "text-base md:text-lg lg:text-xl leading-relaxed",
    md: "text-sm md:text-base lg:text-lg leading-relaxed",
    sm: "text-xs md:text-sm lg:text-base leading-relaxed",
  },
  label: {
    lg: "text-sm md:text-base font-bold uppercase tracking-widest",
    md: "text-xs md:text-sm font-bold uppercase tracking-widest",
    sm: "text-[10px] md:text-xs font-bold uppercase tracking-widest",
  },
} as const;

export const colors = {
  text: {
    primary: "text-neutral-900",
    secondary: "text-neutral-600",
    tertiary: "text-neutral-500",
    inverse: "text-neutral-50",
  },
  bg: {
    primary: "bg-neutral-50",
    secondary: "bg-neutral-100",
    inverse: "bg-neutral-900",
    dark: "bg-neutral-800",
  },
  border: {
    primary: "border-neutral-900",
    secondary: "border-neutral-300",
    light: "border-neutral-200",
  },
  accent: {
    primary: "text-[var(--accent-color)]",
    bg: "bg-[var(--accent-color)]",
    border: "border-[var(--accent-color)]",
    hover: "hover:text-[var(--accent-color)]",
  },
} as const;

export const spacing = {
  section: {
    vertical: "py-24 md:py-36 lg:py-48",
    compact: "py-16 md:py-24 lg:py-32",
  },
  container: {
    padding: "px-8 md:px-16 lg:px-24",
    maxWidth: "max-w-7xl",
  },
  gap: {
    xs: "gap-2",
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-10",
    xl: "gap-16",
    xxl: "gap-24",
  },
} as const;

export const transitions = {
  default: "transition-all duration-200 ease-out",
  slow: "transition-all duration-300 ease-out",
  fast: "transition-all duration-150 ease-out",
} as const;

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  slideDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  stagger: {
    staggerChildren: 0.15,
  },
} as const;
