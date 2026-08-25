import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, X, Sparkles, Layers } from 'lucide-react';
import { projectsData, row1GalleryImages, row2GalleryImages } from '../../data/projectsData';
import MissionTrajectory from './MissionTrajectory';

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState(null);
  const galleryRef = useRef(null);

  // Viewport-linked scroll interpolation for Row Alternating Gallery
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });

  // Row 1: Left-to-Right Scroll Translation with smooth spring physics
  const rawX1 = useTransform(scrollYProgress, [0, 1], [-180, 140]);
  const springX1 = useSpring(rawX1, { stiffness: 95, damping: 24, mass: 0.5 });

  // Row 2: Right-to-Left Scroll Translation with smooth spring physics
  const rawX2 = useTransform(scrollYProgress, [0, 1], [140, -180]);
  const springX2 = useSpring(rawX2, { stiffness: 95, damping: 24, mass: 0.5 });

  return (
    <section
      id="projects"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--glass-border)',
        overflow: 'hidden',
      }}
      aria-label="Unity Space Projects Archive"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '2.5rem' }}>
          <div className="mono-label" style={{ marginBottom: '0.75rem', color: 'var(--accent)' }}>
            03 / FLIGHT & ENGINEERING ARCHIVE
          </div>
          <h2 style={{ marginBottom: '1.25rem', textTransform: 'uppercase' }}>
            LOOKING BACK.<br />
            <span className="text-gradient">MOVING FORWARD.</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            Our engineering milestones reflect real student builds, static test iterations, and avionics developments tested under authentic operational conditions.
          </p>
        </div>

        {/* 2 Authentic Mission Project Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: '4.5rem',
          }}
        >
          {projectsData.map((project) => (
            <article
              key={project.id}
              className="glass-card hover-lift"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
                overflow: 'hidden',
              }}
            >
              {/* Project Hero Imagery */}
              <div
                style={{
                  height: 'clamp(180px, 30vw, 240px)',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform var(--transition-slow)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                  }}
                >
                  <span className="mono-tag" style={{ background: 'rgba(8, 9, 13, 0.85)', backdropFilter: 'blur(8px)' }}>
                    {project.code}
                  </span>
                  <span className="mono-tag secondary" style={{ background: 'rgba(8, 9, 13, 0.85)', backdropFilter: 'blur(8px)' }}>
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: 'clamp(1.25rem, 3vw, 2rem)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', marginBottom: '0.6rem', lineHeight: 1.2 }}>
                    {project.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {project.summary}
                  </p>
                </div>

                <div>
                  {/* Discipline Chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {project.disciplines.map((disc) => (
                      <span
                        key={disc}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          padding: '0.2rem 0.45rem',
                          background: 'rgba(255, 255, 255, 0.04)',
                          borderRadius: 'var(--radius-xs)',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {disc}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="btn btn-secondary"
                    style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.85rem', minHeight: '44px' }}
                  >
                    <span>VIEW MISSION TELEMETRY</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Row Alternating Scroll-Driven Gallery Section */}
      <div
        ref={galleryRef}
        style={{
          position: 'relative',
          width: '100%',
          padding: '2rem 0 3.5rem 0',
          overflow: 'hidden',
        }}
      >
        <div className="container" style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="mono-label" style={{ color: 'var(--text-muted)' }}>
              AEROSPACE HARDWARE & LAUNCH ARCHIVE (SCROLL & DRAG TO EXPLORE)
            </div>
            <div className="mono-label" style={{ color: 'var(--accent)', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={13} />
              BI-DIRECTIONAL STREAM
            </div>
          </div>
        </div>

        {/* Row 1: Left-to-Right Scroll-Driven Stream */}
        <div style={{ width: '100%', overflow: 'hidden', marginBottom: '1.25rem', padding: '0.25rem 0' }}>
          <motion.div
            style={{
              x: springX1,
              display: 'flex',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              width: 'max-content',
              cursor: 'grab',
              paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2))',
            }}
            drag="x"
            dragConstraints={{ left: -750, right: 350 }}
            dragElastic={0.15}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {row1GalleryImages.map((img, idx) => (
              <motion.div
                key={`row1-${idx}`}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                  width: 'clamp(240px, 28vw, 340px)',
                  height: '180px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--surface-primary)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                <img
                  src={img.url}
                  alt={img.label}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.6rem',
                    left: '0.6rem',
                    display: 'flex',
                    gap: '0.35rem',
                  }}
                >
                  <span className="mono-tag" style={{ background: 'rgba(8, 9, 13, 0.85)', backdropFilter: 'blur(8px)', fontSize: '0.65rem' }}>
                    {img.code}
                  </span>
                  <span className="mono-tag secondary" style={{ background: 'rgba(8, 9, 13, 0.85)', backdropFilter: 'blur(8px)', fontSize: '0.65rem' }}>
                    {img.tag}
                  </span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    background: 'linear-gradient(to top, rgba(8, 9, 13, 0.95) 0%, rgba(8, 9, 13, 0.4) 70%, transparent 100%)',
                  }}
                >
                  <span className="mono-label" style={{ color: 'var(--text-primary)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                    {img.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right-to-Left Scroll-Driven Stream */}
        <div style={{ width: '100%', overflow: 'hidden', padding: '0.25rem 0' }}>
          <motion.div
            style={{
              x: springX2,
              display: 'flex',
              gap: 'clamp(1rem, 2vw, 1.5rem)',
              width: 'max-content',
              cursor: 'grab',
              paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2))',
            }}
            drag="x"
            dragConstraints={{ left: -750, right: 350 }}
            dragElastic={0.15}
            whileDrag={{ cursor: 'grabbing' }}
          >
            {row2GalleryImages.map((img, idx) => (
              <motion.div
                key={`row2-${idx}`}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                style={{
                  width: 'clamp(240px, 28vw, 340px)',
                  height: '180px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--surface-primary)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                <img
                  src={img.url}
                  alt={img.label}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.6rem',
                    left: '0.6rem',
                    display: 'flex',
                    gap: '0.35rem',
                  }}
                >
                  <span className="mono-tag" style={{ background: 'rgba(8, 9, 13, 0.85)', backdropFilter: 'blur(8px)', fontSize: '0.65rem' }}>
                    {img.code}
                  </span>
                  <span className="mono-tag secondary" style={{ background: 'rgba(8, 9, 13, 0.85)', backdropFilter: 'blur(8px)', fontSize: '0.65rem' }}>
                    {img.tag}
                  </span>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '0.6rem 0.85rem',
                    background: 'linear-gradient(to top, rgba(8, 9, 13, 0.95) 0%, rgba(8, 9, 13, 0.4) 70%, transparent 100%)',
                  }}
                >
                  <span className="mono-label" style={{ color: 'var(--text-primary)', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                    {img.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Integrated Mission Trajectory Component */}
        <MissionTrajectory />
      </div>

      {/* Interactive Project Blueprint Modal Overlay */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(8, 9, 13, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '640px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              boxShadow: 'var(--shadow-glow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
                cursor: 'pointer',
              }}
              aria-label="Close Project Modal"
            >
              <X size={18} />
            </button>

            <div className="mono-label" style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>
              {selectedProject.code} // {selectedProject.timeline}
            </div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1rem', textTransform: 'uppercase' }}>
              {selectedProject.title}
            </h2>

            <div
              style={{
                height: '220px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                border: '1px solid var(--glass-border)',
              }}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {selectedProject.details}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                <div className="mono-label" style={{ fontSize: '0.65rem', marginBottom: '0.25rem' }}>SUBTEAM</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedProject.subteam}</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--glass-border)' }}>
                <div className="mono-label" style={{ fontSize: '0.65rem', marginBottom: '0.25rem' }}>STATUS</div>
                <div style={{ fontWeight: 600, color: 'var(--accent)' }}>{selectedProject.status}</div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              CLOSE TELEMETRY VIEW
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
