import React, { useState } from 'react'

export default function EditorialNavbar({ onOpenEnquiry }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Featured Luminaires', href: '#featured-section' },
    { label: 'Brand Story', href: '#editorial-story' },
    { label: 'Collections Mosaic', href: '#collections-mosaic' },
    { label: 'Festive Edition', href: '#festive-section' },
    { label: 'Atelier & Contact', href: '#atelier-finale' },
  ]

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="ref-navbar">
      <div className="ref-nav-left">
        <button
          type="button"
          className="ref-menu-trigger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span className="menu-icon-bars">
            <span className={`bar-line ${menuOpen ? 'b1-open' : ''}`}></span>
            <span className={`bar-line ${menuOpen ? 'b2-open' : ''}`}></span>
            <span className={`bar-line ${menuOpen ? 'b3-open' : ''}`}></span>
          </span>
        </button>
      </div>

      <div className="ref-nav-center">
        <a href="#hero-opening" className="ref-brand-logo">
          <div className="brand-gem-icon">
            <span className="gem-inner"></span>
          </div>
          <span className="brand-title">PEARL LIGHTING</span>
        </a>
      </div>

      <div className="ref-nav-right">
        <button
          type="button"
          className="ref-enquiry-icon-btn"
          onClick={onOpenEnquiry}
          title="Project Specification Concierge"
          aria-label="Open project enquiry desk"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span className="enquiry-indicator-dot"></span>
        </button>
      </div>

      {/* Slide-out Menu Drawer */}
      {menuOpen && (
        <div className="ref-menu-drawer">
          <div className="drawer-header">
            <span className="drawer-sub">PEARL LIGHTING • MUMBAI ATELIER</span>
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="drawer-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="drawer-nav-item"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="drawer-footer">
            <a
              href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20would%20like%20to%20connect%20with%20your%20studio."
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-wa-cta"
            >
              WhatsApp Concierge: +91 83290 45712 ↗
            </a>
          </div>
        </div>
      )}

      <style>{`
        .ref-navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 36px 16px;
          position: relative;
          z-index: 50;
        }

        .ref-nav-left {
          display: flex;
          align-items: center;
        }

        .ref-menu-trigger {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-icon-bars {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 22px;
        }

        .bar-line {
          height: 2px;
          width: 100%;
          background: #181716;
          border-radius: 2px;
          transition: all 0.25s ease;
        }

        .b1-open {
          transform: translateY(7px) rotate(45deg);
        }

        .b2-open {
          opacity: 0;
        }

        .b3-open {
          transform: translateY(-7px) rotate(-45deg);
        }

        .ref-nav-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ref-brand-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #181716;
        }

        .brand-gem-icon {
          width: 18px;
          height: 18px;
          border: 1.5px solid #D65A27;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(45deg);
        }

        .gem-inner {
          width: 6px;
          height: 6px;
          background: #D65A27;
          border-radius: 50%;
        }

        .brand-title {
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, sans-serif);
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: #181716;
        }

        .ref-nav-right {
          display: flex;
          align-items: center;
        }

        .ref-enquiry-icon-btn {
          background: none;
          border: none;
          color: #181716;
          cursor: pointer;
          padding: 8px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .ref-enquiry-icon-btn:hover {
          transform: scale(1.08);
          color: #D65A27;
        }

        .enquiry-indicator-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #D65A27;
        }

        /* Drawer */
        .ref-menu-drawer {
          position: absolute;
          top: 0;
          left: 0;
          width: 320px;
          background: #FFFFFF;
          box-shadow: 0 16px 50px rgba(0, 0, 0, 0.18);
          padding: 28px;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 24px;
          animation: slideMenu 0.25s ease;
        }

        @keyframes slideMenu {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(24, 23, 22, 0.08);
          padding-bottom: 12px;
        }

        .drawer-sub {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: #D65A27;
        }

        .drawer-close-btn {
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #181716;
        }

        .drawer-nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .drawer-nav-item {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 18px;
          color: #181716;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .drawer-nav-item:hover {
          color: #D65A27;
        }

        .drawer-footer {
          margin-top: auto;
          padding-top: 16px;
          border-top: 1px solid rgba(24, 23, 22, 0.08);
        }

        .drawer-wa-cta {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          color: #D65A27;
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .ref-navbar {
            padding: 18px 20px 12px;
          }
          .brand-title {
            font-size: 13px;
            letter-spacing: 0.16em;
          }
        }
      `}</style>
    </header>
  )
}
