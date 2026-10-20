import http from 'node:http'
import { handleEnquiry } from './enquiryHandler.js'
import 'dotenv/config'

const PORT = Number(process.env.PORT) || 3001

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  // Health check
  if (req.url === '/api/health' && req.method === 'GET') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: 'healthy', service: 'Pearl Lighting Enquiry Gateway' }))
    return
  }

  // Enquiry endpoint
  if (req.url === '/api/enquiry' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}')
        const result = await handleEnquiry(payload)
        res.statusCode = result.status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(result.body))
      } catch (err) {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload.' }))
      }
    })
    return
  }

  res.statusCode = 404
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ error: 'Endpoint not found' }))
})

server.listen(PORT, () => {
  console.log(`[PEARL LIGHTING SERVER] Backend server running on http://localhost:${PORT}`)
})
