const knightMoves = [
  [2, 1],
  [2, -1],
  [-2, -1],
  [-2, 1],
  [1, -2],
  [1, 2],
  [-1, -2],
  [-1, 2],
] as const

const visitedSquares: number[] = []
