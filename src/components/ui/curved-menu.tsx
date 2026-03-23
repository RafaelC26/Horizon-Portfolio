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
  onLastGridCentered?: (centered: boolean) => void;
  onRotationLimit?: (atLimit: boolean) => void;
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CurvedMenu({ isSplashFinished, onPortalTrigger, onLastGridCentered, scrollContainerRef }: CurvedMenuProps) {
  const { scrollY } = useScroll({ container: scrollContainerRef });
  const [windowSize, setWindowSize] = useState({ width: 1000, height: 1000 });
  const lastGridWasCentered = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const getMenuMetrics = () => {
    const w = windowSize.width;
    if (w < 480) return { radius: 380, perspectiveValue: 600, spacing: 60 };
    if (w < 640) return { radius: 420, perspectiveValue: 700, spacing: 55 };
    if (w < 768) return { radius: 500, perspectiveValue: 850, spacing: 50 };
    if (w < 1024) return { radius: 650, perspectiveValue: 1100, spacing: 45 };
    return { radius: 900, perspectiveValue: 1600, spacing: 45 };
  };
  
  const { radius, perspectiveValue, spacing: itemSpacing } = getMenuMetrics();
  const centerThreshold = 2 + 50;
  const minRotation = -((PROJECTS.length - 1) * itemSpacing + 100);

  // Map the internal container scroll to the 3D rotation
  // Since it's an internal scroll view, scroll starts at 0 and goes to exactly 1500 based on the demo.tsx spacer
  const rawRotation = useTransform(
    scrollY,
    [0, 1500],
    [0, minRotation],
    { clamp: true }
  );

  // Apply a gentle spring to smooth out standard mouse wheel step-scrolling natively
  const rotation = useSpring(rawRotation, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  });

  // Detect when the last grid is centered to trigger the robot zoom
  useEffect(() => {
    const unsubscribe = rotation.on("change", (v) => {
      const lastGridAngle = (PROJECTS.length - 1) * itemSpacing + v;
      const hasPassed = lastGridAngle < -centerThreshold;
      if (onLastGridCentered && hasPassed !== lastGridWasCentered.current) {
        onLastGridCentered(!hasPassed);
        lastGridWasCentered.current = hasPassed;
      }
    });
    return () => unsubscribe();
  }, [rotation, onLastGridCentered, itemSpacing, centerThreshold]);

  return (
    <div className={
      'relative w-full flex items-center justify-center overflow-visible ' +
      (windowSize.width < 640 ? 'h-[340px]' : windowSize.width < 1024 ? 'h-[480px]' : 'h-[600px]')
    }>
      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0, rotateX: 20 }}
        animate={{ opacity: isSplashFinished ? 1 : 0, rotateX: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <div
          className={
            'relative w-full h-full flex items-center justify-center ' +
            (windowSize.width < 640 ? 'pt-8' : windowSize.width < 1024 ? 'pt-14' : 'pt-20')
          }
          style={{ perspective: perspectiveValue, perspectiveOrigin: windowSize.width < 768 ? 'center 60%' : 'center 40%' }}
        >
          {PROJECTS.map((project, idx) => {
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
