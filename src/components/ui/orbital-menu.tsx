'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Code, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
  { name: 'About Protocol', icon: User, angle: -45 },
  { name: 'Experience Ops', icon: Cpu, angle: 45 },
  { name: 'Project Grid', icon: Code, angle: 135 },
  { name: 'Comm Link', icon: Mail, angle: 225 },
];

interface OrbitalMenuProps {
  className?: string;
  isSplashFinished: boolean;
  rotation?: number;
}

export function OrbitalMenu({ className, isSplashFinished, rotation = 0 }: OrbitalMenuProps) {
  return (
    <div className={cn("absolute inset-0 z-30 pointer-events-none flex items-center justify-center", className)}>
      {/* Orbital Ring Container */}
      <motion.div 
        className="relative w-[350px] h-[350px] sm:w-[550px] sm:h-[550px] lg:w-[750px] lg:h-[750px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isSplashFinished ? 1 : 0, 
          scale: isSplashFinished ? 1 : 0.8,
          rotate: 360 + rotation // Combine auto-rotate with scroll rotation
        }}
        transition={{ 
          opacity: { duration: 1, delay: 1 },
          scale: { duration: 1, delay: 1 },
          rotate: { duration: 0, ease: "linear" } // Instant response for scroll
        }}
      >
        {/* Subtle Orbital Path */}
        <div className="absolute inset-0 border border-cyan-500/10 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.05)]" />

        {/* Menu Items */}
        {MENU_ITEMS.map((item, idx) => {
          const radius = "50%"; // Distance from center
          return (
            <motion.div
              key={idx}
              className="absolute pointer-events-auto"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${item.angle}deg) translate(${radius}) rotate(-${item.angle}deg)`,
              }}
              // Counter-rotate the individual item so it stays upright
              animate={{ rotate: -(360 + rotation) }}
              transition={{ duration: 0, ease: "linear" }}
            >
              <motion.div 
                className="group relative -translate-x-1/2 -translate-y-1/2"
                whileHover={{ scale: 1.2 }}
              >
                {/* Connector Line to Center (Subtle) */}
                <div className="absolute top-1/2 left-1/2 w-[20px] h-[1px] bg-cyan-400/20 origin-left -translate-x-full group-hover:w-[40px] group-hover:bg-cyan-400/50 transition-all duration-300 pointer-events-none" />
                
                {/* Icon Container */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 border border-cyan-500/20 bg-black/60 backdrop-blur-xl rounded-2xl flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-900/40 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                   <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:text-cyan-200 transition-colors" />
                   
                   {/* Label (Visible on Hover) */}
                   <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      <span className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-300 uppercase">{item.name}</span>
                   </div>
                </div>

                {/* Pulsing Aura */}
                <div className="absolute inset-0 rounded-2xl bg-cyan-500/10 animate-pulse-slow" />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
