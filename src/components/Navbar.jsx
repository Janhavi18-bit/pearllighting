import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const sectionIds = ['hero', 'gallery', 'story', 'discovery', 'architectural', 'festive', 'contact']
    const handleSectionTrack = () => {
      const scrollPos = window.scrollY + 120
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i])
          return
        }
      }
      setActiveSection('')
    }

    window.addEventListener('scroll', handleSectionTrack, { passive: true })
    handleSectionTrack()
    return () => window.removeEventListener('scroll', handleSectionTrack)
  }, [])

  const navLinks = [
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
    { id: 'story', label: 'Story', href: '#story' },
    { id: 'discovery', label: 'Explore', href: '#discovery' },
    { id: 'architectural', label: 'Architectural', href: '#architectural' },
    { id: 'festive', label: 'Festive', href: '#festive' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ]

  const handleLinkClick = (e, href, id) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    if (id) setActiveSection(id)
    const target = document.querySelector(href)
    if (target) {
      const headerEl = document.querySelector('.navbar-root')
      const headerHeight = headerEl ? headerEl.offsetHeight : 74
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({
        top: Math.max(0, targetPos),
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <header className={`navbar-root ${isScrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
        <div className="container nav-inner">
          {/* Brand Mark */}
          <a
            href="#"
            className="nav-brand"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            aria-label="Pearl Lighting"
          >
            <span className="brand-dot" aria-hidden="true"></span>
            <span className="brand-name">PEARL LIGHTING</span>
            <span className="brand-sub">ATELIER</span>
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-menu" aria-label="Desktop menu">
            <ul className="nav-list">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.href, link.id)}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Right Action */}
          <div className="nav-actions">
            <a
              href="https://wa.me/918329045712"
              target="_blank"
              rel="noopener noreferrer"
              className="atelier-enquire-btn"
            >
              <span>WhatsApp Atelier</span>
              <span className="arrow">↗</span>
            </a>

            <button
              type="button"
              className={`hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span className="bar bar-1"></span>
              <span className="bar bar-2"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="drawer-panel">
          <div className="drawer-head">
            <span className="drawer-logo">PEARL LIGHTING</span>
            <button
              type="button"
              className="drawer-close"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="drawer-nav">
            <ul className="drawer-list">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className={`drawer-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.href, link.id)}
                    >
                      <span className="drawer-num">0{idx + 1}</span>
                      <span className="drawer-text">{link.label}</span>
                      <span className="drawer-arrow">→</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="drawer-bottom">
            <span className="drawer-coord">Parth Enterprises • Kalbadevi, Mumbai</span>
            <a href="tel:+918329045712" className="drawer-phone">+91 83290 45712</a>
            <a
              href="https://wa.me/918329045712"
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-cta"
            >
              Connect on WhatsApp ↗
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .navbar-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          z-index: 1000;
          background: rgba(10, 9, 8, 0.72);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .navbar-root.scrolled {
          background: rgba(10, 9, 8, 0.92);
          border-bottom: 1px solid rgba(197, 160, 89, 0.22);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        .nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: #FAF7F2;
        }

        .brand-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold-champagne);
          box-shadow: 0 0 10px var(--gold-champagne);
        }

        .brand-name {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .brand-sub {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: var(--gold-champagne);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          padding-left: 0.65rem;
        }

        .desktop-menu {
          display: none;
        }

        @media (min-width: 900px) {
          .desktop-menu {
            display: block;
          }
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 2.2rem;
          list-style: none;
        }

        .nav-link {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: rgba(250, 247, 242, 0.75);
          transition: color 0.25s ease;
        }

        .nav-link:hover {
          color: #FAF7F2;
        }

        .nav-link.active {
          color: var(--gold-champagne);
          font-weight: 500;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .atelier-enquire-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(197, 160, 89, 0.12);
          border: 1px solid rgba(197, 160, 89, 0.35);
          color: #FAF7F2;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          transition: all 0.25s ease;
        }

        .atelier-enquire-btn:hover {
          background: var(--gold-champagne);
          color: #11100E;
          border-color: var(--gold-champagne);
          box-shadow: 0 4px 18px rgba(197, 160, 89, 0.3);
        }

        .hamburger-btn {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          gap: 5px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer;
        }

        @media (min-width: 900px) {
          .hamburger-btn {
            display: none;
          }
        }

        .bar {
          width: 18px;
          height: 1.5px;
          background: #FAF7F2;
          transition: all 0.3s ease;
        }

        .hamburger-btn.open .bar-1 {
          transform: translateY(3.25px) rotate(45deg);
        }

        .hamburger-btn.open .bar-2 {
          transform: translateY(-3.25px) rotate(-45deg);
        }

        /* Mobile Drawer */
        .mobile-menu-drawer {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1100;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.35s ease;
        }

        .mobile-menu-drawer.open {
          opacity: 1;
          pointer-events: auto;
        }

        .drawer-panel {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 380px;
          background: #12100E;
          border-left: 1px solid rgba(197, 160, 89, 0.2);
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          transform: translateX(100%);
          transition: transform 0.4s var(--ease-out-expo);
        }

        .mobile-menu-drawer.open .drawer-panel {
          transform: translateX(0);
        }

        .drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .drawer-logo {
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: #FAF7F2;
        }

        .drawer-close {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FAF7F2;
          font-size: 1.1rem;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
        }

        .drawer-nav {
          flex: 1;
          padding: 2rem 0;
          overflow-y: auto;
        }

        .drawer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .drawer-link {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.95rem 0.5rem;
          border-radius: 8px;
          color: #FAF7F2;
          font-size: 1.1rem;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .drawer-link:hover,
        .drawer-link.active {
          color: var(--gold-champagne);
          background: rgba(197, 160, 89, 0.08);
        }

        .drawer-num {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--gold-champagne);
          font-weight: 600;
        }

        .drawer-text {
          flex: 1;
        }

        .drawer-arrow {
          font-size: 0.9rem;
          opacity: 0.4;
        }

        .drawer-bottom {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .drawer-coord {
          font-size: 0.74rem;
          color: var(--text-light-muted);
          letter-spacing: 0.06em;
        }

        .drawer-phone {
          font-size: 0.9rem;
          color: #FAF7F2;
          font-weight: 500;
        }

        .drawer-cta {
          display: block;
          text-align: center;
          background: var(--gold-champagne);
          color: #11100E;
          font-weight: 600;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          padding: 0.8rem;
          border-radius: 8px;
          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}
