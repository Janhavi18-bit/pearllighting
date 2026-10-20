import { handleEnquiry } from '../server/enquiryHandler.js'

/**
 * Vercel Serverless Function Entry Point for Pearl Lighting Enquiries
 * Endpoint: POST /api/enquiry
 */
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '64kb',
    },
  },
}

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  // Enforce POST method
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Use POST.',
    })
  }

  try {
    let payload = req.body
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload || '{}')
      } catch (_) {
        return res.status(400).json({
          success: false,
          error: 'Malformed JSON payload in request body.',
        })
      }
    }

    // Resolve request host context for email image links
    const host = req.headers['x-forwarded-host'] || req.headers.host || ''
    const proto = req.headers['x-forwarded-proto'] || 'https'
    const origin = host ? `${proto}://${host}` : ''

    const result = await handleEnquiry(payload, { origin })
    return res.status(result.status).json(result.body)
  } catch (err) {
    console.error('[API SERVERLESS ERROR]:', err)
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing the enquiry.',
    })
  }
}
