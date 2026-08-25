import { ArrowRight, Terminal, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import SpacecraftScene from './SpacecraftScene/SpacecraftScene';
import MagneticButton from './MagneticButton';
import HeroEarthBackground from './HeroEarthBackground';

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: 'transparent',
        paddingTop: 'calc(var(--header-height-expanded) + 0.5rem)',
        paddingBottom: '2.5rem',
        overflow: 'visible',
      }}
      aria-label="Unity Space Hero Showcase"
    >
      {/* Scroll-Driven Scaling & Vanishing Earth Planet Background */}
      <HeroEarthBackground />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          {/* Typographic & Brand Showpiece */}
          <div style={{ maxWidth: '620px' }}>
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
                marginBottom: '1rem',
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

            {/* Well-Proportioned Display Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2rem, 4.2vw, 3.8rem)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              TURNING<br />
              <span className="text-gradient">CURIOSITY</span><br />
              INTO AEROSPACE.
            </motion.h1>

            {/* Sub-headline / Mission Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                color: 'var(--text-secondary)',
                marginBottom: '1.75rem',
                lineHeight: 1.6,
                maxWidth: '520px',
              }}
            >
              Pioneering student-led rocketry, flight systems, and multidisciplinary aerospace research from SVPM College of Engineering.
            </motion.p>

            {/* Action Group */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
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
              <MagneticButton href="#mission" className="btn btn-primary">
                <span>EXPLORE THE MISSION</span>
                <ArrowRight size={16} />
              </MagneticButton>

              <MagneticButton href="#projects" className="btn btn-secondary">
                <Terminal size={15} style={{ color: 'var(--accent)' }} />
                <span>FLIGHT ARCHIVE</span>
              </MagneticButton>
            </motion.div>

            {/* Telemetry Indicator Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(1rem, 3.5vw, 2.5rem)',
                marginTop: '2rem',
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

          {/* Interactive 3D Orbital Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{
              height: 'clamp(280px, 38vw, 460px)',
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
