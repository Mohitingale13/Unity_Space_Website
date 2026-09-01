import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { articlesData } from '../../data/articlesData';
import SurfaceReveal from '../atmosphere/SurfaceReveal';
import { ChevronLeft, ChevronRight, BookOpen, X, Clock, Calendar, Sparkles, ArrowRight } from 'lucide-react';

// Directional slide animation variants (from motion.dev/examples/react-carousel-pagination-arrows)
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 450 : -450,
    opacity: 0,
    scale: 0.92,
    filter: 'blur(8px)',
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 28,
      mass: 0.8,
    },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 450 : -450,
    opacity: 0,
    scale: 0.92,
    filter: 'blur(8px)',
    transition: {
      type: 'spring',
      stiffness: 320,
      damping: 28,
      mass: 0.8,
    },
  }),
};

export default function InsightsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const total = articlesData.length;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + total) % total);
  };

  const jumpToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Keyboard arrow navigation and Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedArticle) {
        if (e.key === 'Escape') setSelectedArticle(null);
        return;
      }
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle, currentIndex]);

  // Lock body scroll and pause Lenis when article reader is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis.start();
      }
    };
  }, [selectedArticle]);

  const currentArticle = articlesData[currentIndex];

  return (
    <section
      id="insights"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--glass-border)',
        overflow: 'hidden',
      }}
      aria-label="Unity Space Aerospace Publications & Insights"
    >
      <div className="container">
        {/* Section Header with 3D Surface Reveal */}
        <SurfaceReveal yOffset={60} rotateAngle={16}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}
          >
            <div style={{ maxWidth: '780px' }}>
              <div className="mono-label" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
                05 / TECHNICAL INSIGHTS & STORIES
              </div>
              <h2 style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>
                WHY WE<br />
                <span className="text-gradient">LOOK UP.</span>
              </h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', margin: 0 }}>
                Perspectives on student aerospace methodology, test range operations, and the engineering culture of Unity Space.
              </p>
            </div>

            {/* Carousel Arrows (Pagination Controls) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <motion.button
                whileHover={{ scale: 1.08, background: 'rgba(255, 255, 255, 0.18)' }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => paginate(-1)}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                }}
                aria-label="Previous Article"
              >
                <ChevronLeft size={22} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.08, background: 'rgba(255, 255, 255, 0.18)' }}
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => paginate(1)}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                }}
                aria-label="Next Article"
              >
                <ChevronRight size={22} />
              </motion.button>
            </div>
          </div>
        </SurfaceReveal>

        {/* Carousel Active Slide with 3D Surface Reveal */}
        <SurfaceReveal yOffset={65} rotateAngle={16}>
          <div style={{ position: 'relative', minHeight: '440px', width: '100%', marginBottom: '2.5rem' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  width: '100%',
                }}
              >
                {/* Active Carousel Card */}
                <div
                  className="glass-card"
                  style={{
                    padding: '0',
                    borderRadius: '26px',
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 35px rgba(102, 230, 255, 0.1)',
                  }}
                  onClick={() => setSelectedArticle(currentArticle)}
                >
                  {/* Carousel Image Container (Clickable to show Info content) */}
                  <div
                    style={{
                      height: 'clamp(280px, 42vw, 420px)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={currentArticle.image}
                      alt={currentArticle.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '1.25rem',
                        left: '1.25rem',
                        display: 'flex',
                        gap: '0.5rem',
                      }}
                    >
                      <span className="mono-tag" style={{ background: 'rgba(4, 7, 20, 0.85)', backdropFilter: 'blur(8px)' }}>
                        {currentArticle.code}
                      </span>
                      <span className="mono-tag secondary" style={{ background: 'rgba(4, 7, 20, 0.85)', backdropFilter: 'blur(8px)' }}>
                        {currentArticle.category}
                      </span>
                    </div>

                    {/* Tap to View Overlay Pill */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '1.25rem',
                        right: '1.25rem',
                        background: 'rgba(4, 7, 20, 0.8)',
                        backdropFilter: 'blur(12px)',
                        padding: '0.4rem 0.85rem',
                        borderRadius: 'var(--radius-pill)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <span>CLICK IMAGE FOR INFO</span>
                      <ArrowRight size={13} style={{ color: 'var(--accent)' }} />
                    </div>
                  </div>

                  {/* Carousel Content Teaser */}
                  <div
                    style={{
                      padding: 'clamp(1.5rem, 4vw, 3rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '1rem',
                        }}
                      >
                        <span className="mono-label" style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Clock size={13} />
                          {currentArticle.readTime}
                        </span>
                        <span className="mono-label" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Calendar size={13} />
                          {currentArticle.date}
                        </span>
                      </div>

                      <h3
                        style={{
                          fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)',
                          lineHeight: 1.15,
                          marginBottom: '1.25rem',
                          color: '#ffffff',
                        }}
                      >
                        {currentArticle.title}
                      </h3>

                      <p
                        style={{
                          color: 'var(--text-secondary)',
                          fontSize: '1.05rem',
                          lineHeight: 1.7,
                          marginBottom: '2rem',
                        }}
                      >
                        {currentArticle.excerpt}
                      </p>
                    </div>

                    {/* Read Article Trigger */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        color: 'var(--accent)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                      }}
                    >
                      <BookOpen size={16} />
                      <span>SHOW FULL PUBLICATION INFO</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </SurfaceReveal>

        {/* Pagination Dots Indicator with Animated Spring Pill */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
          {articlesData.map((_, i) => {
            const isActive = i === currentIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => jumpToSlide(i)}
                style={{
                  position: 'relative',
                  width: isActive ? '32px' : '10px',
                  height: '10px',
                  borderRadius: 'var(--radius-pill)',
                  background: isActive ? 'transparent' : 'rgba(255, 255, 255, 0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease',
                }}
                aria-label={`Go to slide ${i + 1}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-carousel-dot"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--accent)',
                      boxShadow: '0 0 12px var(--accent-glow)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Publication Modal via React Portal directly into body with data-lenis-prevent */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedArticle && (
              <div
                data-lenis-prevent="true"
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  zIndex: 100000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'clamp(1rem, 3vw, 2.5rem)',
                  pointerEvents: 'auto',
                }}
              >
                {/* Backdrop Blur (Click to close) */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(4, 7, 20, 0.88)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedArticle(null)}
                />

                {/* Expanded Info Content Card */}
                <motion.div
                  data-lenis-prevent="true"
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  onWheel={(e) => e.stopPropagation()}
                  style={{
                    position: 'relative',
                    width: 'min(100%, 760px)',
                    maxHeight: '88vh',
                    background: '#0a1024',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '26px',
                    overflowY: 'auto',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85), 0 0 35px rgba(102, 230, 255, 0.15)',
                    zIndex: 2,
                    pointerEvents: 'auto',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header Image */}
                  <div style={{ height: 'clamp(200px, 30vh, 280px)', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={selectedArticle.image}
                      alt={selectedArticle.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, transparent 30%, rgba(10, 16, 36, 1) 100%)',
                      }}
                    />

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(null)}
                      style={{
                        position: 'absolute',
                        top: '1.25rem',
                        right: '1.25rem',
                        background: 'rgba(4, 7, 20, 0.75)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        borderRadius: '50%',
                        width: '42px',
                        height: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        cursor: 'pointer',
                        zIndex: 10,
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
                      }}
                      aria-label="Close Publication View"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Publication Body Content */}
                  <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span className="mono-tag">{selectedArticle.code}</span>
                      <span className="mono-tag secondary">{selectedArticle.category}</span>
                      <span className="mono-label" style={{ color: 'var(--text-muted)' }}>
                        {selectedArticle.readTime}
                      </span>
                    </div>

                    <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', color: '#ffffff', marginBottom: '1.25rem', lineHeight: 1.15 }}>
                      {selectedArticle.title}
                    </h2>

                    <div
                      style={{
                        padding: '1.25rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--glass-border)',
                        marginBottom: '1.75rem',
                      }}
                    >
                      <p style={{ color: 'var(--accent)', fontSize: '1.05rem', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>
                        &ldquo;{selectedArticle.excerpt}&rdquo;
                      </p>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
                      {selectedArticle.content}
                    </p>

                    {/* Footer Metadata & Close CTA */}
                    <div
                      style={{
                        paddingTop: '1.25rem',
                        borderTop: '1px solid var(--glass-border)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                      }}
                    >
                      <div className="mono-label" style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                        SVPM COLLEGE OF ENGINEERING // UNITY SPACE TECHNICAL JOURNAL
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedArticle(null)}
                        className="btn btn-secondary"
                        style={{ padding: '0.5rem 1.25rem', minHeight: '36px' }}
                      >
                        CLOSE
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
