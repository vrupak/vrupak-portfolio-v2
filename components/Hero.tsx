"use client";

import { heroContent } from "@/data/content";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { typography, colors, spacing } from "@/styles/design-tokens";
import Container from "./ui/Container";
import { motion } from "framer-motion";

export default function Hero() {
  const currentTime = useCurrentTime();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiAvPjwvc3ZnPg==')] pointer-events-none"></div>

      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center relative z-10 w-full max-w-6xl mx-auto"
        >
          {/* Time Display */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <p className={`${typography.display.lg} ${colors.accent.primary} drop-shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)]`}>
              {currentTime}
            </p>
          </motion.div>

          {/* Main Headlines */}
          <div className="flex flex-col space-y-2 md:space-y-4 mb-16 md:mb-20">
            <motion.h1
              variants={itemVariants}
              className={`${typography.display.md} ${colors.text.primary}`}
            >
              I DO{" "}
              <span className={`${colors.accent.primary} drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]`}>THINGS.</span>
            </motion.h1>
            <motion.h2
              variants={itemVariants}
              className={`${typography.display.md} ${colors.text.primary}`}
            >
              NEED THINGS{" "}
              <span className={`${colors.accent.primary} drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]`}>DONE?</span>
            </motion.h2>
          </div>

          {/* Supporting Content */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-4 max-w-3xl"
          >
            <p className={`${typography.body.xl} ${colors.text.primary}`}>
              {heroContent.services}
            </p>
            <p className={`${typography.body.lg} ${colors.text.secondary}`}>
              {heroContent.bio}
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
