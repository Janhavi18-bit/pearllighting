import React from 'react'

/**
 * AboutSection - Chapter VI (Part A): Studio Profile & Architectural Atelier
 * Conforms to exact specifications:
 * - Serip-level visual storytelling & luxury exhibition aesthetics
 * - Dark architectural salon canvas (#141210)
 * - Large monumental serif heading: PEARL LIGHTING
 * - Authentic official Pearl Lightings logo placed with intentional negative space
 * - Concise company profile communicating:
 *   - lighting expertise
 *   - modern design
 *   - quality
 *   - architectural thinking
 *   - professional lighting solutions
 * - Factual, under Parth Enterprises, no unsupported claims
 */
export default function AboutSection() {
  const brandTenets = [
    {
      index: '01',
      title: 'ARCHITECTURAL THINKING',
      statement: 'Every luminaire is designed to exist in continuous conversation with spatial volume, shadow, and architectural planes.',
    },
    {
      index: '02',
      title: 'LIGHTING EXPERTISE & QUALITY',
      statement: 'Rigorous optical balance, thermal discipline, and durable aluminium finishes engineered for enduring residential and commercial performance.',
    },
    {
      index: '03',
      title: 'PROFESSIONAL SOLUTIONS',
      statement: 'Curated architectural luminaires and bespoke festive lighting tailored for residences, galleries, and contemporary architectural projects across India.',
    },
  ]

  return (
    <section className="profile-editorial-root" id="about" aria-label="About Pearl Lighting">
      {/* Subtle Ambient Studio Halo */}
      <div className="profile-ambient-glow" aria-hidden="true"></div>

      <div className="container profile-container">
        {/* Section Coordinate Marker */}
        <div className="profile-marker-bar">
          <span className="marker-index">06</span>
          <span className="marker-dot">•</span>
          <span className="marker-name">STUDIO PROFILE • PARTH ENTERPRISES</span>
        </div>

        {/* Large Monumental Heading */}
        <div className="profile-header-group">
          <span className="profile-eyebrow">THE ARCHITECTURAL ATELIER</span>
          <h2 className="profile-monumental-heading">PEARL LIGHTING</h2>
        </div>

        {/* Asymmetric Brand Profile Spread */}
        <div className="profile-editorial-spread">
          {/* Left Column: Architectural Narrative & Tenets */}
          <div className="profile-narrative-column">
            <p className="profile-manifesto-lead">
              "We explore the quiet threshold where lighting ceases to be an added fixture and becomes an intrinsic material of architecture."
            </p>

            <div className="profile-body-paragraphs">
              <p className="profile-body-text">
                Pearl Lighting operates at the intersection of architectural thinking, lighting expertise, and modern design. Founded under Parth Enterprises in Mumbai, our studio curates professional lighting solutions where optical precision, material honesty, and understated permanence exist in harmony.
              </p>
              <p className="profile-body-text">
                From deep-recessed glare-controlled downlights and minimal architectural gimbals to continuous ambient contour ribbons and festive celebration lights, each luminaire family is engineered to shape spatial atmosphere with quiet authority.
              </p>
            </div>

            {/* 3 Core Tenets */}
            <div className="profile-tenets-list">
              {brandTenets.map((tenet) => (
                <div key={tenet.index} className="tenet-row">
                  <span className="tenet-index">{tenet.index}</span>
                  <div className="tenet-info">
                    <h3 className="tenet-title">{tenet.title}</h3>
                    <p className="tenet-desc">{tenet.statement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Official Logo in Generous Architectural Negative Space */}
          <div className="profile-identity-monolith">
            <div className="identity-negative-space-stage">
              <div className="identity-logo-reliquary">
                <img
                  src="/images/logo/pearl-lightings-logo.png"
                  alt="Pearl Lightings Official Identity - Parth Enterprises"
                  className="profile-official-logo"
                  width="220"
                  height="204"
                  loading="lazy"
                />
              </div>

              <div className="identity-caption-block">
                <span className="identity-brand-name">PEARL LIGHTINGS</span>
                <span className="identity-parent-entity">OFFICIAL BRAND IDENTITY • PARTH ENTERPRISES</span>
                <span className="identity-location">MUMBAI, MAHARASHTRA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-editorial-root {
          position: relative;
          background: #141210;
          color: #FAF7F2;
          padding: 8rem 0 10rem;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
          border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          overflow: hidden;
        }

        .profile-ambient-glow {
          position: absolute;
          top: 30%;
          right: 10%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(80px);
        }

        .profile-container {
          max-width: 1560px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 4.5rem);
          position: relative;
          z-index: 2;
        }

        .profile-marker-bar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 2.5rem;
        }

        .marker-index {
          font-family: var(--font-mono, monospace);
          font-size: 0.82rem;
          color: #D4AF37;
          font-weight: 600;
        }

        .marker-dot {
          color: rgba(212, 175, 55, 0.4);
          font-size: 0.82rem;
        }

        .marker-name {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: #9E9689;
          text-transform: uppercase;
        }

        /* ── Header ── */
        .profile-header-group {
          margin-bottom: 4rem;
        }

        .profile-eyebrow {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #D4AF37;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .profile-monumental-heading {
          font-family: var(--font-serif-luxury, 'Playfair Display', serif);
          font-size: clamp(3rem, 7vw, 6.5rem);
          font-weight: 300;
          letter-spacing: 0.02em;
          line-height: 0.95;
          text-transform: uppercase;
          color: #FAF7F2;
          margin: 0;
        }

        /* ── Asymmetric Layout ── */
        .profile-editorial-spread {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: start;
        }

        @media (min-width: 992px) {
          .profile-editorial-spread {
            grid-template-columns: 1.25fr 1fr;
            gap: 6rem;
          }
        }

        /* Narrative */
        .profile-narrative-column {
          display: flex;
          flex-direction: column;
        }

        .profile-manifesto-lead {
          font-family: var(--font-serif-luxury, 'Playfair Display', serif);
          font-size: clamp(1.25rem, 1.8vw, 1.65rem);
          font-style: italic;
          font-weight: 300;
          line-height: 1.5;
          color: #FAF7F2;
          margin-bottom: 2.25rem;
          padding-left: 1.5rem;
          border-left: 2px solid #D4AF37;
        }

        .profile-body-paragraphs {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 3.5rem;
        }

        .profile-body-text {
          font-family: var(--font-sans);
          font-size: 1.02rem;
          font-weight: 300;
          line-height: 1.8;
          color: #C8C1B4;
          margin: 0;
        }

        /* Tenets */
        .profile-tenets-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-top: 2.5rem;
          border-top: 1px solid rgba(212, 175, 55, 0.18);
        }

        .tenet-row {
          display: flex;
          gap: 1.5rem;
          align-items: baseline;
        }

        .tenet-index {
          font-family: var(--font-mono, monospace);
          font-size: 0.85rem;
          color: #D4AF37;
          font-weight: 600;
          flex-shrink: 0;
        }

        .tenet-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .tenet-title {
          font-family: var(--font-serif-luxury, 'Playfair Display', serif);
          font-size: 1.15rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FAF7F2;
          margin: 0;
          font-weight: 400;
        }

        .tenet-desc {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: #A8A194;
          line-height: 1.65;
          margin: 0;
          font-weight: 300;
        }

        /* ── Official Logo in Negative Space ── */
        .profile-identity-monolith {
          position: sticky;
          top: 7rem;
        }

        .identity-negative-space-stage {
          background: #191714;
          border: 1px solid rgba(212, 175, 55, 0.28);
          border-radius: 4px;
          padding: clamp(3rem, 5vw, 4.5rem) 2.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 24px 60px -16px rgba(0, 0, 0, 0.6);
          position: relative;
          overflow: hidden;
        }

        .identity-negative-space-stage::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center 40%, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .identity-logo-reliquary {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 6px;
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 280px;
        }

        .profile-official-logo {
          max-width: 200px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4));
        }

        .identity-caption-block {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          border-top: 1px solid rgba(212, 175, 55, 0.16);
          padding-top: 1.5rem;
          width: 100%;
        }

        .identity-brand-name {
          font-family: var(--font-serif-luxury, 'Playfair Display', serif);
          font-size: 1.05rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #FAF7F2;
        }

        .identity-parent-entity {
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: #D4AF37;
          text-transform: uppercase;
        }

        .identity-location {
          font-family: var(--font-mono, monospace);
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          color: #7A746B;
          text-transform: uppercase;
        }

        @media (max-width: 991px) {
          .profile-editorial-root {
            padding: 5.5rem 0 6.5rem;
          }
          .profile-editorial-spread {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .profile-identity-monolith {
            position: static;
          }
        }

        @media (max-width: 768px) {
          .profile-editorial-root {
            padding: 4.5rem 0 5.5rem;
          }
          .profile-marker-bar {
            margin-bottom: 1.75rem;
          }
          .profile-monumental-heading {
            font-size: clamp(2.3rem, 7.5vw, 3.4rem);
            margin-bottom: 1.5rem;
          }
          .profile-manifesto-lead {
            font-size: 1.15rem;
            line-height: 1.55;
            margin-bottom: 1.5rem;
          }
          .profile-body-text {
            font-size: 0.95rem;
            line-height: 1.7;
          }
          .identity-negative-space-stage {
            padding: 2.25rem 1.25rem;
          }
          .profile-official-logo {
            max-width: 160px;
          }
        }
      `}</style>
    </section>
  )
}
