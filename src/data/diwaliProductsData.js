/**
 * Pearl Lighting - Curated Diwali & Festive Lighting Collection Data
 * 
 * Strict editorial principles:
 * - Accurate, concise product names
 * - Genuine, truthful descriptions without invented specs
 * - Grouped authentic photography
 * - Direct WhatsApp inquiry integration with exact photo sharing
 */

export const DIWALI_WHATSAPP_NUMBER = '918329045712'

/**
 * Mood-setting lifestyle portrait photograph for homepage preview
 */
export const DIWALI_LIFESTYLE_IMAGE = {
  image: '/images/diwali/diwali-golden-bokeh-lifestyle.png',
  alt: 'Pearl Lighting Festive Golden Bokeh Mood Luminaire',
  caption: 'Festive Atmosphere & Warm Illumination',
}

/**
 * Builds the exact requested WhatsApp message
 * @param {Object} product
 * @returns {string}
 */
export function getDiwaliWhatsAppMessage(product) {
  const productName = product?.name || 'Diwali light'
  return `Hi Pearl Lighting! I'm interested in this Diwali light. Could you please share its price and availability? Product: ${productName}`
}

/**
 * Builds a properly URL-encoded WhatsApp enquiry URL
 * @param {Object} product
 * @returns {string}
 */
