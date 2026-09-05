import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll-Driven Earth Planet Background
 * - Uncropped: Complete Earth PNG image is fully visible without masks or rectangular cuts.
 * - Visible on laptop & mobile: Positioned so the complete curvature and atmospheric rim are seen.
 * - Gentle, extended scroll transitions so the planet remains visible across the Hero and transition.
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
  // Stays 100% visible through Hero scroll, gently dissolving as user moves into Mission
  const scale = useTransform(
    scrollY,
    isMobile ? [0, 500, 1100] : [0, 600, 1300],
    isMobile ? [1.0, 1.05, 1.14] : [1.0, 1.06, 1.15]
  );
  const opacity = useTransform(
    scrollY,
    isMobile ? [0, 450, 1100] : [0, 600, 1300],
    isMobile ? [1, 1, 0] : [1, 0.85, 0]
  );
  const y = useTransform(
    scrollY,
    isMobile ? [0, 700] : [0, 700],
    isMobile ? [0, -18] : [0, -22]
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
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
          bottom: isMobile ? 'clamp(4%, 10vh, 18%)' : 'clamp(-8%, -5vw, 0%)',
          width: isMobile ? 'clamp(500px, 150vw, 820px)' : 'clamp(950px, 115vw, 1850px)',
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
            bottom: '18%',
            width: '94%',
            height: '55%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 85%, rgba(65, 165, 255, 0.55) 0%, rgba(20, 95, 240, 0.28) 50%, transparent 75%)',
            filter: isMobile ? 'blur(35px)' : 'blur(50px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Complete Uncropped Earth PNG Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            zIndex: 2,
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
