import { Circle, Cylinder, SpotLight, Tube, useGLTF } from '@react-three/drei'

const rot = 3

export default function Platform() {
  const { scene } = useGLTF('/models/round_platform/scene.gltf')

  return (
    <>
      <mesh>
        <primitive
          object={scene}
          scale={[8, 8, 8]}
          position={[-40, -10, -70]}
        ></primitive>
        <Cylinder scale={[19, 39, 19]} position={[-40, 10, -70]}>
          <meshBasicMaterial transparent opacity={0.3} color="blue" />
        </Cylinder>
        <SpotLight
          position={[-10, 50, -17]}
          distance={15}
          angle={0.15}
          attenuation={5}
          anglePower={5}
        />
      </mesh>
    </>
  )
}
