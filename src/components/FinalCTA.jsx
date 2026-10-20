import React from 'react'

export default function FinalCTA() {
  const handleScrollToCollection = (e) => {
    e.preventDefault()
    const target = document.querySelector('#collection')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="cta-root" aria-label="Final Invitation">
      {/* Subtle Warm Pearl Horizon Glow */}
      <div className="cta-soft-glow" aria-hidden="true"></div>

      <div className="container cta-container">
        <span className="eyebrow cta-eyebrow">THE NEXT CHAPTER</span>

        <h2 className="cta-headline">
          LET THERE<br />BE LIGHT.
        </h2>

        <p className="cta-subheading">
          "Discover the Pearl Lighting collection."
        </p>

        <div className="cta-btn-wrap">
          <a
            href="#collection"
            className="btn-primary cta-action-btn"
            onClick={handleScrollToCollection}
            aria-label="Explore the Collection"
          >
            <span>EXPLORE COLLECTION</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <p className="cta-footnote">
          Private atelier appointments and architectural commissions available worldwide.
        </p>
      </div>

      <style>{`
        .cta-root {
          position: relative;
          padding: 10rem 0 9rem;
          background: linear-gradient(180deg, var(--bg-primary, #F7F4ED) 0%, var(--bg-secondary, #EFE9DE) 50%, #24221F 100%);
          border-top: 1px solid rgba(120, 100, 70, 0.18);
          overflow: hidden;
          text-align: center;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .cta-root {
            padding: 12rem 0 11rem;
          }
        }

        .cta-soft-glow {
          position: absolute;
          bottom: -180px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(198, 154, 82, 0.18) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        .cta-container {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cta-eyebrow {
          margin-bottom: 2rem;
          color: var(--champagne-gold, #B89452);
        }

        .cta-headline {
          font-family: var(--font-serif);
          font-size: clamp(3rem, 7.5vw, 6.2rem);
          font-weight: 300;
          letter-spacing: 0.06em;
          line-height: 1.05;
          color: var(--charcoal, #191919);
          text-transform: uppercase;
          margin-bottom: 2.25rem;
        }

        .cta-subheading {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          color: var(--muted-charcoal, #45413C);
          font-weight: 300;
          margin-bottom: 3.5rem;
          max-width: 480px;
          line-height: 1.6;
        }

        .cta-btn-wrap {
          margin-bottom: 2.75rem;
        }

        .cta-action-btn {
          padding: 1.1rem 2.8rem;
          font-size: 0.8rem;
          letter-spacing: 0.22em;
          background: var(--charcoal, #191919);
          color: var(--soft-ivory, #FAF9F5);
          border: 1px solid var(--charcoal, #191919);
        }

        .cta-action-btn:hover {
          background: var(--champagne-gold, #B89452);
          border-color: var(--champagne-gold, #B89452);
          color: #FAF9F5;
        }

        .cta-action-btn .arrow {
          display: inline-block;
          font-size: 0.95rem;
          color: var(--champagne-gold, #B89452);
          transition: transform 0.35s var(--ease-editorial);
        }

        .cta-action-btn:hover .arrow {
          color: #FAF9F5;
          transform: translateX(6px);
        }

        .cta-footnote {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #A39E96;
          font-weight: 400;
          max-width: 460px;
          line-height: 1.6;
        }
      `}</style>
    </section>
  )
}
