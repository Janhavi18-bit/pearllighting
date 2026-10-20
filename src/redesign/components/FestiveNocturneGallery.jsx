import React, { useState } from 'react'

export default function FestiveNocturneGallery({ onOpenEnquiry }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const festivePieces = [
    {
      id: 'festive-golden-bokeh',
      title: 'Golden Bokeh Living Ambiance',
      subtitle: 'Warm atmospheric background luster for festive halls, balconies, and celebration corners.',
      category: 'ambiance',
      image: '/images/diwali/diwali-golden-bokeh-lifestyle.png',
      alt: 'Pearl Lighting Festive Golden Bokeh Mood Luminaire',
      scale: 'monumental',
      specs: '2400K Ultra-Warm • Diffuse Amber Glow • Pan-India Courier',
      whatsappText: 'Hi Pearl Lighting! I would like to order the Golden Bokeh Festive Lighting setup.',
    },
    {
      id: 'festive-star-curtain',
      title: 'Hanging Star Curtain Cascade',
      subtitle: 'Cascading warm star silhouettes with alternating drop heights for glass facades and grand windows.',
      category: 'curtains',
      image: '/images/diwali/diwali-hanging-star-curtain.png',
      alt: 'Pearl Lighting Hanging Star Curtain Lights',
      scale: 'large',
      specs: '12 Star Drops • Warm Gold LEDs • 8 Flashing Modes',
      whatsappText: 'Hi Pearl Lighting! I would like to order the Hanging Star Curtain Lights.',
    },
    {
      id: 'festive-diya-curtain',
      title: 'Golden Diya Silhouette Curtain',
      subtitle: 'Traditional brass diya profile rendered in warm golden LEDs for entrance portals and puja rooms.',
      category: 'curtains',
      image: '/images/diwali/diwali-hanging-diya-curtain.png',
      alt: 'Pearl Lighting Hanging Diya Curtain Lights',
      scale: 'large',
      specs: 'Cascading Diya Motifs • Pure Gold Luminescence • Connectable Ends',
      whatsappText: 'Hi Pearl Lighting! I would like to order the Hanging Diya Curtain Lights.',
    },
    {
      id: 'festive-crystal-bubble',
      title: 'Crystal Bubble Glass Strings',
      subtitle: 'Refractive acrylic bubble globes scattering jewel-like sparkles across dining tables and decor.',
      category: 'crystals',
      image: '/images/diwali/diwali-crystal-bubble-lights.png',
      alt: 'Pearl Lighting Crystal Bubble String Lights',
      scale: 'medium',
      specs: 'Solid Crystal Spheres • Micro-Bubble Refraction • Heavy-Gauge Wire',
      whatsappText: 'Hi Pearl Lighting! I would like to order the Crystal Bubble String Lights.',
    },
    {
      id: 'festive-diya-garland',
      title: 'Multi-Colour Jewel Diya Garland',
      subtitle: 'Vibrant celebratory hues for mandirs, floral backdrops, and auspicious festival gatherings.',
      category: 'garlands',
      image: '/images/diwali/diwali-multicolour-diya-garland.png',
      alt: 'Pearl Lighting Multi-Colour Diya Garland Lights',
      scale: 'medium',
      specs: 'Emerald, Ruby & Sapphire Hues • Lightweight Hanging • Low Power',
      whatsappText: 'Hi Pearl Lighting! I would like to order the Multi-Colour Diya Garland Lights.',
    },
    {
      id: 'festive-spool-sets',
      title: 'Multi-Spool Festival Ribbon Sets',
      subtitle: 'High-density celebration reels for expansive courtyard trees, terrace railings, and facade wraps.',
      category: 'crystals',
      image: '/images/diwali/diwali-multicolour-spool-sets.png',
      alt: 'Pearl Lighting Multi-Spool Celebration Sets',
      scale: 'large',
      specs: 'Multiple Spool Bundle • All-Weather Coating • Commercial Grade',
      whatsappText: 'Hi Pearl Lighting! I would like to order the Multi-Spool Festival Ribbon Sets.',
    },
  ]

  const filteredPieces =
    activeFilter === 'all'
      ? festivePieces
      : festivePieces.filter((p) => p.category === activeFilter)

  const handleWhatsApp = (piece) => {
    window.open(
      `https://wa.me/918329045712?text=${encodeURIComponent(piece.whatsappText)}`,
      '_blank'
    )
  }

  return (
    <section className="festive-nocturne-section" id="festive-nocturne" aria-label="Festive Lighting Collection">
      {/* ── DRAMATIC TRANSITION PORTAL ── */}
      <div className="festive-transition-portal">
        <div className="portal-atmosphere-glow"></div>
        <div className="portal-content">
          <div className="portal-kicker">
            <span className="portal-spark">✦</span>
            <span>ATMOSPHERIC TRANSITION</span>
            <span className="portal-spark">✦</span>
          </div>
          <h2 className="portal-title">The Celestial Salon</h2>
          <p className="portal-sub">
            A departure into night. Celebratory cascades, hand-curated star curtains, and sacred festive luster for India’s grandest evenings.
          </p>
        </div>
      </div>

      {/* ── FILTER & CURATION CONTROLS ── */}
      <div className="festive-gallery-container">
        <div className="festive-filter-bar">
          <div className="filter-pills-list">
            <button
              type="button"
              className={`festive-filter-btn ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Festive Collections
            </button>
            <button
              type="button"
              className={`festive-filter-btn ${activeFilter === 'curtains' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('curtains')}
            >
              Star & Diya Curtains
            </button>
            <button
              type="button"
              className={`festive-filter-btn ${activeFilter === 'crystals' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('crystals')}
            >
              Crystal Bubbles & Spools
            </button>
            <button
              type="button"
              className={`festive-filter-btn ${activeFilter === 'ambiance' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('ambiance')}
            >
              Atmospheric Bokeh
            </button>
          </div>

          <div className="festive-batch-note">
            <span>Direct Dispatch from Mumbai Atelier • Pan-India Shipping</span>
          </div>
        </div>

        {/* ── LARGE SCALE ASYMMETRIC FESTIVE PHOTOGRAPHY MASONRY ── */}
        <div className="festive-monumental-grid">
          {filteredPieces.map((piece) => (
            <article
              key={piece.id}
              className={`festive-photo-card card-scale-${piece.scale}`}
              onClick={() => setSelectedPhoto(piece)}
            >
              <div className="photo-media-box">
                <img
                  src={piece.image}
                  alt={piece.alt}
                  className="festive-full-image"
                  loading="lazy"
                />
                <div className="festive-ambient-shimmer"></div>
              </div>

              {/* Informative Floating Card Overlay */}
              <div className="photo-card-info">
                <div className="photo-badge">
                  <span>✦ CELEBRATION EDITION</span>
                </div>
                <h3 className="photo-title">{piece.title}</h3>
                <p className="photo-sub">{piece.subtitle}</p>
                <div className="photo-specs-line">{piece.specs}</div>

                <div className="photo-action-row">
                  <button
                    type="button"
                    className="festive-order-wa-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleWhatsApp(piece)
                    }}
                  >
                    <span>Enquire & Order via WhatsApp</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17l9.2-9.2M17 17V8h-9"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="festive-zoom-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPhoto(piece)
                    }}
                    title="Enlarge photograph"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── FULL-SCREEN LIGHTBOX MODAL ── */}
      {selectedPhoto && (
        <div className="festive-lightbox-backdrop" onClick={() => setSelectedPhoto(null)}>
          <div className="festive-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close enlarged preview"
            >
              ✕
            </button>
            <div className="lightbox-image-wrap">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.alt}
                className="lightbox-img"
              />
            </div>
            <div className="lightbox-meta">
              <h3>{selectedPhoto.title}</h3>
              <p>{selectedPhoto.subtitle}</p>
              <span className="lightbox-specs">{selectedPhoto.specs}</span>
              <button
                type="button"
                className="lightbox-wa-btn"
                onClick={() => handleWhatsApp(selectedPhoto)}
              >
                Order this piece on WhatsApp (+91 83290 45712) ↗
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .festive-nocturne-section {
          background: #040508;
          color: #FAF7F2;
          padding-bottom: 120px;
          position: relative;
          overflow: hidden;
        }

        /* ── Dramatic Atmospheric Portal ── */
        .festive-transition-portal {
          position: relative;
          padding: 130px 40px 90px;
          text-align: center;
          background: radial-gradient(circle at 50% 30%, #17120a 0%, #080605 60%, #040508 100%);
          border-top: 1px solid rgba(223, 192, 122, 0.15);
        }

        .portal-atmosphere-glow {
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

        .portal-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
          margin: 0 auto;
        }

        .portal-kicker {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.24em;
          color: #DFC07A;
          margin-bottom: 18px;
        }

        .portal-spark {
          font-size: 10px;
        }

        .portal-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(38px, 4.6vw, 64px);
          font-weight: 400;
          color: #FAF7F2;
          line-height: 1.15;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          text-shadow: 0 4px 30px rgba(223, 192, 122, 0.3);
        }

        .portal-sub {
          font-size: clamp(16px, 1.3vw, 18px);
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 300;
          max-width: 660px;
          margin: 0 auto;
        }

        /* ── Gallery Container ── */
        .festive-gallery-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .festive-filter-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 50px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .filter-pills-list {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .festive-filter-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
          padding: 8px 18px;
          border-radius: 999px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .festive-filter-btn:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.08);
        }

        .festive-filter-btn.is-active {
          background: #DFC07A;
          color: #040508;
          font-weight: 600;
          border-color: #DFC07A;
        }

        .festive-batch-note {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #B89242;
          letter-spacing: 0.08em;
        }

        /* ── Asymmetric Masonry Grid ── */
        .festive-monumental-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 32px;
        }

        .card-scale-monumental {
          grid-column: span 8;
        }

        .card-scale-large {
          grid-column: span 4;
        }

        .card-scale-medium {
          grid-column: span 6;
        }

        .festive-photo-card {
          position: relative;
          border-radius: 26px;
          overflow: hidden;
          background: #090A0E;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
          display: flex;
          flex-direction: column;
        }

        .festive-photo-card:hover {
          transform: translateY(-5px);
          border-color: rgba(223, 192, 122, 0.4);
        }

        .photo-media-box {
          position: relative;
          width: 100%;
          min-height: 380px;
          background: #020305;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .festive-full-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .festive-photo-card:hover .festive-full-image {
          transform: scale(1.05);
        }

        .festive-ambient-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(4, 5, 8, 0.88) 100%);
          pointer-events: none;
        }

        .photo-card-info {
          padding: 28px;
          background: #090A0E;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }

        .photo-badge {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: #DFC07A;
        }

        .photo-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 22px;
          font-weight: 500;
          color: #FFFFFF;
        }

        .photo-sub {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.55;
          font-weight: 300;
        }

        .photo-specs-line {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: rgba(223, 192, 122, 0.85);
          margin-top: 4px;
        }

        .photo-action-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 12px;
        }

        .festive-order-wa-btn {
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

        .festive-order-wa-btn:hover {
          background: #C69A52;
          color: #12100E;
          border-color: #C69A52;
        }

        .festive-order-wa-btn:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        .festive-zoom-btn {
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

        .festive-zoom-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        /* ── Lightbox Modal ── */
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

        .festive-lightbox-dialog {
          position: relative;
          background: #0E0F14;
          border-radius: 28px;
          max-width: 960px;
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.8);
        }

        .lightbox-close-btn {
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

        .lightbox-image-wrap {
          max-height: 60vh;
          overflow: hidden;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-img {
          width: 100%;
          height: 100%;
          max-height: 60vh;
          object-fit: contain;
        }

        .lightbox-meta {
          padding: 30px 36px;
        }

        .lightbox-meta h3 {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 26px;
          color: #FAF7F2;
          margin-bottom: 8px;
        }

        .lightbox-meta p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 12px;
          font-size: 15px;
        }

        .lightbox-specs {
          display: block;
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          color: #DFC07A;
          margin-bottom: 20px;
        }

        .lightbox-wa-btn {
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

        .lightbox-wa-btn:hover {
          background: #C69A52;
          color: #12100E;
          border-color: #C69A52;
        }

        .lightbox-wa-btn:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        @media (max-width: 992px) {
          .festive-monumental-grid {
            grid-template-columns: 1fr;
          }

          .card-scale-monumental,
          .card-scale-large,
          .card-scale-medium {
            grid-column: span 1;
          }
        }

        @media (max-width: 600px) {
          .festive-transition-portal {
            padding: 90px 20px 60px;
          }

          .festive-gallery-container {
            padding: 0 18px;
          }

          .photo-media-box {
            min-height: 280px;
          }

          .photo-action-row {
            flex-direction: column;
          }

          .festive-order-wa-btn {
            width: 100%;
          }

          .festive-zoom-btn {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
