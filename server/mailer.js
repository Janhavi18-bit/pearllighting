import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resend } from 'resend'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')

const TARGET_EMAIL = process.env.NOTIFICATION_EMAIL || 'pearlleddriver@gmail.com'

/**
 * Returns the MIME type based on file extension
 * @param {string} filePath 
 * @returns {string}
 */
export function getMimeType(filePath) {
  const ext = path.extname(filePath || '').toLowerCase()
  switch (ext) {
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    case '.gif':
      return 'image/gif'
    default:
      return 'application/octet-stream'
  }
}

/**
 * Builds a valid public HTTPS image URL for product images in emails
 * @param {string} imageWebPath 
 * @param {string} origin 
 * @returns {string | null}
 */
export function buildPublicImageUrl(imageWebPath, origin = '') {
  if (!imageWebPath || typeof imageWebPath !== 'string') return null
  if (imageWebPath.startsWith('http://') || imageWebPath.startsWith('https://')) {
    return imageWebPath
  }
  const base = process.env.PUBLIC_APP_URL || origin || 'https://pearl-lighting.vercel.app'
  const cleanPath = imageWebPath.startsWith('/') ? imageWebPath.slice(1) : imageWebPath
  return `${base.replace(/\/$/, '')}/${cleanPath}`
}

/**
 * Resolves the physical path of an existing product photo on disk if present.
 * In serverless environments (e.g. Vercel), this may return exists: false
 * without throwing errors, falling back to public HTTPS URLs.
 * @param {string} imageWebPath 
 * @returns {{ path: string | null, exists: boolean, filename: string | null, mimeType: string | null, error?: string }}
 */
export function resolveProductImage(imageWebPath) {
  if (!imageWebPath || typeof imageWebPath !== 'string') {
    return {
      path: null,
      exists: false,
      filename: null,
      mimeType: null,
      error: 'No product photo path provided',
    }
  }

  try {
    const cleanPath = imageWebPath.startsWith('/') ? imageWebPath.slice(1) : imageWebPath
    const absolutePath = path.join(PROJECT_ROOT, 'public', cleanPath)

    if (fs.existsSync(absolutePath)) {
      const filename = path.basename(absolutePath)
      return {
        path: absolutePath,
        exists: true,
        filename,
        mimeType: getMimeType(filename),
      }
    } else {
      return {
        path: imageWebPath,
        exists: false,
        filename: path.basename(imageWebPath),
        mimeType: getMimeType(imageWebPath),
        note: 'Image not on local filesystem (serverless/CDN host).',
      }
    }
  } catch (err) {
    return {
      path: imageWebPath,
      exists: false,
      filename: path.basename(imageWebPath),
      mimeType: 'application/octet-stream',
      error: err.message,
    }
  }
}

/**
 * Generates an executive, luxury HTML template for the email notification
 */
