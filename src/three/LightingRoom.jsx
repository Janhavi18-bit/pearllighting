import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

/**
 * LightingRoom - Luxury Architectural Three.js Environment
 * Demonstrates the transformative power of light in a dark architectural space.
 * Features ultra-resilient WebGL context management and an intentional CSS luxury fallback.
 */
export default function LightingRoom({ progressRef }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const haloRef = useRef(null)
  const [webGLFailed, setWebGLFailed] = useState(false)

  // Detect WebGL availability safely before initialization
  useEffect(() => {
    function checkWebGL() {
      try {
        const testCanvas = document.createElement('canvas')
        return !!(
          window.WebGLRenderingContext &&
          (testCanvas.getContext('webgl2') || testCanvas.getContext('webgl'))
        )
      } catch {
        return false
      }
    }

    if (!checkWebGL()) {
      console.warn('WebGL not supported on this device. Using dark luxury architectural fallback.')
      setWebGLFailed(true)
      return
    }

    if (!canvasRef.current || !containerRef.current) return

    let renderer
    let animId
    let isDisposed = false

    const canvas = canvasRef.current
    const container = containerRef.current

    // Handle WebGL context lost gracefully
    const handleContextLost = (e) => {
      e.preventDefault()
      console.warn('WebGL context lost in LightingRoom. Activating dark architectural fallback.')
      if (animId) cancelAnimationFrame(animId)
      setWebGLFailed(true)
    }

    canvas.addEventListener('webglcontextlost', handleContextLost, false)

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    try {
      // 1. Scene with warm ivory/limestone architectural environment
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#EAE3D6')

      // 2. Camera Setup (Architectural Perspective)
      const initialWidth = Math.max(container.clientWidth || 800, 320)
      const initialHeight = Math.max(container.clientHeight || 550, 240)
      const camera = new THREE.PerspectiveCamera(42, initialWidth / initialHeight, 0.1, 50)
      const isMobile = window.innerWidth <= 768
      const baseCamZ = isMobile ? 4.6 : 4.0
      camera.position.set(0, 0.35, baseCamZ)
      camera.lookAt(0, 0.1, 0)

      // 3. Renderer - Rock-solid configuration preventing context crash
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'default',
        precision: 'mediump',
      })
      renderer.setClearColor('#EAE3D6', 1)
      renderer.setSize(initialWidth, initialHeight, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2.0))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.0

      // 4. Architectural Materials (Warm Limestone & Champagne Accents)
      // Floor - Warm refined architectural limestone
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D8CFBF'),
        roughness: 0.82,
        metalness: 0.08,
      })

      // Back Plaster Wall - Warm ivory/stone plaster
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E2DACD'),
        roughness: 0.92,
        metalness: 0.02,
      })

      // Side Walls
      const sideWallMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#DDD4C6'),
        roughness: 0.9,
        metalness: 0.02,
      })

      // Ceiling - Matte warm architectural slab
      const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#EFE8DE'),
        roughness: 0.95,
        metalness: 0.01,
      })

      // Vertical architectural pilasters for spatial depth
      const pilasterMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D0C6B5'),
        roughness: 0.78,
        metalness: 0.1,
      })

      // Pearl Diffuser Glass - Warm glowing opal
      const pearlGlassMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fcf9f2'),
        emissive: new THREE.Color('#ffdfba'),
        emissiveIntensity: 0.18,
        roughness: 0.28,
        metalness: 0.04,
      })

      // Brushed Champagne Brass
      const brassMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#d8b875'),
        roughness: 0.28,
        metalness: 0.88,
      })

      // Suspension cable cord
      const cableMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5e5548'),
        roughness: 0.6,
        metalness: 0.7,
      })

      // 5. Room Architecture Geometry
      // Floor plane
      const floorGeo = new THREE.PlaneGeometry(24, 20)
      const floorMesh = new THREE.Mesh(floorGeo, floorMaterial)
      floorMesh.rotation.x = -Math.PI / 2
      floorMesh.position.y = -1.45
      scene.add(floorMesh)

      // Back Wall
      const backWallGeo = new THREE.PlaneGeometry(24, 12)
      const backWallMesh = new THREE.Mesh(backWallGeo, wallMaterial)
      backWallMesh.position.set(0, 2.0, -3.8)
      scene.add(backWallMesh)

      // Ceiling
      const ceilingGeo = new THREE.PlaneGeometry(24, 20)
      const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMaterial)
      ceilingMesh.rotation.x = Math.PI / 2
      ceilingMesh.position.y = 3.6
      scene.add(ceilingMesh)

      // Left Architectural Side Wall
      const leftWallGeo = new THREE.PlaneGeometry(20, 12)
      const leftWallMesh = new THREE.Mesh(leftWallGeo, sideWallMaterial)
      leftWallMesh.rotation.y = Math.PI / 2
      leftWallMesh.position.set(-5.5, 2.0, 0)
      scene.add(leftWallMesh)

      // Right Architectural Side Wall
      const rightWallGeo = new THREE.PlaneGeometry(20, 12)
      const rightWallMesh = new THREE.Mesh(rightWallGeo, sideWallMaterial)
      rightWallMesh.rotation.y = -Math.PI / 2
      rightWallMesh.position.set(5.5, 2.0, 0)
      scene.add(rightWallMesh)

      // Left architectural shadow-casting pilaster
      const pilasterGeo = new THREE.BoxGeometry(0.35, 8.0, 0.5)
      const leftPilaster = new THREE.Mesh(pilasterGeo, pilasterMaterial)
      leftPilaster.position.set(-3.2, 1.8, -3.4)
      scene.add(leftPilaster)

      // Right architectural pilaster
      const rightPilaster = new THREE.Mesh(pilasterGeo, pilasterMaterial)
      rightPilaster.position.set(3.2, 1.8, -3.4)
      scene.add(rightPilaster)

      // 6. Suspended Pearl Luminaire in Room Center
      const pendantGroup = new THREE.Group()
      pendantGroup.position.set(0, 0.38, -0.5)

      // Suspension cable extending to ceiling
      const cableGeo = new THREE.CylinderGeometry(0.007, 0.007, 3.6, 16)
      const cableMesh = new THREE.Mesh(cableGeo, cableMaterial)
      cableMesh.position.y = 2.05
      pendantGroup.add(cableMesh)

      // Ceiling mount canopy
      const canopyGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 32)
      const canopyMesh = new THREE.Mesh(canopyGeo, brassMaterial)
      canopyMesh.position.y = 3.6
      pendantGroup.add(canopyMesh)

      // Lamp top brass cap
      const capGeo = new THREE.CylinderGeometry(0.11, 0.11, 0.04, 32)
      const capMesh = new THREE.Mesh(capGeo, brassMaterial)
      capMesh.position.y = 0.44
      pendantGroup.add(capMesh)

      // Pearl spherical diffuser
      const pearlGeo = new THREE.SphereGeometry(0.42, 48, 48)
      const pearlMesh = new THREE.Mesh(pearlGeo, pearlGlassMaterial)
      pendantGroup.add(pearlMesh)

      // Equatorial brass accent ring
      const ringGeo = new THREE.TorusGeometry(0.428, 0.012, 16, 64)
      const ringMesh = new THREE.Mesh(ringGeo, brassMaterial)
      ringMesh.rotation.x = Math.PI / 2
      pendantGroup.add(ringMesh)

      // Bottom brass bead
      const beadGeo = new THREE.SphereGeometry(0.024, 24, 24)
      const beadMesh = new THREE.Mesh(beadGeo, brassMaterial)
      beadMesh.position.y = -0.43
      pendantGroup.add(beadMesh)

      scene.add(pendantGroup)

      // 7. Lighting System
      // Ambient base light
      const ambientLight = new THREE.AmbientLight('#F7F0E6', 0.35)
      scene.add(ambientLight)

      // The Pearl Radiant Point Light (The glowing soul of the room)
      const pearlPointLight = new THREE.PointLight('#ffe4c7', 0.2, 14, 2)
      pearlPointLight.position.set(0, 0.38, -0.5)
      scene.add(pearlPointLight)

      // Downward architectural spot pool radiating onto the floor
      const downwardSpot = new THREE.SpotLight('#ffe8d2', 0.15, 10, Math.PI / 3.2, 0.65, 2)
      downwardSpot.position.set(0, 0.38, -0.5)
      const spotTarget = new THREE.Object3D()
      spotTarget.position.set(0, -1.45, -0.5)
      scene.add(spotTarget)
      downwardSpot.target = spotTarget
      scene.add(downwardSpot)

      // Soft directional architectural fill light
      const softFill = new THREE.DirectionalLight('#9bb2cc', 0.02)
      softFill.position.set(2, 4, 3)
      scene.add(softFill)

      // 8. Responsive Resize Handling
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries[0] || isDisposed) return
        const { width: w, height: h } = entries[0].contentRect
        if (w <= 0 || h <= 0) return

        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h, false)
      })
      resizeObserver.observe(container)

      // 9. Frame Animation Loop
      const startTime = performance.now()

      const animate = () => {
        if (isDisposed) return
        const t = (performance.now() - startTime) * 0.001

        // Current scroll progress (0 to 1)
        const rawProgress = progressRef?.current ?? 0
        const p = prefersReducedMotion ? 0.75 : Math.min(Math.max(rawProgress, 0), 1)

        // Micro-idle float on luminaire
        const idleY = Math.sin(t * 0.6) * 0.012
        pendantGroup.position.y = 0.38 + idleY
        pearlPointLight.position.y = 0.38 + idleY
        downwardSpot.position.y = 0.38 + idleY

        // SCROLL-DRIVEN LIGHTING PROGRESSION:
        // 0%:   very dark room
        // 25%:  lamp begins glowing warmly
        // 50%:  walls and floor become visible
        // 75%:  room becomes warmly illuminated
        // 100%: full elegant lighting
        let targetPointLight = 0.2
        let targetSpotLight = 0.15
        let targetAmbient = 0.03
        let targetFill = 0.02
        let targetEmissive = 0.12
        let targetExposure = 0.95

        if (p < 0.25) {
          // 0% to 25%: Lamp begins glowing
          const factor = p / 0.25
          targetPointLight = 0.2 + factor * 0.9 // up to 1.1
          targetSpotLight = 0.15 + factor * 0.85 // up to 1.0
          targetAmbient = 0.03 + factor * 0.04
          targetEmissive = 0.12 + factor * 0.3 // up to 0.42
          targetExposure = 0.95 + factor * 0.08
        } else if (p < 0.6) {
          // 25% to 60%: Walls and floor become visible
          const factor = (p - 0.25) / 0.35
          targetPointLight = 1.1 + factor * 2.1 // up to 3.2
          targetSpotLight = 1.0 + factor * 2.2 // up to 3.2
          targetAmbient = 0.07 + factor * 0.13 // up to 0.20
          targetFill = 0.02 + factor * 0.16
          targetEmissive = 0.42 + factor * 0.4 // up to 0.82
          targetExposure = 1.03 + factor * 0.15
        } else if (p < 0.88) {
          // 60% to 88%: Room warmly and serenely illuminated
          targetPointLight = 3.2 + Math.sin(t * 1.1) * 0.12
          targetSpotLight = 3.2 + Math.sin(t * 1.1) * 0.12
          targetAmbient = 0.22
          targetFill = 0.18
          targetEmissive = 0.85
          targetExposure = 1.18
        } else {
          // 88% to 100%: Graceful atmospheric transition into Collection
          const factor = (p - 0.88) / 0.12
          targetPointLight = 3.2 * (1 - factor * 0.6)
          targetSpotLight = 3.2 * (1 - factor * 0.6)
          targetAmbient = 0.22 * (1 - factor * 0.6)
          targetFill = 0.18 * (1 - factor * 0.6)
          targetEmissive = 0.85 * (1 - factor * 0.5)
          targetExposure = 1.18 * (1 - factor * 0.3)
        }

        // Apply interpolated dynamic lighting
        pearlPointLight.intensity = THREE.MathUtils.lerp(pearlPointLight.intensity, targetPointLight, 0.08)
        downwardSpot.intensity = THREE.MathUtils.lerp(downwardSpot.intensity, targetSpotLight, 0.08)
        ambientLight.intensity = THREE.MathUtils.lerp(ambientLight.intensity, targetAmbient, 0.08)
        softFill.intensity = THREE.MathUtils.lerp(softFill.intensity, targetFill, 0.08)
        pearlGlassMaterial.emissiveIntensity = THREE.MathUtils.lerp(pearlGlassMaterial.emissiveIntensity, targetEmissive, 0.08)
        renderer.toneMappingExposure = THREE.MathUtils.lerp(renderer.toneMappingExposure, targetExposure, 0.08)

        // Subtle camera zoom in as light expands
        const targetCamZ = baseCamZ - p * 0.35
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.06)

        // Render Frame with error protection
        try {
          renderer.render(scene, camera)
        } catch (renderErr) {
          console.warn('Render error encountered:', renderErr)
          setWebGLFailed(true)
          return
        }

        // Sync CSS volumetric radial halo overlay
        if (haloRef.current) {
          const haloOpacity = Math.min(Math.max((p - 0.08) * 1.25, 0), 0.72) * (p > 0.88 ? (1 - (p - 0.88) / 0.12) : 1)
          haloRef.current.style.opacity = `${haloOpacity}`
        }

        animId = requestAnimationFrame(animate)
      }

      animate()

      // Cleanup on unmount
      return () => {
        isDisposed = true
        if (animId) cancelAnimationFrame(animId)
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        resizeObserver.disconnect()

        floorGeo.dispose()
        backWallGeo.dispose()
        ceilingGeo.dispose()
        leftWallGeo.dispose()
        rightWallGeo.dispose()
        pilasterGeo.dispose()
        cableGeo.dispose()
        canopyGeo.dispose()
        capGeo.dispose()
        pearlGeo.dispose()
        ringGeo.dispose()
        beadGeo.dispose()

        floorMaterial.dispose()
        wallMaterial.dispose()
        sideWallMaterial.dispose()
        ceilingMaterial.dispose()
        pilasterMaterial.dispose()
        pearlGlassMaterial.dispose()
        brassMaterial.dispose()
        cableMaterial.dispose()

        renderer.dispose()
      }
    } catch (err) {
      console.warn('LightingRoom WebGL initialization failed. Switching to CSS fallback:', err)
      setWebGLFailed(true)
    }
  }, [progressRef])

  return (
    <div ref={containerRef} className="lighting-room-wrapper" aria-label="3D Lighting Room Space">
      {/* Volumetric Radial Glow Overlay */}
      <div ref={haloRef} className="lighting-room-halo" aria-hidden="true"></div>

      {webGLFailed ? (
        /* CSS-Based Dark Luxury Architectural Fallback */
        <div className="lighting-room-fallback" role="img" aria-label="Dark architectural interior with glowing Pearl luminaire">
          {/* Architectural Room Lines & Shadows */}
          <div className="fallback-room-box">
            {/* Ceiling architectural boundary */}
            <div className="fallback-ceiling-line"></div>
            {/* Floor perspective horizon */}
            <div className="fallback-floor-plane"></div>
            {/* Warm pool of light cast on the floor */}
            <div className="fallback-floor-puddle"></div>
            {/* Side wall architectural depth lines */}
            <div className="fallback-side-wall-left"></div>
            <div className="fallback-side-wall-right"></div>
          </div>

          {/* Suspended Pendant Silhouette & Warm Illumination */}
          <div className="fallback-pendant-assembly">
            <div className="fallback-cord"></div>
            <div className="fallback-cap"></div>
            <div className="fallback-pearl-orb">
              <div className="fallback-equator-ring"></div>
            </div>
            <div className="fallback-luminous-bloom"></div>
          </div>
        </div>
      ) : (
        <canvas ref={canvasRef} className="lighting-room-canvas" />
      )}

      <style>{`
        .lighting-room-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #EAE3D6;
        }

        .lighting-room-canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          outline: none;
          background: #EAE3D6 !important;
        }

        .lighting-room-halo {
          position: absolute;
          width: clamp(280px, 45vw, 560px);
          height: clamp(280px, 45vw, 560px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 238, 210, 0.5) 0%, rgba(198, 154, 82, 0.15) 45%, transparent 72%);
          filter: blur(48px);
          pointer-events: none;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* ── CSS Warm Luxury Fallback ── */
        .lighting-room-fallback {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #EAE3D6;
          overflow: hidden;
        }

        .fallback-room-box {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .fallback-floor-plane {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 44%;
          background: linear-gradient(180deg, #D8CFBF 0%, #CEC4B2 100%);
          border-top: 1px solid rgba(120, 100, 70, 0.18);
        }

        .fallback-floor-puddle {
          position: absolute;
          bottom: 6%;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(240px, 50vw, 520px);
          height: clamp(90px, 18vw, 160px);
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(255, 235, 209, 0.22) 0%, rgba(203, 187, 163, 0.08) 50%, transparent 75%);
          filter: blur(28px);
        }

        .fallback-ceiling-line {
          position: absolute;
          top: 14%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 5%, rgba(229, 218, 201, 0.06) 50%, transparent 95%);
        }

        .fallback-side-wall-left {
          position: absolute;
          top: 14%;
          bottom: 44%;
          left: 12%;
          width: 1px;
          background: linear-gradient(180deg, rgba(229, 218, 201, 0.04) 0%, rgba(229, 218, 201, 0.08) 100%);
        }

        .fallback-side-wall-right {
          position: absolute;
          top: 14%;
          bottom: 44%;
          right: 12%;
          width: 1px;
          background: linear-gradient(180deg, rgba(229, 218, 201, 0.04) 0%, rgba(229, 218, 201, 0.08) 100%);
        }

        .fallback-pendant-assembly {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: -30px;
        }

        .fallback-cord {
          width: 1px;
          height: 140px;
          background: linear-gradient(180deg, rgba(203, 187, 163, 0.15) 0%, rgba(203, 187, 163, 0.6) 100%);
        }

        .fallback-cap {
          width: 22px;
          height: 6px;
          background: #cbbba3;
          border-radius: 1px;
        }

        .fallback-pearl-orb {
          position: relative;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: radial-gradient(circle at 45% 40%, #ffffff 0%, #faefe0 35%, #e1cdb3 70%, #6e5e4d 100%);
          box-shadow: 0 0 50px rgba(255, 235, 209, 0.55), 0 0 100px rgba(203, 187, 163, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fallback-equator-ring {
          width: 100px;
          height: 6px;
          border-radius: 50%;
          border: 1px solid rgba(203, 187, 163, 0.85);
          box-shadow: 0 0 8px rgba(203, 187, 163, 0.4);
        }

        .fallback-luminous-bloom {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 237, 214, 0.3) 0%, rgba(203, 187, 163, 0.1) 45%, transparent 72%);
          filter: blur(40px);
          pointer-events: none;
          z-index: -1;
        }
      `}</style>
    </div>
  )
}
