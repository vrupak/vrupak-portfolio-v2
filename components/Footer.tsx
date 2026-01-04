import { navLinks, socialLinks, footerContent } from "@/data/content";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="text-sm text-gray-600">{footerContent.copyright}</p>
          </div>
          <nav className="flex flex-col md:flex-row gap-6">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
