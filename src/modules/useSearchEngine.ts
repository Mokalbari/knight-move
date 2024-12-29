import type {
  Coordinates,
  EngineResult,
  QueueItem,
} from "../types/definitions.ts"
import { useEntry } from "./useEntry.ts"
import { useMoveModule } from "./useMoveModule.ts"
import { useStateModule } from "./useStateModule.ts"

interface SearchEngine {
  findPath: () => EngineResult
}

export function useSearchEngine(
  start: Coordinates,
  end: Coordinates
): SearchEngine {
  const startingNode: QueueItem = {
    position: start,
    path: [start],
  }

  const state = useStateModule<QueueItem>([startingNode])
  const visitedSquares = new Set<string>()
  /* We use a mutable Set for tracking visited squares as a performance optimization.
   While this deviates from pure functional principles, the tradeoff is justified because:
   1. The Set is scoped only to this search operation
   2. The mutability is encapsulated within the search engine
   3. Creating new Sets for each visited square would significantly impact performance */

  const { hash } = useEntry()
  const { generateMoves, isOutOfBounds } = useMoveModule()

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
