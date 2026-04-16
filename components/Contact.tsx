/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Calling the Next.js API Route (Nodemailer)
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to transmit data");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);

    } catch (error: any) {
      console.error("Transmission Error:", error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <section id="contact" className="w-full container mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div variants={fadeUp} className="mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight font-mono uppercase">
            Contact<span className="text-accent">Me</span>
          </h2>
          <p className="mt-2 text-slate-400 font-black text-medium">
            A secure communication channel for inquiries, collaborations, or job/internships opportunities.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          variants={fadeUp} 
          className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-800 p-6 md:p-10 rounded-2xl space-y-6 shadow-2xl shadow-black/50"
        >
          {/* Status Alerts */}
          {status === 'success' && (
            <div className="bg-green-500/10 border-l-4 border-green-500 text-green-400 p-4 rounded-r-lg text-sm font-mono flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Message sent successfully. I will respond shortly.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-500/10 border-l-4 border-red-500 text-red-400 p-4 rounded-r-lg text-sm font-mono flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Transmission failed: {errorMessage}
            </div>
          )}

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-md font-mono font-bold uppercase tracking-widest text-slate-400">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="Luigi Lomano"
              />
            </div>
            <div className="space-y-2">
              <label className="text-md font-mono font-bold uppercase tracking-widest text-slate-400">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="luigilomano@email.com"
              />
            </div>
          </div>

          {/* Row 2: Subject */}
          <div className="space-y-2">
            <label className="text-md font-mono font-bold uppercase tracking-widest text-slate-400">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              placeholder="Freelance Project / Internship Opportunity"
            />
          </div>

          {/* Row 3: Message */}
          <div className="space-y-2">
            <label className="text-md font-mono font-bold uppercase tracking-widest text-slate-400">Message Payload</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all min-h-[150px] resize-y"
              placeholder="Enter your message..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full flex items-center justify-center space-x-2 bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === "idle" && <><Send className="w-5 h-5" /> <span>Send Message</span></>}
            {status === "loading" && <><Loader2 className="w-5 h-5 animate-spin" /> <span>Sending...</span></>}
            {status === "success" && <><CheckCircle2 className="w-5 h-5" /> <span>Sent</span></>}
            {status === "error" && <><AlertCircle className="w-5 h-5" /> <span>Please Retry</span></>}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}