import { useLoader } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

type ModelProps = {
  modelPath: string
}

export default function Model({ modelPath }: ModelProps) {
  const model = useLoader(GLTFLoader, modelPath)

  useEffect(() => {
    model.scene.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material.side = THREE.FrontSide
      }
    })
  }, [model])

  return model ? <primitive object={model.scene} scale={8} /> : null
}
