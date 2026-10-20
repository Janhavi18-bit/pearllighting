import React, { useState } from 'react'

/**
 * SECTION 3: EDITORIAL BRAND STORY
 * Serip-level poetic lighting monograph set on warm ivory alabaster canvas.
 * Artistic asymmetric compositions, refined typography, and authentic Mumbai atelier heritage.
 */
export default function StorySection() {
  const [activeMovement, setActiveMovement] = useState(0)

  const movements = [
    {
      index: '01',
      tag: 'PHILOSOPHY OF PRESENCE',
      title: 'Light is the First Material of Architecture.',
      quote: '“We do not design luminaires to be looked at in isolation. We design light to awaken the quiet spirit of the room.”',
      body: 'Founded under Parth Enterprises in Kalbadevi, Mumbai, Pearl Lighting emerged from a singular conviction: illumination should never be an afterthought or cosmetic accessory. When light is calibrated with optical honesty and architectural sensitivity, it shapes emotional atmosphere, defines spatial proportions, and restores calm to living environments.',
      imageMain: '/images/products/ceiling-fan-light-501-bk.png',
      captionMain: 'MODEL 501-BK • INTEGRATED ILLUMINATION & SPATIAL EQUILIBRIUM',
      imageDetail: '/images/products/curve-cob-rose-gold.png',
      captionDetail: 'ANODIZED ALLOY HEATSINK ARCHITECTURE',
    },
    {
      index: '02',
      tag: 'OPTICAL DISCIPLINE',
      title: 'The Balance of Glare, Beam, and Shadow.',
      quote: '“True luxury in lighting is the light you feel deeply without ever seeing a harsh source.”',
      body: 'Every Pearl Lighting luminaire is subject to uncompromising thermal discipline and glare engineering. From deep-recessed baffles with shielding angles exceeding 40° to passive multi-fin convection channels, our fixtures ensure that light falls exactly where intent dictates—leaving living spaces illuminated with warm, natural clarity.',
      imageMain: '/images/products/curve-cob-white-recessed.png',
      captionMain: 'CURVED APERTURE • SEAMLESS DRYWALL CONTOUR',
      imageDetail: '/images/products/deep-downlight-round-black-studio.png',
      captionDetail: 'ANTI-GLARE STUDIO BLACK RECESSED CHAMBER',
    },
    {
      index: '03',
      tag: 'MUMBAI ATELIER HERITAGE',
      title: 'Decades of Professional Lighting Mastery.',
      quote: '“Rooted in Mumbai’s architectural pulse, delivering lighting solutions trusted across India.”',
      body: 'From private residential villas to expansive commercial galleries and grand festive celebrations, Parth Enterprises has cultivated decades of enduring trust. We work alongside leading architects, interior designers, and homeowners to engineer bespoke lighting schemes where aesthetic permanence and technical reliability are guaranteed.',
      imageMain: '/images/products/rope-light-primary-warm.png',
      captionMain: 'CONTINUOUS LUMINESCENCE • ARCHITECTURAL CONTOUR RIBBON',
      imageDetail: '/images/products/led-flood-light-duo.png',
      captionDetail: 'HEATSINK REFINEMENT • EXTERIOR ARCHITECTURAL ARRAY',
    },
  ]

  const current = movements[activeMovement]

  return (
    <section className="editorial-story-root" id="story" aria-label="Brand Story">
      <div className="container story-monograph-container">
        {/* Section Marker */}
        <div className="section-marker-rail">
          <span className="section-marker-num">03</span>
          <span className="section-marker-dot">•</span>
          <span className="section-marker-title">THE BRAND MONOGRAPH • PARTH ENTERPRISES</span>
        </div>

        {/* Section Header */}
        <div className="story-title-row">
          <h2 className="story-editorial-headline">
            A STORY TOLD<br />
            <span className="headline-gold-italic">THROUGH LIGHT.</span>
          </h2>

          {/* Movement Tabs */}
          <div className="movement-tabs-strip" role="tablist" aria-label="Monograph movements">
            {movements.map((m, idx) => (
              <button
                key={m.index}
                type="button"
                role="tab"
                aria-selected={activeMovement === idx}
                className={`movement-tab-btn ${activeMovement === idx ? 'active' : ''}`}
                onClick={() => setActiveMovement(idx)}
              >
                <span className="tab-number">{m.index}</span>
                <span className="tab-title">{m.tag}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <div className="editorial-spread-stage">
          {/* Left Flank: Narrative Monograph */}
          <div className="editorial-text-panel">
            <div className="panel-inner-content">
              <span className="movement-eyebrow">MOVEMENT {current.index} • {current.tag}</span>
              <h3 className="movement-headline">{current.title}</h3>
              <blockquote className="movement-quote">{current.quote}</blockquote>
              <div className="movement-separator" aria-hidden="true"></div>
              <p className="movement-body">{current.body}</p>

              <div className="atelier-origin-stamp">
                <span className="stamp-seal">✦</span>
                <div className="stamp-info">
                  <span className="stamp-title">PEARL LIGHTINGS ATELIER</span>
                  <span className="stamp-sub">Parth Enterprises • Dhobi Talao, Kalbadevi, Mumbai</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Flank: Large Artistic Image Composition */}
          <div className="editorial-visual-composition">
            {/* Monumental Primary Image Canvas */}
            <div className="visual-monument-canvas">
              <div className="canvas-warm-glow" aria-hidden="true"></div>
              <img
                src={current.imageMain}
                alt={current.captionMain}
                className="monument-main-img"
                loading="lazy"
              />
              <div className="monument-shadow" aria-hidden="true"></div>
              <div className="monument-caption-plaque">
                <span className="plaque-dot">✦</span>
                <span className="plaque-text">{current.captionMain}</span>
              </div>
            </div>

            {/* Overlapping Tactile Detail Frame */}
            <div className="visual-detail-inset">
              <img
                src={current.imageDetail}
                alt={current.captionDetail}
                className="detail-inset-img"
                loading="lazy"
              />
              <div className="detail-inset-label">
                <span>{current.captionDetail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .editorial-story-root {
          position: relative;
          background: #FAF8F5;
          color: var(--text-primary-dark);
          padding: 7rem 0 7.5rem;
          border-top: 1px solid rgba(24, 23, 21, 0.05);
        }

        .story-title-row {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3.5rem;
        }

        @media (min-width: 960px) {
          .story-title-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }

        .story-editorial-headline {
          font-family: var(--font-sans);
          font-size: clamp(2.3rem, 5vw, 4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #181715;
        }

        .headline-gold-italic {
          font-family: var(--font-editorial);
          font-style: italic;
          font-weight: 400;
          color: var(--accent-gold);
        }

        /* Movement Tabs */
        .movement-tabs-strip {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .movement-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.15rem;
          border-radius: 999px;
          background: rgba(24, 23, 21, 0.04);
          border: 1px solid rgba(24, 23, 21, 0.08);
          color: var(--text-secondary-dark);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .movement-tab-btn:hover {
          background: #FFFFFF;
          color: #181715;
          border-color: rgba(184, 147, 68, 0.4);
        }

        .movement-tab-btn.active {
          background: #181715;
          color: #FAF8F5;
          border-color: #181715;
          box-shadow: 0 4px 16px rgba(24, 23, 21, 0.15);
        }

        .tab-number {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--accent-gold);
          font-weight: 600;
        }

        /* Spread Stage */
        .editorial-spread-stage {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        @media (min-width: 960px) {
          .editorial-spread-stage {
            grid-template-columns: 1.05fr 1.25fr;
            gap: 5rem;
          }
        }

        /* Left Panel */
        .editorial-text-panel {
          background: #FFFFFF;
          border-radius: 24px;
          padding: clamp(2rem, 4vw, 3.25rem);
          box-shadow: var(--shadow-medium);
          border: 1px solid rgba(24, 23, 21, 0.06);
        }

        .panel-inner-content {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .movement-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: var(--accent-gold);
          text-transform: uppercase;
        }

        .movement-headline {
          font-family: var(--font-sans);
          font-size: clamp(1.6rem, 2.7vw, 2.3rem);
          font-weight: 600;
          line-height: 1.2;
          color: #181715;
        }

        .movement-quote {
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: 1.22rem;
          line-height: 1.5;
          color: #3D372F;
          border-left: 2px solid var(--accent-gold);
          padding-left: 1.1rem;
        }

        .movement-separator {
          width: 40px;
          height: 1px;
          background: rgba(184, 147, 68, 0.4);
        }

        .movement-body {
          font-size: 0.98rem;
          line-height: 1.75;
          color: var(--text-secondary-dark);
          font-weight: 300;
        }

        .atelier-origin-stamp {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(24, 23, 21, 0.07);
        }

        .stamp-seal {
          color: var(--accent-gold);
          font-size: 1rem;
        }

        .stamp-info {
          display: flex;
          flex-direction: column;
        }

        .stamp-title {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #181715;
        }

        .stamp-sub {
          font-size: 0.72rem;
          color: var(--text-muted-dark);
        }

        /* Right Visual Composition */
        .editorial-visual-composition {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .visual-monument-canvas {
          position: relative;
          width: 100%;
          background: #FFFFFF;
          border-radius: 24px;
          padding: clamp(2rem, 4vw, 3.5rem);
          box-shadow: var(--shadow-monumental);
          border: 1px solid rgba(24, 23, 21, 0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 460px;
        }

        .canvas-warm-glow {
          position: absolute;
          inset: 15%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(226, 188, 106, 0.25) 0%, transparent 70%);
          filter: blur(50px);
          pointer-events: none;
        }

        .monument-main-img {
          width: 85%;
          max-height: 380px;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(24, 20, 15, 0.15));
          user-select: none;
          z-index: 1;
        }

        .monument-shadow {
          width: 75%;
          height: 18px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 70%);
          filter: blur(8px);
          margin-top: 1rem;
        }

        .monument-caption-plaque {
          margin-top: 1.25rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 1rem;
          background: rgba(24, 23, 21, 0.05);
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--text-secondary-dark);
          text-align: center;
        }

        .plaque-dot {
          color: var(--accent-gold);
          font-size: 0.65rem;
        }

        /* Detail Inset Overlap */
        .visual-detail-inset {
          position: absolute;
          bottom: -25px;
          right: -15px;
          width: 170px;
          background: #FFFFFF;
          border-radius: 16px;
          padding: 0.85rem;
          box-shadow: 0 16px 40px rgba(24, 20, 15, 0.16);
          border: 1px solid rgba(24, 23, 21, 0.08);
          display: none;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 2;
        }

        @media (min-width: 640px) {
          .visual-detail-inset {
            display: flex;
          }
        }

        .detail-inset-img {
          width: 100%;
          height: 110px;
          object-fit: contain;
        }

        .detail-inset-label {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--accent-gold);
          text-transform: uppercase;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .editorial-story-root {
            padding: 4.5rem 0 5rem;
          }

          .visual-monument-canvas {
            min-height: 340px;
            padding: 1.5rem;
          }

          .monument-main-img {
            max-height: 240px;
          }
        }
      `}</style>
    </section>
  )
}
