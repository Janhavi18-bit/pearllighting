import React, { useState } from 'react'

export default function Scene5ArchitecturalCollection({ onSelectProductForSpotlight }) {
  const [activeCategory, setActiveCategory] = useState(0)
  const [showQuickDirectory, setShowQuickDirectory] = useState(false)

  const architecturalChapters = [
    {
      id: 'cat-recessed',
      num: '01',
      tabLabel: 'Recessed & Darklight',
      title: 'Deep Downlight & Darklight Cutoff',
      subtitle: 'Concealed light sources designed to keep the ceiling plane quiet while projecting high-comfort task illumination onto floors and artworks.',
      themeBg: '#0E0D0C',
      primaryImg: '/images/products/deep-downlight-round-black-studio.png',
      secondaryImg: '/images/products/deep-downlight-square-white.png',
      altPrimary: 'Pearl Deep Downlight Round Studio Black Luminaire',
      altSecondary: 'Pearl Deep Downlight Square White Plaster-In',
      specsList: [
        'Stepped 40° anti-glare darklight cone (UGR < 16)',
        'Available in round studio obsidian and square plaster-in formats',
        'High-CRI 95+ light engine with 2-step MacAdam color consistency',
      ],
      whatsappRef: 'Deep Downlight Darklight Series',
      spotlightTarget: 'deep-downlight-studio',
    },
    {
      id: 'cat-cob',
      num: '02',
      tabLabel: 'COB Thermal Sculpture',
      title: 'Curve & Moveable COB Engineering',
      subtitle: 'Exposed radial heat exchangers that transform thermal dissipation into a sculptural architectural feature.',
      themeBg: '#131210',
      primaryImg: '/images/products/curve-cob-rose-gold.png',
      secondaryImg: '/images/products/moveable-cob-duo.png',
      altPrimary: 'Pearl Curve COB Rose Gold Heatsink',
      altSecondary: 'Pearl Moveable Gimbal Dual Luminaire',
      specsList: [
        'Aviation aluminium radial convection cooling fins',
        'Field-interchangeable 15°, 24°, and 36° precision reflectors',
        '355° rotational and 30° tilt dual-axis gimbal adjustment',
      ],
      whatsappRef: 'Curve COB & Moveable Gimbal Series',
      spotlightTarget: 'curve-cob-rose-gold',
    },
    {
      id: 'cat-linear',
      num: '03',
      tabLabel: 'Linear Luminescence',
      title: 'Architectural Rope & Contour Silicone',
      subtitle: 'Dot-free flexible luminaire spools engineered to trace architectural coves, ceiling contours, and outdoor perimeters.',
      themeBg: '#11100F',
      primaryImg: '/images/products/rope-light-primary-warm.png',
      secondaryImg: '/images/products/rope-light-blue-reel.png',
      altPrimary: 'Pearl Rope Light Continuous Warm Amber Reel',
      altSecondary: 'Pearl Rope Light Vibrant Blue Contour Reel',
      specsList: [
        'Pure extruded optical silicone with zero visible LED dots',
        '50-metre continuous run capability with uniform lux drop-off',
        'IP67 all-weather protection suitable for facades and wet areas',
      ],
      whatsappRef: 'Architectural Continuous Rope Light Series',
      spotlightTarget: 'rope-light-warm',
    },
    {
      id: 'cat-surface',
      num: '04',
      tabLabel: 'Surface & Slim Panels',
      title: 'Surface Cylinders & Ultra-Slim Discs',
      subtitle: 'Low-profile and surface-mounted luminaire formats for monolithic concrete slabs and exposed ceilings.',
      themeBg: '#151412',
      primaryImg: '/images/products/surface-panel-round-black.png',
      secondaryImg: '/images/products/slim-panel-round.png',
      altPrimary: 'Pearl Surface Cylinder Luminaire in Matte Black',
      altSecondary: 'Pearl Ultra-Slim Panel Ambient Disc',
      specsList: [
        'Surface architectural mounting where ceiling cutouts are impossible',
        'Micro-bezel matte black and pure white powder coat finishes',
        'Diffuse high-efficiency ambient illumination with wide beam spread',
      ],
      whatsappRef: 'Surface Panel & Slim Disc Series',
      spotlightTarget: 'curve-cob-rose-gold',
    },
  ]

  const quickDirectoryData = [
    { sku: 'PL-DD-01', name: 'Deep Downlight Round Studio', finish: 'Matte Obsidian', optics: 'Darklight 36°', img: '/images/products/deep-downlight-round-black-studio.png' },
    { sku: 'PL-DD-02', name: 'Deep Downlight Square', finish: 'Plaster White', optics: 'Recessed 40°', img: '/images/products/deep-downlight-square-white.png' },
    { sku: 'PL-CC-01', name: 'Curve COB Rose Gold', finish: 'Anodized Rose Gold', optics: 'Specular 36°', img: '/images/products/curve-cob-rose-gold.png' },
    { sku: 'PL-CC-02', name: 'Curve COB Flush White', finish: 'Concealed White', optics: 'Curved Baffle', img: '/images/products/curve-cob-white-recessed.png' },
    { sku: 'PL-MC-01', name: 'Moveable Gimbal COB', finish: 'Dual Finish', optics: 'Gimbal Articulated', img: '/images/products/moveable-cob-duo.png' },
    { sku: 'PL-RL-01', name: 'Rope Light Warm Amber', finish: 'Diffused Silicone', optics: '360° Dot-Free', img: '/images/products/rope-light-primary-warm.png' },
    { sku: 'PL-SP-01', name: 'Surface Panel Cylinder', finish: 'Powder Black', optics: 'Direct Downlight', img: '/images/products/surface-panel-round-black.png' },
    { sku: 'PL-SL-01', name: 'Slim Panel Disc', finish: 'Architectural White', optics: 'Diffused 120°', img: '/images/products/slim-panel-round.png' },
  ]

  const current = architecturalChapters[activeCategory]

  const handleWhatsAppChapter = (chapter) => {
    const text = `Hi Pearl Lighting! I am interested in specifying the ${chapter.whatsappRef}. Could you please share photometric files, spec sheets, and commercial pricing?`
    window.open(`https://wa.me/918329045712?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="scene5-arch-root" id="scene-architectural" aria-label="Scene 5 — Architectural Collection">
      {/* Category Navigation Bar */}
      <div className="arch-nav-strip">
        <div className="arch-nav-inner">
          <div className="arch-category-kicker">
            <span className="gold-sparkle">✦</span>
            <span>ARCHITECTURAL PORTFOLIO IN FOUR CHAPTERS</span>
          </div>

          <div className="arch-tabs-rail" role="tablist">
            {architecturalChapters.map((cat, idx) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === idx}
                className={`arch-tab-pill ${activeCategory === idx ? 'pill-active' : ''}`}
                onClick={() => setActiveCategory(idx)}
              >
                <span className="tab-idx">{cat.num}</span>
                <span className="tab-title">{cat.tabLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chapter Showcase Stage */}
      <div className="arch-stage-wrap" style={{ backgroundColor: current.themeBg }}>
        <div className="arch-stage-container">
          {/* Alternating Image Scale Composition */}
          <div className="arch-visual-spread">
            {/* Monumental Hero Luminaire Frame */}
            <div className="arch-hero-frame">
              <img
                key={current.primaryImg}
                src={current.primaryImg}
                alt={current.altPrimary}
                className="arch-hero-image"
              />
              <div className="arch-ambient-glow" aria-hidden="true"></div>
              <div className="arch-frame-tag">
                <span>{current.tabLabel}</span>
              </div>
            </div>

            {/* Staggered Accent Finish Frame */}
            <div className="arch-accent-frame">
              <img
                key={current.secondaryImg}
                src={current.secondaryImg}
                alt={current.altSecondary}
                className="arch-accent-image"
              />
              <span className="arch-accent-label">Alternate Finish Specification</span>
            </div>
          </div>

          {/* Chapter Narrative & Architecture Breakdown */}
          <div className="arch-narrative-col">
            <div className="arch-chapter-marker">
              <span className="marker-num">{current.num}</span>
              <span className="marker-divider">/</span>
              <span className="marker-cat">{current.tabLabel}</span>
            </div>

            <h3 className="arch-chapter-title">{current.title}</h3>
            <p className="arch-chapter-lead">{current.subtitle}</p>

            {/* Architectural Features Matrix */}
            <div className="arch-features-box">
              <span className="feat-box-title">ENGINEERING CHARACTERISTICS</span>
              {current.specsList.map((item, i) => (
                <div key={i} className="feat-row">
                  <span className="feat-dot">✦</span>
                  <span className="feat-desc">{item}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="arch-action-row">
              <button
                type="button"
                className="arch-wa-btn"
                onClick={() => handleWhatsAppChapter(current)}
              >
                <span>Enquire Chapter Specs</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17l9.2-9.2M17 17V8h-9"/>
                </svg>
              </button>

              <button
                type="button"
                className="arch-spotlight-jump-btn"
                onClick={() => {
                  if (onSelectProductForSpotlight) {
                    onSelectProductForSpotlight(current.spotlightTarget)
                  }
                  const el = document.querySelector('#scene-spotlight')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Inspect in Spotlight →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Non-Dominating Quick Luminaire Directory */}
      <div className="arch-directory-drawer">
        <div className="directory-container">
          <div className="directory-header-bar">
            <div>
              <span className="dir-title">ARCHITECTURAL SPECIFICATION SCHEDULE</span>
              <span className="dir-sub">Quick photometric lookup for project tender schedules (8 Luminaire Profiles)</span>
            </div>
            <button
              type="button"
              className="dir-toggle-btn"
              onClick={() => setShowQuickDirectory(!showQuickDirectory)}
              aria-expanded={showQuickDirectory}
            >
              <span>{showQuickDirectory ? 'Hide Schedule' : 'View Schedule'}</span>
              <span>{showQuickDirectory ? '↑' : '↓'}</span>
            </button>
          </div>

          {showQuickDirectory && (
            <div className="directory-grid-layout">
              {quickDirectoryData.map((item) => (
                <div key={item.sku} className="dir-card">
                  <img src={item.img} alt={item.name} className="dir-thumb" />
                  <div className="dir-meta">
                    <span className="dir-sku">{item.sku}</span>
                    <h4 className="dir-name">{item.name}</h4>
                    <span className="dir-fin">{item.finish} • {item.optics}</span>
                  </div>
                  <a
                    href={`https://wa.me/918329045712?text=${encodeURIComponent(`Hi Pearl Lighting! Please share specification sheet on ${item.sku} ${item.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dir-wa-link"
                  >
                    Enquire ↗
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .scene5-arch-root {
          position: relative;
          width: 100%;
          background: #0E0D0C;
          color: #FAF7F2;
        }

        /* Nav Strip */
        .arch-nav-strip {
          background: #080807;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 22px 40px;
          position: sticky;
          top: 68px;
          z-index: 50;
          backdrop-filter: blur(16px);
        }

        .arch-nav-inner {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
        }

        .arch-category-kicker {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
          color: rgba(250, 247, 242, 0.6);
        }

        .gold-sparkle {
          color: #DFC07A;
        }

        .arch-tabs-rail {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 2px;
        }

        .arch-tab-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(250, 247, 242, 0.7);
          padding: 8px 18px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
          font-size: 12.5px;
        }

        .arch-tab-pill:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
        }

        .arch-tab-pill.pill-active {
          background: #DFC07A;
          color: #0A0A0A;
          border-color: #DFC07A;
          font-weight: 600;
        }

        .tab-idx {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          opacity: 0.8;
        }

        /* Showcase Stage */
        .arch-stage-wrap {
          padding: 90px 40px 100px;
          transition: background-color 0.4s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .arch-stage-container {
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        /* Visual Spread with alternating scales */
        .arch-visual-spread {
          display: flex;
          align-items: flex-end;
          gap: 24px;
        }

        .arch-hero-frame {
          position: relative;
          flex: 1.3;
          background: #030304;
          border-radius: 28px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
        }

        .arch-hero-image {
          width: 85%;
          height: 85%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 25px 45px rgba(0, 0, 0, 0.9));
          transition: transform 0.5s ease;
        }

        .arch-hero-frame:hover .arch-hero-image {
          transform: scale(1.03);
        }

        .arch-ambient-glow {
          position: absolute;
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(223, 192, 122, 0.16) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }

        .arch-frame-tag {
          position: absolute;
          top: 24px;
          left: 24px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: #DFC07A;
          z-index: 3;
        }

        .arch-accent-frame {
          position: relative;
          flex: 0.7;
          background: #0D0C0B;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          margin-bottom: 24px;
        }

        .arch-accent-image {
          width: 80%;
          height: 80%;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7));
        }

        .arch-accent-label {
          position: absolute;
          bottom: 12px;
          left: 12px;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: rgba(250, 247, 242, 0.45);
        }

        /* Narrative Column */
        .arch-narrative-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .arch-chapter-marker {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
        }

        .marker-num {
          color: #DFC07A;
          font-weight: 600;
        }

        .marker-divider {
          color: rgba(255, 255, 255, 0.2);
        }

        .marker-cat {
          color: rgba(250, 247, 242, 0.55);
        }

        .arch-chapter-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(30px, 3.2vw, 46px);
          font-weight: 400;
          line-height: 1.15;
          color: #FAF7F2;
          letter-spacing: -0.01em;
        }

        .arch-chapter-lead {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(250, 247, 242, 0.7);
          font-weight: 300;
        }

        .arch-features-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feat-box-title {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #DFC07A;
          margin-bottom: 4px;
        }

        .feat-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(250, 247, 242, 0.82);
        }

        .feat-dot {
          color: #DFC07A;
          font-size: 10px;
          margin-top: 4px;
        }

        .arch-action-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-top: 6px;
        }

        .arch-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #DFC07A;
          color: #0A0A0A;
          border: none;
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .arch-wa-btn:hover {
          background: #FAF7F2;
          transform: translateY(-2px);
        }

        .arch-spotlight-jump-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FAF7F2;
          padding: 11px 22px;
          border-radius: 999px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .arch-spotlight-jump-btn:hover {
          border-color: #DFC07A;
          color: #DFC07A;
        }

        /* Drawer Schedule */
        .arch-directory-drawer {
          background: #080807;
          padding: 24px 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .directory-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        .directory-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
        }

        .dir-title {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.16em;
          color: #FAF7F2;
          display: block;
          font-weight: 600;
        }

        .dir-sub {
          font-size: 12px;
          color: rgba(250, 247, 242, 0.5);
          margin-top: 2px;
        }

        .dir-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #FAF7F2;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dir-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .directory-grid-layout {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 16px;
        }

        .dir-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .dir-thumb {
          width: 50px;
          height: 50px;
          object-fit: contain;
          background: #000;
          border-radius: 8px;
          padding: 4px;
        }

        .dir-meta {
          flex: 1;
        }

        .dir-sku {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: #DFC07A;
          display: block;
        }

        .dir-name {
          font-size: 13px;
          color: #FAF7F2;
          font-weight: 500;
          margin: 2px 0;
        }

        .dir-fin {
          font-size: 11px;
          color: rgba(250, 247, 242, 0.5);
          display: block;
        }

        .dir-wa-link {
          font-size: 11px;
          font-weight: 600;
          color: #DFC07A;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(223, 192, 122, 0.1);
        }

        @media (max-width: 992px) {
          .arch-stage-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .arch-visual-spread {
            flex-direction: column;
            align-items: stretch;
          }
          .arch-accent-frame {
            margin-bottom: 0;
            aspect-ratio: 16 / 9;
          }
          .arch-hero-frame {
            min-height: 340px;
          }
        }

        @media (max-width: 600px) {
          .arch-nav-strip {
            padding: 16px 20px;
            top: 58px;
          }
          .arch-stage-wrap {
            padding: 60px 20px 70px;
          }
          .arch-hero-frame {
            min-height: 280px;
            padding: 20px;
          }
          .arch-action-row {
            flex-direction: column;
            align-items: stretch;
          }
          .arch-wa-btn,
          .arch-spotlight-jump-btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
