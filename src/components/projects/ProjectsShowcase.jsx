import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { projectsData, projectGalleryImages } from '../../data/projectsData';
import MissionTrajectory from './MissionTrajectory';

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--glass-border)',
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
            marginBottom: '3.5rem',
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

        {/* Multi-Row Alternating Telemetry Gallery Strip (Touch-Optimized) */}
        <div style={{ marginBottom: '2rem' }}>
          <div className="mono-label" style={{ marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
            AEROSPACE HARDWARE & LAUNCH ARCHIVE (SWIPE TO EXPLORE)
          </div>
          <div className="touch-scroll-row">
            {projectGalleryImages.map((img, idx) => (
              <div
                key={idx}
                className="touch-scroll-item"
                style={{
                  width: 'clamp(220px, 65vw, 280px)',
                  height: '160px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <img
                  src={img.url}
                  alt={img.label}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    background: 'linear-gradient(to top, rgba(8, 9, 13, 0.95), transparent)',
                  }}
                >
                  <span className="mono-label" style={{ color: 'var(--text-primary)', fontSize: '0.65rem' }}>
                    {img.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

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
              borderColor: 'var(--accent)',
              padding: 'clamp(1.25rem, 4vw, 2rem)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className="mono-tag">{selectedProject.code}</span>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
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
            </div>

            <h3 style={{ fontSize: 'clamp(1.35rem, 3vw, 1.75rem)', marginBottom: '0.75rem' }}>{selectedProject.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {selectedProject.details}
            </p>

            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <div className="mono-label" style={{ color: 'var(--text-muted)' }}>STATUS</div>
                <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>{selectedProject.status}</div>
              </div>
              <div>
                <div className="mono-label" style={{ color: 'var(--text-muted)' }}>SUBTEAM</div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>{selectedProject.subteam}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
