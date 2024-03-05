import { SpotLight } from '@react-three/drei'
import Model from './Model'

type PlatformProps = {
  posX: number
  PoxY: number
}

export default function Platform({ posX, PoxY }: PlatformProps) {
  return (
    <group position={[posX, 0, PoxY]}>
      {/* Light */}
      <SpotLight
        position={[0, 20, 0]}
        intensity={40}
        decay={0.5}
        distance={30}
        angle={0.9}
        color={'white'}
        penumbra={0.5}
        target-position={[posX, 0, PoxY]}
        castShadow
      />

      {/* Floor */}
      <mesh position={[0, -5.3, 0]}>
        <Model
          modelPath="/models/round_platform/scene.gltf"
          scale={8}
          receiveShadow
        />
      </mesh>
    </group>
  )
}
