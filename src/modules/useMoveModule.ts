import type { Coordinates } from "../types/definitions.ts"

interface MoveModule {
  isOutOfBounds: (coordinates: Coordinates) => boolean
  generateMoves: (coordinates: Coordinates) => Coordinates[]
}

export function useMoveModule(): MoveModule {
  const MIN_BOUND = 0
  const MAX_BOUND = 7

  const OFFSETS: Coordinates[] = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [1, -2],
    [-1, -2],
  ] as const

  function isOutOfBounds([x, y]: Coordinates): boolean {
    return x < MIN_BOUND || x > MAX_BOUND || y < MIN_BOUND || y > MAX_BOUND
  }

  function generateMoves([x, y]: Coordinates): Coordinates[] {
    const output = []

    for (const [tx, ty] of OFFSETS) {
      output.push([x + tx, y + ty])
    }
    return output
  }

  return { isOutOfBounds, generateMoves }
}
