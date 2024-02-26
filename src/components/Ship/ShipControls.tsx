import { useCallback, useEffect } from 'react'

export default function ShipControls({
  onMove,
}: {
  onMove: (key: string, value: boolean) => void
}) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      onMove(event.key, true)
    },
    [onMove]
  )

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      onMove(event.key, false)
    },
    [onMove]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  return null
}
