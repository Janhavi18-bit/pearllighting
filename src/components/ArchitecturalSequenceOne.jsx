import React, { useState } from 'react'
import { productsData } from '../data/productsData'

/**
 * Chapter II: Architectural Luminaire Discovery — Sequence I
 * 
 * An editorial exhibition sequence featuring:
 * 1. Curve COB — Monumental focal moment with rose gold reflector heatsink and finish switchers.
 * 2. Deep Down Light — High-contrast anti-glare recessed chiaroscuro study (Studio Black vs Architectural White).
 * 3. Moveable COB — Articulated dual-axis gimbal directional spotlight with optical detail.
 */
export default function ArchitecturalSequenceOne({ onOpenProduct }) {
  const curveCob = productsData.find((p) => p.id === 'curve-cob')
  const deepDownlight = productsData.find((p) => p.id === 'deep-downlight')
  const moveableCob = productsData.find((p) => p.id === 'moveable-cob')

  const [curveCobActiveImg, setCurveCobActiveImg] = useState('/images/products/curve-cob-rose-gold.png')
  const [downlightActiveImg, setDownlightActiveImg] = useState('/images/products/deep-downlight-round-black-studio.png')
  const [moveableActiveImg, setMoveableActiveImg] = useState('/images/products/moveable-cob-duo.png')

  const handleOpen = (product) => {
    if (onOpenProduct && product) {
      onOpenProduct(product)
    }
  }

  return (
    <section
      className="seq-one-root"
      id="collection"
      aria-label="Architectural Discovery Sequence One"
    >
      <div className="container seq-master-container">
        {/* Section Prelude */}
        <header className="seq-header-monograph">
          <div className="seq-coordinate-tag">
            <span className="coord-num">02</span>
            <span className="coord-line" aria-hidden="true"></span>
            <span className="coord-text">ARCHITECTURAL REPERTOIRE • SEQUENCE I</span>
          </div>

          <div className="seq-headline-grid">
            <h2 className="seq-section-title">
              THE SCULPTURAL<br />
              <span className="gold-italic">RECESSED EDITIONS.</span>
            </h2>
            <p className="seq-curatorial-note">
              Luminaires engineered for optical precision, thermal discipline, and architectural harmony—casting focused illumination without distracting glare.
            </p>
          </div>
        </header>

        {/* ── 1. THE MONUMENTAL FOCAL: CURVE COB ── */}
        {curveCob && (
          <div className="focal-monolith-chamber">
            <div
              className="monolith-spatial-card"
              onClick={() => handleOpen(curveCob)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(curveCob) : null)}
              aria-label={`Explore ${curveCob.name}`}
            >
              {/* Background ambient warmth */}
              <div className="monolith-ambient-radiance" aria-hidden="true"></div>

              <div className="monolith-inner-spread">
                {/* Left/Top: Large Commanding Product Visual */}
                <div className="monolith-visual-stage">
                  <img
                    src={curveCobActiveImg}
                    alt={curveCob.name}
                    className="monolith-hero-img"
                    loading="lazy"
                  />
                  <div className="monolith-cast-shadow" aria-hidden="true"></div>
                </div>

                {/* Right/Bottom: Minimal Editorial Narrative & Switchers */}
                <div className="monolith-content-flank">
                  <div className="monolith-meta-top">
                    <span className="monolith-number">TYPOLOGY 01</span>
                    <span className="monolith-series">{curveCob.subtitle}</span>
                  </div>

                  <h3 className="monolith-product-title">{curveCob.name}</h3>
                  <p className="monolith-product-statement">{curveCob.description}</p>

                  <div className="monolith-optics-note">
                    <span className="optics-bullet" aria-hidden="true">✦</span>
                    <span>Curved optical baffle engineered to soften aperture thresholds and eliminate ceiling contrast glare.</span>
                  </div>

                  {/* Interactive Finish Selectors */}
                  <div
                    className="monolith-finish-selector-cluster"
                    onClick={(e) => e.stopPropagation()}
                    role="group"
                    aria-label="Curve COB Finish Options"
                  >
                    <span className="finish-cluster-label">FINISH ARCHIVE:</span>
                    <div className="finish-buttons-row">
                      <button
                        type="button"
                        className={`finish-toggle-btn ${curveCobActiveImg === '/images/products/curve-cob-rose-gold.png' ? 'is-active' : ''}`}
                        onClick={() => setCurveCobActiveImg('/images/products/curve-cob-rose-gold.png')}
                      >
                        Rose Gold Reflector
                      </button>
                      <button
                        type="button"
                        className={`finish-toggle-btn ${curveCobActiveImg === '/images/products/curve-cob-duo.png' ? 'is-active' : ''}`}
                        onClick={() => setCurveCobActiveImg('/images/products/curve-cob-duo.png')}
                      >
                        Architectural Duo
                      </button>
                      <button
                        type="button"
                        className={`finish-toggle-btn ${curveCobActiveImg === '/images/products/curve-cob-white-recessed.png' ? 'is-active' : ''}`}
                        onClick={() => setCurveCobActiveImg('/images/products/curve-cob-white-recessed.png')}
                      >
                        White Recessed Baffle
                      </button>
                    </div>
                  </div>

                  {/* Explore Prompt */}
                  <div className="monolith-action-rail">
                    <span className="monolith-explore-link">
                      <span>VIEW GALLERY & SPECIFICATIONS</span>
                      <span className="link-arrow" aria-hidden="true">↗</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 2 & 3. CONTRASTING PAIR: DEEP DOWN LIGHT & MOVEABLE COB ── */}
        <div className="contrasting-diptych-grid">
          {/* Deep Down Light: Chiaroscuro Anti-Glare Recessed */}
          {deepDownlight && (
            <div
              className="diptych-sculpture-card card-deep-downlight"
              onClick={() => handleOpen(deepDownlight)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(deepDownlight) : null)}
              aria-label={`Explore ${deepDownlight.name}`}
            >
              <div className="diptych-card-header">
                <span className="card-index-tag">02</span>
                <span className="card-series-tag">{deepDownlight.subtitle}</span>
              </div>

              <div className="diptych-visual-chamber">
                <div className="chamber-glow-core" aria-hidden="true"></div>
                <img
                  src={downlightActiveImg}
                  alt={deepDownlight.name}
                  className="diptych-product-img"
                  loading="lazy"
                />
              </div>

              <div className="diptych-card-footer">
                <h3 className="diptych-title">{deepDownlight.name}</h3>
                <p className="diptych-desc">{deepDownlight.description}</p>

                {/* Perspective switchers */}
                <div
                  className="diptych-finish-row"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={`finish-toggle-btn ${downlightActiveImg === '/images/products/deep-downlight-round-black-studio.png' ? 'is-active' : ''}`}
                    onClick={() => setDownlightActiveImg('/images/products/deep-downlight-round-black-studio.png')}
                  >
                    Studio Black
                  </button>
                  <button
                    type="button"
                    className={`finish-toggle-btn ${downlightActiveImg === '/images/products/deep-downlight-duo.png' ? 'is-active' : ''}`}
                    onClick={() => setDownlightActiveImg('/images/products/deep-downlight-duo.png')}
                  >
                    Duo
                  </button>
                  <button
                    type="button"
                    className={`finish-toggle-btn ${downlightActiveImg === '/images/products/deep-downlight-round-white.png' ? 'is-active' : ''}`}
                    onClick={() => setDownlightActiveImg('/images/products/deep-downlight-round-white.png')}
                  >
                    Pure White
                  </button>
                </div>

                <div className="card-explore-trigger">
                  <span>EXPLORE ARCHIVE</span>
                  <span className="trigger-arrow" aria-hidden="true">↗</span>
                </div>
              </div>
            </div>
          )}

          {/* Moveable COB: Dual-Axis Gimbal Articulation */}
          {moveableCob && (
            <div
              className="diptych-sculpture-card card-moveable-cob"
              onClick={() => handleOpen(moveableCob)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(moveableCob) : null)}
              aria-label={`Explore ${moveableCob.name}`}
            >
              <div className="diptych-card-header">
                <span className="card-index-tag">03</span>
                <span className="card-series-tag">{moveableCob.subtitle}</span>
              </div>

              <div className="diptych-visual-chamber">
                <div className="chamber-glow-core warm-amber" aria-hidden="true"></div>
                <img
                  src={moveableActiveImg}
                  alt={moveableCob.name}
                  className="diptych-product-img"
                  loading="lazy"
                />
              </div>

              <div className="diptych-card-footer">
                <h3 className="diptych-title">{moveableCob.name}</h3>
                <p className="diptych-desc">{moveableCob.description}</p>

                {/* Perspective switchers */}
                <div
                  className="diptych-finish-row"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={`finish-toggle-btn ${moveableActiveImg === '/images/products/moveable-cob-duo.png' ? 'is-active' : ''}`}
                    onClick={() => setMoveableActiveImg('/images/products/moveable-cob-duo.png')}
                  >
                    Dual Gimbal
                  </button>
                  <button
                    type="button"
                    className={`finish-toggle-btn ${moveableActiveImg === '/images/products/moveable-cob-detail.png' ? 'is-active' : ''}`}
                    onClick={() => setMoveableActiveImg('/images/products/moveable-cob-detail.png')}
                  >
                    Optic Detail
                  </button>
                </div>

                <div className="card-explore-trigger">
                  <span>EXPLORE ARCHIVE</span>
                  <span className="trigger-arrow" aria-hidden="true">↗</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* ── Root Architecture ── */
        .seq-one-root {
          position: relative;
          width: 100%;
          background: #141210;
          color: #FAF7F2;
          padding: 8rem 0 7rem;
          border-top: 1px solid rgba(212, 175, 55, 0.14);
        }

        .seq-master-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 4vw, 4rem);
        }

        /* ── Header Monograph ── */
        .seq-header-monograph {
          margin-bottom: 5.5rem;
        }

        .seq-coordinate-tag {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .coord-num {
          font-family: var(--font-serif, serif);
          font-size: 1.2rem;
          color: #D4AF37;
          font-weight: 500;
        }

        .coord-line {
          width: 44px;
          height: 1px;
          background: rgba(212, 175, 55, 0.35);
        }

        .coord-text {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #B5AEA4;
          font-weight: 600;
        }

        .seq-headline-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: flex-end;
        }

        .seq-section-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(2.8rem, 5.5vw, 4.4rem);
          line-height: 0.98;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: #FAF7F2;
          margin: 0;
        }

        .gold-italic {
          font-style: italic;
          color: #D4AF37;
        }

        .seq-curatorial-note {
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(0.98rem, 1.2vw, 1.12rem);
          line-height: 1.7;
          color: #B5AEA4;
          max-width: 540px;
          margin: 0;
        }

        /* ── 1. Monolith Chamber (Curve COB) ── */
        .focal-monolith-chamber {
          margin-bottom: 5rem;
        }

        .monolith-spatial-card {
          position: relative;
          background: rgba(24, 21, 18, 0.85);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 4px;
          padding: clamp(2rem, 4vw, 4rem);
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          overflow: hidden;
          outline: none;
        }

        .monolith-spatial-card:hover,
        .monolith-spatial-card:focus-visible {
          border-color: rgba(212, 175, 55, 0.55);
          box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.7),
                      0 0 32px rgba(212, 175, 55, 0.15);
          transform: translateY(-4px);
        }

        .monolith-ambient-radiance {
          position: absolute;
          top: 20%;
          left: 15%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }

        .monolith-inner-spread {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        .monolith-visual-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 440px;
          padding: 2rem;
        }

        .monolith-hero-img {
          position: relative;
          z-index: 2;
          max-width: 95%;
          max-height: 440px;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.65));
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .monolith-spatial-card:hover .monolith-hero-img {
          transform: scale(1.03) translateY(-4px);
        }

        .monolith-cast-shadow {
          position: absolute;
          bottom: 20px;
          left: 20%;
          right: 20%;
          height: 35px;
          background: radial-gradient(ellipse, rgba(0, 0, 0, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(10px);
          pointer-events: none;
        }

        .monolith-content-flank {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .monolith-meta-top {
          display: flex;
          align-items: baseline;
          gap: 1rem;
        }

        .monolith-number {
          font-family: var(--font-serif, serif);
          font-size: 1.1rem;
          color: #D4AF37;
          font-weight: 500;
        }

        .monolith-series {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.74rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8A8276;
        }

        .monolith-product-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(2rem, 3.5vw, 3rem);
          letter-spacing: 0.02em;
          color: #FAF7F2;
          margin: 0;
          font-weight: 300;
        }

        .monolith-product-statement {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.96rem;
          line-height: 1.65;
          color: #B5AEA4;
          margin: 0;
        }

        .monolith-optics-note {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.82rem;
          color: #8A8276;
          line-height: 1.5;
          padding: 1rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .optics-bullet {
          color: #D4AF37;
        }

        .monolith-finish-selector-cluster {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          padding-top: 0.5rem;
        }

        .finish-cluster-label {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8A8276;
        }

        .finish-buttons-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .finish-toggle-btn {
          background: rgba(35, 31, 26, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 999px;
          padding: 0.45rem 1.05rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.74rem;
          color: #B5AEA4;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .finish-toggle-btn:hover {
          background: rgba(212, 175, 55, 0.2);
          color: #FAF7F2;
          border-color: #D4AF37;
        }

        .finish-toggle-btn.is-active {
          background: #D4AF37;
          color: #11100E;
          border-color: #D4AF37;
          font-weight: 600;
        }

        .monolith-action-rail {
          padding-top: 1rem;
        }

        .monolith-explore-link {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #D4AF37;
          transition: gap 0.3s ease;
        }

        .monolith-spatial-card:hover .monolith-explore-link {
          gap: 0.95rem;
        }

        /* ── 2 & 3. Contrasting Diptych Grid ── */
        .contrasting-diptych-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3.5vw, 3.5rem);
        }

        .diptych-sculpture-card {
          position: relative;
          background: rgba(24, 21, 18, 0.7);
          border: 1px solid rgba(212, 175, 55, 0.16);
          border-radius: 4px;
          padding: clamp(1.75rem, 3vw, 2.75rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          outline: none;
        }

        .diptych-sculpture-card:hover,
        .diptych-sculpture-card:focus-visible {
          border-color: rgba(212, 175, 55, 0.45);
          background: rgba(30, 26, 22, 0.9);
          transform: translateY(-4px);
          box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.6);
        }

        .diptych-card-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .card-index-tag {
          font-family: var(--font-serif, serif);
          font-size: 1.25rem;
          color: #D4AF37;
          font-weight: 500;
        }

        .card-series-tag {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8A8276;
        }

        .diptych-visual-chamber {
          position: relative;
          min-height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          margin-bottom: 1.5rem;
        }

        .chamber-glow-core {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 75%;
          height: 75%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .chamber-glow-core.warm-amber {
          background: radial-gradient(circle, rgba(255, 205, 120, 0.14) 0%, transparent 70%);
        }

        .diptych-product-img {
          position: relative;
          z-index: 2;
          max-width: 90%;
          max-height: 330px;
          object-fit: contain;
          filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.6));
          transition: transform 0.5s ease;
        }

        .diptych-sculpture-card:hover .diptych-product-img {
          transform: translateY(-4px) scale(1.02);
        }

        .diptych-card-footer {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 1.5rem;
        }

        .diptych-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(1.4rem, 2vw, 1.85rem);
          color: #FAF7F2;
          margin: 0;
          font-weight: 400;
        }

        .diptych-desc {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.88rem;
          line-height: 1.6;
          color: #B5AEA4;
          margin: 0;
        }

        .diptych-finish-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.45rem;
          padding: 0.25rem 0;
        }

        .card-explore-trigger {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #D4AF37;
          margin-top: 0.5rem;
        }

        /* ── Responsive Refinements ── */
        @media (max-width: 1024px) {
          .seq-one-root {
            padding: 6rem 0 5rem;
          }

          .seq-headline-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .monolith-inner-spread {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .contrasting-diptych-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .seq-one-root {
            padding: 4.5rem 0 4rem;
          }

          .seq-header-monograph {
            margin-bottom: 3.5rem;
          }

          .seq-section-title {
            font-size: clamp(2.4rem, 8vw, 3.4rem);
          }

          .monolith-spatial-card {
            padding: 1.75rem 1.25rem;
          }

          .monolith-visual-stage {
            min-height: 280px;
            padding: 1rem 0;
          }

          .monolith-hero-img {
            max-height: 280px;
          }

          .diptych-sculpture-card {
            padding: 1.75rem 1.25rem;
          }

          .diptych-visual-chamber {
            min-height: 240px;
            padding: 1rem 0;
          }

          .diptych-product-img {
            max-height: 240px;
          }
        }
      `}</style>
    </section>
  )
}
