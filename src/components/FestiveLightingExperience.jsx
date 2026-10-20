import React, { useState, useEffect, useRef, useCallback } from 'react'
import './FestiveLightingExperience.css'
import FestiveArchitecturalInstallation3D from '../three/FestiveArchitecturalInstallation3D.jsx'
import EmailEnquiryButton from './EmailEnquiryButton'
import {
  festiveProducts,
  STUDIO_INFO,
  getWhatsAppEnquiryUrl
} from '../data/productsData'

/**
 * FestiveLightingExperience
 * 
 * Re-architected with Dedicated Mobile Presentation:
 * - DESKTOP (≥ 768px): Preserved 3D WebGL salon installation and desktop HUD.
 * - MOBILE (< 768px): Purpose-built luxury presentation:
 *   1. Compact header with subtle gold accent.
 *   2. Horizontally scrollable category filter bar (no viewport overflow).
 *   3. Prominent single product visual stage with genuine 4:5 aspect ratio.
 *   4. Information area placed BELOW the visual (never covering the luminaire).
 *   5. Easy-to-tap Previous/Next stepper and 10-thumbnail horizontal rail.
 *   6. Touch swipe gestures (left/right) for natural mobile navigation.
 *   7. Zero conflicting product data or placeholder images.
 */

// Curated atmospheric reference visuals supplied for the festive experience
const ATMOSPHERIC_VISUALS = [
  {
    id: 'primary-amber',
    title: 'Warm Amber Decorative Glow Spheres',
    role: 'Approved Primary Atmospheric Background',
    category: 'Spatial Ambiance',
    image: '/images/editorial/festive-amber-woven-spheres.png',
    alt: 'Warm amber decorative woven light spheres with golden bokeh on rustic wood surface',
    note: 'Glowing golden woven wire spheres emitting rich warm amber radiance with optical bokeh on authentic wooden surface.'
  },
  {
    id: 'detail-window',
    title: 'Warm Fairy Light Window Cascade',
    role: 'Curtain Light Reference',
    category: 'Drapery Ambiance',
    image: '/images/editorial/festive-window-curtain-lights.png',
    alt: 'Living room window draped with warm cascading fairy lights behind sofa',
    note: 'Curtain fairy lights creating cascading vertical golden radiance across living room drapery.'
  },
  {
    id: 'secondary-crystal',
    title: 'Crystal Bubble Droplet Luminaire',
    role: 'Secondary Detail Visual',
    category: 'Optical Refraction',
    image: '/images/diwali/diwali-crystal-bubble-lights.png',
    alt: 'Crystal bubble spheres with internal refractive crackle and jewel-toned illumination',
    note: 'Solid crystal spheres featuring internal micro-bubble refraction and multi-colour jewel sparkle.'
  },
  {
    id: 'supporting-globe',
    title: 'Frosted Globe Berry String',
    role: 'Supporting Atmospheric Visual',
    category: 'Diffused Warmth',
    image: '/images/diwali/diwali-frosted-globe-lights.png',
    alt: 'Evenly diffused frosted berry spherical globe fairy lights',
    note: 'Matte frosted spherical nodes delivering soft, glare-free festive warmth across architectural railings.'
  }
]

