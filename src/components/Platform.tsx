import { Cylinder, SpotLight, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'

export default function Platform() {
  const { scene } = useGLTF('/models/round_platform/scene.gltf')

  const { position } = useControls('Spotlight', {
    position: {
      value: [-40, 10, -70],
      step: 1,
    },
  })

  return (
    <>
      <mesh>
        <primitive
          object={scene}
          scale={8}
          position={[-40, -10, -70]}
        ></primitive>
        {/* <Cylinder scale={[19, 39, 19]} position={[-40, 10, -70]}>
          <meshBasicMaterial transparent opacity={0.3} color="blue" />
        </Cylinder> */}

        <SpotLight
          position={position}
          distance={15}
          angle={0.15}
          attenuation={5}
          anglePower={5}
        />
      </mesh>
    </>
  )
}
