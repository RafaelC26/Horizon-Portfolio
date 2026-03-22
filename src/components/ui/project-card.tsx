import { motion } from "framer-motion";
import { User, Cpu, Code, ExternalLink, Users, ShieldAlert, Code2, Globe } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  image: any;
  type: "solo" | "collab";
  tags: string[];
  link?: string;
  className?: string;
  onPortalTrigger?: () => void;
}

export function ProjectCard({ 
  title, 
  description, 
  image, 
  type, 
  tags, 
  className,
  onPortalTrigger
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const navigate = useNavigate();
  const isCollab = type === 'collab';

  const handleVisitProject = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPortal(true);
    if (onPortalTrigger) {
      onPortalTrigger();
    }
    setTimeout(() => {
      const id = title.toLowerCase().replace(/\s+/g, '-');
      navigate(`/project/${id}`);
    }, 1200);
  };

  const accentColor = isCollab ? 'text-violet-400' : 'text-cyan-400';
  const borderColor = isCollab ? 'border-violet-500/30' : 'border-cyan-500/30';
  const glowShadow = isCollab ? 'shadow-[0_0_20px_rgba(139,92,246,0.1)]' : 'shadow-[0_0_20px_rgba(34,211,238,0.1)]';
  const hoverBorder = isCollab ? 'group-hover:border-violet-400/60' : 'group-hover:border-cyan-400/60';

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ 
        height: isHovered ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 450 : 550) : 320,
        y: isHovered ? -10 : 0
      }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "group relative w-[280px] sm:w-[350px] bg-black/60 backdrop-blur-2xl border rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500",
        borderColor,
        glowShadow,
        hoverBorder,
        className
      )}
    >
      <AnimatePresence>
        {showPortal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0116]/90 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-[#a259e6] to-[#22d3ee] flex items-center justify-center shadow-2xl"
            >
              <span className="text-white text-lg font-bold tracking-widest">PORTAL</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* HUD Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.02)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />

      {/* Top Decorative Header */}
      <div className="h-10 w-full flex items-center justify-between px-6 border-b border-white/5 relative bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isCollab ? "bg-violet-400 shadow-[0_0_8px_#8b5cf6]" : "bg-cyan-400 shadow-[0_0_8px_#22d3ee]")} />
          <span className="text-[8px] font-mono tracking-[0.2em] text-white/40 uppercase">
             {isCollab ? "LINKED_NODE" : "SOLO_NODE"}
          </span>
        </div>
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          className="flex items-center gap-1.5 translate-y-[1px]"
        >
          {isCollab ? <Users className="w-3 h-3 text-violet-400/60" /> : <User className="w-3 h-3 text-cyan-400/60" />}
          <span className={cn("text-[8px] font-bold tracking-widest uppercase", accentColor)}>
            {isCollab ? "Convenio" : "Solo"}
          </span>
        </motion.div>
      </div>

      {/* Image Visualization Layer */}
      <div className="relative h-48 sm:h-56 shrink-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
        />
        
        {/* Tech Badges container - Floats over image during hover */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
          {tags.slice(0, 3).map((tag, i) => (
            <motion.span 
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              transition={{ delay: 0.1 * i }}
              className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-mono text-white/70 tracking-wider"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-black text-white tracking-tighter uppercase group-hover:text-cyan-400 transition-colors">
            {title}
          </h3>
          <div className={cn("h-[2px] w-12 mt-1", isCollab ? "bg-violet-500/40" : "bg-cyan-500/40")} />
        </div>

        {/* Expandable Content */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? 0 : -20,
            display: isHovered ? 'block' : 'none'
          }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <p className="text-sm text-white/50 leading-relaxed font-light">
            {description}
          </p>

          {/* Interaction Footer */}
          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex gap-2">
               <Code2 className="w-3.5 h-3.5 text-white/20 hover:text-cyan-400/40 transition-colors" />
               <Globe className="w-3.5 h-3.5 text-white/20 hover:text-cyan-400/40 transition-colors" />
               <Cpu className="w-3.5 h-3.5 text-white/20 hover:text-cyan-400/40 transition-colors" />
            </div>
            
            <button 
              onClick={handleVisitProject}
              className={cn(
                "group/btn relative px-3 py-1.5 flex items-center gap-2 overflow-hidden rounded-lg transition-all duration-300",
                isCollab ? "bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20" : "bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20"
              )}
            >
              <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/80 uppercase active:scale-95 transition-transform">
                NEURAL_LINK
              </span>
              <ExternalLink className={cn("w-2.5 h-2.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform", accentColor)} />
            </button>
          </div>
        </motion.div>

        {/* Compact Hint - Shown when not hovered */}
        <motion.div
          animate={{ opacity: isHovered ? 0 : 1 }}
          className="mt-2 text-[8px] font-mono text-cyan-400/40 uppercase tracking-[0.3em]"
        >
          Click to initialize...
        </motion.div>
      </div>

      {/* Ambient Corners */}
      <div className={cn("absolute top-0 left-0 w-6 h-6 border-t border-l opacity-30 rounded-tl-[2rem]", isCollab ? "border-violet-400/40" : "border-cyan-400/40")} />
      <div className={cn("absolute bottom-0 right-0 w-6 h-6 border-b border-r opacity-30 rounded-br-[2rem]", isCollab ? "border-violet-400/40" : "border-cyan-400/40")} />
    </motion.div>
  );
}
