import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { teamMembers } from '../../data/teamData';
import SurfaceReveal from '../atmosphere/SurfaceReveal';
import { Users, X, ArrowUpRight, ShieldCheck, Sparkles, Folder } from 'lucide-react';

// Group team members into iOS App Folders
const teamFolders = [
  {
    id: 'folder-leadership',
    name: 'Leadership & Command',
    code: 'HQ-DIR',
    tagline: 'Strategic mission alignment and flight execution oversight.',
    members: teamMembers.filter((m) => m.subteam === 'Leadership & Strategy' || m.subteam === 'Operations & Flight Systems'),
  },
  {
    id: 'folder-engineering',
    name: 'Flight Systems & Propulsion',
    code: 'ENG-FLIGHT',
    tagline: 'Hardware prototyping, propulsion test firing, and avionics control.',
    members: teamMembers.filter((m) => m.subteam === 'Engineering & Flight'),
  },
  {
    id: 'folder-outreach',
    name: 'Research & Outreach',
    code: 'RESEARCH-COMMS',
    tagline: 'Scientific documentation, aerospace literature, and institutional relations.',
    members: teamMembers.filter((m) => m.subteam === 'Research & Outreach'),
  },
];

export default function TeamShowcase() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [viewMode, setViewMode] = useState('folders'); // 'folders' | 'roster'

  // Close folder on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveFolder(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll and pause Lenis when folder modal is open
  useEffect(() => {
    if (activeFolder) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis?.stop?.();
      }
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis?.start?.();
      }
    }
    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.lenis) {
        window.lenis?.start?.();
      }
    };
  }, [activeFolder]);

  return (
    <section
      id="team"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--glass-border)',
      }}
      aria-label="Unity Space Team Roster"
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
            <div style={{ maxWidth: '700px' }}>
              <div className="mono-label" style={{ marginBottom: '0.75rem', color: 'var(--accent)' }}>
                04 / PEOPLE BEHIND THE MISSION
              </div>
              <h2 style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>
                THE ENGINEERS &<br />
                <span className="text-gradient">STUDENT LEADERS.</span>
              </h2>
              <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'var(--text-secondary)' }}>
                A multidisciplinary cohort from SVPM College of Engineering combining technical rigor, propulsion analysis, avionics architecture, and aerospace outreach.
              </p>
            </div>

            {/* View Toggle Pill */}
            <div
              style={{
                display: 'flex',
                gap: '0.35rem',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '0.35rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('folders')}
                style={{
                  background: viewMode === 'folders' ? 'var(--accent)' : 'transparent',
                  color: viewMode === 'folders' ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.45rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                iOS FOLDERS
              </button>
              <button
                type="button"
                onClick={() => setViewMode('roster')}
                style={{
                  background: viewMode === 'roster' ? 'var(--accent)' : 'transparent',
                  color: viewMode === 'roster' ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.45rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                FULL ROSTER
              </button>
            </div>
          </div>
        </SurfaceReveal>

        {/* iOS Folders Grid with 3D Surface Reveal */}
        {viewMode === 'folders' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3rem)',
              justifyContent: 'center',
              alignItems: 'start',
            }}
          >
            {teamFolders.map((folder, idx) => (
              <SurfaceReveal key={folder.id} delay={idx * 0.15} yOffset={65} rotateAngle={16}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveFolder(folder)}
                >
                  {/* iOS Folder Icon Container */}
                  <motion.div
                    layoutId={`ios-folder-${folder.id}`}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                    style={{
                      width: 'clamp(140px, 20vw, 170px)',
                      height: 'clamp(140px, 20vw, 170px)',
                      borderRadius: '34px',
                      background: 'rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(28px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.45)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '0.65rem',
                      padding: '1.1rem',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {folder.members.slice(0, 4).map((member) => (
                      <motion.div
                        key={member.id}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          position: 'relative',
                          border: '1.5px solid rgba(255, 255, 255, 0.4)',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </motion.div>
                    ))}
                    {folder.members.length > 4 && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '0.5rem',
                          right: '0.5rem',
                          background: 'var(--accent)',
                          color: 'var(--text-inverse)',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        +{folder.members.length - 4}
                      </div>
                    )}
                  </motion.div>

                  {/* iOS Folder Label */}
                  <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {folder.name}
                    </h3>
                    <span
                      className="mono-label"
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--accent)',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {folder.members.length} MEMBERS // TAP TO OPEN
                    </span>
                  </div>
                </div>
              </SurfaceReveal>
            ))}
          </div>
        )}

        {/* Full Roster Fallback View */}
        {viewMode === 'roster' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: 'clamp(1rem, 3vw, 2rem)',
            }}
          >
            {teamMembers.map((member, idx) => (
              <SurfaceReveal key={member.id} delay={idx * 0.08} yOffset={50} rotateAngle={14}>
                <article
                  className="glass-card hover-lift"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0',
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: '20px',
                    height: '100%',
                  }}
                >
                  <div
                    style={{
                      height: 'clamp(220px, 35vw, 280px)',
                      width: '100%',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
                      <span className="mono-tag" style={{ background: 'rgba(4, 7, 20, 0.85)', backdropFilter: 'blur(8px)', borderColor: member.accent }}>
                        {member.badge}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{member.name}</h3>
                      <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        {member.role}
                      </p>
                    </div>
                    <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {member.subteam}
                      </span>
                    </div>
                  </div>
                </article>
              </SurfaceReveal>
            ))}
          </div>
        )}
      </div>

      {/* Expanded iOS Folder Modal Rendered via React Portal directly into body with data-lenis-prevent */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {activeFolder && (
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
                    background: 'rgba(4, 7, 20, 0.85)',
                    backdropFilter: 'blur(30px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setActiveFolder(null)}
                />

                {/* Expanded Folder Container */}
                <motion.div
                  data-lenis-prevent="true"
                  layoutId={`ios-folder-${activeFolder.id}`}
                  transition={{ type: 'spring', stiffness: 340, damping: 28 }}
                  onWheel={(e) => e.stopPropagation()}
                  style={{
                    position: 'relative',
                    width: 'min(100%, 820px)',
                    maxHeight: '88vh',
                    background: 'rgba(10, 16, 36, 0.96)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '34px',
                    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                    overflowY: 'auto',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                    boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 0 35px rgba(102, 230, 255, 0.15)',
                    zIndex: 2,
                    pointerEvents: 'auto',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header inside Folder */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      marginBottom: '2rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid var(--glass-border)',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span className="mono-tag">{activeFolder.code}</span>
                        <span className="mono-label" style={{ color: 'var(--accent)' }}>
                          {activeFolder.members.length} ACTIVE MEMBERS
                        </span>
                      </div>
                      <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#ffffff', textTransform: 'uppercase' }}>
                        {activeFolder.name}
                      </h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                        {activeFolder.tagline}
                      </p>
                    </div>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setActiveFolder(null)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                      aria-label="Close Folder"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Members Grid Inside Folder */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
                      gap: '1.25rem',
                    }}
                  >
                    {activeFolder.members.map((member) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="glass-card"
                        style={{
                          padding: '0',
                          overflow: 'hidden',
                          borderRadius: '20px',
                          display: 'flex',
                          flexDirection: 'column',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                          <img
                            src={member.image}
                            alt={member.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{ position: 'absolute', top: '0.65rem', left: '0.65rem' }}>
                            <span className="mono-tag" style={{ background: 'rgba(4, 7, 20, 0.85)', fontSize: '0.62rem' }}>
                              {member.badge}
                            </span>
                          </div>
                        </div>
                        <div style={{ padding: '1rem' }}>
                          <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem', color: '#ffffff' }}>
                            {member.name}
                          </h4>
                          <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600, margin: 0 }}>
                            {member.role}
                          </p>
                        </div>
                      </motion.div>
                    ))}
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
