'use client';

import React, { useMemo, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectCard } from './project-card';

// Project Assets (Same as demo.tsx)
import cyberDashboard from "../../assets/cyber_dashboard_preview_1773631906924.png";
import neuralNetwork from "../../assets/neural_network_preview_1773631922396.png";
import secureVault from "../../assets/secure_vault_preview_1773631940742.png";

const PROJECTS = [
  {
    title: "Aegis Dashboard",
    description: "A comprehensive cybernetic monitoring system for edge-node clusters. Optimized for high-throughput data streams.",
    image: cyberDashboard,
    type: "solo" as const,
    tags: ["React", "Three.js", "WebAudio"]
  },
  {
    title: "Neural Grid Protocol",
    description: "Collaboration on a decentralized AI training interface. Implementing complex packet-routing visualizations.",
    image: neuralNetwork,
    type: "collab" as const,
    tags: ["Next.js", "Framer Motion", "Rust"]
  },
  {
    title: "Vault S-047",
    description: "Secure biometric entry portal for high-security digital assets. Features real-time encryption feedback.",
    image: secureVault,
    type: "solo" as const,
    tags: ["TypeScript", "WebWorkers", "CryptoAPI"]
  },
  // Adding placeholders to complete the orbit if needed, or we can just loop the 3
  {
    title: "Project Alpha",
    description: "Experimental orbital node for data synchronization. Features real-time telemetry.",
    image: cyberDashboard,
    type: "solo" as const,
    tags: ["Rust", "WASM"]
  }
];

interface CurvedMenuProps {
  className?: string;
  isSplashFinished: boolean;
  scrollY: number;
}

export function CurvedMenu({ className, isSplashFinished, scrollY }: CurvedMenuProps) {
  const springScroll = useSpring(0, { stiffness: 40, damping: 25 });
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    springScroll.set(scrollY);
  }, [scrollY, springScroll]);
  
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;
  
  // MUCH larger radius for large project cards
  const radius = isMobile ? 500 : isTablet ? 900 : 1200;
  const perspectiveValue = isMobile ? "800px" : "1500px";

  // Calculate rotation mapping
  const rotation = useTransform(springScroll, (val) => {
    // Slower rotation for larger cards
    const rawRot = 0 - (val * 0.05); 
    return rawRot;
  });

  return (
    <div className={cn("absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden", className)}>
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSplashFinished ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {/* Large Holographic Arc */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2400px] h-[2400px] border-[1px] border-cyan-500/10 rounded-full pointer-events-none opacity-20" 
          style={{ 
            clipPath: 'inset(45% 0 45% 0)',
            transform: 'translate(-50%, -50%) rotateX(10deg)' 
          }} 
        />
        
        {/* Carousel Container */}
        <div 
          className="relative w-full h-full flex items-center justify-center pt-20"
          style={{ perspective: perspectiveValue, perspectiveOrigin: 'center 40%' }}
        >
          {PROJECTS.map((project, idx) => {
            // Wider spacing to handle expanded cards without collision
            const itemSpacing = isMobile ? 55 : 45; 
            // Start the first item at angle 0 so it's centered initially
            const baseAngle = idx * itemSpacing;
            
            return (
              <ProjectMenuItem 
                key={idx} 
                project={project} 
                baseAngle={baseAngle} 
                scrollRotation={rotation} 
                radius={radius}
                isMobile={isMobile}
              />
            );
          })}
        </div>

        {/* Global HUD elements */}
        <div className="absolute bottom-10 left-10 flex flex-col gap-1 opacity-20">
           <div className="text-[10px] font-mono text-cyan-400 tracking-[0.4em]">ORBITAL_PHASE: ACTIVE</div>
           <div className="h-[1px] w-32 bg-cyan-400" />
        </div>
      </motion.div>
    </div>
  );
}

function ProjectMenuItem({ project, baseAngle, scrollRotation, radius, isMobile }: any) {
  const angle = useTransform(scrollRotation, (rot: number) => baseAngle + rot);
  
  const x = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * radius);
  const z = useTransform(angle, (a) => (Math.cos((a * Math.PI) / 180) - 1) * radius);
  
  // Rotation to always face "forward" but with slight tilt
  const rotateY = useTransform(angle, (a) => -a / 2);

  const opacity = useTransform(angle, (a) => {
    const absA = Math.abs(a);
    if (absA > 80) return 0;
    return 1 - (absA / 90);
  });
  
  const scale = useTransform(angle, (a) => {
    const absA = Math.abs(a);
    return 1 - (absA / 200);
  });

  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        x,
        z,
        opacity,
        scale,
        rotateY,
      }}
    >
      <div className={cn(
        "transition-all duration-300",
        isMobile ? "scale-[0.7]" : "scale-[0.9] lg:scale-100"
      )}>
        <ProjectCard 
          {...project}
          className="shadow-[0_0_50px_rgba(0,0,0,0.5)] border-white/10"
        />
      </div>
    </motion.div>
  );
}
