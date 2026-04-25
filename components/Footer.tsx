import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const routes = [
    { name: "Home", href: "/#hero" },
    { name: "Projects", href: "/#projects" },
    { name: "Tech Stack", href: "/#stack" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <footer className="w-full bg-transparent backdrop-blur-sm text-slate-300 py-8 px-6 border-t-[8px] border-terminal font-mono relative z-10">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start gap-10">
        
        {/* Column 1: Brand & Contact */}
        <div className="space-y-4 max-w-sm">
          <Link href="/#home" className="flex items-center space-x-2">
            <span className="font-black text-4xl tracking-tighter text-white transition-transform group-hover:scale-105">
                RM<span className="text-accent animate-pulse">_</span>
            </span>
          </Link>

          <div className="space-y-2 font-medium text-slate-300 font-mono text-sm">
            <a 
              href="mailto:musuka.ryan@gmail.com" 
              className="block hover:text-accent transition-colors duration-300 flex items-center group"
            >
              musuka.ryan@gmail.com
            </a>

            <a 
              href="tel:+263786505496" 
              className="block hover:text-accent transition-colors duration-300 flex items-center group"
            >
              +263 78 650 5496
            </a>

            <div className="flex items-center text-slate-300">
              Harare, Zimbabwe
            </div>
          </div>
        </div>

        {/* Column 2: Vertical Navigation Links */}
        <div className="flex flex-col space-y-3">
          <h4 className="font-black text-lg uppercase tracking-widest text-slate-500 mb-2">Explore</h4>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-slate-300 hover:text-accent active:text-green-500 text-medium font-medium tracking-wider uppercase transition-colors w-fit gap-1">
              {route.name}
            </Link>
          ))}
        </div>

        {/* Column 3: Socials */}
        <div className="flex flex-col space-y-3 gap-1">
          <h4 className="font-black text-lg uppercase tracking-widest text-slate-500 mb-2">Connect</h4>
          <Link href="https://www.linkedin.com/in/ryan-musuka" target="_blank" className="text-slate-300 hover:text-accent active:text-green-500 text-medium font-medium tracking-wider uppercase transition-colors w-fit">
            LinkedIn
          </Link>
          <Link href="https://github.com/ryanmusuka" target="_blank" className="text-slate-300 hover:text-accent active:text-green-500 text-medium font-medium tracking-wider uppercase transition-colors w-fit">
            GitHub
          </Link>
          <Link href="https://wa.me/263786505496" target="_blank" className="text-slate-300 hover:text-accent active:text-green-500 text-medium font-medium tracking-wider uppercase transition-colors w-fit">
            WhatsApp
          </Link>
        </div>
      </div>

      {/* Terminal Divider & Copyright */}
      <Link href="https://www.linkedin.com/in/ryan-musuka" target="_blank" className="text-slate-300 hover:text-accent active:text-green-500 text-medium font-medium tracking-wider uppercase transition-colors w-fit">
        <div className="container mx-auto max-w-7xl mt-12 border-t border-dashed border-slate-800 flex flex-col md:flex-row justify-center items-center gap-2 text-xs text-slate-500 font-medium text-center">
          <p>
            Portfolio &copy; {currentYear}
          </p>
          <span className="hidden md:inline text-slate-700">|</span>
          <p>
            Engineered by <span className="text-slate-300">Ryan Musuka</span> using Next.js, TypeScript, & Tailwind CSS.
          </p>
        </div>
      </Link>
    </footer>
  );
}