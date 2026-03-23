'use client'

import { SplineScene } from "@/components/ui/splite";
import NeuralBackground from "@/components/ui/flow-field-background";
import ShaderBackground from "@/components/ui/shader-background";
import { motion } from "framer-motion";
import { Hexagon, Terminal, User, Cpu, ShieldAlert, CpuIcon, Code, Mail } from "lucide-react";

import React, { useState, useRef } from "react";
import ParticleText from "./particle-text";
import { TextShimmer } from "./text-shimmer";
import { CurvedMenu } from "./curved-menu";
import { ProjectCard } from "./project-card";
import { HeroSection } from "./hero-section";
import { ShaderAnimation } from "@/components/ui/shader-lines";
import { TechStackGraph } from "@/components/ui/tech-stack-graph";

// Project Assets
import cyberDashboard from "../../assets/cyber_dashboard_preview_1773631906924.png";
import neuralNetwork from "../../assets/neural_network_preview_1773631922396.png";
import secureVault from "../../assets/secure_vault_preview_1773631940742.png";

export function SplineSceneBasic() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const [isHeroFinished, setIsHeroFinished] = useState(false);
  const [isPortalActive, setIsPortalActive] = useState(false);
  const [robotBig, setRobotBig] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  const isMobile = windowSize.width < 768;

  return (
    <div className="w-full relative bg-black overflow-x-hidden font-sans">

      {/* 
        SPLASH OVERLAYS 
        These fade out completely but cover the entire viewport while active 
      */}
      <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
        {/* Warm Alabaster Background Fade-out (Splash) */}
        <motion.div
          className="absolute inset-0 bg-[#F5F5F0]"
          initial={{ opacity: 1 }}
          animate={{ opacity: isSplashFinished ? 0 : 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {/* Particle Overlay (Centered Splash) */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          animate={{ opacity: isSplashFinished ? 0 : 1 }}
          transition={{ duration: 1 }}
        >
          <ParticleText
            text="HORIZON"
            onComplete={() => setIsSplashFinished(true)}
            className="absolute inset-0 w-full h-full"
            particleColor={isSplashFinished ? "white" : "#1A2B3C"}
          />
          <motion.div className="relative mt-[15vh] flex flex-col items-center">
            <TextShimmer
              className="font-mono text-[10px] sm:text-xs tracking-[0.5em] text-[#1A2B3C]/40 [--base-color:rgba(26,43,60,0.3)] [--base-gradient-color:#1A2B3C]"
              duration={2.5}
            >
              SYSTEM_INITIALIZATION_IN_PROGRESS
            </TextShimmer>
          </motion.div>
        </motion.div>
      </div>

      {/* Portal Flash Overlay */}
      <motion.div
        className="fixed inset-0 z-[200] bg-[#020617] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isPortalActive ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      />


      {/* 
        SECTION 1: CUBES HERO 
        Fills the first 100vh block 
      */}
      <section className="relative w-full h-screen overflow-hidden bg-black z-10 flex">
        <motion.div
          className="absolute inset-0 w-full h-full z-[60] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSplashFinished ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {isSplashFinished && (
            <div className="absolute inset-0 pointer-events-auto flex items-center justify-center">
              <div
                className="w-[120vw] h-[120vh] min-w-[120vw] min-h-[120vh] flex items-center justify-center transform scale-[1.1] sm:scale-[1.15] md:scale-125 origin-center"
                onWheelCapture={(e) => {
                  window.scrollBy({ top: e.deltaY, behavior: 'auto' });
                }}
              >
                <SplineScene
                  scene="https://prod.spline.design/pWL7xNzp7uAdADPI/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
              <HeroSection onExplore={() => {
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
              }} />
            </div>
          )}
        </motion.div>
      </section>


      {/* 
        SECTION 2: ROBOT & GRIDS 
        Exactly 100vh document space. Contains an internal native scrolling component to decouple the 3D scroll logic from the main page scrollbar.
      */}
      <section className="w-full h-screen relative z-20 bg-[#020617]">
        <div 
          ref={scrollContainerRef}
          className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden"
        >
          <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">

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
            {/* Background Visuals */}
            <div className="absolute inset-0 z-[-1] pointer-events-none">
              <div className="absolute inset-0 w-full h-full">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: robotBig ? 0 : 1 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <NeuralBackground
                    color={robotBig ? "#a259e6" : "#22d3ee"}
                    trailOpacity={0.08}
                    particleCount={400}
                    speed={0.6}
                    isPortalActive={isPortalActive}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: robotBig ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <ShaderBackground />
                </motion.div>
              </div>
            </div>

            {/* 3D Scene Backdrop (Robot) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <motion.div
                className={
                  'w-full h-full pointer-events-none ' +
                  (robotBig ? 'opacity-100' : 'opacity-70')
                }
                animate={
                  robotBig 
                    ? (isMobile ? { scale: 1.5, x: '-8%', y: '20%' } : { scale: 2.2, x: '-35%', y: '32%' }) 
                    : { scale: 1.0, x: 0, y: 0 }
                }
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                style={{
                  WebkitMaskImage: robotBig
                    ? 'linear-gradient(to right, black 50%, transparent 100%)'
                    : 'radial-gradient(circle, black 35%, transparent 85%)',
                  maskImage: robotBig
                    ? 'linear-gradient(to right, black 50%, transparent 100%)'
                    : 'radial-gradient(circle, black 35%, transparent 85%)',
                }}
              >
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </motion.div>
            </div>

            {/* Orbital Projects Gallery */}
            <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
              <CurvedMenu
                isSplashFinished={isSplashFinished}
                onPortalTrigger={() => setIsPortalActive(true)}
                onLastGridCentered={(centered) => setRobotBig(!centered)}
                scrollContainerRef={scrollContainerRef}
              />
            </div>

            {/* Floating Tech Stack Node Graph */}
            <motion.div
              className="absolute inset-x-0 inset-y-0 right-0 z-50 pointer-events-none"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: robotBig ? 1 : 0, x: robotBig ? 0 : 100 }}
              transition={{ duration: 1, ease: 'easeOut', delay: robotBig ? 0.3 : 0 }}
            >
              {robotBig && <TechStackGraph />}
            </motion.div>

            {/* Immersive HUD (Overlay Elements) */}
            <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
              <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isSplashFinished ? 1 : 0, y: isSplashFinished ? 0 : -20 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="w-full flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 pointer-events-auto"
              >
                <div className="flex flex-col">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tighter text-white/90">HORIZON</h1>
                  <div
                    className={
                      `h-[2px] w-8 mt-1 ` +
                      (robotBig
                        ? 'bg-[#a259e6] shadow-[0_0_8px_rgba(162,89,230,0.8)]'
                        : 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]')
                    }
                  />
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className={
                    `text-[10px] font-mono tracking-widest uppercase ` +
                    (robotBig ? 'text-[#a259e6]/60' : 'text-cyan-400/60')
                  }>Subspace_Status</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-bold text-white uppercase tracking-tighter transition-all">Encrypted_Link</span>
                    <div className={
                      `w-2 h-2 rounded-full animate-pulse ` +
                      (robotBig
                        ? 'bg-[#a259e6] shadow-[0_0_8px_#a259e6]'
                        : 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]')
                    } />
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
                  <span className={
                    `text-[8px] font-mono tracking-[0.5em] uppercase ` +
                    (robotBig ? 'text-[#a259e6]/40' : 'text-cyan-400/40')
                  }>Scroll to Rotate Orbit</span>
                  <div className={
                    `w-[1px] h-12 bg-gradient-to-t to-transparent ` +
                    (robotBig ? 'from-[#a259e6]/60' : 'from-cyan-400/60')
                  } />
                </div>

                <div className="w-full max-w-xl h-14 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full flex items-center justify-around px-4 sm:px-10 relative overflow-hidden group pointer-events-auto cursor-help">
                  <div className={
                    `absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ` +
                    (robotBig ? 'via-[#a259e6]/5' : 'via-cyan-400/5')
                  } />
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase mb-1">Grid_Nodes</span>
                    <span className={
                      `text-xs font-bold tracking-widest ` +
                      (robotBig ? 'text-[#a259e6]' : 'text-cyan-400')
                    }>PRO_04</span>
                  </div>
                  <div className="w-[1px] h-6 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase mb-1">Signal</span>
                    <span className={
                      `text-xs font-bold tracking-widest text-shadow-glow ` +
                      (robotBig ? 'text-[#a259e6]' : 'text-cyan-400')
                    }>OPTIMAL</span>
                  </div>
                </div>
              </motion.footer>

              {/* Subtle Vignette */}
              <div className="absolute inset-0 z-[-1] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,2,10,0.4) 60%, rgba(0,2,10,1) 100%)' }} />
            </div>

          </motion.div>
        </div>
        {/* Invisible Internal Spacer providing exactly 1500px of rotation-scroll space */}
        <div className="w-full h-[1500px] pointer-events-none" />
      </div>
    </section>

    </div>
  );
}

export default function DemoOne() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl">
      <ShaderAnimation />
      <span className="pointer-events-none z-10 text-center text-7xl leading-none font-semibold tracking-tighter whitespace-pre-wrap text-white">
        Shader Lines
      </span>
    </div>
  )
}
