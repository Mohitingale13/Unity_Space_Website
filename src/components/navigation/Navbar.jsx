import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X, Compass, Radio, Target, Terminal, Users, BookOpen, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modern Frosted White Glass Navbar
 * - Translucent white glass aesthetics with deep backdrop blur
 * - Luminous white refraction borders & specular top highlights
 * - Morphing top capsule to floating frosted glass pills on scroll
 * - High-contrast crisp white typography with smooth hover & active animations
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Asymmetric hysteresis threshold for smooth morphing
          if (scrollY > 55) {
            setIsScrolled(true);
          } else if (scrollY < 15) {
            setIsScrolled(false);
          }

          // Track active section
          const sections = ['home', 'mission', 'projects', 'team', 'insights', 'sponsors'];
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 280 && rect.bottom >= 200) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { id: 'home', label: 'Home', path: '/#home', icon: Rocket },
    { id: 'mission', label: 'Mission', path: '/#mission', icon: Target },
    { id: 'projects', label: 'Projects', path: '/#projects', icon: Terminal },
    { id: 'team', label: 'Team', path: '/#team', icon: Users },
    { id: 'insights', label: 'Insights', path: '/#insights', icon: BookOpen },
    { id: 'sponsors', label: 'Support', path: '/#sponsors', icon: HeartHandshake },
  ];

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          pointerEvents: 'none',
          padding: isScrolled ? '0.75rem 1rem' : '1.25rem 1.5rem',
          transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="container"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '48px',
          }}
        >
          {/* 1. Dynamic Morphing Top Translucent White Glass Capsule Bar */}
          <motion.div
            initial={false}
            animate={{
              opacity: isScrolled ? 0 : 1,
              scaleX: isScrolled ? 0.85 : 1,
              scaleY: isScrolled ? 0.75 : 1,
              y: isScrolled ? -8 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 26,
              mass: 0.8,
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 'clamp(1rem, 4vw, 2.5rem)',
              right: 'clamp(1rem, 4vw, 2.5rem)',
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(28px) saturate(190%)',
              WebkitBackdropFilter: 'blur(28px) saturate(190%)',
              border: '1px solid rgba(255, 255, 255, 0.28)',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 16px 45px rgba(0, 0, 0, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.45), 0 0 25px rgba(255, 255, 255, 0.08)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* 2. Brand Anchor (Left) - Visible only at the top */}
          <motion.div
            animate={{
              opacity: isScrolled ? 0 : 1,
              x: isScrolled ? -15 : 0,
              scale: isScrolled ? 0.92 : 1,
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            style={{
              position: 'absolute',
              left: 'clamp(1.5rem, 5vw, 3.5rem)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: isScrolled ? 'none' : 'auto',
              zIndex: 2,
            }}
            className="brand-anchor"
          >
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                textDecoration: 'none',
                color: '#ffffff',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 8 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.15))',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 0 16px rgba(255, 255, 255, 0.25)',
                }}
              >
                <Rocket size={18} />
              </motion.div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: '#ffffff',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  UNITY SPACE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                    letterSpacing: '0.1em',
                  }}
                >
                  SVPM COE BARAMATI
                </span>
              </div>
            </Link>
          </motion.div>

          {/* 3. Center Navigation Track with White Frosted Glass Floating Pills */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            style={{
              position: 'relative',
              zIndex: 2,
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: isScrolled ? '0.55rem' : '0.25rem',
              transition: 'gap 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="desktop-links"
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Navigation Buttons */}
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              const isHovered = hoveredSection === item.id;

              return (
                <motion.a
                  key={item.id}
                  layout
                  href={item.path}
                  onMouseEnter={() => setHoveredSection(item.id)}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.48rem',
                    padding: isScrolled ? '0.55rem 1.1rem' : '0.5rem 1.15rem',
                    borderRadius: 'var(--radius-pill)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                    fontSize: isScrolled ? '0.88rem' : '0.92rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#ffffff' : isHovered ? '#ffffff' : isScrolled ? '#f1f5f9' : 'rgba(255, 255, 255, 0.9)',
                    // Morphing white glass: clean inside top bar -> floating white frosted glass pill on scroll
                    background: isScrolled
                      ? isActive
                        ? 'rgba(255, 255, 255, 0.28)'
                        : 'rgba(255, 255, 255, 0.12)'
                      : 'transparent',
                    backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
                    WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
                    border: '1px solid',
                    borderColor: isScrolled
                      ? isActive
                        ? 'rgba(255, 255, 255, 0.65)'
                        : 'rgba(255, 255, 255, 0.25)'
                      : 'transparent',
                    boxShadow: isScrolled
                      ? isActive
                        ? '0 12px 35px rgba(0, 0, 0, 0.4), inset 0 1px 1.5px rgba(255, 255, 255, 0.55), 0 0 20px rgba(255, 255, 255, 0.2)'
                        : '0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.25)'
                      : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 1,
                  }}
                >
                  {/* Dynamic Sliding Hover White Glass Pill */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="navHoverPill"
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(255, 255, 255, 0.16)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
                        zIndex: -1,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  {/* Dynamic Sliding Active Section Glowing Capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="navActivePill"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 28,
                      }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 'var(--radius-pill)',
                        background: isScrolled
                          ? 'transparent'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0.18))',
                        border: isScrolled
                          ? 'none'
                          : '1px solid rgba(255, 255, 255, 0.6)',
                        boxShadow: isScrolled
                          ? 'none'
                          : '0 0 22px rgba(255, 255, 255, 0.3), inset 0 1px 1.5px rgba(255, 255, 255, 0.5)',
                        zIndex: -1,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  <motion.div
                    animate={{
                      rotate: isActive ? [0, -8, 8, 0] : 0,
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <IconComponent
                      size={14}
                      style={{
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                        transition: 'color 0.2s ease',
                      }}
                    />
                  </motion.div>
                  <span>{item.label}</span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* 4. Right Action Anchor */}
          <div
            style={{
              position: 'absolute',
              right: 'clamp(1.5rem, 5vw, 3.5rem)',
              display: 'flex',
              alignItems: 'center',
              zIndex: 2,
              pointerEvents: 'auto',
            }}
            className="right-action-anchor"
          >
            {/* Top Bar "ENGAGE" CTA */}
            <motion.div
              animate={{
                opacity: isScrolled ? 0 : 1,
                x: isScrolled ? 15 : 0,
                scale: isScrolled ? 0.92 : 1,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
              className="desktop-only"
            >
              <motion.a
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.92 }}
                href="#sponsors"
                className="btn btn-capsule"
                style={{
                  padding: '0.48rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.16)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  color: '#ffffff',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
                }}
              >
                <Radio size={12} style={{ color: 'var(--accent-status)' }} />
                <span>ENGAGE</span>
              </motion.a>
            </motion.div>

            {/* Mobile Toggle Button (Frosted White Glass) */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'rgba(255, 255, 255, 0.16)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                borderRadius: 'var(--radius-pill)',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '0.55rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
              className="mobile-toggle"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Touch Drawer Navigation (Frosted Deep Space Glass) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(6, 11, 28, 0.88)',
              backdropFilter: 'blur(32px) saturate(190%)',
              WebkitBackdropFilter: 'blur(32px) saturate(190%)',
              zIndex: 999,
              padding: '6rem 2rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="mono-label" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '0.5rem' }}>
                NAVIGATION TELEMETRY
              </div>
              {navItems.map((item, idx) => {
                const IconComp = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 + 0.05 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      padding: '0.85rem 1.25rem',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid',
                      borderColor: isActive ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.18)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: isActive ? '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <IconComp size={20} style={{ color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)' }} />
                      <span>{item.label}</span>
                    </div>
                    <Compass size={18} style={{ color: 'rgba(255, 255, 255, 0.6)' }} />
                  </motion.a>
                );
              })}
            </div>

            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div className="mono-label" style={{ marginBottom: '0.35rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                HOST INSTITUTION
              </div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
                SVPM College of Engineering Malegaon(bk) Baramati
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-links {
          display: none;
        }
        .desktop-only {
          display: none;
        }
        @media (min-width: 900px) {
          .desktop-links {
            display: flex !important;
          }
          .desktop-only {
            display: block !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
