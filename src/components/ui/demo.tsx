'use client'

import { SplineScene } from "@/components/ui/splite";
import NeuralBackground from "@/components/ui/flow-field-background";
import { motion } from "framer-motion";
import { Hexagon, Terminal, User, Cpu, ShieldAlert, CpuIcon, Code, Mail } from "lucide-react";

import React, { useState } from "react";
import ParticleText from "./particle-text";
import { TextShimmer } from "./text-shimmer";
import { CurvedMenu } from "./curved-menu";
import { ProjectCard } from "./project-card";

// Project Assets
import cyberDashboard from "../../assets/cyber_dashboard_preview_1773631906924.png";
import neuralNetwork from "../../assets/neural_network_preview_1773631922396.png";
import secureVault from "../../assets/secure_vault_preview_1773631940742.png";

export function SplineSceneBasic() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const [isPortalActive, setIsPortalActive] = useState(false);

  return (
    <div className="w-full min-h-[1500px] relative bg-[#020617] overflow-x-hidden">
      
      {/* Absolute container that keeps content centered in the viewport */}
      <div className="fixed inset-0 w-full h-screen flex items-center justify-center pointer-events-none">
        
        {/* Warm Alabaster Background Fade-out (Splash) */}
        <motion.div 
          className="absolute inset-0 z-[100] bg-[#F5F5F0] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isSplashFinished ? 0 : 1 }}
          transition={{ duration: 2, ease: "easeInOut" }} 
        />

        {/* Portal Flash Overlay */}
        <motion.div 
          className="absolute inset-0 z-[200] bg-[#020617] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isPortalActive ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        />

        {/* Particle Overlay (Centered Splash) */}
        <motion.div 
          className="absolute inset-0 z-[110] flex flex-col items-center justify-center"
          animate={{ opacity: isSplashFinished ? 0 : 1 }}
          transition={{ duration: 1 }}
        >
          <ParticleText 
            text="HORIZON" 
            onComplete={() => setIsSplashFinished(true)} 
            className="absolute inset-0 w-full h-full"
            particleColor={isSplashFinished ? "white" : "#1A2B3C"}
          />
          
          {/* Loading Indicator beneath HORIZON */}
          <motion.div className="relative mt-[15vh] flex flex-col items-center">
            <TextShimmer 
              className='font-mono text-[10px] sm:text-xs tracking-[0.5em] text-[#1A2B3C]/40 [--base-color:rgba(26,43,60,0.3)] [--base-gradient-color:#1A2B3C]' 
              duration={2.5}
            >
              SYSTEM_INITIALIZATION_IN_PROGRESS
            </TextShimmer>
          </motion.div>
        </motion.div>

        {/* Main Immersive Layer */}
        <motion.div 
          className="absolute inset-0 z-[1] w-full h-full"
          initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
          animate={{ 
            scale: isSplashFinished ? 1 : 0.9, 
            opacity: isSplashFinished ? 1 : 0,
            filter: isSplashFinished ? "blur(0px)" : "blur(10px)"
          }}
          transition={{ duration: 2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Background Visuals - Moved to negative z-index to be truly behind everything */}
          <div className="absolute inset-0 z-[-1]">
            <NeuralBackground 
              color="#22d3ee"
              trailOpacity={0.08}
              particleCount={400}
              speed={0.6}
              isPortalActive={isPortalActive}
            />
          </div>

          {/* 3D Scene Backdrop - Increased opacity and solid blending to make it clearer */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div 
              className="w-full h-full scale-[1.0] lg:scale-[1.2] opacity-70 pointer-events-auto"
              style={{
                WebkitMaskImage: 'radial-gradient(circle, black 35%, transparent 85%)',
                maskImage: 'radial-gradient(circle, black 35%, transparent 85%)'
              }}
            >
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Orbital Projects Gallery */}
          <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center">
            <CurvedMenu 
              isSplashFinished={isSplashFinished} 
              onPortalTrigger={() => setIsPortalActive(true)}
            />
          </div>

          {/* Immersive HUD (Overlay Elements) */}
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
            <motion.header 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isSplashFinished ? 1 : 0, y: isSplashFinished ? 0 : -20 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="w-full flex justify-between items-start pointer-events-auto"
            >
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tighter text-white/90">HORIZON</h1>
                <div className="h-[2px] w-8 bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </div>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase">Subspace_Status</span>
                 <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-white uppercase tracking-tighter transition-all">Encrypted_Link</span>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                 </div>
              </div>
            </motion.header>

            {/* Bottom Status Layer */}
            <motion.footer
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isSplashFinished ? 1 : 0, y: isSplashFinished ? 0 : 30 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="w-full flex flex-col items-center gap-6"
            >
               {/* Scroll Indicator */}
               <div className="flex flex-col items-center gap-3">
                  <span className="text-[8px] font-mono text-cyan-400/40 tracking-[0.5em] uppercase">Scroll to Rotate Orbit</span>
                  <div className="w-[1px] h-12 bg-gradient-to-t from-cyan-400/60 to-transparent" />
               </div>

               <div className="w-full max-w-xl h-14 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full flex items-center justify-around px-10 relative overflow-hidden group pointer-events-auto cursor-help">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="flex flex-col items-center">
                     <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase mb-1">Grid_Nodes</span>
                     <span className="text-xs font-bold text-cyan-400 tracking-widest">PRO_04</span>
                  </div>
                  <div className="w-[1px] h-6 bg-white/10" />
                  <div className="flex flex-col items-center">
                     <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase mb-1">Signal</span>
                     <span className="text-xs font-bold text-cyan-400 tracking-widest text-shadow-glow">OPTIMAL</span>
                  </div>
               </div>
            </motion.footer>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 z-[-1] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,2,10,0.4) 60%, rgba(0,2,10,1) 100%)' }} />
          </div>

        </motion.div>
      </div>
    </div>
  );
}
