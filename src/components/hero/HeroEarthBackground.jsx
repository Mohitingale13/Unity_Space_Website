import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll-Driven Earth Planet Background
 * - Arches across the bottom of the Hero section.
 * - Mobile-First: Positioned prominently in the first visible screen on mobile.
 * - Features atmospheric blue aurora backlight and curved horizon feathering.
 * - Smoothly scales and fades as user scrolls past the Hero into the Mission section.
 */
export default function HeroEarthBackground() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track global scroll
  const { scrollY } = useScroll();

  // Responsive scroll transforms:
  const scale = useTransform(scrollY, [0, 450, 800], [1.0, 1.08, 1.18]);
  const opacity = useTransform(scrollY, [0, 400, 750], [1, 0.65, 0]);
  const y = useTransform(scrollY, [0, 600], [0, -20]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {/* Scalable Planet Container */}
      <motion.div
        className="hero-earth-container"
        style={{
          position: 'absolute',
          left: '50%',
          x: '-50%',
          bottom: isMobile ? 'clamp(1%, 4vh, 7%)' : 'clamp(-10%, -6vw, -2%)',
          width: isMobile ? 'clamp(480px, 140vw, 750px)' : 'clamp(950px, 115vw, 1850px)',
          maxWidth: '1900px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          scale,
          opacity,
          y,
          transformOrigin: '50% 80%',
          willChange: 'transform, opacity',
        }}
      >
        {/* Atmospheric Blue Aurora Backlight */}
        <div
          style={{
            position: 'absolute',
            bottom: '24%',
            width: '94%',
            height: '52%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 85%, rgba(65, 155, 255, 0.5) 0%, rgba(20, 85, 225, 0.25) 50%, transparent 75%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* High-Resolution Earth Dome with Curved Edge Feathering */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            zIndex: 2,
            WebkitMaskImage:
              'radial-gradient(ellipse 98% 88% at 50% 8%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 76%, rgba(0, 0, 0, 0.88) 86%, rgba(0, 0, 0, 0.3) 94%, rgba(0, 0, 0, 0) 100%)',
            maskImage:
              'radial-gradient(ellipse 98% 88% at 50% 8%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 76%, rgba(0, 0, 0, 0.88) 86%, rgba(0, 0, 0, 0.3) 94%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          <img
            src="/images/earth.png"
            alt="Earth Atmosphere Horizon"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              imageRendering: 'high-quality',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              userSelect: 'none',
              WebkitUserDrag: 'none',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
