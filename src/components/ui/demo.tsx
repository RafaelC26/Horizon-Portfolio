'use client'

import { SplineScene } from "@/components/ui/splite";
import NeuralBackground from "@/components/ui/flow-field-background";
import { motion } from "framer-motion";
import { Hexagon, Terminal, User, Cpu, ShieldAlert, CpuIcon, Code, Mail } from "lucide-react";

import React, { useState } from "react";
import ParticleText from "./particle-text";
import { TextShimmer } from "./text-shimmer";
import { CurvedMenu } from "./curved-menu";

export function SplineSceneBasic() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-[2500px] relative bg-transparent overflow-x-hidden">
      
      {/* Absolute container that keeps content centered in the viewport */}
      <div className="fixed inset-0 w-full h-screen flex items-center justify-center pointer-events-none">
        
        {/* Warm Alabaster Background Fade-out */}
        <motion.div 
          className="absolute inset-0 z-[50] bg-[#F5F5F0] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isSplashFinished ? 0 : 1 }}
          transition={{ duration: 2, ease: "easeInOut" }} 
        />

        {/* Particle Overlay (Centered Splash) */}
        <motion.div 
          className="absolute inset-0 z-[60] flex flex-col items-center justify-center"
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
          <motion.div 
            className="relative mt-[15vh] flex flex-col items-center"
          >
            <TextShimmer 
              className='font-mono text-[10px] sm:text-xs tracking-[0.5em] text-[#1A2B3C]/40 [--base-color:rgba(26,43,60,0.3)] [--base-gradient-color:#1A2B3C]' 
              duration={2.5}
            >
              SYSTEM_INITIALIZATION_IN_PROGRESS
            </TextShimmer>
            
            {/* Subtle line below text */}
            <motion.div 
              className="h-[1px] bg-[#1A2B3C]/10 mt-4"
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Main Content with 3D Entry Effect */}
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
          {/* Glowing Neural Flow Background (behind Spline) */}
          <div className="absolute inset-0 z-0 opacity-100">
            <NeuralBackground 
              color="#22d3ee" // Cyan glowing lines
              trailOpacity={0.08} // Strong trails
              particleCount={1000} // Dense system
              speed={1.0} // Smooth flow speed
            />
          </div>

          {/* 3D Scene Backdrop */}
          <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
            {/* Scale the scene up and push it down, plus add a gradient mask so the base fades smoothly into the ice */}
            <div 
              className="w-full h-full scale-[1.4] translate-y-24 sm:scale-[1.6] sm:translate-y-32 lg:scale-[1.4] lg:translate-y-20 pointer-events-auto"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 95%)'
              }}
            >
              <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
            </div>
          </div>

          {/* Assassin's Creed Style Curved Menu */}
          <CurvedMenu isSplashFinished={isSplashFinished} scrollY={scrollY} />

          {/* Cybernetic Vignette Overlay */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none" 
            style={{ background: 'radial-gradient(ellipse at center, transparent 15%, rgba(0,10,30,0.6) 65%, rgba(0,0,10,1) 100%)' }} 
          />

          {/* Immersive UI Container */}
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
            
            {/* Top Header with Instant Logo */}
            <motion.header 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="w-full flex justify-between items-start pointer-events-auto"
            >
              {/* Static Logo: Appears after splash without animation "flight" */}
              <motion.div 
                className="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSplashFinished ? 1 : 0 }}
                transition={{ duration: 1 }}
              >
                <h1 className="text-2xl font-extrabold tracking-tighter text-white/90 font-['Plus_Jakarta_Sans']">
                  HORIZON
                </h1>
                <div className="h-[2px] w-8 bg-cyan-400 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              </motion.div>
              
              <div className="flex gap-4">
                 <div className="w-12 h-12 border border-cyan-500/20 bg-cyan-950/20 backdrop-blur-md rounded-xl flex items-center justify-center relative group cursor-pointer hover:bg-cyan-900/40 hover:border-cyan-400/50 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <ShieldAlert className="text-cyan-300 w-5 h-5 group-hover:scale-110 transition-transform" />
                 </div>
              </div>
            </motion.header>

            {/* Side Panels */}
            <div className="flex-1 w-full flex justify-between items-center mt-4">
              
              {/* Center Spacer / Orbital Menu Area */}
            <div className="flex-1 w-full" />
          </div>

            {/* Bottom Footer / Action Bar */}
            <motion.footer 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="w-full flex justify-center mt-6 pointer-events-auto"
            >
              <div className="h-16 w-full max-w-xl border border-cyan-500/30 bg-black/60 backdrop-blur-2xl rounded-full relative overflow-hidden flex items-center justify-around px-8 shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(6,182,212,0.1)]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[10px] bg-cyan-500/30 blur-xl" />
                
                {/* Nav dots */}
                {[1,2,3,4].map(i => (
                  <div 
                    key={i} 
                    className={`cursor-pointer transition-all duration-300 flex items-center justify-center ${i === 1 ? 'w-10 h-2 bg-cyan-400 rounded-full shadow-[0_0_12px_#22d3ee]' : 'w-2 h-2 rounded-full bg-cyan-600/40 hover:bg-cyan-400 hover:scale-150 hover:shadow-[0_0_10px_#22d3ee]'}`} 
                  />
                ))}
              </div>
            </motion.footer>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
