import { useEffect, useRef } from 'react';

/**
 * 3-Tier Canvas Parallax Starfield
 * Layer 1 (Far): Slow, tiny points (0.05x parallax)
 * Layer 2 (Mid): Medium brightness points (0.15x parallax)
 * Layer 3 (Near): Bright, twinkling points (0.35x parallax)
 */
export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 70 : 200;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize 3 tiers of stars
    const stars = Array.from({ length: starCount }, () => {
      const tier = Math.random() < 0.6 ? 1 : Math.random() < 0.85 ? 2 : 3;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        radius: tier === 1 ? Math.random() * 0.8 + 0.4 : tier === 2 ? Math.random() * 1.2 + 0.8 : Math.random() * 1.6 + 1.2,
        alpha: tier === 1 ? Math.random() * 0.4 + 0.2 : tier === 2 ? Math.random() * 0.5 + 0.4 : Math.random() * 0.6 + 0.4,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        tier,
        parallaxSpeed: tier === 1 ? 0.03 : tier === 2 ? 0.1 : 0.25
      };
    });

    let tick = 0;

    const render = () => {
      tick++;
      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const offsetX = (mouseX - width / 2) / (width / 2);
      const offsetY = (mouseY - height / 2) / (height / 2);

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        
        // Calculate parallax shift
        const posX = (star.baseX - offsetX * star.parallaxSpeed * 60 + width) % width;
        const posY = (star.baseY - offsetY * star.parallaxSpeed * 60 + height) % height;

        // Twinkle factor
        const currentAlpha = Math.max(0.1, star.alpha + Math.sin(tick * star.twinkleSpeed + star.twinkleOffset) * 0.25);

        ctx.fillStyle = star.tier === 3 ? `rgba(180, 240, 255, ${currentAlpha})` : `rgba(245, 247, 250, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(posX, posY, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow for near stars
        if (star.tier === 3) {
          ctx.fillStyle = `rgba(102, 230, 255, ${currentAlpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(posX, posY, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
