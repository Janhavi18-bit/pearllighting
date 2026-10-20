import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

/**
 * CollectionProductCanvas - Lightweight procedural 3D viewer for collection catalogue
 * Features:
 * - IntersectionObserver to pause rendering when offscreen
 * - Low DPR and lightweight standard geometries for top performance
 * - Smooth hover rotation and light reaction
 * - Complete dark luxury CSS fallback on WebGL loss
 */
export default function CollectionProductCanvas({ productId, isHovered }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [webGLFailed, setWebGLFailed] = useState(false)
  const isHoveredRef = useRef(isHovered)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  // Track mouse coordinates over the container for gentle tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    mouseRef.current = { x, y }
  }

  const handleMouseLeave = () => {
    mouseRef.current = { x: 0, y: 0 }
  }

  useEffect(() => {
    // 1. Safe WebGL check
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

    if (!canvasRef.current || !containerRef.current) return

    let renderer
    let animId
    let isDisposed = false
    let isVisible = false

    const canvas = canvasRef.current
    const container = containerRef.current

    // WebGL Context Lost handler
    const handleContextLost = (e) => {
      e.preventDefault()
      console.warn(`WebGL context lost for product ${productId}. Switching to CSS fallback.`)
      if (animId) cancelAnimationFrame(animId)
      setWebGLFailed(true)
    }
    canvas.addEventListener('webglcontextlost', handleContextLost, false)

    const isMobile = window.innerWidth <= 768
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    try {
      // 2. Scene
      const scene = new THREE.Scene()

      // 3. Camera
      const w = Math.max(container.clientWidth || 600, 240)
      const h = Math.max(container.clientHeight || 450, 240)
      const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 40)
      const camZ = isMobile ? 3.6 : 3.1
      camera.position.set(0, 0.05, camZ)
      camera.lookAt(0, 0, 0)

      // 4. Renderer with low DPR
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
        precision: 'mediump',
      })
      renderer.setClearColor(0x000000, 0)
      renderer.setSize(w, h, false)
      renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05

      // 5. Materials
      const brassMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#cbbba3'),
        roughness: 0.28,
        metalness: 0.88,
      })

      const darkMetalMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#22252e'),
        roughness: 0.6,
        metalness: 0.75,
      })

      const cableMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5a5245'),
        roughness: 0.65,
        metalness: 0.6,
      })

      const pearlMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fdfcf9'),
        emissive: new THREE.Color('#ffdfba'),
        emissiveIntensity: 0.38,
        roughness: 0.28,
        metalness: 0.04,
      })

      // 6. Construct Product Group
      const productGroup = new THREE.Group()
      const disposables = [brassMat, darkMetalMat, cableMat, pearlMat]

      let pointLight
      let auxLight

      if (productId === 'pendant') {
        // PEARL PENDANT:
        // - spherical pearl diffuser
        // - thin suspension cable
        // - subtle champagne metal
        // - warm light
        const cableGeo = new THREE.CylinderGeometry(0.007, 0.007, 3.4, 12)
        const cable = new THREE.Mesh(cableGeo, cableMat)
        cable.position.y = 1.9
        productGroup.add(cable)
        disposables.push(cableGeo)

        const capGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.04, 24)
        const cap = new THREE.Mesh(capGeo, brassMat)
        cap.position.y = 0.44
        productGroup.add(cap)
        disposables.push(capGeo)

        const pearlGeo = new THREE.SphereGeometry(0.44, 36, 36)
        const pearl = new THREE.Mesh(pearlGeo, pearlMat)
        productGroup.add(pearl)
        disposables.push(pearlGeo)

        const ringGeo = new THREE.TorusGeometry(0.448, 0.012, 14, 48)
        const ring = new THREE.Mesh(ringGeo, brassMat)
        ring.rotation.x = Math.PI / 2
        productGroup.add(ring)
        disposables.push(ringGeo)

        const beadGeo = new THREE.SphereGeometry(0.024, 16, 16)
        const bead = new THREE.Mesh(beadGeo, brassMat)
        bead.position.y = -0.44
        productGroup.add(bead)
        disposables.push(beadGeo)

        pointLight = new THREE.PointLight('#ffe5cb', 1.7, 6, 2)
        pointLight.position.set(0, 0, 0)
        productGroup.add(pointLight)
      } else if (productId === 'chandelier') {
        // PEARL CHANDELIER:
        // - central suspension
        // - multiple elegant pearl light elements
        // - symmetrical architectural arrangement
        const stemGeo = new THREE.CylinderGeometry(0.008, 0.008, 2.4, 12)
        const stem = new THREE.Mesh(stemGeo, cableMat)
        stem.position.y = 1.4
        productGroup.add(stem)
        disposables.push(stemGeo)

        // Central hub
        const hubGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 24)
        const hub = new THREE.Mesh(hubGeo, brassMat)
        hub.position.y = 0.22
        productGroup.add(hub)
        disposables.push(hubGeo)

        // Central main sphere
        const centerPearlGeo = new THREE.SphereGeometry(0.3, 32, 32)
        const centerPearl = new THREE.Mesh(centerPearlGeo, pearlMat)
        centerPearl.position.y = -0.22
        productGroup.add(centerPearl)
        disposables.push(centerPearlGeo)

        const centerRingGeo = new THREE.TorusGeometry(0.306, 0.01, 14, 36)
        const centerRing = new THREE.Mesh(centerRingGeo, brassMat)
        centerRing.position.y = -0.22
        centerRing.rotation.x = Math.PI / 2
        productGroup.add(centerRing)
        disposables.push(centerRingGeo)

        // 3 Radial symmetrical satellite arms (120 deg apart)
        const armRadius = 0.72
        const satelliteOffsets = [
          { angle: 0, drop: 0.15 },
          { angle: (2 * Math.PI) / 3, drop: 0.38 },
          { angle: (4 * Math.PI) / 3, drop: 0.26 },
        ]

        satelliteOffsets.forEach((item) => {
          const armGroup = new THREE.Group()
          const armX = Math.cos(item.angle) * armRadius
          const armZ = Math.sin(item.angle) * armRadius

          // Horizontal radial arm rod
          const rodGeo = new THREE.CylinderGeometry(0.007, 0.007, armRadius, 12)
          const rod = new THREE.Mesh(rodGeo, brassMat)
          rod.rotation.z = Math.PI / 2
          rod.position.set(armX / 2, 0.22, armZ / 2)
          rod.rotation.y = -item.angle
          productGroup.add(rod)
          disposables.push(rodGeo)

          // Downrod
          const downrodGeo = new THREE.CylinderGeometry(0.006, 0.006, item.drop + 0.25, 12)
          const downrod = new THREE.Mesh(downrodGeo, cableMat)
          downrod.position.set(armX, 0.22 - (item.drop + 0.25) / 2, armZ)
          productGroup.add(downrod)
          disposables.push(downrodGeo)

          // Satellite pearl orb
          const satOrbGeo = new THREE.SphereGeometry(0.22, 28, 28)
          const satOrb = new THREE.Mesh(satOrbGeo, pearlMat)
          satOrb.position.set(armX, 0.22 - (item.drop + 0.25), armZ)
          productGroup.add(satOrb)
          disposables.push(satOrbGeo)

          // Equatorial ring
          const satRingGeo = new THREE.TorusGeometry(0.225, 0.008, 12, 32)
          const satRing = new THREE.Mesh(satRingGeo, brassMat)
          satRing.position.set(armX, 0.22 - (item.drop + 0.25), armZ)
          satRing.rotation.x = Math.PI / 2
          productGroup.add(satRing)
          disposables.push(satRingGeo)
        })

        pointLight = new THREE.PointLight('#ffe2be', 2.2, 7, 2)
        pointLight.position.set(0, 0, 0)
        productGroup.add(pointLight)
      } else {
        // PEARL WALL LIGHT:
        // - elegant wall-mounted fixture
        // - pearl diffuser
        // - subtle wall illumination
        const backplateGeo = new THREE.CylinderGeometry(0.64, 0.64, 0.02, 36)
        const backplate = new THREE.Mesh(backplateGeo, darkMetalMat)
        backplate.rotation.x = Math.PI / 2
        backplate.position.set(0, 0, -0.22)
        productGroup.add(backplate)
        disposables.push(backplateGeo)

        const rimGeo = new THREE.TorusGeometry(0.64, 0.012, 14, 48)
        const rim = new THREE.Mesh(rimGeo, brassMat)
        rim.position.set(0, 0, -0.21)
        productGroup.add(rim)
        disposables.push(rimGeo)

        // Cantilever horizontal stem projecting forward
        const stemGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.44, 16)
        const stem = new THREE.Mesh(stemGeo, brassMat)
        stem.rotation.x = Math.PI / 2
        stem.position.set(0, 0, 0.0)
        productGroup.add(stem)
        disposables.push(stemGeo)

        // Orb mount collar
        const mountGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.04, 24)
        const mount = new THREE.Mesh(mountGeo, brassMat)
        mount.position.set(0, 0, 0.22)
        mount.rotation.x = Math.PI / 2
        productGroup.add(mount)
        disposables.push(mountGeo)

        // Pearl diffuser
        const pearlGeo = new THREE.SphereGeometry(0.38, 36, 36)
        const pearl = new THREE.Mesh(pearlGeo, pearlMat)
        pearl.position.set(0, 0, 0.24)
        productGroup.add(pearl)
        disposables.push(pearlGeo)

        // Equatorial ring
        const ringGeo = new THREE.TorusGeometry(0.386, 0.012, 14, 48)
        const ring = new THREE.Mesh(ringGeo, brassMat)
        ring.position.set(0, 0, 0.24)
        ring.rotation.y = Math.PI / 2
        productGroup.add(ring)
        disposables.push(ringGeo)

        pointLight = new THREE.PointLight('#ffe6cb', 1.8, 6, 2)
        pointLight.position.set(0, 0, 0.24)
        productGroup.add(pointLight)

        // Subtle wall wash light against the backplate
        auxLight = new THREE.PointLight('#ffdcb4', 1.2, 4, 2)
        auxLight.position.set(0, 0, -0.05)
        productGroup.add(auxLight)
      }

      scene.add(productGroup)

      // Warm Gallery Ambient Lighting
      const ambientLight = new THREE.AmbientLight('#f4ede4', 1.1)
      scene.add(ambientLight)

      const rimLight = new THREE.DirectionalLight('#fff5e8', 0.6)
      rimLight.position.set(-2, 3, 2)
      scene.add(rimLight)

      // 7. IntersectionObserver: ONLY animate when visible on screen
      const observer = new IntersectionObserver(
        (entries) => {
          isVisible = entries[0]?.isIntersecting ?? false
        },
        { threshold: 0.1 }
      )
      observer.observe(container)

      // 8. ResizeObserver
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries[0] || isDisposed) return
        const { width: rw, height: rh } = entries[0].contentRect
        if (rw <= 0 || rh <= 0) return
        camera.aspect = rw / rh
        camera.updateProjectionMatrix()
        renderer.setSize(rw, rh, false)
      })
      resizeObserver.observe(container)

      // 9. Interactive Animation Loop
      const startTime = performance.now()
      let currentRotY = 0
      let currentRotX = 0

      const animate = () => {
        if (isDisposed) return
        animId = requestAnimationFrame(animate)

        // Skip calculations if offscreen
        if (!isVisible) return

        const t = (performance.now() - startTime) * 0.001
        const hovered = isHoveredRef.current

        // Idle gentle float and rotation
        const idleRot = prefersReducedMotion ? 0 : t * (productId === 'chandelier' ? 0.25 : 0.18)
        const idleFloatY = prefersReducedMotion ? 0 : Math.sin(t * 0.8) * 0.015

        // Hover response: subtle tilt toward pointer
        const targetTiltX = hovered ? -mouseRef.current.y * 0.12 : 0
        const targetTiltY = hovered ? mouseRef.current.x * 0.18 : 0

        currentRotX = THREE.MathUtils.lerp(currentRotX, targetTiltX, 0.05)
        currentRotY = THREE.MathUtils.lerp(currentRotY, idleRot + targetTiltY, 0.05)

        productGroup.rotation.y = currentRotY
        productGroup.rotation.x = currentRotX
        productGroup.position.y = idleFloatY

        // Hover light reaction: intensity increases slightly
        const targetLightIntensity = hovered ? 2.3 : 1.7
        const targetEmissive = hovered ? 0.52 : 0.38

        if (pointLight) {
          pointLight.intensity = THREE.MathUtils.lerp(pointLight.intensity, targetLightIntensity, 0.06)
        }
        if (auxLight) {
          auxLight.intensity = THREE.MathUtils.lerp(auxLight.intensity, hovered ? 1.6 : 1.2, 0.06)
        }
        pearlMat.emissiveIntensity = THREE.MathUtils.lerp(pearlMat.emissiveIntensity, targetEmissive, 0.06)

        try {
          renderer.render(scene, camera)
        } catch {
          setWebGLFailed(true)
        }
      }

      animate()

      // Cleanup
      return () => {
        isDisposed = true
        if (animId) cancelAnimationFrame(animId)
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        observer.disconnect()
        resizeObserver.disconnect()
        disposables.forEach((item) => item?.dispose?.())
        renderer.dispose()
      }
    } catch (err) {
      console.warn(`Product ${productId} 3D error:`, err)
      setWebGLFailed(true)
    }
  }, [productId])

  return (
    <div
      ref={containerRef}
      className="product-canvas-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={`Interactive 3D view of ${productId}`}
    >
      {webGLFailed ? (
        /* Intentional CSS Dark Luxury Fallback */
        <div className={`catalog-css-fallback fallback-${productId}`}>
          <div className="fallback-halo-ambient"></div>
          <div className="fallback-luminaire-core">
            <div className="fallback-inner-orb"></div>
          </div>
        </div>
      ) : (
        <canvas ref={canvasRef} className="product-three-canvas" />
      )}

      <style>{`
        .product-canvas-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: transparent;
        }

        .product-three-canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          outline: none;
          background: transparent;
          pointer-events: none;
        }

        /* ── Fallback ── */
        .catalog-css-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 50%, #11141c 0%, #060709 80%);
        }

        .fallback-halo-ambient {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(243, 237, 226, 0.2) 0%, rgba(203, 187, 163, 0.05) 50%, transparent 75%);
          filter: blur(25px);
        }

        .fallback-luminaire-core {
          position: relative;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #ffffff 0%, #faeee0 40%, #c2ac91 80%, #574836 100%);
          box-shadow: 0 0 40px rgba(243, 237, 226, 0.4);
          border: 1px solid rgba(203, 187, 163, 0.5);
        }
      `}</style>
    </div>
  )
}
