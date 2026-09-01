import { Rocket, Heart } from 'lucide-react';
import { supportersData } from '../../data/supportersData';
import SurfaceReveal from '../atmosphere/SurfaceReveal';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--glass-border)',
        background: 'rgba(5, 6, 9, 0.95)',
        padding: '4.5rem 0 3rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="container">
        <SurfaceReveal yOffset={50} rotateAngle={14}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '3rem',
              marginBottom: '3.5rem',
            }}
          >
            {/* Brand Column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'rgba(102, 230, 255, 0.15)',
                    border: '1px solid rgba(102, 230, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                  }}
                >
                  <Rocket size={16} />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.15rem' }}>
                  UNITY SPACE
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '320px' }}>
                Student-led aerospace engineering, flight systems, and rocketry community.
              </p>
            </div>

            {/* Institutional Credit */}
            <div>
              <div className="mono-label" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
                HOST INSTITUTION
              </div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {supportersData.institution.name}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {supportersData.institution.campus}
              </div>
            </div>

            {/* Transmission Socials */}
            <div>
              <div className="mono-label" style={{ color: 'var(--accent-secondary)', marginBottom: '0.75rem' }}>
                TELEMETRY CHANNELS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {supportersData.contact.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono-tag"
                    style={{ textDecoration: 'none' }}
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              borderTop: '1px solid var(--glass-border)',
              paddingTop: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div>
              © {new Date().getFullYear()} UNITY SPACE • EXPLORING TODAY, INSPIRING TOMORROW.
            </div>
            <div>
              SVPM COE BARAMATI • MAHARASHTRA
            </div>
          </div>
        </SurfaceReveal>
      </div>
    </footer>
  );
}
