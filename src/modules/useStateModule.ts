interface StateModule<T> {
  get: () => ReadonlyArray<T>
  set: (newState: ReadonlyArray<T>) => StateModule<T>
  update: (
    fn: (current: ReadonlyArray<T>) => ReadonlyArray<T>
  ) => StateModule<T>
}

export function useStateModule<T>(
  initialState: ReadonlyArray<T> = []
): StateModule<T> {
  const state = Object.freeze([...initialState]) as ReadonlyArray<T>

  function get(): ReadonlyArray<T> {
    return state
  }

  function set(newState: ReadonlyArray<T>): StateModule<T> {
    return useStateModule(newState)
  }

  function update(
    fn: (current: ReadonlyArray<T>) => ReadonlyArray<T>
  ): StateModule<T> {
    const newState = fn([...state])
    return useStateModule(newState)
  }

  return { get, set, update }
}
