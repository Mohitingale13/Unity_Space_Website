import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, tickerHardwareCards } from '../../data/projectsData';
import { Terminal, ArrowUpRight, X, Cpu, Gauge, Compass, ShieldCheck, Layers, Radio } from 'lucide-react';

export default function ProjectsShowcase() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Double array for seamless infinite Right-to-Left (RTL) ticker loop
  const tickerItems = [...tickerHardwareCards, ...tickerHardwareCards];

  return (
    <section
      id="projects"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
        borderTop: '1px solid var(--glass-border)',
      }}
      aria-label="Unity Space Projects Archive and Flight Hardware"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <div className="mono-label" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
            03 / FLIGHT & ENGINEERING ARCHIVE
          </div>
          <h2 style={{ marginBottom: '1.25rem', textTransform: 'uppercase' }}>
            TESTED IN BARAMATI.<br />
            <span className="text-gradient">BUILT FOR ALTITUDE.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Every motor test stand, avionics board, and composite airframe represents rigorous student engineering, iterative manufacturing, and static fire validation.
          </p>
        </div>

        {/* Featured Flagship Missions Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: '4rem',
          }}
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              layoutId={`app-store-card-${project.id}`}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              onClick={() => setSelectedItem(project)}
              className="glass-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                padding: '0',
                borderRadius: '24px',
                position: 'relative',
              }}
            >
              {/* Card Image Container */}
              <motion.div
                layoutId={`app-store-image-${project.id}`}
                style={{
                  height: '240px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    display: 'flex',
                    gap: '0.5rem',
                  }}
                >
                  <span className="mono-tag" style={{ background: 'rgba(4, 7, 20, 0.85)', backdropFilter: 'blur(8px)' }}>
                    {project.code}
                  </span>
                  <span className="mono-tag secondary" style={{ background: 'rgba(4, 7, 20, 0.85)', backdropFilter: 'blur(8px)' }}>
                    {project.tag}
                  </span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <ArrowUpRight size={18} />
                </div>
              </motion.div>

              {/* Card Body */}
              <div style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="mono-label" style={{ color: 'var(--accent)', fontSize: '0.72rem', marginBottom: '0.5rem' }}>
                  {project.timeline}
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  {project.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                  {project.summary}
                </p>

                {/* Quick Telemetry Specs Pill */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--glass-border)',
                  }}
                >
                  {project.disciplines.map((d, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        border: '1px solid var(--glass-border)',
                      }}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          FEATURE 2: TICKER: RTL (Right-to-Left Continuous Infinite Hardware Stream)
          Reference: https://motion.dev/examples/vue-ticker-rtl
          ========================================================================= */}
      <div style={{ width: '100%', overflow: 'hidden', padding: '1rem 0' }}>
        <div className="container" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span className="live-indicator" />
            <span className="mono-label" style={{ letterSpacing: '0.12em', color: 'var(--text-primary)' }}>
              LIVE HARDWARE STREAM (RTL MARQUEE)
            </span>
          </div>
          <span className="mono-label" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            HOVER TO PAUSE // CLICK TO INSPECT
          </span>
        </div>

        {/* Right-To-Left Continuous Ticker Track */}
        <div
          style={{ width: '100%', overflow: 'hidden', position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            style={{
              display: 'flex',
              gap: '1.25rem',
              width: 'max-content',
            }}
            animate={{
              x: isHovered ? undefined : ['0%', '-50%'],
            }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 28,
            }}
          >
            {tickerItems.map((item, idx) => (
              <motion.div
                key={`ticker-${item.id}-${idx}`}
                layoutId={`app-store-card-${item.id}`}
                whileHover={{ scale: 1.04, y: -4 }}
                onClick={() => setSelectedItem(item)}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                style={{
                  width: 'clamp(260px, 26vw, 340px)',
                  height: '200px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--space-surface)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
                  flexShrink: 0,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <motion.div
                  layoutId={`app-store-image-${item.id}`}
                  style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.85)',
                    }}
                  />
                </motion.div>

                {/* Top Badges */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    display: 'flex',
                    gap: '0.4rem',
                    zIndex: 2,
                  }}
                >
                  <span className="mono-tag" style={{ background: 'rgba(4, 7, 20, 0.85)', backdropFilter: 'blur(8px)', fontSize: '0.65rem' }}>
                    {item.code}
                  </span>
                  <span className="mono-tag secondary" style={{ background: 'rgba(4, 7, 20, 0.85)', backdropFilter: 'blur(8px)', fontSize: '0.65rem' }}>
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Label Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '0.85rem 1rem',
                    background: 'linear-gradient(to top, rgba(4, 7, 20, 0.95) 0%, rgba(4, 7, 20, 0.5) 75%, transparent 100%)',
                    zIndex: 2,
                  }}
                >
                  <div className="mono-label" style={{ color: 'var(--accent)', fontSize: '0.68rem', marginBottom: '0.15rem' }}>
                    {item.label}
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Trajectory Timeline Component */}
      <div className="container" style={{ marginTop: '3rem' }}>
      </div>

      {/* =========================================================================
          FEATURE 5: APP STORE CARD EXPANSION MODAL
          Reference: https://motion.dev/examples/js-app-store
          ========================================================================= */}
      <AnimatePresence>
        {selectedItem && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(1rem, 3vw, 2.5rem)',
            }}
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(4, 7, 20, 0.88)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
              onClick={() => setSelectedItem(null)}
            />

            {/* App Store Expanded Card Container (layoutId shared transition) */}
            <motion.div
              layoutId={`app-store-card-${selectedItem.id}`}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              style={{
                position: 'relative',
                width: 'min(100%, 720px)',
                maxHeight: '90vh',
                background: '#0a1024',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                overflowY: 'auto',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 40px rgba(102, 230, 255, 0.15)',
                zIndex: 2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hero Image Section */}
              <motion.div
                layoutId={`app-store-image-${selectedItem.id}`}
                style={{
                  height: 'clamp(220px, 35vh, 320px)',
                  position: 'relative',
                  overflow: 'hidden',
                  width: '100%',
                }}
              >
                <img
                  src={selectedItem.image || selectedItem.url}
                  alt={selectedItem.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(4, 7, 20, 0.3) 0%, transparent 40%, rgba(10, 16, 36, 1) 100%)',
                  }}
                />

                {/* Floating Circular Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    background: 'rgba(4, 7, 20, 0.65)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    cursor: 'pointer',
                    zIndex: 10,
                  }}
                  aria-label="Close Project Modal"
                >
                  <X size={18} />
                </motion.button>

                {/* Floating Header Badges */}
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem', right: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span className="mono-tag">{selectedItem.code}</span>
                    <span className="mono-tag secondary">{selectedItem.tag}</span>
                    {selectedItem.status && (
                      <span className="mono-tag" style={{ background: 'rgba(0, 242, 169, 0.15)', color: '#00f2a9', borderColor: 'rgba(0, 242, 169, 0.3)' }}>
                        {selectedItem.status}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#ffffff', textTransform: 'uppercase', lineHeight: 1.1 }}>
                    {selectedItem.title}
                  </h2>
                </div>
              </motion.div>

              {/* Modal Body & Specifications */}
              <div style={{ padding: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {selectedItem.details || selectedItem.summary}
                </p>

                {/* Technical Specifications Grid (App Store Spec Readout) */}
                {selectedItem.specs && (
                  <div style={{ marginBottom: '2rem' }}>
                    <div className="mono-label" style={{ color: 'var(--accent)', marginBottom: '1rem', letterSpacing: '0.1em' }}>
                      TELEMETRY & HARDWARE BENCHMARKS
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '0.75rem',
                      }}
                    >
                      {Object.entries(selectedItem.specs).map(([key, val]) => (
                        <div
                          key={key}
                          className="glass-panel"
                          style={{ padding: '0.85rem 1rem', borderRadius: '12px' }}
                        >
                          <div className="mono-label" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            {key.replace(/([A-Z])/g, ' $1')}
                          </div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                            {val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                  <a
                    href="#sponsors"
                    onClick={() => setSelectedItem(null)}
                    className="btn btn-primary"
                    style={{ flex: '1 1 200px' }}
                  >
                    <Radio size={15} />
                    <span>ENGAGE ON THIS MISSION</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="btn btn-secondary"
                    style={{ flex: '1 1 140px' }}
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
