"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, GitBranch, X, Activity, CheckCircle2, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "laughnewsworld",
    title: "LaughNewsWorld",
    tagline: "Full-Stack Media & News Platform",
    description: "A modern digital media platform designed to centralize trending Christian news and meme-based entertainment. Features a secure, automated business portal for external brands to submit custom advertisement requests.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion", "YouTube Data API", "Google AdSense", "Vercel."],
    status: "Final Production Deployed",
    featuresLabel: "Core Features",
    features: [
      "Centralized Multimedia Hub with Intelligent Content Parsing",
      "Zero-Impact Video Embedding via YouTube Data API",
      "RLS-Protected Sponsorship Portal",
      "Automated GDPR-Compliant Monetization through dynamic in-feed google AdSense injection",
      "Viewport-Triggered Fluid UI (Framer Motion)",
      "Serverless Edge Architecture"
    ],
    achievements: [
      "Architected a serverless Supabase backend strictly enforcing [[Row Level Security (RLS)]] to prevent unauthorized database access.",
      "Optimized Core Web Vitals by developing a custom lazy-loading architecture, achieving an estimated [[70% payload reduction]].",
      "Developed an intelligent regex-based client-side text extraction algorithm to generate immersive UI elements dynamically.",
      "Configured secure Next.js build pipelines with strict domain whitelisting for automated image optimization."
    ],
    demoLink: "https://laughnewsworld.vercel.app",
    repoLink: "https://github.com/ryanmusuka/LaughNewsWorld-Website", 
  },
  {
    id: "sentrihawk",
    title: "SentriHawk",
    tagline: " Enterprise Visitor Management & Security Platform",
    description: "An enterprise-grade visitor and logistics management platform designed to modernize gatehouse security. Facilitates a secure, role-based ecosystem with advanced programmatic security protocols.",
    stack: ["Vanilla JS", "HTML5", "CSS3", "DOM API"],
    status: "Prototype Deployed. Final System in Active Development",
    featuresLabel: "Core Features",
    features: [
      "Role-Based Dashboards & Dynamic Data Isolation for each role (Guard, Tenant, Head Of Security)",
      "Subscription Tier Gating & 'Ghost Protocol' VIP Access",
      "Real-Time Threat Detection via Internal Blacklists",
      "Silent, Discrete Security Alarms",
      "Emergency Broadcast System",
      "Logistics Management",
      "Ruggedized Gatehouse UI",
      "Immutable Audit Trails & Logistics Management"
    ],
    achievements: [
      "Engineered a state-driven MVP validating complex multi-tier feature gating and [[Role-Based Access Control (RBAC)]].",
      "Architected a [[Ghost Protocol VIP module]] generating untraceable digital tokens while preventing UI exposure to lower tiers.",
      "Developed regex-based intelligent visitor processing, simulating a [[50%+ reduction]] in manual entry processing time.",
      "Demo Access: ID: guard3 or tenant3 or hos3  | Auth Key: pass123"
    ],
    demoLink: "https://sentrihawk-prototype.vercel.app",
    repoLink: "https://github.com/ryanmusuka/SentriHawk_Prototype",
  },
  {
    id: "zentinel",
    title: "Zentinel",
    tagline: "Traffic Police Enforcement Application",
    description: "A ruggedized digital law enforcement platform designed to centralize physical vehicle inspections. Features an offline-capable ticketing engine that generates official digital receipts to expedite high-stress traffic stops.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    status: "Prototype Deployed. Final System in Active Development",
    featuresLabel: "Core Features",
    features: [
      "Offline-Ready Architecture",
      "Ruggedized UI/UX for High-Glare Outdoor Visibility",
      "Automated Ticketing Engine with Statutory Cross-Referencing",
      "Generates Digital 'Form 265' Receipts",
      "Task-Isolated Workflows (Inspection vs. Administration)",
      "Immutable Logging"
    ],
    achievements: [
      "Architected a secure global session management system using React Context API to act as an [[immutable clipboard]] across routes.",
      "Engineered an [[offline-ready frontend]] simulating national registry lookups during severe network outages.",
      "Developed dynamic ticketing logic that automatically cross-references defects against government fine schedules.",
      "Demo Access: Badge No.: 9921 | Password: password123"
    ],
    demoLink: "https://zentinel-mvp-prototype.vercel.app",
    repoLink: "https://github.com/ryanmusuka/Zentinel-MVP-Prototype-", 
  },
  {
    id: "hydrosmart",
    title: "Hydro-Smart",
    tagline: "IoT-Based Precision Irrigation System",
    description: "A comprehensive IoT precision irrigation platform that automates crop watering based on real-time soil moisture and weather data. Features a cross-platform mobile application for remote field monitoring.",
    stack: ["ESP32", "C++", "Flutter", "Firebase"],
    status: "MVP Delivered",
    featuresLabel: "Project Management Role",
    features: [
      "Team Leadership & Agile Project Planning",
      "Risk Management & Quality Assurance",
      "Resource & Budget Allocation",
      "Cross-Platform UI/UX Validation",
      "Deployment Orchestration & Documentation"
    ],
    achievements: [
      "Directed a [[10-member cross-functional team]] through the full SDLC, balancing concurrent hardware assembly and software development.",
      "Resolved critical system latency bottlenecks between Weather APIs and physical triggers using [[graceful fallback mechanisms]].",
      "Mitigated significant hardware failure risks during the deployment of a high-voltage relay system.",
      "Enforced strict IEEE software engineering standards as the technical documentation gatekeeper."
    ],
    demoLink: "https://drive.google.com/drive/u/0/folders/10F5zX2WQkD1nHPUXRCkL0OAivuiGjjjo", 
    repoLink: "https://drive.google.com/drive/u/0/folders/1TfgOjq62G3j7eVsF8hpoWS1rdbKXYC7w",
  }
];

