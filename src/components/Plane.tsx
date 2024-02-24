export default function Plane() {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach={'material'} color={'lightblue'} />
    </mesh>
  )
}
