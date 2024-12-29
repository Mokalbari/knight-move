import type { Coordinates } from "../types/definitions.ts"

/*
  Move module is here to define the boundaries of the chess boards and the knight moves.
  It provides a util function to check if a move is playable (eg inside the chess board)
  and a util to generate all possible moves from a position (even if that move is not playable.)
  (not playable moves will be discarded in the search engine)
*/

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
    return OFFSETS.map(([tx, ty]) => [tx + x, ty + y])
  }

  return { isOutOfBounds, generateMoves }
}
