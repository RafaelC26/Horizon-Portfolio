import React from "react";
import { motion } from "framer-motion";
import { Search, MessageSquare } from "lucide-react";

export function HeroSection({
  navLinks = [
    { href: "#", label: "Explore" },
    { href: "#", label: "Community" },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ],
  titleLine1 = "Experience",
  titleLine2 = "The Future",
  subtitle = "Redefining the boundaries between technology and human expression.",
  ctaText = "Explore The Collection",
  bottomLeftText = "03. Aura",
  onExplore,
}: {
  navLinks?: { href: string; label: string; }[];
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  ctaText?: string;
  bottomLeftText?: string;
  onExplore?: () => void;
}) {
  return (
    <div className="absolute inset-0 w-full h-full text-white font-sans pointer-events-none flex flex-col justify-between selection:bg-white/30 z-[70]">
      
      {/* HEADER NAV */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full px-6 py-6 md:px-12 flex justify-between items-center pointer-events-none"
      >
        <div className="flex flex-col items-start pointer-events-auto cursor-pointer group">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white select-none">
            HORIZON
          </span>
          <div className="h-[3px] w-12 bg-cyan-400 mt-1 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all group-hover:w-full" />
        </div>
        
        <nav className="hidden lg:flex space-x-8 text-[13px] font-medium tracking-wide pointer-events-auto">
          {navLinks?.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-cyan-300 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side placeholder to maintain center alignment */}
        <div className="hidden lg:block w-24"></div>
      </motion.header>

      {/* MAIN CONTENT */}
      <main className="w-full px-6 md:px-16 flex-1 flex flex-col justify-center pointer-events-none">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight mb-6"
          >
            {titleLine1} <br /> {titleLine2}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-gray-300/80 text-lg md:text-xl font-light max-w-sm mb-10 leading-relaxed"
          >
            {subtitle}
          </motion.p>
          
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
           className="pointer-events-auto w-fit"
          >
            <button 
              onClick={onExplore}
              className="bg-white text-black font-semibold text-[15px] px-8 py-3.5 rounded-2xl hover:bg-gray-100 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              {ctaText}
            </button>
          </motion.div>
        </div>
      </main>

      {/* FOOTER */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="w-full px-6 py-8 md:px-12 flex justify-between items-end pointer-events-none"
      >
        {/* Left placeholder to maintain right alignment of chat button */}
        <div className="w-10"></div>
        
        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full w-12 h-12 flex items-center justify-center transition-all pointer-events-auto">
          <MessageSquare className="w-5 h-5 text-white" />
        </button>
      </motion.footer>

    </div>
  );
}
