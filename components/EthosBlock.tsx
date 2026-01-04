"use client";

import { ethosBlocks } from "@/data/content";
import { typography, colors, spacing } from "@/styles/design-tokens";
import Button from "./ui/Button";
import Section from "./ui/Section";
import { motion } from "framer-motion";

export default function EthosBlocks() {
  return (
    <>
      {ethosBlocks.map((block, idx) => (
        <Section
          key={block.id}
          variant="none"
          className={`relative overflow-hidden flex items-center justify-center min-h-[50vh] ${
            idx === 0 ? "bg-gradient-to-b from-neutral-100 to-neutral-50" : "bg-neutral-800"
          }`}
        >
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiAvPjwvc3ZnPg==')] pointer-events-none"></div>

          <div className="w-full max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
            <div className="flex flex-col items-center text-center relative z-10 pt-40 md:pt-56 lg:pt-72 pb-32 md:pb-40 lg:pb-48">
              {/* Headline with line breaks as design element - staggered animation */}
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`${typography.display.sm} mb-16 md:mb-20`}
                style={{ fontWeight: 600 }}
              >
                {block.headline.split(" ").map((word, i, arr) => {
                  // Flip the pattern so odd words get accent
                  const isAccent = i % 2 === 1;
                  const baseColor = idx === 0 ? colors.text.primary : colors.text.inverse;

                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                      style={{ display: 'inline-block' }}
                      className={isAccent ? `${colors.accent.primary} drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]` : baseColor}
                    >
                      {word}
                      {i < arr.length - 1 && " "}
                    </motion.span>
                  );
                })}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className={`${typography.body.xl} ${
                  idx === 0 ? colors.text.secondary : "text-neutral-300"
                } max-w-4xl`}
              >
                {block.description}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                style={{ marginTop: '64px' }}
              >
                <Button
                  href={block.ctaHref}
                  variant={idx === 0 ? "dark" : "light"}
                >
                  {block.ctaText} →
                </Button>
              </motion.div>
            </div>
          </div>
        </Section>
      ))}
    </>
  );
}
