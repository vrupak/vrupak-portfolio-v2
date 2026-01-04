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
          className={`relative overflow-hidden flex items-center justify-center ${
            idx === 0 ? "bg-gradient-to-b from-neutral-100 to-neutral-50" : "bg-neutral-800"
          }`}
        >
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiAvPjwvc3ZnPg==')] pointer-events-none"></div>

          <div className="w-full max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center relative z-10 pt-32 md:pt-48 lg:pt-64 pb-20 md:pb-28 lg:pb-36"
            >
              {/* Headline with line breaks as design element */}
              <h2
                className={`${typography.display.sm} ${
                  idx === 0 ? colors.text.primary : colors.text.inverse
                } mb-16 md:mb-20`}
              >
                {block.headline.split(" ").map((word, i, arr) => (
                  <span key={i}>
                    {word === "SAY." || word === "I" || word === "WHAT" ? (
                      <span className={`${colors.accent.primary} drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]`}>{word}</span>
                    ) : (
                      word
                    )}
                    {i < arr.length - 1 && (
                      <>
                        {i === arr.length - 2 ? (
                          <>
                            <br className="hidden md:block" />{" "}
                          </>
                        ) : (
                          " "
                        )}
                      </>
                    )}
                  </span>
                ))}
              </h2>

              {/* Description */}
              <p
                className={`${typography.body.xl} ${
                  idx === 0 ? colors.text.secondary : "text-neutral-300"
                } max-w-4xl mb-12`}
              >
                {block.description}
              </p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  href={block.ctaHref}
                  variant={idx === 0 ? "secondary" : "accent"}
                >
                  {block.ctaText} →
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Section>
      ))}
    </>
  );
}
