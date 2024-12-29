/*
  the state module provides a readonly generic array.
  It also provides a function to read the array (get) reset the array with a new value (set)
  Or to update the current array with a value and old values (update)
  The state is immutable. This means that a state is not really updated, but we create a new one based on the previous one.
  The garbage collector will take care of memory usage
*/

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
