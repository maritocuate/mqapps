import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls } from '@react-three/drei'
import Ship from './Ship'
import Lights from './Lights'
import Camera from './Camera'

export default function MainCanvas() {
  return (
    <Canvas>
      <OrbitControls />
      <Lights />

      <group position={[10, 0, 10]}>
        <Camera />
        <Ship />
      </group>

      <Grid args={[100, 100]} />
    </Canvas>
  )
}
