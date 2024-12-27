import { expect } from "jsr:@std/expect"
import { describe, it } from "jsr:@std/testing/bdd"
import { useMoveModule } from "../modules/useMoveModule.ts"
import type { SquareList } from "../types/definitions.ts"

describe("move module", () => {
  const moveModule = useMoveModule()
  const visited: SquareList = ["00", "02", "40", "57", "14"]

  it("returns true if a value is already visited", () => {
    expect(moveModule.isVisited(visited, [0, 0])).toBeTruthy()
    expect(moveModule.isVisited(visited, [1, 4])).toBeTruthy()
    expect(moveModule.isVisited(visited, [5, 7])).toBeTruthy()
  })

  it("returns false if a value is have not been visited", () => {
    expect(moveModule.isVisited(visited, [0, 1])).toBeFalsy()
    expect(moveModule.isVisited(visited, [1, 7])).toBeFalsy()
    expect(moveModule.isVisited(visited, [5, 5])).toBeFalsy()
  })

  it("identifies out of bounds chess moves on both axis", () => {
    expect(moveModule.isOutOfBounds([-1, 5])).toBeTruthy()
    expect(moveModule.isOutOfBounds([0, 8])).toBeTruthy()
    expect(moveModule.isOutOfBounds([-1, -1])).toBeTruthy()
    expect(moveModule.isOutOfBounds([-7, 1])).toBeTruthy()
    expect(moveModule.isOutOfBounds([8, 1])).toBeTruthy()
    expect(moveModule.isOutOfBounds([8, 8])).toBeTruthy()
    expect(moveModule.isOutOfBounds([-8, -8])).toBeTruthy()
  })

  it("returns false when a correct move is played", () => {
    expect(moveModule.isOutOfBounds([0, 0])).toBeFalsy()
    expect(moveModule.isOutOfBounds([7, 7])).toBeFalsy()
    expect(moveModule.isOutOfBounds([7, 0])).toBeFalsy()
    expect(moveModule.isOutOfBounds([5, 3])).toBeFalsy()
    expect(moveModule.isOutOfBounds([0, 3])).toBeFalsy()
    expect(moveModule.isOutOfBounds([2, 6])).toBeFalsy()
  })

  it("returns the untouched square list if a value is visited", () => {
    expect(moveModule.processMove(visited, [0, 0])).toEqual(visited)
    expect(moveModule.processMove(visited, [5, 7])).toEqual(visited)
  })

  it("returns the untouched square list if a value is not visited but out of bounds", () => {
    expect(moveModule.processMove(visited, [-1, 5])).toEqual(visited)
    expect(moveModule.processMove(visited, [9, 5])).toEqual(visited)
    expect(moveModule.processMove(visited, [6, -8])).toEqual(visited)
  })

  it("adds the coordinated to the visited list if in bounds and not visited", () => {
    expect(moveModule.processMove(visited, [0, 1])).toEqual([...visited, "01"])
    expect(moveModule.processMove(visited, [7, 6])).toEqual([...visited, "76"])
  })
})
