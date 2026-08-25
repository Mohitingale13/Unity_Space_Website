import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X, Compass, Radio, Target, Terminal, Users, BookOpen, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Modern Frosted White Glass Navbar (Mobile-First Engineered)
 * - Translucent white glass aesthetics with deep backdrop blur
 * - Luminous white refraction borders & specular top highlights
 * - Clean responsive behavior: strictly separates desktop links from mobile hamburger menu
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
          if (scrollY > 50) {
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
          padding: isScrolled ? '0.65rem 1rem' : '1.1rem 1.25rem',
          transition: 'padding 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="container navbar-container-inner"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '48px',
          }}
        >
          {/* 1. Dynamic Morphing Top Translucent White Glass Capsule Bar (Desktop Only) */}
          <motion.div
            className="desktop-only top-capsule-bg"
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

          {/* 2. Brand Anchor (Left on Desktop, Clean Pill on Mobile) */}
          <div
            className="brand-anchor"
            style={{
              position: 'absolute',
              left: 'clamp(1rem, 4vw, 3.5rem)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'auto',
              zIndex: 2,
            }}
          >
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                textDecoration: 'none',
                color: '#ffffff',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                background: isScrolled ? 'rgba(255, 255, 255, 0.14)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
                border: isScrolled ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid transparent',
                transition: 'all 0.3s ease',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 8 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.15))',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 0 16px rgba(255, 255, 255, 0.25)',
                  flexShrink: 0,
                }}
              >
                <Rocket size={17} />
              </motion.div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: '#ffffff',
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  UNITY SPACE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'rgba(255, 255, 255, 0.85)',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  SVPM COE BARAMATI
                </span>
              </div>
            </Link>
          </div>

          {/* 3. Center Navigation Track (Strictly Hidden on Mobile) */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            style={{
              position: 'relative',
              zIndex: 2,
              pointerEvents: 'auto',
              alignItems: 'center',
              gap: isScrolled ? '0.55rem' : '0.25rem',
              transition: 'gap 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="desktop-links"
            onMouseLeave={() => setHoveredSection(null)}
          >
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
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="navHoverPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
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

                  {isActive && (
                    <motion.div
                      layoutId="navActivePill"
                      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
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
                        border: isScrolled ? 'none' : '1px solid rgba(255, 255, 255, 0.6)',
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
            className="right-action-anchor"
            style={{
              position: 'absolute',
              right: 'clamp(1rem, 4vw, 3.5rem)',
              display: 'flex',
              alignItems: 'center',
              zIndex: 2,
              pointerEvents: 'auto',
            }}
          >
            {/* Top Bar "ENGAGE" CTA (Desktop Only) */}
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
                background: 'rgba(255, 255, 255, 0.18)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: 'var(--radius-pill)',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '0.55rem 0.85rem',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.4)',
              }}
              aria-label="Toggle Navigation Menu"
              className="mobile-only"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{
              position: 'fixed',
              top: '72px',
              left: '1rem',
              right: '1rem',
              background: 'rgba(10, 15, 28, 0.92)',
              backdropFilter: 'blur(30px) saturate(190%)',
              WebkitBackdropFilter: 'blur(30px) saturate(190%)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              zIndex: 999,
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
            }}
          >
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      textDecoration: 'none',
                      color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                      background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                      border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                    }}
                  >
                    <IconComponent size={18} style={{ color: isActive ? '#66e6ff' : 'inherit' }} />
                    <span>{item.label}</span>
                  </a>
                );
              })}
              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <a
                  href="#sponsors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <Radio size={14} />
                  <span>ENGAGE MISSION</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
