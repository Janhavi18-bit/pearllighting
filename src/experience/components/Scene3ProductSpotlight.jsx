import React, { useState } from 'react'

export default function Scene3ProductSpotlight({ selectedVariantId, onOpenEnquiry }) {
  const spotlightVariants = [
    {
      id: 'curve-cob-rose-gold',
      pillLabel: 'Rose Gold Heatsink',
      swatch: '#B76E79',
      category: 'Recessed Architectural COB',
      title: 'Curve COB • Rose Gold Anodized Heatsink',
      eyebrow: 'AERO-THERMAL EXCELLENCE',
      description:
        'Engineered with an exposed radial heatsink machined from aircraft aluminium. The rose-gold anodized fins maximise convective air movement while a deeply recessed specular cone prevents direct diode glare.',
      image: '/images/products/curve-cob-rose-gold.png',
      alt: 'Curve COB Rose Gold Luminaire with exposed thermal heatsink',
      specs: [
        { label: 'Baffle Finish', value: 'Rose Gold Anodized Aluminium' },
        { label: 'Beam & Cutoff', value: '36° Specular • 45° Shielding Angle' },
        { label: 'Color Quality', value: 'CRI 95+ • R9 > 85 • MacAdam < 2' },
        { label: 'Color Temperature', value: '2700K Warm Luster' },
        { label: 'Mounting Style', value: 'Plaster-in Flush Recessed' },
      ],
      whatsappTitle: 'Curve COB Rose Gold Heatsink',
    },
    {
      id: 'deep-downlight-studio',
      pillLabel: 'Studio Obsidian Cone',
      swatch: '#1C1B19',
      category: 'Darklight Recessed Series',
      title: 'Deep Downlight • Studio Obsidian Cone',
      eyebrow: 'CONCEALED RADIANCE',
      description:
        'The light source recedes 35mm into an electrostatic matte-black stepped cone. From ordinary standing perspectives, the fixture appears dark, washing surfaces below with quiet, glare-free light.',
      image: '/images/products/deep-downlight-round-black-studio.png',
      alt: 'Deep Downlight Studio Obsidian Luminaire in dark cone finish',
      specs: [
        { label: 'Optic Architecture', value: 'Stepped Darklight Cone' },
        { label: 'Glare Threshold', value: 'UGR < 16 (Comfort Class 1)' },
        { label: 'Color Quality', value: 'CRI 95+ • Zero Flicker Driver' },
        { label: 'Color Temperature', value: '3000K Architectural Warm' },
        { label: 'Ceiling Cutout', value: 'Ø 75 mm Compact Footprint' },
      ],
      whatsappTitle: 'Deep Downlight Studio Obsidian',
    },
    {
      id: 'curve-cob-duo',
      pillLabel: 'Architectural Finish Pair',
      swatch: '#C5A059',
      category: 'Dual Finish Specification',
      title: 'Curve COB • Architectural Finish Study',
      eyebrow: 'TWIN SPECIFICATION',
      description:
        'Side-by-side presentation demonstrating matte black and rose gold reflector configurations. Allows architects to specify harmonious finishes across private living suites and contemporary dining rooms.',
      image: '/images/products/curve-cob-duo.png',
      alt: 'Curve COB dual finish black and rose gold presentation',
      specs: [
        { label: 'Included Finishes', value: 'Matte Obsidian & Rose Gold' },
        { label: 'Light Engine', value: 'High-Density COB Matrix' },
        { label: 'Color Quality', value: 'CRI 95+ Spectrum' },
        { label: 'Color Temperature', value: '2700K / 4000K Selectable' },
        { label: 'Application', value: 'Luxury Living & High-End Galleries' },
      ],
      whatsappTitle: 'Curve COB Architectural Duo Pair',
    },
    {
      id: 'deep-downlight-square',
      pillLabel: 'Square Plaster White',
      swatch: '#E8E4DA',
      category: 'Geometric Recessed Series',
      title: 'Deep Downlight • Square Plaster-In',
      eyebrow: 'GEOMETRIC DISCIPLINE',
      description:
        'A crisp square aperture with beveled internal walls designed to align with corridor lines, tile joints, and architectural reveals. Casts an even square pool of light with deep visual cutoff.',
      image: '/images/products/deep-downlight-square-white.png',
      alt: 'Square Deep Downlight in Architectural Plaster White',
      specs: [
        { label: 'Aperture Geometry', value: 'Precision Square Micro-Bevel' },
        { label: 'Delivered Flux', value: '980 lm – 1420 lm' },
        { label: 'Color Quality', value: 'CRI 95+ High Fidelity' },
        { label: 'Color Temperature', value: '3000K Clean Warmth' },
        { label: 'Ingress Seal', value: 'IP44 Damp Location Qualified' },
      ],
      whatsappTitle: 'Deep Downlight Square Plaster White',
    },
    {
      id: 'rope-light-warm',
      pillLabel: 'Continuous Amber Reel',
      swatch: '#E6A15C',
      category: 'Continuous Linear Luminescence',
      title: 'Continuous Rope Light • Amber Reel',
      eyebrow: 'HOMOGENEOUS 360° RIBBON',
      description:
        'A flexible luminaire encased in optical-grade silicone that eliminates diode spotting. Curves smoothly around ceiling cove pockets, fluted wall panels, and exterior architectural cornices.',
      image: '/images/products/rope-light-primary-warm.png',
      alt: 'Pearl Lighting continuous warm architectural rope light spool',
      specs: [
        { label: 'Encapsulation', value: 'Extruded UV-Proof Silicone' },
        { label: 'Continuous Run', value: '50 Metre Single Feed' },
        { label: 'Color Deviation', value: 'SDCM < 2 MacAdam Ellipse' },
        { label: 'Color Temperature', value: '2700K Warm Amber Glow' },
        { label: 'Ingress Protection', value: 'IP67 Complete All-Weather' },
      ],
      whatsappTitle: 'Continuous Architectural Rope Light Amber Reel',
    },
  ]

  const [activeId, setActiveId] = useState(selectedVariantId || 'curve-cob-rose-gold')

  const activeVariant =
    spotlightVariants.find((v) => v.id === activeId) || spotlightVariants[0]

  const handleWhatsAppEnquiry = (variant) => {
    const text = `Hi Pearl Lighting! I am reviewing the "${variant.whatsappTitle}" in your Product Spotlight. Could you please share full specification sheets, samples, and trade pricing?`
    window.open(
      `https://wa.me/918329045712?text=${encodeURIComponent(text)}`,
      '_blank'
    )
  }

  return (
    <section className="scene3-spotlight-root" id="scene-spotlight" aria-label="Scene 3 — Product Spotlight">
      <div className="scene3-container">
        {/* Section Header */}
        <div className="scene3-header-block">
          <div className="scene3-eyebrow-rail">
            <span className="eyebrow-idx">03</span>
            <span className="eyebrow-dot">•</span>
            <span className="eyebrow-text">PRODUCT SPOTLIGHT & FINISH ANATOMY</span>
          </div>
          <h2 className="scene3-title">The Anatomy of Finish & Cutoff.</h2>
          <p className="scene3-sub">
            Switch between authentic finishes, optical baffles, and thermal engineering. Real luminaires photographed in balanced architectural studio light.
          </p>

          {/* Tangible Variant Selector Pills */}
          <div className="spotlight-pills-cluster" role="tablist" aria-label="Product variant options">
            {spotlightVariants.map((v) => {
              const isSelected = v.id === activeVariant.id
              return (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`spotlight-pill ${isSelected ? 'pill-selected' : ''}`}
                  onClick={() => setActiveId(v.id)}
                >
                  <span
                    className="pill-swatch-circle"
                    style={{ backgroundColor: v.swatch }}
                    aria-hidden="true"
                  />
                  <span className="pill-name">{v.pillLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Spacious Spotlight Stage */}
        <div className="scene3-stage-grid">
          {/* Central Large Product Visual Frame */}
          <div className="scene3-visual-frame">
            <div className="visual-stage-inner">
              <img
                key={activeVariant.id}
                src={activeVariant.image}
                alt={activeVariant.alt}
                className="spotlight-large-image animate-fade"
              />
              <div
                className="spotlight-ambient-aura"
                style={{ backgroundColor: activeVariant.swatch }}
                aria-hidden="true"
              ></div>
            </div>
            <div className="visual-stage-footer">
              <span className="stage-eyebrow">{activeVariant.eyebrow}</span>
              <span className="stage-cat">{activeVariant.category}</span>
            </div>
          </div>

          {/* Detailed Engineering Specification Matrix */}
          <div className="scene3-details-col">
            <div className="details-header">
              <span className="details-cat-tag">{activeVariant.category}</span>
              <h3 className="details-title">{activeVariant.title}</h3>
              <p className="details-description">{activeVariant.description}</p>
            </div>

            {/* Specifications Matrix Table */}
            <div className="details-specs-matrix">
              <div className="matrix-title">TECHNICAL ARCHITECTURE</div>
              {activeVariant.specs.map((item, idx) => (
                <div key={idx} className="matrix-row">
                  <span className="matrix-label">{item.label}</span>
                  <span className="matrix-val">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Direct Action Triggers */}
            <div className="details-actions-cluster">
              <button
                type="button"
                className="spotlight-wa-cta"
                onClick={() => handleWhatsAppEnquiry(activeVariant)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
                </svg>
                <span>Enquire via WhatsApp</span>
              </button>

              <button
                type="button"
                className="spotlight-consult-btn"
                onClick={() => onOpenEnquiry && onOpenEnquiry(activeVariant)}
              >
                <span>Request Project Blueprints</span>
                <span className="arrow-sym">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scene3-spotlight-root {
          background-color: #F8F5EE;
          color: #161513;
          padding: 110px 40px 120px;
          position: relative;
          border-bottom: 1px solid rgba(22, 21, 19, 0.08);
        }

        .scene3-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        .scene3-header-block {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 60px;
        }

        .scene3-eyebrow-rail {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #B89242;
          margin-bottom: 16px;
        }

        .eyebrow-dot {
          color: rgba(22, 21, 19, 0.25);
        }

        .scene3-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(36px, 4.2vw, 56px);
          font-weight: 400;
          color: #161513;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .scene3-sub {
          font-size: clamp(15px, 1.2vw, 17px);
          color: #555047;
          line-height: 1.6;
          font-weight: 300;
          max-width: 620px;
          margin: 0 auto 36px;
        }

        /* Selector Pills Cluster */
        .spotlight-pills-cluster {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          background: #EFEBE1;
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(22, 21, 19, 0.1);
          width: fit-content;
          margin: 0 auto;
        }

        .spotlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px solid transparent;
          color: #4A453C;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 18px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spotlight-pill:hover {
          color: #161513;
          background: rgba(255, 255, 255, 0.5);
        }

        .spotlight-pill.pill-selected {
          background: #FFFFFF;
          color: #161513;
          font-weight: 600;
          box-shadow: 0 4px 18px rgba(22, 21, 19, 0.12);
          border-color: rgba(22, 21, 19, 0.1);
        }

        .pill-swatch-circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid rgba(22, 21, 19, 0.25);
        }

        /* Stage Grid */
        .scene3-stage-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        .scene3-visual-frame {
          position: relative;
          background: #0E0D0C;
          border-radius: 32px;
          overflow: hidden;
          min-height: 520px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 24px 60px rgba(22, 21, 19, 0.18);
          border: 1px solid rgba(22, 21, 19, 0.1);
        }

        .visual-stage-inner {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          position: relative;
        }

        .spotlight-large-image {
          max-width: 90%;
          max-height: 420px;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 25px 45px rgba(0, 0, 0, 0.9));
        }

        .spotlight-ambient-aura {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          opacity: 0.18;
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        .animate-fade {
          animation: spotFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes spotFade {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .visual-stage-footer {
          padding: 18px 32px;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.12em;
        }

        .stage-eyebrow {
          color: #DFC07A;
        }

        .stage-cat {
          color: rgba(250, 247, 242, 0.45);
        }

        /* Details Column */
        .scene3-details-col {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .details-cat-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #B89242;
          display: block;
          margin-bottom: 8px;
        }

        .details-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(28px, 2.8vw, 38px);
          font-weight: 500;
          color: #161513;
          line-height: 1.2;
          margin-bottom: 14px;
        }

        .details-description {
          font-size: 15.5px;
          line-height: 1.65;
          color: #48433A;
          font-weight: 300;
        }

        /* Matrix Table */
        .details-specs-matrix {
          background: #FFFFFF;
          border: 1px solid rgba(22, 21, 19, 0.08);
          border-radius: 20px;
          padding: 22px 24px;
          box-shadow: 0 4px 18px rgba(22, 21, 19, 0.03);
        }

        .matrix-title {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #8C8373;
          margin-bottom: 14px;
        }

        .matrix-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(22, 21, 19, 0.06);
          font-size: 13.5px;
        }

        .matrix-row:last-child {
          border-bottom: none;
        }

        .matrix-label {
          color: #726A5E;
        }

        .matrix-val {
          color: #161513;
          font-weight: 500;
          text-align: right;
        }

        /* Actions */
        .details-actions-cluster {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .spotlight-wa-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #171717;
          color: #FAF7F2;
          border: 1px solid rgba(198, 154, 82, 0.45);
          padding: 14px 28px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .spotlight-wa-cta:hover {
          background: #C69A52;
          color: #12100E;
          border-color: #C69A52;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(198, 154, 82, 0.35);
        }

        .spotlight-wa-cta:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        .spotlight-consult-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(22, 21, 19, 0.25);
          color: #161513;
          padding: 13px 28px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .spotlight-consult-btn:hover {
          border-color: #B89242;
          color: #B89242;
          background: rgba(184, 146, 66, 0.06);
        }

        @media (max-width: 992px) {
          .scene3-stage-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .scene3-visual-frame {
            min-height: 380px;
          }
        }

        @media (max-width: 600px) {
          .scene3-spotlight-root {
            padding: 70px 20px 80px;
          }
          .spotlight-pills-cluster {
            border-radius: 18px;
            padding: 8px;
          }
          .spotlight-pill {
            font-size: 12px;
            padding: 6px 12px;
          }
          .scene3-visual-frame {
            min-height: 320px;
            border-radius: 20px;
          }
          .matrix-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          .matrix-val {
            text-align: left;
          }
        }
      `}</style>
    </section>
  )
}
