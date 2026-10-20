import React, { useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { festiveProducts } from '../data/productsData'

/**
 * FestiveArchitecturalInstallation3D
 * 
 * Luminous Champagne-and-Amber Architectural Lighting Exhibition:
 * 1. Warm champagne and soft ivory architectural illumination.
 * 2. Subtle warm walnut accents for depth.
 * 3. Polished architectural champagne limestone floor with natural amber light reflections.
 * 4. Soft indirect lighting and realistic material response (zero black box or dark cave).
 * 5. 10 authentic products with true sRGB color reproduction and zero bleaching.
 * 6. Smooth camera glide with full reduced-motion support.
 */

// Curated 10-Product Salon Exhibition Coordinates
// Organic, gently staggered salon placement — avoids rigid symmetrical tunnels
const EXHIBITION_LAYOUT = [
  { x: -1.75, y: 0.12, z: -3.8,  rotY: 0.16 },   // 0: Hanging Star Fairy Curtain
  { x:  1.85, y: 0.05, z: -7.4,  rotY: -0.18 },  // 1: Hanging Diya Fairy Curtain
  { x: -1.90, y: 0.18, z: -11.0, rotY: 0.20 },   // 2: Golden Cluster Fairy String
  { x:  1.70, y: 0.08, z: -14.6, rotY: -0.15 },  // 3: Crystal Bubble Droplet String
  { x: -1.80, y: 0.14, z: -18.2, rotY: 0.18 },   // 4: Frosted Globe Berry String
  { x:  1.85, y: 0.10, z: -21.8, rotY: -0.19 },  // 5: Multicolour Diya Garland
  { x: -1.70, y: 0.06, z: -25.4, rotY: 0.15 },   // 6: Royal Blue Pixel LED String
  { x:  1.75, y: 0.15, z: -29.0, rotY: -0.17 },  // 7: Rainbow Rice Pixel String
  { x: -1.80, y: 0.12, z: -32.6, rotY: 0.18 },   // 8: Festive String Light Sets
  { x:  0.00, y: 0.10, z: -36.2, rotY: 0.00 }    // 9: Twinkle Pixel Smart Garland (Grand Centerpiece)
]

export default function FestiveArchitecturalInstallation3D({
  onOpenProduct,
  isGalleryActive,
  setIsGalleryActive,
  activeProductIndex = 0,
  setActiveProductIndex,
  activeCategory = 'all'
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [webGLFailed, setWebGLFailed] = useState(false)

  // Internal imperative state refs for smooth render loop
  const internalStateRef = useRef({
    galleryActive: isGalleryActive || false,
    activeIdx: activeProductIndex || 0,
    targetCamZ: 0,
    currentCamZ: 0,
    targetCamX: 0,
    currentCamX: 0,
    targetCamY: 0.16,
    currentCamY: 0.16,
    targetLookX: 0,
    currentLookX: 0,
    targetLookY: 0.10,
    currentLookY: 0.10,
    targetLookZ: -3.8,
    currentLookZ: -3.8,
    mouseTarget: { x: 0, y: 0 },
    mouseDamped: { x: 0, y: 0 },
    category: activeCategory || 'all'
  })

  // Synchronize incoming props to target camera vectors
  useEffect(() => {
    internalStateRef.current.galleryActive = !!isGalleryActive
    internalStateRef.current.activeIdx = activeProductIndex || 0
    internalStateRef.current.category = activeCategory || 'all'

    const idx = Math.max(0, Math.min(festiveProducts.length - 1, activeProductIndex || 0))
    const pos = EXHIBITION_LAYOUT[idx] || EXHIBITION_LAYOUT[0]

    const isMobileScreen = typeof window !== 'undefined' && window.innerWidth <= 768
    const targetDist = isMobileScreen ? 3.3 : 3.85

    // Camera frames the selected artwork front-and-center with natural viewing perspective
    internalStateRef.current.targetCamX = pos.x * 0.28
    internalStateRef.current.targetCamY = pos.y + 0.12
    internalStateRef.current.targetCamZ = pos.z + targetDist
    internalStateRef.current.targetLookX = pos.x * 0.65
    internalStateRef.current.targetLookY = pos.y + 0.05
    internalStateRef.current.targetLookZ = pos.z - 0.25
  }, [isGalleryActive, activeProductIndex, activeCategory])

  // Parallax & mouse tracking handler
  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    internalStateRef.current.mouseTarget = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y))
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    internalStateRef.current.mouseTarget = { x: 0, y: 0 }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    function isWebGLAvailable() {
      try {
        const test = document.createElement('canvas')
        return !!(window.WebGLRenderingContext && (test.getContext('webgl2') || test.getContext('webgl')))
      } catch {
        return false
      }
    }

    if (!isWebGLAvailable()) {
      setWebGLFailed(true)
      return
    }

    let renderer
    let composer
    let animId
    let isDisposed = false

    const isMobile = window.innerWidth <= 768
    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight

    // ──────────────────────────────────────────────────────────────────
    // 1. SCENE SETUP & LUMINOUS CHAMPAGNE ARCHITECTURAL INSTALLATION
    // Luminous, warm champagne & soft ivory atmosphere with realistic depth
    // ──────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#FAF5EE')

    // Soft champagne depth fog
    scene.fog = new THREE.FogExp2('#FAF5EE', 0.0075)

    // Shared high-performance texture loader
    const textureLoader = new THREE.TextureLoader()

    // Preload product textures immediately into memory
    festiveProducts.forEach((p) => {
      textureLoader.load(p.image, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.generateMipmaps = true
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.magFilter = THREE.LinearFilter
      })
    })

    // ──────────────────────────────────────────────────────────────────
    // 2. CAMERA INITIAL POSITION
    // ──────────────────────────────────────────────────────────────────
    const initialIdx = activeProductIndex || 0
    const initialPos = EXHIBITION_LAYOUT[initialIdx] || EXHIBITION_LAYOUT[0]
    const initialDist = isMobile ? 3.3 : 3.85

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 85)
    camera.position.set(initialPos.x * 0.28, initialPos.y + 0.12, initialPos.z + initialDist)
    camera.lookAt(initialPos.x * 0.65, initialPos.y + 0.05, initialPos.z - 0.25)

    internalStateRef.current.currentCamX = camera.position.x
    internalStateRef.current.currentCamY = camera.position.y
    internalStateRef.current.currentCamZ = camera.position.z
    internalStateRef.current.currentLookX = initialPos.x * 0.65
    internalStateRef.current.currentLookY = initialPos.y + 0.05
    internalStateRef.current.currentLookZ = initialPos.z - 0.25

    // ──────────────────────────────────────────────────────────────────
    // 3. HARDWARE-ACCELERATED RENDERER
    // ──────────────────────────────────────────────────────────────────
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.shadowMap.enabled = !isMobile
    renderer.shadowMap.type = THREE.PCFShadowMap

    // ──────────────────────────────────────────────────────────────────
    // 4. POST-PROCESSING (RESTRAINED BLOOM TO PREVENT COLOUR CASTS)
    // ──────────────────────────────────────────────────────────────────
    composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.05, // Restrained subtle bloom
      0.14, // Smooth optical radius
      0.96  // High threshold so authentic product photographs never get bleached
    )
    composer.addPass(bloomPass)

    // ──────────────────────────────────────────────────────────────────
    // 5. LUMINOUS LUXURY LIGHTING (WARM CHAMPAGNE, SOFT IVORY & AMBER GLOW)
    // ──────────────────────────────────────────────────────────────────
    // Ambient foundation: soft luminous warm ivory
    const ambientLight = new THREE.AmbientLight('#FFF8F0', 1.45)
    scene.add(ambientLight)

    // Soft warm directional key light
    const keyLight = new THREE.DirectionalLight('#FFE8CA', 1.30)
    keyLight.position.set(3.5, 9.5, 5.0)
    keyLight.castShadow = !isMobile
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024
      keyLight.shadow.mapSize.height = 1024
      keyLight.shadow.camera.near = 0.5
      keyLight.shadow.camera.far = 50
      keyLight.shadow.bias = -0.0004
    }
    scene.add(keyLight)

    // Hemisphere light: luminous ivory ceiling bounce & warm champagne floor bounce
    const hemiLight = new THREE.HemisphereLight('#FFFBF5', '#EFE4D6', 0.90)
    scene.add(hemiLight)

    // Atmospheric warm amber salon point lights (creates natural amber reflections on floor)
    const amberSalonLight = new THREE.PointLight('#E59B38', 1.8, 30, 1.2)
    amberSalonLight.position.set(0, 1.2, -18.0)
    scene.add(amberSalonLight)

    const champagneAccentLight = new THREE.PointLight('#F5D598', 1.3, 26, 1.2)
    champagneAccentLight.position.set(-2.5, 3.2, -8.0)
    scene.add(champagneAccentLight)

    // ──────────────────────────────────────────────────────────────────
    // 6. ARCHITECTURAL GALLERY MATERIALS (CHAMPAGNE, IVORY & WALNUT ACCENTS)
    // ──────────────────────────────────────────────────────────────────
    // Polished architectural champagne limestone floor with soft specular amber sheen
    const floorChampagneMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EADFCF'),
      roughness: 0.22,
      metalness: 0.14
    })

    // Luminous soft ivory architectural gallery walls
    const galleryWallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F6F1EA'),
      roughness: 0.68,
      metalness: 0.04
    })

    // Soft luminous ivory ceiling
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#FAF6F0'),
      roughness: 0.85,
      metalness: 0.02
    })

    // Subtle warm walnut architectural accents for depth & shadowlines
    const warmWalnutMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#5A3825'),
      roughness: 0.40,
      metalness: 0.35
    })

    // Champagne gold architectural accents & frames
    const champagneGoldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C99B45'),
      roughness: 0.24,
      metalness: 0.90
    })

    // Warm bronze structural suspension trim
    const warmBronzeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#785238'),
      roughness: 0.38,
      metalness: 0.65
    })

    // ──────────────────────────────────────────────────────────────────
    // 7. ARCHITECTURAL EXHIBITION ROOM GEOMETRY
    // Expansive, luminous salon with natural lighting gradients
    // ──────────────────────────────────────────────────────────────────
    const roomGroup = new THREE.Group()
    scene.add(roomGroup)

    // Polished champagne limestone floor
    const floorGeo = new THREE.PlaneGeometry(36, 68)
    const floorMesh = new THREE.Mesh(floorGeo, floorChampagneMat)
    floorMesh.rotation.x = -Math.PI / 2
    floorMesh.position.set(0, -2.2, -18)
    floorMesh.receiveShadow = !isMobile
    roomGroup.add(floorMesh)

    // Luminous ivory ceiling
    const ceilingGeo = new THREE.PlaneGeometry(36, 68)
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat)
    ceilingMesh.rotation.x = Math.PI / 2
    ceilingMesh.position.set(0, 4.8, -18)
    roomGroup.add(ceilingMesh)

    // Soft ivory gallery side walls
    const wallGeo = new THREE.PlaneGeometry(68, 7.2)
    const leftWall = new THREE.Mesh(wallGeo, galleryWallMat)
    leftWall.rotation.y = Math.PI / 2
    leftWall.position.set(-5.0, 1.4, -18)
    roomGroup.add(leftWall)

    const rightWall = new THREE.Mesh(wallGeo, galleryWallMat)
    rightWall.rotation.y = -Math.PI / 2
    rightWall.position.set(5.0, 1.4, -18)
    roomGroup.add(rightWall)

    // Rear wall with grand archway portal
    const backWallGeo = new THREE.PlaneGeometry(14, 7.2)
    const backWall = new THREE.Mesh(backWallGeo, galleryWallMat)
    backWall.position.set(0, 1.4, -41.0)
    roomGroup.add(backWall)

    // Sculpted champagne gold archway portal
    const archFrameGeo = new THREE.TorusGeometry(3.0, 0.06, 16, 64, Math.PI)
    const archFrame = new THREE.Mesh(archFrameGeo, champagneGoldMat)
    archFrame.position.set(0, 1.9, -40.8)
    roomGroup.add(archFrame)

    // ──────────────────────────────────────────────────────────────────
    // APPROVED ATMOSPHERIC VISTA: WARM AMBER WOVEN LIGHT SPHERES
    // Radiates rich golden amber festive radiance through the portal
    // ──────────────────────────────────────────────────────────────────
    const windowAtmosphereGeo = new THREE.PlaneGeometry(12.0, 8.0)
    const windowAtmosphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      toneMapped: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1
    })
    const windowAtmosphereMesh = new THREE.Mesh(windowAtmosphereGeo, windowAtmosphereMat)
    windowAtmosphereMesh.position.set(0, 1.8, -40.94)
    roomGroup.add(windowAtmosphereMesh)

    textureLoader.load(
      '/images/editorial/festive-amber-woven-spheres.png',
      (tex) => {
        if (isDisposed) return
        tex.colorSpace = THREE.SRGBColorSpace
        tex.generateMipmaps = true
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.magFilter = THREE.LinearFilter
        tex.needsUpdate = true
        windowAtmosphereMat.map = tex
        windowAtmosphereMat.needsUpdate = true
      }
    )

    // Warm amber portal illumination casting forward into the salon
    const windowAtmosphereLight = new THREE.PointLight('#EAA240', 2.6, 42, 1.1)
    windowAtmosphereLight.position.set(0, 1.8, -38.0)
    scene.add(windowAtmosphereLight)

    // Slender architectural piers in warm walnut with champagne collars (subtle depth accents)
    const pierGeo = new THREE.BoxGeometry(0.30, 7.0, 0.38)
    const pierCapGeo = new THREE.BoxGeometry(0.40, 0.14, 0.48)
    const pierZOffsets = [2.0, -22.0]

    pierZOffsets.forEach((pz) => {
      ;[-4.8, 4.8].forEach((px) => {
        const pierGroup = new THREE.Group()
        pierGroup.position.set(px, 1.3, pz)

        const pier = new THREE.Mesh(pierGeo, warmWalnutMat)
        pier.castShadow = !isMobile
        pier.receiveShadow = !isMobile
        pierGroup.add(pier)

        const capBottom = new THREE.Mesh(pierCapGeo, champagneGoldMat)
        capBottom.position.y = -3.4
        pierGroup.add(capBottom)

        const capTop = new THREE.Mesh(pierCapGeo, champagneGoldMat)
        capTop.position.y = 3.4
        pierGroup.add(capTop)

        roomGroup.add(pierGroup)
      })
    })

    // Warm walnut architectural baseboards
    ;[-4.96, 4.96].forEach((bx) => {
      const baseGeo = new THREE.BoxGeometry(0.04, 0.12, 68)
      const baseMesh = new THREE.Mesh(baseGeo, warmWalnutMat)
      baseMesh.position.set(bx, -2.14, -18)
      roomGroup.add(baseMesh)
    })

    // ──────────────────────────────────────────────────────────────────
    // 8. 10 AUTHENTIC SALON MASTERPIECE CANVASES
    // Preserves original festive photographs with true colors & aspect ratio
    // ──────────────────────────────────────────────────────────────────
    function createWarmArchitecturalPlaceholder(number, name) {
      const pCanvas = document.createElement('canvas')
      pCanvas.width = 512
      pCanvas.height = 640
      const pCtx = pCanvas.getContext('2d')

      // Luminous warm ivory architectural canvas matching room
      pCtx.fillStyle = '#FAF7F2'
      pCtx.fillRect(0, 0, 512, 640)

      // Subtle champagne gold inner double border
      pCtx.strokeStyle = 'rgba(201, 155, 69, 0.45)'
      pCtx.lineWidth = 2
      pCtx.strokeRect(18, 18, 476, 604)

      pCtx.strokeStyle = 'rgba(201, 155, 69, 0.20)'
      pCtx.lineWidth = 1
      pCtx.strokeRect(24, 24, 464, 592)

      // Atelier insignia & number
      pCtx.fillStyle = '#C99B45'
      pCtx.font = '700 13px "Plus Jakarta Sans", sans-serif'
      pCtx.textAlign = 'center'
      pCtx.fillText('PEARL LIGHTING · ATELIER', 256, 290)

      pCtx.fillStyle = '#1A1612'
      pCtx.font = 'italic 34px "Cormorant Garamond", Georgia, serif'
      pCtx.fillText(`Edition ${number}`, 256, 332)

      pCtx.fillStyle = '#5D5447'
      pCtx.font = '500 14px "Plus Jakarta Sans", sans-serif'
      const displayTitle = name.length > 28 ? name.substring(0, 26) + '…' : name
      pCtx.fillText(displayTitle, 256, 365)

      const pTexture = new THREE.CanvasTexture(pCanvas)
      pTexture.colorSpace = THREE.SRGBColorSpace
      pTexture.needsUpdate = true
      return pTexture
    }

    const productPlanesGroup = new THREE.Group()
    scene.add(productPlanesGroup)

    const productMeshCards = []

    festiveProducts.forEach((product, i) => {
      const cardGroup = new THREE.Group()
      const layout = EXHIBITION_LAYOUT[i] || EXHIBITION_LAYOUT[0]

      const cardX = layout.x
      const cardY = layout.y
      const cardZ = layout.z
      const tiltAngle = layout.rotY

      cardGroup.position.set(cardX, cardY, cardZ)
      cardGroup.rotation.y = tiltAngle

      // Luminous architectural placeholder to prevent black flashes
      const placeholderTexture = createWarmArchitecturalPlaceholder(product.number, product.name)

      // Material: MeshBasicMaterial with toneMapped: false
      // Preserves 100% natural color, saturation, and contrast without bleaching or dark tinting
      const photoMaterial = new THREE.MeshBasicMaterial({
        map: placeholderTexture,
        toneMapped: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      })

      // Load original image asset with true sRGB encoding
      textureLoader.load(
        product.image,
        (loadedTex) => {
          if (isDisposed) return
          loadedTex.colorSpace = THREE.SRGBColorSpace
          loadedTex.generateMipmaps = true
          loadedTex.minFilter = THREE.LinearMipmapLinearFilter
          loadedTex.magFilter = THREE.LinearFilter
          loadedTex.needsUpdate = true

          photoMaterial.map = loadedTex
          photoMaterial.needsUpdate = true
          placeholderTexture.dispose()
        },
        undefined,
        (err) => {
          console.warn(`[Pearl 3D] Failed to load ${product.image}`, err)
        }
      )

      // Refined champagne gold frame bezel
      const photoW = 1.62
      const photoH = 2.02
      const frameW = 1.66
      const frameH = 2.06
      const frameD = 0.024

      // Champagne gold minimalist floating frame
      const frameGeo = new THREE.BoxGeometry(frameW, frameH, frameD)
      const frameMesh = new THREE.Mesh(frameGeo, champagneGoldMat)
      frameMesh.castShadow = !isMobile
      frameMesh.receiveShadow = !isMobile
      cardGroup.add(frameMesh)

      // Subtle warm walnut backing border inside frame (creates crisp shadowline)
      const backingGeo = new THREE.PlaneGeometry(1.65, 2.05)
      const backingMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#4A2E1E'),
        roughness: 0.65,
        metalness: 0.15
      })
      const backingMesh = new THREE.Mesh(backingGeo, backingMat)
      backingMesh.position.z = frameD * 0.5 + 0.002
      cardGroup.add(backingMesh)

      // Original Photo Canvas with clean depth offset (zero z-fighting)
      const photoGeo = new THREE.PlaneGeometry(photoW, photoH)
      const photoMesh = new THREE.Mesh(photoGeo, photoMaterial)
      photoMesh.position.z = frameD * 0.5 + 0.005
      cardGroup.add(photoMesh)

      // Fine suspension mount with champagne collar
      const wireHeight = Math.max(0.5, 4.8 - (cardY + frameH * 0.5))
      const wireGeo = new THREE.CylinderGeometry(0.0025, 0.0025, wireHeight, 8)
      ;[-0.62, 0.62].forEach((wx) => {
        const wire = new THREE.Mesh(wireGeo, warmBronzeMat)
        wire.position.set(wx, frameH * 0.5 + wireHeight * 0.5, 0)
        cardGroup.add(wire)
      })

      productPlanesGroup.add(cardGroup)

      productMeshCards.push({
        index: i,
        product,
        group: cardGroup,
        mesh: photoMesh,
        frame: frameMesh,
        baseX: cardX,
        baseY: cardY,
        baseZ: cardZ,
        baseTilt: tiltAngle,
        isHovered: false
      })
    })

    // ──────────────────────────────────────────────────────────────────
    // 9. RAYCASTING & INTERACTION
    // ──────────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mouseNormalized = new THREE.Vector2(-999, -999)
    let hoveredCard = null

    const handleCanvasPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseNormalized.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseNormalized.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    const handleCanvasClick = (e) => {
      if (!hoveredCard) return
      e.stopPropagation()

      if (setActiveProductIndex) {
        setActiveProductIndex(hoveredCard.index)
      }
      if (!internalStateRef.current.galleryActive && setIsGalleryActive) {
        setIsGalleryActive(true)
      }
      if (onOpenProduct) {
        onOpenProduct(hoveredCard.product)
      }
    }

    canvas.addEventListener('pointermove', handleCanvasPointerMove, { passive: true })
    canvas.addEventListener('click', handleCanvasClick)

    // ──────────────────────────────────────────────────────────────────
    // 10. MAIN ANIMATION & SMOOTH RENDER LOOP
    // ──────────────────────────────────────────────────────────────────
    let lastTime = performance.now()
    let elapsedTime = 0

    const animate = () => {
      if (isDisposed) return
      animId = requestAnimationFrame(animate)

      const now = performance.now()
      const delta = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now
      elapsedTime += delta

      const state = internalStateRef.current

      // Cursor parallax dampening
      state.mouseDamped.x += (state.mouseTarget.x - state.mouseDamped.x) * 0.05
      state.mouseDamped.y += (state.mouseTarget.y - state.mouseDamped.y) * 0.05

      // Smooth camera interpolation along salon space
      const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const lerpSpeed = prefersReducedMotion ? 1.0 : 0.075

      state.currentCamZ += (state.targetCamZ - state.currentCamZ) * (prefersReducedMotion ? 1.0 : 0.070)
      state.currentCamX += (state.targetCamX - state.currentCamX) * lerpSpeed
      state.currentCamY += (state.targetCamY - state.currentCamY) * lerpSpeed

      state.currentLookX += (state.targetLookX - state.currentLookX) * lerpSpeed
      state.currentLookY += (state.targetLookY - state.currentLookY) * lerpSpeed
      state.currentLookZ += (state.targetLookZ - state.currentLookZ) * lerpSpeed

      const parallaxX = state.mouseDamped.x * 0.18
      const parallaxY = state.mouseDamped.y * 0.10

      camera.position.x = state.currentCamX + parallaxX
      camera.position.y = state.currentCamY - parallaxY
      camera.position.z = state.currentCamZ

      const lookTarget = new THREE.Vector3(
        state.currentLookX + parallaxX * 0.30,
        state.currentLookY - parallaxY * 0.30,
        state.currentLookZ
      )
      camera.lookAt(lookTarget)

      // Raycast against framed artworks
      raycaster.setFromCamera(mouseNormalized, camera)
      const meshesToTest = productMeshCards.map(c => c.mesh)
      const intersects = raycaster.intersectObjects(meshesToTest, false)

      let newHovered = null
      if (intersects.length > 0) {
        const hitMesh = intersects[0].object
        newHovered = productMeshCards.find(c => c.mesh === hitMesh) || null
      }
      hoveredCard = newHovered

      if (container) {
        container.style.cursor = hoveredCard ? 'pointer' : 'default'
      }

      // Update 3D Masterpiece Canvases (Focal hierarchy & natural suspension sway)
      productMeshCards.forEach((c) => {
        const isHovered = c === hoveredCard
        const distFromActive = Math.abs(c.index - state.activeIdx)

        // Gentle, understated physical suspension sway
        const floatOffset = Math.sin(elapsedTime * 1.0 + c.index * 0.65) * 0.015
        const floatZOffset = Math.cos(elapsedTime * 0.75 + c.index * 0.45) * 0.006
        c.group.position.y = c.baseY + floatOffset + (isHovered ? 0.025 : 0)
        c.group.position.z = c.baseZ + floatZOffset
        c.group.rotation.z = Math.sin(elapsedTime * 0.9 + c.index * 0.5) * 0.004

        // Focal hierarchy scaling:
        // Active item is the primary focal point; neighbors are subtly restrained
        let baseScale = 1.0
        if (distFromActive === 0) {
          baseScale = 1.04 // Main focal piece
        } else if (distFromActive === 1) {
          baseScale = 0.94 // Immediate neighbor
        } else {
          baseScale = 0.88 // Receding gallery depth
        }

        const targetScale = isHovered ? baseScale * 1.025 : baseScale
        c.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08)

        // Category filter
        const cat = state.category
        let match = true
        if (cat === 'warm') {
          match = [
            'hanging-star-curtain',
            'hanging-diya-curtain',
            'golden-cluster-fairy-string',
            'crystal-bubble-string',
            'frosted-globe-string'
          ].includes(c.product.id)
        } else if (cat === 'multicolour') {
          match = [
            'multicolour-diya-garland',
            'royal-blue-pixel-string',
            'rainbow-rice-pixel-string',
            'festive-string-light-sets',
            'led-twinkle-pixel-string'
          ].includes(c.product.id)
        }

        c.group.visible = match
      })

      // Render with post-processing
      composer.render()
    }

    animate()

    // ──────────────────────────────────────────────────────────────────
    // 11. RESPONSIVE RESIZE
    // ──────────────────────────────────────────────────────────────────
    const handleResize = () => {
      if (!container || isDisposed) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height, false)
      composer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    let resizeObserver = null
    if (typeof ResizeObserver !== 'undefined' && container) {
      resizeObserver = new ResizeObserver(() => {
        handleResize()
      })
      resizeObserver.observe(container)
    }

    // Cleanup on unmount
    return () => {
      isDisposed = true
      if (animId) cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      if (resizeObserver) resizeObserver.disconnect()
      canvas.removeEventListener('pointermove', handleCanvasPointerMove)
      canvas.removeEventListener('click', handleCanvasClick)

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
          else obj.material.dispose()
        }
      })

      renderer.dispose()
    }
  }, [handlePointerMove, onOpenProduct, setActiveProductIndex, setIsGalleryActive])

  if (webGLFailed) {
    return (
      <div className="as-webgl-fallback-container">
        <p>Your browser is operating in restricted WebGL mode. Please enable hardware acceleration.</p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="as-festive-3d-scene-container"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas ref={canvasRef} className="as-festive-3d-webgl-canvas" />
    </div>
  )
}
