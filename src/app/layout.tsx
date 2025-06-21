import * as React from "react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@components/ui/sidebar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Business Nexus",
  description: "Business Nexus app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <SidebarProvider>
          {children}
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
