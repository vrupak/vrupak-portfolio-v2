import type { Metadata } from "next";
import { APP_CONFIG } from "@/constants";
import { Black_Ops_One, Space_Grotesk } from "next/font/google";
import "./globals.css";

const blackOps = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} - Software Engineer`,
  description: APP_CONFIG.description,
  openGraph: {
    title: `${APP_CONFIG.name} - Software Engineer`,
    description: APP_CONFIG.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${blackOps.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
