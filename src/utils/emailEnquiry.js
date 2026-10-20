import { STUDIO_INFO } from '../data/productsData.js'

export function getProductEnquiryMailto(product = {}, customer = {}) {
  const name = product.name || 'Pearl Lighting Collection'
  const subject = `Product Enquiry – ${name} | Pearl Lighting`
  const body = [
    'Hello Pearl Lighting,',
    '',
    `I would like to enquire about: ${name}`,
    '',
    `Name: ${customer.name || ''}`,
    `Contact Number: ${customer.contactNumber || ''}`,
    `Quantity: ${customer.quantity || ''}`,
  ].join('\n')

  return `mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
