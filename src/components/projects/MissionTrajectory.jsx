import { useState } from 'react';
import { Rocket, Gauge, Radio, CheckCircle2 } from 'lucide-react';

export default function MissionTrajectory() {
  const [activeStage, setActiveStage] = useState(1);

  const stages = [
    {
      id: 1,
      code: "STAGE 01",
      title: "PROTOTYPE & STATIC TEST",
      telemetry: "ALT: 0m | MACH 0.0 | STATUS: NOMINAL",
      description: "Early test stand iterations, structural validation, and recovery charge testing."
    },
    {
      id: 2,
      code: "STAGE 02",
      title: "ACTIVE FLIGHT SYSTEM",
      telemetry: "ALT: 1,200m | MACH 0.6 | TELEMETRY: LOCKED",
      description: "Avionics telemetry streaming, aerofoil balance, and dual-deployment parachute testing."
    },
    {
      id: 3,
      code: "STAGE 03",
      title: "SUBORBITAL HORIZON",
      telemetry: "APOGEE TARGET | EXPERIMENTS ACTIVE",
      description: "Payload atmospheric collection, ground station telemetry, and continuous design iteration."
    }
  ];

  return (
    <div
      className="glass-panel"
      style={{
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        marginTop: '3.5rem',
        borderColor: 'rgba(102, 230, 255, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--glass-border)',
          paddingBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Radio size={16} style={{ color: 'var(--accent-status)' }} />
          <span className="mono-label" style={{ color: 'var(--text-primary)' }}>
            MISSION TRAJECTORY TELEMETRY
          </span>
        </div>
        <div className="mono-tag">
          <Gauge size={12} />
          <span>REAL-TIME BENCHMARKS</span>
        </div>
      </div>

      {/* Trajectory Stage Selector Tabs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {stages.map((stage) => {
          const isSelected = activeStage === stage.id;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStage(stage.id)}
              style={{
                background: isSelected ? 'rgba(102, 230, 255, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                border: '1px solid',
                borderColor: isSelected ? 'var(--accent)' : 'var(--glass-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                }}
              >
                <span className="mono-label" style={{ color: isSelected ? 'var(--accent)' : 'var(--text-muted)' }}>
                  {stage.code}
                </span>
                {isSelected && <CheckCircle2 size={14} style={{ color: 'var(--accent)' }} />}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  lineHeight: 1.25,
                }}
              >
                {stage.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Telemetry Display for Selected Stage */}
      <div
        style={{
          background: 'rgba(8, 9, 13, 0.6)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-sm)',
          padding: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        <div>
          <div className="mono-label" style={{ color: 'var(--accent)', marginBottom: '0.4rem' }}>
            {stages[activeStage - 1].telemetry}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            {stages[activeStage - 1].description}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--accent-secondary)',
          }}
        >
          <Rocket size={24} style={{ transform: 'rotate(45deg)' }} />
          <span className="mono-label" style={{ color: 'var(--text-muted)' }}>
            GUIDANCE ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}
