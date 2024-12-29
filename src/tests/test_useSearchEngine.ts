import { expect } from "jsr:@std/expect/expect"
import { describe, it } from "jsr:@std/testing/bdd"
import { useSearchEngine } from "../modules/useSearchEngine.ts"

describe("search engine", () => {
  it("immediatly returns the shortest path when start == end", () => {
    const test01 = useSearchEngine([0, 0], [0, 0])
    expect(test01.findPath()).toEqual({ path: [[0, 0]], moves: 0 })
  })

  it("returns a correct path of 1 move", () => {
    const test02 = useSearchEngine([0, 0], [2, 1])
    expect(test02.findPath()).toEqual({
      path: [
        [0, 0],
        [2, 1],
      ],
      moves: 1,
    })
  })

  it("returns a correct path of 4 moves", () => {
    const test03 = useSearchEngine([0, 0], [5, 5])
    const { path, moves } = test03.findPath()
    expect(path).toEqual([
      [0, 0],
      [2, 1],
      [4, 2],
      [6, 3],
      [5, 5],
    ])
    expect(moves).toBe(4)
  })

  it("returns undefined when a path cannot be accessed", () => {
    const test04 = useSearchEngine([0, 0], [-4, -8])
    expect(test04.findPath()).toEqual({ path: undefined, moves: 0 })
  })

  it("finds path on random positions, testing multiples inputs", () => {
    const test05 = useSearchEngine([2, 1], [7, 7])
    const { path: path5, moves: moves5 } = test05.findPath()
    expect(path5).toEqual([
      [2, 1],
      [4, 2],
      [6, 3],
      [4, 4],
      [6, 5],
      [7, 7],
    ])
    expect(moves5).toBe(5)

    const test06 = useSearchEngine([6, 1], [3, 4])
    const { path: path6, moves: moves6 } = test06.findPath()
    expect(path6).toEqual([
      [6, 1],
      [4, 2],
      [3, 4],
    ])
    expect(moves6).toBe(2)

    const test07 = useSearchEngine([1, 4], [2, 6])
    const { path: path7, moves: moves7 } = test07.findPath()
    expect(path7).toEqual([
      [1, 4],
      [2, 6],
    ])
    expect(moves7).toBe(1)
  })
})
