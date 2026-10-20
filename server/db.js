import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, 'data')
const DB_FILE = path.join(DATA_DIR, 'enquiries.json')

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8')
  }
}

/**
 * Saves a new enquiry to the persistent JSON database
 * @param {Object} data 
 * @returns {Object} Saved enquiry record
 */
export function saveEnquiry(data) {
  const id = data.id || `ENQ-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
  const now = new Date().toISOString()

  const record = {
    id,
    createdAt: now,
    status: 'received',
    customer: {
      name: data.name?.trim(),
      phone: data.phone?.trim(),
    },
    product: {
      id: data.productId || 'custom',
      name: data.productName?.trim(),
      image: data.productImage || null,
      category: data.category || 'regular',
    },
    requirement: {
      quantity: data.quantity?.trim() || 'Not specified',
      message: data.message?.trim() || '',
    },
    notification: {
      recipient: 'pearlleddriver@gmail.com',
      emailSent: Boolean(data.emailStatus?.sent),
      emailSimulated: Boolean(data.emailStatus?.simulated),
      attachmentIncluded: Boolean(data.emailStatus?.hasAttachment),
      attachmentFile: data.emailStatus?.attachmentFile || null,
      attachmentMime: data.emailStatus?.attachmentMime || null,
    },
  }

  // On Vercel or cloud serverless, the filesystem is ephemeral and read-only.
  // We do not treat local JSON files as persistent database storage.
  if (process.env.VERCEL) {
    return {
      ...record,
      persisted: false,
      storageNote: 'Serverless execution: local JSON persistence bypassed.',
    }
  }

  try {
    ensureStorage()
    const raw = fs.readFileSync(DB_FILE, 'utf-8')
    const list = JSON.parse(raw || '[]')
    list.unshift(record)
    fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf-8')
    return { ...record, persisted: true }
  } catch (err) {
    console.warn('[DB NOTICE] Local JSON write skipped (filesystem restricted):', err.message)
    return {
      ...record,
      persisted: false,
      storageNote: 'Filesystem write unavailable.',
    }
  }
}

/**
 * Retrieves all stored enquiries
 * @returns {Array} List of enquiries
 */
export function getAllEnquiries() {
  ensureStorage()
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(raw || '[]')
  } catch (err) {
    console.error('[DB ERROR] Failed to read enquiries:', err)
    return []
  }
}
