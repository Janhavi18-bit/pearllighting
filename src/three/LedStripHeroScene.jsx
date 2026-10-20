import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

/**
 * LedStripHeroScene - Authentic 3D Spatial Presentation of Pearl Lighting's ROPE LIGHT
 * 5-Layer Image-Based 3D Illusion:
 * - LAYER 1: Ambient environment (responsive, gentle lighting)
 * - LAYER 2: Rope Light Reel (spool, wound rope, spoke wheel, 3/4 perspective depth)
 * - LAYER 3: Loose Rope Light Strip in Foreground (z-offset, enhanced parallax movement)
 * - LAYER 4: Warm light glow / illumination (sharp product + soft surrounding light spill)
 * - LAYER 5: Soft contact shadow (realistic ground shadow following product silhouette)
 *
 * Mouse Interaction:
 * - Subtle 3D tilt: max X ±4°, max Y ±6°
 * - Inverted translation parallax: mouse LEFT -> product RIGHT
 * - Foreground/background depth separation: foreground strip shifts more than the reel
 * - Floating levitation & smooth scroll choreography
 */
export default function LedStripHeroScene({ scrollProgressRef }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const mouseTargetRef = useRef({ x: 0, y: 0 })
  const mouseDampedRef = useRef({ x: 0, y: 0 })
  const [webGLFailed, setWebGLFailed] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Mouse movement parallax (desktop only)
  const handleMouseMove = (e) => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    // Normalized coordinates [-1, 1]
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

      // 2. Camera Setup (Perspective camera with architectural focal length)
      const initialWidth = containerRef.current.clientWidth || 560
      const initialHeight = containerRef.current.clientHeight || 440
      const camera = new THREE.PerspectiveCamera(32, initialWidth / initialHeight, 0.1, 50)
      const isMobile = window.innerWidth <= 768
      const baseCamZ = isMobile ? 4.3 : 3.8
      camera.position.set(0, 0, baseCamZ)

      // 3. Renderer with high performance settings and ACESFilmic tone mapping
      const maxDpr = isMobile ? 1.5 : 2.0
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      })
      renderer.setSize(initialWidth, initialHeight, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05

      // 4. Lighting (Warm architectural illumination)
      const ambientLight = new THREE.AmbientLight('#FFF8F0', 1.0)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight('#FFF2DC', 1.1)
      keyLight.position.set(2.0, 3.5, 3.0)
      scene.add(keyLight)

      // Soft point light simulating emission from the rope itself
      const ropeEmitterLight = new THREE.PointLight('#FFE2A3', 1.2, 7)
      ropeEmitterLight.position.set(0, 0.1, 0.9)
      scene.add(ropeEmitterLight)

      // 5. Texture Loader
      const textureLoader = new THREE.TextureLoader()

      // 6. Object Hierarchy: Root -> Layers
      const rootGroup = new THREE.Group()
      scene.add(rootGroup)

      // LAYER 5: Soft Contact Ground Shadow (Ground plane)
      let shadowMesh = null
      textureLoader.load(
        '/images/products/rope-light-hero-shadow.png',
        (shadowTex) => {
          if (isDisposed) return
          shadowTex.colorSpace = THREE.SRGBColorSpace
          const shadowGeo = new THREE.PlaneGeometry(3.6, 2.2)
          const shadowMat = new THREE.MeshBasicMaterial({
            map: shadowTex,
            transparent: true,
            opacity: 0.72,
            depthWrite: false,
          })
          shadowMesh = new THREE.Mesh(shadowGeo, shadowMat)
          shadowMesh.rotation.x = -Math.PI / 2.3
          shadowMesh.position.set(0, -1.05, -0.2)
          rootGroup.add(shadowMesh)
        }
      )

      // LAYER 4: Soft Warm Ambient Spill (behind product, delicate light falloff)
      const haloCanvas = document.createElement('canvas')
      haloCanvas.width = 256
      haloCanvas.height = 256
      const hctx = haloCanvas.getContext('2d')
      const hgrad = hctx.createRadialGradient(128, 128, 10, 128, 128, 124)
      hgrad.addColorStop(0, 'rgba(255, 230, 160, 0.20)')
      hgrad.addColorStop(0.35, 'rgba(235, 195, 110, 0.09)')
      hgrad.addColorStop(0.75, 'rgba(216, 172, 92, 0.02)')
      hgrad.addColorStop(1, 'rgba(247, 244, 237, 0)')
      hctx.fillStyle = hgrad
      hctx.fillRect(0, 0, 256, 256)
      const haloTexture = new THREE.CanvasTexture(haloCanvas)

      const haloGeo = new THREE.PlaneGeometry(4.2, 4.2)
      const haloMat = new THREE.MeshBasicMaterial({
        map: haloTexture,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      })
      const haloMesh = new THREE.Mesh(haloGeo, haloMat)
      haloMesh.position.set(0, 0.05, -0.25)
      rootGroup.add(haloMesh)

      // Main Product Floating Container (carries the 3D tilt & perspective)
      const productContainer = new THREE.Group()
      rootGroup.add(productContainer)

      // Initial 3/4 perspective orientation (showing top surface & cylindrical depth)
      productContainer.rotation.x = 0.06
      productContainer.rotation.y = -0.04

      // Mesh dimensions (Aspect ratio 600x590 ~ 1.017)
      const meshW = 2.7
      const meshH = 2.7 * (590 / 600)

      // LAYER 2: Rope Light Reel (Spool, Top spoke wheel, cylindrical body, bottom rim)
      let reelMesh = null
      textureLoader.load(
        '/images/products/rope-light-hero-reel.png',
        (reelTex) => {
          if (isDisposed) return
          reelTex.colorSpace = THREE.SRGBColorSpace
          reelTex.generateMipmaps = true
          reelTex.minFilter = THREE.LinearMipmapLinearFilter

          const reelGeo = new THREE.PlaneGeometry(meshW, meshH)
          const reelMat = new THREE.MeshBasicMaterial({
            map: reelTex,
            transparent: true,
            depthWrite: false,
          })
          reelMesh = new THREE.Mesh(reelGeo, reelMat)
          reelMesh.position.set(0, 0.02, -0.05)
          productContainer.add(reelMesh)
          setIsLoaded(true)
        },
        undefined,
        (err) => {
          console.warn('Fallback to full product texture:', err)
          textureLoader.load('/images/products/rope-light-hero-full.png', (fullTex) => {
            if (isDisposed) return
            fullTex.colorSpace = THREE.SRGBColorSpace
            const fullGeo = new THREE.PlaneGeometry(meshW, meshH)
            const fullMat = new THREE.MeshBasicMaterial({
              map: fullTex,
              transparent: true,
              depthWrite: false,
            })
            reelMesh = new THREE.Mesh(fullGeo, fullMat)
            productContainer.add(reelMesh)
            setIsLoaded(true)
          })
        }
      )

      // LAYER 3: Foreground Loose Rope Light Strip (Closer on Z, enhanced parallax)
      let loopsMesh = null
      textureLoader.load(
        '/images/products/rope-light-hero-loops.png',
        (loopsTex) => {
          if (isDisposed) return
          loopsTex.colorSpace = THREE.SRGBColorSpace
          loopsTex.generateMipmaps = true
          loopsTex.minFilter = THREE.LinearMipmapLinearFilter

          const loopsGeo = new THREE.PlaneGeometry(meshW, meshH)
          const loopsMat = new THREE.MeshBasicMaterial({
            map: loopsTex,
            transparent: true,
            depthWrite: false,
          })
          loopsMesh = new THREE.Mesh(loopsGeo, loopsMat)
          // Positioned closer to viewer on Z-axis (+0.24) for stereoscopic physical depth
          loopsMesh.position.set(0, 0.02, 0.24)
          loopsMesh.scale.setScalar(1.02)
          productContainer.add(loopsMesh)
        }
      )

      // 7. Resize Observer
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries[0] || isDisposed) return
        const { width, height } = entries[0].contentRect
        if (width === 0 || height === 0) return

        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
      })
      resizeObserver.observe(containerRef.current)

      // 8. Animation & Cinematic Parallax Loop
      const startTime = performance.now()
      const maxRotX = 4 * (Math.PI / 180) // ±4 degrees max tilt
      const maxRotY = 6 * (Math.PI / 180) // ±6 degrees max tilt

      const animate = () => {
        if (isDisposed) return
        const elapsedTime = (performance.now() - startTime) * 0.001
        const scrollProgress = scrollProgressRef?.current ?? 0

        // Damped Mouse Coordinates (smooth exponential lerp 0.055 for luxurious heavy inertia)
        mouseDampedRef.current.x = THREE.MathUtils.lerp(
          mouseDampedRef.current.x,
          mouseTargetRef.current.x,
          0.055
        )
        mouseDampedRef.current.y = THREE.MathUtils.lerp(
          mouseDampedRef.current.y,
          mouseTargetRef.current.y,
          0.055
        )

        const mx = mouseDampedRef.current.x
        const my = mouseDampedRef.current.y

        // Gentle Harmonic Floating Levitation
        const floatY = prefersReducedMotion ? 0 : Math.sin(elapsedTime * 1.35) * 0.035
        const floatTilt = prefersReducedMotion ? 0 : Math.sin(elapsedTime * 0.85) * 0.008

        // Product Container 3D Tilt:
        // subtle 3/4 base + cursor responsive rotation within ±4° X and ±6° Y
        productContainer.rotation.x = 0.06 - my * maxRotX
        productContainer.rotation.y = -0.04 + mx * maxRotY + floatTilt
        productContainer.position.y = floatY

        // Subtly shift product in opposition to mouse:
        // mouse moves LEFT -> product shifts slightly RIGHT (-mx)
        // mouse moves RIGHT -> product shifts slightly LEFT (-mx)
        productContainer.position.x = -mx * 0.06

        // LAYER SEPARATION (FOREGROUND / BACKGROUND PARALLAX):
        // The loose foreground strip shifts MORE than the reel, producing unmistakable 3D depth!
        if (loopsMesh) {
          loopsMesh.position.x = -mx * 0.12
          loopsMesh.position.y = 0.02 + my * 0.08
          loopsMesh.position.z = 0.24 + my * 0.05
        }

        if (reelMesh) {
          reelMesh.position.x = -mx * 0.03
          reelMesh.position.y = 0.02 + my * 0.02
        }

        // Contact Floor Shadow responds dynamically to levitation and perspective
        if (shadowMesh) {
          const shadowScale = 1.0 - floatY * 0.85
          shadowMesh.scale.set(shadowScale, shadowScale, 1.0)
          shadowMesh.position.x = -mx * 0.05
          shadowMesh.position.z = -0.2 + my * 0.04
        }

        // Ambient Halo moves the least (Layer 1)
        haloMesh.position.x = -mx * 0.02
        haloMesh.position.y = 0.05 + my * 0.02

        // Rope Light Emitter Light gently breathes
        ropeEmitterLight.intensity = 1.2 + Math.sin(elapsedTime * 2.0) * 0.12
        ropeEmitterLight.position.x = -mx * 0.15
        ropeEmitterLight.position.y = 0.1 + my * 0.15

        // SCROLL CHOREOGRAPHY:
        // As visitor scrolls, product slowly moves backward (-z) and upward (+y) into showroom space
        const scrollLift = scrollProgress * 0.55
        const scrollDepth = -scrollProgress * 0.85
        const scrollScale = Math.max(1.0 - scrollProgress * 0.14, 0.85)
        rootGroup.position.y = scrollLift
        rootGroup.position.z = scrollDepth
        rootGroup.scale.setScalar(scrollScale)

        // Smoothly fade out as transitioning into Story section
        const fadeOpacity = Math.max(1 - scrollProgress * 1.25, 0)
        if (reelMesh?.material) reelMesh.material.opacity = fadeOpacity
        if (loopsMesh?.material) loopsMesh.material.opacity = fadeOpacity
        if (shadowMesh?.material) shadowMesh.material.opacity = 0.72 * fadeOpacity
        haloMesh.material.opacity = 0.7 * fadeOpacity

        // Render Frame
        renderer.render(scene, camera)
        animId = requestAnimationFrame(animate)
      }

      animate()

      // Cleanup on unmount
      return () => {
        isDisposed = true
        cancelAnimationFrame(animId)
        resizeObserver.disconnect()
        renderer.dispose()
      }
    } catch (err) {
      console.warn('WebGL init error, falling back to CSS 3D presentation:', err)
      setWebGLFailed(true)
    }
  }, [scrollProgressRef])

  // High-Quality CSS 3D Fallback with clean transparent layers
  const renderFallback = () => (
    <div
      className="rope-css-fallback"
      style={{
        transform: `perspective(900px) rotateX(${(-mouseDampedRef.current.y * 4).toFixed(2)}deg) rotateY(${(mouseDampedRef.current.x * 6).toFixed(2)}deg)`,
      }}
    >
      <div className="rope-fallback-shadow"></div>
      <img
        src="/images/products/rope-light-hero-reel.png"
        alt="Pearl Lighting Rope Light Reel"
        className="rope-fallback-reel"
        loading="eager"
      />
      <img
        src="/images/products/rope-light-hero-loops.png"
        alt=""
        className="rope-fallback-loops"
        aria-hidden="true"
        style={{
          transform: `translate(${-mouseDampedRef.current.x * 10}px, ${mouseDampedRef.current.y * 8}px)`,
        }}
      />
    </div>
  )

  return (
    <div
      ref={containerRef}
      className={`rope-light-hero-root ${isLoaded ? 'is-loaded' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Architectural Rope Light 3D Presentation"
    >
      {webGLFailed ? (
        renderFallback()
      ) : (
        <canvas ref={canvasRef} className="rope-hero-canvas" />
      )}

      <style>{`
        .rope-light-hero-root {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          user-select: none;
        }

        .rope-light-hero-root:active {
          cursor: grabbing;
        }

        .rope-hero-canvas {
          width: 100% !important;
          height: 100% !important;
          display: block;
          outline: none;
          pointer-events: none;
          z-index: 2;
        }

        /* CSS 3D Fallback Stage */
        .rope-css-fallback {
          position: relative;
          width: clamp(260px, 40vw, 420px);
          height: clamp(260px, 40vw, 420px);
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out;
        }

        .rope-fallback-reel {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
          z-index: 2;
          animation: ropeFloat 5s ease-in-out infinite;
        }

        .rope-fallback-loops {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          z-index: 3;
          pointer-events: none;
          transition: transform 0.15s ease-out;
        }

        .rope-fallback-shadow {
          position: absolute;
          bottom: 2%;
          left: 50%;
          transform: translateX(-50%);
          width: 78%;
          height: 22%;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(40, 30, 20, 0.32) 0%, rgba(140, 105, 60, 0.1) 50%, transparent 75%);
          filter: blur(14px);
          z-index: 1;
        }

        @keyframes ropeFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
      `}</style>
    </div>
  )
}
