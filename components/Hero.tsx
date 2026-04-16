/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

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
    const typingSpeed = isDeleting ? 50 : 100; 

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
        staggerChildren: 0.15,
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
      className="flex flex-col items-center justify-center gap-6 max-w-3xl mx-auto px-4 py-12 text-center"
      >
      
      {/* Left Column: Information & CTAs */}
      <motion.div 
        className="flex-1 flex flex-col items-center md:items-center text-center space-y-6 max-w-2xl order-2 md:order-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Core Identity */}
        <div className="space-y-2 justify center md:justify-center">
          <motion.h2 variants={itemVariants} className="font-mono text-terminal font-semibold tracking-widest uppercase text-sm sm:text-base flex items-center self-start">
            <Terminal className="w-4 h-4 mr-2" />
             Hello World, I am
          </motion.h2>
          
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl md:text-7xl font-black text-white text-center tracking-tighter">
            Ryan Musuka<span className="text-accent">.</span>
          </motion.h1>
          
          {/* Dynamic Typewriter Subtitle */}
          <motion.div variants={itemVariants} className="h-10 sm:h-12 flex items-center justify-center w-full min-w-[280px]">
            <h3 className="text-2xl sm:text-3xl font-mono text-secondary/80 font-medium flex items-center">
              <span className="text-slate-700 mr-3">{ }</span>
              {text}
              <span className="animate-[pulse_0.8s_ease-in-out_infinite] ml-1 text-terminal">_</span>
            </h3>
          </motion.div>
        </div>

        {/* Professional Summary */}
        <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
            I architect high-performance, secure software systems. Certified in Oracle Cloud
            Infrastructure and Generative AI, with real-world projects under my belt, and currently
            deepening my craft across Next.js, TypeScript, PostgreSQL, and Cloud infrastructure,
            one commit at a time!
        </motion.p>

        {/* The "Neon Status" Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-slate-900/50 border border-slate-800 rounded-full px-4 py-1.5 shadow-[0_0_10px_rgba(34,197,94,0.05)]">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-terminal"></span>
          </span>
          <span className="font-mono uppercase text-xs sm:text-sm font-medium text-secondary">
            Available for 2026-2027 Internships
          </span>
        </motion.div>

        {/* Call to Action Buttons */}
        <div className="flex flex-wrap gap-4 items-center">
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4 w-fit sm:w-auto">
                <Button asChild className="bg-accent hover:bg-accent/90 text-white font-mono font-bold px-8 rounded-full transition-all shadow-[0_0_15px_rgba(234,88,12,0.2)] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(234,88,12,0.4)] group">
                    <Link href="/#projects">
                    View My Projects 
                    </Link>
                </Button>
                
                <Button asChild variant="outline" className="border-terminal text-terminal hover:bg-terminal/10 font-mono font-bold px-8 rounded-full transition-all group">
                    <a href="/Ryan_Musuka_CV.pdf" download="Ryan_Musuka_CV.pdf">
                    Download My Resume
                    </a>
                </Button>
            </motion.div>
        </div>
      </motion.div>


     

    </section>
  );
}