import React, { useState, useEffect } from 'react'

/**
 * 01 — CINEMATIC OPENING
 * A dramatic, full-viewport opening built around a large lighting visual.
 * Oversized editorial typography, carefully composed product imagery,
 * meaningful light interaction, and seamless transition into the gallery.
 */
export default function CinematicOpening({ onOpenProduct, onEnquire }) {
  const [luxLevel, setLuxLevel] = useState(85)
  const [cctMode, setCctMode] = useState('2700K') // '2700K' | '3000K' | '4000K'
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const lightGlow = luxLevel / 100
  const heroScale = Math.min(1.1, 1 + scrollY * 0.0002)
  const heroOpacity = Math.max(0.4, 1 - scrollY * 0.0012)

  const cctAuras = {
    '2700K': 'radial-gradient(circle, #FAD790 0%, rgba(226, 175, 80, 0.42) 40%, transparent 75%)',
    '3000K': 'radial-gradient(circle, #FFE5B4 0%, rgba(220, 190, 130, 0.38) 40%, transparent 75%)',
    '4000K': 'radial-gradient(circle, #FFF4E0 0%, rgba(200, 210, 225, 0.32) 40%, transparent 75%)',
  }

  const handleScrollToGallery = (e) => {
    e.preventDefault()
    const target = document.querySelector('#gallery')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="cinematic-opening-root" id="hero" aria-label="Pearl Lighting Opening">
      {/* Volumetric Radial Ambient Stage */}
      <div className="opening-volumetric-void" aria-hidden="true">
        <div
          className="opening-light-bloom"
          style={{
            background: cctAuras[cctMode],
            opacity: 0.2 + lightGlow * 0.5,
            transform: `scale(${1 + lightGlow * 0.15})`,
          }}
        ></div>
        <div className="opening-mesh-radial"></div>
      </div>

      <div className="container opening-content-wrap">
        {/* Curatorial Header Datum */}
        <div className="opening-curator-datum">
          <div className="curator-badge">
            <span className="curator-glyph" aria-hidden="true">✦</span>
            <span>MUMBAI ATELIER • PARTH ENTERPRISES</span>
          </div>
          <span className="curator-edition">2026 EXHIBITION</span>
        </div>

        {/* Monumental Editorial Headline (Centred Hierarchy, No 2-column split) */}
        <div className="opening-hero-text">
          <span className="opening-eyebrow">ARCHITECTURAL & DECORATIVE ILLUMINATION</span>
          <h1 className="opening-monumental-title">
            WHERE LIGHT<br />
            <span className="serif-gold-accent">BECOMES SPACE.</span>
          </h1>
          <p className="opening-manifesto-sub">
            Luminaires engineered not merely to illuminate, but to shape the quiet atmosphere and proportions of contemporary architecture.
          </p>
        </div>

        {/* Centerpiece Staged Lighting Visual */}
        <div className="opening-monolith-stage">
          <div
            className="luminaire-stage-wrapper"
            style={{
              transform: `scale(${heroScale}) translateY(${scrollY * 0.06}px)`,
              opacity: heroOpacity,
            }}
          >
            {/* Luminous Radiance Core */}
            <div
              className="luminaire-bloom-core"
              style={{
                background: cctAuras[cctMode],
                opacity: 0.35 + lightGlow * 0.5,
                filter: `blur(${35 + lightGlow * 30}px)`,
              }}
              aria-hidden="true"
            ></div>

            {/* Natural Contact Shadow */}
            <div className="luminaire-ground-shadow" aria-hidden="true"></div>

            {/* Authentic Luminaire Photograph */}
            <img
              src="/images/products/ceiling-fan-light-501-bk.png"
              alt="Pearl Lighting Model 501-BK Integrated Ceiling Luminaire"
              className="luminaire-hero-img"
              loading="eager"
            />
          </div>
        </div>

        {/* Interactive Ambience & CCT Controls + Action Strip */}
        <div className="opening-interactive-dock">
          <div className="dock-left-actions">
            <a
              href="#gallery"
              className="opening-primary-action"
              onClick={handleScrollToGallery}
            >
              <span>Explore Gallery Exhibition</span>
              <span className="action-arrow" aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="dock-right-controls" role="group" aria-label="Tactile illumination controls">
            {/* 3 CCT Pills */}
            <div className="cct-pills-cluster" role="radiogroup" aria-label="Color Temperature">
              {['2700K', '3000K', '4000K'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`cct-switch-pill ${cctMode === mode ? 'active' : ''}`}
                  onClick={() => setCctMode(mode)}
                  aria-label={`Switch to ${mode} light`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Lux Dial */}
            <div className="lux-dial-box">
              <span className="lux-label">LUX</span>
              <input
                type="range"
                min="40"
                max="100"
                value={luxLevel}
                onChange={(e) => setLuxLevel(Number(e.target.value))}
                className="lux-slider-track"
                aria-label="Adjust illumination intensity"
              />
              <span className="lux-readout">{luxLevel}%</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-opening-root {
          position: relative;
          min-height: 100vh;
          width: 100%;
          background: radial-gradient(circle at 50% 40%, #161411 0%, #0E0D0B 60%, #080706 100%);
          color: #FAF7F2;
          display: flex;
          align-items: center;
          padding: calc(var(--header-height) + 1.5rem) 0 3.5rem;
          overflow: hidden;
        }

        .opening-volumetric-void {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .opening-light-bloom {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70vw;
          height: 70vw;
          border-radius: 50%;
          filter: blur(90px);
          transition: transform 0.6s var(--ease-out-expo), opacity 0.4s ease, background 0.5s ease;
        }

        .opening-content-wrap {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        /* Top Curatorial Datum */
        .opening-curator-datum {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-light-secondary);
          margin-bottom: 2.5rem;
        }

        .curator-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .curator-glyph {
          color: var(--gold-champagne);
        }

        .curator-edition {
          color: var(--gold-champagne);
          font-weight: 600;
        }

        /* Hero Text */
        .opening-hero-text {
          max-width: 920px;
          margin-bottom: 2rem;
        }

        .opening-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          color: var(--gold-champagne);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          display: block;
        }

        .opening-monumental-title {
          font-family: var(--font-sans);
          font-size: clamp(2.6rem, 6.5vw, 5.2rem);
          font-weight: 600;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin-bottom: 1rem;
        }

        .serif-gold-accent {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, #F5D796 0%, #C5A059 60%, #A68037 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .opening-manifesto-sub {
          font-size: clamp(1rem, 1.4vw, 1.18rem);
          line-height: 1.65;
          color: rgba(250, 247, 242, 0.75);
          max-width: 620px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* Monolith Stage */
        .opening-monolith-stage {
          position: relative;
          width: 100%;
          max-width: 680px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1.5rem 0 3rem;
        }

        .luminaire-stage-wrapper {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .luminaire-bloom-core {
          position: absolute;
          inset: 12%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: background 0.5s ease, opacity 0.4s ease;
        }

        .luminaire-ground-shadow {
          position: absolute;
          bottom: 0;
          width: 75%;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, transparent 70%);
          filter: blur(12px);
          pointer-events: none;
          z-index: 1;
        }

        .luminaire-hero-img {
          position: relative;
          z-index: 2;
          width: 82%;
          max-width: 480px;
          max-height: 360px;
          object-fit: contain;
          filter: drop-shadow(0 24px 50px rgba(0, 0, 0, 0.7));
          user-select: none;
        }

        /* Interactive Dock */
        .opening-interactive-dock {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (min-width: 768px) {
          .opening-interactive-dock {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .opening-primary-action {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--gold-champagne);
          color: #11100E;
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.9rem 1.8rem;
          border-radius: 999px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(197, 160, 89, 0.35);
        }

        .opening-primary-action:hover {
          background: #E5C37A;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(197, 160, 89, 0.5);
        }

        .action-arrow {
          font-size: 1rem;
          transition: transform 0.25s ease;
        }

        .opening-primary-action:hover .action-arrow {
          transform: translateY(3px);
        }

        .dock-right-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.55rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cct-pills-cluster {
          display: flex;
          gap: 0.35rem;
        }

        .cct-switch-pill {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: rgba(250, 247, 242, 0.7);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cct-switch-pill.active {
          background: var(--gold-champagne);
          color: #11100E;
        }

        .lux-dial-box {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          padding-left: 0.75rem;
        }

        .lux-label {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--gold-champagne);
          letter-spacing: 0.1em;
        }

        .lux-slider-track {
          width: 70px;
          height: 4px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }

        .lux-slider-track::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--gold-champagne);
          cursor: pointer;
        }

        .lux-readout {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #FAF7F2;
          min-width: 30px;
        }

        @media (max-width: 768px) {
          .cinematic-opening-root {
            padding: calc(var(--header-height) + 1rem) 0 2.5rem;
          }

          .opening-curator-datum .curator-edition {
            display: none;
          }

          .dock-right-controls {
            flex-direction: column;
            border-radius: 16px;
            width: 100%;
          }

          .lux-dial-box {
            border-left: none;
            padding-left: 0;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
