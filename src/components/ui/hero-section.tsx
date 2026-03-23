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
  titleLine1 = "BEYOND",
  titleLine2 = "REALITY",
  subtitle = "Experimenta la convergencia entre el código puro y la conciencia humana. Rediseñando los límites del espacio digital.",
  ctaText = "INICIAR SECUENCIA",
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
            className="text-6xl md:text-7xl lg:text-[6rem] font-black leading-[0.9] tracking-tighter mb-6 flex flex-col"
          >
            <span className="text-white uppercase">{titleLine1}</span>
            <span className="text-transparent uppercase [-webkit-text-stroke:2px_white]">{titleLine2}</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="border-l-[3px] border-white/20 pl-5 mb-10"
          >
            <p className="text-gray-300 text-base md:text-lg font-light italic max-w-md leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
          
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
           className="pointer-events-auto w-fit"
          >
            <button 
              onClick={onExplore}
              className="bg-white text-black font-black text-xs md:text-sm tracking-tighter uppercase px-12 py-5 hover:bg-gray-200 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
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
