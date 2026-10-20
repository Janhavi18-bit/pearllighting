import React, { useState } from 'react'

export default function TakeACloserLook({ selectedVariantId, onOpenEnquiry }) {
  const variants = [
    {
      id: 'curve-cob-rose-gold',
      selectorName: 'Rose Gold Heatsink',
      shortLabel: 'Rose Gold',
      swatchColor: '#B76E79',
      category: 'Recessed Architectural COB',
      title: 'Curve COB • Rose Gold Anodized Heatsink',
      tag: 'AERO-THERMAL EXCELLENCE',
      description:
        'Crafted with an exposed rose gold radial heatsink that turns thermal engineering into a striking aesthetic feature. The deep specular reflector prevents direct glare while casting an ambient 2700K pool of light.',
      image: '/images/products/curve-cob-rose-gold.png',
      alt: 'Pearl Lighting Curve COB Rose Gold Heatsink Detail',
      specs: [
        { label: 'Baffle Finish', value: 'Rose Gold Anodized Aluminum' },
        { label: 'Optics & Cutoff', value: '36° Beam • 45° Shielding Angle' },
        { label: 'Colour Quality', value: 'CRI 95+ • R9 > 85' },
        { label: 'Mounting Style', value: 'Flush Ceiling Recessed' },
      ],
    },
    {
      id: 'deep-downlight-studio',
      selectorName: 'Deep Downlight Studio',
      shortLabel: 'Obsidian Black',
      swatchColor: '#1A1A1A',
      category: 'Anti-Glare Recessed Series',
      title: 'Deep Downlight • Studio Obsidian Cone',
      tag: 'DARKLIGHT CONCEALMENT',
      description:
        'Engineered around the darklight principle: the light source sits 35mm deep inside a matte black stepped cone. From normal room perspectives the fixture disappears into the ceiling, leaving only pure, shadowless pools of light.',
      image: '/images/products/deep-downlight-round-black-studio.png',
      alt: 'Pearl Lighting Deep Downlight Studio Obsidian Luminaire',
      specs: [
        { label: 'Optic Architecture', value: 'Stepped Darklight Cone' },
        { label: 'Visual Comfort', value: 'UGR < 16 (Anti-glare rated)' },
        { label: 'Finish Tone', value: 'Electrostatic Matte Black' },
        { label: 'Ceiling Cutout', value: 'Ø 75 mm / Compact Footprint' },
      ],
    },
    {
      id: 'curve-cob-duo',
      selectorName: 'Architectural Duo',
      shortLabel: 'Finish Pair',
      swatchColor: '#C5A059',
      category: 'Dual Luminaire Pair',
      title: 'Curve COB • Dual Finish Architectural Study',
      tag: 'TWIN SPECIFICATION',
      description:
        'Side-by-side presentation of matte black and rose gold reflector configurations. Demonstrates how finish selection adapts the same precision optical engine for moody private lounges or luminous daylight gallery settings.',
      image: '/images/products/curve-cob-duo.png',
      alt: 'Pearl Lighting Curve COB Dual Finish Configuration',
      specs: [
        { label: 'Finishes Included', value: 'Matte Obsidian & Rose Gold' },
        { label: 'Engine Matrix', value: 'High-Lumen COB Cluster' },
        { label: 'CCT Range', value: '2700K / 3000K / 4000K Selectable' },
        { label: 'Application', value: 'Luxury Residential & High-end Retail' },
      ],
    },
    {
      id: 'deep-downlight-duo',
      selectorName: 'Round & Square Duo',
      shortLabel: 'Geometry Pair',
      swatchColor: '#E0DDD5',
      category: 'Architectural Recessed',
      title: 'Deep Down Light • Round & Square Geometries',
      tag: 'GEOMETRIC VERSATILITY',
      description:
        'Pairing circular downlights for organic flow spaces with crisp square bevels for aligned architectural corridors. Both utilize matching deep optical wells for unified spatial lighting design.',
      image: '/images/products/deep-downlight-duo.png',
      alt: 'Pearl Lighting Deep Down Light Round and Square Duo',
      specs: [
        { label: 'Geometries', value: 'Circular & Beveled Square' },
        { label: 'Trim Style', value: 'Architectural Micro-Bevel' },
        { label: 'Delivered Flux', value: '950 lm – 1400 lm' },
        { label: 'Ingress Seal', value: 'IP44 Damp Location Qualified' },
      ],
    },
    {
      id: 'rope-light-warm',
      selectorName: 'Continuous Warm Reel',
      shortLabel: 'Warm Reel',
      swatchColor: '#E6A15C',
      category: 'Continuous Linear Luminescence',
      title: 'Continuous Rope Light • Warm Amber Reel',
      tag: 'UNBROKEN 360° RIBBON',
      description:
        'A continuous, dot-free flexible luminaire encapsulated in optical-grade silicone. Emits perfectly uniform 2700K illumination across long continuous runs with zero visible diode stepping.',
      image: '/images/products/rope-light-primary-warm.png',
      alt: 'Pearl Lighting Continuous Architectural Rope Light Reel',
      specs: [
        { label: 'Diffuser Matrix', value: 'Extruded UV-Proof Silicone' },
        { label: 'Max Spool Run', value: '50 Metres Continuous Feed' },
        { label: 'Color Deviation', value: 'SDCM < 2 MacAdam Ellipse' },
        { label: 'Ingress Proofing', value: 'IP67 Complete Submersion Safe' },
      ],
    },
  ]

  const [activeVariantId, setActiveVariantId] = useState(
    selectedVariantId || 'curve-cob-rose-gold'
  )

  const activeVariant =
    variants.find((v) => v.id === activeVariantId) || variants[0]

  const handleWhatsAppEnquiry = (variant) => {
    const text = `Hi Pearl Lighting! I am reviewing the "${variant.title}" in your Closer Look digital exhibition. Could you please share detailed technical specifications, pricing, and availability?`
    window.open(
      `https://wa.me/918329045712?text=${encodeURIComponent(text)}`,
      '_blank'
    )
  }

  return (
    <section className="closer-look-section" id="closer-look" aria-label="Take a closer look interactive showcase">
      <div className="closer-look-container">
        {/* Section Header */}
        <div className="closer-header">
          <div className="closer-eyebrow">
            <span className="curator-num">02</span>
            <span className="dot">•</span>
            <span className="curator-label">INTERACTIVE SPECIFICATION</span>
          </div>
          <h2 className="closer-title">Take a closer look.</h2>
          <p className="closer-subtitle">
            Switch between authentic finishes, optical baffles, and thermal engineering. Real luminaires photographed in high-fidelity studio light.
          </p>

          {/* Variant Selector Pills Bar */}
          <div className="variant-selectors-rail" role="tablist" aria-label="Product variant options">
            {variants.map((v) => {
              const isActive = v.id === activeVariant.id
              return (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`variant-pill-btn ${isActive ? 'is-selected' : ''}`}
                  onClick={() => setActiveVariantId(v.id)}
                >
                  <span
                    className="variant-swatch-dot"
                    style={{ backgroundColor: v.swatchColor }}
                    aria-hidden="true"
                  />
                  <span className="variant-pill-text">{v.selectorName}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dramatic Visual Presentation Stage */}
        <div className="closer-stage-grid">
          {/* Central Large Product Visual */}
          <div className="closer-visual-centrepiece">
            <div className="visual-stage-backdrop">
              <div
                className="ambient-backdrop-halo"
                style={{ backgroundColor: activeVariant.swatchColor }}
              />
            </div>
            <img
              key={activeVariant.id}
              src={activeVariant.image}
              alt={activeVariant.alt}
              className="closer-product-image animate-fade-in"
            />
            <div className="visual-bottom-caption">
              <span className="caption-tag">{activeVariant.tag}</span>
              <span className="caption-cat">{activeVariant.category}</span>
            </div>
          </div>

          {/* Detailed Specifications & Atelier Actions */}
          <div className="closer-details-sidebar">
            <div className="sidebar-header">
              <span className="sidebar-eyebrow">{activeVariant.category}</span>
              <h3 className="sidebar-product-name">{activeVariant.title}</h3>
              <p className="sidebar-desc">{activeVariant.description}</p>
            </div>

            {/* Technical Specification Matrix */}
            <div className="specs-table-matrix">
              <div className="specs-table-title">ENGINEERING CHARACTERISTICS</div>
              {activeVariant.specs.map((item, idx) => (
                <div key={idx} className="spec-row">
                  <span className="spec-label">{item.label}</span>
                  <span className="spec-value">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Direct Action Triggers */}
            <div className="sidebar-cta-group">
              <button
                type="button"
                className="closer-whatsapp-btn"
                onClick={() => handleWhatsAppEnquiry(activeVariant)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
                </svg>
                <span>Enquire via WhatsApp</span>
              </button>

              <button
                type="button"
                className="closer-project-btn"
                onClick={() => onOpenEnquiry && onOpenEnquiry(activeVariant)}
              >
                <span>Request Project Consultation</span>
                <span className="arrow-glyph">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .closer-look-section {
          background: #050506;
          color: #FAF7F2;
          padding: 100px 32px 110px;
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .closer-look-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        .closer-header {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 60px;
        }

        .closer-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #DFC07A;
        }

        .closer-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(36px, 4.4vw, 58px);
          font-weight: 400;
          line-height: 1.15;
          margin-bottom: 16px;
          color: #FAF7F2;
          letter-spacing: -0.01em;
        }

        .closer-subtitle {
          font-size: clamp(15px, 1.2vw, 17px);
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.6;
          font-weight: 300;
          max-width: 620px;
          margin: 0 auto 36px;
        }

        /* Selector Pills Bar */
        .variant-selectors-rail {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          background: rgba(255, 255, 255, 0.04);
          padding: 8px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          width: fit-content;
          margin: 0 auto;
        }

        .variant-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: transparent;
          border: 1px solid transparent;
          color: rgba(255, 255, 255, 0.75);
          font-size: 13px;
          font-weight: 400;
          padding: 8px 18px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .variant-pill-btn:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.06);
        }

        .variant-pill-btn.is-selected {
          background: #FAF7F2;
          color: #0A0A0A;
          font-weight: 600;
          box-shadow: 0 4px 18px rgba(255, 255, 255, 0.15);
        }

        .variant-swatch-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .variant-pill-btn.is-selected .variant-swatch-dot {
          border-color: rgba(0, 0, 0, 0.3);
        }

        /* Stage Grid */
        .closer-stage-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 50px;
          align-items: center;
          margin-top: 20px;
        }

        /* Central Visual Container */
        .closer-visual-centrepiece {
          position: relative;
          background: #0D0D10;
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          min-height: 540px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
        }

        .visual-stage-backdrop {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .ambient-backdrop-halo {
          width: 380px;
          height: 380px;
          border-radius: 50%;
          opacity: 0.16;
          filter: blur(80px);
          transition: background-color 0.5s ease;
        }

        .closer-product-image {
          position: relative;
          z-index: 2;
          max-width: 90%;
          max-height: 440px;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.85));
          transition: transform 0.4s ease;
        }

        .closer-visual-centrepiece:hover .closer-product-image {
          transform: scale(1.03);
        }

        .animate-fade-in {
          animation: stageFadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes stageFadeIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .visual-bottom-caption {
          position: absolute;
          bottom: 24px;
          left: 32px;
          right: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 3;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
        }

        .caption-tag {
          color: #DFC07A;
        }

        .caption-cat {
          color: rgba(255, 255, 255, 0.45);
        }

        /* Sidebar Details */
        .closer-details-sidebar {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .sidebar-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.18em;
          color: #DFC07A;
          display: block;
          margin-bottom: 8px;
        }

        .sidebar-product-name {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(26px, 2.5vw, 36px);
          font-weight: 500;
          color: #FFFFFF;
          line-height: 1.2;
          margin-bottom: 14px;
        }

        .sidebar-desc {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.72);
          font-weight: 300;
        }

        /* Specs Table */
        .specs-table-matrix {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 20px 24px;
        }

        .specs-table-title {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 16px;
        }

        .spec-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 13px;
        }

        .spec-row:last-child {
          border-bottom: none;
        }

        .spec-label {
          color: rgba(255, 255, 255, 0.55);
        }

        .spec-value {
          color: #FAF7F2;
          font-weight: 500;
          text-align: right;
        }

        /* Actions */
        .sidebar-cta-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .closer-whatsapp-btn {
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
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .closer-whatsapp-btn:hover {
          background: #C69A52;
          color: #12100E;
          border-color: #C69A52;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(198, 154, 82, 0.35);
        }

        .closer-whatsapp-btn:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        .closer-project-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FAF7F2;
          padding: 13px 28px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .closer-project-btn:hover {
          border-color: #DFC07A;
          color: #DFC07A;
          background: rgba(223, 192, 122, 0.06);
        }

        @media (max-width: 992px) {
          .closer-stage-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .closer-visual-centrepiece {
            min-height: 380px;
            padding: 32px;
          }
        }

        @media (max-width: 600px) {
          .closer-look-section {
            padding: 70px 18px 80px;
          }

          .variant-selectors-rail {
            border-radius: 18px;
            padding: 8px;
          }

          .variant-pill-btn {
            font-size: 12px;
            padding: 6px 12px;
          }

          .closer-visual-centrepiece {
            min-height: 320px;
            border-radius: 20px;
          }

          .spec-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .spec-value {
            text-align: left;
          }
        }
      `}</style>
    </section>
  )
}
