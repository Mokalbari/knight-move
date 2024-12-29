import type { Coordinates } from "../types/definitions.ts"
import { useSearchEngine } from "./useSearchEngine.ts"

export function knightMoveWizard(start: Coordinates, end: Coordinates): void {
  const userInput = useSearchEngine(start, end)
  const { path, moves } = userInput.findPath()

  function beautifyPath(arr: Coordinates[]) {
    return arr.map((innerArr) => `[${innerArr.join(",")}]`).join(" -> ")
  }

  if (path) {
    console.log(
      `The shortest path to get to [${end}] is: ${beautifyPath(
        path
      )}. You make it in ${moves} moves`
    )
  } else {
    console.log(
      "Unfortunatly, you cannot make it into that square. It's probably out of bound of a classic 8x8 chess board. Provide an input between 0 and 7"
    )
  }
}
