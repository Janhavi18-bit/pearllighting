import React, { useState, useEffect } from 'react'

export default function ExperienceNav({ onSwitchToOriginal }) {
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
    { label: 'Overview', href: '#scene-opening' },
    { label: 'Gallery', href: '#scene-gallery' },
    { label: 'Spotlight', href: '#scene-spotlight' },
    { label: 'Story', href: '#scene-story' },
    { label: 'Architectural', href: '#scene-architectural' },
    { label: 'Festive', href: '#scene-festive' },
    { label: 'Atelier', href: '#scene-finale' },
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
    <header className={`exp-nav-bar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="exp-nav-inner">
        {/* Brand identity */}
        <a href="#scene-opening" className="exp-brand" onClick={(e) => handleNavClick(e, '#scene-opening')}>
          <span className="exp-brand-name">PEARL LIGHTING</span>
          <span className="exp-brand-sub">MUMBAI ATELIER • EST. 2026</span>
        </a>

        {/* Desktop Links */}
        <nav className="exp-links" aria-label="Experience navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="exp-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="exp-actions">
          {onSwitchToOriginal && (
            <button
              type="button"
              className="exp-switch-btn"
              onClick={onSwitchToOriginal}
              title="Compare with legacy website"
            >
              <span className="exp-switch-dot"></span>
              Legacy View
            </button>
          )}

          <a
            href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20am%20exploring%20your%20new%20experience%20and%20would%20like%20to%20connect."
            target="_blank"
            rel="noopener noreferrer"
            className="exp-wa-cta"
            aria-label="Direct WhatsApp Concierge"
          >
            <span>WhatsApp</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17l9.2-9.2M17 17V8h-9" />
            </svg>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="exp-mobile-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`exp-bar ${mobileMenuOpen ? 'open-1' : ''}`}></span>
            <span className={`exp-bar ${mobileMenuOpen ? 'open-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="exp-mobile-drawer">
          <nav className="exp-mobile-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="exp-mobile-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            {onSwitchToOriginal && (
              <button
                type="button"
                className="exp-mobile-switch"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onSwitchToOriginal()
                }}
              >
                Switch to Legacy View ↗
              </button>
            )}
          </nav>
        </div>
      )}

      <style>{`
        .exp-nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(14, 13, 12, 0.55);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .exp-nav-bar.is-scrolled {
          background: rgba(10, 9, 8, 0.92);
          border-bottom-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
        }

        .exp-nav-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 18px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .exp-brand {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: #FAF7F2;
        }

        .exp-brand-name {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #FAF7F2;
        }

        .exp-brand-sub {
          font-family: var(--font-mono, monospace);
          font-size: 9px;
          letter-spacing: 0.22em;
          color: #DFC07A;
          margin-top: 2px;
        }

        .exp-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .exp-link {
          font-size: 13px;
          font-weight: 400;
          color: rgba(250, 247, 242, 0.72);
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s ease;
          position: relative;
          padding: 4px 0;
        }

        .exp-link:hover {
          color: #FAF7F2;
        }

        .exp-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #DFC07A;
          transition: width 0.25s ease;
        }

        .exp-link:hover::after {
          width: 100%;
        }

        .exp-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .exp-switch-btn {
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
        }

        .exp-switch-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
        }

        .exp-switch-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #DFC07A;
        }

        .exp-wa-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #DFC07A;
          color: #0A0A0A;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 7px 16px;
          border-radius: 999px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .exp-wa-cta:hover {
          background: #FAF7F2;
          transform: translateY(-1px);
        }

        .exp-mobile-btn {
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

        .exp-bar {
          width: 100%;
          height: 2px;
          background: #FAF7F2;
          border-radius: 2px;
          transition: all 0.25s ease;
        }

        .open-1 {
          transform: translateY(4px) rotate(45deg);
        }

        .open-2 {
          transform: translateY(-4px) rotate(-45deg);
        }

        .exp-mobile-drawer {
          background: rgba(10, 9, 8, 0.98);
          backdrop-filter: blur(24px);
          padding: 24px 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .exp-mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .exp-mobile-link {
          color: #FAF7F2;
          font-size: 16px;
          text-decoration: none;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .exp-mobile-switch {
          background: none;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #DFC07A;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 13px;
          margin-top: 10px;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .exp-links,
          .exp-switch-btn {
            display: none;
          }
          .exp-mobile-btn {
            display: flex;
          }
          .exp-nav-inner {
            padding: 14px 20px;
          }
        }
      `}</style>
    </header>
  )
}
