export default function Lights() {
  return (
    <>
      <directionalLight position={[0, 0, 5]} />
      <ambientLight position={[50, 50, 50]} />
    </>
  )
}
