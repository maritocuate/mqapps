import { OrthographicCamera } from '@react-three/drei'

export default function Camera() {
  return (
    <OrthographicCamera
      makeDefault
      near={-20}
      far={100}
      position={[10, 8, 10]}
      zoom={15}
    />
  )
}
