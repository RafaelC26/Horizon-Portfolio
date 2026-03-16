"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NeuralBackgroundProps {
  className?: string;
  /**
   * Color of the particles. 
   * Defaults to a cyan/indigo mix if not specified.
   */
  color?: string;
  /**
   * The opacity of the trails (0.0 to 1.0).
   * Lower = longer trails. Higher = shorter trails.
   * Default: 0.1
   */
  trailOpacity?: number;
  /**
   * Number of particles. Default: 800
   */
  particleCount?: number;
  /**
   * Speed multiplier. Default: 1
   */
  speed?: number;
}

export default function NeuralBackground({
  className,
  color = "#22d3ee", // Default Cyan matching the ice theme
  trailOpacity = 0.15,
  particleCount = 600,
  speed = 1,
  isPortalActive = false,
}: NeuralBackgroundProps & { isPortalActive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- CONFIGURATION ---
    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animationFrameId: number;
    // Start way off-screen to avoid initial splash
    let mouse = { x: -1000, y: -1000 }; 

    // --- PARTICLE CLASS ---
    class Particle {
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      age!: number;
      life!: number;
      id: number;

      constructor(id: number) {
        this.reset();
        this.id = id;
      }

      update() {
        if (isPortalActive) {
          // Portal Logic: Accelerate towards the center
          const dx = width / 2 - this.x;
          const dy = height / 2 - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Force is inversely proportional to distance to create a suction effect
          const force = 0.5;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
          
          // Much higher speed for warp effect
          this.x += this.vx * 2;
          this.y += this.vy * 2;

          // If they reach the center, reset them to the edges
          if (dist < 20) {
            this.resetToEdges();
          }
        } else {
          // 1. Flow Field Math (Simplex-ish noise)
          const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
          
          // 2. Add force from flow field
          this.vx += Math.cos(angle) * 0.2 * speed;
          this.vy += Math.sin(angle) * 0.2 * speed;

          // 4. Apply Velocity & Friction
          this.vx *= 0.95; 
          this.vy *= 0.95;
          
          // 6. Wrap around screen
          if (this.x < 0) this.x = width;
          if (this.x > width) this.x = 0;
          if (this.y < 0) this.y = height;
          if (this.y > height) this.y = 0;

          // Apply movement
          this.x += this.vx;
          this.y += this.vy;
        }

        // 5. Aging
        this.age++;
        if (this.age > this.life) {
          this.reset();
        }
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100; 
      }

      resetToEdges() {
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { this.x = 0; this.y = Math.random() * height; }
        else if (side === 1) { this.x = width; this.y = Math.random() * height; }
        else if (side === 2) { this.x = Math.random() * width; this.y = 0; }
        else { this.x = Math.random() * width; this.y = height; }
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = color;
        const alpha = Math.min(1, (1 - Math.abs((this.age / this.life) - 0.5) * 2) * 1.5);
        context.globalAlpha = isPortalActive ? 1 : alpha;
        context.shadowBlur = isPortalActive ? 8 : 4;
        context.shadowColor = color;
        
        // Elongate particles during portal effect (streaks)
        if (isPortalActive && (Math.abs(this.vx) > 0.1 || Math.abs(this.vy) > 0.1)) {
          context.beginPath();
          context.moveTo(this.x, this.y);
          context.lineTo(this.x - this.vx * 4, this.y - this.vy * 4);
          context.strokeStyle = color;
          context.lineWidth = 2;
          context.stroke();
        } else {
          context.fillRect(this.x, this.y, 2, 2);
        }
      }
    }

    // --- INITIALIZATION ---
    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      particles = [];
      const count = isPortalActive ? particleCount * 2 : particleCount;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(i));
      }
    };

    // --- ANIMATION LOOP ---
    const animate = () => {
      ctx.globalCompositeOperation = 'destination-out';
      // Longer trails during portal
      const currentTrail = isPortalActive ? 0.05 : trailOpacity;
      ctx.fillStyle = `rgba(0, 0, 0, ${currentTrail})`;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // --- Start ---
    init();
    animate();

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, trailOpacity, particleCount, speed, isPortalActive]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden mix-blend-screen", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
