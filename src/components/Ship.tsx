export default function Ship() {
  return (
    <mesh>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach={'material'} color={'hotpink'} />
    </mesh>
  )
}
