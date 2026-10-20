import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LightingRoom from '../three/LightingRoom'

export default function LightComesAlive() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !sectionRef.current) return

    const isMobile = window.innerWidth <= 768
    const pinDistance = isMobile ? '+=90%' : '+=130%'

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: pinDistance,
        pin: true,
        anticipatePin: 1,
        scrub: 1.2,
        onUpdate: (self) => {
          progressRef.current = self.progress

          // Animate title and supporting text opacity based on scroll progression
          if (headerRef.current) {
            // Text fades in smoothly from 15% to 65%, stays visible, then fades at 90-100%
            let textOpacity = 0.1
            let textY = 20

            if (self.progress < 0.15) {
              textOpacity = 0.1 + (self.progress / 0.15) * 0.2
              textY = 20 - (self.progress / 0.15) * 6
            } else if (self.progress < 0.85) {
              const p = (self.progress - 0.15) / 0.7
              textOpacity = 0.3 + p * 0.7 // reaches 1.0
              textY = 14 - p * 14 // reaches 0
            } else {
              // Fade out into darkness transitioning to Collection
              const fadeOut = (self.progress - 0.85) / 0.15
              textOpacity = Math.max(1 - fadeOut * 1.2, 0)
              textY = -fadeOut * 16
            }

            headerRef.current.style.opacity = `${textOpacity}`
            headerRef.current.style.transform = `translateY(${textY}px)`
          }
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="alive-root" aria-label="Light Comes Alive Environment">
      {/* Smooth Transition Veils Connecting Adjacent Sections */}
      <div className="alive-transition-veil-top" aria-hidden="true"></div>
      <div className="alive-transition-veil-bottom" aria-hidden="true"></div>

      <div className="container alive-container">
        {/* Editorial Text Header */}
        <div ref={headerRef} className="alive-header">
          <span className="eyebrow alive-eyebrow">LIGHTING EXPERIENCE</span>
          <h2 className="alive-title">LIGHT IS MORE THAN ILLUMINATION.</h2>
          <p className="alive-supporting">
            "IT CREATES ATMOSPHERE."
          </p>
        </div>

        {/* 3D Architectural Lighting Environment Stage */}
        <div className="alive-stage-viewport">
          <React.Suspense fallback={<div className="lighting-room-fallback" />}>
            <LightingRoom progressRef={progressRef} />
          </React.Suspense>
        </div>
      </div>

      <style>{`
        .alive-root {
          position: relative;
          min-height: 100vh;
          height: 100vh;
          max-height: 1100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary, #EFE9DE);
          border-top: 1px solid rgba(120, 100, 70, 0.18);
          border-bottom: 1px solid rgba(120, 100, 70, 0.18);
          overflow: hidden;
          width: 100%;
          padding: calc(var(--header-height) * 0.6) 0 2rem;
        }

        /* Smooth Top and Bottom Atmospheric Transition Veils */
        .alive-transition-veil-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(180deg, var(--bg-primary, #F7F4ED) 0%, rgba(239, 233, 222, 0.6) 60%, transparent 100%);
          pointer-events: none;
          z-index: 3;
        }

        .alive-transition-veil-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(180deg, transparent 0%, rgba(239, 233, 222, 0.6) 40%, var(--bg-primary, #F7F4ED) 100%);
          pointer-events: none;
          z-index: 3;
        }

        .alive-container {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
        }

        /* Header */
        .alive-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 1.5rem;
          opacity: 0.2;
          transform: translateY(20px);
          transition: opacity 0.1s linear, transform 0.1s linear;
          will-change: opacity, transform;
          max-width: 900px;
        }

        .alive-eyebrow {
          margin-bottom: 0.85rem;
          color: var(--champagne-gold, #C69A52);
          letter-spacing: 0.35em;
        }

        .alive-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 5.4vw, 4.4rem);
          font-weight: 300;
          letter-spacing: 0.05em;
          line-height: 1.1;
          color: var(--primary-text, #171717);
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }

        .alive-supporting {
          font-family: var(--font-serif);
          font-size: clamp(1.15rem, 1.9vw, 1.5rem);
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--champagne-gold, #C69A52);
          line-height: 1.5;
        }

        /* 3D Stage Viewport */
        .alive-stage-viewport {
          position: relative;
          width: 100%;
          max-width: 1080px;
          height: clamp(340px, 55vh, 600px);
          border: 1px solid rgba(120, 100, 70, 0.25);
          border-radius: 4px;
          overflow: hidden;
          background: #EAE3D6;
          margin-bottom: 1.5rem;
          box-shadow: 0 16px 48px rgba(120, 100, 70, 0.08);
        }

        .alive-stage-viewport .lighting-room-fallback {
          width: 100%;
          height: 100%;
          background: #EAE3D6;
        }

        @media (max-width: 640px) {
          .alive-stage-viewport {
            height: clamp(260px, 46vh, 400px);
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </section>
  )
}
