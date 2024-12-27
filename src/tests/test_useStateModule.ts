import { expect } from "jsr:@std/expect/expect"
import { describe, it } from "jsr:@std/testing/bdd"
import { useStateModule } from "../modules/useStateModule.ts"

describe("state module", () => {
  const state = useStateModule<string>()

  it("returns an array", () => {
    expect(state.get()).toEqual([])
  })

  it("creates a new state module without altering previous state", () => {
    const newState = state.set(["yes", "no"])
    expect(newState.get()).toEqual(["yes", "no"])
    expect(state.get()).toEqual([])
  })

  it("updates the previous state within a new state without altering previous state", () => {
    const altState = useStateModule([1, 2, 3])
    const addToState = [4, 5, 6]
    const newState = altState.update((current) => [...current, ...addToState])
    expect(newState.get()).toEqual([1, 2, 3, 4, 5, 6])
    expect(altState.get()).toEqual([1, 2, 3])
  })
})
