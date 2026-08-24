import { useState } from 'react';
import { articlesData } from '../../data/articlesData';
import { BookOpen, X, ArrowRight } from 'lucide-react';

export default function InsightsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featuredArticle = articlesData.find((a) => a.isFeatured) || articlesData[0];
  const regularArticles = articlesData.filter((a) => a.id !== featuredArticle.id);

  return (
    <section
      id="insights"
      className="section-padding"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--glass-border)',
      }}
      aria-label="Unity Space Aerospace Publications & Insights"
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <div className="mono-label" style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
            05 / TECHNICAL INSIGHTS & STORIES
          </div>
          <h2 style={{ marginBottom: '1.25rem', textTransform: 'uppercase' }}>
            WHY WE<br />
            <span className="text-gradient">LOOK UP.</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)' }}>
            Perspectives on student aerospace methodology, test range operations, and the engineering culture of Unity Space.
          </p>
        </div>

        {/* Editorial Layout: Lead Feature Article + Sidebar / Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Main Lead Story */}
          <article
            className="glass-card hover-lift"
            style={{
              padding: '0',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ height: '300px', width: '100%', position: 'relative' }}>
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
                <span className="mono-tag" style={{ background: 'rgba(8, 9, 13, 0.8)', backdropFilter: 'blur(8px)' }}>
                  {featuredArticle.code}
                </span>
              </div>
            </div>

            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="mono-label" style={{ color: 'var(--accent-secondary)', marginBottom: '0.5rem' }}>
                  {featuredArticle.category} • {featuredArticle.readTime}
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem', lineHeight: 1.2 }}>
                  {featuredArticle.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {featuredArticle.excerpt}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedArticle(featuredArticle)}
                className="btn btn-secondary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                <span>READ PUBLICATION</span>
                <BookOpen size={16} />
              </button>
            </div>
          </article>

          {/* Secondary Editorial Stories Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {regularArticles.map((art) => (
              <article
                key={art.id}
                className="glass-panel hover-lift"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedArticle(art)}
              >
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div className="mono-label" style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginBottom: '0.35rem' }}>
                    {art.code} • {art.readTime}
                  </div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                    {art.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {art.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(8, 9, 13, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              borderColor: 'var(--accent)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span className="mono-tag">{selectedArticle.code}</span>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
                aria-label="Close Article Modal"
              >
                <X size={20} />
              </button>
            </div>

            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{selectedArticle.title}</h3>
            <div className="mono-label" style={{ color: 'var(--accent-secondary)', marginBottom: '1.5rem' }}>
              {selectedArticle.category} • {selectedArticle.readTime} • {selectedArticle.date}
            </div>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
              {selectedArticle.content}
            </p>

            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.25rem' }}>
              <span className="mono-label" style={{ color: 'var(--text-muted)' }}>
                UNITY SPACE AEROSPACE PUBLICATION ARCHIVE
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
