'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ProjectCard } from './project-card';

// Project Assets
import cyberDashboard from "../../assets/cyber_dashboard_preview_1773631906924.png";
import neuralNetwork from "../../assets/neural_network_preview_1773631922396.png";
import secureVault from "../../assets/secure_vault_preview_1773631940742.png";

const PROJECTS = [
  {
    id: "aegis-dashboard",
    title: "Aegis Dashboard",
    description: "A comprehensive cybernetic monitoring system for edge-node clusters. Optimized for high-throughput data streams.",
    image: cyberDashboard,
    type: "solo" as const,
    tags: ["React", "Three.js", "WebAudio"]
  },
  {
    id: "neural-grid",
    title: "Neural Grid Protocol",
    description: "Collaboration on a decentralized AI training interface. Implementing complex packet-routing visualizations.",
    image: neuralNetwork,
    type: "collab" as const,
    tags: ["Next.js", "Framer Motion", "Rust"]
  },
  {
    id: "vault-s047",
    title: "Vault S-047",
    description: "Secure biometric entry portal for high-security digital assets. Features real-time encryption feedback.",
    image: secureVault,
    type: "solo" as const,
    tags: ["TypeScript", "WebWorkers", "CryptoAPI"]
  }
];

interface CurvedMenuProps {
  isSplashFinished: boolean;
  onPortalTrigger: (projectId: string) => void;
}

export function CurvedMenu({ isSplashFinished, onPortalTrigger }: CurvedMenuProps) {
  const rotation = useMotionValue(0);
  const rotationRef = useRef(0);
  // Rotación infinita real con la rueda del mouse
  useEffect(() => {
    const itemSpacing = (typeof window !== 'undefined' && window.innerWidth < 768) ? 55 : 45;
    const maxRotation = 0; // No puede bajar de 0° (solo subir)
    // El máximo retroceso es el negativo del ángulo base del primer grid (0)
    // Si quieres que nunca se pase del primer grid, el máximo es 0
    const handleWheel = (e: WheelEvent) => {
      const delta = e.deltaY * 0.12;
      rotationRef.current = Math.min(maxRotation, rotationRef.current + delta);
      rotation.set(rotationRef.current);
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [rotation]);

  const radius = 900; 
  const perspectiveValue = 1600; 
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible">
      <motion.div 
        className="relative w-full h-full"
        initial={{ opacity: 0, rotateX: 20 }}
        animate={{ opacity: isSplashFinished ? 1 : 0, rotateX: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <div 
          className="relative w-full h-full flex items-center justify-center pt-20"
          style={{ perspective: perspectiveValue, perspectiveOrigin: 'center 40%' }}
        >
          {PROJECTS.map((project, idx) => {
            const itemSpacing = isMobile ? 55 : 45; 
            const baseAngle = idx * itemSpacing;
            const isLast = idx === PROJECTS.length - 1;
            return (
              <ProjectMenuItem 
                key={idx} 
                project={project} 
                baseAngle={baseAngle} 
                scrollRotation={rotation} 
                radius={radius}
                onPortalTrigger={onPortalTrigger}
                isLast={isLast}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

function ProjectMenuItem({ project, baseAngle, scrollRotation, radius, onPortalTrigger, isLast }: any) {
  const angle = useTransform(scrollRotation, (v: number) => baseAngle + v);
  const x = useTransform(angle, (a: number) => Math.sin(a * (Math.PI / 180)) * radius);
  const z = useTransform(angle, (a: number) => Math.cos(a * (Math.PI / 180)) * radius - radius);
  const rotateY = useTransform(angle, (a: number) => a);
  const opacity = useTransform(z, [-radius * 1.5, -400, 0], [0, 0.2, 1]);
  const scale = useTransform(z, [-radius * 1.5, 0], [0.4, 1]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        x,
        z,
        rotateY,
        opacity,
        scale,
        transformStyle: 'preserve-3d',
      }}
      className="flex items-center justify-center pointer-events-auto"
    >
      <ProjectCard 
        {...project} 
        onPortalTrigger={() => onPortalTrigger(project.id)}
        data-project-last={isLast ? 'true' : undefined}
      />
    </motion.div>
  );
}