export default function FestiveLightingExperience({
  onOpenProduct,
  twinkleMode,
  setTwinkleMode,
  onGalleryStateChange
}) {
  const [isGalleryActive, setIsGalleryActive] = useState(false)
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const [showAtmosphereDrawer, setShowAtmosphereDrawer] = useState(false)
  const [inspectedAtmosphere, setInspectedAtmosphere] = useState(null)

  const containerRef = useRef(null)
  const mobileThumbRailRef = useRef(null)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  // Current active product
  const currentProduct = festiveProducts[activeProductIndex] || festiveProducts[0]

  // Filtered product indices based on category
  const filteredIndices = festiveProducts.reduce((acc, p, idx) => {
    if (activeCategory === 'all') acc.push(idx)
    else if (activeCategory === 'warm') {
      if ([
        'hanging-star-curtain',
        'hanging-diya-curtain',
        'golden-cluster-fairy-string',
        'crystal-bubble-string',
        'frosted-globe-string'
      ].includes(p.id)) acc.push(idx)
    } else if (activeCategory === 'multicolour') {
      if ([
        'multicolour-diya-garland',
        'royal-blue-pixel-string',
        'rainbow-rice-pixel-string',
        'festive-string-light-sets',
        'led-twinkle-pixel-string'
      ].includes(p.id)) acc.push(idx)
    }
    return acc
  }, [])

  // Preload all 10 genuine festive product images + atmospheric images into browser memory immediately
  useEffect(() => {
    festiveProducts.forEach((product) => {
      const img = new Image()
      img.src = product.image
    })
    ATMOSPHERIC_VISUALS.forEach((vis) => {
      const img = new Image()
      img.src = vis.image
    })
  }, [])

  // Automatically scroll active thumbnail into view on mobile
  useEffect(() => {
    if (mobileThumbRailRef.current) {
      const activeBtn = mobileThumbRailRef.current.querySelector(`.as-festive-m-thumb-btn.active`)
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [activeProductIndex])

  // Transition into 3D Product Gallery (Desktop)
  const handleEnterGallery = () => {
    setIsGalleryActive(true)
    onGalleryStateChange?.(true)
    setActiveProductIndex(0)
  }

  // Return back to Outer Festive Overview (Desktop)
  const handleReturnToOverview = () => {
    setIsGalleryActive(false)
    onGalleryStateChange?.(false)
    setShowAtmosphereDrawer(false)
    setInspectedAtmosphere(null)
  }

  // Category change with active product alignment
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    if (cat === 'all') return
    const isCurrentInCat = (cat === 'warm' && [
      'hanging-star-curtain',
      'hanging-diya-curtain',
      'golden-cluster-fairy-string',
      'crystal-bubble-string',
      'frosted-globe-string'
    ].includes(currentProduct.id)) || (cat === 'multicolour' && [
      'multicolour-diya-garland',
      'royal-blue-pixel-string',
      'rainbow-rice-pixel-string',
      'festive-string-light-sets',
      'led-twinkle-pixel-string'
    ].includes(currentProduct.id))

    if (!isCurrentInCat) {
      const firstIdx = festiveProducts.findIndex((p) => {
        if (cat === 'warm') {
          return [
            'hanging-star-curtain',
            'hanging-diya-curtain',
            'golden-cluster-fairy-string',
            'crystal-bubble-string',
            'frosted-globe-string'
          ].includes(p.id)
        } else {
          return [
            'multicolour-diya-garland',
            'royal-blue-pixel-string',
            'rainbow-rice-pixel-string',
            'festive-string-light-sets',
            'led-twinkle-pixel-string'
          ].includes(p.id)
        }
      })
      if (firstIdx !== -1) {
        setActiveProductIndex(firstIdx)
      }
    }
  }

  // Step to Next Product
  const handleNextProduct = useCallback(() => {
    const currentPos = filteredIndices.indexOf(activeProductIndex)
    if (currentPos !== -1 && currentPos < filteredIndices.length - 1) {
      setActiveProductIndex(filteredIndices[currentPos + 1])
    } else {
      setActiveProductIndex(filteredIndices[0])
    }
  }, [activeProductIndex, filteredIndices])

  // Step to Previous Product
  const handlePrevProduct = useCallback(() => {
    const currentPos = filteredIndices.indexOf(activeProductIndex)
    if (currentPos > 0) {
      setActiveProductIndex(filteredIndices[currentPos - 1])
    } else {
      setActiveProductIndex(filteredIndices[filteredIndices.length - 1])
    }
  }, [activeProductIndex, filteredIndices])

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current
    const diffY = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        handleNextProduct()
      } else {
        handlePrevProduct()
      }
    }
  }

  // Keyboard navigation when in 3D gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isGalleryActive) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNextProduct()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrevProduct()
      } else if (e.key === 'Escape') {
        handleReturnToOverview()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isGalleryActive, handleNextProduct, handlePrevProduct])

  // Wheel scroll inside gallery container
  const lastWheelTime = useRef(0)
  const handleWheel = (e) => {
    if (!isGalleryActive) return
    const now = Date.now()
    if (now - lastWheelTime.current < 450) return
    lastWheelTime.current = now

    if (e.deltaY > 20) {
      handleNextProduct()
    } else if (e.deltaY < -20) {
      handlePrevProduct()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`as-festive-cinematic-page ${isGalleryActive ? 'as-in-gallery-mode' : ''}`}
      onWheel={handleWheel}
    >
      {/* ──────────────────────────────────────────────────────────────────
          DESKTOP EXPERIENCE (≥ 768px): Stage 1 + Stage 2 3D Corridor Salon
          ────────────────────────────────────────────────────────────────── */}
      <div className="as-festive-desktop-view">
        <div className="as-festive-bounded-shell">
          {/* STAGE 1: Smaller Outer Festive Experience */}
          <div
            className={`as-festive-outer-stage ${isGalleryActive ? 'as-stage-inactive' : 'as-stage-active'}`}
            aria-hidden={isGalleryActive}
          >
            <div className="as-festive-outer-card">
              <div className="as-festive-outer-visual-frame">
                <img
                  src="/images/editorial/festive-veranda-grand-hero.jpg"
                  alt="Pearl Lighting Festive Celebration Balcony with Warm Lanterns and Garlands"
                  className="as-festive-outer-original-img"
                  loading="eager"
                />
              </div>

              <div className="as-festive-outer-copy">
                <div className="as-festive-outer-kicker">
                  <span className="as-kicker-spark">✦</span>
                  <span>PEARL LIGHTING · FESTIVE EDITION 2026</span>
                </div>

                <h2 className="as-festive-outer-title">
                  Light Up Your <br />
                  <em>Festive Space</em>
                </h2>

                <p className="as-festive-outer-desc">
                  Sculptural celebratory illumination curated for Indian residences, grand balconies, and festive gathering spaces.
                </p>

                <div className="as-festive-outer-cta">
                  <button
                    type="button"
                    onClick={handleEnterGallery}
                    className="as-btn-explore-festive"
                    id="btn-explore-festive-collection"
                    aria-label="Explore Festive Collection 3D Gallery"
                  >
                    <span>EXPLORE FESTIVE COLLECTION</span>
                    <span className="as-btn-arrow-icon" aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STAGE 2: Luminous Champagne 3D Salon Exhibition */}
          <div
            className={`as-festive-3d-stage-viewport ${isGalleryActive ? 'as-stage-active' : 'as-stage-inactive'}`}
            aria-hidden={!isGalleryActive}
          >
            <FestiveArchitecturalInstallation3D
              onOpenProduct={onOpenProduct}
              isGalleryActive={isGalleryActive}
              setIsGalleryActive={setIsGalleryActive}
              activeProductIndex={activeProductIndex}
              setActiveProductIndex={setActiveProductIndex}
              activeCategory={activeCategory}
            />

            <div className="as-gallery-spatial-hud" aria-label="3D Spatial Gallery HUD">
              <header className="as-hud-top-bar">
                <div className="as-hud-top-inner">
                  <button
                    type="button"
                    className="as-hud-return-btn"
                    onClick={handleReturnToOverview}
                    title="Return to Festive Overview"
                  >
                    <span className="as-return-arrow">←</span>
                    <span>Back to Overview</span>
                  </button>

                  <div className="as-hud-center-title">
                    <span className="as-hud-sparkle">✦</span>
                    <span className="as-hud-title-text">3D FESTIVE COLLECTION</span>
                  </div>

                  <div className="as-hud-top-right-group">
                    <button
                      type="button"
                      className={`as-hud-atmosphere-btn ${showAtmosphereDrawer ? 'active' : ''}`}
                      onClick={() => setShowAtmosphereDrawer(!showAtmosphereDrawer)}
                      title="View Atmospheric & Craft References"
                      aria-label="View Atmospheric & Craft References"
                    >
                      <span className="as-hud-sparkle">✦</span>
                      <span>Atmosphere (3)</span>
                    </button>

                    <div className="as-hud-filter-rail" role="tablist" aria-label="Festive categories">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeCategory === 'all'}
                        className={`as-hud-tab ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('all')}
                      >
                        <span>ALL (10)</span>
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeCategory === 'warm'}
                        className={`as-hud-tab ${activeCategory === 'warm' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('warm')}
                      >
                        <span>WARM GOLD (05)</span>
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeCategory === 'multicolour'}
                        className={`as-hud-tab ${activeCategory === 'multicolour' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('multicolour')}
                      >
                        <span>MULTICOLOUR (05)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {showAtmosphereDrawer && (
                  <div className="as-hud-atmosphere-strip" role="region" aria-label="Curated Atmospheric References">
                    <div className="as-atmosphere-strip-header">
                      <span className="as-atmosphere-strip-title">Curated Atmospheric References</span>
                      <button
                        type="button"
                        className="as-atmosphere-strip-close"
                        onClick={() => setShowAtmosphereDrawer(false)}
                        aria-label="Close atmospheric references"
                      >
                        ×
                      </button>
                    </div>
                    <div className="as-atmosphere-strip-cards">
                      {ATMOSPHERIC_VISUALS.map((vis) => (
                        <div
                          key={vis.id}
                          className="as-atmosphere-strip-card"
                          onClick={() => setInspectedAtmosphere(vis)}
                          title={`Click to inspect: ${vis.title}`}
                          tabIndex={0}
                          role="button"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') setInspectedAtmosphere(vis)
                          }}
                        >
                          <div className="as-atmosphere-strip-thumb">
                            <img
                              src={vis.image}
                              alt={vis.alt}
                              className="as-atmosphere-img-clean"
                            />
                          </div>
                          <div className="as-atmosphere-strip-info">
                            <span className="as-atmosphere-strip-badge">{vis.role}</span>
                            <span className="as-atmosphere-strip-name">{vis.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </header>

              <footer className="as-hud-bottom-dock">
                <div className="as-hud-dock-inner">
                  <div className="as-hud-product-card">
                    <div className="as-hud-card-header">
                      <span className="as-hud-card-badge">{currentProduct.badge}</span>
                      <span className="as-hud-card-num">{currentProduct.number} / 10</span>
                    </div>

                    <div className="as-hud-card-titles">
                      <div className="as-hud-title-row">
                        <h3 className="as-hud-card-title">{currentProduct.name}</h3>
                        {currentProduct.id === 'crystal-bubble-string' && (
                          <span className="as-hud-craft-tag" title="Secondary Detail Visual Reference">✦ Secondary Craft Reference</span>
                        )}
                        {currentProduct.id === 'frosted-globe-string' && (
                          <span className="as-hud-craft-tag" title="Supporting Visual Reference">✦ Supporting Visual</span>
                        )}
                      </div>
                      <p className="as-hud-card-subtitle">{currentProduct.subtitle}</p>
                    </div>

                    <div className="as-hud-spec-pill" title={currentProduct.verifiedDetails?.[0]?.value}>
                      <span className="as-spec-pill-dot" />
                      <span className="as-spec-pill-text">
                        {(() => {
                          const glowSpec = currentProduct.verifiedDetails?.find(d => d.label === 'Glow Character')?.value
                          const firstSpec = currentProduct.verifiedDetails?.[0]?.value || '2400K Ambient Radiance'
                          const val = glowSpec || firstSpec
                          return val.length > 28 ? val.substring(0, 26) + '…' : val
                        })()}
                      </span>
                    </div>

                    <div className="as-hud-card-actions">
                      <button
                        type="button"
                        className="as-hud-btn-inspect"
                        onClick={() => onOpenProduct && onOpenProduct(currentProduct)}
                        aria-label={`Inspect ${currentProduct.name} specifications`}
                      >
                        <span>Inspect Specs</span>
                        <span>↗</span>
                      </button>

                      <a
                        href={getWhatsAppEnquiryUrl(currentProduct.name)}
                        target="_blank"
                        rel="noreferrer"
                        className="as-hud-btn-wa"
                        title={`Enquire about ${currentProduct.name} on WhatsApp`}
                        aria-label={`Enquire about ${currentProduct.name} on WhatsApp`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32" />
                        </svg>
                        <span>WhatsApp</span>
                      </a>
                      <EmailEnquiryButton product={currentProduct} />
                    </div>
                  </div>

                  <div className="as-hud-navigation-cluster">
                    <div className="as-hud-stepper-row">
                      <button
                        type="button"
                        className="as-hud-stepper-btn"
                        onClick={handlePrevProduct}
                        aria-label="Glide to previous product"
                      >
                        <span>← Previous</span>
                      </button>
                      <button
                        type="button"
                        className="as-hud-stepper-btn"
                        onClick={handleNextProduct}
                        aria-label="Glide to next product"
                      >
                        <span>Next →</span>
                      </button>
                    </div>

                    <div className="as-hud-thumbnails-rail" role="tablist" aria-label="10 festive products selector">
                      {festiveProducts.map((p, pIdx) => {
                        const isCurrent = activeProductIndex === pIdx
                        const isMatch = filteredIndices.includes(pIdx)
                        return (
                          <button
                            key={p.id}
                            type="button"
                            role="tab"
                            aria-selected={isCurrent}
                            className={`as-hud-thumb-btn ${isCurrent ? 'active' : ''} ${!isMatch ? 'dimmed' : ''}`}
                            onClick={() => setActiveProductIndex(pIdx)}
                            title={`${p.number}: ${p.name}`}
                            aria-label={`Select product ${p.number} ${p.name}`}
                          >
                            <img
                              src={p.image}
                              alt={p.name}
                              className="as-thumb-img"
                              loading="lazy"
                            />
                            <span className="as-thumb-label">{p.number}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          DEDICATED LUXURY MOBILE PRESENTATION (< 768px Viewports)
          Native mobile layout: filters, 4:5 visual, details BELOW image,
          touch-friendly steppers and 10-thumbnail horizontal rail.
          ────────────────────────────────────────────────────────────────── */}
      {/* ──────────────────────────────────────────────────────────────────
          DEDICATED LUXURY MOBILE PRESENTATION (< 768px Viewports)
          Native mobile layout: Stage 1 overview & Stage 2 gallery with
          prominent "← Back to Overview" sign, 4:5 visual, details below image,
          touch steppers and 10-thumbnail horizontal rail.
          ────────────────────────────────────────────────────────────────── */}
      <div className="as-festive-mobile-view" aria-label="Festive Collection Mobile Showcase">
        <div className="as-festive-m-container">
          {!isGalleryActive ? (
            /* STAGE 1 (MOBILE): Outer Festive Overview Card */
            <div className="as-festive-m-stage-outer">
              <div className="as-festive-m-outer-card">
                <div className="as-festive-m-outer-visual">
                  <img
                    src="/images/editorial/festive-veranda-grand-hero.jpg"
                    alt="Pearl Lighting Festive Celebration Balcony with Warm Lanterns and Garlands"
                    className="as-festive-m-outer-img"
                    loading="eager"
                  />
                </div>

                <div className="as-festive-m-outer-copy">
                  <div className="as-festive-m-kicker">
                    <span className="as-kicker-spark">✦</span>
                    <span>PEARL LIGHTING · FESTIVE EDITION 2026</span>
                  </div>
                  <h2 className="as-festive-m-title">
                    Light Up Your <br />
                    <em>Festive Space</em>
                  </h2>
                  <p className="as-festive-m-desc">
                    Sculptural celebratory illumination curated for Indian residences, grand balconies, and festive gathering spaces.
                  </p>
                  <div className="as-festive-m-outer-cta">
                    <button
                      type="button"
                      onClick={handleEnterGallery}
                      className="as-btn-explore-festive"
                      id="btn-explore-festive-collection-m"
                      aria-label="Explore Festive Collection 10 Editions"
                    >
                      <span>EXPLORE FESTIVE COLLECTION</span>
                      <span className="as-btn-arrow-icon" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STAGE 2 (MOBILE): Dedicated Product Gallery Showcase */
            <div className="as-festive-m-stage-gallery">
              {/* Top Navigation Bar with Prominent "← Back to Overview" Sign */}
              <div className="as-festive-m-top-bar">
                <button
                  type="button"
                  className="as-festive-m-back-btn"
                  onClick={handleReturnToOverview}
                  title="Return to Festive Overview"
                  aria-label="Return to Festive Overview"
                >
                  <span className="as-return-arrow">←</span>
                  <span>Back to Overview</span>
                </button>

                <div className="as-festive-m-top-badge">
                  <span className="as-hud-sparkle">✦</span>
                  <span>10 FESTIVE EDITIONS</span>
                </div>
              </div>

              {/* 2. Horizontally Scrollable Category Filters Bar */}
              <nav className="as-festive-m-filter-bar" aria-label="Mobile festive category filters">
                <button
                  type="button"
                  className={`as-festive-m-tab as-festive-m-atmo-tab ${showAtmosphereDrawer ? 'active' : ''}`}
                  onClick={() => setShowAtmosphereDrawer(!showAtmosphereDrawer)}
                  aria-label="Toggle atmospheric craft references"
                >
                  <span className="as-hud-sparkle">✦</span>
                  <span>Atmosphere (3)</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'all' && !showAtmosphereDrawer}
                  className={`as-festive-m-tab ${activeCategory === 'all' && !showAtmosphereDrawer ? 'active' : ''}`}
                  onClick={() => {
                    setShowAtmosphereDrawer(false)
                    handleCategoryChange('all')
                  }}
                >
                  <span>ALL (10)</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'warm' && !showAtmosphereDrawer}
                  className={`as-festive-m-tab ${activeCategory === 'warm' && !showAtmosphereDrawer ? 'active' : ''}`}
                  onClick={() => {
                    setShowAtmosphereDrawer(false)
                    handleCategoryChange('warm')
                  }}
                >
                  <span>WARM GOLD (05)</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === 'multicolour' && !showAtmosphereDrawer}
                  className={`as-festive-m-tab ${activeCategory === 'multicolour' && !showAtmosphereDrawer ? 'active' : ''}`}
                  onClick={() => {
                    setShowAtmosphereDrawer(false)
                    handleCategoryChange('multicolour')
                  }}
                >
                  <span>MULTICOLOUR (05)</span>
                </button>
              </nav>

              {/* 3. Atmospheric References Dropdown Sheet */}
              {showAtmosphereDrawer && (
                <div className="as-festive-m-atmo-sheet" role="region" aria-label="Curated atmospheric references">
                  <div className="as-festive-m-atmo-header">
                    <span className="as-festive-m-atmo-title">Curated Atmospheric References</span>
                    <button
                      type="button"
                      className="as-festive-m-atmo-close"
                      onClick={() => setShowAtmosphereDrawer(false)}
                      aria-label="Close atmospheric references"
                    >
                      ×
                    </button>
                  </div>
                  <div className="as-festive-m-atmo-scroll">
                    {ATMOSPHERIC_VISUALS.map((vis) => (
                      <div
                        key={vis.id}
                        className="as-festive-m-atmo-card"
                        onClick={() => setInspectedAtmosphere(vis)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') setInspectedAtmosphere(vis)
                        }}
                      >
                        <img src={vis.image} alt={vis.alt} className="as-festive-m-atmo-thumb" />
                        <div className="as-festive-m-atmo-text">
                          <span className="as-festive-m-atmo-role">{vis.role}</span>
                          <span className="as-festive-m-atmo-name">{vis.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Dedicated Product Showcase Card */}
              <article
                className="as-festive-m-card"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                aria-label={`Product ${currentProduct.number}: ${currentProduct.name}`}
              >
                {/* Visual Stage: ONE product at a time with 4:5 aspect ratio */}
                <div className="as-festive-m-visual-stage">
                  <img
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="as-festive-m-img"
                    loading="eager"
                  />

                  {/* Discreet Top Badges */}
                  <div className="as-festive-m-badge-top">
                    <span className="as-festive-m-badge-pill">{currentProduct.badge}</span>
                    <span className="as-festive-m-counter">{currentProduct.number} / 10</span>
                  </div>
                </div>

                {/* Information Area: BELOW the visual (Never obscuring the luminaire) */}
                <div className="as-festive-m-info-box">
                  <div className="as-festive-m-name-row">
                    <h3 className="as-festive-m-name">{currentProduct.name}</h3>
                    {currentProduct.id === 'crystal-bubble-string' && (
                      <span className="as-festive-m-craft-tag">✦ Craft Reference</span>
                    )}
                    {currentProduct.id === 'frosted-globe-string' && (
                      <span className="as-festive-m-craft-tag">✦ Supporting Visual</span>
                    )}
                  </div>

                  <p className="as-festive-m-subtitle">{currentProduct.subtitle}</p>

                  {/* Specification Pill */}
                  <div className="as-festive-m-spec-pill">
                    <span className="as-spec-pill-dot" />
                    <span className="as-spec-pill-text">
                      {(() => {
                        const glowSpec = currentProduct.verifiedDetails?.find(d => d.label === 'Glow Character')?.value
                        const firstSpec = currentProduct.verifiedDetails?.[0]?.value || '2400K Ambient Radiance'
                        return glowSpec || firstSpec
                      })()}
                    </span>
                  </div>

                  {/* Action Buttons: Inspect Specs + WhatsApp */}
                  <div className="as-festive-m-actions">
                    <button
                      type="button"
                      className="as-festive-m-btn-specs"
                      onClick={() => onOpenProduct && onOpenProduct(currentProduct)}
                      aria-label={`Inspect ${currentProduct.name} specifications`}
                    >
                      <span>Inspect Specs</span>
                      <span>↗</span>
                    </button>

                    <a
                      href={getWhatsAppEnquiryUrl(currentProduct.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="as-festive-m-btn-wa"
                      aria-label={`Enquire about ${currentProduct.name} on WhatsApp`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32" />
                      </svg>
                      <span>WhatsApp</span>
                    </a>
                    <EmailEnquiryButton product={currentProduct} />
                  </div>
                </div>

                {/* 5. Mobile Navigation: Stepper & 10-Thumbnail Scrollable Rail */}
                <div className="as-festive-m-nav-cluster">
                  <div className="as-festive-m-stepper-row">
                    <button
                      type="button"
                      className="as-festive-m-stepper-btn"
                      onClick={handlePrevProduct}
                      aria-label="Previous luminaire"
                    >
                      <span>← Previous</span>
                    </button>
                    <button
                      type="button"
                      className="as-festive-m-stepper-btn"
                      onClick={handleNextProduct}
                      aria-label="Next luminaire"
                    >
                      <span>Next →</span>
                    </button>
                  </div>

                  {/* 10 Thumbnails Rail */}
                  <div
                    ref={mobileThumbRailRef}
                    className="as-festive-m-thumbs-rail"
                    role="tablist"
                    aria-label="Festive products selector"
                  >
                    {festiveProducts.map((p, pIdx) => {
                      const isCurrent = activeProductIndex === pIdx
                      const isMatch = filteredIndices.includes(pIdx)
                      return (
                        <button
                          key={p.id}
                          type="button"
                          role="tab"
                          aria-selected={isCurrent}
                          className={`as-festive-m-thumb-btn ${isCurrent ? 'active' : ''} ${!isMatch ? 'dimmed' : ''}`}
                          onClick={() => setActiveProductIndex(pIdx)}
                          title={`${p.number}: ${p.name}`}
                          aria-label={`Select product ${p.number} ${p.name}`}
                        >
                          <img src={p.image} alt={p.name} className="as-m-thumb-img" loading="lazy" />
                          <span className="as-m-thumb-label">{p.number}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </article>

              {/* Secondary Bottom Return Sign */}
              <div className="as-festive-m-bottom-return">
                <button
                  type="button"
                  onClick={handleReturnToOverview}
                  className="as-festive-m-bottom-return-btn"
                  aria-label="Back to Festive Overview"
                >
                  <span className="as-return-arrow">←</span>
                  <span>Back to Overview</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Atmospheric Visual Reference Inspection Lightbox (Shared between Desktop & Mobile) */}
      {inspectedAtmosphere && (
        <div
          className="as-atmosphere-lightbox-overlay"
          onClick={() => setInspectedAtmosphere(null)}
          role="dialog"
          aria-modal="true"
          aria-label={inspectedAtmosphere.title}
        >
          <div
            className="as-atmosphere-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="as-atmosphere-lightbox-header">
              <div>
                <span className="as-atmosphere-role-badge">{inspectedAtmosphere.role}</span>
                <h3 className="as-atmosphere-lightbox-title">{inspectedAtmosphere.title}</h3>
              </div>
              <button
                type="button"
                className="as-atmosphere-close-btn"
                onClick={() => setInspectedAtmosphere(null)}
                aria-label="Close atmospheric lightbox"
              >
                ×
              </button>
            </div>

            <div className="as-atmosphere-lightbox-media">
              <img
                src={inspectedAtmosphere.image}
                alt={inspectedAtmosphere.alt}
                className="as-atmosphere-lightbox-img"
              />
            </div>

            <p className="as-atmosphere-lightbox-note">{inspectedAtmosphere.note}</p>
          </div>
        </div>
      )}
    </div>
  )
}
