import React, { useState } from 'react'

export default function ArchitecturalChapters({ onSelectProductForCloserLook, onOpenEnquiry }) {
  const [activeChapter, setActiveChapter] = useState(0)
  const [isIndexOpen, setIsIndexOpen] = useState(false)

  const chapters = [
    {
      id: 'chapter-recessed',
      number: 'CHAPTER I',
      category: 'RECESSED DOWNLIGHT ARCHITECTURE',
      title: 'Deep Downlight & Darklight Shielding',
      subtitle: 'Concealed light sources designed to keep the ceiling plane quiet while projecting high-comfort task illumination.',
      themeBg: '#09090B',
      textColor: '#FAF7F2',
      primaryImage: '/images/products/deep-downlight-round-black-studio.png',
      secondaryImage: '/images/products/deep-downlight-square-white.png',
      altPrimary: 'Pearl Lighting Deep Downlight Round Studio Black Luminaire',
      altSecondary: 'Pearl Lighting Deep Downlight Square White Luminaire',
      features: [
        'Stepped 40° anti-glare optical cone (UGR < 16)',
        'Available in round studio obsidian and square plaster-in finishes',
        'High-CRI 95+ engine with 2-step MacAdam color consistency',
      ],
      whatsappPrefill: 'Deep Downlight Studio & Square Series',
    },
    {
      id: 'chapter-thermal-cob',
      number: 'CHAPTER II',
      category: 'AERO-THERMAL SCULPTURE',
      title: 'Curve & Moveable COB Engineering',
      subtitle: 'Exposed radial heat exchangers that transform thermal physics into a defining architectural detail.',
      themeBg: '#12100E',
      textColor: '#FAF7F2',
      primaryImage: '/images/products/curve-cob-rose-gold.png',
      secondaryImage: '/images/products/moveable-cob-duo.png',
      altPrimary: 'Pearl Lighting Curve COB Rose Gold Heatsink',
      altSecondary: 'Pearl Lighting Moveable COB Dual Gimbal Luminaire',
      features: [
        'Aviation aluminum radial convection fins',
        'Field-interchangeable 15°, 24°, and 36° precision reflectors',
        '355° rotational and 30° tilt dual-axis gimbal adjustment',
      ],
      whatsappPrefill: 'Curve COB Rose Gold & Moveable Gimbal',
    },
    {
      id: 'chapter-linear-rope',
      number: 'CHAPTER III',
      category: 'CONTINUOUS LINEAR FLOW',
      title: 'Architectural Rope & Contour Silicone',
      subtitle: 'Dot-free flexible luminaire spools engineered to trace architectural coves, ceiling contours, and outdoor perimeters.',
      themeBg: '#0E0C0A',
      textColor: '#FAF7F2',
      primaryImage: '/images/products/rope-light-primary-warm.png',
      secondaryImage: '/images/products/rope-light-blue-reel.png',
      altPrimary: 'Pearl Lighting Continuous Rope Light Warm Amber Reel',
      altSecondary: 'Pearl Lighting Continuous Rope Light Vibrant Blue Reel',
      features: [
        'Pure extruded optical silicone with zero visible LED dots',
        '50-metre continuous run capability with uniform lux drop-off',
        'IP67 all-weather protection suitable for facade and water features',
      ],
      whatsappPrefill: 'Architectural Continuous Rope Light Series',
    },
    {
      id: 'chapter-surface-panel',
      number: 'CHAPTER IV',
      category: 'SURFACE & MINIMAL GEOMETRY',
      title: 'Surface Cylinders & Ultra-Slim Panels',
      subtitle: 'Low-profile and surface-mounted luminaire formats for monolithic concrete slabs and exposed ceilings.',
      themeBg: '#161412',
      textColor: '#FAF7F2',
      primaryImage: '/images/products/surface-panel-round-black.png',
      secondaryImage: '/images/products/slim-panel-round.png',
      altPrimary: 'Pearl Lighting Surface Cylinder Architectural Luminaire',
      altSecondary: 'Pearl Lighting Ultra-Slim Panel Ambient Disc',
      features: [
        'Surface architectural mounting where recessed cutouts are impossible',
        'Micro-bezel matte black and pure white powder coat finishes',
        'Diffuse high-efficiency ambient illumination with wide beam spread',
      ],
      whatsappPrefill: 'Surface Panel & Slim Disc Luminaire Series',
    },
  ]

  // Compact index products for architect fast reference
  const compactIndexList = [
    { code: 'PL-DD-01', name: 'Deep Downlight Round Studio', finish: 'Matte Obsidian', optics: 'Darklight 36°', img: '/images/products/deep-downlight-round-black-studio.png' },
    { code: 'PL-DD-02', name: 'Deep Downlight Square', finish: 'Plaster White', optics: 'Recessed 40°', img: '/images/products/deep-downlight-square-white.png' },
    { code: 'PL-CC-01', name: 'Curve COB Rose Gold', finish: 'Anodized Rose Gold', optics: 'Specular 36°', img: '/images/products/curve-cob-rose-gold.png' },
    { code: 'PL-CC-02', name: 'Curve COB Flush White', finish: 'Concealed White', optics: 'Curved Baffle', img: '/images/products/curve-cob-white-recessed.png' },
    { code: 'PL-MC-01', name: 'Moveable Gimbal COB', finish: 'Dual Finish', optics: 'Gimbal Articulated', img: '/images/products/moveable-cob-duo.png' },
    { code: 'PL-RL-01', name: 'Rope Light Warm Amber', finish: 'Diffused Silicone', optics: '360° Dot-Free', img: '/images/products/rope-light-primary-warm.png' },
    { code: 'PL-RL-02', name: 'Rope Light Sapphire Blue', finish: 'Sapphire Silicone', optics: 'Continuous 50m', img: '/images/products/rope-light-blue-reel.png' },
    { code: 'PL-SP-01', name: 'Surface Panel Cylinder', finish: 'Powder Black', optics: 'Direct Downlight', img: '/images/products/surface-panel-round-black.png' },
    { code: 'PL-SL-01', name: 'Slim Panel Disc', finish: 'Architectural White', optics: 'Diffused 120°', img: '/images/products/slim-panel-round.png' },
  ]

  const currentChapter = chapters[activeChapter]

  const handleWhatsAppChapter = (chapter) => {
    const text = `Hi Pearl Lighting! I am interested in specifying the ${chapter.whatsappPrefill} from Chapter ${chapter.number}. Could you share spec sheets and pricing?`
    window.open(`https://wa.me/918329045712?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="architectural-chapters-root" id="architectural-chapters" aria-label="Architectural Lighting Chapters">
      {/* Chapter Master Navigation Tabs */}
      <div className="chapter-nav-banner">
        <div className="chapter-nav-inner">
          <div className="nav-eyebrow">
            <span className="dot-gold">✦</span>
            <span>ARCHITECTURAL PORTFOLIO IN FOUR CHAPTERS</span>
          </div>

          <div className="chapter-tabs-row" role="tablist">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                role="tab"
                aria-selected={activeChapter === idx}
                className={`chapter-tab-button ${activeChapter === idx ? 'is-active' : ''}`}
                onClick={() => setActiveChapter(idx)}
              >
                <span className="tab-chapter-num">{ch.number}</span>
                <span className="tab-chapter-name">{ch.title.split('&')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Monumental Chapter Scene Showcase */}
      <div
        className="chapter-scene-stage"
        style={{ backgroundColor: currentChapter.themeBg }}
      >
        <div className="chapter-stage-container">
          {/* Alternating Image Scale Composition */}
          <div className="chapter-visual-spread">
            {/* Monumental Primary Image */}
            <div className="monumental-visual-frame">
              <img
                key={currentChapter.primaryImage}
                src={currentChapter.primaryImage}
                alt={currentChapter.altPrimary}
                className="monumental-luminaire-image"
              />
              <div className="monumental-luminaire-glow"></div>
              <div className="monumental-frame-badge">
                <span>{currentChapter.category}</span>
              </div>
            </div>

            {/* Staggered Secondary Accent Visual */}
            <div className="accent-visual-frame">
              <img
                key={currentChapter.secondaryImage}
                src={currentChapter.secondaryImage}
                alt={currentChapter.altSecondary}
                className="accent-luminaire-image"
              />
              <div className="accent-caption">
                <span>Alternate Specification Finish</span>
              </div>
            </div>
          </div>

          {/* Chapter Narrative & Architecture Breakdown */}
          <div className="chapter-narrative-panel">
            <div className="chapter-kicker-strip">
              <span className="ch-num">{currentChapter.number}</span>
              <span className="ch-sep">/</span>
              <span className="ch-cat">{currentChapter.category}</span>
            </div>

            <h2 className="chapter-headline">{currentChapter.title}</h2>
            <p className="chapter-lead">{currentChapter.subtitle}</p>

            <div className="chapter-features-list">
              <span className="feat-title">ARCHITECTURAL ATTRIBUTES</span>
              {currentChapter.features.map((feat, i) => (
                <div key={i} className="feat-item">
                  <span className="feat-dot">✦</span>
                  <span className="feat-text">{feat}</span>
                </div>
              ))}
            </div>

            <div className="chapter-actions-bar">
              <button
                type="button"
                className="chapter-whatsapp-btn"
                onClick={() => handleWhatsAppChapter(currentChapter)}
              >
                <span>Enquire Chapter Specs</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17l9.2-9.2M17 17V8h-9"/>
                </svg>
              </button>

              <button
                type="button"
                className="chapter-closer-look-btn"
                onClick={() => {
                  if (onSelectProductForCloserLook) {
                    onSelectProductForCloserLook(currentChapter.id)
                  }
                  const el = document.querySelector('#closer-look')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Inspect in Closer Look →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sleek, Non-Dominating Product Index Drawer */}
      <div className="compact-index-wrapper">
        <div className="compact-index-container">
          <div className="index-collapsible-bar">
            <div className="index-bar-info">
              <span className="index-bar-title">ARCHITECTURAL LUMINAIRE DIRECTORY</span>
              <span className="index-bar-sub">Quick photometric and model index for project schedules (9 References)</span>
            </div>
            <button
              type="button"
              className="index-toggle-btn"
              onClick={() => setIsIndexOpen(!isIndexOpen)}
              aria-expanded={isIndexOpen}
            >
              <span>{isIndexOpen ? 'Hide Directory' : 'View Quick Directory'}</span>
              <span className="toggle-symbol">{isIndexOpen ? '↑' : '↓'}</span>
            </button>
          </div>

          {isIndexOpen && (
            <div className="index-items-table-rail">
              <div className="index-grid">
                {compactIndexList.map((item) => (
                  <div key={item.code} className="index-card-row">
                    <img src={item.img} alt={item.name} className="index-thumb-img" />
                    <div className="index-card-meta">
                      <span className="index-code">{item.code}</span>
                      <h4 className="index-name">{item.name}</h4>
                      <span className="index-specs">{item.finish} • {item.optics}</span>
                    </div>
                    <a
                      href={`https://wa.me/918329045712?text=${encodeURIComponent(`Hi Pearl Lighting! Please share details on ${item.code} ${item.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="index-wa-link"
                      title="Enquire on WhatsApp"
                    >
                      Enquire ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .architectural-chapters-root {
          position: relative;
          width: 100%;
          background: #09090B;
        }

        /* Master Category Navigation */
        .chapter-nav-banner {
          background: #060608;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px 32px;
          position: sticky;
          top: 70px;
          z-index: 50;
          backdrop-filter: blur(16px);
        }

        .chapter-nav-inner {
          max-width: 1440px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .nav-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.6);
        }

        .dot-gold {
          color: #DFC07A;
        }

        .chapter-tabs-row {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .chapter-tab-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          padding: 8px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .chapter-tab-button:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
        }

        .chapter-tab-button.is-active {
          background: #DFC07A;
          color: #0A0A0A;
          border-color: #DFC07A;
          font-weight: 600;
        }

        .tab-chapter-num {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.08em;
          opacity: 0.8;
        }

        .tab-chapter-name {
          font-size: 12px;
        }

        /* Chapter Stage */
        .chapter-scene-stage {
          padding: 90px 40px 100px;
          transition: background-color 0.4s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .chapter-stage-container {
          max-width: 1440px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        /* Visual Spread with alternating scale */
        .chapter-visual-spread {
          position: relative;
          display: flex;
          align-items: flex-end;
          gap: 24px;
        }

        .monumental-visual-frame {
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

        .monumental-luminaire-image {
          width: 85%;
          height: 85%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 25px 40px rgba(0, 0, 0, 0.85));
          transition: transform 0.5s ease;
        }

        .monumental-visual-frame:hover .monumental-luminaire-image {
          transform: scale(1.03);
        }

        .monumental-luminaire-glow {
          position: absolute;
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(223, 192, 122, 0.16) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }

        .monumental-frame-badge {
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

        .accent-visual-frame {
          position: relative;
          flex: 0.7;
          background: #0D0D10;
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

        .accent-luminaire-image {
          width: 80%;
          height: 80%;
          object-fit: contain;
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7));
        }

        .accent-caption {
          position: absolute;
          bottom: 12px;
          left: 12px;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: rgba(255, 255, 255, 0.45);
        }

        /* Narrative Panel */
        .chapter-narrative-panel {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .chapter-kicker-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
        }

        .ch-num {
          color: #DFC07A;
          font-weight: 600;
        }

        .ch-sep {
          color: rgba(255, 255, 255, 0.2);
        }

        .ch-cat {
          color: rgba(255, 255, 255, 0.55);
        }

        .chapter-headline {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(32px, 3.4vw, 48px);
          font-weight: 400;
          line-height: 1.15;
          color: #FAF7F2;
          letter-spacing: -0.01em;
        }

        .chapter-lead {
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
        }

        .chapter-features-list {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feat-title {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #DFC07A;
          margin-bottom: 4px;
        }

        .feat-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.82);
        }

        .feat-dot {
          color: #DFC07A;
          font-size: 10px;
          margin-top: 4px;
        }

        .chapter-actions-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .chapter-whatsapp-btn {
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

        .chapter-whatsapp-btn:hover {
          background: #FAF7F2;
          transform: translateY(-2px);
        }

        .chapter-closer-look-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FAF7F2;
          padding: 11px 22px;
          border-radius: 999px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .chapter-closer-look-btn:hover {
          border-color: #DFC07A;
          color: #DFC07A;
        }

        /* Compact Index Section */
        .compact-index-wrapper {
          background: #080809;
          padding: 24px 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .compact-index-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        .index-collapsible-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
        }

        .index-bar-title {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          letter-spacing: 0.16em;
          color: #FAF7F2;
          display: block;
          font-weight: 600;
        }

        .index-bar-sub {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 2px;
        }

        .index-toggle-btn {
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

        .index-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.12);
        }

        .index-items-table-rail {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .index-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 16px;
        }

        .index-card-row {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: border-color 0.2s ease;
        }

        .index-card-row:hover {
          border-color: rgba(223, 192, 122, 0.3);
        }

        .index-thumb-img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          background: #000000;
          border-radius: 8px;
          padding: 4px;
        }

        .index-card-meta {
          flex: 1;
        }

        .index-code {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          color: #DFC07A;
          display: block;
        }

        .index-name {
          font-size: 13px;
          color: #FAF7F2;
          font-weight: 500;
          margin: 2px 0;
        }

        .index-specs {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          display: block;
        }

        .index-wa-link {
          font-size: 11px;
          font-weight: 600;
          color: #DFC07A;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(223, 192, 122, 0.1);
        }

        .index-wa-link:hover {
          background: #DFC07A;
          color: #000000;
        }

        @media (max-width: 992px) {
          .chapter-stage-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .chapter-visual-spread {
            flex-direction: column;
            align-items: stretch;
          }

          .accent-visual-frame {
            margin-bottom: 0;
            aspect-ratio: 16 / 9;
          }

          .monumental-visual-frame {
            min-height: 340px;
          }
        }

        @media (max-width: 600px) {
          .chapter-nav-banner {
            padding: 16px 20px;
            top: 60px;
          }

          .chapter-scene-stage {
            padding: 60px 20px 70px;
          }

          .monumental-visual-frame {
            min-height: 280px;
            padding: 20px;
          }

          .chapter-actions-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .chapter-whatsapp-btn,
          .chapter-closer-look-btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
