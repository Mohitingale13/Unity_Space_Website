import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X, Compass, Radio, Target, Terminal, Users, BookOpen, HeartHandshake, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Stable threshold
          if (scrollY > 50) {
            setIsScrolled(true);
          } else if (scrollY < 15) {
            setIsScrolled(false);
          }

          // Track active section without triggering layout changes
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

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          transition: 'padding 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
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
          {/* 1. Top Unified Glass Background Bar (Fades out seamlessly on scroll) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 'clamp(1rem, 4vw, 2.5rem)',
              right: 'clamp(1rem, 4vw, 2.5rem)',
              bottom: 0,
              background: 'rgba(10, 12, 18, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
              opacity: isScrolled ? 0 : 1,
              transform: isScrolled ? 'scale(0.98)' : 'scale(1)',
              transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
            aria-hidden="true"
          />

          {/* 2. Left Brand Logo (Fades out softly without shifting center buttons) */}
          <div
            style={{
              position: 'absolute',
              left: 'clamp(1.5rem, 5vw, 3.5rem)',
              display: 'flex',
              alignItems: 'center',
              opacity: isScrolled ? 0 : 1,
              transform: isScrolled ? 'translateY(-6px) scale(0.95)' : 'translateY(0) scale(1)',
              pointerEvents: isScrolled ? 'none' : 'auto',
              transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
                color: 'var(--text-primary)',
              }}
            >
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(102, 230, 255, 0.2), rgba(139, 124, 255, 0.2))',
                  border: '1px solid rgba(102, 230, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent)',
                  boxShadow: '0 0 15px rgba(102, 230, 255, 0.2)',
                }}
              >
                <Rocket size={17} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}
                >
                  UNITY SPACE
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                  }}
                >
                  SVPM COE BARAMATI
                </span>
              </div>
            </Link>
          </div>

          {/* 3. Center Floating Buttons Track (Permanently Centered - ZERO Layout Thrashing) */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: isScrolled ? '0.45rem' : '0.25rem',
              transition: 'gap 0.3s ease',
            }}
            className="desktop-links"
          >
            {/* Scrolled Return-to-Top Mini Rocket Pill Button */}
            <div
              style={{
                opacity: isScrolled ? 1 : 0,
                transform: isScrolled ? 'scale(1) translateX(0)' : 'scale(0.8) translateX(-10px)',
                pointerEvents: isScrolled ? 'auto' : 'none',
                transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <a
                href="#home"
                onClick={scrollToTop}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(10, 12, 18, 0.88)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(102, 230, 255, 0.45)',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(102, 230, 255, 0.15)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0px) scale(1)')}
                title="Return to top"
              >
                <Rocket size={14} />
                <span className="dock-logo-text">UNITY</span>
              </a>
            </div>

            {/* Individual Navigation Button Pills */}
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={item.path}
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: isScrolled ? '0.5rem 0.95rem' : '0.45rem 1rem',
                    borderRadius: 'var(--radius-pill)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-display)',
                    fontSize: isScrolled ? '0.86rem' : '0.9rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--text-primary)' : isScrolled ? '#e2e8f0' : 'var(--text-secondary)',
                    // Floating button background when scrolled
                    background: isScrolled
                      ? isActive
                        ? 'rgba(102, 230, 255, 0.22)'
                        : 'rgba(10, 12, 18, 0.88)'
                      : 'transparent',
                    backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                    WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
                    border: '1px solid',
                    borderColor: isScrolled
                      ? isActive
                        ? 'rgba(102, 230, 255, 0.65)'
                        : 'rgba(255, 255, 255, 0.12)'
                      : 'transparent',
                    boxShadow: isScrolled
                      ? isActive
                        ? '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(102, 230, 255, 0.25)'
                        : '0 8px 25px rgba(0, 0, 0, 0.55)'
                      : 'none',
                    transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, color 0.2s ease, transform 0.2s ease',
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = isScrolled ? 'rgba(16, 20, 32, 0.95)' : 'rgba(102, 230, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(102, 230, 255, 0.35)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = isScrolled ? 'rgba(10, 12, 18, 0.88)' : 'transparent';
                      e.currentTarget.style.borderColor = isScrolled ? 'rgba(255, 255, 255, 0.12)' : 'transparent';
                      e.currentTarget.style.transform = 'translateY(0px)';
                      e.currentTarget.style.color = isScrolled ? '#e2e8f0' : 'var(--text-secondary)';
                    }
                  }}
                >
                  {/* iOS Fluid Shifting Active Highlight Capsule */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 30,
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
                          : 'linear-gradient(135deg, rgba(102, 230, 255, 0.22), rgba(139, 124, 255, 0.15))',
                        border: isScrolled
                          ? 'none'
                          : '1px solid rgba(102, 230, 255, 0.65)',
                        boxShadow: isScrolled
                          ? 'none'
                          : '0 0 20px rgba(102, 230, 255, 0.35), inset 0 0 12px rgba(102, 230, 255, 0.12)',
                        zIndex: -1,
                        pointerEvents: 'none',
                      }}
                    />
                  )}

                  <IconComponent
                    size={13}
                    style={{
                      color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                      transition: 'color 0.2s ease',
                    }}
                  />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* 4. Right Action Button (Engage at top -> Scroll to top arrow when scrolled) */}
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
            <div
              style={{
                opacity: isScrolled ? 0 : 1,
                transform: isScrolled ? 'translateY(-6px) scale(0.95)' : 'translateY(0) scale(1)',
                pointerEvents: isScrolled ? 'none' : 'auto',
                transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="desktop-only"
            >
              <a
                href="#sponsors"
                className="btn btn-capsule"
                style={{ padding: '0.45rem 1.15rem' }}
              >
                <Radio size={12} style={{ color: 'var(--accent-status)' }} />
                <span>ENGAGE</span>
              </a>
            </div>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: isScrolled ? 'rgba(10, 12, 18, 0.9)' : 'transparent',
                backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
                border: isScrolled ? '1px solid rgba(102, 230, 255, 0.35)' : 'none',
                borderRadius: 'var(--radius-pill)',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '0.55rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.6)' : 'none',
              }}
              className="mobile-toggle"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Touch Drawer Navigation */}
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
              background: 'rgba(8, 9, 13, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              zIndex: 999,
              padding: '6rem 2rem 3rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="mono-label" style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
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
                      background: isActive ? 'rgba(102, 230, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid',
                      borderColor: isActive ? 'var(--accent)' : 'var(--glass-border)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <IconComp size={20} style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }} />
                      <span>{item.label}</span>
                    </div>
                    <Compass size={18} style={{ color: 'var(--text-muted)' }} />
                  </motion.a>
                );
              })}
            </div>

            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
              <div className="mono-label" style={{ marginBottom: '0.35rem', color: 'var(--text-muted)' }}>
                HOST INSTITUTION
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
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
        .dock-logo-text {
          display: none;
        }
        @media (min-width: 900px) {
          .desktop-links {
            display: flex !important;
          }
          .desktop-only {
            display: block !important;
          }
          .dock-logo-text {
            display: inline !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
