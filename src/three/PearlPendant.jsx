import * as THREE from 'three'

/**
 * createPearlPendant
 * Procedurally creates the luxury Pearl Pendant using Three.js physical materials.
 * Includes cinematic mouse damping, idle floating, and scroll-choreographed transformations.
 */
export function createPearlPendant() {
  const group = new THREE.Group()
  group.name = 'PearlPendantRoot'

  // Physical Luxury Materials
  // 1. Mouth-blown diffuse pearl glass
  const pearlMaterial = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#fdfcf8'),
    emissive: new THREE.Color('#ffebd1'),
    emissiveIntensity: 0.44,
    roughness: 0.35,
    metalness: 0.02,
    clearcoat: 0.42,
    clearcoatRoughness: 0.22,
    transmission: 0.58,
    thickness: 0.85,
    ior: 1.48,
  })

  // 2. Hand-finished brushed champagne brass
  const brassMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#cbbba3'),
    roughness: 0.28,
    metalness: 0.88,
  })

  // 3. Dark architectural bronze
  const bronzeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#4d4233'),
    roughness: 0.4,
    metalness: 0.82,
  })

  // 4. Braided suspension cable
  const cableMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#695f50'),
    roughness: 0.55,
    metalness: 0.7,
  })

  // Geometries
  // 1. Thin vertical suspension cable extending towards ceiling
  const cableGeo = new THREE.CylinderGeometry(0.007, 0.007, 4.2, 16)
  const cableMesh = new THREE.Mesh(cableGeo, cableMaterial)
  cableMesh.position.y = 2.6
  group.add(cableMesh)

  // 2. Upper ceiling strain-relief collar
  const collarGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.16, 24)
  const collarMesh = new THREE.Mesh(collarGeo, bronzeMaterial)
  collarMesh.position.y = 0.72
  group.add(collarMesh)

  // 3. Upper brass conical mount
  const finialGeo = new THREE.CylinderGeometry(0.04, 0.075, 0.14, 32)
  const finialMesh = new THREE.Mesh(finialGeo, brassMaterial)
  finialMesh.position.y = 0.58
  group.add(finialMesh)

  // 4. Brass cap resting flush atop the pearl diffuser
  const capGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.045, 48)
  const capMesh = new THREE.Mesh(capGeo, brassMaterial)
  capMesh.position.y = 0.49
  group.add(capMesh)

  // 5. Architectural ring detail above the sphere
  const detailRingGeo = new THREE.TorusGeometry(0.16, 0.016, 16, 48)
  const detailRingMesh = new THREE.Mesh(detailRingGeo, brassMaterial)
  detailRingMesh.position.y = 0.44
  detailRingMesh.rotation.x = Math.PI / 2
  group.add(detailRingMesh)

  // 6. Main Smooth Spherical Pearl Diffuser
  const pearlGeo = new THREE.SphereGeometry(0.48, 64, 64)
  const pearlMesh = new THREE.Mesh(pearlGeo, pearlMaterial)
  pearlMesh.position.y = 0
  group.add(pearlMesh)

  // 7. Architectural equatorial brass ring accent
  const equatorGeo = new THREE.TorusGeometry(0.488, 0.012, 16, 64)
  const equatorMesh = new THREE.Mesh(equatorGeo, brassMaterial)
  equatorMesh.rotation.x = Math.PI / 2
  group.add(equatorMesh)

  // 8. Bottom brass finishing bead
  const beadGeo = new THREE.SphereGeometry(0.028, 24, 24)
  const beadMesh = new THREE.Mesh(beadGeo, brassMaterial)
  beadMesh.position.y = -0.49
  group.add(beadMesh)

  // 9. Internal Warm Point Light radiating from within the diffuser
  const innerLight = new THREE.PointLight('#ffe2be', 2.5, 5.0, 2)
  innerLight.position.set(0, 0, 0)
  group.add(innerLight)

  // Internal damped state values
  const currentPos = new THREE.Vector3(0, 0, 0)
  const currentRot = new THREE.Euler(0, 0, 0)
  let currentScale = 1.0

  /**
   * update
   * Called on every animation frame with smooth damping
   * @param {number} elapsedTime - Total clock elapsed time
   * @param {{ x: number, y: number }} mouse - Damped normalized pointer coords [-1, 1]
   * @param {number} scrollP - Normalized scroll progress [0, 1]
   * @param {boolean} reducedMotion - Whether user prefers reduced motion
   */
  function update(elapsedTime, mouse, scrollP, reducedMotion = false) {
    if (reducedMotion) {
      group.position.set(0, 0, 0)
      group.rotation.set(0, 0, 0)
      group.scale.setScalar(1)
      innerLight.intensity = 2.5
      return
    }

    const p = Math.min(Math.max(scrollP || 0, 0), 1)

    // 1. Idle Animation (Almost imperceptible micro-float and sway)
    const idleY = Math.sin(elapsedTime * 0.65) * 0.022
    const idleRotY = Math.sin(elapsedTime * 0.35) * 0.018
    const idleSwayX = Math.cos(elapsedTime * 0.45) * 0.008

    // 2. Mouse Parallax (Controlled max: X ±4 deg = ~0.07 rad, Y ±6.5 deg = ~0.11 rad)
    const maxRotX = (4 * Math.PI) / 180
    const maxRotY = (6.5 * Math.PI) / 180
    const targetMouseRotX = -Math.max(Math.min(mouse.y || 0, 1), -1) * maxRotX
    const targetMouseRotY = Math.max(Math.min(mouse.x || 0, 1), -1) * maxRotY

    // 3. Scroll-Driven Transformation Curves:
    // 0%: Centered [0, 0, 0], scale 1.0, natural orientation
    // 20%: Slowly rotates, slight upward movement
    // 40%: Moves slightly upward and toward the right, camera closer
    // 60%: Slightly smaller, subtle rotation continues
    // 80%: Transitions toward next content area, atmosphere begins fading
    // 100%: Prepares to transition into next section naturally

    // Lateral displacement curve (centered -> right -> center-right)
    let scrollX = 0
    if (p < 0.45) {
      scrollX = (p / 0.45) * 0.32
    } else if (p < 0.8) {
      scrollX = 0.32 + ((p - 0.45) / 0.35) * 0.16
    } else {
      scrollX = 0.48 - ((p - 0.8) / 0.2) * 0.24
    }

    // Vertical elevation curve
    const scrollY = Math.pow(p, 1.15) * 0.88

    // Rotation progression (gradual and noble, never spinning)
    const scrollRotY = p * 0.95
    const scrollRotX = Math.sin(p * Math.PI * 0.9) * 0.12
    const scrollRotZ = -Math.sin(p * Math.PI) * 0.06

    // Perspective scale down
    const scrollScale = 1.0 - p * 0.18

    // 4. Target composite positions
    const targetX = idleSwayX + (mouse.x || 0) * 0.05 + scrollX
    const targetY = idleY + scrollY
    const targetZ = -p * 0.45

    const targetRotX = idleRotY * 0.15 + targetMouseRotX + scrollRotX
    const targetRotY = idleRotY + targetMouseRotY + scrollRotY
    const targetRotZ = (mouse.x || 0) * -0.03 + scrollRotZ

    // 5. Smooth Damped Lerp (damping factor 0.055 for calm cinematic movement)
    currentPos.x = THREE.MathUtils.lerp(currentPos.x, targetX, 0.055)
    currentPos.y = THREE.MathUtils.lerp(currentPos.y, targetY, 0.055)
    currentPos.z = THREE.MathUtils.lerp(currentPos.z, targetZ, 0.055)
    group.position.copy(currentPos)

    currentRot.x = THREE.MathUtils.lerp(currentRot.x, targetRotX, 0.055)
    currentRot.y = THREE.MathUtils.lerp(currentRot.y, targetRotY, 0.055)
    currentRot.z = THREE.MathUtils.lerp(currentRot.z, targetRotZ, 0.055)
    group.rotation.copy(currentRot)

    currentScale = THREE.MathUtils.lerp(currentScale, scrollScale, 0.055)
    group.scale.setScalar(currentScale)

    // 6. Lighting Response:
    // At beginning: 2.5
    // During main scroll (40% - 60%): increases to ~3.1
    // Near end: softens to ~1.8
    let targetIntensity = 2.5
    if (p <= 0.5) {
      targetIntensity = 2.5 + (p / 0.5) * 0.65 // rises to 3.15
    } else {
      targetIntensity = 3.15 - ((p - 0.5) / 0.5) * 1.35 // lowers to 1.8
    }

    // Subtle idle breathing pulse
    const idlePulse = Math.sin(elapsedTime * 1.3) * 0.15
    innerLight.intensity = THREE.MathUtils.lerp(
      innerLight.intensity,
      targetIntensity + idlePulse,
      0.08
    )

    // Diffuser emissive response to match the light
    pearlMaterial.emissiveIntensity = THREE.MathUtils.lerp(
      pearlMaterial.emissiveIntensity,
      0.38 + (innerLight.intensity - 2.5) * 0.08,
      0.08
    )
  }

  // Cleanup helper
  function dispose() {
    [cableGeo, collarGeo, finialGeo, capGeo, detailRingGeo, pearlGeo, equatorGeo, beadGeo].forEach(
      (g) => g.dispose()
    )
    ;[pearlMaterial, brassMaterial, bronzeMaterial, cableMaterial].forEach((m) => m.dispose())
  }

  return {
    group,
    innerLight,
    update,
    dispose,
  }
}

export default createPearlPendant
