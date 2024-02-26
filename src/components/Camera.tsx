import { PerspectiveCamera } from '@react-three/drei'

export default function Camera() {
  return (
    <PerspectiveCamera
      makeDefault
      fov={45}
      near={0.1}
      far={100}
      position={[0, 10, 8]}
      zoom={0.5}
    />
  )
}
