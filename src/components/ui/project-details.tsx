'use client';

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Shield, Cpu, Code2, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import NeuralBackground from './flow-field-background';
import { SplineScene } from './splite';

// Data from demo.tsx (should ideally be in a separate data file, but staying simple for now)
const PROJECTS_DATA: any = {
  "aegis-dashboard": {
    title: "Aegis Dashboard",
    description: "A comprehensive cybernetic monitoring system for edge-node clusters. Optimized for high-throughput data streams.",
    type: "solo",
    tags: ["React", "Three.js", "WebAudio"],
    detailedDescription: "The Aegis Dashboard represents the pinnacle of real-time network monitoring. Built with a custom React-Three-Fiber engine, it visualizes complex edge-node telemetry as living data structures. The system features low-latency packet tracking, biometric authentication simulation, and a modular architecture that allows for instant protocol expansion."
  },
  "neural-grid": {
    title: "Neural Grid Protocol",
    description: "Collaboration on a decentralized AI training interface. Implementing complex packet-routing visualizations.",
    type: "collab",
    tags: ["Next.js", "Framer Motion", "Rust"],
    detailedDescription: "Neural Grid is a distributed computing platform designed for high-scale AI model training. This module specifically focuses on the packet-routing visualization engine, where thousands of parallel threads are rendered as a coherent flow-field. Developed in collaboration with international teams using Rust for core logic and Framer Motion for the adaptive HUD interface."
  },
  "vault-s047": {
    title: "Vault S-047",
    description: "Secure biometric entry portal for high-security digital assets. Features real-time encryption feedback.",
    type: "solo",
    tags: ["TypeScript", "WebWorkers", "CryptoAPI"],
    detailedDescription: "Vault S-047 is a next-generation security interface. It utilizes advanced cryptographic APIs to provide a zero-knowledge proof entry system. The UI is designed to minimize cognitive load while presenting complex security status indicators, using Web Workers to handle heavy encryption processing without blocking the UI thread."
  }
};

export function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS_DATA[id || ""] || PROJECTS_DATA["aegis-dashboard"];

  return (
    <div className="relative w-full min-h-screen bg-[#020617] text-white overflow-hidden">
      {/* Background Visuals */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground 
          color="#22d3ee"
          trailOpacity={0.1}
          particleCount={200}
          speed={0.4}
        />
      </div>

      {/* 3D Backdrop (Deep) */}
      <div className="absolute inset-0 z-[1] flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-full h-full scale-150 grayscale blur-sm">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-50 w-full min-h-screen flex flex-col items-center py-20 px-6 sm:px-10"
      >
        {/* Navigation Header */}
        <div className="max-w-6xl w-full flex justify-between items-center mb-16">
          <button 
             onClick={() => navigate('/')}
             className="group flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Return to Orbit</span>
          </button>
          
          <div className="flex flex-col items-end">
             <span className="text-[8px] font-mono text-cyan-400/60 tracking-widest uppercase">Project_Access_Protocol</span>
             <span className="text-[12px] font-bold text-white tracking-widest uppercase">Node_ID: {id?.toUpperCase() || "NULL"}</span>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
           
           {/* Detailed Text Content */}
           <motion.div
             initial={{ x: -30, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="flex flex-col gap-8"
           >
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    <span className="text-[10px] font-mono text-cyan-400 tracking-[0.4em] uppercase">Security Case</span>
                 </div>
                 <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase">{project.title}</h1>
              </div>

              <div className="flex flex-wrap gap-3">
                 {project.tags.map((tag: string, i: number) => (
                   <span key={i} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-[10px] font-mono text-cyan-300 uppercase letter-spacing-wide">
                      {tag}
                   </span>
                 ))}
              </div>

              <div className="space-y-6">
                 <p className="text-sm sm:text-lg text-white/70 leading-relaxed font-light">
                   {project.detailedDescription}
                 </p>
                 <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-3xl">
                    <div className="flex items-center gap-4 mb-4">
                       <Shield className="w-5 h-5 text-cyan-400/60" />
                       <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">Neural Metrics</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                       <Metric label="Uptime" value="100.0%" color="text-cyan-400" />
                       <Metric label="Sync" value="Stable" color="text-green-400" />
                       <Metric label="Auth" value="Pass" color="text-cyan-400" />
                    </div>
                 </div>
              </div>

              <div className="flex gap-4 mt-4">
                 <a href="#" className="flex-1 sm:flex-initial flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-colors shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                    Neural Link <ExternalLink className="w-4 h-4" />
                 </a>
                 <div className="w-14 h-14 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/5 transition-all opacity-40">
                    <Code2 className="w-5 h-5" />
                 </div>
              </div>
           </motion.div>

           {/* Technical Breakdown / Visual */}
           <motion.div
             initial={{ scale: 0.9, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 0.6 }}
             className="relative aspect-square sm:aspect-video lg:aspect-square bg-gradient-to-br from-white/5 to-transparent rounded-3xl border border-white/10 overflow-hidden group shadow-2xl"
           >
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.05)_50%)] bg-[length:100%_8px] z-10 opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity">
                 <Cpu className="w-40 h-40 text-cyan-400/20" />
              </div>
              
              {/* Fake UI Overlay */}
              <div className="absolute top-6 left-6 flex flex-col gap-1">
                 <div className="w-12 h-1 bg-cyan-400/40" />
                 <div className="w-8 h-1 bg-cyan-400/20" />
              </div>
              <div className="absolute bottom-6 right-6 flex flex-col items-end">
                 <span className="text-[10px] font-mono text-cyan-300/40 tracking-widest uppercase">Terminal_Output</span>
                 <div className="text-[8px] font-mono text-white/20">CONNECTED_TO_SUBSPACE_OS</div>
              </div>
           </motion.div>
        </div>
      </motion.div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle, transparent 40%, rgba(0,2,10,0.8) 100%)' }} />
    </div>
  );
}

function Metric({ label, value, color }: { label: string, value: string, color: string }) {
   return (
      <div className="flex flex-col gap-1">
         <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">{label}</span>
         <span className={cn("text-xs font-bold tracking-widest", color)}>{value}</span>
      </div>
   );
}
