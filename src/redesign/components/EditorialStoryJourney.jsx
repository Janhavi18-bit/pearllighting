import React from 'react'

export default function EditorialStoryJourney() {
  return (
    <section className="editorial-journey-section" id="editorial-journey" aria-label="Pearl Lighting Editorial Narrative">
      {/* ── SCENE 1: THE SCULPTURAL PHILOSOPHY (Asymmetric Warm Ivory Composition) ── */}
      <div className="story-scene-one">
        <div className="scene-one-container">
          {/* Asymmetric left visual block: Staggered architectural crops */}
          <div className="scene-one-visual-duo">
            <div className="heroic-portrait-frame">
              <img
                src="/images/products/curve-cob-rose-gold.png"
                alt="Pearl Lighting Curve COB Rose Gold craft detail"
                className="story-portrait-img"
              />
              <span className="craft-badge">PARTH ENTERPRISES • ATELIER</span>
            </div>
            <div className="staggered-offset-frame">
              <img
                src="/images/products/moveable-cob-detail.png"
                alt="Moveable COB tilt mechanism detail"
                className="story-offset-img"
              />
              <span className="offset-caption">Gimbal articulation detail</span>
            </div>
          </div>

          {/* Right text composition: Editorial manifesto */}
          <div className="scene-one-editorial-block">
            <div className="story-kicker">
              <span className="kicker-num">03</span>
              <span className="kicker-line"></span>
              <span className="kicker-title">THE PEARL LIGHTING MONOGRAPH</span>
            </div>

            <blockquote className="editorial-manifesto-quote">
              “Light should never announce itself. It must sculpt volume, honor materials, and quiet the room.”
            </blockquote>

            <p className="editorial-lead-para">
              Founded in Mumbai, Pearl Lighting was born from an architectural conviction: that modern illumination had become flat, glaring, and disposable. We set out to build luminaires that treat light as a physical material.
            </p>

            <p className="editorial-secondary-para">
              Every curve cob baffle, recessed darklight cone, and silicone ribbon is engineered in our Dhobi Talao atelier to deliver deep visual comfort — high color fidelity (CRI 95+), zero flicker, and optical shielding that keeps diodes unseen.
            </p>

            <div className="story-origin-stamp">
              <div className="stamp-item">
                <span className="stamp-val">MUMBAI</span>
                <span className="stamp-lbl">Design & Atelier</span>
              </div>
              <div className="stamp-divider">/</div>
              <div className="stamp-item">
                <span className="stamp-val">CRI 95+</span>
                <span className="stamp-lbl">Color Fidelity</span>
              </div>
              <div className="stamp-divider">/</div>
              <div className="stamp-item">
                <span className="stamp-val">50,000h</span>
                <span className="stamp-lbl">Optical Lifespan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCENE 2: MATERIAL ANATOMY (Dark Bronze Panoramic Band) ── */}
      <div className="story-scene-two">
        <div className="scene-two-container">
          <div className="scene-two-header">
            <span className="scene-two-eyebrow">THE CRAFT OF ILLUMINATION</span>
            <h3 className="scene-two-title">Raw metals. Engineered glass. Pure warmth.</h3>
          </div>

          {/* Wide asymmetric horizontal panoramic layout */}
          <div className="panoramic-material-spread">
            <div className="panoramic-image-wrap">
              <img
                src="/images/products/rope-light-primary-warm.png"
                alt="Continuous warm architectural illumination"
                className="panoramic-luminaire-img"
              />
              <div className="panoramic-gradient-overlay"></div>
              <div className="panoramic-floating-tag">
                <span>Homogeneous 2700K phosphor diffusion</span>
              </div>
            </div>

            <div className="material-spec-cards-rail">
              <div className="material-pill-item">
                <span className="mat-index">01</span>
                <h4 className="mat-name">Aviation Aluminium 6063</h4>
                <p className="mat-detail">
                  Radial cooling structures die-cast and CNC machined to pull thermal loads away from sensitive LED chips.
                </p>
              </div>

              <div className="material-pill-item">
                <span className="mat-index">02</span>
                <h4 className="mat-name">Specularity & Shielding</h4>
                <p className="mat-detail">
                  Physical cutoff angles exceeding 40° guarantee dark ceilings with zero glare spill into the eye.
                </p>
              </div>

              <div className="material-pill-item">
                <span className="mat-index">03</span>
                <h4 className="mat-name">Optical Grade Silicone</h4>
                <p className="mat-detail">
                  High-transmittance silicone encapsulation that never yellows, cracks, or loses weather resistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCENE 3: ARCHITECTURAL INTEGRATION (Quiet Ivory Finale) ── */}
      <div className="story-scene-three">
        <div className="scene-three-container">
          <div className="scene-three-grid">
            <div className="scene-three-narrative">
              <span className="three-kicker">COLLABORATING WITH ARCHITECTS</span>
              <h3 className="three-title">A tailored lighting dialogue for visionary homes.</h3>
              <p className="three-body">
                We believe standard catalogs fail extraordinary spaces. When an architect specifies Pearl Lighting, we provide customized driver sizing, beam angle tuning, and sample luminaires directly to project sites across India.
              </p>
              <div className="consult-atelier-link-wrap">
                <a
                  href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20am%20an%20architect%20looking%20to%20discuss%20a%20project%20lighting%20specification."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="story-cta-link"
                >
                  <span>Connect with our studio lighting engineer</span>
                  <span className="arrow-sym">↗</span>
                </a>
              </div>
            </div>

            <div className="scene-three-visual">
              <img
                src="/images/products/deep-downlight-duo.png"
                alt="Pearl Lighting architectural downlight duo in studio"
                className="three-luminaire-img"
              />
              <div className="three-image-caption">
                <span>Pearl Deep Downlight • Round & Square architectural fixtures</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .editorial-journey-section {
          position: relative;
          width: 100%;
        }

        /* ── SCENE 1: Warm Ivory Editorial ── */
        .story-scene-one {
          background-color: #F8F5EE;
          color: #181614;
          padding: 120px 40px;
          border-top: 1px solid rgba(24, 22, 20, 0.08);
        }

        .scene-one-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .scene-one-visual-duo {
          position: relative;
          display: flex;
          align-items: flex-end;
          gap: 24px;
        }

        .heroic-portrait-frame {
          position: relative;
          flex: 1.2;
          background: #0E0D0C;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 3 / 4;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .story-portrait-img {
          width: 90%;
          height: 90%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }

        .heroic-portrait-frame:hover .story-portrait-img {
          transform: scale(1.04);
        }

        .craft-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(14, 13, 12, 0.85);
          backdrop-filter: blur(8px);
          color: #DFC07A;
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.16em;
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid rgba(223, 192, 122, 0.3);
        }

        .staggered-offset-frame {
          position: relative;
          flex: 0.9;
          background: #EBE5D8;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 1 / 1;
          margin-bottom: 40px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .story-offset-img {
          width: 85%;
          height: 85%;
          object-fit: contain;
        }

        .offset-caption {
          position: absolute;
          bottom: 14px;
          left: 14px;
          font-size: 11px;
          color: #655F55;
          font-family: var(--font-mono, monospace);
        }

        .scene-one-editorial-block {
          padding-left: 20px;
        }

        .story-kicker {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .kicker-num {
          font-family: var(--font-mono, monospace);
          font-size: 12px;
          color: #B89242;
          font-weight: 600;
        }

        .kicker-line {
          width: 32px;
          height: 1px;
          background: #B89242;
        }

        .kicker-title {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #7A7366;
          text-transform: uppercase;
        }

        .editorial-manifesto-quote {
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(30px, 3.2vw, 44px);
          font-style: italic;
          line-height: 1.25;
          color: #161513;
          margin-bottom: 28px;
          border-left: 2px solid #B89242;
          padding-left: 24px;
        }

        .editorial-lead-para {
          font-size: 17px;
          line-height: 1.7;
          color: #38342E;
          margin-bottom: 18px;
          font-weight: 400;
        }

        .editorial-secondary-para {
          font-size: 15px;
          line-height: 1.7;
          color: #686155;
          margin-bottom: 36px;
          font-weight: 300;
        }

        .story-origin-stamp {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(24, 22, 20, 0.12);
        }

        .stamp-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stamp-val {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 20px;
          font-weight: 600;
          color: #181614;
        }

        .stamp-lbl {
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #8C8373;
          text-transform: uppercase;
        }

        .stamp-divider {
          color: rgba(24, 22, 20, 0.2);
          font-size: 20px;
        }

        /* ── SCENE 2: Dark Bronze Band ── */
        .story-scene-two {
          background-color: #11100E;
          color: #FAF7F2;
          padding: 110px 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .scene-two-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .scene-two-header {
          margin-bottom: 50px;
        }

        .scene-two-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #DFC07A;
          display: block;
          margin-bottom: 12px;
        }

        .scene-two-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(32px, 3.6vw, 48px);
          font-weight: 400;
          color: #FAF7F2;
          letter-spacing: -0.01em;
        }

        .panoramic-material-spread {
          display: grid;
          grid-template-columns: 1.4fr 0.9fr;
          gap: 40px;
          align-items: center;
        }

        .panoramic-image-wrap {
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

        .panoramic-luminaire-img {
          width: 85%;
          height: 85%;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9));
        }

        .panoramic-gradient-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(223, 192, 122, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .panoramic-floating-tag {
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

        .material-spec-cards-rail {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .material-pill-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          padding: 24px;
          transition: border-color 0.3s ease;
        }

        .material-pill-item:hover {
          border-color: rgba(223, 192, 122, 0.3);
        }

        .mat-index {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #DFC07A;
          display: block;
          margin-bottom: 8px;
        }

        .mat-name {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 18px;
          font-weight: 500;
          color: #FAF7F2;
          margin-bottom: 6px;
        }

        .mat-detail {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
          font-weight: 300;
        }

        /* ── SCENE 3: Quiet Ivory Finale ── */
        .story-scene-three {
          background-color: #FAF8F5;
          color: #181614;
          padding: 110px 40px;
        }

        .scene-three-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .scene-three-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .three-kicker {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #B89242;
          display: block;
          margin-bottom: 16px;
        }

        .three-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(32px, 3.4vw, 46px);
          font-weight: 400;
          line-height: 1.2;
          color: #181614;
          margin-bottom: 22px;
          letter-spacing: -0.01em;
        }

        .three-body {
          font-size: 16px;
          line-height: 1.7;
          color: #555047;
          margin-bottom: 32px;
          font-weight: 300;
        }

        .consult-atelier-link-wrap {
          display: inline-block;
        }

        .story-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #181614;
          text-decoration: none;
          border-bottom: 1.5px solid #B89242;
          padding-bottom: 4px;
          transition: all 0.2s ease;
        }

        .story-cta-link:hover {
          color: #B89242;
          border-bottom-color: #181614;
        }

        .arrow-sym {
          transition: transform 0.2s ease;
        }

        .story-cta-link:hover .arrow-sym {
          transform: translate(2px, -2px);
        }

        .scene-three-visual {
          position: relative;
          background: #FFFFFF;
          border-radius: 28px;
          padding: 36px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(24, 22, 20, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .three-luminaire-img {
          width: 85%;
          max-height: 380px;
          object-fit: contain;
        }

        .three-image-caption {
          margin-top: 20px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #8C8373;
          letter-spacing: 0.1em;
        }

        @media (max-width: 992px) {
          .scene-one-container,
          .scene-three-grid,
          .panoramic-material-spread {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .scene-one-editorial-block {
            padding-left: 0;
          }

          .panoramic-image-wrap {
            min-height: 320px;
          }
        }

        @media (max-width: 600px) {
          .story-scene-one,
          .story-scene-two,
          .story-scene-three {
            padding: 70px 20px;
          }

          .scene-one-visual-duo {
            flex-direction: column;
          }

          .heroic-portrait-frame {
            aspect-ratio: 1 / 1;
            width: 100%;
          }

          .staggered-offset-frame {
            display: none;
          }

          .story-origin-stamp {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .stamp-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
