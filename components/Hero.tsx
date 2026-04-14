/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, ChevronRight, Terminal } from "lucide-react";

const rotatingRoles = [
  "Full-Stack Development",
  "Cloud Engineering.",
  "AI Engineering.",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter Effect Logic (Refactored for strict React lifecycle management)
  useEffect(() => {
    const currentFullRole = rotatingRoles[roleIndex];
    const typingSpeed = isDeleting ? 50 : 100; // Faster backspace, readable typing

    if (!isDeleting && text === currentFullRole) {
      // Pause at the end of the word before deleting
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setText((prev) =>
        isDeleting
          ? currentFullRole.substring(0, prev.length - 1)
          : currentFullRole.substring(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  // Framer Motion Animation Variants for the Orchestrated Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Cascades the animations of children elements
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <section 
      id="home" 
      className="w-full container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 overflow-hidden relative z-10"
    >
      
      {/* Left Column: Information & CTAs */}
      <motion.div 
        className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-2xl order-2 md:order-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* The "Neon Status" Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-slate-900/50 border border-slate-800 rounded-full px-4 py-1.5 shadow-[0_0_10px_rgba(34,197,94,0.05)]">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-terminal"></span>
          </span>
          <span className="font-mono text-xs sm:text-sm font-medium text-secondary">
            System Status: Available for 2025 Internships
          </span>
        </motion.div>

        {/* Core Identity */}
        <div className="space-y-2">
          <motion.h2 variants={itemVariants} className="font-mono text-terminal font-semibold tracking-widest uppercase text-sm sm:text-base flex items-center">
            <Terminal className="w-4 h-4 mr-2" />
            &gt; Hello World, I am
          </motion.h2>
          
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter">
            Ryan Musuka<span className="text-accent">.</span>
          </motion.h1>
          
          {/* Dynamic Typewriter Subtitle */}
          <motion.div variants={itemVariants} className="h-10 sm:h-12 flex items-center">
            <h3 className="text-2xl sm:text-3xl font-mono text-secondary/80 font-medium flex items-center">
              <span className="text-slate-700 mr-3">||</span>
              {text}
              <span className="animate-[pulse_0.8s_ease-in-out_infinite] ml-1 text-terminal">_</span>
            </h3>
          </motion.div>
        </div>

        {/* Professional Summary */}
        <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
          I architect high-performance, secure software systems. Certified in Oracle Cloud Infrastructure and Generative AI, I specialize in reducing payload bottlenecks and building offline-first architectures.
        </motion.p>

        {/* Call to Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
          <Button asChild className="bg-accent hover:bg-accent/90 text-white font-mono font-bold px-8 py-6 rounded-md transition-all shadow-[0_0_15px_rgba(234,88,12,0.2)] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(234,88,12,0.4)] group">
            <Link href="/#projects">
              Execute_Projects <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="border-terminal text-terminal hover:bg-terminal/10 font-mono font-bold px-8 py-6 rounded-md transition-all group">
            <a href="/Ryan_Musuka_CV.pdf" download="Ryan_Musuka_CV.pdf">
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" /> Extract_CV
            </a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Right Column: The Visual Anchor */}
      <motion.div 
        className="flex-shrink-0 relative flex justify-center md:justify-end w-full md:w-auto"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-80 md:h-80 rounded-full border-2 border-accent p-1 shadow-[0_0_30px_rgba(234,88,12,0.2)] group transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.3)] hover:border-terminal">
          <div className="absolute inset-0 rounded-full bg-[#0f172a] overflow-hidden">
            <Image
              src="/profile.png" 
              alt="Ryan Musuka - Software Engineer"
              fill
              className="object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
              priority 
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 320px"
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
}