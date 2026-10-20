import React, { useState } from 'react'
import ExhibitionNav from './components/ExhibitionNav'
import CinematicPanelsHero from './components/CinematicPanelsHero'
import TakeACloserLook from './components/TakeACloserLook'
import EditorialStoryJourney from './components/EditorialStoryJourney'
import ArchitecturalChapters from './components/ArchitecturalChapters'
import FestiveNocturneGallery from './components/FestiveNocturneGallery'
import ExhibitionContactScene from './components/ExhibitionContactScene'

/**
 * PEARL LIGHTING — IMMERSIVE DIGITAL LIGHTING EXHIBITION
 * Phase 2 Master Implementation:
 * 1. Opening: cinematic visual panels (Apple reference layout with dominant panel & preview)
 * 2. Next: "Take a closer look" (Spacious dark product presentation with interactive variant selectors)
 * 3. Story: editorial visual journey (Asymmetric, full-width compositions)
 * 4. Architectural collection: visual product chapters (Large image-led compositions + compact index)
 * 5. Festive collection: Celestial Salon atmosphere (Rich gallery with real festive photos at large scale)
 * 6. Final contact scene: Branded visual ending with WhatsApp, email, Instagram actions & studio dock
 */
export default function ExhibitionApp({ onSwitchToOriginal }) {
  const [closerLookVariant, setCloserLookVariant] = useState('curve-cob-rose-gold')
  const [activeEnquiryProduct, setActiveEnquiryProduct] = useState(null)

  const handleSelectVariantForCloserLook = (variantId) => {
    // Map IDs if needed
    if (variantId === 'curve-cob-rose-gold' || variantId === 'curve-cob-duo' || variantId === 'deep-downlight-studio' || variantId === 'deep-downlight-duo' || variantId === 'rope-light-warm') {
      setCloserLookVariant(variantId)
    } else if (variantId === 'chapter-recessed') {
      setCloserLookVariant('deep-downlight-studio')
    } else if (variantId === 'chapter-thermal-cob') {
      setCloserLookVariant('curve-cob-rose-gold')
    } else if (variantId === 'chapter-linear-rope') {
      setCloserLookVariant('rope-light-warm')
    } else {
      setCloserLookVariant('curve-cob-rose-gold')
    }
  }

  const handleOpenEnquiryModal = (product) => {
    setActiveEnquiryProduct(product)
    const el = document.querySelector('#atelier-ending')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="pearl-digital-exhibition-root">
      {/* ── High-End Exhibition Floating Navigation ── */}
      <ExhibitionNav
        onOpenEnquiry={handleOpenEnquiryModal}
        onSwitchToOriginal={onSwitchToOriginal}
      />

      <main id="exhibition-main" tabIndex={-1}>
        {/* ── 01: OPENING — CINEMATIC VISUAL PANELS (Apple Reference) ── */}
        <CinematicPanelsHero
          onSelectVariant={handleSelectVariantForCloserLook}
          onOpenEnquiry={handleOpenEnquiryModal}
        />

        {/* ── 02: “TAKE A CLOSER LOOK” — INTERACTIVE PRODUCT PRESENTATION ── */}
        <TakeACloserLook
          selectedVariantId={closerLookVariant}
          onOpenEnquiry={handleOpenEnquiryModal}
        />

        {/* ── 03: STORY — EDITORIAL VISUAL JOURNEY ── */}
        <EditorialStoryJourney />

        {/* ── 04: ARCHITECTURAL COLLECTION — VISUAL PRODUCT CHAPTERS ── */}
        <ArchitecturalChapters
          onSelectProductForCloserLook={handleSelectVariantForCloserLook}
          onOpenEnquiry={handleOpenEnquiryModal}
        />

        {/* ── 05: FESTIVE COLLECTION — CELESTIAL SALON NOCTURNE ── */}
        <FestiveNocturneGallery
          onOpenEnquiry={handleOpenEnquiryModal}
        />

        {/* ── 06: FINAL CONTACT SCENE — BRANDED ATELIER ENDING ── */}
        <ExhibitionContactScene />
      </main>

      {/* Floating Quick Route Switcher / Comparison Bar */}
      <aside className="exhibition-floating-switcher" aria-label="Redesign comparison bar">
        <div className="switcher-inner">
          <span className="switcher-status-badge">New Exhibition Experience</span>
          <button
            type="button"
            className="switcher-action-btn"
            onClick={onSwitchToOriginal}
            title="View original site for comparison"
          >
            Compare with Original Homepage ↗
          </button>
        </div>
      </aside>

      <style>{`
        .pearl-digital-exhibition-root {
          position: relative;
          min-height: 100vh;
          background-color: #080809;
          color: #FAF7F2;
          overflow-x: hidden;
          width: 100%;
        }

        #exhibition-main {
          position: relative;
          z-index: 1;
        }

        .exhibition-floating-switcher {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          background: rgba(14, 14, 18, 0.92);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(223, 192, 122, 0.35);
          border-radius: 999px;
          padding: 6px 8px 6px 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
          animation: floatIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .switcher-inner {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .switcher-status-badge {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #DFC07A;
          font-weight: 500;
        }

        .switcher-action-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #FAF7F2;
          font-size: 12px;
          padding: 6px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .switcher-action-btn:hover {
          background: #DFC07A;
          color: #0A0A0A;
          border-color: #DFC07A;
        }

        @media (max-width: 600px) {
          .exhibition-floating-switcher {
            bottom: 14px;
            right: 14px;
            left: 14px;
            text-align: center;
            border-radius: 14px;
            padding: 8px 12px;
          }

          .switcher-inner {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  )
}
