import React, { useState, useEffect } from 'react'

export default function ExhibitionNav({ onOpenEnquiry, onSwitchToOriginal }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Exhibition', href: '#exhibition-panels' },
    { label: 'Closer Look', href: '#closer-look' },
    { label: 'Editorial Story', href: '#editorial-journey' },
    { label: 'Architectural', href: '#architectural-chapters' },
    { label: 'Festive Salon', href: '#festive-nocturne' },
    { label: 'Contact', href: '#atelier-ending' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`exhibition-nav-bar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand identity */}
        <a href="#exhibition-panels" className="nav-brand" onClick={(e) => handleNavClick(e, '#exhibition-panels')}>
          <span className="brand-primary">PEARL LIGHTING</span>
          <span className="brand-atelier-tag">DIGITAL EXHIBITION</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-wrap" aria-label="Exhibition navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-item-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="nav-actions">
          <button
            type="button"
            className="nav-preview-switch-btn"
            onClick={onSwitchToOriginal}
            title="Compare with original homepage"
          >
            <span className="switch-dot"></span>
            Original Site
          </button>

          <a
            href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20am%20exploring%20your%20digital%20exhibition%20and%20would%20like%20to%20enquire."
            target="_blank"
            rel="noopener noreferrer"
            className="nav-whatsapp-cta"
            aria-label="Contact Pearl Lighting on WhatsApp"
          >
            <span>WhatsApp</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V8h-9" />
            </svg>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`bar ${mobileMenuOpen ? 'bar-1-open' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'bar-2-open' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <nav className="mobile-links-list">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mobile-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <div className="mobile-drawer-bottom">
              <button
                type="button"
                className="mobile-switch-link"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onSwitchToOriginal()
                }}
              >
                Switch to Original Homepage ↗
              </button>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        .exhibition-nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(10, 10, 10, 0.45);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .exhibition-nav-bar.is-scrolled {
          background: rgba(8, 8, 8, 0.88);
          border-bottom-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .nav-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 16px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .nav-brand {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: #FFFFFF;
          transition: opacity 0.2s;
        }

        .nav-brand:hover {
          opacity: 0.9;
        }

        .brand-primary {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #FAF7F2;
        }

        .brand-atelier-tag {
          font-size: 9px;
          letter-spacing: 0.24em;
          color: #B89242;
          font-weight: 600;
          margin-top: 2px;
        }

        .nav-links-wrap {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-item-link {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif);
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          transition: color 0.2s ease;
          position: relative;
          padding: 4px 0;
        }

        .nav-item-link:hover {
          color: #FAF7F2;
        }

        .nav-item-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #B89242;
          transition: width 0.25s ease;
        }

        .nav-item-link:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .nav-preview-switch-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: rgba(255, 255, 255, 0.85);
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .nav-preview-switch-btn:hover {
          background: rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .switch-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34C759;
          box-shadow: 0 0 8px rgba(52, 199, 89, 0.8);
        }

        .nav-whatsapp-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #B89242;
          color: #0A0A0A;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 7px 16px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .nav-whatsapp-cta:hover {
          background: #DFC07A;
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(184, 146, 66, 0.4);
        }

        .mobile-toggle-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 32px;
          height: 32px;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          padding: 4px;
        }

        .mobile-toggle-btn .bar {
          width: 100%;
          height: 2px;
          background: #FFFFFF;
          border-radius: 2px;
          transition: all 0.25s ease;
        }

        .bar-1-open {
          transform: translateY(4px) rotate(45deg);
        }

        .bar-2-open {
          transform: translateY(-4px) rotate(-45deg);
        }

        .mobile-nav-drawer {
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(24px);
          padding: 24px 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .mobile-links-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .mobile-link {
          color: #FAF7F2;
          font-size: 16px;
          text-decoration: none;
          letter-spacing: 0.05em;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .mobile-drawer-bottom {
          margin-top: 16px;
          padding-top: 12px;
        }

        .mobile-switch-link {
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #DFC07A;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 13px;
          width: 100%;
          text-align: center;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .nav-links-wrap {
            display: none;
          }
          .mobile-toggle-btn {
            display: flex;
          }
          .nav-container {
            padding: 14px 20px;
          }
          .nav-preview-switch-btn {
            display: none;
          }
        }
      `}</style>
    </header>
  )
}
