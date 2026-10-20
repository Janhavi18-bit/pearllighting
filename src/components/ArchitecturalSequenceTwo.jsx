import React, { useState } from 'react'
import { productsData } from '../data/productsData'

/**
 * Chapter IV: Architectural Luminaire Discovery — Sequence II
 * 
 * 1. The Planar & Surface Counterpoint (Slim Panel & Surface Panel)
 * 2. Exterior Architectural Engineering (LED Flood Light)
 * 3. The Continuous Luminous Horizon (Rope Light panoramic ribbon)
 */
export default function ArchitecturalSequenceTwo({ onOpenProduct }) {
  const slimPanel = productsData.find((p) => p.id === 'slim-panel')
  const surfacePanel = productsData.find((p) => p.id === 'surface-panel')
  const floodLight = productsData.find((p) => p.id === 'led-flood-light')
  const ropeLight = productsData.find((p) => p.id === 'rope-light')

  const [slimImg, setSlimImg] = useState('/images/products/slim-panel-round.png')
  const [surfaceImg, setSurfaceImg] = useState('/images/products/surface-panel-round-black.png')
  const [floodImg, setFloodImg] = useState('/images/products/led-flood-light-duo.png')
  const [ropeImg, setRopeImg] = useState('/images/products/rope-light-primary-warm.png')

  const handleOpen = (product) => {
    if (onOpenProduct && product) {
      onOpenProduct(product)
    }
  }

  return (
    <section className="seq-two-root" id="collection" aria-label="Architectural Discovery Sequence Two">
      <div className="container seq-two-container">
        {/* Sequence Coordinate Tag */}
        <header className="seq-two-header">
          <div className="seq-tag-bar">
            <span className="seq-num">04</span>
            <span className="seq-rule" aria-hidden="true"></span>
            <span className="seq-tag-label">ARCHITECTURAL REPERTOIRE • SEQUENCE II</span>
          </div>

          <div className="seq-two-headline-spread">
            <h2 className="seq-two-title">
              PLANAR, CONTOUR &<br />
              <span className="gold-italic">EXTERIOR EDITIONS.</span>
            </h2>
            <p className="seq-two-lead">
              From seamless ceiling planar integration to continuous glowing cove ribbons and rugged exterior architectural illumination.
            </p>
          </div>
        </header>

        {/* ── 1. PLANAR & SURFACE COUNTERPOINT (SLIM PANEL & SURFACE PANEL) ── */}
        <div className="planar-surface-duet-grid">
          {/* Slim Panel */}
          {slimPanel && (
            <div
              className="duet-pedestal-card card-slim-panel"
              onClick={() => handleOpen(slimPanel)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(slimPanel) : null)}
              aria-label={`Explore ${slimPanel.name}`}
            >
              <div className="card-top-marker">
                <span className="pedestal-num">04</span>
                <span className="pedestal-category">{slimPanel.subtitle}</span>
              </div>

              <div className="pedestal-image-chamber">
                <div className="chamber-glow-pool" aria-hidden="true"></div>
                <img
                  src={slimImg}
                  alt={slimPanel.name}
                  className="pedestal-fixture-img"
                  loading="lazy"
                />
              </div>

              <div className="pedestal-bottom-info">
                <h3 className="fixture-title">{slimPanel.name}</h3>
                <p className="fixture-statement">{slimPanel.description}</p>

                <div
                  className="fixture-finish-swatches"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={`swatch-btn ${slimImg === '/images/products/slim-panel-round.png' ? 'is-active' : ''}`}
                    onClick={() => setSlimImg('/images/products/slim-panel-round.png')}
                  >
                    Round Ambient Disc
                  </button>
                  <button
                    type="button"
                    className={`swatch-btn ${slimImg === '/images/products/slim-panel-square.png' ? 'is-active' : ''}`}
                    onClick={() => setSlimImg('/images/products/slim-panel-square.png')}
                  >
                    Square Flush Profile
                  </button>
                </div>

                <div className="pedestal-explore-prompt">
                  <span>EXPLORE ARCHIVE</span>
                  <span className="arrow-glyph" aria-hidden="true">↗</span>
                </div>
              </div>
            </div>
          )}

          {/* Surface Panel */}
          {surfacePanel && (
            <div
              className="duet-pedestal-card card-surface-panel"
              onClick={() => handleOpen(surfacePanel)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(surfacePanel) : null)}
              aria-label={`Explore ${surfacePanel.name}`}
            >
              <div className="card-top-marker">
                <span className="pedestal-num">05</span>
                <span className="pedestal-category">{surfacePanel.subtitle}</span>
              </div>

              <div className="pedestal-image-chamber">
                <div className="chamber-glow-pool" aria-hidden="true"></div>
                <img
                  src={surfaceImg}
                  alt={surfacePanel.name}
                  className="pedestal-fixture-img"
                  loading="lazy"
                />
              </div>

              <div className="pedestal-bottom-info">
                <h3 className="fixture-title">{surfacePanel.name}</h3>
                <p className="fixture-statement">{surfacePanel.description}</p>

                <div
                  className="fixture-finish-swatches"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={`swatch-btn ${surfaceImg === '/images/products/surface-panel-round-black.png' ? 'is-active' : ''}`}
                    onClick={() => setSurfaceImg('/images/products/surface-panel-round-black.png')}
                  >
                    Matte Black
                  </button>
                  <button
                    type="button"
                    className={`swatch-btn ${surfaceImg === '/images/products/surface-panel-round-white.png' ? 'is-active' : ''}`}
                    onClick={() => setSurfaceImg('/images/products/surface-panel-round-white.png')}
                  >
                    Pure White
                  </button>
                  <button
                    type="button"
                    className={`swatch-btn ${surfaceImg === '/images/products/surface-panel-duo.png' ? 'is-active' : ''}`}
                    onClick={() => setSurfaceImg('/images/products/surface-panel-duo.png')}
                  >
                    Architectural Duo
                  </button>
                </div>

                <div className="pedestal-explore-prompt">
                  <span>EXPLORE ARCHIVE</span>
                  <span className="arrow-glyph" aria-hidden="true">↗</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── 2. EXTERIOR ARCHITECTURAL ENGINEERING (LED FLOOD LIGHT) ── */}
        {floodLight && (
          <div className="floodlight-architectural-spread">
            <div
              className="floodlight-stage-card"
              onClick={() => handleOpen(floodLight)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(floodLight) : null)}
              aria-label={`Explore ${floodLight.name}`}
            >
              <div className="floodlight-inner-grid">
                <div className="floodlight-visual-chamber">
                  <div className="floodlight-heatsink-bloom" aria-hidden="true"></div>
                  <img
                    src={floodImg}
                    alt={floodLight.name}
                    className="floodlight-img"
                    loading="lazy"
                  />
                </div>

                <div className="floodlight-narrative-flank">
                  <div className="floodlight-index-bar">
                    <span className="fl-num">06</span>
                    <span className="fl-sub">{floodLight.subtitle}</span>
                  </div>

                  <h3 className="floodlight-title">{floodLight.name}</h3>
                  <p className="floodlight-statement">{floodLight.description}</p>

                  <div className="floodlight-thermal-pill">
                    <span className="pill-dot">✦</span>
                    <span>Precision die-cast alloy heat dissipation channels for enduring exterior architectural performance.</span>
                  </div>

                  <div
                    className="floodlight-swatches"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      className={`swatch-btn ${floodImg === '/images/products/led-flood-light-duo.png' ? 'is-active' : ''}`}
                      onClick={() => setFloodImg('/images/products/led-flood-light-duo.png')}
                    >
                      Heatsink Architecture
                    </button>
                    <button
                      type="button"
                      className={`swatch-btn ${floodImg === '/images/products/led-flood-light-angle.png' ? 'is-active' : ''}`}
                      onClick={() => setFloodImg('/images/products/led-flood-light-angle.png')}
                    >
                      Mounting Bracket Angle
                    </button>
                  </div>

                  <div className="floodlight-explore-action">
                    <span>EXPLORE EXTERIOR EDITIONS</span>
                    <span className="arrow-glyph" aria-hidden="true">↗</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── 3. PANORAMIC CONTINUOUS LUMINOUS HORIZON (ROPE LIGHT) ── */}
        {ropeLight && (
          <div className="panoramic-horizon-stage">
            <div
              className="horizon-card-wrapper"
              onClick={() => handleOpen(ropeLight)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(ropeLight) : null)}
              aria-label={`Explore ${ropeLight.name}`}
            >
              <div className="horizon-top-rail">
                <span className="hz-num">07</span>
                <span className="hz-series">{ropeLight.subtitle}</span>
              </div>

              {/* Panoramic Visual Chamber */}
              <div className="horizon-visual-arena">
                <div className="horizon-ambient-amber-pool" aria-hidden="true"></div>
                <img
                  src={ropeImg}
                  alt={ropeLight.name}
                  className="horizon-luminous-img"
                  loading="lazy"
                />
              </div>

              <div className="horizon-bottom-flank">
                <div className="horizon-text-block">
                  <h3 className="horizon-product-title">{ropeLight.name}</h3>
                  <p className="horizon-statement">{ropeLight.description}</p>
                </div>

                <div
                  className="horizon-color-mood-swatches"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className={`swatch-btn ${ropeImg === '/images/products/rope-light-primary-warm.png' ? 'is-active' : ''}`}
                    onClick={() => setRopeImg('/images/products/rope-light-primary-warm.png')}
                  >
                    Warm Amber Glow
                  </button>
                  <button
                    type="button"
                    className={`swatch-btn ${ropeImg === '/images/products/rope-light-blue-reel.png' ? 'is-active' : ''}`}
                    onClick={() => setRopeImg('/images/products/rope-light-blue-reel.png')}
                  >
                    Sapphire Blue Contour
                  </button>
                  <button
                    type="button"
                    className={`swatch-btn ${ropeImg === '/images/products/rope-light-green-spool.png' ? 'is-active' : ''}`}
                    onClick={() => setRopeImg('/images/products/rope-light-green-spool.png')}
                  >
                    Emerald Green Spool
                  </button>
                </div>

                <div className="horizon-explore-cta">
                  <span>EXPLORE SPECIFICATIONS</span>
                  <span className="arrow-glyph" aria-hidden="true">↗</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* ── Root Architecture ── */
        .seq-two-root {
          position: relative;
          width: 100%;
          background: #141210;
          color: #FAF7F2;
          padding: 8rem 0 8.5rem;
          border-top: 1px solid rgba(212, 175, 55, 0.14);
        }

        .seq-two-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 4vw, 4rem);
        }

        .seq-two-header {
          margin-bottom: 5.5rem;
        }

        .seq-tag-bar {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .seq-num {
          font-family: var(--font-serif, serif);
          font-size: 1.2rem;
          color: #D4AF37;
          font-weight: 500;
        }

        .seq-rule {
          width: 44px;
          height: 1px;
          background: rgba(212, 175, 55, 0.35);
        }

        .seq-tag-label {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #B5AEA4;
          font-weight: 600;
        }

        .seq-two-headline-spread {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: clamp(2rem, 5vw, 5rem);
          align-items: flex-end;
        }

        .seq-two-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(2.8rem, 5.5vw, 4.4rem);
          line-height: 0.98;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: #FAF7F2;
          margin: 0;
        }

        .gold-italic {
          font-style: italic;
          color: #D4AF37;
        }

        .seq-two-lead {
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(0.98rem, 1.2vw, 1.12rem);
          line-height: 1.7;
          color: #B5AEA4;
          max-width: 540px;
          margin: 0;
        }

        /* ── 1. Planar & Surface Duet ── */
        .planar-surface-duet-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3.5vw, 3.5rem);
          margin-bottom: 5rem;
        }

        .duet-pedestal-card {
          position: relative;
          background: rgba(24, 21, 18, 0.7);
          border: 1px solid rgba(212, 175, 55, 0.16);
          border-radius: 4px;
          padding: clamp(1.75rem, 3vw, 2.75rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          outline: none;
        }

        .duet-pedestal-card:hover,
        .duet-pedestal-card:focus-visible {
          border-color: rgba(212, 175, 55, 0.5);
          background: rgba(30, 26, 22, 0.9);
          transform: translateY(-4px);
          box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.65);
        }

        .card-top-marker {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .pedestal-num {
          font-family: var(--font-serif, serif);
          font-size: 1.25rem;
          color: #D4AF37;
          font-weight: 500;
        }

        .pedestal-category {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8A8276;
        }

        .pedestal-image-chamber {
          position: relative;
          min-height: 330px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          margin-bottom: 1.5rem;
        }

        .chamber-glow-pool {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 75%;
          height: 75%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .pedestal-fixture-img {
          position: relative;
          z-index: 2;
          max-width: 90%;
          max-height: 320px;
          object-fit: contain;
          filter: drop-shadow(0 16px 32px rgba(0, 0, 0, 0.6));
          transition: transform 0.5s ease;
        }

        .duet-pedestal-card:hover .pedestal-fixture-img {
          transform: scale(1.03) translateY(-4px);
        }

        .pedestal-bottom-info {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 1.5rem;
        }

        .fixture-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(1.4rem, 2vw, 1.85rem);
          color: #FAF7F2;
          margin: 0;
          font-weight: 400;
        }

        .fixture-statement {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.88rem;
          line-height: 1.6;
          color: #B5AEA4;
          margin: 0;
        }

        .fixture-finish-swatches {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.45rem;
          padding: 0.25rem 0;
        }

        .swatch-btn {
          background: rgba(35, 31, 26, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 999px;
          padding: 0.45rem 1rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.74rem;
          color: #B5AEA4;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .swatch-btn:hover {
          background: rgba(212, 175, 55, 0.18);
          color: #FAF7F2;
          border-color: #D4AF37;
        }

        .swatch-btn.is-active {
          background: #D4AF37;
          color: #11100E;
          border-color: #D4AF37;
          font-weight: 600;
        }

        .pedestal-explore-prompt {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #D4AF37;
          margin-top: 0.5rem;
        }

        /* ── 2. Exterior LED Flood Light Spread ── */
        .floodlight-architectural-spread {
          margin-bottom: 5rem;
        }

        .floodlight-stage-card {
          position: relative;
          background: rgba(24, 21, 18, 0.8);
          border: 1px solid rgba(212, 175, 55, 0.18);
          border-radius: 4px;
          padding: clamp(2rem, 4vw, 3.5rem);
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          outline: none;
        }

        .floodlight-stage-card:hover,
        .floodlight-stage-card:focus-visible {
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.7);
          transform: translateY(-4px);
        }

        .floodlight-inner-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 4.5rem);
          align-items: center;
        }

        .floodlight-visual-chamber {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 380px;
        }

        .floodlight-heatsink-bloom {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }

        .floodlight-img {
          position: relative;
          z-index: 2;
          max-width: 90%;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.7));
          transition: transform 0.5s ease;
        }

        .floodlight-stage-card:hover .floodlight-img {
          transform: scale(1.03) translateY(-4px);
        }

        .floodlight-narrative-flank {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .floodlight-index-bar {
          display: flex;
          align-items: baseline;
          gap: 1rem;
        }

        .fl-num {
          font-family: var(--font-serif, serif);
          font-size: 1.15rem;
          color: #D4AF37;
          font-weight: 500;
        }

        .fl-sub {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.74rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8A8276;
        }

        .floodlight-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          color: #FAF7F2;
          margin: 0;
          font-weight: 300;
        }

        .floodlight-statement {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.95rem;
          line-height: 1.65;
          color: #B5AEA4;
          margin: 0;
        }

        .floodlight-thermal-pill {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.82rem;
          color: #8A8276;
          padding: 0.75rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .pill-dot {
          color: #D4AF37;
        }

        .floodlight-swatches {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding-top: 0.25rem;
        }

        .floodlight-explore-action {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #D4AF37;
          padding-top: 0.5rem;
        }

        /* ── 3. Panoramic Continuous Luminous Horizon ── */
        .panoramic-horizon-stage {
          width: 100%;
        }

        .horizon-card-wrapper {
          position: relative;
          background: rgba(24, 21, 18, 0.85);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 4px;
          padding: clamp(2rem, 4vw, 3.5rem);
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          overflow: hidden;
          outline: none;
        }

        .horizon-card-wrapper:hover,
        .horizon-card-wrapper:focus-visible {
          border-color: rgba(212, 175, 55, 0.55);
          box-shadow: 0 24px 64px -12px rgba(0, 0, 0, 0.75);
          transform: translateY(-4px);
        }

        .horizon-top-rail {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }

        .hz-num {
          font-family: var(--font-serif, serif);
          font-size: 1.25rem;
          color: #D4AF37;
          font-weight: 500;
        }

        .hz-series {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8A8276;
        }

        .horizon-visual-arena {
          position: relative;
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1rem;
          margin-bottom: 2rem;
        }

        .horizon-ambient-amber-pool {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 85%;
          height: 85%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 215, 140, 0.2) 0%, transparent 75%);
          filter: blur(50px);
          pointer-events: none;
        }

        .horizon-luminous-img {
          position: relative;
          z-index: 2;
          max-width: 95%;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 20px 45px rgba(0, 0, 0, 0.75));
          transition: transform 0.5s ease;
        }

        .horizon-card-wrapper:hover .horizon-luminous-img {
          transform: scale(1.03) translateY(-4px);
        }

        .horizon-bottom-flank {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 1.75rem;
        }

        .horizon-text-block {
          max-width: 480px;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .horizon-product-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(1.6rem, 2.4vw, 2.2rem);
          color: #FAF7F2;
          margin: 0;
          font-weight: 300;
        }

        .horizon-statement {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.92rem;
          line-height: 1.6;
          color: #B5AEA4;
          margin: 0;
        }

        .horizon-color-mood-swatches {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .horizon-explore-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #D4AF37;
        }

        /* ── Responsive Refinements ── */
        @media (max-width: 1024px) {
          .seq-two-root {
            padding: 6rem 0 5.5rem;
          }

          .seq-two-headline-spread {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .planar-surface-duet-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .floodlight-inner-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .horizon-bottom-flank {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 768px) {
          .seq-two-root {
            padding: 4.5rem 0 4rem;
          }

          .seq-two-title {
            font-size: clamp(2.4rem, 8vw, 3.4rem);
          }

          .duet-pedestal-card {
            padding: 1.75rem 1.25rem;
          }

          .pedestal-image-chamber {
            min-height: 240px;
            padding: 1rem 0;
          }

          .pedestal-fixture-img {
            max-height: 240px;
          }

          .floodlight-stage-card {
            padding: 1.75rem 1.25rem;
          }

          .floodlight-visual-chamber {
            min-height: 250px;
          }

          .floodlight-img {
            max-height: 250px;
          }

          .horizon-card-wrapper {
            padding: 1.75rem 1.25rem;
          }

          .horizon-visual-arena {
            min-height: 250px;
          }

          .horizon-luminous-img {
            max-height: 250px;
          }
        }
      `}</style>
    </section>
  )
}
