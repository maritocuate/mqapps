import { useMemo } from 'react'
import { Sphere, useTexture } from '@react-three/drei'

const getRandomScale = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

const generateRandomPosition = (): [number, number, number] => {
  const randomPosition = (range: number) => Math.random() * range - range / 2
  return [randomPosition(800), randomPosition(50), randomPosition(800)]
}

const generateRandomRotation = (): [number, number, number] => {
  const randomRotation = () => Math.random() * 2 * Math.PI
  return [randomRotation(), randomRotation(), randomRotation()]
}

export default function Comets() {
  const numberOfStars = 1000
  const texture = useTexture('/images/comet.jpg')

  const stars = useMemo(() => {
    const starsArray = []
    for (let i = 0; i < numberOfStars; i++) {
      starsArray.push(
        <Sphere
          key={i}
          scale={getRandomScale(0.2, 1.2)}
          position={generateRandomPosition()}
          rotation={generateRandomRotation()}
        >
          <meshStandardMaterial map={texture} />
        </Sphere>
      )
    }
    return starsArray
  }, [numberOfStars, texture])

  return stars
}
