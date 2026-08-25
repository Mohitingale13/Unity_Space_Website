import { useEffect, useRef } from 'react';

/**
 * Celestial Deep Space Twinkling Starfield Engine
 * Ultra-delicate tiny pinprick starlight dots:
 * - Micro star sizes (0.25px - 0.75px) for sharp, refined stardust
 * - Individual realistic blinking, breathing, and vanishing cycles
 * - Zero fuzzy glow halos for maximum crispness
 * - Rich star density across deep celestial midnight navy
 * - Tab visibility detection for zero CPU/GPU overhead when unfocused
 */
export default function StarfieldCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId = null;
    let isTabVisible = true;

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 250 : 580;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star data collection with ultra-tiny pinprick radii
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const tier = Math.random();
      let size, maxAlpha, twinkleSpeed, exponent, depth, color;

      if (tier < 0.80) {
        // 80% Ultra-micro starlight dots (0.25px - 0.5px)
        size = Math.random() * 0.25 + 0.25;
        maxAlpha = Math.random() * 0.4 + 0.35;
        twinkleSpeed = Math.random() * 1.5 + 0.6;
        exponent = 1.6;
        depth = 0.02;
      } else if (tier < 0.96) {
        // 16% Small starlight dots (0.45px - 0.7px)
        size = Math.random() * 0.25 + 0.45;
        maxAlpha = Math.random() * 0.35 + 0.55;
        twinkleSpeed = Math.random() * 1.8 + 0.8;
        exponent = 1.3;
        depth = 0.05;
      } else {
        // 4% Subtle accent dots (0.7px - 0.9px max)
        size = Math.random() * 0.2 + 0.7;
        maxAlpha = Math.random() * 0.25 + 0.75;
        twinkleSpeed = Math.random() * 2.2 + 1.2;
        exponent = 1.0;
        depth = 0.1;
      }

      // Star hues: Diamond White, Icy Pale Blue, Soft Warm Gold
      const hueChoice = Math.random();
      if (hueChoice < 0.72) {
        color = '255, 255, 255';
      } else if (hueChoice < 0.88) {
        color = '220, 238, 255';
      } else {
        color = '255, 248, 230';
      }

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        maxAlpha,
        twinkleSpeed,
        exponent,
        depth,
        color,
        phase: Math.random() * Math.PI * 2,
        driftSpeedY: (Math.random() - 0.5) * 0.02 - 0.015,
        driftSpeedX: (Math.random() - 0.5) * 0.01,
        canRelocate: Math.random() > 0.35,
      });
    }

    // Shooting stars queue
    let shootingStar = null;
    let nextShootingStarTime = 5 + Math.random() * 7;

    // Mouse parallax tracking (Desktop only)
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e) => {
      if (isMobile) return;
      targetMouseX = (e.clientX - width / 2) * 0.035;
      targetMouseY = (e.clientY - height / 2) * 0.035;
    };

    if (!isMobile) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    // Visibility API (Sleep when tab is backgrounded)
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animationFrameId) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTimestamp = performance.now();
    let totalTime = 0;

    const render = (now = performance.now()) => {
      if (!isTabVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(render);
      const dt = Math.min(0.1, (now - lastTimestamp) * 0.001);
      lastTimestamp = now;
      totalTime += dt;

      if (!isMobile) {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
      }

      ctx.clearRect(0, 0, width, height);

      // Render Starfield as crisp tiny dots
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Micro cosmic drift
        star.y += star.driftSpeedY;
        star.x += star.driftSpeedX;

        if (star.y < -10) star.y = height + 10;
        if (star.y > height + 10) star.y = -10;
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;

        // Vanishing & Blinking formula
        const wave = Math.sin(totalTime * star.twinkleSpeed + star.phase);
        
        let alpha = 0;
        if (wave > 0) {
          alpha = Math.pow(wave, star.exponent) * star.maxAlpha;
        } else if (star.canRelocate && wave < -0.98) {
          // Relocate star randomly while it is completely vanished
          star.x = Math.random() * width;
          star.y = Math.random() * height;
        }

        if (alpha > 0.01) {
          const renderX = isMobile ? star.x : star.x + mouseX * star.depth;
          const renderY = isMobile ? star.y : star.y + mouseY * star.depth;

          ctx.fillStyle = `rgba(${star.color}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Handle subtle shooting stars
      if (!shootingStar && totalTime > nextShootingStarTime) {
        shootingStar = {
          x: Math.random() * (width * 0.8) + width * 0.1,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 50 + 40,
          speed: Math.random() * 400 + 300,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          progress: 0,
          duration: Math.random() * 0.45 + 0.35,
        };
      }

      if (shootingStar) {
        shootingStar.progress += dt / shootingStar.duration;
        const p = shootingStar.progress;

        if (p >= 1) {
          shootingStar = null;
          nextShootingStarTime = totalTime + 6 + Math.random() * 9;
        } else {
          const fade = Math.sin(p * Math.PI);
          const startX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.speed * p;
          const startY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.speed * p;
          const endX = startX - Math.cos(shootingStar.angle) * shootingStar.length * fade;
          const endY = startY - Math.sin(shootingStar.angle) * shootingStar.length * fade;

          const grad = ctx.createLinearGradient(startX, startY, endX, endY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${fade * 0.8})`);
          grad.addColorStop(0.3, `rgba(180, 220, 255, ${fade * 0.4})`);
          grad.addColorStop(1, 'rgba(180, 220, 255, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      }
    };

    render();

    // Resize Handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (!isMobile) window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
