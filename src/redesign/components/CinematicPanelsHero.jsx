import React, { useRef, useState, useEffect } from 'react'

export default function CinematicPanelsHero({ onSelectVariant, onOpenEnquiry }) {
  const scrollTrackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const exhibitionPanels = [
    {
      id: 'panel-curve-cob',
      tag: '01 / THERMAL SCULPTURE',
      title: 'Curve COB Rose Gold',
      subtitle: 'Sculpted radial heatsink paired with anti-glare optical threshold.',
      image: '/images/products/curve-cob-rose-gold.png',
      alt: 'Pearl Lighting Curve COB Rose Gold Architectural Luminaire',
      accent: '#DFC07A',
      metrics: ['CRI 95+', '2700K Warm Luster', 'Baffle: Rose Gold'],
      actionTarget: 'curve-cob-rose-gold',
    },
    {
      id: 'panel-deep-downlight',
      tag: '02 / ARCHITECTURAL CONCEALMENT',
      title: 'Deep Downlight Studio',
      subtitle: '40° deep shielding angle conceals the diode, bathing spaces in tranquil radiance.',
      image: '/images/products/deep-downlight-round-black-studio.png',
      alt: 'Pearl Lighting Deep Downlight Round Black Studio Luminaire',
      accent: '#E6C587',
      metrics: ['Darklight Optics', 'UGR < 16', 'Matte Obsidian Finish'],
      actionTarget: 'deep-downlight-studio',
    },
    {
      id: 'panel-rope-light',
      tag: '03 / CONTINUOUS LINEAR FLOW',
      title: 'Architectural Rope Light',
      subtitle: 'Dot-free high-flexibility silicone ribbon tracing architectural contours.',
      image: '/images/products/rope-light-primary-warm.png',
      alt: 'Pearl Lighting Architectural Continuous Rope Light',
      accent: '#EBB362',
      metrics: ['Continuous 50m Run', 'IP67 Ingress Rated', 'Homogeneous Glow'],
      actionTarget: 'rope-light-warm',
    },
    {
      id: 'panel-festive-bokeh',
      tag: '04 / CELESTIAL SALON',
      title: 'Festive Golden Bokeh',
      subtitle: 'Cascades of handcrafted star silhouettes creating warmth and atmosphere.',
      image: '/images/diwali/diwali-golden-bokeh-lifestyle.png',
      alt: 'Pearl Lighting Festive Golden Bokeh Celebration Luminaire',
      accent: '#F3C973',
      metrics: ['Celebratory Cascades', 'Ambient Bokeh', 'Bespoke Sets'],
      actionTarget: 'festive-section',
    },
    {
      id: 'panel-moveable-cob',
      tag: '05 / DIRECTIONAL PRECISION',
      title: 'Moveable Gimbal COB',
      subtitle: 'Dual-axis articulation designed to pinpoint artwork and architectural focal points.',
      image: '/images/products/moveable-cob-duo.png',
      alt: 'Pearl Lighting Moveable Gimbal COB Luminaire',
      accent: '#D4AF37',
      metrics: ['Dual-Axis Tilt', 'Tight Beam Angle', 'Architectural Dual Finish'],
      actionTarget: 'curve-cob-duo',
    },
  ]

  const updateScrollState = () => {
    if (!scrollTrackRef.current) return
    const el = scrollTrackRef.current
    const scrollLeft = el.scrollLeft
    const maxScroll = el.scrollWidth - el.clientWidth

    setCanScrollLeft(scrollLeft > 20)
    setCanScrollRight(scrollLeft < maxScroll - 20)

    // Calculate approximate active slide
    const slideWidth = el.querySelector('.cinematic-panel-card')?.clientWidth || el.clientWidth * 0.8
    const gap = 24
    const newIndex = Math.round(scrollLeft / (slideWidth + gap))
    setActiveIndex(Math.min(Math.max(0, newIndex), exhibitionPanels.length - 1))
  }

  useEffect(() => {
    const el = scrollTrackRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [])

  const scrollToIndex = (idx) => {
    if (!scrollTrackRef.current) return
    const el = scrollTrackRef.current
    const cards = el.querySelectorAll('.cinematic-panel-card')
    if (cards[idx]) {
      cards[idx].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeIndex - 1)
    scrollToIndex(nextIdx)
  }

  const handleNext = () => {
    const nextIdx = Math.min(exhibitionPanels.length - 1, activeIndex + 1)
    scrollToIndex(nextIdx)
  }

  const handlePanelAction = (panel) => {
    if (panel.actionTarget === 'festive-section') {
      const el = document.querySelector('#festive-nocturne')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      if (onSelectVariant) {
        onSelectVariant(panel.actionTarget)
      }
      const el = document.querySelector('#closer-look')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="cinematic-hero-section" id="exhibition-panels" aria-label="Digital Lighting Exhibition Opening">
      {/* Editorial eyebrow and presentation title */}
      <div className="hero-header-wrap">
        <div className="hero-eyebrow-rail">
          <span className="atelier-tag">MUMBAI ATELIER • PARTH ENTERPRISES</span>
          <span className="dot-divider">•</span>
          <span className="exhibition-edition">CURATED 2026 EDITION</span>
        </div>
        <h1 className="hero-monograph-title">
          Light as an <span className="title-italic-accent">architectural art form.</span>
        </h1>
        <p className="hero-lead-text">
          Explore Pearl Lighting’s cinematic exhibition. Swipe or browse horizontally through the signature luminaire collection.
        </p>
      </div>

      {/* Horizontally browsable cinematic panels track */}
      <div className="carousel-outer-wrapper">
        <div
          className="panels-scroll-track"
          ref={scrollTrackRef}
          role="region"
          aria-label="Exhibition Panels Carousel"
          tabIndex={0}
        >
          {exhibitionPanels.map((panel, idx) => (
            <article
              key={panel.id}
              className={`cinematic-panel-card ${activeIndex === idx ? 'is-active-panel' : ''}`}
              onClick={() => handlePanelAction(panel)}
            >
              {/* Product Visual Container with dark velvet backdrop */}
              <div className="panel-visual-canvas">
                <img
                  src={panel.image}
                  alt={panel.alt}
                  className="panel-luminaire-image"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                <div className="panel-lighting-glow" style={{ '--accent-glow': panel.accent }}></div>
              </div>

              {/* Minimalist, high-end Apple-style text overlay */}
              <div className="panel-overlay-content">
                <div className="panel-tag-badge">
                  <span>{panel.tag}</span>
                </div>

                <div className="panel-text-block">
                  <h2 className="panel-title">{panel.title}</h2>
                  <p className="panel-subtitle">{panel.subtitle}</p>
                </div>

                <div className="panel-metrics-strip">
                  {panel.metrics.map((m, mIdx) => (
                    <span key={mIdx} className="metric-pill">{m}</span>
                  ))}
                  <button
                    type="button"
                    className="panel-inspect-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePanelAction(panel)
                    }}
                  >
                    <span>Take a closer look</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Navigation Toolbar */}
        <div className="carousel-toolbar">
          <div className="carousel-dots-list">
            {exhibitionPanels.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`carousel-dot-btn ${activeIndex === i ? 'is-active-dot' : ''}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to exhibition panel ${i + 1}`}
              />
            ))}
          </div>

          <div className="carousel-arrows-wrap">
            <button
              type="button"
              className="carousel-nav-arrow"
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Previous panel"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              type="button"
              className="carousel-nav-arrow"
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next panel"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-hero-section {
          position: relative;
          background: #080809;
          color: #FAF7F2;
          padding-top: 130px;
          padding-bottom: 90px;
          overflow: hidden;
        }

        .hero-header-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px 48px;
        }

        .hero-eyebrow-rail {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .atelier-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #DFC07A;
          font-weight: 500;
        }

        .dot-divider {
          color: rgba(255, 255, 255, 0.25);
          font-size: 10px;
        }

        .exhibition-edition {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.5);
        }

        .hero-monograph-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(38px, 5.2vw, 68px);
          font-weight: 400;
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: #FAF7F2;
          max-width: 980px;
          margin-bottom: 20px;
        }

        .title-italic-accent {
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-style: italic;
          color: #DFC07A;
          font-weight: 300;
        }

        .hero-lead-text {
          font-size: clamp(15px, 1.3vw, 18px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
          max-width: 640px;
          font-weight: 300;
        }

        /* Carousel Layout matching Apple reference */
        .carousel-outer-wrapper {
          position: relative;
          width: 100%;
        }

        .panels-scroll-track {
          display: flex;
          gap: 28px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 10px 40px 30px;
          scroll-padding-left: 40px;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
          user-select: none;
        }

        .panels-scroll-track::-webkit-scrollbar {
          display: none;
        }

        /* Dominant panel width 80vw, showing ~15vw preview of next panel */
        .cinematic-panel-card {
          flex: 0 0 clamp(320px, 80vw, 1180px);
          scroll-snap-align: start;
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          background: #111114;
          border: 1px solid rgba(255, 255, 255, 0.08);
          aspect-ratio: 16 / 9;
          min-height: 480px;
          max-height: 680px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.65);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
          cursor: pointer;
        }

        .cinematic-panel-card:hover {
          border-color: rgba(223, 192, 122, 0.4);
          transform: translateY(-4px);
        }

        .panel-visual-canvas {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 50%, #1c1a18 0%, #0d0c0c 75%, #050505 100%);
          overflow: hidden;
        }

        .panel-luminaire-image {
          width: 75%;
          height: 75%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.75));
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cinematic-panel-card:hover .panel-luminaire-image {
          transform: scale(1.04);
        }

        .panel-lighting-glow {
          position: absolute;
          width: 60%;
          height: 60%;
          border-radius: 50%;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 68%);
          opacity: 0.22;
          filter: blur(50px);
          pointer-events: none;
          z-index: 1;
        }

        /* Apple-style typography overlay */
        .panel-overlay-content {
          position: absolute;
          inset: 0;
          z-index: 5;
          padding: clamp(24px, 4vw, 44px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.6) 0%,
            transparent 30%,
            transparent 60%,
            rgba(0, 0, 0, 0.82) 100%
          );
          pointer-events: none;
        }

        .panel-tag-badge {
          align-self: flex-start;
          display: inline-block;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(12px);
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
          color: #DFC07A;
        }

        .panel-text-block {
          max-width: 620px;
          margin-top: auto;
          margin-bottom: 20px;
        }

        .panel-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(26px, 3.4vw, 42px);
          font-weight: 500;
          color: #FFFFFF;
          margin-bottom: 8px;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .panel-subtitle {
          font-size: clamp(14px, 1.2vw, 17px);
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.5;
          font-weight: 300;
        }

        .panel-metrics-strip {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          pointer-events: auto;
        }

        .metric-pill {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 400;
        }

        .panel-inspect-btn {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #DFC07A;
          color: #0A0A0A;
          border: none;
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .panel-inspect-btn:hover {
          background: #FAF7F2;
          transform: translateX(3px);
        }

        /* Carousel toolbar */
        .carousel-toolbar {
          max-width: 1440px;
          margin: 20px auto 0;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .carousel-dots-list {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .carousel-dot-btn {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .carousel-dot-btn.is-active-dot {
          width: 28px;
          background: #DFC07A;
        }

        .carousel-arrows-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .carousel-nav-arrow {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FAF7F2;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .carousel-nav-arrow:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .carousel-nav-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .cinematic-hero-section {
            padding-top: 96px;
            padding-bottom: 60px;
          }

          .hero-header-wrap {
            padding: 0 20px 32px;
          }

          .panels-scroll-track {
            padding: 10px 20px 20px;
            scroll-padding-left: 20px;
            gap: 16px;
          }

          .cinematic-panel-card {
            flex: 0 0 86vw;
            aspect-ratio: 4 / 3;
            min-height: 420px;
            border-radius: 20px;
          }

          .panel-metrics-strip .metric-pill:not(:first-child) {
            display: none;
          }

          .panel-inspect-btn {
            margin-left: 0;
            width: 100%;
            justify-content: center;
            margin-top: 8px;
          }

          .carousel-toolbar {
            padding: 0 20px;
          }
        }
      `}</style>
    </section>
  )
}
