import React, { useState } from 'react'
import { productsData } from '../data/productsData'

/**
 * ProductCollageSpread - The Curated Architectural Collection
 * 
 * Inspired by the artistic direction, spatial composition, and editorial pacing of Serip Design:
 * - Replaces generic boxed cards and the oversized empty left column with an intentional, image-led exhibition.
 * - Highlights all seven authentic Pearl Lighting product families with varied visual scales and rhythms.
 * - Features interactive authentic finish / perspective switchers directly on the pedestals.
 * - Restrained typography: Product name and series prominence, keeping technical clutter secondary.
 * - Subtle, purposeful interactions: warm radial luminescence bloom, smooth image crossfade, and modal trigger.
 * - Fully responsive with dedicated mobile editorial art direction and zero horizontal overflow.
 */
export default function ProductCollageSpread({ onOpenProduct }) {
  // Find all 7 authentic product families from data
  const curveCob = productsData.find((p) => p.id === 'curve-cob')
  const deepDownlight = productsData.find((p) => p.id === 'deep-downlight')
  const slimPanel = productsData.find((p) => p.id === 'slim-panel')
  const surfacePanel = productsData.find((p) => p.id === 'surface-panel')
  const moveableCob = productsData.find((p) => p.id === 'moveable-cob')
  const ledFloodLight = productsData.find((p) => p.id === 'led-flood-light')
  const ropeLight = productsData.find((p) => p.id === 'rope-light')

  // Interactive image variant selectors for authentic finishes
  const [curveCobImg, setCurveCobImg] = useState('/images/products/curve-cob-duo.png')
  const [deepDownlightImg, setDeepDownlightImg] = useState('/images/products/deep-downlight-round-black-studio.png')
  const [slimPanelImg, setSlimPanelImg] = useState('/images/products/slim-panel-round.png')
  const [surfacePanelImg, setSurfacePanelImg] = useState('/images/products/surface-panel-round-black.png')
  const [moveableCobImg, setMoveableCobImg] = useState('/images/products/moveable-cob-duo.png')
  const [floodLightImg, setFloodLightImg] = useState('/images/products/led-flood-light-duo.png')
  const [ropeLightImg, setRopeLightImg] = useState('/images/products/rope-light-primary-warm.png')

  const handleOpen = (product) => {
    if (onOpenProduct && product) {
      onOpenProduct(product)
    }
  }

  return (
    <section
      className="collection-editorial-root"
      id="collection"
      aria-label="Pearl Lighting Architectural Collection"
    >
      {/* Anchor for backward compatibility with Hero and Navbar */}
      <span id="product-collage" className="anchor-shim" aria-hidden="true"></span>

      {/* Subtle ambient lighting veil */}
      <div className="collection-ambient-atmosphere" aria-hidden="true"></div>

      <div className="collection-master-container">
        {/* ── Section Header: Balanced, Wide-Span Architectural Editorial Title ── */}
        <header className="collection-header-block">
          <div className="collection-marker-row">
            <span className="marker-index">02</span>
            <span className="marker-rule" aria-hidden="true"></span>
            <span className="marker-tag">ARCHITECTURAL REPERTOIRE • SEVEN EDITIONS</span>
          </div>

          <div className="collection-headline-spread">
            <h2 className="collection-monumental-title">
              THE <span className="title-italic">COLLECTION.</span>
            </h2>
            <p className="collection-lead-statement">
              Seven distinct architectural typologies conceived to exist in conversation with space, material honesty, and quiet luminous balance.
            </p>
          </div>
        </header>

        {/* ── MOVEMENT I: The Recessed Sculptural Focal (Curve COB & Deep Down Light) ── */}
        <div className="editorial-movement movement-recessed-focal">
          {/* Movement I-A: Curve COB Monumental Focal Pedestal */}
          {curveCob && (
            <article
              className="pedestal-card pedestal-curve-cob"
              onClick={() => handleOpen(curveCob)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(curveCob) : null)}
              aria-label={`Explore ${curveCob.name}`}
            >
              <div className="pedestal-header-bar">
                <span className="pedestal-index">01</span>
                <span className="pedestal-series">{curveCob.subtitle}</span>
              </div>

              <div className="pedestal-visual-chamber">
                <div className="chamber-luminous-bloom bloom-warm" aria-hidden="true"></div>
                <img
                  src={curveCobImg}
                  alt={curveCob.name}
                  className="pedestal-product-image focal-img"
                  loading="lazy"
                />
              </div>

              <div className="pedestal-footer-spread">
                <div className="pedestal-title-group">
                  <h3 className="pedestal-product-name">{curveCob.name}</h3>
                  <p className="pedestal-description">{curveCob.description}</p>
                </div>

                <div className="pedestal-interactive-cluster">
                  {/* Finish switchers */}
                  <div
                    className="finish-switcher-row"
                    onClick={(e) => e.stopPropagation()}
                    role="group"
                    aria-label="Curve COB Finish Options"
                  >
                    <button
                      type="button"
                      className={`finish-pill-btn ${curveCobImg === '/images/products/curve-cob-duo.png' ? 'is-active' : ''}`}
                      onClick={() => setCurveCobImg('/images/products/curve-cob-duo.png')}
                      aria-label="View Architectural Duo finish"
                    >
                      Duo Finish
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${curveCobImg === '/images/products/curve-cob-rose-gold.png' ? 'is-active' : ''}`}
                      onClick={() => setCurveCobImg('/images/products/curve-cob-rose-gold.png')}
                      aria-label="View Rose Gold Reflector"
                    >
                      Rose Gold
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${curveCobImg === '/images/products/curve-cob-white-recessed.png' ? 'is-active' : ''}`}
                      onClick={() => setCurveCobImg('/images/products/curve-cob-white-recessed.png')}
                      aria-label="View White Recessed Baffle"
                    >
                      White Baffle
                    </button>
                  </div>

                  <span className="pedestal-explore-prompt">
                    <span>EXPLORE ARCHIVE</span>
                    <span className="prompt-glyph" aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Movement I-B: Deep Down Light Vertical Studio Companion */}
          {deepDownlight && (
            <article
              className="pedestal-card pedestal-deep-downlight"
              onClick={() => handleOpen(deepDownlight)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(deepDownlight) : null)}
              aria-label={`Explore ${deepDownlight.name}`}
            >
              <div className="pedestal-header-bar">
                <span className="pedestal-index">02</span>
                <span className="pedestal-series">{deepDownlight.subtitle}</span>
              </div>

              <div className="pedestal-visual-chamber">
                <div className="chamber-luminous-bloom bloom-soft" aria-hidden="true"></div>
                <img
                  src={deepDownlightImg}
                  alt={deepDownlight.name}
                  className="pedestal-product-image companion-img"
                  loading="lazy"
                />
              </div>

              <div className="pedestal-footer-spread">
                <div className="pedestal-title-group">
                  <h3 className="pedestal-product-name">{deepDownlight.name}</h3>
                  <p className="pedestal-description">{deepDownlight.description}</p>
                </div>

                <div className="pedestal-interactive-cluster">
                  <div
                    className="finish-switcher-row"
                    onClick={(e) => e.stopPropagation()}
                    role="group"
                    aria-label="Deep Downlight Finish Options"
                  >
                    <button
                      type="button"
                      className={`finish-pill-btn ${deepDownlightImg === '/images/products/deep-downlight-round-black-studio.png' ? 'is-active' : ''}`}
                      onClick={() => setDeepDownlightImg('/images/products/deep-downlight-round-black-studio.png')}
                      aria-label="View Studio Black finish"
                    >
                      Studio Black
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${deepDownlightImg === '/images/products/deep-downlight-duo.png' ? 'is-active' : ''}`}
                      onClick={() => setDeepDownlightImg('/images/products/deep-downlight-duo.png')}
                      aria-label="View Round and Square Duo"
                    >
                      Duo
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${deepDownlightImg === '/images/products/deep-downlight-round-white.png' ? 'is-active' : ''}`}
                      onClick={() => setDeepDownlightImg('/images/products/deep-downlight-round-white.png')}
                      aria-label="View Pure White finish"
                    >
                      White
                    </button>
                  </div>

                  <span className="pedestal-explore-prompt">
                    <span>EXPLORE ARCHIVE</span>
                    <span className="prompt-glyph" aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* ── MOVEMENT II: The Planar & Surface Counterpoint (Slim Panel & Surface Panel) ── */}
        <div className="editorial-movement movement-planar-duet">
          {/* Movement II-A: Slim Panel Light */}
          {slimPanel && (
            <article
              className="pedestal-card pedestal-slim-panel"
              onClick={() => handleOpen(slimPanel)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(slimPanel) : null)}
              aria-label={`Explore ${slimPanel.name}`}
            >
              <div className="pedestal-header-bar">
                <span className="pedestal-index">03</span>
                <span className="pedestal-series">{slimPanel.subtitle}</span>
              </div>

              <div className="pedestal-visual-chamber">
                <div className="chamber-luminous-bloom bloom-wide" aria-hidden="true"></div>
                <img
                  src={slimPanelImg}
                  alt={slimPanel.name}
                  className="pedestal-product-image duet-img"
                  loading="lazy"
                />
              </div>

              <div className="pedestal-footer-spread">
                <div className="pedestal-title-group">
                  <h3 className="pedestal-product-name">{slimPanel.name}</h3>
                  <p className="pedestal-description">{slimPanel.description}</p>
                </div>

                <div className="pedestal-interactive-cluster">
                  <div
                    className="finish-switcher-row"
                    onClick={(e) => e.stopPropagation()}
                    role="group"
                    aria-label="Slim Panel Profile Options"
                  >
                    <button
                      type="button"
                      className={`finish-pill-btn ${slimPanelImg === '/images/products/slim-panel-round.png' ? 'is-active' : ''}`}
                      onClick={() => setSlimPanelImg('/images/products/slim-panel-round.png')}
                      aria-label="View Round Profile"
                    >
                      Round Disc
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${slimPanelImg === '/images/products/slim-panel-square.png' ? 'is-active' : ''}`}
                      onClick={() => setSlimPanelImg('/images/products/slim-panel-square.png')}
                      aria-label="View Square Flush Profile"
                    >
                      Square Flush
                    </button>
                  </div>

                  <span className="pedestal-explore-prompt">
                    <span>EXPLORE ARCHIVE</span>
                    <span className="prompt-glyph" aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Movement II-B: Surface Panel Light */}
          {surfacePanel && (
            <article
              className="pedestal-card pedestal-surface-panel"
              onClick={() => handleOpen(surfacePanel)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(surfacePanel) : null)}
              aria-label={`Explore ${surfacePanel.name}`}
            >
              <div className="pedestal-header-bar">
                <span className="pedestal-index">04</span>
                <span className="pedestal-series">{surfacePanel.subtitle}</span>
              </div>

              <div className="pedestal-visual-chamber">
                <div className="chamber-luminous-bloom bloom-soft" aria-hidden="true"></div>
                <img
                  src={surfacePanelImg}
                  alt={surfacePanel.name}
                  className="pedestal-product-image duet-img"
                  loading="lazy"
                />
              </div>

              <div className="pedestal-footer-spread">
                <div className="pedestal-title-group">
                  <h3 className="pedestal-product-name">{surfacePanel.name}</h3>
                  <p className="pedestal-description">{surfacePanel.description}</p>
                </div>

                <div className="pedestal-interactive-cluster">
                  <div
                    className="finish-switcher-row"
                    onClick={(e) => e.stopPropagation()}
                    role="group"
                    aria-label="Surface Panel Finish Options"
                  >
                    <button
                      type="button"
                      className={`finish-pill-btn ${surfacePanelImg === '/images/products/surface-panel-round-black.png' ? 'is-active' : ''}`}
                      onClick={() => setSurfacePanelImg('/images/products/surface-panel-round-black.png')}
                      aria-label="View Matte Black Profile"
                    >
                      Matte Black
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${surfacePanelImg === '/images/products/surface-panel-round-white.png' ? 'is-active' : ''}`}
                      onClick={() => setSurfacePanelImg('/images/products/surface-panel-round-white.png')}
                      aria-label="View Pure White Profile"
                    >
                      Pure White
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${surfacePanelImg === '/images/products/surface-panel-duo.png' ? 'is-active' : ''}`}
                      onClick={() => setSurfacePanelImg('/images/products/surface-panel-duo.png')}
                      aria-label="View Architectural Duo"
                    >
                      Duo
                    </button>
                  </div>

                  <span className="pedestal-explore-prompt">
                    <span>EXPLORE ARCHIVE</span>
                    <span className="prompt-glyph" aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* ── MOVEMENT III: Directional Precision & Exterior Engineering (Moveable COB & LED Flood Light) ── */}
        <div className="editorial-movement movement-precision-diptych">
          {/* Movement III-A: Moveable COB */}
          {moveableCob && (
            <article
              className="pedestal-card pedestal-moveable-cob"
              onClick={() => handleOpen(moveableCob)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(moveableCob) : null)}
              aria-label={`Explore ${moveableCob.name}`}
            >
              <div className="pedestal-header-bar">
                <span className="pedestal-index">05</span>
                <span className="pedestal-series">{moveableCob.subtitle}</span>
              </div>

              <div className="pedestal-visual-chamber">
                <div className="chamber-luminous-bloom bloom-warm" aria-hidden="true"></div>
                <img
                  src={moveableCobImg}
                  alt={moveableCob.name}
                  className="pedestal-product-image precision-img"
                  loading="lazy"
                />
              </div>

              <div className="pedestal-footer-spread">
                <div className="pedestal-title-group">
                  <h3 className="pedestal-product-name">{moveableCob.name}</h3>
                  <p className="pedestal-description">{moveableCob.description}</p>
                </div>

                <div className="pedestal-interactive-cluster">
                  <div
                    className="finish-switcher-row"
                    onClick={(e) => e.stopPropagation()}
                    role="group"
                    aria-label="Moveable COB Angle Options"
                  >
                    <button
                      type="button"
                      className={`finish-pill-btn ${moveableCobImg === '/images/products/moveable-cob-duo.png' ? 'is-active' : ''}`}
                      onClick={() => setMoveableCobImg('/images/products/moveable-cob-duo.png')}
                      aria-label="View Dual Gimbal Angles"
                    >
                      Dual Gimbal
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${moveableCobImg === '/images/products/moveable-cob-detail.png' ? 'is-active' : ''}`}
                      onClick={() => setMoveableCobImg('/images/products/moveable-cob-detail.png')}
                      aria-label="View Tilt & Optics Detail"
                    >
                      Optic Detail
                    </button>
                  </div>

                  <span className="pedestal-explore-prompt">
                    <span>EXPLORE ARCHIVE</span>
                    <span className="prompt-glyph" aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </article>
          )}

          {/* Movement III-B: LED Flood Light */}
          {ledFloodLight && (
            <article
              className="pedestal-card pedestal-flood-light"
              onClick={() => handleOpen(ledFloodLight)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(ledFloodLight) : null)}
              aria-label={`Explore ${ledFloodLight.name}`}
            >
              <div className="pedestal-header-bar">
                <span className="pedestal-index">06</span>
                <span className="pedestal-series">{ledFloodLight.subtitle}</span>
              </div>

              <div className="pedestal-visual-chamber">
                <div className="chamber-luminous-bloom bloom-soft" aria-hidden="true"></div>
                <img
                  src={floodLightImg}
                  alt={ledFloodLight.name}
                  className="pedestal-product-image precision-img"
                  loading="lazy"
                />
              </div>

              <div className="pedestal-footer-spread">
                <div className="pedestal-title-group">
                  <h3 className="pedestal-product-name">{ledFloodLight.name}</h3>
                  <p className="pedestal-description">{ledFloodLight.description}</p>
                </div>

                <div className="pedestal-interactive-cluster">
                  <div
                    className="finish-switcher-row"
                    onClick={(e) => e.stopPropagation()}
                    role="group"
                    aria-label="LED Flood Light Perspective Options"
                  >
                    <button
                      type="button"
                      className={`finish-pill-btn ${floodLightImg === '/images/products/led-flood-light-duo.png' ? 'is-active' : ''}`}
                      onClick={() => setFloodLightImg('/images/products/led-flood-light-duo.png')}
                      aria-label="View Heatsink Architecture"
                    >
                      Heatsink Array
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${floodLightImg === '/images/products/led-flood-light-angle.png' ? 'is-active' : ''}`}
                      onClick={() => setFloodLightImg('/images/products/led-flood-light-angle.png')}
                      aria-label="View Mounting Perspective"
                    >
                      Mounting Angle
                    </button>
                  </div>

                  <span className="pedestal-explore-prompt">
                    <span>EXPLORE ARCHIVE</span>
                    <span className="prompt-glyph" aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </article>
          )}
        </div>

        {/* ── MOVEMENT IV: The Continuous Luminous Horizon (Rope Light) ── */}
        {ropeLight && (
          <div className="editorial-movement movement-panoramic-horizon">
            <article
              className="pedestal-card pedestal-rope-light"
              onClick={() => handleOpen(ropeLight)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleOpen(ropeLight) : null)}
              aria-label={`Explore ${ropeLight.name}`}
            >
              <div className="pedestal-header-bar">
                <span className="pedestal-index">07</span>
                <span className="pedestal-series">{ropeLight.subtitle}</span>
              </div>

              <div className="panoramic-spatial-stage">
                <div className="chamber-luminous-bloom bloom-ambient-horizon" aria-hidden="true"></div>
                <img
                  src={ropeLightImg}
                  alt={ropeLight.name}
                  className="pedestal-product-image panoramic-img"
                  loading="lazy"
                />
              </div>

              <div className="pedestal-footer-spread panoramic-footer">
                <div className="pedestal-title-group">
                  <h3 className="pedestal-product-name">{ropeLight.name}</h3>
                  <p className="pedestal-description">{ropeLight.description}</p>
                </div>

                <div className="pedestal-interactive-cluster">
                  <div
                    className="finish-switcher-row"
                    onClick={(e) => e.stopPropagation()}
                    role="group"
                    aria-label="Rope Light Luminescence Moods"
                  >
                    <button
                      type="button"
                      className={`finish-pill-btn ${ropeLightImg === '/images/products/rope-light-primary-warm.png' ? 'is-active' : ''}`}
                      onClick={() => setRopeLightImg('/images/products/rope-light-primary-warm.png')}
                      aria-label="View Warm Amber Glow"
                    >
                      Warm Amber
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${ropeLightImg === '/images/products/rope-light-blue-reel.png' ? 'is-active' : ''}`}
                      onClick={() => setRopeLightImg('/images/products/rope-light-blue-reel.png')}
                      aria-label="View Sapphire Blue Contour"
                    >
                      Sapphire Blue
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${ropeLightImg === '/images/products/rope-light-green-spool.png' ? 'is-active' : ''}`}
                      onClick={() => setRopeLightImg('/images/products/rope-light-green-spool.png')}
                      aria-label="View Emerald Green Spool"
                    >
                      Emerald Green
                    </button>
                    <button
                      type="button"
                      className={`finish-pill-btn ${ropeLightImg === '/images/products/rope-light-warm-spool.png' ? 'is-active' : ''}`}
                      onClick={() => setRopeLightImg('/images/products/rope-light-warm-spool.png')}
                      aria-label="View Warm Yellow Spool"
                    >
                      Warm Spool
                    </button>
                  </div>

                  <span className="pedestal-explore-prompt">
                    <span>EXPLORE ARCHIVE</span>
                    <span className="prompt-glyph" aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </article>
          </div>
        )}
      </div>

      <style>{`
        /* ── Root Section Architecture ── */
        .collection-editorial-root {
          position: relative;
          width: 100%;
          background: var(--bg-primary, #F7F4ED);
          color: var(--primary-text, #171717);
          padding: 7.5rem 0 9.5rem;
          overflow: hidden;
          border-top: 1px solid rgba(120, 100, 70, 0.12);
        }

        .anchor-shim {
          position: absolute;
          top: -4rem;
          left: 0;
          height: 1px;
          width: 1px;
          pointer-events: none;
        }

        .collection-ambient-atmosphere {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(circle at 85% 20%, rgba(198, 154, 82, 0.08) 0%, transparent 55%),
                      radial-gradient(circle at 15% 75%, rgba(198, 154, 82, 0.06) 0%, transparent 60%);
        }

        .collection-master-container {
          position: relative;
          z-index: 1;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 4vw, 4rem);
        }

        /* ── Section Header ── */
        .collection-header-block {
          margin-bottom: 5.5rem;
        }

        .collection-marker-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.75rem;
        }

        .marker-index {
          font-family: var(--font-serif, serif);
          font-size: 1.15rem;
          color: var(--accent-gold, #C69A52);
          font-weight: 500;
        }

        .marker-rule {
          display: inline-block;
          width: 48px;
          height: 1px;
          background: rgba(198, 154, 82, 0.45);
        }

        .marker-tag {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-dim, #7A756D);
          font-weight: 600;
        }

        .collection-headline-spread {
          display: grid;
          grid-template-columns: minmax(320px, 1fr) minmax(300px, 1.4fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: flex-end;
        }

        .collection-monumental-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(2.8rem, 6.5vw, 5rem);
          line-height: 0.95;
          letter-spacing: -0.02em;
          font-weight: 300;
          color: var(--charcoal, #171717);
          margin: 0;
        }

        .title-italic {
          font-style: italic;
          color: var(--accent-gold, #C69A52);
        }

        .collection-lead-statement {
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          line-height: 1.65;
          color: var(--text-secondary, #5E5A53);
          max-width: 540px;
          margin: 0;
        }

        /* ── Editorial Movements: Layout Rhythms ── */
        .editorial-movement {
          margin-bottom: clamp(3rem, 5vw, 5rem);
        }

        /* Movement I: 60 / 40 Asymmetric Split */
        .movement-recessed-focal {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: clamp(1.5rem, 3vw, 3rem);
          align-items: stretch;
        }

        /* Movement II: Balanced 50 / 50 Staggered Split */
        .movement-planar-duet {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3vw, 3rem);
          align-items: stretch;
        }

        /* Movement III: Precision Diptych */
        .movement-precision-diptych {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3vw, 3rem);
          align-items: stretch;
        }

        /* Movement IV: Panoramic Horizon */
        .movement-panoramic-horizon {
          width: 100%;
        }

        /* ── Museum Pedestal Cards ── */
        .pedestal-card {
          position: relative;
          background: rgba(255, 255, 255, 0.42);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(120, 100, 70, 0.14);
          border-radius: 4px;
          padding: clamp(1.75rem, 3vw, 2.75rem);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                      box-shadow 0.5s cubic-bezier(0.19, 1, 0.22, 1),
                      border-color 0.4s ease;
          outline: none;
        }

        .pedestal-card:hover,
        .pedestal-card:focus-visible {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.72);
          border-color: rgba(198, 154, 82, 0.4);
          box-shadow: 0 20px 48px -12px rgba(120, 100, 70, 0.12),
                      0 8px 24px -6px rgba(198, 154, 82, 0.08);
        }

        .pedestal-header-bar {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          border-bottom: 1px solid rgba(120, 100, 70, 0.08);
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }

        .pedestal-index {
          font-family: var(--font-serif, serif);
          font-size: 1.25rem;
          color: var(--accent-gold, #C69A52);
          font-weight: 500;
        }

        .pedestal-series {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dim, #7A756D);
          font-weight: 500;
        }

        /* ── Visual Chamber & Product Imagery ── */
        .pedestal-visual-chamber {
          position: relative;
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          margin-bottom: 2rem;
        }

        .panoramic-spatial-stage {
          position: relative;
          min-height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1rem;
          margin-bottom: 2rem;
        }

        .chamber-luminous-bloom {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          transition: transform 0.6s ease, opacity 0.6s ease;
        }

        .bloom-warm {
          background: radial-gradient(circle, rgba(255, 222, 173, 0.55) 0%, rgba(247, 244, 237, 0) 70%);
        }

        .bloom-soft {
          background: radial-gradient(circle, rgba(235, 225, 210, 0.6) 0%, rgba(247, 244, 237, 0) 70%);
        }

        .bloom-wide {
          background: radial-gradient(ellipse, rgba(255, 228, 196, 0.5) 0%, rgba(247, 244, 237, 0) 70%);
        }

        .bloom-ambient-horizon {
          background: radial-gradient(ellipse at 50% 50%, rgba(255, 218, 160, 0.45) 0%, rgba(247, 244, 237, 0) 75%);
        }

        .pedestal-card:hover .chamber-luminous-bloom {
          transform: scale(1.08);
          opacity: 0.95;
        }

        .pedestal-product-image {
          position: relative;
          z-index: 1;
          max-width: 100%;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 16px 28px rgba(35, 25, 15, 0.1));
          transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
                      filter 0.5s ease;
          user-select: none;
        }

        .focal-img {
          max-height: 380px;
        }

        .companion-img {
          max-height: 320px;
        }

        .duet-img {
          max-height: 320px;
        }

        .precision-img {
          max-height: 310px;
        }

        .panoramic-img {
          max-height: 290px;
          width: auto;
        }

        .pedestal-card:hover .pedestal-product-image {
          transform: translateY(-6px) scale(1.02);
          filter: drop-shadow(0 22px 36px rgba(35, 25, 15, 0.15));
        }

        /* ── Pedestal Footer Spread ── */
        .pedestal-footer-spread {
          border-top: 1px solid rgba(120, 100, 70, 0.08);
          padding-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .pedestal-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .pedestal-product-name {
          font-family: var(--font-serif, Georgia, serif);
          font-size: clamp(1.4rem, 2vw, 1.85rem);
          letter-spacing: 0.02em;
          color: var(--charcoal, #171717);
          margin: 0;
          font-weight: 400;
        }

        .pedestal-description {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--text-secondary, #5E5A53);
          margin: 0;
        }

        /* ── Interactive Cluster & Finish Switchers ── */
        .pedestal-interactive-cluster {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 0.25rem;
        }

        .finish-switcher-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .finish-pill-btn {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(120, 100, 70, 0.16);
          border-radius: 999px;
          padding: 0.35rem 0.85rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--text-secondary, #5E5A53);
          cursor: pointer;
          transition: all 0.25s ease;
          min-height: 28px;
        }

        .finish-pill-btn:hover {
          background: #FFFFFF;
          color: var(--charcoal, #171717);
          border-color: rgba(198, 154, 82, 0.5);
        }

        .finish-pill-btn.is-active {
          background: var(--charcoal, #171717);
          color: #FFFFFF;
          border-color: var(--charcoal, #171717);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .pedestal-explore-prompt {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--accent-gold, #C69A52);
          transition: gap 0.3s ease, color 0.3s ease;
        }

        .pedestal-card:hover .pedestal-explore-prompt {
          gap: 0.65rem;
          color: #9E7432;
        }

        .prompt-glyph {
          font-size: 0.9rem;
          transition: transform 0.3s ease;
        }

        .pedestal-card:hover .prompt-glyph {
          transform: translate(2px, -2px);
        }

        /* ── Panoramic Horizon Responsive Rules ── */
        .panoramic-footer {
          flex-direction: row;
          align-items: flex-end;
          justify-content: space-between;
        }

        .panoramic-footer .pedestal-title-group {
          max-width: 480px;
        }

        /* ── Responsive Refinements ── */
        @media (max-width: 1024px) {
          .collection-editorial-root {
            padding: 6rem 0 7.5rem;
          }

          .movement-recessed-focal,
          .movement-planar-duet,
          .movement-precision-diptych {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .panoramic-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 768px) {
          .collection-editorial-root {
            padding: 4.5rem 0 5.5rem;
          }

          .collection-header-block {
            margin-bottom: 3.5rem;
          }

          .collection-headline-spread {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .collection-monumental-title {
            font-size: clamp(2.4rem, 8vw, 3.4rem);
          }

          .pedestal-card {
            padding: 1.5rem 1.25rem;
          }

          .pedestal-visual-chamber {
            min-height: 260px;
            padding: 1rem 0;
            margin-bottom: 1.25rem;
          }

          .panoramic-spatial-stage {
            min-height: 220px;
            padding: 1rem 0;
            margin-bottom: 1.25rem;
          }

          .focal-img,
          .companion-img,
          .duet-img,
          .precision-img {
            max-height: 240px;
          }

          .panoramic-img {
            max-height: 180px;
          }

          .pedestal-interactive-cluster {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.85rem;
          }

          .finish-pill-btn {
            min-height: 34px;
            padding: 0.4rem 0.95rem;
            font-size: 0.75rem;
          }

          .pedestal-explore-prompt {
            width: 100%;
            justify-content: flex-end;
            padding-top: 0.5rem;
          }
        }
      `}</style>
    </section>
  )
}
