import type {
  Coordinates,
  EngineResult,
  QueueItem,
} from "../types/definitions.ts"
import { useEntry } from "./useEntry.ts"
import { useMoveModule } from "./useMoveModule.ts"
import { useStateModule } from "./useStateModule.ts"

/*
  The search engine bundles up multiple functions.
  it's a breadth first search engine with a recursive function to traverse levels.  
  It exports a single findPath function that takes care of calling the recursive function with an initial state
  It also checks if the target == the start or if the provided inputs is out of bounds before calling the traverseLevel
*/

interface SearchEngine {
  findPath: () => EngineResult
}

export function useSearchEngine(
  start: Coordinates,
  end: Coordinates
): SearchEngine {
  // init functions and state with default values
  const { hash } = useEntry()
  const { generateMoves, isOutOfBounds } = useMoveModule()
  const state = useStateModule<QueueItem>([{ position: start, path: [start] }])
  const visitedSquares = new Set<string>()
  /* We use a mutable Set for tracking visited squares as a performance optimization.
   While this deviates from pure functional principles, the tradeoff is justified because:
   1. The Set is scoped only to this search operation
   2. The mutability is encapsulated within the search engine
   3. Creating new Sets for each visited square would significantly impact performance */

  function isTarget(currentPosition: Coordinates): boolean {
    return end.every((value, index) => value === currentPosition[index])
  }

  function traverseLevel(queue: QueueItem[]): QueueItem | undefined {
    if (queue.length === 0) return undefined

    const currentNode = queue[0]

    if (isTarget(currentNode.position)) {
      return currentNode
    }

    visitedSquares.add(hash(currentNode.position))

    // pipe the value down to several functions to get moves, filter them and map them to the desired shape.
    const moves = generateMoves(currentNode.position)
      .filter((move) => !isOutOfBounds(move) && !visitedSquares.has(hash(move)))
      .map(
        (move) =>
          ({
            position: move,
            path: [...currentNode.path, move],
          } as QueueItem)
      )

    const newQueue = [...queue.slice(1), ...moves]
    return traverseLevel(newQueue)
  }

  function findPath(): EngineResult {
    // early return if the start or the ending is not within bounds.
    if (isOutOfBounds(start) || isOutOfBounds(end))
      return { path: null, moves: null }

    // early return to preserve some time and memory usage.
    if (isTarget(start)) return { path: [start], moves: 0 }

    // The state is a readonly array,
    // it needs to be copied inside another array to be used inside traverseLevel
    const result = traverseLevel([...state.get()])
    return {
      path: result?.path ?? null,
      moves: result ? result.path.length - 1 : 0,
    }
  }

  return { findPath }
}
