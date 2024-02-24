export default function Ship() {
  return (
    <mesh position={[0, 2, 0]}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach={'material'} color={'hotpink'} />
    </mesh>
  )
}
