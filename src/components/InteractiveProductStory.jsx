import React, { useState, useEffect, useRef } from 'react'
import { productsData } from '../data/productsData'

/**
 * SECTION 2: INTERACTIVE PRODUCT STORY
 * Apple-grade sticky scroll storytelling meets Serip warm alabaster editorial.
 * Product: Curve COB Architectural Recessed Series with interactive anatomy hotspots.
 */
export default function InteractiveProductStory({ onOpenProduct, onEnquire }) {
  const [activeScene, setActiveScene] = useState(0)
  const containerRef = useRef(null)

  const curveCob = productsData.find((p) => p.id === 'curve-cob')

  const scenes = [
    {
      id: 'heatsink',
      number: '01',
      tag: 'THERMAL DISCIPLINE',
      title: 'Radial Convection Heatsink',
      lead: 'A sculpted rose gold aluminium body engineered for silent, passive thermal dissipation.',
      body: 'Every radial fin is precisely spaced to draw heat upward and outward from the high-density COB emitter, ensuring sustained chromatic fidelity and over 50,000 hours of continuous lumen maintenance.',
      specs: [
        { label: 'ALLOY', value: '6063-T5 Extruded Aluminium' },
        { label: 'FINISH', value: 'Champagne Rose Gold Anodized' },
        { label: 'THERMAL', value: 'Passive Airflow Vectoring' },
      ],
      image: '/images/products/curve-cob-rose-gold.png',
      alt: 'Curve COB Rose Gold Heatsink and Reflector Detail',
      callout: 'Radial Heatsink Fins (6063-T5)',
      hotspotPos: { top: '35%', left: '42%' },
    },
    {
      id: 'baffle',
      number: '02',
      tag: 'OPTICAL COMFORT',
      title: 'The Glare-Free Curved Baffle',
      lead: 'A seamless radiused contour designed to soften aperture contrast against ceiling planes.',
      body: 'Standard downlights create harsh, eye-fatiguing glare circles. The Curve COB features a deep optical cutoff and sweeping curved transitional rim that washes light outward while hiding the luminous source from normal sightlines.',
      specs: [
        { label: 'GLARE INDEX', value: 'UGR < 16 Glare-Controlled' },
        { label: 'CUTOFF', value: 'Deep 40° Shielding Angle' },
        { label: 'DIFFUSION', value: 'Specular Nano-Faceted Optic' },
      ],
      image: '/images/products/curve-cob-white-recessed.png',
      alt: 'Curve COB White Recessed Architectural Contour',
      callout: 'Recessed Anti-Glare Baffle (UGR < 16)',
      hotspotPos: { top: '55%', left: '50%' },
    },
    {
      id: 'equilibrium',
      number: '03',
      tag: 'SPATIAL EQUILIBRIUM',
      title: 'Architectural Finish Versatility',
      lead: 'Curated finishes calibrated to harmonize with natural stone, warm wood, and fine plaster.',
      body: 'Available in architectural matte white for understated flush concealment, or brushed metallic warm accents for rich textural presence. Engineered to meet the exacting standards of luxury residential and hospitality architects.',
      specs: [
        { label: 'CCT MODES', value: '2700K / 3000K / 4000K' },
        { label: 'CRI FIDELITY', value: 'Ra ≥ 93 Vibrant Spectrum' },
        { label: 'DRIVER', value: 'Phase / 0-10V / DALI Dimming' },
      ],
      image: '/images/products/curve-cob-duo.png',
      alt: 'Curve COB Architectural Finish Duo Presentation',
      callout: 'Coordinated Series Finishes (White & Gold)',
      hotspotPos: { top: '48%', left: '60%' },
    },
  ]

  // Track scroll position to update scenes when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalHeight = rect.height - window.innerHeight
      if (totalHeight <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / totalHeight))
      const sceneIndex = Math.min(scenes.length - 1, Math.floor(progress * scenes.length))
      setActiveScene(sceneIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scenes.length])

  const handleSceneSelect = (idx) => {
    setActiveScene(idx)
  }

  const handleOpenDetail = () => {
    if (onOpenProduct && curveCob) {
      onOpenProduct(curveCob)
    }
  }

  const current = scenes[activeScene]

  return (
    <section
      className="interactive-story-root"
      id="interactive-story"
      ref={containerRef}
      aria-label="Interactive Product Story"
    >
      <div className="container story-inner">
        {/* Section Header */}
        <header className="story-section-header">
          <div className="section-marker-rail">
            <span className="section-marker-num">02</span>
            <span className="section-marker-dot">•</span>
            <span className="section-marker-title">PRODUCT INNOVATION & ANATOMY</span>
          </div>

          <div className="story-headline-lockup">
            <h2 className="story-monumental-heading">
              THE ANATOMY OF<br />
              <span className="heading-italic-accent">QUIET PRECISION.</span>
            </h2>
            <p className="story-header-desc">
              Explore the engineering and craftsmanship inside the Curve COB—where thermal discipline meets glare-free architectural luminescence.
            </p>
          </div>

          {/* Interactive Scene Step Selector */}
          <div className="scene-step-bar" role="tablist" aria-label="Product Story Scenes">
            {scenes.map((sc, idx) => (
              <button
                key={sc.id}
                type="button"
                role="tab"
                aria-selected={activeScene === idx}
                className={`scene-step-pill ${activeScene === idx ? 'is-active' : ''}`}
                onClick={() => handleSceneSelect(idx)}
              >
                <span className="pill-idx">{sc.number}</span>
                <span className="pill-tag">{sc.tag}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Sticky Theater Stage */}
        <div className="story-stage-layout">
          {/* Left Column: Scene Editorial Story */}
          <div className="story-narrative-column">
            <div className="narrative-card">
              <div className="narrative-meta-rail">
                <span className="narrative-chapter-tag">INSPECTION {current.number} OF 03</span>
                <span className="narrative-tag-gold">{current.tag}</span>
              </div>

              <h3 className="narrative-scene-title">{current.title}</h3>
              <p className="narrative-lead-quote">"{current.lead}"</p>
              <p className="narrative-body">{current.body}</p>

              {/* Technical Specifications Matrix */}
              <div className="narrative-specs-grid">
                {current.specs.map((item) => (
                  <div key={item.label} className="spec-tile">
                    <span className="spec-tile-label">{item.label}</span>
                    <span className="spec-tile-val">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="narrative-action-row">
                <button
                  type="button"
                  className="narrative-explore-btn"
                  onClick={handleOpenDetail}
                  aria-label="View Full Curve COB Specifications"
                >
                  <span>Explore Full Specifications</span>
                  <span className="action-arrow">↗</span>
                </button>

                <a
                  href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20would%20like%20to%20enquire%20about%20the%20Curve%20COB%20Architectural%20Series."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="narrative-enquire-link"
                >
                  Enquire on WhatsApp ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Product Stage with Smooth Crossfade Visual & Hotspots */}
          <div className="story-sticky-visual-column">
            <div className="sticky-visual-stage">
              {/* Natural Warm Background Halo */}
              <div className="stage-warm-aura" aria-hidden="true"></div>

              {/* High-Resolution Large Product Imagery */}
              <div className="visual-monolith-canvas">
                {scenes.map((sc, idx) => (
                  <div
                    key={sc.id}
                    className={`visual-stage-slide ${activeScene === idx ? 'is-visible' : ''}`}
                    aria-hidden={activeScene !== idx}
                  >
                    <img
                      src={sc.image}
                      alt={sc.alt}
                      className="stage-product-img"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                    <div className="stage-ground-shadow" aria-hidden="true"></div>

                    {/* Interactive Engineering Callout Badge */}
                    <div className="stage-callout-pill">
                      <span className="callout-sparkle">✦</span>
                      <span className="callout-label">{sc.callout}</span>
                    </div>
                  </div>
                ))}

                {/* Interactive Anatomy Hotspots */}
                <div className="interactive-hotspots-layer" aria-label="Interactive Inspection Points">
                  {scenes.map((sc, idx) => (
                    <button
                      key={`hotspot-${sc.id}`}
                      type="button"
                      className={`anatomy-hotspot-pin ${activeScene === idx ? 'is-active' : ''}`}
                      style={{
                        top: sc.hotspotPos.top,
                        left: sc.hotspotPos.left,
                      }}
                      onClick={() => handleSceneSelect(idx)}
                      title={`Inspect ${sc.title}`}
                      aria-label={`Inspect ${sc.title}`}
                    >
                      <span className="pin-pulse" aria-hidden="true"></span>
                      <span className="pin-core">0{idx + 1}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Interactive Pagination Dots */}
              <div className="stage-dots-control">
                {scenes.map((sc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`stage-dot ${activeScene === idx ? 'active' : ''}`}
                    onClick={() => handleSceneSelect(idx)}
                    aria-label={`Go to scene ${idx + 1}: ${sc.tag}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .interactive-story-root {
          position: relative;
          background: #F7F4EE;
          color: var(--text-primary-dark);
          padding: 6.5rem 0 7rem;
          border-top: 1px solid rgba(24, 23, 21, 0.06);
          border-bottom: 1px solid rgba(24, 23, 21, 0.06);
        }

        .story-section-header {
          margin-bottom: 3.5rem;
        }

        .story-headline-lockup {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 2.25rem;
        }

        @media (min-width: 900px) {
          .story-headline-lockup {
            grid-template-columns: 1.2fr 1fr;
            align-items: flex-end;
          }
        }

        .story-monumental-heading {
          font-family: var(--font-sans);
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #181715;
        }

        .heading-italic-accent {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          color: var(--accent-gold);
        }

        .story-header-desc {
          font-size: clamp(0.95rem, 1.25vw, 1.1rem);
          line-height: 1.65;
          color: var(--text-secondary-dark);
          font-weight: 300;
        }

        /* Step selector bar */
        .scene-step-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          border-top: 1px solid rgba(24, 23, 21, 0.08);
        }

        .scene-step-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1.25rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(24, 23, 21, 0.1);
          color: var(--text-secondary-dark);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .scene-step-pill:hover {
          background: #FFFFFF;
          color: #181715;
          border-color: rgba(184, 147, 68, 0.4);
        }

        .scene-step-pill.is-active {
          background: #181715;
          color: #FAF8F5;
          border-color: #181715;
          box-shadow: 0 4px 18px rgba(24, 23, 21, 0.15);
        }

        .pill-idx {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--accent-gold);
          font-weight: 600;
        }

        .scene-step-pill.is-active .pill-idx {
          color: #E2BC6A;
        }

        /* Stage layout */
        .story-stage-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (min-width: 960px) {
          .story-stage-layout {
            grid-template-columns: 1fr 1.15fr;
            gap: 4.5rem;
          }
        }

        /* Narrative Column */
        .narrative-card {
          background: #FFFFFF;
          padding: clamp(1.75rem, 3.5vw, 2.75rem);
          border-radius: 20px;
          box-shadow: var(--shadow-medium);
          border: 1px solid rgba(24, 23, 21, 0.06);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .narrative-meta-rail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .narrative-chapter-tag {
          font-family: var(--font-mono);
          color: var(--text-muted-dark);
          font-weight: 600;
        }

        .narrative-tag-gold {
          color: var(--accent-gold);
          font-weight: 600;
        }

        .narrative-scene-title {
          font-family: var(--font-sans);
          font-size: clamp(1.5rem, 2.5vw, 2.1rem);
          font-weight: 600;
          line-height: 1.2;
          color: #181715;
        }

        .narrative-lead-quote {
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: 1.15rem;
          line-height: 1.5;
          color: #4A443B;
          border-left: 2px solid var(--accent-gold);
          padding-left: 1rem;
        }

        .narrative-body {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary-dark);
          font-weight: 300;
        }

        /* Specs grid */
        .narrative-specs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
          padding: 1.25rem 0;
          border-top: 1px solid rgba(24, 23, 21, 0.08);
          border-bottom: 1px solid rgba(24, 23, 21, 0.08);
        }

        @media (min-width: 480px) {
          .narrative-specs-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .spec-tile {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .spec-tile-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: var(--accent-gold);
          font-weight: 600;
          text-transform: uppercase;
        }

        .spec-tile-val {
          font-size: 0.8rem;
          font-weight: 500;
          color: #181715;
          line-height: 1.35;
        }

        /* Action row */
        .narrative-action-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 0.5rem;
        }

        .narrative-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #181715;
          color: #FAF8F5;
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          transition: all 0.3s ease;
        }

        .narrative-explore-btn:hover {
          background: var(--accent-gold);
          color: #181715;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(184, 147, 68, 0.35);
        }

        .action-arrow {
          font-size: 0.95rem;
        }

        .narrative-enquire-link {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-gold);
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .narrative-enquire-link:hover {
          color: #181715;
        }

        /* Sticky Visual Column */
        .story-sticky-visual-column {
          position: relative;
        }

        @media (min-width: 960px) {
          .story-sticky-visual-column {
            position: sticky;
            top: calc(var(--header-height) + 2rem);
          }
        }

        .sticky-visual-stage {
          position: relative;
          background: #FFFFFF;
          border-radius: 24px;
          padding: clamp(1.5rem, 4vw, 3rem);
          box-shadow: var(--shadow-monumental);
          border: 1px solid rgba(24, 23, 21, 0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 480px;
          overflow: hidden;
        }

        .stage-warm-aura {
          position: absolute;
          inset: 15%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(226, 188, 106, 0.22) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }

        .visual-monolith-canvas {
          position: relative;
          width: 100%;
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visual-stage-slide {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.96);
          pointer-events: none;
          transition: opacity 0.5s var(--ease-spring), transform 0.5s var(--ease-spring);
        }

        .visual-stage-slide.is-visible {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        .stage-product-img {
          max-width: 90%;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 16px 30px rgba(24, 20, 15, 0.16));
          user-select: none;
        }

        .stage-ground-shadow {
          width: 70%;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.18) 0%, transparent 70%);
          filter: blur(8px);
          margin-top: 1rem;
        }

        .stage-callout-pill {
          position: absolute;
          bottom: 12px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1rem;
          background: rgba(24, 23, 21, 0.88);
          backdrop-filter: blur(10px);
          color: #FAF8F5;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          border: 1px solid rgba(197, 160, 89, 0.3);
        }

        .callout-sparkle {
          color: var(--accent-gold);
          font-size: 0.7rem;
        }

        /* Interactive Anatomy Hotspots */
        .interactive-hotspots-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .anatomy-hotspot-pin {
          position: absolute;
          width: 28px;
          height: 28px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: #181715;
          border: 1px solid var(--accent-gold);
          color: #FAF8F5;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          pointer-events: auto;
          transition: transform 0.25s ease, background 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        }

        .pin-core {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--accent-gold);
        }

        .anatomy-hotspot-pin:hover,
        .anatomy-hotspot-pin.is-active {
          transform: translate(-50%, -50%) scale(1.15);
          background: var(--accent-gold);
          border-color: #FFFFFF;
        }

        .anatomy-hotspot-pin:hover .pin-core,
        .anatomy-hotspot-pin.is-active .pin-core {
          color: #181715;
        }

        .pin-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--accent-gold);
          opacity: 0.6;
          animation: hotspotPulse 2.5s infinite ease-in-out;
        }

        @keyframes hotspotPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.4); opacity: 0; }
        }

        .stage-dots-control {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-top: 1.5rem;
          z-index: 2;
        }

        .stage-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(24, 23, 21, 0.2);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .stage-dot.active {
          width: 24px;
          border-radius: 4px;
          background: var(--accent-gold);
        }

        @media (max-width: 768px) {
          .interactive-story-root {
            padding: 4.5rem 0 5rem;
          }

          .sticky-visual-stage {
            min-height: 380px;
            padding: 1.5rem;
          }

          .stage-product-img {
            max-height: 260px;
          }

          .narrative-action-row {
            flex-direction: column;
            align-items: stretch;
          }

          .narrative-explore-btn {
            justify-content: center;
          }

          .narrative-enquire-link {
            text-align: center;
          }
        }
      `}</style>
    </section>
  )
}
