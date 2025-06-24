import * as React from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@components/shared/ThemeProvider";
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
    url: "https://business-nexus-website.netlify.app",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased`}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
