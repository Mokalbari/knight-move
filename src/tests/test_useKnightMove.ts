import { expect } from "jsr:@std/expect/expect"
import { describe, it } from "jsr:@std/testing/bdd"
import { useKnightMove } from "../modules/useKnightMove.ts"

describe("knight moves", () => {
  const knight = useKnightMove()

  it("generates an array of 8 possible moves", () => {
    expect(knight.generateMoves([0, 0])).toHaveLength(8)
  })

  it("creates all possibles moves, even if the move cannot be played", () => {
    expect(knight.generateMoves([0, 0])).toEqual([
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [-1, 2],
      [1, -2],
      [-1, -2],
    ])

    expect(knight.generateMoves([5, 5])).toEqual([
      [7, 6],
      [7, 4],
      [3, 6],
      [3, 4],
      [6, 7],
      [4, 7],
      [6, 3],
      [4, 3],
    ])
  })
})
