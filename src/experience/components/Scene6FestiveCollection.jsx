import React, { useState } from 'react'

export default function Scene6FestiveCollection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxPiece, setLightboxPiece] = useState(null)

  const festiveShowcases = [
    {
      id: 'festive-bokeh-ambient',
      title: 'Golden Bokeh Lifestyle Ambiance',
      subtitle: 'Diffuse warm amber radiance transforming private residences and celebratory banquet halls.',
      category: 'ambiance',
      image: '/images/diwali/diwali-golden-bokeh-lifestyle.png',
      alt: 'Pearl Lighting Festive Golden Bokeh Mood Luminaire',
      layoutSpan: 'span-8',
      specs: '2400K Ultra-Warm • Ambient Bokeh Glow • Pan-India Courier',
      waMessage: 'Hi Pearl Lighting! I would like to order the Golden Bokeh Festive Lighting setup.',
    },
    {
      id: 'festive-star-curtain-lights',
      title: 'Cascading Star Curtain Lights',
      subtitle: 'Cascading warm star silhouettes with alternating drops for glass facades and grand balconies.',
      category: 'curtains',
      image: '/images/diwali/diwali-hanging-star-curtain.png',
      alt: 'Pearl Lighting Hanging Star Curtain Lights',
      layoutSpan: 'span-4',
      specs: '12 Star Drops • Warm Gold LEDs • 8 Flashing Modes',
      waMessage: 'Hi Pearl Lighting! I would like to order the Hanging Star Curtain Lights.',
    },
    {
      id: 'festive-diya-curtain-lights',
      title: 'Golden Diya Silhouette Cascade',
      subtitle: 'Traditional diya profiles rendered in warm gold LEDs for entrance gates and mandirs.',
      category: 'curtains',
      image: '/images/diwali/diwali-hanging-diya-curtain.png',
      alt: 'Pearl Lighting Hanging Diya Curtain Lights',
      layoutSpan: 'span-4',
      specs: 'Cascading Diya Motifs • Pure Gold Luminescence • Connectable Ends',
      waMessage: 'Hi Pearl Lighting! I would like to order the Hanging Diya Curtain Lights.',
    },
    {
      id: 'festive-crystal-bubble-lights',
      title: 'Crystal Bubble Glass Spheres',
      subtitle: 'Refractive acrylic crystal globes scattering jewel-like sparkles across tablescapes and decor.',
      category: 'crystals',
      image: '/images/diwali/diwali-crystal-bubble-lights.png',
      alt: 'Pearl Lighting Crystal Bubble String Lights',
      layoutSpan: 'span-4',
      specs: 'Solid Crystal Spheres • Micro-Bubble Refraction • Heavy-Gauge Wire',
      waMessage: 'Hi Pearl Lighting! I would like to order the Crystal Bubble String Lights.',
    },
    {
      id: 'festive-diya-garland-multicolour',
      title: 'Jewel-Tone Diya Garland',
      subtitle: 'Vibrant celebratory hues for temple backdrops, floral rangolis, and festive gathering walls.',
      category: 'crystals',
      image: '/images/diwali/diwali-multicolour-diya-garland.png',
      alt: 'Pearl Lighting Multi-Colour Diya Garland Lights',
      layoutSpan: 'span-4',
      specs: 'Emerald, Ruby & Sapphire Hues • Lightweight Hanging • Low Power',
      waMessage: 'Hi Pearl Lighting! I would like to order the Multi-Colour Diya Garland Lights.',
    },
    {
      id: 'festive-spool-sets-bundle',
      title: 'Multi-Spool Festival Ribbon Sets',
      subtitle: 'High-density festive reels for expansive courtyard trees, terrace railings, and facade wraps.',
      category: 'sets',
      image: '/images/diwali/diwali-multicolour-spool-sets.png',
      alt: 'Pearl Lighting Multi-Spool Celebration Sets',
      layoutSpan: 'span-8',
      specs: 'Multiple Spool Bundle • All-Weather Coating • Commercial Grade',
      waMessage: 'Hi Pearl Lighting! I would like to order the Multi-Spool Festival Ribbon Sets.',
    },
  ]

  const filtered =
    activeFilter === 'all'
      ? festiveShowcases
      : festiveShowcases.filter((item) => item.category === activeFilter)

  const handleWhatsApp = (piece) => {
    window.open(
      `https://wa.me/918329045712?text=${encodeURIComponent(piece.waMessage)}`,
      '_blank'
    )
  }

  return (
    <section className="scene6-festive-root" id="scene-festive" aria-label="Scene 6 — Festive Collection">
      {/* Dramatic Atmosphere Portal */}
      <div className="festive-portal-wrap">
        <div className="festive-portal-bloom" aria-hidden="true"></div>
        <div className="festive-portal-inner">
          <div className="festive-kicker-strip">
            <span className="sparkle-gold">✦</span>
            <span>A DIFFERENT VISUAL RHYTHM</span>
            <span className="sparkle-gold">✦</span>
          </div>
          <h2 className="festive-portal-headline">The Celestial Salon.</h2>
          <p className="festive-portal-sub">
            A departure into celebratory night. Handcrafted star cascades, golden diya silhouettes, and ambient crystal luster for India’s grandest celebrations.
          </p>
        </div>
      </div>

      {/* Gallery Filter & Direct Batch Dispatch Info */}
      <div className="festive-gallery-wrap">
        <div className="festive-filter-strip">
          <div className="festive-pills-row">
            <button
              type="button"
              className={`festive-pill-btn ${activeFilter === 'all' ? 'pill-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Celebratory Collections
            </button>
            <button
              type="button"
              className={`festive-pill-btn ${activeFilter === 'curtains' ? 'pill-active' : ''}`}
              onClick={() => setActiveFilter('curtains')}
            >
              Star & Diya Curtains
            </button>
            <button
              type="button"
              className={`festive-pill-btn ${activeFilter === 'crystals' ? 'pill-active' : ''}`}
              onClick={() => setActiveFilter('crystals')}
            >
              Crystal Bubbles & Garlands
            </button>
            <button
              type="button"
              className={`festive-pill-btn ${activeFilter === 'sets' ? 'pill-active' : ''}`}
              onClick={() => setActiveFilter('sets')}
            >
              Multi-Spool Sets
            </button>
          </div>

          <span className="festive-atelier-dispatch-note">
            Direct Dispatch from Kalbadevi Atelier • Pan-India Courier Available
          </span>
        </div>

        {/* Asymmetric Large-Scale Festive Showcase Grid */}
        <div className="festive-masonry-grid">
          {filtered.map((piece) => (
            <article
              key={piece.id}
              className={`festive-card ${piece.layoutSpan}`}
              onClick={() => setLightboxPiece(piece)}
            >
              <div className="festive-media-container">
                <img
                  src={piece.image}
                  alt={piece.alt}
                  className="festive-display-image"
                  loading="lazy"
                />
                <div className="festive-media-ambient-overlay"></div>
              </div>

              <div className="festive-card-details">
                <span className="festive-badge">✦ FESTIVE CELEBRATION</span>
                <h3 className="festive-piece-title">{piece.title}</h3>
                <p className="festive-piece-desc">{piece.subtitle}</p>
                <span className="festive-specs-note">{piece.specs}</span>

                <div className="festive-card-action-bar">
                  <button
                    type="button"
                    className="festive-wa-order-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleWhatsApp(piece)
                    }}
                  >
                    <span>Enquire & Order on WhatsApp</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17l9.2-9.2M17 17V8h-9"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="festive-zoom-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxPiece(piece)
                    }}
                    title="Enlarge photograph"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Dialog */}
      {lightboxPiece && (
        <div className="festive-lightbox-backdrop" onClick={() => setLightboxPiece(null)}>
          <div className="festive-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightboxPiece(null)}
              aria-label="Close enlarged preview"
            >
              ✕
            </button>
            <div className="lightbox-img-box">
              <img
                src={lightboxPiece.image}
                alt={lightboxPiece.alt}
                className="lightbox-preview-img"
              />
            </div>
            <div className="lightbox-info-box">
              <h3>{lightboxPiece.title}</h3>
              <p>{lightboxPiece.subtitle}</p>
              <span className="lightbox-specs-text">{lightboxPiece.specs}</span>
              <button
                type="button"
                className="lightbox-wa-cta-btn"
                onClick={() => handleWhatsApp(lightboxPiece)}
              >
                Order on WhatsApp (+91 83290 45712) ↗
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scene6-festive-root {
          background-color: #07060A;
          color: #FAF7F2;
          padding-bottom: 120px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Portal Transition */
        .festive-portal-wrap {
          position: relative;
          padding: 130px 40px 90px;
          text-align: center;
          background: radial-gradient(circle at 50% 30%, #1a140d 0%, #090708 60%, #07060A 100%);
        }

        .festive-portal-bloom {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 350px;
          background: radial-gradient(ellipse, rgba(223, 192, 122, 0.22) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        .festive-portal-inner {
          position: relative;
          z-index: 2;
          max-width: 820px;
          margin: 0 auto;
        }

        .festive-kicker-strip {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.24em;
          color: #DFC07A;
          margin-bottom: 18px;
        }

        .sparkle-gold {
          font-size: 10px;
        }

        .festive-portal-headline {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(38px, 4.8vw, 64px);
          font-weight: 400;
          color: #FAF7F2;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          text-shadow: 0 4px 30px rgba(223, 192, 122, 0.35);
        }

        .festive-portal-sub {
          font-size: clamp(16px, 1.3vw, 18px);
          line-height: 1.65;
          color: rgba(250, 247, 242, 0.75);
          font-weight: 300;
          max-width: 660px;
          margin: 0 auto;
        }

        /* Gallery Container */
        .festive-gallery-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .festive-filter-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 50px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .festive-pills-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .festive-pill-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(250, 247, 242, 0.7);
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .festive-pill-btn:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
        }

        .festive-pill-btn.pill-active {
          background: #DFC07A;
          color: #07060A;
          font-weight: 600;
          border-color: #DFC07A;
        }

        .festive-atelier-dispatch-note {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #B89242;
          letter-spacing: 0.08em;
        }

        /* Grid */
        .festive-masonry-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 32px;
        }

        .span-8 {
          grid-column: span 8;
        }

        .span-4 {
          grid-column: span 4;
        }

        .festive-card {
          position: relative;
          border-radius: 26px;
          overflow: hidden;
          background: #0E0D12;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .festive-card:hover {
          transform: translateY(-5px);
          border-color: rgba(223, 192, 122, 0.4);
        }

        .festive-media-container {
          position: relative;
          width: 100%;
          min-height: 380px;
          background: #030204;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .festive-display-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .festive-card:hover .festive-display-image {
          transform: scale(1.05);
        }

        .festive-media-ambient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(7, 6, 10, 0.9) 100%);
          pointer-events: none;
        }

        .festive-card-details {
          padding: 28px;
          background: #0E0D12;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .festive-badge {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: #DFC07A;
        }

        .festive-piece-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 22px;
          font-weight: 500;
          color: #FFFFFF;
        }

        .festive-piece-desc {
          font-size: 14px;
          color: rgba(250, 247, 242, 0.68);
          line-height: 1.55;
          font-weight: 300;
        }

        .festive-specs-note {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: rgba(223, 192, 122, 0.85);
          margin-top: 4px;
        }

        .festive-card-action-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
        }

        .festive-wa-order-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #171717;
          color: #FAF7F2;
          border: 1px solid rgba(198, 154, 82, 0.45);
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .festive-wa-order-btn:hover {
          background: #C69A52;
          color: #12100E;
          border-color: #C69A52;
        }

        .festive-wa-order-btn:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        .festive-zoom-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #FAF7F2;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .festive-zoom-icon-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* Lightbox */
        .festive-lightbox-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(0, 0, 0, 0.92);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
        }

        .festive-lightbox-content {
          position: relative;
          background: #0E0F14;
          border-radius: 28px;
          max-width: 960px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
        }

        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FAF7F2;
          font-size: 16px;
          cursor: pointer;
          z-index: 10;
        }

        .lightbox-img-box {
          max-height: 60vh;
          overflow: hidden;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-preview-img {
          width: 100%;
          height: 100%;
          max-height: 60vh;
          object-fit: contain;
        }

        .lightbox-info-box {
          padding: 30px 36px;
        }

        .lightbox-info-box h3 {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 26px;
          color: #FAF7F2;
          margin-bottom: 8px;
        }

        .lightbox-info-box p {
          color: rgba(250, 247, 242, 0.7);
          margin-bottom: 12px;
          font-size: 15px;
        }

        .lightbox-specs-text {
          display: block;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          color: #DFC07A;
          margin-bottom: 20px;
        }

        .lightbox-wa-cta-btn {
          display: inline-block;
          background: #171717;
          color: #FAF7F2;
          border: 1px solid rgba(198, 154, 82, 0.45);
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .lightbox-wa-cta-btn:hover {
          background: #C69A52;
          color: #12100E;
          border-color: #C69A52;
        }

        .lightbox-wa-cta-btn:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        @media (max-width: 992px) {
          .festive-masonry-grid {
            grid-template-columns: 1fr;
          }
          .span-8, .span-4 {
            grid-column: span 1;
          }
        }

        @media (max-width: 600px) {
          .festive-portal-wrap {
            padding: 90px 20px 60px;
          }
          .festive-gallery-wrap {
            padding: 0 18px;
          }
          .festive-media-container {
            min-height: 280px;
          }
          .festive-card-action-bar {
            flex-direction: column;
          }
          .festive-wa-order-btn {
            width: 100%;
          }
          .festive-zoom-icon-btn {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
