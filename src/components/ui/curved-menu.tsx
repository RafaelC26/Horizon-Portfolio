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
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 60, damping: 25 });
  const rotation = useMotionValue(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const animationRef = useRef<number | null>(null);

  // Detectar visibilidad del último grid
  useEffect(() => {
    const lastGrid = document.querySelector('[data-project-last]');
    if (!lastGrid) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setAutoRotate(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(lastGrid);
    return () => observer.disconnect();
  }, []);

  // Animar rotación mientras el último grid esté visible
  useEffect(() => {
    if (autoRotate) {
      const animate = () => {
        rotation.set(rotation.get() + 0.8); // velocidad de giro
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [autoRotate, rotation]);

  // Si no está auto-rotando, seguir el scroll
  useEffect(() => {
    if (!autoRotate) {
      const unsubscribe = smoothScrollY.on('change', (v) => {
        const mapped = Math.max(Math.min((v / 600) * -90, 0), -90);
        rotation.set(mapped);
      });
      return () => unsubscribe();
    }
  }, [autoRotate, smoothScrollY, rotation]);

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
