import type { Coordinates } from "../types/definitions.ts"

interface Entry {
  hash: (coordinates: Coordinates) => string
}

export function useEntry(): Entry {
  function isValidEntry([x, y]: Coordinates) {
    return Number.isInteger(x) && Number.isInteger(y)
  }

  function hash([x, y]: Coordinates): string {
    if (!isValidEntry([x, y])) {
      throw new Error("The provided coordinates are not of type Integer.")
    }
    return `${x}${y}`
  }

  return { hash }
}