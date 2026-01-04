/**
 * Application Constants
 * Centralized configuration values
 */

export const APP_CONFIG = {
  name: "Vrupak Portfolio",
  description: "Software Engineer turning complex problems into simple, beautiful solutions.",
  url: "https://yourportfolio.com",
} as const;

export const SOCIAL_LINKS = {
  email: "vrupak@asu.edu",
  linkedin: "https://linkedin.com/in/yourusername",
  github: "https://github.com/yourusername",
  twitter: "https://twitter.com/yourusername",
} as const;

export const ROUTES = {
  home: "#",
  about: "#about",
  work: "#work",
} as const;
