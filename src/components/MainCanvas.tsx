import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Ship from './Ship'
import Lights from './Lights'
import Camera from './Camera'
import Comets from './Comets'
import Background from './Background'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Platform from './Platform'

export default function MainCanvas() {
  return (
    <Canvas shadows>
      <OrbitControls />
      <Lights />

      <group position={[10, 0, 10]}>
        <Camera />
        <Ship />
      </group>

      <Platform posX={-30} PoxY={-20} />
      <Comets />

      <Background />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
      </EffectComposer>
    </Canvas>
  )
}
