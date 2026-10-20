import React, { useState } from 'react'
import { productsData } from '../data/productsData'

/**
 * SECTION 4: ARCHITECTURAL LIGHTING COLLECTION
 * Editorial architectural repertoire combining varied layouts:
 * - Monumental Lead Feature (Deep Down Light)
 * - Paired Precision Study (Curve COB & Moveable COB)
 * - Planar & Continuous Contour Spreads (Surface Panel, Slim Panel, Rope Light)
 * - Exterior Facade Showcase (LED Flood Light)
 */
export default function ArchitecturalCollection({ onOpenProduct, onEnquire }) {
  const [activeCategory, setActiveCategory] = useState('all')

  // Real product lookups
  const deepDownlight = productsData.find((p) => p.id === 'deep-downlight')
  const curveCob = productsData.find((p) => p.id === 'curve-cob')
  const moveableCob = productsData.find((p) => p.id === 'moveable-cob')
  const surfacePanel = productsData.find((p) => p.id === 'surface-panel')
  const slimPanel = productsData.find((p) => p.id === 'slim-panel')
  const ropeLight = productsData.find((p) => p.id === 'rope-light')
  const floodLight = productsData.find((p) => p.id === 'led-flood-light')

  // Live variant states for real product interaction
  const [downlightImg, setDownlightImg] = useState('/images/products/deep-downlight-round-black-studio.png')
  const [curveCobImg, setCurveCobImg] = useState('/images/products/curve-cob-rose-gold.png')
  const [moveableImg, setMoveableImg] = useState('/images/products/moveable-cob-duo.png')
  const [surfaceImg, setSurfaceImg] = useState('/images/products/surface-panel-round-black.png')
  const [slimImg, setSlimImg] = useState('/images/products/slim-panel-round.png')
  const [ropeImg, setRopeImg] = useState('/images/products/rope-light-primary-warm.png')
  const [floodImg, setFloodImg] = useState('/images/products/led-flood-light-duo.png')

  const categories = [
    { id: 'all', label: 'All Typologies' },
    { id: 'recessed', label: 'Recessed & COBs' },
    { id: 'panels', label: 'Architectural Panels' },
    { id: 'linear-exterior', label: 'Linear & Outdoor' },
  ]

  const handleOpenModal = (product) => {
    if (onOpenProduct && product) {
      onOpenProduct(product)
    }
  }

  const handleEnquireAction = (product) => {
    if (onEnquire && product) {
      onEnquire(product)
    }
  }

  return (
    <section className="arch-collection-root" id="architectural" aria-label="Architectural Collection">
      <div className="container collection-inner-container">
        {/* Section Header */}
        <header className="collection-header">
          <div className="section-marker-rail">
            <span className="section-marker-num">05</span>
            <span className="section-marker-dot">•</span>
            <span className="section-marker-title">ARCHITECTURAL LIGHTING • SEVEN FAMILIES</span>
          </div>

          <div className="collection-title-row">
            <div>
              <h2 className="collection-main-heading">
                THE ARCHITECTURAL<br />
                <span className="heading-gold-italic">LUMINAIRE COLLECTION.</span>
              </h2>
              <p className="collection-lead-desc">
                Conceived for discerning architects and interior designers—optical precision, glare cutoff, and enduring aluminium finishes engineered for contemporary living.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="category-filter-bar" role="tablist" aria-label="Product Categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* ── 1. MONUMENTAL LEAD FEATURE: DEEP DOWN LIGHT ── */}
        {(activeCategory === 'all' || activeCategory === 'recessed') && deepDownlight && (
          <div className="collection-lead-monument">
            <div className="lead-visual-chamber">
              <div className="chamber-ambient-radiance" aria-hidden="true"></div>
              <img
                src={downlightImg}
                alt={deepDownlight.name}
                className="lead-luminaire-img"
                loading="lazy"
              />
              <div className="lead-cast-shadow" aria-hidden="true"></div>

              {/* Optical Badge */}
              <div className="lead-optical-badge">
                <span className="badge-sparkle">✦</span>
                <span>Anti-Glare Architecture • UGR &lt; 16</span>
              </div>
            </div>

            <div className="lead-narrative-chamber">
              <div className="lead-meta-rail">
                <span className="lead-family-tag">FLAGSHIP RECESSED LUMINAIR</span>
                <span className="lead-num">01</span>
              </div>

              <h3 className="lead-title">{deepDownlight.name}</h3>
              <p className="lead-subhead">{deepDownlight.subtitle}</p>
              <p className="lead-desc">{deepDownlight.description}</p>

              {/* Technical Highlights */}
              <div className="lead-specs-matrix">
                <div className="spec-col">
                  <span className="spec-k">OPTICAL CUTOFF</span>
                  <span className="spec-v">40° Glare Shielding</span>
                </div>
                <div className="spec-col">
                  <span className="spec-k">CRI RENDERING</span>
                  <span className="spec-v">Ra ≥ 93 True Color</span>
                </div>
                <div className="spec-col">
                  <span className="spec-k">THERMAL</span>
                  <span className="spec-v">Die-Cast 6063 Alloy</span>
                </div>
              </div>

              {/* Live Variant Selector */}
              <div className="lead-variant-strip" role="group" aria-label="Deep Down Light Profiles">
                <span className="variant-label-text">SELECT FINISH & PROFILE:</span>
                <div className="variant-btns-wrap">
                  <button
                    type="button"
                    className={`variant-pill-btn ${downlightImg.includes('black-studio') ? 'active' : ''}`}
                    onClick={() => setDownlightImg('/images/products/deep-downlight-round-black-studio.png')}
                  >
                    Studio Black
                  </button>
                  <button
                    type="button"
                    className={`variant-pill-btn ${downlightImg.includes('round-white') ? 'active' : ''}`}
                    onClick={() => setDownlightImg('/images/products/deep-downlight-round-white.png')}
                  >
                    Round White
                  </button>
                  <button
                    type="button"
                    className={`variant-pill-btn ${downlightImg.includes('square-white') ? 'active' : ''}`}
                    onClick={() => setDownlightImg('/images/products/deep-downlight-square-white.png')}
                  >
                    Square White
                  </button>
                  <button
                    type="button"
                    className={`variant-pill-btn ${downlightImg.includes('duo') ? 'active' : ''}`}
                    onClick={() => setDownlightImg('/images/products/deep-downlight-duo.png')}
                  >
                    Series Duo
                  </button>
                </div>
              </div>

              <div className="lead-actions-group">
                <button
                  type="button"
                  className="lead-specs-btn"
                  onClick={() => handleOpenModal(deepDownlight)}
                >
                  <span>Explore Full Specifications</span>
                  <span className="arrow-glyph">↗</span>
                </button>
                <button
                  type="button"
                  className="lead-enquire-btn"
                  onClick={() => handleEnquireAction(deepDownlight)}
                >
                  Enquire on Luminaire
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── 2. PAIRED PRECISION STUDY: CURVE COB & MOVEABLE COB ── */}
        {(activeCategory === 'all' || activeCategory === 'recessed') && (
          <div className="collection-paired-grid">
            {/* Curve COB */}
            {curveCob && (
              <div className="paired-study-card">
                <div className="study-card-visual">
                  <img
                    src={curveCobImg}
                    alt={curveCob.name}
                    className="study-card-img"
                    loading="lazy"
                  />
                  <div className="study-ground-shadow" aria-hidden="true"></div>
                </div>

                <div className="study-card-body">
                  <div className="study-meta">
                    <span className="study-tag">{curveCob.subtitle}</span>
                    <span className="study-idx">02</span>
                  </div>

                  <h4 className="study-title">{curveCob.name}</h4>
                  <p className="study-desc">{curveCob.description}</p>

                  <div className="study-variant-row">
                    <span className="variant-label-text">FINISH:</span>
                    <div className="variant-btns-wrap">
                      <button
                        type="button"
                        className={`variant-pill-btn ${curveCobImg.includes('rose-gold') ? 'active' : ''}`}
                        onClick={() => setCurveCobImg('/images/products/curve-cob-rose-gold.png')}
                      >
                        Rose Gold Heatsink
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${curveCobImg.includes('white-recessed') ? 'active' : ''}`}
                        onClick={() => setCurveCobImg('/images/products/curve-cob-white-recessed.png')}
                      >
                        White Recessed
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${curveCobImg.includes('duo') ? 'active' : ''}`}
                        onClick={() => setCurveCobImg('/images/products/curve-cob-duo.png')}
                      >
                        Finish Duo
                      </button>
                    </div>
                  </div>

                  <div className="study-actions">
                    <button
                      type="button"
                      className="study-open-btn"
                      onClick={() => handleOpenModal(curveCob)}
                    >
                      Specifications ↗
                    </button>
                    <button
                      type="button"
                      className="study-enquire-link"
                      onClick={() => handleEnquireAction(curveCob)}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Moveable COB */}
            {moveableCob && (
              <div className="paired-study-card">
                <div className="study-card-visual">
                  <img
                    src={moveableImg}
                    alt={moveableCob.name}
                    className="study-card-img"
                    loading="lazy"
                  />
                  <div className="study-ground-shadow" aria-hidden="true"></div>
                </div>

                <div className="study-card-body">
                  <div className="study-meta">
                    <span className="study-tag">{moveableCob.subtitle}</span>
                    <span className="study-idx">03</span>
                  </div>

                  <h4 className="study-title">{moveableCob.name}</h4>
                  <p className="study-desc">{moveableCob.description}</p>

                  <div className="study-variant-row">
                    <span className="variant-label-text">PERSPECTIVE:</span>
                    <div className="variant-btns-wrap">
                      <button
                        type="button"
                        className={`variant-pill-btn ${moveableImg.includes('duo') ? 'active' : ''}`}
                        onClick={() => setMoveableImg('/images/products/moveable-cob-duo.png')}
                      >
                        Gimbal Duo Overview
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${moveableImg.includes('detail') ? 'active' : ''}`}
                        onClick={() => setMoveableImg('/images/products/moveable-cob-detail.png')}
                      >
                        Tilt & Reflector Detail
                      </button>
                    </div>
                  </div>

                  <div className="study-actions">
                    <button
                      type="button"
                      className="study-open-btn"
                      onClick={() => handleOpenModal(moveableCob)}
                    >
                      Specifications ↗
                    </button>
                    <button
                      type="button"
                      className="study-enquire-link"
                      onClick={() => handleEnquireAction(moveableCob)}
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── 3. PLANAR & CONTINUOUS CONTOUR SPREAD ── */}
        {(activeCategory === 'all' || activeCategory === 'panels' || activeCategory === 'linear-exterior') && (
          <div className="collection-typology-section">
            <div className="typology-section-header">
              <span className="typology-mini-tag">PLANAR & CONTINUOUS CONTOUR EDITIONS</span>
              <h3 className="typology-section-title">Surface Panels, Slim Discs & Luminous Ribbons</h3>
            </div>

            <div className="planar-gallery-grid">
              {/* Surface Panel */}
              {(activeCategory === 'all' || activeCategory === 'panels') && surfacePanel && (
                <div className="planar-tile-card">
                  <div className="tile-visual">
                    <img src={surfaceImg} alt={surfacePanel.name} className="tile-img" loading="lazy" />
                  </div>
                  <div className="tile-body">
                    <div className="tile-meta">
                      <span className="tile-tag">SURFACE ARCHITECTURAL</span>
                      <span className="tile-idx">04</span>
                    </div>
                    <h4 className="tile-name">{surfacePanel.name}</h4>
                    <p className="tile-desc">{surfacePanel.description}</p>
                    <div className="tile-variant-btns">
                      <button
                        type="button"
                        className={`variant-pill-btn ${surfaceImg.includes('round-black') ? 'active' : ''}`}
                        onClick={() => setSurfaceImg('/images/products/surface-panel-round-black.png')}
                      >
                        Black Disc
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${surfaceImg.includes('round-white') ? 'active' : ''}`}
                        onClick={() => setSurfaceImg('/images/products/surface-panel-round-white.png')}
                      >
                        White Disc
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${surfaceImg.includes('duo') ? 'active' : ''}`}
                        onClick={() => setSurfaceImg('/images/products/surface-panel-duo.png')}
                      >
                        Series Duo
                      </button>
                    </div>
                    <div className="tile-footer">
                      <button type="button" className="tile-action-btn" onClick={() => handleOpenModal(surfacePanel)}>
                        Inspect ↗
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Slim Panel */}
              {(activeCategory === 'all' || activeCategory === 'panels') && slimPanel && (
                <div className="planar-tile-card">
                  <div className="tile-visual">
                    <img src={slimImg} alt={slimPanel.name} className="tile-img" loading="lazy" />
                  </div>
                  <div className="tile-body">
                    <div className="tile-meta">
                      <span className="tile-tag">LOW-PROFILE EDITIONS</span>
                      <span className="tile-idx">05</span>
                    </div>
                    <h4 className="tile-name">{slimPanel.name}</h4>
                    <p className="tile-desc">{slimPanel.description}</p>
                    <div className="tile-variant-btns">
                      <button
                        type="button"
                        className={`variant-pill-btn ${slimImg.includes('round') ? 'active' : ''}`}
                        onClick={() => setSlimImg('/images/products/slim-panel-round.png')}
                      >
                        Round Disc
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${slimImg.includes('square') ? 'active' : ''}`}
                        onClick={() => setSlimImg('/images/products/slim-panel-square.png')}
                      >
                        Square Flush
                      </button>
                    </div>
                    <div className="tile-footer">
                      <button type="button" className="tile-action-btn" onClick={() => handleOpenModal(slimPanel)}>
                        Inspect ↗
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Rope Light */}
              {(activeCategory === 'all' || activeCategory === 'linear-exterior') && ropeLight && (
                <div className="planar-tile-card tile-wide-feature">
                  <div className="tile-visual">
                    <img src={ropeImg} alt={ropeLight.name} className="tile-img" loading="lazy" />
                  </div>
                  <div className="tile-body">
                    <div className="tile-meta">
                      <span className="tile-tag">CONTINUOUS LUMINESCENCE</span>
                      <span className="tile-idx">06</span>
                    </div>
                    <h4 className="tile-name">{ropeLight.name}</h4>
                    <p className="tile-desc">{ropeLight.description}</p>
                    <div className="tile-variant-btns">
                      <button
                        type="button"
                        className={`variant-pill-btn ${ropeImg.includes('primary-warm') ? 'active' : ''}`}
                        onClick={() => setRopeImg('/images/products/rope-light-primary-warm.png')}
                      >
                        Warm Glow Reel
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${ropeImg.includes('blue-reel') ? 'active' : ''}`}
                        onClick={() => setRopeImg('/images/products/rope-light-blue-reel.png')}
                      >
                        Vibrant Blue
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${ropeImg.includes('green-spool') ? 'active' : ''}`}
                        onClick={() => setRopeImg('/images/products/rope-light-green-spool.png')}
                      >
                        Emerald Green
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${ropeImg.includes('white-coil') ? 'active' : ''}`}
                        onClick={() => setRopeImg('/images/products/rope-light-white-coil.png')}
                      >
                        Pure White
                      </button>
                    </div>
                    <div className="tile-footer">
                      <button type="button" className="tile-action-btn" onClick={() => handleOpenModal(ropeLight)}>
                        Inspect ↗
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* LED Flood Light */}
              {(activeCategory === 'all' || activeCategory === 'linear-exterior') && floodLight && (
                <div className="planar-tile-card tile-wide-feature">
                  <div className="tile-visual">
                    <img src={floodImg} alt={floodLight.name} className="tile-img" loading="lazy" />
                  </div>
                  <div className="tile-body">
                    <div className="tile-meta">
                      <span className="tile-tag">EXTERIOR FACADE & PROJECTION</span>
                      <span className="tile-idx">07</span>
                    </div>
                    <h4 className="tile-name">{floodLight.name}</h4>
                    <p className="tile-desc">{floodLight.description}</p>
                    <div className="tile-variant-btns">
                      <button
                        type="button"
                        className={`variant-pill-btn ${floodImg.includes('duo') ? 'active' : ''}`}
                        onClick={() => setFloodImg('/images/products/led-flood-light-duo.png')}
                      >
                        Heatsink Duo
                      </button>
                      <button
                        type="button"
                        className={`variant-pill-btn ${floodImg.includes('angle') ? 'active' : ''}`}
                        onClick={() => setFloodImg('/images/products/led-flood-light-angle.png')}
                      >
                        Mounting Bracket
                      </button>
                    </div>
                    <div className="tile-footer">
                      <button type="button" className="tile-action-btn" onClick={() => handleOpenModal(floodLight)}>
                        Inspect ↗
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .arch-collection-root {
          position: relative;
          background: #FAF8F5;
          color: var(--text-primary-dark);
          padding: 6.5rem 0 7.5rem;
          border-top: 1px solid rgba(24, 23, 21, 0.06);
        }

        .collection-header {
          margin-bottom: 4rem;
        }

        .collection-title-row {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        @media (min-width: 960px) {
          .collection-title-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }

        .collection-main-heading {
          font-family: var(--font-sans);
          font-size: clamp(2.3rem, 5vw, 4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #181715;
          margin-bottom: 1rem;
        }

        .heading-gold-italic {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          color: var(--accent-gold);
        }

        .collection-lead-desc {
          font-size: clamp(0.95rem, 1.25vw, 1.1rem);
          line-height: 1.65;
          color: var(--text-secondary-dark);
          max-width: 580px;
          font-weight: 300;
        }

        /* Category Filter Tabs */
        .category-filter-bar {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          flex-wrap: wrap;
        }

        .category-tab {
          padding: 0.65rem 1.25rem;
          border-radius: 999px;
          background: #FFFFFF;
          border: 1px solid rgba(24, 23, 21, 0.1);
          color: var(--text-secondary-dark);
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .category-tab:hover {
          color: #181715;
          border-color: rgba(184, 147, 68, 0.4);
        }

        .category-tab.active {
          background: #181715;
          color: #FAF8F5;
          border-color: #181715;
          box-shadow: 0 4px 16px rgba(24, 23, 21, 0.15);
        }

        /* ── 1. Lead Monument (Deep Down Light) ── */
        .collection-lead-monument {
          background: #FFFFFF;
          border-radius: 28px;
          border: 1px solid rgba(24, 23, 21, 0.08);
          box-shadow: var(--shadow-monumental);
          padding: clamp(2rem, 4vw, 3.5rem);
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          margin-bottom: 4.5rem;
        }

        @media (min-width: 960px) {
          .collection-lead-monument {
            grid-template-columns: 1.15fr 1fr;
            gap: 4.5rem;
          }
        }

        .lead-visual-chamber {
          position: relative;
          background: #F6F3EB;
          border-radius: 20px;
          padding: clamp(2rem, 4vw, 3.5rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 380px;
        }

        .chamber-ambient-radiance {
          position: absolute;
          inset: 15%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(226, 188, 106, 0.3) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }

        .lead-luminaire-img {
          width: 85%;
          max-height: 320px;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(24, 20, 15, 0.18));
          transition: transform 0.4s ease;
          user-select: none;
          z-index: 1;
        }

        .collection-lead-monument:hover .lead-luminaire-img {
          transform: scale(1.03);
        }

        .lead-cast-shadow {
          width: 70%;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 70%);
          filter: blur(8px);
          margin-top: 1rem;
        }

        .lead-optical-badge {
          position: absolute;
          bottom: 14px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1rem;
          background: rgba(24, 23, 21, 0.88);
          backdrop-filter: blur(10px);
          color: #FAF8F5;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          border: 1px solid rgba(197, 160, 89, 0.3);
          z-index: 2;
        }

        .badge-sparkle {
          color: var(--accent-gold);
        }

        .lead-narrative-chamber {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .lead-meta-rail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .lead-family-tag {
          color: var(--accent-gold);
          font-weight: 600;
        }

        .lead-num {
          color: var(--text-muted-dark);
          font-weight: 600;
        }

        .lead-title {
          font-family: var(--font-sans);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 600;
          line-height: 1.15;
          color: #181715;
        }

        .lead-subhead {
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: 1.15rem;
          color: var(--accent-gold);
        }

        .lead-desc {
          font-size: 0.98rem;
          line-height: 1.7;
          color: var(--text-secondary-dark);
          font-weight: 300;
        }

        /* Lead specs matrix */
        .lead-specs-matrix {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          padding: 1.25rem 0;
          border-top: 1px solid rgba(24, 23, 21, 0.08);
          border-bottom: 1px solid rgba(24, 23, 21, 0.08);
        }

        .spec-col {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .spec-k {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: var(--accent-gold);
          font-weight: 600;
        }

        .spec-v {
          font-size: 0.82rem;
          font-weight: 500;
          color: #181715;
        }

        /* Variant Strip */
        .lead-variant-strip,
        .study-variant-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .variant-label-text {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--text-muted-dark);
        }

        .variant-btns-wrap,
        .tile-variant-btns {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .variant-pill-btn {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.45rem 0.85rem;
          border-radius: 999px;
          background: rgba(24, 23, 21, 0.04);
          border: 1px solid rgba(24, 23, 21, 0.08);
          color: var(--text-secondary-dark);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .variant-pill-btn:hover {
          background: #FFFFFF;
          color: #181715;
          border-color: rgba(184, 147, 68, 0.4);
        }

        .variant-pill-btn.active {
          background: #181715;
          color: #FAF8F5;
          border-color: #181715;
        }

        .lead-actions-group {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 0.5rem;
        }

        .lead-specs-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #181715;
          color: #FAF8F5;
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 0.95rem 1.85rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lead-specs-btn:hover {
          background: var(--accent-gold);
          color: #181715;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(184, 147, 68, 0.35);
        }

        .arrow-glyph {
          font-size: 0.95rem;
        }

        .lead-enquire-btn {
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--accent-gold);
          text-decoration: underline;
          text-underline-offset: 4px;
          cursor: pointer;
          padding: 0.5rem;
        }

        /* ── 2. Paired Study Grid ── */
        .collection-paired-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 4.5rem;
        }

        @media (min-width: 860px) {
          .collection-paired-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }

        .paired-study-card {
          background: #FFFFFF;
          border-radius: 24px;
          border: 1px solid rgba(24, 23, 21, 0.07);
          box-shadow: var(--shadow-medium);
          padding: clamp(1.75rem, 3vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .paired-study-card:hover {
          box-shadow: var(--shadow-monumental);
          transform: translateY(-3px);
        }

        .study-card-visual {
          background: #F7F5EF;
          border-radius: 18px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 260px;
        }

        .study-card-img {
          max-height: 200px;
          object-fit: contain;
          filter: drop-shadow(0 12px 24px rgba(24, 20, 15, 0.12));
          transition: transform 0.3s ease;
        }

        .paired-study-card:hover .study-card-img {
          transform: scale(1.04);
        }

        .study-ground-shadow {
          width: 60%;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.12) 0%, transparent 70%);
          filter: blur(5px);
          margin-top: 0.75rem;
        }

        .study-card-body {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .study-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .study-tag {
          color: var(--accent-gold);
          font-weight: 600;
        }

        .study-idx {
          color: var(--text-muted-dark);
          font-weight: 600;
        }

        .study-title {
          font-family: var(--font-sans);
          font-size: 1.35rem;
          font-weight: 600;
          color: #181715;
        }

        .study-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary-dark);
          font-weight: 300;
        }

        .study-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 0.5rem;
        }

        .study-open-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #181715;
          color: #FAF8F5;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 0.65rem 1.25rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .study-open-btn:hover {
          background: var(--accent-gold);
          color: #181715;
        }

        .study-enquire-link {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent-gold);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }

        /* ── 3. Planar Section ── */
        .collection-typology-section {
          margin-top: 1rem;
        }

        .typology-section-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(24, 23, 21, 0.08);
        }

        .typology-mini-tag {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: var(--accent-gold);
          text-transform: uppercase;
        }

        .typology-section-title {
          font-family: var(--font-sans);
          font-size: 1.6rem;
          font-weight: 600;
          color: #181715;
          margin-top: 0.3rem;
        }

        .planar-gallery-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 720px) {
          .planar-gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .planar-tile-card {
          background: #FFFFFF;
          border-radius: 20px;
          border: 1px solid rgba(24, 23, 21, 0.07);
          box-shadow: var(--shadow-subtle);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .planar-tile-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .tile-visual {
          background: #F8F6F0;
          border-radius: 14px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        }

        .tile-img {
          max-height: 160px;
          object-fit: contain;
          filter: drop-shadow(0 8px 18px rgba(24, 20, 15, 0.1));
        }

        .tile-body {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .tile-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .tile-tag {
          color: var(--accent-gold);
          font-weight: 600;
        }

        .tile-idx {
          color: var(--text-muted-dark);
          font-weight: 600;
        }

        .tile-name {
          font-size: 1.15rem;
          font-weight: 600;
          color: #181715;
        }

        .tile-desc {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--text-secondary-dark);
          font-weight: 300;
        }

        .tile-footer {
          padding-top: 0.5rem;
        }

        .tile-action-btn {
          font-size: 0.78rem;
          font-weight: 600;
          color: #181715;
          background: rgba(24, 23, 21, 0.05);
          padding: 0.45rem 0.95rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tile-action-btn:hover {
          background: #181715;
          color: #FAF8F5;
        }

        @media (max-width: 768px) {
          .arch-collection-root {
            padding: 4.5rem 0 5rem;
          }

          .lead-specs-matrix {
            grid-template-columns: 1fr;
          }

          .lead-actions-group {
            flex-direction: column;
            align-items: stretch;
          }

          .lead-specs-btn {
            justify-content: center;
          }

          .lead-enquire-btn {
            text-align: center;
          }
        }
      `}</style>
    </section>
  )
}
