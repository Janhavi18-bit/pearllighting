import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

/**
 * FestiveGoldenHeroCanvas
 *
 * Cinematic 3D Hero Visual for Pearl Lighting Festive Collection:
 * - Single main golden-light photograph mapped to an architectural plane with subtle 3D depth and parallax.
 * - Flowing golden ribbon of warm light gently undulating across 3D space.
 * - Delicate, luminous stardust particles drifting in warm champagne amber light.
 * - Highly responsive, smooth 60fps, lightweight, with complete WebGL cleanup.
 */
export default function FestiveGoldenHeroCanvas({
  imageSrc = '/images/diwali/diwali-golden-cluster-lights.png',
  className = ''
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [webGLFailed, setWebGLFailed] = useState(false)

  useEffect(() => {
    function isWebGLAvailable() {
      try {
        const test = document.createElement('canvas')
        return !!(
          window.WebGLRenderingContext &&
          (test.getContext('webgl2') || test.getContext('webgl'))
        )
      } catch {
        return false
      }
    }

    if (!isWebGLAvailable()) {
      setWebGLFailed(true)
      return
    }

    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let renderer
    let animId
    let isDisposed = false
    let isVisible = true

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.setClearColor(0x000000, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
    } catch {
      setWebGLFailed(true)
      return
    }

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    )
    camera.position.set(0, 0, 7.2)

    // Lighting setup for warm architectural glow
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.1)
    scene.add(ambientLight)

    const warmPointLight = new THREE.PointLight(0xffbe6b, 2.2, 18)
    warmPointLight.position.set(1.5, 1.8, 3.5)
    scene.add(warmPointLight)

    const champagneFillLight = new THREE.DirectionalLight(0xfcedc8, 0.9)
    champagneFillLight.position.set(-3, 2, 4)
    scene.add(champagneFillLight)

    // Root group for subtle mouse parallax
    const sceneRoot = new THREE.Group()
    scene.add(sceneRoot)

    // ─────────────────────────────────────────────────────────────
    // 1. MAIN GOLDEN PHOTOGRAPH (Single Hero Visual with 3D Depth)
    // ─────────────────────────────────────────────────────────────
    const planeGroup = new THREE.Group()
    sceneRoot.add(planeGroup)

    const textureLoader = new THREE.TextureLoader()
    let imageMesh = null

    textureLoader.load(
      imageSrc,
      (texture) => {
        if (isDisposed) return
        texture.generateMipmaps = true
        texture.minFilter = THREE.LinearMipmapLinearFilter
        texture.magFilter = THREE.LinearFilter

        // Calculate aspect ratio
        const img = texture.image
        const aspect = img ? img.width / img.height : 1.33
        const planeHeight = 4.4
        const planeWidth = planeHeight * aspect

        // Subtle curved geometry to give authentic 3D spatial depth
        const planeGeo = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 24)
        const pos = planeGeo.attributes.position
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i)
          const y = pos.getY(i)
          // Gentle concave bowl curve for luxury architectural stage effect
          const zCurve = -(x * x * 0.02 + y * y * 0.015)
          pos.setZ(i, zCurve)
        }
        planeGeo.computeVertexNormals()

        const planeMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.28,
          metalness: 0.12,
          emissive: new THREE.Color(0x3a2408),
          emissiveIntensity: 0.22,
          transparent: true,
          opacity: 0.96
        })

        imageMesh = new THREE.Mesh(planeGeo, planeMat)
        imageMesh.position.set(0.6, 0.1, -0.4)
        planeGroup.add(imageMesh)
      },
      undefined,
      () => {
        // Fallback on texture error
      }
    )

    // ─────────────────────────────────────────────────────────────
    // 2. FLOWING GOLDEN RIBBON OF LIGHT
    // ─────────────────────────────────────────────────────────────
    const ribbonSegments = 160
    const ribbonWidth = 0.22
    const ribbonGeometry = new THREE.BufferGeometry()

    // 3D spline curve defining the flowing ribbon path around the hero
    const splinePoints = [
      new THREE.Vector3(-4.8, -2.1, 1.2),
      new THREE.Vector3(-2.8, -1.0, 1.6),
      new THREE.Vector3(-1.0, 0.4, 1.8),
      new THREE.Vector3(0.8, -0.3, 1.4),
      new THREE.Vector3(2.4, 0.9, 1.7),
      new THREE.Vector3(3.9, -0.2, 1.1),
      new THREE.Vector3(5.0, 1.2, 0.4)
    ]
    const curve = new THREE.CatmullRomCurve3(splinePoints)

    const vertices = new Float32Array((ribbonSegments + 1) * 2 * 3)
    const uvs = new Float32Array((ribbonSegments + 1) * 2 * 2)
    const indices = []

    for (let i = 0; i < ribbonSegments; i++) {
      const a = i * 2
      const b = i * 2 + 1
      const c = (i + 1) * 2
      const d = (i + 1) * 2 + 1
      indices.push(a, b, c)
      indices.push(b, d, c)
    }

    ribbonGeometry.setIndex(indices)
    ribbonGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(vertices, 3)
    )
    ribbonGeometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))

    // Dynamic procedural glow texture for ribbon
    const ribbonCanvas = document.createElement('canvas')
    ribbonCanvas.width = 512
    ribbonCanvas.height = 64
    const rCtx = ribbonCanvas.getContext('2d')
    const rGrad = rCtx.createLinearGradient(0, 0, 512, 0)
    rGrad.addColorStop(0, 'rgba(218, 165, 32, 0)')
    rGrad.addColorStop(0.2, 'rgba(255, 215, 120, 0.75)')
    rGrad.addColorStop(0.5, 'rgba(255, 245, 210, 0.98)')
    rGrad.addColorStop(0.8, 'rgba(235, 185, 75, 0.8)')
    rGrad.addColorStop(1, 'rgba(198, 154, 82, 0)')
    rCtx.fillStyle = rGrad
    rCtx.fillRect(0, 0, 512, 64)

    // Feather vertical edges of ribbon
    const vGrad = rCtx.createLinearGradient(0, 0, 0, 64)
    vGrad.addColorStop(0, 'rgba(0,0,0,0.85)')
    vGrad.addColorStop(0.5, 'rgba(0,0,0,0)')
    vGrad.addColorStop(1, 'rgba(0,0,0,0.85)')
    rCtx.globalCompositeOperation = 'destination-out'
    rCtx.fillStyle = vGrad
    rCtx.fillRect(0, 0, 512, 64)

    const ribbonTexture = new THREE.CanvasTexture(ribbonCanvas)
    ribbonTexture.wrapS = THREE.RepeatWrapping
    ribbonTexture.wrapT = THREE.ClampToEdgeWrapping

    const ribbonMaterial = new THREE.MeshBasicMaterial({
      map: ribbonTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    })

    const ribbonMesh = new THREE.Mesh(ribbonGeometry, ribbonMaterial)
    sceneRoot.add(ribbonMesh)

    // Function to recompute ribbon vertices with flowing animated wave
    function updateRibbon(time) {
      const posAttr = ribbonGeometry.attributes.position
      const uvAttr = ribbonGeometry.attributes.uv
      const vArr = posAttr.array
      const uArr = uvAttr.array

      for (let i = 0; i <= ribbonSegments; i++) {
        const u = i / ribbonSegments
        const waveShift = Math.sin(u * Math.PI * 4 - time * 1.4) * 0.12
        const waveShiftZ = Math.cos(u * Math.PI * 3 + time * 1.1) * 0.15

        const pt = curve.getPoint(u)
        const tangent = curve.getTangent(u).normalize()
        const up = new THREE.Vector3(0, 1, 0)
        const normal = new THREE.Vector3()
          .crossVectors(tangent, up)
          .normalize()
        const binormal = new THREE.Vector3()
          .crossVectors(tangent, normal)
          .normalize()

        const halfW = ribbonWidth * (0.6 + 0.4 * Math.sin(u * Math.PI))

        const p1 = new THREE.Vector3()
          .copy(pt)
          .addScaledVector(binormal, halfW)
          .add(new THREE.Vector3(0, waveShift, waveShiftZ))

        const p2 = new THREE.Vector3()
          .copy(pt)
          .addScaledVector(binormal, -halfW)
          .add(new THREE.Vector3(0, waveShift, waveShiftZ))

        const idx = i * 6
        vArr[idx] = p1.x
        vArr[idx + 1] = p1.y
        vArr[idx + 2] = p1.z

        vArr[idx + 3] = p2.x
        vArr[idx + 4] = p2.y
        vArr[idx + 5] = p2.z

        const uvIdx = i * 4
        const shiftedU = (u - time * 0.18) % 1.0
        uArr[uvIdx] = shiftedU
        uArr[uvIdx + 1] = 0
        uArr[uvIdx + 2] = shiftedU
        uArr[uvIdx + 3] = 1
      }

      posAttr.needsUpdate = true
      uvAttr.needsUpdate = true
    }

    // ─────────────────────────────────────────────────────────────
    // 3. DELICATE GOLDEN PARTICLES (Luminous Floating Embers)
    // ─────────────────────────────────────────────────────────────
    const particleCount = 140
    const particleGeo = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleBasePositions = []
    const particleSpeeds = []

    for (let i = 0; i < particleCount; i++) {
      const bx = (Math.random() - 0.4) * 11
      const by = (Math.random() - 0.5) * 6
      const bz = (Math.random() - 0.2) * 4.5
      particleBasePositions.push({ x: bx, y: by, z: bz })
      particleSpeeds.push({
        freq: 0.6 + Math.random() * 1.2,
        driftX: (Math.random() - 0.5) * 0.002,
        driftY: 0.003 + Math.random() * 0.005,
        amp: 0.1 + Math.random() * 0.2
      })

      particlePositions[i * 3] = bx
      particlePositions[i * 3 + 1] = by
      particlePositions[i * 3 + 2] = bz
    }

    particleGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    )

    // Soft circular particle sprite
    const pCanvas = document.createElement('canvas')
    pCanvas.width = 64
    pCanvas.height = 64
    const pCtx = pCanvas.getContext('2d')
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32)
    pGrad.addColorStop(0, 'rgba(255, 245, 215, 1)')
    pGrad.addColorStop(0.3, 'rgba(245, 195, 95, 0.75)')
    pGrad.addColorStop(0.7, 'rgba(215, 150, 45, 0.25)')
    pGrad.addColorStop(1, 'rgba(215, 150, 45, 0)')
    pCtx.fillStyle = pGrad
    pCtx.fillRect(0, 0, 64, 64)

    const particleTexture = new THREE.CanvasTexture(pCanvas)

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.28,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.75
    })

    const particles = new THREE.Points(particleGeo, particleMaterial)
    sceneRoot.add(particles)

    // ─────────────────────────────────────────────────────────────
    // 4. MOUSE / POINTER PARALLAX INTERACTION
    // ─────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      mouse.targetX = relX * 2 // -1 to 1
      mouse.targetY = relY * 2
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return
      const w = container.clientWidth
      const h = container.clientHeight
      if (w <= 0 || h <= 0) return

      camera.aspect = w / h
      // Adjust camera distance on narrow mobile displays
      if (w < 768) {
        camera.position.z = 8.5
      } else {
        camera.position.z = 7.2
      }
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
    }

    const resizeObserver = new ResizeObserver(() => handleResize())
    resizeObserver.observe(container)
    handleResize()

    // Visibility handling for performance
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
        })
      },
      { threshold: 0.05 }
    )
    intersectionObserver.observe(container)

    // ─────────────────────────────────────────────────────────────
    // 5. ANIMATION LOOP
    // ─────────────────────────────────────────────────────────────
    const clock = new THREE.Clock()

    const animate = () => {
      if (isDisposed) return
      animId = requestAnimationFrame(animate)

      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      // Smooth damped parallax lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Gentle parallax rotation on scene root
      sceneRoot.rotation.y = mouse.x * 0.12
      sceneRoot.rotation.x = -mouse.y * 0.08
      sceneRoot.position.x = mouse.x * 0.25
      sceneRoot.position.y = -mouse.y * 0.18

      // Gentle floating oscillation on image plane
      if (imageMesh) {
        imageMesh.rotation.z = Math.sin(elapsedTime * 0.5) * 0.015
        imageMesh.position.y = 0.1 + Math.sin(elapsedTime * 0.8) * 0.06
      }

      // Update flowing golden ribbon
      updateRibbon(elapsedTime)

      // Animate delicate particles
      const pArr = particleGeo.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const sp = particleSpeeds[i]
        const bp = particleBasePositions[i]

        bp.y += sp.driftY
        bp.x += sp.driftX
        if (bp.y > 3.4) bp.y = -3.2
        if (bp.x > 5.5) bp.x = -5.5
        if (bp.x < -5.5) bp.x = 5.5

        const wave = Math.sin(elapsedTime * sp.freq + i) * sp.amp
        pArr[i * 3] = bp.x + wave
        pArr[i * 3 + 1] = bp.y
        pArr[i * 3 + 2] = bp.z + Math.cos(elapsedTime * sp.freq) * 0.08
      }
      particleGeo.attributes.position.needsUpdate = true

      // Subtle pulse on warm point light
      warmPointLight.intensity = 2.0 + Math.sin(elapsedTime * 1.5) * 0.35

      renderer.render(scene, camera)
    }

    animate()

    // ─────────────────────────────────────────────────────────────
    // 6. COMPREHENSIVE CLEANUP ON UNMOUNT
    // ─────────────────────────────────────────────────────────────
    return () => {
      isDisposed = true
      cancelAnimationFrame(animId)
      window.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()

      // Geometries & materials disposal
      ribbonGeometry.dispose()
      ribbonMaterial.dispose()
      ribbonTexture.dispose()

      particleGeo.dispose()
      particleMaterial.dispose()
      particleTexture.dispose()

      if (imageMesh) {
        if (imageMesh.geometry) imageMesh.geometry.dispose()
        if (imageMesh.material) {
          if (imageMesh.material.map) imageMesh.material.map.dispose()
          imageMesh.material.dispose()
        }
      }

      scene.clear()
      if (renderer) {
        renderer.dispose()
        renderer.forceContextLoss()
      }
    }
  }, [imageSrc])

  if (webGLFailed) {
    return (
      <div
        className={`as-festive-hero-fallback ${className}`}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={`as-festive-hero-canvas-wrap ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'auto'
        }}
        aria-label="Interactive 3D golden festive lighting installation"
      />
    </div>
  )
}
