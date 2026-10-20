import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * FestiveTransitionParticleDispersion
 * 
 * Hardware-accelerated 3D Particle Dispersion Engine (Three.js / WebGL):
 * - Spawns 3D glowing golden sparks directly across the bounding geometry of disappearing cards.
 * - Simulates explosive thermal dispersion: sparks ignite, swirl in 3D turbulent vortices,
 *   accelerate upward/outward, and sweep off the screen.
 * - High-performance WebGL Points with additive blending.
 * - Pixel-accurate orthographic projection synchronized with DOM coordinates.
 */
export default function FestiveTransitionParticleDispersion({
  active = false,
  containerRef,
  sourceCardsSelector = '.as-product-card',
  onComplete
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!active || !containerRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!canvas) return

    const containerRect = container.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    if (width <= 0 || height <= 0) return

    // Find all visible source cards to disperse
    const cardElements = container.querySelectorAll(sourceCardsSelector)
    if (!cardElements || cardElements.length === 0) {
      if (onComplete) onComplete()
      return
    }

    // 1. Orthographic Scene Setup (matching DOM container dimensions in pixels)
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      1000
    )
    camera.position.z = 400

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      })
      renderer.setSize(width, height, false)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    } catch (e) {
      console.warn('WebGL init failed for particle dispersion:', e)
      if (onComplete) onComplete()
      return
    }

    // 2. Procedural Glowing Spark Texture
    const createSparkTexture = () => {
      const texCanvas = document.createElement('canvas')
      texCanvas.width = 64
      texCanvas.height = 64
      const ctx = texCanvas.getContext('2d')
      if (!ctx) return null

      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
      grad.addColorStop(0, 'rgba(255, 255, 255, 1.0)')
      grad.addColorStop(0.2, 'rgba(255, 235, 175, 0.95)')
      grad.addColorStop(0.5, 'rgba(242, 183, 68, 0.6)')
      grad.addColorStop(0.8, 'rgba(216, 123, 34, 0.2)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 64, 64)

      const texture = new THREE.CanvasTexture(texCanvas)
      texture.needsUpdate = true
      return texture
    }

    const sparkTexture = createSparkTexture()

    // 3. Generate 3D Spark Particles from Card Geometries
    const particlesData = []
    const particlesCountPerCard = 180

    cardElements.forEach((cardEl) => {
      const cardRect = cardEl.getBoundingClientRect()
      // Skip if off-screen or collapsed
      if (cardRect.width === 0 || cardRect.height === 0) return

      // Convert card position relative to container
      const cardRelLeft = cardRect.left - containerRect.left
      const cardRelTop = cardRect.top - containerRect.top
      const cardW = cardRect.width
      const cardH = cardRect.height

      const cardCenterX = cardRelLeft + cardW / 2
      const cardCenterY = cardRelTop + cardH / 2

      // Three.js Orthographic coordinates (center is 0,0)
      const worldCenterX = cardCenterX - width / 2
      const worldCenterY = -(cardCenterY - height / 2)

      const halfW = cardW / 2
      const halfH = cardH / 2

      for (let i = 0; i < particlesCountPerCard; i++) {
        // Distribute across card surface
        const u = (Math.random() - 0.5) * 2
        const v = (Math.random() - 0.5) * 2

        const px = worldCenterX + u * halfW
        const py = worldCenterY + v * halfH
        const pz = (Math.random() - 0.5) * 60

        // Outward burst velocity + strong upward thermal convection
        const burstFactor = Math.random() * 4 + 2
        const vx = u * burstFactor + (Math.random() - 0.5) * 3
        const vy = Math.random() * 7 + 4.5 // Upward sweep
        const vz = (Math.random() - 0.5) * 6

        // Golden Palette
        const paletteChoice = Math.random()
        let color
        if (paletteChoice < 0.35) {
          color = new THREE.Color('#FFFFFF') // Radiant spark core
        } else if (paletteChoice < 0.75) {
          color = new THREE.Color('#F5C86C') // Warm champagne gold
        } else {
          color = new THREE.Color('#DE8F42') // Amber flame
        }

        particlesData.push({
          pos: new THREE.Vector3(px, py, pz),
          vel: new THREE.Vector3(vx, vy, vz),
          color,
          baseSize: Math.random() * 12 + 6,
          size: Math.random() * 12 + 6,
          alpha: 1.0,
          decay: Math.random() * 0.016 + 0.018,
          curlPhase: Math.random() * Math.PI * 2,
          curlSpeed: Math.random() * 3 + 2,
          liftAccel: Math.random() * 0.18 + 0.12
        })
      }
    })

    const totalParticles = particlesData.length
    if (totalParticles === 0) {
      if (onComplete) onComplete()
      return
    }

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(totalParticles * 3)
    const colors = new Float32Array(totalParticles * 3)
    const sizes = new Float32Array(totalParticles)

    for (let i = 0; i < totalParticles; i++) {
      const p = particlesData[i]
      positions[i * 3] = p.pos.x
      positions[i * 3 + 1] = p.pos.y
      positions[i * 3 + 2] = p.pos.z

      colors[i * 3] = p.color.r
      colors[i * 3 + 1] = p.color.g
      colors[i * 3 + 2] = p.color.b

      sizes[i] = p.baseSize
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Points Material with Additive Blending
    const material = new THREE.PointsMaterial({
      size: 14,
      map: sparkTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 1.0
    })

    const particleSystem = new THREE.Points(geometry, material)
    scene.add(particleSystem)

    // 4. Animation Loop
    let animId
    let startTime = performance.now()
    const totalDuration = 1000 // 1s animation duration
    let isDisposed = false

    const animate = (now) => {
      if (isDisposed) return
      const elapsed = (now - startTime) / 1000

      const posAttr = geometry.attributes.position.array
      const sizeAttr = geometry.attributes.size.array

      let allDead = true

      for (let i = 0; i < totalParticles; i++) {
        const p = particlesData[i]
        p.alpha -= p.decay

        if (p.alpha > 0.01) {
          allDead = false

          // Upward convection and 3D curl drift
          p.vel.y += p.liftAccel
          p.vel.x += Math.sin(elapsed * p.curlSpeed + p.curlPhase) * 0.25
          p.vel.z += Math.cos(elapsed * p.curlSpeed + p.curlPhase) * 0.15

          p.pos.x += p.vel.x
          p.pos.y += p.vel.y
          p.pos.z += p.vel.z

          posAttr[i * 3] = p.pos.x
          posAttr[i * 3 + 1] = p.pos.y
          posAttr[i * 3 + 2] = p.pos.z

          sizeAttr[i] = p.baseSize * Math.max(0, p.alpha)
        } else {
          sizeAttr[i] = 0
        }
      }

      geometry.attributes.position.needsUpdate = true
      geometry.attributes.size.needsUpdate = true
      material.opacity = Math.max(0, 1.0 - (now - startTime) / totalDuration)

      renderer.render(scene, camera)

      if (now - startTime < totalDuration && !allDead) {
        animId = requestAnimationFrame(animate)
      } else {
        if (onComplete) onComplete()
      }
    }

    animId = requestAnimationFrame(animate)

    return () => {
      isDisposed = true
      if (animId) cancelAnimationFrame(animId)
      if (renderer) renderer.dispose()
      if (geometry) geometry.dispose()
      if (material) material.dispose()
      if (sparkTexture) sparkTexture.dispose()
    }
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="as-particle-dispersion-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 40
      }}
    />
  )
}
