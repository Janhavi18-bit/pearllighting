import React, { useState, useEffect } from 'react'

/**
 * SECTION 1: CINEMATIC HERO OPENING
 * Fusing Apple-grade responsive presentation with Serip-level poetic lighting.
 * Centerpiece: Real Pearl Lighting Model 501-BK Architectural Ceiling Luminaire.
 */
export default function Hero({ onOpenProduct, onEnquire }) {
  const [luxLevel, setLuxLevel] = useState(85)
  const [cctMode, setCctMode] = useState('2700K') // '2700K' | '3000K' | '4000K'
  const [scrollY, setScrollY] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    const handleMouseMove = (e) => {
      if (window.innerWidth <= 768) return
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 14
      const y = (e.clientY / innerHeight - 0.5) * 14
      setMouseOffset({ x, y })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Dynamic scroll-driven scale and reveal for Apple-style transition
  const heroScale = Math.min(1.12, 1 + scrollY * 0.00025)
  const heroOpacity = Math.max(0.45, 1 - scrollY * 0.001)
  const lightGlow = luxLevel / 100

  // Aura colors based on color temperature
  const cctAuras = {
    '2700K': 'radial-gradient(circle, #FAD790 0%, rgba(226, 175, 80, 0.45) 45%, transparent 75%)',
    '3000K': 'radial-gradient(circle, #FFE5B4 0%, rgba(220, 190, 130, 0.40) 45%, transparent 75%)',
    '4000K': 'radial-gradient(circle, #FFF4E0 0%, rgba(200, 210, 225, 0.35) 45%, transparent 75%)',
  }

  const handleExploreClick = (e) => {
    e.preventDefault()
    const target = document.querySelector('#interactive-story') || document.querySelector('#collection')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-cinema-root" id="hero" aria-label="Pearl Lighting Opening Salon">
      {/* Dynamic Atmospheric Radial Light Stage */}
      <div className="hero-ambient-canvas" aria-hidden="true">
        <div
          className="hero-light-bloom"
          style={{
            background: cctAuras[cctMode],
            opacity: 0.22 + lightGlow * 0.45,
            transform: `scale(${1 + lightGlow * 0.18}) translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px)`,
          }}
        ></div>
        <div className="hero-subtle-mesh"></div>
      </div>

      <div className="container hero-viewport-content">
        {/* Curatorial Header Stamp */}
        <div className="hero-curator-rail">
          <div className="hero-curator-tag">
            <span className="curator-dot" aria-hidden="true">✦</span>
            <span>MUMBAI ATELIER • ARCHITECTURAL ILLUMINATION</span>
          </div>
          <span className="hero-curator-year">PARTH ENTERPRISES • 2026</span>
        </div>

        {/* Hero Visual & Typographic Stage */}
        <div className="hero-stage-grid">
          {/* Typography & Actions */}
          <div className="hero-text-monograph">
            <span className="hero-pretitle">ARCHITECTURAL REPERTOIRE</span>
            <h1 className="hero-monumental-title">
              WHERE LIGHT<br />
              <span className="serif-gold-italic">BECOMES SPACE.</span>
            </h1>

            <p className="hero-manifesto-para">
              Luminaires engineered where optical precision, thermal discipline, and sculptural permanence exist in unbroken harmony. Conceived not to decorate a ceiling, but to shape the living atmosphere of contemporary architecture.
            </p>

            <div className="hero-actions-cluster">
              <a
                href="#collection"
                className="hero-primary-btn"
                onClick={handleExploreClick}
                aria-label="Explore the architectural collection"
              >
                <span>Explore Collection</span>
                <span className="btn-glyph" aria-hidden="true">↓</span>
              </a>

              {/* Interactive CCT Mood & Lux Controls */}
              <div className="hero-lux-dial" role="group" aria-label="Tactile light controls">
                {/* 3 CCT Pills */}
                <div className="cct-selector-strip" role="radiogroup" aria-label="Color Temperature">
                  {['2700K', '3000K', '4000K'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`cct-pill-btn ${cctMode === mode ? 'active' : ''}`}
                      onClick={() => setCctMode(mode)}
                      aria-label={`Switch to ${mode} lighting`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <div className="dial-slider-wrap">
                  <span className="dial-tag">LUX</span>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={luxLevel}
                    onChange={(e) => setLuxLevel(Number(e.target.value))}
                    className="dial-slider-input"
                    aria-label="Adjust illumination intensity"
                  />
                  <span className="dial-readout">{luxLevel}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Centerpiece Real Luminaire Staged in Space */}
          <div className="hero-luminaire-monolith">
            <div
              className="hero-luminaire-wrapper"
              style={{
                transform: `scale(${heroScale}) translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
                opacity: heroOpacity,
              }}
            >
              {/* Luminous Core Glow Tinted to CCT Mode */}
              <div
                className="luminaire-radiance-aura"
                style={{
                  background: cctAuras[cctMode],
                  opacity: 0.28 + lightGlow * 0.52,
                  filter: `blur(${38 + lightGlow * 28}px)`,
                }}
                aria-hidden="true"
              ></div>

              {/* Contact Ground Shadow */}
              <div
                className="luminaire-ground-shadow"
                style={{ opacity: 0.7 }}
                aria-hidden="true"
              ></div>

              {/* Authentic Luminaire Photograph */}
              <img
                src="/images/products/ceiling-fan-light-501-bk.png"
                alt="Pearl Lighting Model 501-BK Integrated Ceiling Luminaire"
                className="hero-luminaire-img"
                loading="eager"
              />

              {/* Architectural Monograph Plaque */}
              <div className="hero-luminaire-badge">
                <div className="badge-marker">✦</div>
                <div className="badge-details">
                  <span className="badge-name">MODEL 501-BK</span>
                  <span className="badge-desc">Integrated Ceiling Luminaire & Aerodynamic Equilibrium • {cctMode} Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizon Invitation */}
        <div className="hero-bottom-rail">
          <div className="hero-scroll-cue">
            <span className="scroll-pulse-dot" aria-hidden="true"></span>
            <span className="scroll-cue-text">SCROLL TO EXPERIENCE PRODUCT INNOVATION</span>
          </div>
          <div className="hero-collection-stamp">
            <span>7 ARCHITECTURAL FAMILIES • FESTIVE CELESTIAL SALON</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-cinema-root {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: radial-gradient(circle at 65% 45%, #181613 0%, #100F0D 60%, #0A0A08 100%);
          color: #FAF8F5;
          display: flex;
          align-items: center;
          padding: calc(var(--header-height) + 1.5rem) 0 3.25rem;
          overflow: hidden;
        }

        .hero-ambient-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .hero-light-bloom {
          position: absolute;
          top: 15%;
          right: 15%;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          filter: blur(85px);
          transition: transform 0.6s var(--ease-spring), opacity 0.4s ease, background 0.5s ease;
        }

        .hero-viewport-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          min-height: calc(100vh - var(--header-height) - 4.75rem);
        }

        /* Curatorial Rail */
        .hero-curator-rail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-secondary-light);
        }

        .hero-curator-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .curator-dot {
          color: var(--gold-champagne);
          font-size: 0.75rem;
        }

        .hero-curator-year {
          color: var(--gold-champagne);
          font-weight: 600;
        }

        /* Hero Stage Grid */
        .hero-stage-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.75rem;
          align-items: center;
          padding: 2.5rem 0 3.5rem;
        }

        @media (min-width: 960px) {
          .hero-stage-grid {
            grid-template-columns: 1.05fr 1.15fr;
            gap: 4.5rem;
            padding: 3.5rem 0;
          }
        }

        /* Monograph Text */
        .hero-text-monograph {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .hero-pretitle {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold-champagne);
        }

        .hero-monumental-title {
          font-family: var(--font-sans);
          font-size: clamp(2.35rem, 5.5vw, 4.4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #FAF8F5;
        }

        .serif-gold-italic {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, #F5D796 0%, #C5A059 60%, #A68037 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-manifesto-para {
          font-size: clamp(0.95rem, 1.4vw, 1.12rem);
          line-height: 1.65;
          color: var(--text-secondary-light);
          max-width: 540px;
          font-weight: 300;
        }

        .hero-actions-cluster {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .hero-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--gold-champagne);
          color: #11100E;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.95rem 1.85rem;
          border-radius: 999px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(197, 160, 89, 0.3);
        }

        .hero-primary-btn:hover {
          background: #E5C37A;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(197, 160, 89, 0.45);
        }

        .btn-glyph {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }

        .hero-primary-btn:hover .btn-glyph {
          transform: translateY(3px);
        }

        /* Tactile Lux Dial with CCT Selector */
        .hero-lux-dial {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.65rem 1rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .cct-selector-strip {
          display: flex;
          gap: 0.35rem;
        }

        .cct-pill-btn {
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.25rem 0.55rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-secondary-light);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .cct-pill-btn.active {
          background: var(--gold-champagne);
          color: #11100E;
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.4);
        }

        .dial-slider-wrap {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .dial-tag {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: var(--gold-champagne);
        }

        .dial-slider-input {
          width: 80px;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }

        .dial-slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--gold-champagne);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(197, 160, 89, 0.8);
        }

        .dial-readout {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: #FAF8F5;
          min-width: 32px;
        }

        /* Luminaire Monolith */
        .hero-luminaire-monolith {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .hero-luminaire-wrapper {
          position: relative;
          width: 100%;
          max-width: 580px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .luminaire-radiance-aura {
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.4s ease, background 0.5s ease;
        }

        .luminaire-ground-shadow {
          position: absolute;
          bottom: 2%;
          width: 78%;
          height: 16%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, transparent 70%);
          filter: blur(14px);
          pointer-events: none;
          z-index: 1;
        }

        .hero-luminaire-img {
          position: relative;
          z-index: 2;
          width: 90%;
          max-width: 520px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7));
          user-select: none;
          transition: transform 0.4s ease;
        }

        .hero-luminaire-badge {
          position: absolute;
          bottom: -15px;
          left: 5%;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 1.1rem;
          background: rgba(20, 18, 16, 0.9);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .badge-marker {
          color: var(--gold-champagne);
          font-size: 0.85rem;
        }

        .badge-details {
          display: flex;
          flex-direction: column;
        }

        .badge-name {
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #FAF8F5;
        }

        .badge-desc {
          font-size: 0.68rem;
          color: var(--text-muted-light);
        }

        /* Bottom Rail */
        .hero-bottom-rail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-secondary-light);
        }

        .hero-scroll-cue {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .scroll-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold-champagne);
          animation: pulseDot 2s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.4); }
        }

        @media (max-width: 768px) {
          .hero-cinema-root {
            padding: calc(var(--header-height) + 1rem) 0 2rem;
          }

          .hero-stage-grid {
            gap: 2rem;
            padding: 1.5rem 0 2rem;
          }

          .hero-luminaire-badge {
            left: 50%;
            transform: translateX(-50%);
            bottom: -10px;
            width: max-content;
            max-width: 90%;
          }

          .hero-curator-rail .hero-curator-year,
          .hero-bottom-rail .hero-collection-stamp {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
