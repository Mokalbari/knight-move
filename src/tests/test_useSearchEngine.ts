import { expect } from "jsr:@std/expect/expect"
import { describe, it } from "jsr:@std/testing/bdd"
import { useSearchEngine } from "../modules/useSearchEngine.ts"

describe("search engine", () => {
  const test01 = useSearchEngine([0, 0], [0, 0])
  const test02 = useSearchEngine([0, 0], [2, 1])

  it("immediatly returns the shortest path when start == end", () => {
    expect(test01.findPath()).toEqual({ path: [[0, 0]], moves: 0 })
  })

  it("returns a correct path of 1 move", () => {
    expect(test02.findPath()).toEqual({
      path: [
        [0, 0],
        [2, 1],
      ],
      moves: 1,
    })
  })
})
