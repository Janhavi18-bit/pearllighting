import React from 'react'

export default function IntroSection() {
  return (
    <section className="intro-root" id="about" aria-label="Pearl Lighting Introduction">
      <div className="container">
        <div className="intro-layout">
          {/* Subtle Vertical Label */}
          <div className="intro-meta-rail">
            <span className="eyebrow intro-eyebrow">ESSENCE</span>
            <div className="intro-hairline"></div>
          </div>

          {/* Editorial Content */}
          <div className="intro-main">
            <h2 className="intro-headline">
              MORE THAN<br />ILLUMINATION.
            </h2>

            <p className="intro-lead-statement">
              "Pearl Lighting brings together form, material and light to create spaces that feel different."
            </p>

            <div className="intro-principles">
              <div className="principle-item">
                <span className="principle-index">01</span>
                <h3 className="principle-title">Spatial Proportions</h3>
                <p className="principle-text">
                  Conceived to integrate with vertical volumes, ceiling planes, and the natural rhythm of architectural geometry.
                </p>
              </div>

              <div className="principle-item">
                <span className="principle-index">02</span>
                <h3 className="principle-title">Noble Materials</h3>
                <p className="principle-text">
                  Unlacquered solid brass, spun champagne alloys, and hand-blown triplex glass that quietly patinas across generations.
                </p>
              </div>

              <div className="principle-item">
                <span className="principle-index">03</span>
                <h3 className="principle-title">Restorative Light</h3>
                <p className="principle-text">
                  Diffuse full-spectrum warmth engineered to soften shadows and foster deep psychological serenity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .intro-root {
          position: relative;
          padding: 9rem 0;
          background-color: var(--bg-deep);
          border-top: 1px solid var(--border-hairline);
          width: 100%;
        }

        @media (min-width: 1024px) {
          .intro-root {
            padding: 12rem 0;
          }
        }

        .intro-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }

        @media (min-width: 900px) {
          .intro-layout {
            grid-template-columns: 160px 1fr;
            gap: 4.5rem;
          }
        }

        .intro-meta-rail {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .intro-eyebrow {
          letter-spacing: 0.35em;
          color: var(--champagne-gold);
        }

        .intro-hairline {
          width: 36px;
          height: 1px;
          background: var(--champagne-muted);
          opacity: 0.35;
          margin-top: 1rem;
        }

        .intro-main {
          display: flex;
          flex-direction: column;
          max-width: 980px;
        }

        .intro-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.8rem, 6.8vw, 5.5rem);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: 0.04em;
          color: var(--pearl-100);
          text-transform: uppercase;
          margin-bottom: 3.5rem;
        }

        .intro-lead-statement {
          font-family: var(--font-serif);
          font-size: clamp(1.4rem, 2.4vw, 2.15rem);
          font-weight: 300;
          font-style: italic;
          line-height: 1.45;
          color: var(--pearl-200);
          max-width: 820px;
          margin-bottom: 5.5rem;
        }

        /* 3 Editorial Horizontal Principles */
        .intro-principles {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          border-top: 1px solid var(--border-hairline);
          padding-top: 4rem;
        }

        @media (min-width: 768px) {
          .intro-principles {
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5rem;
          }
        }

        .principle-item {
          display: flex;
          flex-direction: column;
        }

        .principle-index {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--champagne-muted);
          margin-bottom: 0.85rem;
          font-weight: 500;
        }

        .principle-title {
          font-family: var(--font-sans);
          font-size: 0.96rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--pearl-100);
          margin-bottom: 0.75rem;
        }

        .principle-text {
          font-size: 0.88rem;
          line-height: 1.68;
          color: var(--text-secondary);
          font-weight: 300;
        }
      `}</style>
    </section>
  )
}
