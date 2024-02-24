import { useGLTF } from '@react-three/drei'

export default function Ship() {
  const gltf = useGLTF('/models/shuttle.gltf')

  return (
    <primitive
      object={gltf.scene}
      rotation={[-Math.PI / 2, 4.7, 0]}
      position-y={3}
    />
  )
}
