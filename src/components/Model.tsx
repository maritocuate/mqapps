import { useLoader } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

type ModelProps = {
  modelPath: string
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
  children?: React.ReactNode
}

export default function Model({
  modelPath,
  scale,
  position,
  rotation,
  children,
}: ModelProps) {
  const model = useLoader(GLTFLoader, modelPath)

  useEffect(() => {
    model.scene.traverse(child => {
      if ((child as THREE.Mesh).isMesh) {
        const meshChild = child as THREE.Mesh
        meshChild.castShadow = true
        meshChild.receiveShadow = true
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        meshChild.material.side = THREE.FrontSide
      }
    })
  }, [model])

  return (
    <primitive
      object={model.scene}
      scale={scale}
      position={position}
      rotation={rotation}
      receiveShadow
    >
      {children}
    </primitive>
  )
}