export function getDiwaliWhatsAppUrl(product) {
  const message = getDiwaliWhatsAppMessage(product)
  return `https://wa.me/${DIWALI_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const diwaliProductsData = [
  {
    id: 'hanging-star-curtain',
    name: 'Hanging Star Curtain Lights',
    category: 'diwali',
    description: 'Cascading warm golden star curtain lights for festive windows, balconies, and celebration backdrops.',
    primaryImage: {
      id: 'star-curtain-primary',
      label: 'Hanging Star Silhouette Cascade',
      image: '/images/diwali/diwali-hanging-star-curtain.png',
      alt: 'Pearl Lighting Hanging Star Curtain Lights',
    },
    additionalImages: [],
  },
  {
    id: 'hanging-diya-curtain',
    name: 'Hanging Diya Curtain Lights',
    category: 'diwali',
    description: 'Suspended traditional diya silhouette curtain lights casting warm celebratory illumination across drapery and entrances.',
    primaryImage: {
      id: 'diya-curtain-primary',
      label: 'Warm Golden Diya Silhouette Cascade',
      image: '/images/diwali/diwali-hanging-diya-curtain.png',
      alt: 'Pearl Lighting Hanging Diya Curtain Lights',
    },
    additionalImages: [],
  },
  {
    id: 'multicolour-diya-garland',
    name: 'Multi-Colour Diya Garland Lights',
    category: 'diwali',
    description: 'Festive wall garland strings featuring vibrant illuminated diya silhouettes in jewel tones for mandirs, living rooms, and festive focal walls.',
    primaryImage: {
      id: 'diya-garland-multicolour',
      label: 'Multi-Colour Diya Wall Garland',
      image: '/images/diwali/diwali-multicolour-diya-garland.png',
      alt: 'Pearl Lighting Multi-Colour Diya Garland Lights',
    },
    additionalImages: [],
  },
  {
    id: 'golden-cluster-fairy-string',
    name: 'Golden Cluster Fairy Lights',
    category: 'diwali',
    description: 'Suspended warm golden cluster fairy lights casting an ambient bokeh glow for celebrations, mandirs, and warm evening corners.',
    primaryImage: {
      id: 'golden-cluster-main',
      label: 'Warm Golden Cluster Bokeh Radiance',
      image: '/images/diwali/diwali-golden-cluster-lights.png',
      alt: 'Pearl Lighting Golden Cluster Fairy Lights',
    },
    additionalImages: [],
  },
  {
    id: 'crystal-bubble-string',
    name: 'Crystal Bubble String Lights',
    category: 'diwali',
    description: 'Sparkling crystal bubble ball fairy lights with ambient crackle reflections for tablescapes and decor.',
    primaryImage: {
      id: 'crystal-bubble-main',
      label: 'Crystal Bubble Ball Illumination',
      image: '/images/diwali/diwali-crystal-bubble-lights.png',
      alt: 'Pearl Lighting Crystal Bubble String Lights',
    },
    additionalImages: [],
  },
  {
    id: 'frosted-globe-string',
    name: 'Frosted Globe String Lights',
    category: 'diwali',
    description: 'Evenly diffused frosted berry fairy string lights for railings, mandirs, and festive archways.',
    primaryImage: {
      id: 'frosted-globe-main',
      label: 'Frosted Berry Globe Garland',
      image: '/images/diwali/diwali-frosted-globe-lights.png',
      alt: 'Pearl Lighting Frosted Globe String Lights',
    },
    additionalImages: [],
  },
  {
    id: 'royal-blue-pixel-string',
    name: 'Royal Blue Pixel String Lights',
    category: 'diwali',
    description: 'High-density micro-LED pixel string lights in deep royal blue radiance, creating an enchanting festive evening ambience.',
    primaryImage: {
      id: 'blue-pixel-main',
      label: 'Coiled Royal Blue Diode Glow',
      image: '/images/diwali/diwali-blue-pixel-string.png',
      alt: 'Pearl Lighting Royal Blue Pixel String Lights',
    },
    additionalImages: [],
  },
  {
    id: 'festive-string-light-sets',
    name: 'Multi-Colour Festive String Lights',
    category: 'diwali',
    description: 'Vibrant celebratory string light rolls in warm gold, red, green, blue, amber, and pink hues.',
    primaryImage: {
      id: 'festive-rolls-main',
      label: 'Multi-Colour Spools Overview',
      image: '/images/diwali/diwali-festive-string-set.png',
      alt: 'Pearl Lighting Multi-Colour Festive String Lights Overview',
    },
    additionalImages: [
      {
        id: 'festive-rolls-lit',
        label: 'Illuminated Multi-Colour Spool Display',
        image: '/images/diwali/diwali-multicolour-spool-sets.png',
        alt: 'Pearl Lighting Illuminated Multi-Colour Spool Display',
      },
    ],
  },
  {
    id: 'rainbow-rice-pixel-string',
    name: 'Rainbow Rice Pixel String Lights',
    category: 'diwali',
    description: 'Dual-aspect decorative rice pixel string lights with white cabling and multi-colour jewel-tone diodes.',
    primaryImage: {
      id: 'rice-pixel-bundle',
      label: 'Unlit Coil & Rainbow Sparkle View',
      image: '/images/diwali/diwali-rice-pixel-bundle.png',
      alt: 'Pearl Lighting Rainbow Rice Pixel String Lights',
    },
    additionalImages: [],
  },
  {
    id: 'led-twinkle-pixel-string',
    name: 'Twinkle Pixel String Lights',
    category: 'diwali',
    description: 'Flexible high-density micro-LED pixel string lights with vibrant festive twinkle, shown coiled and illuminated.',
    primaryImage: {
      id: 'pixel-bundle-coil',
      label: 'Coiled Spool Overview',
      image: '/images/diwali/diwali-led-pixel-bundle.png',
      alt: 'Pearl Lighting Twinkle Pixel String Lights coiled spool',
    },
    additionalImages: [
      {
        id: 'pixel-illuminated-hand',
        label: 'Illuminated Diode Twinkle in Hand',
        image: '/images/diwali/diwali-led-pixel-lit.png',
        alt: 'Pearl Lighting Twinkle Pixel String Lights illuminated in hand',
      },
    ],
  },
  {
    id: 'waterfall-multi-g319',
    name: 'Waterfall Single Line Multi Lights',
    category: 'diwali',
    modelNumber: 'G319',
    description: '180L multi-colour waterfall cascade lights in a single-line flow, creating a vibrant celebratory curtain of illumination for balconies, terraces, and festive backdrops.',
    primaryImage: {
      id: 'waterfall-multi-main',
      label: 'Multi-Colour Waterfall Cascade',
      image: '/images/diwali/diwali-waterfall-multi-g319.png',
      alt: 'Pearl Lighting 180L Waterfall Single Line Multi Lights G319',
    },
    additionalImages: [],
  },
  {
    id: 'star-silhouette-rgb-g527',
    name: 'Star Silhouette RGB Motif Light',
    category: 'diwali',
    modelNumber: 'G527',
    description: '30 cm architectural five-point star silhouette luminaire featuring vibrant multi-colour RGB contour diodes for festive window portals and wall hangings.',
    primaryImage: {
      id: 'star-rgb-main',
      label: '30cm Star Silhouette RGB Glow',
      image: '/images/diwali/diwali-star-rgb-g527.png',
      alt: 'Pearl Lighting 30cm RGB Star Silhouette Light G527',
    },
    additionalImages: [],
  },
  {
    id: 'pixel-high-bright-ww-gn144',
    name: 'High-Bright Pixel Lights (Warm White)',
    category: 'diwali',
    modelNumber: 'GN-144',
    description: '88L, 8 mm high-bright warm white pixel diodes along 24-metre yellow-weave cabling with compact controller for warm festive ambient styling.',
    primaryImage: {
      id: 'pixel-ww-main',
      label: 'High-Bright Warm White Pixel Diode String',
      image: '/images/diwali/diwali-pixel-ww-gn144.png',
      alt: 'Pearl Lighting 88L 8mm Pixel High Bright Warm White Lights GN-144',
    },
    additionalImages: [],
  },
  {
    id: 'sudarshan-spiral-rgb-g523',
    name: 'Sudarshan 16-Function RGB Light',
    category: 'diwali',
    modelNumber: 'G523',
    description: 'Dynamic 16-function Sudarshan chakra spiral luminaire featuring curved radial LED light guides and celebratory animation sequences.',
    primaryImage: {
      id: 'sudarshan-main',
      label: 'Dynamic Radial Spiral Wheel Light',
      image: '/images/diwali/diwali-sudarshan-g523.png',
      alt: 'Pearl Lighting Sudarshan 16-Function RGB Motif Light G523',
    },
    additionalImages: [],
  },
  {
    id: 'macaron-curtain-multi-gn39',
    name: 'Shiny Macaron Pastel Curtain Lights',
    category: 'diwali',
    modelNumber: 'GN-39',
    description: '180L shiny macaron multi-colour pastel curtain lights across 3 × 1 metre drop coverage, casting soft celebratory radiance for celebration walls and backdrops.',
    primaryImage: {
      id: 'macaron-curtain-main',
      label: 'Shiny Macaron Multi-Colour Pastel Curtain',
      image: '/images/diwali/diwali-macaron-curtain-gn39.png',
      alt: 'Pearl Lighting 180L Shiny Macaron Curtain Lights GN-39',
    },
    additionalImages: [],
  },
  {
    id: 'golden-star-string-lights',
    name: 'Golden Star String Lights',
    category: 'diwali',
    modelNumber: 'GN-42',
    description: '40 luminous warm golden star-shaped light nodes along a 5-metre shining metallic garland, casting an intimate celebratory radiance and floor reflections for festive living rooms, mandirs, and celebration corridors.',
    primaryImage: {
      id: 'golden-star-string-main',
      label: '40L Golden Star Shining Garland (5m)',
      image: '/images/diwali/diwali-golden-star-string-lights.webp',
      alt: 'Pearl Lighting 40L Golden Star String Lights GN-42',
    },
    additionalImages: [],
  },
]

/**
 * Returns all real images for a Diwali product as a flattened array
 */
export function getAllDiwaliProductImages(product) {
  if (!product) return []
  if (product.primaryImage) {
    return [product.primaryImage, ...(product.additionalImages || [])]
  }
  return []
}
