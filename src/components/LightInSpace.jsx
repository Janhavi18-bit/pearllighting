import React, { useState } from 'react'

/**
 * LightInSpace - Section 06: Editorial Architectural Study
 * Conforms to exact specifications:
 * - Heading: LIGHTING THAT DEFINES SPACE
 * - Communicates that Pearl Lighting transforms environments rather than simply selling fixtures.
 * - Categories: RESIDENTIAL, COMMERCIAL, ARCHITECTURAL
 * - Visual, minimal, spatial composition using Pearl Lighting's authentic visual atmosphere.
 * - No fake project names or unsupported claims.
 */
export default function LightInSpace() {
  const [activeCategory, setActiveCategory] = useState('RESIDENTIAL')

  const spatialEnvironments = {
    RESIDENTIAL: {
      category: 'RESIDENTIAL',
      title: 'Atmosphere for Living',
      narrative:
        'Warm, indirect illumination that adapts to daily cadence—shaping quiet morning clarity and relaxed evening intimacy.',
      visualImage: '/images/products/rope-light-primary-warm.png',
      visualAlt: 'Residential warm ambient illumination study',
      keyConcept: 'Warm Color Temperature • Diffuse Indirect Glow • Emotional Comfort',
      spatialLayers: [
        { label: 'COVE ILLUMINATION', note: 'Continuous soft perimeter radiance' },
        { label: 'ACCENT FOCUS', note: 'Subtle low-glare architectural downlighting' },
        { label: 'CENTRAL FIXTURE', note: 'Sculptural pendant equilibrium' },
      ],
    },
    COMMERCIAL: {
      category: 'COMMERCIAL',
      title: 'Precision in Workspace',
      narrative:
        'Even, high-efficacy architectural illumination designed for executive suites, galleries, and contemporary workspaces.',
      visualImage: '/images/products/surface-panel-duo.png',
      visualAlt: 'Commercial architectural luminaire composition',
      keyConcept: 'Uniform Spatial Luminance • Low Glare Baffles • Clean Geometry',
      spatialLayers: [
        { label: 'TASK CLARITY', note: 'Engineered optical distribution without harsh shadows' },
        { label: 'FLUSH PROFILE', note: 'Discreet ceiling integration preserving spatial volume' },
        { label: 'ZONAL BALANCE', note: 'Dynamic ambient transitions across meeting zones' },
      ],
    },
    ARCHITECTURAL: {
      category: 'ARCHITECTURAL',
      title: 'Contour & Structural Form',
      narrative:
        'Luminaires that treat architecture as the canvas—grazing textured stone surfaces, revealing structural lines, and framing volume.',
      visualImage: '/images/products/curve-cob-duo.png',
      visualAlt: 'Architectural recessed wall-grazing luminaire study',
      keyConcept: 'Grazing Angles • Deep Recessed Baffles • Spatial Sculpting',
      spatialLayers: [
        { label: 'WALL GRAZING', note: 'Revealing surface textures and vertical boundaries' },
        { label: 'LINEAR CONTOUR', note: 'Guiding circulation and delineating spatial thresholds' },
        { label: 'SHADOW DIALOGUE', note: 'Deliberate contrast accentuating structural depth' },
      ],
    },
  }

  const current = spatialEnvironments[activeCategory]

  return (
    <section className="space-root" id="light-in-space" aria-label="Lighting That Defines Space">
      <div className="container space-container">
        {/* Architectural Coordinate Marker */}
        <div className="space-marker-bar">
          <span className="marker-index">07</span>
          <span className="marker-divider" aria-hidden="true">—</span>
          <span className="marker-name">SPATIAL INTEGRATION • ARCHITECTURAL VOLUMES</span>
        </div>

        {/* Editorial Section Header */}
        <div className="space-header">
          <span className="eyebrow space-eyebrow">SPATIAL INTEGRATION</span>
          <h2 className="heading-section space-heading">
            LIGHT<br />
            <span className="italic-accent">IN</span><br />
            SPACE.
          </h2>
          <p className="space-statement">
            "Lighting is an intrinsic element of architecture. It dictates how spatial volume, materials, and human atmosphere interact."
          </p>

          {/* Interactive Category Tabs */}
          <div className="space-category-nav" role="tablist" aria-label="Spatial Categories">
            {['RESIDENTIAL', 'COMMERCIAL', 'ARCHITECTURAL'].map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`space-nav-pill ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{cat}</span>
                {activeCategory === cat && <span className="pill-dot" aria-hidden="true"></span>}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Architectural Spatial Spread */}
        <div className="space-editorial-spread">
          {/* Left: Atmospheric Architectural Visual Pane */}
          <div className="space-visual-pane">
            <div className="space-stage-frame">
              <span className="space-tag-badge">{current.category} STUDY</span>
              <div className="space-image-wrapper">
                <img
                  src={current.visualImage}
                  alt={current.visualAlt}
                  className="space-luminaire-img"
                  key={current.visualImage}
                  loading="lazy"
                />
              </div>
              <div className="space-stage-vignette" aria-hidden="true"></div>
              <div className="space-light-pool" aria-hidden="true"></div>
            </div>
            <div className="space-stage-caption">
              <span className="caption-dot"></span>
              <span className="caption-text">{current.keyConcept}</span>
            </div>
          </div>

          {/* Right: Architectural Narrative & Spatial Layering */}
          <div className="space-narrative-pane">
            <span className="space-eyebrow-small">ENVIRONMENTAL PHILOSOPHY</span>
            <h3 className="space-subheading">{current.title}</h3>
            <p className="space-body-text">{current.narrative}</p>

            <div className="space-layers-group">
              <span className="layers-header-label">ARCHITECTURAL LAYERS</span>
              <div className="layers-list">
                {current.spatialLayers.map((layer, idx) => (
                  <div key={layer.label} className="layer-row">
                    <span className="layer-num">0{idx + 1}</span>
                    <div className="layer-content">
                      <h4 className="layer-title">{layer.label}</h4>
                      <p className="layer-note">{layer.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .space-root {
          position: relative;
          padding: 8rem 0 9rem;
          background: var(--bg-cream, #FAF8F3);
          border-top: 1px solid rgba(120, 100, 70, 0.16);
          border-bottom: 1px solid rgba(120, 100, 70, 0.16);
          width: 100%;
          overflow: hidden;
          color: var(--primary-text, #171717);
        }

        @media (min-width: 1024px) {
          .space-root {
            padding: 10.5rem 0 11.5rem;
          }
        }

        .space-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .space-marker-bar {
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

        /* ── Header ── */
        .space-header {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 5rem;
        }

        .space-eyebrow {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent-gold, #C69A52);
          margin-bottom: 1.25rem;
        }

        .space-heading {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 4.4vw, 3.8rem);
          font-weight: 300;
          letter-spacing: 0.05em;
          line-height: 1.1;
          color: var(--primary-text, #171717);
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .space-statement {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1.05rem, 1.5vw, 1.25rem);
          font-weight: 300;
          color: var(--secondary-text, #5E5A53);
          line-height: 1.6;
          margin-bottom: 3rem;
        }

        /* ── Category Tabs ── */
        .space-category-nav {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(120, 100, 70, 0.18);
          border-radius: 40px;
          padding: 0.4rem;
          box-shadow: 0 4px 18px rgba(120, 100, 70, 0.06);
        }

        .space-nav-pill {
          background: transparent;
          border: none;
          padding: 0.65rem 1.75rem;
          border-radius: 30px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          font-weight: 500;
          color: var(--secondary-text, #5E5A53);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .space-nav-pill:hover {
          color: var(--primary-text, #171717);
        }

        .space-nav-pill.is-active {
          background: var(--charcoal, #171717);
          color: #FAF9F5;
          box-shadow: 0 4px 14px rgba(23, 23, 23, 0.18);
        }

        .pill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-gold, #C69A52);
        }

        /* ── Editorial Spread ── */
        .space-editorial-spread {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (min-width: 992px) {
          .space-editorial-spread {
            grid-template-columns: 1.15fr 1fr;
            gap: 5.5rem;
          }
        }

        /* Visual Pane */
        .space-visual-pane {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .space-stage-frame {
          position: relative;
          width: 100%;
          height: clamp(340px, 42vw, 480px);
          background: radial-gradient(circle at 50% 40%, #FFFFFF 0%, #FAF8F3 60%, #EFE9DE 100%);
          border: 1px solid rgba(120, 100, 70, 0.2);
          border-radius: 3px;
          overflow: hidden;
          box-shadow: 0 20px 48px -12px rgba(120, 100, 70, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .space-tag-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          color: var(--accent-gold, #C69A52);
          text-transform: uppercase;
          z-index: 3;
          background: rgba(255, 255, 255, 0.9);
          padding: 0.35rem 0.85rem;
          border-radius: 2px;
          border: 1px solid rgba(120, 100, 70, 0.16);
        }

        .space-image-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          position: relative;
          z-index: 2;
        }

        .space-luminaire-img {
          max-width: 85%;
          max-height: 85%;
          object-fit: contain;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .space-stage-frame:hover .space-luminaire-img {
          transform: scale(1.04);
        }

        .space-stage-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 60px rgba(239, 233, 222, 0.6);
        }

        .space-light-pool {
          position: absolute;
          bottom: 15%;
          width: 70%;
          height: 100px;
          background: radial-gradient(ellipse at center, rgba(198, 154, 82, 0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        .space-stage-caption {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding-left: 0.5rem;
        }

        .caption-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-gold, #C69A52);
        }

        .caption-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.76rem;
          color: var(--secondary-text, #5E5A53);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* Narrative Pane */
        .space-narrative-pane {
          display: flex;
          flex-direction: column;
        }

        .space-eyebrow-small {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          letter-spacing: 0.28em;
          color: var(--accent-gold, #C69A52);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .space-subheading {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 300;
          letter-spacing: 0.04em;
          color: var(--primary-text, #171717);
          line-height: 1.15;
          margin-bottom: 1.5rem;
        }

        .space-body-text {
          font-family: var(--font-sans);
          font-size: clamp(0.95rem, 1.3vw, 1.05rem);
          font-weight: 300;
          line-height: 1.75;
          color: var(--secondary-text, #5E5A53);
          margin-bottom: 3rem;
          max-width: 520px;
        }

        /* Architectural Layers */
        .space-layers-group {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          border-top: 1px solid rgba(120, 100, 70, 0.16);
          padding-top: 2rem;
        }

        .layers-header-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          color: var(--accent-gold, #C69A52);
          text-transform: uppercase;
          font-weight: 500;
        }

        .layers-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .layer-row {
          display: flex;
          gap: 1.25rem;
          align-items: baseline;
        }

        .layer-num {
          font-family: var(--font-mono, monospace);
          font-size: 0.82rem;
          color: var(--accent-gold, #C69A52);
          font-weight: 500;
        }

        .layer-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .layer-title {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: var(--primary-text, #171717);
          margin: 0;
        }

        .layer-note {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--secondary-text, #5E5A53);
          line-height: 1.55;
          margin: 0;
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .space-root {
            padding: 5rem 0 5.5rem;
          }
          .space-container {
            padding: 0 1.25rem;
          }
          .space-header {
            margin-bottom: 3.5rem;
          }
          .space-category-nav {
            flex-wrap: wrap;
            justify-content: center;
          }
          .space-nav-pill {
            padding: 0.5rem 1.25rem;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </section>
  )
}
