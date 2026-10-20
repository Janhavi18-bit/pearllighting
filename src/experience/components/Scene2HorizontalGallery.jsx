import React, { useRef, useState, useEffect } from 'react'

export default function Scene2HorizontalGallery({ onSelectProductForSpotlight }) {
  const scrollRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const galleryPanels = [
    {
      id: 'gallery-curve-cob',
      tag: '01 • THERMAL SCULPTURE',
      title: 'Curve COB Rose Gold',
      caption: 'Exposed radial cooling architecture with specular anti-glare threshold.',
      image: '/images/products/curve-cob-rose-gold.png',
      alt: 'Pearl Lighting Curve COB Rose Gold luminaire',
      metrics: ['2700K Warm Luster', 'CRI 95+', 'Anodized Baffle'],
      spotlightId: 'curve-cob-rose-gold',
    },
    {
      id: 'gallery-deep-downlight',
      tag: '02 • CONCEALED DARKLIGHT',
      title: 'Deep Downlight Studio Obsidian',
      caption: 'Stepped 40° dark cone hides the diode, keeping ceilings quiet and serene.',
      image: '/images/products/deep-downlight-round-black-studio.png',
      alt: 'Pearl Lighting Deep Downlight Round Studio Black',
      metrics: ['UGR < 16 Glare Index', 'Stepped Cone', 'Ø 75 mm Cutout'],
      spotlightId: 'deep-downlight-studio',
    },
    {
      id: 'gallery-rope-light',
      tag: '03 • CONTINUOUS LINEAR FLOW',
      title: 'Continuous Rope Light',
      caption: '360° dot-free silicone ribbon tracing architectural coves and outdoor steps.',
      image: '/images/products/rope-light-primary-warm.png',
      alt: 'Pearl Lighting continuous warm architectural rope light',
      metrics: ['50m Single Run', 'IP67 Waterproof', 'Homogeneous Glow'],
      spotlightId: 'rope-light-warm',
    },
    {
      id: 'gallery-festive-bokeh',
      tag: '04 • CELESTIAL SALON',
      title: 'Golden Bokeh Celebration',
      caption: 'Cascades of handcrafted star silhouettes casting celebratory warmth.',
      image: '/images/diwali/diwali-golden-bokeh-lifestyle.png',
      alt: 'Pearl Lighting Festive Golden Bokeh Lifestyle Light',
      metrics: ['Curated Sets', 'Warm Amber Ambient', 'Festive Facades'],
      spotlightId: 'festive-section',
    },
    {
      id: 'gallery-moveable-cob',
      tag: '05 • DIRECTIONAL PRECISION',
      title: 'Moveable Gimbal COB',
      caption: 'Articulated dual-axis aiming for curated art walls and spatial accents.',
      image: '/images/products/moveable-cob-duo.png',
      alt: 'Pearl Lighting Moveable Gimbal COB duo luminaire',
      metrics: ['355° Rotation', '30° Tilt Angle', 'Dual Finish'],
      spotlightId: 'curve-cob-rose-gold',
    },
  ]

  const updateScrollState = () => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const scrollLeft = el.scrollLeft
    const maxScroll = el.scrollWidth - el.clientWidth

    setCanScrollLeft(scrollLeft > 20)
    setCanScrollRight(scrollLeft < maxScroll - 20)

    const card = el.querySelector('.gallery-panel-card')
    const slideWidth = card ? card.clientWidth + 24 : el.clientWidth * 0.8
    const current = Math.round(scrollLeft / slideWidth)
    setActiveIdx(Math.min(Math.max(0, current), galleryPanels.length - 1))
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [])

  const scrollToIndex = (idx) => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const cards = el.querySelectorAll('.gallery-panel-card')
    if (cards[idx]) {
      cards[idx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }

  const handleCardClick = (panel) => {
    if (panel.spotlightId === 'festive-section') {
      const target = document.querySelector('#scene-festive')
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    } else {
      if (onSelectProductForSpotlight) {
        onSelectProductForSpotlight(panel.spotlightId)
      }
      const target = document.querySelector('#scene-spotlight')
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="scene2-gallery-root" id="scene-gallery" aria-label="Scene 2 — Horizontal Visual Gallery">
      <div className="scene2-header-container">
        <div className="scene2-eyebrow">
          <span className="eyebrow-num">02</span>
          <span className="eyebrow-sep">•</span>
          <span className="eyebrow-text">HORIZONTAL VISUAL GALLERY</span>
        </div>
        <h2 className="scene2-heading">Landscapes of focused brilliance.</h2>
        <p className="scene2-desc">
          Swipe or drag horizontally through our signature luminaire families. Captured in high-fidelity architectural light.
        </p>
      </div>

      {/* Edge-to-edge Horizontal Browsing Track (Apple Style) */}
      <div className="gallery-track-outer">
        <div
          className="gallery-scroll-track"
          ref={scrollRef}
          role="region"
          aria-label="Horizontal visual gallery carousel"
          tabIndex={0}
        >
          {galleryPanels.map((panel, idx) => (
            <article
              key={panel.id}
              className={`gallery-panel-card ${activeIdx === idx ? 'is-active' : ''}`}
              onClick={() => handleCardClick(panel)}
            >
              {/* Product Visual Container */}
              <div className="panel-visual-wrap">
                <img
                  src={panel.image}
                  alt={panel.alt}
                  className="panel-img"
                  loading="lazy"
                />
                <div className="panel-shadow-radial" aria-hidden="true"></div>
              </div>

              {/* High-End Text Overlay */}
              <div className="panel-overlay">
                <div className="panel-top-tag">
                  <span>{panel.tag}</span>
                </div>

                <div className="panel-bottom-copy">
                  <h3 className="panel-title">{panel.title}</h3>
                  <p className="panel-caption">{panel.caption}</p>

                  <div className="panel-meta-strip">
                    {panel.metrics.map((m, mIdx) => (
                      <span key={mIdx} className="panel-metric-pill">{m}</span>
                    ))}
                    <button
                      type="button"
                      className="panel-spotlight-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCardClick(panel)
                      }}
                    >
                      <span>Spotlight</span>
                      <span className="arrow-icon">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Control Toolbar */}
        <div className="gallery-toolbar-wrap">
          <div className="gallery-dots">
            {galleryPanels.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`gallery-dot ${activeIdx === i ? 'dot-active' : ''}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Jump to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="gallery-arrows">
            <button
              type="button"
              className="gallery-arrow-btn"
              onClick={() => scrollToIndex(Math.max(0, activeIdx - 1))}
              disabled={!canScrollLeft}
              aria-label="Previous landscape panel"
            >
              ←
            </button>
            <button
              type="button"
              className="gallery-arrow-btn"
              onClick={() => scrollToIndex(Math.min(galleryPanels.length - 1, activeIdx + 1))}
              disabled={!canScrollRight}
              aria-label="Next landscape panel"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scene2-gallery-root {
          background: #0C0B0A;
          color: #FAF7F2;
          padding: 100px 0 110px;
          position: relative;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .scene2-header-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px 44px;
        }

        .scene2-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #DFC07A;
          margin-bottom: 14px;
        }

        .eyebrow-sep {
          color: rgba(250, 247, 242, 0.25);
        }

        .scene2-heading {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(34px, 4.4vw, 56px);
          font-weight: 400;
          color: #FAF7F2;
          line-height: 1.16;
          margin-bottom: 14px;
          letter-spacing: -0.01em;
        }

        .scene2-desc {
          font-size: clamp(15px, 1.2vw, 17px);
          color: rgba(250, 247, 242, 0.65);
          max-width: 620px;
          font-weight: 300;
          line-height: 1.6;
        }

        /* Carousel Track */
        .gallery-track-outer {
          position: relative;
          width: 100%;
        }

        .gallery-scroll-track {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 10px 40px 24px;
          scroll-padding-left: 40px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
          user-select: none;
        }

        .gallery-scroll-track::-webkit-scrollbar {
          display: none;
        }

        /* Dominant panel taking ~80vw, with ~16vw peek of next panel */
        .gallery-panel-card {
          flex: 0 0 clamp(320px, 80vw, 1160px);
          scroll-snap-align: start;
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: #151412;
          border: 1px solid rgba(255, 255, 255, 0.08);
          aspect-ratio: 16 / 9;
          min-height: 480px;
          max-height: 640px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
          cursor: pointer;
        }

        .gallery-panel-card:hover {
          border-color: rgba(223, 192, 122, 0.45);
          transform: translateY(-4px);
        }

        .panel-visual-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 50%, #1d1b19 0%, #0d0c0b 70%, #060505 100%);
        }

        .panel-img {
          width: 75%;
          height: 75%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 25px 45px rgba(0, 0, 0, 0.85));
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-panel-card:hover .panel-img {
          transform: scale(1.04);
        }

        .panel-shadow-radial {
          position: absolute;
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(223, 192, 122, 0.12) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }

        /* Overlay */
        .panel-overlay {
          position: absolute;
          inset: 0;
          z-index: 4;
          padding: clamp(24px, 4vw, 44px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.5) 0%,
            transparent 30%,
            transparent 60%,
            rgba(0, 0, 0, 0.82) 100%
          );
          pointer-events: none;
        }

        .panel-top-tag {
          align-self: flex-start;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: #DFC07A;
        }

        .panel-bottom-copy {
          max-width: 620px;
        }

        .panel-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(26px, 3.2vw, 40px);
          font-weight: 500;
          color: #FFFFFF;
          margin-bottom: 8px;
          line-height: 1.18;
          letter-spacing: -0.01em;
        }

        .panel-caption {
          font-size: clamp(14px, 1.2vw, 16px);
          color: rgba(250, 247, 242, 0.76);
          line-height: 1.5;
          margin-bottom: 18px;
          font-weight: 300;
        }

        .panel-meta-strip {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          pointer-events: auto;
        }

        .panel-metric-pill {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          color: rgba(250, 247, 242, 0.85);
        }

        .panel-spotlight-btn {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #DFC07A;
          color: #0A0A0A;
          border: none;
          padding: 7px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .panel-spotlight-btn:hover {
          background: #FAF7F2;
          transform: translateX(2px);
        }

        /* Toolbar */
        .gallery-toolbar-wrap {
          max-width: 1440px;
          margin: 24px auto 0;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .gallery-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .gallery-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gallery-dot.dot-active {
          width: 26px;
          background: #DFC07A;
        }

        .gallery-arrows {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .gallery-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #FAF7F2;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .gallery-arrow-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .gallery-arrow-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .scene2-gallery-root {
            padding: 70px 0 80px;
          }
          .scene2-header-container {
            padding: 0 20px 30px;
          }
          .gallery-scroll-track {
            padding: 10px 20px 20px;
            scroll-padding-left: 20px;
          }
          .gallery-panel-card {
            flex: 0 0 86vw;
            aspect-ratio: 4 / 3;
            min-height: 400px;
          }
          .panel-spotlight-btn {
            margin-left: 0;
            width: 100%;
            justify-content: center;
            margin-top: 6px;
          }
          .gallery-toolbar-wrap {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  )
}
