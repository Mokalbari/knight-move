import { expect } from "jsr:@std/expect"
import { describe, it } from "jsr:@std/testing/bdd"
import { useMoveModule } from "../modules/useMoveModule.ts"

describe("move module", () => {
  const { isOutOfBounds, generateMoves } = useMoveModule()

  it("identifies out of bounds chess moves on both axis", () => {
    expect(isOutOfBounds([-1, 5])).toBeTruthy()
    expect(isOutOfBounds([0, 8])).toBeTruthy()
    expect(isOutOfBounds([-1, -1])).toBeTruthy()
    expect(isOutOfBounds([-7, 1])).toBeTruthy()
    expect(isOutOfBounds([8, 1])).toBeTruthy()
    expect(isOutOfBounds([8, 8])).toBeTruthy()
    expect(isOutOfBounds([-8, -8])).toBeTruthy()
  })

  it("returns false when a correct move is played", () => {
    expect(isOutOfBounds([0, 0])).toBeFalsy()
    expect(isOutOfBounds([7, 7])).toBeFalsy()
    expect(isOutOfBounds([7, 0])).toBeFalsy()
    expect(isOutOfBounds([5, 3])).toBeFalsy()
    expect(isOutOfBounds([0, 3])).toBeFalsy()
    expect(isOutOfBounds([2, 6])).toBeFalsy()
  })

  it("generates an array of 8 possible moves", () => {
    expect(generateMoves([0, 0])).toHaveLength(8)
  })

  it("creates all possibles moves, even if the move cannot be played", () => {
    expect(generateMoves([0, 0])).toEqual([
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [-1, 2],
      [1, -2],
      [-1, -2],
    ])

    expect(generateMoves([5, 5])).toEqual([
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
