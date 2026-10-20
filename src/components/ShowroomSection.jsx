import React, { useState } from 'react'

export default function ShowroomSection() {
  const [atmosphere, setAtmosphere] = useState('evening') // 'evening' | 'midnight'

  return (
    <section className="showroom-root" aria-label="Pearl Lighting Showroom & Spatial Integration">
      <div className="container">
        {/* Header Block */}
        <div className="showroom-intro">
          <div className="showroom-title-wrap">
            <span className="eyebrow showroom-eyebrow">SPATIAL HARMONY</span>
            <h2 className="heading-section">LIGHT IN SPACE</h2>
          </div>

          <p className="showroom-statement">
            "From intimate interiors to expansive spaces, Pearl Lighting is designed to belong."
          </p>
        </div>

        {/* Large Full-Width Interior Photography Area Placeholder */}
        <div className={`showroom-cinematic-stage ${atmosphere}`} aria-label="Architectural interior lighting study">
          {/* Spatial Architectural Room Perspective */}
          <div className="interior-perspective-box" aria-hidden="true">
            {/* Ceiling plane & architectural reveal */}
            <div className="ceiling-plane"></div>

            {/* Rear Monolithic Wall & Architectural Aperture */}
            <div className="back-wall-plane">
              <div className="wall-aperture">
                <div className="aperture-sky"></div>
              </div>
            </div>

            {/* Floor Plane & Luminaire Specular Pools */}
            <div className="floor-plane">
              <div className="floor-ambient-glow"></div>
              <div className="floor-reflection-primary"></div>
              <div className="floor-reflection-secondary"></div>
            </div>

            {/* Suspended Pearl Luminaires in Room Space */}
            <div className="spatial-fixture fixture-hero">
              <div className="fixture-wire"></div>
              <div className="fixture-bloom"></div>
              <div className="fixture-orb"></div>
            </div>

            <div className="spatial-fixture fixture-flank">
              <div className="fixture-wire"></div>
              <div className="fixture-bloom"></div>
              <div className="fixture-orb"></div>
            </div>

            <div className="spatial-fixture fixture-depth">
              <div className="fixture-wire"></div>
              <div className="fixture-bloom"></div>
              <div className="fixture-orb"></div>
            </div>

            {/* Atmospheric Light Rays */}
            <div className="volumetric-haze"></div>
          </div>

          {/* Luxury Stage Metadata Bar & Atmosphere Controls */}
          <div className="stage-hud-bar">
            <div className="hud-location">
              <span className="hud-dot"></span>
              <span className="hud-text">PAVILION STUDY 04 • ZÜRICH ARCHITECTURE</span>
            </div>

            <div className="hud-controls">
              <span className="hud-label">CALIBRATION:</span>
              <button
                type="button"
                className={`hud-mode-btn ${atmosphere === 'evening' ? 'active' : ''}`}
                onClick={() => setAtmosphere('evening')}
                aria-pressed={atmosphere === 'evening'}
              >
                EVENING 2400K
              </button>
              <button
                type="button"
                className={`hud-mode-btn ${atmosphere === 'midnight' ? 'active' : ''}`}
                onClick={() => setAtmosphere('midnight')}
                aria-pressed={atmosphere === 'midnight'}
              >
                MIDNIGHT 1900K
              </button>
            </div>
          </div>
        </div>

        {/* Minimal Architectural Metrics */}
        <div className="showroom-metrics">
          <div className="metric-cell">
            <span className="metric-index">01</span>
            <span className="metric-title">Proportion & Scale</span>
            <p className="metric-desc">Engineered drop suspensions customizable to double-height stairwells and private galleries.</p>
          </div>
          <div className="metric-cell">
            <span className="metric-index">02</span>
            <span className="metric-title">Glare Shielding</span>
            <p className="metric-desc">Micro-prismatic internal optics ensure UGR &lt; 10 comfort for dining, reading, and contemplation.</p>
          </div>
          <div className="metric-cell">
            <span className="metric-index">03</span>
            <span className="metric-title">Smart Integration</span>
            <p className="metric-desc">Native integration with Lutron, DALI-2, and 0–10V architectural automation infrastructure.</p>
          </div>
        </div>
      </div>

      <style>{`
        .showroom-root {
          position: relative;
          padding: 8.5rem 0;
          background: var(--bg-secondary, #EFE9DE);
          border-top: 1px solid rgba(120, 100, 70, 0.18);
          width: 100%;
          color: var(--primary-text, #171717);
        }

        @media (min-width: 1024px) {
          .showroom-root {
            padding: 12rem 0;
          }
        }

        .showroom-intro {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        @media (min-width: 860px) {
          .showroom-intro {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }

        .showroom-eyebrow {
          margin-bottom: 1.25rem;
          color: var(--champagne-gold, #C69A52);
        }

        .showroom-statement {
          font-family: var(--font-serif);
          font-size: clamp(1.25rem, 2.2vw, 1.85rem);
          font-weight: 300;
          font-style: italic;
          color: var(--primary-text, #171717);
          max-width: 580px;
          line-height: 1.45;
        }

        /* Large Full-Width Cinematic Stage */
        .showroom-cinematic-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          min-height: 420px;
          max-height: 680px;
          border: 1px solid rgba(198, 154, 82, 0.28);
          background: #342D26;
          box-shadow: 0 16px 48px rgba(120, 100, 70, 0.08);
          overflow: hidden;
          transition: background 0.8s var(--ease-editorial);
        }

        .showroom-cinematic-stage.midnight {
          background: #27221C;
        }

        .interior-perspective-box {
          position: absolute;
          inset: 0;
          perspective: 1000px;
          overflow: hidden;
        }

        /* Architectural Room Planes */
        .ceiling-plane {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: linear-gradient(180deg, #10121a 0%, #07080b 100%);
          border-bottom: 1px solid rgba(229, 218, 201, 0.04);
        }

        .back-wall-plane {
          position: absolute;
          top: 30%;
          left: 12%;
          right: 12%;
          bottom: 25%;
          border: 1px solid rgba(229, 218, 201, 0.06);
          background: linear-gradient(180deg, #090a0f 0%, #0d0f16 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wall-aperture {
          width: 75%;
          height: 78%;
          border: 1px solid rgba(229, 218, 201, 0.05);
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #050608 0%, #0a0c12 100%);
        }

        .aperture-sky {
          position: absolute;
          bottom: -20px;
          left: 15%;
          right: 15%;
          height: 120px;
          background: radial-gradient(ellipse, rgba(85, 100, 130, 0.12) 0%, transparent 70%);
          filter: blur(28px);
        }

        .floor-plane {
          position: absolute;
          bottom: 0;
          left: -15%;
          right: -15%;
          height: 40%;
          background: linear-gradient(180deg, #060709 0%, #0f121a 100%);
          transform: rotateX(54deg);
          transform-origin: bottom center;
          border-top: 1px solid rgba(229, 218, 201, 0.08);
        }

        .floor-ambient-glow {
          position: absolute;
          top: 10%;
          left: 30%;
          width: 40%;
          height: 80%;
          background: radial-gradient(ellipse at center, rgba(243, 237, 226, 0.1) 0%, transparent 80%);
          filter: blur(35px);
          transition: background 0.8s ease;
        }

        .showroom-cinematic-stage.midnight .floor-ambient-glow {
          background: radial-gradient(ellipse at center, rgba(220, 160, 100, 0.15) 0%, transparent 80%);
        }

        .floor-reflection-primary {
          position: absolute;
          top: 25%;
          left: 48%;
          width: 60px;
          height: 50%;
          background: radial-gradient(ellipse at center, rgba(243, 237, 226, 0.22) 0%, transparent 80%);
          filter: blur(12px);
          transition: background 0.8s ease;
        }

        .floor-reflection-secondary {
          position: absolute;
          top: 30%;
          left: 33%;
          width: 45px;
          height: 40%;
          background: radial-gradient(ellipse at center, rgba(243, 237, 226, 0.15) 0%, transparent 80%);
          filter: blur(10px);
        }

        /* Suspended Fixtures */
        .spatial-fixture {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 5;
        }

        .fixture-hero {
          top: 0;
          left: 49%;
          height: 50%;
        }

        .fixture-flank {
          top: 0;
          left: 34%;
          height: 41%;
        }

        .fixture-depth {
          top: 0;
          left: 65%;
          height: 46%;
        }

        .fixture-wire {
          width: 1px;
          flex-grow: 1;
          background: linear-gradient(180deg, rgba(203, 187, 163, 0.15) 0%, rgba(203, 187, 163, 0.6) 100%);
        }

        .fixture-bloom {
          position: absolute;
          bottom: -25px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(243, 237, 226, 0.35) 0%, transparent 70%);
          filter: blur(14px);
          transition: background 0.8s ease;
        }

        .fixture-hero .fixture-bloom {
          width: 130px;
          height: 130px;
        }

        .fixture-flank .fixture-bloom {
          width: 90px;
          height: 90px;
        }

        .fixture-depth .fixture-bloom {
          width: 80px;
          height: 80px;
        }

        .showroom-cinematic-stage.midnight .fixture-bloom {
          background: radial-gradient(circle, rgba(235, 160, 90, 0.45) 0%, transparent 70%);
        }

        .fixture-orb {
          position: relative;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #ffffff 0%, #eee4d5 45%, #7e6c55 100%);
          box-shadow: 0 0 35px rgba(243, 237, 226, 0.45);
          transition: all 0.8s var(--ease-editorial);
        }

        .fixture-hero .fixture-orb {
          width: 46px;
          height: 46px;
        }

        .fixture-flank .fixture-orb {
          width: 32px;
          height: 32px;
        }

        .fixture-depth .fixture-orb {
          width: 28px;
          height: 28px;
        }

        .showroom-cinematic-stage.midnight .fixture-orb {
          background: radial-gradient(circle at 35% 35%, #ffffff 0%, #fae2ca 40%, #9e642e 100%);
          box-shadow: 0 0 45px rgba(230, 145, 75, 0.55);
        }

        .volumetric-haze {
          position: absolute;
          top: 25%;
          left: 25%;
          right: 25%;
          bottom: 15%;
          background: radial-gradient(ellipse at 50% 20%, rgba(243, 237, 226, 0.07) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(28px);
        }

        /* HUD Overlay Bar */
        .stage-hud-bar {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          right: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: space-between;
          align-items: flex-start;
          z-index: 10;
          padding: 0.8rem 1.4rem;
          background: rgba(8, 9, 13, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border-hairline);
        }

        @media (min-width: 768px) {
          .stage-hud-bar {
            flex-direction: row;
            align-items: center;
          }
        }

        .hud-location {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .hud-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--champagne-gold);
          box-shadow: 0 0 6px var(--champagne-gold);
        }

        .hud-text {
          font-family: var(--font-sans);
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--champagne-gold);
        }

        .hud-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hud-label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          color: var(--muted-charcoal, #45413C);
        }

        .hud-mode-btn {
          font-family: var(--font-sans);
          font-size: 0.66rem;
          letter-spacing: 0.16em;
          padding: 0.35rem 0.85rem;
          border: 1px solid rgba(25, 25, 25, 0.15);
          color: var(--muted-charcoal, #45413C);
          background: rgba(250, 249, 245, 0.8);
          transition: var(--transition-fast);
        }

        .hud-mode-btn.active {
          color: #FAF9F5;
          border-color: var(--charcoal, #191919);
          background: var(--charcoal, #191919);
        }

        /* Showroom Metrics */
        .showroom-metrics {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-top: 4rem;
          padding-top: 3.5rem;
          border-top: 1px solid rgba(25, 25, 25, 0.1);
        }

        @media (min-width: 768px) {
          .showroom-metrics {
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
          }
        }

        .metric-cell {
          display: flex;
          flex-direction: column;
        }

        .metric-index {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: var(--champagne-gold, #B89452);
          font-weight: 500;
          margin-bottom: 0.75rem;
        }

        .metric-title {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          color: var(--charcoal, #191919);
          font-weight: 500;
          margin-bottom: 0.65rem;
        }

        .metric-desc {
          font-size: 0.86rem;
          color: var(--muted-charcoal, #45413C);
          line-height: 1.65;
          font-weight: 300;
        }
      `}</style>
    </section>
  )
}
