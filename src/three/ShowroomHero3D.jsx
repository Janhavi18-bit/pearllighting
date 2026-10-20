import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

/**
 * ShowroomHero3D - Genuine 3D Architectural Luminaire Sculpture
 * Built with procedural physical geometry, physical materials, transmission, and inner light source.
 * Not a flat image: has true 3D depth, volume, specular highlights, and real-time interactive physics.
 */
export default function ShowroomHero3D() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const mouseTargetRef = useRef({ x: 0, y: 0 })
  const mouseDampedRef = useRef({ x: 0, y: 0 })
  const [webGLFailed, setWebGLFailed] = useState(false)

  const handleMouseMove = (e) => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    mouseTargetRef.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    }
  }

  const handleMouseLeave = () => {
    mouseTargetRef.current = { x: 0, y: 0 }
  }

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    let renderer
    let animId
    let isDisposed = false

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    try {
      // 1. Scene
      const scene = new THREE.Scene()

      // 2. Camera Setup (Architectural Perspective)
      const width = containerRef.current.clientWidth || 580
      const height = containerRef.current.clientHeight || 580
      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50)
      // 3. Renderer with ACESFilmic tone mapping
      const isMobile = window.innerWidth <= 768
      const cameraZ = isMobile ? 3.45 : 3.1
      camera.position.set(0, isMobile ? 0.03 : 0.05, cameraZ)
      const maxDpr = isMobile ? 1.5 : 2.0
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setSize(width, height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.1

      // 4. Studio Lighting Environment (Warm Ivory Ambient + Studio Key + Specular Rim)
      const ambientLight = new THREE.AmbientLight('#FBF7F0', 1.25)
      scene.add(ambientLight)

      // Key light with warm golden spectrum
      const keyLight = new THREE.DirectionalLight('#FFF2DD', 1.8)
      keyLight.position.set(2.8, 4.0, 3.5)
      scene.add(keyLight)

      // Crisp champagne rim light grazing metallic edges
      const rimLight = new THREE.DirectionalLight('#E8D8C3', 1.3)
      rimLight.position.set(-3.2, 1.8, -2.2)
      scene.add(rimLight)

      // Soft underside fill to lift dark bronze and lower finial
      const underFill = new THREE.DirectionalLight('#F0E6D8', 0.6)
      underFill.position.set(0, -3.0, 1.5)
      scene.add(underFill)

      // Warm radial spotlight for glowing halo
      const warmSpot = new THREE.PointLight('#FFE0B5', 1.5, 7, 1.8)
      warmSpot.position.set(0.8, 2.2, 1.8)
      scene.add(warmSpot)

      // 5. Luminaire Root Group
      const luminaireGroup = new THREE.Group()
      scene.add(luminaireGroup)

      // ── Physical Materials ──
      // Mouth-blown Frosted Pearl Glass (Enhanced physical transmission & luminous subsurface)
      const pearlGlassMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FCFAF6'),
        emissive: new THREE.Color('#FFE8CB'),
        emissiveIntensity: 0.58,
        roughness: 0.22,
        metalness: 0.02,
        clearcoat: 0.7,
        clearcoatRoughness: 0.14,
        transmission: 0.68,
        thickness: 1.1,
        ior: 1.52,
      })

      // Hand-finished Champagne Brass with polished specular response
      const champagneBrassMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#D8C3A5'),
        roughness: 0.18,
        metalness: 0.94,
      })

      // Architectural Dark Bronze Accents
      const darkBronzeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#383127'),
        roughness: 0.32,
        metalness: 0.85,
      })

      // Braided Wire
      const wireMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5E5648'),
        roughness: 0.55,
        metalness: 0.5,
      })

      // ── Geometries ──
      // Suspension Cable
      const cableGeo = new THREE.CylinderGeometry(0.006, 0.006, 4.0, 16)
      const cableMesh = new THREE.Mesh(cableGeo, wireMat)
      cableMesh.position.y = 2.4
      luminaireGroup.add(cableMesh)

      // Upper Ceiling Flange / Canopy
      const canopyGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.06, 32)
      const canopyMesh = new THREE.Mesh(canopyGeo, champagneBrassMat)
      canopyMesh.position.y = 1.15
      luminaireGroup.add(canopyMesh)

      // Suspension Coupler
      const couplerGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.18, 24)
      const couplerMesh = new THREE.Mesh(couplerGeo, darkBronzeMat)
      couplerMesh.position.y = 0.76
      luminaireGroup.add(couplerMesh)

      // Brass Finial Mount
      const finialGeo = new THREE.CylinderGeometry(0.045, 0.08, 0.15, 32)
      const finialMesh = new THREE.Mesh(finialGeo, champagneBrassMat)
      finialMesh.position.y = 0.61
      luminaireGroup.add(finialMesh)

      // Flush Diffuser Cap
      const capGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.045, 48)
      const capMesh = new THREE.Mesh(capGeo, champagneBrassMat)
      capMesh.position.y = 0.51
      luminaireGroup.add(capMesh)

      // Upper Architectural Torus Collar
      const ringTopGeo = new THREE.TorusGeometry(0.18, 0.016, 16, 48)
      const ringTopMesh = new THREE.Mesh(ringTopGeo, champagneBrassMat)
      ringTopMesh.position.y = 0.45
      ringTopMesh.rotation.x = Math.PI / 2
      luminaireGroup.add(ringTopMesh)

      // ── Central Frosted Pearl Glass Sphere (Glowing) ──
      const sphereGeo = new THREE.SphereGeometry(0.52, 64, 64)
      const sphereMesh = new THREE.Mesh(sphereGeo, pearlGlassMat)
      sphereMesh.position.y = 0
      luminaireGroup.add(sphereMesh)

      // Equatorial Champagne Brass Ring
      const equatorGeo = new THREE.TorusGeometry(0.53, 0.015, 16, 64)
      const equatorMesh = new THREE.Mesh(equatorGeo, champagneBrassMat)
      equatorMesh.rotation.x = Math.PI / 2
      luminaireGroup.add(equatorMesh)

      // Outer Orbital Architectural Ring (Tilted at 35° creating spatial elegance)
      const orbitalGeo = new THREE.TorusGeometry(0.76, 0.018, 24, 64)
      const orbitalMesh = new THREE.Mesh(orbitalGeo, champagneBrassMat)
      orbitalMesh.rotation.x = Math.PI / 3.2
      orbitalMesh.rotation.y = Math.PI / 6
      luminaireGroup.add(orbitalMesh)

      // Inner Counter-Rotating Gyroscopic Halo (Subtle delicate architectural layer)
      const innerHaloGeo = new THREE.TorusGeometry(0.38, 0.008, 16, 48)
      const innerHaloMesh = new THREE.Mesh(innerHaloGeo, champagneBrassMat)
      innerHaloMesh.rotation.x = -Math.PI / 4
      innerHaloMesh.rotation.z = Math.PI / 5
      luminaireGroup.add(innerHaloMesh)

      // Lower Brass Pendant Counterweight / Base Finial
      const baseFinialGeo = new THREE.CylinderGeometry(0.065, 0.02, 0.14, 32)
      const baseFinialMesh = new THREE.Mesh(baseFinialGeo, champagneBrassMat)
      baseFinialMesh.position.y = -0.58
      luminaireGroup.add(baseFinialMesh)

      // Inner Core Point Light (Real Illumination radiating through frosted glass)
      const innerLight = new THREE.PointLight('#FFF1D8', 2.2, 4.0, 1.8)
      innerLight.position.set(0, 0, 0)
      luminaireGroup.add(innerLight)

      // Ground Warm Reflected Caustic Pool
      const groundGlowGeo = new THREE.CircleGeometry(0.9, 48)
      const groundGlowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#E8CA98'),
        transparent: true,
        opacity: 0.14,
      })
      const groundGlowMesh = new THREE.Mesh(groundGlowGeo, groundGlowMat)
      groundGlowMesh.position.y = -1.24
      groundGlowMesh.rotation.x = -Math.PI / 2
      scene.add(groundGlowMesh)

      // Soft Ground Ambient Contact Shadow Disc
      const shadowGeo = new THREE.CircleGeometry(0.68, 48)
      const shadowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color('#2C241B'),
        transparent: true,
        opacity: 0.16,
      })
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
      shadowMesh.position.y = -1.23
      shadowMesh.rotation.x = -Math.PI / 2
      scene.add(shadowMesh)

      // Resize Handler
      const handleResize = () => {
        if (!containerRef.current || isDisposed) return
        const w = containerRef.current.clientWidth || 580
        const h = containerRef.current.clientHeight || 580
        const isMob = window.innerWidth <= 768
        camera.position.z = isMob ? 3.45 : 3.1
        camera.position.y = isMob ? 0.03 : 0.05
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h, false)
      }

      window.addEventListener('resize', handleResize, { passive: true })

      // 6. Animation Loop
      let clock = new THREE.Clock()

      const animate = () => {
        if (isDisposed) return
        animId = requestAnimationFrame(animate)

        const elapsedTime = clock.getElapsedTime()

        // Smooth Mouse Parallax Damping
        mouseDampedRef.current.x += (mouseTargetRef.current.x - mouseDampedRef.current.x) * 0.05
        mouseDampedRef.current.y += (mouseTargetRef.current.y - mouseDampedRef.current.y) * 0.05

        if (!prefersReducedMotion) {
          // Slow Architectural Breathing Floating Movement
          const floatOffset = Math.sin(elapsedTime * 0.65) * 0.04
          luminaireGroup.position.y = floatOffset

          // Subtle Continuous Orbital Drift with Interactive Inertia
          luminaireGroup.rotation.y = elapsedTime * 0.15 + mouseDampedRef.current.x * 0.45
          luminaireGroup.rotation.x = Math.sin(elapsedTime * 0.45) * 0.035 - mouseDampedRef.current.y * 0.28
          luminaireGroup.rotation.z = Math.cos(elapsedTime * 0.55) * 0.025 + mouseDampedRef.current.x * 0.12

          // Independent Gyroscopic Inner Halo Counter-Rotation
          innerHaloMesh.rotation.z = -elapsedTime * 0.22
          innerHaloMesh.rotation.y = elapsedTime * 0.12

          // Dynamic Pulsing Core Glow & Real-Time Light Shift
          pearlGlassMat.emissiveIntensity = 0.58 + Math.sin(elapsedTime * 1.1) * 0.08
          innerLight.intensity = 2.2 + Math.sin(elapsedTime * 1.1) * 0.25

          // Subtle Specular Light Shift with Cursor Position
          keyLight.position.x = 2.8 + mouseDampedRef.current.x * 0.8
          keyLight.position.y = 4.0 - mouseDampedRef.current.y * 0.6
        }

        renderer.render(scene, camera)
      }

      animate()

      return () => {
        isDisposed = true
        window.removeEventListener('resize', handleResize)
        if (animId) cancelAnimationFrame(animId)
        if (renderer) renderer.dispose()
      }
    } catch (err) {
      console.warn('Three.js initialization fallback:', err)
      setWebGLFailed(true)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="hero-3d-stage"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Interactive 3D Architectural Luminaire"
    >
      {!webGLFailed ? (
        <canvas ref={canvasRef} className="hero-3d-canvas" />
      ) : (
        <div className="hero-3d-fallback">
          <img
            src="/images/products/slim-panel-round.png"
            alt="Pearl Lighting Luminaire"
            className="fallback-img"
          />
        </div>
      )}

      {/* Atmospheric Multi-Layer Soft Light Spill */}
      <div className="hero-3d-light-spill" aria-hidden="true"></div>
      <div className="hero-3d-aurora-glow" aria-hidden="true"></div>

      {/* Spatial Stage Interactive Hint */}
      <div className="hero-3d-interactive-badge" aria-hidden="true">
        <span className="badge-pulse-dot"></span>
        <span className="badge-text">INTERACTIVE 3D LUMINAIRE</span>
      </div>

      <style>{`
        .hero-3d-stage {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
        }

        .hero-3d-canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
          outline: none;
          position: relative;
          z-index: 2;
        }

        .hero-3d-light-spill {
          position: absolute;
          inset: 8%;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(255, 230, 195, 0.42) 0%, rgba(247, 244, 237, 0) 68%);
          pointer-events: none;
          z-index: 0;
          filter: blur(50px);
          animation: ambientBreathe 7s ease-in-out infinite alternate;
        }

        .hero-3d-aurora-glow {
          position: absolute;
          width: 320px;
          height: 320px;
          top: 25%;
          left: 30%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(198, 154, 82, 0.22) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          filter: blur(40px);
        }

        .hero-3d-interactive-badge {
          position: absolute;
          bottom: 1.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.42rem 0.95rem;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(198, 154, 82, 0.35);
          border-radius: 999px;
          z-index: 3;
          pointer-events: none;
          box-shadow: 0 4px 16px rgba(120, 100, 70, 0.08);
          transition: opacity 0.3s ease;
        }

        .badge-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C69A52;
          box-shadow: 0 0 8px rgba(198, 154, 82, 0.8);
          animation: pulseDot 2.4s ease-in-out infinite;
        }

        .badge-text {
          font-family: var(--font-mono, monospace);
          font-size: 0.64rem;
          letter-spacing: 0.18em;
          color: #5E5A53;
          font-weight: 500;
          text-transform: uppercase;
        }

        @keyframes ambientBreathe {
          0% {
            opacity: 0.75;
            transform: scale(0.96);
          }
          100% {
            opacity: 1;
            transform: scale(1.06);
          }
        }

        @keyframes pulseDot {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.35);
          }
        }

        .hero-3d-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fallback-img {
          max-width: 75%;
          max-height: 75%;
          object-fit: contain;
          filter: drop-shadow(0 20px 40px rgba(120, 100, 70, 0.2));
        }
      `}</style>
    </div>
  )
}
