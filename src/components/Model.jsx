import { useLoader } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function Model(props) {
  const { scene } = useLoader(GLTFLoader, props.modelPath)

  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material.side = THREE.FrontSide
      }
    })
  }, [scene])

  return <primitive object={scene} {...props} />
}
