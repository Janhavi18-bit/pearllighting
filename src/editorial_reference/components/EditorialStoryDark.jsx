import React from 'react'

export default function EditorialStoryDark() {
  return (
    <div className="editorial-story-dark-block" id="editorial-story">
      {/* Giant Serif Headline (Matching Reference Screenshot) */}
      <div className="dark-story-headline-wrap">
        <h2 className="dark-story-giant-title">
          Unique Architectural Lighting Crafted To Light Up Your Life
        </h2>
      </div>

      {/* Asymmetric Content Composition */}
      <div className="dark-story-content-grid">
        {/* Large Lifestyle / Interior Luminaire Photograph on Left */}
        <div className="dark-story-media-box">
          <img
            src="/images/products/story-hero-ceiling-fan.png"
            alt="Pearl Lighting residential architectural illumination"
            className="dark-story-lifestyle-img"
          />
          <div className="dark-story-img-sub">
            <span>RESIDENTIAL INTERIOR INSTALLATION • MUMBAI</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Text Block on Right */}
        <div className="dark-story-text-column">
          <p className="dark-story-paragraph">
            Engineered in our Dhobi Talao atelier in Mumbai under Parth Enterprises, Pearl Lighting crafts luminaires that treat illumination as a tactile building material. Every curve baffle, darklight cone, and silicone ribbon is built for visual comfort and spatial calm.
          </p>

          <p className="dark-story-paragraph secondary-p">
            We partner directly with architects and interior designers across India, providing bespoke driver sizing, DALI integration, ceiling cutout coordination, and site mockups.
          </p>

          <div className="dark-story-atelier-badge">
            <span className="atelier-tag">PARTH ENTERPRISES</span>
            <span className="atelier-dot">•</span>
            <span className="atelier-loc">KALBADEVI, MUMBAI</span>
          </div>
        </div>
      </div>

      <style>{`
        .editorial-story-dark-block {
          background: #161514;
          color: #FAF7F2;
          padding: 70px 60px 80px;
          border-radius: 0 0 0 20px;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .dark-story-headline-wrap {
          max-width: 900px;
        }

        .dark-story-giant-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(32px, 3.8vw, 54px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: #FAF7F2;
        }

        .dark-story-content-grid {
          display: grid;
          grid-template-columns: 1.35fr 0.85fr;
          gap: 48px;
          align-items: flex-end;
        }

        .dark-story-media-box {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          background: #0E0D0C;
          aspect-ratio: 16 / 10;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .dark-story-lifestyle-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .dark-story-media-box:hover .dark-story-lifestyle-img {
          transform: scale(1.03);
        }

        .dark-story-img-sub {
          position: absolute;
          bottom: 14px;
          left: 16px;
          background: rgba(14, 13, 12, 0.8);
          backdrop-filter: blur(8px);
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: #D85623;
          padding: 4px 12px;
          border-radius: 999px;
        }

        .dark-story-text-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-bottom: 10px;
        }

        .dark-story-paragraph {
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(250, 247, 242, 0.8);
          font-weight: 300;
        }

        .secondary-p {
          color: rgba(250, 247, 242, 0.6);
          font-size: 13.5px;
        }

        .dark-story-atelier-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
          color: #D85623;
          margin-top: 10px;
        }

        .atelier-dot {
          color: rgba(250, 247, 242, 0.3);
        }

        @media (max-width: 900px) {
          .editorial-story-dark-block {
            padding: 50px 24px;
            border-radius: 0;
          }
          .dark-story-content-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </div>
  )
}
