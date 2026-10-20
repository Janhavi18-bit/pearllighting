import React from 'react'
import { diwaliProductsData, DIWALI_LIFESTYLE_IMAGE, getDiwaliWhatsAppUrl } from '../data/diwaliProductsData'

/**
 * SECTION 5: FESTIVE LIGHTING (THE CELESTIAL SALON)
 * Visually exciting, deep nocturne celebratory chapter contrasting with the ivory architectural sections.
 * Showcases authentic Diwali luminaires, warm golden bokeh pools, and direct WhatsApp inquiry.
 */
export default function DiwaliPreviewSection({ onExploreFullCollection, onOpenProduct }) {
  // Find key authentic festive items
  const starCurtain = diwaliProductsData.find((p) => p.id === 'hanging-star-curtain') || diwaliProductsData[0]
  const diyaCurtain = diwaliProductsData.find((p) => p.id === 'hanging-diya-curtain') || diwaliProductsData[1]
  const goldenCluster = diwaliProductsData.find((p) => p.id === 'golden-cluster-fairy-string') || diwaliProductsData[3]
  const crystalBubble = diwaliProductsData.find((p) => p.id === 'crystal-bubble-string') || diwaliProductsData[4]

  const featuredFestive = [
    {
      product: starCurtain,
      title: 'Hanging Star Curtain Lights',
      tag: 'Warm Golden Cascade',
      image: '/images/diwali/diwali-hanging-star-curtain.png',
    },
    {
      product: diyaCurtain,
      title: 'Hanging Diya Silhouette Curtain',
      tag: 'Festive Entrance Aura',
      image: '/images/diwali/diwali-hanging-diya-curtain.png',
    },
    {
      product: goldenCluster,
      title: 'Golden Cluster Fairy Lights',
      tag: 'Ambient Bokeh Radiance',
      image: '/images/diwali/diwali-golden-cluster-lights.png',
    },
    {
      product: crystalBubble,
      title: 'Crystal Bubble String Lights',
      tag: 'Sparkling Crackle Reflections',
      image: '/images/diwali/diwali-crystal-bubble-lights.png',
    },
  ]

  const handleProductClick = (product) => {
    if (onOpenProduct && product) {
      onOpenProduct(product)
    }
  }

  return (
    <section className="festive-nocturne-root" id="festive" aria-label="Festive Lighting Celebration">
      {/* Ambient Nocturne Warm Golden Bokeh Pools */}
      <div className="festive-ambient-void" aria-hidden="true">
        <div className="bokeh-pool pool-left"></div>
        <div className="bokeh-pool pool-right"></div>
        <span className="festive-sparkle sparkle-1">✦</span>
        <span className="festive-sparkle sparkle-2">✧</span>
        <span className="festive-sparkle sparkle-3">✦</span>
      </div>

      <div className="container festive-inner-container">
        {/* Section Header */}
        <header className="festive-section-header">
          <div className="festive-marker-rail">
            <span className="festive-marker-num">06</span>
            <span className="festive-marker-dot">•</span>
            <span className="festive-marker-title">THE CELESTIAL SALON • FESTIVE LIGHTING</span>
          </div>

          <div className="festive-title-spread">
            <div>
              <h2 className="festive-main-heading">
                LIGHT UP YOUR<br />
                <span className="festive-gold-accent">FESTIVE MOMENTS.</span>
              </h2>
              <p className="festive-lead-text">
                Cascading warm golden star silhouettes, traditional diya curtain garlands, and micro-LED bokeh clusters—curated to transform Diwali balconies, living rooms, and celebration spaces with joyful warmth.
              </p>
            </div>

            <div className="festive-header-actions">
              <button
                type="button"
                className="festive-primary-modal-btn"
                onClick={onExploreFullCollection}
                aria-label="Explore Complete Diwali Collection"
              >
                <span>Explore Full 10-Piece Collection</span>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── Visual Festive Stage Composition ── */}
        <div className="festive-stage-layout">
          {/* Main Lifestyle Mood Monument */}
          <div
            className="festive-lifestyle-monolith"
            onClick={onExploreFullCollection}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' ? onExploreFullCollection && onExploreFullCollection() : null)}
            aria-label="Open Full Festive Lights Collection"
          >
            <div className="lifestyle-image-wrap">
              <img
                src={DIWALI_LIFESTYLE_IMAGE.image}
                alt={DIWALI_LIFESTYLE_IMAGE.alt}
                className="lifestyle-hero-img"
                loading="lazy"
              />
              <div className="lifestyle-ambient-shadow"></div>

              <div className="lifestyle-tag-plaque">
                <span className="tag-sparkle">✦</span>
                <span className="tag-label">Festive Ambiance & Warm Golden Radiance</span>
              </div>
            </div>

            <div className="lifestyle-content-bar">
              <div>
                <h3 className="lifestyle-bar-title">The Celebration Repertoire</h3>
                <p className="lifestyle-bar-desc">Discover decorative fixtures engineered for warmth, sparkle, and festival splendor.</p>
              </div>
              <span className="lifestyle-view-link">View All 10 Pieces ↗</span>
            </div>
          </div>

          {/* 4-Item Grid of Authentic Festive Products */}
          <div className="festive-products-grid">
            {featuredFestive.map((item, idx) => (
              <div
                key={idx}
                className="festive-product-card"
                onClick={() => handleProductClick(item.product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' ? handleProductClick(item.product) : null)}
                aria-label={`View details for ${item.title}`}
              >
                <div className="festive-card-visual">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="festive-card-img"
                    loading="lazy"
                  />
                  <div className="festive-card-glow" aria-hidden="true"></div>
                </div>

                <div className="festive-card-info">
                  <span className="festive-card-tag">{item.tag}</span>
                  <h4 className="festive-card-title">{item.title}</h4>

                  <div className="festive-card-actions">
                    <span className="festive-explore-action">Explore fixture ↗</span>
                    <a
                      href={getDiwaliWhatsAppUrl(item.product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="festive-wa-quick"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Enquire via WhatsApp for ${item.title}`}
                    >
                      WhatsApp Price ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner Trigger */}
        <div className="festive-footer-banner">
          <div className="banner-content">
            <span className="banner-sparkle">✦</span>
            <div className="banner-text">
              <span className="banner-heading">Looking for bulk festive orders or custom architectural curtain sizes?</span>
              <span className="banner-sub">Direct atelier liaison available with rapid pan-India dispatch under Parth Enterprises.</span>
            </div>
          </div>
          <a
            href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20would%20like%20to%20enquire%20about%20festive%20lighting%20orders."
            target="_blank"
            rel="noopener noreferrer"
            className="banner-cta-btn"
          >
            Chat with Festive Specialist
          </a>
        </div>
      </div>

      <style>{`
        .festive-nocturne-root {
          position: relative;
          background: #12100E;
          color: #FAF8F5;
          padding: 7rem 0 7.5rem;
          overflow: hidden;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
        }

        .festive-ambient-void {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bokeh-pool {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.16;
        }

        .pool-left {
          top: 10%;
          left: -10vw;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, #D4AF37 0%, transparent 70%);
        }

        .pool-right {
          bottom: 10%;
          right: -10vw;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle, #C5A059 0%, transparent 70%);
        }

        .festive-sparkle {
          position: absolute;
          color: rgba(226, 188, 106, 0.4);
          font-size: 1rem;
          animation: floatSparkle 4s ease-in-out infinite;
        }

        .sparkle-1 { top: 20%; right: 12%; animation-delay: 0s; }
        .sparkle-2 { top: 65%; left: 8%; animation-delay: 1.5s; font-size: 0.8rem; }
        .sparkle-3 { bottom: 15%; right: 25%; animation-delay: 2.8s; }

        @keyframes floatSparkle {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(-8px); }
        }

        .festive-inner-container {
          position: relative;
          z-index: 1;
        }

        /* Marker rail */
        .festive-marker-rail {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .festive-marker-num {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-gold);
        }

        .festive-marker-dot {
          color: rgba(197, 160, 89, 0.4);
          font-size: 0.75rem;
        }

        .festive-marker-title {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-secondary-light);
        }

        /* Title spread */
        .festive-title-spread {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4rem;
        }

        @media (min-width: 960px) {
          .festive-title-spread {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }

        .festive-main-heading {
          font-family: var(--font-sans);
          font-size: clamp(2.3rem, 5vw, 4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #FAF8F5;
          margin-bottom: 1rem;
        }

        .festive-gold-accent {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, #F5D796 0%, #C5A059 60%, #A68037 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .festive-lead-text {
          font-size: clamp(0.95rem, 1.25vw, 1.1rem);
          line-height: 1.65;
          color: var(--text-secondary-light);
          max-width: 580px;
          font-weight: 300;
        }

        .festive-primary-modal-btn {
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
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(197, 160, 89, 0.35);
        }

        .festive-primary-modal-btn:hover {
          background: #E5C37A;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(197, 160, 89, 0.5);
        }

        .btn-arrow {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        .festive-primary-modal-btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        /* Stage layout */
        .festive-stage-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        @media (min-width: 1024px) {
          .festive-stage-layout {
            grid-template-columns: 1.1fr 1fr;
            gap: 3.5rem;
          }
        }

        /* Lifestyle monolith */
        .festive-lifestyle-monolith {
          background: #181613;
          border-radius: 24px;
          border: 1px solid rgba(197, 160, 89, 0.22);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .festive-lifestyle-monolith:hover {
          transform: translateY(-3px);
          border-color: rgba(197, 160, 89, 0.45);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
        }

        .lifestyle-image-wrap {
          position: relative;
          width: 100%;
          min-height: 380px;
          overflow: hidden;
          background: #0E0D0B;
        }

        .lifestyle-hero-img {
          width: 100%;
          height: 100%;
          min-height: 380px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .festive-lifestyle-monolith:hover .lifestyle-hero-img {
          transform: scale(1.03);
        }

        .lifestyle-ambient-shadow {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(18, 16, 14, 0.85) 100%);
        }

        .lifestyle-tag-plaque {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(18, 16, 14, 0.85);
          backdrop-filter: blur(12px);
          border-radius: 999px;
          border: 1px solid rgba(197, 160, 89, 0.3);
          font-size: 0.75rem;
          color: #FAF8F5;
        }

        .tag-sparkle {
          color: var(--gold-champagne);
        }

        .lifestyle-content-bar {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .lifestyle-bar-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: #FAF8F5;
          margin-bottom: 0.25rem;
        }

        .lifestyle-bar-desc {
          font-size: 0.82rem;
          color: var(--text-secondary-light);
        }

        .lifestyle-view-link {
          font-size: 0.82rem;
          color: var(--gold-champagne);
          font-weight: 600;
          white-space: nowrap;
          margin-left: 1rem;
        }

        /* Products Grid */
        .festive-products-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }

        @media (min-width: 600px) {
          .festive-products-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .festive-product-card {
          background: #181613;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        .festive-product-card:hover {
          transform: translateY(-2px);
          border-color: rgba(197, 160, 89, 0.35);
          background: #201D19;
        }

        .festive-card-visual {
          position: relative;
          background: #0E0D0B;
          border-radius: 12px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 150px;
        }

        .festive-card-img {
          max-height: 130px;
          object-fit: contain;
          filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.6));
          transition: transform 0.3s ease;
        }

        .festive-product-card:hover .festive-card-img {
          transform: scale(1.04);
        }

        .festive-card-glow {
          position: absolute;
          inset: 20%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(226, 188, 106, 0.15) 0%, transparent 70%);
          filter: blur(15px);
          pointer-events: none;
        }

        .festive-card-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .festive-card-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--gold-champagne);
          text-transform: uppercase;
        }

        .festive-card-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #FAF8F5;
          line-height: 1.3;
        }

        .festive-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          margin-top: 0.25rem;
        }

        .festive-explore-action {
          font-size: 0.74rem;
          color: var(--text-secondary-light);
        }

        .festive-wa-quick {
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--gold-champagne);
        }

        .festive-wa-quick:hover {
          color: #FAF8F5;
        }

        /* Footer Banner */
        .festive-footer-banner {
          background: rgba(24, 22, 19, 0.85);
          border: 1px solid rgba(197, 160, 89, 0.25);
          border-radius: 18px;
          padding: 1.5rem clamp(1.25rem, 3vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: flex-start;
        }

        @media (min-width: 800px) {
          .festive-footer-banner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .banner-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .banner-sparkle {
          color: var(--gold-champagne);
          font-size: 1.25rem;
        }

        .banner-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .banner-heading {
          font-size: 0.95rem;
          font-weight: 600;
          color: #FAF8F5;
        }

        .banner-sub {
          font-size: 0.8rem;
          color: var(--text-secondary-light);
        }

        .banner-cta-btn {
          display: inline-block;
          white-space: nowrap;
          background: rgba(197, 160, 89, 0.15);
          border: 1px solid rgba(197, 160, 89, 0.4);
          color: #FAF8F5;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          padding: 0.75rem 1.4rem;
          border-radius: 999px;
          transition: all 0.3s ease;
        }

        .banner-cta-btn:hover {
          background: var(--gold-champagne);
          color: #11100E;
        }

        @media (max-width: 768px) {
          .festive-nocturne-root {
            padding: 4.5rem 0 5rem;
          }

          .lifestyle-image-wrap {
            min-height: 260px;
          }

          .lifestyle-hero-img {
            min-height: 260px;
          }

          .lifestyle-content-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }

          .lifestyle-view-link {
            margin-left: 0;
          }
        }
      `}</style>
    </section>
  )
}
