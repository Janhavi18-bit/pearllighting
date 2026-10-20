import React, { useState } from 'react'
import EditorialNavbar from './EditorialNavbar'

export default function EditorialHeroAsymmetric({ onOpenEnquiry, onSelectProduct }) {
  const [carouselIndex, setCarouselIndex] = useState(0)

  // 3 Best-Seller luminaire items for Panel B
  const bestSellers = [
    [
      {
        id: 'curve-cob-duo',
        name: 'Curve COB Duo',
        series: 'Architectural Series',
        price: 'Studio Inquiry',
        image: '/images/products/curve-cob-duo.png',
        alt: 'Pearl Lighting Curve COB Duo luminaire',
      },
      {
        id: 'surface-cylinder',
        name: 'Surface Cylinder',
        series: 'Direct Downlight',
        price: 'Studio Inquiry',
        image: '/images/products/surface-panel-round-black.png',
        alt: 'Pearl Lighting Surface Panel Black Cylinder',
      },
      {
        id: 'moveable-gimbal',
        name: 'Moveable Gimbal',
        series: 'Dual-Axis Articulation',
        price: 'Studio Inquiry',
        image: '/images/products/moveable-cob-duo.png',
        alt: 'Pearl Lighting Moveable Gimbal COB',
      },
    ],
    [
      {
        id: 'deep-downlight-duo',
        name: 'Deep Downlight Duo',
        series: 'Round & Square',
        price: 'Studio Inquiry',
        image: '/images/products/deep-downlight-duo.png',
        alt: 'Pearl Lighting Deep Downlight Duo',
      },
      {
        id: 'slim-panel-round',
        name: 'Slim Panel Disc',
        series: 'Ambient Flush',
        price: 'Studio Inquiry',
        image: '/images/products/slim-panel-round.png',
        alt: 'Pearl Lighting Slim Panel Round Disc',
      },
      {
        id: 'rope-light-warm',
        name: 'Continuous Rope',
        series: '360° Silicone Ribbon',
        price: 'Studio Inquiry',
        image: '/images/products/rope-light-primary-warm.png',
        alt: 'Pearl Lighting Continuous Rope Light',
      },
    ],
  ]

  const handleNextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % bestSellers.length)
  }

  const handlePrevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + bestSellers.length) % bestSellers.length)
  }

  const handleExploreScroll = (e) => {
    e.preventDefault()
    const target = document.querySelector('#collections-mosaic')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="asymmetric-opening-stage" id="hero-opening" aria-label="Pearl Lighting Opening">
      <div className="asymmetric-grid-layout">
        {/* ── PANEL A: LARGE LIGHT EDITORIAL PANEL (LEFT & CENTER) ── */}
        <div className="panel-a-editorial">
          {/* Minimal Navigation Bar inside Panel A */}
          <EditorialNavbar onOpenEnquiry={onOpenEnquiry} />

          <div className="panel-a-body">
            {/* Left Vertical Datum Number (01/09) */}
            <div className="vertical-datum-rail" aria-hidden="true">
              <span>01/09</span>
            </div>

            <div className="panel-a-inner-content">
              {/* Top Text & Brand Manifesto */}
              <div className="panel-a-header-row">
                <div className="panel-a-intro-copy">
                  <p className="intro-text">
                    Luminaires engineered in our Mumbai atelier to shape architectural depth and quiet spatial atmosphere. Pure materials, high visual comfort, and glare-free precision.
                  </p>
                  <a
                    href="#collections-mosaic"
                    className="editorial-shop-link"
                    onClick={handleExploreScroll}
                  >
                    <span>Shop Now</span>
                    <span className="link-arrow">→</span>
                  </a>
                </div>

                {/* Giant Serif Headline with Orange Highlight Block */}
                <div className="headline-wrapper">
                  <h1 className="editorial-main-title">
                    <span className="title-row-one">
                      <span className="highlight-text-box">Light</span> Your
                    </span>
                    <span className="title-row-two">
                      Space
                      {/* Integrated Architectural Lamp Silhouette Graphic */}
                      <svg className="inline-lamp-silhouette" viewBox="0 0 40 80" fill="currentColor">
                        <line x1="20" y1="0" x2="20" y2="45" stroke="currentColor" strokeWidth="2.5" />
                        <path d="M12 45 L28 45 L32 75 L8 75 Z" />
                        <ellipse cx="20" cy="75" rx="12" ry="2.5" />
                      </svg>
                    </span>
                  </h1>
                </div>
              </div>

              {/* Two Large Lighting Photographs Side-By-Side (Reference composition) */}
              <div className="panel-a-duo-images-strip">
                <div className="duo-photo-frame frame-left">
                  <img
                    src="/images/products/deep-downlight-round-black-studio.png"
                    alt="Pearl Lighting Deep Downlight Round Studio Luminaire"
                    className="duo-img"
                  />
                  <div className="photo-label-overlay">
                    <span className="photo-num">01</span>
                    <span className="photo-title">Deep Downlight • Studio Obsidian</span>
                  </div>
                </div>

                <div className="duo-photo-frame frame-right">
                  <img
                    src="/images/products/curve-cob-rose-gold.png"
                    alt="Pearl Lighting Curve COB Rose Gold Architectural Luminaire"
                    className="duo-img"
                  />
                  <div className="photo-label-overlay">
                    <span className="photo-num">02</span>
                    <span className="photo-title">Curve COB • Rose Gold Anodized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: OVERLAPPING BEST SELLERS & ATELIER DARK CARD ── */}
        <div className="panel-b-right-column">
          {/* Panel B1: "Best Sellers" / Featured Lighting Card */}
          <div className="bestsellers-card" id="featured-section">
            <div className="bestsellers-header">
              <h2 className="bestsellers-title">Best Sellers</h2>
              <div className="bestsellers-arrows">
                <button
                  type="button"
                  className="arrow-nav-btn"
                  onClick={handlePrevSlide}
                  aria-label="Previous best sellers"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="arrow-nav-btn"
                  onClick={handleNextSlide}
                  aria-label="Next best sellers"
                >
                  →
                </button>
              </div>
            </div>

            {/* 3 Product Columns Side by Side */}
            <div className="bestsellers-products-grid">
              {bestSellers[carouselIndex].map((item) => (
                <div
                  key={item.id}
                  className="bestseller-item"
                  onClick={() => onSelectProduct && onSelectProduct(item)}
                >
                  <div className="bestseller-thumb-wrap">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="bestseller-thumb-img"
                    />
                  </div>
                  <h3 className="bestseller-item-name">{item.name}</h3>
                  <span className="bestseller-item-series">{item.series}</span>
                  <button
                    type="button"
                    className="bestseller-inquire-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(
                        `https://wa.me/918329045712?text=${encodeURIComponent(`Hi Pearl Lighting! I am inquiring about the ${item.name} (${item.series}).`)}`,
                        '_blank'
                      )
                    }}
                  >
                    Enquire ↗
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination Dash/Dots */}
            <div className="bestsellers-dots-indicator">
              <span className={`dot-bar ${carouselIndex === 0 ? 'bar-active' : ''}`}></span>
              <span className={`dot-bar ${carouselIndex === 1 ? 'bar-active' : ''}`}></span>
            </div>
          </div>

          {/* Panel B2: Dark Atelier Highlight Card ("Let's Shop Now") */}
          <div className="dark-atelier-highlight-card">
            <div className="dark-card-copy">
              <h3 className="dark-card-title">Let's Light Your Space</h3>
              <p className="dark-card-desc">
                Custom driver tuning, recessed ceiling coordination, and private atelier walk-throughs in Mumbai.
              </p>
              <a
                href="#atelier-finale"
                className="dark-card-action-link"
              >
                <span>Shop Now</span>
                <span className="arrow-sym">→</span>
              </a>
            </div>

            <div className="dark-card-visual">
              <img
                src="/images/products/ceiling-fan-light-501-bk.png"
                alt="Pearl Lighting Atelier Architectural Luminaire"
                className="dark-card-luminaire-img"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .asymmetric-opening-stage {
          position: relative;
          width: 100%;
          background: #D85623; /* Vivid Terracotta / Warm Amber Canvas from reference */
          padding: 24px 28px 0;
          box-sizing: border-box;
        }

        .asymmetric-grid-layout {
          max-width: 1560px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.55fr 0.95fr;
          gap: 24px;
          align-items: stretch;
        }

        /* ── PANEL A: Ivory Monolith ── */
        .panel-a-editorial {
          background: #FFFFFF;
          border-radius: 20px 20px 0 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .panel-a-body {
          display: flex;
          position: relative;
          flex: 1;
          padding: 10px 44px 44px 0;
        }

        /* Vertical Datum 01/09 */
        .vertical-datum-rail {
          width: 60px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 24px;
        }

        .vertical-datum-rail span {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          letter-spacing: 0.18em;
          color: #181716;
          font-weight: 600;
        }

        .panel-a-inner-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        /* Header Row: Left Intro Copy + Right Huge Serif Title */
        .panel-a-header-row {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 32px;
          align-items: flex-start;
          padding-top: 10px;
        }

        .panel-a-intro-copy {
          max-width: 320px;
        }

        .intro-text {
          font-size: 13px;
          line-height: 1.65;
          color: #555047;
          margin-bottom: 24px;
          font-weight: 400;
        }

        .editorial-shop-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 700;
          color: #D65A27;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: gap 0.2s ease;
        }

        .editorial-shop-link:hover {
          gap: 12px;
        }

        /* Headline: Light Your Space */
        .headline-wrapper {
          display: flex;
          justify-content: flex-end;
        }

        .editorial-main-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(48px, 5.5vw, 84px);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: -0.02em;
          color: #161514;
          text-align: right;
        }

        .title-row-one {
          display: block;
          white-space: nowrap;
        }

        /* Orange Highlight Box behind "Light" */
        .highlight-text-box {
          display: inline-block;
          background: #D85623;
          color: #FFFFFF;
          padding: 2px 14px 6px;
          margin-right: 8px;
          box-shadow: 0 4px 14px rgba(216, 86, 35, 0.35);
        }

        .title-row-two {
          display: inline-flex;
          align-items: baseline;
          gap: 12px;
        }

        .inline-lamp-silhouette {
          width: 36px;
          height: 54px;
          color: #181716;
          vertical-align: middle;
          margin-left: 6px;
          transform: translateY(4px);
        }

        /* Two Large Side-by-Side Photographs */
        .panel-a-duo-images-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: auto;
        }

        .duo-photo-frame {
          position: relative;
          background: #F4EFE6;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
          transition: transform 0.35s ease;
        }

        .duo-photo-frame:hover {
          transform: translateY(-4px);
        }

        .duo-img {
          width: 85%;
          height: 85%;
          object-fit: contain;
          filter: drop-shadow(0 16px 28px rgba(0, 0, 0, 0.35));
          transition: transform 0.4s ease;
        }

        .duo-photo-frame:hover .duo-img {
          transform: scale(1.05);
        }

        .photo-label-overlay {
          position: absolute;
          bottom: 14px;
          left: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #181716;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          padding: 5px 12px;
          border-radius: 999px;
          width: fit-content;
        }

        .photo-num {
          font-weight: 700;
          color: #D65A27;
        }

        /* ── PANEL B: RIGHT COLUMN ── */
        .panel-b-right-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Best Sellers Card (Panel B1) */
        .bestsellers-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 28px 32px 24px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
        }

        .bestsellers-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .bestsellers-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 26px;
          font-weight: 400;
          color: #161514;
        }

        .bestsellers-arrows {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .arrow-nav-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(24, 23, 22, 0.15);
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #181716;
          transition: all 0.2s ease;
        }

        .arrow-nav-btn:hover {
          background: #D85623;
          color: #FFFFFF;
          border-color: #D85623;
        }

        .bestsellers-products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .bestseller-item {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: transform 0.25s ease;
        }

        .bestseller-item:hover {
          transform: translateY(-3px);
        }

        .bestseller-thumb-wrap {
          background: #F8F5EE;
          border-radius: 12px;
          aspect-ratio: 3 / 4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          margin-bottom: 12px;
        }

        .bestseller-thumb-img {
          width: 90%;
          height: 90%;
          object-fit: contain;
          filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.2));
        }

        .bestseller-item-name {
          font-family: var(--font-sans, sans-serif);
          font-size: 12px;
          font-weight: 600;
          color: #181716;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .bestseller-item-series {
          font-size: 10px;
          color: #8C8373;
          margin-bottom: 6px;
        }

        .bestseller-inquire-btn {
          background: none;
          border: none;
          font-size: 11px;
          font-weight: 600;
          color: #D85623;
          cursor: pointer;
          padding: 0;
          text-align: left;
        }

        .bestsellers-dots-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
        }

        .dot-bar {
          width: 18px;
          height: 3px;
          border-radius: 3px;
          background: rgba(24, 23, 22, 0.15);
          transition: all 0.25s ease;
        }

        .dot-bar.bar-active {
          width: 32px;
          background: #D85623;
        }

        /* Panel B2: Dark Atelier Card */
        .dark-atelier-highlight-card {
          background: #161514;
          color: #FAF7F2;
          border-radius: 20px;
          padding: 28px 32px;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 20px;
          align-items: center;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
          flex: 1;
        }

        .dark-card-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 22px;
          font-weight: 400;
          color: #FAF7F2;
          margin-bottom: 10px;
        }

        .dark-card-desc {
          font-size: 12px;
          line-height: 1.6;
          color: rgba(250, 247, 242, 0.7);
          margin-bottom: 18px;
          font-weight: 300;
        }

        .dark-card-action-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          font-weight: 600;
          color: #D85623;
          text-decoration: none;
          transition: gap 0.2s ease;
        }

        .dark-card-action-link:hover {
          gap: 12px;
        }

        .dark-card-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .dark-card-luminaire-img {
          max-height: 140px;
          max-width: 100%;
          object-fit: contain;
          filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.8));
          transition: transform 0.3s ease;
        }

        .dark-atelier-highlight-card:hover .dark-card-luminaire-img {
          transform: scale(1.06);
        }

        @media (max-width: 1100px) {
          .asymmetric-grid-layout {
            grid-template-columns: 1fr;
          }
          .panel-a-header-row {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .editorial-main-title {
            text-align: left;
          }
          .headline-wrapper {
            justify-content: flex-start;
          }
        }

        @media (max-width: 768px) {
          .asymmetric-opening-stage {
            padding: 12px 12px 0;
          }
          .panel-a-body {
            padding: 10px 16px 24px 0;
          }
          .vertical-datum-rail {
            width: 36px;
          }
          .panel-a-duo-images-strip {
            grid-template-columns: 1fr;
          }
          .bestsellers-products-grid {
            grid-template-columns: 1fr;
          }
          .dark-atelier-highlight-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
