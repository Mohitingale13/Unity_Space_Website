import { useState } from 'react';
import { teamMembers } from '../../data/teamData';

export default function TeamShowcase() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMembers = teamMembers.filter((member) => {
    if (activeFilter === 'all') return true;
    return member.subteamCategory === activeFilter;
  });

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
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '2.5rem',
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

          {/* Subteam Filter Chips (Scrollable on Mobile) */}
          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '0.35rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--glass-border)',
              overflowX: 'auto',
              maxWidth: '100%',
              scrollbarWidth: 'none',
            }}
          >
            {[
              { label: 'ALL', value: 'all' },
              { label: 'ENGINEERING & FLIGHT', value: 'engineering' },
              { label: 'OUTREACH', value: 'outreach' },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveFilter(tab.value)}
                style={{
                  background: activeFilter === tab.value ? 'var(--accent)' : 'transparent',
                  color: activeFilter === tab.value ? 'var(--text-inverse)' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.45rem 0.85rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Member Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(1rem, 3vw, 2rem)',
          }}
        >
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="glass-card hover-lift"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Portrait Image Container */}
              <div
                style={{
                  height: 'clamp(220px, 35vw, 280px)',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'var(--space-surface)',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(20%) contrast(105%)',
                    transition: 'transform var(--transition-normal), filter var(--transition-normal)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                    e.currentTarget.style.filter = 'grayscale(0%) contrast(100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'grayscale(20%) contrast(105%)';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                  }}
                >
                  <span
                    className="mono-tag"
                    style={{
                      background: 'rgba(8, 9, 13, 0.85)',
                      backdropFilter: 'blur(8px)',
                      borderColor: member.accent,
                      fontSize: '0.65rem',
                    }}
                  >
                    {member.badge}
                  </span>
                </div>
              </div>

              {/* Member Details */}
              <div style={{ padding: 'clamp(1rem, 2.5vw, 1.5rem)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.35rem)', marginBottom: '0.3rem' }}>{member.name}</h3>
                  <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.6rem' }}>
                    {member.role}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '0.65rem' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {member.subteam}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
