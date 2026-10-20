/**
 * Pearl Lighting - WhatsApp Product & Photo Sharing Utility
 * 
 * Configured Business WhatsApp Number: 918329045712
 * 
 * Features:
 * 1. Checks `navigator.canShare({ files })` to determine whether the browser
 *    supports native file sharing.
 * 2. If supported, prepares a real File object from the actual product photo
 *    and invokes `navigator.share({ files: [file], title, text })`, allowing
 *    the customer to select WhatsApp in the native share sheet and send both photo + details.
 * 3. Graceful Fallback: If file sharing is unsupported or fails, opens direct WhatsApp
 *    via `https://wa.me/918329045712?text=...` with the URL-encoded prefilled enquiry message,
 *    and copies the image to clipboard on desktop so the user can easily paste it.
 * 4. Transparent handling: Does not claim the photo was sent merely because WhatsApp was opened.
 */

export const PEARL_WHATSAPP_NUMBER = '918329045712'

/**
 * Builds the comprehensive WhatsApp enquiry text
 */
export function buildWhatsAppMessage({
  product,
  customerName = '',
  customerPhone = '',
  quantity = '',
  message = '',
  enquiryId = '',
}) {
  const productName = product?.name || 'Lighting Product'
  const categoryName = product?.category === 'diwali' ? 'Diwali & Festive Collection' : 'Architectural Luminaire'

  const lines = [
    `*Pearl Lighting Enquiry*`,
    `Product: *${productName}* (${categoryName})`,
  ]

  if (enquiryId) {
    lines.push(`Reference Code: #${enquiryId}`)
  }

  if (customerName) {
    lines.push(`Customer: ${customerName}`)
  }

  if (customerPhone) {
    lines.push(`Contact: ${customerPhone}`)
  }

  if (quantity) {
    lines.push(`Estimated Quantity: ${quantity}`)
  }

  if (message) {
    lines.push(`Notes: "${message}"`)
  }

  lines.push(`Could you please share pricing and availability for this item?`)

  return lines.join('\n')
}

/**
 * Converts an image URL into a real File object with correct MIME type
 * @param {string} imageUrl 
 * @param {string} customName 
 * @returns {Promise<File>}
 */
export async function urlToFile(imageUrl, customName) {
  const response = await fetch(imageUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch image for sharing: ${response.statusText}`)
  }
  const blob = await response.blob()
  
  let mimeType = blob.type
  if (!mimeType || mimeType === 'application/octet-stream') {
    if (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg')) {
      mimeType = 'image/jpeg'
    } else if (imageUrl.endsWith('.webp')) {
      mimeType = 'image/webp'
    } else {
      mimeType = 'image/png'
    }
  }

  const ext = mimeType === 'image/jpeg' ? 'jpg' : mimeType === 'image/webp' ? 'webp' : 'png'
  const cleanName = customName
    ? `${customName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${ext}`
    : imageUrl.split('/').pop() || `pearl-lighting-product.${ext}`

  return new File([blob], cleanName, { type: mimeType })
}

/**
 * Attempts to copy an image to the system clipboard (PNG blob)
 * @param {string} imageUrl
 * @returns {Promise<boolean>}
 */
export async function copyImageToClipboard(imageUrl) {
  if (typeof navigator === 'undefined' || !navigator.clipboard?.write || typeof ClipboardItem === 'undefined' || !imageUrl) {
    return false
  }

  try {
    const res = await fetch(imageUrl)
    if (!res.ok) return false
    const blob = await res.blob()

    let pngBlob = blob
    if (blob.type !== 'image/png') {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      const objUrl = URL.createObjectURL(blob)
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = objUrl
      })
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth || 400
      canvas.height = img.naturalHeight || 400
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(objUrl)
      pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
    }

    if (pngBlob) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': pngBlob })
      ])
      return true
    }
  } catch (err) {
    console.debug('[WhatsApp] Clipboard image copy skipped:', err.message)
  }
  return false
}

/**
 * Shares product photo and text via Web Share API with File when supported,
 * or gracefully falls back to direct wa.me link with prefilled enquiry text.
 * 
 * @param {Object} options
 * @param {Object} options.product
 * @param {string} [options.selectedImage]
 * @param {string} [options.customerName]
 * @param {string} [options.customerPhone]
 * @param {string} [options.quantity]
 * @param {string} [options.message]
 * @param {string} [options.enquiryId]
 * @returns {Promise<{ method: 'native-share' | 'wa-link', shared: boolean, cancelled?: boolean, fallbackReason?: string, copiedToClipboard?: boolean }>}
 */
export async function shareProductOnWhatsApp({
  product,
  selectedImage,
  customerName = '',
  customerPhone = '',
  quantity = '',
  message = '',
  enquiryId = '',
}) {
  const messageText = buildWhatsAppMessage({
    product,
    customerName,
    customerPhone,
    quantity,
    message,
    enquiryId,
  })

  const targetPhoto =
    selectedImage ||
    product?.selectedImage ||
    product?.primaryImage?.image ||
    product?.image ||
    null

  // 1. Check if browser supports Web Share API with files
  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function' &&
    typeof navigator.canShare === 'function' &&
    typeof File !== 'undefined' &&
    targetPhoto
  ) {
    try {
      const file = await urlToFile(targetPhoto, product?.name)
      const shareData = {
        files: [file],
        title: `Pearl Lighting - ${product?.name || 'Luminaire'}`,
        text: messageText,
      }

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData)
        return {
          method: 'native-share',
          shared: true,
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        // Customer dismissed or cancelled the share sheet
        return {
          method: 'native-share',
          shared: false,
          cancelled: true,
        }
      }
      console.warn('[WHATSAPP SHARE] Native file sharing failed or was dismissed, falling back to direct link:', err.message)
    }
  }

  // 2. Fallback: Direct WhatsApp Click-to-Chat URL
  const waUrl = `https://wa.me/${PEARL_WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`
  const win = window.open(waUrl, '_blank', 'noopener,noreferrer')
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = waUrl
  }

  // Best effort copy to clipboard for quick paste
  let copied = false
  if (targetPhoto) {
    copied = await copyImageToClipboard(targetPhoto)
  }

  return {
    method: 'wa-link',
    shared: true,
    copiedToClipboard: copied,
    fallbackReason: targetPhoto
      ? 'Native file sharing is not supported on this browser/device. Direct WhatsApp chat opened with prefilled message; please attach the photo manually.'
      : 'Direct chat opened with prefilled text.',
  }
}
