import { useMemo, useRef } from 'react'
import { Cone, useGLTF } from '@react-three/drei'
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
  const fireRef = useRef<THREE.Mesh>(null)

  const acceleration = 0.02
  const deceleration = 0.01

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
          object={gltf.scene}
          rotation={[-1.55, 4.7, 0]}
          position={[0, 0, 2]}
          scale={[0.6, 0.6, 0.6]}
        >
          <mesh ref={fireRef} position={[0.5, -3.8, 0]}>
            <Cone args={[1.3, 4, 7]} rotation={[Math.PI / 1, 0, 0]}>
              <meshBasicMaterial transparent opacity={0.1} color="yellow" />
            </Cone>
          </mesh>
        </primitive>
      </mesh>

      <ShipControls onMove={handleMove} />
    </>
  )
}
