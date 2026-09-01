import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Aerospace Precision Arrow Cursor with Rocket Thruster Ignition Flame
 * - Default State: Cyan Aerospace Dart (#7fead8) + (x, y) Telemetry
 * - Interactive/Hover State: Vibrant Purple/Lavender Dart (#9d88f6) + Multi-layer Thruster Flame Plume + Telemetry
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

  // Colors matching the user's reference screenshot
  const currentColor = isHovered ? '#9d88f6' : '#7fead8';
  const currentGlow = isHovered ? 'rgba(157, 136, 246, 0.55)' : 'rgba(127, 234, 216, 0.45)';

  return (
    <>
      {/* Hide native cursor globally on fine pointer devices */}
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }

        @keyframes thrusterFlicker {
          0%, 100% {
            transform: scaleY(1) scaleX(1) rotate(0deg);
            opacity: 0.95;
          }
          25% {
            transform: scaleY(1.25) scaleX(0.85) rotate(-3deg);
            opacity: 1;
          }
          50% {
            transform: scaleY(0.9) scaleX(1.1) rotate(2deg);
            opacity: 0.85;
          }
          75% {
            transform: scaleY(1.35) scaleX(0.9) rotate(-1deg);
            opacity: 1;
          }
        }

        @keyframes sparkRise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(22px) scale(0.2);
            opacity: 0;
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
          zIndex: 2147483647,
          transform: 'translate(-2px, -2px)',
        }}
        aria-hidden="true"
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? -4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          {/* Main Aerodynamic Cursor Dart */}
          <div style={{ position: 'relative', filter: `drop-shadow(0 0 12px ${currentGlow})` }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Smooth Rounded Dart Cursor Path */}
              <path
                d="M3.824 2.895C3.332 2.378 2.5 2.726 2.5 3.447V22.25c0 .763.904 1.168 1.47.653l5.857-5.325a1 1 0 0 1 .672-.262h8.054c.783 0 1.203-.923.685-1.51L3.824 2.895Z"
                fill={currentColor}
              />
              {/* Inner Sleek Detail Ridge */}
              <path
                d="M5.5 6.5L14.5 15.5H10.5L5.5 20V6.5Z"
                fill="rgba(255, 255, 255, 0.28)"
              />
            </svg>

            {/* Rocket Thruster Ignition Flame (Ignites directly below cursor exhaust on hover) */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute',
                    top: '21px',
                    left: '2px',
                    width: '18px',
                    height: '32px',
                    pointerEvents: 'none',
                    transformOrigin: 'top center',
                    animation: 'thrusterFlicker 0.18s ease-in-out infinite alternate',
                  }}
                >
                  {/* 1. Outer Violet Plasma Flame Envelope */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '2px',
                      width: '14px',
                      height: '28px',
                      background: 'radial-gradient(ellipse at top, #9d88f6 0%, #ff5277 45%, #ffb703 80%, transparent 100%)',
                      borderRadius: '50% 50% 60% 60% / 30% 30% 70% 70%',
                      filter: 'blur(1.5px)',
                      boxShadow: '0 0 18px rgba(255, 82, 119, 0.8), 0 0 30px rgba(157, 136, 246, 0.6)',
                    }}
                  />

                  {/* 2. Mid Cyan Shock Diamond / Hot Flame Jet */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '4px',
                      width: '10px',
                      height: '20px',
                      background: 'radial-gradient(ellipse at top, #ffffff 0%, #7fead8 50%, #9d88f6 90%, transparent 100%)',
                      borderRadius: '50% 50% 60% 60% / 30% 30% 70% 70%',
                      filter: 'blur(0.8px)',
                    }}
                  />

                  {/* 3. Intense White Combustion Core */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1px',
                      left: '6px',
                      width: '6px',
                      height: '10px',
                      background: '#ffffff',
                      borderRadius: '50%',
                      boxShadow: '0 0 8px #ffffff',
                    }}
                  />

                  {/* 4. Micro Exhaust Embers & Sparks */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '5px',
                      width: '3px',
                      height: '3px',
                      borderRadius: '50%',
                      background: '#ffb703',
                      boxShadow: '0 0 6px #ff5277',
                      animation: 'sparkRise 0.3s linear infinite',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '24px',
                      left: '9px',
                      width: '2px',
                      height: '2px',
                      borderRadius: '50%',
                      background: '#7fead8',
                      boxShadow: '0 0 6px #9d88f6',
                      animation: 'sparkRise 0.25s linear infinite 0.1s',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Telemetry Coordinate Box */}
          <div
            style={{
              marginLeft: '0.5rem',
              marginTop: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              lineHeight: '1.25',
              letterSpacing: '0.05em',
              color: currentColor,
              textShadow: `0 0 8px ${currentGlow}`,
              background: 'rgba(8, 9, 13, 0.78)',
              backdropFilter: 'blur(10px)',
              padding: '0.22rem 0.48rem',
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
                ðŸ”¥ {hoverLabel}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
