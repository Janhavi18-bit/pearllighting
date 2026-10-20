import React, { useRef, useEffect, useState } from 'react'

/**
 * TypographicTransition - Section 02: Cinematic Brand Film Transition
 * Conforms to exact specifications:
 * - GIANT TYPOGRAPHY:
 *   LIGHT
 *   IS NOT
 *   JUST
 *   ILLUMINATION.
 * - Minimal text, large negative space, warm architectural lighting shift
 * - Acts as an emotional bridge before presenting products
 */
export default function TypographicTransition() {
  const sectionRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowH = window.innerHeight || 800
      const progress = Math.min(Math.max((windowH - rect.top) / (windowH + rect.height), 0), 1)
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="typo-transition-root"
      id="typographic-transition"
      aria-label="Editorial Brand Transition"
    >
      {/* Dynamic Background Atmosphere Glow */}
      <div
        className="typo-ambient-glow"
        style={{
          opacity: 0.35 + scrollProgress * 0.45,
          transform: `translate(-50%, -50%) scale(${0.9 + scrollProgress * 0.25})`,
        }}
        aria-hidden="true"
      ></div>

      <div className="container typo-container">
        {/* Architectural Marker */}
        <div className="typo-meta-rail">
          <span className="rail-index">01</span>
          <span className="rail-line"></span>
          <span className="rail-label">THE PHILOSOPHY OF PRESENCE</span>
        </div>

        {/* Giant Stacked Monumental Typography */}
        <div className="typo-monumental-block">
          <span className="typo-word word-1">LIGHT</span>
          <span className="typo-word word-2 word-italic">IS NOT</span>
          <span className="typo-word word-3">JUST</span>
          <span className="typo-word word-4 word-accent">ILLUMINATION.</span>
        </div>

        {/* Minimal Subtext Staggered Asymmetrically */}
        <div className="typo-subtext-block">
          <p className="typo-credo">
            It shapes the invisible architecture of emotion—carving quiet boundaries, revealing tactile surfaces, and transforming how space is felt.
          </p>
        </div>
      </div>

      <style>{`
        .typo-transition-root {
          position: relative;
          min-height: 85vh;
          width: 100%;
          background: var(--bg-cream, #FAF8F3);
          border-top: 1px solid rgba(120, 100, 70, 0.12);
          border-bottom: 1px solid rgba(120, 100, 70, 0.12);
          display: flex;
          align-items: center;
          padding: 8.5rem 0 9.5rem;
          overflow: hidden;
          color: var(--charcoal, #171717);
        }

        .typo-ambient-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse at center, rgba(198, 154, 82, 0.14) 0%, rgba(250, 248, 243, 0) 70%);
          pointer-events: none;
          filter: blur(50px);
          transition: transform 0.2s ease-out, opacity 0.2s ease-out;
        }

        .typo-container {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 clamp(1.5rem, 5vw, 4rem);
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .typo-meta-rail {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 3.5rem;
        }

        .rail-index {
          font-family: var(--font-mono, monospace);
          font-size: 0.85rem;
          color: var(--accent-gold, #C69A52);
          letter-spacing: 0.15em;
          font-weight: 500;
        }

        .rail-line {
          width: 48px;
          height: 1px;
          background: var(--accent-gold, #C69A52);
          opacity: 0.5;
        }

        .rail-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--secondary-text, #5E5A53);
        }

        /* Monumental Typography */
        .typo-monumental-block {
          display: flex;
          flex-direction: column;
          line-height: 0.92;
          margin-bottom: 3.5rem;
        }

        .typo-word {
          font-family: var(--font-serif);
          font-size: clamp(3.8rem, 11.5vw, 10.5rem);
          font-weight: 300;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .word-italic {
          font-style: italic;
          font-weight: 200;
          color: var(--secondary-text, #5E5A53);
          padding-left: clamp(1rem, 6vw, 5rem);
        }

        .word-3 {
          padding-left: clamp(2rem, 12vw, 10rem);
        }

        .word-accent {
          background: linear-gradient(135deg, #171717 68%, #B89452 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 4px 24px rgba(198, 154, 82, 0.16));
        }

        /* Subtext Block */
        .typo-subtext-block {
          display: flex;
          justify-content: flex-end;
          padding-top: 2rem;
          border-top: 1px solid rgba(120, 100, 70, 0.12);
        }

        .typo-credo {
          max-width: 540px;
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(1.15rem, 1.8vw, 1.45rem);
          font-weight: 300;
          line-height: 1.6;
          color: var(--secondary-text, #5E5A53);
          margin: 0;
        }

        @media (max-width: 768px) {
          .typo-transition-root {
            padding: 6rem 0 6.5rem;
          }
          .word-italic, .word-3 {
            padding-left: 0;
          }
          .typo-subtext-block {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  )
}
