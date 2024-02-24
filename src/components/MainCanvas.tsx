import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Ship from './Ship'

export default function MainCanvas() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <Ship />
    </Canvas>
  )
}
