import React from 'react'
import './FestiveHomepagePreview.css'
import { STUDIO_INFO, getWhatsAppEnquiryUrl } from '../data/productsData'

/**
 * FestiveHomepagePreview — Clean, Editorial Homepage Preview Section
 * 
 * Replaces the heavy 3D product scene and floating carousel on the homepage:
 * - One dominant, authentic festive photograph with subtle supporting accents.
 * - Clear editorial headline and narrative.
 * - Prominent "Explore Festive Collection" CTA that navigates directly to the dedicated Festive Collection page.
 * - Direct WhatsApp concierge connection.
 * - Pure luxury lighting brand aesthetic (warm ivory, champagne gold, refined typography).
 */
export default function FestiveHomepagePreview({ onExploreFestive }) {
  const handleExplore = () => {
    if (onExploreFestive) {
      onExploreFestive()
    } else {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
      try {
        sessionStorage.setItem('pearl_home_scroll_pos', String(scrollY))
        window.history.replaceState({ ...window.history.state, homeScrollY: scrollY }, '', window.location.href)
      } catch (e) {}
      window.history.pushState({ festive: true }, '', '/festive-collection')
      window.dispatchEvent(new PopStateEvent('popstate'))
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  const handleWhatsApp = () => {
    const text = 'Hi Pearl Lighting Studio! I would like to inquire about your Festive Lighting Collection.'
    window.open(
      `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <section
      className="as-festive-preview-root"
      id="festive-collection"
      aria-label="Festive Collection Preview"
    >
      <div className="as-festive-preview-ambient-glow" aria-hidden="true" />

      <div className="as-festive-preview-container">
        {/* Section Header Eyebrow */}
        <div className="as-festive-preview-eyebrow-row">
          <span className="as-festive-sparkle" aria-hidden="true">✦</span>
          <span className="as-festive-eyebrow-text">PEARL LIGHTING · CELEBRATION REPERTOIRE</span>
          <span className="as-festive-eyebrow-line" aria-hidden="true" />
        </div>

        {/* Main Composition: Visual Showcase on Left/Top, Editorial Copy on Right */}
        <div className="as-festive-preview-layout">
          {/* Visual Showcase: Strong festive photograph + small tasteful accents */}
          <div className="as-festive-preview-visual-stage">
            {/* Primary Hero Photograph */}
            <div className="as-festive-preview-hero-frame" onClick={handleExplore} role="button" tabIndex={0} aria-label="Explore Festive Collection">
              <img
                src="/images/editorial/festive-veranda-grand-hero.jpg"
                alt="Pearl Lighting Festive Celebration Veranda with Warm Lanterns and Garlands"
                className="as-festive-preview-hero-img"
                loading="eager"
              />
              <div className="as-festive-hero-overlay-tag">
                <span className="as-tag-spark">✦</span>
                <span>Celebration Series 2026</span>
              </div>
            </div>

            {/* Small Tasteful 3-Photo Accent Collage */}
            <div className="as-festive-preview-accents-row">
              <div className="as-festive-accent-card" onClick={handleExplore} role="button" tabIndex={0} aria-label="Warm Amber Cluster Radiance">
                <img
                  src="/images/diwali/diwali-golden-bokeh-lifestyle.png"
                  alt="Warm Golden Amber Festive Ambiance"
                  className="as-festive-accent-img"
                  loading="lazy"
                />
                <span className="as-accent-caption">Golden Amber Radiance</span>
              </div>

              <div className="as-festive-accent-card" onClick={handleExplore} role="button" tabIndex={0} aria-label="Golden Star String Lights">
                <img
                  src="/images/diwali/diwali-golden-star-string-lights.webp"
                  alt="Golden Star String Lights"
                  className="as-festive-accent-img"
                  loading="lazy"
                />
                <span className="as-accent-caption">Golden Star String</span>
              </div>

              <div className="as-festive-accent-card" onClick={handleExplore} role="button" tabIndex={0} aria-label="Crystal Bubble Refraction">
                <img
                  src="/images/diwali/diwali-crystal-bubble-lights.png"
                  alt="Crystal Bubble Refraction Lights"
                  className="as-festive-accent-img"
                  loading="lazy"
                />
                <span className="as-accent-caption">Optical Crystal Sparkle</span>
              </div>
            </div>
          </div>

          {/* Editorial Narrative & Actions */}
          <div className="as-festive-preview-copy-stage">
            <div className="as-festive-collection-kicker">
              <span>SPECIAL EDITION</span>
              <span className="as-kicker-dot">•</span>
              <span>AUTHENTIC CELEBRATION REPERTOIRE</span>
            </div>

            <h2 className="as-festive-preview-headline">
              Festive Collection
            </h2>

            <p className="as-festive-preview-subtitle">
              Discover lights that bring every celebration to life.
            </p>

            <p className="as-festive-preview-body">
              From cascading star curtains and traditional brass diya silhouettes to solid crystal bubble orbs and hand-woven filament fixtures—thoughtfully curated by our Kalbadevi Mumbai atelier to bring warmth, wonder, and celebratory radiance into distinguished homes.
            </p>

            {/* Feature Highlights Grid */}
            <div className="as-festive-preview-features">
              <div className="as-feature-item">
                <span className="as-feature-spark">✦</span>
                <div className="as-feature-text">
                  <strong>Complete Repertoire</strong>
                  <span>Cascading curtains, filament ropes &amp; crystal strings</span>
                </div>
              </div>

              <div className="as-feature-item">
                <span className="as-feature-spark">✦</span>
                <div className="as-feature-text">
                  <strong>Ultra-Warm Golden Luster</strong>
                  <span>2200K–2700K ambient glow engineered for celebrations</span>
                </div>
              </div>

              <div className="as-feature-item">
                <span className="as-feature-spark">✦</span>
                <div className="as-feature-text">
                  <strong>Pan-India Direct Dispatch</strong>
                  <span>Carefully packed and dispatched from Mumbai</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="as-festive-preview-actions">
              <button
                type="button"
                className="as-btn-explore-festive-main"
                id="btn-explore-festive-collection"
                onClick={handleExplore}
                aria-label="Navigate to dedicated Festive Collection page"
              >
                <span>Explore Festive Collection</span>
                <span className="as-btn-arrow-icon" aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                className="as-btn-festive-wa"
                onClick={handleWhatsApp}
                aria-label="Inquire about Festive Collection on WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
                </svg>
                <span>Direct Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
