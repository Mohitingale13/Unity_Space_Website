import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Aerospace Precision Arrow Cursor with Mathematically Locked Rocket Thruster Plume
 * - The flame is drawn inside the identical SVG coordinate space, directly emerging from the rear nozzle notch
 * - 100% physically aligned with the flight spine of the rocket dart (shooting down-right along the thrust vector)
 * - Strictly desktop-only (@media (pointer: fine))
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    // Check if device uses fine pointer (mouse / trackpad)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const clickable = target.closest('a, button, .btn, .glass-card, .hover-lift, input, textarea, select, [role="button"], .standalone-float-btn');
      
      if (clickable) {
        setIsHovered(true);
        if (clickable.tagName === 'A' || clickable.tagName === 'BUTTON' || clickable.classList.contains('btn')) {
          setHoverLabel('THRUST: ENGAGE');
        } else if (clickable.classList.contains('glass-card')) {
          setHoverLabel('TELEMETRY: LOCK');
        } else {
          setHoverLabel('SYSTEM: ACTIVE');
        }
      } else {
        setIsHovered(false);
        setHoverLabel('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateCursor, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isFinePointer || !isVisible) return null;

  // Colors matching reference screenshot
  const currentColor = isHovered ? '#9d88f6' : '#7fead8';
  const currentGlow = isHovered ? 'rgba(157, 136, 246, 0.6)' : 'rgba(127, 234, 216, 0.45)';

  return (
    <>
      {/* Hide native cursor globally on fine pointer devices */}
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }

        @keyframes svgFlameFlicker {
          0%, 100% {
            transform: scale(1) translate(0, 0);
            opacity: 0.95;
          }
          25% {
            transform: scale(1.08, 0.95) translate(0.5px, 1px);
            opacity: 1;
          }
          50% {
            transform: scale(0.92, 1.05) translate(-0.5px, 0.5px);
            opacity: 0.88;
          }
          75% {
            transform: scale(1.12, 0.96) translate(1px, 1.5px);
            opacity: 1;
          }
        }
      `}</style>

      {/* Main Cursor Tracking Anchor */}
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-2px, -2px)',
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.12 : 1,
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          {/* Main SVG Container Holding Dart AND Perfectly Aligned Flame */}
          <div style={{ position: 'relative', filter: `drop-shadow(0 0 12px ${currentGlow})`, overflow: 'visible' }}>
            <svg
              width="44"
              height="48"
              viewBox="0 0 44 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Outer Plasma Flame Gradient */}
                <linearGradient id="plasmaGrad" x1="11" y1="18" x2="22" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="25%" stopColor="#7fead8" stopOpacity="0.9" />
                  <stop offset="55%" stopColor="#9d88f6" stopOpacity="0.85" />
                  <stop offset="80%" stopColor="#ff5277" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffb703" stopOpacity="0" />
                </linearGradient>

                {/* Hot Core Shock Diamond Gradient */}
                <linearGradient id="coreGrad" x1="11" y1="18" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#7fead8" />
                  <stop offset="100%" stopColor="#9d88f6" stopOpacity="0" />
                </linearGradient>

                {/* Flame Glow Filter */}
                <filter id="flameGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* ROCKET THRUSTER FLAME (Directly anchored to notch at (11, 18) and streaming down-right along the flight axis) */}
              <AnimatePresence>
                {isHovered && (
                  <g
                    style={{
                      transformOrigin: '11px 18px',
                      animation: 'svgFlameFlicker 0.16s ease-in-out infinite alternate',
                    }}
                    filter="url(#flameGlow)"
                  >
                    {/* Outer Plasma Jet Flame */}
                    <path
                      d="M7 21 C 8 26, 12 34, 21 42 C 22 34, 19 26, 17 18 C 14 18.5, 9.5 19.5, 7 21 Z"
                      fill="url(#plasmaGrad)"
                    />

                    {/* Inner Intense Cyan Shock Diamond */}
                    <path
                      d="M8.5 20 C 9.5 24, 12.5 30, 18 34 C 18.5 28, 16.5 22, 15 18.5 C 13 19, 10 19.5, 8.5 20 Z"
                      fill="url(#coreGrad)"
                    />

                    {/* White Ignition Nozzle Core */}
                    <path
                      d="M9.5 19 C 10 22, 12 25, 14.5 27 C 14.8 24, 14 20.5, 13 18.8 Z"
                      fill="#ffffff"
                    />

                    {/* Trailing Micro Sparks */}
                    <circle cx="21" cy="43" r="1.2" fill="#ffb703" opacity="0.9" />
                    <circle cx="24" cy="46" r="0.8" fill="#ff5277" opacity="0.75" />
                    <circle cx="18" cy="38" r="0.9" fill="#7fead8" opacity="0.85" />
                  </g>
                )}
              </AnimatePresence>

              {/* MAIN AERODYNAMIC CURSOR DART */}
              {/* Left wing goes to (3.5, 23.5), Right wing to (20, 17.5), Notch nozzle at (10.5, 18) */}
              <path
                d="M4.5 3.5 C 4 2.8, 3 3.2, 3 4.2 V23 C 3 23.8, 3.9 24.3, 4.5 23.7 L10.5 18.2 C 10.8 17.9, 11.2 17.7, 11.6 17.7 H19.8 C 20.6 17.7, 21 16.8, 20.5 16.2 L4.5 3.5 Z"
                fill={currentColor}
              />
              {/* Inner Sleek Detail Ridge */}
              <path
                d="M6 7.5 L15 16.5 H11 L6 21 V7.5 Z"
                fill="rgba(255, 255, 255, 0.28)"
              />
            </svg>
          </div>

          {/* Telemetry Coordinate Box */}
          <div
            style={{
              marginLeft: '0.45rem',
              marginTop: '0.45rem',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              lineHeight: '1.25',
              letterSpacing: '0.05em',
              color: currentColor,
              textShadow: `0 0 8px ${currentGlow}`,
              background: 'rgba(8, 9, 13, 0.82)',
              backdropFilter: 'blur(10px)',
              padding: '0.24rem 0.5rem',
              borderRadius: '4px',
              border: `1px solid ${isHovered ? 'rgba(157, 136, 246, 0.35)' : 'rgba(127, 234, 216, 0.25)'}`,
              pointerEvents: 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <span>x: {Math.round(position.x)}</span>
            <span>y: {Math.round(position.y)}</span>
            {isHovered && hoverLabel && (
              <span
                style={{
                  fontSize: '0.62rem',
                  color: '#ffb703',
                  fontWeight: 700,
                  marginTop: '0.15rem',
                  borderTop: '1px solid rgba(157, 136, 246, 0.3)',
                  paddingTop: '0.15rem',
                  letterSpacing: '0.08em',
                }}
              >
                🔥 {hoverLabel}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
