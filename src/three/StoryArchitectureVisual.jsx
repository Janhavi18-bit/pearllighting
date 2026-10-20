import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

/**
 * StoryArchitectureVisual - Cinematic architectural 3D study for "The Art of Light"
 * Minimal geometry, dark architectural surfaces, warm progressive illumination,
 * and subtle scroll-driven camera choreography.
 */
export default function StoryArchitectureVisual({ scrollProgress = 0 }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [webGLFailed, setWebGLFailed] = useState(false)
  const scrollRef = useRef(scrollProgress)

  useEffect(() => {
    scrollRef.current = scrollProgress
  }, [scrollProgress])

  useEffect(() => {
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

    const handleContextLost = (e) => {
      e.preventDefault()
      console.warn('WebGL context lost in StoryArchitectureVisual. Switching to CSS fallback.')
      if (animId) cancelAnimationFrame(animId)
      setWebGLFailed(true)
    }
    canvas.addEventListener('webglcontextlost', handleContextLost, false)

    const isMobile = window.innerWidth <= 768
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    try {
      // 1. Scene
      const scene = new THREE.Scene()
      scene.background = new THREE.Color('#EFE9DE')

      // 2. Camera
      const w = Math.max(container.clientWidth || 600, 240)
      const h = Math.max(container.clientHeight || 520, 240)
      const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 40)
      const baseCamZ = isMobile ? 4.2 : 3.6
      camera.position.set(0.15, 0.1, baseCamZ)
      camera.lookAt(0, 0, 0)

      // 3. Renderer with low DPR
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'low-power',
        precision: 'mediump',
      })
      renderer.setClearColor('#EFE9DE', 1)
      renderer.setSize(w, h, false)
      renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.0

      // 4. Architectural Materials (Warm Stone & Limestone Plaster)
      const plasterMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E4D9C8'),
        roughness: 0.94,
        metalness: 0.02,
      })

      const monolithMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#DDD4C4'),
        roughness: 0.85,
        metalness: 0.08,
      })

      const plinthMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D8CDBB'),
        roughness: 0.82,
        metalness: 0.1,
      })

      const floorMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#E8E0D2'),
        roughness: 0.88,
        metalness: 0.05,
      })

      const brassMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#cbbba3'),
        roughness: 0.28,
        metalness: 0.88,
      })

      const pearlMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fcfaf4'),
        emissive: new THREE.Color('#ffdfba'),
        emissiveIntensity: 0.2,
        roughness: 0.28,
        metalness: 0.04,
      })

      const cordMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5e5548'),
        roughness: 0.6,
        metalness: 0.7,
      })

      const disposables = [plasterMat, monolithMat, plinthMat, floorMat, brassMat, pearlMat, cordMat]

      // 5. Geometry Construction
      // Back Wall
      const backWallGeo = new THREE.PlaneGeometry(16, 12)
      const backWall = new THREE.Mesh(backWallGeo, plasterMat)
      backWall.position.set(0, 1.5, -2.8)
      scene.add(backWall)
      disposables.push(backWallGeo)

      // Floor Plane
      const floorGeo = new THREE.PlaneGeometry(16, 16)
      const floor = new THREE.Mesh(floorGeo, floorMat)
      floor.rotation.x = -Math.PI / 2
      floor.position.y = -1.45
      scene.add(floor)
      disposables.push(floorGeo)

      // Left Architectural Monolith Pillar (Creates spatial shadow reveal)
      const monolithGeo = new THREE.BoxGeometry(1.1, 5.0, 1.1)
      const monolith = new THREE.Mesh(monolithGeo, monolithMat)
      monolith.position.set(-1.45, 0.6, -1.0)
      scene.add(monolith)
      disposables.push(monolithGeo)

      // Right Architectural Stone Plinth
      const plinthGeo = new THREE.BoxGeometry(1.8, 0.45, 1.2)
      const plinth = new THREE.Mesh(plinthGeo, plinthMat)
      plinth.position.set(1.1, -1.22, -0.6)
      scene.add(plinth)
      disposables.push(plinthGeo)

      // Suspended Pearl Luminaire
      const pendantGroup = new THREE.Group()
      pendantGroup.position.set(0.35, 0.18, 0.1)

      const cordGeo = new THREE.CylinderGeometry(0.006, 0.006, 3.2, 12)
      const cord = new THREE.Mesh(cordGeo, cordMat)
      cord.position.y = 1.8
      pendantGroup.add(cord)
      disposables.push(cordGeo)

      const capGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.035, 24)
      const cap = new THREE.Mesh(capGeo, brassMat)
      cap.position.y = 0.38
      pendantGroup.add(cap)
      disposables.push(capGeo)

      const pearlGeo = new THREE.SphereGeometry(0.38, 36, 36)
      const pearl = new THREE.Mesh(pearlGeo, pearlMat)
      pendantGroup.add(pearl)
      disposables.push(pearlGeo)

      const ringGeo = new THREE.TorusGeometry(0.388, 0.011, 14, 48)
      const ring = new THREE.Mesh(ringGeo, brassMat)
      ring.rotation.x = Math.PI / 2
      pendantGroup.add(ring)
      disposables.push(ringGeo)

      scene.add(pendantGroup)

      // 6. Lighting Setup
      // Base Warm Ambient Light
      const ambientLight = new THREE.AmbientLight('#f4ede2', 0.8)
      scene.add(ambientLight)

      // Core Pearl Luminaire Light
      const pearlLight = new THREE.PointLight('#ffe4c7', 1.8, 9, 2)
      pearlLight.position.set(0.35, 0.18, 0.1)
      scene.add(pearlLight)

      // Architectural Grazing Fill Light
      const grazeLight = new THREE.DirectionalLight('#fff5e8', 0.5)
      grazeLight.position.set(-2, 3, 2)
      scene.add(grazeLight)

      // 7. Visibility Observer
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

      // 9. Animation Loop with Progressive Scroll Illumination
      const startTime = performance.now()

      const animate = () => {
        if (isDisposed) return
        animId = requestAnimationFrame(animate)

        if (!isVisible) return

        const t = (performance.now() - startTime) * 0.001
        const p = prefersReducedMotion ? 0.75 : Math.min(Math.max(scrollRef.current || 0, 0), 1)

        // Micro-idle float
        const idleFloat = Math.sin(t * 0.7) * 0.012
        pendantGroup.position.y = 0.18 + idleFloat
        pearlLight.position.y = 0.18 + idleFloat

        // Progressive Lighting Driven by Scroll
        // 0% -> mysterious faint light in dark architecture
        // 50% -> warm illumination casting soft shadows across the monolith
        // 100% -> rich radiant atmosphere
        const targetPointIntensity = 0.6 + p * 2.8 // up to 3.4
        const targetAmbient = 0.04 + p * 0.22 // up to 0.26
        const targetGraze = 0.03 + p * 0.18
        const targetEmissive = 0.2 + p * 0.65 // up to 0.85
        const targetExposure = 0.95 + p * 0.25

        pearlLight.intensity = THREE.MathUtils.lerp(pearlLight.intensity, targetPointIntensity, 0.06)
        ambientLight.intensity = THREE.MathUtils.lerp(ambientLight.intensity, targetAmbient, 0.06)
        grazeLight.intensity = THREE.MathUtils.lerp(grazeLight.intensity, targetGraze, 0.06)
        pearlMat.emissiveIntensity = THREE.MathUtils.lerp(pearlMat.emissiveIntensity, targetEmissive, 0.06)
        renderer.toneMappingExposure = THREE.MathUtils.lerp(renderer.toneMappingExposure, targetExposure, 0.06)

        // Subtle Camera Movement as user scrolls
        const targetCamX = 0.15 - p * 0.25
        const targetCamZ = baseCamZ - p * 0.35
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.05)
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.05)
        camera.lookAt(targetCamX * 0.2, 0.05, 0)

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
      console.warn('StoryArchitectureVisual error:', err)
      setWebGLFailed(true)
    }
  }, [])

  return (
    <div ref={containerRef} className="story-canvas-container" aria-label="Architectural light study visual">
      {webGLFailed ? (
        /* CSS-Based Architectural Editorial Fallback */
        <div className="story-css-fallback">
          <div className="fallback-monolith-block"></div>
          <div className="fallback-plinth-slab"></div>
          <div className="fallback-cord"></div>
          <div className="fallback-pearl-core">
            <div className="fallback-pearl-glow"></div>
          </div>
          <div className="fallback-light-wash"></div>
        </div>
      ) : (
        <canvas ref={canvasRef} className="story-three-canvas" />
      )}

      <style>{`
        .story-canvas-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #060709;
        }

        .story-three-canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          outline: none;
          background: #060709 !important;
          color-scheme: dark;
        }

        /* ── Fallback ── */
        .story-css-fallback {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 60% 45%, #10131b 0%, #060709 85%);
          overflow: hidden;
        }

        .fallback-monolith-block {
          position: absolute;
          left: 14%;
          top: 10%;
          bottom: 15%;
          width: 22%;
          background: linear-gradient(90deg, #0b0d12 0%, #12151d 100%);
          border-right: 1px solid rgba(229, 218, 201, 0.08);
          box-shadow: 15px 0 45px rgba(0, 0, 0, 0.8);
        }

        .fallback-plinth-slab {
          position: absolute;
          right: 12%;
          bottom: 18%;
          width: 38%;
          height: 8%;
          background: #0e1117;
          border-top: 1px solid rgba(229, 218, 201, 0.06);
        }

        .fallback-cord {
          position: absolute;
          left: 56%;
          top: 0;
          height: 48%;
          width: 1px;
          background: linear-gradient(180deg, rgba(203, 187, 163, 0.2) 0%, rgba(203, 187, 163, 0.7) 100%);
        }

        .fallback-pearl-core {
          position: absolute;
          left: calc(56% - 46px);
          top: calc(48% - 15px);
          width: 92px;
          height: 92px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #ffffff 0%, #faeee0 40%, #c4af94 80%, #5c4c39 100%);
          box-shadow: 0 0 50px rgba(255, 235, 209, 0.5);
          border: 1px solid rgba(203, 187, 163, 0.5);
          z-index: 2;
        }

        .fallback-pearl-glow {
          position: absolute;
          inset: -25px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(243, 237, 226, 0.25) 0%, transparent 70%);
          filter: blur(18px);
        }

        .fallback-light-wash {
          position: absolute;
          left: 45%;
          top: 35%;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 238, 217, 0.16) 0%, transparent 70%);
          filter: blur(40px);
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}
