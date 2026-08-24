import { useState } from 'react';
import { Send, CheckCircle2, Radio } from 'lucide-react';

export default function TransmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'transmitting' | 'transmitted'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('transmitting');

    // Simulate clean transmission abstraction with preview feedback
    setTimeout(() => {
      setStatus('transmitted');
    }, 1200);
  };

  const handleReset = () => {
    setFormData({ name: '', organization: '', email: '', message: '' });
    setStatus('idle');
  };

  return (
    <div
      className="glass-card"
      style={{
        borderColor: 'rgba(102, 230, 255, 0.25)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div className="mono-label" style={{ color: 'var(--accent)' }}>
          TRANSMISSION PROTOCOL
        </div>
        <div className="mono-tag">
          <Radio size={12} style={{ color: 'var(--accent-status)' }} />
          <span>DIRECT DISPATCH</span>
        </div>
      </div>

      {status === 'transmitted' ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <CheckCircle2 size={48} style={{ color: 'var(--accent-status)', margin: '0 auto 1.5rem' }} />
          <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Transmission Prepared</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Thank you, {formData.name || 'Collaborator'}. Your transmission log has been compiled. You can also reach our team directly at <strong style={{ color: 'var(--text-primary)' }}>unityspace70@gmail.com</strong>.
          </p>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Send Another Dispatch
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label htmlFor="tx-name" className="mono-label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                YOUR NAME *
              </label>
              <input
                id="tx-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Alex Vance"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'rgba(8, 9, 13, 0.7)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                }}
              />
            </div>
            <div>
              <label htmlFor="tx-org" className="mono-label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                ORGANIZATION / INSTITUTION
              </label>
              <input
                id="tx-org"
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Aerospace Systems Lab"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  background: 'rgba(8, 9, 13, 0.7)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="tx-email" className="mono-label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              EMAIL COORDINATES *
            </label>
            <input
              id="tx-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@domain.org"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                background: 'rgba(8, 9, 13, 0.7)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
              }}
            />
          </div>

          <div>
            <label htmlFor="tx-msg" className="mono-label" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              TRANSMISSION MESSAGE / PROPOSAL *
            </label>
            <textarea
              id="tx-msg"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your sponsorship interest, student hardware support, or research inquiry..."
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                background: 'rgba(8, 9, 13, 0.7)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                resize: 'vertical',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'transmitting'}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}
          >
            <span>{status === 'transmitting' ? 'COMPILING DISPATCH...' : 'SEND TRANSMISSION'}</span>
            <Send size={16} />
          </button>
        </form>
      )}
    </div>
  );
}
