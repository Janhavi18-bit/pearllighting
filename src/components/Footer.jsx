import React from 'react'

/**
 * Editorial Architectural Footer
 * Features official Pearl Lightings brand mark, fast sitemap links, and atelier credits.
 */
export default function Footer() {
  const handleScrollTo = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      const headerEl = document.querySelector('.navbar-root')
      const headerHeight = headerEl ? headerEl.offsetHeight : 76
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: 'smooth',
      })
    }
  }

  return (
    <footer className="editorial-footer-root" aria-label="Pearl Lighting Footer">
      <div className="container footer-inner-container">
        {/* Main Footer Spread */}
        <div className="footer-top-grid">
          {/* Brand Identity Column */}
          <div className="footer-identity-col">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="footer-brand-lockup"
              aria-label="Return to top"
            >
              <img
                src="/images/logo/pearl-lightings-logo.png"
                alt="Pearl Lightings - Parth Enterprises"
                className="footer-logo-mark"
                width="80"
                height="75"
                loading="lazy"
              />
              <div>
                <h3 className="footer-brand-heading">PEARL LIGHTINGS</h3>
                <span className="footer-firm-sub">PARTH ENTERPRISES • MUMBAI</span>
              </div>
            </a>
            <p className="footer-philosophy-quote">
              “Luminaires engineered where optical discipline, material honesty, and sculptural permanence exist in unbroken harmony.”
            </p>
          </div>

          {/* Nav Links Column */}
          <div className="footer-links-col">
            <span className="footer-nav-label">EXHIBITION CHAPTERS</span>
            <ul className="footer-nav-list">
              <li>
                <a href="#hero" onClick={(e) => handleScrollTo(e, '#hero')}>01 • Cinematic Opening</a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleScrollTo(e, '#gallery')}>02 • Visual Gallery</a>
              </li>
              <li>
                <a href="#story" onClick={(e) => handleScrollTo(e, '#story')}>03 • Brand Monograph</a>
              </li>
              <li>
                <a href="#discovery" onClick={(e) => handleScrollTo(e, '#discovery')}>04 • Product Discovery</a>
              </li>
              <li>
                <a href="#architectural" onClick={(e) => handleScrollTo(e, '#architectural')}>05 • Architectural Lighting</a>
              </li>
              <li>
                <a href="#festive" onClick={(e) => handleScrollTo(e, '#festive')}>06 • Celestial Festive Salon</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')}>07 • Studio Liaison & Contact</a>
              </li>
            </ul>
          </div>

          {/* Atelier Touchpoints Column */}
          <div className="footer-links-col">
            <span className="footer-nav-label">ATELIER CONTACT</span>
            <ul className="footer-nav-list">
              <li>
                <a href="tel:+918329045712">+91 83290 45712</a>
              </li>
              <li>
                <a href="https://wa.me/918329045712" target="_blank" rel="noopener noreferrer">WhatsApp Consultation ↗</a>
              </li>
              <li>
                <a href="mailto:pearlleddriver@gmail.com">pearlleddriver@gmail.com</a>
              </li>
              <li>
                <a href="https://www.instagram.com/pearl_llighting/" target="_blank" rel="noopener noreferrer">Instagram @pearl_llighting ↗</a>
              </li>
              <li>
                <span className="footer-addr-snippet">Kalbadevi, Mumbai – 400002</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Horizon Sub-Bar */}
        <div className="footer-bottom-bar">
          <span className="footer-copyright">
            © {new Date().getFullYear()} PEARL LIGHTINGS. ALL RIGHTS RESERVED. UNDER PARTH ENTERPRISES, MUMBAI.
          </span>
          <div className="footer-credits-tag">
            <span>ARCHITECTURAL & DECORATIVE ILLUMINATION ATELIER</span>
          </div>
        </div>
      </div>

      <style>{`
        .editorial-footer-root {
          background: #141210;
          color: #FAF8F5;
          padding: 5rem 0 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          padding-bottom: 4rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (min-width: 768px) {
          .footer-top-grid {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 4rem;
          }
        }

        .footer-identity-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-brand-lockup {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .footer-logo-mark {
          width: 54px;
          height: auto;
          object-fit: contain;
        }

        .footer-brand-heading {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: #FAF8F5;
        }

        .footer-firm-sub {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--gold-champagne);
          font-weight: 600;
          letter-spacing: 0.16em;
        }

        .footer-philosophy-quote {
          font-size: 0.88rem;
          line-height: 1.65;
          color: var(--text-secondary-light);
          font-weight: 300;
          max-width: 380px;
        }

        /* Links col */
        .footer-links-col {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-nav-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: var(--gold-champagne);
          text-transform: uppercase;
        }

        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-nav-list a {
          font-size: 0.88rem;
          color: var(--text-secondary-light);
          transition: color 0.25s ease;
        }

        .footer-nav-list a:hover {
          color: var(--gold-champagne);
        }

        .footer-addr-snippet {
          font-size: 0.82rem;
          color: var(--text-muted-light);
        }

        /* Bottom Bar */
        .footer-bottom-bar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
          justify-content: space-between;
          padding-top: 2rem;
          font-family: var(--font-mono);
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: var(--text-muted-light);
        }

        @media (min-width: 768px) {
          .footer-bottom-bar {
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </footer>
  )
}
