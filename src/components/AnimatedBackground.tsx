import React, { useEffect, useRef } from "react";
import { Heart, MessageSquare, Share2 } from "lucide-react";

interface StarParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  colorPhaseOffset: number;
  originalX: number;
  originalY: number;
}

// Helper to interpolate between two RGB colors
function interpolateColor(
  c1: { r: number; g: number; b: number },
  c2: { r: number; g: number; b: number },
  factor: number
) {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * factor),
    g: Math.round(c1.g + (c2.g - c1.g) * factor),
    b: Math.round(c1.b + (c2.b - c1.b) * factor),
  };
}

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, rawX: 0, rawY: 0, active: false });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates around center of screen
      mouseRef.current.x = (e.clientX - window.innerWidth / 2) * 0.05;
      mouseRef.current.y = (e.clientY - window.innerHeight / 2) * 0.05;
      mouseRef.current.rawX = e.clientX;
      mouseRef.current.rawY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Responsive star particles count
    const starCount = Math.min(125, Math.floor((width * height) / 12000));
    const stars: StarParticle[] = [];

    // The established accent colors requested by the user:
    // - Neon Pink: { r: 236, g: 72, b: 153 } (Pink-500)
    // - Luxury Magenta: { r: 219, g: 39, b: 119 } (Pink-600)
    // - Electric Purple: { r: 168, g: 85, b: 247 } (Purple-500)
    // - Soft Lavender: { r: 196, g: 181, b: 253 } (Violet-300)
    const cycleColors = [
      { r: 236, g: 72, b: 153 },  // Neon Pink
      { r: 219, g: 39, b: 119 },  // Luxury Magenta
      { r: 168, g: 85, b: 247 },  // Electric Purple
      { r: 196, g: 181, b: 253 }  // Soft Lavender
    ];

    for (let i = 0; i < starCount; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const vx = (Math.random() - 0.5) * 0.28;
      const vy = (Math.random() - 0.5) * 0.28;

      stars.push({
        x: rx,
        y: ry,
        originalX: rx,
        originalY: ry,
        vx: vx,
        vy: vy,
        baseVx: vx,
        baseVy: vy,
        radius: Math.random() * 2.3 + 0.6,
        colorPhaseOffset: Math.random() * Math.PI * 2, // smooth individual waves
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    window.addEventListener("resize", handleResize);

    let dampedMouseX = 0;
    let dampedMouseY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smoothly damp mouse input for cinematic parallax slide feel
      dampedMouseX += (mouseRef.current.x - dampedMouseX) * 0.08;
      dampedMouseY += (mouseRef.current.y - dampedMouseY) * 0.08;

      const currentScrollY = window.scrollY || 0;

      // Update positions with physical "smooth follow" attraction when mouse is active
      stars.forEach((star) => {
        let targetVx = star.baseVx;
        let targetVy = star.baseVy;

        if (mouseRef.current.active) {
          // Attract towards direct cursor raw coordinates
          const dx = mouseRef.current.rawX - star.x;
          const dy = mouseRef.current.rawY - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 340 && dist > 5) {
            // Smoothly escalates pull force relative to proximity - elegant physical flow
            const pullStrength = Math.pow(1 - dist / 340, 1.6) * 0.58;
            targetVx += (dx / dist) * pullStrength;
            targetVy += (dy / dist) * pullStrength;
          }
        }

        // Apply smooth follow update via spring damping / interpolation (lerp)
        star.vx += (targetVx - star.vx) * 0.07;
        star.vy += (targetVy - star.vy) * 0.07;

        // Keep local velocities elegantly bounded
        const currentSpeed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
        const limit = 2.2;
        if (currentSpeed > limit) {
          star.vx = (star.vx / currentSpeed) * limit;
          star.vy = (star.vy / currentSpeed) * limit;
        }

        // Drift
        star.x += star.vx;
        star.y += star.vy;

        // Bounce gently at bounding limit boundaries
        if (star.x < 0) {
          star.x = 0;
          star.vx *= -1;
          star.baseVx *= -1;
        } else if (star.x > width) {
          star.x = width;
          star.vx *= -1;
          star.baseVx *= -1;
        }

        if (star.y < 0) {
          star.y = 0;
          star.vy *= -1;
          star.baseVy *= -1;
        } else if (star.y > height) {
          star.y = height;
          star.vy *= -1;
          star.baseVy *= -1;
        }
      });

      // Map final coordinates including parallax offsets and associate dynamic active colors
      const mappedParticles = stars.map((star) => {
        const finalX = star.x + dampedMouseX * (star.radius * 0.5);
        const finalY = star.y + dampedMouseY * (star.radius * 0.5);

        // Color dynamic cycle algorithm based on raw time + user's current scroll vertical displacement
        const timeFactor = Date.now() * 0.00032 + currentScrollY * 0.00095 + star.colorPhaseOffset;
        const totalColors = cycleColors.length;
        const indexCurrent = Math.floor(timeFactor) % totalColors;
        const indexNext = (indexCurrent + 1) % totalColors;
        const transitionFactor = timeFactor % 1;

        const rgb = interpolateColor(cycleColors[indexCurrent], cycleColors[indexNext], transitionFactor);

        return {
          x: finalX,
          y: finalY,
          radius: star.radius,
          colorRgb: rgb
        };
      });

      // Draw subtle connecting background constellation lines using mapped coordinates
      ctx.lineWidth = 0.75;
      for (let i = 0; i < mappedParticles.length; i++) {
        const p1 = mappedParticles[i];

        for (let j = i + 1; j < mappedParticles.length; j++) {
          const p2 = mappedParticles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;
          const limitSq = 115 * 115;

          if (distSq < limitSq) {
            const alpha = (1 - Math.sqrt(distSq / limitSq)) * 0.095;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Average the color of both interconnected particles for beautiful soft gradients
            const mixedR = Math.round((p1.colorRgb.r + p2.colorRgb.r) / 2);
            const mixedG = Math.round((p1.colorRgb.g + p2.colorRgb.g) / 2);
            const mixedB = Math.round((p1.colorRgb.b + p2.colorRgb.b) / 2);

            ctx.strokeStyle = `rgba(${mixedR}, ${mixedG}, ${mixedB}, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Render glowing individual star points
      mappedParticles.forEach((p) => {
        // Slow biological pulse effect on bright ones
        const pulseFactor = Date.now() * 0.0012 + p.radius;
        const pulse = Math.sin(pulseFactor) * 0.25 + 0.75;

        const particleAlpha = pulse * 0.35 + 0.65; // keep them beautifully bright and visible

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (1 + pulse * 0.15), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorRgb.r}, ${p.colorRgb.g}, ${p.colorRgb.b}, ${particleAlpha.toFixed(3)})`;
        ctx.fill();

        // Extra outer luxury soft atmospheric glow halo for prominent particles
        if (p.radius > 1.8) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.colorRgb.r}, ${p.colorRgb.g}, ${p.colorRgb.b}, ${(particleAlpha * 0.12).toFixed(3)})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Immersive Atmospheric Back Glowing Orbs in Pink and Purple matching brand color guidelines */}
      <div 
        className="absolute top-[-5%] left-[-5%] w-[480px] h-[480px] rounded-full blur-[130px] pointer-events-none opacity-25 bg-gradient-to-tr from-purple-400 via-pink-400 to-transparent animate-pulse"
        style={{ animationDuration: "14s" }}
      />
      <div 
        className="absolute bottom-[-5%] right-[-5%] w-[585px] h-[585px] rounded-full blur-[165px] pointer-events-none opacity-20 bg-gradient-to-bl from-pink-400 via-purple-400 to-transparent animate-pulse"
        style={{ animationDuration: "18s" }}
      />
      
      {/* Responsive Core Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute inset-0 z-0 opacity-85"
      />

      {/* Floating Interaction Icons (Heart, Comment, Share) */}
      <div className="absolute top-[12%] left-[8%] text-pink-500 opacity-10 animate-float-slow-1 pointer-events-none">
        <Heart className="w-8 h-8 fill-pink-500/20" />
      </div>
      <div className="absolute top-[18%] right-[12%] text-purple-500 opacity-[0.07] animate-float-slow-2 pointer-events-none">
        <MessageSquare className="w-9 h-9" />
      </div>
      <div className="absolute top-[45%] right-[6%] text-pink-500 opacity-[0.08] animate-float-slow-3 pointer-events-none">
        <Share2 className="w-8 h-8" />
      </div>
      <div className="absolute bottom-[35%] left-[5%] text-purple-500 opacity-[0.09] animate-float-slow-4 pointer-events-none">
        <Heart className="w-10 h-10" />
      </div>
      <div className="absolute bottom-[15%] right-[15%] text-pink-500 opacity-[0.07] animate-float-slow-1 pointer-events-none">
        <MessageSquare className="w-8 h-8 fill-pink-500/10" />
      </div>
      <div className="absolute top-[65%] left-[10%] text-purple-500 opacity-[0.08] animate-float-slow-2 pointer-events-none">
        <Share2 className="w-9 h-9" />
      </div>
    </div>
  );
}
