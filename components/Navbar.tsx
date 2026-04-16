"use client";

import Link from "next/link";
import { Menu, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose, 
} from "@/components/ui/sheet";

export default function Navbar() {
  const routes = [
    { name: "About", href: "/#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Skills", href: "/#stack" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-[#0f172a]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#0f172a]/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        
        <Link href="/#hero" className="flex items-baseline space-x-2 group">
          <span className="font-black text-3xl tracking-tighter text-accent transition-transform group-hover:scale-105">
            RM<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center space-x-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-sm font-mono font-bold uppercase tracking-widest text-secondary transition-colors hover:text-terminal"
            >
              <span className="text-slate-600 mr-1">&gt;</span>
              {route.name}
            </Link>
          ))}
          
          {/* Main CTA - Hire Me / Contact */}
          <Button asChild className="bg-transparent text-terminal hover:bg-terminal/10 font-mono font-bold rounded-md border border-terminal transition-all shadow-[0_0_10px_rgba(34,197,94,0.1)] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <Link href="/#contact">
               Contact Me
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation (Hidden on Desktop) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-slate-800 text-secondary group">
                <Menu className="h-8 w-8 transition-transform group-hover:text-terminal group-active:scale-95" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] border-l border-slate-800 bg-[#0f172a] overflow-hidden">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              
              {/* Spinning Terminal Gimmick - Cypherpunk vibe */}
              <div className="absolute -bottom-16 -right-16 text-terminal/5 pointer-events-none">
                <Terminal className="w-80 h-80 animate-[spin_20s_linear_infinite]" />
              </div>

              <nav className="flex flex-col space-y-6 mt-20 relative z-10 pl-4">
                {routes.map((route) => (
                  <SheetClose asChild key={route.href}>
                    <Link
                      href={route.href}
                      className="group relative flex items-center w-full text-2xl font-mono font-black uppercase tracking-tighter text-secondary transition-all"
                    >
                      {/* Neon Green Hover Line */}
                      <span className="absolute -left-4 w-0 h-full bg-terminal transition-all duration-300 ease-out group-hover:w-1 rounded-r-md opacity-0 group-hover:opacity-100" />
                      
                      <span className="transform transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:text-terminal">
                        <span className="text-slate-700 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">./</span>
                        {route.name}
                      </span>
                    </Link>
                  </SheetClose>
                ))}
                
                {/* Mobile CTA */}
                <div className="pt-8 flex">
                  <SheetClose asChild>
                    <Link href="/#contact">
                      <Button className="bg-accent text-white hover:bg-accent/80 font-black text-xl py-6 px-10 rounded-md transition-all shadow-[0_0_15px_rgba(234,88,12,0.2)] hover:-translate-y-1 hover:scale-[1.02] active:scale-95">
                        Contact Me
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}