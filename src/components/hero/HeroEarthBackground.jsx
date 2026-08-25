import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll-Driven Earth Planet Background
 * Mobile-First Optimized:
 * - Positioned cleanly in the first visible viewport on mobile screens (pinned to the bottom of the landing frame).
 * - Full-resolution GPU texture rendering without filter blur on the image.
 * - Upper-curve spherical feathering on bottom edge.
 * - Fades out smoothly as the user scrolls into the timeline.
 */
export default function HeroEarthBackground() {
  const containerRef = useRef(null);

  // Track global scroll
  const { scrollY } = useScroll();

  // Responsive scroll transforms
  const scale = useTransform(scrollY, [0, 300, 560], [1.0, 1.15, 1.3]);
  const opacity = useTransform(scrollY, [0, 130, 350], [1, 0.6, 0]);
  const y = useTransform(scrollY, [0, 450], [0, -18]);

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
      {/* Scalable Planet Container (Positioned in first visible screen on mobile & desktop) */}
      <motion.div
        className="hero-earth-container"
        style={{
          position: 'absolute',
          left: '50%',
          x: '-50%',
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
            bottom: '20%',
            width: '90%',
            height: '45%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 85%, rgba(65, 155, 255, 0.4) 0%, rgba(20, 85, 225, 0.18) 50%, transparent 75%)',
            filter: 'blur(40px)',
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
