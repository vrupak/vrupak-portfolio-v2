"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type CursorVariant = "default" | "hover";

interface CustomCursorProps {
  variant?: "v1" | "v2";
}

export default function CustomCursor({ variant = "v1" }: CustomCursorProps) {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for smooth, organic movement
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Handle hover states for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("data-cursor-hover")
      ) {
        setCursorVariant("hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("data-cursor-hover")
      ) {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [cursorX, cursorY]);

  // Variant 1: Hollow ring with dot
  const renderV1 = () => (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={cursorVariant}
        variants={{
          default: {
            scale: 1,
            opacity: isVisible ? 0.5 : 0,
          },
          hover: {
            scale: 1.5,
            opacity: isVisible ? 0.8 : 0,
          },
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="w-10 h-10 border-2 border-[var(--accent-color)] rounded-full" />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={cursorVariant}
        variants={{
          default: {
            scale: 1,
            opacity: isVisible ? 1 : 0,
          },
          hover: {
            scale: 0,
            opacity: isVisible ? 0 : 0,
          },
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div className="w-2 h-2 bg-[var(--accent-color)] rounded-full" />
      </motion.div>
    </>
  );

  // Variant 2: Filled circle with scale effect
  const renderV2 = () => (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={cursorVariant}
      variants={{
        default: {
          scale: 1,
          opacity: isVisible ? 0.6 : 0,
        },
        hover: {
          scale: 2,
          opacity: isVisible ? 0.3 : 0,
        },
      }}
      transition={{ type: "spring", damping: 15, stiffness: 200 }}
    >
      <div className="w-8 h-8 bg-[var(--accent-color)] rounded-full blur-sm" />
    </motion.div>
  );

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <div className="hidden md:block">
      {variant === "v1" ? renderV1() : renderV2()}
    </div>
  );
}
