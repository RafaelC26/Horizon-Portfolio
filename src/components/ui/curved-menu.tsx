'use client';

import React, { useMemo, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { User, Cpu, Code, Mail, Database, Zap, Shield, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

const MENU_ITEMS = [
  { name: 'Identity Protocol', icon: User },
  { name: 'Core Engine', icon: Cpu },
  { name: 'Neural Grid', icon: Code },
  { name: 'Subspace Links', icon: Mail },
  { name: 'Data Vault', icon: Database },
  { name: 'Power Matrix', icon: Zap },
  { name: 'Security Layer', icon: Shield },
  { name: 'Project Shell', icon: Layout },
];

interface CurvedMenuProps {
  className?: string;
  isSplashFinished: boolean;
  scrollY: number;
}

export function CurvedMenu({ className, isSplashFinished, scrollY }: CurvedMenuProps) {
  // Use a spring for smooth Assassin's Creed style movement
  const springScroll = useSpring(0, { stiffness: 50, damping: 20 });
  
  // Update the spring value when scrollY prop changes
  useEffect(() => {
    springScroll.set(scrollY);
  }, [scrollY, springScroll]);
  
  // Calculate base rotation from scroll
  // Start at 70 (centers first item). Subtracting as we scroll down.
  // We clamp between 70 (first item) and -70 (last item) so it doesn't spin into void.
  // Calibrated to 0.1 for ~2500px total page height.
  const rotation = useTransform(springScroll, (val) => {
    const rawRot = 70 - (val * 0.1);
    return Math.max(-70, Math.min(70, rawRot));
  });

  return (
    <div className={cn("absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden", className)}>
      <motion.div 
        className="relative w-full h-[600px] flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isSplashFinished ? 1 : 0, 
          scale: isSplashFinished ? 1 : 0.9,
        }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Holographic Arc visual effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border-[1px] border-cyan-500/5 rounded-full pointer-events-none" 
             style={{ clipPath: 'inset(40% 0 40% 0)' }} />
        
        {/* The Carousel Container */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
          {MENU_ITEMS.map((item, idx) => {
            // Space items along a curve
            const itemSpacing = 20; 
            const baseAngle = (idx - (MENU_ITEMS.length - 1) / 2) * itemSpacing;
            
            return (
              <MenuItem 
                key={idx} 
                item={item} 
                baseAngle={baseAngle} 
                scrollRotation={rotation} 
              />
            );
          })}
        </div>

        {/* Floating UI HUD elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-1 h-8 bg-gradient-to-t from-cyan-400 to-transparent opacity-50" />
            <div className="text-[10px] font-mono text-cyan-300/40 tracking-[0.3em] uppercase">Manual Override Active</div>
        </div>
      </motion.div>
    </div>
  );
}

function MenuItem({ item, baseAngle, scrollRotation }: { item: any; baseAngle: number; scrollRotation: any }) {
  // Dynamic calculation of position on the "curved screen"
  const angle = useTransform(scrollRotation, (rot: number) => baseAngle + rot);
  
  // X and Z position based on the arc
  const radius = 600;
  const x = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * radius);
  const z = useTransform(angle, (a) => (Math.cos((a * Math.PI) / 180) - 1) * radius);
  
  // Opacity and Scale based on "distance" (Z and X)
  const opacity = useTransform(angle, (a) => {
    const absA = Math.abs(a);
    if (absA > 60) return 0;
    return 1 - (absA / 70);
  });
  
  const scale = useTransform(angle, (a) => {
    const absA = Math.abs(a);
    return 1 - (absA / 180);
  });

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-pointer"
      style={{
        x,
        z,
        opacity,
        scale,
      }}
    >
      <motion.div 
        className="group relative flex flex-col items-center"
        whileHover={{ y: -5 }}
      >
        {/* Holographic Frame */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 border border-cyan-500/20 bg-black/40 backdrop-blur-md rounded-lg flex flex-col items-center justify-center group-hover:border-cyan-400/60 group-hover:bg-cyan-900/20 transition-all duration-300 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.05)]">
            {/* Scanlines Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.05)_50%)] bg-[length:100%_4px] opacity-20" />
            
            {/* Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/40" />

            <item.icon className="w-8 h-8 text-cyan-400/80 group-hover:text-cyan-300 group-hover:scale-110 transition-all" />
            
            <div className="mt-3 px-2 text-center">
              <span className="text-[9px] font-mono tracking-widest text-cyan-200/60 uppercase group-hover:text-cyan-100 transition-colors">
                {item.name}
              </span>
            </div>
            
            {/* Selection Glitch Bar */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
        </div>
        
        {/* Shadow Projection beneath */}
        <div className="w-12 h-1 bg-cyan-500/20 blur-md rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </motion.div>
  );
}
