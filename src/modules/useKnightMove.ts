import { Coordinates } from "../types/definitions.ts"

interface KnightMove {
  generateMoves: (coordinates: Coordinates) => Coordinates[]
}

export function useKnightMove(): KnightMove {
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

  function generateMoves([x, y]: Coordinates): Coordinates[] {
    const output = []

    for (const [tx, ty] of OFFSETS) {
      output.push([x + tx, y + ty])
    }
    return output
  }

  return { generateMoves }
}
