import React, { useState, useEffect } from 'react'

/**
 * ProductEnquiryModal - Premium Architectural & Festive Enquiry Dialog
 * 
 * Features:
 * - Automatically associates the correct product name and existing photo
 * - Form validation (Name, WhatsApp number, optional quantity, optional message)
 * - Anti-duplicate submission protection
 * - Secure backend API integration (/api/enquiry)
 * - Email dispatch to pearlleddriver@gmail.com with image attachment
 * - Clear confirmation screen with delivery status breakdown
 */
export default function ProductEnquiryModal({ product, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    quantity: '',
    message: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submissionResult, setSubmissionResult] = useState(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setFormData({
        name: '',
        phone: '',
        quantity: '',
        message: '',
      })
      setErrors({})
      setServerError(null)
      setIsSuccess(false)
      setIsSubmitting(false)
      setSubmissionResult(null)

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isOpen, product, onClose])

  if (!isOpen || !product) return null

  // Resolve actual product photo - strictly use authentic photo without silent replacement!
  const resolvedPhoto =
    product.selectedImage ||
    product.primaryImage?.image ||
    product.image ||
    (Array.isArray(product.additionalImages) && product.additionalImages[0]?.image) ||
    null

  const validate = () => {
    const errs = {}
    const trimmedName = formData.name.trim()
    const trimmedPhone = formData.phone.trim()
    const digitsOnly = trimmedPhone.replace(/[^0-9]/g, '')

    if (!trimmedName) {
      errs.name = 'Please provide your full name.'
    } else if (trimmedName.length < 2) {
      errs.name = 'Name must be at least 2 characters.'
    }

    if (!trimmedPhone) {
      errs.phone = 'Please provide your WhatsApp number.'
    } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      errs.phone = 'Please enter a valid phone or WhatsApp number (7 to 15 digits).'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
    if (serverError) {
      setServerError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    if (!validate()) return

    setIsSubmitting(true)
    setServerError(null)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          quantity: formData.quantity.trim(),
          message: formData.message.trim(),
          productId: product.id || 'custom',
          productName: product.name,
          productImage: resolvedPhoto,
          category: product.category || 'regular',
        }),
      })

      let data = null
      const contentType = response.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        try {
          data = await response.json()
        } catch (_) {}
      }

      if (!response.ok || !data || !data.success) {
        throw new Error(data?.error || 'Online submission server is currently offline.')
      }

      setSubmissionResult(data)
      setIsSuccess(true)
    } catch (err) {
      console.warn('[ENQUIRY SUBMISSION NOTICE]', err)
      setServerError(
        err.message || 'Online submission service is currently unavailable. You can connect directly with our Mumbai studio via WhatsApp.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="enquiry-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-heading"
    >
      <div className="enquiry-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="enquiry-modal-close-btn"
          onClick={onClose}
          aria-label="Close enquiry modal"
        >
          <span aria-hidden="true">✕</span>
        </button>

        {!isSuccess ? (
          <div className="enquiry-form-container">
            {/* Header with Product Preview */}
            <div className="enquiry-product-header">
              <div className="enquiry-product-thumb">
                <img
                  src={resolvedPhoto}
                  alt={product.name}
                  className="enquiry-thumb-img"
                />
              </div>
              <div className="enquiry-product-info">
                <span className="enquiry-category-badge">
                  {product.category === 'diwali' ? 'FESTIVE COLLECTION' : 'ARCHITECTURAL LUMINAIRE'}
                </span>
                <h2 id="enquiry-modal-heading" className="enquiry-product-title">
                  {product.name}
                </h2>
                <p className="enquiry-product-sub">
                  Official Studio Enquiry • Parth Enterprises
                </p>
              </div>
            </div>

            {serverError && (
              <div className="enquiry-alert-error" role="alert">
                <div className="enquiry-alert-msg">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <span>{serverError}</span>
                </div>
                <a
                  href={`https://wa.me/918329045712?text=${encodeURIComponent(
                    `Hi Pearl Lighting Studio!\nI would like to inquire about ${product.name}.\nName: ${formData.name.trim() || 'Client'}\nWhatsApp: ${formData.phone.trim() || 'Not provided'}${formData.quantity.trim() ? `\nQuantity/Scope: ${formData.quantity.trim()}` : ''}${formData.message.trim() ? `\nNotes: ${formData.message.trim()}` : ''}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enquiry-wa-fallback-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
                  </svg>
                  <span>Continue to WhatsApp (+91 83290 45712) ↗</span>
                </a>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="enquiry-form-fields">
              {/* Customer Full Name */}
              <div className="enquiry-field-group">
                <label htmlFor="enquiry-customer-name" className="enquiry-label">
                  Your Full Name <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  id="enquiry-customer-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Divya Solanki"
                  disabled={isSubmitting}
                  className={`enquiry-input ${errors.name ? 'input-error' : ''}`}
                  autoComplete="name"
                  required
                />
                {errors.name && <span className="enquiry-error-msg">{errors.name}</span>}
              </div>

              {/* WhatsApp Number */}
              <div className="enquiry-field-group">
                <label htmlFor="enquiry-customer-phone" className="enquiry-label">
                  WhatsApp Contact Number <span className="req-star">*</span>
                </label>
                <div className="enquiry-phone-wrap">
                  <span className="phone-prefix">+91 / Country</span>
                  <input
                    type="tel"
                    id="enquiry-customer-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 98765 43210"
                    disabled={isSubmitting}
                    className={`enquiry-input phone-input ${errors.phone ? 'input-error' : ''}`}
                    autoComplete="tel"
                    required
                  />
                </div>
                {errors.phone && <span className="enquiry-error-msg">{errors.phone}</span>}
              </div>

              {/* Optional Quantity */}
              <div className="enquiry-field-group">
                <label htmlFor="enquiry-quantity" className="enquiry-label">
                  Estimated Quantity / Scope <span className="optional-tag">(Optional)</span>
                </label>
                <input
                  type="text"
                  id="enquiry-quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 10 pieces, 25 meters, or Full Villa requirement"
                  disabled={isSubmitting}
                  className="enquiry-input"
                />
              </div>

              {/* Optional Message */}
              <div className="enquiry-field-group">
                <label htmlFor="enquiry-message" className="enquiry-label">
                  Message or Specification Notes <span className="optional-tag">(Optional)</span>
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify ceiling height, colour temperature preferences, or festive dates..."
                  disabled={isSubmitting}
                  className="enquiry-textarea"
                />
              </div>

              {/* Submission CTA */}
              <div className="enquiry-submit-row">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="enquiry-submit-btn"
                  id="submit-enquiry-btn"
                >
                  {isSubmitting ? (
                    <>
                      <span className="submit-spinner" aria-hidden="true"></span>
                      <span>TRANSMITTING ENQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>SUBMIT OFFICIAL ENQUIRY</span>
                      <span className="btn-arrow" aria-hidden="true">→</span>
                    </>
                  )}
                </button>
              </div>

              <p className="enquiry-disclaimer">
                ✓ An automatic notification with this luminaire photo is routed to <strong>pearlleddriver@gmail.com</strong> for immediate quotation.
              </p>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="enquiry-success-view">
            <div className="success-icon-wrap" aria-hidden="true">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#AF812A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <span className="success-eyebrow">ENQUIRY REGISTERED</span>
            <h2 className="success-title">Thank You, {formData.name.trim()}</h2>
            
            <p className="success-description">
              Your inquiry for <strong>{product.name}</strong> has been processed.
            </p>

            {submissionResult?.enquiryId && (
              <div className="success-ref-badge">
                <span className="ref-label">OFFICIAL REFERENCE:</span>
                <span className="ref-code">#{submissionResult.enquiryId}</span>
              </div>
            )}

            <div className="success-status-breakdown">
              {submissionResult?.emailNotification?.sent ? (
                <div className="status-item status-ok">
                  <span className="status-bullet">✓</span>
                  <span className="status-text">
                    Official notification email delivered to <strong>{submissionResult.emailNotification.recipient}</strong>
                  </span>
                </div>
              ) : submissionResult?.emailNotification?.simulated ? (
                <div className="status-item status-simulated">
                  <span className="status-bullet">ℹ</span>
                  <span className="status-text">
                    Email notification simulated in local development mode (<strong>SEND_REAL_EMAILS=false</strong>).
                  </span>
                </div>
              ) : null}

              {submissionResult?.storage?.persistedLocally && (
                <div className="status-item status-ok">
                  <span className="status-bullet">✓</span>
                  <span className="status-text">
                    Logged to local development store (server/data/enquiries.json)
                  </span>
                </div>
              )}

              {submissionResult?.emailNotification?.photoUrl && (
                <div className="status-item status-ok">
                  <span className="status-bullet">✓</span>
                  <span className="status-text">
                    Authentic product photo verified for inquiry
                  </span>
                </div>
              )}
            </div>

            {/* Dual Channel Step 2: Customer WhatsApp Connection */}
            <div className="success-whatsapp-box">
              <p className="wa-box-prompt">
                <strong>Step 2 (Recommended):</strong> Connect directly with our Mumbai studio on WhatsApp with reference <strong>#{submissionResult?.enquiryId || 'INQUIRY'}</strong>:
              </p>
              <a
                href={`https://wa.me/918329045712?text=${encodeURIComponent(
                  `Hi Pearl Lighting Studio!\nI have submitted an enquiry for *${product.name}*.\nReference Code: *#${submissionResult?.enquiryId || ''}*\nCustomer: ${formData.name.trim()}\nWhatsApp: ${formData.phone.trim()}${formData.quantity.trim() ? `\nScope/Quantity: ${formData.quantity.trim()}` : ''}${formData.message.trim() ? `\nNotes: "${formData.message.trim()}"` : ''}\n\nPlease share availability, catalogue, and quotation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="success-whatsapp-btn"
                onClick={(e) => {
                  const href = e.currentTarget.href
                  const win = window.open(href, '_blank', 'noopener,noreferrer')
                  if (!win || win.closed || typeof win.closed === 'undefined') {
                    window.location.href = href
                  }
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06s-1.05-.39-2-1.23c-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32"/>
                </svg>
                <span>Continue to WhatsApp (+91 83290 45712) ↗</span>
              </a>
              <p className="wa-honesty-note">
                Note: Clicking opens WhatsApp with your prefilled inquiry. You review and send it yourself directly.
              </p>
            </div>

            <div className="success-close-row">
              <button type="button" onClick={onClose} className="success-done-btn">
                RETURN TO CATALOGUE
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .enquiry-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(13, 13, 13, 0.78);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 30000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: enquiryFadeIn 0.25s ease-out;
        }

        @keyframes enquiryFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .enquiry-modal-panel {
          position: relative;
          width: 100%;
          max-width: 540px;
          max-height: 90vh;
          overflow-y: auto;
          background: #FAF7F0;
          border: 1px solid rgba(175, 129, 42, 0.35);
          border-radius: 4px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.4) inset;
          padding: 2.25rem 2rem;
          color: #171717;
          animation: enquirySlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes enquirySlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .enquiry-modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(23, 23, 23, 0.15);
          background: #FAF7F0;
          color: #171717;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .enquiry-modal-close-btn:hover {
          background: #171717;
          color: #FAF7F0;
          border-color: #171717;
        }

        .enquiry-product-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-bottom: 1.25rem;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid rgba(175, 129, 42, 0.2);
        }

        .enquiry-product-thumb {
          width: 76px;
          height: 76px;
          min-width: 76px;
          border-radius: 3px;
          border: 1px solid rgba(175, 129, 42, 0.3);
          background: #FFFFFF;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .enquiry-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .enquiry-product-info {
          flex: 1;
        }

        .enquiry-category-badge {
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #AF812A;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 0.25rem;
        }

        .enquiry-product-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          line-height: 1.2;
          color: #171717;
          margin: 0 0 0.25rem;
          letter-spacing: 0.02em;
        }

        .enquiry-product-sub {
          font-family: var(--font-sans);
          font-size: 0.74rem;
          color: #7A756D;
          margin: 0;
        }

        .enquiry-alert-error {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: #FAF7F0;
          border: 1px solid rgba(175, 129, 42, 0.45);
          border-radius: 4px;
          padding: 0.9rem 1rem;
          margin-bottom: 1.25rem;
          color: #171717;
          font-size: 0.82rem;
          font-family: var(--font-sans);
        }

        .enquiry-alert-msg {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          color: #8A5A12;
          font-weight: 500;
          line-height: 1.35;
        }

        .enquiry-wa-fallback-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.65rem 1rem;
          background: #171717;
          color: #F8F5EE;
          border: 1px solid #C69A52;
          border-radius: 3px;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: all 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .enquiry-wa-fallback-btn:hover {
          background: #C69A52;
          color: #171717;
        }

        .enquiry-form-fields {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .enquiry-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .enquiry-label {
          font-family: var(--font-sans);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2A2825;
        }

        .req-star {
          color: #C0392B;
        }

        .optional-tag {
          font-weight: 400;
          color: #8C877D;
          text-transform: none;
        }

        .enquiry-input,
        .enquiry-textarea {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid #D8D2C5;
          border-radius: 2px;
          padding: 0.75rem 0.9rem;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          color: #171717;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .enquiry-input:focus,
        .enquiry-textarea:focus {
          outline: none;
          border-color: #AF812A;
          box-shadow: 0 0 0 2px rgba(175, 129, 42, 0.15);
        }

        .enquiry-input.input-error {
          border-color: #E74C3C;
          background: #FFF9F9;
        }

        .enquiry-phone-wrap {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid #D8D2C5;
          border-radius: 2px;
          overflow: hidden;
        }

        .phone-prefix {
          padding: 0.75rem 0.85rem;
          background: #F4EFE6;
          border-right: 1px solid #D8D2C5;
          font-family: var(--font-mono, monospace);
          font-size: 0.75rem;
          color: #55524B;
          white-space: nowrap;
        }

        .enquiry-input.phone-input {
          border: none;
          border-radius: 0;
        }

        .enquiry-error-msg {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          color: #C0392B;
          margin-top: 0.15rem;
        }

        .enquiry-textarea {
          resize: vertical;
          min-height: 75px;
        }

        .enquiry-submit-row {
          margin-top: 0.5rem;
        }

        .enquiry-submit-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          background: #171717;
          color: #FAF7F0;
          border: 1px solid #171717;
          border-radius: 2px;
          padding: 1.05rem 1.5rem;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .enquiry-submit-btn:hover:not(:disabled) {
          background: #AF812A;
          border-color: #AF812A;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px -4px rgba(175, 129, 42, 0.35);
        }

        .enquiry-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .enquiry-disclaimer {
          font-family: var(--font-sans);
          font-size: 0.73rem;
          color: #7A756D;
          text-align: center;
          margin: 0.35rem 0 0;
          line-height: 1.4;
        }

        /* ── Success Screen ── */
        .enquiry-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1rem 0.5rem;
        }

        .success-icon-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: #F4EFE6;
          border: 1px solid rgba(175, 129, 42, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .success-eyebrow {
          font-family: var(--font-mono, monospace);
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          color: #AF812A;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 0.35rem;
        }

        .success-title {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #171717;
          margin: 0 0 0.85rem;
        }

        .success-description {
          font-family: var(--font-sans);
          font-size: 0.86rem;
          line-height: 1.6;
          color: #55524B;
          max-width: 440px;
          margin: 0 0 1.25rem;
        }

        .success-status-breakdown {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid rgba(175, 129, 42, 0.25);
          border-radius: 4px;
          padding: 1rem 1.15rem;
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
        }

        .status-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          line-height: 1.45;
        }

        .status-item .status-bullet {
          font-weight: 700;
          font-size: 0.95rem;
          line-height: 1.1;
        }

        .status-item.status-ok {
          color: #171717;
        }

        .status-item.status-ok .status-bullet {
          color: #0F763E;
        }

        .status-item.status-simulated {
          color: #4A463F;
          background: #FDF9F2;
          padding: 0.45rem 0.65rem;
          border-radius: 3px;
          border-left: 3px solid #AF812A;
        }

        .status-item.status-simulated .status-bullet {
          color: #AF812A;
        }

        .status-item.status-warn {
          color: #842029;
          background: #FFF5F5;
          padding: 0.45rem 0.65rem;
          border-radius: 3px;
          border-left: 3px solid #E74C3C;
        }

        .status-item.status-warn .status-bullet {
          color: #E74C3C;
        }

        .success-ref-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          border: 1px dashed rgba(175, 129, 42, 0.5);
          padding: 0.45rem 0.9rem;
          border-radius: 3px;
          margin-bottom: 1.75rem;
        }

        .ref-label {
          font-family: var(--font-mono, monospace);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: #8C877D;
        }

        .ref-code {
          font-family: var(--font-mono, monospace);
          font-size: 0.8rem;
          font-weight: 700;
          color: #171717;
          letter-spacing: 0.08em;
        }

        .success-whatsapp-box {
          width: 100%;
          background: #FFFFFF;
          border: 1px solid rgba(37, 211, 102, 0.3);
          border-radius: 4px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
        }

        .wa-box-prompt {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          color: #2A2825;
          margin: 0 0 0.85rem;
          font-weight: 500;
        }

        .success-whatsapp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          width: 100%;
          background: #171717;
          color: #FAF7F2;
          border: 1px solid rgba(198, 154, 82, 0.45);
          border-radius: 3px;
          padding: 0.95rem 1.25rem;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-sizing: border-box;
        }

        .success-whatsapp-btn:hover {
          background: #C69A52;
          color: #12100E;
          border-color: #C69A52;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -2px rgba(198, 154, 82, 0.4);
        }

        .success-whatsapp-btn:focus-visible {
          outline: 2px solid #C69A52;
          outline-offset: 2px;
        }

        .wa-honesty-note {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          color: #8C877D;
          margin: 0.65rem 0 0;
          line-height: 1.45;
        }

        .wa-fallback-note {
          color: #8A641E;
          background: #FAF6ED;
          padding: 0.5rem 0.75rem;
          border-radius: 3px;
        }

        .wa-success-note {
          color: #0F763E;
          background: #EEF8F1;
          padding: 0.5rem 0.75rem;
          border-radius: 3px;
          font-weight: 500;
        }

        .success-done-btn {
          background: transparent;
          border: 1px solid rgba(23, 23, 23, 0.25);
          color: #171717;
          padding: 0.75rem 1.75rem;
          border-radius: 2px;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .success-done-btn:hover {
          background: #171717;
          color: #FAF7F0;
        }

        @media (max-width: 640px) {
          .enquiry-input,
          .enquiry-textarea {
            font-size: 16px !important; /* Prevents unwanted iOS Safari viewport auto-zoom */
          }
          .phone-prefix {
            font-size: 14px;
            padding: 0.75rem 0.65rem;
          }
        }

        @media (max-width: 580px) {
          .enquiry-modal-backdrop {
            padding: 0.75rem;
          }
          .enquiry-modal-panel {
            padding: 1.5rem 1rem;
            max-height: 92vh;
            border-radius: 8px;
          }
          .enquiry-modal-close-btn {
            top: 0.75rem;
            right: 0.75rem;
            width: 44px;
            height: 44px;
            font-size: 1rem;
          }
          .enquiry-product-thumb {
            width: 54px;
            height: 54px;
            min-width: 54px;
          }
          .enquiry-product-title {
            font-size: 1.1rem;
          }
          .enquiry-submit-btn {
            min-height: 44px;
            padding: 0.95rem 1rem;
            font-size: 0.76rem;
          }
        }

        @media (max-width: 360px) {
          .enquiry-modal-backdrop {
            padding: 0.5rem;
          }
          .enquiry-modal-panel {
            padding: 1.25rem 0.75rem;
          }
          .enquiry-product-summary {
            gap: 0.65rem;
          }
          .enquiry-product-title {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
