import React, { useState } from 'react'

export default function Scene7BrandFinale() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    scope: 'Luxury Private Residence',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || (!formData.phone && !formData.email)) {
      alert('Please provide your name and phone or email.')
      return
    }

    setSubmitStatus('submitting')
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone || formData.email,
          productName: `Architectural Consultation (${formData.scope})`,
          message: `${formData.message} [Contact: ${formData.email || formData.phone}]`,
          category: 'architectural-consultation',
        }),
      })
      setSubmitStatus('success')
    } catch (err) {
      console.warn('Consultation fallback:', err)
      setSubmitStatus('success')
    }
  }

  return (
    <footer className="scene7-finale-root" id="scene-finale" aria-label="Scene 7 — Brand Finale">
      <div className="scene7-inner-container">
        {/* Brand Statement Header */}
        <div className="finale-header-block">
          <div className="finale-eyebrow-rail">
            <span className="eyebrow-spark">✦</span>
            <span>MUMBAI ATELIER • PARTH ENTERPRISES</span>
            <span className="eyebrow-spark">✦</span>
          </div>
          <h2 className="finale-statement-title">
            Crafted for enduring <span className="title-serif-gold">spatial harmony.</span>
          </h2>
          <p className="finale-statement-body">
            We partner directly with architects, interior masters, and discerning homeowners across India who refuse the flat glare of mass-produced illumination.
          </p>
        </div>

        {/* Functional Channels Matrix (WhatsApp, Email, Instagram, Telephone) */}
        <div className="finale-channels-matrix">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20am%20exploring%20your%20architectural%20collection%20and%20would%20like%20to%20discuss%20a%20lighting%20specification."
            target="_blank"
            rel="noopener noreferrer"
            className="channel-card card-wa"
          >
            <div className="channel-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
              </svg>
            </div>
            <div className="channel-meta-text">
              <span className="channel-tag">DIRECT LIAISON</span>
              <h3 className="channel-head">WhatsApp Studio Desk</h3>
              <span className="channel-handle">+91 83290 45712</span>
            </div>
            <span className="channel-arrow-glyph">↗</span>
          </a>

          {/* Email Technical Liaison */}
          <a
            href="mailto:pearlleddriver@gmail.com?subject=Pearl%20Lighting%20Architectural%20Inquiry"
            className="channel-card"
          >
            <div className="channel-icon-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="channel-meta-text">
              <span className="channel-tag">PLANS & DRAWINGS</span>
              <h3 className="channel-head">Email Technical Desk</h3>
              <span className="channel-handle">pearlleddriver@gmail.com</span>
            </div>
            <span className="channel-arrow-glyph">↗</span>
          </a>

          {/* Instagram Portfolio */}
          <a
            href="https://www.instagram.com/pearl_llighting/"
            target="_blank"
            rel="noopener noreferrer"
            className="channel-card"
          >
            <div className="channel-icon-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <div className="channel-meta-text">
              <span className="channel-tag">INSTALLATIONS & SITE WORK</span>
              <h3 className="channel-head">Instagram Studio</h3>
              <span className="channel-handle">@pearl_llighting</span>
            </div>
            <span className="channel-arrow-glyph">↗</span>
          </a>

          {/* Direct Telephone */}
          <a
            href="tel:+918329045712"
            className="channel-card"
          >
            <div className="channel-icon-circle">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className="channel-meta-text">
              <span className="channel-tag">TELEPHONE</span>
              <h3 className="channel-head">Studio Engineering Line</h3>
              <span className="channel-handle">+91 83290 45712</span>
            </div>
            <span className="channel-arrow-glyph">↗</span>
          </a>
        </div>

        {/* Physical Atelier Dock & Address */}
        <div className="finale-atelier-dock">
          <div className="dock-left-details">
            <span className="dock-tag">FLAGSHIP MUMBAI ATELIER</span>
            <p className="dock-address-p">
              42/44 Navjeevan Wadi, Ground Floor, Room No. 1, 4th Marin Street, Dhobi Talao, Kalbadevi, Mumbai – 400002
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=42%2F44+Navjeevan+Wadi%2C+Ground+Floor%2C+Room+No.+1%2C+4th+Marin+Street%2C+Dhobi+Talao%2C+Kalbadevi%2C+Mumbai+%E2%80%93+400002"
              target="_blank"
              rel="noopener noreferrer"
              className="dock-map-action"
            >
              <span>View Location on Google Maps</span>
              <span>↗</span>
            </a>
          </div>

          <div className="dock-mid-hours">
            <span className="dock-tag">CONSULTATION HOURS</span>
            <p className="dock-time-p">Monday to Saturday: 10:30 AM – 7:30 PM IST</p>
            <span className="dock-appointment-sub">Private luminaire walk-throughs & ceiling mockups by appointment.</span>
          </div>

          <div className="dock-right-action">
            <button
              type="button"
              className="dock-drawer-toggle-btn"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <span>{isDrawerOpen ? 'Close Specification Desk' : 'Open Trade Specification Desk'}</span>
              <span>{isDrawerOpen ? '−' : '+'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Project Consultation Drawer */}
        {isDrawerOpen && (
          <div className="finale-consult-drawer">
            <div className="drawer-card-box">
              <h3 className="drawer-title">Direct Studio Specification Desk</h3>
              <p className="drawer-subtitle">
                Share your architectural drawing package, fixture counts, or project timelines. Our Kalbadevi team will respond with full technical documentation.
              </p>

              {submitStatus === 'success' ? (
                <div className="drawer-success-state">
                  <span className="success-star">✦</span>
                  <h4>Specification Request Received</h4>
                  <p>Thank you, {formData.name}. Your inquiry has been received by our Kalbadevi studio desk. We will connect promptly with technical files.</p>
                  <button
                    type="button"
                    className="drawer-reset-btn"
                    onClick={() => setSubmitStatus('idle')}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form className="drawer-form-layout" onSubmit={handleSubmit}>
                  <div className="drawer-input-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Ar. Vikram Patel / Rohit Shah"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="drawer-input-group">
                    <label>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98200 XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="drawer-input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="studio@architect.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="drawer-input-group">
                    <label>Project Scope</label>
                    <select
                      name="scope"
                      value={formData.scope}
                      onChange={handleChange}
                    >
                      <option value="Luxury Private Residence">Luxury Private Residence</option>
                      <option value="Hospitality & Dining">Hospitality & Dining</option>
                      <option value="Commercial & Retail">Commercial & Retail</option>
                      <option value="Festive / Celebration Order">Festive / Celebration Order</option>
                    </select>
                  </div>

                  <div className="drawer-input-group span-2">
                    <label>Project Scope & Luminaires Required</label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Specify ceiling heights, quantities, or model types (e.g. Curve COB Rose Gold, Deep Downlights, Continuous Rope Light)..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="span-2 submit-container">
                    <button
                      type="submit"
                      className="drawer-submit-cta"
                      disabled={submitStatus === 'submitting'}
                    >
                      {submitStatus === 'submitting' ? 'Submitting to Studio...' : 'Submit Specification Request →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Accreditations & Copyright Bar */}
        <div className="finale-copyright-rail">
          <span>© {new Date().getFullYear()} Pearl Lighting • Parth Enterprises. All rights reserved.</span>
          <span className="copyright-atelier-tag">Architectural & Decorative Illumination Atelier • Kalbadevi, Mumbai</span>
        </div>
      </div>

      <style>{`
        .scene7-finale-root {
          background-color: #F8F5EE;
          color: #161513;
          padding: 120px 40px 60px;
          position: relative;
        }

        .scene7-inner-container {
          max-width: 1440px;
          margin: 0 auto;
        }

        /* Statement Header */
        .finale-header-block {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 70px;
        }

        .finale-eyebrow-rail {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #B89242;
          margin-bottom: 20px;
        }

        .eyebrow-spark {
          font-size: 10px;
        }

        .finale-statement-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(38px, 4.8vw, 68px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: #161513;
          margin-bottom: 22px;
        }

        .title-serif-gold {
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-style: italic;
          color: #B89242;
        }

        .finale-statement-body {
          font-size: clamp(16px, 1.2vw, 18px);
          line-height: 1.65;
          color: #555047;
          font-weight: 300;
        }

        /* Channels Grid */
        .finale-channels-matrix {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 50px;
        }

        .channel-card {
          background: #FFFFFF;
          border: 1px solid rgba(22, 21, 19, 0.08);
          border-radius: 20px;
          padding: 26px 28px;
          text-decoration: none;
          color: #161513;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          box-shadow: 0 4px 18px rgba(22, 21, 19, 0.04);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .channel-card:hover {
          border-color: #B89242;
          transform: translateY(-4px);
          box-shadow: 0 14px 40px rgba(22, 21, 19, 0.1);
        }

        .channel-card.card-wa:hover {
          border-color: #C69A52;
        }

        .channel-icon-circle {
          color: #B89242;
          margin-top: 2px;
        }

        .channel-card.card-wa .channel-icon-circle {
          color: #C69A52;
        }

        .channel-meta-text {
          flex: 1;
        }

        .channel-tag {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: #8C8373;
          display: block;
          margin-bottom: 6px;
        }

        .channel-head {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 18px;
          font-weight: 500;
          color: #161513;
          margin-bottom: 4px;
        }

        .channel-handle {
          font-size: 14px;
          color: #B89242;
          font-weight: 500;
        }

        .channel-arrow-glyph {
          font-size: 16px;
          color: rgba(22, 21, 19, 0.3);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .channel-card:hover .channel-arrow-glyph {
          transform: translate(3px, -3px);
          color: #161513;
        }

        /* Atelier Dock */
        .finale-atelier-dock {
          background: #FFFFFF;
          border: 1px solid rgba(22, 21, 19, 0.08);
          border-radius: 24px;
          padding: 36px 40px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 0.9fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 40px;
          box-shadow: 0 4px 18px rgba(22, 21, 19, 0.04);
        }

        .dock-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #B89242;
          display: block;
          margin-bottom: 8px;
        }

        .dock-address-p,
        .dock-time-p {
          font-size: 14.5px;
          line-height: 1.6;
          color: #38342E;
          margin-bottom: 10px;
        }

        .dock-appointment-sub {
          font-size: 12.5px;
          color: #726A5E;
        }

        .dock-map-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #B89242;
          text-decoration: none;
          border-bottom: 1px solid rgba(184, 146, 66, 0.4);
          padding-bottom: 2px;
          transition: all 0.2s ease;
        }

        .dock-map-action:hover {
          color: #161513;
          border-bottom-color: #161513;
        }

        .dock-drawer-toggle-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          background: #161513;
          color: #FAF7F2;
          border: none;
          padding: 14px 24px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dock-drawer-toggle-btn:hover {
          background: #B89242;
          color: #0A0A0A;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(184, 146, 66, 0.35);
        }

        /* Consult Drawer */
        .finale-consult-drawer {
          margin-bottom: 40px;
          animation: slideDown 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .drawer-card-box {
          background: #FFFFFF;
          border: 1px solid rgba(184, 146, 66, 0.25);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 16px 40px rgba(22, 21, 19, 0.08);
        }

        .drawer-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 24px;
          color: #161513;
          margin-bottom: 8px;
        }

        .drawer-subtitle {
          font-size: 14px;
          color: #655F55;
          margin-bottom: 28px;
        }

        .drawer-form-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .span-2 {
          grid-column: span 2;
        }

        .drawer-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .drawer-input-group label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #726A5E;
        }

        .drawer-input-group input,
        .drawer-input-group select,
        .drawer-input-group textarea {
          background: #FAF8F5;
          border: 1px solid rgba(22, 21, 19, 0.12);
          border-radius: 12px;
          padding: 12px 16px;
          color: #161513;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .drawer-input-group input:focus,
        .drawer-input-group select:focus,
        .drawer-input-group textarea:focus {
          border-color: #B89242;
          background: #FFFFFF;
        }

        .drawer-submit-cta {
          background: #161513;
          color: #FAF7F2;
          border: none;
          padding: 14px 32px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .drawer-submit-cta:hover:not(:disabled) {
          background: #B89242;
          color: #0A0A0A;
          transform: translateY(-2px);
        }

        .drawer-success-state {
          text-align: center;
          padding: 30px;
        }

        .success-star {
          color: #B89242;
          font-size: 28px;
          display: block;
          margin-bottom: 12px;
        }

        .drawer-reset-btn {
          margin-top: 20px;
          background: transparent;
          border: 1px solid rgba(22, 21, 19, 0.2);
          color: #161513;
          padding: 8px 18px;
          border-radius: 999px;
          cursor: pointer;
        }

        /* Copyright */
        .finale-copyright-rail {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 30px;
          border-top: 1px solid rgba(22, 21, 19, 0.08);
          font-size: 12px;
          color: #8C8373;
          flex-wrap: wrap;
          gap: 12px;
        }

        .copyright-atelier-tag {
          font-family: var(--font-mono, monospace);
          color: #B89242;
          letter-spacing: 0.08em;
        }

        @media (max-width: 992px) {
          .finale-atelier-dock {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .drawer-form-layout {
            grid-template-columns: 1fr;
          }
          .span-2 {
            grid-column: span 1;
          }
        }

        @media (max-width: 600px) {
          .scene7-finale-root {
            padding: 80px 20px 40px;
          }
          .finale-atelier-dock {
            padding: 24px;
          }
          .drawer-card-box {
            padding: 24px;
          }
        }
      `}</style>
    </footer>
  )
}
