import React, { useState, useEffect, useRef } from 'react'
import './AppleSeripLuxuryLanding.css'
import EmailEnquiryButton from './EmailEnquiryButton'
import FestiveHomepagePreview from './FestiveHomepagePreview'
import {
  architecturalProducts,
  festiveProducts,
  STUDIO_INFO,
  getWhatsAppEnquiryUrl
} from '../data/productsData'

/* ==========================================================================
   PEARL LIGHTING — LUXURY ARCHITECTURAL & DECORATIVE ILLUMINATION
   Artistic Cinematic Brand Experience · Mumbai Atelier
   ========================================================================== */

export default function AppleSeripLuxuryLanding({ onSwitchToCollage, initialSection, onNavigateToFestive }) {
  // Navigation & Scroll
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Auto-scroll to festive section if requested by route or hash
  useEffect(() => {
    if (initialSection === 'festive-collection' || window.location.hash === '#festive-collection') {
      const timer = setTimeout(() => {
        const el = document.getElementById('festive-collection')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [initialSection])


  // Variant Selection per Product (Tracks selected variant index for each item)
  const [variantSelections, setVariantSelections] = useState({
    'slim-panel': 0,
    'surface-panel': 0,
    'deep-downlight': 0,
    'curve-cob': 0,
    'moveable-cob': 0,
    'led-flood-light': 0,
    'rope-light': 0
  })

  // Interactive 3D Gimbal Tilt Angles (For Moveable COB & Curve COB)
  const [gimbalAngles, setGimbalAngles] = useState({
    'curve-cob': 15,
    'moveable-cob': 35
  })

  // Rope Light Active Thumbnail in 6-Photo Gallery
  const [activeRopeThumb, setActiveRopeThumb] = useState(0)

  // Twinkle String Light Active Shimmer Mode
  const [twinkleMode, setTwinkleMode] = useState('firefly')

  // Product Detail Modal / Bottom Sheet
  const [inspectedProduct, setInspectedProduct] = useState(null)
  const [modalActiveImage, setModalActiveImage] = useState(null)

  // Showroom Grid Ref
  const showroomGridRef = useRef(null)

  // Atelier Consultation Modal
  const [consultModalOpen, setConsultModalOpen] = useState(false)
  const [activeCardId, setActiveCardId] = useState(null)

  // Prevent background page scrolling while any modal or mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen || inspectedProduct || consultModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen, inspectedProduct, consultModalOpen])

  // Clear touched/active card on outside tap
  useEffect(() => {
    const handleOutsideInteraction = (e) => {
      if (!e.target.closest('.as-product-card')) {
        setActiveCardId(null)
      }
    }
    document.addEventListener('click', handleOutsideInteraction)
    document.addEventListener('touchstart', handleOutsideInteraction, { passive: true })
    return () => {
      document.removeEventListener('click', handleOutsideInteraction)
      document.removeEventListener('touchstart', handleOutsideInteraction)
    }
  }, [])

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    projectType: 'Private Residence / Villa',
    interest: 'Architectural & Studio Collection',
    notes: ''
  })

  // PowerPoint-style cinematic Hero Reveal animation state & observer
  const [heroAnimated, setHeroAnimated] = useState(false)
  const heroRef = useRef(null)
  const wasHeroAwayRef = useRef(false)

  // Scroll listener for sticky glass nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hero Presentation Sequence Trigger & Replay on Return
  useEffect(() => {
    // Initial sequential reveal on page load
    const timer = setTimeout(() => {
      setHeroAnimated(true)
    }, 120)

    const heroEl = heroRef.current
    if (!heroEl) return () => clearTimeout(timer)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (wasHeroAwayRef.current) {
            // Replay presentation when user returns to hero section
            setHeroAnimated(false)
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setHeroAnimated(true)
              })
            })
            wasHeroAwayRef.current = false
          }
        } else {
          // User scrolled away from hero section
          wasHeroAwayRef.current = true
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(heroEl)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  // Editorial Story ("Light Changes Everything") & Festive Introduction Scroll Observers
  const [storyRevealed, setStoryRevealed] = useState(false)
  const storyRef = useRef(null)
  const [festiveRevealed, setFestiveRevealed] = useState(false)
  const festiveRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === storyRef.current) {
              setStoryRevealed(true)
            } else if (entry.target === festiveRef.current) {
              setFestiveRevealed(true)
            }
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const storyEl = storyRef.current
    const festiveEl = festiveRef.current
    if (storyEl) observer.observe(storyEl)
    if (festiveEl) observer.observe(festiveEl)

    return () => observer.disconnect()
  }, [])

  // Set Default Atelier Theme CSS Variables on DOM Root
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--dimmer-bg', '#FAF7F2')
    root.style.setProperty('--dimmer-surface', '#FFFFFF')
    root.style.setProperty('--dimmer-text', '#161513')
    root.style.setProperty('--dimmer-text-muted', '#736C63')
    root.style.setProperty('--dimmer-border', 'rgba(22, 21, 19, 0.08)')
    root.style.setProperty('--dimmer-bloom-opacity', '0.20')
    root.style.setProperty('--dimmer-halo-color', 'rgba(201, 122, 82, 0.25)')
  }, [])

  // 3D Card Perspective Tilt Effect on Desktop
  const handleCardMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
  }

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = ''
  }

  // Handle Variant Selection
  const handleSelectVariant = (productId, variantIdx) => {
    setVariantSelections(prev => ({
      ...prev,
      [productId]: variantIdx
    }))
    if (productId === 'rope-light') {
      setActiveRopeThumb(variantIdx)
    }
  }

  // Handle Form Submission for Project Consultation
  const handleConsultSubmit = (e) => {
    e.preventDefault()
    const text = `Hi Pearl Lighting Studio!
Client Name: ${formState.name}
Phone: ${formState.phone}
Project Type: ${formState.projectType}
Collection Interest: ${formState.interest}
Notes: ${formState.notes || 'Inquiring about lighting specifications & catalogue.'}`

    // Asynchronously log enquiry to server handler
    try {
      fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          phone: formState.phone,
          productName: `Consultation: ${formState.projectType || 'Custom Project'} - ${formState.interest || 'Architectural Lighting'}`,
          message: formState.notes || 'Project consultation inquiry',
          category: 'consultation'
        })
      }).catch((err) => console.debug('[Enquiry API] Handled:', err))
    } catch (_) {}

    const targetUrl = `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`
    const win = window.open(targetUrl, '_blank', 'noopener,noreferrer')
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = targetUrl
    }
    setConsultModalOpen(false)
  }

  // When opening product modal, initialize the active preview image
  const handleOpenDetailModal = (product) => {
    setInspectedProduct(product)
    const selIdx = variantSelections[product.id] || 0
    if (product.variants && product.variants[selIdx]) {
      setModalActiveImage(product.variants[selIdx].image)
    } else if (product.hasGallerySlider && product.gallery) {
      setModalActiveImage(product.gallery[activeRopeThumb].image)
    } else {
      setModalActiveImage(product.image || product.primaryImage?.image)
    }
  }

  return (
    <div className="as-landing">
      {/* Dynamic Ambient Background Glow Bloom Orbs */}
      <div className="as-ambient-lights" aria-hidden="true">
        <div className="as-bloom-orb as-bloom-1"></div>
        <div className="as-bloom-orb as-bloom-2"></div>
        <div className="as-bloom-orb as-bloom-3"></div>
      </div>

      {/* ====================================================================
          1. FLOATING GLASS NAVIGATION (Featuring Real Pearl Lighting Logo)
          ==================================================================== */}
      <header className={`as-nav-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <div className="as-nav-glass">
          {/* Brand Left with Real Logo Asset */}
          <a href="#top" className="as-brand" aria-label="Pearl Lighting Home">
            <img
              src="/images/logo/pearl-lightings-logo-transparent.png"
              alt="Pearl Lightings — Parth Enterprises"
              className="as-brand-logo-img"
            />
            <div className="as-brand-text">
              <span className="as-brand-title">{STUDIO_INFO.brandName}</span>
              <span className="as-brand-subtitle">Atelier · Mumbai</span>
            </div>
          </a>

          {/* Center Links */}
          <nav className="as-nav-desktop-menu" aria-label="Main Navigation">
            <ul className="as-nav-links">
              <li>
                <a href="#story" className="as-nav-link">Our Story</a>
              </li>
              <li>
                <a href="#architectural-collection" className="as-nav-link">Architectural Series</a>
              </li>
              <li>
                <a href="#craftsmanship" className="as-nav-link">Living Spaces</a>
              </li>
              <li>
                <a
                  href="/festive-collection"
                  onClick={(e) => {
                    e.preventDefault()
                    if (onNavigateToFestive) onNavigateToFestive()
                  }}
                  className="as-nav-link as-nav-festive-badge"
                  title="Explore Festive Collection"
                >
                  <span>Festive Series</span>
                  <span className="as-nav-sparkle">✨</span>
                </a>
              </li>
              <li>
                <a href="#studio" className="as-nav-link">Studio Atelier</a>
              </li>
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="as-nav-actions">
            {/* Minimalist Inquire Button */}
            <button
              className="as-btn-inquire"
              onClick={() => setConsultModalOpen(true)}
              aria-label="Open project inquiry consultation"
            >
              <span>Inquire</span>
              <span className="as-btn-inquire-arrow">↗</span>
            </button>
          </div>
        </div>

        {/* Mobile Frosted Drawer */}
        <div className={`as-mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="as-drawer-brand-header">
            <img
              src="/images/logo/pearl-lightings-logo-transparent.png"
              alt="Pearl Lightings Logo"
              className="as-drawer-logo"
            />
            <button
              className="as-drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <nav className="as-drawer-nav">
            <a href="#top" onClick={() => setMobileMenuOpen(false)}>
              Overview <span>↗</span>
            </a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)}>
              The Atelier Story <span>↗</span>
            </a>
            <a href="#architectural-collection" onClick={() => setMobileMenuOpen(false)}>
              Architectural Collection (7 Pieces) <span>↗</span>
            </a>
            <a href="#craftsmanship" onClick={() => setMobileMenuOpen(false)}>
              Light in Living Spaces <span>↗</span>
            </a>
            <a
              href="/festive-collection"
              onClick={(e) => {
                e.preventDefault()
                setMobileMenuOpen(false)
                if (onNavigateToFestive) onNavigateToFestive()
              }}
              className="as-drawer-highlight"
            >
              Festive Series ✨ <span>↗</span>
            </a>
            <a href="#studio" onClick={() => setMobileMenuOpen(false)}>
              Kalbadevi Studio Details <span>↗</span>
            </a>
          </nav>
          <div className="as-drawer-actions">
            <button
              className="as-btn-primary"
              style={{ justifyContent: 'center' }}
              onClick={() => {
                setMobileMenuOpen(false)
                setConsultModalOpen(true)
              }}
            >
              <span>Request Consultation ↗</span>
            </button>
            <a
              href={`https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent("Hi Pearl Lighting Studio, I would like to inquire about your lighting collections.")}`}
              target="_blank"
              rel="noreferrer"
              className="as-footer-btn-wa"
              style={{ justifyContent: 'center' }}
            >
              <span>WhatsApp Atelier Directly</span>
            </a>
          </div>
        </div>
      </header>

      {/* ====================================================================
          2. FULL-WIDTH IMMERSIVE CINEMATIC HERO
          (Inspired by Reference Image 1: Edge-to-Edge Architectural Living Room)
          ==================================================================== */}
      <section
        className={`as-hero-cinematic ${heroAnimated ? 'as-hero-animated' : ''}`}
        id="top"
        ref={heroRef}
      >
        {/* Full-width lighting photograph background spanning edge-to-edge */}
        <div className="as-hero-backdrop-wrap" aria-hidden="true">
          <img
            src="/images/editorial/cinematic-living-room-hero.jpg"
            alt="Pearl Lighting Architectural Living Space — Light Is My Life, Pearl Is My Light"
            className="as-hero-backdrop-media"
            loading="eager"
          />
          {/* Subtle natural filmic scrim: keeps photograph glowing while guaranteeing crisp contrast */}
          <div className="as-hero-scrim-layer"></div>
        </div>

        {/* Content art-directed directly over the photograph — unified composition */}
        <div className="as-hero-stage-container">
          <div className="as-hero-stage-core">
            {/* 1. First: Top Label */}
            <div className="as-hero-kicker-mark as-reveal-kicker">
              <span className="as-kicker-amber-dot"></span>
              <span className="as-kicker-text">PEARL LIGHTING · PARTH ENTERPRISES · MUMBAI</span>
            </div>

            {/* 2. Next: Main heading revealed phrase by phrase using refined text masks */}
            <h1 className="as-hero-cinema-heading" aria-label="Sculpting Light Into Living Art.">
              <span className="as-reveal-mask">
                <span className="as-reveal-phrase as-phrase-1">Sculpting Light Into</span>
              </span>{' '}
              <span className="as-reveal-mask">
                <span className="as-reveal-phrase as-phrase-2 as-hero-italic-word">Living</span>
              </span>{' '}
              <span className="as-reveal-mask">
                <span className="as-reveal-phrase as-phrase-3 as-hero-italic-word">Art.</span>
              </span>
            </h1>

            {/* 3. Then: Tagline quote */}
            <div className="as-hero-brandline-composition as-reveal-tagline">
              <span className="as-brandline-whisper-rule" aria-hidden="true"></span>
              <p className="as-hero-brandline-quote">
                “Light Is My Life, Pearl Is My Light.”
              </p>
              <span className="as-brandline-whisper-rule" aria-hidden="true"></span>
            </div>

            {/* 4. Next: Description text line by line */}
            <p className="as-hero-cinema-narrative">
              <span className="as-narrative-line-mask">
                <span className="as-narrative-line as-reveal-desc-1">
                  Where organic sculptural elegance meets architectural discipline.
                </span>
              </span>{' '}
              <span className="as-narrative-line-mask">
                <span className="as-narrative-line as-reveal-desc-2">
                  Mastercrafted luminaires illuminating distinguished private residences, penthouses, and luxury spaces across Mumbai and beyond.
                </span>
              </span>
            </p>

            {/* 5. Finally: Three CTA buttons one after another */}
            <div className="as-hero-cinema-ctas">
              <a href="#architectural-collection" className="as-btn-cinema-main as-reveal-cta-1">
                <span>Explore Architectural Series</span>
                <span className="as-btn-arrow-icon" aria-hidden="true">↓</span>
              </a>
              <a
                href="/festive-collection"
                onClick={(e) => {
                  e.preventDefault()
                  if (onNavigateToFestive) onNavigateToFestive()
                }}
                className="as-btn-cinema-festive as-reveal-cta-2"
              >
                <span>Festive Illumination ✨</span>
              </a>
              <a href="#story" className="as-btn-cinema-outline as-reveal-cta-3">
                <span>The Lighting Philosophy</span>
                <span className="as-btn-arrow-icon" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* 6. Last: Bottom navigation labels */}
          <div className="as-hero-bottom-manifest as-reveal-manifest">
            <div className="as-manifest-item as-reveal-manifest-item-1">
              <span className="as-manifest-idx">01</span>
              <span className="as-manifest-label">Architectural Series</span>
            </div>
            <span className="as-manifest-separator" aria-hidden="true">/</span>
            <div className="as-manifest-item as-reveal-manifest-item-2">
              <span className="as-manifest-idx">02</span>
              <span className="as-manifest-label">Sculptural Craft</span>
            </div>
            <span className="as-manifest-separator" aria-hidden="true">/</span>
            <div className="as-manifest-item as-reveal-manifest-item-3">
              <span className="as-manifest-idx">03</span>
              <span className="as-manifest-label">Festive Collection</span>
            </div>
            <span className="as-manifest-separator" aria-hidden="true">/</span>
            <div className="as-manifest-item as-reveal-manifest-item-4">
              <span className="as-manifest-idx">04</span>
              <span className="as-manifest-label">Kalbadevi Studio · Mumbai</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. PEARL LIGHTING BRAND SIGNATURE
          (Architectural Brand Signature inspired by Ivory Paper & Wooden Slats)
          ==================================================================== */}
      <section
        ref={storyRef}
        className={`as-brand-signature-section ${storyRevealed ? 'as-sig-revealed' : ''}`}
        id="story"
      >
        <div id="craftsmanship" className="as-craftsmanship-anchor" />
        <div className="as-container">
          {/* Top Atelier Kicker */}
          <div className="as-sig-eyebrow as-sig-anim-1">
            <span className="as-sig-eyebrow-num">01</span>
            <span className="as-sig-eyebrow-sep">/</span>
            <span className="as-sig-eyebrow-text">ATELIER BRAND SIGNATURE · MUMBAI</span>
          </div>

          <div className="as-sig-editorial-spread">
            {/* Left: The Tactile Architectural Stationery Brand Signature (Actual Luxury Photograph) */}
            <div className="as-sig-presentation-column">
              <div className="as-sig-photo-frame as-sig-anim-photo">
                <img
                  src="/images/editorial/brand-signature-paper-wood.jpg"
                  alt="Pearl Lighting Brand Signature — Ivory paper, natural wooden slats, embossed champagne-gold identity"
                  className="as-sig-featured-photo"
                  loading="lazy"
                />
                <div className="as-sig-photo-glare" aria-hidden="true" />
              </div>

              {/* Restrained Editorial Detail: Intentionally anchors & balances left column */}
              <div className="as-sig-presentation-detail as-sig-anim-detail">
                <div className="as-sig-detail-divider" aria-hidden="true" />
                <div className="as-sig-detail-meta">
                  <span className="as-sig-detail-label">LIGHT, CRAFTED WITH INTENTION</span>
                  <span className="as-sig-detail-marker">01 · SPECIFICATION</span>
                </div>
                <p className="as-sig-detail-desc">
                  Architectural and decorative illumination, thoughtfully curated in Mumbai.
                </p>
                <div className="as-sig-detail-footnote">
                  <span className="as-sig-detail-coord">18.9220° N, 72.8347° E</span>
                  <span className="as-sig-detail-sep">/</span>
                  <span className="as-sig-detail-provenance">STUDIO ARCHIVE · PRIVATE ATELIER</span>
                </div>
              </div>
            </div>

            {/* Right: Integrated Lighting Architecture & Tactile Craftsmanship */}
            <div className="as-sig-context-column">
              <div className="as-sig-context-header as-sig-anim-header">
                <span className="as-sig-context-kicker">SPATIAL PHILOSOPHY</span>
                <h3 className="as-sig-context-title">
                  Sculpting Luminance as <em>Living Architecture.</em>
                </h3>
                <p className="as-sig-context-lead">
                  In distinguished penthouses, private villas, and curated residences across Mumbai, Pearl Lighting treats illumination not as fixtures upon a ceiling, but as the quiet emotional medium through which space lives.
                </p>
                <p className="as-sig-context-body">
                  By pairing deep recessed baffles with high-CRI color discipline and hand-patinated metals, our luminaires eliminate harsh daylight glare in favour of balanced, warm evening depth.
                </p>
              </div>

              {/* Asymmetrical Real Imagery Composition: Two Real Lighting Photographs */}
              <div className="as-sig-photo-montage">
                {/* 1. Larger Architectural Interior with Sculptural Lighting */}
                <div className="as-sig-photo-dominant as-sig-anim-photo-1">
                  <div className="as-sig-photo-dominant-frame">
                    <img
                      src="/images/hero-organic-chandelier.jpg"
                      alt="Double-height living salon illuminated by Pearl Lighting architectural luminaire"
                      className="as-sig-photo-dominant-img"
                      loading="lazy"
                    />
                    <div className="as-sig-photo-scrim" />
                    <span className="as-sig-photo-badge">RESIDENCE AT MALABAR HILL · LIVING SALON</span>
                  </div>
                  <div className="as-sig-photo-dominant-caption">
                    <span className="as-sig-caption-tag">FIG. 01 · ARCHITECTURAL SCALE</span>
                    <span className="as-sig-caption-desc">Continuous 3000K perimeter warmth paired with organic sculptural focal illumination.</span>
                  </div>
                </div>

                {/* 2. Smaller Close-Up Showing Craftsmanship & Detail */}
                <div className="as-sig-photo-detail as-sig-anim-photo-2">
                  <div className="as-sig-photo-detail-frame">
                    <img
                      src="/images/craft-brass-crystal.jpg"
                      alt="Tactile metallurgy and crystal refraction craft in Pearl Lighting luminaires"
                      className="as-sig-photo-detail-img"
                      loading="lazy"
                    />
                    <div className="as-sig-photo-scrim" />
                  </div>
                  <div className="as-sig-photo-detail-caption">
                    <span className="as-sig-caption-tag">FIG. 02 · TACTILE METALLURGY</span>
                    <span className="as-sig-caption-desc">Cast brass discipline and multi-faceted crystal refraction.</span>
                  </div>
                </div>
              </div>

              {/* Atelier Hallmark Criteria & Transition */}
              <div className="as-sig-footer-spread as-sig-anim-hallmarks">
                <div className="as-sig-hallmarks">
                  <div className="as-sig-hallmark-item">
                    <span className="as-hallmark-num">I</span>
                    <div>
                      <strong>CRI 90+ Fidelity</strong>
                      <span>Honours teak, Italian marble, and linen in true depth</span>
                    </div>
                  </div>
                  <div className="as-sig-hallmark-item">
                    <span className="as-hallmark-num">II</span>
                    <div>
                      <strong>Deep Optical Cut-Off</strong>
                      <span>Zero peripheral glare from normal viewing angles</span>
                    </div>
                  </div>
                </div>

                <div className="as-sig-nav-hint">
                  <a href="#architectural-collection" className="as-sig-catalog-link">
                    <span>Explore Architectural Series</span>
                    <span className="as-sig-arrow" aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. REGULAR ARCHITECTURAL COLLECTION (All 7 Core Families)
          ==================================================================== */}
      <section className="as-collection-section" id="architectural-collection">
        {/* Master Dimmer & Mode Control Bar */}
        <div className="as-catalog-master-bar">
          <div className="as-container">
            <div className="as-catalog-bar-inner">
              <div className="as-catalog-meta-info">
                <span className="as-catalog-tag">Collection 01</span>
                <span className="as-catalog-title">Architectural &amp; Studio Lighting · 7 Families</span>
              </div>

              {/* Collection Navigator Bar */}
              <div className="as-filter-switcher" role="tablist" aria-label="Showroom Collection Mode">
                <button
                  type="button"
                  role="tab"
                  aria-selected={true}
                  className="as-filter-btn active"
                  id="btn-architectural-collection"
                >
                  <span>Architectural Series</span>
                  <span className="as-badge-pill">07</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={false}
                  className="as-filter-btn as-filter-btn-festive"
                  onClick={() => {
                    if (onNavigateToFestive) onNavigateToFestive()
                  }}
                  id="btn-showroom-festive-anchor"
                  title="Explore Dedicated Festive Collection Page"
                >
                  <span className="as-sparkle-dot" aria-hidden="true">✦</span>
                  <span>Explore Festive Collection</span>
                  <span className="as-badge-pill">{festiveProducts.length}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="as-container">
          <div className="as-collection-intro">
            <div className="as-collection-badge">
              <span>Collection 01 · Architectural Series</span>
            </div>
            <h2 className="as-collection-heading">
              Precision Engineering meets <em>Artisanal Elegance.</em>
            </h2>
            <p className="as-collection-subheading">
              Curated downlights, surface profiles, adjustable gimbals, flood luminaires, and continuous flexible contour rope lights.
            </p>
          </div>

          {/* Showroom Grid */}
          <div className="as-showroom-grid-wrap" ref={showroomGridRef}>
            <div className="as-showroom-grid">
              {architecturalProducts.map((product) => {
                const selIdx = variantSelections[product.id] || 0
                const currentVariant = product.variants ? product.variants[selIdx] : null
                const displayImage = product.id === 'rope-light'
                  ? (product.primaryImage?.image || product.image || (product.variants && product.variants[0]?.image))
                  : (currentVariant
                    ? currentVariant.image
                    : product.hasGallerySlider && product.gallery
                    ? product.gallery[activeRopeThumb]?.image || product.primaryImage?.image
                    : product.image || product.primaryImage?.image)

                  const gimbalAngle = gimbalAngles[product.id] || 0

                  let spanClass = 'as-span-6'
                  if (product.id === 'rope-light') spanClass = 'as-card-rope-showcase as-span-12'
                  else if (product.id === 'slim-panel' || product.id === 'surface-panel' || product.id === 'deep-downlight') spanClass = 'as-span-4'
                  else if (product.id === 'curve-cob') spanClass = 'as-span-7'
                  else if (product.id === 'moveable-cob') spanClass = 'as-span-5'
                  else if (product.id === 'led-flood-light') spanClass = 'as-span-12 as-card-flood-split'

                  const isCardActive = activeCardId === product.id

                  return (
                    <article
                      key={product.id}
                      className={`as-product-card ${spanClass} ${isCardActive ? 'is-active' : ''}`}
                      tabIndex={0}
                      onClick={() => {
                        setActiveCardId(prev => (prev === product.id ? null : product.id))
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          if (e.target === e.currentTarget) {
                            e.preventDefault()
                            setActiveCardId(prev => (prev === product.id ? null : product.id))
                          }
                        }
                      }}
                      onMouseMove={handleCardMouseMove}
                      onMouseLeave={handleCardMouseLeave}
                      aria-label={`${product.name} — ${product.subtitle}`}
                    >
                      <div className="as-card-glare" aria-hidden="true"></div>

                      <div className="as-card-badge">
                        {product.badge}
                      </div>

                      <div className="as-card-media-box">
                        <img
                          src={displayImage}
                          alt={product.name}
                          className="as-card-img"
                          loading="lazy"
                          style={{
                            transform: product.has3DSlider
                              ? `rotateY(${gimbalAngle}deg) rotateZ(${gimbalAngle * 0.15}deg)`
                              : 'none'
                          }}
                        />

                        {product.has3DSlider && (
                          <div className="as-gimbal-sim-box" aria-hidden="true">
                            <div
                              className="as-beam-cone"
                              style={{
                                transform: `rotate(${gimbalAngle * 0.9}deg)`,
                                opacity: 0.35 + (Math.abs(gimbalAngle) / 45) * 0.35
                              }}
                            ></div>
                          </div>
                        )}
                      </div>

                      <div className="as-card-content">
                        <div className="as-card-header">
                          <span className="as-card-num">{product.number}</span>
                          <h3 className="as-card-title">{product.name}</h3>
                          <span className="as-card-subtitle">{product.subtitle}</span>
                        </div>

                        <p className="as-card-desc">{product.description}</p>

                        {/* Card Actions CTA — Side-by-Side View Details & WhatsApp Matching Reference */}
                        <div className="as-card-actions" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="as-btn-inspect"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenDetailModal(product)
                            }}
                          >
                            <span>View Details</span>
                            <span className="as-btn-arrow">↗</span>
                          </button>

                          <a
                            href={getWhatsAppEnquiryUrl(product.name, currentVariant?.label)}
                            target="_blank"
                            rel="noreferrer"
                            className="as-btn-card-wa"
                            onClick={(e) => e.stopPropagation()}
                            title={`Enquire about ${product.name} on WhatsApp`}
                            aria-label={`Enquire about ${product.name} on WhatsApp`}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
                            </svg>
                            <span>WhatsApp</span>
                          </a>
                          <EmailEnquiryButton product={{ ...product, selectedVariant: currentVariant?.label }} />
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

      {/* ====================================================================
          5. FESTIVE COLLECTION EDITORIAL PREVIEW (Pure Luxury, Zero 3D)
          ==================================================================== */}
      <FestiveHomepagePreview onExploreFestive={onNavigateToFestive} />

      {/* ====================================================================
          7. EDITORIAL FOOTER & ATELIER DETAILS
          (Featuring Real Pearl Lighting Logo & Verified Contact Info)
          ==================================================================== */}
      <footer className="as-footer" id="studio">
        <div className="as-footer-statement-shell">
          <div className="as-footer-statement-card">
            <div className="as-footer-eyebrow">
              <span>Atelier Inquiries</span>
            </div>

            <h2 className="as-footer-statement-title">
              Let's make <em>something glow.</em>
            </h2>

            <p className="as-footer-statement-sub">
              Whether you are curating architectural luminaires for a contemporary residence or seeking festive lighting for grand celebrations.
            </p>

            <div className="as-footer-cta-group">
              <a
                href={getWhatsAppEnquiryUrl("Pearl Lighting Collections")}
                target="_blank"
                rel="noreferrer"
                className="as-footer-btn-wa"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
                </svg>
                <span>Start a Conversation</span>
                <span>↗</span>
              </a>

              <button
                className="as-footer-btn-inquiry"
                onClick={() => setConsultModalOpen(true)}
              >
                <span>Request Project Consultation</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="as-container">
          <div className="as-footer-grid">
            <div className="as-footer-col-brand">
              <img
                src="/images/logo/pearl-lightings-logo-transparent.png"
                alt="Pearl Lightings Logo"
                className="as-footer-logo-img"
              />
              <p className="as-footer-brand-bio">
                {STUDIO_INFO.brandName} — {STUDIO_INFO.parentCompany}
              </p>
              <p className="as-footer-brand-motto">
                “{STUDIO_INFO.tagline}” Handcrafted illumination born in Kalbadevi, Mumbai.
              </p>
            </div>

            <div>
              <div className="as-footer-col-title">Collections</div>
              <ul className="as-footer-links">
                <li>
                  <a href="#architectural-collection">
                    Architectural & Studio Series
                  </a>
                </li>
                <li>
                  <a
                    href="/festive-collection"
                    onClick={(e) => {
                      e.preventDefault()
                      if (onNavigateToFestive) onNavigateToFestive()
                    }}
                  >
                    Diwali &amp; Festive Illumination
                  </a>
                </li>
                <li><a href="#story">Our Approach</a></li>
                <li><a href="#craftsmanship">Living Spaces</a></li>
              </ul>
            </div>

            <div>
              <div className="as-footer-col-title">Studio Location</div>
              <p className="as-footer-address">
                <strong>{STUDIO_INFO.brandName}</strong><br/>
                {STUDIO_INFO.parentCompany}<br/>
                {STUDIO_INFO.address.line1}<br/>
                {STUDIO_INFO.address.line2}<br/>
                {STUDIO_INFO.address.city} – {STUDIO_INFO.address.pincode}, {STUDIO_INFO.address.state}
              </p>
            </div>

            <div>
              <div className="as-footer-col-title">Direct Connection</div>
              <div className="as-footer-contact-item">
                <span>Phone & WhatsApp</span>
                <a href={`tel:${STUDIO_INFO.phone}`}>{STUDIO_INFO.phone}</a>
              </div>
              <div className="as-footer-contact-item">
                <span>Direct Inquiries</span>
                <a href={`mailto:${STUDIO_INFO.email}`}>{STUDIO_INFO.email}</a>
              </div>
              <div className="as-footer-contact-item">
                <span>Visual Journal</span>
                <a href={STUDIO_INFO.instagramUrl} target="_blank" rel="noreferrer">
                  {STUDIO_INFO.instagram} ↗
                </a>
              </div>
            </div>
          </div>

          <div className="as-footer-legal-bar">
            <span>
              © {new Date().getFullYear()} {STUDIO_INFO.brandName} · {STUDIO_INFO.parentCompany}. All rights reserved.
            </span>

            <button
              className="as-footer-back-top"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span>Back to Top</span>
              <span>↑</span>
            </button>

            {onSwitchToCollage && (
              <button
                className="as-footer-back-top"
                onClick={onSwitchToCollage}
                style={{ color: 'var(--as-copper-accent)' }}
              >
                <span>View Collage Showcase ↗</span>
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* ====================================================================
          STICKY MOBILE ACTION DOCK (Touch-First UX)
          ==================================================================== */}
      <aside className="as-mobile-sticky-dock" aria-label="Mobile quick actions">
        <div className="as-dock-inner">
          <a
            href={getWhatsAppEnquiryUrl('Pearl Lighting Collection')}
            target="_blank"
            rel="noreferrer"
            className="as-dock-btn-wa"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
            </svg>
            <span>WhatsApp Enquiry</span>
          </a>

          <a
            href="/festive-collection"
            onClick={(e) => {
              e.preventDefault()
              if (onNavigateToFestive) onNavigateToFestive()
            }}
            className="as-dock-btn-toggle"
          >
            <span>Festive Range ✨</span>
          </a>
        </div>
      </aside>

      {/* ====================================================================
          PRODUCT DETAIL VIEW (Modal on Desktop / Bottom Sheet on Mobile)
          ==================================================================== */}
      {inspectedProduct && (
        <div
          className="as-sheet-backdrop"
          onClick={() => setInspectedProduct(null)}
          role="dialog"
          aria-modal="true"
          aria-label={inspectedProduct.name}
        >
          <div
            className="as-sheet-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="as-sheet-handle-bar">
              <div className="as-sheet-handle-pill"></div>
            </div>

            <button
              className="as-sheet-close-btn"
              onClick={() => setInspectedProduct(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <div className="as-sheet-scrollable">
              {/* Product Header */}
              <div className="as-sheet-badge-strip">
                <span className="as-card-badge">
                  {inspectedProduct.badge}
                </span>
                <span className="as-sheet-category-tag">
                  {inspectedProduct.category}
                </span>
              </div>

              <h3 className="as-sheet-title">
                {inspectedProduct.name}
              </h3>
              <p className="as-sheet-desc">
                {inspectedProduct.description}
              </p>

              {/* Main Image Display */}
              <div className="as-sheet-img-wrap">
                <img
                  src={modalActiveImage || inspectedProduct.image || inspectedProduct.primaryImage?.image}
                  alt={inspectedProduct.name}
                  className="as-sheet-main-img"
                  style={{
                    transform: inspectedProduct.has3DSlider
                      ? `rotateY(${gimbalAngles[inspectedProduct.id] || 0}deg) rotateZ(${(gimbalAngles[inspectedProduct.id] || 0) * 0.15}deg)`
                      : 'none',
                    transition: 'transform 0.1s ease'
                  }}
                />
              </div>

              {/* 3D Aiming Angle Slider inside View Details */}
              {inspectedProduct.has3DSlider && (
                <div className="as-gimbal-control as-sheet-gimbal-box" style={{ margin: '0.85rem 0' }}>
                  <div className="as-gimbal-label">
                    <span>3D Aiming Angle</span>
                    <span className="as-gimbal-value">{gimbalAngles[inspectedProduct.id] || 0}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={gimbalAngles[inspectedProduct.id] || 0}
                    onChange={(e) => {
                      const angle = Number(e.target.value)
                      setGimbalAngles(prev => ({
                        ...prev,
                        [inspectedProduct.id]: angle
                      }))
                    }}
                    className="as-gimbal-slider"
                    aria-label={`Adjust ${inspectedProduct.name} tilt angle`}
                  />
                  <div className="as-gimbal-ticks">
                    <span>-45°</span>
                    <span>0°</span>
                    <span>+45°</span>
                  </div>
                </div>
              )}

              {/* Variant Selector Pills (Updates main image) */}
              {inspectedProduct.variants && inspectedProduct.variants.length > 1 && (
                <div className="as-variant-chips-container as-sheet-variants-box">
                  <span className="as-variant-label">Choose Variant:</span>
                  <div className="as-variant-pills">
                    {inspectedProduct.variants.map((v, vIdx) => {
                      const isSel = (variantSelections[inspectedProduct.id] || 0) === vIdx
                      return (
                        <button
                          key={v.id}
                          type="button"
                          className={`as-variant-pill ${isSel ? 'active' : ''}`}
                          onClick={() => {
                            handleSelectVariant(inspectedProduct.id, vIdx)
                            setModalActiveImage(v.image)
                          }}
                        >
                          {v.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Gallery Thumbnails (Rope Light 6 photos, etc.) */}
              {inspectedProduct.hasGallerySlider && inspectedProduct.gallery && (
                <div className="as-sheet-gallery-section">
                  <span className="as-variant-label">
                    Verified Product Gallery ({inspectedProduct.gallery.length} Views):
                  </span>
                  <div className="as-sheet-gallery-track">
                    {inspectedProduct.gallery.map((thumb, tIdx) => (
                      <div
                        key={thumb.id}
                        className={`as-sheet-gallery-thumb ${modalActiveImage === thumb.image ? 'active' : ''}`}
                        onClick={() => {
                          setActiveRopeThumb(tIdx)
                          handleSelectVariant(inspectedProduct.id, tIdx)
                          setModalActiveImage(thumb.image)
                        }}
                      >
                        <img src={thumb.image} alt={thumb.title} />
                        <span className="as-sheet-gallery-caption">
                          {thumb.title.split(' ')[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Photography Gallery (Festive multi-spools, twinkle lit, bokeh lifestyles) */}
              {!inspectedProduct.hasGallerySlider && inspectedProduct.additionalImages && inspectedProduct.additionalImages.length > 0 && (
                <div className="as-sheet-gallery-section">
                  <span className="as-variant-label">
                    Authentic Photography ({inspectedProduct.additionalImages.length + 1} Views):
                  </span>
                  <div className="as-sheet-gallery-track">
                    <div
                      className={`as-sheet-gallery-thumb ${modalActiveImage === (inspectedProduct.image || inspectedProduct.primaryImage?.image) ? 'active' : ''}`}
                      onClick={() => setModalActiveImage(inspectedProduct.image || inspectedProduct.primaryImage?.image)}
                    >
                      <img src={inspectedProduct.image || inspectedProduct.primaryImage?.image} alt={inspectedProduct.name} />
                      <span className="as-sheet-gallery-caption">Primary</span>
                    </div>
                    {inspectedProduct.additionalImages.map((addImg) => (
                      <div
                        key={addImg.id || addImg.image}
                        className={`as-sheet-gallery-thumb ${modalActiveImage === addImg.image ? 'active' : ''}`}
                        onClick={() => setModalActiveImage(addImg.image)}
                      >
                        <img src={addImg.image} alt={addImg.label || inspectedProduct.name} />
                        <span className="as-sheet-gallery-caption">{addImg.label ? addImg.label.split(' ')[0] : 'Detail'}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Product Details List (No invented specs) */}
              {inspectedProduct.verifiedDetails && inspectedProduct.verifiedDetails.length > 0 && (
                <div className="as-sheet-specs-section">
                  <span className="as-variant-label">
                    Product Details:
                  </span>
                  <div className="as-sheet-specs-box">
                    {inspectedProduct.verifiedDetails.map((detail, dIdx) => (
                      <div className="as-sheet-spec-row" key={dIdx}>
                        <span className="as-sheet-spec-k">{detail.label}</span>
                        <span className="as-sheet-spec-v">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WhatsApp Enquiry Button */}
              <a
                href={getWhatsAppEnquiryUrl(
                  inspectedProduct.name,
                  inspectedProduct.variants ? inspectedProduct.variants[variantSelections[inspectedProduct.id] || 0]?.label : ''
                )}
                target="_blank"
                rel="noreferrer"
                className="as-modal-cta-wa"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
                </svg>
                <span>Enquire about {inspectedProduct.name} on WhatsApp ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          PROJECT CONSULTATION MODAL
          ==================================================================== */}
      {consultModalOpen && (
        <div
          className="as-sheet-backdrop"
          onClick={() => setConsultModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Atelier Consultation Request"
        >
          <div
            className="as-sheet-card as-consult-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="as-sheet-close-btn"
              onClick={() => setConsultModalOpen(false)}
              aria-label="Close modal"
            >
              ×
            </button>

            <div className="as-consult-modal-inner">
              <span className="as-card-badge" style={{ position: 'static', marginBottom: '0.75rem', display: 'inline-block' }}>
                Bespoke Atelier Consultation
              </span>
              <h3 className="as-consult-title">
                Start an Architectural Conversation
              </h3>
              <p className="as-consult-desc">
                Connect directly with our lighting specialists in Kalbadevi, Mumbai for villas, penthouses, and commercial projects.
              </p>

              <form onSubmit={handleConsultSubmit} className="as-consult-form">
                <div className="as-form-group">
                  <label className="as-form-label">Client / Studio Name</label>
                  <input
                    type="text"
                    className="as-form-input"
                    placeholder="e.g. Rohini Mehta"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                  />
                </div>

                <div className="as-form-group">
                  <label className="as-form-label">Phone / WhatsApp Number</label>
                  <input
                    type="tel"
                    className="as-form-input"
                    placeholder="+91 98200 XXXXX"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="as-form-group">
                  <label className="as-form-label">Project Type</label>
                  <select
                    className="as-form-select"
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                  >
                    <option value="Private Residence / Villa">Private Residence / Villa</option>
                    <option value="Luxury Penthouse / Duplex">Luxury Penthouse / Duplex</option>
                    <option value="Fine Dining / Hospitality">Fine Dining / Hospitality</option>
                    <option value="Festive & Seasonal Installation">Festive & Seasonal Installation</option>
                    <option value="Architect / Interior Designer Spec">Architect / Interior Designer Spec</option>
                  </select>
                </div>

                <div className="as-form-group">
                  <label className="as-form-label">Primary Interest</label>
                  <select
                    className="as-form-select"
                    value={formState.interest}
                    onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                  >
                    <option value="Architectural Lighting (Downlights, Panels, Spotlights)">Architectural Lighting (Downlights, Panels, Spotlights)</option>
                    <option value="Diwali & Festive Illumination (Star Curtains, Fairy, Bokeh)">Diwali & Festive Illumination (Star Curtains, Fairy, Bokeh)</option>
                    <option value="Continuous Rope Light Contour Project">Continuous Rope Light Contour Project</option>
                    <option value="Custom Sculptural Lighting Project">Custom Sculptural Lighting Project</option>
                  </select>
                </div>

                <div className="as-form-group">
                  <label className="as-form-label">Project Notes & Details</label>
                  <textarea
                    className="as-form-textarea"
                    rows="3"
                    placeholder="Provide room types, requirements, or aesthetic preferences..."
                    value={formState.notes}
                    onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="as-modal-cta-wa"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
                  </svg>
                  <span>Connect on WhatsApp (+91 83290 45712) ↗</span>
                </button>
                <p style={{ margin: '0.65rem 0 0', fontSize: '0.72rem', color: '#7A756D', textAlign: 'center', lineHeight: '1.4' }}>
                  Opens WhatsApp with your project specifications prefilled. You review and send it directly in WhatsApp.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
