import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function enquiryApiPlugin() {
  return {
    name: 'pearl-enquiry-api',
    configureServer(server) {
      server.middlewares.use('/api/enquiry', async (req, res, next) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk
          })
          req.on('end', async () => {
            try {
              const data = JSON.parse(body || '{}')
              const { handleEnquiry } = await import('./server/enquiryHandler.js')
              const host = req.headers.host || 'localhost:5173'
              const origin = `http://${host}`
              const result = await handleEnquiry(data, { origin })
              res.statusCode = result.status
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(result.body))
            } catch (err) {
              console.error('[VITE API ERROR]', err)
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: 'Internal server error processing enquiry.' }))
            }
          })
          return
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), enquiryApiPlugin()],
  resolve: {
    dedupe: ['react', 'react-dom', 'three'],
  },
  optimizeDeps: {
    include: ['three', 'gsap', 'gsap/ScrollTrigger'],
  },
})