function buildEmailTemplate({
  enquiryId,
  name,
  phone,
  quantity,
  message,
  productName,
  category,
  hasInlineImage,
  imageBase64,
  mimeType,
  publicImageUrl,
}) {
  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  })

  const waReplyUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F5F0; margin: 0; padding: 24px; color: #171717; }
    .card { max-width: 620px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E6DEC9; border-radius: 6px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .header { background: #171717; padding: 28px 32px; color: #FAF7F0; border-bottom: 2px solid #AF812A; }
    .header-eyebrow { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #C69A52; margin: 0 0 6px; font-weight: 600; }
    .header-title { font-size: 20px; margin: 0; font-weight: 500; letter-spacing: 0.05em; }
    .content { padding: 32px; }
    .badge { display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; background: #F3EAD8; color: #8A641E; padding: 4px 10px; border-radius: 2px; margin-bottom: 16px; }
    .product-box { display: flex; gap: 20px; background: #FAF8F5; border: 1px solid #ECE4D3; border-radius: 4px; padding: 18px; margin-bottom: 28px; }
    .product-img-wrap { width: 140px; min-width: 140px; max-height: 140px; background: #FFFFFF; border: 1px solid #E6DEC9; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .product-img { width: 100%; height: 100%; object-fit: cover; }
    .product-details { flex: 1; }
    .product-name { font-size: 18px; font-weight: 600; color: #171717; margin: 0 0 6px; }
    .product-cat { font-size: 12px; color: #7A756D; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.08em; }
    .specs-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; }
    .specs-table td { padding: 12px 0; border-bottom: 1px solid #F0EBE1; font-size: 14px; }
    .specs-label { width: 35%; color: #7A756D; font-weight: 500; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; }
    .specs-val { color: #171717; font-weight: 600; }
    .message-box { background: #FFFFFF; border-left: 3px solid #AF812A; padding: 14px 18px; font-style: italic; color: #333333; margin-top: 8px; line-height: 1.5; font-size: 14px; }
    .action-row { margin: 28px 0 10px; text-align: center; }
    .reply-btn { display: inline-block; background: #25D366; color: #FFFFFF !important; font-weight: 600; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; padding: 12px 24px; border-radius: 4px; text-decoration: none; }
    .footer { background: #FAF8F5; padding: 20px 32px; border-top: 1px solid #ECE4D3; font-size: 12px; color: #8C877D; text-align: center; }
    .disclaimer { font-size: 11px; color: #A6A095; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="header-eyebrow">PEARL LIGHTING • NOTIFICATION</div>
      <h1 class="header-title">New Product Enquiry Received</h1>
    </div>
    <div class="content">
      <div class="badge">${category === 'diwali' ? 'FESTIVE COLLECTION' : 'ARCHITECTURAL LUMINAIRE'}</div>

      <div class="product-box">
        ${hasInlineImage && imageBase64 ? `
          <div class="product-img-wrap">
            <img src="data:${mimeType};base64,${imageBase64}" alt="${productName}" class="product-img" />
          </div>
        ` : publicImageUrl ? `
          <div class="product-img-wrap">
            <img src="${publicImageUrl}" alt="${productName}" class="product-img" />
          </div>
        ` : ''}
        <div class="product-details">
          <h2 class="product-name">${productName}</h2>
          <p class="product-cat">${category === 'diwali' ? 'Diwali Lighting Collection' : 'Pearl Architectural Series'}</p>
          ${publicImageUrl ? `<p style="font-size: 12px; margin: 4px 0 0;"><a href="${publicImageUrl}" target="_blank" style="color: #8A641E; text-decoration: underline;">View Luminaire Photo Online ↗</a></p>` : ''}
        </div>
      </div>

      <table class="specs-table">
        <tr>
          <td class="specs-label">Reference ID</td>
          <td class="specs-val">
            <span style="font-family: monospace; font-weight: 700; color: #AF812A; font-size: 14px;">#${enquiryId || 'N/A'}</span>
          </td>
        </tr>
        <tr>
          <td class="specs-label">Customer Name</td>
          <td class="specs-val">${name}</td>
        </tr>
        <tr>
          <td class="specs-label">WhatsApp Number</td>
          <td class="specs-val">
            <a href="${waReplyUrl}" style="color: #0B6B38; text-decoration: none; font-weight: 700;">
              ${phone} (Click to reply on WhatsApp)
            </a>
          </td>
        </tr>
        <tr>
          <td class="specs-label">Requested Quantity</td>
          <td class="specs-val">${quantity || 'Not specified (Standard consultation)'}</td>
        </tr>
        <tr>
          <td class="specs-label">Customer Message</td>
          <td class="specs-val">
            ${message ? `<div class="message-box">"${message}"</div>` : '<span style="color: #999; font-weight: 400;">No additional notes provided</span>'}
          </td>
        </tr>
        <tr>
          <td class="specs-label">Timestamp</td>
          <td class="specs-val" style="font-size: 13px; font-weight: 400; color: #555;">${formattedDate}</td>
        </tr>
        <tr>
          <td class="specs-label">Photo Reference</td>
          <td class="specs-val" style="font-size: 12px; font-weight: 400; color: #666; word-break: break-all;">
            ${publicImageUrl ? `<a href="${publicImageUrl}" target="_blank" style="color: #AF812A;">${publicImageUrl}</a>` : 'Standard catalog luminaire'}
          </td>
        </tr>
      </table>

      <div class="action-row">
        <a href="${waReplyUrl}" class="reply-btn">
          💬 Reply Directly to Customer on WhatsApp
        </a>
      </div>
    </div>
    <div class="footer">
      Pearl Lighting & Parth Enterprises Internal Notification System<br />
      <span class="disclaimer">This message was generated automatically by the Pearl Lighting website enquiry gateway.</span>
    </div>
  </div>
</body>
</html>
  `
}

/**
 * Dispatches or safely simulates an email notification with Resend
 * @param {Object} enquiry 
 * @returns {Promise<Object>}
 */
export async function sendEnquiryNotification(enquiry) {
  const { enquiryId, name, phone, quantity, message, productName, productImage, category, origin } = enquiry

  // Resolve public image URL
  const publicImageUrl = buildPublicImageUrl(productImage, origin)

  // Attempt local resolution if files exist (local dev)
  const resolvedImg = resolveProductImage(productImage)
  const hasAttachment = Boolean(resolvedImg && resolvedImg.exists)

  let fileBuffer = null
  let imageBase64 = null
  if (hasAttachment) {
    try {
      fileBuffer = fs.readFileSync(resolvedImg.path)
      imageBase64 = fileBuffer.toString('base64')
    } catch (_) {}
  }

  const attachments = []
  if (hasAttachment && fileBuffer) {
    attachments.push({
      filename: resolvedImg.filename,
      content: fileBuffer,
    })
  }

  const subject = enquiryId
    ? `[Pearl Lighting Enquiry #${enquiryId}] ${productName} — ${name}`
    : `[Pearl Lighting Enquiry] ${productName} — ${name}`

  const htmlContent = buildEmailTemplate({
    enquiryId,
    name,
    phone,
    quantity,
    message,
    productName,
    category,
    hasInlineImage: hasAttachment,
    imageBase64,
    mimeType: resolvedImg?.mimeType,
    publicImageUrl,
  })

  const shouldSendReal = process.env.SEND_REAL_EMAILS === 'true'
  const resendApiKey = process.env.RESEND_API_KEY?.trim()
  const hasResendKey = Boolean(resendApiKey && resendApiKey.length > 5)

  // Simulation mode (default for local safety)
  if (!shouldSendReal || !hasResendKey) {
    const maskedPhone = phone ? `${phone.slice(0, 3)}...${phone.slice(-3)}` : '***'
    console.log('\n======================================================')
    console.log('📨 [PEARL LIGHTING EMAIL NOTIFICATION — SIMULATED]')
    console.log(`Provider:          Resend (Simulation Mode)`)
    console.log(`Destination:       ${TARGET_EMAIL}`)
    console.log(`Subject:           ${subject}`)
    console.log(`Customer:          ${name} (${maskedPhone})`)
    console.log(`Product:           ${productName} [${category || 'regular'}]`)
    console.log(`Quantity:          ${quantity || 'Not specified'}`)
    console.log(`Photo URL:         ${publicImageUrl || 'None'}`)
    console.log(`Attachment:        ${hasAttachment ? `${resolvedImg.filename}` : 'None (Using public HTTPS URL)'}`)
    console.log(`Mode:              Safe Simulation (SEND_REAL_EMAILS=${process.env.SEND_REAL_EMAILS || 'false'}, hasResendKey=${hasResendKey})`)
    console.log(`Note:              No real email sent. Set SEND_REAL_EMAILS=true and RESEND_API_KEY in server environment for live delivery.`)
    console.log('======================================================\n')

    return {
      sent: false,
      simulated: true,
      recipient: TARGET_EMAIL,
      photoUrl: publicImageUrl,
      hasAttachment,
      attachmentFile: hasAttachment ? resolvedImg.filename : null,
      attachmentMime: hasAttachment ? resolvedImg.mimeType : null,
      message: 'Email notification simulated locally (SEND_REAL_EMAILS=false).',
    }
  }

  // Live Resend dispatch (active ONLY if SEND_REAL_EMAILS=true and RESEND_API_KEY is provided)
  try {
    const resend = new Resend(resendApiKey)
    const sender = process.env.RESEND_FROM_EMAIL || 'Pearl Lighting <onboarding@resend.dev>'

    const payload = {
      from: sender,
      to: [TARGET_EMAIL],
      subject,
      html: htmlContent,
    }

    if (attachments.length > 0) {
      payload.attachments = attachments
    }

    const { data, error } = await resend.emails.send(payload)

    if (error) {
      console.error('[RESEND ERROR] Failed to dispatch email:', error.message)
      return {
        sent: false,
        simulated: false,
        error: error.message || 'Resend rejected the email delivery request.',
        recipient: TARGET_EMAIL,
        photoUrl: publicImageUrl,
        hasAttachment,
      }
    }

    console.log(`[RESEND SUCCESS] Live email dispatched to ${TARGET_EMAIL}. Resend ID: ${data?.id}`)
    return {
      sent: true,
      simulated: false,
      id: data?.id,
      recipient: TARGET_EMAIL,
      photoUrl: publicImageUrl,
      hasAttachment,
    }
  } catch (err) {
    console.error('[RESEND ERROR] Exception during email delivery:', err.message)
    return {
      sent: false,
      simulated: false,
      error: err.message || 'Resend dispatch failed.',
      recipient: TARGET_EMAIL,
      photoUrl: publicImageUrl,
      hasAttachment,
    }
  }
}
