import React, { useEffect } from 'react'
import { diwaliProductsData } from '../data/diwaliProductsData'

/**
 * DiwaliFullCollectionView - Luxury Editorial Gallery View
 * 
 * Strict specifications:
 * 1. Introduction:
 *    "THE FESTIVE COLLECTION"
 *    "Light that makes every celebration glow."
 * 2. Image-led layout where photography dominates:
 *    - Varied image sizes and carefully balanced whitespace.
 *    - Warm ivory background, charcoal typography, subtle champagne gold accents.
 *    - No D-01 codes, no category badges, no "LIGHT CHARACTER" beige boxes, no long descriptions.
 *    - Short, accurate product names.
 *    - No rows of identical black & green buttons under every photo.
 *    - Interactive "Explore product ↗" link opening the product detail modal.
 * 3. Clicking any product or button opens the detailed view (ProductDetailModal).
 * 4. Preserves all authentic festive products and groups photos belonging to the same product.
 */
export default function DiwaliFullCollectionView({ isOpen, onClose, onOpenProduct }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Lookup helpers for all authentic festive products
  const starCurtain = diwaliProductsData.find((p) => p.id === 'hanging-star-curtain') || diwaliProductsData[0]
  const diyaCurtain = diwaliProductsData.find((p) => p.id === 'hanging-diya-curtain') || diwaliProductsData[1]
  const diyaGarland = diwaliProductsData.find((p) => p.id === 'multicolour-diya-garland') || diwaliProductsData[2]
  const goldenCluster = diwaliProductsData.find((p) => p.id === 'golden-cluster-fairy-string')
  const crystalBubble = diwaliProductsData.find((p) => p.id === 'crystal-bubble-string')
  const frostedGlobe = diwaliProductsData.find((p) => p.id === 'frosted-globe-string')
  const bluePixel = diwaliProductsData.find((p) => p.id === 'royal-blue-pixel-string')
  const festiveSets = diwaliProductsData.find((p) => p.id === 'festive-string-light-sets')
  const ricePixel = diwaliProductsData.find((p) => p.id === 'rainbow-rice-pixel-string')
  const twinklePixel = diwaliProductsData.find((p) => p.id === 'led-twinkle-pixel-string')
  const goldenStarString = diwaliProductsData.find((p) => p.id === 'golden-star-string-lights')

  const handleProductSelect = (product) => {
    if (onOpenProduct && product) {
      onOpenProduct(product, true)
    }
  }

  return (
    <div
      className="diwali-editorial-view-root"
      role="dialog"
      aria-modal="true"
      aria-labelledby="diwali-editorial-collection-title"
    >
      <div className="diwali-editorial-scroller">
        <div className="diwali-editorial-canvas">
          {/* ── Top Bar ── */}
          <nav className="editorial-top-nav" aria-label="Festive collection navigation">
            <button
              type="button"
              className="editorial-back-link"
              onClick={onClose}
              aria-label="Return to homepage"
            >
              <span className="arrow" aria-hidden="true">←</span>
              <span>RETURN TO HOMEPAGE</span>
            </button>

            <span className="editorial-brand-mark">
              PEARL LIGHTING • FESTIVE EDIT
            </span>

            <button
              type="button"
              className="editorial-close-circle"
              onClick={onClose}
              aria-label="Close collection"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </nav>

          {/* ── Editorial Header ── */}
          <header className="editorial-header-intro">
            <h1 id="diwali-editorial-collection-title" className="collection-main-title">
              THE FESTIVE COLLECTION
            </h1>
            <p className="collection-lead-phrase">
              Light that makes every celebration glow.
            </p>
          </header>

          {/* ── Visually Varied Editorial Spread ── */}
          <div className="editorial-products-flow">
            {/* ── Row 1: Asymmetric Duet (Stars & Golden Diyas) ── */}
            <div className="editorial-flow-row row-duet-asymmetric">
              {/* Product 1: Hanging Star Curtain Lights (Tall dominant) */}
              {starCurtain && (
                <div
                  className="editorial-item item-tall"
                  onClick={() => handleProductSelect(starCurtain)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(starCurtain) : null)}
                  aria-label={`View details for ${starCurtain.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={starCurtain.primaryImage.image}
                      alt={starCurtain.name}
                      className="item-photo"
                      loading="eager"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <h2 className="item-title">{starCurtain.name}</h2>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(starCurtain)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              )}

              {/* Product 2: Hanging Diya Curtain Lights (Offset standard) */}
              {diyaCurtain && (
                <div
                  className="editorial-item item-offset"
                  onClick={() => handleProductSelect(diyaCurtain)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(diyaCurtain) : null)}
                  aria-label={`View details for ${diyaCurtain.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={diyaCurtain.primaryImage.image}
                      alt={diyaCurtain.name}
                      className="item-photo"
                      loading="lazy"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <h2 className="item-title">{diyaCurtain.name}</h2>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(diyaCurtain)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Row 2: Wide Cinematic Showcase (Multi-Colour Diya Garland) ── */}
            {diyaGarland && (
              <div className="editorial-flow-row row-cinematic">
                <div
                  className="editorial-item item-wide-cinematic"
                  onClick={() => handleProductSelect(diyaGarland)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(diyaGarland) : null)}
                  aria-label={`View details for ${diyaGarland.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={diyaGarland.primaryImage.image}
                      alt={diyaGarland.name}
                      className="item-photo"
                      loading="lazy"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <h2 className="item-title">{diyaGarland.name}</h2>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(diyaGarland)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Row 3: Golden Ambiance & Crystal Bokeh Pair ── */}
            <div className="editorial-flow-row row-pair-balanced">
              {/* Product 3: Golden Cluster Fairy Lights (User's First Photograph) */}
              {goldenCluster && (
                <div
                  className="editorial-item item-half"
                  onClick={() => handleProductSelect(goldenCluster)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(goldenCluster) : null)}
                  aria-label={`View details for ${goldenCluster.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={goldenCluster.primaryImage.image}
                      alt={goldenCluster.name}
                      className="item-photo"
                      loading="lazy"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <h2 className="item-title">{goldenCluster.name}</h2>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(goldenCluster)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              )}

              {/* Product 4: Crystal Bubble String Lights */}
              {crystalBubble && (
                <div
                  className="editorial-item item-half"
                  onClick={() => handleProductSelect(crystalBubble)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(crystalBubble) : null)}
                  aria-label={`View details for ${crystalBubble.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={crystalBubble.primaryImage.image}
                      alt={crystalBubble.name}
                      className="item-photo"
                      loading="lazy"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <h2 className="item-title">{crystalBubble.name}</h2>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(crystalBubble)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Row 4: Balanced Color & Tone Pair (Frosted Globes & Royal Blue Glow) ── */}
            <div className="editorial-flow-row row-pair-balanced">
              {/* Product 5: Frosted Globe String Lights */}
              {frostedGlobe && (
                <div
                  className="editorial-item item-half"
                  onClick={() => handleProductSelect(frostedGlobe)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(frostedGlobe) : null)}
                  aria-label={`View details for ${frostedGlobe.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={frostedGlobe.primaryImage.image}
                      alt={frostedGlobe.name}
                      className="item-photo"
                      loading="lazy"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <h2 className="item-title">{frostedGlobe.name}</h2>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(frostedGlobe)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              )}

              {/* Product 6: Royal Blue Pixel String Lights */}
              {bluePixel && (
                <div
                  className="editorial-item item-half"
                  onClick={() => handleProductSelect(bluePixel)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(bluePixel) : null)}
                  aria-label={`View details for ${bluePixel.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={bluePixel.primaryImage.image}
                      alt={bluePixel.name}
                      className="item-photo"
                      loading="lazy"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <h2 className="item-title">{bluePixel.name}</h2>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(bluePixel)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Row 5: Dual Multi-Colour Showcase (Rainbow Rice Lights & Multi-Colour Festive Sets) ── */}
            <div className="editorial-flow-row row-pair-balanced">
              {/* Product 7: Rainbow Rice Pixel String Lights */}
              {ricePixel && (
                <div
                  className="editorial-item item-half"
                  onClick={() => handleProductSelect(ricePixel)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(ricePixel) : null)}
                  aria-label={`View details for ${ricePixel.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={ricePixel.primaryImage.image}
                      alt={ricePixel.name}
                      className="item-photo"
                      loading="lazy"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <h2 className="item-title">{ricePixel.name}</h2>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(ricePixel)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              )}

              {/* Product 8: Multi-Colour Festive String Sets (2 Views) */}
              {festiveSets && (
                <div
                  className="editorial-item item-half"
                  onClick={() => handleProductSelect(festiveSets)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(festiveSets) : null)}
                  aria-label={`View details for ${festiveSets.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={festiveSets.primaryImage.image}
                      alt={festiveSets.name}
                      className="item-photo"
                      loading="lazy"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <div className="title-with-count">
                      <h2 className="item-title">{festiveSets.name}</h2>
                      <span className="views-indicator">2 Views</span>
                    </div>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(festiveSets)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Row 6: Diptych Feature (Twinkle Pixel String Lights - 2 Real Views) ── */}
            {twinklePixel && (
              <div className="editorial-flow-row row-diptych-feature">
                <div
                  className="editorial-item item-diptych-full"
                  onClick={() => handleProductSelect(twinklePixel)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(twinklePixel) : null)}
                  aria-label={`View details for ${twinklePixel.name}`}
                >
                  <div className="diptych-photos-grid">
                    <div className="item-photo-stage">
                      <img
                        src={twinklePixel.primaryImage.image}
                        alt={`${twinklePixel.name} Coiled Spool`}
                        className="item-photo"
                        loading="lazy"
                      />
                    </div>
                    {twinklePixel.additionalImages?.[0] && (
                      <div className="item-photo-stage">
                        <img
                          src={twinklePixel.additionalImages[0].image}
                          alt={`${twinklePixel.name} Illuminated Twinkle`}
                          className="item-photo"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                  <div className="item-caption-bar">
                    <div className="title-with-count">
                      <h2 className="item-title">{twinklePixel.name}</h2>
                      <span className="views-indicator">2 Views</span>
                    </div>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(twinklePixel)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Row 7: Golden Star String Lights (New Festive Edition) ── */}
            {goldenStarString && (
              <div className="editorial-flow-row row-cinematic">
                <div
                  className="editorial-item item-wide-cinematic"
                  onClick={() => handleProductSelect(goldenStarString)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' ? handleProductSelect(goldenStarString) : null)}
                  aria-label={`View details for ${goldenStarString.name}`}
                >
                  <div className="item-photo-stage">
                    <img
                      src={goldenStarString.primaryImage.image}
                      alt={goldenStarString.name}
                      className="item-photo"
                      loading="lazy"
                    />
                    <div className="item-hover-wash"></div>
                  </div>
                  <div className="item-caption-bar">
                    <h2 className="item-title">{goldenStarString.name}</h2>
                    <button
                      type="button"
                      className="item-explore-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleProductSelect(goldenStarString)
                      }}
                    >
                      Explore product ↗
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Understated Editorial Footer ── */}
          <footer className="editorial-collection-foot">
            <p className="foot-brand-statement">
              Pearl Lighting • Festive Lighting Collection
            </p>
            <p className="foot-consult-hint">
              Select any design above to inspect authentic photography and enquire directly on WhatsApp.
            </p>
          </footer>
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           FULL DIWALI COLLECTION — PURE EDITORIAL LUXURY GALLERY
           ========================================================================== */
        .diwali-editorial-view-root {
          position: fixed;
          inset: 0;
          z-index: 10000;
          background: #FAF7F0;
          color: #171717;
          animation: editorialFadeIn 0.4s ease forwards;
        }

        @keyframes editorialFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .diwali-editorial-scroller {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          scroll-behavior: smooth;
        }

        .diwali-editorial-canvas {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2.5rem clamp(1.5rem, 4vw, 3.5rem) 6rem;
        }

        /* ── Top Navigation ── */
        .editorial-top-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(198, 154, 82, 0.22);
          margin-bottom: clamp(3rem, 5vw, 5rem);
        }

        .editorial-back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #171717;
          cursor: pointer;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }

        .editorial-back-link:hover {
          color: #AF812A;
        }

        .editorial-back-link .arrow {
          transition: transform 0.3s ease;
        }

        .editorial-back-link:hover .arrow {
          transform: translateX(-3px);
        }

        .editorial-brand-mark {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #8C6218;
          font-weight: 600;
        }

        .editorial-close-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(120, 100, 70, 0.2);
          background: transparent;
          color: #171717;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .editorial-close-circle:hover {
          background: #171717;
          color: #FAF7F0;
        }

        /* ── Editorial Header ── */
        .editorial-header-intro {
          margin-bottom: clamp(3.5rem, 6vw, 6rem);
          max-width: 800px;
        }

        .collection-main-title {
          font-family: var(--font-sans);
          font-size: clamp(0.78rem, 1vw, 0.88rem);
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #8C6218;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .collection-lead-phrase {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4.8vw, 4.4rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: #171717;
          margin: 0;
        }

        /* ── Visually Varied Editorial Spread ── */
        .editorial-products-flow {
          display: flex;
          flex-direction: column;
          gap: clamp(4rem, 7vw, 7.5rem);
        }

        .editorial-flow-row {
          width: 100%;
        }

        /* Items Common */
        .editorial-item {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          position: relative;
        }

        .item-photo-stage {
          position: relative;
          background: #141311;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 18px 40px -15px rgba(25, 20, 15, 0.12);
          transition: box-shadow 0.5s ease;
        }

        .editorial-item:hover .item-photo-stage {
          box-shadow: 0 24px 50px -15px rgba(180, 140, 70, 0.25);
        }

        .item-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .editorial-item:hover .item-photo {
          transform: scale(1.03);
        }

        .item-hover-wash {
          position: absolute;
          inset: 0;
          background: rgba(180, 140, 70, 0.05);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .editorial-item:hover .item-hover-wash {
          opacity: 1;
        }

        /* Captions under photos */
        .item-caption-bar {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(120, 100, 70, 0.15);
          margin-top: 1rem;
          gap: 1rem;
        }

        .item-title {
          font-family: var(--font-serif);
          font-size: clamp(1.35rem, 1.8vw, 1.75rem);
          font-weight: 400;
          letter-spacing: -0.01em;
          color: #171717;
          margin: 0;
        }

        .item-explore-link {
          background: transparent;
          border: none;
          padding: 0;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8C6218;
          font-weight: 600;
          white-space: nowrap;
          cursor: pointer;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .editorial-item:hover .item-explore-link,
        .item-explore-link:hover {
          color: #AF812A;
          transform: translateX(3px);
        }

        /* ── Specific Row Compositions ── */
        /* Row 1: Asymmetric Duet */
        .row-duet-asymmetric {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(2rem, 5vw, 4.5rem);
          align-items: end;
        }

        .item-tall .item-photo-stage {
          height: clamp(420px, 48vw, 620px);
        }

        .item-offset .item-photo-stage {
          height: clamp(340px, 38vw, 480px);
        }

        /* Row 2: Cinematic Wide */
        .item-wide-cinematic .item-photo-stage {
          height: clamp(380px, 45vw, 560px);
        }

        /* Rows 3, 4, 5: Balanced Pair */
        .row-pair-balanced {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 4.5vw, 4rem);
        }

        .item-half .item-photo-stage {
          height: clamp(320px, 36vw, 460px);
        }

        /* Row 6: Diptych Feature */
        .diptych-photos-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .diptych-photos-grid .item-photo-stage {
          height: clamp(300px, 34vw, 440px);
        }

        .title-with-count {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .views-indicator {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #7A756D;
        }

        /* ── Footer ── */
        .editorial-collection-foot {
          margin-top: clamp(5rem, 8vw, 8rem);
          padding-top: 2.5rem;
          border-top: 1px solid rgba(198, 154, 82, 0.22);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.5rem;
        }

        .foot-brand-statement {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: #171717;
          margin: 0;
        }

        .foot-consult-hint {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          color: #7A756D;
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .row-duet-asymmetric,
          .row-pair-balanced,
          .diptych-photos-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .item-tall .item-photo-stage,
          .item-offset .item-photo-stage,
          .item-wide-cinematic .item-photo-stage,
          .item-half .item-photo-stage,
          .diptych-photos-grid .item-photo-stage {
            height: clamp(300px, 55vw, 420px);
          }
        }
      `}</style>
    </div>
  )
}
