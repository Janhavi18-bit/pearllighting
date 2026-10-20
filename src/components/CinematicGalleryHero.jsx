import React, { useState, useRef, useEffect } from 'react'

/**
 * 01 — HERO AND FIRST IMPRESSION
 * Directly matches the Apple-style visual reference:
 * - Wide, cinematic, edge-to-edge image panels
 * - Dominant main panel with the next panel partially visible on the right
 * - Dark immersive background (#0A0A08)
 * - Concise white typography directly over imagery with high contrast
 * - Smooth horizontal snap browsing with touch/swipe and keyboard support
 * - Minimal bottom interface with "Take a closer look" label and dot indicators
 */
export default function CinematicGalleryHero({ onOpenProduct, onEnquire }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef(null)

  const slides = [
    {
      id: 'model-501-bk',
      eyebrow: 'ARCHITECTURAL ILLUMINATION',
      title: 'MODEL 501-BK',
      subtitle: 'Integrated Ceiling Luminaire & Aerodynamic Equilibrium',
      description: 'Luminaires engineered where optical precision, thermal discipline, and sculptural permanence exist in unbroken harmony.',
      image: '/images/products/ceiling-fan-light-501-bk.png',
      alt: 'Pearl Lighting Model 501-BK Architectural Ceiling Luminaire',
      ctaText: 'Explore Luminaire',
      productId: 'ceiling-fan-light-501-bk',
      glowColor: 'rgba(212, 175, 55, 0.35)',
    },
    {
      id: 'curve-cob',
      eyebrow: 'THERMAL & OPTICAL MASTERY',
      title: 'CURVE COB ARCHITECTURE',
      subtitle: 'Rose Gold Anodized Radial Heatsink • Glare-Free Cutoff',
      description: 'Deep curved optical baffle softens aperture thresholds and eliminates contrast rings across ceiling planes.',
      image: '/images/products/curve-cob-rose-gold.png',
      alt: 'Pearl Lighting Curve COB Rose Gold Heatsink Luminaire',
      ctaText: 'Explore Curve COB',
      productId: 'curve-cob',
      glowColor: 'rgba(226, 140, 80, 0.35)',
    },
    {
      id: 'rope-light',
      eyebrow: 'CONTINUOUS LUMINESCENCE',
      title: 'ROPE LIGHT CONTOUR',
      subtitle: 'Flexible Architectural Ribbon for Coves & Volumes',
      description: 'Continuous dot-free flexible extrusion delivering seamless 2700K ambient warmth for perimeter grazing and steps.',
      image: '/images/products/rope-light-primary-warm.png',
      alt: 'Pearl Lighting Continuous Architectural Rope Light Ribbon',
      ctaText: 'Explore Ribbon',
      productId: 'rope-light',
      glowColor: 'rgba(255, 190, 80, 0.35)',
    },
    {
      id: 'festive-salon',
      eyebrow: 'THE CELESTIAL SALON',
      title: 'FESTIVE ILLUMINATION',
      subtitle: 'Warm Golden Star Silhouette Cascades & Bokeh Ambience',
      description: 'Celebratory fixtures engineered to bring warmth, sparkle, and emotional splendor to grand Diwali spaces.',
      image: '/images/diwali/diwali-golden-bokeh-lifestyle.png',
      alt: 'Pearl Lighting Festive Golden Bokeh Celebration',
      ctaText: 'Explore Festive Lights',
      productId: 'hanging-star-curtain',
      glowColor: 'rgba(240, 180, 50, 0.40)',
    },
  ]

  // Sync scroll position with activeSlide
  const handleScroll = () => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const scrollLeft = container.scrollLeft
    const slideWidth = container.offsetWidth * 0.82
    const newIndex = Math.round(scrollLeft / slideWidth)
    if (newIndex >= 0 && newIndex < slides.length && newIndex !== activeSlide) {
      setActiveSlide(newIndex)
    }
  }

  const scrollToIndex = (index) => {
    if (!sliderRef.current) return
    const container = sliderRef.current
    const slideWidth = container.offsetWidth * 0.82
    container.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth',
    })
    setActiveSlide(index)
  }

  const handlePrev = () => {
    const nextIdx = Math.max(0, activeSlide - 1)
    scrollToIndex(nextIdx)
  }

  const handleNext = () => {
    const nextIdx = Math.min(slides.length - 1, activeSlide + 1)
    scrollToIndex(nextIdx)
  }

  return (
    <section className="apple-hero-gallery-root" id="hero" aria-label="Pearl Lighting Gallery Exhibition">
      {/* Top Header Rail */}
      <div className="container hero-headline-lockup">
        <div className="hero-top-stamp">
          <span className="gold-sparkle-dot">✦</span>
          <span className="stamp-text">PEARL LIGHTINGS • MUMBAI ATELIER 2026</span>
        </div>
        <h1 className="hero-apple-title">
          Where light becomes<br />
          <span className="serif-gold-word">architecture.</span>
        </h1>
      </div>

      {/* Cinematic Horizontal Scroll Track with visible peek of next panel */}
      <div
        className="cinematic-track-viewport"
        ref={sliderRef}
        onScroll={handleScroll}
        aria-label="Cinematic product panel gallery"
      >
        <div className="cinematic-track-rail">
          {slides.map((slide, idx) => {
            const isActive = activeSlide === idx
            return (
              <div
                key={slide.id}
                className={`cinematic-panel ${isActive ? 'is-active' : ''}`}
                onClick={() => scrollToIndex(idx)}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1} of ${slides.length}: ${slide.title}`}
              >
                {/* Background Ambient Glow */}
                <div
                  className="panel-ambient-glow"
                  style={{ background: slide.glowColor }}
                  aria-hidden="true"
                ></div>

                {/* Main Panel Image */}
                <div className="panel-media-wrap">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="panel-media-img"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Cinematic Dark Vignette Overlay for High-Contrast White Text */}
                  <div className="panel-vignette-overlay" aria-hidden="true"></div>
                </div>

                {/* Overlaid Concise White Typography */}
                <div className="panel-overlay-caption">
                  <span className="caption-eyebrow">{slide.eyebrow}</span>
                  <h2 className="caption-title">{slide.title}</h2>
                  <p className="caption-subtitle">{slide.subtitle}</p>
                  <p className="caption-description hide-on-mobile">{slide.description}</p>

                  <div className="caption-action-row">
                    <button
                      type="button"
                      className="panel-explore-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (onOpenProduct) {
                          onOpenProduct({ id: slide.productId, name: slide.title })
                        }
                      }}
                    >
                      <span>{slide.ctaText}</span>
                      <span className="arrow-glyph" aria-hidden="true">→</span>
                    </button>
                    <a
                      href="#product-spotlight"
                      className="panel-secondary-anchor"
                      onClick={(e) => {
                        e.stopPropagation()
                        const target = document.querySelector('#product-spotlight')
                        if (target) target.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Specifications ↓
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Minimal Bottom Controller Bar (Matching Reference Screenshot) */}
      <div className="container cinematic-bottom-controller">
        <div className="controller-left-label">
          <span className="controller-label-text">Take a closer look.</span>
        </div>

        {/* Indicator dots pill */}
        <div className="controller-center-indicators" role="tablist" aria-label="Slide dots">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={activeSlide === idx}
              className={`indicator-dot-btn ${activeSlide === idx ? 'is-active' : ''}`}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
            />
          ))}
        </div>

        {/* Prev / Next Navigation Arrows */}
        <div className="controller-right-arrows">
          <button
            type="button"
            className="arrow-nav-btn"
            onClick={handlePrev}
            disabled={activeSlide === 0}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="arrow-nav-btn"
            onClick={handleNext}
            disabled={activeSlide === slides.length - 1}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
      </div>

      <style>{`
        .apple-hero-gallery-root {
          position: relative;
          background: #0A0A08;
          color: #FAF8F5;
          padding: calc(var(--header-height, 76px) + 2rem) 0 3.5rem;
          overflow: hidden;
        }

        /* Top Header Lockup */
        .hero-headline-lockup {
          margin-bottom: 2.25rem;
        }

        .hero-top-stamp {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--gold-champagne, #C5A059);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .gold-sparkle-dot {
          color: var(--gold-champagne, #C5A059);
        }

        .hero-apple-title {
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(2.35rem, 5.5vw, 4.4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: #FAF8F5;
        }

        .serif-gold-word {
          font-family: var(--font-editorial, 'Cormorant Garamond', serif);
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, #F5D796 0%, #C5A059 60%, #A68037 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Cinematic Track Viewport */
        .cinematic-track-viewport {
          width: 100%;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 0 max(1.5rem, calc((100vw - var(--container-max, 1380px)) / 2 + 1.5rem));
        }

        .cinematic-track-viewport::-webkit-scrollbar {
          display: none;
        }

        .cinematic-track-rail {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          padding-bottom: 1.5rem;
        }

        /* Dominant panel + partially visible next panel */
        .cinematic-panel {
          position: relative;
          width: 82vw;
          max-width: 1100px;
          height: 68vh;
          min-height: 480px;
          max-height: 680px;
          scroll-snap-align: start;
          border-radius: 28px;
          overflow: hidden;
          background: #141210;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease;
          flex-shrink: 0;
        }

        .cinematic-panel.is-active {
          border-color: rgba(197, 160, 89, 0.35);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
        }

        .panel-ambient-glow {
          position: absolute;
          inset: 10%;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.5s ease;
        }

        .panel-media-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .panel-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cinematic-panel:hover .panel-media-img {
          transform: scale(1.03);
        }

        /* Cinematic Vignette: dark bottom and edges for high contrast white text */
        .panel-vignette-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10, 10, 8, 0.15) 0%, rgba(10, 10, 8, 0.35) 45%, rgba(10, 10, 8, 0.88) 85%, rgba(10, 10, 8, 0.96) 100%);
          z-index: 2;
        }

        /* Overlaid Typography */
        .panel-overlay-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: clamp(1.75rem, 4vw, 3.25rem);
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          color: #FAF8F5;
        }

        .caption-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: var(--gold-champagne, #C5A059);
          text-transform: uppercase;
        }

        .caption-title {
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(1.8rem, 3.8vw, 2.9rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #FFFFFF;
        }

        .caption-subtitle {
          font-family: var(--font-editorial, 'Cormorant Garamond', serif);
          font-style: italic;
          font-size: clamp(1.1rem, 1.8vw, 1.35rem);
          color: rgba(250, 248, 245, 0.9);
          line-height: 1.35;
        }

        .caption-description {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(250, 248, 245, 0.75);
          max-width: 620px;
          font-weight: 300;
        }

        .caption-action-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-top: 0.75rem;
        }

        .panel-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: #FFFFFF;
          color: #0A0A08;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .panel-explore-btn:hover {
          background: var(--gold-champagne, #C5A059);
          color: #11100E;
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(197, 160, 89, 0.4);
        }

        .arrow-glyph {
          font-size: 1rem;
          transition: transform 0.25s ease;
        }

        .panel-explore-btn:hover .arrow-glyph {
          transform: translateX(4px);
        }

        .panel-secondary-anchor {
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(250, 248, 245, 0.7);
          transition: color 0.2s ease;
        }

        .panel-secondary-anchor:hover {
          color: #FFFFFF;
        }

        /* Minimal Bottom Controller Bar */
        .cinematic-bottom-controller {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.75rem;
        }

        .controller-label-text {
          font-size: 0.95rem;
          color: rgba(250, 248, 245, 0.75);
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .controller-center-indicators {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.45rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .indicator-dot-btn {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator-dot-btn.is-active {
          width: 24px;
          border-radius: 4px;
          background: #FFFFFF;
        }

        .controller-right-arrows {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .arrow-nav-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FAF8F5;
          font-size: 1.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          line-height: 1;
        }

        .arrow-nav-btn:hover:not(:disabled) {
          background: #FFFFFF;
          color: #0A0A08;
        }

        .arrow-nav-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .cinematic-panel {
            width: 88vw;
            height: 60vh;
            min-height: 440px;
            border-radius: 20px;
          }

          .cinematic-track-viewport {
            padding: 0 1rem;
          }

          .cinematic-track-rail {
            gap: 1rem;
          }

          .hide-on-mobile {
            display: none;
          }

          .controller-left-label {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
