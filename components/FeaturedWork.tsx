"use client";

import { featuredProjects } from "@/data/content";
import { typography, colors, spacing } from "@/styles/design-tokens";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Section from "./ui/Section";
import { motion } from "framer-motion";

export default function FeaturedWork() {
  return (
    <Section id="work" variant="none" className="relative overflow-hidden bg-neutral-900 flex items-center justify-center min-h-[50vh]">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiAvPjwvc3ZnPg==')] pointer-events-none"></div>

      <div className="w-full max-w-6xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex flex-col items-center relative z-10 text-center pt-40 md:pt-56 lg:pt-72 pb-32 md:pb-40 lg:pb-48">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`${typography.heading.xl} ${colors.text.inverse} mb-24 md:mb-32`}
          >
            <span className={`${colors.accent.primary} drop-shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] underline decoration-4 underline-offset-8`}>FEATURED</span>
          </motion.h2>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 lg:gap-x-28 gap-y-20 md:gap-y-24 mb-20 w-full">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer text-left"
              >
                <p className={`${typography.label.md} ${colors.text.tertiary} mb-5`}>
                  {project.type}
                </p>
                <h3 className={`${typography.heading.sm} ${colors.text.inverse} group-hover:${colors.accent.primary.replace('text-', '')} transition-colors border-b-2 ${colors.accent.border} pb-6`}>
                  {project.title}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 mb-8"
          >
            <Button href="#work" variant="accent">
              All Work →
            </Button>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
