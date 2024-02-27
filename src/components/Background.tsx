import { Plane, useTexture } from '@react-three/drei'
import { RepeatWrapping } from 'three'

export default function Background() {
  const texture = useTexture('/images/stars.jpeg')

  // Repeat and wrap the texture
  texture.repeat.set(15, 15)
  texture.wrapS = texture.wrapT = RepeatWrapping

  return (
    <Plane args={[4000, 3000]} rotation={[-Math.PI / 2, 0, 0]}>
      <meshBasicMaterial map={texture} opacity={0.5} transparent />
    </Plane>
  )
}
