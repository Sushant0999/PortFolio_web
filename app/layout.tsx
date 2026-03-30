import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sushant Raj | Software Engineer",
  description: "Portfolio of Sushant Raj, a Software Engineer specializing in backend systems, machine learning, and algorithms.",
};

import Navbar from "./components/Navbar";
import CanvasBackground from "./components/CanvasBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-sky-500/30`}
        suppressHydrationWarning
      >
        <CanvasBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
