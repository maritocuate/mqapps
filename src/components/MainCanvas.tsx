import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls, Stars } from '@react-three/drei'
import Ship from './Ship'
import Camera from './Camera'
import Lights from './Lights'

export default function MainCanvas() {
  return (
    <Canvas>
      <Camera />
      <OrbitControls />

      <Stars />
      <Lights />
      <Ship />

      <Grid args={[100, 100]} />
    </Canvas>
  )
}
