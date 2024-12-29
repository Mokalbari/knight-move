export type SquareList = string[]
export type Coordinates = number[]
export type QueueItem = {
  position: Coordinates
  path: Coordinates[]
}
export type EngineResult = {
  path: Coordinates[] | undefined
  moves: number | undefined
}
