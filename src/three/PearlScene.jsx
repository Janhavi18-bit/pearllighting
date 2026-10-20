import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { createPearlPendant } from './PearlPendant'

export default function PearlScene({ scrollProgressRef }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const underglowRef = useRef(null)
  const mouseTargetRef = useRef({ x: 0, y: 0 })
  const mouseDampedRef = useRef({ x: 0, y: 0 })
  const [webGLFailed, setWebGLFailed] = useState(false)

  // Mouse interaction: Desktop only, smoothly damped
  const handleMouseMove = (e) => {
    // Skip pointer parallax on touch/mobile devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    // Normalized coordinates [-1, 1]
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    mouseTargetRef.current = { x, y }
  }

  const handleMouseLeave = () => {
    // Smoothly return toward natural orientation
    mouseTargetRef.current = { x: 0, y: 0 }
  }

  // Initialize Three.js scene & animation loop
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    let renderer
    let animId
    let pendantInstance
    let isDisposed = false

    // Check accessibility reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    try {
      // 1. Scene
      const scene = new THREE.Scene()

      // 2. Camera Setup (Controlled perspective)
      const initialWidth = containerRef.current.clientWidth || 500
      const initialHeight = containerRef.current.clientHeight || 400
      const camera = new THREE.PerspectiveCamera(36, initialWidth / initialHeight, 0.1, 50)
      const baseCamZ = window.innerWidth <= 640 ? 3.5 : 3.25
      camera.position.set(0, 0.08, baseCamZ)

      // 3. Renderer with optimized DPR for desktop vs mobile
      const isMobile = window.innerWidth <= 768
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

      // 4. Luxury Warm Architectural Lighting Setup
      // Soft warm ambient fill matching the ivory room
      const ambientLight = new THREE.AmbientLight('#f5ebe0', 0.95)
      scene.add(ambientLight)

      // Key Warm Directional Light (top-right frontal)
      const keyLight = new THREE.DirectionalLight('#fff8f0', 1.25)
      keyLight.position.set(3, 4.2, 3.5)
      scene.add(keyLight)

      // Warm Secondary Rim Light (back-left)
      const rimLight = new THREE.DirectionalLight('#eddcc9', 0.55)
      rimLight.position.set(-3, -1, -2.5)
      scene.add(rimLight)

      // Warm Ceiling Downlight Accent
      const downlight = new THREE.PointLight('#ffe5c4', 0.9, 5)
      downlight.position.set(0, 2.2, 0.6)
      scene.add(downlight)

      // 5. Instantiate Pearl Pendant
      pendantInstance = createPearlPendant()
      scene.add(pendantInstance.group)

      // 6. Responsive Resize Handling
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries[0] || isDisposed) return
        const { width, height } = entries[0].contentRect
        if (width === 0 || height === 0) return

        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
      })
      resizeObserver.observe(containerRef.current)

      // 7. Cinematic Render Loop with Damping & Camera Choreography
      const startTime = performance.now()

      const animate = () => {
        if (isDisposed) return
        const elapsedTime = (performance.now() - startTime) * 0.001
        const currentProgress = scrollProgressRef?.current ?? 0

        // Damped pointer coordinates (prevents abrupt jumping)
        mouseDampedRef.current.x = THREE.MathUtils.lerp(
          mouseDampedRef.current.x,
          mouseTargetRef.current.x,
          0.05
        )
        mouseDampedRef.current.y = THREE.MathUtils.lerp(
          mouseDampedRef.current.y,
          mouseTargetRef.current.y,
          0.05
        )

        // Subtle Camera Movement based on scroll & pointer parallax
        const targetCamZ = baseCamZ - currentProgress * 0.32 // Moves slightly closer
        const targetCamX = mouseDampedRef.current.x * 0.035 + currentProgress * 0.08
        const targetCamY = 0.08 - mouseDampedRef.current.y * 0.025 + currentProgress * 0.12

        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.055)
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.055)
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.055)
        camera.lookAt(0, currentProgress * 0.3, 0)

        // Update Pendant (Idle + Damped Pointer + Scroll Progress)
        pendantInstance.update(
          elapsedTime,
          mouseDampedRef.current,
          currentProgress,
          prefersReducedMotion
        )

        // Render Scene
        renderer.render(scene, camera)

        // Sync atmospheric underglow with lamp scroll & intensity
        if (underglowRef.current) {
          const underglowShiftX = (currentProgress * 40)
          const underglowShiftY = -(currentProgress * 55)
          const underglowOpacity = Math.max(0.16 * (1 - currentProgress * 0.9), 0.02)
          underglowRef.current.style.transform = `translate(${underglowShiftX}px, ${underglowShiftY}px)`
          underglowRef.current.style.opacity = underglowOpacity
        }

        animId = requestAnimationFrame(animate)
      }

      animate()

      // Cleanup on unmount
      return () => {
        isDisposed = true
        cancelAnimationFrame(animId)
        resizeObserver.disconnect()
        if (pendantInstance) {
          pendantInstance.dispose()
          scene.remove(pendantInstance.group)
        }
        renderer.dispose()
      }
    } catch (err) {
      console.warn('WebGL initialization error, falling back to CSS presentation:', err)
      setWebGLFailed(true)
    }
  }, [scrollProgressRef])

  // Graceful CSS Fallback if WebGL is unavailable
  const renderFallback = () => (
    <div className="pearl-css-fallback" aria-label="Pearl Pendant fallback display">
      <div className="fallback-wire"></div>
      <div className="fallback-cap"></div>
      <div className="fallback-bloom"></div>
      <div className="fallback-orb">
        <div className="fallback-highlight"></div>
      </div>
      <div className="fallback-equator"></div>
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="pearl-scene-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Interactive 3D Pearl Pendant"
    >
      {/* Background Soft Atmospheric Lighting Bloom */}
      <div ref={underglowRef} className="canvas-underglow" aria-hidden="true"></div>

      {webGLFailed ? (
        renderFallback()
      ) : (
        <canvas ref={canvasRef} className="pearl-webgl-canvas" />
      )}

      <style>{`
        .pearl-scene-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .pearl-webgl-canvas {
          width: 100%;
          height: 100%;
          display: block;
          outline: none;
          touch-action: pan-y;
        }

        .canvas-underglow {
          position: absolute;
          width: clamp(240px, 36vw, 380px);
          height: clamp(240px, 36vw, 380px);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(198, 154, 82, 0.18) 0%, rgba(216, 184, 117, 0.05) 50%, transparent 75%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
          transition: opacity 0.4s ease;
        }

        /* Fallback */
        .pearl-css-fallback {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fallback-wire {
          position: absolute;
          top: -200px;
          bottom: 50%;
          width: 1px;
          background: linear-gradient(180deg, rgba(203, 187, 163, 0) 0%, rgba(203, 187, 163, 0.5) 100%);
        }

        .fallback-cap {
          position: absolute;
          top: calc(50% - 58px);
          width: 16px;
          height: 6px;
          background: var(--champagne-gold);
        }

        .fallback-bloom {
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(243, 237, 226, 0.25) 0%, transparent 70%);
          filter: blur(25px);
        }

        .fallback-orb {
          position: relative;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, #ffffff 0%, #ede3d2 40%, #b39f83 80%, #544431 100%);
          box-shadow: 0 0 45px rgba(243, 237, 226, 0.4);
        }

        .fallback-highlight {
          position: absolute;
          top: 18%;
          left: 22%;
          width: 28%;
          height: 20%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          transform: rotate(-30deg);
        }

        .fallback-equator {
          position: absolute;
          width: 112px;
          height: 112px;
          border-radius: 50%;
          border: 1px solid rgba(229, 218, 201, 0.2);
        }
      `}</style>
    </div>
  )
}
