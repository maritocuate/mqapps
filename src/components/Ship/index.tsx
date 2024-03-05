import { useLayoutEffect, useMemo, useRef } from 'react'
import { Cone, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import ShipControls from './ShipControls'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'

type Movement = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  [key: string]: boolean
}

type GLTFResult = GLTF & {
  nodes: {
    Chassis_1: THREE.Mesh
    Chassis_2: THREE.Mesh
  }
  materials: {
    BodyPaint: THREE.MeshStandardMaterial
    BodyPaint_Accent: THREE.MeshStandardMaterial
  }
}

export default function Ship() {
  const { materials, scene } = useGLTF('/models/ship.gltf') as GLTFResult

  const orbitShipRef = useRef<THREE.Mesh>(null)
  const shipRef = useRef<THREE.Mesh>(null)
  const fireRef = useRef<THREE.Mesh>(null)

  const acceleration = 0.02
  const deceleration = 0.01

  useLayoutEffect(() => {
    Object.values(materials).forEach(material => {
      material.roughness = 0
    })
    scene.traverse(child => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [materials, scene])

  const movement: Movement = useMemo(
    () => ({
      forward: false,
      backward: false,
      left: false,
      right: false,
    }),
    []
  )

  let speed = 0
  const maxSpeed = 0.4
  const rotationSpeed = 0.05

  useFrame(({ camera }) => {
    if (!shipRef.current || !orbitShipRef.current || !fireRef.current) return

    // Camera movement
    camera.position.setX(orbitShipRef.current.position.x)
    camera.position.setZ(orbitShipRef.current.position.z)
    camera.lookAt(orbitShipRef.current.position)

    // Rotation movement
    if (movement.left) orbitShipRef.current.rotation.y += rotationSpeed
    if (movement.right) orbitShipRef.current.rotation.y -= rotationSpeed

    if (movement.forward) {
      speed = Math.min(speed + acceleration, maxSpeed)
      fireRef.current.visible = true
    } else if (movement.backward) {
      speed = Math.max(speed / 1.5 - acceleration, -maxSpeed)
    } else {
      fireRef.current.visible = false
      const decelerationRate = speed > 0 ? acceleration : -acceleration
      speed = Math.abs(speed) < deceleration ? 0 : speed - decelerationRate
    }

    // Position movement
    const orbitRotationY = orbitShipRef.current.rotation.y
    orbitShipRef.current.position.z -= speed * Math.cos(orbitRotationY)
    orbitShipRef.current.position.x -= speed * Math.sin(orbitRotationY)
  })

  const handleMove = (key: string, value: boolean) => {
    if (key === 'ArrowUp') movement.forward = value
    if (key === 'ArrowDown') movement.backward = value
    if (key === 'ArrowLeft') movement.left = value
    if (key === 'ArrowRight') movement.right = value
  }

  return (
    <>
      <mesh ref={orbitShipRef}>
        <primitive
          ref={shipRef}
          object={scene}
          rotation={[0, 3.1, 0]}
          position={[0, 0, 2]}
          scale={[2, 2, 2]}
        >
          <mesh ref={fireRef} position={[0, -0.6, -2.6]}>
            <Cone args={[0.3, 2, 5]} rotation={[4.6, 0, 0]}>
              <meshBasicMaterial transparent opacity={0.1} color="yellow" />
            </Cone>
          </mesh>
        </primitive>
      </mesh>

      <ShipControls onMove={handleMove} />
    </>
  )
}
