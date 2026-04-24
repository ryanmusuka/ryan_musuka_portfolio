"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Cloud, Code2, ShieldCheck, Cpu } from "lucide-react";

const technologies = {
  frontend: [
    { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invertDark: true },
    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", invertDark: false },
    { name: "Tailwind", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", invertDark: false },
    { name: "Flutter", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", invertDark: false },
  ],
  backend: [
    { name: "Supabase", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", invertDark: false },
    { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", invertDark: false },
   ],
  core: [
    { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", invertDark: false },
    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", invertDark: false },
    { name: "HTML5", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", invertDark: false },
    { name: "CSS3", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", invertDark: false },
    { name: "Python", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", invertDark: false },
    { name: "SQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg", invertDark: false },
    { name: "Dart", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg", invertDark: false }
  ]
};

export default function TechStack() {
  return (
    <section id="stack" className="w-full scroll-mt-20 container mx-auto px-4 sm:px-6 lg:px-8 py-1 relative z-10">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight font-mono uppercase">
            Tech<span className="text-accent">Stack</span>
          </h2>
        </div>
         <motion.p className="text-base sm:text-lg text-slate-400 max-w-xl pb-7 leading-relaxed">
              A collection of technologies I am learning and using to build modern web applications. 
          </motion.p>

        {/* BENTO BOX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
           {/* BOX 1: Core Languages */}
          <motion.div 
            className="relative p-6 md:p-8 rounded-2xl bg-[#0f172a]/80 border border-slate-800 backdrop-blur-sm group hover:border-terminal/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)] md:col-span-2 lg:col-span-1"
            whileHover={{ y: -5 }}
            >
            <div className="flex items-center space-x-3 mb-6">
              <Terminal className="w-5 h-5 text-terminal" />
              <h3 className="text-xl font-mono font-bold text-white">Core Languages</h3>
            </div>
            <div className="grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-2">
              {technologies.core.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center justify-center space-y-2">
                  <img src={tech.src} alt={tech.name} className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-sans text-slate-400 text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* BOX 3: Frontend Ecosystem */}
          <motion.div 
            className="relative p-6 md:p-8 rounded-2xl bg-[#0f172a]/80 border border-slate-800 backdrop-blur-sm group hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)]"
            whileHover={{ y: -5 }}
        >
            <div className="flex items-center space-x-3 mb-6">
              <Code2 className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-mono font-bold text-white">Frontend Ecosystem</h3>
            </div>
            {/* Inner Icon Grid: 3 columns on mobile, 3 on larger screens */}
            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
              {technologies.frontend.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center justify-center space-y-2">
                  <img 
                    src={tech.src} 
                    alt={tech.name} 
                    className={`w-10 h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300 ${tech.invertDark ? "invert opacity-90" : ""}`} 
                  />
                  <span className="text-xs font-sans text-slate-400 text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* BOX 3: Backend & Databases */}
          <motion.div 
            className="relative p-6 md:p-8 rounded-2xl bg-[#0f172a]/80 border border-slate-800 backdrop-blur-sm group hover:border-terminal/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Database className="w-5 h-5 text-terminal" />
              <h3 className="text-xl font-mono font-bold text-white">Backend & Data</h3>
            </div>
            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
              {technologies.backend.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center justify-center space-y-2">
                  <img src={tech.src} alt={tech.name} className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-sans text-slate-400 text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* BOX 4: Certifications */}
          <motion.div 
            className="lg:col-span-2 relative p-6 md:p-8 rounded-2xl bg-[#0f172a]/80 border border-slate-800 backdrop-blur-sm group hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,88,12,0.15)] overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <Cloud className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-mono font-bold text-white">Oracle Cloud Certifications</h3>
            </div>
            
            {/* Generative AI Prof */}
            <a 
            href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=2E005D928A8211153BB601F0D8941E813EA45193AE6BF1091901AB8CB6D844CC"
            target="_blank"
            rel="noopener noreferrer"
            className="group/cert flex flex-col p-4 rounded-xl bg-slate-900/50 border border-slate-800 border-l-2 border-l-accent hover:bg-accent/10 hover:border-slate-700 transition-all duration-300 cursor-pointer"
            >
            <span className="text-xs font-mono text-slate-400 mb-1 group-hover/cert:text-accent transition-colors duration-300">
                2025 Certified
            </span>
            <span className="text-sm md:text-base font-bold text-slate-200 group-hover/cert:text-white transition-colors duration-300">
                Generative AI Professional
            </span>
            </a>

            {/* AI Foundations */}
            <a 
            href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=57CC565333B6C99909E06C1A2896D9F0172F478ECE73CEA0CD78981931507281"
            target="_blank"
            rel="noopener noreferrer"
            className="group/cert flex flex-col p-4 rounded-xl bg-slate-900/50 border border-slate-800 border-l-2 border-l-accent hover:bg-accent/10 hover:border-slate-700 transition-all duration-300 cursor-pointer"
            >
            <span className="text-xs font-mono text-slate-400 mb-1 group-hover/cert:text-accent transition-colors duration-300">
                2025 Certified
            </span>
            <span className="text-sm md:text-base font-bold text-slate-200 group-hover/cert:text-white transition-colors duration-300">
                AI Foundations Associate
            </span>
            </a>

            {/* Cloud Foundations */}
            <a 
            href="https://catalog-education.oracle.com/ords/certview/sharebadge?id=4DDDBDCC90297531C3D128C29EBD1FA4890BB09BE4D09DEA31D35509BC07E5D2"
            target="_blank"
            rel="noopener noreferrer"
            className="group/cert flex flex-col p-4 rounded-xl bg-slate-900/50 border border-slate-800 border-l-2 border-l-accent sm:col-span-2 hover:bg-accent/10 hover:border-slate-700 transition-all duration-300 cursor-pointer"
            >
            <span className="text-xs font-mono text-slate-400 mb-1 group-hover/cert:text-accent transition-colors duration-300">
                2025 Certified
            </span>
            <span className="text-sm md:text-base font-bold text-slate-200 group-hover/cert:text-white transition-colors duration-300">
                Cloud Infrastructure Foundations Associate
            </span>
            </a>

            {/* Aesthetic Glow in the background of the box */}
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}