import { supportersData } from '../../data/supportersData';
import TransmissionForm from './TransmissionForm';
import { Award, Mail, Globe } from 'lucide-react';

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
        {/* Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '3.5rem' }}>
          <div className="mono-label" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
            06 / SUPPORT THE MISSION & ENGAGE
          </div>
          <h2 style={{ marginBottom: '1.25rem', textTransform: 'uppercase' }}>
            HELP US<br />
            <span className="text-gradient">REACH SPACE.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Collaborating with Unity Space directly empowers student engineers with the resources, machining tools, and test gear needed to pioneer real aerospace flight systems.
          </p>
        </div>

        {/* 2-Column Layout: Left (Support Tiers & Institutional Credit) | Right (Interactive Form) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Involvement Tiers & Host Institution Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Host Institution Badge Card */}
            <div
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
            </div>

            {/* Involvement Tiers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {supportersData.involvementTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="glass-card hover-lift"
                  style={{ padding: '1.5rem' }}
                >
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {tier.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                    {tier.pitch}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Official Contact Card */}
            <div
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
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <TransmissionForm />
        </div>
      </div>
    </section>
  );
}
