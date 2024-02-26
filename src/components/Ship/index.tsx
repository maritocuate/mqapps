import { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import ShipControls from './ShipControls'

type Movement = {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  [key: string]: boolean
}

export default function Ship() {
  const gltf = useGLTF('/models/shuttle.gltf')

  const orbitShipRef = useRef<THREE.Mesh>(null)
  const shipRef = useRef<THREE.Mesh>(null)

  const movement: Movement = useMemo(
    () => ({
      forward: false,
      backward: false,
      left: false,
      right: false,
    }),
    []
  )

  const speed = 0.2
  const rotationSpeed = 0.05
  const reverseSpeed = 0.05

  useFrame(() => {
    if (!shipRef.current || !orbitShipRef.current) return

    // Rotation movement
    if (movement.left) orbitShipRef.current.rotation.y += rotationSpeed
    if (movement.right) orbitShipRef.current.rotation.y -= rotationSpeed

    // Position movement
    if (movement.forward) {
      const orbitRotationY = orbitShipRef.current.rotation.y
      orbitShipRef.current.position.z -= speed * Math.cos(orbitRotationY)
      orbitShipRef.current.position.x -= speed * Math.sin(orbitRotationY)
    }
    if (movement.backward) {
      const orbitRotationY = orbitShipRef.current.rotation.y
      orbitShipRef.current.position.z += reverseSpeed * Math.cos(orbitRotationY)
      orbitShipRef.current.position.x += reverseSpeed * Math.sin(orbitRotationY)
    }
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
          object={gltf.scene}
          rotation={[-1.55, 4.7, 0]}
          position={[0, 0, 2]}
          scale={[0.6, 0.6, 0.6]}
        />
      </mesh>
      <ShipControls onMove={handleMove} />
    </>
  )
}
