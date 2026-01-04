import { navLinks, socialLinks, footerContent } from "@/data/content";
import { typography, colors, spacing, transitions } from "@/styles/design-tokens";
import Container from "./ui/Container";

export default function Footer() {
  const linkStyles = `${typography.body.sm} ${colors.text.secondary} hover:${colors.text.primary.replace("text-", "")} ${transitions.default} relative inline-block hover:-translate-y-0.5 transition-transform duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 hover:after:w-full`;

  return (
    <footer className={`${spacing.section.compact} ${colors.border.secondary} border-t-2`}>
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
          {/* Copyright */}
          <div>
            <p className={`${typography.body.sm} ${colors.text.tertiary}`}>
              {footerContent.copyright}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Main Nav */}
            <div className="flex gap-6 md:gap-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className={linkStyles}>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-6 md:gap-8">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={linkStyles}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
