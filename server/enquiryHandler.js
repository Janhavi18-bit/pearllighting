import { saveEnquiry } from './db.js'
import { sendEnquiryNotification } from './mailer.js'

// Simple in-memory deduplication cache (Key: `${phone}:${productId}`, Value: { enquiryId, timestamp, body })
// Prevents accidental duplicate submissions caused by quick repeated button taps.
const recentSubmissions = new Map()
const DEDUPE_WINDOW_MS = 15000 // 15 seconds

function cleanOldSubmissions() {
  const now = Date.now()
  for (const [key, record] of recentSubmissions.entries()) {
    if (now - record.timestamp > 60000) {
      recentSubmissions.delete(key)
    }
  }
}

/**
 * Sanitizes input string to prevent XSS / injection
 * @param {string} str 
 * @param {number} maxLen 
 * @returns {string}
 */
function sanitizeText(str, maxLen = 255) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/[<>]/g, '') // strip HTML brackets
    .trim()
    .slice(0, maxLen)
}

/**
 * Validates enquiry input data
 * @param {Object} data 
 * @returns {{ valid: boolean, errors: Object, sanitized: Object }}
 */
export function validateEnquiryInput(data) {
  const errors = {}

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: { general: 'Invalid request payload.' }, sanitized: {} }
  }

  // Name validation
  const name = sanitizeText(data.name, 100)
  if (!name) {
    errors.name = 'Please provide your name.'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  }

  // Phone validation (WhatsApp number)
  const phone = sanitizeText(data.phone, 30)
  const digitsOnly = phone.replace(/[^0-9]/g, '')
  if (!phone) {
    errors.phone = 'Please provide your WhatsApp number.'
  } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
    errors.phone = 'Please provide a valid phone or WhatsApp number (7–15 digits).'
  }

  // Product validation
  const productName = sanitizeText(data.productName, 150)
  if (!productName) {
    errors.productName = 'Product name is required.'
  }

  const quantity = sanitizeText(data.quantity, 100)
  const message = sanitizeText(data.message, 2000)
  const productId = sanitizeText(data.productId, 80) || 'custom'
  const productImage = typeof data.productImage === 'string' ? data.productImage.trim().slice(0, 500) : ''
  const category = sanitizeText(data.category, 50) || 'regular'

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      name,
      phone,
      digitsOnly,
      productName,
      quantity,
      message,
      productId,
      productImage,
      category,
    },
  }
}

/**
 * Handles incoming enquiry request
 * @param {Object} payload 
 * @param {Object} [context] Optional server context (e.g. origin)
 * @returns {Promise<{ status: number, body: Object }>}
 */
export async function handleEnquiry(payload, context = {}) {
  // 1. Enforce payload size limit
  try {
    const rawLen = JSON.stringify(payload || {}).length
    if (rawLen > 65536) { // 64KB
      return {
        status: 413,
        body: {
          success: false,
          error: 'Payload size exceeds permissible limit (64KB).',
        },
      }
    }
  } catch (_) {}

  // 2. Validate & sanitize
  const { valid, errors, sanitized } = validateEnquiryInput(payload)
  if (!valid) {
    return {
      status: 400,
      body: {
        success: false,
        error: 'Validation failed. Please review highlighted fields.',
        details: errors,
      },
    }
  }

  // 3. Prevent duplicate submissions from rapid repeated clicks
  cleanOldSubmissions()
  const dedupeKey = `${sanitized.digitsOnly}:${sanitized.productId}`
  const cached = recentSubmissions.get(dedupeKey)
  if (cached && Date.now() - cached.timestamp < DEDUPE_WINDOW_MS) {
    console.log(`[ENQUIRY DEDUPE] Repeated request caught for enquiry ${cached.enquiryId}. Returning existing response.`)
    return {
      status: 200,
      body: cached.body,
    }
  }

  try {
    const enquiryId = `ENQ-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`

    // 4. Dispatch email notification via Resend (or safe simulation)
    const emailResult = await sendEnquiryNotification({
      enquiryId,
      name: sanitized.name,
      phone: sanitized.phone,
      quantity: sanitized.quantity,
      message: sanitized.message,
      productName: sanitized.productName,
      productId: sanitized.productId,
      productImage: sanitized.productImage,
      category: sanitized.category,
      origin: context.origin || '',
    })

    // REQUIREMENT: In production, successful email delivery is the REQUIRED confirmation.
    // If real email dispatch failed, clearly report failure and do NOT return success.
    if (!emailResult.sent && !emailResult.simulated) {
      console.error(`[ENQUIRY FAILURE] Email delivery failed for enquiry ${enquiryId}:`, emailResult.error)
      return {
        status: 502,
        body: {
          success: false,
          enquiryId,
          error: 'We were unable to deliver your email enquiry to the studio inbox.',
          details: emailResult.error || 'Email transmission rejected by provider.',
          canUseWhatsApp: true,
          message: 'Please connect with our studio directly on WhatsApp to complete your inquiry.',
        },
      }
    }

    // 5. Attempt local database write in dev / if filesystem is writable
    const savedRecord = saveEnquiry({
      ...sanitized,
      id: enquiryId,
      emailStatus: emailResult,
    })

    const responseBody = {
      success: true,
      enquiryId,
      message: emailResult.simulated
        ? 'Enquiry simulated in local development mode.'
        : 'Your enquiry has been successfully delivered to the studio inbox.',
      emailNotification: {
        recipient: emailResult.recipient,
        sent: Boolean(emailResult.sent),
        simulated: Boolean(emailResult.simulated),
        photoUrl: emailResult.photoUrl || null,
        hasAttachment: Boolean(emailResult.hasAttachment),
        attachmentFile: emailResult.attachmentFile || null,
      },
      storage: {
        persistedLocally: Boolean(savedRecord?.persisted),
      },
    }

    // Cache successful response for deduplication
    recentSubmissions.set(dedupeKey, {
      enquiryId,
      timestamp: Date.now(),
      body: responseBody,
    })

    return {
      status: 200,
      body: responseBody,
    }
  } catch (err) {
    console.error('[ENQUIRY HANDLER ERROR] Internal exception:', err.message)
    return {
      status: 500,
      body: {
        success: false,
        error: 'An internal error occurred while processing your enquiry. Please reach out to our studio on WhatsApp.',
      },
    }
  }
}
