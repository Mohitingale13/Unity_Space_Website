import { Compass, Cpu, Layers } from 'lucide-react';
import { subteamsData } from '../../data/subteamsData';

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--glass-border)',
      }}
      aria-label="Unity Space Mission and Architecture"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '4rem' }}>
          <div className="mono-label" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
            02 / MISSION & ARCHITECTURE
          </div>
          <h2 style={{ marginBottom: '1.75rem', textTransform: 'uppercase' }}>
            WE DON'T JUST LOOK UP.<br />
            <span className="text-gradient">WE BUILD TOWARD IT.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Unity Space is a student-led aerospace initiative at SVPM College of Engineering where curiosity transforms into flight systems. We create an environment where engineering, creativity, and discipline take ideas from sketchbooks to the test range.
          </p>
        </div>

        {/* 2 Core Subteams Presentation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {subteamsData.map((subteam, idx) => (
            <div
              key={subteam.id}
              className="glass-card hover-lift"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background ambient corner glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20%',
                  right: '-20%',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: idx === 0 ? 'rgba(102, 230, 255, 0.08)' : 'rgba(139, 124, 255, 0.08)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                }}
              />

              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span className={`mono-tag ${idx === 1 ? 'secondary' : ''}`}>
                    {subteam.code}
                  </span>
                  <div style={{ color: idx === 0 ? 'var(--accent)' : 'var(--accent-secondary)' }}>
                    {idx === 0 ? <Cpu size={22} /> : <Compass size={22} />}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
                  {subteam.name}
                </h3>
                <p className="mono-label" style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  "{subteam.tagline}"
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                  {subteam.description}
                </p>
              </div>

              {/* Subteam Core Disciplines / Focus Areas */}
              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
                <div className="mono-label" style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  FOCUS DISCIPLINES
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {subteam.focusAreas.map((area) => (
                    <span
                      key={area}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Philosophy Banner */}
        <div
          className="glass-panel"
          style={{
            marginTop: '3.5rem',
            padding: '2rem 2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            borderColor: 'rgba(102, 230, 255, 0.15)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(102, 230, 255, 0.1)',
                border: '1px solid rgba(102, 230, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
              }}
            >
              <Layers size={20} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem' }}>
                Multidisciplinary Collaboration
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Mechanical • Computer • Electrical • Instrumentation Engineers
              </div>
            </div>
          </div>
          <div className="mono-tag">
            <span>SVPM COE MALEGAON(BK)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
