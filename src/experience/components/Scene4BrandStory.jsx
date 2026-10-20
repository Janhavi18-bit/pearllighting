import React from 'react'

export default function Scene4BrandStory() {
  return (
    <section className="scene4-story-root" id="scene-story" aria-label="Scene 4 — Brand Story">
      {/* ── PART 1: SCULPTURAL CONVICTION (Asymmetric Warm Ivory Spread) ── */}
      <div className="story-part-one">
        <div className="story-container">
          <div className="story-asymmetric-duo">
            {/* Left: Overlapping physical craftsmanship frames */}
            <div className="story-craft-composition">
              <div className="craft-heroic-crop">
                <img
                  src="/images/products/curve-cob-rose-gold.png"
                  alt="Pearl Lighting physical craftsmanship in extruded rose gold"
                  className="craft-main-img"
                />
                <span className="craft-corner-tag">DHOBI TALAO ATELIER • MUMBAI</span>
              </div>
              <div className="craft-offset-crop">
                <img
                  src="/images/products/moveable-cob-detail.png"
                  alt="Detail mechanism of moveable gimbal luminaire"
                  className="craft-secondary-img"
                />
                <span className="offset-sub">Gimbal friction hinge</span>
              </div>
            </div>

            {/* Right: Editorial Manifesto & Atelier Identity */}
            <div className="story-editorial-copy">
              <div className="story-kicker-rail">
                <span className="kicker-num">04</span>
                <span className="kicker-rule"></span>
                <span className="kicker-text">THE PEARL LIGHTING MANIFESTO</span>
              </div>

              <blockquote className="story-quote">
                “Light is not an appliance. It is the invisible architecture that governs how space is felt.”
              </blockquote>

              <p className="story-lead-p">
                Born in Mumbai under Parth Enterprises, Pearl Lighting was founded on an architectural belief: modern lighting had surrendered to harsh commercial glare and plastic disposability. We set out to build luminaires that honor tactile architecture.
              </p>

              <p className="story-secondary-p">
                Every curve COB baffle, recessed darklight cone, and silicone ribbon is engineered in our Kalbadevi workshop to deliver deep visual comfort — high color fidelity (CRI 95+), zero flicker, and optical cutoff angles that keep diodes unseen.
              </p>

              <div className="story-metrics-dock">
                <div className="metric-cell">
                  <span className="cell-num">MUMBAI</span>
                  <span className="cell-label">Atelier Origin</span>
                </div>
                <div className="cell-sep">/</div>
                <div className="metric-cell">
                  <span className="cell-num">CRI 95+</span>
                  <span className="cell-label">Color Fidelity</span>
                </div>
                <div className="cell-sep">/</div>
                <div className="metric-cell">
                  <span className="cell-num">50,000h</span>
                  <span className="cell-label">Optical Life</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PART 2: MATERIAL ANATOMY (Architectural Charcoal Contrast Band) ── */}
      <div className="story-part-two">
        <div className="story-container">
          <div className="part-two-header">
            <span className="part-two-eyebrow">THE METALLURGY OF QUIET LIGHT</span>
            <h3 className="part-two-title">Raw metals. Engineered glass. Pure warmth.</h3>
          </div>

          <div className="panoramic-material-layout">
            <div className="panoramic-luminaire-frame">
              <img
                src="/images/products/rope-light-primary-warm.png"
                alt="Continuous warm architectural illumination"
                className="panoramic-img"
              />
              <div className="panoramic-caption-tag">
                <span>Homogeneous 2700K phosphor diffusion</span>
              </div>
            </div>

            <div className="material-narrative-stack">
              <div className="material-story-item">
                <span className="item-idx">01</span>
                <h4 className="item-title">Aviation Aluminium 6063-T6</h4>
                <p className="item-desc">
                  Extruded and CNC-machined radial fins pull thermal loads away from phosphor dies, preserving color temperature stability for decades.
                </p>
              </div>

              <div className="material-story-item">
                <span className="item-idx">02</span>
                <h4 className="item-title">Specularity & 40° Cutoff</h4>
                <p className="item-desc">
                  Physical cutoff angles exceeding 40° ensure the ceiling plane remains quiet and glare-free from typical standing sightlines.
                </p>
              </div>

              <div className="material-story-item">
                <span className="item-idx">03</span>
                <h4 className="item-title">Optical Grade Silicone</h4>
                <p className="item-desc">
                  High-transmittance silicone encapsulation that never yellows, cracks, or loses ingress protection in coastal humidity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PART 3: ARCHITECTURAL DIALOGUE (Clean Ivory Finale) ── */}
      <div className="story-part-three">
        <div className="story-container">
          <div className="part-three-split">
            <div className="part-three-text">
              <span className="part-three-kicker">COLLABORATING WITH ARCHITECTS</span>
              <h3 className="part-three-heading">A tailored lighting dialogue for visionary homes.</h3>
              <p className="part-three-body">
                We believe standard catalogs fail extraordinary spaces. When an architect specifies Pearl Lighting, we provide customized driver sizing, beam angle tuning, and physical mockups directly to project sites across India.
              </p>
              <a
                href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20am%20an%20architect%20looking%20to%20discuss%20a%20lighting%20schedule%20for%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="part-three-link"
              >
                <span>Connect with our studio lighting engineer</span>
                <span className="arrow-glyph">↗</span>
              </a>
            </div>

            <div className="part-three-visual">
              <img
                src="/images/products/deep-downlight-duo.png"
                alt="Pearl Lighting architectural downlight duo in studio"
                className="part-three-img"
              />
              <span className="part-three-caption">
                Pearl Deep Downlight • Round & Square architectural geometries
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scene4-story-root {
          position: relative;
          width: 100%;
        }

        /* ── Part 1: Warm Ivory ── */
        .story-part-one {
          background-color: #F8F5EE;
          color: #161513;
          padding: 120px 40px;
          border-bottom: 1px solid rgba(22, 21, 19, 0.08);
        }

        .story-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        .story-asymmetric-duo {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .story-craft-composition {
          position: relative;
          display: flex;
          align-items: flex-end;
          gap: 20px;
        }

        .craft-heroic-crop {
          flex: 1.25;
          position: relative;
          background: #0E0D0C;
          border-radius: 26px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .craft-main-img {
          width: 90%;
          height: 90%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }

        .craft-heroic-crop:hover .craft-main-img {
          transform: scale(1.04);
        }

        .craft-corner-tag {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(14, 13, 12, 0.85);
          backdrop-filter: blur(8px);
          color: #DFC07A;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.14em;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(223, 192, 122, 0.3);
        }

        .craft-offset-crop {
          flex: 0.85;
          position: relative;
          background: #EBE5D8;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          margin-bottom: 36px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
        }

        .craft-secondary-img {
          width: 85%;
          height: 85%;
          object-fit: contain;
        }

        .offset-sub {
          position: absolute;
          bottom: 12px;
          left: 12px;
          font-size: 11px;
          color: #655F55;
          font-family: var(--font-mono, monospace);
        }

        /* Editorial Copy */
        .story-editorial-copy {
          padding-left: 16px;
        }

        .story-kicker-rail {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .kicker-num {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #B89242;
          font-weight: 600;
        }

        .kicker-rule {
          width: 32px;
          height: 1px;
          background: #B89242;
        }

        .kicker-text {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #7A7366;
        }

        .story-quote {
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(30px, 3.2vw, 44px);
          font-style: italic;
          line-height: 1.25;
          color: #161513;
          margin-bottom: 28px;
          border-left: 2px solid #B89242;
          padding-left: 24px;
        }

        .story-lead-p {
          font-size: 16.5px;
          line-height: 1.7;
          color: #38342E;
          margin-bottom: 18px;
          font-weight: 400;
        }

        .story-secondary-p {
          font-size: 15px;
          line-height: 1.7;
          color: #686155;
          margin-bottom: 36px;
          font-weight: 300;
        }

        .story-metrics-dock {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(22, 21, 19, 0.12);
        }

        .metric-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cell-num {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 20px;
          font-weight: 600;
          color: #161513;
        }

        .cell-label {
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #8C8373;
          text-transform: uppercase;
        }

        .cell-sep {
          color: rgba(22, 21, 19, 0.2);
          font-size: 20px;
        }

        /* ── Part 2: Dark Charcoal Band ── */
        .story-part-two {
          background-color: #11100E;
          color: #FAF7F2;
          padding: 110px 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .part-two-header {
          margin-bottom: 50px;
        }

        .part-two-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #DFC07A;
          display: block;
          margin-bottom: 12px;
        }

        .part-two-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(32px, 3.6vw, 48px);
          font-weight: 400;
          color: #FAF7F2;
          letter-spacing: -0.01em;
        }

        .panoramic-material-layout {
          display: grid;
          grid-template-columns: 1.3fr 0.9fr;
          gap: 50px;
          align-items: center;
        }

        .panoramic-luminaire-frame {
          position: relative;
          background: #080807;
          border-radius: 28px;
          overflow: hidden;
          min-height: 440px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .panoramic-img {
          width: 85%;
          height: 85%;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9));
        }

        .panoramic-caption-tag {
          position: absolute;
          bottom: 24px;
          left: 28px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          padding: 8px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #DFC07A;
          letter-spacing: 0.08em;
        }

        .material-narrative-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .material-story-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          padding: 24px;
          transition: border-color 0.3s ease;
        }

        .material-story-item:hover {
          border-color: rgba(223, 192, 122, 0.35);
        }

        .item-idx {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #DFC07A;
          display: block;
          margin-bottom: 8px;
        }

        .item-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 18px;
          font-weight: 500;
          color: #FAF7F2;
          margin-bottom: 6px;
        }

        .item-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(250, 247, 242, 0.65);
          font-weight: 300;
        }

        /* ── Part 3: Clean Ivory ── */
        .story-part-three {
          background-color: #FAF8F5;
          color: #161513;
          padding: 110px 40px;
          border-bottom: 1px solid rgba(22, 21, 19, 0.08);
        }

        .part-three-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .part-three-kicker {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #B89242;
          display: block;
          margin-bottom: 16px;
        }

        .part-three-heading {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(32px, 3.4vw, 46px);
          font-weight: 400;
          line-height: 1.2;
          color: #161513;
          margin-bottom: 22px;
          letter-spacing: -0.01em;
        }

        .part-three-body {
          font-size: 16px;
          line-height: 1.7;
          color: #555047;
          margin-bottom: 32px;
          font-weight: 300;
        }

        .part-three-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #161513;
          text-decoration: none;
          border-bottom: 1.5px solid #B89242;
          padding-bottom: 4px;
          transition: all 0.2s ease;
        }

        .part-three-link:hover {
          color: #B89242;
          border-bottom-color: #161513;
        }

        .arrow-glyph {
          transition: transform 0.2s ease;
        }

        .part-three-link:hover .arrow-glyph {
          transform: translate(2px, -2px);
        }

        .part-three-visual {
          position: relative;
          background: #FFFFFF;
          border-radius: 28px;
          padding: 36px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(22, 21, 19, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .part-three-img {
          width: 85%;
          max-height: 380px;
          object-fit: contain;
        }

        .part-three-caption {
          margin-top: 20px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #8C8373;
          letter-spacing: 0.1em;
        }

        @media (max-width: 992px) {
          .story-asymmetric-duo,
          .panoramic-material-layout,
          .part-three-split {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .story-editorial-copy {
            padding-left: 0;
          }
          .panoramic-luminaire-frame {
            min-height: 320px;
          }
        }

        @media (max-width: 600px) {
          .story-part-one,
          .story-part-two,
          .story-part-three {
            padding: 70px 20px;
          }
          .story-craft-composition {
            flex-direction: column;
          }
          .craft-heroic-crop {
            aspect-ratio: 1 / 1;
            width: 100%;
          }
          .craft-offset-crop {
            display: none;
          }
          .story-metrics-dock {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .cell-sep {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
