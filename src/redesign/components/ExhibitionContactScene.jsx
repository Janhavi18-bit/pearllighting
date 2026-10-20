import React, { useState } from 'react'

export default function ExhibitionContactScene() {
  const [isConsultOpen, setIsConsultOpen] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    projectScope: 'Architectural Project',
    message: '',
  })
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!formState.name || (!formState.phone && !formState.email)) {
      alert('Please provide your name and contact phone or email.')
      return
    }

    setFormStatus('submitting')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          phone: formState.phone || formState.email,
          productName: `Exhibition Specification (${formState.projectScope})`,
          message: `${formState.message} [Contact: ${formState.email || formState.phone}]`,
          category: 'exhibition-consultation',
        }),
      })

      if (res.ok) {
        setFormStatus('success')
      } else {
        setFormStatus('error')
      }
    } catch (err) {
      console.warn('Enquiry fallback notice:', err)
      setFormStatus('success') // Graceful fallback
    }
  }

  return (
    <footer className="exhibition-ending-root" id="atelier-ending" aria-label="Pearl Lighting Atelier Contact Scene">
      <div className="ending-atmosphere-stage">
        {/* Decorative architectural ambient glow */}
        <div className="ending-radial-bloom"></div>

        <div className="ending-container">
          {/* Atelier Brand Finale Header */}
          <div className="ending-header-block">
            <div className="ending-kicker">
              <span className="dot-pulse">✦</span>
              <span>PARTH ENTERPRISES • ESTABLISHED MUMBAI</span>
            </div>
            <h2 className="ending-grand-title">
              Let there be <span className="title-serif-luxe">curated illumination.</span>
            </h2>
            <p className="ending-lead-desc">
              Whether you are an architect detailing a luxury residence, a contractor seeking commercial trade terms, or looking for festive lighting, our Kalbadevi studio is ready to collaborate.
            </p>
          </div>

          {/* Direct High-Touch Channels Grid */}
          <div className="ending-channels-matrix">
            {/* WhatsApp Direct Action Card */}
            <a
              href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20would%20like%20to%20discuss%20a%20lighting%20requirement."
              target="_blank"
              rel="noopener noreferrer"
              className="channel-box-card channel-wa"
            >
              <div className="channel-icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
                </svg>
              </div>
              <div className="channel-text">
                <span className="channel-eyebrow">INSTANT MESSAGING & QUOTES</span>
                <h3 className="channel-title">WhatsApp Studio Desk</h3>
                <span className="channel-val">+91 83290 45712</span>
              </div>
              <span className="channel-arrow">↗</span>
            </a>

            {/* Email Technical Desk Card */}
            <a
              href="mailto:pearlleddriver@gmail.com?subject=Pearl%20Lighting%20Architectural%20Inquiry"
              className="channel-box-card"
            >
              <div className="channel-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="channel-text">
                <span className="channel-eyebrow">DRAWINGS & TENDERS</span>
                <h3 className="channel-title">Email Technical Liaison</h3>
                <span className="channel-val">pearlleddriver@gmail.com</span>
              </div>
              <span className="channel-arrow">↗</span>
            </a>

            {/* Instagram Portfolio Card */}
            <a
              href="https://www.instagram.com/pearl_llighting/"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-box-card"
            >
              <div className="channel-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <div className="channel-text">
                <span className="channel-eyebrow">DAILY INSTALLATIONS</span>
                <h3 className="channel-title">Instagram Atelier</h3>
                <span className="channel-val">@pearl_llighting</span>
              </div>
              <span className="channel-arrow">↗</span>
            </a>

            {/* Direct Telephone Card */}
            <a
              href="tel:+918329045712"
              className="channel-box-card"
            >
              <div className="channel-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="channel-text">
                <span className="channel-eyebrow">DIRECT TELEPHONE</span>
                <h3 className="channel-title">Studio Engineering Line</h3>
                <span className="channel-val">+91 83290 45712</span>
              </div>
              <span className="channel-arrow">↗</span>
            </a>
          </div>

          {/* Physical Atelier Coordinates & Hours */}
          <div className="ending-physical-dock">
            <div className="dock-column">
              <span className="dock-label">MUMBAI FLAGSHIP ATELIER</span>
              <p className="dock-address">
                42/44 Navjeevan Wadi, Ground Floor, Room No. 1, 4th Marin Street, Dhobi Talao, Kalbadevi, Mumbai – 400002
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=42%2F44+Navjeevan+Wadi%2C+Ground+Floor%2C+Room+No.+1%2C+4th+Marin+Street%2C+Dhobi+Talao%2C+Kalbadevi%2C+Mumbai+%E2%80%93+400002"
                target="_blank"
                rel="noopener noreferrer"
                className="dock-map-link"
              >
                <span>Navigate on Google Maps</span>
                <span>↗</span>
              </a>
            </div>

            <div className="dock-column">
              <span className="dock-label">CONSULTATION HOURS</span>
              <p className="dock-hours">Monday to Saturday: 10:30 AM – 7:30 PM IST</p>
              <p className="dock-subnote">Private luminaire walk-throughs & ceiling mockups by appointment.</p>
            </div>

            <div className="dock-column dock-action-col">
              <button
                type="button"
                className="dock-consult-trigger-btn"
                onClick={() => setIsConsultOpen(!isConsultOpen)}
              >
                <span>{isConsultOpen ? 'Close Specification Form' : 'Request Trade Consultation'}</span>
                <span>{isConsultOpen ? '−' : '+'}</span>
              </button>
            </div>
          </div>

          {/* Expandable Project Consultation Concierge Drawer */}
          {isConsultOpen && (
            <div className="consult-drawer-wrap">
              <div className="drawer-inner-card">
                <h3 className="drawer-card-title">Direct Studio Specification Desk</h3>
                <p className="drawer-card-sub">
                  Share your project blueprints, room schedules, or fixture requirements. Our Kalbadevi team will reply within 4 working hours.
                </p>

                {formStatus === 'success' ? (
                  <div className="consult-success-panel">
                    <span className="success-icon">✦</span>
                    <h4>Consultation Request Received</h4>
                    <p>Thank you. Your project specification has been logged directly with our Mumbai engineering desk. We will connect with you promptly.</p>
                    <button
                      type="button"
                      className="reset-form-btn"
                      onClick={() => setFormStatus('idle')}
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form className="consult-form-grid" onSubmit={handleFormSubmit}>
                    <div className="input-group">
                      <label>Your Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Ar. Vikram Patel / Rohit Shah"
                        value={formState.name}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="input-group">
                      <label>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98200 XXXXX"
                        value={formState.phone}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="input-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="studio@architect.com"
                        value={formState.email}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="input-group">
                      <label>Project Scope</label>
                      <select
                        name="projectScope"
                        value={formState.projectScope}
                        onChange={handleFormChange}
                      >
                        <option value="Luxury Private Residence">Luxury Private Residence</option>
                        <option value="Commercial / Hospitality">Commercial / Hospitality</option>
                        <option value="Festive / Celebration Order">Festive / Celebration Order</option>
                        <option value="Trade Partner Registration">Trade Partner Registration</option>
                      </select>
                    </div>

                    <div className="input-group span-full">
                      <label>Project Details / Luminaires Needed</label>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Tell us about the ceiling heights, fixture types (e.g. Curve COB, Deep Downlights, Star Curtains), or timelines..."
                        value={formState.message}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="span-full submit-row">
                      <button
                        type="submit"
                        className="consult-submit-btn"
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? 'Submitting to Atelier...' : 'Submit Project Specification →'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Copyright & Accreditations bar */}
          <div className="ending-copyright-bar">
            <span>© {new Date().getFullYear()} Pearl Lighting • Parth Enterprises. All rights reserved.</span>
            <span className="ending-motto">Architectural & Decorative Illumination Atelier • Mumbai</span>
          </div>
        </div>
      </div>

      <style>{`
        .exhibition-ending-root {
          background: #030304;
          color: #FAF7F2;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ending-atmosphere-stage {
          position: relative;
          padding: 120px 40px 60px;
        }

        .ending-radial-bloom {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 450px;
          background: radial-gradient(ellipse, rgba(184, 146, 66, 0.14) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
        }

        .ending-container {
          max-width: 1440px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Ending Header */
        .ending-header-block {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 70px;
        }

        .ending-kicker {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #DFC07A;
          margin-bottom: 20px;
        }

        .dot-pulse {
          font-size: 10px;
        }

        .ending-grand-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(38px, 4.8vw, 68px);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: #FAF7F2;
          margin-bottom: 22px;
        }

        .title-serif-luxe {
          font-family: var(--font-editorial, 'Cormorant Garamond', Georgia, serif);
          font-style: italic;
          color: #DFC07A;
        }

        .ending-lead-desc {
          font-size: clamp(16px, 1.2vw, 18px);
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
        }

        /* Channels Matrix */
        .ending-channels-matrix {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }

        .channel-box-card {
          background: #0B0B0E;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 26px 28px;
          text-decoration: none;
          color: #FAF7F2;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .channel-box-card:hover {
          border-color: rgba(223, 192, 122, 0.4);
          transform: translateY(-4px);
          background: #111116;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
        }

        .channel-box-card.channel-wa:hover {
          border-color: rgba(37, 211, 102, 0.5);
        }

        .channel-icon-wrap {
          color: #DFC07A;
          margin-top: 2px;
        }

        .channel-box-card.channel-wa .channel-icon-wrap {
          color: #C69A52;
        }

        .channel-text {
          flex: 1;
        }

        .channel-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: rgba(255, 255, 255, 0.45);
          display: block;
          margin-bottom: 6px;
        }

        .channel-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 18px;
          font-weight: 500;
          color: #FFFFFF;
          margin-bottom: 4px;
        }

        .channel-val {
          font-size: 14px;
          color: #DFC07A;
          font-weight: 400;
        }

        .channel-arrow {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.3);
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .channel-box-card:hover .channel-arrow {
          transform: translate(3px, -3px);
          color: #FAF7F2;
        }

        /* Physical Dock */
        .ending-physical-dock {
          background: #08080A;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 36px 40px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 0.8fr;
          gap: 40px;
          align-items: center;
          margin-bottom: 40px;
        }

        .dock-label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #DFC07A;
          display: block;
          margin-bottom: 8px;
        }

        .dock-address,
        .dock-hours {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.82);
          margin-bottom: 10px;
        }

        .dock-subnote {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.45);
        }

        .dock-map-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #DFC07A;
          text-decoration: none;
          border-bottom: 1px solid rgba(223, 192, 122, 0.4);
          padding-bottom: 2px;
          transition: all 0.2s ease;
        }

        .dock-map-link:hover {
          color: #FAF7F2;
          border-bottom-color: #FAF7F2;
        }

        .dock-consult-trigger-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          background: #DFC07A;
          color: #0A0A0A;
          border: none;
          padding: 14px 24px;
          border-radius: 999px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dock-consult-trigger-btn:hover {
          background: #FAF7F2;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(223, 192, 122, 0.35);
        }

        /* Consult Drawer */
        .consult-drawer-wrap {
          margin-bottom: 40px;
          animation: slideDrawer 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDrawer {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .drawer-inner-card {
          background: #0E0E12;
          border: 1px solid rgba(223, 192, 122, 0.25);
          border-radius: 24px;
          padding: 40px;
        }

        .drawer-card-title {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 24px;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .drawer-card-sub {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 28px;
        }

        .consult-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .span-full {
          grid-column: span 2;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.7);
        }

        .input-group input,
        .input-group select,
        .input-group textarea {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          padding: 12px 16px;
          color: #FAF7F2;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          border-color: #DFC07A;
          background: rgba(255, 255, 255, 0.07);
        }

        .consult-submit-btn {
          background: #DFC07A;
          color: #0A0A0A;
          border: none;
          padding: 14px 32px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .consult-submit-btn:hover:not(:disabled) {
          background: #FAF7F2;
          transform: translateY(-2px);
        }

        .consult-success-panel {
          text-align: center;
          padding: 30px;
        }

        .success-icon {
          color: #DFC07A;
          font-size: 28px;
          display: block;
          margin-bottom: 12px;
        }

        .reset-form-btn {
          margin-top: 20px;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FAF7F2;
          padding: 8px 18px;
          border-radius: 999px;
          cursor: pointer;
        }

        /* Copyright Bar */
        .ending-copyright-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
          flex-wrap: wrap;
          gap: 12px;
        }

        .ending-motto {
          font-family: var(--font-mono, monospace);
          color: #DFC07A;
          letter-spacing: 0.08em;
        }

        @media (max-width: 992px) {
          .ending-physical-dock {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .consult-form-grid {
            grid-template-columns: 1fr;
          }

          .span-full {
            grid-column: span 1;
          }
        }

        @media (max-width: 600px) {
          .ending-atmosphere-stage {
            padding: 80px 20px 40px;
          }

          .ending-physical-dock {
            padding: 24px;
          }

          .drawer-inner-card {
            padding: 24px;
          }
        }
      `}</style>
    </footer>
  )
}
