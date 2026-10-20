import React, { useState, useRef } from 'react'

/**
 * 02 — IMMERSIVE VISUAL GALLERY
 * Horizontally browsable gallery inspired by Apple's cinematic showcases:
 * - Large landscape panels
 * - Partial previews of adjacent panels
 * - Smooth snap scrolling & touch gestures
 * - Imagery dominates; text used sparingly
 */
export default function ImmersiveGallery({ onOpenProduct }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const trackRef = useRef(null)

  const panels = [
    {
      id: 'curve-cob',
      tag: '01 • THERMAL ARCHITECTURE',
      title: 'Curve COB Rose Gold',
      subtitle: 'Radial convection heatsink with glare-free optical threshold.',
      image: '/images/products/curve-cob-rose-gold.png',
      alt: 'Curve COB Rose Gold Anodized Heatsink',
      productId: 'curve-cob',
      glow: 'rgba(215, 140, 90, 0.35)',
    },
    {
      id: 'deep-downlight',
      tag: '02 • CONCEALED LIGHT',
      title: 'Deep Down Light Studio',
      subtitle: '40° shielding angle hides the diode, washing walls with quiet radiance.',
      image: '/images/products/deep-downlight-round-black-studio.png',
      alt: 'Deep Down Light Round Black Studio Luminaire',
      productId: 'deep-downlight',
      glow: 'rgba(212, 175, 55, 0.3)',
    },
    {
      id: 'rope-light',
      tag: '03 • CONTINUOUS LUMINESCENCE',
      title: 'Architectural Rope Light',
      subtitle: 'Dot-free flexible ribbon defining coves, ceilings, and contour lines.',
      image: '/images/products/rope-light-primary-warm.png',
      alt: 'Continuous Architectural Rope Light',
      productId: 'rope-light',
      glow: 'rgba(255, 190, 80, 0.35)',
    },
    {
      id: 'festive-ambiance',
      tag: '04 • CELESTIAL SALON',
      title: 'Festive Golden Bokeh',
      subtitle: 'Celebratory cascades and star silhouettes that make spaces glow.',
      image: '/images/diwali/diwali-golden-bokeh-lifestyle.png',
      alt: 'Festive Golden Bokeh Lifestyle Lighting',
      productId: 'hanging-star-curtain',
      glow: 'rgba(240, 180, 50, 0.4)',
    },
  ]

  const handleTrackScroll = () => {
    if (!trackRef.current) return
    const container = trackRef.current
    const scrollLeft = container.scrollLeft
    const panelWidth = container.offsetWidth * 0.82
    const idx = Math.round(scrollLeft / panelWidth)
    if (idx >= 0 && idx < panels.length && idx !== activeSlide) {
      setActiveSlide(idx)
    }
  }

  const scrollToPanel = (idx) => {
    if (!trackRef.current) return
    const container = trackRef.current
    const panelWidth = container.offsetWidth * 0.82
    container.scrollTo({
      left: idx * panelWidth,
      behavior: 'smooth',
    })
    setActiveSlide(idx)
  }

  const handlePrev = () => {
    scrollToPanel(Math.max(0, activeSlide - 1))
  }

  const handleNext = () => {
    scrollToPanel(Math.min(panels.length - 1, activeSlide + 1))
  }

  return (
    <section className="immersive-gallery-root" id="gallery" aria-label="Immersive Visual Gallery">
      <div className="container gallery-header-block">
        <div className="rebuild-marker-rail">
          <span className="rebuild-marker-num">02</span>
          <span className="rebuild-marker-dot">•</span>
          <span className="rebuild-marker-tag">CINEMATIC PRODUCT SHOWCASE</span>
        </div>
        <h2 className="gallery-section-title">
          The art of light,<br />
          <span className="gold-word-italic">in motion.</span>
        </h2>
      </div>

      {/* Edge-to-Edge Horizontal Snap Track */}
      <div
        className="gallery-track-viewport"
        ref={trackRef}
        onScroll={handleTrackScroll}
      >
        <div className="gallery-track-rail">
          {panels.map((p, idx) => {
            const isActive = activeSlide === idx
            return (
              <div
                key={p.id}
                className={`gallery-panel-item ${isActive ? 'active' : ''}`}
                onClick={() => scrollToPanel(idx)}
                role="group"
                aria-label={`Panel ${idx + 1}: ${p.title}`}
              >
                <div className="panel-glow-layer" style={{ background: p.glow }} aria-hidden="true"></div>

                <div className="panel-image-stage">
                  <img src={p.image} alt={p.alt} className="panel-big-photo" loading="lazy" />
                  <div className="panel-vignette-shade" aria-hidden="true"></div>
                </div>

                {/* Overlaid Typography */}
                <div className="panel-text-overlay">
                  <span className="panel-tag-label">{p.tag}</span>
                  <h3 className="panel-headline">{p.title}</h3>
                  <p className="panel-subtext">{p.subtitle}</p>

                  <div className="panel-btn-strip">
                    <button
                      type="button"
                      className="panel-inspect-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onOpenProduct) onOpenProduct({ id: p.productId, name: p.title })
                      }}
                    >
                      <span>Explore Fixture</span>
                      <span className="arrow">↗</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Controller Bar */}
      <div className="container gallery-controller-rail">
        <span className="gallery-hint-text">Take a closer look.</span>

        <div className="gallery-dots-pill" role="tablist" aria-label="Gallery slides">
          {panels.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              className={`gallery-dot ${activeSlide === idx ? 'active' : ''}`}
              onClick={() => scrollToPanel(idx)}
              aria-label={`Go to ${p.title}`}
            />
          ))}
        </div>

        <div className="gallery-arrows-group">
          <button
            type="button"
            className="gallery-arrow-btn"
            onClick={handlePrev}
            disabled={activeSlide === 0}
            aria-label="Previous panel"
          >
            ‹
          </button>
          <button
            type="button"
            className="gallery-arrow-btn"
            onClick={handleNext}
            disabled={activeSlide === panels.length - 1}
            aria-label="Next panel"
          >
            ›
          </button>
        </div>
      </div>

      <style>{`
        .immersive-gallery-root {
          position: relative;
          background: #0A0908;
          color: #FAF7F2;
          padding: 6rem 0 5rem;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .gallery-header-block {
          margin-bottom: 2.5rem;
        }

        .gallery-section-title {
          font-family: var(--font-sans);
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: #FFFFFF;
        }

        .gold-word-italic {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          color: var(--gold-champagne);
        }

        /* Viewport track */
        .gallery-track-viewport {
          width: 100%;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 0 max(1.5rem, calc((100vw - var(--container-max, 1360px)) / 2 + 1.5rem));
        }

        .gallery-track-viewport::-webkit-scrollbar {
          display: none;
        }

        .gallery-track-rail {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          padding-bottom: 1.5rem;
        }

        .gallery-panel-item {
          position: relative;
          width: 82vw;
          max-width: 1080px;
          height: 66vh;
          min-height: 480px;
          max-height: 660px;
          scroll-snap-align: start;
          border-radius: 26px;
          overflow: hidden;
          background: #141210;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.4s var(--ease-out-expo), border-color 0.4s ease, box-shadow 0.4s ease;
          flex-shrink: 0;
        }

        .gallery-panel-item.active {
          border-color: rgba(197, 160, 89, 0.35);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
        }

        .panel-glow-layer {
          position: absolute;
          inset: 15%;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          pointer-events: none;
        }

        .panel-image-stage {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .panel-big-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease-out-expo);
        }

        .gallery-panel-item:hover .panel-big-photo {
          transform: scale(1.03);
        }

        .panel-vignette-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10, 9, 8, 0.1) 0%, rgba(10, 9, 8, 0.4) 40%, rgba(10, 9, 8, 0.92) 85%, rgba(10, 9, 8, 0.98) 100%);
        }

        .panel-text-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: clamp(1.75rem, 4vw, 3.25rem);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          color: #FAF7F2;
          z-index: 2;
        }

        .panel-tag-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          color: var(--gold-champagne);
          text-transform: uppercase;
        }

        .panel-headline {
          font-family: var(--font-sans);
          font-size: clamp(1.8rem, 3.8vw, 2.8rem);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #FFFFFF;
        }

        .panel-subtext {
          font-size: 1rem;
          line-height: 1.55;
          color: rgba(250, 247, 242, 0.85);
          max-width: 580px;
          font-weight: 300;
        }

        .panel-btn-strip {
          padding-top: 0.75rem;
        }

        .panel-inspect-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          color: #11100E;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.8rem 1.6rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .panel-inspect-btn:hover {
          background: var(--gold-champagne);
          transform: translateY(-2px);
          box-shadow: 0 4px 18px rgba(197, 160, 89, 0.4);
        }

        /* Controller Rail */
        .gallery-controller-rail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
        }

        .gallery-hint-text {
          font-size: 0.92rem;
          color: rgba(250, 247, 242, 0.7);
        }

        .gallery-dots-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .gallery-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .gallery-dot.active {
          width: 24px;
          border-radius: 4px;
          background: #FFFFFF;
        }

        .gallery-arrows-group {
          display: flex;
          gap: 0.5rem;
        }

        .gallery-arrow-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FAF7F2;
          font-size: 1.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          line-height: 1;
        }

        .gallery-arrow-btn:hover:not(:disabled) {
          background: #FFFFFF;
          color: #11100E;
        }

        .gallery-arrow-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .gallery-panel-item {
            width: 88vw;
            height: 60vh;
            min-height: 440px;
          }

          .gallery-track-viewport {
            padding: 0 1rem;
          }

          .gallery-hint-text {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
