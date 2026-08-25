import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Global Aerospace Touch & Haptic Feedback Engine
 * - Hardware Haptic: Triggers native crisp vibration pulses (`navigator.vibrate(10)`)
 * - Visual Shockwave: Spawns expanding electromagnetic plasma ripple rings at contact points
 * - Tactile Compression: Universal tactile spring response on all interactive elements
 */
export default function TouchFeedback() {
  const [ripples, setRipples] = useState([]);

  // Hardware Haptic Trigger (Safe & Non-blocking)
  const triggerHaptic = useCallback((intensity = 'light') => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        if (intensity === 'light') {
          navigator.vibrate(12); // Crisp 12ms micro-haptic tap
        } else if (intensity === 'medium') {
          navigator.vibrate([15, 30, 15]); // Double tactile feedback
        } else if (intensity === 'heavy') {
          navigator.vibrate([25, 40, 35]); // Powerful shock pulse
        }
      } catch (e) {
        // Fallback gracefully on restricted environments
      }
    }
  }, []);

  useEffect(() => {
    let rippleId = 0;

    const handlePointerDown = (e) => {
      // Ignore right clicks
      if (e.button && e.button !== 0) return;

      const target = e.target;
      const isInteractive = target.closest('a, button, .btn, .glass-card, .hover-lift, input, textarea, select, [role="button"], .standalone-float-btn, .touch-scroll-item');

      // Trigger hardware vibration haptic on interactive touch
      triggerHaptic(isInteractive ? 'medium' : 'light');

      // Create visual plasma touch shockwave ripple
      const newRipple = {
        id: ++rippleId,
        x: e.clientX,
        y: e.clientY,
        color: isInteractive ? 'rgba(157, 136, 246, 0.65)' : 'rgba(102, 230, 255, 0.55)',
        glow: isInteractive ? 'rgba(157, 136, 246, 0.4)' : 'rgba(102, 230, 255, 0.3)',
        size: isInteractive ? 80 : 55,
      };

      setRipples((prev) => [...prev.slice(-8), newRipple]); // Keep maximum 8 active ripples for 60fps performance
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [triggerHaptic]);

  const removeRipple = (id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99998,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0.1, opacity: 1 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => removeRipple(ripple.id)}
            style={{
              position: 'absolute',
              top: ripple.y - ripple.size / 2,
              left: ripple.x - ripple.size / 2,
              width: ripple.size,
              height: ripple.size,
              borderRadius: '50%',
              border: `1.5px solid ${ripple.color}`,
              background: `radial-gradient(circle, ${ripple.glow} 0%, transparent 70%)`,
              boxShadow: `0 0 16px ${ripple.glow}, inset 0 0 10px ${ripple.glow}`,
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