// 2. THE PARSER: Converts [[Text]] into neon highlighted spans
const renderWithHighlight = (text: string) => {
  const parts = text.split(/\[\[(.*?)\]\]/g);
  return parts.map((part, i) => {
    // Every odd index is the captured group inside the brackets
    if (i % 2 === 1) {
      return (
        <strong key={i} className="text-terminal bg-terminal/10 px-1.5 py-0.5 rounded border border-terminal/30 font-mono text-sm shadow-[0_0_10px_rgba(34,197,94,0.2)]">
          {part}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProject]);

  return (
    <section id="projects" className="w-full container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div 
        className="max-w-6xl mx-auto flex flex-col items-start relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-10">
          
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight font-mono uppercase">
            My<span className="text-accent">Projects</span>
          </h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col p-6 md:p-8 rounded-2xl bg-[#0f172a]/80 backdrop-blur-sm cursor-pointer transition-all duration-500
                border-2 border-slate-800 hover:border-accent
                shadow-[0_0_0px_rgba(234,88,12,0)] hover:shadow-[0_0_30px_rgba(234,88,12,0.2)]"
              whileHover={{ y: -5 }}
            >
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-terminal mb-4"> {project.tagline}</p>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.stack.map((tech) => (
                  <span key={tech} className="px-3 py-1 text-xs font-mono rounded-full bg-slate-900 border border-slate-700 text-slate-300 group-hover:border-slate-500 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Activity className="w-5 h-5 text-accent animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* THE MODAL - Upgraded z-index and explicit pointer events */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl pointer-events-auto"
            onClick={() => setSelectedProject(null)} 
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden pointer-events-auto"
            >
              
              {/* Header */}
              <div className="flex justify-between items-start p-6 md:p-8 border-b border-slate-800 bg-slate-900/50">
                <div>
                  <h3 className="text-3xl font-black text-white">{selectedProject.title}</h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-terminal animate-pulse" />
                    <span className="text-sm font-mono text-terminal uppercase tracking-wider">{selectedProject.status}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-transparent hover:border-slate-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Body */}
               <div className="overflow-y-auto p-6 md:p-8 space-y-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"> 
                {/* Description Overview */}
                <div>
                  <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-3">System Overview</h4>
                  <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                    {selectedProject.description}
                  </p>
                </div>
               
                {/* Split Layout: Features (Left) & Achievements (Right) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Key Features / Role */}
                    <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-mono text-accent uppercase tracking-widest mb-4 flex items-center">
                        <ChevronRight className="w-4 h-4 mr-1" /> 
                        {/* Safely injects the label from data, falls back if missing */}
                        {selectedProject.featuresLabel || "Core Features"}
                    </h4>
                    <ul className="space-y-3">
                        {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-slate-300 text-sm">
                            <span className="text-slate-500 mr-2 mt-0.5">•</span>
                            <span className="leading-relaxed">{feature}</span>
                        </li>
                        ))}
                    </ul>
                    </div>

                  {/* Engineering Achievements */}
                  <div className="bg-[#0f172a] p-5 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-mono text-terminal uppercase tracking-widest mb-4 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" /> Technical Achievements
                    </h4>
                    <ul className="space-y-4">
                      {selectedProject.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start text-slate-300 text-sm">
                          <span className="text-terminal mr-2 mt-0.5">▹</span>
                          <span className="leading-relaxed">
                            {/* Run the string through our neon parser */}
                            {renderWithHighlight(achievement)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                {/* NEW: Modal Tech Stack Rendering */}
                    <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-3">Architecture Stack</h4>
                    <div className="flex flex-wrap gap-2">
                    {selectedProject.stack.map((tech) => (
                        <span 
                        key={tech} 
                        className="px-3 py-1.5 text-xs md:text-sm font-mono rounded-md bg-slate-800/50 border border-slate-700 text-slate-300 shadow-sm"
                        >
                        {tech}
                        </span>
                    ))}
                    </div>

                </div>
              </div>

              {/* Footer Buttons */}
              <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row gap-4">
                <a 
                  href={selectedProject.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 bg-accent hover:bg-accent/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-accent/20"
                >
                  <span>View Live Deployment</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <a 
                  href={selectedProject.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 bg-transparent hover:bg-slate-800 border-2 border-slate-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all"
                >
                  <GitBranch className="w-4 h-4" /> 
                  <span>View Source Code</span>
                </a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}