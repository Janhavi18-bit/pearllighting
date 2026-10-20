import React, { useState } from 'react'
import ExperienceNav from './components/ExperienceNav'
import Scene1ImmersiveOpening from './components/Scene1ImmersiveOpening'
import Scene2HorizontalGallery from './components/Scene2HorizontalGallery'
import Scene3ProductSpotlight from './components/Scene3ProductSpotlight'
import Scene4BrandStory from './components/Scene4BrandStory'
import Scene5ArchitecturalCollection from './components/Scene5ArchitecturalCollection'
import Scene6FestiveCollection from './components/Scene6FestiveCollection'
import Scene7BrandFinale from './components/Scene7BrandFinale'

/**
 * PEARL LIGHTING — NEW FRONTEND EXPERIENCE: APPLE × SERIP
 * 
 * Scene 1 — Immersive opening (Dominant cinematic lighting visual, editorial headline, restrained navigation)
 * Scene 2 — Horizontal visual gallery (Large landscape panels, dominant active panel + next preview, horizontal snap)
 * Scene 3 — Product spotlight (Prominent real luminaire with meaningful variant selectors and dynamic update)
 * Scene 4 — Brand story (Asymmetric image-led editorial sequence with varied scales, no repeated cards)
 * Scene 5 — Architectural collection (Four distinctive visual chapters with category navigation)
 * Scene 6 — Festive collection (The Celestial Salon with real festive photography and different visual rhythm)
 * Scene 7 — Brand finale (Architectural statement, direct WhatsApp, email, Instagram actions & Mumbai atelier dock)
 */
export default function PearlExperienceApp({ onSwitchToOriginal }) {
  const [selectedSpotlightVariant, setSelectedSpotlightVariant] = useState('curve-cob-rose-gold')

  const handleSelectSpotlight = (variantId) => {
    setSelectedSpotlightVariant(variantId)
    const target = document.querySelector('#scene-spotlight')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleOpenConsultation = () => {
    const target = document.querySelector('#scene-finale')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="pearl-apple-serip-app">
      {/* Restrained Architectural Navigation */}
      <ExperienceNav onSwitchToOriginal={onSwitchToOriginal} />

      <main id="main-experience" tabIndex={-1}>
        {/* SCENE 1 — IMMERSIVE OPENING */}
        <Scene1ImmersiveOpening />

        {/* SCENE 2 — HORIZONTAL VISUAL GALLERY */}
        <Scene2HorizontalGallery
          onSelectProductForSpotlight={handleSelectSpotlight}
        />

        {/* SCENE 3 — PRODUCT SPOTLIGHT */}
        <Scene3ProductSpotlight
          selectedVariantId={selectedSpotlightVariant}
          onOpenEnquiry={handleOpenConsultation}
        />

        {/* SCENE 4 — BRAND STORY */}
        <Scene4BrandStory />

        {/* SCENE 5 — ARCHITECTURAL COLLECTION */}
        <Scene5ArchitecturalCollection
          onSelectProductForSpotlight={handleSelectSpotlight}
        />

        {/* SCENE 6 — FESTIVE COLLECTION */}
        <Scene6FestiveCollection />

        {/* SCENE 7 — BRAND FINALE */}
        <Scene7BrandFinale />
      </main>

      {/* Floating Preview Switcher Pill */}
      {onSwitchToOriginal && (
        <aside className="exp-floating-toggle" aria-label="Experience switcher">
          <div className="toggle-inner">
            <span className="toggle-badge">Apple × Serip Frontend Experience</span>
            <button
              type="button"
              className="toggle-btn"
              onClick={onSwitchToOriginal}
              title="Compare with legacy homepage"
            >
              Compare with Legacy View ↗
            </button>
          </div>
        </aside>
      )}

      <style>{`
        .pearl-apple-serip-app {
          position: relative;
          min-height: 100vh;
          background-color: #121110;
          color: #FAF7F2;
          overflow-x: hidden;
          width: 100%;
        }

        #main-experience {
          position: relative;
          z-index: 1;
        }

        .exp-floating-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          background: rgba(14, 13, 12, 0.94);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(223, 192, 122, 0.4);
          border-radius: 999px;
          padding: 6px 8px 6px 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }

        .toggle-inner {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .toggle-badge {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #DFC07A;
          font-weight: 500;
        }

        .toggle-btn {
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

        .toggle-btn:hover {
          background: #DFC07A;
          color: #0A0A0A;
          border-color: #DFC07A;
        }

        @media (max-width: 600px) {
          .exp-floating-toggle {
            bottom: 14px;
            right: 14px;
            left: 14px;
            border-radius: 14px;
            padding: 8px 12px;
          }
          .toggle-inner {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  )
}
