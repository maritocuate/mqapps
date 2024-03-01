import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Ship from './Ship'
import Lights from './Lights'
import Camera from './Camera'
import Comets from './Comets'
import Background from './Background'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function MainCanvas() {
  return (
    <Canvas>
      <OrbitControls />
      <Lights />

      <group position={[10, 0, 10]}>
        <Camera />
        <Ship />
      </group>

      <Comets />

      <Background />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
      </EffectComposer>
    </Canvas>
  )
}
