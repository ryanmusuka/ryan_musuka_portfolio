/* eslint-disable react/jsx-no-undef */
"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";

const ProfileVisual = ({ className = "" }: { className?: string }) => (
  <motion.div 
    className={`flex-shrink-0 relative flex justify-center w-full md:w-auto ${className}`}
    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full border-2 border-accent p-1 shadow-[0_0_30px_rgba(234,88,12,0.2)] group transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.3)] hover:border-terminal">
      <div className="absolute inset-0 rounded-full bg-[#0f172a] overflow-hidden">
        <Image
          src="/profile1.png" 
          alt="Ryan Musuka - Software Engineer"
          fill
          className="object-cover scale-105 group-hover:scale-100 transition-transform duration-500"
          priority 
          sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 320px"
        />
      </div>
    </div>
  </motion.div>
);

export default function About() {
  return (
    <section 
      id="about" 
      className="w-full container scroll-mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10"
    >
      {/* The Flex Parent:  */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: Narrative & Header */}
        <motion.div 
          className="flex-1 flex flex-col items-start w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Section Header */}
          <div className="flex items-center space-x-3 mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight font-mono uppercase">
              About<span className="text-accent">Me</span>
            </h2>
          </div>

          {/* MOBILE ONLY IMAGE: Renders just under the header, hidden on Desktop */}
          <ProfileVisual className="lg:hidden mb-8 justify center" />

          {/* The Narrative Content */}
          <article className="space-y-6 text-base md:text-lg text-slate-300 leading-relaxed font-sans w-full">
            <p>
              I am a Computer Science student at NUST Zimbabwe, completing my second year with a deep-rooted passion for building resilient systems on the internet.
            </p>
            <p>
              So far, I have shipped a production media platform (LaughNewsWorld), led a 10-person IoT engineering team to build a smart irrigation system (Hydro-Smart), and prototyped two future enterprise systems; an offline-first traffic enforcement application for active-duty police officers (Zentinel) and an enterprise visitor management platform (SentriHawk). Each of these systems taught me crucial lessons about database design, payload optimization, and real-world network constraints that the classroom simply cannot simulate.
            </p>
            <p>
              To deeply understand the infrastructure my code runs on, I pursued and achieved dual Oracle certifications in Cloud Infrastructure and Generative AI. Currently, I am diving even deeper into Python, Next.js, TypeScript, PostgreSQL, and cloud architecture, chasing the intersection where artificial intelligence meets practical software engineering.
            </p>
             <p>
                Beyond the IDE, I am an active member of the Google Developer Group and a digital content creator with hands-on experience in YouTube, Photoshop, and video editing. This creative background hones my ability to communicate complex technical concepts effectively and bridges the gap between raw code and engaging user experiences.
            </p>
            <p>
                As a professional, I am a highly determined, rapid learner who thrives in collaborative environments. I bring passion, analytical rigor, and an energetic, team-first mentality to the workplace, ensuring that I am not just writing clean code, but actively contributing to an innovative and enjoyable engineering culture.
            </p>
          </article>

          {/* Sub-accent aesthetic detail */}
          <div className="mt-10 h-1 w-24 bg-gradient-to-r from-accent to-transparent rounded-full" />
        </motion.div>

        {/* RIGHT COLUMN: Desktop Sticky Image */}
        <div className="hidden lg:block lg:w-5/12 py-36 sticky top-32">
          <ProfileVisual />
        </div>

      </div>
    </section>
  );
}