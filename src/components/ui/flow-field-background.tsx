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
}: NeuralBackgroundProps) {
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
      x: number;
      y: number;
      vx: number;
      vy: number;
      age: number;
      life: number;
      id: number;

      constructor(id: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.id = id;
        // Random lifespan to create natural recycling
        this.life = Math.random() * 200 + 100; 
      }

      update() {
        // 1. Flow Field Math (Simplex-ish noise)
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        
        // 2. Add force from flow field
        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;

        // 3. Mouse Repulsion/Attraction
        // (Disabled)

        // 4. Apply Velocity & Friction
        this.vx *= 0.95; // Friction to stop infinite acceleration
        this.vy *= 0.95;
        
        // 6. Wrap around screen
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Apply movement
        this.x += this.vx;
        this.y += this.vy;

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

      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = color;
        // Fade in and out based on age, boosted alpha to make dots shine
        const alpha = Math.min(1, (1 - Math.abs((this.age / this.life) - 0.5) * 2) * 1.5);
        context.globalAlpha = alpha;
        context.shadowBlur = 4;
        context.shadowColor = color;
        context.fillRect(this.x, this.y, 2, 2); // Slightly larger
      }
    }

    // --- INITIALIZATION ---
    const init = () => {
      // Handle High-DPI screens (Retina)
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(i));
      }
    };

    // --- ANIMATION LOOP ---
    const animate = () => {
      // "Fade" effect: Instead of clearing the canvas, we draw a semi-transparent rect
      // This creates the "Trails" look.
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0, 0, 0, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = 'source-over';
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // --- EVENT LISTENERS ---
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    // Start
    init();
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove); // Listen on window for broader interaction
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, trailOpacity, particleCount, speed]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden mix-blend-screen", className)}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
