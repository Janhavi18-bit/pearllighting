import React, { useState } from 'react'
import { productsData } from '../data/productsData'

/**
 * 02 — THE PRODUCT-DETAIL EXPERIENCE (Requirement 4)
 * Prominent product introduction with large product imagery, short headline,
 * and working variant controls with refined transitions.
 */
export default function ProductDetailSpotlight({ onOpenProduct, onEnquire }) {
  const [selectedVariant, setSelectedVariant] = useState('black-studio')
  const [activeFamily, setActiveFamily] = useState('downlight') // 'downlight' | 'curve'

  const deepDownlight = productsData.find((p) => p.id === 'deep-downlight')
  const curveCob = productsData.find((p) => p.id === 'curve-cob')

  // Downlight Variants
  const downlightVariants = [
    {
      id: 'black-studio',
      label: 'Studio Black Disc',
      color: '#1A1816',
      border: 'rgba(212, 175, 55, 0.4)',
      image: '/images/products/deep-downlight-round-black-studio.png',
      alt: 'Round Black Deep Down Light Studio Finish',
      specNote: 'Matte dark aperture eliminates ceiling contrast fatigue.',
    },
    {
      id: 'round-white',
      label: 'Architectural White',
      color: '#F4F1EA',
      border: 'rgba(255, 255, 255, 0.4)',
      image: '/images/products/deep-downlight-round-white.png',
      alt: 'Round White Deep Down Light Finish',
      specNote: 'Seamless flush integration for white drywall planes.',
    },
    {
      id: 'square-white',
      label: 'Square Flush Profile',
      color: '#ECE9E2',
      border: 'rgba(255, 255, 255, 0.4)',
      image: '/images/products/deep-downlight-square-white.png',
      alt: 'Square White Deep Down Light Profile',
      specNote: 'Geometric linear alignment for contemporary hallways.',
    },
    {
      id: 'duo-overview',
      label: 'Series Architectural Duo',
      color: 'linear-gradient(135deg, #1A1816 50%, #F4F1EA 50%)',
      border: 'rgba(212, 175, 55, 0.5)',
      image: '/images/products/deep-downlight-duo.png',
      alt: 'Deep Down Light Round and Square Duo Overview',
      specNote: 'Full typology presentation for architectural specifications.',
    },
  ]

  // Curve COB Variants
  const curveVariants = [
    {
      id: 'rose-gold',
      label: 'Rose Gold Heatsink',
      color: '#B76E79',
      border: 'rgba(183, 110, 121, 0.6)',
      image: '/images/products/curve-cob-rose-gold.png',
      alt: 'Curve COB Rose Gold Heatsink Profile',
      specNote: 'Anodized 6063 alloy heatsink with radial cooling fins.',
    },
    {
      id: 'white-recessed',
      label: 'Curved White Baffle',
      color: '#F5F2EB',
      border: 'rgba(255, 255, 255, 0.5)',
      image: '/images/products/curve-cob-white-recessed.png',
      alt: 'Curve COB White Recessed Curved Baffle',
      specNote: 'Smooth curved contour eliminates ceiling contrast rings.',
    },
    {
      id: 'curve-duo',
      label: 'Architectural Duo',
      color: 'linear-gradient(135deg, #B76E79 50%, #F5F2EB 50%)',
      border: 'rgba(212, 175, 55, 0.5)',
      image: '/images/products/curve-cob-duo.png',
      alt: 'Curve COB Architectural Duo',
      specNote: 'Dual finish comparison for interior mood boards.',
    },
  ]

  const currentVariants = activeFamily === 'downlight' ? downlightVariants : curveVariants
  const currentProduct = activeFamily === 'downlight' ? deepDownlight : curveCob
  const activeVarObj = currentVariants.find((v) => v.id === selectedVariant) || currentVariants[0]

  const handleFamilySwitch = (fam) => {
    setActiveFamily(fam)
    if (fam === 'downlight') setSelectedVariant('black-studio')
    else setSelectedVariant('rose-gold')
  }

  const handleOpenDetailModal = () => {
    if (onOpenProduct && currentProduct) {
      onOpenProduct({
        ...currentProduct,
        selectedImage: activeVarObj.image,
      })
    }
  }

  return (
    <section className="spotlight-section-root" id="discovery" aria-label="Interactive Product Discovery">
      <div className="container spotlight-inner-container">
        {/* Chapter Marker */}
        <div className="rebuild-marker-rail" style={{ color: '#161513', marginBottom: '24px' }}>
          <span className="rebuild-marker-num">04</span>
          <span className="rebuild-marker-dot">•</span>
          <span className="rebuild-marker-tag">INTERACTIVE PRODUCT DISCOVERY</span>
        </div>

        {/* Top Minimal Selector */}
        <div className="spotlight-family-selector">
          <button
            type="button"
            className={`family-pill ${activeFamily === 'downlight' ? 'is-active' : ''}`}
            onClick={() => handleFamilySwitch('downlight')}
          >
            01 • Deep Down Light Series
          </button>
          <button
            type="button"
            className={`family-pill ${activeFamily === 'curve' ? 'is-active' : ''}`}
            onClick={() => handleFamilySwitch('curve')}
          >
            02 • Curve COB Series
          </button>
        </div>

        {/* Master Exhibition Showcase */}
        <div className="spotlight-master-stage">
          {/* Top Headline Lockup */}
          <div className="spotlight-headline-group">
            <span className="spotlight-eyebrow">
              {activeFamily === 'downlight' ? 'ARCHITECTURAL RECESSED EDITIONS' : 'OPTICAL BAFFLE ARCHITECTURE'}
            </span>
            <h2 className="spotlight-monument-title">
              {activeFamily === 'downlight' ? 'DEEP DOWN LIGHT.' : 'CURVE COB.'}
            </h2>
            <p className="spotlight-monument-lead">
              {activeFamily === 'downlight'
                ? 'Concealed illumination. A 40° optical shielding cutoff hides the luminous diode from direct sightlines.'
                : 'Sculpted passive heatsink cooling fins paired with a curved anti-glare threshold.'}
            </p>
          </div>

          {/* Commanding Large Product Presentation */}
          <div className="spotlight-monolith-canvas">
            {/* Ambient Background Aura */}
            <div className="spotlight-warm-bloom" aria-hidden="true"></div>

            <div className="spotlight-image-holder">
              <img
                key={activeVarObj.image}
                src={activeVarObj.image}
                alt={activeVarObj.alt}
                className="spotlight-big-img"
                loading="eager"
              />
              <div className="spotlight-cast-shadow" aria-hidden="true"></div>
            </div>

            {/* Live Spec Callout Plaque */}
            <div className="spotlight-spec-plaque">
              <span className="plaque-sparkle">✦</span>
              <span className="plaque-note">{activeVarObj.specNote}</span>
            </div>
          </div>

          {/* Refined Working Variant Controls */}
          <div className="spotlight-variant-controller" role="group" aria-label="Product variant swatches">
            <span className="controller-instruction">CHOOSE FINISH / PROFILE:</span>

            <div className="variant-swatches-strip">
              {currentVariants.map((v) => {
                const isSelected = selectedVariant === v.id
                return (
                  <button
                    key={v.id}
                    type="button"
                    className={`swatch-button ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedVariant(v.id)}
                    aria-label={`Select ${v.label}`}
                    aria-pressed={isSelected}
                  >
                    <span
                      className="swatch-color-disc"
                      style={{ background: v.color, borderColor: v.border }}
                      aria-hidden="true"
                    ></span>
                    <span className="swatch-label">{v.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Direct Action Links */}
            <div className="spotlight-actions-bar">
              <button
                type="button"
                className="spotlight-primary-cta"
                onClick={handleOpenDetailModal}
              >
                <span>View Full Specifications & 3D</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </button>

              <a
                href={`https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20am%20interested%20in%20the%20${encodeURIComponent(currentProduct?.name || 'Architectural Light')}%20(${encodeURIComponent(activeVarObj.label)}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="spotlight-wa-cta"
              >
                Chat on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .spotlight-section-root {
          position: relative;
          background: #11100E;
          color: #FAF8F5;
          padding: 6rem 0 6.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .spotlight-inner-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Top Family Selector */
        .spotlight-family-selector {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 3.5rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.4rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .family-pill {
          padding: 0.6rem 1.4rem;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(250, 248, 245, 0.7);
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .family-pill.is-active {
          background: #FAF8F5;
          color: #11100E;
          font-weight: 600;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
        }

        /* Master Stage */
        .spotlight-master-stage {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .spotlight-headline-group {
          max-width: 780px;
          margin-bottom: 3rem;
        }

        .spotlight-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--gold-champagne, #C5A059);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          display: block;
        }

        .spotlight-monument-title {
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(2.4rem, 5.5vw, 4.2rem);
          font-weight: 600;
          letter-spacing: -0.025em;
          color: #FFFFFF;
          margin-bottom: 0.75rem;
        }

        .spotlight-monument-lead {
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          line-height: 1.65;
          color: rgba(250, 248, 245, 0.78);
          font-weight: 300;
        }

        /* Large Monolith Canvas */
        .spotlight-monolith-canvas {
          position: relative;
          width: 100%;
          max-width: 820px;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 3.5rem;
        }

        .spotlight-warm-bloom {
          position: absolute;
          inset: 10%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(226, 188, 106, 0.22) 0%, rgba(197, 160, 89, 0.08) 50%, transparent 75%);
          filter: blur(70px);
          pointer-events: none;
        }

        .spotlight-image-holder {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .spotlight-big-img {
          width: 85%;
          max-width: 520px;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 24px 50px rgba(0, 0, 0, 0.65));
          animation: fadeScaleIn 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeScaleIn {
          from {
            opacity: 0.4;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .spotlight-cast-shadow {
          width: 65%;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.75) 0%, transparent 70%);
          filter: blur(10px);
          margin-top: 1.25rem;
        }

        .spotlight-spec-plaque {
          margin-top: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.15rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          font-size: 0.76rem;
          color: rgba(250, 248, 245, 0.85);
          z-index: 2;
        }

        .plaque-sparkle {
          color: var(--gold-champagne, #C5A059);
        }

        /* Variant Controller */
        .spotlight-variant-controller {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          width: 100%;
          max-width: 680px;
        }

        .controller-instruction {
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          color: var(--gold-champagne, #C5A059);
          text-transform: uppercase;
        }

        .variant-swatches-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .swatch-button {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.6rem 1.2rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(250, 248, 245, 0.8);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .swatch-button:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .swatch-button.selected {
          background: #FAF8F5;
          color: #11100E;
          border-color: #FAF8F5;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }

        .swatch-color-disc {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1px solid;
          flex-shrink: 0;
        }

        /* Action Buttons */
        .spotlight-actions-bar {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-top: 1rem;
        }

        .spotlight-primary-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: var(--gold-champagne, #C5A059);
          color: #11100E;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 0.95rem 1.85rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(197, 160, 89, 0.35);
        }

        .spotlight-primary-cta:hover {
          background: #E5C37A;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(197, 160, 89, 0.5);
        }

        .btn-arrow {
          font-size: 1rem;
        }

        .spotlight-wa-cta {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gold-champagne, #C5A059);
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s ease;
        }

        .spotlight-wa-cta:hover {
          color: #FFFFFF;
        }

        @media (max-width: 768px) {
          .spotlight-section-root {
            padding: 4.5rem 0 5rem;
          }

          .spotlight-big-img {
            max-height: 260px;
          }

          .spotlight-actions-bar {
            flex-direction: column;
            gap: 1rem;
          }

          .spotlight-primary-cta {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
