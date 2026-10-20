/**
 * Pearl Lighting - Centralized Product Data Architecture
 * Single source of truth for all architectural and festive lighting collections.
 * Only verified project data and actual assets are included. No invented specifications or prices.
 */

// Verified Studio Contact Information
export const STUDIO_INFO = {
  brandName: 'Pearl Lighting',
  parentCompany: 'Parth Enterprises',
  tagline: 'Light Is My Life, Pearl Is My Light.',
  phone: '+91 83290 45712',
  whatsappNumber: '918329045712',
  email: 'pearlleddriver@gmail.com',
  instagram: '@pearl_llighting',
  instagramUrl: 'https://www.instagram.com/pearl_llighting/',
  address: {
    line1: '42/44 Navjeevan Wadi, Ground Floor, Room No. 1',
    line2: '4th Marin Street, Dhobi Talao, Kalbadevi',
    city: 'Mumbai',
    pincode: '400002',
    state: 'Maharashtra',
    country: 'India'
  }
}

/**
 * Constructs a verified product-specific WhatsApp inquiry link
 */
export function getWhatsAppEnquiryUrl(productName, variantLabel = '') {
  const itemDesc = variantLabel ? `${productName} (${variantLabel})` : productName
  const message = `Hi Pearl Lighting Studio, I would like to inquire about ${itemDesc}. Please share available details, catalogue, and quotation.`
  return `https://wa.me/${STUDIO_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/* ==========================================================================
   COLLECTION 1: REGULAR ARCHITECTURAL & STUDIO LIGHTING (7 Products)
   ========================================================================== */
export const architecturalProducts = [
  {
    id: 'slim-panel',
    number: '01',
    name: 'Slim Panel Light',
    subtitle: 'Architectural Panel Series',
    category: 'Architectural Panel',
    badge: '01 / FLUSH MOUNT',
    description: 'Clean, low-profile illumination designed for modern interiors. Ultra-slim profile with soft diffused glow.',
    primaryImage: {
      id: 'slim-panel-round',
      label: 'Round Ambient Disc',
      image: '/images/products/slim-panel-round.png',
      alt: 'Round Slim Panel Light'
    },
    variants: [
      {
        id: 'round-ambient',
        label: 'Round Ambient Disc',
        image: '/images/products/slim-panel-round.png',
        alt: 'Round Slim Panel Light',
        note: 'Circular flush profile'
      },
      {
        id: 'square-flush',
        label: 'Square Flush Profile',
        image: '/images/products/slim-panel-square.png',
        alt: 'Square Slim Panel Light',
        note: 'Square flush-mount profile'
      }
    ],
    verifiedDetails: [
      { label: 'Profile', value: 'Ultra-slim low-profile architectural design' },
      { label: 'Mounting', value: 'Flush ceiling mount' },
      { label: 'Light Quality', value: 'Soft diffused glare-free ambient spread' },
      { label: 'Application', value: 'Residential, office, and hospitality corridors' }
    ]
  },
  {
    id: 'surface-panel',
    number: '02',
    name: 'Surface Panel Light',
    subtitle: 'Surface Architectural Series',
    category: 'Surface Architecture',
    badge: '02 / SURFACE MOUNT',
    description: 'Clean, surface-mounted illumination designed for modern interiors. Minimalist cylindrical profile with direct surface installation.',
    primaryImage: {
      id: 'surface-duo',
      label: 'Architectural Series Overview',
      image: '/images/products/surface-panel-duo.png',
      alt: 'Surface Panel Light Architectural Series Overview'
    },
    variants: [
      {
        id: 'surface-duo',
        label: 'Series Overview',
        image: '/images/products/surface-panel-duo.png',
        alt: 'Surface Panel Light Architectural Series Overview',
        note: 'Duo series overview'
      },
      {
        id: 'surface-white',
        label: 'White Perspective Profile',
        image: '/images/products/surface-panel-round-white.png',
        alt: 'Surface Panel Light White Perspective Profile',
        note: 'Circular white finish'
      },
      {
        id: 'surface-black',
        label: 'Black Profile Perspective',
        image: '/images/products/surface-panel-round-black.png',
        alt: 'Surface Panel Light Black Profile Perspective',
        note: 'Circular black finish'
      }
    ],
    verifiedDetails: [
      { label: 'Profile', value: 'Minimalist surface-mounted cylinder' },
      { label: 'Installation', value: 'Direct surface mount (no false ceiling required)' },
      { label: 'Finishes', value: 'Matte White & Studio Black' },
      { label: 'Optics', value: 'Uniform downward diffused illumination' }
    ]
  },
  {
    id: 'deep-downlight',
    number: '03',
    name: 'Deep Down Light',
    subtitle: 'Architectural Recessed Series',
    category: 'Recessed Downlight',
    badge: '03 / ANTI-GLARE',
    description: 'Precision recessed lighting designed for clean, focused illumination. Anti-glare deep recess with architectural beam control.',
    primaryImage: {
      id: 'deep-downlight-duo',
      label: 'Round & Square Series Presentation',
      image: '/images/products/deep-downlight-duo.png',
      alt: 'Round and square Deep Down Light variant presentation'
    },
    variants: [
      {
        id: 'deep-duo',
        label: 'Series Presentation',
        image: '/images/products/deep-downlight-duo.png',
        alt: 'Round and square Deep Down Light variant presentation',
        note: 'Round & Square duo presentation'
      },
      {
        id: 'deep-black',
        label: 'Round Studio Black',
        image: '/images/products/deep-downlight-round-black-studio.png',
        alt: 'Round black Deep Down Light studio view',
        note: 'Matte studio black circular profile'
      },
      {
        id: 'deep-white',
        label: 'Round White Finish',
        image: '/images/products/deep-downlight-round-white.png',
        alt: 'Round white Deep Down Light',
        note: 'Architectural white circular profile'
      },
      {
        id: 'deep-square',
        label: 'Square Luminaire',
        image: '/images/products/deep-downlight-square-white.png',
        alt: 'Square Deep Down Light',
        note: 'Architectural white square profile'
      }
    ],
    verifiedDetails: [
      { label: 'Design', value: 'Anti-glare deep recessed baffle' },
      { label: 'Optics', value: 'Focused architectural beam angle' },
      { label: 'Housing Formats', value: 'Circular and Square options' },
      { label: 'Visual Comfort', value: 'High cut-off angle for low glare' }
    ]
  },
  {
    id: 'curve-cob',
    number: '04',
    name: 'Curve COB',
    subtitle: 'Focused Recessed Series',
    category: 'Curved Recessed Spotlight',
    badge: '04 / CURVED BAFFLE',
    has3DSlider: true,
    description: 'Focused architectural illumination designed for modern interiors. Sculptural curved housing that transitions organically into the ceiling.',
    primaryImage: {
      id: 'curve-cob-duo',
      label: 'Architectural Finish Duo',
      image: '/images/products/curve-cob-duo.png',
      alt: 'Curve Cob Architectural Finish Duo'
    },
    variants: [
      {
        id: 'curve-duo',
        label: 'Architectural Finish Duo',
        image: '/images/products/curve-cob-duo.png',
        alt: 'Curve Cob Architectural Finish Duo',
        note: 'Dual finish showcase'
      },
      {
        id: 'curve-rose-gold',
        label: 'Reflector & Heatsink Profile',
        image: '/images/products/curve-cob-rose-gold.png',
        alt: 'Curve Cob Reflector & Heatsink Profile',
        note: 'Rose gold reflector & rear heatsink profile'
      },
      {
        id: 'curve-white',
        label: 'Curved Baffle Perspective',
        image: '/images/products/curve-cob-white-recessed.png',
        alt: 'Curve Cob Curved Baffle Perspective',
        note: 'Seamless white curved baffle'
      }
    ],
    verifiedDetails: [
      { label: 'Housing', value: 'Sculptural organic curved baffle' },
      { label: 'Emitter', value: 'High-efficiency COB focused source' },
      { label: 'Finishes', value: 'Rose Gold and White options' },
      { label: 'Thermal', value: 'Integrated rear heatsink architecture' }
    ]
  },
  {
    id: 'moveable-cob',
    number: '05',
    name: 'Moveable COB',
    subtitle: 'Adjustable Gimbal Series',
    category: 'Directional Gimbal Spotlight',
    badge: '05 / 360° GIMBAL',
    has3DSlider: true,
    description: 'Adjustable lighting designed to direct illumination where it matters. Precision directional spotlight with multi-axis gimbal tilt.',
    primaryImage: {
      id: 'moveable-cob-duo',
      label: 'Dual Gimbal Angle Overview',
      image: '/images/products/moveable-cob-duo.png',
      alt: 'Moveable COB Dual Gimbal Angle Overview'
    },
    variants: [
      {
        id: 'moveable-duo',
        label: 'Dual Gimbal Overview',
        image: '/images/products/moveable-cob-duo.png',
        alt: 'Moveable COB Dual Gimbal Angle Overview',
        note: 'Dual module orientation'
      },
      {
        id: 'moveable-detail',
        label: 'Reflector & Tilt Detail',
        image: '/images/products/moveable-cob-detail.png',
        alt: 'Moveable COB Reflector & Tilt Mechanism Detail',
        note: 'Precision tilt mechanism and faceted reflector'
      }
    ],
    verifiedDetails: [
      { label: 'Articulation', value: 'Multi-axis gimbal tilt & rotation' },
      { label: 'Optics', value: 'Precision faceted reflector' },
      { label: 'Targeting', value: 'Ideal for art, textured walls, and spatial accents' },
      { label: 'Form Factor', value: 'Single and dual module arrangements' }
    ]
  },
  {
    id: 'led-flood-light',
    number: '06',
    name: 'LED Flood Light',
    subtitle: 'Architectural Outdoor Series',
    category: 'Outdoor Flood Luminaire',
    badge: '06 / EXTERIOR WASH',
    description: 'Powerful outdoor illumination designed for broad and focused coverage. Architectural exterior and facade wash.',
    primaryImage: {
      id: 'flood-light-duo',
      label: 'Heatsink Architecture & Reflector Array',
      image: '/images/products/led-flood-light-duo.png',
      alt: 'LED Flood Light Heatsink Architecture and Reflector Array'
    },
    variants: [
      {
        id: 'flood-duo',
        label: 'Heatsink & Reflector Array',
        image: '/images/products/led-flood-light-duo.png',
        alt: 'LED Flood Light Heatsink Architecture and Reflector Array',
        note: 'Multi-finned heatsink and reflector array'
      },
      {
        id: 'flood-angle',
        label: 'Adjustable Mounting Perspective',
        image: '/images/products/led-flood-light-angle.png',
        alt: 'LED Flood Light with Adjustable Mounting Bracket',
        note: 'Adjustable locking mounting bracket'
      }
    ],
    verifiedDetails: [
      { label: 'Housing', value: 'Heavy die-cast thermal heatsink' },
      { label: 'Mounting', value: 'Adjustable angular locking bracket' },
      { label: 'Environment', value: 'Exterior facades, landscapes, and architectural surfaces' },
      { label: 'Optical Array', value: 'Multi-LED array with protective front shield' }
    ]
  },
  {
    id: 'rope-light',
    number: '07',
    name: 'Rope Light',
    subtitle: 'Continuous Flexible Illumination',
    category: 'Flexible Ambient Contour',
    badge: '07 / CONTINUOUS GLOW',
    hasGallerySlider: true,
    description: 'Flexible lighting designed to add continuous illumination and atmosphere across a range of spaces. Smooth, dot-free contouring.',
    primaryImage: {
      id: 'rope-light-warm-glow',
      label: 'Warm Architectural Glow Reel & Loops',
      image: '/images/products/rope-light-primary-warm.png',
      alt: 'Pearl Lighting Rope Light Architectural Illumination'
    },
    variants: [
      {
        id: 'warm-neon-reel',
        label: 'Warm White Reel',
        image: '/images/products/rope-light-primary-warm.png',
        alt: 'Warm White Architectural Rope Light Reel & Loops',
        note: 'Continuous 3000K warm ambient run'
      },
      {
        id: 'warm-spool',
        label: 'Warm Yellow Spool',
        image: '/images/products/rope-light-warm-spool.png',
        alt: 'Warm Yellow LED Rope Light 50m Spool',
        note: 'High-density commercial spool'
      },
      {
        id: 'pure-white-coil',
        label: 'Pure White Coil',
        image: '/images/products/rope-light-white-coil.png',
        alt: 'Pure White Contour Rope Light Coil with Adapter',
        note: 'Crisp 6000K architectural outline'
      },
      {
        id: 'blue-neon-reel',
        label: 'Sapphire Blue Reel',
        image: '/images/products/rope-light-blue-reel.png',
        alt: 'Sapphire Blue Rope Light Reel & Loops',
        note: 'Vibrant blue architectural accent'
      },
      {
        id: 'blue-spiral-coil',
        label: 'Royal Blue Coil',
        image: '/images/products/rope-light-blue-coil.png',
        alt: 'Royal Blue Spiral Rope Light Flat Coil',
        note: 'Flexible planar contour run'
      },
      {
        id: 'green-spool',
        label: 'Emerald Green Spool',
        image: '/images/products/rope-light-green-spool.png',
        alt: 'Emerald Green LED Rope Light Commercial Spool',
        note: 'High-impact exterior & landscape wash'
      }
    ],
    gallery: [
      {
        id: 'r1',
        title: 'Warm Architectural Reel',
        image: '/images/products/rope-light-primary-warm.png',
        alt: 'Warm Architectural Glow Reel & Loops',
        caption: 'Cove & Ceiling Contour Ambiance'
      },
      {
        id: 'r2',
        title: 'Warm Yellow Spool',
        image: '/images/products/rope-light-warm-spool.png',
        alt: 'Warm Yellow LED Rope Light Spool',
        caption: 'Commercial 50m Continuous Run Spool'
      },
      {
        id: 'r3',
        title: 'Pure White Contour Coil',
        image: '/images/products/rope-light-white-coil.png',
        alt: 'Pure White LED Rope Light Coil with Power Adapter',
        caption: 'Clean Razor-Sharp Perimeter Contouring'
      },
      {
        id: 'r4',
        title: 'Sapphire Blue Reel',
        image: '/images/products/rope-light-blue-reel.png',
        alt: 'Sapphire Blue Neon Rope Light Reel and Front Loops',
        caption: 'Luminous Saturated Blue Ambiance'
      },
      {
        id: 'r5',
        title: 'Royal Blue Flat Coil',
        image: '/images/products/rope-light-blue-coil.png',
        alt: 'Royal Blue Flexible Contour Flat Coil',
        caption: 'Flexible Low-Profile Planar Installation'
      },
      {
        id: 'r6',
        title: 'Emerald Green Spool',
        image: '/images/products/rope-light-green-spool.png',
        alt: 'Emerald Green Commercial LED Rope Spool',
        caption: 'High-Impact Exterior & Landscape Wash'
      }
    ],
    verifiedDetails: [
      { label: 'Form', value: 'Continuous flexible silicone extrusion' },
      { label: 'Light Distribution', value: 'Uniform dot-free ambient glow' },
      { label: 'Flexibility', value: 'Bends easily along architectural coves, steps, and edges' },
      { label: 'Color Options', value: 'Warm Yellow, Pure White, Vibrant Blue, and Emerald' }
    ]
  }
]

/* ==========================================================================
/* ==========================================================================
   COLLECTION 2: DIWALI & FESTIVE LIGHTING (All 14 Authentic Products)
   ========================================================================== */
export const festiveProducts = [
  {
    id: 'hanging-star-curtain',
    number: '01',
    modelNumber: 'GN-6',
    modelLabel: '10L / HANGING STAR WW',
    name: 'Hanging Star Curtain Lights',
    subtitle: 'Cascading Warm Golden Star Curtain Cascade',
    category: 'Cascading Suspension',
    badge: 'GN-6 / CASCADING STARS',
    gridSpan: 'as-span-6',
    description: 'Cascading warm golden star curtain lights with alternating drop heights for celebratory balconies, glass facades, and double-height living spaces.',
    image: '/images/diwali/diwali-hanging-star-curtain.png',
    alt: 'Pearl Lighting Hanging Star Curtain Lights Model GN-6',
    verifiedDetails: [
      { label: 'Model Number', value: 'GN-6 (Verified)' },
      { label: 'Format', value: 'Vertical cascading star curtain with alternating drop tiers' },
      { label: 'Motif', value: 'Multi-point warm golden star silhouettes' },
      { label: 'Glow Character', value: '2400K ultra-warm celebratory radiance' },
      { label: 'Recommended Placement', value: 'Balconies, large glass windows, and grand entryways' }
    ]
  },
  {
    id: 'hanging-diya-curtain',
    number: '02',
    name: 'Hanging Diya Curtain Lights',
    subtitle: 'Traditional Brass Silhouette Diya Curtain',
    category: 'Auspicious Motif',
    badge: '02 / SACRED DIYA CURTAIN',
    gridSpan: 'as-span-6',
    description: 'Suspended traditional diya silhouette curtain lights casting warm celebratory illumination across drapery, entrances, and puja mandirs.',
    image: '/images/diwali/diwali-hanging-diya-curtain.png',
    alt: 'Pearl Lighting Hanging Diya Curtain Lights',
    verifiedDetails: [
      { label: 'Format', value: 'Suspended cascading diya motif curtain' },
      { label: 'Motif', value: 'Traditional auspicious diya silhouette' },
      { label: 'Glow Character', value: 'Golden celebratory luminescence with connectable ends' },
      { label: 'Recommended Placement', value: 'Puja rooms, entrance portals, and festival drapery' }
    ]
  },
  {
    id: 'multicolour-diya-garland',
    number: '03',
    name: 'Multi-Colour Diya Garland Lights',
    subtitle: 'Festive Wall Garland Strings in Jewel Tones',
    category: 'Festive Wall Garland',
    badge: '03 / JEWEL DIYA GARLAND',
    gridSpan: 'as-span-4',
    description: 'Festive wall garland strings featuring vibrant illuminated diya silhouettes in jewel tones for mandirs, living rooms, and festive focal walls.',
    image: '/images/diwali/diwali-multicolour-diya-garland.png',
    alt: 'Pearl Lighting Multi-Colour Diya Garland Lights',
    verifiedDetails: [
      { label: 'Format', value: 'Horizontal wall & archway garland string' },
      { label: 'Color Spectrum', value: 'Emerald, Ruby, Amber, and Sapphire jewel-tone diodes' },
      { label: 'Installation', value: 'Lightweight hanging clips for floral backdrops & walls' },
      { label: 'Recommended Placement', value: 'Mandir focal walls, living rooms, and festival archways' }
    ]
  },
  {
    id: 'golden-cluster-fairy-string',
    number: '04',
    name: 'Golden Cluster Fairy Lights',
    subtitle: 'High-Density Cluster Bokeh Radiance',
    category: 'Ambient Bokeh',
    badge: '04 / GOLDEN BOKEH CLUSTER',
    gridSpan: 'as-span-4',
    description: 'Suspended warm golden cluster fairy lights casting an ambient bokeh glow for celebrations, dining salons, and intimate festival gatherings.',
    image: '/images/diwali/diwali-golden-cluster-lights.png',
    alt: 'Pearl Lighting Golden Cluster Fairy Lights',
    additionalImages: [
      {
        id: 'golden-lifestyle',
        image: '/images/diwali/diwali-golden-bokeh-lifestyle.png',
        label: 'Golden Bokeh Lifestyle Ambiance'
      }
    ],
    verifiedDetails: [
      { label: 'Format', value: 'High-density branch cluster wire string' },
      { label: 'Optical Effect', value: 'Dreamy spherical bokeh depth for photography & ambiance' },
      { label: 'Color Tone', value: 'Deep rich 2200K golden amber luster' },
      { label: 'Recommended Placement', value: 'Celebration dining, living corners, and photo backdrops' }
    ]
  },
  {
    id: 'crystal-bubble-string',
    number: '05',
    name: 'Crystal Bubble String Lights',
    subtitle: 'Solid Crystal Spheres with Internal Refraction',
    category: 'Optical Crystal',
    badge: '05 / CRYSTAL BUBBLE ORBS',
    gridSpan: 'as-span-4',
    description: 'Sparkling crystal bubble ball fairy lights with ambient crackle reflections for tablescapes, banisters, and suspended decor drops.',
    image: '/images/diwali/diwali-crystal-bubble-lights.png',
    alt: 'Pearl Lighting Crystal Bubble String Lights',
    verifiedDetails: [
      { label: 'Capsule', value: 'Solid crystal spheres with internal micro-bubble crackle' },
      { label: 'Wire Gauge', value: 'Heavy-gauge transparent copper core with durable insulation' },
      { label: 'Light Refraction', value: '360° omnidirectional sparkle scattering' },
      { label: 'Recommended Placement', value: 'Dining tablescapes, banister rails, and centerpiece wraps' }
    ]
  },
  {
    id: 'frosted-globe-string',
    number: '06',
    name: 'Frosted Globe String Lights',
    subtitle: 'Evenly Diffused Frosted Berry Luminaire Nodes',
    category: 'Diffused Berry',
    badge: '06 / FROSTED GLOBES',
    gridSpan: 'as-span-4',
    description: 'Evenly diffused frosted berry fairy string lights for architectural railings, mandirs, and celebratory courtyard archways.',
    image: '/images/diwali/diwali-frosted-globe-lights.png',
    alt: 'Pearl Lighting Frosted Globe String Lights',
    verifiedDetails: [
      { label: 'Node Design', value: 'Smooth matte frosted spherical globes' },
      { label: 'Light Quality', value: 'Soft glare-free uniform diffusion' },
      { label: 'Weather Resistance', value: 'Indoor & protected patio weather-coated wire' },
      { label: 'Recommended Placement', value: 'Terrace balustrades, floral mandapams, and entryway trees' }
    ]
  },
  {
    id: 'royal-blue-pixel-string',
    number: '07',
    name: 'Royal Blue Pixel String Lights',
    subtitle: 'High-Density Nocturne Indigo Micro-LED Coil',
    category: 'Nocturne Radiance',
    badge: '07 / ROYAL SAPPHIRE',
    gridSpan: 'as-span-4',
    description: 'High-density micro-LED pixel string lights in deep royal blue radiance, creating an enchanting festive evening ambience.',
    image: '/images/diwali/diwali-blue-pixel-string.png',
    alt: 'Pearl Lighting Royal Blue Pixel String Lights',
    verifiedDetails: [
      { label: 'Color Quality', value: 'Deep 460nm royal sapphire blue luminance' },
      { label: 'Wire Format', value: 'Ultra-flexible continuous diode spool' },
      { label: 'Effect', value: 'Intense atmospheric night glow with minimal power draw' },
      { label: 'Recommended Placement', value: 'Exterior facade lines, poolside gardens, and festive trees' }
    ]
  },
  {
    id: 'rainbow-rice-pixel-string',
    number: '08',
    name: 'Rainbow Rice Pixel String Lights',
    subtitle: 'Dual-Aspect Moldable Rice Pixel Garland',
    category: 'Rice Pixel',
    badge: '08 / RAINBOW SPARKLE',
    gridSpan: 'as-span-4',
    description: 'Dual-aspect decorative rice pixel string lights with clean white cabling and multi-colour jewel-tone diodes for intricate styling.',
    image: '/images/diwali/diwali-rice-pixel-bundle.png',
    alt: 'Pearl Lighting Rainbow Rice Pixel String Lights',
    verifiedDetails: [
      { label: 'Diode Form', value: 'Micro rice-grain point emitters' },
      { label: 'Wire Aesthetic', value: 'Discreet white heavy-duty strand blending into decor' },
      { label: 'Flexibility', value: 'Easily forms crisp contours around frames and pillars' },
      { label: 'Recommended Placement', value: 'Window mullions, mandir lattices, and floral wreaths' }
    ]
  },
  {
    id: 'festive-string-light-sets',
    number: '09',
    name: 'Multi-Colour Festive String Lights',
    subtitle: 'Commercial Celebration Reels in Curated Jewel Tones',
    category: 'Celebration Reels',
    badge: '09 / MULTI-SPOOL SETS',
    gridSpan: 'as-span-6',
    description: 'Vibrant celebratory string light rolls in warm gold, red, green, blue, amber, and pink hues for expansive courtyard and facade illumination.',
    image: '/images/diwali/diwali-festive-string-set.png',
    alt: 'Pearl Lighting Multi-Colour Festive String Lights',
    additionalImages: [
      {
        id: 'spool-sets-display',
        image: '/images/diwali/diwali-multicolour-spool-sets.png',
        label: 'Illuminated Multi-Colour Spool Display'
      }
    ],
    verifiedDetails: [
      { label: 'Format', value: 'Continuous multi-reel festival packaging' },
      { label: 'Color Mix', value: 'Ruby, Gold, Amber, Emerald, and Violet diodes' },
      { label: 'Coverage', value: 'High linear coverage for expansive villa gardens & facades' },
      { label: 'Recommended Placement', value: 'Courtyard trees, perimeter fencing, and event facades' }
    ]
  },
  {
    id: 'led-twinkle-pixel-string',
    number: '10',
    name: 'Twinkle Pixel String Lights',
    subtitle: 'Interactive Multi-Pattern Micro-LED Radiance with Twinkle Modes',
    category: 'Organic Twinkle',
    badge: '10 / SHIMMER MODES',
    hasTwinkleToggle: true,
    gridSpan: 'as-span-6',
    description: 'Flexible high-density micro-LED pixel string lights with vibrant festive twinkle, shown coiled and illuminated in hand.',
    image: '/images/diwali/diwali-led-pixel-bundle.png',
    alt: 'Pearl Lighting Twinkle Pixel String Lights',
    additionalImages: [
      {
        id: 'pixel-illuminated-hand',
        image: '/images/diwali/diwali-led-pixel-lit.png',
        label: 'Illuminated Diode Twinkle in Hand'
      }
    ],
    verifiedDetails: [
      { label: 'Modes', value: 'Selectable Firefly Pulse, Ocean Wave, and Steady Candle glow' },
      { label: 'Diode Density', value: 'High-density micro-LED nodes along flexible dark wire' },
      { label: 'Handling', value: 'Cool-to-touch LEDs with durable commercial-grade insulation' },
      { label: 'Recommended Placement', value: 'Living room drapery, balcony railings, and celebration centerpieces' }
    ]
  },
  {
    id: 'black-wire-edison-bulbs',
    number: '11',
    modelNumber: 'GN-63',
    modelLabel: '10L-BLACK WIRE BULB-5MTR-WW',
    name: 'Black Wire Vintage Edison Bulbs',
    subtitle: '10L Warm White Vintage Filament String (5m)',
    category: 'Vintage Filament',
    badge: 'GN-63 / VINTAGE FILAMENT',
    gridSpan: 'as-span-4',
    description: '10 warm white vintage Edison filament bulbs strung along heavy-duty 5-metre black wire, casting a warm celebratory glow for balconies, dining terraces, and evening festivities.',
    image: '/images/diwali/diwali-black-wire-edison-bulbs.png',
    alt: 'Pearl Lighting 10L Black Wire Bulb String GN-63',
    verifiedDetails: [
      { label: 'Model Number', value: 'GN-63 (Verified)' },
      { label: 'Configuration', value: '10 Bulbs • 5 Metres Heavy Black Wire' },
      { label: 'Color Quality', value: 'Warm White (WW) Vintage Filament Radiance' },
      { label: 'Recommended Placement', value: 'Balconies, dining pergolas, and festive gatherings' }
    ]
  },
  {
    id: 'rope-wire-vintage-bulbs',
    number: '12',
    modelNumber: 'GN-67',
    modelLabel: '10L-ROPE WIRE BULB -5MTR-WW',
    name: 'Rope Wire Filament Bulbs',
    subtitle: '10L Warm White Bulbs on Natural Jute Rope (5m)',
    category: 'Artisanal Jute Rope',
    badge: 'GN-67 / JUTE ROPE GLOW',
    gridSpan: 'as-span-4',
    description: '10 warm white globe filament lamps hand-woven with natural 5-metre jute rope wire for artisanal celebratory styling across courtyards, terraces, and warm interiors.',
    image: '/images/diwali/diwali-rope-wire-bulbs.png',
    alt: 'Pearl Lighting 10L Rope Wire Bulb String GN-67',
    verifiedDetails: [
      { label: 'Model Number', value: 'GN-67 (Verified)' },
      { label: 'Configuration', value: '10 Bulbs • 5 Metres Natural Jute Rope Wire' },
      { label: 'Color Quality', value: 'Warm White (WW) Filament Glow' },
      { label: 'Recommended Placement', value: 'Terraces, wooden pergolas, and festive dining centerpieces' }
    ]
  },
  {
    id: 'shining-crystal-flower-mix',
    number: '13',
    modelNumber: 'GN-49',
    modelLabel: '10L-SHINNING CRISTAL FLOWER 4 DESIGN MIX',
    name: 'Shining Crystal Flower Lights',
    subtitle: '10L Golden Crystal Blossom Array in 4 Design Mix',
    category: 'Crystal Blossom',
    badge: 'GN-49 / CRYSTAL BLOSSOMS',
    gridSpan: 'as-span-4',
    description: '10 golden crystal floral blossoms across 4 distinct petal geometries with faceted crystal droplet centers, reflecting multidirectional celebratory sparkle.',
    image: '/images/diwali/diwali-crystal-flower-quad.webp',
    alt: 'Pearl Lighting 10L Shining Crystal Flower Lights GN-49',
    additionalImages: [
      {
        id: 'flower-design-1',
        label: 'Design 1: Gold Foil Blossom Cluster',
        image: '/images/diwali/diwali-crystal-flower-d1.webp',
        alt: 'Pearl Lighting Shining Crystal Flower Design 1'
      },
      {
        id: 'flower-design-2',
        label: 'Design 2: Faceted Crystal Droplet Blossom',
        image: '/images/diwali/diwali-crystal-flower-d2.webp',
        alt: 'Pearl Lighting Shining Crystal Flower Design 2'
      },
      {
        id: 'flower-design-3',
        label: 'Design 3: Teardrop Crystal Blossom',
        image: '/images/diwali/diwali-crystal-flower-d3.webp',
        alt: 'Pearl Lighting Shining Crystal Flower Design 3'
      },
      {
        id: 'flower-design-4',
        label: 'Design 4: Radiant Floral Spray',
        image: '/images/diwali/diwali-crystal-flower-d4.webp',
        alt: 'Pearl Lighting Shining Crystal Flower Design 4'
      }
    ],
    verifiedDetails: [
      { label: 'Model Number', value: 'GN-49 (Verified)' },
      { label: 'Configuration', value: '10 Flower Nodes • 4 Distinct Blossom Silhouettes' },
      { label: 'Optics', value: 'Gold Foil Petals with Faceted Crystal Droplet Centers' },
      { label: 'Recommended Placement', value: 'Puja mandirs, festive consoles, and tabletop centerpieces' }
    ]
  },
  {
    id: 'flower-curtain-lights-gn38',
    number: '14',
    modelNumber: 'GN-38',
    modelLabel: '60L-SMD NEW FLOWER CURTAIN 3 CLR MIX-WW',
    name: 'New Flower Curtain Lights',
    subtitle: '60L SMD Cascading Blossom Curtain in 3-Color Mix & Warm White',
    category: 'Cascading Suspension',
    badge: 'GN-38 / FLOWER CURTAIN',
    gridSpan: 'as-span-6',
    description: '60 luminous SMD LED floral blossoms suspended in cascading strands, casting warm celebratory radiance across festive drapery, entrance archways, and puja mandir backdrops.',
    image: '/images/diwali/diwali-flower-curtain-lights.png',
    alt: 'Pearl Lighting 60L SMD New Flower Curtain Lights GN-38',
    verifiedDetails: [
      { label: 'Model Number', value: 'GN-38 (Verified)' },
      { label: 'Configuration', value: '60L SMD LED Flower Petals • Cascading Curtain' },
      { label: 'Color Quality', value: '3-Color Mix & Warm White (WW)' },
      { label: 'Recommended Placement', value: 'Festive drapery, celebration backdrops, mandir entrances, and feature walls' }
    ]
  },
  {
    id: 'waterfall-multi-g319',
    number: '15',
    modelNumber: 'G319',
    modelLabel: '180L WATERFALL SINGLE LINE MULTI',
    name: 'Waterfall Single Line Multi Lights',
    subtitle: '180L Multi-Colour Waterfall Single Line Cascade',
    category: 'Cascading Suspension',
    badge: 'G319 / WATERFALL CASCADE',
    gridSpan: 'as-span-6',
    description: '180L multi-colour waterfall cascade lights in a single-line flow, creating a vibrant celebratory curtain of illumination for balconies, terraces, and festive backdrops.',
    image: '/images/diwali/diwali-waterfall-multi-g319.png',
    alt: 'Pearl Lighting 180L Waterfall Single Line Multi Lights G319',
    verifiedDetails: [
      { label: 'Model Number', value: 'G319 (Verified)' },
      { label: 'Configuration', value: '180L • Waterfall Single Line Multi' },
      { label: 'Color Quality', value: 'Multi-Colour (Ruby, Emerald, Sapphire, Gold)' },
      { label: 'Recommended Placement', value: 'Balcony railings, window drops, and celebration backdrops' }
    ]
  },
  {
    id: 'star-silhouette-rgb-g527',
    number: '16',
    modelNumber: 'G527',
    modelLabel: 'STAR-30CM RGB',
    name: 'Star Silhouette RGB Motif Light',
    subtitle: '30 cm Geometric Star Silhouette with Vibrant RGB LED Contours',
    category: 'Motif Silhouette',
    badge: 'G527 / RGB STAR MOTIF',
    gridSpan: 'as-span-4',
    description: '30 cm architectural five-point star silhouette luminaire featuring vibrant multi-colour RGB contour diodes for festive window portals, wall hangings, and celebratory focal points.',
    image: '/images/diwali/diwali-star-rgb-g527.png',
    alt: 'Pearl Lighting 30cm RGB Star Silhouette Light G527',
    verifiedDetails: [
      { label: 'Model Number', value: 'G527 (Verified)' },
      { label: 'Dimensions', value: '30 cm Star Diameter' },
      { label: 'Light Engine', value: 'Full-Spectrum RGB Integrated LED Contours' },
      { label: 'Recommended Placement', value: 'Entryway portals, window frames, and festive feature walls' }
    ]
  },
  {
    id: 'pixel-high-bright-ww-gn144',
    number: '17',
    modelNumber: 'GN-144',
    modelLabel: '88L-8MM PIXEL HIGH BRIGHT WW-24MTR',
    name: 'High-Bright Pixel Lights (Warm White)',
    subtitle: '88L 8mm High-Bright Warm White Diode String (24m)',
    category: 'Ambient Bokeh',
    badge: 'GN-144 / PIXEL STRING',
    gridSpan: 'as-span-4',
    description: '88L, 8 mm high-bright warm white pixel diodes along 24-metre yellow-weave cabling with compact controller, casting warm ambient illumination across dining consoles, railings, and festive corners.',
    image: '/images/diwali/diwali-pixel-ww-gn144.png',
    alt: 'Pearl Lighting 88L 8mm Pixel High Bright Warm White Lights GN-144',
    verifiedDetails: [
      { label: 'Model Number', value: 'GN-144 (Verified)' },
      { label: 'Configuration', value: '88L • 8 mm High-Bright Pixel Diodes • 24 Metres' },
      { label: 'Color Quality', value: 'Warm White (WW) High Lumens' },
      { label: 'Recommended Placement', value: 'Dining consoles, indoor staircases, and warm festive corners' }
    ]
  },
  {
    id: 'sudarshan-spiral-rgb-g523',
    number: '18',
    modelNumber: 'G523',
    modelLabel: 'SUDARSHAN-16 FUNCTION RGB',
    name: 'Sudarshan 16-Function RGB Light',
    subtitle: 'Dynamic Radial Spiral Wheel with 16 Interactive Animation Functions',
    category: 'Sacred Motif',
    badge: 'G523 / SUDARSHAN SPIRAL',
    gridSpan: 'as-span-4',
    description: 'Dynamic 16-function Sudarshan chakra spiral luminaire featuring curved radial LED light guides and celebratory animation sequences for auspicious festival displays and grand entrances.',
    image: '/images/diwali/diwali-sudarshan-g523.png',
    alt: 'Pearl Lighting Sudarshan 16-Function RGB Motif Light G523',
    verifiedDetails: [
      { label: 'Model Number', value: 'G523 (Verified)' },
      { label: 'Animation Modes', value: '16 Selectable Dynamic Chasing & Pulse Functions' },
      { label: 'Optical Form', value: 'Multi-Spoke Radial Spiral Wheel Light Guide' },
      { label: 'Color Spectrum', value: 'Vibrant Multi-Function RGB Diodes' },
      { label: 'Recommended Placement', value: 'Courtyard gateways, facade portals, and celebration centerpieces' }
    ]
  },
  {
    id: 'macaron-curtain-multi-gn39',
    number: '19',
    modelNumber: 'GN-39',
    modelLabel: '180L-SHINNY MACARON CURTAIN-MULTI-3*1MTR',
    name: 'Shiny Macaron Pastel Curtain Lights',
    subtitle: '180L Multi-Colour Pastel Curtain (3m × 1m)',
    category: 'Cascading Suspension',
    badge: 'GN-39 / MACARON CURTAIN',
    gridSpan: 'as-span-6',
    description: '180L shiny macaron multi-colour pastel curtain lights across 3 × 1 metre drop coverage, casting soft celebratory radiance for living salons, festive backdrops, and celebration walls.',
    image: '/images/diwali/diwali-macaron-curtain-gn39.png',
    alt: 'Pearl Lighting 180L Shiny Macaron Curtain Lights GN-39',
    verifiedDetails: [
      { label: 'Model Number', value: 'GN-39 (Verified)' },
      { label: 'Configuration', value: '180L • 3m Width × 1m Drop Coverage' },
      { label: 'Color Quality', value: 'Shiny Macaron Multi-Colour Pastel Palette' },
      { label: 'Recommended Placement', value: 'Living salon drapery, celebration photo backdrops, and feature walls' }
    ]
  },
  {
    id: 'golden-star-string-lights',
    number: '20',
    modelNumber: 'GN-42',
    modelLabel: '40L-GOLDEN SHINNING LADI-5MTR',
    name: 'Golden Star String Lights',
    subtitle: '40L Golden Star Shining Ladi (5m)',
    category: 'Star Garland',
    badge: 'GN-42 / GOLDEN STAR LADI',
    gridSpan: 'as-span-6',
    description: '40 luminous warm golden star-shaped light nodes along a 5-metre shining metallic garland, casting an intimate celebratory radiance and floor reflections for festive living rooms, mandirs, and celebration corridors.',
    image: '/images/diwali/diwali-golden-star-string-lights.webp',
    alt: 'Pearl Lighting 40L Golden Star String Lights GN-42',
    verifiedDetails: [
      { label: 'Model Number', value: 'GN-42 (Verified)' },
      { label: 'Configuration', value: '40 Lights • 5 Metres Shining Star Garland' },
      { label: 'Motif', value: 'Faceted Golden Star Silhouettes & Micro-LED Nodes' },
      { label: 'Color Quality', value: 'Warm Golden Ambiance (2400K)' },
      { label: 'Recommended Placement', value: 'Living room floors, festive corridors, puja mandirs, and celebration consoles' }
    ]
  }
]

// Backward compatibility export of productsData matching original schema
export const productsData = architecturalProducts.map(p => ({
  id: p.id,
  number: p.number,
  name: p.name.toUpperCase(),
  subtitle: p.subtitle,
  description: p.description,
  primaryImage: p.primaryImage,
  additionalImages: p.variants
    ? p.variants.slice(1).map(v => ({ id: v.id, label: v.label, image: v.image, alt: v.alt || v.label }))
    : [],
  gallery: p.gallery || []
}))

/**
 * Returns all real images for any product as a flattened array
 */
export function getAllProductImages(product) {
  if (!product) return []
  if (product.gallery && product.gallery.length > 0) {
    return product.gallery
  }
  if (product.variants && product.variants.length > 0) {
    return product.variants
  }
  const imgs = []
  if (product.primaryImage) imgs.push(product.primaryImage)
  if (product.image) imgs.push({ image: product.image, label: product.name })
  if (product.additionalImages) imgs.push(...product.additionalImages)
  return imgs
}

/**
 * Finds product by ID in either architectural or festive collection
 */
export function getProductById(id) {
  return (
    architecturalProducts.find(p => p.id === id) ||
    festiveProducts.find(p => p.id === id) ||
    null
  )
}
