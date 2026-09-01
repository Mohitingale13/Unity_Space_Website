import { supportersData } from '../../data/supportersData';
import TransmissionForm from './TransmissionForm';
import SurfaceReveal from '../atmosphere/SurfaceReveal';
import { Award, Mail, Globe, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// OSS Hero Stagger animation variants (from motion.dev/examples/vue-hero-stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 26,
    filter: 'blur(6px)',
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
    y: 30,
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

export default function SponsorshipSection() {
  return (
    <section
      id="sponsors"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--glass-border)',
      }}
      aria-label="Unity Space Sponsorship and Mission Support"
    >
      <div className="container">
        {/* Staggered Section Header with 3D Surface Reveal */}
        <SurfaceReveal yOffset={60} rotateAngle={16}>
          <motion.div
            style={{ maxWidth: '800px', marginBottom: '3.5rem' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants} className="mono-label" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
              06 / SUPPORT THE MISSION & ENGAGE
            </motion.div>
            <motion.h2
              variants={itemVariants}
              style={{ marginBottom: '1.25rem', textTransform: 'uppercase', overflow: 'hidden' }}
            >
              <motion.span variants={lineVariants} style={{ display: 'block' }}>
                HELP US
              </motion.span>
              <motion.span variants={lineVariants} style={{ display: 'block' }} className="text-gradient">
                REACH SPACE.
              </motion.span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}
            >
              Collaborating with Unity Space directly empowers student engineers with the resources, machining tools, and test gear needed to pioneer real aerospace flight systems.
            </motion.p>
          </motion.div>
        </SurfaceReveal>

        {/* 2-Column Layout: Left (Support Tiers & Institutional Credit) | Right (Interactive Form) */}
        <SurfaceReveal delay={0.15} yOffset={70} rotateAngle={16}>
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3rem',
              alignItems: 'start',
            }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Left Column: Involvement Tiers & Host Institution Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Host Institution Badge Card */}
              <motion.div
                variants={itemVariants}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  borderColor: 'rgba(102, 230, 255, 0.25)',
                  background: 'linear-gradient(135deg, rgba(16, 18, 26, 0.8), rgba(8, 9, 13, 0.9))',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Award size={20} style={{ color: 'var(--accent)' }} />
                  <span className="mono-label" style={{ color: 'var(--accent)' }}>
                    HOST INSTITUTION & OFFICIAL SUPPORTER
                  </span>
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>
                  {supportersData.institution.name}
                </h3>
                <p className="mono-label" style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  {supportersData.institution.campus}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {supportersData.institution.description}
                </p>
              </motion.div>

              {/* Involvement Tiers (Staggered Children) */}
              <motion.div
                variants={containerVariants}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                {supportersData.involvementTiers.map((tier, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -4, borderColor: 'var(--accent)', transition: { duration: 0.2 } }}
                    className="glass-card hover-lift"
                    style={{ padding: '1.5rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Sparkles size={14} style={{ color: 'var(--accent)' }} />
                      <h4 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0 }}>
                        {tier.title}
                      </h4>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      {tier.pitch}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Direct Official Contact Card */}
              <motion.div
                variants={itemVariants}
                className="glass-panel"
                style={{
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {supportersData.contact.email}
                  </span>
                </div>
                <span className="mono-tag">DIRECT INQUIRIES</span>
              </motion.div>
            </div>

            {/* Right Column: Transmission Form */}
            <motion.div variants={itemVariants}>
              <TransmissionForm />
            </motion.div>
          </motion.div>
        </SurfaceReveal>
      </div>
    </section>
  );
}
