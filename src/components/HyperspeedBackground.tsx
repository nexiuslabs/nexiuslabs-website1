import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  prevX?: number;
  prevY?: number;
}

interface HyperspeedBackgroundProps {
  particleCount?: number;
  speed?: number;
  particleColor?: string;
  trailLength?: number;
}

export function HyperspeedBackground({
  particleCount = 800,
  speed = 0.02,
  particleColor = '#00CABA',
  trailLength = 0.1
}: HyperspeedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  const initializeParticles = useCallback(() => {
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1000 + 1
      });
    }
    
    particlesRef.current = particles;
  }, [particleCount]);

  const updateCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Create trail effect
    ctx.fillStyle = `rgba(15, 20, 25, ${trailLength})`;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Store previous position for trail
      particle.prevX = centerX + (particle.x / particle.z) * centerX;
      particle.prevY = centerY + (particle.y / particle.z) * centerY;

      // Move particle forward
      particle.z -= speed * 60; // Adjust speed for 60fps target

      // Reset particle if it goes behind the camera
      if (particle.z <= 0) {
        particle.x = (Math.random() - 0.5) * 2000;
        particle.y = (Math.random() - 0.5) * 2000;
        particle.z = 1000;
        particle.prevX = undefined;
        particle.prevY = undefined;
      }

      // Calculate screen position
      const x = centerX + (particle.x / particle.z) * centerX;
      const y = centerY + (particle.y / particle.z) * centerY;

      // Calculate particle size and opacity based on distance
      const size = Math.max(0, (1 - particle.z / 1000) * 3);
      const opacity = Math.max(0, 1 - particle.z / 1000);

      // Only draw if particle is on screen
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height && size > 0.1) {
        ctx.fillStyle = particleColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
        
        // Draw trail line from previous position
        if (particle.prevX !== undefined && particle.prevY !== undefined) {
          ctx.strokeStyle = particleColor.replace(')', `, ${opacity * 0.5})`).replace('rgb', 'rgba');
          ctx.lineWidth = size * 0.5;
          ctx.beginPath();
          ctx.moveTo(particle.prevX, particle.prevY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, [speed, particleColor, trailLength]);

  const animate = useCallback(() => {
    updateCanvas();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateCanvas]);

  useEffect(() => {
    initializeParticles();
    animate();

    const handleResize = () => {
      updateCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [initializeParticles, animate, updateCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}