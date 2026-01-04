export interface Project {
  id: string;
  title: string;
  type: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface EthosBlock {
  id: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}
