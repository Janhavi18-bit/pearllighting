import React, { useState } from 'react'

/**
 * 04 — TRANSITIONS, DETAILS AND ENDING (Matching Reference Screenshot 04)
 * Warm ivory / cream elegant "Get in touch" card with:
 * - Refined expandable accordion rows
 * - Studio address and direct links (WhatsApp, Phone, Email, Instagram)
 * - Interactive architectural enquiry desk
 */
export default function ContactSection() {
  const [openAccordion, setOpenAccordion] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleAccordion = (idx) => {
    setOpenAccordion(openAccordion === idx ? null : idx)
  }

  const accordions = [
    {
      title: 'Find your nearest showroom or Mumbai atelier',
      content:
        'Visit our flagship studio in Dhobi Talao, Kalbadevi, Mumbai. Available by appointment for private luminaire walk-throughs, custom ceiling mockups, and optical baffle testing under Parth Enterprises.',
      actionLink:
        'https://www.google.com/maps/search/?api=1&query=42%2F44+Navjeevan+Wadi%2C+Ground+Floor%2C+Room+No.+1%2C+4th+Marin+Street%2C+Dhobi+Talao%2C+Kalbadevi%2C+Mumbai+%E2%80%93+400002',
      actionText: 'View on Google Maps ↗',
    },
    {
      title: 'Register a trade account for architectural discounts',
      content:
        'Architects, lighting designers, and EPC contractors receive dedicated commercial pricing, priority fabrication scheduling, IES photometric files, and sample units for site mockups.',
      actionLink:
        'https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20would%20like%20to%20register%20an%20architectural%20trade%20account.',
      actionText: 'Register on WhatsApp ↗',
    },
    {
      title: 'Technical specification & drawing assistance',
      content:
        'Our technical engineering team assists with driver sizing, DALI/0-10V integration, beam angle calculations, ceiling cutout coordination, and custom luminaire modifications.',
      actionLink: 'mailto:pearlleddriver@gmail.com?subject=Technical%20Specification%20Assistance',
      actionText: 'Email Technical Desk ↗',
    },
    {
      title: 'Festive & custom bulk celebration orders',
      content:
        'Direct procurement for star curtains, diya cascades, crystal bubbles, and custom festival facade ribbons with rapid pan-India dispatch and batch color-temperature consistency.',
      actionLink:
        'https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20would%20like%20to%20place%20a%20festive%20lighting%20order.',
      actionText: 'Festive Inquiry ↗',
    },
  ]

  const validate = () => {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Please provide your name.'
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!formData.message.trim()) errs.message = 'Please share your lighting requirements.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validate()) {
      try {
        await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim() || formData.email.trim(),
            productName: formData.company ? `Studio Project Enquiry (${formData.company.trim()})` : 'General Architectural Consultation',
            message: `${formData.message.trim()} [Email: ${formData.email.trim()}${formData.company ? `, Company: ${formData.company.trim()}` : ''}]`,
            category: 'architectural-consultation',
          }),
        })
      } catch (err) {
        console.warn('[CONTACT] Enquiry notice:', err)
      }
      setIsSubmitted(true)
    }
  }

  return (
    <section className="touch-ending-root" id="contact" aria-label="Get in touch">
      <div className="container touch-master-container">
        {/* Screenshot 04 Style Card: "Get in touch" */}
        <div className="touch-card-monolith">
          <div className="touch-card-header">
            <div className="rebuild-marker-rail" style={{ color: '#161513', marginBottom: '16px', justifyContent: 'center' }}>
              <span className="rebuild-marker-num">07</span>
              <span className="rebuild-marker-dot">•</span>
              <span className="rebuild-marker-tag">BRAND FINALE & STUDIO LIAISON</span>
            </div>
            <span className="touch-card-eyebrow">PARTH ENTERPRISES • MUMBAI ATELIER</span>
            <h2 className="touch-card-title">Get in touch</h2>
            <p className="touch-card-sub">
              Direct access for architectural specifications, trade accounts, samples, and festive orders.
            </p>
          </div>

          {/* Accordion List Rows (Matching Screenshot 04) */}
          <div className="touch-accordion-list">
            {accordions.map((item, idx) => {
              const isOpen = openAccordion === idx
              return (
                <div key={idx} className={`accordion-row ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="accordion-row-header"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="row-title">{item.title}</span>
                    <span className="row-toggle-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="accordion-row-content">
                      <p className="row-content-text">{item.content}</p>
                      <a
                        href={item.actionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="row-action-link"
                      >
                        {item.actionText}
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Studio Credentials Grid (Matching Screenshot 04 Bottom Area) */}
          <div className="touch-studio-grid">
            <div className="studio-col">
              <span className="studio-col-label">STUDIO ADDRESS</span>
              <p className="studio-col-val">
                42/44 Navjeevan Wadi, Ground Floor, Room No. 1, 4th Marin Street, Dhobi Talao, Kalbadevi, Mumbai – 400002
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=42%2F44+Navjeevan+Wadi%2C+Ground+Floor%2C+Room+No.+1%2C+4th+Marin+Street%2C+Dhobi+Talao%2C+Kalbadevi%2C+Mumbai+%E2%80%93+400002"
                target="_blank"
                rel="noopener noreferrer"
                className="studio-sub-link"
              >
                Open Google Maps ↗
              </a>
            </div>

            <div className="studio-col">
              <span className="studio-col-label">DIRECT CHANNELS</span>
              <p className="studio-col-val">
                WhatsApp: <a href="https://wa.me/918329045712" target="_blank" rel="noopener noreferrer" className="highlight-link">+91 83290 45712</a>
              </p>
              <p className="studio-col-val">
                Telephone: <a href="tel:+918329045712" className="highlight-link">+91 83290 45712</a>
              </p>
              <p className="studio-col-val">
                Email: <a href="mailto:pearlleddriver@gmail.com" className="highlight-link">pearlleddriver@gmail.com</a>
              </p>
              <p className="studio-col-val">
                Instagram: <a href="https://www.instagram.com/pearl_llighting/" target="_blank" rel="noopener noreferrer" className="highlight-link">@pearl_llighting</a>
              </p>
            </div>

            <div className="studio-col">
              <span className="studio-col-label">HOURS & ACCREDITATION</span>
              <p className="studio-col-val">Monday – Saturday: 10:30 AM – 7:30 PM IST</p>
              <p className="studio-col-val">Parth Enterprises • Architectural Illumination Atelier</p>
              <span className="studio-status-tag">✦ Studio Open for Consultations</span>
            </div>
          </div>

          {/* Quick Consultation Form Trigger */}
          <div className="touch-form-drawer">
            <h3 className="drawer-title">Send a Project Specification Notice</h3>
            {isSubmitted ? (
              <div className="touch-success-box">
                <span className="success-star">✦</span>
                <p>Thank you, <strong>{formData.name}</strong>. Your project inquiry has been received by our Kalbadevi studio team. We will connect promptly.</p>
                <button type="button" className="touch-new-btn" onClick={() => setIsSubmitted(false)}>
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form className="touch-quick-form" onSubmit={handleSubmit} noValidate>
                <div className="form-fields-grid">
                  <div className="form-input-wrap">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name *"
                      value={formData.name}
                      onChange={handleChange}
                      className={`form-input-element ${errors.name ? 'error' : ''}`}
                    />
                    {errors.name && <span className="error-note">{errors.name}</span>}
                  </div>

                  <div className="form-input-wrap">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address *"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-input-element ${errors.email ? 'error' : ''}`}
                    />
                    {errors.email && <span className="error-note">{errors.email}</span>}
                  </div>

                  <div className="form-input-wrap">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone / WhatsApp"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input-element"
                    />
                  </div>

                  <div className="form-input-wrap full-width">
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Project details, luminaire requirements (e.g. Model 501-BK, Curve COB, Deep Down Light)... *"
                      value={formData.message}
                      onChange={handleChange}
                      className={`form-input-element ${errors.message ? 'error' : ''}`}
                    />
                    {errors.message && <span className="error-note">{errors.message}</span>}
                  </div>
                </div>

                <button type="submit" className="touch-submit-button">
                  <span>Send Project Inquiry</span>
                  <span className="arrow-glyph">→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .touch-ending-root {
          position: relative;
          background: #FAF8F5;
          color: #181715;
          padding: 6.5rem 0 7rem;
        }

        .touch-master-container {
          max-width: 1040px;
        }

        /* Screenshot 04 Style Card */
        .touch-card-monolith {
          background: #FFFFFF;
          border-radius: 28px;
          border: 1px solid rgba(24, 23, 21, 0.08);
          box-shadow: 0 24px 60px -15px rgba(24, 20, 15, 0.08);
          padding: clamp(2rem, 5vw, 4rem);
        }

        .touch-card-header {
          margin-bottom: 2.75rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(24, 23, 21, 0.08);
        }

        .touch-card-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          color: var(--accent-gold, #B89344);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          display: block;
        }

        .touch-card-title {
          font-family: var(--font-sans, sans-serif);
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 600;
          letter-spacing: -0.025em;
          color: #181715;
          margin-bottom: 0.5rem;
        }

        .touch-card-sub {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #6A6356;
          font-weight: 300;
          max-width: 650px;
        }

        /* Accordion List */
        .touch-accordion-list {
          display: flex;
          flex-direction: column;
          margin-bottom: 3.5rem;
        }

        .accordion-row {
          border-bottom: 1px solid rgba(24, 23, 21, 0.08);
        }

        .accordion-row-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.4rem 0;
          cursor: pointer;
          text-align: left;
          background: none;
          border: none;
          color: #181715;
          transition: color 0.2s ease;
        }

        .accordion-row-header:hover {
          color: var(--accent-gold, #B89344);
        }

        .row-title {
          font-family: var(--font-sans, sans-serif);
          font-size: 1.15rem;
          font-weight: 500;
          letter-spacing: -0.01em;
        }

        .row-toggle-icon {
          font-size: 1.5rem;
          line-height: 1;
          color: var(--accent-gold, #B89344);
          font-weight: 300;
          margin-left: 1rem;
        }

        .accordion-row-content {
          padding: 0 0 1.5rem;
          animation: accordionFade 0.3s ease;
        }

        @keyframes accordionFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .row-content-text {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #5C564E;
          margin-bottom: 0.85rem;
          font-weight: 300;
          max-width: 720px;
        }

        .row-action-link {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent-gold, #B89344);
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        /* Studio Grid (Screenshot 04 bottom) */
        .touch-studio-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
          padding: 2.5rem 0;
          border-top: 1px solid rgba(24, 23, 21, 0.08);
          border-bottom: 1px solid rgba(24, 23, 21, 0.08);
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .touch-studio-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5rem;
          }
        }

        .studio-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .studio-col-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          color: var(--accent-gold, #B89344);
          text-transform: uppercase;
        }

        .studio-col-val {
          font-size: 0.88rem;
          line-height: 1.6;
          color: #3D372F;
        }

        .highlight-link {
          color: #181715;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .highlight-link:hover {
          color: var(--accent-gold, #B89344);
        }

        .studio-sub-link {
          font-size: 0.78rem;
          color: var(--accent-gold, #B89344);
          font-weight: 600;
          margin-top: 0.25rem;
        }

        .studio-status-tag {
          font-size: 0.75rem;
          color: #2E7D32;
          font-weight: 500;
          margin-top: 0.25rem;
        }

        /* Quick Form Drawer */
        .touch-form-drawer {
          padding-top: 1rem;
        }

        .drawer-title {
          font-family: var(--font-sans, sans-serif);
          font-size: 1.35rem;
          font-weight: 600;
          color: #181715;
          margin-bottom: 1.25rem;
        }

        .form-fields-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        @media (min-width: 600px) {
          .form-fields-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .full-width {
            grid-column: span 3;
          }
        }

        .form-input-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .form-input-element {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          border: 1px solid rgba(24, 23, 21, 0.12);
          background: #FAF8F5;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.9rem;
          color: #181715;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .form-input-element:focus {
          border-color: var(--accent-gold, #B89344);
          background: #FFFFFF;
        }

        .form-input-element.error {
          border-color: #D32F2F;
        }

        .error-note {
          font-size: 0.72rem;
          color: #D32F2F;
        }

        .touch-submit-button {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: #181715;
          color: #FAF8F5;
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.95rem 1.85rem;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .touch-submit-button:hover {
          background: var(--accent-gold, #B89344);
          color: #181715;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(184, 147, 68, 0.35);
        }

        .arrow-glyph {
          font-size: 1rem;
          transition: transform 0.25s ease;
        }

        .touch-submit-button:hover .arrow-glyph {
          transform: translateX(4px);
        }

        .touch-success-box {
          background: #FAF8F5;
          border: 1px solid rgba(24, 23, 21, 0.08);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .success-star {
          color: var(--accent-gold, #B89344);
          font-size: 1.25rem;
        }

        .touch-new-btn {
          width: fit-content;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-gold, #B89344);
          text-decoration: underline;
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}
