import { ArrowRight, Terminal, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import SpacecraftScene from './SpacecraftScene/SpacecraftScene';
import MagneticButton from './MagneticButton';

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 'calc(var(--header-height-expanded) + 1.5rem)',
        paddingBottom: '3.5rem',
        overflow: 'hidden',
      }}
      aria-label="Unity Space Hero Showcase"
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(2rem, 5vw, 3.5rem)',
          }}
        >
          {/* Typographic & Brand Showpiece */}
          <div style={{ maxWidth: '680px' }}>
            {/* Mission Identifier Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1.5rem',
              }}
            >
              <div className="mono-tag">
                <Radio size={12} style={{ color: 'var(--accent-status)' }} />
                <span>MISSION TELEMETRY: ACTIVE</span>
              </div>
              <span className="mono-label" style={{ color: 'var(--text-muted)' }}>
                BARAMATI RANGE 01
              </span>
            </motion.div>

            {/* Massive Display Title */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.35rem, 8.5vw, 6rem)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                lineHeight: 1.05,
              }}
            >
              TURNING<br />
              <span className="text-gradient">CURIOSITY</span><br />
              INTO AEROSPACE.
            </motion.h1>

            {/* Sub-headline / Mission Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                lineHeight: 1.6,
                maxWidth: '560px',
              }}
            >
              Pioneering student-led rocketry, flight systems, and multidisciplinary aerospace research from SVPM College of Engineering.
            </motion.p>

            {/* Mobile-Friendly Action Group (Stacked / Flexible on Mobile) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.85rem',
                alignItems: 'center',
              }}
              className="hero-btn-group"
            >
              <MagneticButton href="#mission" className="btn btn-primary" style={{ flex: '1 1 auto' }}>
                <span>EXPLORE THE MISSION</span>
                <ArrowRight size={16} />
              </MagneticButton>

              <MagneticButton href="#projects" className="btn btn-secondary" style={{ flex: '1 1 auto' }}>
                <Terminal size={15} style={{ color: 'var(--accent)' }} />
                <span>FLIGHT ARCHIVE</span>
              </MagneticButton>
            </motion.div>

            {/* Telemetry Indicator Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(1rem, 4vw, 2.5rem)',
                marginTop: '2.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--glass-border)',
              }}
            >
              <div>
                <div className="mono-label" style={{ color: 'var(--accent)' }}>08 MEMBERS</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Multidisciplinary</div>
              </div>
              <div>
                <div className="mono-label" style={{ color: 'var(--accent-secondary)' }}>02 SUBTEAMS</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Flight & Outreach</div>
              </div>
              <div>
                <div className="mono-label" style={{ color: 'var(--text-primary)' }}>SVPM COE</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Host Institution</div>
              </div>
            </motion.div>
          </div>

          {/* Interactive 3D Orbital Scene (Non-blocking touch) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              height: 'clamp(280px, 45vw, 520px)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'pan-y',
            }}
          >
            <SpacecraftScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
