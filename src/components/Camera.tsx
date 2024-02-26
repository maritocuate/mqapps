import { PerspectiveCamera } from '@react-three/drei'

export default function Camera() {
  return (
    <PerspectiveCamera
      makeDefault
      fov={100}
      near={0.1}
      far={1000}
      position={[0, 10, 0]}
      zoom={0.9}
    />
  )
}
