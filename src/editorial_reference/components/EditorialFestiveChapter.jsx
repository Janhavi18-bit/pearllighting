import React from 'react'

export default function EditorialFestiveChapter() {
  const festiveItems = [
    {
      id: 'star-curtain',
      title: 'Hanging Star Curtain Cascade',
      desc: '12 cascading warm star silhouettes with alternating drop heights for celebratory balconies and facades.',
      img: '/images/diwali/diwali-hanging-star-curtain.png',
      alt: 'Pearl Lighting hanging star curtain lights',
      waText: 'Hi Pearl Lighting! I would like to order the Hanging Star Curtain Lights.',
    },
    {
      id: 'diya-curtain',
      title: 'Golden Diya Silhouette Curtain',
      desc: 'Traditional sacred brass diya silhouettes rendered in pure warm LEDs for entrance portals and puja rooms.',
      img: '/images/diwali/diwali-hanging-diya-curtain.png',
      alt: 'Pearl Lighting hanging diya curtain lights',
      waText: 'Hi Pearl Lighting! I would like to order the Hanging Diya Curtain Lights.',
    },
    {
      id: 'crystal-bubbles',
      title: 'Crystal Bubble Glass Strings',
      desc: 'Refractive acrylic crystal spheres scattering jewel-like sparkles across festive tablescapes.',
      img: '/images/diwali/diwali-crystal-bubble-lights.png',
      alt: 'Pearl Lighting crystal bubble string lights',
      waText: 'Hi Pearl Lighting! I would like to order the Crystal Bubble String Lights.',
    },
  ]

  const handleOrder = (item) => {
    window.open(
      `https://wa.me/918329045712?text=${encodeURIComponent(item.waText)}`,
      '_blank'
    )
  }

  return (
    <section className="editorial-festive-section" id="festive-section" aria-label="Festive Lighting Collection">
      <div className="festive-editorial-container">
        {/* Editorial Top Headline */}
        <div className="festive-editorial-header">
          <div className="festive-editorial-kicker">
            <span className="festive-spark">✦</span>
            <span>THE CELESTIAL SALON • FESTIVE EDITION</span>
          </div>
          <h2 className="festive-editorial-title">
            Celebratory light for grand evenings.
          </h2>
          <p className="festive-editorial-sub">
            Handcrafted star cascades, golden diya silhouettes, and ambient crystal luster dispatched directly from our Kalbadevi atelier across India.
          </p>
        </div>

        {/* Asymmetric Festive Magazine Composition */}
        <div className="festive-editorial-spread">
          {/* Dominant Lifestyle Portrait Showcase on Left */}
          <div className="festive-hero-portal">
            <img
              src="/images/diwali/diwali-golden-bokeh-lifestyle.png"
              alt="Pearl Lighting festive golden bokeh lifestyle ambiance"
              className="festive-portal-img"
            />
            <div className="festive-portal-overlay">
              <span className="portal-badge">ATMOSPHERIC AMBIENCE</span>
              <h3 className="portal-title">Golden Bokeh Living Luster</h3>
              <p className="portal-desc">
                Diffuse warm amber radiance designed for intimate festive gatherings and Diwali celebrations.
              </p>
              <button
                type="button"
                className="festive-portal-wa-btn"
                onClick={() =>
                  window.open(
                    `https://wa.me/918329045712?text=${encodeURIComponent('Hi Pearl Lighting! I would like to order the Golden Bokeh Festive Lighting setup.')}`,
                    '_blank'
                  )
                }
              >
                <span>Order on WhatsApp</span>
                <span className="arrow-sym">→</span>
              </button>
            </div>
          </div>

          {/* Staggered Festive Showcase Cards on Right */}
          <div className="festive-showcase-column">
            {festiveItems.map((item) => (
              <div
                key={item.id}
                className="festive-item-card"
                onClick={() => handleOrder(item)}
              >
                <div className="festive-item-media">
                  <img src={item.img} alt={item.alt} className="festive-item-img" />
                </div>
                <div className="festive-item-copy">
                  <h4 className="festive-item-heading">{item.title}</h4>
                  <p className="festive-item-text">{item.desc}</p>
                  <span className="festive-item-action">Order via WhatsApp (+91 83290 45712) ↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .editorial-festive-section {
          background: #0E0D10;
          color: #FAF7F2;
          padding: 100px 48px;
          position: relative;
        }

        .festive-editorial-container {
          max-width: 1560px;
          margin: 0 auto;
        }

        .festive-editorial-header {
          max-width: 820px;
          margin-bottom: 50px;
        }

        .festive-editorial-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #D85623;
          margin-bottom: 16px;
        }

        .festive-spark {
          font-size: 10px;
        }

        .festive-editorial-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 400;
          color: #FAF7F2;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .festive-editorial-sub {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(250, 247, 242, 0.7);
          font-weight: 300;
        }

        /* Asymmetric Spread */
        .festive-editorial-spread {
          display: grid;
          grid-template-columns: 1.25fr 0.85fr;
          gap: 40px;
          align-items: stretch;
        }

        .festive-hero-portal {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: #050506;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          min-height: 520px;
          display: flex;
        }

        .festive-portal-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .festive-hero-portal:hover .festive-portal-img {
          transform: scale(1.03);
        }

        .festive-portal-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(10, 9, 12, 0.92) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 40px;
        }

        .portal-badge {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #D85623;
          margin-bottom: 8px;
        }

        .portal-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 32px;
          color: #FFFFFF;
          margin-bottom: 10px;
        }

        .portal-desc {
          font-size: 14px;
          color: rgba(250, 247, 242, 0.8);
          max-width: 440px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .festive-portal-wa-btn {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #171717;
          color: #FAF7F2;
          border: 1px solid rgba(198, 154, 82, 0.45);
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .festive-portal-wa-btn:hover {
          background: #C69A52;
          color: #12100E;
          border-color: #C69A52;
          transform: translateY(-2px);
        }

        .festive-portal-wa-btn:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        /* Right Column */
        .festive-showcase-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .festive-item-card {
          background: #141318;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 20px;
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 20px;
          align-items: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .festive-item-card:hover {
          border-color: rgba(216, 86, 35, 0.45);
          transform: translateY(-3px);
          background: #1A1920;
        }

        .festive-item-media {
          background: #060508;
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .festive-item-img {
          width: 90%;
          height: 90%;
          object-fit: cover;
        }

        .festive-item-heading {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 17px;
          color: #FAF7F2;
          margin-bottom: 6px;
        }

        .festive-item-text {
          font-size: 12.5px;
          color: rgba(250, 247, 242, 0.65);
          line-height: 1.5;
          margin-bottom: 10px;
        }

        .festive-item-action {
          font-size: 11.5px;
          color: #D85623;
          font-weight: 600;
        }

        @media (max-width: 992px) {
          .editorial-festive-section {
            padding: 70px 24px;
          }
          .festive-editorial-spread {
            grid-template-columns: 1fr;
          }
          .festive-hero-portal {
            min-height: 380px;
          }
        }

        @media (max-width: 600px) {
          .festive-item-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
