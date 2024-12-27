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
  const _state = [...initialState]

  function get(): ReadonlyArray<T> {
    return Object.freeze(_state)
  }

  function set(newState: ReadonlyArray<T>): StateModule<T> {
    return useStateModule(newState)
  }

  function update(
    fn: (current: ReadonlyArray<T>) => ReadonlyArray<T>
  ): StateModule<T> {
    const newState = fn([..._state])
    return useStateModule(newState)
  }

  return { get, set, update }
}
