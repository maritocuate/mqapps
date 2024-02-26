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

  useFrame(() => {
    if (!shipRef.current) return
    if (movement.forward) shipRef.current.position.z -= speed
    if (movement.backward) shipRef.current.position.z += speed
    if (movement.left) shipRef.current.position.x -= speed
    if (movement.right) shipRef.current.position.x += speed
  })

  const handleMove = (key: string, value: boolean) => {
    if (key === 'ArrowUp') movement.forward = value
    if (key === 'ArrowDown') movement.backward = value
    if (key === 'ArrowLeft') movement.left = value
    if (key === 'ArrowRight') movement.right = value
  }

  return (
    <>
      <primitive
        ref={shipRef}
        object={gltf.scene}
        rotation={[-1.55, 4.7, 0]}
        position={[0, 0, -3]}
        scale={[0.6, 0.6, 0.6]}
      />
      <ShipControls onMove={handleMove} />
    </>
  )
}
