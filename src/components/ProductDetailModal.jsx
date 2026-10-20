import React, { useState, useEffect } from 'react'
import CollectionProductCanvas from '../three/CollectionProductCanvas'
import { getAllProductImages } from '../data/productsData'
import { shareProductOnWhatsApp } from '../utils/whatsappShare'
import EmailEnquiryButton from './EmailEnquiryButton'

/**
 * ProductDetailModal - Architectural Product Exploration Overlay
 * Unified interaction structure for ALL products:
 * 1. Initially shows ONLY ONE PRIMARY IMAGE + Name + Short description + EXPLORE MORE →
 * 2. When "EXPLORE MORE" is clicked, reveals the other real images/types under "MORE FROM [NAME]"
 */
export default function ProductDetailModal({
  product,
  initialExplored = false,
  onClose,
  onEnquire,
}) {
  const [isExplored, setIsExplored] = useState(initialExplored)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [photoCopied, setPhotoCopied] = useState(false)

  useEffect(() => {
    setIsExplored(Boolean(initialExplored))
    setActiveImageIndex(0)
    setPhotoCopied(false)
  }, [product, initialExplored])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  const isPhotographic = !product.is3D
  const allImages = getAllProductImages(product)
  const primaryPhoto = product.primaryImage || allImages[0]
  const additionalPhotos = product.additionalImages || (allImages.length > 1 ? allImages.slice(1) : [])
  const currentPhoto = allImages[activeImageIndex] || primaryPhoto

  const handleEnquireClick = () => {
    onClose()
    if (onEnquire) {
      onEnquire({
        ...product,
        selectedImage: currentPhoto?.image || primaryPhoto?.image || null,
      })
    } else {
      setTimeout(() => {
        const contactSection = document.querySelector('#contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
  }

  const handleExploreMoreClick = () => {
    setIsExplored(true)
    setTimeout(() => {
      const galleryElem = document.getElementById('modal-gallery-gallery')
      if (galleryElem) {
        galleryElem.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 120)
  }

  const getWhatsAppMessage = () => {
    return `Hi Pearl Lighting! I'm interested in this Diwali light. Could you please share its price and availability? Product: ${product.name}`
  }

  const handleWhatsAppClick = async (e) => {
    if (e) e.preventDefault()
    await shareProductOnWhatsApp({
      product,
      selectedImage: currentPhoto?.image || primaryPhoto?.image,
    })
  }

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
    >
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close product details"
        >
          <span className="close-x" aria-hidden="true">✕</span>
          <span className="close-text">CLOSE</span>
        </button>

        {/* Modal Grid: Visual on Left/Top, Editorial on Right */}
        <div className="modal-content-grid">
          {/* Visual Pane */}
          {isPhotographic ? (
            <div className="modal-visual-pane modal-visual-pane-photo">
              {product.category !== 'diwali' && product.number && (
                <span className="modal-object-number">{product.number}</span>
              )}

              <div className="modal-photo-stage">
                <div className={`modal-photo-frame modal-frame-${currentPhoto?.frameType || 'light'}`}>
                  <img
                    src={currentPhoto?.image}
                    alt={currentPhoto?.alt || product.name}
                    className="modal-product-photo"
                  />
                </div>
              </div>

              {/* Gallery Thumbnails Strip */}
              {allImages.length > 1 && (
                <div className="modal-gallery-strip" aria-label="Product image gallery">
                  {allImages.map((imgItem, idx) => (
                    <button
                      key={imgItem.id || idx}
                      type="button"
                      className={`modal-thumb-btn ${idx === activeImageIndex ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View ${imgItem.label || `Photo 0${idx + 1}`}`}
                    >
                      <img src={imgItem.image} alt={imgItem.alt || product.name} className="modal-thumb-img" />
                    </button>
                  ))}
                </div>
              )}

              <div className="modal-visual-vignette" aria-hidden="true"></div>
            </div>
          ) : (
            <div className="modal-visual-pane">
              <span className="modal-object-number">{product.number || '01'}</span>
              <div className="modal-3d-stage">
                <CollectionProductCanvas productId={product.id} isHovered={true} />
              </div>
              <div className="modal-visual-vignette" aria-hidden="true"></div>
            </div>
          )}

          {/* Editorial Details Pane */}
          <div className="modal-details-pane">
            <div className="modal-header-block">
              <span className="eyebrow modal-eyebrow">
                {product.category === 'diwali' ? 'PEARL LIGHTING • FESTIVE EDIT' : (product.subtitle || 'ARCHITECTURAL LUMINAIRE')}
              </span>
              <h2 id="modal-product-title" className="modal-title">
                {product.name}
              </h2>
              <p className="modal-description">{product.description}</p>
            </div>

            {/* "EXPLORE MORE" Interaction & Revealed Section */}
            {isPhotographic ? (
              <div className="modal-exploration-wrapper">
                {!isExplored && additionalPhotos.length > 0 && (
                  <div className="modal-explore-trigger-block">
                    <button
                      type="button"
                      className="modal-explore-more-btn"
                      onClick={handleExploreMoreClick}
                      aria-label={`Explore more images from ${product.name}`}
                    >
                      <span>EXPLORE MORE</span>
                      <span className="arrow" aria-hidden="true">→</span>
                    </button>
                    <span className="explore-hint">
                      Explore all {allImages.length} authentic photos in the {product.name} family
                    </span>
                  </div>
                )}

                {/* Revealed Additional Images & Views */}
                {isExplored && additionalPhotos.length > 0 && (
                  <div className="modal-revealed-section animate-fade-in">
                    <div className="revealed-section-header">
                      <span className="spec-label">MORE FROM {product.name}</span>
                      <button
                        type="button"
                        className="modal-collapse-btn"
                        onClick={() => {
                          setIsExplored(false)
                          setActiveImageIndex(0)
                        }}
                        aria-label="Show less views"
                      >
                        SHOW LESS ↑
                      </button>
                    </div>

                    <div className="modal-variants-list">
                      {allImages.map((imgItem, idx) => {
                        const isSelected = idx === activeImageIndex
                        return (
                          <div
                            key={imgItem.id || idx}
                            className={`modal-variant-card ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => setActiveImageIndex(idx)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                setActiveImageIndex(idx)
                              }
                            }}
                            aria-pressed={isSelected}
                          >
                            <div className="variant-card-indicator">
                              <span className="indicator-dot"></span>
                            </div>
                            <div className="variant-card-texts">
                              <span className="variant-card-tag">
                                {idx === 0 ? 'PRIMARY VIEW' : `VIEW 0${idx + 1}`}
                              </span>
                              <h4 className="variant-card-name">
                                {imgItem.label || `${product.name} View 0${idx + 1}`}
                              </h4>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Authentic details only for non-diwali photographic items */}
                {product.category !== 'diwali' && product.details && product.details.length > 0 && (
                  <div className="modal-specs-list modal-festive-specs">
                    {product.details.map((d, i) => (
                      <div key={i} className="modal-spec-item">
                        <span className="spec-label">{d.label}</span>
                        <span className="spec-text">{d.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Preserved 3D Procedural Specifications */
              <div className="modal-specs-list">
                <div className="modal-spec-item">
                  <span className="spec-label">MATERIAL</span>
                  <span className="spec-text">{product.material}</span>
                </div>
                <div className="modal-spec-item">
                  <span className="spec-label">LIGHT CHARACTER</span>
                  <span className="spec-text">{product.lightCharacter}</span>
                </div>
                <div className="modal-spec-item">
                  <span className="spec-label">PLACEMENT</span>
                  <span className="spec-text">{product.placement}</span>
                </div>
                <div className="modal-spec-item">
                  <span className="spec-label">DIMENSIONS</span>
                  <span className="spec-text">{product.dimensions}</span>
                </div>
              </div>
            )}

            {/* Direct Consultation / Enquiry CTA */}
            <div className="modal-enquire-row">
              {product.category === 'diwali' ? (
                <div className="modal-diwali-actions">
                  <button
                    type="button"
                    className="modal-enquire-btn modal-diwali-primary-enquire"
                    id="diwali-enquire-form-btn"
                    onClick={handleEnquireClick}
                    aria-label={`Official enquiry for ${product.name}`}
                  >
                    <span>ENQUIRE ABOUT THIS DESIGN</span>
                    <span className="arrow" aria-hidden="true">→</span>
                  </button>

                  <button
                    type="button"
                    className="modal-whatsapp-enquire-btn"
                    id="whatsapp-enquire-btn"
                    onClick={handleWhatsAppClick}
                    aria-label={`Share ${product.name} on WhatsApp`}
                  >
                    <svg
                      className="modal-whatsapp-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="18"
                      height="18"
                      aria-hidden="true"
                    >
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.188 8.188 0 0 1-5.83 2.41c-1.47 0-2.92-.39-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z"/>
                    </svg>
                    <span>ENQUIRE ON WHATSAPP</span>
                  </button>

                  <EmailEnquiryButton product={product} />
                  <p className="modal-diwali-guarantee">
                    Opens WhatsApp directly with prefilled product specifications • +91 83290 45712
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  className="modal-enquire-btn"
                  onClick={handleEnquireClick}
                  aria-label={`Enquire about ${product.name}`}
                >
                  <span>ENQUIRE ABOUT {product.name}</span>
                  <span className="arrow" aria-hidden="true">→</span>
                </button>
                <EmailEnquiryButton product={product} />
              )}
            </div>
          </div>
        </div>

        {/* Revealed Full Architectural Gallery: Displays all 6 photos in a premium gallery */}
        {isExplored && isPhotographic && allImages.length > 1 && (
          <div className="modal-gallery-section animate-fade-in" id="modal-gallery-gallery">
            <div className="gallery-section-divider">
              <span className="gallery-divider-line"></span>
              <span className="gallery-section-badge">FULL ARCHITECTURAL GALLERY</span>
              <span className="gallery-divider-line"></span>
            </div>

            <div className="gallery-section-intro">
              <div className="gallery-intro-text">
                <span className="eyebrow gallery-eyebrow">COMPLETE FAMILY COLLECTION</span>
                <h3 className="gallery-section-title">{product.name}</h3>
                <p className="gallery-section-subtitle">
                  All {allImages.length} authentic photos belonging to the {product.name} family. Select any photo to preview in high detail above.
                </p>
              </div>
              <button
                type="button"
                className="gallery-collapse-pill"
                onClick={() => {
                  setIsExplored(false)
                  setActiveImageIndex(0)
                  const panel = document.querySelector('.modal-panel')
                  if (panel) {
                    panel.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                aria-label="Collapse gallery"
              >
                <span>SHOW LESS</span>
                <span aria-hidden="true">↑</span>
              </button>
            </div>

            <div className="modal-gallery-grid">
              {allImages.map((imgItem, idx) => {
                const isSelected = idx === activeImageIndex
                return (
                  <div
                    key={imgItem.id || idx}
                    className={`gallery-grid-card ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      setActiveImageIndex(idx)
                      const panel = document.querySelector('.modal-panel')
                      if (panel) {
                        panel.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActiveImageIndex(idx)
                      }
                    }}
                    aria-label={`View ${imgItem.label || `${product.name} Photo 0${idx + 1}`}`}
                  >
                    <div className="gallery-grid-frame">
                      <img
                        src={imgItem.image}
                        alt={imgItem.alt || `${product.name} Photo 0${idx + 1}`}
                        className="gallery-grid-img"
                        loading="lazy"
                      />
                      {isSelected && (
                        <span className="gallery-active-pill">CURRENT PREVIEW</span>
                      )}
                    </div>
                    <div className="gallery-grid-meta">
                      <span className="gallery-grid-num">0{idx + 1}</span>
                      <span className="gallery-grid-label">{imgItem.label || `${product.name} Photo 0${idx + 1}`}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 25000;
          background: rgba(18, 17, 15, 0.78);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-panel {
          position: relative;
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          background: var(--bg-primary, #F7F4ED);
          border: 1px solid rgba(198, 154, 82, 0.35);
          box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.32),
                      0 0 0 1px rgba(255, 255, 255, 0.6) inset;
          border-radius: 4px;
          overflow-y: auto;
          animation: modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.5rem;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(120, 100, 70, 0.25);
          border-radius: 2px;
          padding: 0.5rem 0.85rem;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          color: var(--primary-text, #171717);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .modal-close-btn:hover {
          background: #FFFFFF;
          border-color: var(--accent-gold, #C69A52);
          color: var(--accent-gold, #C69A52);
          transform: translateY(-1px);
        }

        .modal-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          min-height: 580px;
        }

        @media (min-width: 900px) {
          .modal-content-grid {
            grid-template-columns: 1.1fr 1fr;
          }
        }

        /* ── Visual Left Pane ── */
        .modal-visual-pane {
          position: relative;
          background: radial-gradient(circle at center, #FFFFFF 0%, #FAF8F3 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 2rem 2.5rem;
          border-bottom: 1px solid rgba(120, 100, 70, 0.14);
          overflow: hidden;
        }

        @media (min-width: 900px) {
          .modal-visual-pane {
            border-bottom: none;
            border-right: 1px solid rgba(120, 100, 70, 0.14);
          }
        }

        .modal-object-number {
          position: absolute;
          top: 1.75rem;
          left: 2rem;
          font-family: var(--font-mono, monospace);
          font-size: 0.85rem;
          letter-spacing: 0.2em;
          color: var(--accent-gold, #C69A52);
          font-weight: 500;
        }

        .modal-photo-stage {
          width: 100%;
          min-height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-photo-frame {
          width: 100%;
          max-width: 440px;
          height: 380px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          border: 1px solid rgba(120, 100, 70, 0.16);
          border-radius: 3px;
          padding: 1.5rem;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
        }

        .modal-product-photo {
          width: auto;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.4s ease;
        }

        .modal-gallery-strip {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.75rem;
          padding: 0.5rem;
          max-width: 100%;
          overflow-x: auto;
          animation: modalFadeIn 0.3s ease;
        }

        .modal-thumb-btn {
          width: 64px;
          height: 64px;
          padding: 4px;
          background: #FFFFFF;
          border: 1px solid rgba(120, 100, 70, 0.2);
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .modal-thumb-btn.active {
          border-color: var(--accent-gold, #C69A52);
          box-shadow: 0 0 0 2px rgba(198, 154, 82, 0.4);
          transform: translateY(-2px);
        }

        .modal-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .modal-3d-stage {
          width: 100%;
          height: 420px;
        }

        /* ── Details Right Pane ── */
        .modal-details-pane {
          padding: 3.5rem 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--bg-primary, #F7F4ED);
        }

        .modal-eyebrow {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--accent-gold, #C69A52);
          margin-bottom: 0.65rem;
        }

        .modal-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          font-weight: 400;
          letter-spacing: 0.04em;
          color: var(--primary-text, #171717);
          line-height: 1.15;
          margin-bottom: 1.25rem;
        }

        .modal-description {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-style: italic;
          color: var(--secondary-text, #5E5A53);
          line-height: 1.6;
          font-weight: 300;
          margin-bottom: 2rem;
        }

        /* ── "EXPLORE MORE" Action Block ── */
        .modal-exploration-wrapper {
          margin: 1.5rem 0 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(120, 100, 70, 0.14);
        }

        .modal-explore-trigger-block {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .modal-explore-more-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          align-self: flex-start;
          background: transparent;
          border: 1px solid var(--accent-gold, #C69A52);
          border-radius: 2px;
          padding: 0.95rem 1.85rem;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--primary-text, #171717);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-explore-more-btn:hover {
          background: var(--accent-gold, #C69A52);
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -6px rgba(198, 154, 82, 0.35);
        }

        .modal-explore-more-btn .arrow {
          transition: transform 0.3s ease;
        }

        .modal-explore-more-btn:hover .arrow {
          transform: translateX(4px);
        }

        .explore-hint {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--secondary-text, #5E5A53);
          font-style: italic;
        }

        /* ── Revealed Additional Views ── */
        .modal-revealed-section {
          animation: modalFadeIn 0.35s ease;
        }

        .revealed-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .modal-collapse-btn {
          background: none;
          border: none;
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: var(--secondary-text, #5E5A53);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .modal-collapse-btn:hover {
          color: var(--accent-gold, #C69A52);
        }

        .spec-label {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent-gold, #C69A52);
        }

        .modal-variants-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          margin-bottom: 2rem;
          max-height: 260px;
          overflow-y: auto;
          padding-right: 0.25rem;
        }

        .modal-variant-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1.15rem;
          background: #FFFFFF;
          border: 1px solid rgba(120, 100, 70, 0.16);
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .modal-variant-card:hover {
          border-color: rgba(198, 154, 82, 0.45);
          transform: translateX(3px);
        }

        .modal-variant-card.is-selected {
          border-color: var(--accent-gold, #C69A52);
          background: #FFFDF9;
          box-shadow: 0 4px 14px -3px rgba(198, 154, 82, 0.18);
        }

        .indicator-dot {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(120, 100, 70, 0.25);
          transition: all 0.25s ease;
        }

        .modal-variant-card.is-selected .indicator-dot {
          background: var(--accent-gold, #C69A52);
          box-shadow: 0 0 8px rgba(198, 154, 82, 0.6);
        }

        .variant-card-texts {
          display: flex;
          flex-direction: column;
        }

        .variant-card-tag {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-gold, #C69A52);
        }

        .variant-card-name {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          font-weight: 400;
          color: var(--primary-text, #171717);
          margin: 0.15rem 0 0;
        }

        /* ── 3D Specifications Matrix ── */
        .modal-specs-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          margin-bottom: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(120, 100, 70, 0.14);
        }

        .modal-spec-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .spec-text {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          color: var(--primary-text, #171717);
          line-height: 1.5;
        }

        /* ── Enquiry Action ── */
        .modal-enquire-row {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(120, 100, 70, 0.14);
        }

        .modal-enquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          justify-content: center;
          background: var(--primary-text, #171717);
          color: #FFFFFF;
          border: 1px solid var(--primary-text, #171717);
          border-radius: 2px;
          padding: 1.05rem 1.85rem;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-enquire-btn:hover {
          background: var(--accent-gold, #C69A52);
          border-color: var(--accent-gold, #C69A52);
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -6px rgba(198, 154, 82, 0.35);
        }

        /* ── Diwali Specific Modal Actions ── */
        .modal-diwali-actions {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          width: 100%;
        }

        .modal-diwali-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        .modal-whatsapp-enquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          justify-content: center;
          background: #171717;
          color: #FAF7F0;
          border: 1px solid #171717;
          border-radius: 2px;
          padding: 1.15rem 1.5rem;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-whatsapp-enquire-btn:hover {
          background: #AF812A;
          border-color: #AF812A;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px -4px rgba(175, 129, 42, 0.35);
        }

        .modal-whatsapp-enquire-btn .arrow {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-whatsapp-enquire-btn:hover .arrow {
          transform: translateX(4px);
        }

        .modal-whatsapp-icon {
          color: #C69A52;
          transition: color 0.3s ease;
        }

        .modal-whatsapp-enquire-btn:hover .modal-whatsapp-icon {
          color: #FFFFFF;
        }

        .modal-diwali-guarantee {
          font-family: var(--font-sans);
          font-size: 0.74rem;
          letter-spacing: 0.04em;
          color: #7A756D;
          margin: 0.25rem 0 0;
          text-align: center;
          line-height: 1.45;
        }

        .modal-diwali-guarantee .guarantee-copied {
          color: #AF812A;
          font-weight: 500;
        }

        .modal-enquire-btn .arrow {
          transition: transform 0.3s ease;
        }

        .modal-enquire-btn:hover .arrow {
          transform: translateX(4px);
        }

        /* ── Full Architectural Gallery Section ── */
        .modal-gallery-section {
          padding: 3rem 3rem 3.5rem;
          background: #FAF8F3;
          border-top: 1px solid rgba(120, 100, 70, 0.18);
        }

        .gallery-section-divider {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .gallery-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(198, 154, 82, 0.28);
        }

        .gallery-section-badge {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--accent-gold, #C69A52);
          text-transform: uppercase;
          font-weight: 500;
        }

        .gallery-section-intro {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
        }

        .gallery-eyebrow {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          color: var(--accent-gold, #C69A52);
          margin-bottom: 0.35rem;
          display: block;
        }

        .gallery-section-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          letter-spacing: 0.06em;
          color: var(--primary-text, #171717);
          margin-bottom: 0.5rem;
          font-weight: 400;
        }

        .gallery-section-subtitle {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--secondary-text, #5A544A);
          max-width: 650px;
        }

        .gallery-collapse-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(198, 154, 82, 0.35);
          color: var(--primary-text, #171717);
          padding: 0.5rem 1rem;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          font-weight: 500;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.25s ease;
        }

        .gallery-collapse-pill:hover {
          background: #FFFFFF;
          border-color: var(--accent-gold, #C69A52);
          color: var(--accent-gold, #C69A52);
          transform: translateY(-1px);
        }

        .modal-gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }

        .gallery-grid-card {
          background: #FFFFFF;
          border: 1px solid rgba(120, 100, 70, 0.18);
          border-radius: 3px;
          padding: 1.25rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          position: relative;
        }

        .gallery-grid-card:hover {
          border-color: var(--accent-gold, #C69A52);
          transform: translateY(-3px);
          box-shadow: 0 14px 28px -10px rgba(0, 0, 0, 0.08);
        }

        .gallery-grid-card.is-selected {
          border-color: var(--accent-gold, #C69A52);
          box-shadow: 0 0 0 2px rgba(198, 154, 82, 0.45);
        }

        .gallery-grid-frame {
          position: relative;
          width: 100%;
          height: 260px;
          background: #FAF8F3;
          border: 1px solid rgba(120, 100, 70, 0.1);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          overflow: hidden;
        }

        .gallery-grid-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.4s ease;
        }

        .gallery-grid-card:hover .gallery-grid-img {
          transform: scale(1.03);
        }

        .gallery-active-pill {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: var(--accent-gold, #C69A52);
          color: #FFFFFF;
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          padding: 0.25rem 0.6rem;
          border-radius: 2px;
          font-weight: 500;
        }

        .gallery-grid-meta {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          padding-top: 0.25rem;
          border-top: 1px solid rgba(120, 100, 70, 0.1);
        }

        .gallery-grid-num {
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          color: var(--accent-gold, #C69A52);
          letter-spacing: 0.18em;
          font-weight: 500;
        }

        .gallery-grid-label {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          letter-spacing: 0.08em;
          color: var(--primary-text, #171717);
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .modal-panel {
            max-height: 94vh;
          }
          .modal-details-pane {
            padding: 2.25rem 1.75rem 2rem;
          }
          .modal-visual-pane {
            padding: 2.5rem 1.5rem 2rem;
          }
          .modal-photo-stage {
            min-height: 260px;
          }
          .modal-photo-frame {
            height: 260px;
          }
          .modal-gallery-section {
            padding: 2rem 1.25rem 2.5rem;
          }
          .modal-gallery-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        @media (max-width: 600px) {
          .modal-backdrop {
            padding: 0.5rem;
          }
          .modal-panel {
            max-height: 96vh;
            border-radius: 3px;
          }
          .modal-close-btn {
            top: 0.65rem;
            right: 0.65rem;
            min-height: 44px;
            padding: 0.4rem 0.75rem;
            z-index: 30;
          }
          .modal-object-number {
            top: 0.85rem;
            left: 0.85rem;
            font-size: 0.75rem;
          }
          .modal-visual-pane {
            padding: 2.25rem 1rem 1.5rem;
          }
          .modal-photo-stage,
          .modal-photo-frame {
            min-height: 220px;
            height: 220px;
          }
          .modal-details-pane {
            padding: 1.5rem 1.25rem;
          }
          .modal-action-row {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }
          .modal-enquire-btn,
          .modal-whatsapp-btn {
            width: 100%;
            min-height: 48px;
            justify-content: center;
          }
          .gallery-grid-frame {
            height: 190px;
          }
        }
      `}</style>
    </div>
  )
}
