import { ArrowRight, Terminal, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import SpacecraftScene from './SpacecraftScene/SpacecraftScene';
import MagneticButton from './MagneticButton';
import HeroEarthBackground from './HeroEarthBackground';

// OSS Hero Stagger animation variants (from motion.dev/examples/vue-hero-stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 24,
      mass: 0.7,
    },
  },
};

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 22,
    },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 'calc(var(--header-height-expanded, 80px) + 0.75rem)',
        paddingBottom: '2rem',
        overflow: 'hidden',
      }}
      aria-label="Unity Space Hero Showcase"
    >
      {/* Scroll-Driven Scaling & Atmospheric Earth Horizon Background */}
      <HeroEarthBackground />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          {/* Staggered Typographic & Brand Showpiece */}
          <motion.div
            style={{ maxWidth: '620px' }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 1. Mission Identifier Badge */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '0.85rem',
              }}
            >
              <div className="mono-tag" style={{ padding: '0.2rem 0.6rem', fontSize: '0.72rem' }}>
                <Radio size={11} style={{ color: 'var(--accent-status)' }} />
                <span>MISSION TELEMETRY: ACTIVE</span>
              </div>
              <span className="mono-label" style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                BARAMATI RANGE 01
              </span>
            </motion.div>

            {/* 2. Staggered Multiline Headline (Mobile-First Clamping) */}
            <motion.h1
              style={{
                fontSize: 'clamp(1.95rem, 7.5vw, 3.85rem)',
                marginBottom: '0.85rem',
                textTransform: 'uppercase',
                lineHeight: 1.04,
                letterSpacing: '-0.02em',
                overflow: 'hidden',
              }}
            >
              <motion.span variants={lineVariants} style={{ display: 'block' }}>
                TURNING
              </motion.span>
              <motion.span variants={lineVariants} style={{ display: 'block' }} className="text-gradient">
                CURIOSITY
              </motion.span>
              <motion.span variants={lineVariants} style={{ display: 'block' }}>
                INTO AEROSPACE.
              </motion.span>
            </motion.h1>

            {/* 3. Sub-headline / Mission Narrative */}
            <motion.p
              variants={itemVariants}
              style={{
                fontSize: 'clamp(0.92rem, 1.3vw, 1.08rem)',
                color: 'var(--text-secondary)',
                marginBottom: '1.4rem',
                lineHeight: 1.55,
                maxWidth: '520px',
              }}
            >
              Pioneering student-led rocketry, flight systems, and multidisciplinary aerospace research from SVPM College of Engineering.
            </motion.p>

            {/* 4. Action Group: Mobile-First Touch Target Alignment */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'center',
              }}
              className="hero-btn-group"
            >
              <MagneticButton href="#mission" className="btn btn-primary" style={{ padding: '0.65rem 1.4rem', minHeight: '44px' }}>
                <span>EXPLORE THE MISSION</span>
                <ArrowRight size={15} />
              </MagneticButton>

              <MagneticButton href="#projects" className="btn btn-secondary" style={{ padding: '0.65rem 1.4rem', minHeight: '44px' }}>
                <Terminal size={14} style={{ color: 'var(--accent)' }} />
                <span>FLIGHT ARCHIVE</span>
              </MagneticButton>
            </motion.div>

            {/* 5. Telemetry Indicator Strip */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(1rem, 3vw, 2rem)',
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--glass-border)',
              }}
            >
              <div>
                <div className="mono-label" style={{ color: 'var(--accent)', fontSize: '0.78rem' }}>08 MEMBERS</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Multidisciplinary</div>
              </div>
              <div>
                <div className="mono-label" style={{ color: 'var(--accent-secondary)', fontSize: '0.78rem' }}>02 SUBTEAMS</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Flight & Outreach</div>
              </div>
              <div>
                <div className="mono-label" style={{ color: 'var(--text-primary)', fontSize: '0.78rem' }}>SVPM COE</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Host Institution</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 6. Interactive 3D Orbital Scene with Pan-Y Touch Scroll Passthrough */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 'clamp(240px, 34vw, 440px)',
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
