import { Project, NavLink, SocialLink, EthosBlock } from "@/types";

export const heroContent = {
  headline1: "I DO THINGS.",
  headline2: "NEED THINGS DONE?",
  services: "Web Development • AI Engineering • VR/Game Development",
  bio: "Software Engineer turning complex problems into simple, beautiful solutions.",
};

export const featuredProjects: Project[] = [
  { id: "1", type: "Open Source", title: "MEMORYGRAPH - SUPERMEMORY AI", url: "#project-1" },
  { id: "2", type: "AI Engineering", title: "PULSE AI - GRAPH RAG SYSTEM", url: "#project-2" },
  { id: "3", type: "VR/Game Dev", title: "STRANGER THINGS VR CAMP", url: "#project-3" },
  { id: "4", type: "Software Engineering", title: "KAFKA INTEGRATION - STEELARTT", url: "#project-4" },
];

export const ethosBlocks: EthosBlock[] = [
  {
    id: "1",
    headline: "I DO WHAT I SAY.",
    description:
      "ASU Software Engineering grad with 4.0 GPA. I build scalable web apps, AI systems, and VR experiences. Clean code, optimal performance, and user-friendly design are non-negotiable.",
    ctaText: "Learn More",
    ctaHref: "#about",
  },
  {
    id: "2",
    headline: "I DO IT FOR THE LOVE.",
    description:
      "When I'm not coding, you'll find me sketching, lifting weights, or gaming. I bring the same precision and creativity to everything I do.",
    ctaText: "Say What's Up",
    ctaHref: "mailto:vrupak@asu.edu",
  },
];

export const navLinks: NavLink[] = [
  { label: "HOME", href: "#" },
  { label: "WHO??", href: "#about" },
  { label: "THE WORK", href: "#work" },
];

export const socialLinks: SocialLink[] = [
  { label: "Email", href: "mailto:vrupak@asu.edu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourusername" },
];

export const footerContent = {
  copyright: "© 2026 Vrupak",
};
