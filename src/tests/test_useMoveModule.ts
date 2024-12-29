import { expect } from "jsr:@std/expect"
import { describe, it } from "jsr:@std/testing/bdd"
import { useMoveModule } from "../modules/useMoveModule.ts"

describe("move module", () => {
  const moveModule = useMoveModule()

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
})
