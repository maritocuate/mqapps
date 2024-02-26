import { useGLTF } from '@react-three/drei'

export default function Ship() {
  const gltf = useGLTF('/models/shuttle.gltf')

  return (
    <primitive
      object={gltf.scene}
      rotation={[-1.55, 4.7, 0]}
      position={[0, 0, -3]}
      scale={[0.7, 0.7, 0.7]}
    />
  )
}
