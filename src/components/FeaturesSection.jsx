import React from 'react'

/**
 * FeaturesSection / WhyPearl - Compact Trust & Design Philosophy Section
 * Conforms to exact specifications:
 * - Heading: WHY PEARL LIGHTING
 * - 4 factual, dignified pillars:
 *   01 DESIGNED WITH PURPOSE
 *   02 QUALITY
 *   03 RELIABILITY
 *   04 LIGHTING SOLUTIONS
 * - Minimal typography, champagne-gold accents, subtle dividers, no giant cards or unsupported claims.
 */
export default function FeaturesSection() {
  const points = [
    {
      index: '01',
      title: 'DESIGNED FOR MODERN SPACES',
      statement: 'Lighting created with disciplined attention to form, proportion, and contemporary architectural harmony.',
    },
    {
      index: '02',
      title: 'PRECISION IN LIGHT',
      statement: 'Engineered optical clarity, clean beam geometry, and dependable luminous consistency.',
    },
    {
      index: '03',
      title: 'CURATED LIGHTING COLLECTIONS',
      statement: 'A focused portfolio of architectural luminaires, from flush planar panels to continuous spatial illumination.',
    },
    {
      index: '04',
      title: 'LIGHT THAT COMPLEMENTS ARCHITECTURE',
      statement: 'Luminaires conceived to belong within the room, shaping atmosphere without extraneous visual noise.',
    },
  ]

  return (
    <section className="why-pearl-root" id="why-pearl" aria-label="Why Pearl Lighting">
      <div className="container why-pearl-container">
        {/* Coordinate Marker Bar */}
        <div className="why-pearl-marker-bar">
          <span className="marker-index">08</span>
          <span className="marker-divider" aria-hidden="true">—</span>
          <span className="marker-name">FOUNDATIONAL PILLARS • QUALITY DISCIPLINE</span>
        </div>

        {/* Section Editorial Header */}
        <div className="why-pearl-header">
          <span className="eyebrow why-pearl-eyebrow">FOUNDATIONAL VALUES</span>
          <h2 className="why-pearl-heading">WHY PEARL</h2>
          <div className="why-pearl-divider-accent" aria-hidden="true"></div>
        </div>

        {/* 4 Minimal Trust Columns with Subtle Dividers & Gold Accents */}
        <div className="why-pearl-grid">
          {points.map((point) => (
            <div key={point.index} className="why-pearl-col">
              <div className="why-pearl-meta">
                <span className="why-pearl-num">{point.index}</span>
                <span className="why-pearl-dot" aria-hidden="true"></span>
              </div>
              <h3 className="why-pearl-title">{point.title}</h3>
              <p className="why-pearl-statement">{point.statement}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-pearl-root {
          position: relative;
          padding: 6.5rem 0 7.5rem;
          background: var(--bg-primary, #F7F4ED);
          border-top: 1px solid rgba(120, 100, 70, 0.18);
          border-bottom: 1px solid rgba(120, 100, 70, 0.18);
          width: 100%;
          color: var(--primary-text, #171717);
        }

        @media (min-width: 1024px) {
          .why-pearl-root {
            padding: 8.5rem 0 9.5rem;
          }
        }

        .why-pearl-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .why-pearl-marker-bar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 3.5rem;
        }

        .marker-index {
          font-family: var(--font-mono, monospace);
          font-size: 0.82rem;
          color: var(--accent-gold, #C69A52);
          font-weight: 500;
        }

        .marker-divider {
          color: rgba(120, 100, 70, 0.4);
          font-size: 0.82rem;
        }

        .marker-name {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--secondary-text, #5E5A53);
          text-transform: uppercase;
        }

        .why-pearl-header {
          margin-bottom: 4.5rem;
          max-width: 650px;
        }

        .why-pearl-eyebrow {
          margin-bottom: 1rem;
          color: var(--champagne-gold, #C69A52);
          letter-spacing: 0.32em;
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          text-transform: uppercase;
        }

        .why-pearl-heading {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 4.4vw, 3.6rem);
          font-weight: 300;
          letter-spacing: 0.05em;
          line-height: 1.1;
          color: var(--charcoal, #191919);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .why-pearl-divider-accent {
          width: 60px;
          height: 1px;
          background: var(--champagne-gold, #C69A52);
        }

        /* ── 4 Minimal Columns ── */
        .why-pearl-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 640px) {
          .why-pearl-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 3.5rem 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .why-pearl-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2.5rem;
          }
        }

        .why-pearl-col {
          display: flex;
          flex-direction: column;
          position: relative;
          padding-left: 1.25rem;
          border-left: 1px solid rgba(120, 100, 70, 0.2);
          transition: border-color 0.3s ease;
        }

        .why-pearl-col:hover {
          border-left-color: var(--champagne-gold, #C69A52);
        }

        .why-pearl-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .why-pearl-num {
          font-family: var(--font-mono, monospace);
          font-size: 0.85rem;
          color: var(--champagne-gold, #C69A52);
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        .why-pearl-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(120, 100, 70, 0.4);
        }

        .why-pearl-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: var(--charcoal, #191919);
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }

        .why-pearl-statement {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          line-height: 1.65;
          color: var(--secondary-text, #5E5A53);
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .why-pearl-root {
            padding: 5rem 0 5.5rem;
          }
          .why-pearl-container {
            padding: 0 1.25rem;
          }
          .why-pearl-header {
            margin-bottom: 3rem;
          }
        }
      `}</style>
    </section>
  )
}
