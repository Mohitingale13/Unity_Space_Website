import { motion } from 'framer-motion';

/**
 * SurfaceReveal: 3D Perspective Elevation & Blur-Dissolve Scroll Animation
 * - Simulates content rising up from a flat horizon plane into vertical viewport alignment
 * - Smooth opacity transition from 0 to 1 with 3D rotateX and blur dissipation
 */
export default function SurfaceReveal({
  children,
  delay = 0,
  duration = 0.85,
  yOffset = 65,
  rotateAngle = 15,
  style = {},
  className = '',
  threshold = 0.12,
}) {
  return (
    <div
      style={{
        perspective: '1200px',
        WebkitPerspective: '1200px',
        width: '100%',
        ...style,
      }}
      className={className}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: yOffset,
          rotateX: rotateAngle,
          scale: 0.94,
          filter: 'blur(10px)',
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: 'blur(0px)',
        }}
        viewport={{ once: true, amount: threshold }}
        transition={{
          duration: duration,
          delay: delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformOrigin: '50% 100%',
          transformStyle: 'preserve-3d',
          width: '100%',
          willChange: 'transform, opacity, filter',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
