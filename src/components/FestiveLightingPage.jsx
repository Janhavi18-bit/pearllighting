import React, { useState, useEffect } from 'react'
import './FestiveLightingPage.css'
import {
  STUDIO_INFO,
  festiveProducts,
  getWhatsAppEnquiryUrl
} from '../data/productsData'
import { getProductEnquiryMailto } from '../utils/emailEnquiry'

/**
 * WhatsApp SVG Icon
 */
function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32" />
    </svg>
  )
}

/**
 * FestiveLightingPage — Dedicated Festive Collection Page
 * 
 * Re-designed per luxury atelier requirements:
 * - Completely removed 3D Three.js viewer, floating images, and thumbnail carousels.
 * - Clean header with Pearl Lighting logo and direct navigation back to main website.
 * - Refined page title: "Festive Collection" and introduction.
 * - All authentic festive products rendered in a responsive, balanced grid (2 columns on mobile, 3-4 on desktop).
 * - Verified names, descriptions, and model numbers placed in the text area below photos (NO overlays on photos).
 * - "View Details" opens an elegant, fast product details modal with verified specs and direct WhatsApp enquiry.
 * - Working WhatsApp enquiry buttons with verified phone number (+91 83290 45712) and product names.
 */
export default function FestiveLightingPage({ onNavigateToLanding }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [activeModalImage, setActiveModalImage] = useState(null)
  const [consultModalOpen, setConsultModalOpen] = useState(false)
  const [activeCardId, setActiveCardId] = useState(null)
  const [consultForm, setConsultForm] = useState({
    name: '',
    phone: '',
    projectType: 'Private Residence / Villa',
    interest: 'Festive & Architectural Illumination',
    notes: ''
  })

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard navigation & body scroll lock for modals & mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null)
        setActiveModalImage(null)
        setConsultModalOpen(false)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (selectedProduct || consultModalOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProduct, consultModalOpen, mobileMenuOpen])

  // Clear touched/active card on outside tap
  useEffect(() => {
    const handleOutsideTap = (e) => {
      if (!e.target.closest('.fl-product-card')) {
        setActiveCardId(null)
      }
    }
    document.addEventListener('click', handleOutsideTap)
    document.addEventListener('touchstart', handleOutsideTap, { passive: true })
    return () => {
      document.removeEventListener('click', handleOutsideTap)
      document.removeEventListener('touchstart', handleOutsideTap)
    }
  }, [])

  // Category counts (10 Warm & Golden, 9 Multi-Colour & Accents = 19 Authentic Products)
  const warmWhiteIds = [
    'hanging-star-curtain',
    'hanging-diya-curtain',
    'golden-cluster-fairy-string',
    'crystal-bubble-string',
    'frosted-globe-string',
    'black-wire-edison-bulbs',
    'rope-wire-vintage-bulbs',
    'shining-crystal-flower-mix',
    'flower-curtain-lights-gn38',
    'pixel-high-bright-ww-gn144',
    'golden-star-string-lights'
  ]

  const multiColourIds = [
    'multicolour-diya-garland',
    'royal-blue-pixel-string',
    'rainbow-rice-pixel-string',
    'festive-string-light-sets',
    'led-twinkle-pixel-string',
    'waterfall-multi-g319',
    'star-silhouette-rgb-g527',
    'sudarshan-spiral-rgb-g523',
    'macaron-curtain-multi-gn39'
  ]

  const warmCount = festiveProducts.filter((p) => warmWhiteIds.includes(p.id)).length
  const multiCount = festiveProducts.filter((p) => multiColourIds.includes(p.id)).length

  // Filter products by category
  const filteredProducts = festiveProducts.filter((product) => {
    if (activeCategory === 'warm') {
      return warmWhiteIds.includes(product.id)
    }
    if (activeCategory === 'multicolour') {
      return multiColourIds.includes(product.id)
    }
    return true
  })

  // Handle consultation form submit
  const handleConsultSubmit = (e) => {
    e.preventDefault()
    const text = `Hi Pearl Lighting Studio!
Client Name: ${consultForm.name}
Phone: ${consultForm.phone}
Project Type: ${consultForm.projectType}
Collection Interest: ${consultForm.interest}
Notes: ${consultForm.notes || 'Inquiring about the festive lighting collection.'}`

    try {
      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: consultForm.name,
          phone: consultForm.phone,
          productName: `Festive Consultation: ${consultForm.projectType}`,
          message: consultForm.notes || 'Festive Lighting Consultation Inquiry',
          category: 'festive-consultation'
        })
      }).catch(() => {})
    } catch (_) {}

    const targetUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`
    const win = window.open(targetUrl, '_blank', 'noopener,noreferrer')
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = targetUrl
    }
    setConsultModalOpen(false)
  }

  return (
    <div className="festive-page-universe">
      {/* ──────────────────────────────────────────────────────────────────
          1. CLEAN ATELIER HEADER
          ────────────────────────────────────────────────────────────────── */}
      <header className={`fl-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="fl-header-container">
          {/* Logo & Return Link */}
          <div className="fl-header-brand-wrap">
            <button
              type="button"
              className="fl-header-back-btn"
              onClick={() => onNavigateToLanding && onNavigateToLanding()}
              aria-label="Back to Home"
              id="btn-header-back-to-home"
              title="Return to Main Website"
            >
              <span className="fl-back-arrow" aria-hidden="true">←</span>
              <span className="fl-back-label">Back to Home</span>
            </button>

            <span className="fl-header-sep" aria-hidden="true">/</span>

            <button
              type="button"
              className="fl-brand-anchor"
              onClick={() => onNavigateToLanding && onNavigateToLanding()}
              aria-label="Pearl Lighting Home"
            >
              <img
                src="/images/logo/pearl-lightings-logo-transparent.png"
                alt="Pearl Lighting Logo"
                className="fl-brand-logo"
              />
              <div className="fl-brand-text-block">
                <span className="fl-brand-name">{STUDIO_INFO.brandName}</span>
                <span className="fl-brand-sub">Atelier · Mumbai</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="fl-header-nav" aria-label="Festive Page Navigation">
            <ul className="fl-nav-list">
              <li>
                <button
                  type="button"
                  className="fl-nav-link"
                  onClick={() => onNavigateToLanding && onNavigateToLanding()}
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="fl-nav-link"
                  onClick={() => onNavigateToLanding && onNavigateToLanding('architectural-collection')}
                >
                  Architectural Series
                </button>
              </li>
              <li>
                <a href="#festive-grid" className="fl-nav-link is-active">
                  <span>Festive Collection</span>
                  <span className="fl-nav-spark" aria-hidden="true">✦</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className="fl-nav-link"
                  onClick={() => onNavigateToLanding && onNavigateToLanding('studio')}
                >
                  Studio Atelier
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Action CTAs */}
          <div className="fl-header-actions">
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent('Hi Pearl Lighting Studio! I am exploring your Festive Collection and would like to inquire.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fl-btn-header-wa"
              aria-label="Chat with Concierge on WhatsApp"
            >
              <WhatsAppIcon size={16} />
              <span>WhatsApp Concierge</span>
            </a>

            <button
              type="button"
              className="fl-btn-header-inquire"
              onClick={() => setConsultModalOpen(true)}
              aria-label="Request festive lighting consultation"
            >
              <span>Inquire</span>
              <span className="fl-btn-arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <div className={`fl-mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}>
          <div className="fl-mobile-drawer-inner">
            <div className="fl-drawer-top">
              <img
                src="/images/logo/pearl-lightings-logo-transparent.png"
                alt="Pearl Lighting Logo"
                className="fl-drawer-logo"
              />
              <button
                type="button"
                className="fl-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="fl-drawer-nav">
              <button
                type="button"
                className="fl-drawer-link"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (onNavigateToLanding) onNavigateToLanding()
                }}
              >
                <span>← Return to Main Website</span>
              </button>
              <button
                type="button"
                className="fl-drawer-link"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (onNavigateToLanding) onNavigateToLanding('architectural-collection')
                }}
              >
                <span>Architectural Series (7 Families)</span>
                <span>↗</span>
              </button>
              <a
                href="#festive-grid"
                className="fl-drawer-link is-active"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Festive Collection ✦</span>
              </a>
              <button
                type="button"
                className="fl-drawer-link"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (onNavigateToLanding) onNavigateToLanding('studio')
                }}
              >
                <span>Studio Atelier &amp; Contact</span>
                <span>↗</span>
              </button>
            </nav>

            <div className="fl-drawer-actions">
              <a
                href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent('Hi Pearl Lighting Studio! I would like to inquire about the Festive Collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fl-drawer-wa-btn"
              >
                <WhatsAppIcon size={18} />
                <span>Enquire on WhatsApp</span>
              </a>
              <button
                type="button"
                className="fl-drawer-consult-btn"
                onClick={() => {
                  setMobileMenuOpen(false)
                  setConsultModalOpen(true)
                }}
              >
                <span>Request Project Consultation</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────────
          2. FESTIVE COLLECTION HERO BANNER (Warm Ivory, Champagne Gold)
          ────────────────────────────────────────────────────────────────── */}
      <section className="fl-hero-section">
        <div className="fl-hero-glow" aria-hidden="true" />
        <div className="fl-container">
          {/* Breadcrumb back navigation */}
          <div className="fl-breadcrumb-row">
            <button
              type="button"
              className="fl-breadcrumb-back"
              onClick={() => onNavigateToLanding && onNavigateToLanding()}
              id="btn-breadcrumb-back-to-home"
            >
              <span>← Back to Home</span>
            </button>
            <span className="fl-breadcrumb-sep">/</span>
            <span className="fl-breadcrumb-current">Festive Collection</span>
          </div>

          <div className="fl-hero-content">
            <div className="fl-hero-kicker">
              <span className="fl-kicker-spark">✦</span>
              <span>COLLECTION 02 · CELEBRATION REPERTOIRE</span>
            </div>

            <h1 className="fl-hero-title">Festive Collection</h1>

            <p className="fl-hero-subtitle-highlight">
              Discover lights that bring every celebration to life.
            </p>

            <p className="fl-hero-description">
              Handcrafted star cascades, traditional brass diya silhouettes, optical crystal bubbles, and artisanal filament fixtures—curated to infuse festive evenings with warm golden radiance.
            </p>

            <div className="fl-hero-badges-row">
              <div className="fl-hero-badge">
                <span className="fl-badge-dot">✦</span>
                <span>{festiveProducts.length} Verified Festive Editions</span>
              </div>
              <div className="fl-hero-badge">
                <span className="fl-badge-dot">✦</span>
                <span>Warm Amber &amp; Champagne Luster</span>
              </div>
              <div className="fl-hero-badge">
                <span className="fl-badge-dot">✦</span>
                <span>Direct Atelier Delivery Across India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          3. CATEGORY FILTER & CURATED REPERTOIRE GRID
          ────────────────────────────────────────────────────────────────── */}
      <main className="fl-main-repertoire" id="festive-grid">
        <div className="fl-container">
          {/* Filter Bar */}
          <div className="fl-filter-bar">
            <div className="fl-filter-label-group">
              <span className="fl-filter-tag">Filter Collection:</span>
              <span className="fl-filter-count">
                Showing {filteredProducts.length} of {festiveProducts.length} pieces
              </span>
            </div>

            <div className="fl-filter-tabs" role="tablist" aria-label="Festive categories">
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'all'}
                className={`fl-filter-tab ${activeCategory === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                <span>All Lights</span>
                <span className="fl-tab-count">{festiveProducts.length}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'warm'}
                className={`fl-filter-tab ${activeCategory === 'warm' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('warm')}
              >
                <span>Warm White &amp; Golden</span>
                <span className="fl-tab-count">{warmCount}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'multicolour'}
                className={`fl-filter-tab ${activeCategory === 'multicolour' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('multicolour')}
              >
                <span>Multi-Colour &amp; Accents</span>
                <span className="fl-tab-count">{multiCount}</span>
              </button>
            </div>
          </div>

          {/* Responsive Product Grid */}
          <div className="fl-product-grid">
            {filteredProducts.map((product) => {
              const waUrl = getWhatsAppEnquiryUrl(
                product.name,
                product.modelNumber ? `Model ${product.modelNumber}` : ''
              )

              const isCardActive = activeCardId === product.id

              return (
                <article
                  key={product.id}
                  className={`fl-product-card ${isCardActive ? 'is-active' : ''}`}
                  id={`product-${product.id}`}
                  tabIndex={0}
                  onClick={() => {
                    setActiveCardId(prev => (prev === product.id ? null : product.id))
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      if (e.target === e.currentTarget) {
                        e.preventDefault()
                        setSelectedProduct(product)
                        setActiveModalImage(product.image)
                      }
                    }
                  }}
                  aria-label={`${product.name} — ${product.category}`}
                >
                  {/* Product Photograph — Clean, unobstructed, NO OVERLAY TEXT */}
                  <div
                    className="fl-card-media-box"
                    onClick={(e) => {
                      if (isCardActive) {
                        e.stopPropagation()
                        setSelectedProduct(product)
                        setActiveModalImage(product.image)
                      }
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.alt || product.name}
                      className="fl-card-photo"
                      loading="lazy"
                    />
                  </div>

                  {/* Text area strictly BELOW the photograph */}
                  <div className="fl-card-body">
                    {/* Meta header: Category and Verified Model Badge */}
                    <div className="fl-card-meta-row">
                      <span className="fl-card-category-tag">{product.category}</span>
                      {product.modelNumber ? (
                        <span className="fl-card-model-badge" title={`Verified Model: ${product.modelNumber}`}>
                          ✦ {product.modelNumber}
                        </span>
                      ) : (
                        <span className="fl-card-number-badge">
                          #{product.number}
                        </span>
                      )}
                    </div>

                    {/* Verified Product Name */}
                    <h3 className="fl-card-title">{product.name}</h3>

                    {/* Subtitle / Model Label if available */}
                    {product.subtitle && (
                      <div className="fl-card-subtitle">{product.subtitle}</div>
                    )}

                    {/* Concise Description */}
                    <p className="fl-card-description">{product.description}</p>

                    {/* Specifications snippet if available */}
                    {product.verifiedDetails && product.verifiedDetails.length > 0 && (
                      <div className="fl-card-specs-preview">
                        <div className="fl-card-spec-item">
                          <span className="fl-spec-key">{product.verifiedDetails[0].label}:</span>
                          <span className="fl-spec-val">{product.verifiedDetails[0].value}</span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons: View Details & Enquire on WhatsApp */}
                    <div className="fl-card-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="fl-card-btn-details"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProduct(product)
                          setActiveModalImage(product.image)
                        }}
                        aria-label={`View details for ${product.name}`}
                      >
                        <span className="fl-btn-text-full">View Details</span>
                        <span className="fl-btn-text-short">Details</span>
                        <span className="fl-card-btn-arrow" aria-hidden="true">↗</span>
                      </button>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fl-card-btn-wa"
                        onClick={(e) => e.stopPropagation()}
                        title={`Enquire about ${product.name}`}
                        aria-label={`Enquire about ${product.name}`}
                      >
                        <WhatsAppIcon size={16} />
                        <span className="fl-wa-text">Enquire</span>
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {/* Bottom Return to Main Website CTA Card */}
          <div className="fl-return-section">
            <div className="fl-return-card">
              <div className="fl-return-copy">
                <span className="fl-return-kicker">✦ COMPLETE ARCHITECTURAL REPERTOIRE</span>
                <h2 className="fl-return-title">Looking for Architectural &amp; Studio Lighting?</h2>
                <p className="fl-return-text">
                  Explore our modern collection of slim architectural panels, deep anti-glare downlights,
                  adjustable gimbals, LED floods, and flexible cove rope systems.
                </p>
              </div>

              <button
                type="button"
                className="fl-return-btn"
                onClick={() => onNavigateToLanding && onNavigateToLanding('architectural-collection')}
              >
                <span>Explore Architectural Series</span>
                <span className="fl-return-arrow" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ──────────────────────────────────────────────────────────────────
          4. PRODUCT DETAILS VIEW MODAL (Elegant, Pure UI, Zero 3D)
          ────────────────────────────────────────────────────────────────── */}
      {selectedProduct && (
        <div
          className="fl-modal-backdrop"
          onClick={() => {
            setSelectedProduct(null)
            setActiveModalImage(null)
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
        >
          <div
            className="fl-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              className="fl-modal-close-btn"
              onClick={() => {
                setSelectedProduct(null)
                setActiveModalImage(null)
              }}
              aria-label="Close product details"
            >
              ×
            </button>

            <div className="fl-modal-layout">
              {/* Left: Product Photo Stage (Clean, true proportion) */}
              <div className="fl-modal-media-stage">
                <div className="fl-modal-photo-frame">
                  <img
                    src={activeModalImage || selectedProduct.image}
                    alt={selectedProduct.name}
                    className="fl-modal-photo"
                  />
                </div>

                {/* Additional gallery thumbnail if present */}
                {selectedProduct.additionalImages?.length > 0 && (
                  <div className="fl-modal-additional-views">
                    <span className="fl-additional-label">Product Perspectives &amp; Variations:</span>
                    <div className="fl-additional-row">
                      <div
                        className={`fl-additional-thumb-wrap ${(!activeModalImage || activeModalImage === selectedProduct.image) ? 'is-active' : ''}`}
                        onClick={() => setActiveModalImage(selectedProduct.image)}
                        role="button"
                        tabIndex={0}
                        title="Overview Quad"
                      >
                        <img
                          src={selectedProduct.image}
                          alt={`${selectedProduct.name} Overview`}
                          className="fl-additional-thumb"
                        />
                      </div>
                      {selectedProduct.additionalImages.map((img) => (
                        <div
                          key={img.id}
                          className={`fl-additional-thumb-wrap ${activeModalImage === img.image ? 'is-active' : ''}`}
                          onClick={() => setActiveModalImage(img.image)}
                          role="button"
                          tabIndex={0}
                          title={img.label || selectedProduct.name}
                        >
                          <img
                            src={img.image}
                            alt={img.label || selectedProduct.name}
                            className="fl-additional-thumb"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Verified Information & Action Buttons */}
              <div className="fl-modal-content-stage">
                <div className="fl-modal-header-meta">
                  <span className="fl-modal-category">{selectedProduct.category}</span>
                  {selectedProduct.modelNumber && (
                    <span className="fl-modal-model-badge">
                      Verified Model: {selectedProduct.modelNumber}
                    </span>
                  )}
                </div>

                <h2 id="modal-product-title" className="fl-modal-title">
                  {selectedProduct.name}
                </h2>

                {selectedProduct.subtitle && (
                  <p className="fl-modal-subtitle">{selectedProduct.subtitle}</p>
                )}

                <div className="fl-modal-divider" aria-hidden="true" />

                <p className="fl-modal-description">{selectedProduct.description}</p>

                {/* Verified Product Specifications Table */}
                {selectedProduct.verifiedDetails && selectedProduct.verifiedDetails.length > 0 && (
                  <div className="fl-modal-specs-wrap">
                    <h4 className="fl-modal-specs-title">Verified Specifications</h4>
                    <dl className="fl-modal-specs-grid">
                      {selectedProduct.verifiedDetails.map((detail, idx) => (
                        <div key={idx} className="fl-modal-spec-row">
                          <dt className="fl-modal-spec-key">{detail.label}</dt>
                          <dd className="fl-modal-spec-val">{detail.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Direct Concierge CTAs */}
                <div className="fl-modal-actions">
                  <a
                    href={getWhatsAppEnquiryUrl(
                      selectedProduct.name,
                      selectedProduct.modelNumber ? `Model ${selectedProduct.modelNumber}` : ''
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fl-modal-btn-wa"
                  >
                    <WhatsAppIcon size={20} />
                    <span>Enquire on WhatsApp (+91 83290 45712)</span>
                    <span className="fl-modal-arrow">↗</span>
                  </a>

                  <a
                    href={getProductEnquiryMailto(selectedProduct)}
                    className="fl-modal-btn-email"
                  >
                    <span>Email Studio Inquiry</span>
                    <span className="fl-modal-arrow">✉</span>
                  </a>
                </div>

                <div className="fl-modal-footnote">
                  <span>Atelier Mumbai · Prompt Dispatch · Genuine Authentic Lighting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          5. PROJECT CONSULTATION MODAL
          ────────────────────────────────────────────────────────────────── */}
      {consultModalOpen && (
        <div
          className="fl-modal-backdrop"
          onClick={() => setConsultModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Festive Lighting Project Consultation"
        >
          <div
            className="fl-consult-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="fl-modal-close-btn"
              onClick={() => setConsultModalOpen(false)}
              aria-label="Close consultation modal"
            >
              ×
            </button>

            <div className="fl-consult-header">
              <span className="fl-consult-kicker">✦ ATELIER CONSULTATION</span>
              <h3 className="fl-consult-title">Festive Project Inquiry</h3>
              <p className="fl-consult-desc">
                Share your residence or celebration details. Our Mumbai atelier team will prepare curated
                festive lighting specifications and availability.
              </p>
            </div>

            <form onSubmit={handleConsultSubmit} className="fl-consult-form">
              <div className="fl-form-group">
                <label htmlFor="fl-client-name" className="fl-form-label">
                  Your Name *
                </label>
                <input
                  id="fl-client-name"
                  type="text"
                  required
                  placeholder="e.g. Aditi Sharma"
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })}
                  className="fl-form-input"
                />
              </div>

              <div className="fl-form-group">
                <label htmlFor="fl-client-phone" className="fl-form-label">
                  Phone / WhatsApp Number *
                </label>
                <input
                  id="fl-client-phone"
                  type="tel"
                  required
                  placeholder="+91 98200 00000"
                  value={consultForm.phone}
                  onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                  className="fl-form-input"
                />
              </div>

              <div className="fl-form-row">
                <div className="fl-form-group">
                  <label htmlFor="fl-project-type" className="fl-form-label">
                    Project Type
                  </label>
                  <select
                    id="fl-project-type"
                    value={consultForm.projectType}
                    onChange={(e) => setConsultForm({ ...consultForm, projectType: e.target.value })}
                    className="fl-form-select"
                  >
                    <option>Private Residence / Villa</option>
                    <option>Penthouse / Apartment</option>
                    <option>Mandir / Puja Room</option>
                    <option>Celebration / Banquet</option>
                    <option>Commercial / Hospitality</option>
                  </select>
                </div>

                <div className="fl-form-group">
                  <label htmlFor="fl-interest" className="fl-form-label">
                    Primary Interest
                  </label>
                  <select
                    id="fl-interest"
                    value={consultForm.interest}
                    onChange={(e) => setConsultForm({ ...consultForm, interest: e.target.value })}
                    className="fl-form-select"
                  >
                    <option>Cascading Star &amp; Diya Curtains</option>
                    <option>Warm Golden Cluster Bokeh Strings</option>
                    <option>Vintage Filament &amp; Jute Rope Fixtures</option>
                    <option>Complete Home Festive Lighting Package</option>
                  </select>
                </div>
              </div>

              <div className="fl-form-group">
                <label htmlFor="fl-notes" className="fl-form-label">
                  Project Notes &amp; Quantities (Optional)
                </label>
                <textarea
                  id="fl-notes"
                  rows="3"
                  placeholder="Share dimensions, room details, or specific models you are considering..."
                  value={consultForm.notes}
                  onChange={(e) => setConsultForm({ ...consultForm, notes: e.target.value })}
                  className="fl-form-textarea"
                />
              </div>

              <button type="submit" className="fl-consult-submit-btn">
                <span>Continue to WhatsApp (+91 83290 45712)</span>
                <span>→</span>
              </button>
              <p className="fl-form-disclaimer" style={{ margin: '0.65rem 0 0', fontSize: '0.74rem', color: '#88847C', textAlign: 'center', lineHeight: '1.4' }}>
                Opens WhatsApp with your festive specifications prefilled. You review and send it directly in WhatsApp.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────
          6. EDITORIAL ATELIER FOOTER
          ────────────────────────────────────────────────────────────────── */}
      <footer className="fl-footer">
        <div className="fl-container">
          <div className="fl-footer-grid">
            <div className="fl-footer-brand-col">
              <img
                src="/images/logo/pearl-lightings-logo-transparent.png"
                alt="Pearl Lighting Logo"
                className="fl-footer-logo"
              />
              <p className="fl-footer-brand-desc">
                {STUDIO_INFO.brandName} — {STUDIO_INFO.parentCompany}
              </p>
              <p className="fl-footer-tagline">“{STUDIO_INFO.tagline}”</p>
              <p className="fl-footer-atelier-origin">
                Handcrafted illumination curated in Kalbadevi, Mumbai.
              </p>
            </div>

            <div className="fl-footer-links-col">
              <h4 className="fl-footer-col-title">Navigation</h4>
              <ul className="fl-footer-nav-list">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateToLanding && onNavigateToLanding()}
                    className="fl-footer-link-btn"
                  >
                    Main Website Overview
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateToLanding && onNavigateToLanding('architectural-collection')}
                    className="fl-footer-link-btn"
                  >
                    Architectural &amp; Studio Series
                  </button>
                </li>
                <li>
                  <a href="#festive-grid" className="fl-footer-link-btn">
                    Festive Collection
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateToLanding && onNavigateToLanding('story')}
                    className="fl-footer-link-btn"
                  >
                    Atelier Story &amp; Craftsmanship
                  </button>
                </li>
              </ul>
            </div>

            <div className="fl-footer-links-col">
              <h4 className="fl-footer-col-title">Mumbai Atelier</h4>
              <address className="fl-footer-address">
                <strong>{STUDIO_INFO.brandName}</strong>
                <br />
                {STUDIO_INFO.parentCompany}
                <br />
                {STUDIO_INFO.address.line1}
                <br />
                {STUDIO_INFO.address.line2}
                <br />
                {STUDIO_INFO.address.city} – {STUDIO_INFO.address.pincode},{' '}
                {STUDIO_INFO.address.state}
              </address>
            </div>

            <div className="fl-footer-links-col">
              <h4 className="fl-footer-col-title">Direct Connection</h4>
              <div className="fl-footer-contact-item">
                <span className="fl-contact-label">WhatsApp Concierge:</span>
                <a
                  href={`https://wa.me/${STUDIO_INFO.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fl-contact-val"
                >
                  {STUDIO_INFO.phone} ↗
                </a>
              </div>
              <div className="fl-footer-contact-item">
                <span className="fl-contact-label">Email:</span>
                <a href={`mailto:${STUDIO_INFO.email}`} className="fl-contact-val">
                  {STUDIO_INFO.email}
                </a>
              </div>
              <div className="fl-footer-contact-item">
                <span className="fl-contact-label">Visual Journal:</span>
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fl-contact-val"
                >
                  {STUDIO_INFO.instagram} ↗
                </a>
              </div>
            </div>
          </div>

          <div className="fl-footer-legal-bar">
            <span>
              © {new Date().getFullYear()} {STUDIO_INFO.brandName} · {STUDIO_INFO.parentCompany}. All rights reserved.
            </span>

            <div className="fl-footer-legal-actions">
              <button
                type="button"
                className="fl-footer-back-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span>Back to Top</span>
                <span>↑</span>
              </button>

              <button
                type="button"
                className="fl-footer-return-home"
                onClick={() => onNavigateToLanding && onNavigateToLanding()}
              >
                <span>← Return to Main Website</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
