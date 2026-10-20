import React, { useState } from 'react'

export default function EditorialBrandFinale() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || (!formData.phone && !formData.email)) {
      alert('Please provide your name and phone or email.')
      return
    }

    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone || formData.email,
          productName: 'Editorial Consultation Request',
          message: `${formData.message} [Email: ${formData.email || ''}]`,
          category: 'editorial-homepage',
        }),
      })
      setSubmitted(true)
    } catch (err) {
      console.warn('Consultation notice:', err)
      setSubmitted(true)
    }
  }

  return (
    <footer className="editorial-finale-footer" id="atelier-finale" aria-label="Brand Finale and Atelier Contact">
      <div className="editorial-finale-container">
        {/* Top Brand Statement Block */}
        <div className="finale-statement-block">
          <span className="finale-tag">PARTH ENTERPRISES • ESTABLISHED MUMBAI</span>
          <h2 className="finale-statement-quote">
            Crafting light that shapes volume, texture and quiet human presence.
          </h2>
          <p className="finale-statement-para">
            Whether specifying custom recessed downlight schedules for luxury villas or curating festive lighting cascades, our Kalbadevi studio liaises directly with architects, interior designers, and patrons.
          </p>
        </div>

        {/* 4 Direct Contact Touchpoints */}
        <div className="finale-touchpoints-grid">
          {/* WhatsApp Direct Action */}
          <a
            href="https://wa.me/918329045712?text=Hi%20Pearl%20Lighting!%20I%20would%20like%20to%20discuss%20an%20architectural%20lighting%20specification."
            target="_blank"
            rel="noopener noreferrer"
            className="touchpoint-card card-whatsapp"
          >
            <div className="touchpoint-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.56 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.29C4.24 14.97 3.8 13.46 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
              </svg>
            </div>
            <div className="touchpoint-info">
              <span className="touchpoint-cat">DIRECT CHAT</span>
              <h3 className="touchpoint-name">WhatsApp Studio Liaison</h3>
              <span className="touchpoint-val">+91 83290 45712</span>
            </div>
            <span className="touchpoint-arrow">↗</span>
          </a>

          {/* Email Technical Desk */}
          <a
            href="mailto:pearlleddriver@gmail.com?subject=Pearl%20Lighting%20Architectural%20Inquiry"
            className="touchpoint-card"
          >
            <div className="touchpoint-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div className="touchpoint-info">
              <span className="touchpoint-cat">PLANS & TENDERS</span>
              <h3 className="touchpoint-name">Email Technical Desk</h3>
              <span className="touchpoint-val">pearlleddriver@gmail.com</span>
            </div>
            <span className="touchpoint-arrow">↗</span>
          </a>

          {/* Instagram Atelier */}
          <a
            href="https://www.instagram.com/pearl_llighting/"
            target="_blank"
            rel="noopener noreferrer"
            className="touchpoint-card"
          >
            <div className="touchpoint-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <div className="touchpoint-info">
              <span className="touchpoint-cat">SITE DOCUMENTATION</span>
              <h3 className="touchpoint-name">Instagram Atelier</h3>
              <span className="touchpoint-val">@pearl_llighting</span>
            </div>
            <span className="touchpoint-arrow">↗</span>
          </a>

          {/* Direct Phone */}
          <a
            href="tel:+918329045712"
            className="touchpoint-card"
          >
            <div className="touchpoint-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className="touchpoint-info">
              <span className="touchpoint-cat">STUDIO LINE</span>
              <h3 className="touchpoint-name">Direct Telephone</h3>
              <span className="touchpoint-val">+91 83290 45712</span>
            </div>
            <span className="touchpoint-arrow">↗</span>
          </a>
        </div>

        {/* Flagship Address Dock & Consultation Form */}
        <div className="finale-dock-split">
          <div className="dock-address-card">
            <span className="card-kicker">FLAGSHIP MUMBAI ATELIER</span>
            <p className="atelier-street-address">
              42/44 Navjeevan Wadi, Ground Floor, Room No. 1, 4th Marin Street, Dhobi Talao, Kalbadevi, Mumbai – 400002
            </p>
            <p className="atelier-hours-text">
              Hours: Monday to Saturday: 10:30 AM – 7:30 PM IST
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=42%2F44+Navjeevan+Wadi%2C+Ground+Floor%2C+Room+No.+1%2C+4th+Marin+Street%2C+Dhobi+Talao%2C+Kalbadevi%2C+Mumbai+%E2%80%93+400002"
              target="_blank"
              rel="noopener noreferrer"
              className="atelier-map-link"
            >
              <span>Locate on Google Maps</span>
              <span>↗</span>
            </a>
          </div>

          <div className="dock-enquiry-card">
            <span className="card-kicker">PROJECT SPECIFICATION DESK</span>
            {submitted ? (
              <div className="form-success-note">
                <span className="success-glyph">✦</span>
                <p>Thank you. Your project request has been logged with our Kalbadevi team. We will reach out promptly.</p>
                <button
                  type="button"
                  className="reset-enquiry-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form className="quick-spec-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp *"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <textarea
                  rows={2}
                  placeholder="Tell us about your project requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <button type="submit" className="spec-submit-btn">
                  Submit Specification Request →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="finale-bottom-copyright">
          <span>© {new Date().getFullYear()} Pearl Lighting • Parth Enterprises. All rights reserved.</span>
          <span className="copyright-motto">Architectural & Decorative Illumination • Mumbai</span>
        </div>
      </div>

      <style>{`
        .editorial-finale-footer {
          background: #FAF8F5;
          color: #181716;
          padding: 100px 48px 40px;
          border-top: 1px solid rgba(24, 23, 22, 0.08);
        }

        .editorial-finale-container {
          max-width: 1560px;
          margin: 0 auto;
        }

        .finale-statement-block {
          max-width: 900px;
          margin-bottom: 60px;
        }

        .finale-tag {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.2em;
          color: #D85623;
          display: block;
          margin-bottom: 16px;
        }

        .finale-statement-quote {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: clamp(34px, 4.2vw, 56px);
          font-weight: 400;
          line-height: 1.15;
          color: #181716;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
        }

        .finale-statement-para {
          font-size: 16px;
          line-height: 1.65;
          color: #555047;
          font-weight: 300;
          max-width: 720px;
        }

        /* 4 Touchpoints Grid */
        .finale-touchpoints-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 60px;
        }

        .touchpoint-card {
          background: #FFFFFF;
          border: 1px solid rgba(24, 23, 22, 0.08);
          border-radius: 16px;
          padding: 24px;
          text-decoration: none;
          color: #181716;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
        }

        .touchpoint-card:hover {
          border-color: #D85623;
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
        }

        .touchpoint-card.card-whatsapp:hover {
          border-color: #C69A52;
        }

        .touchpoint-icon {
          color: #D85623;
          margin-top: 2px;
        }

        .card-whatsapp .touchpoint-icon {
          color: #C69A52;
        }

        .touchpoint-info {
          flex: 1;
        }

        .touchpoint-cat {
          font-family: var(--font-mono, monospace);
          font-size: 10px;
          letter-spacing: 0.16em;
          color: #8C8373;
          display: block;
          margin-bottom: 4px;
        }

        .touchpoint-name {
          font-family: var(--font-serif, 'Playfair Display', Georgia, serif);
          font-size: 17px;
          font-weight: 500;
          color: #181716;
          margin-bottom: 2px;
        }

        .touchpoint-val {
          font-size: 13.5px;
          color: #D85623;
          font-weight: 500;
        }

        .touchpoint-arrow {
          color: rgba(24, 23, 22, 0.3);
          font-size: 16px;
          transition: transform 0.2s ease;
        }

        .touchpoint-card:hover .touchpoint-arrow {
          transform: translate(2px, -2px);
          color: #181716;
        }

        /* Split Dock */
        .finale-dock-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 60px;
        }

        .dock-address-card,
        .dock-enquiry-card {
          background: #FFFFFF;
          border: 1px solid rgba(24, 23, 22, 0.08);
          border-radius: 20px;
          padding: 36px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.03);
        }

        .card-kicker {
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          letter-spacing: 0.18em;
          color: #D85623;
          display: block;
          margin-bottom: 14px;
        }

        .atelier-street-address {
          font-size: 15px;
          line-height: 1.6;
          color: #181716;
          margin-bottom: 12px;
        }

        .atelier-hours-text {
          font-size: 13px;
          color: #655F55;
          margin-bottom: 20px;
        }

        .atelier-map-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #D85623;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid #D85623;
          padding-bottom: 2px;
        }

        .quick-spec-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .quick-spec-form input,
        .quick-spec-form textarea {
          background: #FAF8F5;
          border: 1px solid rgba(24, 23, 22, 0.12);
          border-radius: 10px;
          padding: 10px 14px;
          font-family: inherit;
          font-size: 13px;
          color: #181716;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .quick-spec-form input:focus,
        .quick-spec-form textarea:focus {
          border-color: #D85623;
          background: #FFFFFF;
        }

        .spec-submit-btn {
          background: #D85623;
          color: #FFFFFF;
          border: none;
          padding: 12px 24px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .spec-submit-btn:hover {
          background: #B84415;
          transform: translateY(-2px);
        }

        .form-success-note {
          padding: 20px 0;
          text-align: center;
        }

        .success-glyph {
          font-size: 24px;
          color: #D85623;
          display: block;
          margin-bottom: 10px;
        }

        .reset-enquiry-btn {
          margin-top: 14px;
          background: none;
          border: 1px solid #D85623;
          color: #D85623;
          padding: 6px 16px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 12px;
        }

        .finale-bottom-copyright {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 30px;
          border-top: 1px solid rgba(24, 23, 22, 0.08);
          font-size: 12px;
          color: #8C8373;
          flex-wrap: wrap;
          gap: 12px;
        }

        .copyright-motto {
          font-family: var(--font-mono, monospace);
          color: #D85623;
        }

        @media (max-width: 900px) {
          .editorial-finale-footer {
            padding: 70px 24px 30px;
          }
          .finale-dock-split {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  )
}
