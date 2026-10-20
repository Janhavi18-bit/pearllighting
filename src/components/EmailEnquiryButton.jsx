import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { STUDIO_INFO } from '../data/productsData'
import { getProductEnquiryMailto } from '../utils/emailEnquiry'
import './EmailEnquiryButton.css'

export default function EmailEnquiryButton({ product, className = '' }) {
  const [showForm, setShowForm] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [copied, setCopied] = useState(false)
  const fallbackTimer = useRef(null)
  const productName = product?.name || 'Pearl Lighting Collection'

  useEffect(() => () => window.clearTimeout(fallbackTimer.current), [])

  const openForm = () => {
    window.clearTimeout(fallbackTimer.current)
    setShowFallback(false)
    setCopied(false)
    setShowForm(true)
  }

  const submitEnquiry = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const customer = {
      name: formData.get('customerName').trim(),
      contactNumber: formData.get('contactNumber').trim(),
      quantity: formData.get('quantity').trim(),
    }

    window.clearTimeout(fallbackTimer.current)
    window.location.href = getProductEnquiryMailto(product, customer)
    setShowForm(false)
    fallbackTimer.current = window.setTimeout(() => {
      if (document.visibilityState === 'visible') setShowFallback(true)
    }, 1800)
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_INFO.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setShowFallback(true)
    }
  }

  return (
    <div className={`email-enquiry-wrap ${className}`}>
      <button className="email-enquiry-button" type="button" onClick={openForm}>
        <span aria-hidden="true">✉</span><span>Email Enquiry</span>
      </button>

      {showFallback && (
        <div className="email-enquiry-fallback" role="status">
          <span>Email app didn’t open?</span>
          <a href={`mailto:${STUDIO_INFO.email}`}>{STUDIO_INFO.email}</a>
          <button type="button" onClick={copyAddress}>{copied ? 'Copied' : 'Copy email'}</button>
        </div>
      )}

      {showForm && createPortal(
        <div className="email-enquiry-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowForm(false)
        }}>
          <section
            className="email-enquiry-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="email-enquiry-title"
          >
            <button
              className="email-enquiry-close"
              type="button"
              aria-label="Close enquiry form"
              onClick={() => setShowForm(false)}
            >×</button>
            <p className="email-enquiry-eyebrow">PEARL LIGHTING · PRODUCT ENQUIRY</p>
            <h2 id="email-enquiry-title">Enquire about {productName}</h2>
            <p className="email-enquiry-product">Product Name: <strong>{productName}</strong></p>
            <form className="email-enquiry-form" onSubmit={submitEnquiry}>
              <label>
                Customer Name
                <input name="customerName" type="text" autoComplete="name" required />
              </label>
              <label>
                Contact Number
                <input name="contactNumber" type="tel" autoComplete="tel" required />
              </label>
              <label>
                Quantity
                <input name="quantity" type="number" min="1" step="1" inputMode="numeric" required />
              </label>
              <button className="email-enquiry-submit" type="submit">Continue to Email</button>
            </form>
            <p className="email-enquiry-note">This opens an email draft for you to review and send.</p>
          </section>
        </div>,
        document.body,
      )}
    </div>
  )
}
