import React from 'react'

/**
 * FullBleedLightingMoment - Section 06: Cinematic Full-Bleed Lighting Moment
 * Conforms to exact specifications:
 * - One dramatic full-screen section
 * - Strongest real architectural lighting visual (warm glowing Rope Light loops)
 * - Very little text:
 *   LIGHT
 *   CHANGES
 *   EVERYTHING.
 * - Typography sits over/around the visual occupying almost the entire viewport
 * - Acts as a cinematic pause in the showroom experience
 */
export default function FullBleedLightingMoment() {
  return (
    <section className="fullbleed-root" aria-label="Cinematic Lighting Moment">
      {/* Background Architectural Atmosphere & Glow */}
      <div className="fullbleed-atmosphere" aria-hidden="true">
        <div className="fullbleed-gold-pool"></div>
      </div>

      <div className="fullbleed-viewport-frame">
        {/* Full-Bleed Real Product Photographic Study */}
        <div className="fullbleed-visual-monolith">
          <img
            src="/images/diwali/diwali-golden-cluster-lights.png"
            alt="Pearl Lighting Architectural Illumination"
            className="fullbleed-hero-visual"
            loading="lazy"
          />
          <div className="fullbleed-vignette-veil" aria-hidden="true"></div>
        </div>

        {/* Monumental Overlay Typography */}
        <div className="fullbleed-overlay-content">
          <div className="fullbleed-marker-line">
            <span className="marker-index">05</span>
            <span className="marker-dot"></span>
            <span className="marker-text">SPATIAL TRANSFORMATION</span>
          </div>

          <h2 className="fullbleed-monumental-headline">
            LIGHT<br />
            <span className="italic-accent">CHANGES</span><br />
            EVERYTHING.
          </h2>

          <p className="fullbleed-whisper-text">
            "The silent medium that transforms inert geometry into living atmosphere."
          </p>
        </div>
      </div>

      <style>{`
        .fullbleed-root {
          position: relative;
          min-height: 92vh;
          width: 100%;
          background: #171513;
          color: #FAF9F5;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fullbleed-atmosphere {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .fullbleed-gold-pool {
          position: absolute;
          top: 40%;
          right: 25%;
          width: 700px;
          height: 500px;
          background: radial-gradient(circle at center, rgba(198, 154, 82, 0.28) 0%, transparent 70%);
          filter: blur(80px);
        }

        .fullbleed-viewport-frame {
          position: relative;
          width: 100%;
          height: 92vh;
          min-height: 680px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Full Bleed Monolith */
        .fullbleed-visual-monolith {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: clamp(2rem, 8vw, 10rem);
        }

        .fullbleed-hero-visual {
          width: auto;
          height: 82%;
          max-height: 720px;
          object-fit: contain;
          filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.6)) brightness(1.05);
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fullbleed-root:hover .fullbleed-hero-visual {
          transform: scale(1.03) translateY(-6px);
        }

        .fullbleed-vignette-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(23, 21, 19, 0.94) 0%,
            rgba(23, 21, 19, 0.65) 45%,
            rgba(23, 21, 19, 0.2) 100%
          );
          pointer-events: none;
        }

        /* Monumental Overlay */
        .fullbleed-overlay-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1560px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
          display: flex;
          flex-direction: column;
          pointer-events: none;
        }

        .fullbleed-marker-line {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .marker-index {
          font-family: var(--font-mono, monospace);
          font-size: 0.82rem;
          color: var(--accent-gold, #C69A52);
          font-weight: 500;
        }

        .marker-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-gold, #C69A52);
        }

        .marker-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(250, 249, 245, 0.7);
        }

        .fullbleed-monumental-headline {
          font-family: var(--font-serif);
          font-size: clamp(3.8rem, 10vw, 8.8rem);
          font-weight: 300;
          letter-spacing: 0.02em;
          line-height: 0.92;
          text-transform: uppercase;
          color: #FAF9F5;
          margin: 0 0 2.5rem;
          text-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }

        .italic-accent {
          font-style: italic;
          font-weight: 200;
          color: var(--accent-gold, #C69A52);
          padding-left: clamp(1rem, 6vw, 4rem);
        }

        .fullbleed-whisper-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1.15rem, 1.8vw, 1.45rem);
          font-weight: 300;
          color: rgba(250, 249, 245, 0.8);
          max-width: 500px;
          margin: 0;
          line-height: 1.55;
        }

        @media (max-width: 991px) {
          .fullbleed-visual-monolith {
            position: relative;
            height: 400px;
            padding: 0;
            justify-content: center;
          }
          .fullbleed-viewport-frame {
            height: auto;
            flex-direction: column;
            padding: 5rem 0;
          }
          .fullbleed-overlay-content {
            margin-top: -3rem;
          }
        }
      `}</style>
    </section>
  )
}
