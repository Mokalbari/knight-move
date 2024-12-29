import type { Coordinates } from "../types/definitions.ts"

interface MoveModule {
  hash: (coordinates: Coordinates) => string
  isOutOfBounds: (coordinates: Coordinates) => boolean
  // isVisited: (squareList: SquareList, coordinates: Coordinates) => boolean
  // processMove: (squareList: SquareList, coordinates: Coordinates) => string[]
}

export function useMoveModule(): MoveModule {
  const MIN_BOUND = 0
  const MAX_BOUND = 7

  function _isValidEntry([x, y]: Coordinates) {
    return Number.isInteger(x) && Number.isInteger(y)
  }

  function hash([x, y]: Coordinates): string {
    if (!_isValidEntry([x, y])) {
      throw new Error("The provided coordinates are not of type Integer.")
    }
    return `${x}${y}`
  }

  function isOutOfBounds([x, y]: Coordinates): boolean {
    return x < MIN_BOUND || x > MAX_BOUND || y < MIN_BOUND || y > MAX_BOUND
  }

  // function isVisited(
  //   squareList: SquareList,
  //   coordinates: Coordinates
  // ): boolean {
  //   return squareList.includes(hash(coordinates))
  // }

  // function processMove(
  //   squareList: SquareList,
  //   coordinates: Coordinates
  // ): string[] {
  //   if (isVisited(squareList, coordinates) || isOutOfBounds(coordinates)) {
  //     return squareList
  //   }

  //   return [...squareList, hash(coordinates)]
  // }

  return { hash, isOutOfBounds }
}
