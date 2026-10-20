import React, { useState } from 'react'
import {
  diwaliProductsData,
  getDiwaliWhatsAppUrl,
  DIWALI_WHATSAPP_NUMBER,
} from '../data/diwaliProductsData'

/**
 * DiwaliCollectionSection - Dedicated Festive Lighting Experience
 * 
 * Conforms to requirements:
 * 1. Kept 100% separate from regular architectural products.
 * 2. Uses actual Diwali product photos provided by user.
 * 3. Luxurious Indian festive atmosphere: warm ivory, cream, champagne gold, subtle glowing light.
 * 4. High-editorial layouts with introductory banner, varied gallery cards, View Details, and WhatsApp Enquiry.
 * 5. One-click URL-encoded WhatsApp enquiry using +91 83290 45712.
 */
export default function DiwaliCollectionSection({ onOpenProduct }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const handleOpenDetails = (product) => {
    if (onOpenProduct) {
      onOpenProduct(product, true)
    }
  }

  const handleBannerWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Pearl Lighting, I would like to enquire about your Diwali & Festive Lighting Collection. Please share your catalogue and festive availability.'
    )
    window.open(`https://wa.me/${DIWALI_WHATSAPP_NUMBER}?text=${text}`, '_blank')
  }

  return (
    <section
      className="diwali-section-root"
      id="diwali-lights"
      aria-label="Diwali and Festive Lighting Collection"
    >
      {/* Ambient festive golden dust / soft warm radial gradients */}
      <div className="diwali-ambient-glow diwali-glow-1" aria-hidden="true"></div>
      <div className="diwali-ambient-glow diwali-glow-2" aria-hidden="true"></div>

      <div className="container diwali-container">
        {/* Category Separation Eyebrow */}
        <div className="diwali-category-meta-bar">
          <div className="meta-left">
            <span className="festive-marker">FESTIVE COLLECTION</span>
            <span className="meta-sep">•</span>
            <span className="meta-collection-type">SEPARATE SEASONAL REPERTOIRE</span>
          </div>
          <div className="meta-right">
            <a href="#collection" className="meta-switch-link" title="Jump to Regular Architectural Collection">
              <span>View Everyday Architectural Collection</span>
              <span className="switch-arrow" aria-hidden="true">↑</span>
            </a>
          </div>
        </div>

        {/* ── Section Hero Banner (Real Diwali Product Spotlight) ── */}
        <div className="diwali-hero-banner">
          <div className="banner-grid">
            <div className="banner-content-col">
              <div className="banner-badge-wrapper">
                <span className="banner-pill">
                  <span className="sparkle-icon" aria-hidden="true">✦</span>
                  DIWALI & CELEBRATION LIGHTING
                </span>
                <span className="banner-season-tag">FESTIVE 2026 EDITION</span>
              </div>

              <h2 className="banner-monumental-heading">
                LIGHT UP YOUR<br />
                <span className="gold-italic">FESTIVE MOMENTS.</span>
              </h2>

              <p className="banner-lead-text">
                Discover decorative lighting that brings warmth, sparkle, and celebration to every festive space.
                Thoughtfully crafted to transform balconies, mandirs, festive living rooms, and grand facade architecture.
              </p>

              <div className="banner-actions-row">
                <a href="#diwali-gallery" className="banner-explore-btn">
                  <span>EXPLORE FESTIVE GALLERY</span>
                  <span className="action-arrow" aria-hidden="true">↓</span>
                </a>

                <button
                  type="button"
                  onClick={handleBannerWhatsApp}
                  className="banner-whatsapp-direct-btn"
                  aria-label="Direct WhatsApp Enquiry for Festive Collection"
                >
                  <svg
                    className="whatsapp-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.188 8.188 0 0 1-5.83 2.41c-1.47 0-2.92-.39-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z"/>
                  </svg>
                  <span>WHATSAPP ENQUIRY</span>
                </button>
              </div>

              <div className="banner-trust-strip">
                <div className="trust-item">
                  <span className="trust-dot"></span>
                  <span>Direct Pearl Lighting Business Support</span>
                </div>
                <div className="trust-item">
                  <span className="trust-dot"></span>
                  <span>Instant Price & Availability on WhatsApp</span>
                </div>
              </div>
            </div>

            {/* Banner Right: Editorial Product Image Showcase */}
            <div className="banner-visual-col">
              <div className="banner-visual-frame">
                <img
                  src="/images/diwali/diwali-crystal-bubble-lights.png"
                  alt="Pearl Lighting Festive Crystal Bubble Ball Lights in Warm Ambient Setting"
                  className="banner-featured-photo"
                  loading="eager"
                />
                <div className="banner-visual-caption">
                  <span className="caption-tag">FEATURED LUMINAIRE</span>
                  <h3 className="caption-title">Crystal Bubble Ball String Lights</h3>
                  <span className="caption-desc">Sparkling crackle orbs casting ambient festive warmth</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Festive Gallery Section ── */}
        <div className="diwali-gallery-block" id="diwali-gallery">
          <div className="gallery-header-row">
            <div>
              <div className="gallery-meta-tag">
                <span className="marker-index">05</span>
                <span className="marker-name">FESTIVE LIGHTING REPERTOIRE</span>
              </div>
              <h3 className="gallery-section-title">
                AVAILABLE FESTIVE SELECTIONS
              </h3>
            </div>
            <p className="gallery-section-note">
              Explore authentic festive lighting items below. Click any product to inspect all available photographs or initiate an immediate WhatsApp enquiry.
            </p>
          </div>

          {/* Product Cards Grid: Rich Editorial Cards */}
          <div className="diwali-products-grid">
            {diwaliProductsData.map((item, idx) => {
              const waUrl = getDiwaliWhatsAppUrl(item)
              const imageCount = 1 + (item.additionalImages?.length || 0)

              return (
                <article
                  key={item.id}
                  className={`diwali-product-card diwali-card-${idx + 1}`}
                  aria-labelledby={`diwali-title-${item.id}`}
                >
                  {/* Card Visual Stage */}
                  <div
                    className="card-media-stage"
                    onClick={() => handleOpenDetails(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' ? handleOpenDetails(item) : null)}
                    aria-label={`View photos for ${item.name}`}
                  >
                    <div className="card-badge-row">
                      <span className="card-number-badge">{item.number}</span>
                      {imageCount > 1 && (
                        <span className="card-views-badge">
                          {imageCount} AUTHENTIC VIEWS
                        </span>
                      )}
                    </div>

                    <div className="card-img-wrapper">
                      <img
                        src={item.primaryImage.image}
                        alt={item.primaryImage.alt || item.name}
                        className="card-product-img"
                        loading="lazy"
                      />
                    </div>

                    <div className="card-hover-overlay">
                      <span className="overlay-prompt">
                        <span>VIEW FULL GALLERY</span>
                        <span className="arrow" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Editorial Info */}
                  <div className="card-editorial-body">
                    <div className="card-header-line">
                      <span className="card-subtitle">{item.subtitle}</span>
                      <span className="card-festive-tag">{item.badge}</span>
                    </div>

                    <h4 id={`diwali-title-${item.id}`} className="card-product-name">
                      {item.name}
                    </h4>

                    <p className="card-description-text">
                      {item.description}
                    </p>

                    {/* Quick Specs / Character */}
                    {item.details && item.details.length > 0 && (
                      <div className="card-details-strip">
                        <span className="detail-label">LIGHT:</span>
                        <span className="detail-value">{item.details[0].value}</span>
                      </div>
                    )}

                    {/* Dual Action Buttons */}
                    <div className="card-actions-group">
                      <button
                        type="button"
                        className="card-details-btn"
                        onClick={() => handleOpenDetails(item)}
                        aria-label={`View details and gallery for ${item.name}`}
                      >
                        <span>EXPLORE PRODUCT</span>
                        <span className="btn-arrow" aria-hidden="true">→</span>
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-whatsapp-btn"
                        aria-label={`Enquire about ${item.name} on WhatsApp`}
                        title="Enquire price and availability on WhatsApp"
                      >
                        <svg
                          className="btn-whatsapp-icon"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="16"
                          height="16"
                          aria-hidden="true"
                        >
                          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.188 8.188 0 0 1-5.83 2.41c-1.47 0-2.92-.39-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.39c0-4.54 3.7-8.24 8.24-8.24zm4.5 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.07-.39-2.04-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28z"/>
                        </svg>
                        <span>WHATSAPP</span>
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Editorial Festive Notice / Easy Expansion Banner */}
          <div className="diwali-curation-footer">
            <div className="curation-text-col">
              <span className="curation-kicker">CUSTOM FESTIVE ORDERS & UPCOMING SELECTIONS</span>
              <h4 className="curation-title">
                Looking for decorative hanging star lights or custom celebration bundles?
              </h4>
              <p className="curation-desc">
                We supply complete festive illumination setups for apartments, bungalows, event spaces, and temples across India.
                Contact Parth Enterprises directly on WhatsApp for bulk festive orders, hanging star lights, or custom lengths.
              </p>
            </div>
            <div className="curation-action-col">
              <button
                type="button"
                onClick={handleBannerWhatsApp}
                className="curation-cta-btn"
              >
                <span>TALK WITH LIGHTING SPECIALIST</span>
                <span className="arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           DIWALI & FESTIVE LIGHTING STYLES (WARM IVORY, CREAM, CHAMPAGNE GOLD)
           ========================================================================== */
        .diwali-section-root {
          position: relative;
          background: #FAF7F0;
          color: #171717;
          padding: clamp(4.5rem, 8vw, 7.5rem) 0 clamp(4rem, 7vw, 6.5rem);
          border-top: 1px solid rgba(198, 154, 82, 0.25);
          border-bottom: 1px solid rgba(198, 154, 82, 0.2);
          overflow: hidden;
        }

        /* Ambient golden festive glows */
        .diwali-ambient-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(100px);
        }

        .diwali-glow-1 {
          top: 10%;
          right: -5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(216, 184, 117, 0.16) 0%, rgba(198, 154, 82, 0.04) 50%, transparent 75%);
        }

        .diwali-glow-2 {
          bottom: 15%;
          left: -8%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(216, 184, 117, 0.12) 0%, rgba(198, 154, 82, 0.02) 55%, transparent 75%);
        }

        .diwali-container {
          position: relative;
          z-index: 1;
          max-width: var(--container-max, 1380px);
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 3.5vw, 2.5rem);
        }

        /* Category Separation Bar */
        .diwali-category-meta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(198, 154, 82, 0.2);
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }

        .meta-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .festive-marker {
          color: #B28330;
          font-weight: 700;
        }

        .meta-sep {
          color: rgba(120, 100, 70, 0.35);
        }

        .meta-collection-type {
          color: var(--text-secondary, #5E5A53);
          font-weight: 500;
        }

        .meta-switch-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-secondary, #5E5A53);
          text-decoration: none;
          transition: color 0.3s ease;
          padding: 0.35rem 0.85rem;
          border: 1px solid rgba(120, 100, 70, 0.18);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.45);
        }

        .meta-switch-link:hover {
          color: #171717;
          border-color: #C69A52;
          background: #FFFFFF;
        }

        .switch-arrow {
          font-size: 0.9rem;
          transition: transform 0.3s ease;
        }

        .meta-switch-link:hover .switch-arrow {
          transform: translateY(-2px);
        }

        /* ── Hero Banner ── */
        .diwali-hero-banner {
          background: linear-gradient(135deg, #FCFAF6 0%, #F5EFE4 100%);
          border: 1px solid rgba(198, 154, 82, 0.35);
          box-shadow: 0 20px 45px -15px rgba(180, 140, 70, 0.12);
          border-radius: 4px;
          padding: clamp(2.5rem, 5vw, 4.5rem);
          margin-bottom: clamp(4rem, 7vw, 6rem);
          position: relative;
          overflow: hidden;
        }

        .banner-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.95fr;
          gap: clamp(2.5rem, 5vw, 5rem);
          align-items: center;
        }

        .banner-content-col {
          display: flex;
          flex-direction: column;
        }

        .banner-badge-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .banner-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.85rem;
          background: rgba(198, 154, 82, 0.15);
          border: 1px solid rgba(198, 154, 82, 0.45);
          border-radius: 999px;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8C6218;
          font-weight: 700;
        }

        .sparkle-icon {
          color: #C69A52;
          font-size: 0.8rem;
        }

        .banner-season-tag {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-dim, #7A756D);
        }

        .banner-monumental-heading {
          font-family: var(--font-serif);
          font-size: clamp(2.5rem, 5.2vw, 4.6rem);
          line-height: 1.05;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: #171717;
          margin: 0 0 1.5rem 0;
          text-transform: uppercase;
        }

        .gold-italic {
          font-style: italic;
          color: #AF812A;
          font-weight: 400;
        }

        .banner-lead-text {
          font-family: var(--font-sans);
          font-size: clamp(0.98rem, 1.25vw, 1.15rem);
          line-height: 1.65;
          color: #4C4841;
          margin: 0 0 2.25rem 0;
          max-width: 580px;
          font-weight: 400;
        }

        .banner-actions-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .banner-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.95rem 1.85rem;
          background: #171717;
          color: #FAF7F0;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          font-weight: 600;
          border-radius: 2px;
          transition: all 0.3s ease;
          border: 1px solid #171717;
        }

        .banner-explore-btn:hover {
          background: #AF812A;
          border-color: #AF812A;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -6px rgba(175, 129, 42, 0.4);
        }

        .banner-whatsapp-direct-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.95rem 1.75rem;
          background: #171717;
          color: #FAF7F2;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 2px;
          border: 1px solid rgba(198, 154, 82, 0.45);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .banner-whatsapp-direct-btn:hover {
          background: #C69A52;
          border-color: #C69A52;
          color: #12100E;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -6px rgba(198, 154, 82, 0.45);
        }

        .banner-whatsapp-direct-btn:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        .banner-trust-strip {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          color: #7A756D;
          letter-spacing: 0.04em;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .trust-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C69A52;
        }

        /* Banner Visual Col */
        .banner-visual-col {
          position: relative;
        }

        .banner-visual-frame {
          position: relative;
          background: #1A1815;
          border-radius: 4px;
          padding: 0.75rem;
          border: 1px solid rgba(198, 154, 82, 0.4);
          box-shadow: 0 25px 50px -15px rgba(30, 20, 10, 0.25);
        }

        .banner-featured-photo {
          width: 100%;
          height: clamp(320px, 36vw, 460px);
          object-fit: cover;
          display: block;
          border-radius: 2px;
          filter: saturate(1.05) contrast(1.03);
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .banner-visual-frame:hover .banner-featured-photo {
          transform: scale(1.02);
        }

        .banner-visual-caption {
          margin-top: 1rem;
          padding: 0.5rem 0.5rem 0.25rem;
        }

        .caption-tag {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #D8B875;
          font-weight: 600;
          display: block;
          margin-bottom: 0.25rem;
        }

        .caption-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: #FAF7F0;
          margin: 0 0 0.25rem 0;
          font-weight: 400;
        }

        .caption-desc {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: #B5AEA4;
        }

        /* ── Gallery Header ── */
        .diwali-gallery-block {
          position: relative;
        }

        .gallery-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          flex-wrap: wrap;
          padding-bottom: 1.75rem;
          border-bottom: 1px solid rgba(198, 154, 82, 0.25);
          margin-bottom: 3rem;
        }

        .gallery-meta-tag {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.65rem;
        }

        .marker-index {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #AF812A;
        }

        .marker-name {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-secondary, #5E5A53);
        }

        .gallery-section-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 300;
          letter-spacing: -0.01em;
          margin: 0;
          color: #171717;
          text-transform: uppercase;
        }

        .gallery-section-note {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-secondary, #5E5A53);
          max-width: 480px;
          margin: 0;
        }

        /* ── Products Grid ── */
        .diwali-products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.75rem, 3.5vw, 2.75rem);
          margin-bottom: clamp(3.5rem, 6vw, 5rem);
        }

        .diwali-product-card {
          background: #FFFFFF;
          border: 1px solid rgba(198, 154, 82, 0.22);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
          box-shadow: 0 6px 20px -8px rgba(120, 100, 70, 0.08);
        }

        .diwali-product-card:hover {
          border-color: rgba(198, 154, 82, 0.6);
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -12px rgba(180, 140, 70, 0.18);
        }

        .card-media-stage {
          position: relative;
          background: #141311;
          height: clamp(280px, 28vw, 380px);
          overflow: hidden;
          cursor: pointer;
        }

        .card-badge-row {
          position: absolute;
          top: 1rem;
          left: 1rem;
          right: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
          pointer-events: none;
        }

        .card-number-badge {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #D8B875;
          background: rgba(20, 19, 17, 0.75);
          backdrop-filter: blur(8px);
          padding: 0.25rem 0.6rem;
          border-radius: 2px;
          border: 1px solid rgba(216, 184, 117, 0.35);
        }

        .card-views-badge {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #FAF7F0;
          background: rgba(175, 129, 42, 0.85);
          backdrop-filter: blur(8px);
          padding: 0.25rem 0.6rem;
          border-radius: 2px;
        }

        .card-img-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .card-media-stage:hover .card-product-img {
          transform: scale(1.05);
        }

        .card-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(17, 16, 14, 0.75) 0%, rgba(17, 16, 14, 0.1) 60%);
          display: flex;
          align-items: flex-end;
          padding: 1.5rem;
          opacity: 0;
          transition: opacity 0.35s ease;
        }

        .card-media-stage:hover .card-hover-overlay {
          opacity: 1;
        }

        .overlay-prompt {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          letter-spacing: 0.16em;
          color: #FAF7F0;
          font-weight: 600;
          text-transform: uppercase;
        }

        .overlay-prompt .arrow {
          color: #D8B875;
          transition: transform 0.3s ease;
        }

        .card-media-stage:hover .overlay-prompt .arrow {
          transform: translateX(4px);
        }

        /* Card Editorial Body */
        .card-editorial-body {
          padding: clamp(1.5rem, 2.5vw, 2rem);
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-header-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.6rem;
        }

        .card-subtitle {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #8C6218;
          font-weight: 600;
        }

        .card-festive-tag {
          font-family: var(--font-sans);
          font-size: 0.64rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #5E5A53;
          background: #F4EFE6;
          padding: 0.2rem 0.55rem;
          border-radius: 2px;
        }

        .card-product-name {
          font-family: var(--font-serif);
          font-size: clamp(1.35rem, 1.8vw, 1.7rem);
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: #171717;
          margin: 0 0 0.85rem 0;
          text-transform: uppercase;
        }

        .card-description-text {
          font-family: var(--font-sans);
          font-size: 0.86rem;
          line-height: 1.6;
          color: #5E5A53;
          margin: 0 0 1.25rem 0;
          flex: 1;
        }

        .card-details-strip {
          padding: 0.65rem 0.85rem;
          background: #FAF7F0;
          border-left: 2px solid #C69A52;
          margin-bottom: 1.5rem;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .detail-label {
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #8C6218;
          font-size: 0.68rem;
        }

        .detail-value {
          color: #4C4841;
        }

        /* Card Action Group */
        .card-actions-group {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.75rem;
          align-items: stretch;
          margin-top: auto;
        }

        .card-details-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.15rem;
          background: #171717;
          color: #FAF7F0;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          border: 1px solid #171717;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .card-details-btn:hover {
          background: #AF812A;
          border-color: #AF812A;
        }

        .card-details-btn .btn-arrow {
          transition: transform 0.3s ease;
        }

        .card-details-btn:hover .btn-arrow {
          transform: translateX(3px);
        }

        .card-whatsapp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.75rem 1.15rem;
          background: #E8F8EE;
          color: #128C43;
          border: 1px solid rgba(37, 211, 102, 0.4);
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 700;
          text-decoration: none;
          border-radius: 2px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .card-whatsapp-btn:hover {
          background: #C69A52;
          color: #12100E;
          border-color: #C69A52;
          box-shadow: 0 4px 12px -2px rgba(198, 154, 82, 0.35);
        }

        .card-whatsapp-btn:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        /* ── Curation Footer ── */
        .diwali-curation-footer {
          background: #F4EFE5;
          border: 1px dashed rgba(198, 154, 82, 0.45);
          border-radius: 4px;
          padding: clamp(2rem, 3.5vw, 3rem);
          display: grid;
          grid-template-columns: 1.4fr 0.8fr;
          gap: 2rem;
          align-items: center;
        }

        .curation-kicker {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8C6218;
          font-weight: 700;
          display: block;
          margin-bottom: 0.5rem;
        }

        .curation-title {
          font-family: var(--font-serif);
          font-size: clamp(1.35rem, 2vw, 1.8rem);
          color: #171717;
          margin: 0 0 0.75rem 0;
          font-weight: 400;
          line-height: 1.25;
        }

        .curation-desc {
          font-family: var(--font-sans);
          font-size: 0.86rem;
          line-height: 1.6;
          color: #5E5A53;
          margin: 0;
        }

        .curation-action-col {
          display: flex;
          justify-content: flex-end;
        }

        .curation-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.95rem 1.65rem;
          background: #171717;
          color: #FAF7F0;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          border: 1px solid #171717;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .curation-cta-btn:hover {
          background: #AF812A;
          border-color: #AF812A;
          transform: translateY(-2px);
        }

        /* ── Responsive Queries ── */
        @media (max-width: 1024px) {
          .banner-grid {
            grid-template-columns: 1fr;
          }
          .diwali-products-grid {
            grid-template-columns: 1fr;
          }
          .diwali-curation-footer {
            grid-template-columns: 1fr;
          }
          .curation-action-col {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .banner-actions-row {
            flex-direction: column;
            align-items: stretch;
          }
          .banner-explore-btn,
          .banner-whatsapp-direct-btn {
            justify-content: center;
          }
          .card-actions-group {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
