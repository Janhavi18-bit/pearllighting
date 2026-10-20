import React, { useState, useEffect } from 'react'

/**
 * BackToTop - Minimal, elegant scroll-to-top control
 * Subtle hairline styling that only surfaces after significant page scrolling.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      className={`back-to-top-btn ${visible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Scroll to top"
    >
      <span className="arrow-icon" aria-hidden="true">↑</span>

      <style>{`
        .back-to-top-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(32, 30, 27, 0.9);
          border: 1px solid rgba(184, 148, 82, 0.35);
          color: var(--champagne-gold, #B89452);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 900;
          opacity: 0;
          transform: translateY(12px);
          pointer-events: none;
          transition: opacity 0.35s var(--ease-editorial), transform 0.35s var(--ease-editorial), border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0;
        }

        .back-to-top-btn.is-visible {
          opacity: 0.9;
          transform: translateY(0);
          pointer-events: auto;
        }

        .back-to-top-btn:hover {
          opacity: 1;
          color: #FAF9F5;
          border-color: var(--champagne-gold, #B89452);
          background: var(--charcoal, #191919);
          box-shadow: 0 4px 18px rgba(25, 25, 25, 0.2);
        }

        .arrow-icon {
          font-size: 1.1rem;
          line-height: 1;
          margin-top: -2px;
          transition: transform 0.25s ease;
        }

        .back-to-top-btn:hover .arrow-icon {
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .back-to-top-btn {
            bottom: 1.25rem;
            right: 1.25rem;
            width: 38px;
            height: 38px;
          }
        }
      `}</style>
    </button>
  )
}
