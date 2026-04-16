import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import InteractiveGrid from "@/components/InteractiveGrid"; 
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code" });

export const metadata: Metadata = {
  title: "Ryan Musuka | Software Engineer",
  description: "Portfolio of Ryan Musuka - Full-Stack Engineering, Cloud, & AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${firaCode.variable} antialiased bg-background text-secondary min-h-screen flex flex-col`}>
        
        <Navbar />
        <InteractiveGrid />
        {children}
        <Footer />
      </body>
    </html>
  );
}