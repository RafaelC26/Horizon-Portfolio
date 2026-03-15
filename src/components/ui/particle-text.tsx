"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ParticleTextProps {
  text: string;
  className?: string;
  onComplete?: () => void;
  particleColor?: string;
}

export default function ParticleText({ text, className, onComplete, particleColor = "#1A2B3C" }: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef(particleColor);
  const [isFormed, setIsFormed] = useState(false);

  // Sync ref with prop
  useEffect(() => {
    colorRef.current = particleColor;
  }, [particleColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Quality settings for luxury feel
    const particleSize = 1.2;
    const skipPixels = 4;
    const MAX_PARTICLES = 10000;

    class Particle {
      targetX: number;
      targetY: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      
      constructor(targetX: number, targetY: number) {
        this.targetX = targetX;
        this.targetY = targetY;
        this.x = targetX + (Math.random() - 0.5) * 100;
        this.y = targetY + (Math.random() - 0.5) * 100;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
      }

      update() {
        // Precise centered attractor
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        
        const force = 0.12;
        this.vx += dx * force;
        this.vy += dy * force;
        
        const friction = 0.82;
        this.vx *= friction;
        this.vy *= friction;
        
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(context: CanvasRenderingContext2D, color: string) {
        context.fillStyle = color;
        context.beginPath();
        context.arc(this.x, this.y, particleSize, 0, Math.PI * 2);
        context.fill();
      }
    }

    const initParticles = () => {
      // Create offscreen canvas to measure text
      const osCanvas = document.createElement('canvas');
      const osCtx = osCanvas.getContext('2d', { willReadFrequently: true });
      if (!osCtx) return;

      osCanvas.width = width;
      osCanvas.height = height;

      // Draw Text with "Quiet Luxury" Style using Plus Jakarta Sans
      const fontSize = Math.min(width * 0.15, 140); 
      // Use "Plus Jakarta Sans" Extra Bold for that impactful confidence look
      osCtx.font = `800 ${fontSize}px "Plus Jakarta Sans", sans-serif`; 
      osCtx.textAlign = "center";
      osCtx.textBaseline = "middle";
      osCtx.fillStyle = "#1A2B3C"; // Midnight Navy
      
      // Clean, undistorted 1:1 scale for high-end luxury feel
      osCtx.fillText(text, width / 2, height / 2 - 20);

      const imageData = osCtx.getImageData(0, 0, width, height).data;
      particles = [];

      for (let y = 0; y < height; y += skipPixels) {
        for (let x = 0; x < width; x += skipPixels) {
          if (particles.length >= MAX_PARTICLES) break;
          const index = (y * width + x) * 4;
          const mapData = imageData[index + 3]; // get alpha channel
          if (mapData > 128) {
            particles.push(new Particle(x, y));
          }
        }
      }
    };

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      initParticles();
    };

    handleResize();

    let frameCount = 0;

    const animate = () => {
      frameCount++;
      // Clear canvas fully to maintain perfect transparency over the UI
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw(ctx, colorRef.current);
      });

      // Add an artificial 'loading' delay so the user reads HORIZON before the curtain pulls
      if (!isFormed && frameCount > 120) { // Approx 2 seconds at 60fps
         setIsFormed(true);
         if (onComplete) onComplete();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full font-mono", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
