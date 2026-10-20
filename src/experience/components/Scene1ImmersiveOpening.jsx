import React from 'react'

export default function Scene1ImmersiveOpening() {
  const handleScrollToGallery = (e) => {
    e.preventDefault()
    const target = document.querySelector('#scene-gallery')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="scene1-opening-root" id="scene-opening" aria-label="Scene 1 — Immersive Opening">
      <div className="scene1-stage-wrap">
        {/* Editorial Top Datum */}
        <div className="scene1-datum-bar">
          <div className="scene1-atelier-badge">
            <span className="badge-glyph">✦</span>
            <span>MUMBAI ATELIER • PARTH ENTERPRISES</span>
          </div>
          <span className="scene1-collection-year">2026 ARCHITECTURAL MONOGRAPH</span>
        </div>

        {/* Bold Serip-inspired Editorial Headline */}
        <div className="scene1-headline-block">
          <h1 className="scene1-title">
            Sculpted by shadow.<br />
            <span className="scene1-title-italic">Defined by light.</span>
          </h1>
          <p className="scene1-subtitle">
            Luminaires designed not merely to illuminate, but to shape the quiet proportions and tactile depth of contemporary spaces.
          </p>
        </div>

        {/* Monumental Real Product Visual Stage */}
        <div className="scene1-monumental-stage">
          <div className="scene1-image-container">
            <img
              src="/images/products/curve-cob-rose-gold.png"
              alt="Pearl Lighting Curve COB Rose Gold Architectural Luminaire"
              className="scene1-hero-img"
              loading="eager"
            />
            <div className="scene1-soft-ambient-glow" aria-hidden="true"></div>
            <div className="scene1-ground-shadow" aria-hidden="true"></div>
          </div>

          {/* Restrained Architectural Metadata Callouts */}
          <div className="scene1-floating-callout callout-left">
            <span className="callout-label">AERO-THERMAL SCULPTURE</span>
            <span className="callout-text">Radial rose-gold convection heatsink pulling heat from the core</span>
          </div>

          <div className="scene1-floating-callout callout-right">
            <span className="callout-label">OPTICAL THRESHOLD</span>
            <span className="callout-text">Deep specular cutoff baffle delivering glare-free 2700K warmth (CRI 95+)</span>
          </div>
        </div>

        {/* Restrained Bottom Action */}
        <div className="scene1-bottom-rail">
          <a
            href="#scene-gallery"
            className="scene1-scroll-btn"
            onClick={handleScrollToGallery}
          >
            <span>Begin Visual Exhibition</span>
            <span className="scroll-arrow">↓</span>
          </a>
        </div>
      </div>

      <style>{`
        .scene1-opening-root {
          position: relative;
          min-height: 100vh;
          background: #121110;
          color: #FAF7F2;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 130px 40px 60px;
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .scene1-stage-wrap {
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .scene1-datum-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 36px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
        }

        .scene1-atelier-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #DFC07A;
        }

        .badge-glyph {
          font-size: 10px;
        }

        .scene1-collection-year {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.16em;
          color: rgba(250, 247, 242, 0.45);
        }

        .scene1-headline-block {
          text-align: center;
          max-width: 900px;
          margin-bottom: 40px;
        }

        .scene1-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(40px, 5.5vw, 76px);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #FAF7F2;
          margin-bottom: 18px;
        }

        .scene1-title-italic {
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-style: italic;
          color: #DFC07A;
          font-weight: 300;
        }

        .scene1-subtitle {
          font-size: clamp(15px, 1.2vw, 18px);
          line-height: 1.6;
          color: rgba(250, 247, 242, 0.68);
          max-width: 640px;
          margin: 0 auto;
          font-weight: 300;
        }

        /* Monumental Stage */
        .scene1-monumental-stage {
          position: relative;
          width: 100%;
          max-width: 1100px;
          height: clamp(380px, 48vh, 560px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
        }

        .scene1-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scene1-hero-img {
          max-height: 95%;
          max-width: 80%;
          object-fit: contain;
          position: relative;
          z-index: 3;
          filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.9));
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scene1-hero-img:hover {
          transform: scale(1.03);
        }

        .scene1-soft-ambient-glow {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(223, 192, 122, 0.18) 0%, transparent 65%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 1;
        }

        .scene1-ground-shadow {
          position: absolute;
          bottom: 20px;
          width: 60%;
          height: 25px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.8) 0%, transparent 70%);
          filter: blur(12px);
          z-index: 2;
        }

        /* Architectural Callouts */
        .scene1-floating-callout {
          position: absolute;
          max-width: 240px;
          background: rgba(14, 13, 12, 0.75);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 14px 18px;
          z-index: 4;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
        }

        .callout-left {
          left: 40px;
          top: 35%;
        }

        .callout-right {
          right: 40px;
          bottom: 30%;
        }

        .callout-label {
          font-family: var(--font-mono, monospace);
          font-size: 9px;
          letter-spacing: 0.18em;
          color: #DFC07A;
          display: block;
          margin-bottom: 4px;
        }

        .callout-text {
          font-size: 12px;
          line-height: 1.5;
          color: rgba(250, 247, 242, 0.75);
        }

        /* Bottom Rail */
        .scene1-bottom-rail {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .scene1-scroll-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #FAF7F2;
          padding: 10px 24px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .scene1-scroll-btn:hover {
          background: #DFC07A;
          color: #0A0A0A;
          border-color: #DFC07A;
          transform: translateY(-2px);
        }

        .scroll-arrow {
          transition: transform 0.2s ease;
        }

        .scene1-scroll-btn:hover .scroll-arrow {
          transform: translateY(2px);
        }

        @media (max-width: 900px) {
          .scene1-floating-callout {
            display: none;
          }
          .scene1-monumental-stage {
            height: 340px;
          }
        }

        @media (max-width: 600px) {
          .scene1-opening-root {
            padding: 100px 20px 50px;
          }
          .scene1-datum-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 24px;
          }
          .scene1-monumental-stage {
            height: 280px;
          }
          .scene1-hero-img {
            max-width: 95%;
          }
        }
      `}</style>
    </section>
  )
}
