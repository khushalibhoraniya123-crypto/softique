import React, { useEffect, useRef } from 'react';

/**
 * MachineBackground
 * Premium industrial animated background for the Machine Showcase section:
 * - Deep navy / carbon black industrial base
 * - Subtle animated technical engineering grid with intersection crosses
 * - HTML5 Canvas rendering gentle floating golden particles
 * - Smooth, continuous undulating golden light waves (sinusoidal gradient ribbons)
 * - Performance optimized: pauses when off-screen via IntersectionObserver,
 *   caps DPR at 2, and respects prefers-reduced-motion.
 */
export default function MachineBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Golden palette with varied warm industrial tones
    const goldPalette = [
      { r: 197, g: 168, b: 128 }, // Champagne Gold (#C5A880)
      { r: 216, g: 199, b: 165 }, // Soft Pale Gold (#D8C7A5)
      { r: 180, g: 148, b: 104 }, // Deep Amber Gold (#B49468)
      { r: 235, g: 215, b: 180 }, // Highlight Gold (#EBD7B4)
    ];

    // Initialize 42 delicate floating particles
    const particleCount = 42;
    const particles = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        const color = goldPalette[Math.floor(Math.random() * goldPalette.length)];
        // Diverse floating directions (360 degrees) with low speed (0.12 - 0.38 px/frame)
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.12 + Math.random() * 0.26;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 0.9 + Math.random() * 1.8, // 0.9px - 2.7px
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 0.18 + Math.random() * 0.38,
          baseAlpha: 0.18 + Math.random() * 0.38,
          pulseSpeed: 0.012 + Math.random() * 0.022,
          pulseOffset: Math.random() * Math.PI * 2,
          color,
        });
      }
    };

    // Wave configurations: 3 harmonic luminous ribbons
    const waves = [
      {
        baseY: 0.62, // relative to height
        amplitude: 38,
        wavelength: 0.0016,
        speed: 0.00065,
        color: 'rgba(197, 168, 128, 0.075)',
        glowColor: 'rgba(216, 199, 165, 0.18)',
        strokeColor: 'rgba(216, 199, 165, 0.24)',
        phase: 0,
      },
      {
        baseY: 0.45,
        amplitude: 30,
        wavelength: 0.0022,
        speed: -0.00075,
        color: 'rgba(216, 199, 165, 0.060)',
        glowColor: 'rgba(235, 215, 180, 0.15)',
        strokeColor: 'rgba(235, 215, 180, 0.20)',
        phase: Math.PI * 0.45,
      },
      {
        baseY: 0.78,
        amplitude: 45,
        wavelength: 0.0012,
        speed: 0.00045,
        color: 'rgba(180, 148, 104, 0.055)',
        glowColor: 'rgba(197, 168, 128, 0.14)',
        strokeColor: 'rgba(197, 168, 128, 0.18)',
        phase: Math.PI * 0.85,
      },
    ];

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initParticles();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);
    resize();

    // IntersectionObserver to pause loop when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting && !animFrameRef.current && !prefersReducedMotion) {
            lastTime = performance.now();
            animFrameRef.current = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    let lastTime = performance.now();
    let timeAccumulator = 0;

    const render = (now) => {
      if (!isVisibleRef.current) {
        animFrameRef.current = null;
        return;
      }

      const delta = Math.min(now - lastTime, 64);
      lastTime = now;
      timeAccumulator += delta;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Golden Light Waves (smooth undulating gradient ribbons)
      waves.forEach((wave) => {
        const yCenter = height * wave.baseY;
        const currentPhase = wave.phase + timeAccumulator * wave.speed;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, yCenter);

        const step = 20; // 20px sampling interval for high-fps curved ribbon
        for (let x = 0; x <= width + step; x += step) {
          const y =
            yCenter +
            Math.sin(x * wave.wavelength + currentPhase) * wave.amplitude +
            Math.cos(x * wave.wavelength * 0.5 + currentPhase * 0.7) * (wave.amplitude * 0.35);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Elegant vertical gradient fading softly downwards
        const grad = ctx.createLinearGradient(0, yCenter - wave.amplitude, 0, height);
        grad.addColorStop(0, wave.glowColor);
        grad.addColorStop(0.3, wave.color);
        grad.addColorStop(1, 'rgba(18, 21, 26, 0)');

        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle glowing crest line on the top edge of each wave
        ctx.save();
        ctx.beginPath();
        for (let x = 0; x <= width + step; x += step) {
          const y =
            yCenter +
            Math.sin(x * wave.wavelength + currentPhase) * wave.amplitude +
            Math.cos(x * wave.wavelength * 0.5 + currentPhase * 0.7) * (wave.amplitude * 0.35);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.strokeColor || wave.glowColor;
        ctx.lineWidth = 1.25;
        ctx.shadowColor = wave.glowColor;
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      });

      // 2. Draw Floating Golden Particles
      particles.forEach((p) => {
        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries gently
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Sinusoidal opacity breathing
        p.alpha =
          p.baseAlpha + Math.sin(timeAccumulator * p.pulseSpeed + p.pulseOffset) * 0.12;
        const safeAlpha = Math.max(0.06, Math.min(0.55, p.alpha));

        // Draw soft particle with radial aura
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${safeAlpha})`;
        ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${safeAlpha * 0.8})`;
        ctx.shadowBlur = p.radius * 3.5;
        ctx.fill();
        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    if (prefersReducedMotion) {
      // Render one single calm static frame
      render(performance.now());
    } else {
      animFrameRef.current = requestAnimationFrame(render);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {/* 1. Deep Navy / Carbon Black Industrial Base Gradients */}
      <div className="absolute inset-0 bg-[#0F1318]" />
      
      {/* Ambient Industrial Atmospheric Glows (Steel Navy + Subtle Champagne) */}
      <div className="absolute -top-32 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#1C2638]/40 via-[#131A26]/20 to-transparent rounded-full blur-[120px] will-change-transform" />
      <div className="absolute top-1/2 -left-20 w-[550px] h-[550px] bg-gradient-to-tr from-[#251F14]/35 via-[#1E1911]/15 to-transparent rounded-full blur-[130px] will-change-transform" />
      <div className="absolute -bottom-24 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-[#1E2736]/30 via-[#151D28]/10 to-transparent rounded-full blur-[110px] will-change-transform" />

      {/* 2. Subtle Animated Technical Engineering Grid Layer */}
      <style>{`
        @keyframes softiqueGridDrift {
          0% { background-position: 0px 0px; }
          100% { background-position: 48px 48px; }
        }
        @keyframes softiqueDotsDrift {
          0% { background-position: 0px 0px; }
          100% { background-position: 192px 192px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .softique-anim-grid, .softique-anim-dots {
            animation: none !important;
          }
        }
      `}</style>

      <div 
        className="absolute inset-0 opacity-[0.38] mix-blend-screen softique-anim-grid"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.028) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.028) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          animation: 'softiqueGridDrift 35s linear infinite',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)',
        }}
      />

      {/* Grid Precision Crosshairs / Registration Dots at 192px intervals */}
      <div
        className="absolute inset-0 opacity-[0.25] softique-anim-dots"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(197, 168, 128, 0.45) 1.5px, transparent 0)
          `,
          backgroundSize: '192px 192px',
          animation: 'softiqueDotsDrift 70s linear infinite',
          maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 30%, transparent 90%)',
        }}
      />

      {/* 3. HTML5 Canvas for Floating Golden Particles & Undulating Light Waves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          maskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 65%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 95% 90% at 50% 50%, black 65%, transparent 100%)',
        }}
      />

      {/* 4. Fine Grain Industrial Depth Overlay & Edge Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0F1318]/40 to-[#0B0E13]/85 pointer-events-none" />
    </div>
  );
}
