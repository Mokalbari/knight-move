export type SquareList = string[]
export type Coordinates = number[]
export type QueueItem = {
  position: Coordinates
  path: Coordinates[]
}
export type EngineResult = {
  path: Coordinates[] | null
  moves: number | null
}
