import type { Coordinates, SquareList } from "../types/definitions.ts"

interface MoveModule {
  isVisited: (squareList: SquareList, coordinates: Coordinates) => boolean
  isOutOfBounds: (coordinates: Coordinates) => boolean
  processMove: (squareList: SquareList, coordinates: Coordinates) => string[]
}

export function createMoveModule(): MoveModule {
  const MIN_BOUND = 0
  const MAX_BOUND = 7

  function _hash([x, y]: Coordinates): string {
    return `${x}${y}`
  }

  function isVisited(
    squareList: SquareList,
    coordinates: Coordinates
  ): boolean {
    return squareList.includes(_hash(coordinates))
  }

  function isOutOfBounds([x, y]: Coordinates): boolean {
    return x < MIN_BOUND || x > MAX_BOUND || y < MIN_BOUND || y > MAX_BOUND
  }

  function processMove(
    squareList: SquareList,
    coordinates: Coordinates
  ): string[] {
    if (isVisited(squareList, coordinates) || isOutOfBounds(coordinates)) {
      return squareList
    }

    return [...squareList, _hash(coordinates)]
  }

  return { isVisited, isOutOfBounds, processMove }
}
