// deno-lint-ignore-file no-explicit-any
import { expect } from "jsr:@std/expect/expect"
import { describe, it } from "jsr:@std/testing/bdd"
import { useEntry } from "../modules/useEntry.ts"

describe("use entry module", () => {
  const { hash } = useEntry()

  it("hashes inter to string", () => {
    expect(hash([5, 1])).toBe("51")
    expect(hash([0, 6])).toBe("06")
    expect(hash([7, 2])).toBe("72")
  })

  it("throws an error if trying to hash something else than an int", () => {
    expect(() => hash(["t", "u"] as any)).toThrow(
      "The provided coordinates are not of type Integer."
    )
    expect(() => hash([true, false] as any)).toThrow(
      "The provided coordinates are not of type Integer."
    )
  })
})
