import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll-Driven Earth Planet Background
 * Mobile-First Positioned in First Visible Screen:
 * - Pinned to the 100vh initial viewport on mobile devices.
 * - Earth atmospheric rim arches prominently in the first visible screen behind the hero CTA/stats.
 * - Extended scroll visibility (stays 100% visible throughout hero scroll, only fading as user enters the timeline).
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
  // - Stays 100% visible from scroll 0 to 450px, smoothly fading out as user enters the timeline (850px)
  const scale = useTransform(scrollY, [0, 400, 800], [1.0, 1.12, 1.25]);
  const opacity = useTransform(scrollY, [0, 450, 850], [1, 0.75, 0]);
  const y = useTransform(scrollY, [0, 600], [0, -25]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: isMobile ? '100vh' : '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {/* Scalable Planet Container */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          x: '-50%',
          bottom: isMobile ? 'clamp(4%, 8vh, 12%)' : 'clamp(-8%, -4vw, 0%)',
          width: isMobile ? 'clamp(460px, 145vw, 750px)' : 'clamp(950px, 115vw, 1850px)',
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
            bottom: '22%',
            width: '92%',
            height: '48%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 85%, rgba(65, 155, 255, 0.45) 0%, rgba(20, 85, 225, 0.22) 50%, transparent 75%)',
            filter: 'blur(45px)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* High-Resolution Earth Dome with Gentle Curved Edge Feathering */}
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
