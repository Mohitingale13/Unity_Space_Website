import { ArrowRight, Terminal, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import SpacecraftScene from './SpacecraftScene/SpacecraftScene';
import MagneticButton from './MagneticButton';

// OSS Hero Stagger animation variants (from motion.dev/examples/vue-hero-stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 24,
      mass: 0.75,
    },
  },
};

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 280,
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
          {/* Staggered Typographic & Brand Showpiece */}
          <motion.div
            style={{ maxWidth: '680px' }}
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

            {/* 2. Staggered Multiline Headline */}
            <motion.h1
              style={{
                fontSize: 'clamp(2.35rem, 8.5vw, 6rem)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase',
                lineHeight: 1.05,
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
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                lineHeight: 1.6,
                maxWidth: '560px',
              }}
            >
              Pioneering student-led rocketry, flight systems, and multidisciplinary aerospace research from SVPM College of Engineering.
            </motion.p>

            {/* 4. Action Group */}
            <motion.div
              variants={itemVariants}
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

            {/* 5. Telemetry Indicator Strip */}
            <motion.div
              variants={itemVariants}
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
          </motion.div>

          {/* 6. Interactive 3D Orbital Scene with Spring Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
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
