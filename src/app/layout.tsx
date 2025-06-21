import * as React from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Business Nexus",
  description:
    "Business Nexus is a platform designed to connect entrepreneurs and investors, enabling seamless collaboration, networking, and growth opportunities for innovative business ventures.",
  openGraph: {
    title: "Business Nexus",
    siteName: "Business Nexus",
    url: "https://business-nexus.netlify.app",
    description: "Connect entrepreneurs and investors for seamless collaboration.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>{children}</body>
    </html>
  );
}
