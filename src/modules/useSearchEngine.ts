import type {
  Coordinates,
  EngineResult,
  QueueItem,
} from "../types/definitions.ts"
import { useKnightMove } from "./useKnightMove.ts"
import { useMoveModule } from "./useMoveModule.ts"
import { useStateModule } from "./useStateModule.ts"

export function useSearchEngine(start: Coordinates, end: Coordinates) {
  const startingNode: QueueItem = {
    position: start,
    path: [start],
  }

  const state = useStateModule<QueueItem>([startingNode])
  const visitedSquares = new Set<string>()

  const { hash, isOutOfBounds } = useMoveModule()
  const { generateMoves } = useKnightMove()

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
    const validMovesAsNode = moves
      .filter((move) => !isOutOfBounds(move) && !visitedSquares.has(hash(move)))
      .map(
        (move) =>
          ({
            position: move,
            path: [...currentNode.path, move],
          } as QueueItem)
      )

    const newQueue = [...queue.slice(1), ...validMovesAsNode]
    return traverseLevel(newQueue)
  }

  function findPath(): EngineResult {
    if (isTarget(start)) return { path: [start], moves: 0 }
    const queueCopy = [...state.get()]
    const result = traverseLevel(queueCopy)
    return {
      path: result?.path,
      moves: result ? result.path.length - 1 : 0,
    }
  }

  return { findPath }
}
