import { useEffect, useRef } from 'react';

/**
 * Celestial Deep Space Starfield Engine
 * - Calm, curated star density (no overcrowding or disco effect)
 * - Authentic 4-point diamond star shapes (✦) for twinkling stars (never round circles)
 * - Ultra-crisp microscopic pinprick dots (0.45px - 0.95px) for calm background stars
 * - Handful of slow, gentle organic sparkles (12-16 on desktop, 6-8 on mobile)
 * - Occasional graceful shooting star
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
    // Curated, calm star quantity (decreased significantly)
    const starCount = isMobile ? 70 : 140;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star collection:
    // ~88% are calm, tiny microscopic pinpricks
    // ~12% are authentic 4-point diamond star sparkles that gently twinkle
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      const isSparkleStar = i < (isMobile ? 8 : 16); // Only a handful twinkle

      let size, minAlpha, maxAlpha, twinkleSpeed, exponent, spikeLength, color;

      if (isSparkleStar) {
        // Authentic 4-point sparkling star (✦)
        size = Math.random() * 0.4 + 0.8; // Compact 0.8px - 1.2px core
        spikeLength = Math.random() * 2.2 + 3.2; // 3.2px - 5.4px needle rays
        minAlpha = Math.random() * 0.15 + 0.1;
        maxAlpha = Math.random() * 0.25 + 0.75;
        twinkleSpeed = Math.random() * 1.2 + 0.7; // Slow, majestic breathing
        exponent = 1.8;
      } else {
        // Calm, microscopic pinprick background stars (0.45px - 0.95px)
        size = Math.random() * 0.5 + 0.45;
        spikeLength = 0;
        minAlpha = Math.random() * 0.35 + 0.35;
        maxAlpha = minAlpha;
        twinkleSpeed = 0; // Completely steady, no distracting blinking
        exponent = 1;
      }

      // Star hues: Diamond White, Soft Cyan, Ice Blue, Starlight Gold
      const hueChoice = Math.random();
      if (hueChoice < 0.55) {
        color = '255, 255, 255';
      } else if (hueChoice < 0.78) {
        color = '160, 235, 255';
      } else if (hueChoice < 0.90) {
        color = '200, 225, 255';
      } else {
        color = '255, 248, 225';
      }

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        spikeLength,
        isSparkleStar,
        minAlpha,
        maxAlpha,
        twinkleSpeed,
        exponent,
        color,
        phase: Math.random() * Math.PI * 2,
        driftSpeedY: (Math.random() - 0.5) * 0.015 - 0.01,
        driftSpeedX: (Math.random() - 0.5) * 0.008,
      });
    }

    // Helper: Draw authentic 4-point diamond star (✦ shape, not a circle!)
    const drawDiamondStar = (cx, cy, coreR, spikeLen, color, alpha) => {
      ctx.fillStyle = `rgba(${color}, ${alpha})`;

      // Horizontal & vertical needle star points
      ctx.beginPath();
      ctx.moveTo(cx, cy - spikeLen);
      ctx.quadraticCurveTo(cx, cy, cx + coreR, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + spikeLen);
      ctx.quadraticCurveTo(cx, cy, cx - coreR, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - spikeLen);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx - spikeLen, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + coreR);
      ctx.quadraticCurveTo(cx, cy, cx + spikeLen, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - coreR);
      ctx.quadraticCurveTo(cx, cy, cx - spikeLen, cy);
      ctx.fill();

      // Subtle bright starlight pinpoint center
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 0.75, 0, Math.PI * 2);
      ctx.fill();
    };

    // Shooting stars queue
    let shootingStar = null;
    let nextShootingStarTime = 6 + Math.random() * 8;

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

      ctx.clearRect(0, 0, width, height);

      // Render Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Gentle cosmic drift
        star.y += star.driftSpeedY;
        star.x += star.driftSpeedX;

        if (star.y < -15) star.y = height + 15;
        if (star.y > height + 15) star.y = -15;
        if (star.x < -15) star.x = width + 15;
        if (star.x > width + 15) star.x = -15;

        if (star.isSparkleStar) {
          // Slow, organic diamond star sparkle
          const wave = (Math.sin(totalTime * star.twinkleSpeed + star.phase) + 1) * 0.5;
          const alpha = star.minAlpha + Math.pow(wave, star.exponent) * (star.maxAlpha - star.minAlpha);
          const currentSpike = star.spikeLength * (0.6 + wave * 0.5);

          drawDiamondStar(star.x, star.y, star.size, currentSpike, star.color, alpha);
        } else {
          // Crisp, steady microscopic pinprick dot (never looks like a big circle)
          ctx.fillStyle = `rgba(${star.color}, ${star.minAlpha})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Rare, elegant shooting star
      if (!shootingStar && totalTime > nextShootingStarTime) {
        shootingStar = {
          x: Math.random() * (width * 0.8) + width * 0.1,
          y: Math.random() * (height * 0.35),
          length: Math.random() * 60 + 40,
          speed: Math.random() * 450 + 350,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.25,
          progress: 0,
          duration: Math.random() * 0.45 + 0.35,
        };
      }

      if (shootingStar) {
        shootingStar.progress += dt / shootingStar.duration;
        const p = shootingStar.progress;

        if (p >= 1) {
          shootingStar = null;
          nextShootingStarTime = totalTime + 7 + Math.random() * 10;
        } else {
          const fade = Math.sin(p * Math.PI);
          const startX = shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.speed * p;
          const startY = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.speed * p;
          const endX = startX - Math.cos(shootingStar.angle) * shootingStar.length * fade;
          const endY = startY - Math.sin(shootingStar.angle) * shootingStar.length * fade;

          const grad = ctx.createLinearGradient(startX, startY, endX, endY);
          grad.addColorStop(0, `rgba(255, 255, 255, ${fade * 0.9})`);
          grad.addColorStop(0.3, `rgba(160, 235, 255, ${fade * 0.5})`);
          grad.addColorStop(1, 'rgba(160, 235, 255, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.1;
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
