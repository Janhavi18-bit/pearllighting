import React, { useState } from 'react'

/**
 * 03 — THE PEARL LIGHTING STORY
 * Serip-inspired editorial monograph spread on warm ivory canvas.
 * Varied image compositions, elegant typography, authentic Mumbai atelier heritage.
 * NOT three repetitive white cards!
 */
export default function BrandEditorialStory() {
  const [activeStoryChapter, setActiveStoryChapter] = useState(0)

  const chapters = [
    {
      num: '01',
      title: 'Light as Living Substance',
      quote: '“We do not design fixtures to be admired in isolation. We shape light to awaken the quiet spirit of the room.”',
      body: 'Founded under Parth Enterprises in Kalbadevi, Mumbai, Pearl Lighting emerged from a pure architectural conviction: illumination is not an applied cosmetic layer. When light is calibrated with optical sensitivity, it defines proportions, softens thresholds, and brings emotional calm to contemporary architecture.',
      imageMain: '/images/products/ceiling-fan-light-501-bk.png',
      captionMain: 'MODEL 501-BK • SPATIAL VOLUME & AERODYNAMIC EQUILIBRIUM',
      imageDetail: '/images/products/curve-cob-rose-gold.png',
      captionDetail: '6063 ALLOY ANODIZED HEATSINK GEOMETRY',
    },
    {
      num: '02',
      title: 'The Discipline of Zero Glare',
      quote: '“True luxury in lighting is the radiance you feel deeply without ever seeing a harsh diode.”',
      body: 'Every aperture, reflector facet, and heatsink profile is engineered with strict optical discipline. From deep 40° shielding angles that conceal the luminous diode from sightlines to curved baffles that eliminate contrast halos, our luminaires leave living environments bathed in natural clarity.',
      imageMain: '/images/products/curve-cob-white-recessed.png',
      captionMain: 'CURVED APERTURE • SEAMLESS CEILING CONTOUR',
      imageDetail: '/images/products/deep-downlight-round-black-studio.png',
      captionDetail: 'ANTI-GLARE STUDIO BLACK RECESSED CHAMBER',
    },
    {
      num: '03',
      title: 'Decades of Mumbai Craft',
      quote: '“Rooted in Kalbadevi, trusted across India’s most exacting architectural projects.”',
      body: 'From private residential villas to expansive commercial galleries and grand festive celebrations, Parth Enterprises has cultivated decades of enduring trust. We work alongside leading architects and interior designers to deliver lighting collections where technical reliability and understated beauty endure.',
      imageMain: '/images/products/rope-light-primary-warm.png',
      captionMain: 'CONTINUOUS LUMINESCENCE • ARCHITECTURAL CONTOUR RIBBON',
      imageDetail: '/images/products/led-flood-light-duo.png',
      captionDetail: 'EXTERIOR HEATSINK ARRAY & DIE-CAST BEAM VECTORING',
    },
  ]

  const current = chapters[activeStoryChapter]

  return (
    <section className="brand-story-monograph-root" id="story" aria-label="Pearl Lighting Brand Story">
      <div className="container story-inner-wrap">
        {/* Top Marker */}
        <div className="rebuild-marker-rail" style={{ color: '#161513' }}>
          <span className="rebuild-marker-num">03</span>
          <span className="rebuild-marker-dot">•</span>
          <span className="rebuild-marker-tag">EDITORIAL MONOGRAPH • PARTH ENTERPRISES</span>
        </div>

        {/* Story Section Headline */}
        <div className="story-header-row">
          <h2 className="story-master-headline">
            A story told<br />
            <span className="serif-italic-title">through light.</span>
          </h2>

          {/* Chapter Switcher Tabs */}
          <div className="story-chapter-tabs" role="tablist" aria-label="Brand story chapters">
            {chapters.map((ch, idx) => (
              <button
                key={ch.num}
                type="button"
                role="tab"
                aria-selected={activeStoryChapter === idx}
                className={`chapter-tab-pill ${activeStoryChapter === idx ? 'is-active' : ''}`}
                onClick={() => setActiveStoryChapter(idx)}
              >
                <span className="ch-num">{ch.num}</span>
                <span className="ch-title">{ch.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Magazine Spread */}
        <div className="story-editorial-spread">
          {/* Left Flank: Monograph Text & Historical Stamp */}
          <div className="story-text-column">
            <span className="story-kicker">CHAPTER {current.num} • THE MONOGRAPH</span>
            <h3 className="story-chapter-heading">{current.title}</h3>
            <blockquote className="story-pullquote">{current.quote}</blockquote>
            <p className="story-body-prose">{current.body}</p>

            <div className="story-heritage-plaque">
              <span className="plaque-sparkle">✦</span>
              <div className="plaque-creds">
                <span className="plaque-atelier">PARTH ENTERPRISES • MUMBAI</span>
                <span className="plaque-address">Dhobi Talao, Kalbadevi • Architectural Illumination Atelier</span>
              </div>
            </div>
          </div>

          {/* Right Flank: Large Artistic Museum Image Composition */}
          <div className="story-visual-column">
            {/* Monumental Primary Photo */}
            <div className="story-monument-frame">
              <img
                key={current.imageMain}
                src={current.imageMain}
                alt={current.captionMain}
                className="monument-photo"
                loading="lazy"
              />
              <div className="monument-caption-bar">
                <span className="caption-dot">✦</span>
                <span className="caption-text">{current.captionMain}</span>
              </div>
            </div>

            {/* Overlapping Detail Inset */}
            <div className="story-detail-frame hide-on-mobile">
              <img
                key={current.imageDetail}
                src={current.imageDetail}
                alt={current.captionDetail}
                className="detail-photo"
                loading="lazy"
              />
              <span className="detail-caption-tag">{current.captionDetail}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .brand-story-monograph-root {
          position: relative;
          background: #F8F5EE;
          color: #161513;
          padding: 7rem 0 7.5rem;
          border-top: 1px solid rgba(22, 21, 19, 0.08);
        }

        .story-header-row {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }

        @media (min-width: 960px) {
          .story-header-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }

        .story-master-headline {
          font-family: var(--font-sans);
          font-size: clamp(2.3rem, 5vw, 4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.025em;
          color: #161513;
        }

        .serif-italic-title {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          color: var(--accent-gold);
        }

        .story-chapter-tabs {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .chapter-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          border-radius: 999px;
          background: rgba(22, 21, 19, 0.05);
          border: 1px solid rgba(22, 21, 19, 0.08);
          color: #58534A;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .chapter-tab-pill:hover {
          background: #FFFFFF;
          color: #161513;
        }

        .chapter-tab-pill.is-active {
          background: #161513;
          color: #FAF7F2;
          border-color: #161513;
          box-shadow: 0 4px 16px rgba(22, 21, 19, 0.15);
        }

        .ch-num {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent-gold);
          font-weight: 600;
        }

        .chapter-tab-pill.is-active .ch-num {
          color: var(--gold-champagne);
        }

        /* Editorial Spread */
        .story-editorial-spread {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        @media (min-width: 960px) {
          .story-editorial-spread {
            grid-template-columns: 1.05fr 1.25fr;
            gap: 5rem;
          }
        }

        /* Text Column */
        .story-text-column {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .story-kicker {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--accent-gold);
          text-transform: uppercase;
        }

        .story-chapter-heading {
          font-family: var(--font-sans);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #161513;
        }

        .story-pullquote {
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: 1.25rem;
          line-height: 1.5;
          color: #38342D;
          border-left: 2px solid var(--accent-gold);
          padding-left: 1.15rem;
        }

        .story-body-prose {
          font-size: 1rem;
          line-height: 1.75;
          color: #58534A;
          font-weight: 300;
        }

        .story-heritage-plaque {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(22, 21, 19, 0.08);
        }

        .plaque-sparkle {
          color: var(--accent-gold);
          font-size: 1rem;
        }

        .plaque-creds {
          display: flex;
          flex-direction: column;
        }

        .plaque-atelier {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #161513;
        }

        .plaque-address {
          font-size: 0.74rem;
          color: #847C70;
        }

        /* Visual Column */
        .story-visual-column {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .story-monument-frame {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          border-radius: 24px;
          padding: clamp(2rem, 4vw, 3.5rem);
          box-shadow: var(--shadow-monumental);
          border: 1px solid rgba(22, 21, 19, 0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 460px;
        }

        .monument-photo {
          width: 85%;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(22, 21, 19, 0.14));
          animation: fadeScalePhoto 0.4s ease;
        }

        @keyframes fadeScalePhoto {
          from { opacity: 0.5; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        .monument-caption-bar {
          margin-top: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1rem;
          background: rgba(22, 21, 19, 0.04);
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #58534A;
        }

        .caption-dot {
          color: var(--accent-gold);
        }

        /* Detail Inset */
        .story-detail-frame {
          position: absolute;
          bottom: -25px;
          right: -20px;
          width: 180px;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 0.85rem;
          box-shadow: 0 16px 40px rgba(22, 21, 19, 0.16);
          border: 1px solid rgba(22, 21, 19, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 2;
        }

        .detail-photo {
          width: 100%;
          height: 110px;
          object-fit: contain;
        }

        .detail-caption-tag {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
          text-transform: uppercase;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .brand-story-monograph-root {
            padding: 4.5rem 0 5rem;
          }

          .story-monument-frame {
            min-height: 320px;
            padding: 1.5rem;
          }

          .monument-photo {
            max-height: 240px;
          }

          .hide-on-mobile {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
