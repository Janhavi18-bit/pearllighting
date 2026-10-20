import React from 'react'

/**
 * EnquiryBanner - Section 08: Final Showroom Conversion Space
 * Conforms to exact specifications:
 * - Large typography:
 *   LET'S LIGHT
 *   YOUR SPACE.
 * - Subtext: "Tell us about your lighting requirement."
 * - CTA: START AN ENQUIRY → (scrolls smoothly into Section 09 Contact)
 * - Warm ivory / soft beige architectural environment.
 * - Feels like the final room of a luxury lighting showroom.
 */
export default function EnquiryBanner() {
  const handleStartEnquiry = (e) => {
    e.preventDefault()
    const contactElem = document.querySelector('#contact')
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' })
      const firstInput = contactElem.querySelector('input')
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 600)
      }
    }
  }

  return (
    <section className="enquiry-banner-root" aria-label="Let's Light Your Space">
      {/* Subtle Warm Horizon Ambient Halo */}
      <div className="enquiry-ambient-halo" aria-hidden="true"></div>

      <div className="container enquiry-banner-container">
        <span className="eyebrow enquiry-banner-eyebrow">FINAL CONVERSATION</span>

        <h2 className="enquiry-banner-headline">
          LET'S LIGHT<br />YOUR SPACE.
        </h2>

        <p className="enquiry-banner-subtext">
          Tell us about your lighting requirement.
        </p>

        <div className="enquiry-banner-cta-wrap">
          <a
            href="#contact"
            className="btn-primary enquiry-banner-cta"
            onClick={handleStartEnquiry}
            aria-label="Start an Enquiry"
          >
            <span>START AN ENQUIRY</span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <div className="enquiry-banner-meta">
          <span className="meta-item">ARCHITECTURAL SPECIFICATIONS</span>
          <span className="meta-sep">•</span>
          <span className="meta-item">PROJECT COMMISSIONS</span>
          <span className="meta-sep">•</span>
          <span className="meta-item">PARTH ENTERPRISES</span>
        </div>
      </div>

      <style>{`
        .enquiry-banner-root {
          position: relative;
          padding: 9rem 0 8.5rem;
          background: linear-gradient(180deg, var(--bg-primary, #F7F4ED) 0%, var(--bg-secondary, #EFE9DE) 65%, #FAF8F3 100%);
          border-top: 1px solid rgba(120, 100, 70, 0.16);
          overflow: hidden;
          text-align: center;
          width: 100%;
        }

        @media (min-width: 1024px) {
          .enquiry-banner-root {
            padding: 12rem 0 11rem;
          }
        }

        .enquiry-ambient-halo {
          position: absolute;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 650px;
          height: 380px;
          background: radial-gradient(ellipse at center, rgba(198, 154, 82, 0.12) 0%, rgba(247, 244, 237, 0) 70%);
          pointer-events: none;
        }

        .enquiry-banner-container {
          max-width: 980px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 2;
        }

        .enquiry-banner-eyebrow {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--accent-gold, #C69A52);
          margin-bottom: 2rem;
        }

        .enquiry-banner-headline {
          font-family: var(--font-serif);
          font-size: clamp(3rem, 7.5vw, 6.2rem);
          font-weight: 300;
          letter-spacing: 0.04em;
          line-height: 1.02;
          color: var(--charcoal, #171717);
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .enquiry-banner-subtext {
          font-family: var(--font-serif);
          font-size: clamp(1.15rem, 1.8vw, 1.45rem);
          font-style: italic;
          font-weight: 300;
          color: var(--secondary-text, #5E5A53);
          margin-bottom: 3.5rem;
        }

        .enquiry-banner-cta-wrap {
          display: flex;
          justify-content: center;
          margin-bottom: 4rem;
        }

        .enquiry-banner-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--charcoal, #171717);
          color: #FAF9F5;
          padding: 1.25rem 2.75rem;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 500;
          border: 1px solid rgba(198, 154, 82, 0.35);
          border-radius: 2px;
          text-decoration: none;
          box-shadow: 0 12px 32px rgba(23, 23, 23, 0.12);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .enquiry-banner-cta:hover {
          background: #000000;
          border-color: var(--accent-gold, #C69A52);
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(198, 154, 82, 0.2);
        }

        .enquiry-banner-cta .arrow {
          transition: transform 0.3s ease;
          color: var(--accent-gold, #C69A52);
        }

        .enquiry-banner-cta:hover .arrow {
          transform: translateX(5px);
        }

        .enquiry-banner-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          font-family: var(--font-mono, monospace);
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          color: var(--secondary-text, #5E5A53);
          text-transform: uppercase;
        }

        .meta-sep {
          color: var(--accent-gold, #C69A52);
        }

        @media (max-width: 768px) {
          .enquiry-banner-root {
            padding: 6.5rem 0 6rem;
          }
          .enquiry-banner-container {
            padding: 0 1.25rem;
          }
          .enquiry-banner-cta {
            width: 100%;
            justify-content: center;
            padding: 1.15rem 1.75rem;
          }
        }
      `}</style>
    </section>
  )
}
