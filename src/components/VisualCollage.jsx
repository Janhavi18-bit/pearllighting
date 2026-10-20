import React, { useEffect, useRef, useState } from 'react'
import { productsData } from '../data/productsData'

/**
 * VisualCollage - Editorial Featured Product Composition
 * Conforms to exact specifications:
 * - Immediately follows the Hero
 * - ONLY 4 DIFFERENT PRODUCT TYPES:
 *   01 SLIM PANEL LIGHT
 *   02 SURFACE PANEL LIGHT
 *   03 CURVE COB
 *   04 ROPE LIGHT
 * - Asymmetric luxury lighting magazine composition:
 *   ONE LARGE FEATURE IMAGE + TWO SMALLER IMAGES + ONE OFFSET IMAGE
 * - Minimal typography: Number + Product Name
 * - Purpose: arouse curiosity about the collection without overcrowding
 */
export default function VisualCollage({ onOpenProduct }) {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // 4 Featured Distinct Product Families
  const featuredProductIds = ['slim-panel', 'surface-panel', 'curve-cob', 'rope-light']
  const featuredProducts = featuredProductIds
    .map((id) => productsData.find((p) => p.id === id))
    .filter(Boolean)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleCardClick = (product) => {
    if (onOpenProduct) {
      onOpenProduct(product)
    }
  }

  // Assign roles in the editorial asymmetric composition
  const largeProduct = featuredProducts[0] // 01 SLIM PANEL LIGHT
  const smallProductA = featuredProducts[1] // 02 SURFACE PANEL LIGHT
  const smallProductB = featuredProducts[2] // 03 CURVE COB
  const offsetProduct = featuredProducts[3] // 04 ROPE LIGHT

  return (
    <section
      ref={sectionRef}
      className={`collage-root ${isVisible ? 'is-visible' : ''}`}
      id="featured-collage"
      aria-label="Featured Architectural Lighting Collage"
    >
      <div className="container collage-container">
        {/* Subtle Editorial Section Header */}
        <div className="collage-header">
          <span className="eyebrow collage-eyebrow">CURATED EDITORIAL</span>
          <h2 className="heading-section collage-title">FORM, BALANCE & LIGHT</h2>
          <p className="collage-subtitle">
            An initial study of luminaires conceived to shape architectural atmosphere.
          </p>
        </div>

        {/* Asymmetric Luxury Magazine Editorial Composition */}
        <div className="collage-asymmetric-spread">
          {/* Top Cluster: 1 Large Feature + 2 Stacked Smaller */}
          <div className="collage-main-row">
            {/* 01: LARGE FEATURE IMAGE */}
            {largeProduct && (
              <article
                className="collage-item item-large"
                onClick={() => handleCardClick(largeProduct)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(largeProduct)
                  }
                }}
                aria-label={`View ${largeProduct.name} Details`}
              >
                <div className="collage-visual-frame frame-large">
                  <span className="editorial-badge">FEATURE STUDY</span>
                  <img
                    src={largeProduct.primaryImage.image}
                    alt={largeProduct.primaryImage.alt || largeProduct.name}
                    className="collage-img"
                    loading="lazy"
                  />
                  <div className="collage-ambient-glow" aria-hidden="true"></div>
                </div>
                <div className="collage-caption">
                  <div className="caption-meta">
                    <span className="caption-num">01</span>
                    <span className="caption-sep">/</span>
                    <h3 className="caption-title">{largeProduct.name}</h3>
                  </div>
                  <span className="caption-cta">
                    VIEW PRODUCT <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            )}

            {/* TWO SMALLER STACKED IMAGES */}
            <div className="collage-stacked-column">
              {/* 02: SMALLER IMAGE A */}
              {smallProductA && (
                <article
                  className="collage-item item-small"
                  onClick={() => handleCardClick(smallProductA)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCardClick(smallProductA)
                    }
                  }}
                  aria-label={`View ${smallProductA.name} Details`}
                >
                  <div className="collage-visual-frame frame-small">
                    <img
                      src={smallProductA.primaryImage.image}
                      alt={smallProductA.primaryImage.alt || smallProductA.name}
                      className="collage-img"
                      loading="lazy"
                    />
                    <div className="collage-ambient-glow" aria-hidden="true"></div>
                  </div>
                  <div className="collage-caption">
                    <div className="caption-meta">
                      <span className="caption-num">02</span>
                      <span className="caption-sep">/</span>
                      <h3 className="caption-title">{smallProductA.name}</h3>
                    </div>
                    <span className="caption-cta">
                      VIEW PRODUCT <span className="arrow" aria-hidden="true">→</span>
                    </span>
                  </div>
                </article>
              )}

              {/* 03: SMALLER IMAGE B */}
              {smallProductB && (
                <article
                  className="collage-item item-small"
                  onClick={() => handleCardClick(smallProductB)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleCardClick(smallProductB)
                    }
                  }}
                  aria-label={`View ${smallProductB.name} Details`}
                >
                  <div className="collage-visual-frame frame-small">
                    <img
                      src={smallProductB.primaryImage.image}
                      alt={smallProductB.primaryImage.alt || smallProductB.name}
                      className="collage-img"
                      loading="lazy"
                    />
                    <div className="collage-ambient-glow" aria-hidden="true"></div>
                  </div>
                  <div className="collage-caption">
                    <div className="caption-meta">
                      <span className="caption-num">03</span>
                      <span className="caption-sep">/</span>
                      <h3 className="caption-title">{smallProductB.name}</h3>
                    </div>
                    <span className="caption-cta">
                      VIEW PRODUCT <span className="arrow" aria-hidden="true">→</span>
                    </span>
                  </div>
                </article>
              )}
            </div>
          </div>

          {/* Lower Asymmetric Offset: ONE OFFSET IMAGE with Generous Editorial Negative Space */}
          <div className="collage-offset-row">
            <div className="offset-spacer" aria-hidden="true"></div>
            {offsetProduct && (
              <article
                className="collage-item item-offset"
                onClick={() => handleCardClick(offsetProduct)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCardClick(offsetProduct)
                  }
                }}
                aria-label={`View ${offsetProduct.name} Details`}
              >
                <div className="collage-visual-frame frame-offset">
                  <span className="editorial-badge">SPATIAL CONTINUITY</span>
                  <img
                    src={offsetProduct.primaryImage.image}
                    alt={offsetProduct.primaryImage.alt || offsetProduct.name}
                    className="collage-img"
                    loading="lazy"
                  />
                  <div className="collage-ambient-glow" aria-hidden="true"></div>
                </div>
                <div className="collage-caption">
                  <div className="caption-meta">
                    <span className="caption-num">04</span>
                    <span className="caption-sep">/</span>
                    <h3 className="caption-title">{offsetProduct.name}</h3>
                  </div>
                  <span className="caption-cta">
                    VIEW PRODUCT <span className="arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .collage-root {
          position: relative;
          padding: 7rem 0 8rem;
          background: var(--bg-cream, #FAF8F3);
          border-top: 1px solid rgba(120, 100, 70, 0.14);
          border-bottom: 1px solid rgba(120, 100, 70, 0.14);
          width: 100%;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .collage-root.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .collage-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .collage-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 4rem;
        }

        .collage-eyebrow {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          color: var(--accent-gold, #C69A52);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .collage-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.6vw, 3rem);
          font-weight: 300;
          letter-spacing: 0.06em;
          color: var(--primary-text, #171717);
          margin-bottom: 1rem;
          line-height: 1.15;
        }

        .collage-subtitle {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          color: var(--secondary-text, #5E5A53);
          line-height: 1.6;
          font-weight: 300;
        }

        /* ── Asymmetric Layout ── */
        .collage-asymmetric-spread {
          display: flex;
          flex-direction: column;
          gap: 2.75rem;
        }

        .collage-main-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
        }

        @media (min-width: 992px) {
          .collage-main-row {
            grid-template-columns: 1.28fr 1fr;
            gap: 2.75rem;
            align-items: stretch;
          }
        }

        .collage-stacked-column {
          display: flex;
          flex-direction: column;
          gap: 2.25rem;
          justify-content: space-between;
        }

        /* Offset Lower Row */
        .collage-offset-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
        }

        @media (min-width: 992px) {
          .collage-offset-row {
            grid-template-columns: 0.42fr 1.58fr;
            align-items: center;
          }
        }

        /* ── Individual Editorial Items ── */
        .collage-item {
          position: relative;
          background: #FFFFFF;
          border: 1px solid rgba(120, 100, 70, 0.16);
          border-radius: 3px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.45s ease;
        }

        .collage-item:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px -12px rgba(23, 23, 23, 0.1);
          border-color: rgba(198, 154, 82, 0.5);
        }

        .collage-item:focus-visible {
          outline: 2px solid var(--accent-gold, #C69A52);
          outline-offset: 4px;
        }

        /* Visual Frames */
        .collage-visual-frame {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, #FFFFFF 0%, #FAF8F3 100%);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        .frame-large {
          min-height: 420px;
          height: 100%;
        }

        .frame-small {
          min-height: 200px;
          height: 200px;
        }

        .frame-offset {
          min-height: 260px;
          height: 260px;
        }

        @media (min-width: 992px) {
          .item-large {
            height: 100%;
          }
          .frame-large {
            min-height: 480px;
          }
          .frame-small {
            min-height: 215px;
            height: 215px;
          }
          .frame-offset {
            min-height: 290px;
            height: 290px;
          }
        }

        .editorial-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: var(--font-sans);
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          color: var(--accent-gold, #C69A52);
          text-transform: uppercase;
          z-index: 2;
          background: rgba(255, 255, 255, 0.85);
          padding: 0.25rem 0.65rem;
          border-radius: 2px;
          border: 1px solid rgba(120, 100, 70, 0.14);
        }

        .collage-img {
          width: auto;
          max-width: 82%;
          max-height: 85%;
          object-fit: contain;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .collage-item:hover .collage-img {
          transform: scale(1.05);
        }

        .collage-ambient-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 50px rgba(247, 244, 237, 0.5);
        }

        /* Caption & Metadata */
        .collage-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(120, 100, 70, 0.12);
          gap: 1rem;
        }

        .caption-meta {
          display: flex;
          align-items: baseline;
          gap: 0.55rem;
        }

        .caption-num {
          font-family: var(--font-mono, monospace);
          font-size: 0.82rem;
          letter-spacing: 0.16em;
          color: var(--accent-gold, #C69A52);
          font-weight: 500;
        }

        .caption-sep {
          color: rgba(120, 100, 70, 0.35);
          font-size: 0.75rem;
        }

        .caption-title {
          font-family: var(--font-serif);
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          font-weight: 400;
          letter-spacing: 0.05em;
          color: var(--primary-text, #171717);
          margin: 0;
        }

        .caption-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-gold, #C69A52);
          white-space: nowrap;
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .collage-item:hover .caption-cta {
          color: var(--primary-text, #171717);
        }

        .collage-item:hover .caption-cta .arrow {
          transform: translateX(4px);
        }

        .caption-cta .arrow {
          transition: transform 0.25s ease;
        }

        @media (max-width: 768px) {
          .collage-root {
            padding: 5rem 0 5.5rem;
          }
          .collage-container {
            padding: 0 1.25rem;
          }
          .collage-item {
            padding: 1.5rem 1.25rem 1.25rem;
          }
          .frame-large,
          .frame-small,
          .frame-offset {
            min-height: 220px;
            height: 220px;
          }
        }
      `}</style>
    </section>
  )
}
