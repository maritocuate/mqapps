import { Cylinder, SpotLight, useGLTF, useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { DirectionalLightHelper } from 'three'
import Model from './Model'

type PlatformProps = {
  posX: number
  PoxY: number
}

export default function Platform({ posX, PoxY }: PlatformProps) {
  const lightRef = useRef<THREE.DirectionalLight>(null)
  useHelper(lightRef, DirectionalLightHelper, 1, 'red')

  return (
    <group position={[posX, 0, PoxY]}>
      {/* Light */}
      <directionalLight
        ref={lightRef}
        visible
        position={[0, 11, 0]}
        target-position={[posX, 0, PoxY]}
        castShadow
      />

      {/* Ball */}
      <mesh
        name="meshPhongMaterial"
        position={[1, 3, 0]}
        material={
          new THREE.MeshPhongMaterial({ color: 'lime', flatShading: true })
        }
        castShadow
        receiveShadow
      >
        <icosahedronGeometry args={[1, 1]} />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -5.3, 0]} receiveShadow>
        <Model modelPath="/models/round_platform/scene.gltf" />
      </mesh>
    </group>
  )
}
